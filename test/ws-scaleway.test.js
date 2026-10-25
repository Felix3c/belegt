"use strict";
// Widerspruchs-Scan Scaleway Generative APIs (Dauerlauf 24.10.2026, Fall-Kandidat 57): die Beleg-Datei muss
// gestempelt und in SHA256SUMS stehen, und jedes Zitat muss wörtlich in den gesicherten Kopien stehen.
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

const ordner = path.join(__dirname, "..", "belege", "anbieter", "scaleway");
const datei = "widerspruchs-scan-2026-10-24.txt";
const norm = (s) => s.replace(/[“”]/g, '"').replace(/’/g, "'").replace(/\s+/g, " ").trim();

test("scaleway: Widerspruchs-Scan liegt mit Kopf, Prüfsumme und Stempel vor", () => {
  const text = fs.readFileSync(path.join(ordner, datei), "utf8");
  const kopf = text.split("\n").slice(0, 3).join("\n");
  assert.match(kopf, /^Quelle: https:\/\/www\.scaleway\.com\//);
  assert.match(kopf, /Abruf: 2026-10-24 /);
  const sums = fs.readFileSync(path.join(ordner, "SHA256SUMS"), "utf8");
  for (const d of [datei, "specific-conditions-ai-2026-10-24.txt"]) {
    assert.ok(fs.existsSync(path.join(ordner, d + ".ots")), `OpenTimestamps-Stempel fehlt: ${d}`);
    const summe = crypto.createHash("sha256").update(fs.readFileSync(path.join(ordner, d))).digest("hex");
    assert.ok(sums.includes(`${summe} *${d}`), `Prüfsumme fehlt oder ist veraltet: ${d}`);
    assert.match(fs.readFileSync(path.join(ordner, "QUELLEN.md"), "utf8"), new RegExp(`\\| ${d} \\|`));
  }
});

test("scaleway: jedes Zitat im Scan steht wörtlich in einer gesicherten Kopie", () => {
  const text = fs.readFileSync(path.join(ordner, datei), "utf8");
  const kopien = ["produktseite-genapis-2026-10-22", "datenschutz-genapis-2026-10-22", "specific-conditions-ai-2026-10-24"]
    .map((n) => norm(fs.readFileSync(path.join(ordner, `${n}.txt`), "utf8")));
  const zitate = text.split("\n").filter((z) => z.startsWith("> ")).map((z) => norm(z.slice(2)));
  assert.ok(zitate.length >= 7, `zu wenige Zitate: ${zitate.length}`);
  for (const z of zitate) {
    const teile = z.split(" […] ");
    assert.ok(kopien.some((k) => teile.every((t) => k.includes(t))), `nicht wörtlich belegt: ${z.slice(0, 80)}`);
  }
});
