"use strict";
// EH1 (Felix 22.10.2026, Home-Tab): Microsoft, OpenAI und Google kommen in den Katalog, mit denselben
// Feldern wie die 21 EU-Anbieter. Die USA haben einen Angemessenheitsbeschluss nur für Unternehmen,
// die am EU-US Data Privacy Framework teilnehmen. „Drittland ohne Beschluss“ wäre falsch, „angemessen“
// ohne Einschränkung auch.
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const R = require("../lib/rechtsraum.js");

const US_IDS = ["google-gemini-workspace", "microsoft-copilot", "openai-chatgpt-enterprise"];
const lade = (id) => JSON.parse(fs.readFileSync(path.join(__dirname, "..", "data", "anbieter", id + ".json"), "utf8"));

test("USA: eigener Rechtsraum mit Beschluss nur für DPF-Teilnehmer", () => {
  const li = R.landInfo("US");
  assert.equal(li.name, "USA");
  assert.equal(li.raum, "dpf");
  assert.match(R.RAUM_TEXT.dpf, /Data Privacy Framework/);
  assert.match(R.RAUM_TEXT.dpf, /nur/);
  assert.ok(R.RAUM_KURZ.dpf);
});

test("unbekanntes Land bleibt Drittland ohne Beschluss", () => {
  assert.deepEqual(R.landInfo("XX"), { name: "XX", raum: "drittland" });
});

test("jeder Raum hat Langtext und Kurztext", () => {
  for (const code of Object.keys(R.LAND_INFO)) {
    const { raum } = R.LAND_INFO[code];
    assert.ok(R.RAUM_TEXT[raum], code);
    assert.ok(R.RAUM_KURZ[raum], code);
  }
});

for (const id of US_IDS) {
  test(`${id}: im Katalog, als KI-Assistent, ohne Privat-Vermerk`, () => {
    const p = lade(id);
    assert.equal(p.id, id);
    assert.equal(p.kategorie, "assistent");
    assert.equal(p.stammdaten.land, "US");
    assert.equal(p.stammdaten.us_eigner, true);
    const text = JSON.stringify(p);
    assert.doesNotMatch(text, /PRIVAT|privates Muster|nicht im Katalog/i);
  });
}

test("anbieterZahl: trennt europäische und US-Anbieter in drei Formen", () => {
  const eu = Array.from({ length: 21 }, () => ({ stammdaten: { land: "DE" } }));
  const us = Array.from({ length: 3 }, () => ({ stammdaten: { land: "US" } }));
  const alle = eu.concat(us);
  assert.equal(R.anbieterZahl(alle), "21 europäische und 3 US-KI-Anbieter");
  assert.equal(R.anbieterZahl(alle, "dativ"), "21 europäischen und 3 US-KI-Anbietern");
  assert.equal(R.anbieterZahl(alle, "alle"), "21 europäischen und 3 US-KI-Anbieter");
  assert.equal(R.anbieterZahl(eu), "21 europäische KI-Anbieter");
  assert.equal(R.anbieterZahl(eu, "dativ"), "21 europäischen KI-Anbietern");
  assert.equal(R.anbieterZahl(us), "3 US-KI-Anbieter");
  assert.equal(R.anbieterZahl([]), "0 KI-Anbieter");
});

// EH1 Teil 2 (22.10.2026): DPF-Teilnahme je US-Anbieter aus der amtlichen Liste dataprivacyframework.gov.
// Microsoft (Id 6474) und Google (Id 5780) aktiv, OpenAI weder aktiv noch inaktiv gelistet.
const DPF_ERWARTET = { "microsoft-copilot": true, "google-gemini-workspace": true, "openai-chatgpt-enterprise": false };
for (const [id, wert] of Object.entries(DPF_ERWARTET)) {
  test(`${id}: DPF-Teilnahme belegt (${wert ? "ja" : "nein"}) mit Quelle und Prüfdatum`, () => {
    const d = lade(id).stammdaten.dpf;
    assert.ok(d, "stammdaten.dpf fehlt");
    assert.equal(d.status, "belegt");
    assert.equal(d.wert, wert);
    assert.match(d.quelle, /^https:\/\/www\.dataprivacyframework\.gov\//);
    assert.match(d.geprueft, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(d.anmerkung && d.anmerkung.length > 20);
  });
}

test("rechtsraumHinweis: nennt die DPF-Teilnahme je Anbieter statt des allgemeinen Satzes", () => {
  const ja = { stammdaten: { land: "US", dpf: { status: "belegt", wert: true, geprueft: "2026-10-22" } } };
  const nein = { stammdaten: { land: "US", dpf: { status: "belegt", wert: false, geprueft: "2026-10-22" } } };
  const offen = { stammdaten: { land: "US" } };
  const eu = { stammdaten: { land: "DE" } };
  assert.match(R.rechtsraumHinweis(ja), /nimmt .*teil/);
  assert.doesNotMatch(R.rechtsraumHinweis(ja), /nicht/);
  assert.match(R.rechtsraumHinweis(nein), /nicht/);
  assert.match(R.rechtsraumHinweis(nein), /Art\. 46/);
  assert.equal(R.rechtsraumHinweis(offen), R.LAND_INFO.US.hinweis);
  assert.equal(R.rechtsraumHinweis(eu), null);
});

test("rechtsraumKurz: Tabelle zeigt DPF ja/nein", () => {
  assert.equal(R.rechtsraumKurz({ stammdaten: { land: "US", dpf: { status: "belegt", wert: true } } }), "DPF-Teilnehmer");
  assert.equal(R.rechtsraumKurz({ stammdaten: { land: "US", dpf: { status: "belegt", wert: false } } }), "Drittland, nicht im DPF");
  assert.equal(R.rechtsraumKurz({ stammdaten: { land: "US" } }), R.RAUM_KURZ.dpf);
  assert.equal(R.rechtsraumKurz({ stammdaten: { land: "DE" } }), "EU");
});
