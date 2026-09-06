#!/usr/bin/env node
"use strict";
/** Archivkopie der Preisseiten eines Anbieters.
 *
 *  node preisarchiv.js <anbieter-id> [--url <zusätzliche URL> ...] [--datum JJJJ-MM-TT]
 *
 *  Holt jede Quelle der Modell-Einträge (plus --url) und legt sie unter belege/preise/<id>/<datum>-<slug>.<ext>
 *  ab, mit Zeile in SHA256SUMS. Setzt kein geprueft: Abrufen ist nicht Nachprüfen — das Feld-Datum
 *  setzt, wer den Preis gelesen und verglichen hat. Seiten, die Preise per Script nachladen (Exoscale),
 *  brauchen die Datenquelle zusätzlich per --url. */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { DATA_DIR } = require("./lib/quellen.js");

const UA = "Mozilla/5.0 (compatible; belegbar.eu-preisarchiv/1.0; +https://belegbar.eu/)";
const TIMEOUT_MS = 30000;

function argumente(argv) {
  const id = argv.find((a) => !a.startsWith("--") && !/^\d{4}-\d{2}-\d{2}$/.test(a) && !argv[argv.indexOf(a) - 1]?.startsWith("--"));
  const extra = [], datumIdx = argv.indexOf("--datum");
  for (let i = 0; i < argv.length; i++) if (argv[i] === "--url" && argv[i + 1]) extra.push(argv[++i]);
  return { id, extra, datum: datumIdx > -1 ? argv[datumIdx + 1] : new Date().toISOString().slice(0, 10) };
}

function slug(url) {
  const u = new URL(url);
  const s = (u.hostname.replace(/^www\./, "") + u.pathname).replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase();
  return s.slice(0, 80);
}

function endung(contentType) {
  if (/json/.test(contentType || "")) return "json";
  if (/pdf/.test(contentType || "")) return "pdf";
  return "html";
}

async function archiviere(id, url, datum, ziel) {
  const r = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(TIMEOUT_MS), headers: { "user-agent": UA, accept: "*/*" } });
  if (r.status >= 400) return { url, befund: "fehler", status: r.status };
  const bytes = Buffer.from(await r.arrayBuffer());
  const datei = `${datum}-${slug(url)}.${endung(r.headers.get("content-type"))}`;
  fs.mkdirSync(ziel, { recursive: true });
  fs.writeFileSync(path.join(ziel, datei), bytes);
  const hash = crypto.createHash("sha256").update(bytes).digest("hex");
  fs.appendFileSync(path.join(ziel, "SHA256SUMS"), `${hash} *${datei}\n`);
  return { url, befund: "ok", datei: path.join("belege", "preise", id, datei), hash, bytes: bytes.length };
}

async function main() {
  const { id, extra, datum } = argumente(process.argv.slice(2));
  if (!id) { console.error("Aufruf: node preisarchiv.js <anbieter-id> [--url URL] [--datum JJJJ-MM-TT]"); process.exit(2); }
  const datei = path.join(DATA_DIR, id + ".json");
  if (!fs.existsSync(datei)) { console.error("Unbekannter Anbieter:", id); process.exit(2); }
  const p = JSON.parse(fs.readFileSync(datei, "utf8"));
  const urls = [...new Set([...(p.modelle || []).map((m) => m.quelle).filter(Boolean), ...extra])];
  const ziel = path.join(__dirname, "belege", "preise", id);
  for (const url of urls) {
    try {
      const e = await archiviere(id, url, datum, ziel);
      console.log(e.befund === "ok" ? `ok   ${e.datei}  ${e.bytes} B  sha256 ${e.hash}` : `FEHL ${e.status}  ${url}`);
    } catch (err) {
      console.log(`FEHL ${err.message}  ${url}`);
    }
  }
}

main();
