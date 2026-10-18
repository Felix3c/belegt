"use strict";
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { ladeListe, rohName, rohBeleg, rohBelege, berichtZeilen } = require("../waechter.js");

test("ladeListe: gültige Liste wird zu Quellen im Format von pruefeAlle", () => {
  const l = ladeListe({ quellen: [{ anbieter: "openai", art: "unterauftragnehmer", url: "https://openai.com/policies/sub-processor-list/" }] });
  assert.equal(l.length, 1);
  assert.equal(l[0].anbieter, "openai");
  assert.equal(l[0].art, "unterauftragnehmer");
  assert.equal(l[0].url, "https://openai.com/policies/sub-processor-list/");
});

test("ladeListe: fehlende Felder, http ohne s und doppelte URLs brechen ab", () => {
  assert.throws(() => ladeListe({}), /quellen/);
  assert.throws(() => ladeListe({ quellen: [{ anbieter: "x", url: "https://a.example/" }] }), /art/);
  assert.throws(() => ladeListe({ quellen: [{ anbieter: "x", art: "avv", url: "http://a.example/" }] }), /https/);
  const q = { anbieter: "x", art: "avv", url: "https://a.example/" };
  assert.throws(() => ladeListe({ quellen: [q, { ...q }] }), /doppelt/);
});

test("rohName: Anbieter, Art und Endung aus dem Inhaltstyp", () => {
  assert.equal(rohName({ anbieter: "openai", art: "avv" }, "text/html; charset=utf-8"), "openai-avv.html");
  assert.equal(rohName({ anbieter: "microsoft", art: "avv" }, "application/pdf"), "microsoft-avv.pdf");
  assert.equal(rohName({ anbieter: "google", art: "x" }, null), "google-x.bin");
});

test("berichtZeilen: verändert steht oben mit Wortprotokoll, neu und unverändert nur gezählt", () => {
  const o = {
    neu: [{ anbieter: "a", art: "avv", url: "https://a/" }],
    unveraendert: [{ anbieter: "b", art: "avv", url: "https://b/" }],
    veraendert: [{ anbieter: "c", art: "unterauftragnehmer", url: "https://c/", wortDiff: { weg: [["Alt", 1]], dazu: [["Neu", 2]] } }],
    verschwunden: [], uebersprungen: [],
  };
  const z = berichtZeilen(o).join("\n");
  assert.match(z, /VERÄNDERT: c unterauftragnehmer https:\/\/c\//);
  assert.match(z, /weg: "Alt"/);
  assert.match(z, /dazu: 2× "Neu"/);
  assert.match(z, /neu 1, unverändert 1, verändert 1, verschwunden 0, übersprungen 0/);
  assert.ok(z.indexOf("VERÄNDERT") < z.indexOf("neu 1"));
});

test("berichtZeilen: Seite mit kaum Wörtern (lädt erst im Browser) wird als DÜNN gemeldet, PDF ohne Wortliste nicht", () => {
  const mitWoertern = (e, n) => Object.defineProperty(e, "woerter", { value: Array.from({ length: n }, (_, i) => "w" + i), enumerable: false });
  const o = {
    neu: [mitWoertern({ anbieter: "notion", art: "unterauftragnehmer", url: "https://n/" }, 15)],
    unveraendert: [mitWoertern({ anbieter: "zoom", art: "unterauftragnehmer", url: "https://z/" }, 3000), { anbieter: "zoom", art: "avv", url: "https://z.pdf" }],
    veraendert: [], verschwunden: [], uebersprungen: [],
  };
  const z = berichtZeilen(o).join("\n");
  assert.match(z, /DÜNN: notion unterauftragnehmer https:\/\/n\/ \(15 Wörter/);
  assert.doesNotMatch(z, /DÜNN: zoom/);
  assert.ok(z.indexOf("DÜNN") < z.indexOf("neu 1"));
});

test("ordner: Standard waechter/, Unterordner per WAECHTER_DIR, nichts außerhalb (bleibt gitignored)", () => {
  const { ordner } = require("../waechter.js");
  const path = require("path");
  const basis = path.join(__dirname, "..", "waechter");
  assert.equal(ordner({}), basis);
  assert.equal(ordner({ WAECHTER_DIR: "waechter/pilot" }), path.join(basis, "pilot"));
  assert.throws(() => ordner({ WAECHTER_DIR: "pilot" }), /waechter/);
  assert.throws(() => ordner({ WAECHTER_DIR: "waechter/../docs" }), /waechter/);
  assert.throws(() => ordner({ WAECHTER_DIR: "waechter-pilot" }), /waechter/);
});

test("rohBeleg: Notion-Seite mit Wörtern wird .txt, SHA-Anfang gleich dem Ledger-Hash", () => {
  const crypto = require("crypto");
  const q = { anbieter: "notion", art: "unterauftragnehmer", url: "https://notion.notion.site/Notion-s-List-of-Subprocessors-268fa5bcfa0f46b6bc29436b21676734" };
  const woerter = ["AWS", "Google", "Subprocessors"];
  Object.defineProperty(q, "woerter", { value: woerter, enumerable: false });
  q.hash = crypto.createHash("sha256").update(woerter.join(" ")).digest("hex").slice(0, 16);
  const b = rohBeleg(q);
  assert.equal(b.name, "notion-unterauftragnehmer.txt");
  assert.equal(b.bytes.toString("utf8"), "AWS Google Subprocessors");
  const ledgerHash = crypto.createHash("sha256").update(woerter.join(" ")).digest("hex").slice(0, 16);
  assert.equal(crypto.createHash("sha256").update(b.bytes).digest("hex").slice(0, 16), ledgerHash);
});

test("rohBeleg: andere Seiten und Notion ohne Wörter brauchen den Abruf (null)", () => {
  assert.equal(rohBeleg({ anbieter: "slack", art: "avv", url: "https://slack.com/terms-of-service/data-processing", woerter: ["a"] }), null);
  assert.equal(rohBeleg({ anbieter: "notion", art: "avv", url: "https://notion.notion.site/Data-Processing-Addendum-361b540101274b1fa7e16b90402b0d99" }), null);
  // API gescheitert: Wörter stammen aus der HTML-Hülle, Hash ist der HTML-Hash, also kein .txt-Beleg.
  const huelle = { anbieter: "notion", art: "avv", url: "https://notion.notion.site/Data-Processing-Addendum-361b540101274b1fa7e16b90402b0d99", hash: "99bf620a5fce29fb" };
  Object.defineProperty(huelle, "woerter", { value: ["Notion", "JavaScript"], enumerable: false });
  assert.equal(rohBeleg(huelle), null);
});

test("rohBelege: Notion mit Lesefolge → Wort-Beleg plus -lesefolge.txt (eine Zeile je Block)", () => {
  const crypto = require("crypto");
  const q = { anbieter: "notion", art: "unterauftragnehmer", url: "https://notion.notion.site/Notion-s-List-of-Subprocessors-268fa5bcfa0f46b6bc29436b21676734" };
  const woerter = ["AWS", "Hosting", "Subprocessors"];
  Object.defineProperty(q, "woerter", { value: woerter, enumerable: false });
  Object.defineProperty(q, "lesefolge", { value: ["Subprocessors", "AWS | Hosting"], enumerable: false });
  q.hash = crypto.createHash("sha256").update(woerter.join(" ")).digest("hex").slice(0, 16);
  const b = rohBelege(q);
  assert.deepEqual(b.map((x) => x.name), ["notion-unterauftragnehmer.txt", "notion-unterauftragnehmer-lesefolge.txt"]);
  assert.equal(b[1].bytes.toString("utf8"), "Subprocessors\nAWS | Hosting\n");
});

test("rohBelege: ohne Lesefolge nur der Wort-Beleg; ohne API-Wörter leer (Abruf nötig)", () => {
  const crypto = require("crypto");
  const q = { anbieter: "notion", art: "avv", url: "https://notion.notion.site/Data-Processing-Addendum-361b540101274b1fa7e16b90402b0d99" };
  Object.defineProperty(q, "woerter", { value: ["a"], enumerable: false });
  q.hash = crypto.createHash("sha256").update("a").digest("hex").slice(0, 16);
  assert.deepEqual(rohBelege(q).map((x) => x.name), ["notion-avv.txt"]);
  assert.deepEqual(rohBelege({ anbieter: "slack", art: "avv", url: "https://slack.com/x" }), []);
});
