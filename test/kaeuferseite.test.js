"use strict";
const { test } = require("node:test");
const assert = require("node:assert/strict");
const K = require("../lib/kaeuferseite.js");
const V = require("../lib/vorgaben.js");
const { pruefeNormenbezug } = require("../lib/normenbezug.js");
const { erzeugeDossier } = require("../lib/dossier.js");

/** Kleines Ergebnis wie aus V.werteAus: alle 15 Punkte, gemischt. */
const ergebnis = () => {
  const punkte = V.VORGABEN.map((v, i) => ({ nr: i + 1, id: v.id, label: v.label, ergebnis: i === 0 ? "nein" : i < 12 ? "ja" : "nicht_belegbar", faelle: [], faelleStatus: [] }));
  return { gesamt: "nein", zahl: { ja: 11, nein: 1, nicht_belegbar: 3 }, punkte };
};

test("Abschnitt nennt alle 15 Prüfpunkte und alle festen Anfragen", () => {
  const html = K.abschnittAuditoren({});
  for (const v of V.VORGABEN) assert.ok(html.includes(v.label), v.label);
  for (const [u] of V.IMMER_ANFRAGEN) assert.ok(html.includes(u), u);
  assert.match(html, /id="auditoren"/);
});

test("ohne Muster kein Muster-Link und keine Muster-Spalte", () => {
  const html = K.abschnittAuditoren({});
  assert.doesNotMatch(html, /muster-/);
  assert.doesNotMatch(html, /<th>Muster/);
});

test("mit Muster: Link, Name, Gesamtergebnis und Ergebnis je Punkt", () => {
  const html = K.abschnittAuditoren({ muster: { name: "X & Y", datei: "muster-x.md", ergebnis: ergebnis(), datum: "2026-10-10" } });
  assert.match(html, /href="muster-x\.md"/);
  assert.match(html, /X &amp; Y/);
  assert.match(html, /11 ja, 1 nein, 3 nicht belegbar/);
  assert.match(html, /10\.10\.2026/);
  const zeilen = html.split("<tr>").slice(2);
  assert.equal(zeilen.length, 15);
  assert.match(zeilen[0], /<td>nein<\/td>/);
  assert.match(zeilen[14], /<td>nicht belegbar<\/td>/);
});

test("eigener Text der Seite ohne Normenbezug", () => {
  const html = K.abschnittAuditoren({ muster: { name: "X", datei: "muster-x.md", ergebnis: ergebnis(), datum: "2026-10-10" } });
  assert.deepEqual(pruefeNormenbezug(html.replace(/<[^>]+>/g, " ")), []);
});

test("Muster-Anbieter lässt sich ausstellen (Normenbezugs-Filter greift nicht)", () => {
  const d = erzeugeDossier(K.MUSTER_ANBIETER, { datum: "2026-10-10", auftraggeber: K.MUSTER_AUFTRAGGEBER });
  assert.equal(d.ergebnis.punkte.length, 15);
  assert.match(d.markdown, /Muster/);
});

test("Dateiname des Musters ist stabil (ohne Datum)", () => {
  assert.equal(K.musterDatei("ionos"), "muster-ionos.md");
});

test("Preis im Dossier wie auf der Seite: ohne Umsatzsteuer, nicht „netto“", () => {
  const d = erzeugeDossier(K.MUSTER_ANBIETER, { datum: "2026-10-10", auftraggeber: K.MUSTER_AUFTRAGGEBER });
  assert.doesNotMatch(d.markdown, /netto/);
  assert.match(d.markdown, /390 € je Anbieter-Dossier, ohne Umsatzsteuer/);
});
