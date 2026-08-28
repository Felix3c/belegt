"use strict";
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { normalisiereText, hashInhalt, setzeGeprueft, setzeTopGeprueft, ordneLauf } = require("../lib/quellen.js");

test("normalisiereText: Scripts, Styles, Tags und Whitespace fallen weg, sichtbarer Text bleibt", () => {
  const html = `<html><head><style>.a{}</style><script>var n="nonce-123"</script></head>
  <body><h1>AVV</h1>\n\n <p>Stand   Januar 2022</p><!-- kommentar --></body></html>`;
  assert.equal(normalisiereText(html), "AVV Stand Januar 2022");
});

test("hashInhalt: gleicher Text nach Nonce-Änderung ergibt gleichen Hash, geänderter Text nicht", () => {
  const a = hashInhalt("text/html", Buffer.from('<p>x</p><script>a=1</script>'));
  const b = hashInhalt("text/html", Buffer.from('<p>x</p><script>a=2</script>'));
  const c = hashInhalt("text/html", Buffer.from('<p>y</p>'));
  assert.equal(a, b);
  assert.notEqual(a, c);
  assert.equal(a.length, 16);
});

test("hashInhalt: PDFs werden als Bytes gehasht", () => {
  const a = hashInhalt("application/pdf", Buffer.from("%PDF-1"));
  const b = hashInhalt("application/pdf", Buffer.from("%PDF-2"));
  assert.notEqual(a, b);
});

test("setzeGeprueft: vorhandenes Feld-geprueft wird nur in Zeilen mit dieser URL ersetzt", () => {
  const src = [
    '{',
    '  "x": { "status": "belegt", "quelle": "https://a.example/p", "geprueft": "2026-08-01", "anmerkung": "a" },',
    '  "y": { "status": "belegt", "quelle": "https://b.example/p", "geprueft": "2026-08-01", "anmerkung": "b" },',
    '  "geprueft": "2026-08-01"',
    '}',
  ].join("\n");
  const out = setzeGeprueft(src, "https://a.example/p", "2026-09-28");
  assert.match(out, /"quelle": "https:\/\/a.example\/p", "geprueft": "2026-09-28"/);
  assert.match(out, /"quelle": "https:\/\/b.example\/p", "geprueft": "2026-08-01"/);
  assert.match(out, /\n  "geprueft": "2026-08-01"\n/);
  assert.ok(JSON.parse(out));
});

test("setzeGeprueft: ohne Feld-geprueft wird es direkt hinter der quelle eingefügt", () => {
  const src = '{\n  "x": { "status": "belegt", "quelle": "https://a.example/p", "anmerkung": "a" },\n  "geprueft": "2026-08-01"\n}';
  const out = setzeGeprueft(src, "https://a.example/p", "2026-09-28");
  assert.equal(out, '{\n  "x": { "status": "belegt", "quelle": "https://a.example/p", "geprueft": "2026-09-28", "anmerkung": "a" },\n  "geprueft": "2026-08-01"\n}');
});

test("setzeGeprueft: URL-Präfix trifft keine andere URL", () => {
  const src = '{\n  "x": { "quelle": "https://a.example/p-lang", "anmerkung": "a" },\n  "geprueft": "2026-08-01"\n}';
  assert.equal(setzeGeprueft(src, "https://a.example/p", "2026-09-28"), src);
});

test("setzeTopGeprueft: setzt das Top-Level-Datum und entfernt Feld-Daten", () => {
  const src = '{\n  "x": { "quelle": "https://a.example/p", "geprueft": "2026-08-01", "anmerkung": "a" },\n  "geprueft": "2026-08-01"\n}';
  const out = setzeTopGeprueft(src, "2026-09-28");
  assert.equal(out, '{\n  "x": { "quelle": "https://a.example/p", "anmerkung": "a" },\n  "geprueft": "2026-09-28"\n}');
});

test("ordneLauf: neu / unverändert / verändert / verschwunden", () => {
  const ledger = { "https://u": { hash: "h1" }, "https://v": { hash: "h1" }, "https://w": { hash: "h1" } };
  const ergebnis = [
    { url: "https://n", befund: "ok", hash: "h9" },
    { url: "https://u", befund: "ok", hash: "h1" },
    { url: "https://v", befund: "ok", hash: "h2" },
    { url: "https://w", befund: "beleg-verloren" },
    { url: "https://s", befund: "uebersprungen" },
  ];
  const o = ordneLauf(ergebnis, ledger);
  assert.deepEqual(o.neu.map((e) => e.url), ["https://n"]);
  assert.deepEqual(o.unveraendert.map((e) => e.url), ["https://u"]);
  assert.deepEqual(o.veraendert.map((e) => e.url), ["https://v"]);
  assert.deepEqual(o.verschwunden.map((e) => e.url), ["https://w"]);
  assert.deepEqual(o.uebersprungen.map((e) => e.url), ["https://s"]);
});

test("planeFortschreibung: Anbieter komplett unverändert → top; sonst nur die unveränderten Felder", () => {
  const { planeFortschreibung } = require("../lib/quellen.js");
  const felder = (datei, ...urls) => urls.map((url) => ({ url, felder: [{ datei, schluessel: "quelle" }] }));
  const alle = [...felder("a.json", "https://a1", "https://a2"), ...felder("b.json", "https://b1", "https://b2")];
  const o = { unveraendert: [alle[0], alle[1], alle[2]], veraendert: [alle[3]], verschwunden: [], neu: [], uebersprungen: [] };
  const plan = planeFortschreibung(o, alle);
  assert.deepEqual(plan, { "a.json": { modus: "top", urls: [] }, "b.json": { modus: "felder", urls: ["https://b1"] } });
});

test("planeFortschreibung: website-Felder tragen kein geprueft und zählen nicht als offen", () => {
  const { planeFortschreibung } = require("../lib/quellen.js");
  const alle = [
    { url: "https://a", felder: [{ datei: "a.json", schluessel: "website" }] },
    { url: "https://a/q", felder: [{ datei: "a.json", schluessel: "quelle" }] },
  ];
  const o = { unveraendert: [alle[1]], veraendert: [alle[0]], verschwunden: [], neu: [], uebersprungen: [] };
  assert.deepEqual(planeFortschreibung(o, alle), { "a.json": { modus: "top", urls: [] } });
});

test("ordneLauf: reine website-URLs zählen bei Erreichbarkeit als unverändert, Inhalt egal", () => {
  const ledger = { "https://w": { hash: "h1" } };
  const o = ordneLauf([{ url: "https://w", befund: "ok", nurErreichbar: true }], ledger);
  assert.deepEqual(o.unveraendert.map((e) => e.url), ["https://w"]);
  assert.deepEqual(o.neu, []);
});

test("bestaetigeVeraendert: Flatter-Treffer wandert zurück nach unverändert, echte Änderung bleibt", async () => {
  const { bestaetigeVeraendert } = require("../lib/quellen.js");
  const ledger = { "https://f": { hash: "h1" }, "https://e": { hash: "h1" } };
  const o = { unveraendert: [], verschwunden: [], veraendert: [{ url: "https://f", hash: "h2" }, { url: "https://e", hash: "h2" }] };
  const nochmal = async (t) => ({ ...t, befund: "ok", hash: t.url === "https://f" ? "h1" : "h3" });
  const n = await bestaetigeVeraendert(o, ledger, nochmal);
  assert.deepEqual(n.unveraendert.map((e) => e.url), ["https://f"]);
  assert.deepEqual(n.veraendert.map((e) => e.url + ":" + e.hash), ["https://e:h3"]);
});

test("hashInhalt: umsortierte Wörter (Zufalls-Navigation) ergeben denselben Hash, ein anderes Wort nicht", () => {
  const a = hashInhalt("text/html", Buffer.from("<ul><li>ISO 27001</li><li>IATF 16949</li></ul>"));
  const b = hashInhalt("text/html", Buffer.from("<ul><li>IATF 16949</li><li>ISO 27001</li></ul>"));
  const c = hashInhalt("text/html", Buffer.from("<ul><li>ISO 27002</li><li>IATF 16949</li></ul>"));
  assert.equal(a, b);
  assert.notEqual(a, c);
});

test("ordneLauf: Ledger-Schalter nur_erreichbar (von Hand gesetzt) schaltet den Inhaltsvergleich für eine URL ab", () => {
  const ledger = { "https://r": { hash: "h1", nur_erreichbar: true, grund: "rotierender Block" } };
  const o = ordneLauf([{ url: "https://r", befund: "ok", hash: "h2" }], ledger);
  assert.deepEqual(o.unveraendert.map((e) => e.url), ["https://r"]);
  assert.deepEqual(o.veraendert, []);
});

test("bestaetigeVeraendert: transienter Fehler wird nachgeladen — ok beim zweiten Abruf zählt als unverändert", async () => {
  const { bestaetigeVeraendert } = require("../lib/quellen.js");
  const ledger = { "https://t": { hash: "h1" }, "https://tot": { hash: "h1" } };
  const o = { unveraendert: [], veraendert: [], verschwunden: [{ url: "https://t", befund: "fehler", status: 503 }, { url: "https://tot", befund: "fehler", status: 404 }] };
  const nochmal = async (t) => (t.url === "https://t" ? { ...t, befund: "ok", hash: "h1" } : { ...t, befund: "fehler", status: 404 });
  const n = await bestaetigeVeraendert(o, ledger, nochmal);
  assert.deepEqual(n.unveraendert.map((e) => e.url), ["https://t"]);
  assert.deepEqual(n.verschwunden.map((e) => e.url), ["https://tot"]);
});
