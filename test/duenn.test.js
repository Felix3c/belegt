"use strict";
// facebook.com/legal/terms/data_security_terms (TOM-Quelle Meta Model API) liefert ohne Browser nur „Facebook“
// (1 Wort, Wortstand seit 24.10.2026). Der Hash läuft dann über die Hülle, der Quellenlauf meldet die Seite
// jeden Tag „unverändert“ und schreibt das Prüfdatum fort, obwohl er den Text nie gelesen hat. Der Wächter
// kennt das als DÜNN (MIN_WOERTER 100); der Quellenlauf soll solche Seiten ebenso zeigen (25.10.2026: 29 Seiten).
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { pruefe, duenneQuellen, MIN_WOERTER } = require("../lib/quellen.js");

const antwort = (html, ct = "text/html") => ({
  status: 200, url: "https://x.example/a", arrayBuffer: async () => Buffer.from(html),
  headers: { get: (n) => (n.toLowerCase() === "content-type" ? ct : null), getSetCookie: () => [] },
});
const viele = Array.from({ length: 120 }, (_, i) => "wort" + i).join(" ");

test("pruefe: HTML-Hülle mit weniger als MIN_WOERTER Wörtern trägt duenn = Wortzahl", async () => {
  const e = await pruefe({ url: "https://x.example/a" }, { mitHash: true, holen: async () => antwort("<title>Facebook</title>") });
  assert.equal(e.befund, "ok");
  assert.equal(e.duenn, 1);
  assert.ok(!Object.keys(e).includes("duenn"), "nicht im --json-Bericht");
});

test("pruefe: volle HTML-Seite und PDF sind nicht dünn", async () => {
  const voll = await pruefe({ url: "https://x.example/a" }, { mitHash: true, holen: async () => antwort("<p>" + viele + "</p>") });
  assert.equal(voll.duenn, undefined);
  const pdf = await pruefe({ url: "https://x.example/a.pdf" }, { mitHash: true, holen: async () => antwort("%PDF-1.4 kurz", "application/pdf") });
  assert.equal(pdf.duenn, undefined, "PDF-Hash läuft über die Bytes, also nicht blind");
});

test("duenneQuellen: sammelt neu/unverändert/verändert mit duenn, sortiert nach Wortzahl", () => {
  const mit = (url, n) => Object.defineProperty({ url, anbieter: "a", art: "tom" }, "duenn", { value: n, enumerable: false });
  const o = { neu: [mit("n", 12)], unveraendert: [mit("u", 1), { url: "voll" }], veraendert: [mit("v", 3)], verschwunden: [mit("weg", 0)], uebersprungen: [] };
  assert.deepEqual(duenneQuellen(o).map((e) => e.url), ["u", "v", "n"]);
  assert.equal(MIN_WOERTER, 100);
});
