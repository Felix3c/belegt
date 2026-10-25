"use strict";
// Vorauswahl als Tabelle zum Herunterladen (WX-CSV, Wöchentlich KW 43, 25.10.2026): Prüfer führen ihre
// Dienstleister-Prüfung in Excel. UTF-8 mit BOM, Semikolon, je Wert eine Spalte Quelle und „geprüft am“.
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const VA = require("../lib/vorauswahl.js");
const P = require("../lib/preise.js");

const WURZEL = path.join(__dirname, "..");
const DATA = path.join(WURZEL, "data", "anbieter");
const alle = () => fs.readdirSync(DATA).filter((f) => f.endsWith(".json")).map((f) => JSON.parse(fs.readFileSync(path.join(DATA, f), "utf8")));
const datumDE = (d) => d.split("-").reverse().join(".");
const h = { datumDE, preisKurz: P.preisKurz, baseUrl: "https://belegbar.eu" };

/** Einfacher Leser für das eigene Format (Semikolon, Anführungszeichen verdoppelt). */
function lies(text) {
  const zeilen = [];
  let feld = "", zeile = [], inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) {
      if (c === '"' && text[i + 1] === '"') { feld += '"'; i++; } else if (c === '"') inQ = false; else feld += c;
    } else if (c === '"') inQ = true;
    else if (c === ";") { zeile.push(feld); feld = ""; }
    else if (c === "\n") { zeile.push(feld.replace(/\r$/, "")); zeilen.push(zeile); zeile = []; feld = ""; }
    else feld += c;
  }
  if (feld || zeile.length) { zeile.push(feld); zeilen.push(zeile); }
  return zeilen;
}

const SPALTEN = [
  "Anbieter", "Profil",
  "Preis (günstigster in EUR)", "Preis Quelle", "Preis geprüft am",
  "Unterauftragnehmer (Anzahl)", "Unterauftragnehmer Quelle", "Unterauftragnehmer geprüft am",
  "Drittländer der Unterauftragnehmer", "Drittländer Quelle", "Drittländer geprüft am",
  "AVV", "AVV Quelle", "AVV geprüft am",
  "Sicherheitsmaßnahmen (TOM)", "TOM Quelle", "TOM geprüft am",
  "Zertifikate (belegt)", "Zertifikate Quelle", "Zertifikate geprüft am",
];

test("csv: BOM, Semikolon, feste Spalten", () => {
  const t = VA.csv(alle(), h);
  assert.ok(t.startsWith("﻿"), "BOM fehlt");
  assert.deepEqual(lies(t.slice(1))[0], SPALTEN);
  assert.ok(t.includes("\r\n"), "Excel erwartet CRLF");
});

test("csv: eine Zeile je Anbieter, alphabetisch", () => {
  const ps = alle();
  const z = lies(VA.csv(ps, h).slice(1)).slice(1).filter((r) => r.length > 1);
  assert.equal(z.length, ps.length);
  const namen = z.map((r) => r[0]);
  assert.deepEqual(namen, [...namen].sort((a, b) => a.localeCompare(b, "de")));
  z.forEach((r) => assert.equal(r.length, SPALTEN.length, r[0]));
});

test("csv: jeder Wert außer „ungeklärt“ hat Quelle (https) und Datum", () => {
  const z = lies(VA.csv(alle(), h).slice(1)).slice(1).filter((r) => r.length > 1);
  for (const r of z) {
    for (let i = 2; i < SPALTEN.length; i += 3) {
      if (r[i] === "ungeklärt" || r[i] === "keine belegt") continue;
      assert.match(r[i + 1], /^https:\/\//, `${r[0]} / ${SPALTEN[i]}: Quelle fehlt`);
      assert.match(r[i + 2], /^\d{2}\.\d{2}\.\d{4}$/, `${r[0]} / ${SPALTEN[i]}: Datum fehlt`);
    }
  }
});

test("csv: Werte gleich den Profildaten", () => {
  const ps = alle();
  const z = lies(VA.csv(ps, h).slice(1)).slice(1).filter((r) => r.length > 1);
  const nachName = new Map(z.map((r) => [r[0], r]));
  for (const p of ps) {
    const r = nachName.get(p.name);
    const v = p.vertrag || {};
    assert.equal(r[1], `https://belegbar.eu/anbieter/${p.id}/`);
    const a = v.subprozessoren_anzahl;
    assert.equal(r[5], a && Number.isInteger(a.wert) ? String(a.wert) : "ungeklärt", p.id);
    assert.equal(r[11], v.avv && v.avv.wert ? v.avv.wert : "ungeklärt", p.id);
    const k = P.preisKurz(p);
    if (k !== "–") assert.equal(r[2], k, p.id);
    const belegt = (p.zertifikate || []).filter((c) => c.status === "belegt").map((c) => c.typ);
    assert.equal(r[17], belegt.length ? belegt.join(", ") : "keine belegt", p.id);
  }
});

test("csv: Feldtrenner, Anführungszeichen und Formelzeichen werden entschärft", () => {
  assert.equal(VA.csvFeld('a;b'), '"a;b"');
  assert.equal(VA.csvFeld('sagt "ja"'), '"sagt ""ja"""');
  assert.equal(VA.csvFeld("=HYPERLINK(1)"), "'=HYPERLINK(1)");
  assert.equal(VA.csvFeld("@x"), "'@x");
  assert.equal(VA.csvFeld("Zeile\nzwei"), '"Zeile\nzwei"');
});

test("build: Datei liegt neben der Seite und die Seite verlinkt sie", () => {
  const datei = path.join(WURZEL, "docs", "vorauswahl", "vorauswahl.csv");
  assert.ok(fs.existsSync(datei), "erst node build.js laufen lassen");
  const roh = fs.readFileSync(datei, "utf8");
  assert.ok(roh.startsWith("﻿"));
  assert.equal(lies(roh.slice(1)).filter((r) => r.length > 1).length - 1, alle().length);
  const html = fs.readFileSync(path.join(WURZEL, "docs", "vorauswahl", "index.html"), "utf8");
  assert.match(html, /<a href="vorauswahl\.csv" download>Als Tabelle \(CSV\)<\/a>/);
});

// 25.10.2026 (Dauerlauf): Bei USD-Anbietern (OpenAI, Anthropic, Google …) stand in der CSV „ungeklärt“,
// obwohl der Preis im Profil belegt ist, nur nicht in Euro. Die Webseite sagt an derselben Stelle
// „kein EUR-Preis erfasst, siehe Profil“; die CSV muss dasselbe sagen, mit dem Profil als Quelle.
test("csv: Preis ohne EUR-Wert wie auf der Webseite, Quelle = Profil", () => {
  const ps = alle();
  const z = lies(VA.csv(ps, h).slice(1)).slice(1).filter((r) => r.length > 1);
  const oa = z.find((r) => r[0].startsWith("OpenAI API"));
  assert.equal(oa[2], "kein EUR-Preis erfasst, siehe Profil");
  assert.equal(oa[3], "https://belegbar.eu/anbieter/openai-api/");
  assert.match(oa[4], /^\d\d\.\d\d\.\d{4}$/);
});
