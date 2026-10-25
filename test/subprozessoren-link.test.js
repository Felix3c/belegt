"use strict";
// Liste und Zählung der Unterauftragnehmer müssen auf dieselbe Liste zeigen (Nachtrag aus LP1, 24.10.2026):
// Beim Zählen am 23./24.10. stellte sich heraus, dass drei Profile auf die falsche oder gar keine Liste
// verlinkten (IONOS: Gruppenliste statt IONOS-Cloud-Liste, EUrouter: /providers statt DPA,
// Azure OpenAI und Copilot: „nicht ohne Anmeldung“, obwohl die Liste inzwischen offen lesbar ist).
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");

const DATA = path.join(__dirname, "..", "data", "anbieter");
const lade = (id) => JSON.parse(fs.readFileSync(path.join(DATA, `${id}.json`), "utf8"));
const alle = () => fs.readdirSync(DATA).filter((f) => f.endsWith(".json")).map((f) => lade(f.slice(0, -5)));

test("belegte Zählung → Liste ist nicht nur beansprucht", () => {
  const falsch = alle().filter((p) => {
    const v = p.vertrag || {};
    return v.subprozessoren_anzahl && v.subprozessoren_anzahl.status === "belegt" && v.subprozessoren && v.subprozessoren.status !== "belegt";
  }).map((p) => p.id);
  assert.deepEqual(falsch, []);
});

test("belegte Liste ist ein Link", () => {
  const falsch = alle().filter((p) => {
    const s = (p.vertrag || {}).subprozessoren;
    return s && s.status === "belegt" && !/^https:\/\//.test(s.wert || "");
  }).map((p) => p.id);
  assert.deepEqual(falsch, []);
});

const ZIEL = {
  ionos: "https://cloud.ionos.de/terms-gtc/fileadmin/pdf/terms-gtc/cloud/avv/IONOS-Cloud-GmbH_DE_subprocessor.pdf",
  eurouter: "https://eurouter.ai/dpa",
  "azure-openai": "https://servicetrust.microsoft.com/DocumentPage/115f1cb5-7f7b-4a5e-838d-df6d03c84dda",
  "microsoft-copilot": "https://servicetrust.microsoft.com/DocumentPage/115f1cb5-7f7b-4a5e-838d-df6d03c84dda",
};

for (const [id, url] of Object.entries(ZIEL)) {
  test(`${id}: Link zeigt auf die Liste, die auch gezählt wurde`, () => {
    const s = lade(id).vertrag.subprozessoren;
    assert.equal(s.wert, url);
    assert.equal(s.status, "belegt");
    // Der tägliche Quellenlauf setzt „geprueft“ bei unveränderter Quelle neu (25.10.: fest „2026-10-24“ war zu streng).
    assert.ok(s.geprueft >= "2026-10-24", `geprueft ${s.geprueft} liegt vor dem Zähltag`);
    assert.doesNotMatch(s.anmerkung, /nicht ohne Anmeldung|nicht lesbar|nicht gelesen/);
  });
}

// Handprüfung 25.10.2026: Azure OpenAI und Copilot zählen dieselbe Microsoft-Liste (Stand 10.09.2026),
// standen aber bei 89 und 88. Nachgezählt im PDF: 7 + 4 + 5 + 35 Fremdfirmen und 37 Rechenzentrums-
// Gesellschaften = 88. Gleiche Liste muss gleiche Zahl ergeben.
// Ausnahmen mit Grund: Anthropic zählt je Produkt (Liste nennt das Produkt je Eintrag, 18 API / 19 Claude for Work).
// OpenAI zählt ebenfalls je Produkt (14 Fremdfirmen-Zeilen für die API, 17 für ChatGPT Enterprise, je + 5 Konzerngesellschaften).
const JE_PRODUKT = new Set(["anthropic-api", "anthropic-claude-enterprise", "openai-api", "openai-chatgpt-enterprise"]);

test("gleiche Liste → gleiche Zahl der Unterauftragnehmer", () => {
  const je = {};
  for (const p of alle()) {
    if (JE_PRODUKT.has(p.id)) continue;
    const v = p.vertrag || {};
    if (!v.subprozessoren || !v.subprozessoren_anzahl || v.subprozessoren_anzahl.status !== "belegt") continue;
    (je[v.subprozessoren.wert] = je[v.subprozessoren.wert] || []).push(`${p.id}=${v.subprozessoren_anzahl.wert}`);
  }
  const falsch = Object.values(je).filter((l) => new Set(l.map((x) => x.split("=")[1])).size > 1);
  assert.deepEqual(falsch, []);
});

test("Microsoft-Liste 10.09.2026: 88 Zeilen, 37 Rechenzentrums-Gesellschaften", () => {
  for (const id of ["azure-openai", "microsoft-copilot"]) {
    const a = lade(id).vertrag.subprozessoren_anzahl;
    assert.equal(a.wert, 88, id);
    assert.match(a.anmerkung, /\b37 (konzerninterne|Microsoft-Rechenzentrum)/, id);
  }
});

// OA-Z 25.10.2026: Archivkopie 21.10.2026 (Stand „Last updated: October 14, 2026“) nachgezählt:
// 17 Fremdfirmen-Zeilen (Cloudflare zweimal), davon 14 mit „API“, dazu 5 OpenAI-Gesellschaften.
// openai-api nannte für die ganze Liste 18 Zeilen; beide Profile müssen dieselbe Gesamtzahl nennen.
test("OpenAI-Liste 14.10.2026: 17 Fremdfirmen-Zeilen, API 14 + 5, Enterprise 17 + 5", () => {
  const api = lade("openai-api").vertrag.subprozessoren_anzahl;
  const ent = lade("openai-chatgpt-enterprise").vertrag.subprozessoren_anzahl;
  assert.equal(api.wert, 19);
  assert.equal(ent.wert, 22);
  for (const a of [api, ent]) {
    assert.match(a.anmerkung, /\b17 Drittanbieter-Zeilen/);
    assert.doesNotMatch(a.anmerkung, /\b18 Drittanbieter-Zeilen/);
  }
});
