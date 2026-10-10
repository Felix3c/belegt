"use strict";
const { test } = require("node:test");
const assert = require("node:assert/strict");
const PP = require("../lib/pruefpunkte.js");
const { belegFelder, vergleicheAnbieter } = require("../lib/aenderungen.js");

const f = (wert, extra = {}) => ({ wert, status: "belegt", quelle: "https://x.example/doc", geprueft: "2026-10-08", anmerkung: "a", ...extra });
const leer = () => ({ wert: null, status: "unbelegt", quelle: null, geprueft: "2026-10-08", anmerkung: "nicht gefunden" });

function vollesProfil() {
  return {
    id: "x", name: "X", stammdaten: {},
    vertrag: {
      zweckbindung: f(true), betroffenenrechte_traeger: f("auftraggeber"),
      log_frist: f("30 Tage"), log_zweck: f("Missbrauchserkennung"),
    },
    zertifikate: [{ typ: "ISO 27001", status: "belegt", anwendungsbereich: f("RZ Nürnberg"), zertifizierer: f("SOCOTEC"), akkreditiert_dakks: f(true) }],
    modelle: [{ name: "M1", status: "belegt", backup_standort: leer(), vorgeschaltete_filter: f(false) }],
  };
}

test("pruefe: vollständig ausgefülltes Profil hat keine Fehler", () => {
  assert.deepEqual(PP.pruefe(vollesProfil(), { streng: true }), []);
});

test("pruefe: fehlendes Feld ist nur im strengen Modus ein Fehler", () => {
  const p = vollesProfil();
  delete p.vertrag.log_zweck;
  delete p.modelle[0].backup_standort;
  assert.deepEqual(PP.pruefe(p), []);
  const fe = PP.pruefe(p, { streng: true });
  assert.equal(fe.length, 2);
  assert.ok(fe.some((x) => x.includes("vertrag.log_zweck")));
  assert.ok(fe.some((x) => x.includes("modelle[M1].backup_standort")));
});

test("pruefe: falscher Status, belegt ohne Quelle, belegt ohne Wert", () => {
  const p = vollesProfil();
  p.vertrag.zweckbindung.status = "ja";
  p.vertrag.log_frist.quelle = null;
  p.zertifikate[0].zertifizierer.wert = null;
  const fe = PP.pruefe(p);
  assert.ok(fe.some((x) => x.includes("vertrag.zweckbindung") && x.includes("Status")));
  assert.ok(fe.some((x) => x.includes("vertrag.log_frist") && x.includes("Quelle")));
  assert.ok(fe.some((x) => x.includes("zertifikate[ISO 27001].zertifizierer") && x.includes("Wert")));
});

test("pruefe: Werttypen je Feld", () => {
  const p = vollesProfil();
  p.vertrag.zweckbindung.wert = "ja";
  p.vertrag.betroffenenrechte_traeger.wert = "irgendwer";
  p.zertifikate[0].akkreditiert_dakks.wert = "DAkkS";
  p.modelle[0].vorgeschaltete_filter.wert = "vielleicht";
  const fe = PP.pruefe(p);
  assert.equal(fe.length, 4);
});

test("pruefe: unbelegt ohne Wert und ohne Quelle ist erlaubt, braucht aber ein Prüfdatum", () => {
  const p = vollesProfil();
  p.vertrag.log_frist = leer();
  assert.deepEqual(PP.pruefe(p), []);
  p.vertrag.log_frist.geprueft = null;
  assert.ok(PP.pruefe(p).some((x) => x.includes("Prüfdatum")));
});

test("wertText: ja/nein, Aufzählung, null", () => {
  assert.equal(PP.wertText("vorgeschaltete_filter", true), "ja");
  assert.equal(PP.wertText("akkreditiert_dakks", false), "nein");
  assert.equal(PP.wertText("betroffenenrechte_traeger", "geteilt"), "geteilt (Anbieter und Auftraggeber)");
  assert.equal(PP.wertText("log_frist", "30 Tage"), "30 Tage");
  assert.equal(PP.wertText("log_frist", null), null);
});

test("felder: alle Unterfelder eines Profils mit Pfad", () => {
  const pfade = PP.felder(vollesProfil()).map((x) => x.pfad);
  assert.deepEqual(pfade, [
    "vertrag.zweckbindung", "vertrag.betroffenenrechte_traeger", "vertrag.log_frist", "vertrag.log_zweck",
    "zertifikate[ISO 27001].anwendungsbereich", "zertifikate[ISO 27001].zertifizierer", "zertifikate[ISO 27001].akkreditiert_dakks",
    "modelle[M1].backup_standort", "modelle[M1].vorgeschaltete_filter",
  ]);
});

test("Änderungsprotokoll: neu eingeführtes Feld erzeugt keinen Eintrag, Statuswechsel danach schon", () => {
  const alt = vollesProfil();
  delete alt.vertrag.log_frist;
  delete alt.zertifikate[0].anwendungsbereich;
  const neu = vollesProfil();
  assert.deepEqual(vergleicheAnbieter(alt, neu, "2026-10-08"), []);
  const spaeter = vollesProfil();
  spaeter.vertrag.log_frist = leer();
  const e = vergleicheAnbieter(neu, spaeter, "2026-10-09");
  assert.equal(e.length, 1);
  assert.equal(e[0].pfad, "vertrag.log_frist");
  assert.equal(e[0].alt, "belegt");
  assert.equal(e[0].neu, "unbelegt");
  assert.ok(belegFelder(spaeter).has("modelle[M1].vorgeschaltete_filter"));
});

test("Änderungsprotokoll: alte Felder ohne neue Unterfelder bleiben wie bisher", () => {
  const alt = { id: "x", name: "X", stammdaten: {}, vertrag: { avv: { status: "belegt", quelle: "a" } } };
  const neu = { id: "x", name: "X", stammdaten: {}, vertrag: { avv: { status: "unbelegt", quelle: null } } };
  const e = vergleicheAnbieter(alt, neu, "2026-10-08");
  assert.equal(e.length, 1);
  assert.equal(e[0].pfad, "vertrag.avv");
});

test("htmlAbschnitt: zeigt jedes Feld, unbelegte ausdrücklich", () => {
  const p = vollesProfil();
  const h = PP.htmlAbschnitt(p, { esc: (s) => String(s), datumDE: (d) => d, statusBadge: (s) => `[${s}]`, quelleLink: () => "" });
  assert.ok(h.includes("Zweckbindung"));
  assert.ok(h.includes("Log-Aufbewahrung"));
  assert.ok(h.includes("Backup-Standort"));
  assert.ok(h.includes("[unbelegt]"));
  assert.ok(h.includes("M1"));
});

test("textZeilen: llms-full-Zeilen für Vertrag, Zertifikat und Modell", () => {
  const z = PP.textZeilen(vollesProfil()).join("\n");
  assert.ok(z.includes("Log-Aufbewahrung (Frist): 30 Tage [Status: belegt]"));
  assert.ok(z.includes("ISO 27001 — Zertifizierer: SOCOTEC [Status: belegt]"));
  assert.ok(z.includes("M1 — Backup-Standort: unbelegt [Status: unbelegt]"));
});

test("Akkreditierungsstelle: stelle (Text) und stelle_ea_mla (ja/nein) nur zusammen", () => {
  const f = (x) => ({ zertifikate: [{ typ: "ISO 27001", akkreditiert_dakks: { wert: false, status: "belegt", quelle: "https://x.example/a", geprueft: "2026-10-10", ...x } }] });
  const fehler = (x) => PP.pruefe(f(x)).filter((e) => /stelle/i.test(e));
  assert.deepEqual(fehler({ stelle: "COFRAC", stelle_ea_mla: true }), []);
  assert.deepEqual(fehler({}), []);
  assert.equal(fehler({ stelle: "COFRAC" }).length, 1);
  assert.equal(fehler({ stelle: "", stelle_ea_mla: true }).length, 1);
  assert.equal(fehler({ stelle: "COFRAC", stelle_ea_mla: "ja" }).length, 1);
});
