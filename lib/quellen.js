"use strict";
/**
 * belegbar.eu — gemeinsame Quellen-Logik für linkcheck.js und quellenlauf.js.
 * Sammelt Quellen-URLs aus data/anbieter/*.json, ruft sie ab, bewertet Weiterleitungen
 * und hasht den sichtbaren Inhalt, damit ein Monat später erkennbar ist, ob eine Quelle
 * noch dasselbe sagt.
 */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const DATA_DIR = path.join(__dirname, "..", "data", "anbieter");
const UA = "Mozilla/5.0 (compatible; belegbar.eu-linkcheck/1.0; +https://belegbar.eu/)";
const TIMEOUT_MS = 20000;

/** Quellen, die automatisierte Abrufe blocken. Ein Fehlercode ist hier kein Befund —
 *  die Angabe wurde im Browser geprüft, die Anmerkung im Profil hält das fest. */
const BOT_SPERREN = ["trust.deepl.com", "deepl.safebase.us"];

/** Alle Quellen-URLs, dedupliziert, mit der Liste der Felder, die sie belegen. */
function sammleUrls() {
  const proUrl = new Map();
  for (const datei of fs.readdirSync(DATA_DIR).filter((f) => f.endsWith(".json"))) {
    const p = JSON.parse(fs.readFileSync(path.join(DATA_DIR, datei), "utf8"));
    const lauf = (o, pfad) => {
      if (!o || typeof o !== "object") return;
      for (const [k, v] of Object.entries(o)) {
        const ist = typeof v === "string" && v.startsWith("http");
        if (ist && (k === "quelle" || k === "website" || k === "wert")) {
          if (!proUrl.has(v)) proUrl.set(v, { anbieter: p.id, datei, feld: pfad + "." + k, url: v, felder: [] });
          proUrl.get(v).felder.push({ anbieter: p.id, datei, feld: pfad + "." + k, schluessel: k });
        } else if (v && typeof v === "object") lauf(v, pfad + "." + k);
      }
    };
    lauf(p, p.id);
  }
  // Startseiten (nur "website") belegen nichts — sie rotieren Kampagnen-Texte und würden jeden Monat
  // als "verändert" auftauchen. Für sie zählt allein, ob sie erreichbar sind.
  return [...proUrl.values()].map((u) => ({ ...u, nurErreichbar: u.felder.every((f) => f.schluessel === "website") }));
}

/** Zwei URLs, die auf dieselbe Ressource zeigen: www-Präfix, Schrägstrich am Ende und
 *  Fragment sind für die Frage "ist der Beleg noch da" bedeutungslos. */
function gleicheRessource(a, b) {
  const norm = (u) => {
    const x = new URL(u);
    const host = x.hostname.startsWith("www.") ? x.hostname.slice(4) : x.hostname;
    let pfad = x.pathname;
    while (pfad.length > 1 && pfad.endsWith("/")) pfad = pfad.slice(0, -1);
    return host + pfad + x.search;
  };
  try { return norm(a) === norm(b); } catch { return false; }
}

/** Ist das Weiterleitungsziel nur noch eine Startseite, obwohl die Quelle tief verlinkt war? */
function aufStartseiteGelandet(von, nach) {
  try {
    const a = new URL(von), b = new URL(nach);
    return a.pathname.replace(/\/+$/, "").length > 0 && b.pathname.replace(/\/+$/, "").length === 0;
  } catch { return false; }
}

/** Sichtbarer Text einer HTML-Seite: ohne Scripts, Styles, Kommentare, Tags; Whitespace normalisiert.
 *  Nonces, Build-IDs und Cookie-Banner-Skripte ändern sich bei jedem Abruf — der Text nicht. */
function normalisiereText(html) {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Inhalts-Hash (16 Hex-Zeichen wie im lastmod-Ledger). HTML über die sortierte Wortmenge des
 *  sichtbaren Texts, alles andere über die Bytes. Sortiert, weil manche Seiten (dqsglobal.com) ihre
 *  Menüs bei jedem Abruf anders anordnen: Ein hinzugefügtes, entferntes oder geändertes Wort wird
 *  weiterhin erkannt — eine bloße Umsortierung nicht. */
function hashInhalt(contentType, bytes) {
  const istHtml = /html|xml/i.test(contentType || "");
  const basis = istHtml ? normalisiereText(bytes.toString("utf8")).split(" ").sort().join(" ") : bytes;
  return crypto.createHash("sha256").update(basis).digest("hex").slice(0, 16);
}

/** Ruft eine Quelle ab: Befund wie im Linkcheck, bei "ok" zusätzlich der Inhalts-Hash. */
async function pruefe(t, { mitHash = false } = {}) {
  const host = new URL(t.url).hostname;
  if (BOT_SPERREN.some((h) => host.endsWith(h))) return { ...t, befund: "uebersprungen", hinweis: "Quelle blockt automatisierte Abrufe; im Browser geprüft" };
  const methoden = mitHash && !t.nurErreichbar ? ["GET"] : ["HEAD", "GET"];
  for (const methode of methoden) {
    try {
      const r = await fetch(t.url, { method: methode, redirect: "follow", signal: AbortSignal.timeout(TIMEOUT_MS), headers: { "user-agent": UA, accept: "*/*" } });
      if (methode === "HEAD" && [403, 405, 501].includes(r.status)) continue;
      if (r.status >= 400) return { ...t, befund: "fehler", status: r.status };
      if (aufStartseiteGelandet(t.url, r.url)) return { ...t, befund: "beleg-verloren", status: r.status, ziel: r.url };
      const ok = { ...t, befund: "ok", status: r.status, ziel: gleicheRessource(t.url, r.url) ? null : r.url };
      if (mitHash && !t.nurErreichbar) ok.hash = hashInhalt(r.headers.get("content-type"), Buffer.from(await r.arrayBuffer()));
      return ok;
    } catch (e) {
      if (methode === "GET") return { ...t, befund: "nicht-erreichbar", hinweis: e.message };
    }
  }
  return { ...t, befund: "nicht-erreichbar", hinweis: "unbekannt" };
}

async function pruefeAlle(urls, opts, gleichzeitig = 8) {
  const ergebnis = [];
  let i = 0;
  await Promise.all(Array.from({ length: gleichzeitig }, async () => {
    while (i < urls.length) ergebnis.push(await pruefe(urls[i++], opts));
  }));
  return ergebnis.sort((a, b) => a.anbieter.localeCompare(b.anbieter) || a.url.localeCompare(b.url));
}

/** Teilt einen Lauf gegen den Ledger in: neu, unverändert, verändert, verschwunden, übersprungen.
 *  Ledger-Einträge mit "nur_erreichbar": true (von Hand gesetzt, mit "grund") werden nicht inhaltlich
 *  verglichen — für Seiten, die bei jedem Abruf andere Blöcke einblenden. Sparsam einsetzen. */
function ordneLauf(ergebnis, ledger) {
  const o = { neu: [], unveraendert: [], veraendert: [], verschwunden: [], uebersprungen: [] };
  for (const e of ergebnis) {
    if (e.befund === "uebersprungen") o.uebersprungen.push(e);
    else if (e.befund !== "ok") o.verschwunden.push(e);
    else if (e.nurErreichbar || (ledger[e.url] && ledger[e.url].nur_erreichbar)) o.unveraendert.push(e);
    else if (!ledger[e.url]) o.neu.push(e);
    else if (ledger[e.url].hash === e.hash) o.unveraendert.push(e);
    else o.veraendert.push(e);
  }
  return o;
}

/** Manche Seiten liefern unter Last kurzzeitig eine andere Variante (Cache-Knoten, A/B-Text).
 *  "Verändert" und "verschwunden" werden deshalb einmal seriell nachgeladen; nur was beim zweiten Abruf so bleibt, zählt. */
async function bestaetigeVeraendert(o, ledger, nochmal = (t) => pruefe(t, { mitHash: true })) {
  const veraendert = [], verschwunden = [], unveraendert = [...o.unveraendert];
  const alt = (u) => ledger[u] && ledger[u].hash;
  for (const e of o.veraendert) {
    const z = await nochmal(e);
    if (z.befund === "ok" && z.hash === alt(e.url)) unveraendert.push(z);
    else veraendert.push(z.befund === "ok" ? z : e);
  }
  // Ein 503 oder Timeout unter Last ist noch kein verlorener Beleg — erst der zweite Fehlschlag.
  for (const e of o.verschwunden) {
    const z = await nochmal(e);
    if (z.befund !== "ok") verschwunden.push(z);
    else if (e.nurErreichbar || !alt(e.url) || z.hash === alt(e.url)) unveraendert.push(z);
    else veraendert.push(z);
  }
  return { ...o, veraendert, verschwunden, unveraendert };
}

const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Setzt das Feld-geprueft in jeder Zeile, die genau diese URL als "quelle" trägt.
 *  Zeilenweise Textersetzung statt JSON.stringify: Die Anbieter-Dateien sind handformatiert
 *  (ein Beleg-Objekt je Zeile), und ein Diff soll nur die Zeilen zeigen, die sich geändert haben. */
function setzeGeprueft(text, url, datum) {
  const quelle = `"quelle": "${url}"`;
  return text.split("\n").map((zeile) => {
    if (!zeile.includes(quelle + ",") && !zeile.includes(quelle + " ")) return zeile;
    if (/"geprueft": "\d{4}-\d{2}-\d{2}"/.test(zeile)) return zeile.replace(/"geprueft": "\d{4}-\d{2}-\d{2}"/, `"geprueft": "${datum}"`);
    return zeile.replace(new RegExp(escRe(quelle) + "(?=,)"), `${quelle}, "geprueft": "${datum}"`);
  }).join("\n");
}

/** Anbieter komplett unverändert: Top-Level-Datum setzen, Feld-Daten entfernen (sie würden nur
 *  "einzelne Angaben zuletzt am …" erzeugen, obwohl alles denselben Stand hat). */
function setzeTopGeprueft(text, datum) {
  return text.split("\n").map((zeile) => {
    if (/^  "geprueft": "/.test(zeile)) return zeile.replace(/"\d{4}-\d{2}-\d{2}"/, `"${datum}"`);
    return zeile.replace(/, "geprueft": "\d{4}-\d{2}-\d{2}"/g, "");
  }).join("\n");
}

/** Was je Anbieter-Datei geschrieben wird. Nur "quelle"/"wert"-Felder tragen ein geprueft;
 *  "website" ist Stammdatum ohne Prüfanspruch. Ist bei einem Anbieter alles Belegende unverändert,
 *  reicht das Top-Level-Datum; sonst bekommen nur die unveränderten Felder ein eigenes Datum. */
function planeFortschreibung(ordnung, alleUrls) {
  const belegend = (f) => f.schluessel !== "website";
  const unv = new Set(ordnung.unveraendert.map((e) => e.url));
  const plan = {};
  for (const u of alleUrls) {
    for (const f of u.felder.filter(belegend)) {
      const eintrag = (plan[f.datei] ||= { offen: 0, urls: new Set() });
      if (unv.has(u.url)) eintrag.urls.add(u.url); else eintrag.offen++;
    }
  }
  const aus = {};
  for (const [datei, e] of Object.entries(plan)) {
    if (e.urls.size === 0) continue;
    aus[datei] = e.offen === 0 ? { modus: "top", urls: [] } : { modus: "felder", urls: [...e.urls] };
  }
  return aus;
}

module.exports = { DATA_DIR, BOT_SPERREN, sammleUrls, gleicheRessource, aufStartseiteGelandet, normalisiereText, hashInhalt, pruefe, pruefeAlle, ordneLauf, bestaetigeVeraendert, setzeGeprueft, setzeTopGeprueft, planeFortschreibung };
