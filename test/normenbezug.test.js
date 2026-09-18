"use strict";
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { pruefeNormenbezug, pruefeProfilUndFaelle } = require("../lib/normenbezug.js");
const { baueZeilen, rendere, erzeugeDossier, schreibeDossier } = require("../lib/dossier.js");

// Dieselbe Profil-Fixture wie in dossier.test.js — bewusst frei von Normenbezug.
const sauberesProfil = () => ({
  id: "x", name: "X", geprueft: "2026-08-20",
  stammdaten: { sitz: "Paris", website: "https://x.example" },
  vertrag: {
    avv: { wert: "https://x.example/avv.pdf", status: "belegt", quelle: "https://x.example/avv.pdf", anmerkung: "AVV als PDF." },
    subprozessoren: { wert: null, status: "unbelegt", quelle: null, anmerkung: "Keine Liste gefunden." },
    zero_data_retention: { wert: true, status: "belegt", quelle: "https://x.example/privacy/", anmerkung: "" },
  },
  zertifikate: [{ typ: "SOC 2", status: "beansprucht", quelle: "https://x.example/trust", anmerkung: "Nur Logo." }],
  modelle: [{ name: "M1", status: "belegt", quelle: "https://x.example/m", standort: "Paris", preis_input_1m_eur: 1, preis_output_1m_eur: 2 }],
});

test("Sauberes Dossier (profil()-Fixture, gerendert) ergibt keinen Fund", () => {
  const profil = sauberesProfil();
  const zeilen = baueZeilen(profil);
  const md = rendere(profil, zeilen, [], { datum: "2026-09-18" });
  assert.deepEqual(pruefeNormenbezug(md), []);
});

test("Erkennt einfaches Paragraphenzeichen §", () => {
  const funde = pruefeNormenbezug("Dies verstößt gegen § 5 UWG.");
  assert.ok(funde.some((f) => f.muster === "§"));
});

test("Erkennt doppeltes Paragraphenzeichen §§", () => {
  const funde = pruefeNormenbezug("Siehe §§ 3, 4 BGB.");
  assert.ok(funde.some((f) => f.muster === "§§"));
});

test("Erkennt 'Art. <Zahl>' und 'Art.-<Zahl>'", () => {
  assert.ok(pruefeNormenbezug("Art. 28 DSGVO regelt das.").some((f) => /Art\.\s?28/.test(f.muster)));
  assert.ok(pruefeNormenbezug("Deckt Art.-28-DSGVO-Pflichten ab.").some((f) => f.muster.startsWith("Art.-28")));
});

test("Erkennt 'Artikel <Zahl>', aber nicht 'Artikel' ohne Zahl", () => {
  assert.ok(pruefeNormenbezug("Artikel 28 der Verordnung.").some((f) => f.muster === "Artikel 28"));
  assert.deepEqual(pruefeNormenbezug("Die Artikelnummer steht auf der Rechnung."), []);
});

test("'Art.' schlägt nicht in 'Artefakt' oder 'Quartal' fälschlich an (Wortgrenzen)", () => {
  assert.deepEqual(pruefeNormenbezug("Das Artefakt bleibt im nächsten Quartal unverändert."), []);
});

test("Erkennt Gesetzeskürzel, case-insensitiv", () => {
  for (const [kuerzel, text] of [
    ["UWG", "Ein Fall nach dem UWG."],
    ["DSGVO", "Das regelt die dsgvo."],
    ["GDPR", "Under the GDPR this applies."],
    ["RDG", "Das RDG begrenzt uns."],
    ["KI-VO", "Die KI-VO gilt ab 2026."],
    ["AI Act", "Der AI Act verlangt Transparenz."],
    ["DMA", "Der DMA nennt Gatekeeper."],
  ]) {
    const funde = pruefeNormenbezug(text);
    assert.ok(funde.length > 0, `${kuerzel} sollte erkannt werden`);
  }
});

test("Erkennt Bewertungswörter in ASCII-Schreibweise", () => {
  const funde = pruefeNormenbezug("Das ist irrefuehrend und taeuscht den Kunden, ein klarer Verstoss.");
  assert.ok(funde.some((f) => f.muster === "irrefuehrend"));
  assert.ok(funde.some((f) => f.muster === "taeuscht"));
  assert.ok(funde.some((f) => f.muster === "Verstoss"));
});

test("Erkennt dieselben Bewertungswörter mit Umlauten", () => {
  const funde = pruefeNormenbezug("Das ist irreführend und täuscht den Kunden, ein klarer Verstoß, das verstößt gegen Treu und Glauben.");
  assert.ok(funde.some((f) => f.muster === "irreführend"));
  assert.ok(funde.some((f) => f.muster === "täuscht"));
  assert.ok(funde.some((f) => f.muster === "Verstoß"));
  assert.ok(funde.some((f) => f.muster === "verstößt"));
});

test("Erkennt weitere Bewertungswörter ohne Umlaut-Variante", () => {
  const funde = pruefeNormenbezug("Rechtswidrig, wettbewerbswidrig, haftbar, Haftung, abmahnfähig und unlauter zugleich.");
  const gefunden = funde.map((f) => f.muster.toLowerCase());
  for (const wort of ["rechtswidrig", "wettbewerbswidrig", "haftbar", "haftung", "abmahnfähig", "unlauter"]) {
    assert.ok(gefunden.includes(wort), `${wort} sollte erkannt werden`);
  }
});

test("Erkennt Bewertungsphrasen: 'im Sinne von', 'i.S.d.', 'i.S.v.', 'nach unserer Einschätzung', 'rechtlich'", () => {
  assert.ok(pruefeNormenbezug("Irreführend im Sinne von § 5 UWG.").some((f) => f.muster === "im Sinne von"));
  assert.ok(pruefeNormenbezug("Ein Fall i.S.d. UWG.").some((f) => f.muster === "i.S.d."));
  assert.ok(pruefeNormenbezug("Ein Fall i.S.v. UWG.").some((f) => f.muster === "i.S.v."));
  assert.ok(pruefeNormenbezug("Nach unserer Einschätzung ist das unzulässig.").some((f) => /Einsch(ä|ae)tzung/.test(f.muster)));
  assert.ok(pruefeNormenbezug("Das ist rechtlich zu bewerten.").some((f) => f.muster === "rechtlich"));
});

test("Erlaubt-Liste (rein tatsächliche Formulierungen) bleibt sauber", () => {
  const text = [
    "Kein Beleg gefunden für die Subprozessoren-Liste.",
    "Der Anbieter hat nicht beantwortet.",
    "Wir erhielten keine Antwort.",
    "Beleg fehlt für dieses Feld.",
    "Geprüft am 2026-09-18, Frist 2026-10-01.",
    "Quelle: https://scaleway.com/en/security-and-compliance/",
    "Zertifikat ISO 27001 laut Anbieterangabe.",
  ].join(" ");
  assert.deepEqual(pruefeNormenbezug(text), []);
});

test("Zeilennummern stimmen bei mehrzeiligem Text", () => {
  const text = "Zeile eins, sauber.\nZeile zwei mit § 5 UWG.\nZeile drei, sauber.\nZeile vier ist irreführend.";
  const funde = pruefeNormenbezug(text);
  const zeilen = funde.map((f) => f.zeile).sort((a, b) => a - b);
  assert.deepEqual(zeilen, [2, 2, 4]);
  assert.ok(funde.find((f) => f.muster === "§").fundstelle.includes("Zeile zwei"));
  assert.ok(funde.find((f) => f.muster === "irreführend").fundstelle.includes("Zeile vier"));
});

test("Integration: erzeugeDossier wirft bei eingeschmuggeltem '§ 5 UWG' in einer Anmerkung", () => {
  const profil = sauberesProfil();
  profil.vertrag.subprozessoren.anmerkung = "Keine Liste gefunden, das wäre irreführend im Sinne von § 5 UWG.";
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "normenbezug-"));
  const dataDir = path.join(tmp, "data");
  fs.mkdirSync(path.join(dataDir, "anbieter"), { recursive: true });
  fs.writeFileSync(path.join(dataDir, "anbieter", "x.json"), JSON.stringify(profil));
  assert.throws(
    () => erzeugeDossier("x", { datum: "2026-09-18", dataDir }),
    /Normenbezug/,
  );
});

test("Feld-Ausnahme: Zitatfeld mit Gesetzesbezug läuft durch, Anmerkung mit demselben Text wirft (Beschluss 18.09.)", () => {
  // Wörtliche Anbieteraussage im Feld "zitat" — Tatsache, ausgenommen.
  const zitatProfil = sauberesProfil();
  zitatProfil.vertrag.avv.zitat = "Der Anbieter schreibt wörtlich: 'Der AI Act verlangt bei uns keine Transparenzdokumentation nach Art. 53.'";
  assert.deepEqual(pruefeProfilUndFaelle(zitatProfil, []), []);

  // Derselbe Wortlaut in unserer eigenen Anmerkung — eigener Text, bleibt streng.
  const anmerkungProfil = sauberesProfil();
  anmerkungProfil.vertrag.avv.anmerkung = "Der AI Act verlangt bei uns keine Transparenzdokumentation nach Art. 53.";
  const funde = pruefeProfilUndFaelle(anmerkungProfil, []);
  assert.ok(funde.length > 0, "Anmerkung mit Normenbezug sollte einen Fund ergeben");
  assert.ok(funde.some((f) => f.feld === "profil.vertrag.avv.anmerkung"));
});

test("Feld-Ausnahme: Fall-Kurztext mit Normenbezug wirft, Fall-Behauptungszitat wird nicht geprüft", () => {
  const fallMitNormenbezugImKurz = {
    id: "9001", kurz: "Im Abschnitt zum AI Act sagt der Anbieter das Gegenteil.",
    behauptung: [{ zitat: "We fully comply with the AI Act and § 5 UWG.", quelle: "https://x.example" }],
  };
  const funde = pruefeProfilUndFaelle(sauberesProfil(), [fallMitNormenbezugImKurz]);
  assert.ok(funde.some((f) => f.feld === "fall[9001].kurz"));
  // Das Zitat in der Behauptung landet nicht im Dossier (Abschnitt 3 zeigt nur den Kurztext) und wird
  // deshalb bewusst nicht geprüft — kein Fund mit diesem Feldpfad.
  assert.ok(!funde.some((f) => String(f.feld).includes("behauptung")));
});

test("Integration: erzeugeDossier-Fehlermeldung nennt das betroffene Feld", () => {
  const profil = sauberesProfil();
  profil.vertrag.avv.anmerkung = "Das deckt Art. 28 DSGVO ab.";
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "normenbezug-"));
  const dataDir = path.join(tmp, "data");
  fs.mkdirSync(path.join(dataDir, "anbieter"), { recursive: true });
  fs.writeFileSync(path.join(dataDir, "anbieter", "x.json"), JSON.stringify(profil));
  try {
    erzeugeDossier("x", { datum: "2026-09-18", dataDir });
    assert.fail("hätte werfen müssen");
  } catch (e) {
    assert.match(e.message, /Feld profil\.vertrag\.avv\.anmerkung/);
  }
});

test("Integration: Scaleway-Profil (bereinigt, Beschluss 18.09.) erzeugt das Dossier ohne erlaubeNormenbezug", () => {
  const r = erzeugeDossier("scaleway", { datum: "2026-09-18" });
  assert.match(r.markdown, /# Anbieter-Dossier: Scaleway/);
  assert.doesNotMatch(r.markdown, /Art\.-53/);
});

test("Integration: schreibeDossier mit erlaubeNormenbezug:true schreibt trotz Normenbezug", () => {
  const profil = sauberesProfil();
  profil.vertrag.subprozessoren.anmerkung = "Verstoß gegen § 5 UWG eingeschmuggelt.";
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "normenbezug-"));
  const dataDir = path.join(tmp, "data");
  fs.mkdirSync(path.join(dataDir, "anbieter"), { recursive: true });
  fs.writeFileSync(path.join(dataDir, "anbieter", "x.json"), JSON.stringify(profil));
  const r = schreibeDossier("x", { datum: "2026-09-18", dataDir, ausgabeDir: path.join(tmp, "out"), erlaubeNormenbezug: true });
  assert.ok(fs.existsSync(r.pfad));
  assert.match(fs.readFileSync(r.pfad, "utf8"), /Verstoß gegen § 5 UWG/);
});
