"use strict";
/** Dossier ohne Haftungsübernahme, kurz zu lesen, KI-Arbeit offen (Auftrag Felix 16.10.2026, nach einer
 *  Prüfer-Rückmeldung): Vermerk statt Bestätigung, oben eine Seite zum Lesen, Belege darunter. */
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { baueZeilen, rendere } = require("../lib/dossier.js");

const backup = "Doku wörtlich: 'Neither the prompt nor the generated output is stored.'";
const profil = () => ({
  id: "x", name: "X", geprueft: "2026-10-16",
  stammdaten: { sitz: "Paris", website: "https://x.example" },
  vertrag: {
    avv: { wert: "https://x.example/avv.pdf", status: "belegt", quelle: "https://x.example/avv.pdf", anmerkung: "AVV als PDF." },
    subprozessoren: { wert: null, status: "unbelegt", quelle: null, anmerkung: "Keine Liste gefunden." },
  },
  zertifikate: [],
  modelle: ["M1", "M2", "M3"].map((name) => ({
    name, status: "belegt", quelle: "https://x.example/m", standort: "Paris",
    backup_standort: { wert: "keine Sicherung", status: "belegt", quelle: "https://x.example/doku", geprueft: "2026-10-16", anmerkung: backup },
    vorgeschaltete_filter: { wert: null, status: "unbelegt", quelle: null, geprueft: "2026-10-16", anmerkung: "Doku schweigt zu Filtern." },
  })),
});
const md = () => rendere(profil(), baueZeilen(profil()), [], { datum: "2026-10-16" });

test("keine Bestätigung mit Unterschrift mehr, sondern ein Vermerk ohne Gewähr", () => {
  const m = md();
  assert.ok(!m.includes("Ich bestätige"));
  assert.ok(!/Unterschrift/.test(m));
  assert.match(m, /## Vermerk/);
  assert.match(m, /Die Fundstellen sind mit Abrufdatum und, wo vorhanden, Prüfsumme und Archivkopie dokumentiert\./);
  assert.match(m, /Keine Gewähr für die Richtigkeit der Angaben des Anbieters, keine Rechtsberatung\./);
  assert.match(m, /Freigegeben: Köln, den/);
});

test("der Kopf sagt offen, dass ein KI-Agent sammelt und vergleicht und Felix Lind prüft und freigibt", () => {
  const kopf = md().split("## Ergebnis")[0];
  assert.match(kopf, /\*\*Erstellt:\*\* Ein KI-Agent hat die Quellen gesammelt und verglichen\. Felix Lind \(belegbar\.eu\) hat sie geprüft und freigegeben\./);
});

test("oben eine Seite zum Lesen, die Belege darunter", () => {
  const m = md();
  const blick = m.indexOf("## Auf einen Blick");
  const vermerk = m.indexOf("## Vermerk");
  const belege = m.indexOf("# Belege");
  assert.ok(m.indexOf("## Ergebnis") < blick && blick < vermerk && vermerk < belege, "Ergebnis, Blick, Vermerk, dann Belege");
  assert.ok(belege < m.indexOf("## 1. Belegte Angaben"));
  assert.match(m, /- Änderungsalarm: 2026-10-16 bis 2027-10-16/);
  assert.ok(!m.includes("## 5. Änderungsalarm"));
  assert.ok(m.slice(0, belege).split("\n").length <= 60, "Lese-Teil passt auf eine Seite");
});

test("wortgleiche Zeilen stehen einmal, mit allen Feldern davor", () => {
  const m = md();
  assert.equal(m.split(backup).length - 1, 1, "Anmerkung nur einmal");
  assert.match(m, /M1: Backup-Standort; M2: Backup-Standort; M3: Backup-Standort \| keine Sicherung \|/);
  assert.match(m, /M1: Vorgeschaltete Filter; M2: Vorgeschaltete Filter; M3: Vorgeschaltete Filter \| unbelegt \| Doku schweigt zu Filtern\./);
});

test("keine langen Gedankenstriche, auch nicht aus den Profildaten oder als leere Zelle", () => {
  const p = profil();
  p.vertrag.avv.anmerkung = "AVV als PDF — Anlage fehlt.";
  p.vertrag.subprozessoren.anmerkung = "Keine Liste – nur Logo.";
  p.modelle[0].preis_input_1m_eur = undefined;
  const m = rendere(p, baueZeilen(p), [], { datum: "2026-10-16" });
  assert.ok(!/[—–]/.test(m), "langer Strich: " + (m.match(/.*[—–].*/) || [""])[0]);
  assert.match(m, /AVV als PDF, Anlage fehlt\./);
});
