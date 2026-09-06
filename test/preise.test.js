"use strict";
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { KEIN_PREIS, eur, preisArt, preisText, guenstigsterPreis, preisKurz, preisStand } = require("../lib/preise.js");

test("eur: deutsches Format mit zwei Nachkommastellen, null wird zum Strich", () => {
  assert.equal(eur(0.5), "0,50 €");
  assert.equal(eur(1234.5), "1.234,50 €");
  assert.equal(eur(null), "–");
  assert.equal(eur(undefined), "–");
});

test("preisArt: Token-Preis, Einheitenpreis, kostenlos, kein öffentlicher Preis, unbelegt", () => {
  assert.equal(preisArt({ preis_input_1m_eur: 0.5, preis_output_1m_eur: 1.5 }), "token");
  assert.equal(preisArt({ preis_input_1m_eur: null, preis_output_1m_eur: 1.5 }), "token");
  assert.equal(preisArt({ preis_input_1m_eur: null, preis_output_1m_eur: null, preis_einheit: "GPU-Stunde", preis_ab_eur: 1.34 }), "einheit");
  assert.equal(preisArt({ preis_input_1m_eur: 0, preis_output_1m_eur: 0 }), "kostenlos");
  assert.equal(preisArt({ preis_input_1m_eur: null, preis_einheit: "Monat", preis_ab_eur: 0 }), "kostenlos");
  assert.equal(preisArt({ preis_input_1m_eur: null, preis_output_1m_eur: null, preis_status: KEIN_PREIS }), KEIN_PREIS);
  assert.equal(preisArt({ preis_input_1m_eur: null, preis_output_1m_eur: null }), "unbelegt");
  assert.equal(preisArt({}), "unbelegt");
});

test("preisArt: eine Zahl schlägt den Status „kein öffentlicher Preis“ — Zahlen sind der stärkere Beleg", () => {
  assert.equal(preisArt({ preis_input_1m_eur: 0.2, preis_status: KEIN_PREIS }), "token");
});

test("preisArt: Einheitenpreis ohne Einheit ist ein Datenfehler und wird nicht angezeigt", () => {
  assert.throws(() => preisArt({ preis_ab_eur: 1.34 }), /preis_einheit/);
});

test("preisText: eine Zeile je Preisart", () => {
  assert.deepEqual(preisText({ preis_input_1m_eur: 0.5, preis_output_1m_eur: 1.5 }), { art: "token", input: "0,50 €", output: "1,50 €" });
  assert.deepEqual(preisText({ preis_input_1m_eur: null, preis_output_1m_eur: 1.5 }), { art: "token", input: "–", output: "1,50 €" });
  assert.deepEqual(preisText({ preis_einheit: "GPU-Stunde", preis_ab_eur: 1.34 }), { art: "einheit", text: "ab 1,34 € / GPU-Stunde" });
  assert.deepEqual(preisText({ preis_input_1m_eur: 0, preis_output_1m_eur: 0 }), { art: "kostenlos", text: "kostenlos" });
  assert.deepEqual(preisText({ preis_status: KEIN_PREIS }), { art: KEIN_PREIS, text: "kein öffentlicher Preis" });
  assert.deepEqual(preisText({}), { art: "unbelegt", text: "unbelegt" });
});

test("guenstigsterPreis: Token-Preise gewinnen, sonst der niedrigste Einheitenpreis der ersten Einheit", () => {
  const p1 = { modelle: [{ preis_input_1m_eur: 0.5 }, { preis_input_1m_eur: 0.2 }, { preis_einheit: "GPU-Stunde", preis_ab_eur: 0.01 }] };
  assert.deepEqual(guenstigsterPreis(p1), { art: "token", wert: 0.2 });
  const p2 = { modelle: [{ preis_einheit: "GPU-Stunde", preis_ab_eur: 2.5 }, { preis_einheit: "GPU-Stunde", preis_ab_eur: 1.34 }, { preis_einheit: "Bild", preis_ab_eur: 0.03 }] };
  assert.deepEqual(guenstigsterPreis(p2), { art: "einheit", wert: 1.34, einheit: "GPU-Stunde" });
});

test("guenstigsterPreis: kostenlos, wenn der niedrigste Preis 0 ist", () => {
  assert.deepEqual(guenstigsterPreis({ modelle: [{ preis_input_1m_eur: 0, preis_output_1m_eur: 0 }] }), { art: "kostenlos", wert: 0 });
});

test("guenstigsterPreis: „kein öffentlicher Preis“ nur, wenn es für jedes Modell belegt ist — sonst null", () => {
  assert.deepEqual(guenstigsterPreis({ modelle: [{ preis_status: KEIN_PREIS }, { preis_status: KEIN_PREIS }] }), { art: KEIN_PREIS });
  assert.equal(guenstigsterPreis({ modelle: [{ preis_status: KEIN_PREIS }, {}] }), null);
  assert.equal(guenstigsterPreis({ modelle: [] }), null);
  assert.equal(guenstigsterPreis({}), null);
});

test("preisKurz: Kurzform für Übersicht und Vergleich", () => {
  assert.equal(preisKurz({ modelle: [{ preis_input_1m_eur: 0.5 }] }), "ab 0,50 € / 1M Input");
  assert.equal(preisKurz({ modelle: [{ preis_einheit: "GPU-Stunde", preis_ab_eur: 1.34 }] }), "ab 1,34 € / GPU-Stunde");
  assert.equal(preisKurz({ modelle: [{ preis_input_1m_eur: 0 }] }), "kostenlos");
  assert.equal(preisKurz({ modelle: [{ preis_status: KEIN_PREIS }] }), "kein öffentlicher Preis");
  assert.equal(preisKurz({ modelle: [{}] }), "–");
});

test("preisStand: Feld-Datum vor Profil-Datum", () => {
  assert.equal(preisStand({ geprueft: "2026-09-06" }, { geprueft: "2026-08-19" }), "2026-09-06");
  assert.equal(preisStand({}, { geprueft: "2026-08-19" }), "2026-08-19");
  assert.equal(preisStand({}, {}), null);
});
