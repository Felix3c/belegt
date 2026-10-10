"use strict";
const { test } = require("node:test");
const assert = require("node:assert/strict");
const V = require("../lib/vorgaben.js");
const { pruefeNormenbezug } = require("../lib/normenbezug.js");
const { baueZeilen, rendere } = require("../lib/dossier.js");

const feld = (wert, status = "belegt", anmerkung = "") => ({ wert, status, quelle: status === "unbelegt" ? null : "https://x.example/q", geprueft: "2026-10-09", anmerkung });

/** Profil, in dem alle 15 Vorgaben „ja“ ergeben. */
const voll = () => ({
  id: "x", name: "X", geprueft: "2026-10-09",
  vertrag: {
    avv: feld("https://x.example/avv.pdf"), subprozessoren: feld("https://x.example/sub"),
    training_opt_out: feld(true), zero_data_retention: feld(true), zweckbindung: feld(true),
    betroffenenrechte_traeger: feld("geteilt"), log_frist: feld("30 Tage"), log_zweck: feld("Missbrauch"),
  },
  zertifikate: [{ typ: "ISO/IEC 27001:2022", status: "belegt", quelle: "https://x.example/iso.pdf",
    anwendungsbereich: feld("ganzes Unternehmen"), zertifizierer: feld("TÜV"), akkreditiert_dakks: feld(true) }],
  modelle: [
    { name: "M1", status: "belegt", quelle: "https://x.example/m", standort: "Paris, Frankreich", backup_standort: feld("Paris"), vorgeschaltete_filter: feld(false) },
    { name: "M2", status: "belegt", quelle: "https://x.example/m", standort: "Deutschland", backup_standort: feld("Frankfurt"), vorgeschaltete_filter: feld(true) },
  ],
});
const punkt = (e, id) => e.punkte.find((p) => p.id === id);

test("15 Vorgaben in fester Reihenfolge; volles Profil ergibt „ja“", () => {
  assert.equal(V.VORGABEN.length, 15);
  const e = V.werteAus(voll());
  assert.deepEqual(e.punkte.map((p) => p.ergebnis), Array(15).fill("ja"));
  assert.equal(e.gesamt, "ja");
  assert.deepEqual(e.zahl, { ja: 15, nein: 0, nicht_belegbar: 0 });
});

test("„nein“ nur, wenn belegt und die belegte Angabe die Vorgabe nicht trifft; ein „nein“ macht das Ganze „nein“", () => {
  const p = voll();
  p.vertrag.zweckbindung = feld(false, "belegt", "Doku: Daten auch für Monitoring genutzt.");
  p.vertrag.log_frist = feld(null, "unbelegt");
  const e = V.werteAus(p);
  assert.equal(punkt(e, "zweckbindung").ergebnis, "nein");
  assert.equal(punkt(e, "log_frist").ergebnis, "nicht_belegbar");
  assert.equal(e.gesamt, "nein");
});

test("beansprucht heißt „nicht belegbar“, auch wenn der Wert die Vorgabe träfe", () => {
  const p = voll();
  p.vertrag.zero_data_retention = feld(true, "beansprucht");
  const e = V.werteAus(p);
  assert.equal(punkt(e, "zero_data_retention").ergebnis, "nicht_belegbar");
  assert.equal(e.gesamt, "nicht_belegbar");
});

test("Kein ISO-27001-Zertifikat im Profil: Punkte 6–9 „nicht belegbar“, nie „nein“", () => {
  const p = voll();
  p.zertifikate = [{ typ: "SOC 2", status: "belegt", quelle: "https://x.example/soc" }];
  const e = V.werteAus(p);
  for (const id of ["iso27001", "anwendungsbereich", "zertifizierer", "akkreditiert"]) assert.equal(punkt(e, id).ergebnis, "nicht_belegbar", id);
});

test("Akkreditierung: DAkkS „nein“ mit EA-MLA-Stelle zählt als „ja“, ohne Stelle als „nein“ (Befund V3)", () => {
  const p = voll();
  p.zertifikate[0].akkreditiert_dakks = { ...feld(false), stelle: "COFRAC", stelle_ea_mla: true };
  assert.equal(punkt(V.werteAus(p), "akkreditiert").ergebnis, "ja");
  p.zertifikate[0].akkreditiert_dakks = feld(false);
  assert.equal(punkt(V.werteAus(p), "akkreditiert").ergebnis, "nein");
});

test("Modell-Punkte: alle Modelle müssen treffen; ein unbelegtes Modell macht den Punkt „nicht belegbar“", () => {
  const p = voll();
  p.modelle[1].backup_standort = feld(null, "unbelegt");
  assert.equal(punkt(V.werteAus(p), "backup_standort").ergebnis, "nicht_belegbar");
  assert.equal(punkt(V.werteAus(p), "backup_standort").wo, "M2");
  assert.equal(punkt(V.werteAus(voll()), "backup_standort").wo, null);
  p.modelle = [];
  for (const id of ["standort_eu", "backup_standort", "filter"]) assert.equal(punkt(V.werteAus(p), id).ergebnis, "nicht_belegbar", id);
});

test("Standort EU: nur eindeutige Wortlaute zählen; gemischte oder leere gelten als „nicht belegbar“", () => {
  assert.equal(V.standortEu("Paris, Frankreich"), "ja");
  assert.equal(V.standortEu("EU (Google Vertex EU-Region)"), "ja");
  assert.equal(V.standortEu("Schweiz (eigene Rechenzentren)"), "nein");
  assert.equal(V.standortEu("Global (Serverless: Ort wechselt ohne Ankündigung)"), "nein");
  assert.equal(V.standortEu("Region wählbar (global/EU/US)"), "nicht_belegbar");
  assert.equal(V.standortEu("EU (Standard-Endpoint; US nur per Opt-in)"), "nicht_belegbar");
  assert.equal(V.standortEu("GCP oder Azure, Region nicht genannt"), "nicht_belegbar");
  assert.equal(V.standortEu(null), "nicht_belegbar");
  const p = voll();
  p.modelle[1].standort = "Schweiz (eigene Rechenzentren)";
  assert.equal(punkt(V.werteAus(p), "standort_eu").ergebnis, "nein");
});

test("Offener Fall zu einem Prüfpunkt macht ihn „nicht belegbar“; ein bestätigter Fall ist nur Hinweis (K5, 219)", () => {
  const offen = [{ id: "2026-009", feld: "vertrag.zero_data_retention", status: "offen" }];
  const e = V.werteAus(voll(), { faelle: offen });
  assert.equal(punkt(e, "zero_data_retention").ergebnis, "nicht_belegbar");
  assert.deepEqual(punkt(e, "zero_data_retention").faelle, ["2026-009"]);
  const zu = [{ id: "2026-009", feld: "vertrag.zero_data_retention", status: "bestaetigt" }];
  const e2 = V.werteAus(voll(), { faelle: zu });
  assert.equal(punkt(e2, "zero_data_retention").ergebnis, "ja");
  assert.deepEqual(punkt(e2, "zero_data_retention").faelle, ["2026-009"]);
  const iso = [{ id: "2026-010", feld: "zertifikate.ISO 27001", status: "beantwortet" }];
  assert.equal(punkt(V.werteAus(voll(), { faelle: iso }), "iso27001").ergebnis, "nicht_belegbar");
});

test("Der Auftraggeber kann Vorgaben streichen; unbekannte Kennung ist ein Fehler", () => {
  const p = voll();
  p.vertrag.zweckbindung = feld(false);
  const e = V.werteAus(p, { auswahl: V.VORGABEN.map((v) => v.id).filter((id) => id !== "zweckbindung") });
  assert.equal(e.punkte.length, 14);
  assert.equal(e.gesamt, "ja");
  assert.throws(() => V.werteAus(p, { auswahl: ["gibtsnicht"] }), /gibtsnicht/);
});

test("Ergebnisblock und Kapitel „Fragen an den Anbieter“ im Dossier, ohne Normenbezug", () => {
  const p = voll();
  p.vertrag.zweckbindung = feld(false, "belegt", "Doku: Daten auch für Monitoring genutzt.");
  p.zertifikate[0].anwendungsbereich = feld(null, "unbelegt", "Nur nach Zugangsanfrage.");
  const faelle = [{ id: "2026-004", anbieter: "x", feld: "vertrag.zero_data_retention", status: "bestaetigt", slug: "x-zdr", kurz: "ZDR" }];
  const md = rendere(p, baueZeilen(p, { faelle }), faelle, { datum: "2026-10-10" });
  const kopf = md.indexOf("## Ergebnis");
  assert.ok(kopf > 0 && kopf < md.indexOf("## 1. Belegte Angaben"), "Ergebnis steht vor Abschnitt 1");
  assert.match(md, /\*\*Ergebnis: nein\.\*\* Von 15 Prüfpunkten sind 13 belegt und treffen Ihre Vorgabe, 1 ist belegt und trifft sie nicht, 1 ist nicht öffentlich belegbar\./);
  assert.match(md, /\*\*Nein bei:\*\* Zweckbindung über Training hinaus\. Doku: Daten auch für Monitoring genutzt\. \(https:\/\/x\.example\/q, Prüfdatum 2026-10-09\)/);
  assert.match(md, /\*\*Nicht belegbar:\*\* Anwendungsbereich des Zertifikats genannt/);
  assert.match(md, /\*\*Fall zu einem Prüfpunkt:\*\* 2026-004 \(Zero Data Retention, bestaetigt\)/);
  const k = md.indexOf("## 4. Nicht öffentlich belegbar: Fragen an den Anbieter");
  assert.ok(k > md.indexOf("## 3. Fälle") && k < md.indexOf("## 5. Änderungsalarm"));
  assert.match(md, /Welche Gesellschaften, Standorte und Dienste deckt das Zertifikat ab/);
  assert.match(md, /Herstellererklärung: was mit Ein- und Ausgaben tatsächlich geschieht/);
  assert.match(md, /Diese Unterlagen hat belegbar\.eu nicht gesehen\./);
  assert.match(md, /## 6\. Unterschrift[\s\S]*Die Ergebniszeile folgt allein aus den Vorgaben des Auftraggebers und den belegten Angaben in Abschnitt 1\./);
  const block = md.slice(kopf, md.indexOf("## 1. Belegte Angaben"));
  assert.deepEqual(pruefeNormenbezug(block), []);
  assert.deepEqual(pruefeNormenbezug(md.slice(k, md.indexOf("## 5. Änderungsalarm"))), []);
});
