#!/usr/bin/env node
/**
 * belegbar.eu — Quellen-Check.
 * Prüft jede in data/anbieter/*.json hinterlegte Quellen-URL auf Erreichbarkeit.
 * Aufruf: node linkcheck.js [--json datei]
 *
 * Warum nicht nur der Statuscode: Eine tote Belegseite antwortet oft mit 200 — weil der
 * Server auf die Startseite weiterleitet. Genau so ist am 24.08.2026 STACKITs AVV-PDF
 * verschwunden. Deshalb bewerten wir zusätzlich das Ziel der Weiterleitung: Landet eine
 * tiefe URL auf einer Startseite, gilt der Beleg als verloren, nicht als erreichbar.
 */
"use strict";

const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "data", "anbieter");
const UA = "Mozilla/5.0 (compatible; belegbar.eu-linkcheck/1.0; +https://belegbar.eu/)";
const GLEICHZEITIG = 8;
const TIMEOUT_MS = 20000;

/** Quellen, die automatisierte Abrufe blocken. Ein Fehlercode ist hier kein Befund —
 *  die Angabe wurde im Browser geprüft, die Anmerkung im Profil hält das fest. */
const BOT_SPERREN = ["trust.deepl.com", "deepl.safebase.us"];

function sammleUrls() {
  const treffer = [];
  for (const datei of fs.readdirSync(DATA_DIR).filter((f) => f.endsWith(".json"))) {
    const p = JSON.parse(fs.readFileSync(path.join(DATA_DIR, datei), "utf8"));
    const lauf = (o, pfad) => {
      if (!o || typeof o !== "object") return;
      for (const [k, v] of Object.entries(o)) {
        const ist = typeof v === "string" && v.startsWith("http");
        if (ist && (k === "quelle" || k === "website" || k === "wert")) treffer.push({ anbieter: p.id, feld: pfad + "." + k, url: v });
        else if (v && typeof v === "object") lauf(v, pfad + "." + k);
      }
    };
    lauf(p, p.id);
  }
  return [...new Map(treffer.map((t) => [t.url, t])).values()];
}

/** Zwei URLs, die auf dieselbe Ressource zeigen: www-Präfix, Schrägstrich am Ende und
 *  Fragment sind für die Frage "ist der Beleg noch da" bedeutungslos. Ohne diese
 *  Normalisierung besteht der halbe Bericht aus Umzügen, die keine sind. */
function gleicheRessource(a, b) {
  const norm = (u) => {
    const x = new URL(u);
    const host = x.hostname.startsWith("www.") ? x.hostname.slice(4) : x.hostname;
    let pfad = x.pathname;
    while (pfad.length > 1 && pfad.endsWith("/")) pfad = pfad.slice(0, -1);
    return host + pfad + x.search;
  };
  try { return norm(a) === norm(b); } catch { return false; }
}

/** Ist das Weiterleitungsziel nur noch eine Startseite, obwohl die Quelle tief verlinkt war? */
function aufStartseiteGelandet(von, nach) {
  try {
    const a = new URL(von), b = new URL(nach);
    const tief = a.pathname.replace(/\/+$/, "").length > 0;
    const flach = b.pathname.replace(/\/+$/, "").length === 0;
    return tief && flach;
  } catch {
    return false;
  }
}

async function pruefe(t) {
  const host = new URL(t.url).hostname;
  if (BOT_SPERREN.some((h) => host.endsWith(h))) return { ...t, befund: "uebersprungen", hinweis: "Quelle blockt automatisierte Abrufe; im Browser geprüft" };
  for (const methode of ["HEAD", "GET"]) {
    try {
      const r = await fetch(t.url, { method: methode, redirect: "follow", signal: AbortSignal.timeout(TIMEOUT_MS), headers: { "user-agent": UA, accept: "*/*" } });
      if (methode === "HEAD" && [403, 405, 501].includes(r.status)) continue;
      if (r.status >= 400) return { ...t, befund: "fehler", status: r.status };
      if (aufStartseiteGelandet(t.url, r.url)) return { ...t, befund: "beleg-verloren", status: r.status, ziel: r.url };
      return { ...t, befund: "ok", status: r.status, ziel: gleicheRessource(t.url, r.url) ? null : r.url };
    } catch (e) {
      if (methode === "GET") return { ...t, befund: "nicht-erreichbar", hinweis: e.message };
    }
  }
  return { ...t, befund: "nicht-erreichbar", hinweis: "unbekannt" };
}

(async () => {
  const urls = sammleUrls();
  process.stderr.write("Prüfe " + urls.length + " Quellen-URLs …\n");

  const ergebnis = [];
  let i = 0;
  await Promise.all(
    Array.from({ length: GLEICHZEITIG }, async () => {
      while (i < urls.length) ergebnis.push(await pruefe(urls[i++]));
    })
  );
  ergebnis.sort((a, b) => a.anbieter.localeCompare(b.anbieter) || a.url.localeCompare(b.url));

  const jsonIdx = process.argv.indexOf("--json");
  if (jsonIdx > -1 && process.argv[jsonIdx + 1]) fs.writeFileSync(process.argv[jsonIdx + 1], JSON.stringify(ergebnis, null, 2));

  const zaehl = {};
  ergebnis.forEach((e) => (zaehl[e.befund] = (zaehl[e.befund] || 0) + 1));
  const befunde = ergebnis.filter((e) => e.befund !== "ok" && e.befund !== "uebersprungen");
  const umgezogen = ergebnis.filter((e) => e.befund === "ok" && e.ziel);

  console.log("\nGeprüft: " + ergebnis.length + " Quellen — " + Object.entries(zaehl).map(([k, v]) => k + ": " + v).join(", "));

  if (umgezogen.length) {
    console.log("\nUmgezogen (" + umgezogen.length + ") — Ziel erreichbar, aber die URL zeigt woanders hin.");
    console.log("Kein Befund, aber ein Kandidat fuers Kanonisieren: Eine Weiterleitung von heute ist der 404 von morgen.");
    umgezogen.forEach((e) => console.log("  " + e.anbieter + " " + e.feld + "\n    " + e.url + "\n    -> " + e.ziel));
  }
  if (befunde.length) {
    console.log("\nBEFUNDE — diese Belege tragen nicht mehr:");
    befunde.forEach((e) => console.log("  [" + e.befund + (e.status ? " " + e.status : "") + "] " + e.anbieter + " " + e.feld + "\n    " + e.url + (e.ziel ? "\n    -> " + e.ziel : "") + (e.hinweis ? "\n    " + e.hinweis : "")));
    console.log("\nEin verlorener Beleg heißt nicht, dass die Eigenschaft entfallen ist — er heißt,");
    console.log("dass sie nicht mehr nachweisbar ist. Status im Profil entsprechend zurücksetzen.");
    process.exit(1);
  }
  console.log("\nAlle Belege tragen.");
})();
