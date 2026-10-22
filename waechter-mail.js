#!/usr/bin/env node
/**
 * belegbar.eu — Mail-Eingang des Änderungs-Wächters (OA1, 21.10.2026).
 * Manche Seiten lassen den Wächter nicht rein (OpenAI-DPA: 403 Cloudflare-Prüfung). Dafür ist belegbar mit
 * hallo@belegbar.eu bei den Änderungs-Benachrichtigungen des Anbieters eingetragen. Der Dauerlauf holt solche
 * Mails per Gmail, legt sie als JSON ab und ruft dieses Werkzeug: Absender und Ziel prüfen, Mail mit SHA-256
 * und Eingangsdatum sichern, sagen, welche beobachtete Seite sie nennt (dann Wächter + Wayback).
 *
 * Aufruf: node waechter-mail.js <mail.json> [--trocken]
 *   mail.json: {"id": "<Gmail-ID>", "von": "...", "an": ["hallo@belegbar.eu"], "datum": "<ISO 8601>",
 *               "betreff": "...", "text": "<Klartext>"}
 *   LAUF_DATUM=2026-10-22 setzt das Eingangsdatum (Standard: heute)
 * Ablage unter waechter/ (gitignored): mail-ledger.json, mail/<datum>/<anbieter>-<id>.txt + SHA256SUMS.
 */
"use strict";

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const Q = require("./lib/quellen.js");

const DIR = path.join(__dirname, "waechter");
const ZIEL = "hallo@belegbar.eu";
// Nur echte Domains des Anbieters (oder Subdomains davon); nachgemachte wie openai.com.evil.example fallen raus.
const ABSENDER = { openai: ["openai.com"] };
// Links, die in jeder Benachrichtigung stehen und keine Seite meinen, die man beobachten müsste.
const RAUSCHEN = /unsubscribe|preferences|manage-subscription|email\.openai\.com/i;

function absenderDomain(von) {
  const m = /@([A-Za-z0-9.-]+)>?\s*$/.exec(String(von).trim());
  return m ? m[1].toLowerCase() : "";
}

function pruefeMail(m) {
  if (!m || typeof m.id !== "string" || !/^[0-9a-f]{8,32}$/i.test(m.id)) throw new Error("Feld id fehlt oder ist keine Gmail-ID");
  for (const f of ["von", "datum", "betreff", "text"]) if (typeof m[f] !== "string") throw new Error(`Feld ${f} fehlt`);
  if (!Array.isArray(m.an) || !m.an.some((a) => a.toLowerCase().includes(ZIEL))) throw new Error(`Mail ging nicht an ${ZIEL}`);
  const dom = absenderDomain(m.von);
  const anbieter = Object.keys(ABSENDER).find((a) => ABSENDER[a].some((d) => dom === d || dom.endsWith("." + d)));
  if (!anbieter) throw new Error(`Absender unbekannt oder nicht vom Anbieter: ${m.von}`);
  return { anbieter };
}

// Vergleichsform: ohne Abfrage, Anker und Schrägstrich am Ende, Host klein.
function normal(url) {
  try {
    const u = new URL(url);
    return (u.host.toLowerCase() + u.pathname).replace(/\/+$/, "");
  } catch { return null; }
}

function nenntQuellen(text, quellen, anbieter) {
  const links = [...new Set((String(text).match(/https?:\/\/[^\s<>()"']+/g) || []).map((l) => l.replace(/[.,;:!?]+$/, "")))];
  const eigene = quellen.filter((q) => q.anbieter === anbieter);
  const domains = ABSENDER[anbieter] || [];
  const beobachtet = [], fremd = [];
  for (const l of links) {
    const n = normal(l);
    if (!n) continue;
    const q = eigene.find((e) => normal(e.url) === n);
    if (q) { if (!beobachtet.includes(q)) beobachtet.push(q); continue; }
    const host = n.split("/")[0];
    if (RAUSCHEN.test(l) || !domains.some((d) => host === d || host.endsWith("." + d))) continue;
    fremd.push(l);
  }
  return { beobachtet, fremd };
}

function fuehreMailLedger(ledger, m, datum, sha256) {
  if (ledger[m.id]) return { ledger, neu: false };
  const eintrag = { anbieter: pruefeMail(m).anbieter, eingang: datum, datum: m.datum, betreff: m.betreff, sha256 };
  return { ledger: { ...ledger, [m.id]: eintrag }, neu: true };
}

const mailDateiName = (anbieter, id) => `${anbieter}-${id}.txt`;

function mailBerichtZeilen({ neu, mail, anbieter, beobachtet, fremd }) {
  if (!neu) return [`SCHON BEKANNT: ${mail.id} (${mail.betreff})`];
  const z = [`NEU: ${anbieter} ${mail.datum} „${mail.betreff}“`];
  for (const q of beobachtet) z.push(`NENNT: ${q.art} ${q.url}`);
  for (const l of fremd) z.push(`UNBEOBACHTET: ${l} (Seite des Anbieters, nicht in der Liste; aufnehmen?)`);
  if (beobachtet.length) {
    z.push("JETZT: node waechter.js (Seite neu prüfen; bei 403 DPA montags über Felix' Chrome, Prüfung nie umgehen)");
    for (const q of beobachtet) z.push(`WAYBACK: https://web.archive.org/save/${q.url}`);
  } else {
    z.push("Keine beobachtete Seite genannt: Mail nur gesichert, Inhalt von Hand lesen.");
  }
  return z;
}

function main(argv) {
  const trocken = argv.includes("--trocken");
  const dateien = argv.filter((a) => a !== "--trocken");
  if (dateien.length !== 1) { console.error("Aufruf: node waechter-mail.js <mail.json> [--trocken]"); process.exit(2); }
  const m = JSON.parse(fs.readFileSync(dateien[0], "utf8"));
  const { anbieter } = pruefeMail(m);
  const datum = process.env.LAUF_DATUM || Q.heuteLokal();
  const quellen = JSON.parse(fs.readFileSync(path.join(DIR, "liste.json"), "utf8")).quellen;
  const ledgerDatei = path.join(DIR, "mail-ledger.json");
  const alt = fs.existsSync(ledgerDatei) ? JSON.parse(fs.readFileSync(ledgerDatei, "utf8")) : {};
  const bytes = Buffer.from(`Von: ${m.von}\nAn: ${m.an.join(", ")}\nDatum: ${m.datum}\nBetreff: ${m.betreff}\nGmail-ID: ${m.id}\n\n${m.text}\n`, "utf8");
  const sha = crypto.createHash("sha256").update(bytes).digest("hex");
  const { ledger, neu } = fuehreMailLedger(alt, m, datum, sha);
  const { beobachtet, fremd } = nenntQuellen(m.text, quellen, anbieter);
  console.log(`Mail-Eingang ${datum}`);
  for (const zeile of mailBerichtZeilen({ neu, mail: m, anbieter, beobachtet, fremd })) console.log(zeile);
  if (trocken || !neu) return;
  const ziel = path.join(DIR, "mail", datum);
  fs.mkdirSync(ziel, { recursive: true });
  const name = mailDateiName(anbieter, m.id);
  fs.writeFileSync(path.join(ziel, name), bytes);
  fs.appendFileSync(path.join(ziel, "SHA256SUMS"), `${sha}  ${name}  gmail:${m.id}\n`);
  fs.writeFileSync(ledgerDatei, JSON.stringify(ledger, null, 2) + "\n");
}

module.exports = { pruefeMail, nenntQuellen, fuehreMailLedger, mailBerichtZeilen, mailDateiName };
if (require.main === module) {
  try { main(process.argv.slice(2)); } catch (e) { console.error("Abbruch: " + e.message); process.exit(1); }
}
