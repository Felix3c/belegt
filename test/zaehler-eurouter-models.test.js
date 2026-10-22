"use strict";
// eurouter.ai/models meldete am 19.10.2026 zweimal "verändert", nur weil Zähler tickten: Filterleiste
// ("Chat 118 → 119", "DeepSeek 7 → 8") und Gesamtzahl ("151 models" → "152 models", oben und unten).
// Belegt werden aus der Seite nur Preise ("in: $0.30 out: $0.50"); die müssen weiter zählen.
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { pruefe, ohneZaehler } = require("../lib/quellen.js");

const URL_M = "https://eurouter.ai/models";
const seite = ({ gesamt = "152", chat = "119", deepseek = "8", preis = "$0.30", plus = "120+" } = {}) =>
  `<h1>EUrouter Model Directory</h1><p>Find your model. Every request routed through EU infrastructure. ` +
  `Compare specs, check pricing, pick what works.</p><p>${gesamt} models</p>` +
  `<div>Reasoning DeepSeek V3.2 DeepSeek V3.2 is a mixture-of-experts model. in: ${preis} out: $0.50</div>` +
  `<div>Popular Gemma 4 The 31B variant offers long-context reasoning. in: $0.10 out: $0.50</div>` +
  `<p>Loading models… One endpoint, ${gesamt} models. EUrouter routes your requests to GPT-5, Claude.</p>` +
  `<p>EUrouter B.V. KVK: 42054357</p><p>Start routing AI through EU infrastructure · ${plus} models</p>` +
  `<aside>Search models Endpoint Chat ${chat} Completion 40 Author Anthropic 12 DeepSeek ${deepseek} ` +
  `Capabilities Vision Tool use</aside>`;
const holen = (html) => async (u) => ({ status: 200, url: u, headers: { get: () => "text/html; charset=utf-8" }, arrayBuffer: async () => Buffer.from(html) });
const ergebnis = (html) => pruefe({ url: URL_M }, { mitHash: true, holen: holen(html) });
const hash = async (html) => (await ergebnis(html)).hash;

test("EUrouter /models: tickende Filterzähler ändern den Hash nicht", async () => {
  assert.equal(await hash(seite({ chat: "118", deepseek: "7" })), await hash(seite()));
});

test("EUrouter /models: Gesamtzahl der Modelle (oben und 'models.' unten) ändert den Hash nicht", async () => {
  assert.equal(await hash(seite({ gesamt: "151" })), await hash(seite()));
});

test("EUrouter /models: geänderter Preis ändert den Hash", async () => {
  assert.notEqual(await hash(seite()), await hash(seite({ preis: "$0.35" })));
});

test("EUrouter /models: Werbeangabe '120+ models' und Zahlen außerhalb zählen weiter", async () => {
  assert.notEqual(await hash(seite()), await hash(seite({ plus: "150+" })));
  assert.notEqual(await hash(seite()), await hash(seite().replace("42054357", "42054358")));
});

test("EUrouter /models: Filternamen zählen weiter", async () => {
  assert.notEqual(await hash(seite()), await hash(seite().replace("DeepSeek 8 Capabilities", "Cohere 8 Capabilities")));
});

test("EUrouter /models: Wortliste ohne Zähler, mit Preisen und Filternamen", async () => {
  const w = (await ergebnis(seite())).woerter;
  assert.ok(!w.includes("152") && !w.includes("119") && !w.includes("8") && !w.includes("40"));
  assert.ok(w.includes("$0.30") && w.includes("Chat") && w.includes("120+"));
});

test("Mehrere Abschnitte: /providers-Regel unverändert", () => {
  const t = "EUrouter Providers 17 providers Tensorix 24 models Are you looking to become a provider";
  assert.equal(ohneZaehler("https://eurouter.ai/providers", t), "EUrouter Providers 17 providers Tensorix models Are you looking to become a provider");
});
