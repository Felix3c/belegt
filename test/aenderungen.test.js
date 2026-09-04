"use strict";
const { test } = require("node:test");
const assert = require("node:assert/strict");
const path = require("path");
const { vergleicheAnbieter, vergleicheFall, ausGit, atomFeed } = require("../lib/aenderungen.js");

const basis = () => ({
  id: "x", name: "X",
  vertrag: {
    avv: { wert: "https://x.example/avv.pdf", status: "belegt", quelle: "https://x.example/avv.pdf", anmerkung: "AVV als PDF." },
    subprozessoren: { wert: null, status: "unbelegt", quelle: null, anmerkung: "Keine Liste." },
  },
  zertifikate: [
    { typ: "ISO 27001", status: "belegt", quelle: "https://x.example/zert", anmerkung: "TÜV." },
    { typ: "SOC 2", status: "beansprucht", quelle: "https://x.example/trust", anmerkung: "Nur Logo." },
  ],
  ai_act: [{ pflicht: "Transparenz", status: "beansprucht", quelle: "https://x.example/ai", anmerkung: "" }],
  modelle: [{ name: "M1", status: "belegt", quelle: "https://x.example/m", preis_input_1m_eur: 1 }],
  geprueft: "2026-08-20",
});

test("vergleicheAnbieter: Statuswechsel am AVV ergibt einen Eintrag mit Grund aus der neuen Anmerkung", () => {
  const alt = basis();
  const neu = basis();
  neu.vertrag.avv = { wert: null, status: "unbelegt", quelle: null, anmerkung: "PDF verschwunden; alte URL https://x.example/avv.pdf leitet auf die Startseite." };
  const e = vergleicheAnbieter(alt, neu, "2026-08-24");
  assert.equal(e.length, 1);
  assert.deepEqual(e[0], {
    datum: "2026-08-24", anbieter: "x", typ: "status", pfad: "vertrag.avv", feld: "AVV / Auftragsverarbeitungsvertrag",
    alt: "belegt", neu: "unbelegt",
    quelle_alt: "https://x.example/avv.pdf", quelle_neu: null,
    grund: "PDF verschwunden; alte URL https://x.example/avv.pdf leitet auf die Startseite.",
  });
});

test("vergleicheAnbieter: fortgeschriebenes Prüfdatum und geänderte Anmerkung allein sind keine Änderung", () => {
  const alt = basis();
  const neu = basis();
  neu.geprueft = "2026-09-28";
  neu.zertifikate[0].geprueft = "2026-09-28";
  neu.zertifikate[1].anmerkung = "Logo und Trust-Center-Hinweis.";
  assert.deepEqual(vergleicheAnbieter(alt, neu, "2026-09-28"), []);
});

test("vergleicheAnbieter: Zertifikate werden über den Typ zugeordnet, ein neuer Eintrag zählt als Änderung von null", () => {
  const alt = basis();
  const neu = basis();
  neu.zertifikate = [neu.zertifikate[1], neu.zertifikate[0], { typ: "BSI C5", status: "belegt", quelle: "https://x.example/c5", anmerkung: "Testat Typ 2." }];
  neu.zertifikate[0].status = "belegt";
  const e = vergleicheAnbieter(alt, neu, "2026-08-24");
  assert.equal(e.length, 2);
  const soc = e.find((x) => x.pfad === "zertifikate[SOC 2]");
  assert.equal(soc.alt, "beansprucht");
  assert.equal(soc.neu, "belegt");
  assert.equal(soc.grund, null);
  const c5 = e.find((x) => x.pfad === "zertifikate[BSI C5]");
  assert.equal(c5.alt, null);
  assert.equal(c5.neu, "belegt");
  assert.equal(c5.feld, "Zertifikat BSI C5");
});

test("vergleicheAnbieter: geänderte Quelle bei gleichem Status ist ein Eintrag vom Typ quelle", () => {
  const alt = basis();
  const neu = basis();
  neu.ai_act[0].quelle = "https://x.example/ai-act-neu";
  const e = vergleicheAnbieter(alt, neu, "2026-08-24");
  assert.equal(e.length, 1);
  assert.equal(e[0].typ, "quelle");
  assert.equal(e[0].alt, "beansprucht");
  assert.equal(e[0].neu, "beansprucht");
  assert.equal(e[0].quelle_alt, "https://x.example/ai");
  assert.equal(e[0].quelle_neu, "https://x.example/ai-act-neu");
});

test("vergleicheAnbieter: neuer Anbieter ergibt genau einen Eintrag vom Typ anbieter", () => {
  const e = vergleicheAnbieter(null, basis(), "2026-08-20");
  assert.equal(e.length, 1);
  assert.equal(e[0].typ, "anbieter");
  assert.equal(e[0].anbieter, "x");
  assert.equal(e[0].neu, "aufgenommen");
});

test("vergleicheFall: Statuswechsel und Eröffnung", () => {
  const f = { id: "2026-009", slug: "2026-009-x", anbieter: "x", titel: "T", status: "offen", eroeffnet: "2026-08-25" };
  const er = vergleicheFall(null, f, "2026-08-25");
  assert.equal(er.length, 1);
  assert.equal(er[0].typ, "fall");
  assert.equal(er[0].alt, null);
  assert.equal(er[0].neu, "offen");
  assert.equal(er[0].fall, "2026-009");
  const w = vergleicheFall(f, { ...f, status: "beantwortet" }, "2026-09-01");
  assert.equal(w.length, 1);
  assert.equal(w[0].alt, "offen");
  assert.equal(w[0].neu, "beantwortet");
  assert.deepEqual(vergleicheFall(f, { ...f, verlauf: [{ datum: "2026-09-02", ereignis: "x" }] }, "2026-09-02"), []);
});

test("ausGit: die echte Historie enthält STACKIT AVV belegt → unbelegt vom 24.08.2026, neueste zuerst", () => {
  const e = ausGit(path.join(__dirname, ".."), "2026-09-05");
  const stackit = e.find((x) => x.anbieter === "stackit" && x.pfad === "vertrag.avv");
  assert.ok(stackit, "STACKIT-AVV-Eintrag fehlt");
  assert.equal(stackit.datum, "2026-08-24");
  assert.equal(stackit.alt, "belegt");
  assert.equal(stackit.neu, "unbelegt");
  for (let i = 1; i < e.length; i++) assert.ok(e[i - 1].datum >= e[i].datum, "nicht absteigend sortiert");
  assert.ok(e.some((x) => x.typ === "fall" && x.fall === "2026-002" && x.neu === "bestaetigt"));
});

test("atomFeed: gültiges Atom mit einem Eintrag je Änderung", () => {
  const xml = atomFeed([
    { datum: "2026-08-24", anbieter: "stackit", typ: "status", pfad: "vertrag.avv", feld: "AVV", alt: "belegt", neu: "unbelegt", quelle_alt: "https://a", quelle_neu: null, grund: "PDF weg" },
  ], { baseUrl: "https://belegbar.eu", name: "belegbar.eu", anbieterName: () => "STACKIT" });
  assert.match(xml, /^<\?xml version="1.0" encoding="UTF-8"\?>\n<feed xmlns="http:\/\/www.w3.org\/2005\/Atom">/);
  assert.match(xml, /<id>https:\/\/belegbar.eu\/aenderungen\/#2026-08-24-stackit-vertrag.avv<\/id>/);
  assert.match(xml, /<title>STACKIT: AVV belegt → unbelegt<\/title>/);
  assert.match(xml, /<updated>2026-08-24T00:00:00Z<\/updated>/);
  assert.match(xml, /PDF weg/);
});

const { gruppiere, anzahlSeit } = require("../lib/aenderungen.js");

test("gruppiere: Quellenwechsel derselben URL am selben Tag werden zu einem Eintrag mit mehreren Feldern", () => {
  const q = (pfad, feld) => ({ datum: "2026-08-24", anbieter: "ovh", typ: "quelle", pfad, feld, alt: "belegt", neu: "belegt", quelle_alt: "https://a", quelle_neu: "https://b", grund: null });
  const s = { datum: "2026-08-24", anbieter: "ovh", typ: "status", pfad: "vertrag.avv", feld: "AVV", alt: "belegt", neu: "unbelegt", quelle_alt: "https://a", quelle_neu: null, grund: null };
  const g = gruppiere([s, q("zertifikate[ISO 27001]", "Zertifikat ISO 27001"), q("zertifikate[HDS]", "Zertifikat HDS")]);
  assert.equal(g.length, 2);
  assert.equal(g[0].typ, "status");
  assert.deepEqual(g[1].felder, ["Zertifikat ISO 27001", "Zertifikat HDS"]);
  assert.equal(g[1].pfad, "zertifikate[ISO 27001]");
});

test("anzahlSeit: zählt Einträge der letzten n Tage einschließlich des Stichtags", () => {
  const e = [{ datum: "2026-09-05" }, { datum: "2026-08-06" }, { datum: "2026-08-05" }];
  assert.equal(anzahlSeit(e, "2026-09-05", 30), 2);
});

const { parseLogZeile } = require("../lib/aenderungen.js");

test("ankerId: zwei Änderungen desselben Feldes am selben Tag bekommen verschiedene Anker", () => {
  const e = (neu) => ({ datum: "2026-09-02", anbieter: "x", typ: "status", pfad: "vertrag.avv", feld: "AVV", alt: "belegt", neu, quelle_alt: null, quelle_neu: null, grund: null });
  const g = gruppiere([e("unbelegt"), e("beansprucht")]);
  const ids = g.map((x) => require("../lib/aenderungen.js").ankerId(x));
  assert.notEqual(ids[0], ids[1]);
  assert.equal(ids[0], "2026-09-02-x-vertrag.avv");
  assert.equal(ids[1], "2026-09-02-x-vertrag.avv-2");
});

test("vergleicheFall: gelöschter Fall wird als entfernt verzeichnet", () => {
  const f = { id: "2026-009", slug: "2026-009-x", anbieter: "x", titel: "T", status: "offen" };
  const e = vergleicheFall(f, null, "2026-09-05");
  assert.equal(e.length, 1);
  assert.equal(e[0].alt, "offen");
  assert.equal(e[0].neu, "entfernt");
  assert.equal(e[0].fall, "2026-009");
});

test("parseLogZeile: ein Tab im Betreff geht nicht verloren", () => {
  assert.deepEqual(parseLogZeile("abc\t2026-09-05\tfix: a\tb"), { sha: "abc", datum: "2026-09-05", betreff: "fix: a\tb" });
});
