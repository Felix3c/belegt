"use strict";
/**
 * belegbar.eu — Abschnitt „Für Datenschutzbeauftragte und Auditoren“ auf /fuer-kaeufer/ (B2, 10.10.2026).
 * Befund Gespräch 06 (Schlademann, 08.10.): Käufer des Dossiers sind eher Auditoren und externe DSB, die je
 * Anbieter einen schriftlichen Prüfbericht schreiben, als die Anbieter selbst. Der Abschnitt zeigt, welcher
 * Teil dieser Prüfung öffentlich vorab erledigt werden kann (die 15 Prüfpunkte aus lib/vorgaben.js), was beim
 * Anbieter angefragt werden muss (V.IMMER_ANFRAGEN) und ein Muster-Dossier eines ausstellbaren Anbieters.
 *
 * Aufrufer: build.js (seiteFuerKaeufer, Muster-Datei docs/fuer-kaeufer/muster-<id>.md).
 */
const V = require("./vorgaben.js");

/** Anbieter des öffentlichen Musters. Muss den Normenbezugs-Filter bestehen (Test). */
const MUSTER_ANBIETER = "ionos";
const MUSTER_AUFTRAGGEBER = "Muster, kein Auftrag. Alle 15 Standard-Prüfpunkte";

const musterDatei = (id) => `muster-${id}.md`;

function esc(s) {
  return String(s === null || s === undefined ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function datumDe(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || "");
  return m ? `${m[3]}.${m[2]}.${m[1]}` : esc(iso);
}

function tabellePruefpunkte(muster) {
  const ergebnisJe = new Map(muster ? muster.ergebnis.punkte.map((p) => [p.id, p.ergebnis]) : []);
  const kopf = `<tr><th>Nr.</th><th>Prüfpunkt</th>${muster ? `<th>Muster ${esc(muster.name)}</th>` : ""}</tr>`;
  const zeilen = V.VORGABEN.map((v, i) => `<tr><td>${i + 1}</td><td>${esc(v.label)}</td>`
    + `${muster ? `<td>${esc(V.ERGEBNIS_TEXT[ergebnisJe.get(v.id)] || "—")}</td>` : ""}</tr>`);
  return `<table>\n${kopf}\n${zeilen.join("\n")}\n</table>`;
}

function listeAnfragen() {
  return `<ul>\n${V.IMMER_ANFRAGEN.map(([u, w]) => `<li>${esc(u)} (${esc(w)})</li>`).join("\n")}\n</ul>`;
}

/**
 * HTML des Abschnitts. `muster` = { name, datei, ergebnis (aus V.werteAus), datum } oder leer, wenn sich
 * das Muster beim Build nicht ausstellen ließ; dann steht der Abschnitt ohne Muster-Spalte und Link.
 */
function abschnittAuditoren({ muster = null } = {}) {
  const z = muster && muster.ergebnis.zahl;
  const musterAbsatz = muster
    ? `<p><strong>Muster:</strong> <a href="${esc(muster.datei)}">Dossier ${esc(muster.name)}</a>, Stand ${datumDe(muster.datum)}, alle 15 Prüfpunkte, ohne Auftraggeber (Markdown, öffnet in jedem Texteditor). Ergebnis: ${z.ja} ja, ${z.nein} nein, ${z.nicht_belegbar} nicht belegbar. Das Muster wird bei jedem Build der Seite aus den aktuellen Daten neu erzeugt.</p>`
    : "";
  return `
<h2 id="auditoren">Für Datenschutzbeauftragte und Auditoren: ein Anbieter, viele Stunden Prüfung</h2>
<p>Ein externer Auditor nannte uns für seine letzte Prüfung eines KI-Einsatzes rund 40 Stunden, mit Fachleuten für KI, Informationssicherheit und Datenschutz, am Ende ein schriftlicher Prüfbericht. Ein Teil dieser Stunden geht in Fragen, die sich aus öffentlichen Dokumenten des Anbieters beantworten lassen. Diesen Teil erledigt das Dossier vorab, mit Quelle für jede Zeile, damit die Stunden in den Teil gehen, den nur der Anbieter beantworten kann.</p>
<p><strong>Ergebniszeile.</strong> Sie wählen, welche der 15 Prüfpunkte für Ihre Prüfung zählen; ohne Auswahl gelten alle. Je Punkt steht eines von drei Ergebnissen: <em>ja</em> (öffentlich belegt und trifft Ihre Vorgabe), <em>nein</em> (öffentlich belegt, und der Anbieter schreibt selbst etwas, das die Vorgabe nicht trifft) oder <em>nicht belegbar</em> (nur behauptet, nicht gefunden oder ein offener <a href="../faelle/">Fall</a> zum Punkt). Das ist eine Aussage über die Beleglage, kein Urteil über den Anbieter.</p>
${tabellePruefpunkte(muster)}
${musterAbsatz}
<p><strong>Was beim Anbieter angefragt werden muss.</strong> Diese Unterlagen sind nicht öffentlich; jedes Dossier führt sie als Fragenliste im Kapitel „Nicht öffentlich belegbar“, zusammen mit einer Frage zu jedem Prüfpunkt, der dort „nicht belegbar“ ergibt:</p>
${listeAnfragen()}
<p>Das Dossier ersetzt diese Anfrage nicht. Es zeigt, welcher Teil der Prüfung schon öffentlich erledigt ist und welcher nicht.</p>`;
}

module.exports = { MUSTER_ANBIETER, MUSTER_AUFTRAGGEBER, musterDatei, abschnittAuditoren };
