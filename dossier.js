#!/usr/bin/env node
"use strict";
/** CLI: node dossier.js <anbieter-id> [--datum YYYY-MM-DD] [--fuer "Name, Funktion, Organisation"] [--name DATEI.md] [--vorgaben avv,training,…]
 *  Schreibt dossiers/<id>-<datum>.md. Ändert nichts an data/ oder der Live-Seite. */
const { schreibeDossier } = require("./lib/dossier.js");

const args = process.argv.slice(2);
const id = args.find((a) => !a.startsWith("--"));
const opt = (k) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : undefined; };
if (!id) { console.error("Aufruf: node dossier.js <anbieter-id> [--datum YYYY-MM-DD] [--fuer \"...\"] [--name DATEI.md] [--vorgaben avv,training,…]"); process.exit(2); }

const datum = opt("--datum") || new Date().toISOString().slice(0, 10);
// Vorgaben des Auftraggebers als Kennungen aus lib/vorgaben.js; ohne Angabe gelten alle 15.
const vorgaben = opt("--vorgaben") ? opt("--vorgaben").split(",").map((x) => x.trim()).filter(Boolean) : null;
const r = schreibeDossier(id, { datum, auftraggeber: opt("--fuer"), dateiname: opt("--name"), vorgaben });
const b = r.zeilen.filter((z) => z.belegbar).length;
console.log(`${r.pfad}: ${r.zeilen.length} Felder, ${b} belegt, ${r.zeilen.length - b} nicht belegbar, ${r.faelle.length} Fälle, Ergebnis: ${r.ergebnis.gesamt}`);
