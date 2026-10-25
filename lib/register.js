"use strict";
/**
 * belegbar.eu — Datenschutz-Nachweis laut Register (Art. 40–43 DSGVO).
 * Datenschutzrechtlich tragen nur genehmigte Verhaltensregeln (Art. 40/41) und Zertifizierungen durch
 * akkreditierte Stellen (Art. 42/43); ISO 27001 gehört nicht dazu (Hinweis eines Datenschutz-Auditors 19.10.2026,
 * Felix „ja“ zu Frage 441 am 22.10.2026). Das Feld sagt nur, was im Register steht, nicht was der
 * Anbieter darüber schreibt; eine Selbstangabe ohne Registereintrag heißt „nur Selbstangabe“.
 *
 * Aufrufer: build.js (Profilseite), lib/dossier.js (Ergebnisteil).
 */
const fs = require("fs");
const path = require("path");

const DATEI = path.join(__dirname, "..", "data", "register-datenschutz.json");

const ERGEBNIS_LABEL = {
  kein_eintrag: "kein Eintrag gefunden",
  beansprucht_nicht_im_register: "nur Selbstangabe, nicht im Register",
  mutter_im_register: "Mutterfirma im Register, dieser Dienst nicht",
  konzern_im_register: "Konzern im Register, dieses Produkt ungeklärt",
  dienst_im_register: "Dienst im Register eingetragen",
  nicht_geprueft: "noch nicht abgeglichen",
};

const ERKLAERUNG = "Nach der DSGVO tragen als Nachweis nur genehmigte Verhaltensregeln (Art. 40/41) und Zertifizierungen durch akkreditierte Stellen (Art. 42/43). ISO 27001 gehört nicht dazu.";

function ladeRegister(datei = DATEI) {
  return JSON.parse(fs.readFileSync(datei, "utf8"));
}

/** Abgleich für einen Anbieter; fehlt er, heißt das „noch nicht abgeglichen“, nicht „kein Eintrag“. */
function registerZu(id, reg) {
  const e = reg.anbieter && reg.anbieter[id];
  if (!e) return { ergebnis: "nicht_geprueft", text: "", quelle: null, stand: reg.stand };
  return { ergebnis: e.ergebnis, text: e.text || "", quelle: e.quelle || null, stand: e.stand || reg.stand };
}

const escHtml = (s) => String(s === null || s === undefined ? "" : s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const datumDE = (iso) => { const [j, m, t] = String(iso).split("-"); return `${t}.${m}.${j}`; };

/** Profilzeile im selben Aufbau wie die Belegzeilen, aber ohne Statusmarke: Das Ergebnis ist ein
 *  Registerbefund, keine Angabe des Anbieters. */
function registerZeileHtml(e) {
  const quelle = e.quelle ? `<a href="${escHtml(e.quelle)}" rel="noopener nofollow" target="_blank">Register</a> · ` : "";
  return `<div class="beleg">
    <div class="beleg-kopf"><span class="beleg-label">Datenschutz-Nachweis laut Register (Art. 40–43 DSGVO)</span></div>
    <div class="beleg-wert">${escHtml(ERGEBNIS_LABEL[e.ergebnis] || e.ergebnis)}</div>
    <div class="beleg-anm">${escHtml(e.text ? e.text + " " : "")}${escHtml(ERKLAERUNG)}</div>
    <div class="beleg-fuss"><span class="quelle">${quelle}abgeglichen ${datumDE(e.stand)}</span></div>
  </div>`;
}

/** Eine Zeile fürs Dossier (Markdown), ohne Normenbezug (Regel 18.09.2026, lib/normenbezug.js). */
function registerZeileText(e) {
  return `**Eintrag in Registern für Datenschutz-Verhaltensregeln und Datenschutz-Zertifizierungen, abgeglichen ${datumDE(e.stand)}:** ${ERGEBNIS_LABEL[e.ergebnis] || e.ergebnis}.${e.text ? " " + e.text : ""}${e.quelle ? " (" + e.quelle + ")" : ""}`;
}

module.exports = { DATEI, ERGEBNIS_LABEL, ERKLAERUNG, ladeRegister, registerZu, registerZeileHtml, registerZeileText };
