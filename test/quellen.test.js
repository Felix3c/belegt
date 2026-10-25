"use strict";
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { normalisiereText, hashInhalt, hashInhaltAlt, setzeGeprueft, setzeTopGeprueft, ordneLauf, sammleUrls } = require("../lib/quellen.js");

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

test("hashInhalt: bei jedem Abruf neu erzeugte PDFs (Infomaniak-AGB) — Zeitstempel und /ID zählen nicht, der Inhalt schon", () => {
  const pdf = (zeit, id, text) => Buffer.from(`%PDF-1.7\n5 0 obj\n<< /Producer (CPDF)\n/CreationDate (D:${zeit}+02'00')\n/ModDate (D:${zeit}+02'00')\n>>\nendobj\nBT (${text}) Tj ET\ntrailer\n<<\n/ID[<${id}><${id}>]\n>>\n%%EOF`);
  const a = hashInhalt("application/pdf", pdf("20261009093038", "44b22e1b2c51e3527e9c752c9d272482", "No training"));
  const b = hashInhalt("application/pdf", pdf("20261009093040", "6ca5521ff2b2a3fd90b9bf81274cb504", "No training"));
  const c = hashInhalt("application/pdf", pdf("20261009093040", "6ca5521ff2b2a3fd90b9bf81274cb504", "Training allowed"));
  assert.equal(a, b);
  assert.notEqual(b, c);
});

test("hashInhaltAlt: Byte-Hash wie vor dem 09.10.2026 (für die Umstellung des Ledgers)", () => {
  const bytes = Buffer.from("%PDF-1.7\n/CreationDate (D:20261009093038+02'00')\n");
  assert.equal(hashInhaltAlt(bytes), require("crypto").createHash("sha256").update(bytes).digest("hex").slice(0, 16));
  assert.notEqual(hashInhaltAlt(bytes), hashInhalt("application/pdf", bytes));
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

test("setzeGeprueft: geprueft auf der nächsten Zeile wird ersetzt, nicht doppelt eingefügt (US-Profile, 23.10.)", () => {
  // Echte Form der US-Profile (openai-*, google-vertex-*): ein Feld pro Zeile. Bis 23.10. suchte der Lauf
  // nur in der quelle-Zeile, fügte ein zweites geprueft ein, und beim Lesen gewann das alte Datum.
  const src = [
    '{',
    '  "x": {',
    '    "status": "belegt",',
    '    "quelle": "https://a.example/p",',
    '    "geprueft": "2026-10-21",',
    '    "anmerkung": "a"',
    '  },',
    '  "y": {',
    '    "quelle": "https://b.example/p",',
    '    "geprueft": "2026-10-21"',
    '  },',
    '  "geprueft": "2026-10-21"',
    '}',
  ].join("\n");
  const out = setzeGeprueft(src, "https://a.example/p", "2026-10-23");
  assert.equal((out.match(/"geprueft"/g) || []).length, 3);
  const ob = JSON.parse(out);
  assert.equal(ob.x.geprueft, "2026-10-23");
  assert.equal(ob.y.geprueft, "2026-10-21");
  assert.equal(ob.geprueft, "2026-10-21");
});

test("setzeGeprueft: ohne Feld-geprueft wird es direkt hinter der quelle eingefügt", () => {
  const src = '{\n  "x": { "status": "belegt", "quelle": "https://a.example/p", "anmerkung": "a" },\n  "geprueft": "2026-08-01"\n}';
  const out = setzeGeprueft(src, "https://a.example/p", "2026-09-28");
  assert.equal(out, '{\n  "x": { "status": "belegt", "quelle": "https://a.example/p", "geprueft": "2026-09-28", "anmerkung": "a" },\n  "geprueft": "2026-08-01"\n}');
});

test("setzeGeprueft: mehrere Belege in einer Zeile, nur das Datum hinter der passenden quelle (OVHcloud HDS, 21.10.)", () => {
  // Echte Form: Zertifikat mit gesperrtem Register als quelle, Anwendungsbereich mit eigener, geprüfter quelle.
  // Bis 21.10. ersetzte der Lauf das erste Datum der Zeile, also das des Registers, das er gar nicht lesen konnte.
  const src = [
    '{',
    '  "zertifikate": [',
    '    { "typ": "HDS", "status": "belegt", "quelle": "https://reg.example/liste", "geprueft": "2026-10-14", "anwendungsbereich": { "wert": "1-6", "quelle": "https://doku.example/hds", "geprueft": "2026-10-14" }, "zertifizierer": { "wert": "X", "quelle": "https://reg.example/liste", "geprueft": "2026-10-14" } }',
    '  ],',
    '  "geprueft": "2026-10-14"',
    '}',
  ].join("\n");
  const out = setzeGeprueft(src, "https://doku.example/hds", "2026-10-21");
  assert.match(out, /"quelle": "https:\/\/reg.example\/liste", "geprueft": "2026-10-14", "anwendungsbereich"/);
  assert.match(out, /"quelle": "https:\/\/doku.example\/hds", "geprueft": "2026-10-21"/);
  assert.match(out, /"wert": "X", "quelle": "https:\/\/reg.example\/liste", "geprueft": "2026-10-14"/);
  assert.ok(JSON.parse(out));
  // Umgekehrt: Register geprüft → beide Register-Daten neu, Doku-Datum bleibt.
  const out2 = setzeGeprueft(src, "https://reg.example/liste", "2026-10-21");
  assert.equal((out2.match(/"geprueft": "2026-10-21"/g) || []).length, 2);
  assert.match(out2, /"quelle": "https:\/\/doku.example\/hds", "geprueft": "2026-10-14"/);
});

test("setzeGeprueft: Beleg ohne Datum neben einem mit Datum in derselben Zeile bekommt ein eigenes", () => {
  const src = '{\n  "x": { "quelle": "https://b.example/q", "geprueft": "2026-08-01", "y": { "quelle": "https://a.example/p", "anmerkung": "a" } },\n  "geprueft": "2026-08-01"\n}';
  const out = setzeGeprueft(src, "https://a.example/p", "2026-09-28");
  assert.match(out, /"quelle": "https:\/\/b.example\/q", "geprueft": "2026-08-01"/);
  assert.match(out, /"quelle": "https:\/\/a.example\/p", "geprueft": "2026-09-28", "anmerkung"/);
  assert.ok(JSON.parse(out));
});

test("setzeGeprueft: URL-Präfix trifft keine andere URL", () => {
  const src = '{\n  "x": { "quelle": "https://a.example/p-lang", "anmerkung": "a" },\n  "geprueft": "2026-08-01"\n}';
  assert.equal(setzeGeprueft(src, "https://a.example/p", "2026-09-28"), src);
});

test("setzeTopGeprueft: setzt Top-Level- und alle Feld-Daten auf denselben Tag (Prüfpunkte brauchen Feld-Daten, 09.10.)", () => {
  const src = '{\n  "x": { "quelle": "https://a.example/p", "geprueft": "2026-08-01", "anmerkung": "a" },\n  "y": { "wert": null, "status": "unbelegt", "geprueft": "2026-08-02" }, "z": { "status": "belegt", "geprueft": "2026-08-03" },\n  "geprueft": "2026-08-01"\n}';
  const out = setzeTopGeprueft(src, "2026-09-28");
  assert.equal(out, '{\n  "x": { "quelle": "https://a.example/p", "geprueft": "2026-09-28", "anmerkung": "a" },\n  "y": { "wert": null, "status": "unbelegt", "geprueft": "2026-09-28" }, "z": { "status": "belegt", "geprueft": "2026-09-28" },\n  "geprueft": "2026-09-28"\n}');
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

test("pruefe: Incapsula-Sperrseite mit Status 200 auf beliebiger Quelle zählt nicht als Inhalt (esante HDS, 16.10.)", async () => {
  const { pruefe } = require("../lib/quellen.js");
  const html = "<html><head><META NAME=\"robots\" CONTENT=\"noindex,nofollow\"><script src=\"/_Incapsula_Resource?SWJIYLWA=5074a7\"></script></head><body>Request unsuccessful. Incapsula incident ID: 4557000291536178053-668915975257393016</body></html>";
  const e = await pruefe({ url: "https://esante.gouv.fr/offres-services/hds/liste-des-hebergeurs-certifies" }, { mitHash: true, holen: antwort(200, html) });
  assert.equal(e.befund, "uebersprungen");
  assert.match(e.hinweis, /Challenge/);
  assert.equal(e.hash, undefined);
});

test("pruefe: Cloudflare-Challenge auf nicht gelisteter Quelle wird ebenfalls übersprungen statt gehasht", async () => {
  const { pruefe } = require("../lib/quellen.js");
  const e = await pruefe({ url: "https://example.org/x" }, { mitHash: true, holen: antwort(200, "<title>Just a moment...</title><div id=\"cf-chl-widget\"></div>") });
  assert.equal(e.befund, "uebersprungen");
});

test("pruefe: echte Seite, die das Wort Incapsula im Text nennt, bleibt Inhalt", async () => {
  const { pruefe } = require("../lib/quellen.js");
  const e = await pruefe({ url: "https://example.org/x" }, { mitHash: true, holen: antwort(200, "<p>Wir nutzen Imperva Incapsula als CDN.</p>") });
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

const { teileUebernahme, planeFortschreibung } = require("../lib/quellen.js");
const lauf = () => ({
  neu: [], verschwunden: [], uebersprungen: [],
  unveraendert: [{ url: "https://a.example/agb" }],
  veraendert: [{ url: "https://www.deepl.com/en/pro" }, { url: "https://www.deepl.com/en/pro-license" }, { url: "https://huggingface.co/x" }],
});

test("teileUebernahme: nur Quellen mit passendem URL-Anfang wandern nach uebernommen (09.10., DeepL-Banner)", () => {
  const o = teileUebernahme(lauf(), ["https://www.deepl.com/"]);
  assert.deepEqual(o.uebernommen.map((e) => e.url), ["https://www.deepl.com/en/pro", "https://www.deepl.com/en/pro-license"]);
  assert.deepEqual(o.veraendert.map((e) => e.url), ["https://huggingface.co/x"]);
});

test("teileUebernahme: ändert den Eingang nicht und kennt ohne Präfix keine Übernahme", () => {
  const ein = lauf();
  const o = teileUebernahme(ein, []);
  assert.equal(ein.veraendert.length, 3);
  assert.equal(o.uebernommen.length, 0);
  assert.equal(o.veraendert.length, 3);
});

test("teileUebernahme: leerer Präfix ist kein Joker (pauschal bleibt --uebernehmen)", () => {
  assert.equal(teileUebernahme(lauf(), [""]).uebernommen.length, 0);
});

test("planeFortschreibung: übernommene Quellen bekommen das Prüfdatum wie unveränderte", () => {
  const o = teileUebernahme(lauf(), ["https://www.deepl.com/en/pro-license"]);
  const urls = [
    { url: "https://www.deepl.com/en/pro-license", felder: [{ datei: "deepl.json", schluessel: "quelle" }] },
    { url: "https://www.deepl.com/en/pro", felder: [{ datei: "deepl.json", schluessel: "quelle" }] },
  ];
  assert.deepEqual(planeFortschreibung(o, urls), { "deepl.json": { modus: "felder", urls: ["https://www.deepl.com/en/pro-license"] } });
});

test("pruefeAufruf: bekannte Schalter gehen durch, Tippfehler und fehlende Werte brechen ab, bevor geschrieben wird", () => {
  const { pruefeAufruf } = require("../lib/quellen.js");
  assert.deepEqual(pruefeAufruf([]), { ok: true });
  assert.deepEqual(pruefeAufruf(["--trocken", "--json", "a.json"]), { ok: true });
  assert.deepEqual(pruefeAufruf(["--uebernehmen-nur", "https://a.eu/", "--uebernehmen-nur", "https://b.eu/x"]), { ok: true });
  assert.deepEqual(pruefeAufruf(["--uebernehmen"]), { ok: true });
  assert.equal(pruefeAufruf(["--help"]).hilfe, true);
  assert.equal(pruefeAufruf(["-h"]).hilfe, true);
  assert.match(pruefeAufruf(["--trockn"]).fehler, /--trockn/);
  assert.match(pruefeAufruf(["trocken"]).fehler, /trocken/);
  assert.match(pruefeAufruf(["--json"]).fehler, /--json/);
  assert.match(pruefeAufruf(["--uebernehmen-nur"]).fehler, /--uebernehmen-nur/);
  assert.match(pruefeAufruf(["--uebernehmen-nur", "--trocken"]).fehler, /--uebernehmen-nur/);
  assert.match(pruefeAufruf(["--uebernehmen", "--uebernehmen-nur", "https://a.eu/"]).fehler, /zusammen/);
});

test("hashInhalt: JSON-Preisdatenbank (BFL/Sanity) — die Antwortzeit ms zählt nicht, ein geänderter Preis schon", () => {
  const antwort = (ms, preis) => Buffer.from(JSON.stringify({ query: "*[_type == \"pricing\"]", result: { pricingCards: [{ apiEndpoint: "/v1/flux-3-image", imageTierRates: { tier1k: preis } }] }, syncTags: ["s1:xwIG8g"], ms }));
  const a = hashInhalt("application/json; charset=utf-8", antwort(6, 4.8));
  const b = hashInhalt("application/json; charset=utf-8", antwort(7, 4.8));
  const c = hashInhalt("application/json; charset=utf-8", antwort(6, 5.2));
  assert.equal(a, b);
  assert.notEqual(a, c);
});

test("hashInhalt: JSON ohne ms und kaputtes JSON bleiben Byte-Hash wie bisher", () => {
  const roh = Buffer.from('{"a":1}');
  assert.equal(hashInhalt("application/json", roh), hashInhaltAlt(roh));
  const kaputt = Buffer.from('{"ms":1');
  assert.equal(hashInhalt("application/json", kaputt), hashInhaltAlt(kaputt));
});

test("sammleUrls: Feld preisdaten (maschinenlesbare Preisquelle) wird nachgelesen, nicht nur auf Erreichbarkeit", () => {
  const bfl = sammleUrls().find((u) => u.url.startsWith("https://2gpum2i6.api.sanity.io/"));
  assert.ok(bfl, "BFL-Preisdatenbank fehlt im Quellenlauf");
  assert.equal(bfl.nurErreichbar, false);
  assert.ok(bfl.felder.every((f) => f.schluessel === "preisdaten" && f.anbieter === "black-forest-labs"));
});

test("heuteLokal: Datum nach Ortszeit, nicht UTC (Lauf um 01:30 MESZ ist schon der nächste Tag)", () => {
  const { heuteLokal } = require("../lib/quellen.js");
  // 16.10.2026 01:30 Ortszeit; in Köln (UTC+2) ist das UTC noch der 15.10.
  const d = new Date(2026, 9, 16, 1, 30);
  assert.equal(heuteLokal(d), "2026-10-16");
  assert.equal(heuteLokal(new Date(2026, 0, 5, 23, 59)), "2026-01-05");
  assert.match(heuteLokal(), /^\d{4}-\d{2}-\d{2}$/);
});

// HF-Modellkarten (18.10.2026): Die HTML-Seite enthält Download-/Like-Zähler, die täglich ticken und
// "verändert" melden, obwohl die Karte gleich bleibt. Gehasht wird stattdessen die Git-Revision aus der API.
test("hfModellId: nur Modellseiten auf huggingface.co, keine API-, Datei- oder Org-Seiten", () => {
  const { hfModellId } = require("../lib/quellen.js");
  assert.equal(hfModellId("https://huggingface.co/Aleph-Alpha/Kolibri-1"), "Aleph-Alpha/Kolibri-1");
  assert.equal(hfModellId("https://huggingface.co/Aleph-Alpha/Kolibri-1/"), "Aleph-Alpha/Kolibri-1");
  assert.equal(hfModellId("https://huggingface.co/Aleph-Alpha"), null);
  assert.equal(hfModellId("https://huggingface.co/api/models/Aleph-Alpha/Kolibri-1"), null);
  assert.equal(hfModellId("https://huggingface.co/Aleph-Alpha/Kolibri-1/blob/main/README.md"), null);
  assert.equal(hfModellId("https://huggingface.co/datasets/x/y"), null);
  assert.equal(hfModellId("https://huggingface.co/spaces/x/y"), null);
  assert.equal(hfModellId("https://example.org/Aleph-Alpha/Kolibri-1"), null);
});

const hfHolen = (sha, downloads, html) => async (u) => {
  const api = u.startsWith("https://huggingface.co/api/models/");
  const text = api ? JSON.stringify({ id: "Aleph-Alpha/Kolibri-1", sha, lastModified: "2026-10-16T10:14:00.000Z", downloads, likes: downloads % 7 }) : html;
  return { status: 200, url: u, headers: { get: () => (api ? "application/json" : "text/html") }, arrayBuffer: async () => Buffer.from(text), text: async () => text };
};

test("pruefe: HF-Modellkarte, nur Zähler anders → gleicher Hash", async () => {
  const { pruefe } = require("../lib/quellen.js");
  const t = { url: "https://huggingface.co/Aleph-Alpha/Kolibri-1" };
  const a = await pruefe(t, { mitHash: true, holen: hfHolen("abc123", 17864, "<p>Downloads 17,864</p>") });
  const b = await pruefe(t, { mitHash: true, holen: hfHolen("abc123", 19214, "<p>Downloads 19,214</p>") });
  assert.equal(a.befund, "ok");
  assert.equal(a.hash, b.hash);
  assert.deepEqual(a.woerter, ["hf-revision:abc123", "lastModified:2026-10-16T10:14:00.000Z"]);
});

test("pruefe: HF-Modellkarte, neue Revision → anderer Hash", async () => {
  const { pruefe } = require("../lib/quellen.js");
  const t = { url: "https://huggingface.co/Aleph-Alpha/Kolibri-1" };
  const a = await pruefe(t, { mitHash: true, holen: hfHolen("abc123", 1, "<p>x</p>") });
  const b = await pruefe(t, { mitHash: true, holen: hfHolen("def456", 1, "<p>x</p>") });
  assert.notEqual(a.hash, b.hash);
});

test("pruefe: HF-API ohne sha oder nicht erreichbar → Hash über die HTML-Seite wie bisher", async () => {
  const { pruefe, hashInhalt } = require("../lib/quellen.js");
  const t = { url: "https://huggingface.co/Aleph-Alpha/Kolibri-1" };
  const e = await pruefe(t, { mitHash: true, holen: hfHolen(undefined, 1, "<p>Karte</p>") });
  assert.equal(e.hash, hashInhalt("text/html", Buffer.from("<p>Karte</p>")));
  const kaputt = async (u) => { if (u.includes("/api/")) throw new Error("netz weg"); return hfHolen("x", 1, "<p>Karte</p>")(u); };
  const f = await pruefe(t, { mitHash: true, holen: kaputt });
  assert.equal(f.befund, "ok");
  assert.equal(f.hash, hashInhalt("text/html", Buffer.from("<p>Karte</p>")));
});
