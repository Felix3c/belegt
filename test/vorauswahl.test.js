"use strict";
// Vorauswahl an einer Stelle (Fachantwort eines Prüfers 23.10.2026, Felix' „ja“ zu Frage 531):
// je Anbieter Preis, Zahl der Unterauftragnehmer, Drittländer, AVV-Link und TOM-Link in einer Tabelle.
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const VA = require("../lib/vorauswahl.js");

const WURZEL = path.join(__dirname, "..");
const DATA = path.join(WURZEL, "data", "anbieter");
const alle = () => fs.readdirSync(DATA).filter((f) => f.endsWith(".json")).map((f) => JSON.parse(fs.readFileSync(path.join(DATA, f), "utf8")));
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const datumDE = (d) => d.split("-").reverse().join(".");

const feld = (wert, status = "belegt", extra = {}) => ({ wert, status, quelle: "https://x.example/liste", geprueft: "2026-10-24", anmerkung: "„Zitat“", ...extra });
const profil = (vertrag = {}) => ({ id: "x", name: "X", stammdaten: { land: "DE" }, modelle: [], vertrag });

test("drei neue Felder, feste Namen", () => {
  assert.deepEqual(VA.FELDER, ["tom", "subprozessoren_anzahl", "drittlaender"]);
});

test("pruefe: gültige Felder ohne Fehler", () => {
  const p = profil({ tom: feld("https://x.example/tom"), subprozessoren_anzahl: feld(12), drittlaender: feld(["Schweiz", "USA"]) });
  assert.deepEqual(VA.pruefe(p), []);
});

test("pruefe: fehlendes Feld ist ein Fehler", () => {
  const f = VA.pruefe(profil({ tom: feld("https://x.example/tom") }));
  assert.ok(f.some((t) => /subprozessoren_anzahl fehlt/.test(t)), f.join("; "));
  assert.ok(f.some((t) => /drittlaender fehlt/.test(t)), f.join("; "));
});

test("pruefe: Werttypen", () => {
  const f = VA.pruefe(profil({ tom: feld("keine-url"), subprozessoren_anzahl: feld(2.5), drittlaender: feld("USA") }));
  assert.ok(f.some((t) => /tom: wert muss eine https-URL sein/.test(t)), f.join("; "));
  assert.ok(f.some((t) => /subprozessoren_anzahl: wert muss eine ganze Zahl/.test(t)), f.join("; "));
  assert.ok(f.some((t) => /drittlaender: wert muss eine Liste/.test(t)), f.join("; "));
});

test("pruefe: Drittländer alphabetisch, ohne EU/EWR-Staaten", () => {
  const f = VA.pruefe(profil({ tom: feld(null, "unbelegt", { anmerkung: "Ungeklärt: x" }), subprozessoren_anzahl: feld(3), drittlaender: feld(["USA", "Irland"]) }));
  assert.ok(f.some((t) => /Irland liegt in EU\/EWR/.test(t)), f.join("; "));
  assert.ok(f.some((t) => /alphabetisch/.test(t)), f.join("; "));
});

test("pruefe: belegt braucht Wert, Quelle und Datum; ohne Wert heißt es „Ungeklärt:“", () => {
  const f = VA.pruefe(profil({
    tom: feld(null, "belegt"),
    subprozessoren_anzahl: { wert: 4, status: "belegt", anmerkung: "x" },
    drittlaender: feld(null, "unbelegt", { anmerkung: "keine Angabe" }),
  }));
  assert.ok(f.some((t) => /tom: belegt ohne Wert/.test(t)), f.join("; "));
  assert.ok(f.some((t) => /subprozessoren_anzahl: belegt ohne Quelle/.test(t)), f.join("; "));
  assert.ok(f.some((t) => /drittlaender: ohne Wert muss die Anmerkung mit „Ungeklärt:“ beginnen/.test(t)), f.join("; "));
});

test("pruefe: unbekannter Status ist ein Fehler", () => {
  const f = VA.pruefe(profil({ tom: feld("https://x.example/t", "vielleicht"), subprozessoren_anzahl: feld(1), drittlaender: feld([]) }));
  assert.ok(f.some((t) => /tom: Status „vielleicht“/.test(t)), f.join("; "));
});

test("Zellen: Zahl, Länder, Links und „ungeklärt“", () => {
  const p = profil({
    avv: feld("https://x.example/avv"),
    subprozessoren: feld("https://x.example/sub"),
    tom: feld(null, "unbelegt", { anmerkung: "Ungeklärt: nur auf Anfrage." }),
    subprozessoren_anzahl: feld(7),
    drittlaender: feld(["USA", "Vereinigtes Königreich"]),
  });
  const z = VA.zellen(p, { esc, datumDE, preisKurz: () => "ab 0,10 € / 1M Input" });
  assert.match(z.anzahl, /href="https:\/\/x\.example\/sub"[^>]*>7</);
  assert.match(z.laender, /USA, Vereinigtes Königreich/);
  assert.match(z.tom, /ungeklärt/);
  assert.match(z.avv, /href="https:\/\/x\.example\/avv"/);
  assert.match(z.preis, /ab 0,10 €/);
  const leer = VA.zellen(profil({ drittlaender: feld([]) }), { esc, datumDE, preisKurz: () => "–" });
  assert.match(leer.laender, /keine \(alle in EU\/EWR\)/);
  assert.match(leer.anzahl, /ungeklärt/);
  assert.match(leer.preis, /kein EUR-Preis erfasst, siehe Profil/);
});

test("Tabelle: eine Zeile je Anbieter, Kopf mit allen fünf Angaben, Stand je Zelle", () => {
  const ps = alle();
  const html = VA.tabelle(ps, { esc, datumDE, preisKurz: () => "–" });
  assert.equal((html.match(/<tr class="va-zeile"/g) || []).length, ps.length);
  for (const k of ["Preis", "Unterauftragnehmer", "Drittländer", "AVV", "Sicherheitsmaßnahmen"]) assert.ok(html.includes(k), k);
});

test("Daten: alle Anbieter haben die drei Felder und keine Prüffehler", () => {
  const fehler = alle().flatMap((p) => VA.pruefe(p).map((f) => `${p.id}: ${f}`));
  assert.deepEqual(fehler, []);
});

test("build.js: eigene Seite /vorauswahl/, Prüfung im Build, Profil zeigt die drei Felder", () => {
  const b = fs.readFileSync(path.join(WURZEL, "build.js"), "utf8");
  assert.match(b, /schreibe\("vorauswahl\/index\.html"/);
  assert.match(b, /VA\.pruefe\(p\)/);
  assert.match(b, /belegZeile\("Sicherheitsmaßnahmen \(TOM\)"/);
  assert.match(b, /belegZeile\("Zahl der Unterauftragnehmer"/);
  assert.match(b, /belegZeile\("Drittländer der Unterauftragnehmer"/);
});
