#!/usr/bin/env node
/**
 * belegbar.eu — Quellen-Check.
 * Prüft jede in data/anbieter/*.json hinterlegte Quellen-URL auf Erreichbarkeit.
 * Aufruf: node linkcheck.js [--json datei]   (Logik in lib/quellen.js; monatlicher Inhaltsvergleich: quellenlauf.js)
 *
 * Warum nicht nur der Statuscode: Eine tote Belegseite antwortet oft mit 200 — weil der
 * Server auf die Startseite weiterleitet. Genau so ist am 24.08.2026 STACKITs AVV-PDF
 * verschwunden. Deshalb bewerten wir zusätzlich das Ziel der Weiterleitung: Landet eine
 * tiefe URL auf einer Startseite, gilt der Beleg als verloren, nicht als erreichbar.
 */
"use strict";

const fs = require("fs");
const Q = require("./lib/quellen.js");

(async () => {
  const urls = Q.sammleUrls();
  process.stderr.write("Prüfe " + urls.length + " Quellen-URLs …\n");
  const ergebnis = await Q.pruefeAlle(urls);

  const jsonIdx = process.argv.indexOf("--json");
  if (jsonIdx > -1 && process.argv[jsonIdx + 1]) fs.writeFileSync(process.argv[jsonIdx + 1], JSON.stringify(ergebnis, null, 2));

  const zaehl = {};
  ergebnis.forEach((e) => (zaehl[e.befund] = (zaehl[e.befund] || 0) + 1));
  const befunde = ergebnis.filter((e) => e.befund !== "ok" && e.befund !== "uebersprungen");
  const umgezogen = ergebnis.filter((e) => e.befund === "ok" && e.ziel);

  console.log("\nGeprüft: " + ergebnis.length + " Quellen — " + Object.entries(zaehl).map(([k, v]) => k + ": " + v).join(", "));

  if (umgezogen.length) {
    console.log("\nUmgezogen (" + umgezogen.length + ") — Ziel erreichbar, aber die URL zeigt woanders hin.");
    console.log("Kein Befund, aber ein Kandidat fuers Kanonisieren: Eine Weiterleitung von heute ist der 404 von morgen.");
    umgezogen.forEach((e) => console.log("  " + e.anbieter + " " + e.feld + "\n    " + e.url + "\n    -> " + e.ziel));
  }
  if (befunde.length) {
    console.log("\nBEFUNDE — diese Belege tragen nicht mehr:");
    befunde.forEach((e) => console.log("  [" + e.befund + (e.status ? " " + e.status : "") + "] " + e.anbieter + " " + e.feld + "\n    " + e.url + (e.ziel ? "\n    -> " + e.ziel : "") + (e.hinweis ? "\n    " + e.hinweis : "")));
    console.log("\nEin verlorener Beleg heißt nicht, dass die Eigenschaft entfallen ist — er heißt,");
    console.log("dass sie nicht mehr nachweisbar ist. Status im Profil entsprechend zurücksetzen.");
    process.exit(1);
  }
  console.log("\nAlle Belege tragen.");
})();
