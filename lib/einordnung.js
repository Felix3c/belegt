"use strict";
/** Fachliche Einordnung auf Fallseiten: wörtliche, namentlich freigegebene Sätze Dritter
 *  (z. B. Fachanwälte) zum Thema eines Falls. Eine Einordnung ist kein Gutachten zum Fall und
 *  kein Beleg; sie steht deshalb in einem eigenen Abschnitt nach „Was dieser Fall nicht heißt“.
 *  Optionales Feld `einordnung` im Fall-JSON:
 *  [{ text, von, datum: "YYYY-MM-DD", quelle: "https://…", quelle_titel?, kontext? }] */

const PFLICHT = ["text", "von", "datum", "quelle"];

function esc(s) {
  if (s === null || s === undefined) return "";
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function datumDE(iso) {
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}

/** Wirft bei kaputten Einträgen; fehlendes Feld ist erlaubt. */
function pruefeEinordnung(liste, datei) {
  if (liste === undefined) return;
  if (!Array.isArray(liste)) throw new Error(`Fall ${datei}: "einordnung" muss eine Liste sein`);
  for (const e of liste) {
    for (const k of PFLICHT) if (!e[k]) throw new Error(`Fall ${datei}: Einordnung ohne "${k}"`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(e.datum)) throw new Error(`Fall ${datei}: Einordnung "datum" nicht im Format JJJJ-MM-TT`);
    if (!/^https:\/\//.test(e.quelle)) throw new Error(`Fall ${datei}: Einordnung "quelle" muss mit https:// beginnen`);
  }
}

function einordnungHtml(liste) {
  if (!liste || !liste.length) return "";
  const bloecke = liste.map((e) => `<figure class="zitat einordnung">
  <blockquote lang="de">„${esc(e.text)}“</blockquote>
  <figcaption>${esc(e.von)}, ${datumDE(e.datum)} — wörtlich, mit Namen freigegeben. ${e.kontext ? esc(e.kontext) + " " : ""}<a href="${esc(e.quelle)}" rel="noopener nofollow" target="_blank">${esc(e.quelle_titel || e.quelle.replace(/^https?:\/\//, ""))}</a></figcaption>
</figure>`).join("\n");
  // führende Leerzeile hier, nicht in der Vorlage: Fälle ohne Einordnung behalten ihr HTML byte-gleich (lastmod)
  return `

<h2>Fachliche Einordnung</h2>
<p class="klein">Allgemeine Einschätzung einer Fachperson zum Thema dieses Falls. Sie ist kein Gutachten zu diesem Fall und kein Beleg; die Belege stehen oben.</p>
${bloecke}`;
}

module.exports = { pruefeEinordnung, einordnungHtml };
