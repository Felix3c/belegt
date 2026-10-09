"use strict";
const { test } = require("node:test");
const assert = require("node:assert/strict");
const N = require("../lib/iso42001.js");

const belegt = (extra = {}) => ({
  status: "belegt", wert: true, zertifizierer: "TÜV Beispiel GmbH (DAkkS)", anwendungsbereich: "KI-Plattform, Standort Berlin",
  quelle: "https://x.example/42001.pdf", geprueft: "2026-10-09", anmerkung: "Zertifikat Nr. 1, gültig bis 2029.", ...extra,
});
const unbelegt = (extra = {}) => ({
  status: "unbelegt", wert: null, zertifizierer: null, anwendungsbereich: null,
  quelle: null, geprueft: "2026-10-09", anmerkung: "Trust Center und Zertifikatsseite ohne 42001.", ...extra,
});
const profil = (feld, zertifikate = []) => ({ id: "x", name: "X", stammdaten: {}, zertifikate, ...(feld === undefined ? {} : { iso_42001: feld }) });
const zert42001 = (status) => ({ typ: "ISO/IEC 42001", status, quelle: "https://x.example/42001.pdf" });

test("pruefe: belegtes Feld mit passendem Zertifikat-Eintrag ist in Ordnung", () => {
  assert.deepEqual(N.pruefe(profil(belegt(), [zert42001("belegt")]), { streng: true }), []);
});

test("pruefe: unbelegtes Feld ohne Zertifikat-Eintrag ist in Ordnung", () => {
  assert.deepEqual(N.pruefe(profil(unbelegt()), { streng: true }), []);
});

test("pruefe: fehlendes Feld ist nur im strengen Modus ein Fehler", () => {
  assert.deepEqual(N.pruefe(profil(undefined)), []);
  const fe = N.pruefe(profil(undefined), { streng: true });
  assert.equal(fe.length, 1);
  assert.match(fe[0], /iso_42001: fehlt/);
});

test("pruefe: unbekannter Status und fehlendes Prüfdatum", () => {
  const fe = N.pruefe(profil(unbelegt({ status: "ja", geprueft: null })));
  assert.ok(fe.some((x) => x.includes("Status")));
  assert.ok(fe.some((x) => x.includes("Prüfdatum")));
});

test("pruefe: belegt braucht Quelle, Wert true und Zertifizierer", () => {
  const fe = N.pruefe(profil(belegt({ quelle: null, wert: null, zertifizierer: null }), [zert42001("belegt")]));
  assert.ok(fe.some((x) => x.includes("Quelle")));
  assert.ok(fe.some((x) => x.includes("Wert")));
  assert.ok(fe.some((x) => x.includes("Zertifizierer")));
});

test("pruefe: beansprucht braucht Quelle und Wert true, Zertifizierer darf fehlen", () => {
  const f = belegt({ status: "beansprucht", zertifizierer: null, anwendungsbereich: null });
  assert.deepEqual(N.pruefe(profil(f, [zert42001("beansprucht")])), []);
  assert.ok(N.pruefe(profil({ ...f, quelle: null }, [zert42001("beansprucht")])).some((x) => x.includes("Quelle")));
});

test("pruefe: unbelegt darf nicht wert true tragen", () => {
  assert.ok(N.pruefe(profil(unbelegt({ wert: true }))).some((x) => x.includes("unbelegt")));
});

test("pruefe: Feld und Zertifikat-Liste müssen übereinstimmen", () => {
  // belegt im Feld, aber kein Eintrag in zertifikate[] → Übersicht würde ihn nicht zählen
  assert.ok(N.pruefe(profil(belegt())).some((x) => x.includes("zertifikate")));
  // Eintrag in zertifikate[] mit anderem Status
  assert.ok(N.pruefe(profil(belegt(), [zert42001("beansprucht")])).some((x) => x.includes("zertifikate")));
  // unbelegt im Feld, aber Eintrag belegt in zertifikate[]
  assert.ok(N.pruefe(profil(unbelegt(), [zert42001("belegt")])).some((x) => x.includes("zertifikate")));
});

test("htmlAbschnitt: zeigt Status, Zertifizierer, Anwendungsbereich und Quelle, escaped", () => {
  const h = {
    esc: (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"),
    statusBadge: (s) => `[${s}]`,
    quelleLink: (q, d) => (q ? `<a href="${q}">${d}</a>` : ""),
  };
  const html = N.htmlAbschnitt(profil(belegt({ anwendungsbereich: "A <b> & B" }), [zert42001("belegt")]), h);
  assert.match(html, /ISO\/IEC 42001/);
  assert.match(html, /\[belegt\]/);
  assert.match(html, /TÜV Beispiel GmbH/);
  assert.match(html, /A &lt;b> &amp; B/);
  assert.match(html, /href="https:\/\/x.example\/42001.pdf"/);
  const leer = N.htmlAbschnitt(profil(unbelegt()), h);
  assert.match(leer, /\[unbelegt\]/);
  assert.match(leer, /kein Zertifikat nach ISO\/IEC 42001 gefunden/);
  assert.equal(N.htmlAbschnitt(profil(undefined), h), "");
});

test("textZeile: Klartext für llms-full", () => {
  const z = N.textZeile(profil(belegt(), [zert42001("belegt")]));
  assert.match(z, /^- ISO\/IEC 42001: zertifiziert \[Status: belegt\]/);
  assert.match(z, /Zertifizierer: TÜV Beispiel GmbH/);
  assert.match(z, /Quelle: https:\/\/x.example\/42001.pdf/);
  assert.match(N.textZeile(profil(unbelegt())), /^- ISO\/IEC 42001: kein Zertifikat gefunden \[Status: unbelegt\]/);
  assert.equal(N.textZeile(profil(undefined)), "- ISO/IEC 42001: unbelegt (Feld nicht erfasst)");
});
