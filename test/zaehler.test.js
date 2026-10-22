"use strict";
// opper.ai/ai-compliance meldete seit 16.10.2026 fast täglich "verändert": In der Tabelle "Data handling by
// provider" tickt nur die Spalte "Models" (Modellzähler je Anbieter, 18.10.: Scaleway 10 → 11). Die
// Einstufungen (Yes / Abuse monitoring / Retained) und die zitierten Sätze müssen weiter zählen.
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { pruefe, ohneZaehler } = require("../lib/quellen.js");

const URL_OPPER = "https://opper.ai/ai-compliance";
const seite = ({ scaleway = "11", stufe = "Abuse monitoring", satz = "Every call is logged with model, cost, latency." } = {}) =>
  `<h1>The GDPR-compliant AI gateway</h1><p>${satz}</p>` +
  `<h2>Data handling by provider</h2><table><tr><td>Mistral</td><td>EU, Multi</td><td>Yes</td><td>No</td><td>49</td></tr>` +
  `<tr><td>Scaleway</td><td>EU</td><td>${stufe}</td><td>No</td><td>${scaleway}</td></tr></table>` +
  `<h2>GDPR and AI compliance FAQ</h2><p>Is Opper ISO 27001 certified? Yes, 2026.</p>`;
const holen = (html) => async (u) => ({ status: 200, url: u, headers: { get: () => "text/html; charset=utf-8" }, arrayBuffer: async () => Buffer.from(html) });
const hash = async (html, url = URL_OPPER) => (await pruefe({ url }, { mitHash: true, holen: holen(html) })).hash;

test("ohneZaehler: nur reine Zahlen zwischen den beiden Überschriften fallen weg", () => {
  const t = "Intro 5 Data handling by provider Mistral EU Yes No 49 Scaleway EU No 11 GDPR and AI compliance FAQ ISO 27001";
  assert.equal(ohneZaehler(URL_OPPER, t), "Intro 5 Data handling by provider Mistral EU Yes No Scaleway EU No GDPR and AI compliance FAQ ISO 27001");
});

test("ohneZaehler: andere URLs und Seiten ohne die Überschriften bleiben unverändert", () => {
  const t = "Data handling by provider Mistral 49 GDPR and AI compliance FAQ";
  assert.equal(ohneZaehler("https://opper.ai/models", t), t);
  assert.equal(ohneZaehler(URL_OPPER, "Mistral 49 ohne Abschnitt"), "Mistral 49 ohne Abschnitt");
  assert.equal(ohneZaehler(URL_OPPER, "Data handling by provider Mistral 49 ohne Ende"), "Data handling by provider Mistral 49 ohne Ende");
});

test("Opper: tickender Modellzähler ändert den Hash nicht", async () => {
  assert.equal(await hash(seite({ scaleway: "10" })), await hash(seite({ scaleway: "11" })));
});

test("Opper: geänderte Einstufung in der Tabelle ändert den Hash", async () => {
  assert.notEqual(await hash(seite()), await hash(seite({ stufe: "Retained" })));
});

test("Opper: geänderter zitierter Satz ändert den Hash, Zahlen außerhalb der Tabelle zählen weiter", async () => {
  assert.notEqual(await hash(seite()), await hash(seite({ satz: "Every call is logged with model and cost." })));
  assert.notEqual(await hash(seite()), await hash(seite().replace("2026", "2027")));
});

test("Opper: Wortliste fürs Wortprotokoll enthält die Zähler nicht", async () => {
  const e = await pruefe({ url: URL_OPPER }, { mitHash: true, holen: holen(seite()) });
  assert.ok(!e.woerter.includes("49") && !e.woerter.includes("11"));
  assert.ok(e.woerter.includes("27001") && e.woerter.includes("Scaleway"));
});

test("andere Seite mit gleicher Tabelle: Zähler zählen weiter (Regel gilt nur für die eine URL)", async () => {
  const andere = "https://example.org/ai-compliance";
  assert.notEqual(await hash(seite({ scaleway: "10" }), andere), await hash(seite({ scaleway: "11" }), andere));
});
