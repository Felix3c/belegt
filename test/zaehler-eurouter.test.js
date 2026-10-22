"use strict";
// eurouter.ai/providers meldete am 18. und 19.10.2026 "verändert", nur weil der Modellzähler eines Providers
// tickte (Tensorix 23 → 24 models). Die Zahl der Provider ("17 providers"), Namen, HQ und Beschreibungen
// müssen weiter zählen; nur eine Zahl direkt vor "models" fällt weg.
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { pruefe, ohneZaehler } = require("../lib/quellen.js");

const URL_EU = "https://eurouter.ai/providers";
const seite = ({ tensorix = "24", anzahl = "17", hq = "IE", satz = "zero data retention by default" } = {}) =>
  `<nav>EUrouter Models Providers Rankings</nav><p>Loading authentication actions</p>` +
  `<h1>EUrouter Providers</h1><p>${anzahl} providers</p>` +
  `<div>Berget AI AB 11 models Swedish AI inference provider with ${satz}. HQ: SE ZDR:</div>` +
  `<div>Tensorix ${tensorix} models Irish AI infrastructure provider. HQ: ${hq} ZDR:</div>` +
  `<p>Are you looking to become a provider on EUrouter? Apply here</p><p>KVK: 42054357 1053HM Amsterdam</p>`;
const holen = (html) => async (u) => ({ status: 200, url: u, headers: { get: () => "text/html; charset=utf-8" }, arrayBuffer: async () => Buffer.from(html) });
const hash = async (html, url = URL_EU) => (await pruefe({ url }, { mitHash: true, holen: holen(html) })).hash;

test("ohneZaehler EUrouter: nur Zahlen direkt vor 'models' fallen weg", () => {
  const t = "Models Providers EUrouter Providers 17 providers Berget AI AB 11 models HQ: SE Tensorix 24 models Are you looking to become a provider KVK: 42054357";
  assert.equal(ohneZaehler(URL_EU, t), "Models Providers EUrouter Providers 17 providers Berget AI AB models HQ: SE Tensorix models Are you looking to become a provider KVK: 42054357");
});

test("EUrouter: tickender Modellzähler ändert den Hash nicht", async () => {
  assert.equal(await hash(seite({ tensorix: "23" })), await hash(seite({ tensorix: "24" })));
});

test("EUrouter: andere Zahl der Provider ändert den Hash", async () => {
  assert.notEqual(await hash(seite()), await hash(seite({ anzahl: "18" })));
});

test("EUrouter: geänderter Sitz oder Satz ändert den Hash", async () => {
  assert.notEqual(await hash(seite()), await hash(seite({ hq: "US" })));
  assert.notEqual(await hash(seite()), await hash(seite({ satz: "30 days retention" })));
});

test("EUrouter: Zahlen außerhalb der Liste zählen weiter", async () => {
  assert.notEqual(await hash(seite()), await hash(seite().replace("42054357", "42054358")));
});

test("EUrouter: Wortliste fürs Wortprotokoll enthält den Modellzähler nicht, die Provider-Zahl schon", async () => {
  const e = await pruefe({ url: URL_EU }, { mitHash: true, holen: holen(seite()) });
  assert.ok(!e.woerter.includes("24") && !e.woerter.includes("11"));
  assert.ok(e.woerter.includes("17") && e.woerter.includes("Tensorix"));
});

test("Opper-Regel unverändert: dort fallen weiter alle reinen Zahlen der Tabelle weg", () => {
  const t = "Data handling by provider Mistral Yes 49 Scaleway 11 models GDPR and AI compliance FAQ";
  assert.equal(ohneZaehler("https://opper.ai/ai-compliance", t), "Data handling by provider Mistral Yes Scaleway models GDPR and AI compliance FAQ");
});
