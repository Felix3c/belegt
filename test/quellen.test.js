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

/** Antwort-Attrappe für pruefe({ holen }): kein Netz im Test. */
const antwort = (status, text, url) => async (u) => ({
  status, url: url || u, headers: { get: () => "text/html" },
  arrayBuffer: async () => Buffer.from(text), text: async () => text,
});

test("pruefe: gesperrte Quelle (DQS, Cloudflare 403) bleibt übersprungen statt fehler", async () => {
  const { pruefe } = require("../lib/quellen.js");
  const e = await pruefe({ url: "https://www.dqsglobal.com/en/customer-database/aleph-alpha-gmbh" },
    { mitHash: true, holen: antwort(403, "<title>Just a moment...</title>") });
  assert.equal(e.befund, "uebersprungen");
  assert.match(e.hinweis, /403/);
});

test("pruefe: gesperrte Quelle, die doch liefert (DeepL Trust Center), wird normal gehasht", async () => {
  const { pruefe } = require("../lib/quellen.js");
  const e = await pruefe({ url: "https://trust.deepl.com/" },
    { mitHash: true, holen: antwort(200, "<p>ISO 27001</p>", "https://deepl.safebase.us/") });
  assert.equal(e.befund, "ok");
  assert.equal(e.hash, hashInhalt("text/html", Buffer.from("<p>ISO 27001</p>")));
});

test("pruefe: Challenge-Seite mit Status 200 auf gesperrter Quelle zählt nicht als Inhalt", async () => {
  const { pruefe } = require("../lib/quellen.js");
  const e = await pruefe({ url: "https://trust.deepl.com/" },
    { mitHash: true, holen: antwort(200, "<title>Just a moment...</title><div id=\"cf-chl-widget\"></div>") });
  assert.equal(e.befund, "uebersprungen");
});

test("pruefe: Cloudflare-Hintergrundskript auf echter Seite ist keine Challenge (DeepL, 04.10.)", async () => {
  const { pruefe } = require("../lib/quellen.js");
  const html = "<title>DeepL Trust Center</title><p>ISO 27001</p><script>a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js'</script>";
  const e = await pruefe({ url: "https://trust.deepl.com/" }, { mitHash: true, holen: antwort(200, html) });
  assert.equal(e.befund, "ok");
});

test("pruefe: 403 auf einer normalen Quelle bleibt ein Fehler (Sperr-Nachsicht nur für BOT_SPERREN)", async () => {
  const { pruefe } = require("../lib/quellen.js");
  const e = await pruefe({ url: "https://example.org/x" }, { mitHash: true, holen: antwort(403, "nope") });
  assert.equal(e.befund, "fehler");
});

const { woerterInhalt, wortDiff, wortDateiName } = require("../lib/quellen.js");

test("woerterInhalt: HTML ergibt die sortierte Wortliste, die auch dem Hash zugrunde liegt", () => {
  const w = woerterInhalt("text/html", Buffer.from("<p>b a</p><script>x</script><p>a</p>"));
  assert.deepEqual(w, ["a", "a", "b"]);
});

test("woerterInhalt: Nicht-HTML (PDF) hat kein Wortprotokoll", () => {
  assert.equal(woerterInhalt("application/pdf", Buffer.from("%PDF-1 a b")), null);
});

test("wortDiff: zählt Mehrfachmengen, nennt nur Unterschiede", () => {
  const d = wortDiff(["1,234", "Downloads", "a", "a"], ["1,241", "Downloads", "a"]);
  assert.deepEqual(d.weg, [["1,234", 1], ["a", 1]]);
  assert.deepEqual(d.dazu, [["1,241", 1]]);
});

test("wortDiff: gleiche Mengen in anderer Reihenfolge ergeben keinen Unterschied", () => {
  const d = wortDiff(["b", "a"], ["a", "b"]);
  assert.deepEqual(d, { weg: [], dazu: [] });
});

test("wortDateiName: stabil je URL, nur Hex, mit .txt", () => {
  const a = wortDateiName("https://opper.ai/models");
  assert.equal(a, wortDateiName("https://opper.ai/models"));
  assert.notEqual(a, wortDateiName("https://opper.ai/ai-compliance"));
  assert.match(a, /^[0-9a-f]{16}\.txt$/);
});

/** Wirft wie Node-fetch bei fehlendem Zwischenzertifikat (dpa.gov.al, 08.10.2026). */
const tlsFehler = (code) => async () => { const e = new TypeError("fetch failed"); e.cause = Object.assign(new Error(code), { code }); throw e; };

test("pruefe: unvollständige TLS-Kette des Servers ist übersprungen, nicht verschwunden (dpa.gov.al, 08.10.)", async () => {
  const { pruefe } = require("../lib/quellen.js");
  const e = await pruefe({ url: "http://dpa.gov.al/axe-cs007-shkurt-2026/" },
    { mitHash: true, holen: tlsFehler("UNABLE_TO_VERIFY_LEAF_SIGNATURE") });
  assert.equal(e.befund, "uebersprungen");
  assert.match(e.hinweis, /UNABLE_TO_VERIFY_LEAF_SIGNATURE/);
});

test("pruefe: echter Netzfehler (DNS) bleibt nicht-erreichbar", async () => {
  const { pruefe } = require("../lib/quellen.js");
  const e = await pruefe({ url: "https://gibt-es-nicht.example/" }, { mitHash: true, holen: tlsFehler("ENOTFOUND") });
  assert.equal(e.befund, "nicht-erreichbar");
});
