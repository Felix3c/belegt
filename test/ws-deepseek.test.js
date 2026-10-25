"use strict";
// Widerspruchs-Scan DeepSeek API (Dauerlauf 24.10.2026, Fall-Kandidat 56): die Beleg-Datei muss
// gestempelt und in SHA256SUMS stehen, und jedes Zitat muss wörtlich in den gesicherten Kopien vom 23.10. stehen.
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

const ordner = path.join(__dirname, "..", "belege", "anbieter", "deepseek-api");
const datei = "widerspruchs-scan-2026-10-24.txt";
const norm = (s) => s.replace(/[“”]/g, '"').replace(/’/g, "'").replace(/\s+/g, " ").trim();

test("deepseek-api: Widerspruchs-Scan liegt mit Kopf, Prüfsumme und Stempel vor", () => {
  const text = fs.readFileSync(path.join(ordner, datei), "utf8");
  const kopf = text.split("\n").slice(0, 3).join("\n");
  assert.match(kopf, /^Quelle: https:\/\/cdn\.deepseek\.com\//);
  assert.match(kopf, /Abruf: 2026-10-24 /);
  assert.ok(fs.existsSync(path.join(ordner, datei + ".ots")), "OpenTimestamps-Stempel fehlt");
  const summe = crypto.createHash("sha256").update(fs.readFileSync(path.join(ordner, datei))).digest("hex");
  const sums = fs.readFileSync(path.join(ordner, "SHA256SUMS"), "utf8");
  assert.ok(sums.includes(`${summe} *${datei}`), "Prüfsumme fehlt oder ist veraltet");
  assert.match(fs.readFileSync(path.join(ordner, "QUELLEN.md"), "utf8"), new RegExp(`\\| ${datei} \\|`));
});

test("deepseek-api: jedes Zitat im Scan steht wörtlich in einer Kopie vom 23.10.", () => {
  const text = fs.readFileSync(path.join(ordner, datei), "utf8");
  const kopien = ["nutzungsbedingungen", "open-platform-bedingungen", "datenschutz", "trainingsdaten-v4-1-text"]
    .map((n) => norm(fs.readFileSync(path.join(ordner, `${n}-2026-10-23.txt`), "utf8")));
  const zitate = text.split("\n").filter((z) => z.startsWith("> ")).map((z) => norm(z.slice(2)));
  assert.ok(zitate.length >= 8, `zu wenige Zitate: ${zitate.length}`);
  for (const z of zitate) {
    const teile = z.split(" […] ");
    assert.ok(kopien.some((k) => teile.every((t) => k.includes(t))), `nicht wörtlich belegt: ${z.slice(0, 80)}`);
  }
});
