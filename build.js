#!/usr/bin/env node
/**
 * belegt.eu — statischer Site-Generator, ohne Abhängigkeiten.
 * Liest data/anbieter/*.json und guides/*.html, schreibt die fertige Site nach docs/.
 * Aufruf: node build.js
 */
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, "data", "anbieter");
const GUIDES_DIR = path.join(ROOT, "guides");
const SRC_DIR = path.join(ROOT, "src");
const OUT = path.join(ROOT, "docs");

const SITE = {
  name: "belegt.eu",
  claim: "Souveräne KI-Anbieter aus Europa. Jede Angabe mit Quelle und Prüfdatum.",
  baseUrl: "https://belegt.eu",
  kontakt: "hallo@belegt.eu",
};

const KATEGORIE_LABEL = {
  "inference-api": "Inference-API",
  cloud: "Cloud / GPU",
  gateway: "Gateway / Router",
  "modell-anbieter": "Modell-Anbieter",
};

const STATUS_LABEL = { belegt: "belegt", beansprucht: "beansprucht", unbelegt: "unbelegt" };

/* ---------------- Helpers ---------------- */

function esc(s) {
  if (s === null || s === undefined) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function datumDE(iso) {
  if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return esc(iso || "");
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}

function eur(n) {
  if (n === null || n === undefined || isNaN(n)) return "–";
  return n.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
}

function statusBadge(status) {
  const s = STATUS_LABEL[status] ? status : "unbelegt";
  return `<span class="status s-${s}"><span class="dot" aria-hidden="true"></span>${STATUS_LABEL[s]}</span>`;
}

function quelleLink(quelle, geprueft) {
  const parts = [];
  if (quelle) parts.push(`<a href="${esc(quelle)}" rel="noopener nofollow" target="_blank">Quelle</a>`);
  if (geprueft) parts.push(`geprüft ${datumDE(geprueft)}`);
  return parts.length ? `<span class="quelle">${parts.join(" · ")}</span>` : "";
}

/** Eine Beleg-Zeile: das Grundelement der Site. */
function belegZeile(label, wertHtml, feld, geprueft) {
  const status = (feld && feld.status) || "unbelegt";
  const anm = feld && feld.anmerkung ? `<div class="beleg-anm">${esc(feld.anmerkung)}</div>` : "";
  return `<div class="beleg">
    <div class="beleg-kopf"><span class="beleg-label">${esc(label)}</span>${statusBadge(status)}</div>
    <div class="beleg-wert">${wertHtml || '<span class="leer">keine belastbare Angabe gefunden</span>'}</div>
    ${anm}
    <div class="beleg-fuss">${quelleLink(feld && feld.quelle, geprueft)}</div>
  </div>`;
}

/** Anteil belegter Statusfelder eines Anbieters (0..1). */
function belegQuote(p) {
  let total = 0, ok = 0;
  const count = (st) => { total++; if (st === "belegt") ok++; };
  for (const k of ["avv", "subprozessoren", "training_opt_out", "zero_data_retention"]) {
    if (p.vertrag && p.vertrag[k]) count(p.vertrag[k].status);
  }
  (p.zertifikate || []).forEach((z) => count(z.status));
  (p.ai_act || []).forEach((a) => count(a.status));
  (p.modelle || []).forEach((m) => count(m.status));
  return total ? ok / total : 0;
}

function guenstigsterPreis(p) {
  const preise = (p.modelle || [])
    .map((m) => m.preis_input_1m_eur)
    .filter((v) => typeof v === "number" && !isNaN(v));
  return preise.length ? Math.min(...preise) : null;
}

function zertifikateBelegt(p) {
  return (p.zertifikate || []).filter((z) => z.status === "belegt").map((z) => z.typ);
}

/* ---------------- Layout ---------------- */

function layout({ titel, beschreibung, inhalt, rel, pfad, jsonld }) {
  const nav = [
    ["", "Anbieter"],
    ["vergleich/", "Vergleiche"],
    ["ratgeber/", "Ratgeber"],
    ["methodik/", "Methodik"],
    ["ueber/", "Über"],
  ]
    .map(([href, label]) => {
      const aktiv = pfad === href ? ' aria-current="page"' : "";
      return `<a href="${rel}${href}"${aktiv}>${label}</a>`;
    })
    .join("");

  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titel)}</title>
<meta name="description" content="${esc(beschreibung)}">
<link rel="canonical" href="${SITE.baseUrl}/${pfad}">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='14' fill='%235F4B9E'/%3E%3Ctext x='50' y='68' font-size='58' text-anchor='middle' fill='white' font-family='Georgia'%3Eb%3C/text%3E%3C/svg%3E">
<link rel="stylesheet" href="${rel}fonts.css">
<link rel="stylesheet" href="${rel}style.css">
${jsonld ? `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>` : ""}
</head>
<body>
<a class="skip" href="#inhalt">Zum Inhalt springen</a>
<header class="kopf">
  <div class="shell kopf-innen">
    <a class="marke" href="${rel}"><span class="marke-wort">belegt</span><span class="marke-tld">.eu</span></a>
    <nav aria-label="Hauptnavigation">${nav}</nav>
  </div>
</header>
<main id="inhalt" class="shell">
${inhalt}
</main>
<footer class="fuss">
  <div class="shell">
    <p><strong>belegt.eu</strong> — ${esc(SITE.claim)}</p>
    <p>Statusstufen: <span class="status s-belegt"><span class="dot"></span>belegt</span> = Primärquelle verlinkt · <span class="status s-beansprucht"><span class="dot"></span>beansprucht</span> = Anbieterangabe ohne Dokument · <span class="status s-unbelegt"><span class="dot"></span>unbelegt</span> = keine belastbare Angabe gefunden. Details in der <a href="${rel}methodik/">Methodik</a>.</p>
    <p>Keine Rechtsberatung. Fehler gefunden? <a href="mailto:${SITE.kontakt}">${SITE.kontakt}</a> · <a href="${rel}ueber/">Impressum &amp; Über</a></p>
  </div>
</footer>
</body>
</html>`;
}

/* ---------------- Seiten ---------------- */

function seiteIndex(providers) {
  const zeilen = providers
    .map((p) => {
      const quote = Math.round(belegQuote(p) * 100);
      const preis = guenstigsterPreis(p);
      const zerts = zertifikateBelegt(p);
      const optOut = p.vertrag && p.vertrag.training_opt_out;
      return `<tr data-land="${esc(p.stammdaten.land)}" data-kategorie="${esc(p.kategorie)}" data-avv="${p.vertrag && p.vertrag.avv && p.vertrag.avv.status === "belegt" ? "1" : "0"}" data-name="${esc(p.name.toLowerCase())}">
        <td><a href="anbieter/${esc(p.id)}/">${esc(p.name)}</a><span class="klein">${esc(p.stammdaten.sitz || "")}</span></td>
        <td>${esc(p.stammdaten.land)}</td>
        <td>${esc(KATEGORIE_LABEL[p.kategorie] || p.kategorie)}</td>
        <td class="num">${preis === null ? "–" : "ab " + eur(preis)}</td>
        <td>${zerts.length ? zerts.map((z) => `<span class="zert">${esc(z)}</span>`).join(" ") : '<span class="leer">–</span>'}</td>
        <td>${optOut && optOut.wert === true ? statusBadge(optOut.status) : optOut && optOut.wert === false ? '<span class="warnung">trainiert mit Daten</span>' : '<span class="leer">unbelegt</span>'}</td>
        <td class="num"><span class="quote">${quote}&nbsp;%</span></td>
      </tr>`;
    })
    .join("\n");

  const laender = [...new Set(providers.map((p) => p.stammdaten.land))].sort();
  const kategorien = [...new Set(providers.map((p) => p.kategorie))].sort();

  const beispiel = providers[0];
  const heroBeleg = beispiel
    ? belegZeile(
        `${beispiel.name} — AVV / Auftragsverarbeitung`,
        beispiel.vertrag && beispiel.vertrag.avv && beispiel.vertrag.avv.wert
          ? `<a href="${esc(beispiel.vertrag.avv.wert)}" rel="noopener nofollow" target="_blank">Vertragsdokument ansehen</a>`
          : "",
        beispiel.vertrag && beispiel.vertrag.avv,
        beispiel.geprueft
      )
    : "";

  const inhalt = `
<section class="held">
  <div class="held-text">
    <h1>Wem dürfen Sie Ihre Daten geben?<br>Wir belegen es.</h1>
    <p class="held-claim">${providers.length} europäische KI-Anbieter, geprüft Feld für Feld: Hosting-Standorte, Preise, AVV, Zertifikate, AI-Act-Nachweise — <strong>jede Angabe mit Quelle und Prüfdatum</strong>. Was wir nicht belegen können, steht hier auch: als „unbelegt“.</p>
  </div>
  <div class="held-beleg" aria-hidden="true">${heroBeleg}</div>
</section>

<section aria-label="Anbieter filtern">
  <div class="filter" role="search">
    <input type="search" id="f-suche" placeholder="Anbieter suchen …" aria-label="Anbieter suchen">
    <select id="f-land" aria-label="Nach Land filtern"><option value="">Alle Länder</option>${laender.map((l) => `<option>${esc(l)}</option>`).join("")}</select>
    <select id="f-kat" aria-label="Nach Kategorie filtern"><option value="">Alle Kategorien</option>${kategorien.map((k) => `<option value="${esc(k)}">${esc(KATEGORIE_LABEL[k] || k)}</option>`).join("")}</select>
    <label class="check"><input type="checkbox" id="f-avv"> nur mit belegtem AVV</label>
    <span id="f-anzahl" class="klein" role="status"></span>
  </div>
  <div class="tabelle-scroll">
    <table id="anbieter-tabelle">
      <thead><tr>
        <th>Anbieter</th><th>Land</th><th>Kategorie</th><th class="num">Preis / 1M Input</th><th>Zertifikate (belegt)</th><th>Training-Opt-out</th><th class="num" title="Anteil der Angaben mit verlinkter Primärquelle">Beleg-Quote</th>
      </tr></thead>
      <tbody>${zeilen}</tbody>
    </table>
  </div>
</section>

<script>
(function () {
  var suche = document.getElementById("f-suche");
  var land = document.getElementById("f-land");
  var kat = document.getElementById("f-kat");
  var avv = document.getElementById("f-avv");
  var anzahl = document.getElementById("f-anzahl");
  var zeilen = Array.prototype.slice.call(document.querySelectorAll("#anbieter-tabelle tbody tr"));
  function filtern() {
    var q = suche.value.trim().toLowerCase();
    var n = 0;
    zeilen.forEach(function (tr) {
      var zeig =
        (!q || tr.dataset.name.indexOf(q) !== -1) &&
        (!land.value || tr.dataset.land === land.value) &&
        (!kat.value || tr.dataset.kategorie === kat.value) &&
        (!avv.checked || tr.dataset.avv === "1");
      tr.style.display = zeig ? "" : "none";
      if (zeig) n++;
    });
    anzahl.textContent = n + " von " + zeilen.length + " Anbietern";
  }
  [suche, land, kat, avv].forEach(function (el) { el.addEventListener("input", filtern); });
  filtern();
})();
</script>`;

  const jsonld = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "belegt.eu — Evidenz-Datenbank europäischer KI-Anbieter",
    description: SITE.claim,
    url: SITE.baseUrl,
    creator: { "@type": "Organization", name: "belegt.eu" },
  };

  return layout({
    titel: "belegt.eu — Souveräne KI-Anbieter aus Europa, mit Quelle und Prüfdatum",
    beschreibung: `${providers.length} europäische KI-Anbieter im Vergleich: Hosting, Preise, AVV, Zertifikate, AI-Act-Nachweise — jede Angabe belegt oder ehrlich als unbelegt markiert.`,
    inhalt, rel: "./", pfad: "", jsonld,
  });
}

function seiteAnbieter(p) {
  const s = p.stammdaten;
  const modelle = (p.modelle || [])
    .map((m) => `<tr>
      <td>${esc(m.name)}</td>
      <td>${m.standort ? esc(m.standort) : '<span class="leer">unbelegt</span>'}</td>
      <td class="num">${eur(m.preis_input_1m_eur)}</td>
      <td class="num">${eur(m.preis_output_1m_eur)}</td>
      <td>${statusBadge(m.status)} ${m.quelle ? `<a class="klein" href="${esc(m.quelle)}" rel="noopener nofollow" target="_blank">Quelle</a>` : ""}${m.anmerkung ? `<span class="klein">${esc(m.anmerkung)}</span>` : ""}</td>
    </tr>`)
    .join("\n");

  const v = p.vertrag || {};
  const vertragHtml = [
    belegZeile("AVV / Auftragsverarbeitungsvertrag", v.avv && v.avv.wert ? `<a href="${esc(v.avv.wert)}" rel="noopener nofollow" target="_blank">Vertragsdokument</a>` : "", v.avv, p.geprueft),
    belegZeile("Subprozessoren-Liste", v.subprozessoren && v.subprozessoren.wert ? `<a href="${esc(v.subprozessoren.wert)}" rel="noopener nofollow" target="_blank">Liste ansehen</a>` : "", v.subprozessoren, p.geprueft),
    belegZeile("Kein Training mit Kundendaten", v.training_opt_out ? (v.training_opt_out.wert === true ? "Ja — Kundendaten werden nicht zum Training genutzt" : v.training_opt_out.wert === false ? "Nein — Anbieter trainiert mit Kundendaten (oder nur mit Opt-out)" : "") : "", v.training_opt_out, p.geprueft),
    belegZeile("Zero Data Retention", v.zero_data_retention ? (v.zero_data_retention.wert === true ? "Ja — keine Speicherung der Anfragen" : v.zero_data_retention.wert === false ? "Nein — Anfragen werden (zeitweise) gespeichert" : "") : "", v.zero_data_retention, p.geprueft),
  ].join("\n");

  const zertHtml = (p.zertifikate || []).length
    ? p.zertifikate.map((z) => belegZeile(z.typ, z.status === "belegt" ? "Nachweis verlinkt" : "", z, p.geprueft)).join("\n")
    : '<p class="leer">Zu diesem Anbieter haben wir noch keine Zertifikats-Nachweise erfasst.</p>';

  const aiActHtml = (p.ai_act || []).length
    ? p.ai_act.map((a) => belegZeile(a.pflicht, "", a, p.geprueft)).join("\n")
    : '<p class="leer">Noch keine AI-Act-Nachweise erfasst.</p>';

  const quote = Math.round(belegQuote(p) * 100);

  const inhalt = `
<nav class="brotkrumen" aria-label="Pfad"><a href="../../">Anbieter</a> / ${esc(p.name)}</nav>
<article class="dossier">
  <header class="dossier-kopf">
    <div>
      <h1>${esc(p.name)}</h1>
      <p class="dossier-sub">${esc(p.kurzbeschreibung || "")}</p>
    </div>
    <div class="stempel" aria-label="Beleg-Quote ${quote} Prozent"><span class="stempel-zahl">${quote}&nbsp;%</span><span class="stempel-text">belegt</span></div>
  </header>

  <h2>Stammdaten</h2>
  <dl class="stammdaten">
    <div><dt>Sitz</dt><dd>${esc(s.sitz || "–")}</dd></div>
    <div><dt>Kategorie</dt><dd>${esc(KATEGORIE_LABEL[p.kategorie] || p.kategorie)}</dd></div>
    <div><dt>Mutterkonzern</dt><dd>${esc(s.mutterkonzern || "unabhängig / keiner bekannt")}</dd></div>
    <div><dt>US-Eigentümerstruktur</dt><dd>${s.us_eigner === true ? '<span class="warnung">ja — CLOUD-Act-Relevanz prüfen</span>' : s.us_eigner === false ? "nein" : "unbelegt"}</dd></div>
    <div><dt>Gegründet</dt><dd>${esc(s.gegruendet || "–")}</dd></div>
    <div><dt>Website</dt><dd><a href="${esc(s.website)}" rel="noopener nofollow" target="_blank">${esc((s.website || "").replace(/^https?:\/\//, ""))}</a></dd></div>
  </dl>

  <h2>Modelle &amp; Preise</h2>
  ${(p.modelle || []).length ? `<div class="tabelle-scroll"><table>
    <thead><tr><th>Modell</th><th>Hosting-Standort</th><th class="num">Input / 1M</th><th class="num">Output / 1M</th><th>Beleg</th></tr></thead>
    <tbody>${modelle}</tbody>
  </table></div>` : '<p class="leer">Noch keine Modelldaten erfasst.</p>'}

  <h2>Vertrag &amp; Datenschutz</h2>
  ${vertragHtml}

  <h2>Zertifikate</h2>
  ${zertHtml}

  <h2>AI Act</h2>
  ${aiActHtml}

  <footer class="dossier-fuss">
    <p>Zuletzt geprüft am ${datumDE(p.geprueft)}. Alle Angaben ohne Gewähr, keine Rechtsberatung.</p>
    <p><strong>Sie arbeiten bei ${esc(p.name)}?</strong> Schicken Sie uns fehlende Nachweise und erhalten Sie den Verified-Status: <a href="mailto:${SITE.kontakt}?subject=Verifizierung%20${encodeURIComponent(p.name)}">${SITE.kontakt}</a></p>
  </footer>
</article>`;

  return layout({
    titel: `${p.name} — DSGVO, Hosting, Preise & Zertifikate im Beleg-Check | belegt.eu`,
    beschreibung: `${p.name}: ${p.kurzbeschreibung || ""} Beleg-Quote ${quote} %. Alle Angaben mit Quelle und Prüfdatum.`,
    inhalt, rel: "../../", pfad: `anbieter/${p.id}/`,
  });
}

function seiteVergleich(a, b) {
  const zeile = (label, fa, fb) => `<tr><th scope="row">${label}</th><td>${fa}</td><td>${fb}</td></tr>`;
  const feld = (p, k) => {
    const f = p.vertrag && p.vertrag[k];
    if (!f) return '<span class="leer">unbelegt</span>';
    let wert = "";
    if (k === "training_opt_out" || k === "zero_data_retention") wert = f.wert === true ? "ja" : f.wert === false ? "nein" : "?";
    else wert = f.wert ? `<a href="${esc(f.wert)}" rel="noopener nofollow" target="_blank">Dokument</a>` : "–";
    return `${wert} ${statusBadge(f.status)}`;
  };
  const zerts = (p) => zertifikateBelegt(p).map((z) => `<span class="zert">${esc(z)}</span>`).join(" ") || '<span class="leer">keine belegt</span>';
  const preis = (p) => { const v = guenstigsterPreis(p); return v === null ? "–" : "ab " + eur(v) + " / 1M Input"; };

  const inhalt = `
<nav class="brotkrumen" aria-label="Pfad"><a href="../../">Anbieter</a> / <a href="../">Vergleiche</a> / ${esc(a.name)} vs. ${esc(b.name)}</nav>
<h1>${esc(a.name)} vs. ${esc(b.name)}</h1>
<p class="klein">Direkter Beleg-Vergleich, Stand ${datumDE(a.geprueft)} / ${datumDE(b.geprueft)}. Vollständige Nachweise in den Profilen: <a href="../../anbieter/${esc(a.id)}/">${esc(a.name)}</a> · <a href="../../anbieter/${esc(b.id)}/">${esc(b.name)}</a></p>
<div class="tabelle-scroll"><table class="vergleich">
  <thead><tr><th></th><th>${esc(a.name)}</th><th>${esc(b.name)}</th></tr></thead>
  <tbody>
    ${zeile("Sitz", esc(a.stammdaten.sitz || "–"), esc(b.stammdaten.sitz || "–"))}
    ${zeile("Kategorie", esc(KATEGORIE_LABEL[a.kategorie] || a.kategorie), esc(KATEGORIE_LABEL[b.kategorie] || b.kategorie))}
    ${zeile("US-Eigentümer", a.stammdaten.us_eigner ? '<span class="warnung">ja</span>' : "nein", b.stammdaten.us_eigner ? '<span class="warnung">ja</span>' : "nein")}
    ${zeile("Günstigstes Modell", preis(a), preis(b))}
    ${zeile("AVV", feld(a, "avv"), feld(b, "avv"))}
    ${zeile("Subprozessoren-Liste", feld(a, "subprozessoren"), feld(b, "subprozessoren"))}
    ${zeile("Kein Training mit Kundendaten", feld(a, "training_opt_out"), feld(b, "training_opt_out"))}
    ${zeile("Zero Data Retention", feld(a, "zero_data_retention"), feld(b, "zero_data_retention"))}
    ${zeile("Zertifikate (belegt)", zerts(a), zerts(b))}
    ${zeile("Beleg-Quote", Math.round(belegQuote(a) * 100) + " %", Math.round(belegQuote(b) * 100) + " %")}
  </tbody>
</table></div>`;

  return layout({
    titel: `${a.name} vs. ${b.name}: DSGVO, Preise, Zertifikate | belegt.eu`,
    beschreibung: `${a.name} oder ${b.name}? Direkter Vergleich mit belegten Quellen: AVV, Hosting, Preise, Zertifikate, AI-Act-Nachweise.`,
    inhalt, rel: "../../", pfad: `vergleich/${a.id}-vs-${b.id}/`,
  });
}

function seiteVergleichIndex(paare) {
  const liste = paare
    .map(([a, b]) => `<li><a href="${esc(a.id)}-vs-${esc(b.id)}/">${esc(a.name)} vs. ${esc(b.name)}</a> <span class="klein">${esc(KATEGORIE_LABEL[a.kategorie] || a.kategorie)}</span></li>`)
    .join("\n");
  const inhalt = `
<h1>Direktvergleiche</h1>
<p>Jeder Vergleich stellt zwei Anbieter derselben Kategorie Feld für Feld gegenüber — mit Beleg-Status pro Angabe.</p>
<ul class="vergleich-liste">${liste}</ul>`;
  return layout({
    titel: "Anbieter-Direktvergleiche | belegt.eu",
    beschreibung: "Europäische KI-Anbieter im direkten Vergleich: AVV, Hosting, Preise, Zertifikate — jede Angabe mit Beleg-Status.",
    inhalt, rel: "../", pfad: "vergleich/",
  });
}

function seiteRatgeber(guides) {
  const liste = guides
    .map((g) => `<li><a href="${esc(g.slug)}/"><strong>${esc(g.titel)}</strong></a><p class="klein">${esc(g.beschreibung)}</p></li>`)
    .join("\n");
  const inhalt = `
<h1>Ratgeber</h1>
<p>Kompakte Orientierung zu DSGVO, AI Act und Zertifikaten beim Einsatz von KI-Anbietern — geschrieben für Entscheider, nicht für Juristen. Keine Rechtsberatung.</p>
<ul class="ratgeber-liste">${liste}</ul>`;
  return layout({
    titel: "Ratgeber: DSGVO, AI Act & Zertifikate für KI-Einsatz | belegt.eu",
    beschreibung: "Verständliche Guides zu AI-Act-Pflichten, DSGVO-konformer KI-Nutzung, CLOUD Act und KI-Zertifikaten.",
    inhalt, rel: "../", pfad: "ratgeber/",
  });
}

function seiteGuide(g) {
  const inhalt = `
<nav class="brotkrumen" aria-label="Pfad"><a href="../../">Anbieter</a> / <a href="../">Ratgeber</a> / ${esc(g.titel)}</nav>
<article class="artikel">
${g.html}
<footer class="dossier-fuss"><p>Stand: August 2026. Keine Rechtsberatung — für verbindliche Auskünfte wenden Sie sich an Fachanwälte oder Ihre Datenschutzbeauftragten.</p></footer>
</article>`;
  const jsonld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.titel,
    description: g.beschreibung,
    inLanguage: "de",
    publisher: { "@type": "Organization", name: "belegt.eu" },
  };
  return layout({
    titel: `${g.titel} | belegt.eu`,
    beschreibung: g.beschreibung,
    inhalt, rel: "../../", pfad: `ratgeber/${g.slug}/`, jsonld,
  });
}

function seiteMethodik() {
  const inhalt = `
<article class="artikel">
<h1>Methodik: Was „belegt“ bei uns heißt</h1>
<p>belegt.eu ist eine Evidenz-Datenbank, keine Bestenliste. Wir bewerten nicht, wir belegen — und wo wir nichts belegen können, sagen wir das.</p>

<h2>Die drei Statusstufen</h2>
${belegZeile("belegt", "Die Angabe ist durch ein Primärdokument oder eine offizielle, konkrete Anbieterseite nachgewiesen — Vertragsdokument, Audit-Zertifikat, Preisliste, Subprozessorenliste. Die Quelle ist direkt verlinkt.", { status: "belegt" }, null)}
${belegZeile("beansprucht", "Der Anbieter behauptet die Eigenschaft auf Marketing-Seiten, wir haben aber kein prüfbares Dokument gefunden. Das ist kein Vorwurf — aber ein Unterschied, den Einkäufer und Datenschutzbeauftragte kennen sollten.", { status: "beansprucht" }, null)}
${belegZeile("unbelegt", "Wir haben keine belastbare Angabe gefunden. Auch das ist eine Information: Ein Anbieter, dessen AVV nicht auffindbar ist, macht Ihnen die Compliance-Arbeit schwer.", { status: "unbelegt" }, null)}

<h2>Beleg-Quote</h2>
<p>Die Beleg-Quote eines Anbieters ist der Anteil seiner erfassten Angaben mit Status „belegt“. Sie misst <em>Nachweisbarkeit, nicht Qualität</em> — ein junger Anbieter mit ehrlicher Dokumentation kann eine höhere Quote haben als ein Konzern mit verstreuten PDFs.</p>

<h2>Prüfdatum und Korrekturen</h2>
<p>Jede Angabe trägt das Datum ihrer letzten Prüfung. Anbieterangaben ändern sich — wenn Sie einen Fehler finden, schreiben Sie an <a href="mailto:${SITE.kontakt}">${SITE.kontakt}</a>; wir prüfen und korrigieren mit neuem Prüfdatum.</p>

<h2>Verified-Status</h2>
<p>Anbieter, die uns fehlende Nachweise direkt zusenden, erhalten den Verified-Status mit Datum. Die Aufnahme in die Datenbank selbst ist unabhängig davon und nicht käuflich.</p>

<h2>Unabhängigkeit</h2>
<p>belegt.eu betreibt keine eigene KI-Infrastruktur und ist an keinem gelisteten Anbieter beteiligt. Etwaige künftige Sponsorings werden als solche gekennzeichnet und haben keinen Einfluss auf Statusbewertungen.</p>
</article>`;
  return layout({
    titel: "Methodik — was „belegt“ heißt | belegt.eu",
    beschreibung: "Wie belegt.eu prüft: die drei Statusstufen belegt/beansprucht/unbelegt, die Beleg-Quote und der Umgang mit Korrekturen.",
    inhalt, rel: "../", pfad: "methodik/",
  });
}

function seiteUeber() {
  const inhalt = `
<article class="artikel">
<h1>Über belegt.eu</h1>
<p>Seit dem 2. August 2026 wird der EU AI Act mit Bußgeldern durchgesetzt. Gleichzeitig werben Dutzende europäische KI-Anbieter mit „souverän“ und „DSGVO-konform“ — aber wer das prüfen will, findet Marketing statt Dokumente. belegt.eu schließt diese Lücke: eine neutrale Datenbank, in der jede Angabe eine Quelle und ein Prüfdatum hat.</p>
<h2>Kontakt</h2>
<p><a href="mailto:${SITE.kontakt}">${SITE.kontakt}</a></p>
<h2>Impressum</h2>
<p class="leer">[Impressum vor Veröffentlichung ergänzen: Name, Anschrift, Kontakt — Pflicht nach § 5 DDG.]</p>
<h2>Datenschutz</h2>
<p>Diese Website setzt keine Cookies, lädt keine Tracker, bindet keine Drittanbieter-Dienste ein (auch Schriften werden lokal ausgeliefert) und speichert keine personenbezogenen Daten. Beim Aufruf fallen lediglich die technisch notwendigen Server-Logs des Hosters an.</p>
</article>`;
  return layout({
    titel: "Über & Impressum | belegt.eu",
    beschreibung: "Warum es belegt.eu gibt, wer dahinter steht und wie Sie uns erreichen.",
    inhalt, rel: "../", pfad: "ueber/",
  });
}

/* ---------------- Build ---------------- */

function leseAnbieter() {
  if (!fs.existsSync(DATA_DIR)) return [];
  return fs
    .readdirSync(DATA_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const p = JSON.parse(fs.readFileSync(path.join(DATA_DIR, f), "utf8"));
      if (!p.id || !p.name || !p.stammdaten) throw new Error(`Ungültige Anbieterdatei: ${f}`);
      return p;
    })
    .sort((a, b) => a.name.localeCompare(b.name, "de"));
}

function leseGuides() {
  if (!fs.existsSync(GUIDES_DIR)) return [];
  return fs
    .readdirSync(GUIDES_DIR)
    .filter((f) => f.endsWith(".html"))
    .sort()
    .map((f) => {
      const raw = fs.readFileSync(path.join(GUIDES_DIR, f), "utf8");
      const m = raw.match(/^<!--META\s*(\{[\s\S]*?\})\s*-->/);
      if (!m) throw new Error(`Guide ohne META-Kopf: ${f}`);
      const meta = JSON.parse(m[1]);
      return { ...meta, html: raw.slice(m[0].length).trim() };
    });
}

function schreibe(pfad, html) {
  const voll = path.join(OUT, pfad);
  fs.mkdirSync(path.dirname(voll), { recursive: true });
  fs.writeFileSync(voll, html);
}

function main() {
  const providers = leseAnbieter();
  const guides = leseGuides();

  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });

  // Statisches
  fs.copyFileSync(path.join(SRC_DIR, "style.css"), path.join(OUT, "style.css"));
  fs.copyFileSync(path.join(SRC_DIR, "fonts.css"), path.join(OUT, "fonts.css"));
  fs.mkdirSync(path.join(OUT, "fonts"), { recursive: true });
  for (const f of fs.readdirSync(path.join(SRC_DIR, "fonts")))
    fs.copyFileSync(path.join(SRC_DIR, "fonts", f), path.join(OUT, "fonts", f));
  fs.writeFileSync(path.join(OUT, ".nojekyll"), "");
  fs.writeFileSync(path.join(OUT, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${SITE.baseUrl}/sitemap.xml\n`);

  // Seiten
  schreibe("index.html", seiteIndex(providers));
  providers.forEach((p) => schreibe(`anbieter/${p.id}/index.html`, seiteAnbieter(p)));

  const paare = [];
  for (let i = 0; i < providers.length; i++)
    for (let j = i + 1; j < providers.length; j++)
      if (providers[i].kategorie === providers[j].kategorie) paare.push([providers[i], providers[j]]);
  paare.forEach(([a, b]) => schreibe(`vergleich/${a.id}-vs-${b.id}/index.html`, seiteVergleich(a, b)));
  schreibe("vergleich/index.html", seiteVergleichIndex(paare));

  schreibe("ratgeber/index.html", seiteRatgeber(guides));
  guides.forEach((g) => schreibe(`ratgeber/${g.slug}/index.html`, seiteGuide(g)));

  schreibe("methodik/index.html", seiteMethodik());
  schreibe("ueber/index.html", seiteUeber());

  // Sitemap
  const urls = ["", "vergleich/", "ratgeber/", "methodik/", "ueber/"]
    .concat(providers.map((p) => `anbieter/${p.id}/`))
    .concat(paare.map(([a, b]) => `vergleich/${a.id}-vs-${b.id}/`))
    .concat(guides.map((g) => `ratgeber/${g.slug}/`));
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url><loc>${SITE.baseUrl}/${u}</loc></url>`)
    .join("\n")}\n</urlset>\n`;
  fs.writeFileSync(path.join(OUT, "sitemap.xml"), sitemap);

  console.log(`OK: ${providers.length} Anbieter, ${paare.length} Vergleiche, ${guides.length} Guides -> docs/`);
}

main();
