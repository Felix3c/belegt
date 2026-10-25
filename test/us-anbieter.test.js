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

// EH1 Teil 2c (22.10.2026): die API-Produkte als eigene Profile. Gleiche Firma wie das Assistenten-Profil,
// darum gleiche DPF-Antwort; Kategorie Cloud (Azure, Vertex) bzw. Modell-Anbieter (OpenAI API).
const API_ERWARTET = {
  "azure-openai": { kategorie: "cloud", dpf: true },
  "google-vertex-gemini-api": { kategorie: "cloud", dpf: true },
  "openai-api": { kategorie: "modell-anbieter", dpf: false },
};
// WX1 (23.10.2026): Anthropic als vierte US-Firma, wie EH1 Teil 2c. DPF-Liste: 0 Treffer für „Anthropic“,
// „Anthropic PBC“, „Anthropic Ireland“, „Claude“ (aktiv und alle Status). API = Modell-Anbieter,
// Claude for Work (Team/Enterprise) = Assistent wie ChatGPT Enterprise.
const ANTHROPIC_ERWARTET = {
  "anthropic-api": { kategorie: "modell-anbieter", dpf: false },
  "anthropic-claude-enterprise": { kategorie: "assistent", dpf: false },
};
// WX1 (23.10.2026): Amazon Bedrock als Modell-Plattform in der AWS-Cloud, Kategorie Cloud wie Azure OpenAI
// und Vertex. DPF-Antwort aus der amtlichen Liste (Beleg belege/rechtsraum/dpf-amazon-2026-10-23/).
const BEDROCK_ERWARTET = {
  "amazon-bedrock": { kategorie: "cloud", dpf: true },
};
for (const [id, e] of Object.entries({ ...API_ERWARTET, ...ANTHROPIC_ERWARTET, ...BEDROCK_ERWARTET })) {
  test(`${id}: API-Profil im Katalog mit Kategorie, DPF und Belegen`, () => {
    const p = lade(id);
    assert.equal(p.id, id);
    assert.equal(p.kategorie, e.kategorie);
    assert.equal(p.stammdaten.land, "US");
    assert.equal(p.stammdaten.us_eigner, true);
    assert.equal(p.stammdaten.dpf.status, "belegt");
    assert.equal(p.stammdaten.dpf.wert, e.dpf);
    assert.ok(p.modelle.length >= 1, "mindestens ein Modell");
    for (const feld of ["avv", "subprozessoren", "training_opt_out", "zero_data_retention", "zweckbindung", "log_frist"]) {
      const f = p.vertrag[feld];
      assert.ok(f, `vertrag.${feld} fehlt`);
      assert.ok(["belegt", "beansprucht", "unbelegt"].includes(f.status), `${feld}: Status ${f.status}`);
      assert.match(f.geprueft, /^\d{4}-\d{2}-\d{2}$/);
      if (f.status !== "unbelegt") assert.match(f.anmerkung, /„[^“]{10,}“/, `${feld}: wörtliches Zitat fehlt`);
    }
    assert.doesNotMatch(JSON.stringify(p), /PRIVAT|privates Muster|nicht im Katalog/i);
    const belege = path.join(__dirname, "..", "belege", "anbieter", id);
    assert.ok(fs.existsSync(path.join(belege, "SHA256SUMS")), "Belegkopien mit SHA256SUMS fehlen");
    assert.ok(fs.existsSync(path.join(belege, "QUELLEN.md")), "QUELLEN.md fehlt");
  });
}

// WX1 (23.10.2026): Amazon Bedrock ist der erste Dienst, der selbst in einem Register steht (CISPE-Kodex,
// „Amazon Bedrock [excludes Amazon Bedrock Marketplace]“). Dafür braucht es ein eigenes Ergebnis, nicht
// „Konzern im Register“.
test("amazon-bedrock: Registerabgleich nennt den CISPE-Eintrag des Dienstes", () => {
  const REG = require("../lib/register.js");
  assert.ok(REG.ERGEBNIS_LABEL.dienst_im_register, "Label dienst_im_register fehlt");
  const e = REG.registerZu("amazon-bedrock", REG.ladeRegister());
  assert.equal(e.ergebnis, "dienst_im_register");
  assert.match(e.text, /CISPE/);
  assert.match(e.text, /Marketplace/);
});
