"use strict";
/**
 * belegbar.eu — Quellenlauf je Profil sichtbar machen (V4, Frage 220 a).
 * Zählt aus dem Ledger data/quellen-hashes.json, was der Quellenlauf bei einem Anbieter nachgelesen hat:
 * unverändert, verändert und von Hand gelesen, offen (verändert, noch nicht gelesen), verschwunden.
 * Startseiten (nur "website") belegen nichts und zählen nicht; von Hand auf nur_erreichbar gesetzte
 * Quellen werden nicht inhaltlich verglichen und zählen deshalb nicht als nachgelesen.
 */

/** Belegende Quellen-URLs eines Anbieters aus Q.sammleUrls(). */
function belegendeUrls(anbieterId, urls) {
  return urls.filter((u) => u.felder.some((f) => f.anbieter === anbieterId && f.schluessel !== "website")).map((u) => u.url);
}

function zaehle(anbieterId, urls, ledger) {
  const z = { zuletzt: null, quellen: 0, nachgelesen: 0, unveraendert: 0, veraendert_gelesen: 0, offen: 0, verschwunden: 0 };
  for (const u of belegendeUrls(anbieterId, urls)) {
    z.quellen++;
    const e = ledger[u];
    if (!e || !e.gesehen || e.nur_erreichbar) continue;
    z.nachgelesen++;
    if (!z.zuletzt || e.gesehen > z.zuletzt) z.zuletzt = e.gesehen;
    if (e.verschwunden) z.verschwunden++;
    else if (e.neu_hash) z.offen++;
    else if (e.uebernommen) z.veraendert_gelesen++;
    else z.unveraendert++;
  }
  return z;
}

/** Datum, seit dem die Quelle inhaltlich gleich ist (Referenz-Hash), oder null. */
function unveraendertSeit(eintrag) {
  if (!eintrag || !eintrag.hash || eintrag.nur_erreichbar || eintrag.neu_hash || eintrag.verschwunden) return null;
  return eintrag.geaendert || null;
}

/** Was an der Quelle selbst steht: unverändert seit, verändert (offen) seit, beim letzten Lauf nicht erreichbar. */
function hinweis(eintrag) {
  if (!eintrag || eintrag.nur_erreichbar) return null;
  if (eintrag.verschwunden) return { art: "verschwunden", datum: eintrag.gesehen };
  if (eintrag.neu_hash) return { art: "offen", datum: eintrag.veraendert_seit || eintrag.gesehen };
  const seit = unveraendertSeit(eintrag);
  return seit ? { art: "unveraendert", datum: seit } : null;
}

/** Einträge des Anbieters im Änderungsprotokoll (Status- und Quellenwechsel) in den letzten 30 Tagen. */
function statuswechsel30(anbieterId, aenderungen, stichtag) {
  const ab = new Date(stichtag + "T00:00:00Z");
  ab.setUTCDate(ab.getUTCDate() - 30);
  const abIso = ab.toISOString().slice(0, 10);
  return aenderungen.filter((e) => e.anbieter === anbieterId && e.typ !== "fall" && e.datum >= abIso && e.datum <= stichtag).length;
}

module.exports = { belegendeUrls, zaehle, unveraendertSeit, hinweis, statuswechsel30 };
