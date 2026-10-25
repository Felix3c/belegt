"use strict";
// Das Dossier nennt profil.geprueft „letzte Prüfung aller Quellen“. Es darf darum nie älter sein als das
// älteste Einzel-Prüfdatum (sonst steht ein alter Stand oben, obwohl jeder Wert neuer geprüft ist) und nie
// jünger (sonst behauptet es eine Prüfung, die für einen Wert nicht stattfand). 25.10.2026: Aleph Alpha stand
// auf 08.10., ältester Wert 15.10.; alle anderen 32 Profile hielten die Regel schon.
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const ordner = path.join(__dirname, "..", "data", "anbieter");

function feldDaten(o, top = true, aus = []) {
  if (Array.isArray(o)) o.forEach((v) => feldDaten(v, false, aus));
  else if (o && typeof o === "object") {
    if (!top && typeof o.geprueft === "string") aus.push(o.geprueft);
    Object.values(o).forEach((v) => feldDaten(v, false, aus));
  }
  return aus;
}

test("profil.geprueft ist das älteste Prüfdatum der Einzelwerte", () => {
  const falsch = [];
  for (const datei of fs.readdirSync(ordner).filter((f) => f.endsWith(".json"))) {
    const p = JSON.parse(fs.readFileSync(path.join(ordner, datei), "utf8"));
    const daten = feldDaten(p).sort();
    if (!daten.length) continue;
    if (p.geprueft !== daten[0]) falsch.push(`${p.id}: Profil ${p.geprueft}, ältester Wert ${daten[0]}`);
  }
  assert.deepEqual(falsch, []);
});
