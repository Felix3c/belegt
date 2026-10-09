"use strict";
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { baueZeilen, rendere, schreibeDossier, jahrSpaeter } = require("../lib/dossier.js");

const profil = () => ({
  id: "x", name: "X", geprueft: "2026-08-20",
  stammdaten: { sitz: "Paris", website: "https://x.example" },
  vertrag: {
    avv: { wert: "https://x.example/avv.pdf", status: "belegt", quelle: "https://x.example/avv.pdf", anmerkung: "AVV als PDF." },
    subprozessoren: { wert: null, status: "unbelegt", quelle: null, anmerkung: "Keine Liste gefunden." },
    zero_data_retention: { wert: true, status: "belegt", quelle: "https://x.example/privacy/", anmerkung: "" },
  },
  zertifikate: [{ typ: "SOC 2", status: "beansprucht", quelle: "https://x.example/trust", anmerkung: "Nur Logo." }],
  modelle: [{ name: "M1", status: "belegt", quelle: "https://x.example/m", standort: "Paris", preis_input_1m_eur: 1, preis_output_1m_eur: 2 }],
});

test("Feld ohne Quelle oder ohne Status belegt landet unter „Nicht belegbar“", () => {
  const z = baueZeilen(profil());
  const nb = z.filter((e) => !e.belegbar).map((e) => e.pfad);
  assert.deepEqual(nb, ["vertrag.subprozessoren", "zertifikate[SOC 2]"]);
  const md = rendere(profil(), z, [], { datum: "2026-09-16" });
  assert.match(md, /## 2\. Nicht belegbar \(2\)/);
  assert.match(md, /Subprozessoren-Liste \| unbelegt \| Keine Liste gefunden\./);
  assert.match(md, /Zertifikat SOC 2 \| beansprucht, nicht belegt/);
});

test("Hash und Archiv werden übernommen: SHA-256 aus einem Fall vor Kurz-Hash aus dem Quellenlauf", () => {
  const hashes = { "https://x.example/avv.pdf": { hash: "abcd1234", gesehen: "2026-08-28" }, "https://x.example/privacy": { hash: "ff00", gesehen: "2026-08-28" } };
  const faelle = [{ id: "2026-009", anbieter: "x", feld: "vertrag.zero_data_retention", status: "offen", slug: "x-zdr", eroeffnet: "2026-09-01", antwort_frist: "2026-09-15",
    behauptung: [{ quelle: "https://x.example/privacy/", sha256: "deadbeef", archiv: "https://web.archive.org/web/2026/https://x.example/privacy/" }] }];
  const z = baueZeilen(profil(), { hashes, faelle });
  const avv = z.find((e) => e.pfad === "vertrag.avv");
  assert.equal(avv.hash, "abcd1234");
  assert.match(avv.hashArt, /Kurz-Hash Quellenlauf, gesehen 2026-08-28/);
  assert.equal(avv.archiv, null);
  const zdr = z.find((e) => e.pfad === "vertrag.zero_data_retention");
  assert.equal(zdr.hash, "deadbeef");
  assert.equal(zdr.archiv, "https://web.archive.org/web/2026/https://x.example/privacy/");
  const md = rendere(profil(), z, faelle, { datum: "2026-09-16" });
  assert.match(md, /\| 2026-009 \| vertrag\.zero_data_retention \| offen \| 2026-09-01 \| 2026-09-15 \|/);
  assert.match(md, /2026-09-16 bis 2027-09-16/);
  assert.equal(jahrSpaeter("2026-02-28"), "2027-02-28");
});

test("schreibeDossier erzeugt die Datei aus einem Datenverzeichnis, ohne dieses zu verändern", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "dossier-"));
  const dataDir = path.join(tmp, "data");
  fs.mkdirSync(path.join(dataDir, "anbieter"), { recursive: true });
  fs.writeFileSync(path.join(dataDir, "anbieter", "x.json"), JSON.stringify(profil()));
  const vorher = fs.readdirSync(dataDir).sort();
  const r = schreibeDossier("x", { datum: "2026-09-16", auftraggeber: "Max Muster, DSB, Stadt Y", dataDir, ausgabeDir: path.join(tmp, "out") });
  assert.equal(r.pfad, path.join(tmp, "out", "x-2026-09-16.md"));
  const md = fs.readFileSync(r.pfad, "utf8");
  assert.match(md, /^# Anbieter-Dossier: X/);
  assert.match(md, /\*\*Für:\*\* Max Muster, DSB, Stadt Y/);
  assert.match(md, /keine Bewertung, keine Empfehlung und keine Rechtsberatung/);
  assert.deepEqual(fs.readdirSync(dataDir).sort(), vorher);
});

test("Prüfdatum je Zeile ist das des Feldes, nicht das der Erstprüfung; Kopf nennt die jüngste Nachprüfung", () => {
  const p = profil();
  p.vertrag.avv.geprueft = "2026-10-03";
  const z = baueZeilen(p);
  assert.equal(z.find((e) => e.pfad === "vertrag.avv").pruefdatum, "2026-10-03");
  assert.equal(z.find((e) => e.pfad === "vertrag.zero_data_retention").pruefdatum, "2026-08-20");
  const md = rendere(p, z, [], { datum: "2026-10-04" });
  assert.ok(md.includes("| AVV / Auftragsverarbeitungsvertrag | https://x.example/avv.pdf | https://x.example/avv.pdf | 2026-10-03 |"));
  assert.ok(md.includes("**Datenstand des Profils:** 2026-08-20 (letzte Prüfung aller Quellen), einzelne Angaben zuletzt nachgeprüft 2026-10-03"));
  const ohne = rendere(profil(), baueZeilen(profil()), [], { datum: "2026-10-04" });
  assert.ok(!ohne.includes("einzelne Angaben"));
});

test("Ein Fall steht in der Zeile der Angabe, die er betrifft; SHA-256 aus dem Fall nennt sein Abrufdatum", () => {
  const faelle = [{ id: "2026-009", anbieter: "x", feld: "vertrag.zero_data_retention", status: "bestaetigt", slug: "x-zdr", eroeffnet: "2026-09-01", antwort_frist: "2026-09-15",
    beleg: [{ quelle: "https://x.example/privacy/", abgerufen: "2026-09-06T13:48:52Z", sha256: "deadbeef", archiv: "https://web.archive.org/web/2026/https://x.example/privacy/" }] }];
  const z = baueZeilen(profil(), { faelle });
  const zdr = z.find((e) => e.pfad === "vertrag.zero_data_retention");
  assert.equal(zdr.hashArt, "SHA-256 (Fall 2026-009, abgerufen 2026-09-06)");
  const md = rendere(profil(), z, faelle, { datum: "2026-10-04" });
  assert.ok(md.includes("| Zero Data Retention | ja; dazu Fall 2026-009 (bestaetigt), siehe Abschnitt 3 |"));
  assert.ok(md.includes("| AVV / Auftragsverarbeitungsvertrag | https://x.example/avv.pdf |"));
});

test("Prüfpunkt-Unterfelder zeigen ihren Wert statt „—“ (Befund V3, 09.10.2026)", () => {
  const p = profil();
  p.vertrag.betroffenenrechte_traeger = { wert: "geteilt", status: "belegt", quelle: "https://x.example/dpa", geprueft: "2026-10-09" };
  p.vertrag.log_frist = { wert: "30 Tage", status: "belegt", quelle: "https://x.example/dpa", geprueft: "2026-10-09" };
  p.zertifikate[0].zertifizierer = { wert: "SGS", status: "belegt", quelle: "https://x.example/trust", geprueft: "2026-10-09" };
  p.zertifikate[0].akkreditiert_dakks = { wert: false, status: "belegt", quelle: "https://x.example/trust", geprueft: "2026-10-09" };
  p.modelle[0].backup_standort = { wert: "Amsterdam", status: "beansprucht", quelle: "https://x.example/m", geprueft: "2026-10-09" };
  p.modelle[0].vorgeschaltete_filter = { wert: null, status: "unbelegt", quelle: null, geprueft: "2026-10-09" };
  const z = baueZeilen(p);
  const angabe = (pfad) => z.find((e) => e.pfad === pfad).angabe;
  assert.equal(angabe("vertrag.betroffenenrechte_traeger"), "geteilt (Anbieter und Auftraggeber)");
  assert.equal(angabe("vertrag.log_frist"), "30 Tage");
  assert.equal(angabe("zertifikate[SOC 2].zertifizierer"), "SGS");
  assert.equal(angabe("zertifikate[SOC 2].akkreditiert_dakks"), "nein");
  assert.equal(angabe("modelle[M1].backup_standort"), "Amsterdam");
  assert.equal(angabe("modelle[M1].vorgeschaltete_filter"), null);
  // Die Modellzeile selbst bleibt unverändert.
  assert.equal(angabe("modelle[M1]"), "Standort Paris, Input 1 €/1M, Output 2 €/1M");
});
