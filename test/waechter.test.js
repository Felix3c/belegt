"use strict";
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { ladeListe, rohName, berichtZeilen } = require("../waechter.js");

test("ladeListe: gültige Liste wird zu Quellen im Format von pruefeAlle", () => {
  const l = ladeListe({ quellen: [{ anbieter: "openai", art: "unterauftragnehmer", url: "https://openai.com/policies/sub-processor-list/" }] });
  assert.equal(l.length, 1);
  assert.equal(l[0].anbieter, "openai");
  assert.equal(l[0].art, "unterauftragnehmer");
  assert.equal(l[0].url, "https://openai.com/policies/sub-processor-list/");
});

test("ladeListe: fehlende Felder, http ohne s und doppelte URLs brechen ab", () => {
  assert.throws(() => ladeListe({}), /quellen/);
  assert.throws(() => ladeListe({ quellen: [{ anbieter: "x", url: "https://a.example/" }] }), /art/);
  assert.throws(() => ladeListe({ quellen: [{ anbieter: "x", art: "avv", url: "http://a.example/" }] }), /https/);
  const q = { anbieter: "x", art: "avv", url: "https://a.example/" };
  assert.throws(() => ladeListe({ quellen: [q, { ...q }] }), /doppelt/);
});

test("rohName: Anbieter, Art und Endung aus dem Inhaltstyp", () => {
  assert.equal(rohName({ anbieter: "openai", art: "avv" }, "text/html; charset=utf-8"), "openai-avv.html");
  assert.equal(rohName({ anbieter: "microsoft", art: "avv" }, "application/pdf"), "microsoft-avv.pdf");
  assert.equal(rohName({ anbieter: "google", art: "x" }, null), "google-x.bin");
});

test("berichtZeilen: verändert steht oben mit Wortprotokoll, neu und unverändert nur gezählt", () => {
  const o = {
    neu: [{ anbieter: "a", art: "avv", url: "https://a/" }],
    unveraendert: [{ anbieter: "b", art: "avv", url: "https://b/" }],
    veraendert: [{ anbieter: "c", art: "unterauftragnehmer", url: "https://c/", wortDiff: { weg: [["Alt", 1]], dazu: [["Neu", 2]] } }],
    verschwunden: [], uebersprungen: [],
  };
  const z = berichtZeilen(o).join("\n");
  assert.match(z, /VERÄNDERT: c unterauftragnehmer https:\/\/c\//);
  assert.match(z, /weg: "Alt"/);
  assert.match(z, /dazu: 2× "Neu"/);
  assert.match(z, /neu 1, unverändert 1, verändert 1, verschwunden 0, übersprungen 0/);
  assert.ok(z.indexOf("VERÄNDERT") < z.indexOf("neu 1"));
});

test("berichtZeilen: Seite mit kaum Wörtern (lädt erst im Browser) wird als DÜNN gemeldet, PDF ohne Wortliste nicht", () => {
  const mitWoertern = (e, n) => Object.defineProperty(e, "woerter", { value: Array.from({ length: n }, (_, i) => "w" + i), enumerable: false });
  const o = {
    neu: [mitWoertern({ anbieter: "notion", art: "unterauftragnehmer", url: "https://n/" }, 15)],
    unveraendert: [mitWoertern({ anbieter: "zoom", art: "unterauftragnehmer", url: "https://z/" }, 3000), { anbieter: "zoom", art: "avv", url: "https://z.pdf" }],
    veraendert: [], verschwunden: [], uebersprungen: [],
  };
  const z = berichtZeilen(o).join("\n");
  assert.match(z, /DÜNN: notion unterauftragnehmer https:\/\/n\/ \(15 Wörter/);
  assert.doesNotMatch(z, /DÜNN: zoom/);
  assert.ok(z.indexOf("DÜNN") < z.indexOf("neu 1"));
});
