"use strict";
// Frage 452 (Felix 22.10.2026): jede Dossier-Quelle bekommt eine Archivkopie, nicht nur die aus Fällen.
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { baueZeilen } = require("../lib/dossier.js");
const QA = require("../lib/quellenarchiv.js");

const profil = () => ({
  id: "x", name: "X", geprueft: "2026-10-19",
  stammdaten: { sitz: "Paris", website: "https://x.example" },
  vertrag: {
    avv: { wert: "https://x.example/avv.pdf", status: "belegt", quelle: "https://x.example/avv.pdf", anmerkung: "" },
    zero_data_retention: { wert: true, status: "belegt", quelle: "https://x.example/privacy/", anmerkung: "" },
    subprozessoren: { wert: null, status: "unbelegt", quelle: null, anmerkung: "" },
  },
});

const archiv = {
  "https://x.example/avv.pdf": { archiv: "https://web.archive.org/web/20261022120000/https://x.example/avv.pdf", gesichert: "2026-10-22", gleich: true },
  "https://x.example/privacy": { archiv: "https://web.archive.org/web/20261022120500/https://x.example/privacy/", gesichert: "2026-10-22", gleich: false },
};

test("Zeile bekommt Archivkopie aus der Quellen-Ablage, auch mit/ohne Schrägstrich", () => {
  const z = baueZeilen(profil(), { archiv });
  assert.equal(z.find((e) => e.pfad === "vertrag.avv").archiv, "https://web.archive.org/web/20261022120000/https://x.example/avv.pdf");
  assert.equal(z.find((e) => e.pfad === "vertrag.zero_data_retention").archiv, "https://web.archive.org/web/20261022120500/https://x.example/privacy/");
  assert.equal(z.find((e) => e.pfad === "vertrag.subprozessoren").archiv, null);
});

test("Archivlink aus einem Fall geht der Ablage vor", () => {
  const faelle = [{ id: "2026-001", anbieter: "x", behauptung: [{ quelle: "https://x.example/avv.pdf", sha256: "ab", archiv: "https://web.archive.org/web/2026/fall" }] }];
  const z = baueZeilen(profil(), { archiv, faelle });
  assert.equal(z.find((e) => e.pfad === "vertrag.avv").archiv, "https://web.archive.org/web/2026/fall");
});

test("offeneUrls: nur Quellen ohne Eintrag, ohne Doppelte, Fallseiten und Archivlinks ausgenommen", () => {
  const urls = ["https://x.example/avv.pdf", "https://x.example/neu", "https://x.example/neu", "https://web.archive.org/web/1/https://a", "https://x.example/privacy/"];
  assert.deepEqual(QA.offeneUrls(urls, archiv), ["https://x.example/neu"]);
});

test("eintrag: Zeitstempel aus Save-Page-Now-Ziel, gleich = Hash der Kopie wie im Quellenlauf", () => {
  const e = QA.eintrag({ url: "https://x.example/neu", ziel: "https://web.archive.org/web/20261022130102/https://x.example/neu", hashKopie: "aa", hashLedger: "aa" });
  assert.deepEqual(e, { archiv: "https://web.archive.org/web/20261022130102/https://x.example/neu", gesichert: "2026-10-22", gleich: true });
  assert.equal(QA.eintrag({ url: "u", ziel: "https://web.archive.org/web/20261022130102/u", hashKopie: "aa", hashLedger: "bb" }).gleich, false);
  assert.equal(QA.eintrag({ url: "u", ziel: "https://web.archive.org/web/20261022130102/u", hashKopie: null, hashLedger: "bb" }).gleich, null);
  assert.equal(QA.eintrag({ url: "u", ziel: "https://example.org/kein-archiv" }), null);
});

test("zaehle: Angaben-Zeilen mit Quelle und wie viele davon eine Archivkopie haben", () => {
  const z = baueZeilen(profil(), { archiv: { "https://x.example/avv.pdf": archiv["https://x.example/avv.pdf"] } });
  assert.deepEqual(QA.zaehle(z), { mitQuelle: 2, mitArchiv: 1 });
});

test("Dossier sagt neben dem Link, wenn die Kopie inhaltlich vom Prüfstand abweicht", () => {
  const { rendere } = require("../lib/dossier.js");
  const md = rendere(profil(), baueZeilen(profil(), { archiv }), [], { datum: "2026-10-22" });
  assert.match(md, /https:\/\/x\.example\/avv\.pdf \| 2026-10-19 \| [^|]+ \| https:\/\/web\.archive\.org\/web\/20261022120000\/https:\/\/x\.example\/avv\.pdf \|/);
  assert.match(md, /20261022120500\/https:\/\/x\.example\/privacy\/ \(Kopie vom 2026-10-22, Text weicht vom Prüfstand ab\) \|/);
});

test("offeneUrls: Quellen mit Fehlversuchen rücken ans Ende, wenigste zuerst", () => {
  const urls = ["https://a.example/1", "https://b.example/2", "https://c.example/3", "https://d.example/4"];
  const fehl = { "https://a.example/1": 3, "https://c.example/3": 1 };
  assert.deepEqual(QA.offeneUrls(urls, {}, fehl), ["https://b.example/2", "https://d.example/4", "https://c.example/3", "https://a.example/1"]);
});

test("merkeFehlversuch: zählt je URL hoch, ohne andere Einträge anzufassen", () => {
  const vorher = { "https://a.example/1": 2 };
  const nachher = QA.merkeFehlversuch(vorher, "https://a.example/1");
  assert.equal(nachher["https://a.example/1"], 3);
  assert.equal(vorher["https://a.example/1"], 2);
  assert.equal(QA.merkeFehlversuch(nachher, "https://n.example/")["https://n.example/"], 1);
});

// 22.10.2026 abends: 5 von 29 „Text weicht ab“ kamen nur daher, dass nachsichern.js den einfachen Hash nahm,
// der Quellenlauf aber für Zähler-/Karten-Seiten gefilterte Wörter und für Hugging Face die Git-Revision.
test("hashVergleich: Zähler-Seite hasht wie der Quellenlauf (ohne Zähler), nicht den ganzen Text", () => {
  const Q = require("../lib/quellen.js");
  const html = (n) => Buffer.from(`<html><body><p>Data handling by provider</p><p>${n} providers active</p><p>GDPR and AI compliance FAQ</p><p>We never store prompts.</p></body></html>`);
  const url = "https://opper.ai/ai-compliance";
  const a = Q.hashVergleich(url, "text/html", html(12)), b = Q.hashVergleich(url, "text/html", html(13));
  assert.equal(a, b, "Zähler darf den Vergleichs-Hash nicht ändern");
  assert.notEqual(a, Q.hashInhalt("text/html", html(12)));
});

test("hashVergleich: Seiten ohne Regel wie hashInhalt; Hugging Face und Notion nicht vergleichbar (null)", () => {
  const Q = require("../lib/quellen.js");
  const b = Buffer.from("<html><body><p>Zero data retention for all API calls.</p></body></html>");
  assert.equal(Q.hashVergleich("https://x.example/privacy", "text/html", b), Q.hashInhalt("text/html", b));
  assert.equal(Q.hashVergleich("https://huggingface.co/Aleph-Alpha/Kolibri-1", "text/html", b), null);
  assert.equal(Q.hashVergleich("https://x.notion.site/Sub-0123456789abcdef0123456789abcdef", "text/html", b), null);
});

// 24.10.2026: Save Page Now drosselt (vier Stapel in Folge 1 von 8). Viele Quellen haben schon eine
// fremde Kopie im Archiv; die zählt, wenn ihr Text gleich dem Prüfstand ist (Entscheidung in nachsichern.js).
test("juengsteKopie: neueste 200-Kopie im Zeitfenster, als Snapshot-Link", () => {
  const cdx = [["timestamp", "statuscode", "original"],
    ["20261008221403", "200", "https://openai.com/business-data/"],
    ["20261015080500", "200", "https://openai.com/business-data/"],
    ["20261015084726", "403", "https://openai.com/business-data/"]];
  assert.equal(QA.juengsteKopie(cdx, { heute: "2026-10-24", maxTage: 60 }),
    "https://web.archive.org/web/20261015080500/https://openai.com/business-data/");
});

test("juengsteKopie: null ohne 200, bei zu alter Kopie und bei leerer Antwort", () => {
  assert.equal(QA.juengsteKopie([["timestamp", "statuscode", "original"], ["20261015084726", "403", "https://a.example/"]], { heute: "2026-10-24", maxTage: 60 }), null);
  assert.equal(QA.juengsteKopie([["timestamp", "statuscode", "original"], ["20260101000000", "200", "https://a.example/"]], { heute: "2026-10-24", maxTage: 60 }), null);
  assert.equal(QA.juengsteKopie([], { heute: "2026-10-24", maxTage: 60 }), null);
  assert.equal(QA.juengsteKopie(null, { heute: "2026-10-24", maxTage: 60 }), null);
});

test("vorhandeneZaehlt: nur bei Text gleich dem Prüfstand, nicht bei unbekannt oder abweichend", () => {
  assert.equal(QA.vorhandeneZaehlt({ hashKopie: "ab", hashLedger: "ab" }), true);
  assert.equal(QA.vorhandeneZaehlt({ hashKopie: "ab", hashLedger: "cd" }), false);
  assert.equal(QA.vorhandeneZaehlt({ hashKopie: null, hashLedger: "ab" }), false);
  assert.equal(QA.vorhandeneZaehlt({ hashKopie: "ab", hashLedger: null }), false);
});

// 24.10.2026 Probe: nach ~6 Abrufen lehnt web.archive.org jede Verbindung ab, auch reine Leseabfragen,
// bei allen Zielseiten gleich. Das ist eine Sperre des Archivs, kein Fehler der Quelle.
test("istArchivSperre: Netzfehler und 429 sind Sperre, Antworten der Quelle nicht", () => {
  assert.equal(QA.istArchivSperre("fetch failed"), true);
  assert.equal(QA.istArchivSperre("connect ECONNREFUSED 207.241.237.3:443"), true);
  assert.equal(QA.istArchivSperre("read ECONNRESET"), true);
  assert.equal(QA.istArchivSperre("429 (zu viele Anfragen)"), true);
  assert.equal(QA.istArchivSperre("kein Snapshot (Status 520)"), false);
  assert.equal(QA.istArchivSperre("The operation was aborted due to timeout"), false);
});
