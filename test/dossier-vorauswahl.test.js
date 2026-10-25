"use strict";
/** Die drei Vorauswahl-Felder (TOM-Link, Zahl der Unterauftragnehmer, Drittländer; LP1 23.10.2026) gehören
 *  auch ins Dossier: genau danach hat der Prüfer gefragt, dem das erste Gratis-Dossier angeboten wird
 *  (Pilot-Entwurf 24.10.2026). Das Änderungsprotokoll bleibt unberührt (kein neuer Eintrag je Profil). */
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { baueZeilen, rendere } = require("../lib/dossier.js");
const { belegFelder } = require("../lib/aenderungen.js");

const profil = (extra = {}) => ({
  id: "x", name: "X", geprueft: "2026-10-23",
  stammdaten: { sitz: "Paris", website: "https://x.example" },
  vertrag: {
    avv: { wert: "https://x.example/avv.pdf", status: "belegt", quelle: "https://x.example/avv.pdf" },
    subprozessoren: { wert: "https://x.example/sub", status: "belegt", quelle: "https://x.example/sub" },
    tom: { wert: "https://x.example/security", status: "belegt", quelle: "https://x.example/security", geprueft: "2026-10-23", anmerkung: "TOM öffentlich." },
    subprozessoren_anzahl: { wert: 12, status: "belegt", quelle: "https://x.example/sub", geprueft: "2026-10-23", anmerkung: "12 Einträge gezählt." },
    drittlaender: { wert: ["Indien", "USA"], status: "belegt", quelle: "https://x.example/sub", geprueft: "2026-10-23", anmerkung: "Zwei Einträge außerhalb EU/EWR." },
    ...extra,
  },
  zertifikate: [], modelle: [],
});
const md = (p) => rendere(p, baueZeilen(p), [], { datum: "2026-10-24" });

test("die drei Felder stehen als Zeilen mit lesbarer Angabe im Dossier", () => {
  const z = baueZeilen(profil());
  const zu = (pfad) => z.find((r) => r.pfad === pfad);
  assert.equal(zu("vertrag.tom").feld, "Sicherheitsmaßnahmen (TOM)");
  assert.equal(zu("vertrag.tom").angabe, "https://x.example/security");
  assert.equal(zu("vertrag.subprozessoren_anzahl").feld, "Zahl der Unterauftragnehmer");
  assert.equal(zu("vertrag.subprozessoren_anzahl").angabe, "12");
  assert.equal(zu("vertrag.drittlaender").feld, "Drittländer der Unterauftragnehmer");
  assert.equal(zu("vertrag.drittlaender").angabe, "Indien, USA");
  assert.ok(zu("vertrag.drittlaender").belegbar);
});

test("leere Drittland-Liste heißt: keine, alle in EU/EWR", () => {
  const p = profil({ drittlaender: { wert: [], status: "belegt", quelle: "https://x.example/sub", geprueft: "2026-10-23" } });
  assert.equal(baueZeilen(p).find((r) => r.pfad === "vertrag.drittlaender").angabe, "keine (alle in EU/EWR)");
});

test("ungeklärte Felder landen unter „Nicht belegbar“ mit ihrer Begründung", () => {
  const p = profil({ subprozessoren_anzahl: { wert: null, status: "beansprucht", quelle: "https://x.example/trust", geprueft: "2026-10-23", anmerkung: "Ungeklärt: Liste nur nach Freigabe." } });
  const teil2 = md(p).split("## 2. Nicht belegbar")[1].split("## 3.")[0];
  assert.match(teil2, /Zahl der Unterauftragnehmer \| beansprucht, nicht belegt \| Ungeklärt: Liste nur nach Freigabe\./);
});

test("„Auf einen Blick“ nennt die Vorauswahl in einer Zeile", () => {
  const blick = md(profil()).split("## Auf einen Blick")[1].split("## Vermerk")[0];
  assert.match(blick, /- Vorauswahl: Preis: kein EUR-Preis erfasst; Unterauftragnehmer 12; Drittländer: Indien, USA; AVV: https:\/\/x\.example\/avv\.pdf; Sicherheitsmaßnahmen: https:\/\/x\.example\/security/);
  const leer = profil({ tom: { wert: null, status: "unbelegt", quelle: null, geprueft: "2026-10-23", anmerkung: "Ungeklärt: nichts gefunden." }, subprozessoren_anzahl: { wert: null, status: "unbelegt", quelle: null, anmerkung: "Ungeklärt: x" }, drittlaender: { wert: null, status: "unbelegt", quelle: null, anmerkung: "Ungeklärt: x" } });
  assert.match(md(leer), /Unterauftragnehmer ungeklärt; Drittländer: ungeklärt; AVV: https:\/\/x\.example\/avv\.pdf; Sicherheitsmaßnahmen: ungeklärt/);
});

test("Preis und AVV stehen in der Vorauswahl-Zeile wie in der Tabelle (Wunsch eines Datenschutz-Auditors 23.10.)", () => {
  const p = profil();
  p.modelle = [{ name: "M", preis_input_1m_eur: 0.5 }];
  assert.match(md(p), /- Vorauswahl: Preis: ab 0,50 € \/ 1M Input; /);
  const ohneAvv = profil({ avv: { wert: null, status: "unbelegt", quelle: null } });
  assert.match(md(ohneAvv), /; AVV: ungeklärt; /);
});

test("Sicherheitsbeschreibung nur beansprucht: „nur auf Anfrage“ wie in der Tabelle", () => {
  const p = profil({ tom: { wert: null, status: "beansprucht", quelle: "https://x.example/trust", geprueft: "2026-10-23", anmerkung: "Ungeklärt: nur nach Freigabe." } });
  assert.match(md(p), /Sicherheitsmaßnahmen: nur auf Anfrage/);
});

test("ohne die Felder (ältere Profile) keine Vorauswahl-Zeile und keine leeren Zeilen", () => {
  const p = profil();
  delete p.vertrag.tom; delete p.vertrag.subprozessoren_anzahl; delete p.vertrag.drittlaender;
  const m = md(p);
  assert.ok(!m.includes("Vorauswahl:"));
  assert.ok(!baueZeilen(p).some((r) => r.pfad === "vertrag.tom"));
});

test("das Änderungsprotokoll bekommt dadurch keine neuen Felder", () => {
  const keys = [...belegFelder(profil()).keys()];
  assert.ok(!keys.includes("vertrag.tom"));
  assert.ok(!keys.includes("vertrag.drittlaender"));
});
