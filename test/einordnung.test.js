"use strict";
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { pruefeEinordnung, einordnungHtml } = require("../lib/einordnung.js");

const gut = {
  text: "Satz mit „Anführung“ & <Tag>.",
  von: "David Rosenthal (VISCHER)",
  datum: "2026-10-09",
  quelle: "https://vischerlnk.com/ki-tools-0726-blog",
  quelle_titel: "Teil 31: KI-Tools",
  kontext: "Antwort auf eine Frage von belegbar.eu.",
};

test("pruefeEinordnung: fehlendes Feld ist ok (optional)", () => {
  assert.doesNotThrow(() => pruefeEinordnung(undefined, "x.json"));
});

test("pruefeEinordnung: vollständiger Eintrag ist ok", () => {
  assert.doesNotThrow(() => pruefeEinordnung([gut], "x.json"));
});

test("pruefeEinordnung: Pflichtfelder text, von, datum, quelle", () => {
  for (const k of ["text", "von", "datum", "quelle"]) {
    const e = { ...gut };
    delete e[k];
    assert.throws(() => pruefeEinordnung([e], "x.json"), new RegExp(k));
  }
});

test("pruefeEinordnung: Datum muss ISO sein, Quelle https", () => {
  assert.throws(() => pruefeEinordnung([{ ...gut, datum: "09.10.2026" }], "x.json"), /datum/);
  assert.throws(() => pruefeEinordnung([{ ...gut, quelle: "http://x.de" }], "x.json"), /quelle/);
});

test("pruefeEinordnung: kein Array → Fehler", () => {
  assert.throws(() => pruefeEinordnung(gut, "x.json"), /Liste/);
});

test("einordnungHtml: leer ohne Einträge", () => {
  assert.equal(einordnungHtml(undefined), "");
  assert.equal(einordnungHtml([]), "");
});

test("einordnungHtml: Wortlaut escaped, Name, Datum, Link, Hinweis kein Gutachten", () => {
  const html = einordnungHtml([gut]);
  assert.match(html, /<h2>Fachliche Einordnung<\/h2>/);
  assert.match(html, /„Satz mit „Anführung“ &amp; &lt;Tag&gt;\.“/);
  assert.match(html, /David Rosenthal \(VISCHER\), 09\.10\.2026/);
  assert.match(html, /href="https:\/\/vischerlnk\.com\/ki-tools-0726-blog"/);
  assert.match(html, />Teil 31: KI-Tools<\/a>/);
  assert.match(html, /kein Gutachten/);
  assert.match(html, /lang="de"/);
});

test("Fall 2026-004: Rosenthal wörtlich in seiner Fassung vom 09.10.2026", () => {
  const f = require("../data/faelle/2026-004-scaleway-generative-apis-no-access.json");
  assert.doesNotThrow(() => pruefeEinordnung(f.einordnung, "2026-004"));
  assert.equal(f.einordnung.length, 1);
  const e = f.einordnung[0];
  assert.equal(
    e.text,
    "Die Speicherung von Daten für eigene Zwecke im Klartext durch einen Provider, auch wenn nur in gewissen Fällen, ist kein Zero Data Retention mehr nach unserem Verständnis."
  );
  assert.equal(e.von, "David Rosenthal (VISCHER)");
  assert.equal(e.datum, "2026-10-09");
  assert.equal(e.quelle, "https://vischerlnk.com/ki-tools-0726-blog");
});

test("einordnungHtml: beginnt mit Leerzeile, damit Fälle ohne Einordnung byte-gleich bleiben", () => {
  assert.match(einordnungHtml([gut]), /^\n\n<h2>/);
});
