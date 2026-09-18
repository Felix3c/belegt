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
