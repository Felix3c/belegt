"use strict";
/** belegbar.eu — äußerer Zeitstempel für eigene Belegkopien (Frage 500, Felix 22.10.2026).
 *  Bisher ruhte das Datum unserer Belege nur auf der eigenen Git-Historie. OpenTimestamps stempelt
 *  den SHA-256 jeder Belegdatei; der Beweis liegt als `<datei>.ots` daneben. Raus geht nur der
 *  Fingerabdruck, nie der Inhalt. Verzeichnisdateien (SHA256SUMS, QUELLEN.md, LIESMICH) ändern sich
 *  mit jedem neuen Beleg und werden darum nicht gestempelt. */

const fs = require("fs");
const path = require("path");

const VERZEICHNIS = new Set(["SHA256SUMS", "QUELLEN.md"]);

const norm = (p) => p.replace(/\\/g, "/");
const name = (p) => norm(p).split("/").pop();

function istBeleg(pfad) {
  const n = name(pfad);
  if (n.endsWith(".ots")) return false;
  if (VERZEICHNIS.has(n)) return false;
  if (/^LIESMICH/i.test(n)) return false;
  return true;
}

/** Belege (relativ zu belege/) ohne Stempel daneben, sortiert. */
function offeneBelege(dateien) {
  const alle = dateien.map(norm);
  const gestempelt = new Set(alle.filter((p) => p.endsWith(".ots")).map((p) => p.slice(0, -4)));
  return alle.filter((p) => istBeleg(p) && !gestempelt.has(p)).sort();
}

function stapel(liste, groesse) {
  const out = [];
  for (let i = 0; i < liste.length; i += groesse) out.push(liste.slice(i, i + groesse));
  return out;
}

const stempelBefehl = (dateien) => ["stamp", ...dateien];
const nachziehBefehl = (ots) => ["upgrade", ...ots];

/** Alle Dateien unter dir, relativ und mit "/"; fehlt der Ordner, leer (Wächter ohne Rohkopien). */
function alleDateien(dir, basis = dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? alleDateien(p, basis) : [norm(path.relative(basis, p))];
  });
}

const otsDateien = (dateien) => dateien.map(norm).filter((p) => p.endsWith(".ots")).sort();

/** WS1: Stempel-Befehle für die Rohkopien des Wächters (roh/<datum>/…). Der Wächter-Ordner ist
 *  gitignored, darum hier ohne git check-ignore; SHA256SUMS bleibt wie bei belege/ ungestempelt. */
const rohStempelPlan = (rohDateien, groesse) => stapel(offeneBelege(rohDateien), groesse).map(stempelBefehl);

module.exports = { istBeleg, offeneBelege, stapel, stempelBefehl, nachziehBefehl, alleDateien, otsDateien, rohStempelPlan };
