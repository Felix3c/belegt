"use strict";
/**
 * belegbar.eu — Vorgaben und Ergebniszeile des Dossiers (Format V3, Frage 219 „steht“, Bau 10.10.2026).
 * Vorschlag: dossiers/VORSCHLAG-FORMAT-V3.md.
 *
 * Die Ergebniszeile beantwortet keine Eignungsfrage, sondern eine Tatsachenfrage: Ist öffentlich belegt,
 * was der Auftraggeber prüfen will, und trifft die belegte Angabe seine Vorgabe?
 *   ja             = belegt, und die Angabe trifft die Vorgabe
 *   nein           = belegt, und der Anbieter schreibt selbst etwas, das die Vorgabe nicht trifft
 *   nicht_belegbar = nur beansprucht, unbelegt, nicht erfasst oder ein offener Fall zum Punkt
 * Die Vorgaben setzt der Auftraggeber (Auswahl), nicht belegbar.eu.
 *
 * Aufrufer: lib/dossier.js (rendere).
 */
const PP = require("./pruefpunkte.js");

/** Fälle, die noch nicht aufgelöst sind; ein solcher Fall macht seinen Prüfpunkt „nicht belegbar“ (Felix, 219). */
const FALL_OFFEN = new Set(["offen", "beantwortet"]);

const EU_LAENDER = ["Belgien", "Bulgarien", "Dänemark", "Deutschland", "Estland", "Finnland", "Frankreich", "Griechenland",
  "Irland", "Italien", "Kroatien", "Lettland", "Litauen", "Luxemburg", "Malta", "Niederlande", "Österreich", "Polen",
  "Portugal", "Rumänien", "Schweden", "Slowakei", "Slowenien", "Spanien", "Tschechien", "Ungarn", "Zypern"];
const EU_WORT = new RegExp(`\\bEU\\b|Europäische Union|${EU_LAENDER.join("|")}`);
const AUSSERHALB_WORT = /\bUS\b|\bUSA\b|Schweiz|\bCH\b|Zürich|\bJP\b|\bglobal\b|weltweit|Vereinigtes Königreich|\bUK\b/i;

/** Standort-Wortlaut eines Modells gegen „in der EU“. Nur eindeutige Wortlaute zählen. */
function standortEu(text) {
  if (typeof text !== "string" || text.trim() === "") return "nicht_belegbar";
  const eu = EU_WORT.test(text), aussen = AUSSERHALB_WORT.test(text);
  if (eu && !aussen) return "ja";
  if (aussen && !eu) return "nein";
  return "nicht_belegbar";
}

const istIso27001 = (typ) => /27001/.test(String(typ || "")) && !/27017|27018|27701/.test(String(typ || ""));
const istJa = (w) => w === true;
const istGenannt = (w) => w !== null && w !== undefined && w !== false && String(w).trim() !== "";

/** Die 15 Standard-Vorgaben in der Reihenfolge des Vorschlags. Fragen ohne eigenen Wortlaut kommen aus lib/pruefpunkte.js. */
const VORGABEN = [
  { id: "avv", label: "AVV vorhanden", art: "vertrag", k: "avv", trifft: istGenannt,
    frage: "Wo ist der Auftragsverarbeitungsvertrag in der geltenden Fassung abrufbar?" },
  { id: "subprozessoren", label: "Subprozessoren-Liste vorhanden", art: "vertrag", k: "subprozessoren", trifft: istGenannt,
    frage: "Welche Unterauftragnehmer setzt der Anbieter ein, und wo steht die aktuelle Liste?" },
  { id: "training", label: "Kein Training mit Kundendaten", art: "vertrag", k: "training_opt_out", trifft: istJa,
    frage: "Werden Ein- und Ausgaben zum Training von Modellen genutzt?" },
  { id: "zero_data_retention", label: "Zero Data Retention", art: "vertrag", k: "zero_data_retention", trifft: istJa,
    frage: "Werden Ein- und Ausgaben nach der Verarbeitung gespeichert, und wenn ja, wie lange?" },
  { id: "standort_eu", label: "Standort aller genutzten Modelle in der EU", art: "standort",
    frage: "In welchem Land werden die genutzten Modelle betrieben, und kann sich das ohne Ankündigung ändern?" },
  { id: "iso27001", label: "ISO 27001 belegt", art: "zertifikat",
    frage: "Kann der Anbieter das ISO-27001-Zertifikat selbst vorlegen?" },
  { id: "anwendungsbereich", label: "Anwendungsbereich des Zertifikats genannt", art: "zertfeld", k: "anwendungsbereich", trifft: istGenannt },
  { id: "zertifizierer", label: "Zertifizierer genannt", art: "zertfeld", k: "zertifizierer", trifft: istGenannt },
  // DAkkS „nein“ ist kein „nein“, wenn eine EA-MLA-Stelle akkreditiert hat (Befund V3: SGS über COFRAC).
  { id: "akkreditiert", label: "Zertifizierer akkreditiert (DAkkS oder EA-MLA-Stelle)", art: "zertfeld", k: "akkreditiert_dakks",
    trifft: (w, f) => w === true || (!!f.stelle && f.stelle_ea_mla === true) },
  { id: "backup_standort", label: "Backup-Standort genannt", art: "modellfeld", k: "backup_standort", trifft: istGenannt },
  { id: "filter", label: "Vorgeschaltete Filter offengelegt", art: "modellfeld", k: "vorgeschaltete_filter", trifft: (w) => w === true || w === false },
  { id: "zweckbindung", label: "Zweckbindung über Training hinaus", art: "vertrag", k: "zweckbindung", trifft: istJa },
  { id: "betroffenenrechte", label: "Träger der Betroffenenrechte genannt", art: "vertrag", k: "betroffenenrechte_traeger", trifft: istGenannt },
  { id: "log_frist", label: "Log-Frist genannt", art: "vertrag", k: "log_frist", trifft: istGenannt },
  { id: "log_zweck", label: "Log-Zweck genannt", art: "vertrag", k: "log_zweck", trifft: istGenannt },
];

/** Gehört ein Fall (Feldpfad wie „vertrag.zero_data_retention“, „zertifikate.ISO 27001“) zu dieser Vorgabe? */
function betrifft(v, feld) {
  if (v.art === "vertrag") return feld === `vertrag.${v.k}`;
  const zert = /^zertifikate[.[]/.test(feld) && /27001/.test(feld);
  if (v.art === "zertifikat") return zert && !/\]\.\w+$/.test(feld);
  if (v.art === "zertfeld") return zert && feld.endsWith("." + v.k);
  if (v.art === "standort") return /^modelle\[[^\]]+\]$/.test(feld);
  return /^modelle\[/.test(feld) && feld.endsWith("." + v.k);
}

const ALLE_PP = [...PP.VERTRAG, ...PP.ZERT, ...PP.MODELL];
VORGABEN.forEach((v, i) => {
  v.nr = i + 1;
  if (!v.frage) v.frage = (ALLE_PP.find((d) => d.k === v.k) || {}).frage || null;
});

/** Ein Feld { wert, status, quelle, geprueft, anmerkung } gegen eine Vorgabe. */
function feldErgebnis(f, trifft) {
  if (!f || f.status !== "belegt" || !f.quelle) return "nicht_belegbar";
  return trifft(f.wert, f) ? "ja" : "nein";
}

/** Kandidaten je Vorgabe: { ergebnis, feld, wo } — mehrere bei Modellen, alle müssen „ja“ sein. */
function kandidaten(v, p) {
  const iso = (p.zertifikate || []).find((z) => istIso27001(z.typ));
  if (v.art === "vertrag") { const f = (p.vertrag || {})[v.k]; return [{ ergebnis: feldErgebnis(f, v.trifft), feld: f }]; }
  if (v.art === "zertifikat") return [{ ergebnis: iso && iso.status === "belegt" && iso.quelle ? "ja" : "nicht_belegbar", feld: iso }];
  if (v.art === "zertfeld") { const f = iso ? iso[v.k] : undefined; return [{ ergebnis: feldErgebnis(f, v.trifft), feld: f }]; }
  const modelle = p.modelle || [];
  if (modelle.length === 0) return [{ ergebnis: "nicht_belegbar", feld: null }];
  if (v.art === "standort") return modelle.map((m) => ({
    ergebnis: m.status === "belegt" && m.quelle ? standortEu(m.standort) : "nicht_belegbar", wo: m.name,
    feld: { quelle: m.quelle, geprueft: m.geprueft, anmerkung: m.standort ? `Standort laut Anbieter: „${m.standort}“.` : "" },
  }));
  return modelle.map((m) => ({ ergebnis: feldErgebnis(m[v.k], v.trifft), feld: m[v.k], wo: m.name }));
}

function zusammen(liste) {
  if (liste.includes("nein")) return "nein";
  if (liste.includes("nicht_belegbar")) return "nicht_belegbar";
  return "ja";
}

/** Ergebnis je Vorgabe und für das Ganze. `auswahl` = Kennungen, die der Auftraggeber prüfen will. */
function werteAus(profil, { faelle = [], auswahl = null } = {}) {
  if (auswahl) for (const id of auswahl) if (!VORGABEN.some((v) => v.id === id)) throw new Error(`Unbekannte Vorgabe „${id}“`);
  const gewaehlt = auswahl ? VORGABEN.filter((v) => auswahl.includes(v.id)) : VORGABEN;
  const punkte = gewaehlt.map((v) => {
    const ks = kandidaten(v, profil);
    const zuFall = faelle.filter((c) => c.feld && betrifft(v, c.feld));
    const offenerFall = zuFall.some((c) => FALL_OFFEN.has(c.status));
    const ergebnis = offenerFall ? "nicht_belegbar" : zusammen(ks.map((k) => k.ergebnis));
    // Begründung vom Kandidaten, der das Ergebnis bestimmt (erstes „nein“, sonst erste Lücke).
    const massgeblich = ks.find((k) => k.ergebnis === ergebnis) || ks[0];
    const f = massgeblich.feld || {};
    return { id: v.id, nr: v.nr, label: v.label, frage: v.frage, ergebnis, offenerFall,
      // Modellname nur, wenn ein einzelnes Modell das Ergebnis bestimmt, nicht bei „ja“ für alle.
      wo: ks.length > 1 && ergebnis !== "ja" ? massgeblich.wo : null,
      quelle: f.quelle || null, geprueft: f.geprueft || profil.geprueft || null, anmerkung: f.anmerkung || "",
      faelle: zuFall.map((c) => c.id), faelleStatus: zuFall.map((c) => ({ id: c.id, status: c.status })) };
  });
  const zahl = { ja: 0, nein: 0, nicht_belegbar: 0 };
  for (const p of punkte) zahl[p.ergebnis] += 1;
  return { punkte, gesamt: zusammen(punkte.map((p) => p.ergebnis)), zahl };
}

/* ---------------- Text ---------------- */

const ERGEBNIS_TEXT = { ja: "ja", nein: "nein", nicht_belegbar: "nicht belegbar" };

/** Markdown-Zeilen des Ergebnisblocks (steht im Dossier vor Abschnitt 1). */
function ergebnisZeilen(e) {
  const { ja, nein, nicht_belegbar: nb } = e.zahl;
  const n = e.punkte.length;
  const L = [];
  L.push(`**Ergebnis: ${ERGEBNIS_TEXT[e.gesamt]}.** Von ${n} Prüfpunkten `
    + `${ja === 1 ? "ist 1 belegt und trifft" : `sind ${ja} belegt und treffen`} Ihre Vorgabe, `
    + `${nein === 1 ? "1 ist belegt und trifft" : `${nein} sind belegt und treffen`} sie nicht, `
    + `${nb === 1 ? "1 ist" : `${nb} sind`} nicht öffentlich belegbar.`);
  for (const p of e.punkte.filter((x) => x.ergebnis === "nein")) {
    L.push("");
    L.push(`**Nein bei:** ${p.label}${p.wo ? ` (${p.wo})` : ""}.${p.anmerkung ? " " + p.anmerkung.trim() : ""} (${p.quelle || "keine Quelle"}, Prüfdatum ${p.geprueft || "—"})`);
  }
  const offen = e.punkte.filter((x) => x.ergebnis === "nicht_belegbar");
  if (offen.length) {
    L.push("");
    L.push(`**Nicht belegbar:** ${offen.map((p) => p.label + (p.offenerFall ? ` (offener Fall ${p.faelle.join(", ")})` : "")).join("; ")}.`);
  }
  const mitFall = e.punkte.filter((x) => x.faelle.length);
  if (mitFall.length) {
    L.push("");
    L.push(`**Fall zu einem Prüfpunkt:** ${mitFall.map((p) => p.faelleStatus.map((c) => `${c.id} (${p.label}, ${c.status})`).join(", ")).join("; ")}, siehe Abschnitt 3.`);
  }
  L.push("");
  L.push(`Die Vorgaben setzt der Auftraggeber; ${n === VORGABEN.length ? "ohne Auswahl gelten alle 15 Prüfpunkte" : `gewählt sind ${n} von ${VORGABEN.length} Prüfpunkten`}. „Nein“ heißt: Der Anbieter schreibt das selbst, mit Quelle. Es ist kein Urteil von belegbar.eu. Bei Prüfpunkten, die nur „genannt“ verlangen, liest der Prüfer den Wortlaut in Abschnitt 1.`);
  L.push("");
  L.push("| Nr. | Prüfpunkt | Ergebnis |");
  L.push("|---|---|---|");
  for (const p of e.punkte) L.push(`| ${p.nr} | ${p.label}${p.wo ? ` (${p.wo})` : ""} | ${ERGEBNIS_TEXT[p.ergebnis]} |`);
  return L;
}

/** Fest für jeden Anbieter: was eine Prüfung beim Anbieter anfragen muss (Schlademann 08.10.2026, 04:22–05:11, 06:04, 16:58). */
const IMMER_ANFRAGEN = [
  ["Herstellererklärung: was mit Ein- und Ausgaben tatsächlich geschieht", "wird oft als Geschäftsgeheimnis zurückgehalten"],
  ["Nachweise zu Trainingsdaten", "Anbieter veröffentlichen sie nicht"],
  ["Testverfahren und Testfälle der Entwicklung", "intern"],
  ["Architektur und Datenablage", "intern"],
  ["Backup-Szenarien", "öffentlich höchstens der Standort (Prüfpunkt 10)"],
  ["Softwareverteilung", "intern"],
  ["Berechtigungskonzept: Zutritt, Zugang, Zugriff", "intern"],
  ["Erklärung zur Anwendbarkeit (SoA) des Zertifikats", "wird nur auf Anfrage herausgegeben"],
];

module.exports = { FALL_OFFEN, VORGABEN, IMMER_ANFRAGEN, ERGEBNIS_TEXT, standortEu, werteAus, ergebnisZeilen };
