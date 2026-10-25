"use strict";
// WX1 (23.10.2026): Meta und DeepSeek als Anbieter 6 und 7 der Reihe (Felix 22.10., „bis zu 5 neue Anbieter
// pro Tag“). Meta ist US-Firma wie Anthropic; DeepSeek sitzt in der VR China, dem ersten Land ohne
// Angemessenheitsbeschluss im Katalog. Die Zählzeile darf DeepSeek darum nicht als „europäisch“ zählen.
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const R = require("../lib/rechtsraum.js");

const lade = (id) => JSON.parse(fs.readFileSync(path.join(__dirname, "..", "data", "anbieter", id + ".json"), "utf8"));

function pruefeProfil(id, land) {
  const p = lade(id);
  assert.equal(p.id, id);
  assert.equal(p.kategorie, "modell-anbieter");
  assert.equal(p.stammdaten.land, land);
  assert.ok(p.modelle.length >= 1, "mindestens ein Modell");
  for (const feld of ["avv", "subprozessoren", "training_opt_out", "zero_data_retention", "zweckbindung", "log_frist"]) {
    const f = p.vertrag[feld];
    assert.ok(f, `vertrag.${feld} fehlt`);
    assert.ok(["belegt", "beansprucht", "unbelegt"].includes(f.status), `${feld}: Status ${f.status}`);
    assert.match(f.geprueft, /^\d{4}-\d{2}-\d{2}$/);
    if (f.status !== "unbelegt") assert.match(f.anmerkung, /„[^“]{10,}“/, `${feld}: wörtliches Zitat fehlt`);
  }
  assert.doesNotMatch(JSON.stringify(p), /PRIVAT|privates Muster|nicht im Katalog/i);
  const belege = path.join(__dirname, "..", "belege", "anbieter", id);
  assert.ok(fs.existsSync(path.join(belege, "SHA256SUMS")), "Belegkopien mit SHA256SUMS fehlen");
  assert.ok(fs.existsSync(path.join(belege, "QUELLEN.md")), "QUELLEN.md fehlt");
  return p;
}

test("meta-llama-api: US-Profil mit belegter DPF-Antwort und Belegen", () => {
  const p = pruefeProfil("meta-llama-api", "US");
  assert.equal(p.stammdaten.us_eigner, true);
  assert.equal(p.stammdaten.dpf.status, "belegt");
  assert.equal(typeof p.stammdaten.dpf.wert, "boolean");
  assert.match(p.stammdaten.dpf.quelle, /^https:\/\/www\.dataprivacyframework\.gov\//);
});

test("deepseek-api: Profil aus China mit Belegen", () => {
  pruefeProfil("deepseek-api", "CN");
});

test("China: Drittland ohne Angemessenheitsbeschluss, mit Namen", () => {
  assert.deepEqual(
    { name: R.landInfo("CN").name, raum: R.landInfo("CN").raum },
    { name: "China", raum: "drittland" },
  );
  assert.equal(R.rechtsraumKurz({ stammdaten: { land: "CN" } }), R.RAUM_KURZ.drittland);
});

test("anbieterZahl: Anbieter aus China zählen nicht als europäisch", () => {
  const eu = Array.from({ length: 21 }, () => ({ stammdaten: { land: "DE" } }));
  const ch = [{ stammdaten: { land: "CH" } }];
  const us = Array.from({ length: 9 }, () => ({ stammdaten: { land: "US" } }));
  const cn = [{ stammdaten: { land: "CN" } }];
  const alle = eu.concat(ch, us, cn);
  assert.equal(R.anbieterZahl(alle), "22 europäische, 9 US- und 1 chinesische KI-Anbieter");
  assert.equal(R.anbieterZahl(alle, "dativ"), "22 europäischen, 9 US- und 1 chinesischen KI-Anbietern");
  assert.equal(R.anbieterZahl(alle, "alle"), "22 europäischen, 9 US- und 1 chinesischen KI-Anbieter");
  assert.equal(R.anbieterZahl(eu.concat(cn)), "21 europäische und 1 chinesische KI-Anbieter");
  // bisherige Formen bleiben gleich
  assert.equal(R.anbieterZahl(eu.concat(us)), "21 europäische und 9 US-KI-Anbieter");
  assert.equal(R.anbieterZahl(cn), "1 chinesische KI-Anbieter");
});
