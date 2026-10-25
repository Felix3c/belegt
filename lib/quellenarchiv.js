"use strict";
/** belegbar.eu — Archivkopien aller Dossier-Quellen (Frage 452, Felix 22.10.2026).
 *  Bisher hatten nur Quellen aus Fällen einen Archivlink (13 von 314 Zeilen). Die Ablage
 *  data/quellen-archiv.json hält je Quell-URL die Save-Page-Now-Kopie und ob deren Inhalt mit dem
 *  Hash des Quellenlaufs übereinstimmt (gleich: true/false, null = nicht vergleichbar). */
const fs = require("fs");
const path = require("path");

const DATEI = path.join(__dirname, "..", "data", "quellen-archiv.json");
/** Fehlversuche je URL (z. B. IONOS: Save Page Now liefert keinen Snapshot), damit sie nicht jeden Stapel blockieren. */
const FEHL_DATEI = path.join(__dirname, "..", "data", "quellen-archiv-fehlversuche.json");

function lade(datei = DATEI) {
  return fs.existsSync(datei) ? JSON.parse(fs.readFileSync(datei, "utf8")) : {};
}

/** Eintrag zu einer URL, exakt oder mit/ohne Schrägstrich am Ende (wie hashZu). */
function zu(url, archiv) {
  if (!url) return null;
  for (const k of [url, url.endsWith("/") ? url.slice(0, -1) : url + "/"]) if (archiv[k] && archiv[k].archiv) return archiv[k];
  return null;
}

/** Quellen, die noch keine Kopie haben; Archivlinks selbst und eigene Fallseiten (schon gesichert) nicht.
 *  Quellen mit Fehlversuchen kommen ans Ende (wenigste zuerst), damit sie keinen Stapel blockieren. */
function offeneUrls(urls, archiv, fehlversuche = {}) {
  const raus = (u) => /^https?:\/\/web\.archive\.org\//.test(u) || /^https?:\/\/belegbar\.eu\/faelle\//.test(u);
  const fehl = (u) => fehlversuche[u] || 0;
  return [...new Set(urls)].filter((u) => u && !raus(u) && !zu(u, archiv)).sort()
    .sort((a, b) => fehl(a) - fehl(b));
}

/** Neue Fehlversuchs-Zählung mit einem Versuch mehr für url (die alte bleibt unverändert). */
function merkeFehlversuch(fehlversuche, url) {
  return { ...fehlversuche, [url]: (fehlversuche[url] || 0) + 1 };
}

/** Ablage-Eintrag aus dem Ziel von Save Page Now; null, wenn das Ziel kein Wayback-Snapshot ist. */
function eintrag({ ziel, hashKopie = null, hashLedger = null }) {
  const m = /^https:\/\/web\.archive\.org\/web\/(\d{4})(\d{2})(\d{2})\d{6}\//.exec(ziel || "");
  if (!m) return null;
  return { archiv: ziel, gesichert: `${m[1]}-${m[2]}-${m[3]}`, gleich: hashKopie && hashLedger ? hashKopie === hashLedger : null };
}

/** Neueste Kopie mit Status 200 aus einer CDX-Antwort (Kopfzeile timestamp, statuscode, original), höchstens
 *  maxTage alt; als Snapshot-Link, sonst null. Spart Save Page Now, wenn schon jemand gesichert hat (24.10.2026). */
function juengsteKopie(cdx, { heute, maxTage }) {
  if (!Array.isArray(cdx) || cdx.length < 2) return null;
  const grenze = Date.parse(heute + "T00:00:00Z") - maxTage * 86400000;
  const treffer = cdx.slice(1)
    .filter(([ts, status]) => status === "200" && /^\d{14}$/.test(ts))
    .filter(([ts]) => Date.parse(`${ts.slice(0, 4)}-${ts.slice(4, 6)}-${ts.slice(6, 8)}T00:00:00Z`) >= grenze)
    .sort((a, b) => b[0].localeCompare(a[0]));
  return treffer.length ? `https://web.archive.org/web/${treffer[0][0]}/${treffer[0][2]}` : null;
}

/** Eine fremde Kopie zählt nur, wenn ihr Text nachweislich dem Prüfstand gleicht (unbekannt = nein). */
function vorhandeneZaehlt({ hashKopie, hashLedger }) {
  return Boolean(hashKopie && hashLedger && hashKopie === hashLedger);
}

/** Fehler, bei denen das Archiv selbst sperrt (Verbindung abgelehnt/abgebrochen, 429): Stapel anhalten,
 *  der Quelle keinen Fehlversuch anrechnen. Zeitüberschreitung und „kein Snapshot“ bleiben Fehler der Quelle. */
function istArchivSperre(fehler) {
  return /fetch failed|ECONNREFUSED|ECONNRESET|^429/.test(String(fehler || ""));
}

/** Zählung für MESSUNG.md: Zeilen mit Quelle, davon mit Archivkopie. */
function zaehle(zeilen) {
  const mitQuelle = zeilen.filter((z) => z.quelle);
  return { mitQuelle: mitQuelle.length, mitArchiv: mitQuelle.filter((z) => z.archiv).length };
}

module.exports = { DATEI, FEHL_DATEI, lade, zu, offeneUrls, merkeFehlversuch, eintrag, juengsteKopie, vorhandeneZaehlt, istArchivSperre, zaehle };
