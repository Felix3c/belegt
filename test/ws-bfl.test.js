"use strict";
// Widerspruchs-Scan Black Forest Labs (Dauerlauf 24.10.2026, Fall-Kandidat 60): die Beleg-Datei muss
// gestempelt und in SHA256SUMS stehen, und jedes Zitat muss wörtlich in den gesicherten Kopien stehen.
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

const ordner = path.join(__dirname, "..", "belege", "anbieter", "black-forest-labs");
const datei = "widerspruchs-scan-2026-10-24.txt";
const KOPIEN = ["enterprise-2026-10-24", "eu-api-service-terms-2026-10-24", "privacy-policy-2026-10-24", "integration-guide-2026-10-24"];
const norm = (s) => s.replace(/[“”]/g, '"').replace(/’/g, "'").replace(/\s+/g, " ").trim();

test("bfl: Widerspruchs-Scan liegt mit Kopf, Prüfsumme und Stempel vor", () => {
  const text = fs.readFileSync(path.join(ordner, datei), "utf8");
  const kopf = text.split("\n").slice(0, 3).join("\n");
  assert.match(kopf, /^Quelle: https:\/\/bfl\.ai\//);
  assert.match(kopf, /Abruf: 2026-10-24 /);
  const sums = fs.readFileSync(path.join(ordner, "SHA256SUMS"), "utf8");
  for (const d of [datei, ...KOPIEN.map((n) => `${n}.txt`)]) {
    assert.ok(fs.existsSync(path.join(ordner, d + ".ots")), `OpenTimestamps-Stempel fehlt: ${d}`);
    const summe = crypto.createHash("sha256").update(fs.readFileSync(path.join(ordner, d))).digest("hex");
    assert.ok(sums.includes(`${summe} *${d}`), `Prüfsumme fehlt oder ist veraltet: ${d}`);
    assert.match(fs.readFileSync(path.join(ordner, "QUELLEN.md"), "utf8"), new RegExp(`\| ${d} \|`));
  }
});

test("bfl: jedes Zitat im Scan steht wörtlich in einer gesicherten Kopie", () => {
  const text = fs.readFileSync(path.join(ordner, datei), "utf8");
  const kopien = KOPIEN
    .map((n) => norm(fs.readFileSync(path.join(ordner, `${n}.txt`), "utf8")));
  const zitate = text.split("\n").filter((z) => z.startsWith("> ")).map((z) => norm(z.slice(2)));
  assert.ok(zitate.length >= 6, `zu wenige Zitate: ${zitate.length}`);
  for (const z of zitate) {
    const teile = z.split(" […] ");
    assert.ok(kopien.some((k) => teile.every((t) => k.includes(t))), `nicht wörtlich belegt: ${z.slice(0, 80)}`);
  }
});
