"use strict";
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { offeneBelege, istBeleg, stapel, stempelBefehl, nachziehBefehl } = require("../lib/zeitstempel.js");

test("istBeleg: Belegkopien ja, Verzeichnisdateien und Stempel nein", () => {
  assert.equal(istBeleg("anbieter/gcore/datenschutz-2026-10-22.txt"), true);
  assert.equal(istBeleg("anbieter/eurouter/credits-doku-2026-10-22.md"), true);
  assert.equal(istBeleg("anbieter/gcore/SHA256SUMS"), false);
  assert.equal(istBeleg("anbieter/gcore/QUELLEN.md"), false);
  assert.equal(istBeleg("rechtsraum/dpf-2026-10-22/LIESMICH.md"), false);
  assert.equal(istBeleg("anbieter/gcore/datenschutz-2026-10-22.txt.ots"), false);
});

test("offeneBelege: nur Belege ohne .ots daneben, sortiert", () => {
  const dateien = [
    "anbieter/b/z-2026-10-22.txt",
    "anbieter/a/x-2026-10-22.txt",
    "anbieter/a/x-2026-10-22.txt.ots",
    "anbieter/a/y-2026-10-22.pdf",
    "anbieter/a/SHA256SUMS",
  ];
  assert.deepEqual(offeneBelege(dateien), ["anbieter/a/y-2026-10-22.pdf", "anbieter/b/z-2026-10-22.txt"]);
});

test("offeneBelege: Windows-Trenner zählen wie Schrägstriche", () => {
  assert.deepEqual(offeneBelege(["anbieter\\a\\x.txt", "anbieter\\a\\x.txt.ots"]), []);
});

test("stapel: teilt in Gruppen der gewünschten Größe", () => {
  assert.deepEqual(stapel([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);
  assert.deepEqual(stapel([], 50), []);
});

test("stempelBefehl: ots stamp mit allen Dateien eines Stapels", () => {
  assert.deepEqual(stempelBefehl(["a.txt", "b.pdf"]), ["stamp", "a.txt", "b.pdf"]);
});

test("nachziehBefehl: ots upgrade für offene Beweise", () => {
  assert.deepEqual(nachziehBefehl(["a.txt.ots", "b.pdf.ots"]), ["upgrade", "a.txt.ots", "b.pdf.ots"]);
});

// WS1 (22.10.2026): auch die Rohkopien des Wächters (waechter/**/roh/<datum>/) bekommen einen Stempel.
const fs = require("fs");
const os = require("os");
const path = require("path");
const { alleDateien, otsDateien, rohStempelPlan } = require("../lib/zeitstempel.js");

test("alleDateien: relative Pfade mit Schrägstrich, fehlender Ordner = leer", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "ws1-"));
  fs.mkdirSync(path.join(tmp, "2026-10-22"));
  fs.writeFileSync(path.join(tmp, "2026-10-22", "openai-avv.html"), "x");
  fs.writeFileSync(path.join(tmp, "2026-10-22", "SHA256SUMS"), "y");
  assert.deepEqual(alleDateien(tmp).sort(), ["2026-10-22/SHA256SUMS", "2026-10-22/openai-avv.html"]);
  assert.deepEqual(alleDateien(path.join(tmp, "gibt-es-nicht")), []);
  fs.rmSync(tmp, { recursive: true, force: true });
});

test("otsDateien: nur Stempel, sortiert", () => {
  assert.deepEqual(otsDateien(["b/x.txt.ots", "a/y.html", "a/y.html.ots", "a/SHA256SUMS"]), ["a/y.html.ots", "b/x.txt.ots"]);
});

test("rohStempelPlan: stempelt alle Rohkopien ohne .ots, nie SHA256SUMS, in Stapeln", () => {
  const roh = [
    "2026-10-21/google-avv.pdf", "2026-10-21/google-avv.pdf.ots", "2026-10-21/SHA256SUMS",
    "2026-10-22/openai-avv.html", "2026-10-22/notion-avv-lesefolge.txt", "2026-10-22/SHA256SUMS",
  ];
  assert.deepEqual(rohStempelPlan(roh, 50), [["stamp", "2026-10-22/notion-avv-lesefolge.txt", "2026-10-22/openai-avv.html"]]);
  assert.deepEqual(rohStempelPlan(roh, 1).length, 2);
  assert.deepEqual(rohStempelPlan(["2026-10-22/SHA256SUMS"], 50), []);
});
