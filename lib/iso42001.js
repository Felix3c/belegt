"use strict";
/**
 * belegbar.eu — ISO/IEC 42001 (KI-Managementsystem) als eigenes Feld je Profil
 * (Verbesserungsliste Felix 08.10.2026, Punkt V2).
 *
 *   iso_42001: { status, wert, zertifizierer, anwendungsbereich, quelle, geprueft, anmerkung }
 *
 * status belegt     = Zertifikat oder Eintrag im Register der Zertifizierungsstelle öffentlich einsehbar
 *        beansprucht = Anbieter sagt „zertifiziert“, ohne einsehbares Zertifikat
 *        unbelegt    = nichts gefunden („aligned“, „in Vorbereitung“ zählen nicht als Zertifikat)
 * wert   true = zertifiziert (bei belegt/beansprucht Pflicht); sonst null.
 *
 * Das Feld und die Liste zertifikate[] müssen übereinstimmen: die Übersicht in build.js zählt
 * 42001 weiterhin aus zertifikate[]; ein Feld ohne passenden Eintrag würde dort fehlen.
 *
 * Aufrufer: build.js (Prüfung beim Einlesen, Profil, llms-full).
 */

const STATUS = new Set(["belegt", "beansprucht", "unbelegt"]);
const IST_42001 = /42001/;
const istText = (w) => typeof w === "string" && w.trim() !== "";

function pruefe(p, { streng = false } = {}) {
  const f = p.iso_42001;
  const zert = (p.zertifikate || []).find((z) => IST_42001.test(z.typ || ""));
  if (f === undefined) {
    const fe = streng ? ["iso_42001: fehlt (unbelegt eintragen statt weglassen)"] : [];
    if (zert) fe.push(`iso_42001: fehlt, obwohl zertifikate[${zert.typ}] eingetragen ist`);
    return fe;
  }
  if (!f || typeof f !== "object") return ["iso_42001: kein Objekt"];
  const fehler = [];
  if (!STATUS.has(f.status)) fehler.push(`iso_42001: Status „${f.status}“ unbekannt`);
  if (!f.geprueft || !/^\d{4}-\d{2}-\d{2}$/.test(f.geprueft)) fehler.push("iso_42001: Prüfdatum fehlt");
  if (f.wert !== null && f.wert !== undefined && typeof f.wert !== "boolean") fehler.push(`iso_42001: Wert ${JSON.stringify(f.wert)} ist nicht ja/nein`);
  for (const k of ["zertifizierer", "anwendungsbereich"]) {
    if (f[k] !== null && f[k] !== undefined && !istText(f[k])) fehler.push(`iso_42001: ${k} ist kein Text`);
  }
  if (f.status === "belegt" || f.status === "beansprucht") {
    if (!f.quelle) fehler.push(`iso_42001: ${f.status} ohne Quelle`);
    if (f.wert !== true) fehler.push(`iso_42001: ${f.status} ohne Wert true`);
  }
  if (f.status === "belegt" && !istText(f.zertifizierer)) fehler.push("iso_42001: belegt ohne Zertifizierer");
  if (f.status === "unbelegt" && f.wert === true) fehler.push("iso_42001: unbelegt, aber Wert true");
  const zStatus = zert ? zert.status : "unbelegt";
  if (STATUS.has(f.status) && zStatus !== f.status) {
    fehler.push(`iso_42001: Status ${f.status}, aber zertifikate[] sagt ${zert ? zStatus : "keinen Eintrag"}`);
  }
  return fehler;
}

function wertText(f) {
  if (f.status === "unbelegt") return "kein Zertifikat gefunden";
  return f.wert === true ? "zertifiziert" : "unklar";
}

/** Abschnitt fürs Profil. h = { esc, statusBadge, quelleLink }. Ohne Feld: leer. */
function htmlAbschnitt(p, h) {
  const f = p.iso_42001;
  if (!f) return "";
  const leer = '<span class="leer">keine belastbare Angabe gefunden</span>';
  const zeile = (label, wert) => `<tr><th scope="row">${h.esc(label)}</th><td>${wert}</td></tr>`;
  const ergebnis = f.status === "unbelegt"
    ? '<span class="leer">kein Zertifikat nach ISO/IEC 42001 gefunden</span>'
    : h.esc(wertText(f));
  return `<h2>ISO/IEC 42001 (KI-Managementsystem)</h2>
  <div class="tabelle-scroll"><table class="pruefpunkte"><tbody>${[
    zeile("Ergebnis", `${ergebnis} ${h.statusBadge(f.status)} ${h.quelleLink(f.quelle, f.geprueft)}`),
    zeile("Zertifizierer", f.zertifizierer ? h.esc(f.zertifizierer) : leer),
    zeile("Anwendungsbereich", f.anwendungsbereich ? h.esc(f.anwendungsbereich) : leer),
    zeile("Anmerkung", f.anmerkung ? h.esc(f.anmerkung) : leer),
  ].join("")}</tbody></table></div>`;
}

/** Eine Zeile für llms-full.txt. */
function textZeile(p) {
  const f = p.iso_42001;
  if (!f) return "- ISO/IEC 42001: unbelegt (Feld nicht erfasst)";
  const teile = [`- ISO/IEC 42001: ${wertText(f)} [Status: ${f.status}]`];
  if (f.zertifizierer) teile.push(`Zertifizierer: ${f.zertifizierer}`);
  if (f.anwendungsbereich) teile.push(`Anwendungsbereich: ${f.anwendungsbereich}`);
  if (f.quelle) teile.push(`Quelle: ${f.quelle}`);
  if (f.geprueft) teile.push(`geprüft ${f.geprueft}`);
  if (f.anmerkung) teile.push(`Anmerkung: ${f.anmerkung}`);
  return teile.join(" | ");
}

module.exports = { STATUS, pruefe, htmlAbschnitt, textZeile };
