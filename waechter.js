#!/usr/bin/env node
/**
 * belegbar.eu — Änderungs-Wächter für Anbieter ohne Profil (z. B. US-Dienste).
 * Gleiche Logik wie quellenlauf.js, aber die Quellen stehen in einer eigenen Liste statt in
 * data/anbieter/*.json. Liste, Ledger, Wortstände und Rohkopien liegen in waechter/ (gitignored,
 * die Auswahl der beobachteten Dienste ist Strategie und nicht öffentlich).
 *
 * Aufruf: [WAECHTER_DIR=waechter/pilot] node waechter.js [--trocken] [--uebernehmen]
 *   --trocken      nichts schreiben, nur Bericht
 *   --uebernehmen  "verändert" nach Handprüfung als neue Referenz übernehmen
 *   LAUF_DATUM=2026-10-15 setzt das Datum (Standard: heute)
 *
 * Bei "neu" und "verändert" wird eine Rohkopie mit SHA-256 nach waechter/roh/<datum>/ gelegt,
 * damit eine Meldung später einen Beleg mit Datum hat.
 */
"use strict";

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const Q = require("./lib/quellen.js");

// WAECHTER_DIR=waechter/pilot trennt z. B. eine Pilot-Liste vom Hauptbestand; nur unter waechter/ (gitignored).
function ordner(env) {
  const basis = path.join(__dirname, "waechter");
  if (!env.WAECHTER_DIR) return basis;
  const ziel = path.resolve(__dirname, env.WAECHTER_DIR);
  if (!ziel.startsWith(basis + path.sep)) throw new Error("WAECHTER_DIR muss unter waechter/ liegen: " + env.WAECHTER_DIR);
  return ziel;
}

const DIR = ordner(process.env);
const LISTE = path.join(DIR, "liste.json");
const LEDGER = path.join(DIR, "ledger.json");
const WORT_DIR = path.join(DIR, "woerter");
const UA = "Mozilla/5.0 (compatible; belegbar.eu-linkcheck/1.0; +https://belegbar.eu/)";
const WORT_ZEIGEN = 15;
// Weniger Wörter heißt meist: Inhalt lädt erst im Browser (Notion, 16.10.2026: 15 Wörter). Der Hash bleibt
// dann gleich, auch wenn sich die Liste ändert, der Wächter wäre still blind.
const MIN_WOERTER = 100;

function ladeListe(obj) {
  if (!obj || !Array.isArray(obj.quellen)) throw new Error("Liste braucht ein Feld quellen (Array)");
  const gesehen = new Set();
  return obj.quellen.map((q, i) => {
    for (const f of ["anbieter", "art", "url"]) if (!q[f]) throw new Error(`Eintrag ${i}: Feld ${f} fehlt`);
    if (!q.url.startsWith("https://")) throw new Error(`Eintrag ${i}: nur https-Adressen`);
    if (gesehen.has(q.url)) throw new Error(`Eintrag ${i}: URL doppelt: ${q.url}`);
    gesehen.add(q.url);
    return { anbieter: q.anbieter, art: q.art, url: q.url };
  });
}

function rohName(q, contentType) {
  const ct = contentType || "";
  const endung = /html/i.test(ct) ? "html" : /pdf/i.test(ct) ? "pdf" : /json/i.test(ct) ? "json" : "bin";
  return `${q.anbieter}-${q.art}.${endung}`;
}

const zeige = (liste) => liste.slice(0, WORT_ZEIGEN).map(([w, k]) => (k > 1 ? k + "× " : "") + JSON.stringify(w)).join(", ") + (liste.length > WORT_ZEIGEN ? ` … (+${liste.length - WORT_ZEIGEN})` : "");

function berichtZeilen(o) {
  const z = [];
  for (const e of o.veraendert) {
    z.push(`VERÄNDERT: ${e.anbieter} ${e.art} ${e.url}`);
    if (e.wortDiff) z.push(`    weg: ${zeige(e.wortDiff.weg) || "–"}`, `    dazu: ${zeige(e.wortDiff.dazu) || "–"}`);
  }
  for (const e of o.verschwunden) z.push(`VERSCHWUNDEN: ${e.anbieter} ${e.art} ${e.url} (${e.befund}${e.status ? " " + e.status : ""})`);
  for (const e of o.uebersprungen) z.push(`ÜBERSPRUNGEN: ${e.anbieter} ${e.art} ${e.url} (${e.hinweis})`);
  for (const e of [...o.neu, ...o.unveraendert, ...o.veraendert]) {
    if (Array.isArray(e.woerter) && e.woerter.length < MIN_WOERTER) z.push(`DÜNN: ${e.anbieter} ${e.art} ${e.url} (${e.woerter.length} Wörter; lädt vermutlich erst im Browser, Wächter hier blind)`);
  }
  z.push(`neu ${o.neu.length}, unverändert ${o.unveraendert.length}, verändert ${o.veraendert.length}, verschwunden ${o.verschwunden.length}, übersprungen ${o.uebersprungen.length}`);
  return z;
}

// Notion-Seiten: die HTML-Hülle belegt nichts (~15 Wörter). Kamen die Wörter aus der Seiten-API, ist ihr
// Text genau das, worüber der Ledger-Hash läuft; der SHA-Anfang in SHA256SUMS ist dann gleich dem Ledger-Hash.
// Die Wörter sind sortiert (so hasht quellen.js), Lesereihenfolge geht verloren. Sonst null: Abruf nötig.
function rohBeleg(q) {
  if (!Q.notionSeite(q.url) || !Array.isArray(q.woerter) || !q.woerter.length) return null;
  const bytes = Buffer.from(q.woerter.join(" "), "utf8");
  if (crypto.createHash("sha256").update(bytes).digest("hex").slice(0, 16) !== q.hash) return null;
  return { name: `${q.anbieter}-${q.art}.txt`, bytes };
}

// Alle Belege ohne Abruf: der Wort-Beleg und, wenn die API die Seitenreihenfolge lieferte, der Text als
// `-lesefolge.txt` (eine Zeile je Block, Tabellenzeilen mit " | "). Nur der liefert ein wörtliches Zitat.
function rohBelege(q) {
  const wort = rohBeleg(q);
  if (!wort) return [];
  const belege = [wort];
  if (Array.isArray(q.lesefolge) && q.lesefolge.length) {
    belege.push({ name: `${q.anbieter}-${q.art}-lesefolge.txt`, bytes: Buffer.from(q.lesefolge.join("\n") + "\n", "utf8") });
  }
  return belege;
}

async function sichereRoh(q, datum) {
  let belege = rohBelege(q);
  if (!belege.length) {
    const r = await fetch(q.url, { headers: { "user-agent": UA }, signal: AbortSignal.timeout(20000) });
    belege = [{ name: rohName(q, r.headers.get("content-type")), bytes: Buffer.from(await r.arrayBuffer()) }];
  }
  const ziel = path.join(DIR, "roh", datum);
  fs.mkdirSync(ziel, { recursive: true });
  for (const { name, bytes } of belege) {
    fs.writeFileSync(path.join(ziel, name), bytes);
    const sha = crypto.createHash("sha256").update(bytes).digest("hex");
    fs.appendFileSync(path.join(ziel, "SHA256SUMS"), `${sha}  ${name}  ${q.url}\n`);
  }
}

async function main(argv) {
  const trocken = argv.includes("--trocken"), uebernehmen = argv.includes("--uebernehmen");
  const unbekannt = argv.filter((a) => !["--trocken", "--uebernehmen"].includes(a));
  if (unbekannt.length) { console.error("Abbruch, unbekannter Schalter: " + unbekannt.join(" ")); process.exit(2); }
  const datum = process.env.LAUF_DATUM || Q.heuteLokal();
  const quellen = ladeListe(JSON.parse(fs.readFileSync(LISTE, "utf8")));
  const ledger = fs.existsSync(LEDGER) ? JSON.parse(fs.readFileSync(LEDGER, "utf8")) : {};
  const ergebnis = await Q.pruefeAlle(quellen, { mitHash: true }, 4);
  const o = await Q.bestaetigeVeraendert(Q.ordneLauf(ergebnis, ledger), ledger);
  for (const e of o.veraendert) {
    let alt = null;
    try { alt = fs.readFileSync(path.join(WORT_DIR, Q.wortDateiName(e.url)), "utf8").split("\n").filter(Boolean); } catch { /* kein Wortstand */ }
    if (alt && e.woerter) e.wortDiff = Q.wortDiff(alt, e.woerter);
  }
  console.log(`Wächter ${datum}: ${quellen.length} Quellen`);
  for (const zeile of berichtZeilen(o)) console.log(zeile);
  if (trocken) return;
  for (const e of [...o.neu, ...o.veraendert]) await sichereRoh(e, datum);
  const woerterZiele = [...o.neu, ...(uebernehmen ? o.veraendert : []), ...o.unveraendert.filter((e) => !fs.existsSync(path.join(WORT_DIR, Q.wortDateiName(e.url))))];
  for (const e of woerterZiele) {
    if (!e.woerter) continue;
    fs.mkdirSync(WORT_DIR, { recursive: true });
    fs.writeFileSync(path.join(WORT_DIR, Q.wortDateiName(e.url)), e.woerter.join("\n") + "\n");
  }
  fs.writeFileSync(LEDGER, JSON.stringify(Q.fuehreLedger(ledger, o, uebernehmen, datum), null, 2) + "\n");
}

module.exports = { ladeListe, rohName, rohBeleg, rohBelege, berichtZeilen, ordner };
if (require.main === module) main(process.argv.slice(2)).catch((e) => { console.error(e); process.exit(1); });
