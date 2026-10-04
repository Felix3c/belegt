"use strict";
/**
 * belegbar.eu — bezahlte Einträge im Profil ausweisen (Regel seit 16.09.2026, /fuer-anbieter/#eintritt).
 *
 * Zwei Felder im Anbieter-JSON, beide optional:
 *   "eintritt": { "art": "aufnahme_auf_antrag", "datum": "JJJJ-MM-TT" }
 *   "zusagen":  [{ "id", "text", "rolle", "datum", "frist", "sha256", "status", "ausgang_datum", "beleg" }]
 *
 * Escape-Test (GUARD.md): Die Felder tragen Art und Datum, nie einen Betrag. Der Preis steht nur beim
 * Betreiber (/fuer-anbieter/), nicht im Buch — sonst bindet ein Eintrag nicht mehr, wenn der Betreiber
 * verschwindet. Ein Betrag im JSON bricht deshalb den Build ab.
 *
 * Der Hash einer Zusage ist SHA-256 über den wörtlichen Text (UTF-8). Damit kann jeder aus daten.json
 * nachrechnen, dass der Wortlaut seit der Hinterlegung nicht verändert wurde.
 *
 * Aufrufer: build.js (Prüfung beim Laden, Abschnitt im Profil), lib/aenderungen.js (Protokoll).
 */
const crypto = require("crypto");

const EINTRITT_ART = { aufnahme_auf_antrag: "auf eigenen Antrag aufgenommen, Festpreis" };
const ZUSAGE_STATUS = { hinterlegt: "hinterlegt, Frist läuft", eingehalten: "eingehalten", nicht_eingehalten: "nicht eingehalten" };
const MIN_FRIST_TAGE = 30;
const BETRAG = /betrag|preis|eur|summe|rechnung|zahlung|amount|price/i;
const ISO = /^\d{4}-\d{2}-\d{2}$/;

const sha256 = (text) => crypto.createHash("sha256").update(text, "utf8").digest("hex");

function tageZwischen(von, bis) {
  return Math.round((Date.parse(bis + "T00:00:00Z") - Date.parse(von + "T00:00:00Z")) / 86400000);
}

function betragsSchluessel(obj, wo) {
  return Object.keys(obj || {}).filter((k) => BETRAG.test(k)).map((k) => `${wo}: Feld "${k}" sieht nach einem Betrag aus — Profile tragen nie den Preis`);
}

function pruefeZusage(z, i) {
  const wo = `zusagen[${z && z.id ? z.id : i}]`;
  const f = betragsSchluessel(z, wo);
  for (const k of ["id", "text", "rolle", "datum", "frist", "sha256", "status"]) if (!z || !z[k]) f.push(`${wo}: Feld "${k}" fehlt`);
  if (!z) return f;
  for (const k of ["datum", "frist", "ausgang_datum"]) if (z[k] && !ISO.test(z[k])) f.push(`${wo}: "${k}" ist kein Datum JJJJ-MM-TT`);
  if (z.text && z.sha256 && sha256(z.text) !== z.sha256) f.push(`${wo}: sha256 passt nicht zum wörtlichen Text`);
  if (ISO.test(z.datum || "") && ISO.test(z.frist || "") && tageZwischen(z.datum, z.frist) < MIN_FRIST_TAGE) f.push(`${wo}: Frist liegt weniger als ${MIN_FRIST_TAGE} Tage nach der Hinterlegung`);
  if (z.status && !ZUSAGE_STATUS[z.status]) f.push(`${wo}: unbekannter Status "${z.status}"`);
  if (z.status === "eingehalten" && !z.beleg) f.push(`${wo}: "eingehalten" ohne Beleg`);
  if (z.status && z.status !== "hinterlegt" && !z.ausgang_datum) f.push(`${wo}: Ausgang ohne "ausgang_datum"`);
  return f;
}

/** Alle Fehler eines Anbieters zu Eintritt und Zusagen. Leer = in Ordnung. */
function pruefeEintritt(p) {
  const f = [];
  if (p.eintritt !== undefined) {
    const e = p.eintritt || {};
    f.push(...betragsSchluessel(e, "eintritt"));
    if (!EINTRITT_ART[e.art]) f.push(`eintritt: unbekannte Art "${e.art}"`);
    if (!ISO.test(e.datum || "")) f.push('eintritt: "datum" fehlt oder ist kein Datum JJJJ-MM-TT');
  }
  if (p.zusagen !== undefined) {
    if (!Array.isArray(p.zusagen)) return [...f, "zusagen: muss eine Liste sein"];
    const ids = new Set();
    p.zusagen.forEach((z, i) => {
      f.push(...pruefeZusage(z, i));
      if (z && z.id) { if (ids.has(z.id)) f.push(`zusagen[${z.id}]: id doppelt`); ids.add(z.id); }
    });
  }
  return f;
}

/** Zeile fürs Änderungsprotokoll, wenn ein Anbieter auf eigenen Antrag aufgenommen wird. */
function eintrittGrund(p) {
  return p && p.eintritt && EINTRITT_ART[p.eintritt.art] ? `${EINTRITT_ART[p.eintritt.art]}, ${p.eintritt.datum}` : null;
}

/** Abschnitt im Profil. Ohne Eintritt und ohne Zusagen: leerer String, das Profil bleibt wie es ist. */
function eintrittHtml(p, { esc, datumDE }) {
  const zusagen = p.zusagen || [];
  if (!p.eintritt && !zusagen.length) return "";
  const teile = [];
  // Wortlaut wie auf /fuer-anbieter/#eintritt zugesagt: „auf eigenen Antrag aufgenommen, Festpreis, [Datum]“.
  if (p.eintritt) teile.push(`<p>${esc(p.name)}: ${esc(EINTRITT_ART[p.eintritt.art])}, ${datumDE(p.eintritt.datum)}. Geprüft wird nach derselben Methodik wie bei allen anderen Anbietern.</p>`);
  for (const z of zusagen) {
    const ausgang = z.status === "hinterlegt"
      ? `Frist ${datumDE(z.frist)}, noch nicht geprüft`
      : `${esc(ZUSAGE_STATUS[z.status])} am ${datumDE(z.ausgang_datum)}${z.beleg ? ` · <a href="${esc(z.beleg)}" rel="noopener nofollow" target="_blank">Beleg</a>` : ""}`;
    teile.push(`<div class="beleg" id="zusage-${esc(z.id)}">
    <div class="beleg-kopf"><span class="beleg-label">Hinterlegte Zusage ${esc(z.id)}</span><span class="klein">${esc(ZUSAGE_STATUS[z.status])}</span></div>
    <div class="beleg-wert">„${esc(z.text)}“</div>
    <div class="beleg-anm">${esc(z.rolle)}, hinterlegt am ${datumDE(z.datum)} · ${ausgang}</div>
    <div class="beleg-fuss klein">SHA-256 des Wortlauts: <code>${esc(z.sha256)}</code></div>
  </div>`);
  }
  return `<h2 id="eintritt">Bezahlte Leistungen</h2>
  <p class="klein">Was hier steht, hat ${esc(p.name)} zum veröffentlichten Festpreis beauftragt (<a href="../../fuer-anbieter/#eintritt">Regeln</a>). Es ändert weder Status noch Beleg-Quote noch Reihenfolge.</p>
  ${teile.join("\n  ")}`;
}

module.exports = { EINTRITT_ART, ZUSAGE_STATUS, MIN_FRIST_TAGE, sha256, pruefeEintritt, eintrittGrund, eintrittHtml };
