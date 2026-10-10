"use strict";
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { zaehle, unveraendertSeit, statuswechsel30 } = require("../lib/quellenstand.js");
const { fuehreLedger } = require("../lib/quellen.js");

const url = (u, felder) => ({ url: u, felder: felder.map(([anbieter, schluessel]) => ({ anbieter, schluessel })) });

const URLS = [
  url("https://a.eu/", [["a", "website"]]), // Startseite: zählt nicht
  url("https://a.eu/avv", [["a", "quelle"]]), // unverändert
  url("https://a.eu/sub", [["a", "quelle"]]), // verändert, von Hand gelesen, übernommen
  url("https://a.eu/dpa", [["a", "quelle"]]), // offen (neu_hash)
  url("https://a.eu/zert", [["a", "quelle"]]), // verschwunden
  url("https://a.eu/neu", [["a", "quelle"]]), // nicht im Ledger
  url("https://dqs.com/a", [["a", "quelle"]]), // von Hand auf nur_erreichbar gesetzt
  url("https://b.eu/geteilt", [["b", "quelle"], ["a", "quelle"]]), // belegt bei a und b
  url("https://b.eu/", [["b", "website"]]),
];
const LEDGER = {
  "https://a.eu/": { nur_erreichbar: true, gesehen: "2026-10-09" },
  "https://a.eu/avv": { hash: "1", gesehen: "2026-10-09", geaendert: "2026-10-03", erst: "2026-10-03" },
  "https://a.eu/sub": { hash: "2", gesehen: "2026-10-09", geaendert: "2026-10-08", erst: "2026-10-03", uebernommen: "2026-10-08" },
  "https://a.eu/dpa": { hash: "3", gesehen: "2026-10-09", geaendert: "2026-10-03", erst: "2026-10-03", neu_hash: "4", veraendert_seit: "2026-10-09" },
  "https://a.eu/zert": { hash: "5", gesehen: "2026-10-10", geaendert: "2026-10-03", erst: "2026-10-03", verschwunden: "fehler" },
  "https://dqs.com/a": { nur_erreichbar: true, grund: "rotiert", gesehen: "2026-10-09" },
  "https://b.eu/geteilt": { hash: "6", gesehen: "2026-10-08", geaendert: "2026-10-08", erst: "2026-10-08" },
};

test("zaehle: belegende Quellen eines Anbieters in vier Gruppen, Startseiten zählen nicht", () => {
  assert.deepEqual(zaehle("a", URLS, LEDGER), {
    zuletzt: "2026-10-10",
    quellen: 7,
    nachgelesen: 5,
    unveraendert: 2,
    veraendert_gelesen: 1,
    offen: 1,
    verschwunden: 1,
  });
});

test("zaehle: die Gruppen ergeben zusammen genau die nachgelesenen Quellen", () => {
  const z = zaehle("a", URLS, LEDGER);
  assert.equal(z.unveraendert + z.veraendert_gelesen + z.offen + z.verschwunden, z.nachgelesen);
});

test("zaehle: geteilte Quelle zählt bei beiden Anbietern, fremde Quellen nicht", () => {
  assert.deepEqual(zaehle("b", URLS, LEDGER), {
    zuletzt: "2026-10-08", quellen: 1, nachgelesen: 1, unveraendert: 1, veraendert_gelesen: 0, offen: 0, verschwunden: 0,
  });
});

test("zaehle: Anbieter ohne nachgelesene Quelle hat kein Datum", () => {
  const z = zaehle("c", [url("https://c.eu/avv", [["c", "quelle"]])], {});
  assert.deepEqual(z, { zuletzt: null, quellen: 1, nachgelesen: 0, unveraendert: 0, veraendert_gelesen: 0, offen: 0, verschwunden: 0 });
});

test("unveraendertSeit: nur bei gleichem Hash ohne offene Änderung, sonst null", () => {
  assert.equal(unveraendertSeit(LEDGER["https://a.eu/avv"]), "2026-10-03");
  assert.equal(unveraendertSeit(LEDGER["https://a.eu/sub"]), "2026-10-08");
  assert.equal(unveraendertSeit(LEDGER["https://a.eu/dpa"]), null);
  assert.equal(unveraendertSeit(LEDGER["https://a.eu/zert"]), null);
  assert.equal(unveraendertSeit(LEDGER["https://dqs.com/a"]), null);
  assert.equal(unveraendertSeit(undefined), null);
});

test("statuswechsel30: zählt Protokolleinträge des Anbieters in den letzten 30 Tagen, Fälle nicht", () => {
  const e = [
    { datum: "2026-10-09", anbieter: "a", typ: "status" },
    { datum: "2026-09-10", anbieter: "a", typ: "quelle" },
    { datum: "2026-09-09", anbieter: "a", typ: "status" },
    { datum: "2026-10-09", anbieter: "b", typ: "status" },
    { datum: "2026-10-09", anbieter: "a", typ: "fall" },
  ];
  assert.equal(statuswechsel30("a", e, "2026-10-10"), 2);
});

const lauf = (teil) => ({ neu: [], unveraendert: [], veraendert: [], uebernommen: [], verschwunden: [], ...teil });

test("fuehreLedger: neue Quelle bekommt erst, übernommene behält erst und bekommt uebernommen", () => {
  const alt = { "https://x/1": { hash: "a", gesehen: "2026-10-03", geaendert: "2026-10-03", erst: "2026-10-03" } };
  const l1 = fuehreLedger(alt, lauf({ neu: [{ url: "https://x/2", hash: "b" }] }), false, "2026-10-10");
  assert.deepEqual(l1["https://x/2"], { hash: "b", gesehen: "2026-10-10", geaendert: "2026-10-10", erst: "2026-10-10" });
  const l2 = fuehreLedger(alt, lauf({ uebernommen: [{ url: "https://x/1", hash: "c" }] }), false, "2026-10-10");
  assert.deepEqual(l2["https://x/1"], { hash: "c", gesehen: "2026-10-10", geaendert: "2026-10-10", erst: "2026-10-03", uebernommen: "2026-10-10" });
  const l3 = fuehreLedger(alt, lauf({ veraendert: [{ url: "https://x/1", hash: "d" }] }), true, "2026-10-10");
  assert.equal(l3["https://x/1"].uebernommen, "2026-10-10");
  assert.equal(l3["https://x/1"].erst, "2026-10-03");
});

test("fuehreLedger: verändert ohne Übernahme merkt neu_hash, unverändert räumt neu_hash und verschwunden", () => {
  const alt = { "https://x/1": { hash: "a", gesehen: "2026-10-03", geaendert: "2026-10-03", erst: "2026-10-03", verschwunden: "fehler" } };
  const l1 = fuehreLedger(alt, lauf({ veraendert: [{ url: "https://x/1", hash: "d" }] }), false, "2026-10-10");
  assert.equal(l1["https://x/1"].neu_hash, "d");
  assert.equal(l1["https://x/1"].veraendert_seit, "2026-10-10");
  assert.equal(l1["https://x/1"].hash, "a");
  const l2 = fuehreLedger({ "https://x/1": l1["https://x/1"] }, lauf({ unveraendert: [{ url: "https://x/1", hash: "a" }] }), false, "2026-10-11");
  assert.deepEqual(l2["https://x/1"], { hash: "a", gesehen: "2026-10-11", geaendert: "2026-10-03", erst: "2026-10-03" });
});

test("fuehreLedger: Startseiten bleiben nur_erreichbar, Schlüssel sortiert", () => {
  const l = fuehreLedger({}, lauf({ unveraendert: [{ url: "https://z/", nurErreichbar: true }, { url: "https://a/", nurErreichbar: true }] }), false, "2026-10-10");
  assert.deepEqual(Object.keys(l), ["https://a/", "https://z/"]);
  assert.deepEqual(l["https://z/"], { nur_erreichbar: true, gesehen: "2026-10-10" });
});

const { hinweis } = require("../lib/quellenstand.js");

test("hinweis: an der Quelle unverändert seit, offen seit oder nicht erreichbar; sonst nichts", () => {
  assert.deepEqual(hinweis(LEDGER["https://a.eu/avv"]), { art: "unveraendert", datum: "2026-10-03" });
  assert.deepEqual(hinweis(LEDGER["https://a.eu/dpa"]), { art: "offen", datum: "2026-10-09" });
  assert.deepEqual(hinweis(LEDGER["https://a.eu/zert"]), { art: "verschwunden", datum: "2026-10-10" });
  assert.equal(hinweis(LEDGER["https://dqs.com/a"]), null);
  assert.equal(hinweis(LEDGER["https://a.eu/"]), null);
  assert.equal(hinweis(undefined), null);
});
