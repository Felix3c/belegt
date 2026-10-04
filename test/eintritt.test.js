"use strict";
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { sha256, pruefeEintritt, eintrittHtml } = require("../lib/eintritt.js");
const { belegFelder, vergleicheAnbieter } = require("../lib/aenderungen.js");
const { baueZeilen } = require("../lib/dossier.js");

const TEXT = "Bis 31.12.2026 steht auf der Produktseite derselbe qualifizierte Satz wie in der Doku.";
const zusage = (extra = {}) => ({ id: "z1", text: TEXT, rolle: "Leitung Datenschutz", datum: "2026-11-01", frist: "2026-12-31", sha256: sha256(TEXT), status: "hinterlegt", ...extra });
const anbieter = (extra = {}) => ({ id: "x", name: "Beispiel AG", stammdaten: { website: "https://x.example" }, ...extra });
const hilfen = { esc: (s) => String(s).replace(/</g, "&lt;"), datumDE: (d) => d.split("-").reverse().join(".") };

test("pruefeEintritt: Profil ohne die Felder ist in Ordnung", () => {
  assert.deepEqual(pruefeEintritt(anbieter()), []);
});

test("pruefeEintritt: gültiger Eintritt und gültige Zusage", () => {
  assert.deepEqual(pruefeEintritt(anbieter({ eintritt: { art: "aufnahme_auf_antrag", datum: "2026-11-01" }, zusagen: [zusage()] })), []);
});

test("pruefeEintritt: ein Betrag im Profil bricht ab (Escape-Test)", () => {
  const f = pruefeEintritt(anbieter({ eintritt: { art: "aufnahme_auf_antrag", datum: "2026-11-01", betrag_eur: 490 }, zusagen: [zusage({ preis: 190 })] }));
  assert.equal(f.filter((x) => x.includes("Betrag")).length, 2);
});

test("pruefeEintritt: Hash muss zum wörtlichen Text passen", () => {
  const f = pruefeEintritt(anbieter({ zusagen: [zusage({ text: TEXT + " Ergänzt." })] }));
  assert.ok(f.some((x) => x.includes("sha256 passt nicht")));
});

test("pruefeEintritt: Frist unter 30 Tagen wird abgelehnt", () => {
  assert.ok(pruefeEintritt(anbieter({ zusagen: [zusage({ frist: "2026-11-20" })] })).some((x) => x.includes("30 Tage")));
  assert.deepEqual(pruefeEintritt(anbieter({ zusagen: [zusage({ frist: "2026-12-01" })] })), []);
});

test("pruefeEintritt: Ausgang braucht Datum, eingehalten zusätzlich einen Beleg", () => {
  const f = pruefeEintritt(anbieter({ zusagen: [zusage({ status: "eingehalten" })] }));
  assert.ok(f.some((x) => x.includes("ohne Beleg")));
  assert.ok(f.some((x) => x.includes("ausgang_datum")));
  assert.deepEqual(pruefeEintritt(anbieter({ zusagen: [zusage({ status: "nicht_eingehalten", ausgang_datum: "2027-01-02" })] })), []);
});

test("pruefeEintritt: unbekannte Art, fehlende Felder, doppelte id", () => {
  const f = pruefeEintritt(anbieter({ eintritt: { art: "sponsor" }, zusagen: [zusage(), zusage(), { id: "z2" }] }));
  assert.ok(f.some((x) => x.includes('unbekannte Art "sponsor"')));
  assert.ok(f.some((x) => x.includes("id doppelt")));
  assert.ok(f.some((x) => x.includes('zusagen[z2]: Feld "text" fehlt')));
});

test("eintrittHtml: ohne bezahlte Leistungen leer, damit das Profil unverändert bleibt", () => {
  assert.equal(eintrittHtml(anbieter(), hilfen), "");
});

test("eintrittHtml: zeigt Art, Datum, Wortlaut, Rolle, Frist und Hash, nie einen Betrag", () => {
  const html = eintrittHtml(anbieter({ eintritt: { art: "aufnahme_auf_antrag", datum: "2026-11-01" }, zusagen: [zusage()] }), hilfen);
  assert.ok(html.includes("Beispiel AG: auf eigenen Antrag aufgenommen, Festpreis, 01.11.2026."));
  assert.ok(html.includes(TEXT) && html.includes("Leitung Datenschutz") && html.includes("Frist 31.12.2026"));
  assert.ok(html.includes(sha256(TEXT)));
  assert.ok(!/€|490|190/.test(html));
});

test("Änderungsprotokoll: Aufnahme auf Antrag trägt den Grund", () => {
  const [e] = vergleicheAnbieter(null, anbieter({ eintritt: { art: "aufnahme_auf_antrag", datum: "2026-11-01" } }), "2026-11-01");
  assert.equal(e.neu, "aufgenommen");
  assert.equal(e.grund, "auf eigenen Antrag aufgenommen, Festpreis, 2026-11-01");
});

test("Änderungsprotokoll: Zusage hinterlegt, dann eingehalten mit Beleg als Quelle", () => {
  const vorher = anbieter(), mitte = anbieter({ zusagen: [zusage()] });
  const nachher = anbieter({ zusagen: [zusage({ status: "eingehalten", ausgang_datum: "2026-12-20", beleg: "https://x.example/produkt" })] });
  const [a] = vergleicheAnbieter(vorher, mitte, "2026-11-01");
  assert.deepEqual([a.pfad, a.alt, a.neu], ["zusagen[z1]", null, "hinterlegt"]);
  const [b] = vergleicheAnbieter(mitte, nachher, "2026-12-20");
  assert.deepEqual([b.alt, b.neu, b.quelle_neu], ["hinterlegt", "eingehalten", "https://x.example/produkt"]);
});

test("Dossier: bezahlte Einträge zählen weder als belegt noch als Lücke", () => {
  const p = anbieter({ eintritt: { art: "aufnahme_auf_antrag", datum: "2026-11-01" }, zusagen: [zusage()] });
  assert.equal(belegFelder(p).size, 2);
  assert.deepEqual(baueZeilen(p), []);
});
