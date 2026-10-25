"use strict";
// 23.10.2026: setzeGeprueft fügte in den US-Profilen (ein Feld pro Zeile) ein zweites "geprueft" ein.
// JSON.parse nimmt dann still das letzte, also das alte Datum. Doppelte Schlüssel sind darum ein Fehler.
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const DIR = path.join(__dirname, "..", "data", "anbieter");

/** Liefert "datei: schluessel" für jeden Schlüssel, der in einem Objekt mehr als einmal steht. */
function doppelte(text, name) {
  JSON.parse(text); // nur gültiges JSON prüfen
  const funde = [];
  const stapel = [];
  const re = /"((?:[^"\\]|\\.)*)"\s*(:)?|[{}[\]]/g;
  let m;
  while ((m = re.exec(text))) {
    if (m[0] === "{") stapel.push(new Set());
    else if (m[0] === "[") stapel.push(null);
    else if (m[0] === "}" || m[0] === "]") stapel.pop();
    else if (m[2] && stapel.length && stapel[stapel.length - 1]) {
      const satz = stapel[stapel.length - 1];
      if (satz.has(m[1])) funde.push(name + ": " + m[1]);
      satz.add(m[1]);
    }
  }
  return funde;
}

test("doppelte: erkennt einen doppelten Schlüssel, nicht aber gleiche Schlüssel in Geschwistern", () => {
  assert.deepEqual(doppelte('{"a": {"g": 1, "g": 2}, "b": {"g": 3}}', "x"), ["x: g"]);
  assert.deepEqual(doppelte('{"a": [{"g": 1}, {"g": 2}], "t": "{\\"g\\": 1}"}', "x"), []);
});

test("Anbieter-Profile haben keinen Schlüssel doppelt", () => {
  const funde = fs.readdirSync(DIR).filter((f) => f.endsWith(".json"))
    .flatMap((f) => doppelte(fs.readFileSync(path.join(DIR, f), "utf8"), f));
  assert.deepEqual(funde, []);
});
