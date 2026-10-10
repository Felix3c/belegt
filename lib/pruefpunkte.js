"use strict";
/**
 * belegbar.eu — Prüfpunkte aus der Datenschutzprüfung (Bau-Auftrag Felix 08.10.2026 nach dem
 * Gespräch mit Hendrik Schlademann, BvD-Ausschuss KI; Lücken laut BayLDA-KI-Checkliste v0.9, S. 9–11).
 *
 * Sieben Felder, jedes mit Status belegt/beansprucht/unbelegt, Quelle und Prüfdatum wie alle anderen:
 *   zertifikate[].anwendungsbereich, .zertifizierer, .akkreditiert_dakks
 *   modelle[].backup_standort, .vorgeschaltete_filter
 *   vertrag.zweckbindung, .betroffenenrechte_traeger, .log_frist, .log_zweck
 * Ein Feld, das beim Anbieter nichts hergibt, steht als „unbelegt“ da und wird nicht weggelassen.
 * Die Felder zählen (noch) nicht in die Beleg-Quote; das entscheidet Felix.
 *
 * Aufrufer: build.js (Profil, Vergleich, llms-full, Prüfung beim Einlesen), lib/aenderungen.js.
 */

const STATUS = new Set(["belegt", "beansprucht", "unbelegt"]);
const TRAEGER = { anbieter: "Anbieter", auftraggeber: "Auftraggeber", geteilt: "geteilt (Anbieter und Auftraggeber)" };

const istText = (w) => typeof w === "string" && w.trim() !== "";
const istJaNein = (w) => typeof w === "boolean";

/** Feldbeschreibungen. `art` legt den erlaubten Wert fest (null ist immer erlaubt, außer bei belegt/beansprucht). */
const VERTRAG = [
  { k: "zweckbindung", label: "Zweckbindung über Training hinaus", art: "janein",
    frage: "Nutzt der Anbieter Ein- und Ausgaben nur zur Erbringung des Dienstes, also auch nicht für Filterverbesserung oder Marketing? (BayLDA S. 11)" },
  { k: "betroffenenrechte_traeger", label: "Betroffenenrechte: wer bedient sie", art: "traeger",
    frage: "Wer beantwortet Auskunfts- und Löschanfragen Betroffener: Anbieter oder Auftraggeber? (BayLDA S. 9)" },
  { k: "log_frist", label: "Log-Aufbewahrung (Frist)", art: "text",
    frage: "Wie lange speichert der Anbieter Protokolle zu Anfragen (Inhalte oder Metadaten)? (BayLDA S. 11)" },
  { k: "log_zweck", label: "Log-Aufbewahrung (Zweck)", art: "text",
    frage: "Wozu werden diese Protokolle gespeichert? (BayLDA S. 11)" },
];
const ZERT = [
  { k: "anwendungsbereich", label: "Anwendungsbereich", art: "text",
    frage: "Welche Gesellschaften, Standorte und Dienste deckt das Zertifikat ab (Scope / SoA)?" },
  { k: "zertifizierer", label: "Zertifizierer", art: "text", frage: "Wer hat zertifiziert?" },
  { k: "akkreditiert_dakks", label: "Zertifizierer akkreditiert (DAkkS)", art: "janein",
    frage: "Ist die Zertifizierungsstelle für diese Norm bei der DAkkS akkreditiert? Andere nationale Stellen in der Anmerkung." },
];
const MODELL = [
  { k: "backup_standort", label: "Backup-Standort", art: "text",
    frage: "Wo liegen Sicherungen oder Spiegelungen, auch wenn die Region fest gewählt ist?" },
  { k: "vorgeschaltete_filter", label: "Vorgeschaltete Filter", art: "janein",
    frage: "Schaltet der Anbieter eigene Filter oder Vor-/Nachverarbeitung vor das Modell? (BayLDA S. 9)" },
];
const ALLE = [...VERTRAG, ...ZERT, ...MODELL];
const PER_KEY = Object.fromEntries(ALLE.map((d) => [d.k, d]));

function wertOk(art, w) {
  if (w === null || w === undefined) return true;
  if (art === "janein") return istJaNein(w);
  if (art === "traeger") return Object.prototype.hasOwnProperty.call(TRAEGER, w);
  return istText(w);
}

/** Unterfelder eines Profils in fester Reihenfolge; mit `mitFehlenden` auch die nicht eingetragenen. */
function felder(p, { mitFehlenden = false } = {}) {
  const aus = [];
  const nimm = (pfad, d, o, ort) => {
    const feld = o ? o[d.k] : undefined;
    if (feld !== undefined || mitFehlenden) aus.push({ pfad, def: d, feld, ort });
  };
  for (const d of VERTRAG) nimm(`vertrag.${d.k}`, d, p.vertrag || {}, { art: "vertrag" });
  for (const z of p.zertifikate || []) for (const d of ZERT) nimm(`zertifikate[${z.typ}].${d.k}`, d, z, { art: "zertifikat", name: z.typ });
  for (const m of p.modelle || []) for (const d of MODELL) nimm(`modelle[${m.name}].${d.k}`, d, m, { art: "modell", name: m.name });
  return aus;
}

/** Fehlerliste. Streng = jedes Feld muss da sein (gilt, sobald alle Profile ausgerollt sind). */
function pruefe(p, { streng = false } = {}) {
  const fehler = [];
  for (const { pfad, def, feld } of felder(p, { mitFehlenden: true })) {
    if (feld === undefined) { if (streng) fehler.push(`${pfad}: fehlt (unbelegt eintragen statt weglassen)`); continue; }
    if (!feld || typeof feld !== "object") { fehler.push(`${pfad}: kein Objekt`); continue; }
    if (!STATUS.has(feld.status)) fehler.push(`${pfad}: Status „${feld.status}“ unbekannt`);
    if (!wertOk(def.art, feld.wert)) fehler.push(`${pfad}: Wert ${JSON.stringify(feld.wert)} passt nicht zu ${def.art}`);
    if (!feld.geprueft || !/^\d{4}-\d{2}-\d{2}$/.test(feld.geprueft)) fehler.push(`${pfad}: Prüfdatum fehlt`);
    // Akkreditierungsstelle, wenn nicht DAkkS (Dossier V3: „DAkkS oder EA-MLA-Stelle“).
    if (feld.stelle !== undefined && !istText(feld.stelle)) fehler.push(`${pfad}: Stelle muss Text sein`);
    if ((feld.stelle !== undefined) !== (feld.stelle_ea_mla !== undefined) || (feld.stelle_ea_mla !== undefined && !istJaNein(feld.stelle_ea_mla))) fehler.push(`${pfad}: stelle und stelle_ea_mla (ja/nein) nur zusammen`);
    if (feld.status === "belegt" || feld.status === "beansprucht") {
      if (!feld.quelle) fehler.push(`${pfad}: ${feld.status} ohne Quelle`);
      if (feld.wert === null || feld.wert === undefined) fehler.push(`${pfad}: ${feld.status} ohne Wert`);
    }
  }
  return fehler;
}

function wertText(k, w) {
  if (w === null || w === undefined) return null;
  if (w === true) return "ja";
  if (w === false) return "nein";
  if (PER_KEY[k] && PER_KEY[k].art === "traeger") return TRAEGER[w] || String(w);
  return String(w);
}

/* ---------------- Anzeige ---------------- */

/** Abschnitt fürs Profil. h = { esc, datumDE, statusBadge, quelleLink }. */
function htmlAbschnitt(p, h) {
  const zeile = (d, feld) => {
    const st = (feld && feld.status) || "unbelegt";
    const w = feld ? wertText(d.k, feld.wert) : null;
    return `<tr><th scope="row">${h.esc(d.label)}</th><td>${w ? h.esc(w) : '<span class="leer">keine belastbare Angabe gefunden</span>'}${feld && feld.anmerkung ? `<div class="beleg-anm">${h.esc(feld.anmerkung)}</div>` : ""}</td><td>${h.statusBadge(st)} ${h.quelleLink(feld && feld.quelle, feld && feld.geprueft)}</td></tr>`;
  };
  const tabelle = (titel, zeilen) => `<h3>${h.esc(titel)}</h3>\n  <div class="tabelle-scroll"><table class="pruefpunkte"><tbody>${zeilen.join("")}</tbody></table></div>`;
  const v = p.vertrag || {};
  const teile = [tabelle("Vertrag", VERTRAG.map((d) => zeile(d, v[d.k])))];
  for (const z of p.zertifikate || []) teile.push(tabelle(`Zertifikat ${z.typ}`, ZERT.map((d) => zeile(d, z[d.k]))));
  for (const m of p.modelle || []) teile.push(tabelle(`Modell ${m.name}`, MODELL.map((d) => zeile(d, m[d.k]))));
  return `<h2>Prüfpunkte der Datenschutzprüfung</h2>
  <p class="klein">Was Datenschutzbeauftragte beim Anbieter zusätzlich nachsehen (BayLDA-KI-Checkliste, S. 9–11, und Gespräch mit einem Prüfer des BvD-Ausschusses KI, 08.10.2026). Jede Angabe mit Status und Quelle; fehlt ein Beleg, steht das hier ausdrücklich.</p>
  ${teile.join("\n  ")}`;
}

/** Zeilen für llms-full.txt (Klartext). */
function textZeilen(p) {
  const fmt = (label, d, feld) => {
    if (!feld) return `- ${label}: unbelegt (Feld nicht erfasst)`;
    const teile = [`- ${label}: ${wertText(d.k, feld.wert) || "unbelegt"} [Status: ${feld.status}]`];
    if (feld.quelle) teile.push(`Quelle: ${feld.quelle}`);
    if (feld.geprueft) teile.push(`geprüft ${feld.geprueft}`);
    if (feld.anmerkung) teile.push(`Anmerkung: ${feld.anmerkung}`);
    return teile.join(" | ");
  };
  const v = p.vertrag || {};
  const z = [];
  for (const d of VERTRAG) z.push(fmt(d.label, d, v[d.k]));
  for (const c of p.zertifikate || []) for (const d of ZERT) z.push(fmt(`${c.typ} — ${d.label}`, d, c[d.k]));
  for (const m of p.modelle || []) for (const d of MODELL) z.push(fmt(`${m.name} — ${d.label}`, d, m[d.k]));
  return z;
}

/** Prüfdaten der Unterfelder (für „einzelne Angaben zuletzt nachgeprüft“). */
function daten(p) {
  return felder(p).map((x) => x.feld && x.feld.geprueft).filter(Boolean);
}

module.exports = { STATUS, TRAEGER, VERTRAG, ZERT, MODELL, felder, pruefe, wertText, htmlAbschnitt, textZeilen, daten };
