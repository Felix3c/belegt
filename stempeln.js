#!/usr/bin/env node
"use strict";
/**
 * belegbar.eu — jede neue Belegkopie unter belege/ von außen stempeln (Frage 500, Felix 22.10.2026).
 *
 *   node stempeln.js               stempelt alle Belege ohne .ots daneben (nach jedem neuen Beleg)
 *   node stempeln.js --zaehlen     zeigt nur, wie viele offen sind
 *   node stempeln.js --nachziehen  holt für alle .ots die Bitcoin-Bestätigung (ab ein paar Stunden später),
 *                                  unter belege/ und unter waechter/ (Rohkopien, die waechter.js stempelt)
 *
 * Raus geht nur ein Fingerabdruck (SHA-256 mit Zufallszusatz, als Merkle-Wurzel), nie der Inhalt.
 * Die Arbeit macht ots_stempel.py (OpenTimestamps-Bibliothek), weil das `ots`-Programm unter Windows
 * nicht startet. Ein Stempel beweist „Datei gab es spätestens zu diesem Zeitpunkt“, nicht, wie die
 * Webseite aussah; dafür bleibt die Wayback-Kopie.
 */
const fs = require("fs");
const path = require("path");
const { execFileSync, spawnSync } = require("child_process");
const Z = require("./lib/zeitstempel.js");

const BELEGE = path.join(__dirname, "belege");
const HELFER = path.join(__dirname, "ots_stempel.py");
const STAPEL = 50; // eine Kalender-Anfrage je 50 Dateien

function alleDateien(dir, basis = dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? alleDateien(p, basis) : [path.relative(basis, p)];
  });
}

/** Von Git ignorierte Dateien (abgeleitete Texte, b64, private Auszüge) bekommen keinen Stempel. */
function ohneIgnorierte(liste) {
  if (!liste.length) return liste;
  const r = spawnSync("git", ["check-ignore", "--stdin"], {
    cwd: BELEGE, input: liste.join("\n"), encoding: "utf8",
  });
  if (r.status > 1) throw new Error("git check-ignore: " + r.stderr);
  const ignoriert = new Set(r.stdout.split(/\r?\n/).filter(Boolean));
  return liste.filter((p) => !ignoriert.has(p));
}

const python = (args) => execFileSync("python", ["-I", HELFER, ...args], { cwd: BELEGE, stdio: "inherit" });

const dateien = alleDateien(BELEGE);
if (process.argv.includes("--nachziehen")) {
  for (const gruppe of Z.stapel(Z.otsDateien(dateien), STAPEL)) python(Z.nachziehBefehl(gruppe));
  // WS1: auch die Stempel der Wächter-Rohkopien (waechter/, waechter/pilot/ …), Pfade relativ zu waechter/.
  const WAECHTER = path.join(__dirname, "waechter");
  for (const gruppe of Z.stapel(Z.otsDateien(Z.alleDateien(WAECHTER)), STAPEL)) {
    execFileSync("python", ["-I", HELFER, ...Z.nachziehBefehl(gruppe)], { cwd: WAECHTER, stdio: "inherit" });
  }
} else {
  const offen = ohneIgnorierte(Z.offeneBelege(dateien));
  console.log(`${offen.length} Beleg(e) ohne Stempel`);
  if (!process.argv.includes("--zaehlen")) for (const gruppe of Z.stapel(offen, STAPEL)) python(Z.stempelBefehl(gruppe));
}
