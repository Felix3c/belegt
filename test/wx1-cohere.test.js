"use strict";
// WX1 (24.10.2026): Cohere als Anbieter 8 der Reihe (Felix 22.10., „bis zu 5 neue Anbieter pro Tag“).
// Cohere sitzt in Kanada. Kanada hat einen Angemessenheitsbeschluss der EU-Kommission (2002/2/EG), der aber
// nur für Organisationen gilt, die unter PIPEDA fallen. Die Zählzeile darf Cohere nicht als „europäisch“ zählen.
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const R = require("../lib/rechtsraum.js");
const VA = require("../lib/vorauswahl.js");

const WURZEL = path.join(__dirname, "..");
const ID = "cohere";
const BELEGE = path.join(WURZEL, "belege", "anbieter", ID);
const lade = () => JSON.parse(fs.readFileSync(path.join(WURZEL, "data", "anbieter", ID + ".json"), "utf8"));

/** Alle wörtlichen Zitate „…“ aus einem Text. */
function zitate(text) {
  return [...String(text).matchAll(/„([^“]{6,})“/g)].map((m) => m[1]);
}

/** Leerraum, geschützte Leerzeichen und typografische Apostrophe angleichen (wie bei Amazon 23.10.). */
const norm = (s) => s.replace(/[   ]/g, " ").replace(/[’‘]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, " ").trim();

test("cohere: Profil aus Kanada, Modell-Anbieter, mit allen Vertragsfeldern", () => {
  const p = lade();
  assert.equal(p.id, ID);
  assert.equal(p.kategorie, "modell-anbieter");
  assert.equal(p.stammdaten.land, "CA");
  // Eigentümer nicht ausgewertet (Investoren nicht belegt): nur „nicht ja“
  assert.notEqual(p.stammdaten.us_eigner, true);
  assert.ok(p.modelle.length >= 1, "mindestens ein Modell");
  for (const feld of ["avv", "subprozessoren", "training_opt_out", "zero_data_retention", "zweckbindung", "log_frist"]) {
    const f = p.vertrag[feld];
    assert.ok(f, `vertrag.${feld} fehlt`);
    assert.ok(["belegt", "beansprucht", "unbelegt"].includes(f.status), `${feld}: Status ${f.status}`);
    assert.match(f.geprueft, /^\d{4}-\d{2}-\d{2}$/);
    if (f.status !== "unbelegt") assert.match(f.anmerkung, /„[^“]{10,}“/, `${feld}: wörtliches Zitat fehlt`);
  }
  for (const m of p.modelle) {
    // Preise nur in USD belegt: EUR-Felder bleiben leer, solange kein EUR-Preis belegt ist
    assert.ok(m.preis_input_1m_eur === null || typeof m.preis_input_1m_eur === "number");
  }
  assert.deepEqual(VA.pruefe(p), [], "Vorauswahl-Felder (TOM, Zahl Unterauftragnehmer, Drittländer)");
  assert.doesNotMatch(JSON.stringify(p), /PRIVAT|privates Muster|nicht im Katalog/i);
});

test("cohere: Belegkopien mit QUELLEN.md und SHA256SUMS, jede Textdatei mit Quelle und Abrufzeit", () => {
  assert.ok(fs.existsSync(path.join(BELEGE, "SHA256SUMS")), "SHA256SUMS fehlt");
  assert.ok(fs.existsSync(path.join(BELEGE, "QUELLEN.md")), "QUELLEN.md fehlt");
  const txt = fs.readdirSync(BELEGE).filter((f) => f.endsWith("-2026-10-24.txt"));
  assert.ok(txt.length >= 8, `zu wenige Belegkopien: ${txt.length}`);
  for (const f of txt) {
    const kopf = fs.readFileSync(path.join(BELEGE, f), "utf8").split("\n").slice(0, 3).join("\n");
    assert.match(kopf, /^Quelle: /, `${f}: erste Zeile nicht „Quelle:“`);
    assert.match(kopf, /Abruf: 2026-10-24 /, `${f}: Abrufzeit fehlt`);
  }
  const summen = fs.readFileSync(path.join(BELEGE, "SHA256SUMS"), "utf8");
  for (const f of txt) assert.ok(summen.includes(`*${f}`), `${f} fehlt in SHA256SUMS`);
});

test("cohere: jedes Zitat im Profil steht wörtlich in einer Belegkopie", () => {
  const p = lade();
  const korpus = fs.readdirSync(BELEGE)
    .filter((f) => /\.(txt|json|html)$/.test(f))
    .map((f) => norm(fs.readFileSync(path.join(BELEGE, f), "utf8")))
    .join("\n");
  const rechtsraum = ["dpf-cohere-2026-10-24", "adequacy-kanada-2026-10-24"]
    .map((d) => path.join(WURZEL, "belege", "rechtsraum", d))
    .filter((d) => fs.existsSync(d))
    .flatMap((d) => fs.readdirSync(d).map((f) => norm(fs.readFileSync(path.join(d, f), "utf8"))))
    .join("\n");
  const alle = korpus + "\n" + rechtsraum;
  const fehl = [...new Set(zitate(JSON.stringify(p)).map((z) => z.replace(/\\"/g, '"')))]
    .filter((z) => !alle.includes(norm(z)));
  assert.deepEqual(fehl, [], `${fehl.length} Zitate nicht wörtlich belegt`);
});

test("Kanada: Angemessenheitsbeschluss nur für PIPEDA-erfasste Organisationen, mit Namen und Adjektiv", () => {
  const li = R.landInfo("CA");
  assert.equal(li.name, "Kanada");
  assert.equal(li.raum, "angemessen");
  assert.match(li.hinweis, /PIPEDA/);
  assert.match(li.hinweis, /2002\/2\/EG/);
  assert.equal(R.rechtsraumKurz({ stammdaten: { land: "CA" } }), R.RAUM_KURZ.angemessen);
  assert.ok(fs.existsSync(path.join(WURZEL, "belege", "rechtsraum", "adequacy-kanada-2026-10-24")), "Beleg Kommissionsseite fehlt");
});

test("anbieterZahl: Anbieter aus Kanada zählen nicht als europäisch", () => {
  const eu = Array.from({ length: 21 }, () => ({ stammdaten: { land: "DE" } }));
  const us = Array.from({ length: 10 }, () => ({ stammdaten: { land: "US" } }));
  const cn = [{ stammdaten: { land: "CN" } }];
  const ca = [{ stammdaten: { land: "CA" } }];
  const alle = eu.concat(us, cn, ca);
  assert.equal(R.anbieterZahl(alle), "21 europäische, 10 US-, 1 chinesische und 1 kanadische KI-Anbieter");
  assert.equal(R.anbieterZahl(alle, "dativ"), "21 europäischen, 10 US-, 1 chinesischen und 1 kanadischen KI-Anbietern");
  assert.equal(R.anbieterZahl(eu.concat(ca)), "21 europäische und 1 kanadische KI-Anbieter");
});

test("Register: Cohere abgeglichen", () => {
  const reg = JSON.parse(fs.readFileSync(path.join(WURZEL, "data", "register-datenschutz.json"), "utf8"));
  const e = reg.anbieter[ID];
  assert.ok(e, "Cohere fehlt in register-datenschutz.json");
  assert.ok(e.text && e.text.length > 40);
});
