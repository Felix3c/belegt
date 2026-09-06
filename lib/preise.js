"use strict";
/** Preise eines Modells: Anzeige und Statusstufe.
 *
 *  Felder je Modell (alle optional, siehe README):
 *    preis_input_1m_eur / preis_output_1m_eur   Tokenpreis je 1 Mio. Token
 *    preis_einheit + preis_ab_eur                Preis in anderer Einheit ("GPU-Stunde", "Bild", "Minute", "Monat"), "ab"-Wert
 *    preis_status: "kein_oeffentlicher_preis"    vierte Stufe: der Anbieter veröffentlicht keinen Preis (Enterprise, auf Anfrage,
 *                                                hinter Login, noch nicht veröffentlicht) — und das ist belegt
 *
 *  Preisart: "token" | "einheit" | "kostenlos" | "kein_oeffentlicher_preis" | "unbelegt".
 *  Eine Zahl schlägt den Status: Zahlen sind der stärkere Beleg. "unbelegt" heißt: wir haben keinen
 *  Preis gefunden — der Anbieter könnte einen veröffentlicht haben. */

const KEIN_PREIS = "kein_oeffentlicher_preis";
const KEIN_PREIS_LABEL = "kein öffentlicher Preis";

const istZahl = (v) => typeof v === "number" && !isNaN(v);

function eur(n) {
  if (!istZahl(n)) return "–";
  return n.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
}

function preisArt(m) {
  const input = m.preis_input_1m_eur, output = m.preis_output_1m_eur, ab = m.preis_ab_eur;
  if (istZahl(ab) && !m.preis_einheit) throw new Error(`preis_ab_eur ohne preis_einheit bei Modell „${m.name || "?"}“`);
  if (istZahl(input) || istZahl(output)) {
    const werte = [input, output].filter(istZahl);
    return Math.max(...werte) === 0 ? "kostenlos" : "token";
  }
  if (istZahl(ab)) return ab === 0 ? "kostenlos" : "einheit";
  if (m.preis_status === KEIN_PREIS) return KEIN_PREIS;
  return "unbelegt";
}

function preisText(m) {
  const art = preisArt(m);
  if (art === "token") return { art, input: eur(m.preis_input_1m_eur), output: eur(m.preis_output_1m_eur) };
  if (art === "einheit") return { art, text: `ab ${eur(m.preis_ab_eur)} / ${m.preis_einheit}` };
  if (art === "kostenlos") return { art, text: "kostenlos" };
  if (art === KEIN_PREIS) return { art, text: KEIN_PREIS_LABEL };
  return { art, text: "unbelegt" };
}

/** Günstigster Preis eines Anbieters für Übersicht und Vergleich. Tokenpreise gewinnen; sonst der
 *  niedrigste Wert der ersten vorkommenden Einheit (Einheiten sind untereinander nicht vergleichbar).
 *  „kein öffentlicher Preis“ nur, wenn es für jedes Modell belegt ist. */
function guenstigsterPreis(p) {
  const modelle = p.modelle || [];
  if (!modelle.length) return null;
  const arten = modelle.map(preisArt);
  const token = modelle.map((m) => m.preis_input_1m_eur).filter(istZahl);
  const kostenlos = arten.includes("kostenlos");
  if (token.length) {
    const wert = Math.min(...token);
    return wert === 0 || (kostenlos && !token.some((t) => t > 0)) ? { art: "kostenlos", wert: 0 } : { art: "token", wert };
  }
  const mitEinheit = modelle.filter((m, i) => arten[i] === "einheit");
  if (mitEinheit.length) {
    const einheit = mitEinheit[0].preis_einheit;
    const wert = Math.min(...mitEinheit.filter((m) => m.preis_einheit === einheit).map((m) => m.preis_ab_eur));
    return { art: "einheit", wert, einheit };
  }
  if (kostenlos) return { art: "kostenlos", wert: 0 };
  if (arten.every((a) => a === KEIN_PREIS)) return { art: KEIN_PREIS };
  return null;
}

function preisKurz(p) {
  const g = guenstigsterPreis(p);
  if (!g) return "–";
  if (g.art === "token") return `ab ${eur(g.wert)} / 1M Input`;
  if (g.art === "einheit") return `ab ${eur(g.wert)} / ${g.einheit}`;
  if (g.art === "kostenlos") return "kostenlos";
  return KEIN_PREIS_LABEL;
}

/** Abrufdatum eines Preises: das Feld-Datum des Modells, sonst das Profil-Datum. */
function preisStand(m, p) {
  return m.geprueft || p.geprueft || null;
}

module.exports = { KEIN_PREIS, KEIN_PREIS_LABEL, eur, preisArt, preisText, guenstigsterPreis, preisKurz, preisStand };
