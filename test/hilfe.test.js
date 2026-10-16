"use strict";
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const { hilfeAusKopf } = require("../lib/quellen.js");

const KOPF = ["#!/usr/bin/env node", "/**", " * Titel.", " *", " * Aufruf: node x.js [--help]", " *   --trocken  nur Bericht", " *", " * Rest.", " */"];

test("hilfeAusKopf: liest den Aufruf-Block mit LF-Zeilenenden", () => {
  assert.equal(hilfeAusKopf(KOPF.join("\n")), "Aufruf: node x.js [--help]\n  --trocken  nur Bericht");
});

test("hilfeAusKopf: liest denselben Block mit CRLF-Zeilenenden (Windows-Checkout)", () => {
  assert.equal(hilfeAusKopf(KOPF.join("\r\n")), "Aufruf: node x.js [--help]\n  --trocken  nur Bericht");
});

test("hilfeAusKopf: ohne Aufruf-Block klare Meldung statt Absturz", () => {
  assert.match(hilfeAusKopf("/** nichts */"), /keine Hilfe/i);
});

test("hilfeAusKopf: quellenlauf.js hat einen lesbaren Hilfeblock", () => {
  const text = hilfeAusKopf(fs.readFileSync(path.join(__dirname, "..", "quellenlauf.js"), "utf8"));
  assert.match(text, /^Aufruf: node quellenlauf\.js/);
  assert.match(text, /--uebernehmen-nur/);
});
