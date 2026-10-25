"use strict";
// Auditor-Hinweise (Fachantwort 19.10.2026), Felix' „ja“ zu 438 + 441 am 22.10.2026:
// Opt-out ist kein „kein Training“, ISO 27001 ist kein Datenschutz-Nachweis, Registerabgleich Art. 40–43.
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const R = require("../lib/register.js");
const { baueZeilen, rendere } = require("../lib/dossier.js");
const { pruefeNormenbezug } = require("../lib/normenbezug.js");

const WURZEL = path.join(__dirname, "..");
const lies = (...t) => fs.readFileSync(path.join(WURZEL, ...t), "utf8");
const anbieter = (id) => JSON.parse(lies("data", "anbieter", id + ".json"));

test("Übersicht: Spaltenkopf heißt „Kein Training“ mit Erklärung, nicht mehr „Training-Opt-out“", () => {
  const b = lies("build.js");
  assert.match(b, /<th title="[^"]*Opt-out zählt nicht[^"]*">Kein Training<\/th>/);
  assert.doesNotMatch(b, /<th>Training-Opt-out<\/th>/);
});

test("Filter, Kommunen-Text und Profil-„nein“ nennen kein „Trainings-Opt-out“ mehr als Nachweis", () => {
  const b = lies("build.js");
  assert.match(b, /nur AVV, Subprozessoren und „kein Training“ belegt/);
  assert.match(b, /AVV, kein Training mit Kundendaten\.`/);
  assert.match(b, /Nein: Anbieter trainiert mit Kundendaten oder nur, bis der Kunde widerspricht \(Opt-out\)/);
  assert.doesNotMatch(b, />[^<]*Trainings?-Opt-out/);
});

test("Methodik erklärt „Kein Training“: Opt-out reicht nicht, Art. 28 prüfen wir nicht", () => {
  const b = lies("build.js");
  assert.match(b, /„Kein Training“ heißt: Der Anbieter sagt in einem eigenen Dokument zu, Kundendaten nicht zu trainieren\. Ein Opt-out reicht dafür nicht\./);
  assert.match(b, /Ob der Vertrag im Übrigen Art\. 28 DSGVO genügt, prüfen wir nicht/);
});

test("Mistral: nur Opt-out → „kein Training“ unbelegt, Grund vorn in der Anmerkung", () => {
  const t = anbieter("mistral").vertrag.training_opt_out;
  assert.equal(t.wert, null);
  assert.equal(t.status, "unbelegt");
  assert.match(t.anmerkung, /^Kein Training nur per Opt-out; Voreinstellung für Pay-as-you-go ungeklärt; Preview-Modelle ohne Opt-out\./);
  assert.ok(t.quelle, "Quelle bleibt stehen, damit der Wechsel nachvollziehbar ist");
});

test("Guides: ISO 27001 kein Datenschutz-Nachweis, Training per Gesetz ausgeschlossen, keine „eine Stunde“-Formel", () => {
  assert.match(lies("guides", "04-zertifikate.html"), /Datenschutzrechtlich ist ISO 27001 kein Nachweis: Die DSGVO kennt dafür nur Zertifizierungen nach Art\. 42/);
  assert.match(lies("guides", "05-kommunen.html"), /ISO 27001 die Untergrenze \(Informationssicherheit, kein Datenschutz-Nachweis\)/);
  const g = lies("guides", "02-dsgvo-ki.html");
  assert.match(g, /Art\. 28 Abs\. 3 lit\. a DSGVO\), also nie für eigenes Training/);
  assert.doesNotMatch(g, /in einer Stunde freigeben/);
  assert.match(g, /Ob der AVV inhaltlich Art\. 28 genügt, ist dann seine Prüfung, nicht unsere\./);
});

// --- Registerfeld (441) ---

test("Register: jeder Anbieter hat einen Abgleich, Ergebnis aus der festen Liste", () => {
  const reg = R.ladeRegister();
  const ids = fs.readdirSync(path.join(WURZEL, "data", "anbieter")).filter((f) => f.endsWith(".json")).map((f) => f.replace(/\.json$/, ""));
  for (const id of ids) {
    const e = R.registerZu(id, reg);
    assert.ok(R.ERGEBNIS_LABEL[e.ergebnis], `${id}: unbekanntes Ergebnis ${e.ergebnis}`);
    assert.notEqual(e.ergebnis, "nicht_geprueft", `${id} fehlt im Registerabgleich`);
    assert.match(e.stand, /^\d{4}-\d{2}-\d{2}$/);
  }
});

test("Register: OVHcloud wirbt mit dem Kodex, steht aber nicht im Register; T-Systems nicht mehr; Regolo nur über Seeweb", () => {
  const reg = R.ladeRegister();
  assert.equal(R.registerZu("ovhcloud", reg).ergebnis, "beansprucht_nicht_im_register");
  assert.equal(R.registerZu("t-systems", reg).ergebnis, "beansprucht_nicht_im_register");
  const r = R.registerZu("regolo", reg);
  assert.equal(r.ergebnis, "mutter_im_register");
  assert.match(r.text, /Seeweb/);
  assert.equal(R.registerZu("mistral", reg).ergebnis, "kein_eintrag");
});

test("Register: unbekannte ID ergibt „nicht geprüft“ statt Absturz", () => {
  const e = R.registerZu("gibt-es-nicht", R.ladeRegister());
  assert.equal(e.ergebnis, "nicht_geprueft");
});

test("Register-Zeile im Profil: Label, Ergebnis, Quelle, Datum und der Satz zu ISO 27001", () => {
  const html = R.registerZeileHtml(R.registerZu("ovhcloud", R.ladeRegister()));
  assert.match(html, /Datenschutz-Nachweis laut Register/);
  assert.match(html, /nur Selbstangabe, nicht im Register/);
  assert.match(html, /href="https:\/\/www\.codeofconduct\.cloud\/public-register\/"/);
  assert.match(html, /abgeglichen 22\.10\.2026/);
  assert.match(html, /ISO 27001 gehört nicht dazu/);
  assert.doesNotMatch(R.registerZeileHtml({ ergebnis: "kein_eintrag", text: "<b>", quelle: null, stand: "2026-10-22" }), /<b>/);
});

// --- Dossier ---

const profil = () => ({
  id: "ovhcloud", name: "X", geprueft: "2026-10-01",
  stammdaten: { sitz: "Paris" },
  vertrag: { avv: { wert: "https://x.example/avv", status: "belegt", quelle: "https://x.example/avv" } },
  zertifikate: [{ typ: "ISO 27001", status: "belegt", quelle: "https://x.example/iso" }],
  modelle: [],
});

test("Dossier: ISO-27001-Hinweis und Registerzeile, beides ohne Normenbezug (Regel 18.09.2026)", () => {
  const p = profil();
  const text = rendere(p, baueZeilen(p), [], { datum: "2026-10-22" });
  assert.match(text, /Der Prüfpunkt „ISO 27001 belegt“ sagt nur etwas über Informationssicherheit\./);
  assert.match(text, /\*\*Eintrag in Registern für Datenschutz-Verhaltensregeln und Datenschutz-Zertifizierungen, abgeglichen 22\.10\.2026:\*\* nur Selbstangabe, nicht im Register\./);
  assert.deepEqual(pruefeNormenbezug(text), []);
});

test("Dossier: ohne Prüfpunkt ISO 27001 in der Auswahl kein ISO-Satz", () => {
  const p = profil();
  const text = rendere(p, baueZeilen(p), [], { datum: "2026-10-22", vorgaben: ["avv"] });
  assert.doesNotMatch(text, /sagt nur etwas über Informationssicherheit/);
});
