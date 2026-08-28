#!/usr/bin/env node
/**
 * belegbar.eu — Monatlicher Quellenlauf.
 * Ruft jede Quellen-URL aus data/anbieter/*.json ab, hasht den sichtbaren Inhalt und vergleicht
 * mit data/quellen-hashes.json. Ergebnis sind drei Listen:
 *   unverändert  → Prüfdatum in den Anbieter-Dateien wird fortgeschrieben (die Quelle sagt noch dasselbe)
 *   verändert    → nur Bericht; diese Quellen liest ein Mensch. Danach: --uebernehmen
 *   verschwunden → nur Bericht; Status im Profil von Hand zurücksetzen (siehe linkcheck.js)
 *
 * Aufruf: node quellenlauf.js [--trocken] [--uebernehmen] [--json datei]
 *   --trocken      nichts schreiben, nur Bericht
 *   --uebernehmen  die beim letzten Lauf als "verändert" gemeldeten Hashes als neue Referenz übernehmen
 *                  (nur nach Handprüfung — sonst gilt die Änderung nächsten Monat als "unverändert")
 *   LAUF_DATUM=2026-09-28 setzt das Datum (Standard: heute)
 */
"use strict";

const fs = require("fs");
const path = require("path");
const Q = require("./lib/quellen.js");

const LEDGER_DATEI = path.join(__dirname, "data", "quellen-hashes.json");
const arg = (n) => process.argv.includes(n);
const DATUM = process.env.LAUF_DATUM || new Date().toISOString().slice(0, 10);
if (!/^\d{4}-\d{2}-\d{2}$/.test(DATUM)) { console.error("LAUF_DATUM muss YYYY-MM-DD sein"); process.exit(2); }

function liesLedger() {
  try { return JSON.parse(fs.readFileSync(LEDGER_DATEI, "utf8")); } catch { return {}; }
}

/** Ledger fortschreiben: neu/unverändert → Referenz; verändert → nur neu_hash merken. */
function neuerLedger(alt, o, uebernehmen) {
  const l = { ...alt };
  for (const e of o.neu) l[e.url] = { hash: e.hash, gesehen: DATUM, geaendert: DATUM };
  for (const e of o.unveraendert) l[e.url] = e.nurErreichbar ? { nur_erreichbar: true, gesehen: DATUM } : { ...l[e.url], gesehen: DATUM, neu_hash: undefined };
  // Von Hand gesetztes nur_erreichbar (mit grund) bleibt erhalten; der Hash wird trotzdem mitgeführt.
  for (const e of o.veraendert) {
    l[e.url] = uebernehmen
      ? { hash: e.hash, gesehen: DATUM, geaendert: DATUM }
      : { ...l[e.url], gesehen: DATUM, neu_hash: e.hash, veraendert_seit: l[e.url].veraendert_seit || DATUM };
  }
  for (const e of o.verschwunden) l[e.url] = { ...l[e.url], gesehen: DATUM, verschwunden: e.befund };
  const sortiert = {};
  for (const k of Object.keys(l).sort()) sortiert[k] = JSON.parse(JSON.stringify(l[k]));
  return sortiert;
}

/** Anbieter-Dateien: Prüfdatum fortschreiben. Gibt die geänderten Dateinamen zurück. */
function schreibeGeprueft(plan, trocken) {
  const geaendert = [];
  for (const [datei, p] of Object.entries(plan)) {
    const pfad = path.join(Q.DATA_DIR, datei);
    const alt = fs.readFileSync(pfad, "utf8");
    let neu = p.modus === "top" ? Q.setzeTopGeprueft(alt, DATUM) : alt;
    if (p.modus === "felder") for (const u of p.urls) neu = Q.setzeGeprueft(neu, u, DATUM);
    if (neu === alt) continue;
    JSON.parse(neu); // Wenn das nicht parst, ist die Zeilen-Ersetzung schiefgegangen — lieber abbrechen.
    if (!trocken) fs.writeFileSync(pfad, neu);
    geaendert.push(datei + " (" + p.modus + (p.modus === "felder" ? ", " + p.urls.length + " Felder" : "") + ")");
  }
  return geaendert;
}

const zeile = (e) => "  " + e.anbieter + " " + e.feld + (e.felder.length > 1 ? " (+" + (e.felder.length - 1) + ")" : "") + "\n    " + e.url;

(async () => {
  const trocken = arg("--trocken"), uebernehmen = arg("--uebernehmen");
  const alt = liesLedger();
  const erstlauf = Object.keys(alt).length === 0;
  const urls = Q.sammleUrls();
  process.stderr.write("Quellenlauf " + DATUM + ": " + urls.length + " URLs" + (erstlauf ? " (Erstlauf — Ledger wird nur befüllt)" : "") + (trocken ? " [trocken]" : "") + " …\n");

  const ergebnis = await Q.pruefeAlle(urls, { mitHash: true });
  const o = await Q.bestaetigeVeraendert(Q.ordneLauf(ergebnis, alt), alt);

  const jsonIdx = process.argv.indexOf("--json");
  if (jsonIdx > -1 && process.argv[jsonIdx + 1]) fs.writeFileSync(process.argv[jsonIdx + 1], JSON.stringify({ datum: DATUM, ...o }, null, 2));

  console.log("\nGeprüft: " + ergebnis.length + " — unverändert: " + o.unveraendert.length + ", verändert: " + o.veraendert.length + ", verschwunden: " + o.verschwunden.length + ", neu: " + o.neu.length + ", übersprungen: " + o.uebersprungen.length);

  if (o.veraendert.length) {
    console.log("\nVERÄNDERT (" + o.veraendert.length + ") — diese Quellen von Hand lesen. Sagt sie noch dasselbe? Dann Feld-geprueft setzen;");
    console.log("sagt sie etwas anderes? Dann Angabe/Status/Anmerkung anpassen. Danach: node quellenlauf.js --uebernehmen");
    o.veraendert.forEach((e) => console.log(zeile(e) + (alt[e.url].veraendert_seit ? "\n    offen seit " + alt[e.url].veraendert_seit : "")));
  }
  if (o.verschwunden.length) {
    console.log("\nVERSCHWUNDEN (" + o.verschwunden.length + ") — Beleg trägt nicht mehr. Status im Profil zurücksetzen, tote URL in der Anmerkung festhalten:");
    o.verschwunden.forEach((e) => console.log("  [" + e.befund + (e.status ? " " + e.status : "") + "]" + zeile(e).slice(1) + (e.ziel ? "\n    -> " + e.ziel : "") + (e.hinweis ? "\n    " + e.hinweis : "")));
  }

  const plan = erstlauf ? {} : Q.planeFortschreibung(o, urls);
  const dateien = schreibeGeprueft(plan, trocken);
  if (dateien.length) console.log("\nPrüfdatum " + DATUM + (trocken ? " würde fortgeschrieben" : " fortgeschrieben") + " in " + dateien.length + " Anbieter-Dateien:\n  " + dateien.join("\n  "));

  if (!trocken) fs.writeFileSync(LEDGER_DATEI, JSON.stringify(neuerLedger(alt, o, uebernehmen), null, 2) + "\n");
  console.log("\n" + (trocken ? "Trockenlauf, nichts geschrieben." : "Ledger geschrieben: data/quellen-hashes.json.") + (dateien.length && !trocken ? " Jetzt: node build.js, dann committen." : ""));
  if (o.veraendert.length || o.verschwunden.length) process.exit(1);
})();
