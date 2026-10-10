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

/** Quellen, die automatisierte Abrufe zeitweise blocken. Sie werden trotzdem abgerufen; nur eine
 *  Sperre (Status unten oder Challenge-Seite) ist hier kein Befund, sondern "uebersprungen" — die
 *  Angabe wurde dann im Browser geprüft, die Anmerkung im Profil hält das fest. Ein vorgetäuschter
 *  Browser-UA hilft nicht: SafeBase sperrt ihn (04.10.2026), den ehrlichen Linkcheck-UA nicht. */
const BOT_SPERREN = ["trust.deepl.com", "deepl.safebase.us", "dqsglobal.com"];
const SPERR_STATUS = [401, 403, 429, 503];
const TLS_KETTE = ["UNABLE_TO_VERIFY_LEAF_SIGNATURE", "UNABLE_TO_GET_ISSUER_CERT_LOCALLY"];
// Nicht "challenge-platform": Cloudflare hängt scripts/jsd/main.js auch an normal ausgelieferte Seiten.
const CHALLENGE = /<title>\s*(Just a moment|Attention Required)|cf-chl-/i;

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
  const woerter = woerterInhalt(contentType, bytes);
  const basis = woerter ? woerter.join(" ") : ohnePdfZeitstempel(bytes);
  return crypto.createHash("sha256").update(basis).digest("hex").slice(0, 16);
}

/** Manche PDFs werden bei jedem Abruf neu erzeugt (Infomaniak-AGB, 09.10.2026): Zwischen zwei Abrufen
 *  unterscheiden sich nur /CreationDate, /ModDate und die Datei-/ID im Trailer. Die fallen vor dem
 *  Hash weg; jedes andere Byte zählt weiter. latin1, damit Binärströme unverändert bleiben. */
function ohnePdfZeitstempel(bytes) {
  if (bytes.subarray(0, 5).toString("latin1") !== "%PDF-") return bytes;
  return Buffer.from(bytes.toString("latin1")
    .replace(/\/(CreationDate|ModDate)\s*\([^)]*\)/g, "/$1 ()")
    .replace(/\/ID\s*\[\s*<[0-9A-Fa-f]*>\s*<[0-9A-Fa-f]*>\s*\]/g, "/ID []"), "latin1");
}

/** Hash, wie er bis 09.10.2026 für alles außer HTML im Ledger steht (rohe Bytes). Nur für die
 *  einmalige Umstellung: Stimmt er beim frischen Abruf noch, hat sich die Quelle nicht verändert. */
function hashInhaltAlt(bytes) {
  return crypto.createHash("sha256").update(bytes).digest("hex").slice(0, 16);
}

/** Die sortierte Wortliste, über die der HTML-Hash läuft; null für PDFs und andere Bytes. */
function woerterInhalt(contentType, bytes) {
  if (!/html|xml/i.test(contentType || "")) return null;
  return normalisiereText(bytes.toString("utf8")).split(" ").sort();
}

/** Wortprotokoll: welche Wörter (mit Anzahl) sind seit der Referenz weg bzw. dazu?
 *  Damit sieht man bei "verändert", ob nur ein Zähler tickt oder die Aussage sich ändert. */
function wortDiff(alt, neu) {
  const zaehle = (liste) => liste.reduce((m, w) => m.set(w, (m.get(w) || 0) + 1), new Map());
  const a = zaehle(alt), n = zaehle(neu);
  const rest = (x, y) => [...x].filter(([w, k]) => k > (y.get(w) || 0)).map(([w, k]) => [w, k - (y.get(w) || 0)]).sort((p, q) => (p[0] < q[0] ? -1 : 1));
  return { weg: rest(a, n), dazu: rest(n, a) };
}

/** Dateiname des gespeicherten Wortstands einer URL (data/quellen-woerter/). */
function wortDateiName(url) {
  return crypto.createHash("sha256").update(url).digest("hex").slice(0, 16) + ".txt";
}

/** Ruft eine Quelle ab: Befund wie im Linkcheck, bei "ok" zusätzlich der Inhalts-Hash. */
async function pruefe(t, { mitHash = false, holen = fetch } = {}) {
  const host = new URL(t.url).hostname;
  const gesperrt = BOT_SPERREN.some((h) => host.endsWith(h));
  const sperre = (grund) => ({ ...t, befund: "uebersprungen", hinweis: `Abruf geblockt (${grund}); im Browser prüfen` });
  // Gesperrte Quellen immer per GET: die Challenge-Seite erkennt man nur am Inhalt.
  const methoden = gesperrt || (mitHash && !t.nurErreichbar) ? ["GET"] : ["HEAD", "GET"];
  for (const methode of methoden) {
    try {
      const r = await holen(t.url, { method: methode, redirect: "follow", signal: AbortSignal.timeout(TIMEOUT_MS), headers: { "user-agent": UA, accept: "*/*" } });
      if (methode === "HEAD" && [403, 405, 501].includes(r.status)) continue;
      if (gesperrt && SPERR_STATUS.includes(r.status)) return sperre("Status " + r.status);
      if (r.status >= 400) return { ...t, befund: "fehler", status: r.status };
      if (aufStartseiteGelandet(t.url, r.url)) return { ...t, befund: "beleg-verloren", status: r.status, ziel: r.url };
      const ok = { ...t, befund: "ok", status: r.status, ziel: gleicheRessource(t.url, r.url) ? null : r.url };
      const bytes = gesperrt || (mitHash && !t.nurErreichbar) ? Buffer.from(await r.arrayBuffer()) : null;
      if (gesperrt && CHALLENGE.test(bytes.toString("utf8"))) return sperre("Challenge-Seite");
      if (mitHash && !t.nurErreichbar) {
        ok.hash = hashInhalt(r.headers.get("content-type"), bytes);
        // Nicht aufzählbar: die Wortliste soll nicht im --json-Bericht landen, nur im Wortprotokoll.
        Object.defineProperty(ok, "woerter", { value: woerterInhalt(r.headers.get("content-type"), bytes), enumerable: false });
      }
      return ok;
    } catch (e) {
      // Fehlt dem Server das Zwischenzertifikat, scheitert Node, Browser und curl laden die Seite (dpa.gov.al, 08.10.2026).
      const code = e.cause && e.cause.code;
      if (TLS_KETTE.includes(code)) return sperre("TLS-Kette des Servers unvollständig, " + code);
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

/** Anbieter komplett unverändert: Top-Level-Datum und alle Feld-Daten auf denselben Tag setzen.
 *  Gleiche Daten erzeugen kein "einzelne Angaben zuletzt am …"; entfernen ginge nicht, weil
 *  Prüfpunkt- und ISO-42001-Felder ein eigenes Prüfdatum brauchen (Build streng, 09.10.). */
function setzeTopGeprueft(text, datum) {
  return text.replace(/"geprueft": "\d{4}-\d{2}-\d{2}"/g, `"geprueft": "${datum}"`);
}

/** Was je Anbieter-Datei geschrieben wird. Nur "quelle"/"wert"-Felder tragen ein geprueft;
 *  "website" ist Stammdatum ohne Prüfanspruch. Ist bei einem Anbieter alles Belegende unverändert,
 *  reicht das Top-Level-Datum; sonst bekommen nur die unveränderten Felder ein eigenes Datum. */
function planeFortschreibung(ordnung, alleUrls) {
  const belegend = (f) => f.schluessel !== "website";
  const unv = new Set([...ordnung.unveraendert, ...(ordnung.uebernommen || [])].map((e) => e.url));
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

/** Von Hand gelesene "verändert"-Quellen gezielt übernehmen: Einträge, deren URL mit einem der
 *  Präfixe beginnt, wandern nach "uebernommen" (neue Referenz, Prüfdatum wie unverändert).
 *  Leere Präfixe zählen nicht — pauschal übernimmt nur --uebernehmen. Eingang bleibt unverändert. */
function teileUebernahme(ordnung, praefixe) {
  const p = praefixe.filter(Boolean);
  const passt = (e) => p.some((x) => e.url.startsWith(x));
  return { ...ordnung, veraendert: ordnung.veraendert.filter((e) => !passt(e)), uebernommen: [...(ordnung.uebernommen || []), ...ordnung.veraendert.filter(passt)] };
}

/**
 * Aufruf von quellenlauf.js prüfen, bevor irgendetwas abgerufen oder geschrieben wird.
 * Grund (09.10.2026): Unbekannte Schalter wurden still ignoriert, ein Tippfehler wie "--trockn"
 * machte aus einem Trockenlauf einen Lauf, der Ledger und Anbieter-Dateien schreibt.
 */
const SCHALTER = new Set(["--trocken", "--uebernehmen"]);
const MIT_WERT = new Set(["--json", "--uebernehmen-nur"]);
function pruefeAufruf(argv) {
  if (argv.includes("--help") || argv.includes("-h")) return { hilfe: true };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (SCHALTER.has(a)) continue;
    if (MIT_WERT.has(a)) {
      const w = argv[i + 1];
      if (!w || w.startsWith("--")) return { fehler: a + " braucht einen Wert" };
      i++;
      continue;
    }
    return { fehler: "unbekannter Schalter: " + a };
  }
  if (argv.includes("--uebernehmen") && argv.includes("--uebernehmen-nur")) return { fehler: "--uebernehmen und --uebernehmen-nur nicht zusammen (pauschal oder gezielt)" };
  return { ok: true };
}

/** Ledger fortschreiben: neu/unverändert → Referenz; verändert → nur neu_hash merken.
 *  erst = Datum des ersten Eintrags, uebernommen = Datum der letzten Übernahme nach Handprüfung (V4):
 *  So unterscheidet der Kasten auf der Profilseite "erstmals gesehen" von "verändert, gelesen, übernommen". */
function fuehreLedger(alt, o, uebernehmen, datum) {
  const l = { ...alt };
  const uebernimm = (e) => ({ hash: e.hash, gesehen: datum, geaendert: datum, erst: (l[e.url] && l[e.url].erst) || datum, uebernommen: datum });
  for (const e of o.neu) l[e.url] = { hash: e.hash, gesehen: datum, geaendert: datum, erst: datum };
  // Von Hand gesetztes nur_erreichbar (mit grund) bleibt erhalten; der Hash wird trotzdem mitgeführt.
  for (const e of o.unveraendert) l[e.url] = e.nurErreichbar ? { nur_erreichbar: true, gesehen: datum } : { ...l[e.url], gesehen: datum, neu_hash: undefined, veraendert_seit: undefined, verschwunden: undefined };
  for (const e of o.veraendert) {
    l[e.url] = uebernehmen ? uebernimm(e) : { ...l[e.url], gesehen: datum, neu_hash: e.hash, veraendert_seit: l[e.url].veraendert_seit || datum };
  }
  for (const e of o.uebernommen || []) l[e.url] = uebernimm(e);
  for (const e of o.verschwunden) l[e.url] = { ...l[e.url], gesehen: datum, verschwunden: e.befund };
  const sortiert = {};
  for (const k of Object.keys(l).sort()) sortiert[k] = JSON.parse(JSON.stringify(l[k]));
  return sortiert;
}

module.exports = { fuehreLedger, DATA_DIR, pruefeAufruf, BOT_SPERREN, sammleUrls, gleicheRessource, aufStartseiteGelandet, normalisiereText, hashInhalt, hashInhaltAlt, woerterInhalt, wortDiff, wortDateiName, pruefe, pruefeAlle, ordneLauf, bestaetigeVeraendert, setzeGeprueft, setzeTopGeprueft, planeFortschreibung, teileUebernahme };
