"use strict";
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { baueEntwurf, GPT6 } = require("../entwurf-startseite.js");

const LIVE = `<!doctype html><html lang="de"><head>
<meta charset="utf-8"><title>alt</title>
<link rel="stylesheet" href="style.css">
</head><body><main id="inhalt" class="shell">
<section class="held">
  <div class="held-text"><h1>Wem dürfen Sie Ihre Daten geben?<br>Wir belegen es.</h1></div>
</section>
<section aria-label="Anbieter filtern"><table id="anbieter-tabelle"></table></section>
</main></body></html>`;

const DATEN = { stand: "2026-10-22", anbieter: new Array(24).fill({}), aenderungen: [{ datum: "2026-10-20" }, { datum: "2026-08-01" }] };

test("Entwurf: neuer Kopf ersetzt den alten, Tabelle bleibt", () => {
  const html = baueEntwurf(LIVE, DATEN);
  assert.match(html, /Sie prüfen KI-Anbieter für Ihre Kunden\?/);
  assert.match(html, /Wir sammeln die Belege und halten sie aktuell\./);
  assert.doesNotMatch(html, /Wem dürfen Sie Ihre Daten geben/);
  assert.match(html, /id="anbieter-tabelle"/);
});

test("Entwurf: Vorschau ist nie indexierbar und zeigt auf docs/", () => {
  const html = baueEntwurf(LIVE, DATEN);
  assert.match(html, /<base href="\.\.\/docs\/">/);
  assert.match(html, /<meta name="robots" content="noindex,nofollow">/);
  assert.match(html, /ENTWURF/);
});

test("Entwurf: GPT-6-Beispiel nennt beide Prüfsummen, gleiches Deckblatt-Datum und Wayback", () => {
  const html = baueEntwurf(LIVE, DATEN);
  assert.ok(html.includes(GPT6.alt.sha.slice(0, 12)));
  assert.ok(html.includes(GPT6.neu.sha.slice(0, 12)));
  assert.match(html, /2026-09-03/);
  assert.match(html, /web\.archive\.org\/web\/20260903193305/);
  assert.match(html, /web\.archive\.org\/web\/20260930080312/);
  // kein Fall, kein Vorwurf: OpenAI protokolliert offen
  assert.match(html, /Änderungsprotokoll/);
  assert.doesNotMatch(html, /faelle\/[^"]*gpt/);
});

test("Entwurf: Zahlen kommen aus den Daten, nicht aus dem Text", () => {
  const html = baueEntwurf(LIVE, DATEN);
  assert.match(html, /24 Anbieter/);
  assert.match(html, /22\.10\.2026/);
});

test("Entwurf: ohne Kopf-Abschnitt bricht der Bau laut ab", () => {
  assert.throws(() => baueEntwurf("<html><head></head><body></body></html>", DATEN), /held/);
});

test("Entwurf: ein Satz sagt, was uns von reinen Text-Wächtern trennt, ohne Namen", () => {
  const html = baueEntwurf(LIVE, DATEN);
  assert.match(html, /class="ew-unterschied"/);
  assert.match(html, /ob die Zusage stimmt/);
  assert.match(html, /Betreiber in der EU/);
  // keine Konkurrenten beim Namen (UWG-Blatt liegt beim Anwalt)
  assert.doesNotMatch(html, /ConductAtlas|Open Terms Archive|PageCrawl/i);
});
