"use strict";
/** belegbar.eu — Normenbezugs-Filter: findet Rechtsnormen-Verweise und Rechtsbewertungen in Texten.
 *  Hintergrund (zwei Kanzleien, 18.09.2026): Ein Dossier aus reinen Tatsachen (Aussage, Datum,
 *  Beleglage, Reaktion des Anbieters) ist erlaubt; sobald ein Normenbezug oder eine rechtliche
 *  Einordnung hinzutritt ("irreführend im Sinne von § 5 UWG", "Verstoß gegen …", "rechtswidrig"),
 *  wird es Rechtsdienstleistung nach RDG. Dieses Modul prüft einen Text darauf, bevor ein Dossier
 *  ausgegeben wird — leeres Ergebnis heißt: sauber. */

// Zeichen, die ein Wort ausmachen (inkl. deutscher Umlaute); \b in JS kennt nur ASCII-Wortzeichen,
// deshalb bauen wir die Wortgrenzen selbst über Lookaround.
const WORTZEICHEN = "A-Za-zÄÖÜäöüß";

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Erzeugt eine Regex, die `muster` nur dann trifft, wenn davor/danach kein weiteres Wortzeichen
 *  steht — verhindert z. B., dass "Art" in "Artefakt" oder "art" in "Quartal" anschlägt. */
function wortRegex(muster) {
  return new RegExp(`(?<![${WORTZEICHEN}])(?:${muster})(?![${WORTZEICHEN}])`, "gi");
}

const GESETZESKUERZEL = [
  "UWG", "DSGVO", "GDPR", "BGB", "StGB", "RDG", "TMG", "TTDSG", "DDG",
  "KI-VO", "AI Act", "DMA", "DSA", "MarkenG", "UrhG",
];

// Bewertungswörter, jeweils ASCII- und Umlaut-Schreibweise (case-insensitiv geprüft).
const BEWERTUNGSWOERTER = [
  "irrefuehrend", "irreführend",
  "irrefuehrung", "irreführung",
  "rechtswidrig",
  "unzulaessig", "unzulässig",
  "wettbewerbswidrig",
  "taeuschung", "täuschung",
  "taeuscht", "täuscht",
  "verstoss", "verstoß",
  "verstoesst", "verstößt",
  "verletzt",
  "haftbar",
  "haftung",
  "abmahnfaehig", "abmahnfähig",
  "unlauter",
];

// Paragraphen-/Artikelzeichen: "§", "§§" sowie "Art./Artikel <Zahl>" (Zahl zwingend, sonst würde
// z. B. "Artikel" im Sinne von Ware anschlagen).
const PARAGRAPH_MUSTER = [
  { name: "Paragraphenzeichen", regex: /§+/g },
  { name: "Artikel mit Ziffer", regex: wortRegex("(?:Art\\.?|Artikel)\\s{0,3}-?\\s{0,3}\\d+") },
];

// Bewertungsphrasen — Wortgrenzen sind hier nicht überall sinnvoll (z. B. "i.S.d." endet auf einen
// Punkt), deshalb bekommen sie eigene, direkt case-insensitive Muster.
const BEWERTUNGSPHRASEN = [
  /im\s+Sinne\s+von/gi,
  /i\.\s?S\.\s?d\./gi,
  /i\.\s?S\.\s?v\./gi,
  /nach\s+unserer\s+Einsch(?:ae|ä)tzung/gi,
  wortRegex("rechtlich"),
];

function baueKategorienRegeln() {
  const regeln = [...PARAGRAPH_MUSTER];
  for (const k of GESETZESKUERZEL) regeln.push({ name: "Gesetzeskürzel", regex: wortRegex(escapeRegex(k)) });
  for (const w of BEWERTUNGSWOERTER) regeln.push({ name: "Bewertungswort", regex: wortRegex(escapeRegex(w)) });
  for (const p of BEWERTUNGSPHRASEN) regeln.push({ name: "Bewertungsphrase", regex: p });
  return regeln;
}

const KATEGORIEN = baueKategorienRegeln();

/** Zeilennummer (1-basiert) und getrimmte Zeile zu einer Position im Text. */
function zeilenInfo(text, index) {
  const zeile = text.slice(0, index).split("\n").length;
  const start = text.lastIndexOf("\n", index - 1) + 1;
  const endeRoh = text.indexOf("\n", index);
  const ende = endeRoh === -1 ? text.length : endeRoh;
  return { zeile, fundstelle: text.slice(start, ende).trim() };
}

/** Prüft einen Text auf Normenbezug oder rechtliche Bewertung.
 *  Rückgabe: Array<{ muster, fundstelle, zeile }>; leeres Array heißt: sauber.
 *  Erlaubt (nicht gemeldet), weil rein tatsächlich: "kein Beleg gefunden", "nicht beantwortet",
 *  "keine Antwort", "Beleg fehlt", Datumsangaben, URLs, "ISO 27001", "Zertifikat" — diese Begriffe
 *  enthalten keines der oben geprüften Muster. */
function pruefeNormenbezug(text) {
  if (!text) return [];
  const treffer = [];
  for (const { regex } of KATEGORIEN) {
    regex.lastIndex = 0;
    let m;
    while ((m = regex.exec(text))) {
      const { zeile, fundstelle } = zeilenInfo(text, m.index);
      treffer.push({ muster: m[0], fundstelle, zeile });
      if (regex.lastIndex === m.index) regex.lastIndex += 1; // Nulltreffer nicht endlos wiederholen
    }
  }
  treffer.sort((a, b) => a.zeile - b.zeile || a.muster.localeCompare(b.muster));
  return treffer;
}

/* ---------------- Feldweise Prüfung (Feld-Ausnahme, Beschluss Felix 18.09.2026) -----------------
 * Was der Anbieter selbst sagt, ist Tatsache und darf Gesetzesnamen enthalten (z. B. ein Zitat aus
 * den AGB oder der Doku). Unsere eigenen Texte (Anmerkung, Kurztext, Bewertungsspalte, Bezeichnung)
 * bleiben streng. Deshalb prüft `pruefeProfilUndFaelle` die Rohdaten VOR dem Rendern, feldweise,
 * statt das fertige Markdown pauschal zu scannen — nur Felder, die AUSSCHLIESSLICH eine wörtliche
 * Anbieteraussage enthalten, sind ausgenommen. Mischt ein Feld Zitat und eigene Einordnung (z. B.
 * eine Anmerkung, die ein Zitat einbettet und einordnet), gilt das ganze Feld als eigener Text und
 * bleibt streng — die Ausnahme gilt nur für Felder, deren gesamter Inhalt das Zitat selbst ist. */
const ZITAT_FELDNAMEN = new Set(["zitat", "aussage", "wortlaut"]);

/** Läuft rekursiv durch ein Datenobjekt (Anbieterprofil o. Ä.) und sammelt Normenbezugs-Treffer aus
 *  allen String-Feldern außer den wörtlichen Anbieterzitaten. `pfad` wird zur Fundstelle in der
 *  Fehlermeldung (z. B. "profil.vertrag.avv.anmerkung" oder "profil.ai_act[0].pflicht"). */
function pruefeObjekt(wert, pfad, treffer) {
  if (wert === null || wert === undefined) return;
  if (typeof wert === "string") {
    for (const f of pruefeNormenbezug(wert)) treffer.push({ ...f, feld: pfad });
    return;
  }
  if (Array.isArray(wert)) {
    wert.forEach((v, i) => pruefeObjekt(v, `${pfad}[${i}]`, treffer));
    return;
  }
  if (typeof wert === "object") {
    for (const [k, v] of Object.entries(wert)) {
      if (ZITAT_FELDNAMEN.has(k)) continue; // wörtliche Anbieteraussage — Tatsache, ausgenommen
      pruefeObjekt(v, pfad ? `${pfad}.${k}` : k, treffer);
    }
  }
}

/** Prüft ein Anbieterprofil vollständig (feldweise, mit Zitat-Ausnahme) sowie je Fall nur den
 *  Kurztext (Feld "kurz", ersatzweise "titel") — genau die Texte, die ins Dossier gerendert werden.
 *  Die übrigen Fall-Felder (Widerspruch, Auflösung, Verlauf, Zitate der Behauptung/des Belegs, …)
 *  sind bewusst nicht Teil dieser Prüfung: Sie landen nicht im Anbieter-Dossier, sondern bleiben die
 *  eigene, rechtlich eingeordnete Fall-Seite auf belegbar.eu.
 *  Rückgabe wie pruefeNormenbezug, zusätzlich mit `feld` (Pfad zur Fundstelle). */
function pruefeProfilUndFaelle(profil, faelle = []) {
  const treffer = [];
  pruefeObjekt(profil, "profil", treffer);
  for (const f of faelle) {
    const quelle = f.kurz ? "kurz" : "titel";
    const text = f.kurz || f.titel;
    if (!text) continue;
    for (const t of pruefeNormenbezug(text)) treffer.push({ ...t, feld: `fall[${f.id}].${quelle}` });
  }
  treffer.sort((a, b) => a.feld.localeCompare(b.feld) || a.muster.localeCompare(b.muster));
  return treffer;
}

module.exports = { pruefeNormenbezug, pruefeProfilUndFaelle };
