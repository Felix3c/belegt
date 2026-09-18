#!/usr/bin/env node
"use strict";
/** CLI: node dossier.js <anbieter-id> [--datum YYYY-MM-DD] [--fuer "Name, Funktion, Organisation"] [--name DATEI.md]
 *  Schreibt dossiers/<id>-<datum>.md. Ändert nichts an data/ oder der Live-Seite. */
const { schreibeDossier } = require("./lib/dossier.js");

const args = process.argv.slice(2);
const id = args.find((a) => !a.startsWith("--"));
const opt = (k) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : undefined; };
if (!id) { console.error("Aufruf: node dossier.js <anbieter-id> [--datum YYYY-MM-DD] [--fuer \"...\"] [--name DATEI.md]"); process.exit(2); }

const datum = opt("--datum") || new Date().toISOString().slice(0, 10);
const r = schreibeDossier(id, { datum, auftraggeber: opt("--fuer"), dateiname: opt("--name") });
const b = r.zeilen.filter((z) => z.belegbar).length;
console.log(`${r.pfad}: ${r.zeilen.length} Felder, ${b} belegt, ${r.zeilen.length - b} nicht belegbar, ${r.faelle.length} Fälle`);
