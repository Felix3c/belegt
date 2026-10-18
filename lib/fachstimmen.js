"use strict";
/** Fachstimmen je Zertifikatsseite: wörtliche Zitate von Fachleuten, nur mit deren Freigabe.
 *  Wortlaut und Zuordnung so, wie die Person sie selbst vorgegeben hat. Nichts kürzen, nichts übersetzen. */

const FACHSTIMMEN = {
  // Freigabe Patel per Mail 12.10.2026 14:53 UTC (Thread 1a12d2963411cdfb), Wortlaut und Zuordnung von ihm.
  // Ganzer Abschnitt (Einleitung, Kontext, Bildunterschrift) von Patel gegengelesen, Ok per Mail 16.10.2026 21:24 UTC.
  "iso-27001": {
    ueberschrift: "Wer steht auf dem Zertifikat?",
    einleitung:
      "Ein ISO-27001-Zertifikat nennt eine bestimmte Gesellschaft und einen Geltungsbereich. Ob das die Gesellschaft ist, mit der Sie den Vertrag schließen, prüft niemand für Sie. Bei Infomaniak und Hetzner steht die Abweichung oben in der Anmerkung.",
    kontext:
      "Der Sicherheitsforscher Punit Suketu Patel beschreibt den Mechanismus für Common-Criteria-Zertifikate. Bei ISO 27001 sind es nach seiner Auskunft die Gesellschaft und der Geltungsbereich.",
    zitat:
      "A certificate attaches to a product in one evaluated configuration, not to the organisation that sells it. The certificate travels and the documents that define its scope do not.",
    person: "Punit Suketu Patel, Independent Researcher",
    quelle: "https://arxiv.org/abs/2610.10644",
    herkunft: "Mail an belegbar.eu vom 12.10.2026",
    verweis: "Ausführlich im Paper, Abschnitt 5.4 und Fehlerklasse E8 (Abschnitt 4.8).",
  },
};

function fachstimmeBlock(f, esc) {
  if (!f) return "";
  return `<h2>${esc(f.ueberschrift)}</h2>
<p>${esc(f.einleitung)}</p>
<p>${esc(f.kontext)}</p>
<figure class="zitat">
  <blockquote lang="en">„${esc(f.zitat)}“</blockquote>
  <figcaption>${esc(f.person)}, ${esc(f.herkunft)}. ${esc(f.verweis)} <a href="${esc(f.quelle)}" rel="noopener" target="_blank">${esc(f.quelle.replace(/^https?:\/\//, ""))}</a></figcaption>
</figure>
`;
}

module.exports = { FACHSTIMMEN, fachstimmeBlock };
