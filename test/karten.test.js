"use strict";
// opper.ai/models meldete am 18. und 19.10.2026 "verändert", ohne dass sich ein Profilpreis bewegte: Die Seite
// ist eine Rangliste von ~1.200 Modellen, oben tickt "1,216 of 1,244", Kontextfenster und Rangfolge fremder
// Modelle wechseln. Belegt wird dort nur der Preis von fünf Modellen. Darum zählt für diese URL nur der Text
// der fünf Modell-Karten aus dem Profil; fehlt eine Karte, ändert sich der Hash (Alarm statt Schweigen).
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { pruefe, nurKarten, KARTEN_SEITEN } = require("../lib/quellen.js");

const URL_MODELS = "https://opper.ai/models";
const karte = (name, maker, preis = "$5.00 / 1M input · $25.00 / 1M output", region = "US, EU, Multi") =>
  `<div><h3>${name}</h3><span>by ${maker}</span><p>${name} is a model.</p><p>Pricing from ${preis} · 1M context</p>` +
  `<p>Privacy ZDR Zero data retention Training No Region ${region}</p></div>`;
const seite = ({ zaehler = "1,216", opus = "$5.00 / 1M input · $25.00 / 1M output", fremd = "500K", ohneDeepseek = false } = {}) =>
  `<h1>AI Model Directory</h1><p>Get your API key ${zaehler} of 1,244 Filters</p>` +
  karte("Claude Opus 5.5", "Anthropic", "$4.00 / 1M input · $20.00 / 1M output") +
  karte("Claude Opus 5", "Anthropic", opus) +
  `<div><h3>Grok 4.5</h3><span>by xAI</span><p>with a ${fremd} context window</p><p>Region EU + US</p></div>` +
  karte("Claude Sonnet 5", "Anthropic", "$2.00 / 1M input · $10.00 / 1M output") +
  karte("GPT-5.4", "OpenAI", "$2.50 / 1M input · $15.00 / 1M output", "EU + US") +
  (ohneDeepseek ? "" : karte("DeepSeek V4 Pro", "DeepSeek", "$0.87 / 1M input · $1.74 / 1M output", "Multi, US, EU")) +
  karte("Gemini 3.5 Flash", "Google", "$1.50 / 1M input · $9.00 / 1M output", "Multi, EU");
const holen = (html) => async (u) => ({ status: 200, url: u, headers: { get: () => "text/html; charset=utf-8" }, arrayBuffer: async () => Buffer.from(html) });
const hash = async (html, url = URL_MODELS) => (await pruefe({ url }, { mitHash: true, holen: holen(html) })).hash;

test("nurKarten: schneidet je Profilmodell die Karte von Name bis Region aus", () => {
  const t = "Get your API key 1,216 of 1,244 Claude Opus 5.5 by Anthropic Pricing from $4.00 Region US " +
    "Claude Opus 5 by Anthropic Pricing from $5.00 / 1M input Region US, EU, Multi Grok 4.5 by xAI 500K Region EU + US";
  const k = nurKarten(URL_MODELS, t);
  assert.ok(k.includes("Claude Opus 5 by Anthropic Pricing from $5.00 / 1M input Region US, EU, Multi"));
  assert.ok(!k.includes("1,216") && !k.includes("Grok") && !k.includes("$4.00"));
});

test("nurKarten: andere URLs → null (Regel gilt nur für die eine Seite)", () => {
  assert.equal(nurKarten("https://opper.ai/ai-compliance", "Claude Opus 5 by Anthropic Region US"), null);
});

test("Opper /models: Zähler, fremde Modelle und Opus 5.5 ändern den Hash nicht", async () => {
  const basis = await hash(seite());
  assert.equal(await hash(seite({ zaehler: "1,217" })), basis);
  assert.equal(await hash(seite({ fremd: "1M" })), basis);
});

test("Opper /models: geänderter Profilpreis ändert den Hash", async () => {
  assert.notEqual(await hash(seite({ opus: "$6.00 / 1M input · $25.00 / 1M output" })), await hash(seite()));
});

test("Opper /models: fehlende Profil-Karte ändert den Hash", async () => {
  assert.notEqual(await hash(seite({ ohneDeepseek: true })), await hash(seite()));
});

test("Opper /models: Wortliste fürs Wortprotokoll enthält nur die Karten", async () => {
  const e = await pruefe({ url: URL_MODELS }, { mitHash: true, holen: holen(seite()) });
  assert.ok(e.woerter.includes("$0.87") && e.woerter.includes("Gemini"));
  assert.ok(!e.woerter.includes("1,216") && !e.woerter.includes("Grok"));
});

test("Kartennamen = Modelle im Opper-Profil, die /models als Quelle nennen", () => {
  const profil = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "data", "anbieter", "opper-ai.json"), "utf8"));
  const ausProfil = profil.modelle.filter((m) => m.quelle === URL_MODELS).map((m) => m.name).sort();
  assert.deepEqual([...KARTEN_SEITEN[URL_MODELS]].sort(), ausProfil);
});
