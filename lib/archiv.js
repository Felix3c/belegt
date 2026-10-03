"use strict";
/**
 * belegbar.eu — Archiv-Check der Fälle (Logik; Aufruf: archivcheck.js).
 *
 * Ein Fall verspricht „Archivkopie“ (Methodik, Fälle). Dass der Wayback-Link 200 liefert, reicht nicht:
 * Erst wenn das wörtliche Zitat in der archivierten Seite steht, trägt die Kopie, falls der Anbieter
 * die Seite ändert. Verglichen wird nur Buchstaben/Ziffern-Folge, weil Striche, „·“ und Tags im
 * Zitat anders gesetzt sind als im HTML (03.10.2026: vier Fehlalarme bei GreenPT/Requesty nur daran).
 */

// Ohne Tags und Entities, nur Buchstaben, Ziffern und % — Trennzeichen sind im Zitat Typografie, nicht Wortlaut.
function normText(s) {
  return String(s)
    .replace(/<[^>]+>/g, " ")
    .replace(/&[#\w]+;/g, " ")
    .replace(/[^\p{L}\p{N}%]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

// Auslassungen ([…], …, ...) teilen ein Zitat in Teile, die einzeln vorkommen müssen.
function zitatTeile(zitat) {
  return String(zitat)
    .split(/\[\s*(?:…|\.\.\.)\s*\]|…|\.\.\./)
    .map(normText)
    .filter((t) => t.split(" ").length >= 3);
}

// Wayback liefert mit „id_“ die Seite ohne eigene Leiste und ohne umgeschriebene Links.
function rohUrl(archiv) {
  return archiv.replace(/\/web\/(\d+)\//, "/web/$1id_/");
}

function zitatInText(zitat, html) {
  const text = normText(html);
  const fehlt = zitatTeile(zitat).filter((t) => !text.includes(t));
  return { ok: fehlt.length === 0, fehlt };
}

function sammleFallZitate(fall) {
  const aus = [];
  for (const feld of ["behauptung", "beleg"]) {
    const liste = Array.isArray(fall[feld]) ? fall[feld] : fall[feld] ? [fall[feld]] : [];
    liste.forEach((z, nr) => aus.push({ fall: fall.id, feld, nr, zitat: z.zitat, quelle: z.quelle, archiv: z.archiv || null }));
  }
  return aus;
}

module.exports = { normText, zitatTeile, rohUrl, zitatInText, sammleFallZitate };
