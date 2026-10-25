"use strict";
/**
 * ENTWURF Startseite für Prüfer und DSB (ALLEIN EH3 + E22-8, 22.10.2026).
 * Nimmt die gebaute docs/index.html, ersetzt nur den Kopf-Abschnitt (.held) und schreibt
 * entwurf-startseite/index.html. Nicht live, nicht im Build, Ordner ist git-ignoriert.
 *   node entwurf-startseite.js
 */
const fs = require("fs");
const path = require("path");

/** Wächter-Beispiel: Belege in dossiers/us/gpt6-card/BELEG-gpt6-system-card-2026-10-22.md (eigener Abruf). */
const GPT6 = {
  dokument: "GPT-6-Astra-System-Card (OpenAI, PDF)",
  url: "https://deploymentsafety.openai.com/gpt-6-astra/gpt-6-astra.pdf",
  deckblatt: "2026-09-03",
  alt: { stand: "03.09.2026", seiten: 117, sha: "bc59000945d7710a0f05900aa0446d249fb62e8b63d4f96eca7045ef24f32005", wayback: "https://web.archive.org/web/20260903193305/https://deploymentsafety.openai.com/gpt-6-astra/gpt-6-astra.pdf" },
  neu: { stand: "30.09.2026", seiten: 175, sha: "77ff1e8aaf7018c7d7bbe347c374cd74188387ceca91f1ef637ccc59ea930895", wayback: "https://web.archive.org/web/20260930080312/https://deploymentsafety.openai.com/gpt-6-astra/gpt-6-astra.pdf" },
  fassungen: 5,
};

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const datumDE = (iso) => iso.split("-").reverse().join(".");
const kurz = (sha) => `${sha.slice(0, 12)}…`;

function aenderungen30(aenderungen, stand) {
  const grenze = new Date(stand).getTime() - 30 * 864e5;
  return (aenderungen || []).filter((a) => a && a.datum && new Date(a.datum).getTime() >= grenze).length;
}

function kopf(daten) {
  const n = daten.anbieter.length;
  const n30 = aenderungen30(daten.aenderungen, daten.stand);
  const g = GPT6;
  return `<p class="ew-band">ENTWURF · Vorschau für Felix, nicht live · Tabelle darunter = heutige Seite</p>
<section class="held ew-held">
  <div class="held-text">
    <p class="ew-fuer">Für Datenschutzbeauftragte, Prüfer und Kanzleien</p>
    <h1>Sie prüfen KI-Anbieter für Ihre Kunden?<br>Wir sammeln die Belege und halten sie aktuell.</h1>
    <p class="held-claim">Zu jedem Anbieter eine Akte: <strong>wörtliches Zitat, Prüfsumme, Abrufdatum, Archivkopie</strong>. Ändert sich ein Vertrag, eine Liste der Unterauftragnehmer oder eine Modellbeschreibung, melden wir es Ihnen mit alter und neuer Fassung.</p>
    <ol class="ew-schritte">
      <li><strong>Wir sammeln</strong> AVV, Unterauftragnehmer, Zertifikate, Hosting-Orte, direkt beim Anbieter.</li>
      <li><strong>Wir sichern</strong> jede Fundstelle: SHA-256, Zeitstempel, Kopie im Webarchiv.</li>
      <li><strong>Wir melden</strong> Änderungen, auch wenn das Datum auf dem Dokument gleich bleibt.</li>
    </ol>
    <p class="ew-unterschied">Ein Text-Wächter meldet, dass sich eine Seite geändert hat. Wir prüfen zusätzlich, ob die Zusage stimmt, etwa ob der genannte Hosting-Ort zur Liste der Unterauftragnehmer passt. Betreiber in der EU, mit Namen im Impressum.</p>
    <p class="klein">Sie bewerten und zeichnen. Wir nicht: belegbar.eu gibt keine Rechtsberatung und kein Urteil.</p>
    <p class="ew-knoepfe"><a class="ew-knopf" href="fuer-kaeufer/">Preise und Ablauf</a> <a href="methodik/">So prüfen wir</a></p>
    <p class="frische klein">Stand <strong>${esc(datumDE(daten.stand))}</strong> · ${n} Anbieter in der Datenbank · ${n30 === 1 ? "1 Änderung" : `${n30} Änderungen`} in den letzten 30 Tagen · <a href="aenderungen/">Änderungsprotokoll</a></p>
  </div>
  <aside class="held-beleg ew-waechter" aria-label="Beispiel aus dem Änderungs-Wächter">
    <div class="beleg">
      <p class="ew-marke">Beispiel aus dem Änderungs-Wächter</p>
      <p><strong>Gleiches Datum, andere Fassung.</strong> ${esc(g.dokument)}: Auf dem Deckblatt steht in allen ${g.fassungen} Fassungen „${esc(g.deckblatt)}“.</p>
      <table class="ew-tab">
        <tr><th></th><th>Stand ${esc(g.alt.stand)}</th><th>Stand ${esc(g.neu.stand)}</th></tr>
        <tr><td>Seiten</td><td>${g.alt.seiten}</td><td>${g.neu.seiten}</td></tr>
        <tr><td>SHA-256</td><td><code title="${esc(g.alt.sha)}">${esc(kurz(g.alt.sha))}</code></td><td><code title="${esc(g.neu.sha)}">${esc(kurz(g.neu.sha))}</code></td></tr>
        <tr><td>Archiv</td><td><a href="${esc(g.alt.wayback)}" rel="noopener nofollow">Kopie</a></td><td><a href="${esc(g.neu.wayback)}" rel="noopener nofollow">Kopie</a></td></tr>
      </table>
      <p class="klein">Dazwischen u. a. korrigierte HealthBench-Werte (63.4 → 64.7). OpenAI vermerkt das offen im Änderungsprotokoll im PDF, das ist kein Vorwurf. Aber wer die Fassung vom 03.09. abgelegt hat, sieht an seiner Kopie nicht, dass sie nicht mehr gilt.</p>
    </div>
  </aside>
</section>`;
}

const STIL = `<style>
.ew-band { display: inline-block; background: #fff3c4; border: 1px dashed #b38f00; padding: 6px 12px; font: 500 13px/1.4 "IBM Plex Mono", monospace; margin: 12px 0 0; }
.ew-fuer { font: 500 13px/1.4 "IBM Plex Mono", monospace; text-transform: uppercase; letter-spacing: .06em; color: var(--stempel); margin: 0 0 6px; }
.ew-schritte { padding-left: 1.2em; margin: 14px 0; }
.ew-schritte li { margin: 4px 0; }
.ew-unterschied { margin: 10px 0; padding-left: 10px; border-left: 3px solid var(--stempel); }
.ew-knoepfe { margin: 16px 0 8px; display: flex; gap: 18px; align-items: center; }
.ew-knopf { background: var(--stempel); color: #fff !important; padding: 8px 16px; border-radius: 4px; text-decoration: none; font-weight: 600; }
.ew-held { grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr); align-items: start; }
.ew-held h1 { font-size: clamp(28px, 3.4vw, 40px); line-height: 1.15; }
.ew-waechter { transform: none; }
.ew-marke { font: 500 12px/1.4 "IBM Plex Mono", monospace; text-transform: uppercase; letter-spacing: .06em; color: var(--stempel); margin: 0 0 6px; }
.ew-tab { width: 100%; table-layout: fixed; min-width: 0 !important; border-collapse: collapse; font-size: 14px; margin: 8px 0; }
.ew-tab th:first-child { width: 26%; }
.ew-tab th, .ew-tab td { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; text-align: left; padding: 3px 6px; border-bottom: 1px solid var(--linie); }
</style>`;

function baueEntwurf(liveHtml, daten) {
  const muster = /<section class="held">[\s\S]*?<\/section>/;
  if (!muster.test(liveHtml)) throw new Error("Abschnitt .held nicht gefunden in docs/index.html");
  if (!daten || !daten.stand || !Array.isArray(daten.anbieter)) throw new Error("daten.json unvollständig");
  return liveHtml
    .replace(/<meta name="robots"[^>]*>\s*/g, "")
    .replace("<head>", `<head>\n<base href="../docs/">\n<meta name="robots" content="noindex,nofollow">`)
    .replace("</head>", `${STIL}\n</head>`)
    .replace(/<title>[^<]*<\/title>/, "<title>ENTWURF: belegbar.eu für Prüfer und DSB</title>")
    .replace(muster, () => kopf(daten));
}

if (require.main === module) {
  const wurzel = __dirname;
  const live = fs.readFileSync(path.join(wurzel, "docs", "index.html"), "utf8");
  const daten = JSON.parse(fs.readFileSync(path.join(wurzel, "docs", "daten.json"), "utf8"));
  const ziel = path.join(wurzel, "entwurf-startseite", "index.html");
  fs.mkdirSync(path.dirname(ziel), { recursive: true });
  fs.writeFileSync(ziel, baueEntwurf(live, daten));
  console.log(`geschrieben: ${ziel}`);
}

module.exports = { baueEntwurf, GPT6, aenderungen30 };
