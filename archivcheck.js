#!/usr/bin/env node
/**
 * belegbar.eu — Archiv-Check der Fälle.
 * Prüft für jedes Zitat in data/faelle/*.json, ob die Archivkopie abrufbar ist UND das Zitat wörtlich enthält.
 * Aufruf: node archivcheck.js   (Logik in lib/archiv.js; Erreichbarkeit der Profil-Quellen: linkcheck.js)
 * PDF-Kopien: byte-gleich zur geprüften Rohkopie (sha256 am Zitat) statt Textsuche.
 * Exit 1 bei fehlender Kopie, Abruffehler oder fehlendem Zitat.
 */
"use strict";

const fs = require("fs");
const path = require("path");
const A = require("./lib/archiv.js");

const DIR = path.join(__dirname, "data", "faelle");

(async () => {
  const zitate = fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".json"))
    .flatMap((f) => A.sammleFallZitate(JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8"))));
  process.stderr.write("Prüfe " + zitate.length + " Zitate gegen ihre Archivkopie …\n");

  const seiten = new Map(); // dieselbe Kopie nur einmal laden
  const befunde = [];
  for (const z of zitate) {
    const wo = z.fall + " " + z.feld + "[" + z.nr + "]";
    if (!z.archiv) { befunde.push(wo + ": keine Archivkopie hinterlegt (" + z.quelle + ")"); continue; }
    const url = A.rohUrl(z.archiv);
    if (!seiten.has(url)) {
      try {
        const r = await fetch(url, { signal: AbortSignal.timeout(60000) });
        seiten.set(url, r.ok ? Buffer.from(await r.arrayBuffer()) : new Error("HTTP " + r.status));
      } catch (e) {
        seiten.set(url, e);
      }
    }
    const seite = seiten.get(url);
    if (seite instanceof Error) { befunde.push(wo + ": Archivkopie nicht abrufbar (" + seite.message + ") " + z.archiv); continue; }
    if (A.istPdf(seite)) {
      const p = A.pdfTraegt(seite, z.sha256);
      if (!p.ok) befunde.push(wo + ": " + p.grund + " " + z.archiv);
      continue;
    }
    const r = A.zitatInText(z.zitat, seite.toString("utf8"));
    if (!r.ok) befunde.push(wo + ": Zitat fehlt in der Archivkopie " + z.archiv + "\n    fehlt: " + r.fehlt.join(" | "));
  }

  console.log("Geprüft: " + zitate.length + " Zitate, " + seiten.size + " Archivkopien.");
  if (!befunde.length) { console.log("Alle Zitate stehen wörtlich in ihrer Archivkopie."); return; }
  console.log("\nBEFUNDE:\n  " + befunde.join("\n  "));
  process.exitCode = 1;
})();
