"use strict";
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { FACHSTIMMEN, fachstimmeBlock } = require("../lib/fachstimmen.js");

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

test("Patel: Zitat wortgleich wie in seiner Mail vom 12.10.2026", () => {
  const z = FACHSTIMMEN["iso-27001"];
  assert.equal(
    z.zitat,
    "A certificate attaches to a product in one evaluated configuration, not to the organisation that sells it. The certificate travels and the documents that define its scope do not."
  );
});

test("Patel: genau seine Zuordnung und sein Link", () => {
  const html = fachstimmeBlock(FACHSTIMMEN["iso-27001"], esc);
  assert.match(html, /Punit Suketu Patel, Independent Researcher/);
  assert.match(html, /href="https:\/\/arxiv\.org\/abs\/2610\.10644"/);
  assert.match(html, /Abschnitt 5\.4/);
  assert.match(html, /E8/);
  assert.match(html, /<blockquote lang="en">/);
});

test("Patel: Paper und Mail werden beide genannt", () => {
  const html = fachstimmeBlock(FACHSTIMMEN["iso-27001"], esc);
  assert.match(html, /Mail an belegbar\.eu vom 12\.10\.2026/);
});

test("Kein langer Gedankenstrich im Text (entKIen)", () => {
  const html = fachstimmeBlock(FACHSTIMMEN["iso-27001"], esc);
  assert.ok(!html.includes("—") && !html.includes(" – "));
});

test("Ohne Eintrag kein Block", () => {
  assert.equal(fachstimmeBlock(undefined, esc), "");
});
