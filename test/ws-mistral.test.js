"use strict";
// Widerspruchs-Scan Mistral AI (Dauerlauf 24.10.2026, Fall-Kandidat 58): die Beleg-Datei muss
// gestempelt und in SHA256SUMS stehen, und jedes Zitat muss wörtlich in den gesicherten Kopien stehen.
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

const ordner = path.join(__dirname, "..", "belege", "anbieter", "mistral");
const datei = "widerspruchs-scan-2026-10-24.txt";
const KOPIEN = ["ankuendigung-large-4-2026-10-24", "modellseite-large-4-2026-10-24", "sovereign-ai-2026-10-24", "la-plateforme-2026-10-24", "commercial-terms-2026-10-24", "dpa-2026-10-24"];
const norm = (s) => s.replace(/[“”]/g, '"').replace(/’/g, "'").replace(/\s+/g, " ").trim();

test("mistral: Widerspruchs-Scan liegt mit Kopf, Prüfsumme und Stempel vor", () => {
  const text = fs.readFileSync(path.join(ordner, datei), "utf8");
  const kopf = text.split("\n").slice(0, 3).join("\n");
  assert.match(kopf, /^Quelle: https:\/\/mistral\.ai\//);
  assert.match(kopf, /Abruf: 2026-10-24 /);
  const sums = fs.readFileSync(path.join(ordner, "SHA256SUMS"), "utf8");
  for (const d of [datei, ...KOPIEN.map((n) => `${n}.txt`)]) {
    assert.ok(fs.existsSync(path.join(ordner, d + ".ots")), `OpenTimestamps-Stempel fehlt: ${d}`);
    const summe = crypto.createHash("sha256").update(fs.readFileSync(path.join(ordner, d))).digest("hex");
    assert.ok(sums.includes(`${summe} *${d}`), `Prüfsumme fehlt oder ist veraltet: ${d}`);
    assert.match(fs.readFileSync(path.join(ordner, "QUELLEN.md"), "utf8"), new RegExp(`\\| ${d} \\|`));
  }
});

test("mistral: jedes Zitat im Scan steht wörtlich in einer gesicherten Kopie", () => {
  const text = fs.readFileSync(path.join(ordner, datei), "utf8");
  const kopien = KOPIEN
    .map((n) => norm(fs.readFileSync(path.join(ordner, `${n}.txt`), "utf8")));
  const zitate = text.split("\n").filter((z) => z.startsWith("> ")).map((z) => norm(z.slice(2)));
  assert.ok(zitate.length >= 7, `zu wenige Zitate: ${zitate.length}`);
  for (const z of zitate) {
    const teile = z.split(" […] ");
    assert.ok(kopien.some((k) => teile.every((t) => k.includes(t))), `nicht wörtlich belegt: ${z.slice(0, 80)}`);
  }
});

test("mistral: Profil nennt den Widerspruch Terms 4.3 gegen DPA 2.3 mit Vorrang 11.2", () => {
  const d = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "data", "anbieter", "mistral.json"), "utf8"));
  const l4 = d.modelle.find((m) => m.name.includes("Large 4"));
  const dpa = norm(fs.readFileSync(path.join(ordner, "dpa-2026-10-24.txt"), "utf8"));
  for (const anm of [l4.anmerkung, d.vertrag.training_opt_out.anmerkung]) {
    assert.match(anm, /DPA[^.]*2\.3/);
    assert.match(anm, /11\.2/);
    assert.match(anm, /ungeklärt/);
  }
  for (const z of ["unless Customer is or has opted-out of training", "the terms of the DPA shall prevail to the extent of such conflict"]) {
    assert.ok(dpa.includes(z), `nicht wörtlich im DPA: ${z}`);
    assert.ok(norm(l4.anmerkung).includes(z), `Zitat fehlt im Profil: ${z}`);
  }
});
