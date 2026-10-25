#!/usr/bin/env node
"use strict";
/**
 * belegbar.eu — Dossier-Quellen beim Internet Archive sichern (Frage 452, Felix 22.10.2026).
 *
 *   node nachsichern.js [--anzahl 15] [--pause 20] [--max-tage 60] [--ohne-vorhandene] [--zaehlen]
 *
 * Nimmt die Quellen aller Dossier-Zeilen ohne Archivkopie, ruft je Save Page Now auf, holt die Kopie
 * im Rohformat (id_) und vergleicht deren Inhalts-Hash mit dem Quellenlauf (gleich ja/nein). Ergebnis
 * nach data/quellen-archiv.json, nach jeder Quelle geschrieben: Ein Abbruch verliert nichts, der
 * nächste Lauf macht weiter. Pausen, weil Save Page Now sonst mit 429 antwortet (20.10.2026).
 * Was nicht geht (Einmal-Links, Sperren), steht in der Ausgabe und in data/quellen-archiv-fehlversuche.json
 * (solche Quellen kommen in späteren Stapeln ans Ende); das gehört zur eigenen Kopie (E22-6).
 * Seit 24.10.2026 zuerst nur lesen: Hat das Archiv schon eine Kopie (höchstens --max-tage alt), deren Text
 * dem Prüfstand gleicht, wird sie übernommen, ohne Save Page Now (das drosselte vier Stapel auf 1 von 8).
 */
const fs = require("fs");
const path = require("path");
const { belegFelder } = require("./lib/aenderungen.js");
const D = require("./lib/dossier.js");
const Q = require("./lib/quellen.js");
const QA = require("./lib/quellenarchiv.js");

const UA = "Mozilla/5.0 (compatible; belegbar.eu-archiv/1.0; +https://belegbar.eu/)";
const arg = (n, d) => { const i = process.argv.indexOf("--" + n); return i > 0 ? Number(process.argv[i + 1]) : d; };
const ANZAHL = arg("anzahl", 15);
const PAUSE_S = arg("pause", 20);
const MAX_TAGE = arg("max-tage", 60);
const schlaf = (s) => new Promise((r) => setTimeout(r, s * 1000));

function alleZeilen() {
  const dir = path.join(D.DATA_DIR, "anbieter");
  const hashes = D.ladeHashes();
  const archiv = QA.lade();
  return fs.readdirSync(dir).filter((f) => f.endsWith(".json")).flatMap((f) => {
    const id = f.replace(/\.json$/, "");
    return D.baueZeilen(D.ladeAnbieter(id), { hashes, faelle: D.ladeFaelle(id), archiv })
      .filter((z) => z.pfad !== "eintritt" && !z.pfad.startsWith("zusagen["));
  });
}

async function sichere(url) {
  const r = await fetch("https://web.archive.org/save/" + url, { headers: { "user-agent": UA }, redirect: "follow", signal: AbortSignal.timeout(120000) });
  if (r.status === 429) return { fehler: "429 (zu viele Anfragen)", stopp: true };
  const ziel = r.headers.get("content-location") ? "https://web.archive.org" + r.headers.get("content-location") : r.url;
  if (!/^https:\/\/web\.archive\.org\/web\/\d{14}\//.test(ziel)) return { fehler: "kein Snapshot (Status " + r.status + ")" };
  let hashKopie = null;
  try {
    const roh = await fetch(ziel.replace(/\/web\/(\d+)\//, "/web/$1id_/"), { headers: { "user-agent": UA }, signal: AbortSignal.timeout(60000) });
    if (roh.ok) hashKopie = Q.hashVergleich(url, roh.headers.get("content-type"), Buffer.from(await roh.arrayBuffer()));
  } catch { /* Vergleich bleibt offen (gleich: null), die Kopie zählt trotzdem */ }
  return { ziel, hashKopie };
}

/** Fremde Kopie aus dem Archiv (nur lesen, CDX), wenn ihr Text dem Prüfstand gleicht; sonst null. */
async function vorhandene(url, hashLedger) {
  if (!hashLedger || process.argv.includes("--ohne-vorhandene")) return null;
  const cdxUrl = "https://web.archive.org/cdx/search/cdx?output=json&fl=timestamp,statuscode,original&limit=-5&url=" + encodeURIComponent(url);
  const r = await fetch(cdxUrl, { headers: { "user-agent": UA }, signal: AbortSignal.timeout(60000) });
  if (!r.ok) return null;
  const ziel = QA.juengsteKopie(await r.json().catch(() => null), { heute: Q.heuteLokal(), maxTage: MAX_TAGE });
  if (!ziel) return null;
  const roh = await fetch(ziel.replace(/\/web\/(\d+)\//, "/web/$1id_/"), { headers: { "user-agent": UA }, signal: AbortSignal.timeout(60000) });
  if (!roh.ok) return null;
  const hashKopie = Q.hashVergleich(url, roh.headers.get("content-type"), Buffer.from(await roh.arrayBuffer()));
  return QA.vorhandeneZaehlt({ hashKopie, hashLedger }) ? { ziel, hashKopie } : null;
}

async function main() {
  const zeilen = alleZeilen();
  const z = QA.zaehle(zeilen);
  console.log(`Stand: ${z.mitArchiv}/${z.mitQuelle} Angaben-Zeilen mit Archivkopie.`);
  if (process.argv.includes("--zaehlen")) return;
  let fehl = QA.lade(QA.FEHL_DATEI);
  const offen = QA.offeneUrls(zeilen.map((e) => e.quelle), QA.lade(), fehl);
  console.log(`${offen.length} Quellen ohne Kopie, jetzt bis zu ${ANZAHL}.`);
  const hashes = D.ladeHashes();
  let ok = 0;
  for (const url of offen.slice(0, ANZAHL)) {
    const h0 = D.hashZu(url, hashes);
    let e = null;
    try { e = await vorhandene(url, h0 ? h0.hash : null); } catch { e = null; }
    if (e) console.log("  (vorhandene Kopie, Text gleich dem Prüfstand)");
    else try { e = await sichere(url); } catch (err) { e = { fehler: err.message }; }
    if (e.fehler) {
      console.log(`  NEIN ${url} — ${e.fehler}`);
      if (e.stopp || QA.istArchivSperre(e.fehler)) { console.log("  Archiv sperrt, Stapel angehalten (kein Fehlversuch angerechnet)."); break; }
      fehl = QA.merkeFehlversuch(fehl, url);
      fs.writeFileSync(QA.FEHL_DATEI, JSON.stringify(fehl, null, 1) + "\n");
    } else {
      const h = D.hashZu(url, hashes);
      const neu = QA.eintrag({ ziel: e.ziel, hashKopie: e.hashKopie, hashLedger: h ? h.hash : null });
      const archiv = QA.lade();
      archiv[url] = neu;
      fs.writeFileSync(QA.DATEI, JSON.stringify(Object.fromEntries(Object.entries(archiv).sort()), null, 1) + "\n");
      ok++;
      console.log(`  ja   ${url} → ${neu.archiv} (gleich: ${neu.gleich})`);
    }
    await schlaf(PAUSE_S);
  }
  const n = QA.zaehle(alleZeilen());
  console.log(`Gesichert ${ok}. Neuer Stand: ${n.mitArchiv}/${n.mitQuelle}.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
