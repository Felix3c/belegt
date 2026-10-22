"use strict";
/** Rechtsgrundlage der Datenübermittlung nach Sitzland des Anbieters.
 *  Quelle: Europäische Kommission, Angemessenheitsbeschlüsse (ADEQUACY_QUELLE in build.js).
 *  Aus build.js ausgelagert 22.10.2026 (EH1, US-Anbieter), damit es testbar ist. */

const LAND_INFO = {
  DE: { name: "Deutschland", raum: "eu" },
  FR: { name: "Frankreich", raum: "eu" },
  NL: { name: "Niederlande", raum: "eu" },
  LU: { name: "Luxemburg", raum: "eu" },
  EE: { name: "Estland", raum: "eu" },
  SE: { name: "Schweden", raum: "eu" },
  IT: { name: "Italien", raum: "eu" },
  CH: { name: "Schweiz", raum: "angemessen" },
  GB: { name: "Vereinigtes Königreich", raum: "angemessen", hinweis: "Der Angemessenheitsbeschluss wurde im Dezember 2025 verlängert, je einmal unter der DSGVO und unter der Richtlinie für den Strafverfolgungsbereich (LED)." },
  // Kommissionsseite, abgerufen 22.10.2026: „the United States (commercial organisations participating in
  // the EU-US Data Privacy Framework)“; Beschluss vom 10.07.2023.
  US: { name: "USA", raum: "dpf", hinweis: "Ob der Anbieter am Data Privacy Framework teilnimmt, steht auf dataprivacyframework.gov; für diesen Anbieter hier noch nicht geprüft." },
};

const RAUM_TEXT = {
  eu: "EU-Mitgliedstaat. Keine Drittlandübermittlung, Art. 44 ff. DSGVO greift nicht.",
  angemessen: "Drittland mit Angemessenheitsbeschluss der EU-Kommission. Übermittlung ohne zusätzliche Garantien zulässig (Art. 45 DSGVO).",
  dpf: "Drittland. Der Angemessenheitsbeschluss der EU-Kommission vom 10.07.2023 gilt nur für Unternehmen, die am EU-US Data Privacy Framework teilnehmen (Art. 45 DSGVO); sonst nur mit geeigneten Garantien, etwa Standardvertragsklauseln (Art. 46 DSGVO).",
  drittland: "Drittland ohne Angemessenheitsbeschluss. Übermittlung nur mit geeigneten Garantien, etwa Standardvertragsklauseln (Art. 46 DSGVO).",
};

const RAUM_KURZ = { eu: "EU", angemessen: "Angemessenheitsbeschluss", dpf: "Beschluss nur mit DPF", drittland: "Drittland ohne Beschluss" };

function landInfo(code) {
  return LAND_INFO[code] || { name: code, raum: "drittland" };
}

/** Hinweis zum Rechtsraum für einen Anbieter. Bei US-Anbietern mit geprüfter DPF-Teilnahme
 *  (stammdaten.dpf, Liste dataprivacyframework.gov) der Satz zu genau diesem Anbieter, sonst der
 *  allgemeine Satz des Landes (EH1 Teil 2, 22.10.2026). */
function rechtsraumHinweis(p) {
  const s = (p && p.stammdaten) || {};
  const li = landInfo(s.land);
  const d = s.dpf;
  if (li.raum === "dpf" && d && d.status === "belegt") {
    return d.wert
      ? "Der Anbieter nimmt laut der amtlichen Liste dataprivacyframework.gov aktiv am EU-US Data Privacy Framework teil; der Beschluss gilt damit für Übermittlungen an ihn."
      : "Der Anbieter steht nicht auf der amtlichen Liste dataprivacyframework.gov (weder aktiv noch inaktiv); der Beschluss gilt für ihn nicht, Übermittlungen brauchen geeignete Garantien (Art. 46 DSGVO).";
  }
  return li.hinweis || null;
}

/** Kurzform für Tabellen, mit DPF ja/nein, wenn geprüft. */
function rechtsraumKurz(p) {
  const s = (p && p.stammdaten) || {};
  const li = landInfo(s.land);
  const d = s.dpf;
  if (li.raum === "dpf" && d && d.status === "belegt") return d.wert ? "DPF-Teilnehmer" : "Drittland, nicht im DPF";
  return RAUM_KURZ[li.raum];
}

/** Zahl der Anbieter als Text, europäische und US-Anbieter getrennt (seit EH1, 22.10.2026).
 *  form: "nominativ" (Standard), "dativ" („von … KI-Anbietern“), "alle" („Alle … KI-Anbieter“). */
function anbieterZahl(liste, form = "nominativ") {
  const us = liste.filter((p) => p.stammdaten && p.stammdaten.land === "US").length;
  const eu = liste.length - us;
  const adj = form === "nominativ" ? "europäische" : "europäischen";
  const nomen = form === "dativ" ? "KI-Anbietern" : "KI-Anbieter";
  if (!liste.length) return `0 ${nomen}`;
  if (!us) return `${eu} ${adj} ${nomen}`;
  if (!eu) return `${us} US-${nomen}`;
  return `${eu} ${adj} und ${us} US-${nomen}`;
}

module.exports = { LAND_INFO, RAUM_TEXT, RAUM_KURZ, landInfo, anbieterZahl, rechtsraumHinweis, rechtsraumKurz };
