#!/usr/bin/env node
/**
 * belegbar.eu — statischer Site-Generator, ohne Abhängigkeiten.
 * Liest data/anbieter/*.json und guides/*.html, schreibt die fertige Site nach docs/.
 * Aufruf: node build.js
 */
"use strict";

const fs = require("fs");
const path = require("path");
const A = require("./lib/aenderungen.js");

const ROOT = __dirname;
const REPO_URL = "https://github.com/Felix3c/belegt";
const DATA_DIR = path.join(ROOT, "data", "anbieter");
const GUIDES_DIR = path.join(ROOT, "guides");
const SRC_DIR = path.join(ROOT, "src");
const OUT = path.join(ROOT, "docs");

const SITE = {
  name: "belegbar.eu",
  claim: "Souveräne KI-Anbieter aus Europa. Jede Angabe mit Quelle und Prüfdatum.",
  baseUrl: "https://belegbar.eu",
  kontakt: "hallo@belegbar.eu",
};

const KATEGORIE_LABEL = {
  "inference-api": "Inference-API",
  cloud: "Cloud / GPU",
  gateway: "Gateway / Router",
  "modell-anbieter": "Modell-Anbieter",
};

const STATUS_LABEL = { belegt: "belegt", beansprucht: "beansprucht", unbelegt: "unbelegt" };

/** Baudatum. Über BUILD_DATUM überschreibbar, damit ein Build reproduzierbar bleibt. */
const BUILD_DATUM = process.env.BUILD_DATUM || new Date().toISOString().slice(0, 10);

/** Ledger: Inhalts-Hash je URL. Das lastmod einer Seite wandert nur, wenn ihr HTML wandert. */
const LEDGER_DATEI = path.join(ROOT, "data", "lastmod.json");

/** Kanonische Zertifikats-Schlüssel. Der Originaltext des Anbieters bleibt überall sichtbar —
 *  normalisiert wird ausschließlich für Filter, Facettenseiten und die Rohdaten-Auswertung.
 *  Ohne das zählen "ISO 27001" und "ISO/IEC 27001:2022" als zwei verschiedene Dinge. */
const ZERT_KANON = [
  ["ISO(/IEC)? *27001", "iso-27001", "ISO/IEC 27001"],
  ["ISO(/IEC)? *27017", "iso-27017", "ISO/IEC 27017"],
  ["ISO(/IEC)? *27018", "iso-27018", "ISO/IEC 27018"],
  ["ISO(/IEC)? *27701", "iso-27701", "ISO/IEC 27701"],
  ["ISO(/IEC)? *20000", "iso-20000", "ISO/IEC 20000-1"],
  ["ISO *9001", "iso-9001", "ISO 9001"],
  ["ISO *14001", "iso-14001", "ISO 14001"],
  ["ISO *50001", "iso-50001", "ISO 50001"],
  ["BSI *C5|(^|[^A-Za-z0-9])C5([^A-Za-z0-9]|$)", "bsi-c5", "BSI C5"],
  ["SecNumCloud", "secnumcloud", "SecNumCloud"],
  ["TISAX", "tisax", "TISAX"],
  ["(^|[^A-Za-z0-9])HDS([^A-Za-z0-9]|$)", "hds", "HDS (Gesundheitsdaten, Frankreich)"],
  ["CSA *STAR", "csa-star", "CSA STAR"],
  ["PCI *DSS", "pci-dss", "PCI DSS"],
  ["HIPAA", "hipaa", "HIPAA"],
  ["SOC *1", "soc-1", "SOC 1"],
  ["SOC *2|ISAE *3000", "soc-2", "SOC 2"],
  ["SOC *3", "soc-3", "SOC 3"],
  ["ISAE *3402", "isae-3402", "ISAE 3402"],
  ["B *Corp", "b-corp", "B Corp"],
].map(([muster, schluessel, label]) => [new RegExp(muster, "i"), schluessel, label]);

/** Rechtsgrundlage der Datenübermittlung nach Sitzland des Anbieters.
 *  Quelle: Europäische Kommission, Angemessenheitsbeschlüsse — geprüft am ADEQUACY_GEPRUEFT. */
const ADEQUACY_QUELLE = "https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/adequacy-decisions_en";
const ADEQUACY_GEPRUEFT = "2026-08-24";
const LAND_INFO = {
  DE: { name: "Deutschland", raum: "eu" },
  FR: { name: "Frankreich", raum: "eu" },
  NL: { name: "Niederlande", raum: "eu" },
  LU: { name: "Luxemburg", raum: "eu" },
  EE: { name: "Estland", raum: "eu" },
  SE: { name: "Schweden", raum: "eu" },
  IT: { name: "Italien", raum: "eu" },
  CH: { name: "Schweiz", raum: "angemessen" },
  GB: { name: "Vereinigtes Königreich", raum: "angemessen", hinweis: "Der Angemessenheitsbeschluss wurde im Dezember 2025 verlängert — je eine Erneuerung unter der DSGVO und unter der Richtlinie für den Strafverfolgungsbereich (LED)." },
};
const RAUM_TEXT = {
  eu: "EU-Mitgliedstaat — keine Drittlandübermittlung, Art. 44 ff. DSGVO greift nicht.",
  angemessen: "Drittland mit Angemessenheitsbeschluss der EU-Kommission — Übermittlung ohne zusätzliche Garantien zulässig (Art. 45 DSGVO).",
  drittland: "Drittland ohne Angemessenheitsbeschluss — Übermittlung nur mit geeigneten Garantien, etwa Standardvertragsklauseln (Art. 46 DSGVO).",
};
/** Stabile ID des einen Datensatzes. Unterseiten verweisen nur darauf, statt ihn zu wiederholen:
 *  Ein eingebettetes Objekt mit "@type" waere fuer einen Parser eine NEUE Entitaet und muesste
 *  alle Pflichtfelder tragen — ein reiner "@id"-Verweis ist dagegen nur ein Zeiger. */
const DATASET_ID = SITE.baseUrl + "/#dataset";

const RAUM_KURZ = { eu: "EU", angemessen: "Angemessenheitsbeschluss", drittland: "Drittland ohne Beschluss" };

function landInfo(code) {
  return LAND_INFO[code] || { name: code, raum: "drittland" };
}

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

/** Verified-Stempel: nur wenn der Anbieter Nachweise eingereicht hat und wir sie geprüft haben. */
function verifiedStempel(p, rel) {
  if (!p.verified || !p.verified.datum) return "";
  return `<div class="stempel stempel-verified" title="${esc(p.verified.anmerkung || "Anbieter hat Nachweise eingereicht, von uns geprüft")}"><span class="stempel-zahl">✓</span><span class="stempel-text">Verified<br>${datumDE(p.verified.datum)}</span><a class="stempel-link" href="${rel}methodik/#verified">Was heißt das?</a></div>`;
}

function verifiedMini(p) {
  if (!p.verified || !p.verified.datum) return "";
  return ` <span class="verified-mini" title="Verified am ${datumDE(p.verified.datum)} — Anbieter hat Nachweise eingereicht, von uns geprüft">✓&nbsp;Verified</span>`;
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
  // Ein einzeln nachgeprüftes Feld trägt sein eigenes Datum; sonst gilt das Profil-Prüfdatum.
  const datum = (feld && feld.geprueft) || geprueft;
  const anm = feld && feld.anmerkung ? `<div class="beleg-anm">${esc(feld.anmerkung)}</div>` : "";
  return `<div class="beleg">
    <div class="beleg-kopf"><span class="beleg-label">${esc(label)}</span>${statusBadge(status)}</div>
    <div class="beleg-wert">${wertHtml || '<span class="leer">keine belastbare Angabe gefunden</span>'}</div>
    ${anm}
    <div class="beleg-fuss">${quelleLink(feld && feld.quelle, datum)}</div>
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

/** Ein Feld kann mehrere Normen auf einmal nennen ("SOC 1/2/3", "ISO 27017 / 27018").
 *  Solche Listen expandieren wir, damit jede Norm einzeln zählbar wird. */
function zertTexte(typ) {
  const m = String(typ).match(/^ *(ISO(?:\/IEC)?|SOC) +([0-9 \/]+) *$/i);
  if (!m) return [String(typ)];
  return m[2].split("/").map((n) => n.trim()).filter(Boolean).map((n) => m[1] + " " + n);
}

/** Kanonische Schlüssel eines Zertifikatstexts. Leere Liste = kein bekannter Standard erkannt;
 *  der Eintrag bleibt im Profil sichtbar, bekommt aber keine Facettenseite. */
function zertKanon(typ) {
  const treffer = new Map();
  for (const t of zertTexte(typ))
    for (const [re, schluessel, label] of ZERT_KANON) if (re.test(t)) treffer.set(schluessel, label);
  return [...treffer].map(([schluessel, label]) => ({ schluessel, label }));
}

/** Alle Anbieter je kanonischem Zertifikat, nach Status gruppiert. */
function zertIndex(providers) {
  const idx = new Map();
  for (const p of providers)
    for (const z of p.zertifikate || [])
      for (const k of zertKanon(z.typ)) {
        if (!idx.has(k.schluessel)) idx.set(k.schluessel, { schluessel: k.schluessel, label: k.label, belegt: [], beansprucht: [], unbelegt: [] });
        const e = idx.get(k.schluessel);
        (e[z.status] || e.unbelegt).push({ p, z });
      }
  return idx;
}

/** Hat der Anbieter dieses kanonische Zertifikat mit dem gesuchten Status? */
function hatZert(p, schluessel, status) {
  return (p.zertifikate || []).some((z) => (!status || z.status === status) && zertKanon(z.typ).some((k) => k.schluessel === schluessel));
}

/** Jüngstes Prüfdatum irgendwo im Profil — ein Feld-Datum schlägt das Profil-Datum. */
function juengstesDatum(p) {
  const daten = [p.geprueft];
  const sammle = (o) => {
    if (!o || typeof o !== "object") return;
    if (typeof o.geprueft === "string") daten.push(o.geprueft);
    for (const v of Object.values(o)) if (v && typeof v === "object") sammle(v);
  };
  sammle(p.vertrag);
  (p.zertifikate || []).forEach(sammle);
  (p.ai_act || []).forEach(sammle);
  (p.modelle || []).forEach(sammle);
  return daten.filter(Boolean).sort().pop() || null;
}

function inhaltsHash(str) {
  return require("crypto").createHash("sha256").update(str).digest("hex").slice(0, 16);
}

/** Verbform passend zur Anzahl: mz(1, "weist", "weisen") ergibt "weist". */
function mz(n, singular, plural) {
  return n === 1 ? singular : plural;
}

/** Kurzform "Name (LAND)" für Aufzählungen in den Antworttexten. */
function nennung(p) {
  return p.name + " (" + p.stammdaten.land + ")";
}

/** Link auf einen Ratgeber, über einen Teil seines Slugs gesucht. Fehlt der Guide,
 *  bleibt nur der Text stehen — ein toter Link kann so nicht entstehen. */
function guideLink(guides, slugTeil, rel, text) {
  const g = (guides || []).find((x) => x.slug.indexOf(slugTeil) !== -1);
  return g ? `<a href="${rel}ratgeber/${esc(g.slug)}/">${esc(text)}</a>` : esc(text);
}

/** Verlinkte Anbieterliste für Antwort- und Facettenseiten. */
function anbieterLinks(liste, rel) {
  if (!liste.length) return '<span class="leer">keiner</span>';
  return liste.map((p) => `<a href="${rel}anbieter/${esc(p.id)}/">${esc(p.name)}</a>`).join(", ");
}

/** BreadcrumbList als JSON-LD: Suchmaschinen zeigen daraus den Pfad statt der nackten URL. */
function brotkrumenLd(stufen) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: stufen.map(([pfad, label], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: label,
      item: `${SITE.baseUrl}/${pfad}`,
    })),
  };
}

/* ---------------- Layout ---------------- */

function layout({ titel, beschreibung, inhalt, rel, pfad, jsonld }) {
  const nav = [
    ["", "Anbieter"],
    ["fragen/", "Fragen"],
    ["zertifikate/", "Zertifikate"],
    ["faelle/", "Fälle"],
    ["aenderungen/", "Änderungen"],
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
<link rel="alternate" type="application/atom+xml" title="belegbar.eu — Änderungen" href="${rel}aenderungen/feed.xml">
<meta property="og:type" content="website">
<meta property="og:site_name" content="belegbar.eu">
<meta property="og:locale" content="de_DE">
<meta property="og:title" content="${esc(titel)}">
<meta property="og:description" content="${esc(beschreibung)}">
<meta property="og:url" content="${SITE.baseUrl}/${pfad}">
<meta name="twitter:card" content="summary">
${(Array.isArray(jsonld) ? jsonld : jsonld ? [jsonld] : [])
  .filter(Boolean)
  .map((b) => `<script type="application/ld+json">${JSON.stringify(b)}</script>`)
  .join("")}
</head>
<body>
<a class="skip" href="#inhalt">Zum Inhalt springen</a>
<header class="kopf">
  <div class="shell kopf-innen">
    <a class="marke" href="${rel}"><span class="marke-wort">belegbar</span><span class="marke-tld">.eu</span></a>
    <nav aria-label="Hauptnavigation">${nav}</nav>
  </div>
</header>
<main id="inhalt" class="shell">
${inhalt}
</main>
<footer class="fuss">
  <div class="shell">
    <p><strong>belegbar.eu</strong> — ${esc(SITE.claim)}</p>
    <p>Statusstufen: <span class="status s-belegt"><span class="dot"></span>belegt</span> = Primärquelle verlinkt · <span class="status s-beansprucht"><span class="dot"></span>beansprucht</span> = Anbieterangabe ohne Dokument · <span class="status s-unbelegt"><span class="dot"></span>unbelegt</span> = keine belastbare Angabe gefunden. Details in der <a href="${rel}methodik/">Methodik</a>.</p>
    <p>Keine Rechtsberatung. Fehler gefunden? <a href="mailto:${SITE.kontakt}">${SITE.kontakt}</a> · <a href="${rel}ueber/">Impressum &amp; Über</a></p>
  </div>
</footer>
</body>
</html>`;
}

/* ---------------- Seiten ---------------- */

function seiteIndex(providers, stand, aenderungen) {
  const n30 = A.anzahlSeit(aenderungen || [], BUILD_DATUM, 30);
  const frische = `<p class="frische klein">Zuletzt geprüft: <strong>${datumDE(stand)}</strong> · ${n30 === 1 ? "1 Änderung" : n30 + " Änderungen"} in den letzten 30 Tagen · <a href="aenderungen/">Änderungsprotokoll</a> · <a href="aenderungen/feed.xml">Feed</a></p>`;
  const zeilen = providers
    .map((p) => {
      const quote = Math.round(belegQuote(p) * 100);
      const preis = guenstigsterPreis(p);
      const zerts = zertifikateBelegt(p);
      const optOut = p.vertrag && p.vertrag.training_opt_out;
      return `<tr data-land="${esc(p.stammdaten.land)}" data-kategorie="${esc(p.kategorie)}" data-avv="${p.vertrag && p.vertrag.avv && p.vertrag.avv.status === "belegt" ? "1" : "0"}" data-name="${esc(p.name.toLowerCase())}">
        <td><a href="anbieter/${esc(p.id)}/">${esc(p.name)}</a>${verifiedMini(p)}<span class="klein">${esc(p.stammdaten.sitz || "")}</span></td>
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
    ${frische}
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
    "@id": DATASET_ID,
    name: "belegbar.eu — Evidenz-Datenbank europäischer KI-Anbieter",
    description: SITE.claim,
    url: SITE.baseUrl,
    license: "https://creativecommons.org/licenses/by/4.0/",
    isAccessibleForFree: true,
    creator: { "@type": "Organization", name: "belegbar.eu", url: SITE.baseUrl },
    distribution: { "@type": "DataDownload", encodingFormat: "application/json", contentUrl: `${SITE.baseUrl}/daten.json` },
  };

  return layout({
    titel: "belegbar.eu — Souveräne KI-Anbieter aus Europa, mit Quelle und Prüfdatum",
    beschreibung: `${providers.length} europäische KI-Anbieter im Vergleich: Hosting, Preise, AVV, Zertifikate, AI-Act-Nachweise — jede Angabe belegt oder ehrlich als unbelegt markiert.`,
    inhalt, rel: "./", pfad: "", jsonld,
  });
}

function seiteAnbieter(p, alleProvider, facetten, faelle) {
  const eigeneFaelle = (faelle || []).filter((f) => f.anbieter === p.id);
  const s = p.stammdaten;
  const li = landInfo(s.land);
  // Direktvergleiche derselben Kategorie: holt die 76 Vergleichsseiten aus der Sackgasse.
  const partner = (alleProvider || []).filter((q) => q.id !== p.id && q.kategorie === p.kategorie);
  const vergleichLink = (q) => {
    const paar = [p, q].sort((a, b) => a.name.localeCompare(b.name, "de"));
    return `<a href="../../vergleich/${esc(paar[0].id)}-vs-${esc(paar[1].id)}/">${esc(p.name)} vs. ${esc(q.name)}</a>`;
  };
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
    ? p.zertifikate.map((z) => {
        // Wo eine Facettenseite existiert, verlinken wir sie: dort steht, wer denselben Standard nachweist.
        const wege = zertKanon(z.typ)
          .filter((k) => facetten && facetten.has(k.schluessel))
          .map((k) => `<a href="../../zertifikate/${esc(k.schluessel)}/">Wer weist ${esc(k.label)} nach?</a>`);
        const wert = [z.status === "belegt" ? "Nachweis verlinkt" : "", ...wege].filter(Boolean).join(" · ");
        return belegZeile(z.typ, wert, z, p.geprueft);
      }).join("\n")
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
    <div class="stempel-gruppe">
      <div class="stempel" aria-label="Beleg-Quote ${quote} Prozent"><span class="stempel-zahl">${quote}&nbsp;%</span><span class="stempel-text">belegt</span></div>
      ${verifiedStempel(p, "../../")}
    </div>
  </header>
${eigeneFaelle.map((f) => `  <aside class="fall-hinweis fall-${esc(f.status)}"><strong>Fall ${esc(f.id)} · ${esc(FALL_STATUS[f.status].label)}:</strong> ${esc(f.kurz)} <a href="../../faelle/${esc(f.slug)}/">Zum Fall mit Zitaten, Zeitstempeln und Antwortfrist</a></aside>`).join("\n")}

  <h2>Stammdaten</h2>
  <dl class="stammdaten">
    <div><dt>Sitz</dt><dd>${esc(s.sitz || "–")}</dd></div>
    <div><dt>Kategorie</dt><dd>${esc(KATEGORIE_LABEL[p.kategorie] || p.kategorie)}</dd></div>
    <div><dt>Mutterkonzern</dt><dd>${esc(s.mutterkonzern || "unabhängig / keiner bekannt")}</dd></div>
    <div><dt>US-Eigentümerstruktur</dt><dd>${s.us_eigner === true ? '<span class="warnung">ja — CLOUD-Act-Relevanz prüfen</span>' : s.us_eigner === false ? "nein" : "unbelegt"}</dd></div>
    <div><dt>Gegründet</dt><dd>${esc(s.gegruendet || "–")}</dd></div>
    <div><dt>Rechtsraum</dt><dd>${esc(li.name)} — ${esc(RAUM_TEXT[li.raum])}${li.hinweis ? " " + esc(li.hinweis) : ""} <span class="quelle"><a href="${ADEQUACY_QUELLE}" rel="noopener nofollow" target="_blank">Quelle</a> · geprüft ${datumDE(ADEQUACY_GEPRUEFT)}</span></dd></div>
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

  ${partner.length ? `<h2>Direktvergleiche</h2>
  <p class="klein">${esc(p.name)} Feld für Feld gegen andere Anbieter derselben Kategorie:</p>
  <p>${partner.map(vergleichLink).join(" · ")}</p>` : ""}

  <footer class="dossier-fuss">
    <p>Vollständig geprüft am ${datumDE(p.geprueft)}${juengstesDatum(p) !== p.geprueft ? `, einzelne Angaben zuletzt am ${datumDE(juengstesDatum(p))} nachgeprüft` : ""}. Alle Angaben ohne Gewähr, keine Rechtsberatung.</p>
    <p class="klein">Zitieren als: „${esc(p.name)} — Beleg-Check“, belegbar.eu, Stand ${datumDE(juengstesDatum(p))}, ${SITE.baseUrl}/anbieter/${esc(p.id)}/ · Rohdaten dieses Profils (JSON, mit Quellen): <a href="daten.json">daten.json</a></p>
    <p><strong>Sie arbeiten bei ${esc(p.name)}?</strong> Schicken Sie uns fehlende Nachweise und erhalten Sie den Verified-Status — kostenlos, <a href="../../methodik/#verified">so funktioniert es</a>: <a href="mailto:${SITE.kontakt}?subject=Verifizierung%20${encodeURIComponent(p.name)}">${SITE.kontakt}</a></p>
  </footer>
</article>`;

  const jsonld = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${p.name} — Beleg-Check`,
    url: `${SITE.baseUrl}/anbieter/${p.id}/`,
    dateModified: juengstesDatum(p) || undefined,
    license: "https://creativecommons.org/licenses/by/4.0/",
    isPartOf: { "@id": DATASET_ID },
    about: {
      "@type": "Organization",
      name: p.name,
      url: s.website || undefined,
      location: s.sitz ? { "@type": "Place", name: s.sitz } : undefined,
    },
    publisher: { "@type": "Organization", name: "belegbar.eu", url: SITE.baseUrl },
  };

  return layout({
    titel: `${p.name} — DSGVO, Hosting, Preise & Zertifikate im Beleg-Check | belegbar.eu`,
    beschreibung: `${p.name}: ${p.kurzbeschreibung || ""} Beleg-Quote ${quote} %. Alle Angaben mit Quelle und Prüfdatum.`,
    inhalt, rel: "../../", pfad: `anbieter/${p.id}/`,
    jsonld: [jsonld, brotkrumenLd([["", "Anbieter"], [`anbieter/${p.id}/`, p.name]])],
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
    ${zeile("Verified", a.verified && a.verified.datum ? `<span class="verified-mini">✓&nbsp;Verified ${datumDE(a.verified.datum)}</span>` : '<span class="leer">–</span>', b.verified && b.verified.datum ? `<span class="verified-mini">✓&nbsp;Verified ${datumDE(b.verified.datum)}</span>` : '<span class="leer">–</span>')}
  </tbody>
</table></div>`;

  return layout({
    titel: `${a.name} vs. ${b.name}: DSGVO, Preise, Zertifikate | belegbar.eu`,
    beschreibung: `${a.name} oder ${b.name}? Direkter Vergleich mit belegten Quellen: AVV, Hosting, Preise, Zertifikate, AI-Act-Nachweise.`,
    inhalt, rel: "../../", pfad: `vergleich/${a.id}-vs-${b.id}/`,
    jsonld: brotkrumenLd([["", "Anbieter"], ["vergleich/", "Vergleiche"], [`vergleich/${a.id}-vs-${b.id}/`, `${a.name} vs. ${b.name}`]]),
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
    titel: "Anbieter-Direktvergleiche | belegbar.eu",
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
    titel: "Ratgeber: DSGVO, AI Act & Zertifikate für KI-Einsatz | belegbar.eu",
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
    publisher: { "@type": "Organization", name: "belegbar.eu" },
  };
  return layout({
    titel: `${g.titel} | belegbar.eu`,
    beschreibung: g.beschreibung,
    inhalt, rel: "../../", pfad: `ratgeber/${g.slug}/`, jsonld,
  });
}

function fallStatusBadge(status) {
  const st = FALL_STATUS[status];
  return `<span class="fall-status fall-${esc(status)}" title="${esc(st.text)}"><span class="dot"></span>${esc(st.label)}</span>`;
}

function zitatBlock(z) {
  return `<figure class="zitat">
  <blockquote lang="en">„${esc(z.zitat)}“</blockquote>
  <figcaption>${z.kontext ? esc(z.kontext) + " " : ""}<a href="${esc(z.quelle)}" rel="noopener nofollow" target="_blank">${esc(z.quelle.replace(/^https?:\/\//, ""))}</a>, abgerufen ${esc(z.abgerufen.replace("T", " ").replace("Z", " UTC"))}${z.archiv ? ` · <a href="${esc(z.archiv)}" rel="noopener nofollow" target="_blank">Archivkopie</a>` : ""}<br><span class="hash">SHA-256 der abgerufenen Seite: <code>${esc(z.sha256)}</code></span></figcaption>
</figure>`;
}

function seiteFall(f, provider, stand) {
  const st = FALL_STATUS[f.status];
  const inhalt = `
<nav class="brotkrumen" aria-label="Pfad"><a href="../../">Anbieter</a> / <a href="../">Fälle</a> / Fall ${esc(f.id)}</nav>
<article class="artikel fall">
<p class="fall-kopf">Fall ${esc(f.id)} · ${fallStatusBadge(f.status)} · eröffnet ${datumDE(f.eroeffnet)} · Anbieter: <a href="../../anbieter/${esc(provider.id)}/">${esc(provider.name)}</a></p>
<h1>${esc(f.titel)}</h1>
<div class="direktantwort"><p><strong>Kurz:</strong> ${esc(f.kurz)}</p></div>

<h2>Die Behauptung</h2>
${f.behauptung.map(zitatBlock).join("\n")}

<h2>Der Beleg</h2>
${f.beleg.map(zitatBlock).join("\n")}

<h2>Worin der Widerspruch besteht</h2>
<p>${esc(f.widerspruch)}</p>

${f.was_es_nicht_heisst ? `<h2>Was dieser Fall nicht heißt</h2>
<p>${esc(f.was_es_nicht_heisst)}</p>` : ""}

${(f.aufloesung || []).length ? `<h2>Was den Fall ausräumt</h2>
<ol>${f.aufloesung.map((a) => `<li>${esc(a)}</li>`).join("")}</ol>` : ""}

<h2>Antwort des Anbieters</h2>
${f.antworten.length
    ? f.antworten.map((a) => `<figure class="zitat antwort"><blockquote>${esc(a.text)}</blockquote><figcaption>${esc(provider.name)}, ${datumDE(a.datum)}${a.von ? ", " + esc(a.von) : ""} — wörtlich, ungekürzt</figcaption></figure>${a.anmerkung ? `<p class="klein anmerkung"><strong>Anmerkung belegbar.eu:</strong> ${esc(a.anmerkung)}</p>` : ""}`).join("\n")
    : `<p class="leer">Noch keine Antwort. ${f.anbieter_informiert ? `Der Anbieter wurde am ${datumDE(f.anbieter_informiert)} informiert; Antwortfrist bis ${datumDE(f.antwort_frist)}.` : `Antwortfrist bis ${datumDE(f.antwort_frist)}.`} Jede Antwort wird hier wörtlich und ungekürzt veröffentlicht.</p>`}

<h2>Verlauf</h2>
<table class="verlauf"><tbody>
${f.verlauf.map((v) => `<tr><td class="datum">${datumDE(v.datum)}</td><td>${esc(v.ereignis)}</td></tr>`).join("\n")}
</tbody></table>

<footer class="dossier-fuss">
  <p>Status <strong>${esc(st.label)}</strong>: ${esc(st.text)}. Ein Fall wird nie gelöscht — auch ein ausgeräumter Fall bleibt mit seinem Verlauf stehen. Was ein Fall ist und was nicht: <a href="../../methodik/#faelle">Methodik</a>.</p>
  <p class="klein">Zitieren als: „Fall ${esc(f.id)} — ${esc(f.titel)}“, belegbar.eu, Stand ${datumDE(stand)}, ${SITE.baseUrl}/faelle/${esc(f.slug)}/ · Lizenz CC BY 4.0</p>
  <p><strong>Sie arbeiten bei ${esc(provider.name)}?</strong> Antworten Sie an <a href="mailto:${SITE.kontakt}?subject=Fall%20${encodeURIComponent(f.id)}%20${encodeURIComponent(provider.name)}">${SITE.kontakt}</a> — Ihre Antwort erscheint wörtlich auf dieser Seite.</p>
</footer>
</article>`;
  const jsonld = [
    {
      "@context": "https://schema.org",
      "@type": "ClaimReview",
      url: `${SITE.baseUrl}/faelle/${f.slug}/`,
      datePublished: f.eroeffnet,
      dateModified: f.verlauf[f.verlauf.length - 1].datum,
      author: { "@type": "Organization", name: "belegbar.eu", url: SITE.baseUrl },
      claimReviewed: f.behauptung[0].zitat,
      itemReviewed: { "@type": "Claim", appearance: f.behauptung.map((z) => ({ "@type": "WebPage", url: z.quelle })), author: { "@type": "Organization", name: provider.name, url: provider.stammdaten.website } },
      reviewRating: { "@type": "Rating", alternateName: st.label, ratingExplanation: st.text },
      license: "https://creativecommons.org/licenses/by/4.0/",
      isPartOf: { "@id": DATASET_ID },
    },
    brotkrumenLd([["", "Anbieter"], ["faelle/", "Fälle"], [`faelle/${f.slug}/`, `Fall ${f.id}`]]),
  ];
  return layout({ titel: `Fall ${f.id}: ${f.titel} | belegbar.eu`, beschreibung: f.kurz, inhalt, rel: "../../", pfad: `faelle/${f.slug}/`, jsonld });
}

function seiteFaelleIndex(faelle, providers, stand) {
  const byId = new Map(providers.map((p) => [p.id, p]));
  const inhalt = `
<article class="artikel">
<h1>Fälle: Wo Behauptung und Beleg auseinanderlaufen</h1>
<p>Ein Fall ist kein Urteil. Er dokumentiert, dass zwei öffentliche Aussagen desselben Anbieters — oder eine Aussage und ihr Primärdokument — nicht zugleich wahr sein können. Mit wörtlichem Zitat, Abrufzeitpunkt, Inhalts-Hash und Archivkopie. Der Anbieter wird vor der Veröffentlichung informiert, seine Antwort erscheint wörtlich. <a href="../methodik/#faelle">So funktioniert es.</a></p>
${faelle.length ? `<ul class="liste-faelle">
${faelle.map((f) => `<li><p class="fall-kopf">Fall ${esc(f.id)} · ${fallStatusBadge(f.status)} · ${datumDE(f.eroeffnet)} · ${esc((byId.get(f.anbieter) || {}).name || f.anbieter)}</p><a href="${esc(f.slug)}/"><strong>${esc(f.titel)}</strong></a><p class="klein">${esc(f.kurz)}</p></li>`).join("\n")}
</ul>` : '<p class="leer">Noch kein Fall dokumentiert.</p>'}
<footer class="dossier-fuss"><p class="klein">Stand ${datumDE(stand)} · Lizenz CC BY 4.0</p></footer>
</article>`;
  return layout({
    titel: "Fälle — dokumentierte Widersprüche bei europäischen KI-Anbietern | belegbar.eu",
    beschreibung: "Wo Marketing-Aussage und eigenes Dokument eines KI-Anbieters nicht zusammenpassen: wörtlich zitiert, datiert, archiviert, mit Antwortfrist und Antwort des Anbieters.",
    inhalt, rel: "../", pfad: "faelle/",
    jsonld: brotkrumenLd([["", "Anbieter"], ["faelle/", "Fälle"]]),
  });
}

/** Änderungsprotokoll: aus der Git-Historie berechnet, nie von Hand geführt. Ein Eintrag je Status-
 *  oder Quellenwechsel, mit Anker, damit Feed und Verweise auf eine einzelne Änderung zeigen können. */
function seiteAenderungen(eintraege, providers, faelle, stand) {
  const byId = new Map(providers.map((p) => [p.id, p]));
  const name = (id) => (byId.get(id) || {}).name || id;
  const fallSlug = new Map(faelle.map((f) => [f.id, f.slug]));
  const badge = (s, typ) => (s === null || s === undefined ? '<span class="leer">–</span>' : typ === "fall" ? fallStatusBadge(s) : STATUS_LABEL[s] ? statusBadge(s) : esc(A.statusText(s)));
  const gruppen = A.gruppiere(eintraege);
  const tage = [...new Set(gruppen.map((e) => e.datum))];

  const zeile = (e) => {
    const ziel = e.typ === "fall" ? `../faelle/${esc(fallSlug.get(e.fall) || e.slug)}/` : `../anbieter/${esc(e.anbieter)}/`;
    const was = e.typ === "anbieter" ? "Anbieter aufgenommen"
      : e.typ === "fall" ? `<a href="${ziel}">Fall ${esc(e.fall)}</a>: ${esc(e.feld.replace(/^Fall [^:]+: /, ""))}`
      : e.typ === "quelle" ? `Quelle geändert: ${e.felder.map(esc).join(", ")}`
      : esc(e.feld);
    const wechsel = e.typ === "anbieter" ? "" : e.typ === "quelle" ? "" : `${badge(e.alt, e.typ)} → ${badge(e.neu, e.typ)}`;
    const quellen = [
      e.quelle_alt && e.quelle_alt !== e.quelle_neu ? `alte Quelle: <a href="${esc(e.quelle_alt)}" rel="noopener nofollow" target="_blank">${esc(e.quelle_alt.replace(/^https?:\/\//, ""))}</a>` : "",
      e.quelle_neu && e.quelle_alt !== e.quelle_neu ? `neue Quelle: <a href="${esc(e.quelle_neu)}" rel="noopener nofollow" target="_blank">${esc(e.quelle_neu.replace(/^https?:\/\//, ""))}</a>` : "",
      e.commit ? `<a href="${REPO_URL}/commit/${esc(e.commit.sha)}" rel="noopener" target="_blank">Commit ${esc(e.commit.sha)}</a>` : "noch nicht committet",
    ].filter(Boolean).join(" · ");
    return `<li id="${esc(A.ankerId(e))}" class="aenderung aenderung-${esc(e.typ)}">
  <p class="aenderung-kopf"><a href="${e.typ === "fall" ? ziel : `../anbieter/${esc(e.anbieter)}/`}"><strong>${esc(name(e.anbieter))}</strong></a> · ${was} ${wechsel}</p>
  ${e.grund ? `<p class="aenderung-grund">${esc(e.grund)}</p>` : ""}
  <p class="klein">${quellen}</p>
</li>`;
  };

  const inhalt = `
<article class="artikel">
<h1>Änderungen: Was sich an Belegen bewegt hat</h1>
<p>Jede Angabe dieser Datenbank trägt einen Status und eine Quelle. Sobald sich eines von beiden ändert, ein Fall seinen Status wechselt oder ein Anbieter aufgenommen wird, steht es hier — mit Datum, altem und neuem Wert, Grund und beiden Quellen. Das Protokoll wird bei jedem Build aus der <a href="${REPO_URL}" rel="noopener" target="_blank">öffentlichen Git-Historie</a> berechnet, nicht von Hand geführt: Jeder kann es aus denselben Commits nachrechnen. Nicht verzeichnet sind fortgeschriebene Prüfdaten und Anmerkungen; das Prüfdatum steht auf jedem Profil.</p>
<p class="klein">Abonnieren: <a href="feed.xml">Atom-Feed</a> · Rohdaten: <a href="../daten.json">daten.json</a> (Feld <code>aenderungen</code>) · Wie der monatliche Quellenlauf Änderungen findet: <a href="../methodik/#faelle">Methodik</a></p>
${tage.map((t) => `<h2 id="${t}">${datumDE(t)}</h2>
<ul class="liste-aenderungen">
${gruppen.filter((e) => e.datum === t).map(zeile).join("\n")}
</ul>`).join("\n")}
<footer class="dossier-fuss"><p class="klein">${eintraege.length} Einträge seit ${datumDE(eintraege.length ? eintraege[eintraege.length - 1].datum : stand)} · Stand ${datumDE(stand)} · Lizenz CC BY 4.0</p></footer>
</article>`;
  return layout({
    titel: "Änderungsprotokoll — jede Status- und Quellenänderung, datiert | belegbar.eu",
    beschreibung: "Was sich an den Belegen europäischer KI-Anbieter geändert hat: Statuswechsel, umgezogene Quellen, neue Fälle — datiert, mit altem und neuem Wert, aus der öffentlichen Git-Historie berechnet.",
    inhalt, rel: "../", pfad: "aenderungen/",
    jsonld: brotkrumenLd([["", "Anbieter"], ["aenderungen/", "Änderungen"]]),
  });
}

function seiteMethodik() {
  const inhalt = `
<article class="artikel">
<h1>Methodik: Was „belegt“ bei uns heißt</h1>
<p>belegbar.eu ist eine Evidenz-Datenbank, keine Bestenliste. Wir bewerten nicht, wir belegen — und wo wir nichts belegen können, sagen wir das.</p>

<h2>Die drei Statusstufen</h2>
${belegZeile("belegt", "Die Angabe ist durch ein Primärdokument oder eine offizielle, konkrete Anbieterseite nachgewiesen — Vertragsdokument, Audit-Zertifikat, Preisliste, Subprozessorenliste. Die Quelle ist direkt verlinkt.", { status: "belegt" }, null)}
${belegZeile("beansprucht", "Der Anbieter behauptet die Eigenschaft auf Marketing-Seiten, wir haben aber kein prüfbares Dokument gefunden. Das ist kein Vorwurf — aber ein Unterschied, den Einkäufer und Datenschutzbeauftragte kennen sollten.", { status: "beansprucht" }, null)}
${belegZeile("unbelegt", "Wir haben keine belastbare Angabe gefunden. Auch das ist eine Information: Ein Anbieter, dessen AVV nicht auffindbar ist, macht Ihnen die Compliance-Arbeit schwer.", { status: "unbelegt" }, null)}

<h2>Beleg-Quote</h2>
<p>Die Beleg-Quote eines Anbieters ist der Anteil seiner erfassten Angaben mit Status „belegt“. Sie misst <em>Nachweisbarkeit, nicht Qualität</em> — ein junger Anbieter mit ehrlicher Dokumentation kann eine höhere Quote haben als ein Konzern mit verstreuten PDFs.</p>

<h2>Prüfdatum und Korrekturen</h2>
<p>Jede Angabe trägt das Datum ihrer letzten Prüfung. Anbieterangaben ändern sich — wenn Sie einen Fehler finden, schreiben Sie an <a href="mailto:${SITE.kontakt}">${SITE.kontakt}</a>; wir prüfen und korrigieren mit neuem Prüfdatum.</p>

<h2 id="unabhaengigkeit">Unabhängigkeit: Was wir von Anbietern nicht annehmen</h2>
<p>Diese Datenbank ist nur so viel wert wie ihre Neutralität. Deshalb gilt für alle gelisteten Anbieter dieselbe Regel, ohne Ausnahme für die am besten belegten:</p>
<ul>
<li><strong>Kein Logo, kein Badge, kein Link-Tausch.</strong> Auf belegbar.eu erscheint kein Anbieter-Logo und keine „Partner“-Kennzeichnung. Wir setzen keine Affiliate-Links und nehmen an keinem Empfehlungsprogramm teil.</li>
<li><strong>Keine Gegenleistung für Einträge oder Status.</strong> Wir nehmen keine Testzugänge, Guthaben, Tokens, Rabatte oder Bezahlung dafür an, dass ein Anbieter gelistet, ein Status vergeben, ein Fall eröffnet, verzögert oder ausgeräumt wird. Angebote dieser Art lehnen wir ab und dokumentieren sie auf Anfrage.</li>
<li><strong>Keine Sponsorenposts.</strong> Wenn wir über einen Anbieter schreiben oder posten, dann weil die Belege es hergeben — nicht, weil er uns darum gebeten oder dafür etwas geboten hat.</li>
</ul>
<p><strong>Finanzierung, Stand 28.08.2026:</strong> belegbar.eu wird privat von <a href="${SITE.baseUrl}/ueber/">Felix Lind</a> betrieben und bezieht keine Einnahmen. Sollte sich das je ändern, gilt: Bezahlte Leistungen dürfen weder Statusstufen noch Reihenfolge, Verified-Kennzeichen oder Fälle beeinflussen, und jede Einnahmequelle wird an dieser Stelle mit Datum ausgewiesen. Fehlt hier ein Eintrag, gibt es keine.</p>

<h2 id="verified">Verified-Status: So funktioniert es</h2>
<p>Anbieter, die uns fehlende Nachweise direkt zusenden, erhalten das Verified-Kennzeichen mit Datum. Der Ablauf:</p>
<ol>
<li><strong>Nachweise einreichen.</strong> Eine E-Mail an <a href="mailto:${SITE.kontakt}">${SITE.kontakt}</a> mit Betreff „Verifizierung [Anbietername]“ genügt. Als Nachweis zählt, was auch sonst für „belegt“ gilt: Primärdokumente — Zertifikat mit Auditor, unterschriftsreifer AVV, Subprozessorenliste, Policy-Dokument. Ein Link ist so gut wie ein PDF.</li>
<li><strong>Wir prüfen.</strong> Marketing-Aussagen, Badges und Absichtserklärungen reichen nicht — genau darum gibt es diese Datenbank. Was den Beleg-Maßstab erfüllt, wird im Profil auf „belegt“ gesetzt, mit neuem Prüfdatum und verlinkter Quelle.</li>
<li><strong>Das Kennzeichen.</strong> Das Profil erhält den Verified-Stempel mit dem Datum der Prüfung. Er bedeutet genau eines: <em>Dieser Anbieter hat aktiv Nachweise eingereicht, und wir haben sie geprüft.</em> Er ist keine Qualitäts- oder Rechtskonformitäts-Aussage.</li>
<li><strong>Aktualität.</strong> Der Stempel trägt sein Datum sichtbar. Ändern sich Fakten wesentlich (z. B. neuer Eigentümer, ausgelaufenes Zertifikat), prüfen wir neu — das Kennzeichen bleibt nur mit aktuellem Stand bestehen.</li>
</ol>
<p><strong>Was Verified nicht ist:</strong> Es ist nicht käuflich, kein Ranking-Vorteil und keine Bedingung für die Aufnahme — gelistet wird, wer relevant ist, mit oder ohne Mitwirkung. Anbieter können der Listung ihrer öffentlich verfügbaren Angaben nicht widersprechen, wohl aber jederzeit Korrekturen mit Beleg verlangen.</p>

<h2 id="faelle">Fälle: Wenn Behauptung und Beleg auseinanderlaufen</h2>
<p>Die drei Statusstufen sagen, <em>ob</em> eine Angabe belegt ist. Ein <a href="${SITE.baseUrl}/faelle/">Fall</a> dokumentiert etwas Schärferes: dass zwei öffentliche Aussagen desselben Anbieters — oder eine Marketing-Aussage und das eigene Primärdokument — nicht zugleich wahr sein können. Ein Fall ist kein Urteil über Qualität, Rechtskonformität oder Absicht. Er hält fest, was wo stand, und wann.</p>
<ol>
<li><strong>Voraussetzung.</strong> Es genügt nicht, dass ein Beleg fehlt — das ist „beansprucht“. Ein Fall braucht zwei prüfbare, öffentliche Textstellen, die sich widersprechen. Wir zitieren beide wörtlich, mit Abrufzeitpunkt, SHA-256-Hash der abgerufenen Seite und, wo möglich, einer Kopie im Internet Archive. So bleibt der Fall nachprüfbar, auch wenn der Anbieter die Seite später ändert — und so kann uns niemand vorwerfen, wir hätten den Wortlaut nachträglich angepasst.</li>
<li><strong>Der Anbieter erfährt es zuerst.</strong> Vor der Veröffentlichung schreiben wir den Anbieter an, mit dem vollständigen Text des Falls und einer Antwortfrist von 14 Tagen. Unser Build-Werkzeug veröffentlicht keinen Fall, in dem das Datum dieser Benachrichtigung fehlt.</li>
<li><strong>Die Antwort erscheint wörtlich.</strong> Was der Anbieter uns schickt, steht ungekürzt neben dem Fall. Wir kommentieren, aber wir kürzen nicht.</li>
<li><strong>Vier Zustände.</strong> <em>offen</em> (informiert, Frist läuft) · <em>beantwortet</em> (Antwort liegt vor, wird geprüft) · <em>ausgeräumt</em> (Aussage korrigiert oder belegt — der Widerspruch besteht nicht mehr) · <em>bestätigt</em> (Frist verstrichen oder Antwort räumt den Widerspruch nicht aus; eine spätere Antwort ist jederzeit möglich).</li>
<li><strong>Nichts wird gelöscht.</strong> Auch ein ausgeräumter Fall bleibt mit seinem Verlauf stehen. Dass ein Anbieter eine Aussage innerhalb von Tagen korrigiert hat, ist eine der nützlichsten Informationen, die diese Datenbank enthalten kann.</li>
</ol>
<p><strong>Was ein Fall nicht ist:</strong> kein Ranking, nicht käuflich, nicht abwendbar durch Sponsoring — und kein Pranger. Wir schreiben ihn so, dass der Anbieter ihn mit einer Korrektur ausräumen kann und danach besser dasteht als vorher.</p>

<h2>Verfallen Belege? Ja — und wir prüfen das</h2>
<p>Eine Evidenz-Datenbank verfällt nicht dadurch, dass Angaben falsch werden, sondern dadurch, dass ihre Belege verschwinden. Anbieter bauen ihre Websites um, Dokumente wandern, Domains werden zusammengelegt. Ein Link, der ins Leere zeigt, ist schlimmer als eine fehlende Angabe: Er täuscht Nachweisbarkeit vor.</p>
<p>Deshalb prüfen wir regelmäßig jede hinterlegte Quellen-URL — und zwar nicht nur auf den Statuscode. Eine gelöschte Dokumentseite antwortet häufig mit „200 OK“, weil der Server auf die Startseite weiterleitet. Wir bewerten deshalb das Ziel der Weiterleitung mit: Landet ein tief verlinktes Dokument auf einer Startseite, gilt der Beleg als verloren.</p>
<p><strong>Ein Beispiel vom 24. August 2026:</strong> Der öffentliche Auftragsverarbeitungsvertrag von STACKIT war bis dahin als PDF verlinkt und der AVV entsprechend als „belegt“ geführt. Beim Quellen-Check leitete die gesamte alte Domain auf die neue Startseite um; das Dokument war öffentlich nicht mehr auffindbar. Wir haben die Angabe auf „unbelegt“ zurückgesetzt und die verlorene URL in der Anmerkung dokumentiert. Das heißt ausdrücklich nicht, dass STACKIT keinen AVV hätte — es heißt, dass er sich nicht mehr öffentlich nachweisen lässt. Genau diesen Unterschied festzuhalten, ist der Zweck dieser Datenbank. Solche Wechsel stehen seitdem im <a href="../aenderungen/">Änderungsprotokoll</a>, das aus der öffentlichen Git-Historie berechnet wird.</p>
<p>Am selben Tag ging es auch in die andere Richtung: DeepLs BSI-C5-Angabe stand als „beansprucht“, weil zum Erfassungszeitpunkt nur eine Selbstverpflichtung auffindbar war. Die Prüfung förderte Blogbeitrag und Pressemitteilung zum tatsächlich erteilten C5-Typ-2-Testat zutage — die Angabe steht seitdem auf „belegt“, mit eigenem Prüfdatum.</p>

<h2>Prüfdatum je Angabe</h2>
<p>Jedes Profil trägt ein Datum der letzten vollständigen Prüfung. Wird eine einzelne Angabe zwischendurch nachgeprüft, bekommt sie zusätzlich ihr eigenes Prüfdatum — sichtbar an der Quelle und in den Rohdaten. So behauptet ein Profil nie, alle seine Angaben seien gleichzeitig geprüft worden.</p>

<h2>Lizenz</h2>
<p>Die Daten dieser Datenbank stehen unter <a href="https://creativecommons.org/licenses/by/4.0/deed.de" rel="noopener" target="_blank">CC BY 4.0</a>: Nutzung und Zitat sind frei — mit Namensnennung „belegbar.eu“ und Angabe des Prüfdatums. Maschinenlesbare Rohdaten: <a href="${SITE.baseUrl}/daten.json">daten.json</a>.</p>

<h2>Unabhängigkeit</h2>
<p>belegbar.eu betreibt keine eigene KI-Infrastruktur und ist an keinem gelisteten Anbieter beteiligt. Etwaige künftige Sponsorings werden als solche gekennzeichnet und haben keinen Einfluss auf Statusbewertungen.</p>
</article>`;
  return layout({
    titel: "Methodik — was „belegt“ heißt | belegbar.eu",
    beschreibung: "Wie belegbar.eu prüft: die drei Statusstufen belegt/beansprucht/unbelegt, die Beleg-Quote und der Umgang mit Korrekturen.",
    inhalt, rel: "../", pfad: "methodik/",
  });
}

function seiteUeber() {
  const inhalt = `
<article class="artikel">
<h1>Über belegbar.eu</h1>
<p>Seit dem 2. August 2026 wird der EU AI Act mit Bußgeldern durchgesetzt. Gleichzeitig werben Dutzende europäische KI-Anbieter mit „souverän“ und „DSGVO-konform“ — aber wer das prüfen will, findet Marketing statt Dokumente. belegbar.eu schließt diese Lücke: eine neutrale Datenbank, in der jede Angabe eine Quelle und ein Prüfdatum hat.</p>
<h2>Kontakt</h2>
<p><a href="mailto:${SITE.kontakt}">${SITE.kontakt}</a></p>
<h2>Impressum</h2>
<p>Angaben gemäß § 5 DDG:<br>
Felix Lind<br>
Euskirchener Straße 55<br>
40547 Düsseldorf<br>
E-Mail: <a href="mailto:${SITE.kontakt}">${SITE.kontakt}</a></p>
<p>Verantwortlich für den Inhalt: Felix Lind (Anschrift wie oben).</p>
<h2>Datenschutz</h2>
<p>Diese Website setzt keine Cookies, lädt keine Tracker, bindet keine Drittanbieter-Dienste ein (auch Schriften werden lokal ausgeliefert) und speichert keine personenbezogenen Daten. Beim Aufruf fallen lediglich die technisch notwendigen Server-Logs des Hosters an.</p>
</article>`;
  return layout({
    titel: "Über & Impressum | belegbar.eu",
    beschreibung: "Warum es belegbar.eu gibt, wer dahinter steht und wie Sie uns erreichen.",
    inhalt, rel: "../", pfad: "ueber/",
  });
}

/** llms.txt — Wegweiser für KI-Assistenten und LLM-Crawler (llmstxt.org). */
function llmsTxt(providers, guides, fragen, facetten, faelle) {
  const anbieterZeilen = providers
    .map((p) => `- [${p.name}](${SITE.baseUrl}/anbieter/${p.id}/): ${p.kurzbeschreibung || ""} (geprüft ${p.geprueft}, Rohdaten: ${SITE.baseUrl}/anbieter/${p.id}/daten.json)`)
    .join("\n");
  const guideZeilen = guides
    .map((g) => `- [${g.titel}](${SITE.baseUrl}/ratgeber/${g.slug}/): ${g.beschreibung}`)
    .join("\n");
  return `# belegbar.eu

> Evidenz-Datenbank für europäische KI-Anbieter (Inference-APIs, GPU-Clouds, Gateways): Hosting-Standorte, Preise, AVV, Subprozessoren, Zertifikate und AI-Act-Nachweise. Jede Angabe trägt eine Quelle, ein Prüfdatum und einen von drei Status: „belegt“ (Primärquelle verlinkt), „beansprucht“ (Anbieterangabe ohne Dokument) oder „unbelegt“ (keine belastbare Angabe gefunden).

Die Daten stehen unter der Lizenz CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/): Nutzung und Zitat sind frei, mit Namensnennung — bitte als „belegbar.eu, Stand [Prüfdatum]“ mit Link auf das jeweilige Profil. Die Statusstufe gehört zur Information: Eine „beanspruchte“ Angabe ist keine belegte.

Maschinenlesbare Rohdaten aller Anbieter (JSON, mit Quellen-URLs und Prüfdatum je Feld): ${SITE.baseUrl}/daten.json
Vollständiger Datenbestand als Fließtext, in einem einzigen Abruf: ${SITE.baseUrl}/llms-full.txt

## Direkt beantwortete Fragen

Diese Seiten beantworten je eine Frage unmittelbar im ersten Absatz. Die Antworten werden bei jedem
Build aus den Anbieterdaten berechnet und können deshalb nicht von der Datenbank abweichen.

${fragen.map((f) => `- [${f.frage}](${SITE.baseUrl}/fragen/${f.slug}/): ${f.antwort}`).join("\n")}

## Zertifikate: wer weist welchen Standard nach

${facetten.map((e) => `- [${e.label}](${SITE.baseUrl}/zertifikate/${e.schluessel}/): ${e.belegt.length} Anbieter mit verlinktem Nachweis${e.belegt.length ? " (" + e.belegt.map((x) => x.p.name).join(", ") + ")" : ""}${e.beansprucht.length ? ", " + e.beansprucht.length + " beansprucht ohne Nachweis (" + e.beansprucht.map((x) => x.p.name).join(", ") + ")" : ""}`).join("\n")}

## Fälle: dokumentierte Widersprüche

Ein Fall hält fest, dass zwei öffentliche Aussagen eines Anbieters nicht zugleich wahr sein können — wörtlich zitiert,
mit Abrufzeitpunkt, SHA-256 und Archivkopie. Der Anbieter wird vorab informiert; seine Antwort erscheint wörtlich. Status je Fall bitte mitzitieren.

${(faelle || []).length ? faelle.map((f) => `- [Fall ${f.id} (${FALL_STATUS[f.status].label}, ${f.eroeffnet})](${SITE.baseUrl}/faelle/${f.slug}/): ${f.kurz}`).join("\n") : "- Noch kein Fall dokumentiert."}

## Änderungsprotokoll

Jede Status- und Quellenänderung, jeder Fall-Statuswechsel und jede Aufnahme eines Anbieters, datiert und aus der öffentlichen Git-Historie berechnet: ${SITE.baseUrl}/aenderungen/ — als Atom-Feed: ${SITE.baseUrl}/aenderungen/feed.xml

## Anbieter-Profile

${anbieterZeilen}

## Ratgeber

${guideZeilen}

## Methodik und Hintergrund

- [Methodik](${SITE.baseUrl}/methodik/): Was „belegt“ heißt, die drei Statusstufen, Beleg-Quote, der Verified-Prozess für Anbieter und die Regeln für Fälle
- [Direktvergleiche](${SITE.baseUrl}/vergleich/): Anbieter derselben Kategorie Feld für Feld gegenübergestellt
- [Über & Impressum](${SITE.baseUrl}/ueber/): Betreiber und Kontakt
`;
}

/** Die fünf Fragen aus MESSUNG.md — wortgleich, weil an ihnen die Zitierbarkeit gemessen wird.
 *  Jede Antwort wird aus den Daten berechnet, nie freihändig formuliert: So kann eine Antwort
 *  nicht von der Datenbank abweichen, und Fehlstellen erscheinen automatisch mit. */
function fragenKatalog(providers, guides) {
  const rel = "../../";
  const n = providers.length;
  const zi = zertIndex(providers);
  const eu = (p) => landInfo(p.stammdaten.land).raum === "eu";
  const avvBelegt = (p) => p.vertrag && p.vertrag.avv && p.vertrag.avv.status === "belegt";
  const sortName = (a, b) => a.name.localeCompare(b.name, "de");

  const tabelle = (kopf, zeilen) =>
    zeilen.length
      ? `<div class="tabelle-scroll"><table><thead><tr>${kopf.map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${zeilen.join("\n")}</tbody></table></div>`
      : '<p class="leer">Kein Anbieter in unserem Bestand erfüllt diese Bedingung.</p>';

  const fragen = [];

  /* --- 1: BSI C5 --- */
  {
    const e = zi.get("bsi-c5") || { belegt: [], beansprucht: [], unbelegt: [] };
    const belegt = e.belegt.map((x) => x.p).sort(sortName);
    const beansprucht = e.beansprucht.map((x) => x.p).sort(sortName);
    const genannt = new Set([...e.belegt, ...e.beansprucht, ...e.unbelegt].map((x) => x.p.id));
    const ohne = providers.filter((p) => !genannt.has(p.id)).sort(sortName);
    const antwort =
      `Von ${n} geprüften Anbietern ${mz(belegt.length, "weist", "weisen")} ${belegt.length} ein BSI-C5-Testat mit verlinkter Primärquelle nach: ${belegt.map(nennung).join(", ")}. ` +
      (beansprucht.length ? `${beansprucht.length} Anbieter ${mz(beansprucht.length, "beruft", "berufen")} sich auf C5, ohne ein prüfbares Testat zugänglich zu machen: ${beansprucht.map(nennung).join(", ")}. ` : "") +
      `Bei den übrigen ${ohne.length + e.unbelegt.length} Anbietern haben wir keine belastbare C5-Angabe gefunden — das heißt nicht, dass keine existiert, sondern dass sie nicht öffentlich auffindbar ist.`;
    fragen.push({
      slug: "bsi-c5-testat-ki-anbieter",
      frage: "Welche europäischen KI-Anbieter haben ein BSI-C5-Testat?",
      titel: "Welche europäischen KI-Anbieter haben ein BSI-C5-Testat?",
      beschreibung: `${belegt.length} von ${n} europäischen KI-Anbietern weisen ein BSI-C5-Testat mit verlinkter Primärquelle nach. Vollständige Liste mit Quelle und Prüfdatum.`,
      antwort,
      inhalt:
        tabelle(["Anbieter", "Land", "C5-Status", "Beleg", "Anmerkung"],
          [...e.belegt, ...e.beansprucht, ...e.unbelegt].sort((a, b) => a.p.name.localeCompare(b.p.name, "de")).map(({ p, z }) =>
            `<tr><td><a href="${rel}anbieter/${esc(p.id)}/">${esc(p.name)}</a></td><td>${esc(p.stammdaten.land)}</td><td>${statusBadge(z.status)}</td><td>${z.quelle ? `<a href="${esc(z.quelle)}" rel="noopener nofollow" target="_blank">Quelle</a>` : '<span class="leer">–</span>'}</td><td class="klein">${esc(z.anmerkung || "")}</td></tr>`)) +
        `<h2>Ohne jede C5-Angabe (${ohne.length})</h2><p>${anbieterLinks(ohne, rel)}</p>` +
        `<p class="klein">C5 (Cloud Computing Compliance Criteria Catalogue) ist der Kriterienkatalog des BSI. Ein <em>C5-Testat</em> ist ein Prüfungsurteil eines Wirtschaftsprüfers, keine Zertifizierung — deshalb unterscheiden wir zwischen einem nachgewiesenen Testat und der bloßen Selbstverpflichtung, die Kriterien einhalten zu wollen.</p>`,
    });
  }

  /* --- 2: Übersicht der Nachweise --- */
  {
    const mitQuote = providers.map((p) => ({ p, q: Math.round(belegQuote(p) * 100), z: zertifikateBelegt(p) })).sort((a, b) => b.q - a.q || a.p.name.localeCompare(b.p.name, "de"));
    const mitZert = mitQuote.filter((x) => x.z.length);
    const antwort =
      `Diese Seite ist eine solche Übersicht. belegbar.eu führt ${n} europäische KI-Anbieter und trennt bei jeder einzelnen Angabe drei Stufen: „belegt“ (Primärdokument verlinkt), „beansprucht“ (Anbieterangabe ohne prüfbares Dokument) und „unbelegt“ (keine belastbare Angabe gefunden). ` +
      `${mitZert.length} der ${n} Anbieter ${mz(mitZert.length, "hat", "haben")} mindestens ein Zertifikat mit verlinktem Nachweis; bei ${n - mitZert.length} ist kein einziges Zertifikat belegt. Alle Daten stehen unter CC BY 4.0 und sind maschinenlesbar unter ${SITE.baseUrl}/daten.json abrufbar.`;
    fragen.push({
      slug: "uebersicht-eu-ki-anbieter-zertifikate-nachweis",
      frage: "Wo finde ich eine Übersicht, welche EU-KI-Anbieter ihre Zertifikate wirklich nachweisen?",
      titel: "Übersicht: Welche EU-KI-Anbieter weisen ihre Zertifikate wirklich nach?",
      beschreibung: `Alle ${n} europäischen KI-Anbieter mit Beleg-Quote und verlinkten Zertifikatsnachweisen — belegt, beansprucht und unbelegt sauber getrennt.`,
      antwort,
      inhalt:
        tabelle(["Anbieter", "Land", "Zertifikate mit Nachweis", "Beleg-Quote"],
          mitQuote.map(({ p, q, z }) =>
            `<tr><td><a href="${rel}anbieter/${esc(p.id)}/">${esc(p.name)}</a></td><td>${esc(p.stammdaten.land)}</td><td>${z.length ? z.map((t) => `<span class="zert">${esc(t)}</span>`).join(" ") : '<span class="leer">keines belegt</span>'}</td><td class="num">${q}&nbsp;%</td></tr>`)) +
        `<p class="klein">Die Beleg-Quote misst <em>Nachweisbarkeit, nicht Qualität</em>: den Anteil der erfassten Angaben eines Anbieters, für die ein Primärdokument verlinkt ist. Nach Standard sortiert finden Sie dasselbe unter <a href="${rel}zertifikate/">Zertifikate</a>.</p>`,
    });
  }

  /* --- 3: DSGVO + EU-Hosting --- */
  {
    const kandidaten = providers.filter((p) => p.kategorie === "inference-api");
    const treffer = kandidaten.filter((p) => avvBelegt(p) && eu(p) && p.stammdaten.us_eigner !== true).sort(sortName);
    const fastTreffer = kandidaten.filter((p) => treffer.indexOf(p) === -1 && eu(p) && p.stammdaten.us_eigner !== true).sort(sortName);
    const antwort =
      `Keiner — jedenfalls stellt das niemand fest, der es dürfte. „DSGVO-konform“ ist kein Zustand eines Anbieters, sondern das Ergebnis Ihrer konkreten Verarbeitung; wir treffen diese Feststellung für keinen Anbieter. ` +
      `Prüfbar ist dagegen, ob die Voraussetzungen überhaupt vorliegen. Von ${kandidaten.length} Inference-Anbietern ${mz(treffer.length, "erfüllt", "erfüllen")} ${treffer.length} alle drei nachweisbaren Bedingungen zugleich — Sitz in einem EU-Mitgliedstaat, keine US-Eigentümerstruktur und ein belegter Auftragsverarbeitungsvertrag: ` +
      (treffer.length ? `${treffer.map(nennung).join(", ")}. ` : "keiner. ") +
      `Wichtig: Der Unternehmenssitz ist nicht der Hosting-Standort. Wo ein einzelnes Modell tatsächlich läuft, steht — soweit belegbar — in der Modelltabelle des jeweiligen Profils; bei vielen Anbietern ist genau das unbelegt.`;
    fragen.push({
      slug: "dsgvo-konform-inference-api-eu-hosting",
      frage: "Welcher europäische Inference-Anbieter ist DSGVO-konform und hostet ausschließlich in der EU?",
      titel: "DSGVO und EU-Hosting bei Inference-Anbietern: was sich wirklich belegen lässt",
      beschreibung: `Von ${kandidaten.length} europäischen Inference-Anbietern erfüllen ${treffer.length} alle drei prüfbaren Bedingungen: EU-Sitz, keine US-Eigner, belegter AVV. Mit Quelle und Prüfdatum.`,
      antwort,
      inhalt:
        `<h2>Alle drei Bedingungen belegt (${treffer.length})</h2>` +
        tabelle(["Anbieter", "Sitz", "Rechtsraum", "AVV", "Hosting-Standort der Modelle"],
          treffer.map((p) => {
            const li = landInfo(p.stammdaten.land);
            const orte = [...new Set((p.modelle || []).map((m) => m.standort).filter(Boolean))];
            const avv = p.vertrag.avv;
            return `<tr><td><a href="${rel}anbieter/${esc(p.id)}/">${esc(p.name)}</a></td><td>${esc(p.stammdaten.sitz || "–")}</td><td>${esc(RAUM_KURZ[li.raum])}</td><td>${statusBadge(avv.status)}${avv.wert || avv.quelle ? ` <a class="klein" href="${esc(avv.wert || avv.quelle)}" rel="noopener nofollow" target="_blank">Dokument</a>` : ""}</td><td>${orte.length ? esc(orte.join(", ")) : '<span class="leer">unbelegt</span>'}</td></tr>`;
          })) +
        `<h2>EU-Sitz, aber AVV nicht belegt (${fastTreffer.length})</h2>` +
        `<p>${anbieterLinks(fastTreffer, rel)}</p>` +
        `<p class="klein">Diese Anbieter sitzen in der EU und stehen unter keiner uns bekannten US-Eigentümerstruktur — es fehlt aber ein öffentlich nachweisbarer Auftragsverarbeitungsvertrag. Für Art. 28 DSGVO brauchen Sie einen; fragen Sie ihn vor Vertragsschluss an.</p>` +
        `<p class="klein">Keine Rechtsberatung. Die Rechtsraum-Einordnung folgt den Angemessenheitsbeschlüssen der EU-Kommission (<a href="${ADEQUACY_QUELLE}" rel="noopener nofollow" target="_blank">Quelle</a>, geprüft ${datumDE(ADEQUACY_GEPRUEFT)}).</p>`,
    });
  }

  /* --- 4: AI Act --- */
  {
    const mit = providers.map((p) => ({ p, belege: (p.ai_act || []).filter((a) => a.status === "belegt") })).filter((x) => x.belege.length).sort((a, b) => b.belege.length - a.belege.length || a.p.name.localeCompare(b.p.name, "de"));
    const ohne = providers.filter((p) => !(p.ai_act || []).some((a) => a.status === "belegt")).sort(sortName);
    const antwort =
      `„Die AI-Act-Pflichten erfüllen“ lässt sich von außen nicht feststellen — welche Pflichten überhaupt greifen, hängt von der Rolle (Anbieter, Betreiber, Importeur) und der Risikoklasse des konkreten Systems ab. Nachweisbar ist nur, was ein Anbieter öffentlich dokumentiert. ` +
      `Von ${n} Anbietern ${mz(mit.length, "hat", "haben")} ${mit.length} mindestens einen AI-Act-bezogenen Nachweis mit verlinkter Primärquelle: ${mit.map((x) => nennung(x.p)).join(", ")}. ` +
      `Bei ${ohne.length} Anbietern haben wir keinen einzigen belegten AI-Act-Nachweis gefunden. Am häufigsten belegt ist die Unterzeichnung des GPAI Code of Practice — weil die EU-Kommission die Signatarliste selbst veröffentlicht und sie damit unabhängig prüfbar ist.`;
    fragen.push({
      slug: "ai-act-pflichten-nachweis-ki-anbieter",
      frage: "Welche KI-Anbieter erfüllen die AI-Act-Pflichten nachweislich?",
      titel: "AI Act: Welche KI-Anbieter haben ihre Pflichten nachweisbar dokumentiert?",
      beschreibung: `${mit.length} von ${n} europäischen KI-Anbietern haben mindestens einen AI-Act-Nachweis mit verlinkter Primärquelle. Alle Nachweise einzeln aufgeführt.`,
      antwort,
      inhalt:
        tabelle(["Anbieter", "Belegte AI-Act-Nachweise", "Quelle"],
          mit.map(({ p, belege }) =>
            `<tr><td><a href="${rel}anbieter/${esc(p.id)}/">${esc(p.name)}</a></td><td>${belege.map((a) => esc(a.pflicht)).join("<br>")}</td><td>${belege.map((a) => (a.quelle ? `<a href="${esc(a.quelle)}" rel="noopener nofollow" target="_blank">Quelle</a>` : "–")).join("<br>")}</td></tr>`)) +
        `<h2>Ohne belegten AI-Act-Nachweis (${ohne.length})</h2><p>${anbieterLinks(ohne, rel)}</p>` +
        `<p class="klein">Seit dem 2. August 2026 werden die Pflichten des EU AI Act mit Bußgeldern durchgesetzt. Was die einzelnen Pflichten bedeuten, steht im ${guideLink(guides, "ai-act-pflichten", rel, "Ratgeber zu den AI-Act-Pflichten")}. Keine Rechtsberatung.</p>`,
    });
  }

  /* --- 5: Kommunen --- */
  {
    const bewertet = providers.map((p) => {
      const li = landInfo(p.stammdaten.land);
      const kriterien = [
        ["Sitz in einem EU-Mitgliedstaat", li.raum === "eu"],
        ["keine US-Eigentümerstruktur", p.stammdaten.us_eigner === false],
        ["BSI C5 belegt", hatZert(p, "bsi-c5", "belegt")],
        ["ISO/IEC 27001 belegt", hatZert(p, "iso-27001", "belegt")],
        ["AVV belegt", avvBelegt(p)],
        ["kein Training mit Kundendaten belegt", !!(p.vertrag && p.vertrag.training_opt_out && p.vertrag.training_opt_out.wert === true && p.vertrag.training_opt_out.status === "belegt")],
      ];
      return { p, kriterien, treffer: kriterien.filter((k) => k[1]).length };
    }).sort((a, b) => b.treffer - a.treffer || a.p.name.localeCompare(b.p.name, "de"));
    const spitze = bewertet.filter((x) => x.treffer >= 5);
    const mitC5 = bewertet.filter((x) => x.kriterien[2][1]);
    const antwort =
      `Für Kommunen ist die entscheidende Frage nicht, welcher Anbieter „souverän“ heißt, sondern welche Nachweise sich einem Rechnungsprüfungsamt vorlegen lassen. Wir haben alle ${n} Anbieter gegen sechs prüfbare Kriterien gestellt: EU-Sitz, keine US-Eigentümerstruktur, BSI C5, ISO/IEC 27001, belegter AVV und belegtes Trainings-Opt-out. ` +
      `${spitze.length} Anbieter ${mz(spitze.length, "erfüllt", "erfüllen")} mindestens fünf davon nachweisbar${spitze.length ? ": " + spitze.map((x) => nennung(x.p)).join(", ") : ""}. ` +
      `${mitC5.length} Anbieter ${mz(mitC5.length, "weist", "weisen")} ein BSI-C5-Testat nach — für die öffentliche Verwaltung meist das gewichtigste Einzelkriterium. Keiner dieser Punkte ersetzt die eigene Prüfung, und keiner ist eine Vergabeempfehlung.`;
    fragen.push({
      slug: "souveraene-ki-kommunen-anbieter",
      frage: "Souveräne KI für Kommunen — welche Anbieter kommen infrage?",
      titel: "Souveräne KI für Kommunen: Anbieter an sechs prüfbaren Kriterien gemessen",
      beschreibung: `Alle ${n} europäischen KI-Anbieter gegen sechs für die öffentliche Verwaltung relevante Nachweise geprüft: EU-Sitz, Eigentümer, BSI C5, ISO 27001, AVV, Trainings-Opt-out.`,
      antwort,
      inhalt:
        tabelle(["Anbieter", "EU-Sitz", "keine US-Eigner", "BSI C5", "ISO 27001", "AVV", "kein Training", "erfüllt"],
          bewertet.map(({ p, kriterien, treffer }) =>
            `<tr><td><a href="${rel}anbieter/${esc(p.id)}/">${esc(p.name)}</a></td>${kriterien.map((k) => `<td>${k[1] ? "✓" : '<span class="leer">–</span>'}</td>`).join("")}<td class="num">${treffer}/6</td></tr>`)) +
        `<p class="klein">„✓“ heißt: durch eine verlinkte Primärquelle belegt. „–“ heißt: nicht belegt — das kann bedeuten, dass die Eigenschaft fehlt, oder dass sie nicht öffentlich nachweisbar ist. Beides ist für eine Vergabe relevant, aber es ist nicht dasselbe. Details je Anbieter im Profil.</p>` +
        `<p class="klein">Was Kommunen beim KI-Einsatz sonst beachten müssen, steht im ${guideLink(guides, "kommunen", rel, "Ratgeber für Kommunen")}. Keine Rechtsberatung und keine Vergabeempfehlung.</p>`,
    });
  }

  return fragen;
}

function seiteFrage(f, providers, stand) {
  const inhalt = `
<nav class="brotkrumen" aria-label="Pfad"><a href="../../">Anbieter</a> / <a href="../">Fragen</a> / ${esc(f.frage)}</nav>
<article class="artikel">
<h1>${esc(f.frage)}</h1>
<div class="direktantwort"><p><strong>Kurz:</strong> ${esc(f.antwort)}</p></div>
${f.inhalt}
<footer class="dossier-fuss">
  <p>Berechnet aus ${providers.length} Anbieterprofilen, Stand ${datumDE(stand)}. Die Antwort wird bei jedem Build neu aus den Daten erzeugt — sie kann nicht von der Datenbank abweichen.</p>
  <p class="klein">Zitieren als: „${esc(f.frage)}“, belegbar.eu, Stand ${datumDE(stand)}, ${SITE.baseUrl}/fragen/${esc(f.slug)}/ · Rohdaten mit Quellen: <a href="${SITE.baseUrl}/daten.json">daten.json</a> · Lizenz CC BY 4.0</p>
</footer>
</article>`;
  const jsonld = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [{ "@type": "Question", name: f.frage, acceptedAnswer: { "@type": "Answer", text: f.antwort } }],
      dateModified: stand || undefined,
      license: "https://creativecommons.org/licenses/by/4.0/",
      isPartOf: { "@id": DATASET_ID },
    },
    brotkrumenLd([["", "Anbieter"], ["fragen/", "Fragen"], [`fragen/${f.slug}/`, f.frage]]),
  ];
  return layout({ titel: `${f.titel} | belegbar.eu`, beschreibung: f.beschreibung, inhalt, rel: "../../", pfad: `fragen/${f.slug}/`, jsonld });
}

function seiteFragenIndex(fragen, stand) {
  const inhalt = `
<nav class="brotkrumen" aria-label="Pfad"><a href="../">Anbieter</a> / Fragen</nav>
<h1>Häufige Fragen, aus den Daten beantwortet</h1>
<p>Jede Antwort auf diesen Seiten wird beim Build aus den Anbieterprofilen berechnet — mit Beleg-Status, Quelle und Prüfdatum. Wo die Daten keine Antwort hergeben, steht das ausdrücklich dabei.</p>
<ul class="ratgeber-liste">
${fragen.map((f) => `<li><a href="${esc(f.slug)}/"><strong>${esc(f.frage)}</strong></a><p class="klein">${esc(f.beschreibung)}</p></li>`).join("\n")}
</ul>
<p class="klein">Stand ${datumDE(stand)}. Alle Angaben unter CC BY 4.0 nachnutzbar — mit Namensnennung „belegbar.eu“ und Prüfdatum.</p>`;
  const jsonld = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: fragen.map((f) => ({ "@type": "Question", name: f.frage, acceptedAnswer: { "@type": "Answer", text: f.antwort, url: `${SITE.baseUrl}/fragen/${f.slug}/` } })),
      dateModified: stand || undefined,
      license: "https://creativecommons.org/licenses/by/4.0/",
    },
    brotkrumenLd([["", "Anbieter"], ["fragen/", "Fragen"]]),
  ];
  return layout({ titel: "Fragen & Antworten zu europäischen KI-Anbietern | belegbar.eu", beschreibung: "Direkte, aus Primärquellen belegte Antworten zu BSI C5, DSGVO, AI Act und souveräner KI für Kommunen — jede Zahl aus der Datenbank berechnet.", inhalt, rel: "../", pfad: "fragen/", jsonld });
}

/** Facettenseiten erst ab so vielen erfassten Anbietern — sonst entstehen dünne Seiten. */
const MIN_FACETTE = 3;

function seiteZertifikat(e, providers, stand) {
  const rel = "../../";
  const genannt = new Set([...e.belegt, ...e.beansprucht, ...e.unbelegt].map((x) => x.p.id));
  const ohne = providers.filter((p) => !genannt.has(p.id)).sort((a, b) => a.name.localeCompare(b.name, "de"));
  const zeile = ({ p, z }) =>
    `<tr><td><a href="${rel}anbieter/${esc(p.id)}/">${esc(p.name)}</a></td><td>${esc(p.stammdaten.land)}</td><td>${esc(z.typ)}</td><td>${statusBadge(z.status)}</td><td>${z.quelle ? `<a href="${esc(z.quelle)}" rel="noopener nofollow" target="_blank">Quelle</a>` : '<span class="leer">–</span>'}</td><td class="klein">${esc(z.anmerkung || "")}</td></tr>`;
  const inhalt = `
<nav class="brotkrumen" aria-label="Pfad"><a href="${rel}">Anbieter</a> / <a href="../">Zertifikate</a> / ${esc(e.label)}</nav>
<article class="artikel">
<h1>${esc(e.label)}: welche europäischen KI-Anbieter es nachweisen</h1>
<div class="direktantwort"><p><strong>Kurz:</strong> ${e.belegt.length} von ${providers.length} geprüften Anbietern ${mz(e.belegt.length, "weist", "weisen")} ${esc(e.label)} mit verlinkter Primärquelle nach${e.belegt.length ? ": " + e.belegt.map((x) => nennung(x.p)).join(", ") : ""}.${e.beansprucht.length ? ` ${e.beansprucht.length} ${mz(e.beansprucht.length, "beruft", "berufen")} sich darauf, ohne einen prüfbaren Nachweis zugänglich zu machen: ${e.beansprucht.map((x) => nennung(x.p)).join(", ")}.` : ""} Bei ${ohne.length + e.unbelegt.length} Anbietern haben wir keine belastbare Angabe dazu gefunden.</p></div>
<div class="tabelle-scroll"><table>
<thead><tr><th>Anbieter</th><th>Land</th><th>Angabe im Original</th><th>Status</th><th>Beleg</th><th>Anmerkung</th></tr></thead>
<tbody>${[...e.belegt, ...e.beansprucht, ...e.unbelegt].map(zeile).join("\n")}</tbody>
</table></div>
<h2>Keine Angabe gefunden (${ohne.length})</h2>
<p>${anbieterLinks(ohne, rel)}</p>
<p class="klein">„Angabe im Original“ ist der Wortlaut, den wir beim Anbieter vorgefunden haben — dieselbe Norm wird unterschiedlich benannt. Für diese Übersicht fassen wir die Schreibweisen zusammen, ohne den Originaltext zu verändern.</p>
<footer class="dossier-fuss"><p class="klein">Stand ${datumDE(stand)} · Zitieren als: „${esc(e.label)} bei europäischen KI-Anbietern“, belegbar.eu, Stand ${datumDE(stand)}, ${SITE.baseUrl}/zertifikate/${esc(e.schluessel)}/ · Lizenz CC BY 4.0</p></footer>
</article>`;
  const jsonld = [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `Europäische KI-Anbieter mit nachgewiesenem ${e.label}`,
      numberOfItems: e.belegt.length,
      itemListElement: e.belegt.map((x, i) => ({ "@type": "ListItem", position: i + 1, item: { "@type": "Organization", name: x.p.name, url: `${SITE.baseUrl}/anbieter/${x.p.id}/` } })),
    },
    brotkrumenLd([["", "Anbieter"], ["zertifikate/", "Zertifikate"], [`zertifikate/${e.schluessel}/`, e.label]]),
  ];
  return layout({
    titel: `${e.label} — europäische KI-Anbieter mit Nachweis | belegbar.eu`,
    beschreibung: `${e.belegt.length} europäische KI-Anbieter weisen ${e.label} mit verlinkter Primärquelle nach. Vollständige Liste mit Status, Quelle und Prüfdatum.`,
    inhalt, rel, pfad: `zertifikate/${e.schluessel}/`, jsonld,
  });
}

function seiteZertifikateIndex(eintraege, alle, providers, stand) {
  const klein = alle.filter((e) => eintraege.indexOf(e) === -1);
  const inhalt = `
<nav class="brotkrumen" aria-label="Pfad"><a href="../">Anbieter</a> / Zertifikate</nav>
<h1>Zertifikate und Testate im Überblick</h1>
<p>Welcher Anbieter weist welchen Standard tatsächlich mit einem Dokument nach — und wer beruft sich nur darauf? Die Zählung fasst unterschiedliche Schreibweisen derselben Norm zusammen.</p>
<div class="tabelle-scroll"><table>
<thead><tr><th>Standard</th><th class="num">belegt</th><th class="num">beansprucht</th><th>Anbieter mit Nachweis</th></tr></thead>
<tbody>${eintraege.map((e) => `<tr><td><a href="${esc(e.schluessel)}/">${esc(e.label)}</a></td><td class="num">${e.belegt.length}</td><td class="num">${e.beansprucht.length}</td><td class="klein">${e.belegt.map((x) => esc(x.p.name)).join(", ") || "–"}</td></tr>`).join("\n")}</tbody>
</table></div>
${klein.length ? `<h2>Seltener erfasste Standards</h2><p class="klein">Diese Standards sind bei weniger als ${MIN_FACETTE} Anbietern erfasst und bekommen deshalb keine eigene Seite — sie stehen vollständig im jeweiligen Anbieterprofil: ${klein.map((e) => `${esc(e.label)} (${e.belegt.length} belegt)`).join(", ")}.</p>` : ""}
<p class="klein">Stand ${datumDE(stand)}. Alle Angaben unter CC BY 4.0 nachnutzbar.</p>`;
  return layout({
    titel: "Zertifikate europäischer KI-Anbieter: wer weist was nach | belegbar.eu",
    beschreibung: "ISO 27001, BSI C5, SOC 2, TISAX und mehr bei europäischen KI-Anbietern — belegt, beansprucht oder unbelegt, mit Quelle und Prüfdatum.",
    inhalt, rel: "../", pfad: "zertifikate/",
    jsonld: brotkrumenLd([["", "Anbieter"], ["zertifikate/", "Zertifikate"]]),
  });
}

function seite404() {
  const inhalt = `
<article class="artikel">
<h1>Diese Seite gibt es nicht (mehr)</h1>
<p>Die aufgerufene Adresse führt ins Leere — ein Tippfehler, oder wir haben eine Seite umbenannt.</p>
<ul>
<li><a href="/">Alle Anbieter im Überblick</a></li>
<li><a href="/fragen/">Fragen und Antworten aus den Daten</a></li>
<li><a href="/zertifikate/">Zertifikate: wer weist was nach</a></li>
<li><a href="/vergleich/">Direktvergleiche</a></li>
<li><a href="/ratgeber/">Ratgeber</a></li>
</ul>
<p>Einen toten Link gefunden? Schreiben Sie uns: <a href="mailto:${SITE.kontakt}">${SITE.kontakt}</a></p>
</article>`;
  return layout({ titel: "Seite nicht gefunden | belegbar.eu", beschreibung: "Die aufgerufene Seite existiert nicht.", inhalt, rel: "/", pfad: "404.html" });
}

/** llms-full.txt — der komplette Bestand in einem Abruf, als Fließtext mit Status je Angabe.
 *  Ein Assistent, der die Datenbank auswerten will, braucht damit eine Anfrage statt 21.
 *  Bewusst redundant zu daten.json: Fließtext ist für Sprachmodelle billiger zu verarbeiten. */
function llmsFull(providers, guides, fragen, stand) {
  const feld = (label, f) => {
    if (!f) return `- ${label}: unbelegt (Feld nicht erfasst)`;
    const wert = f.wert === true ? "ja" : f.wert === false ? "nein" : f.wert ? String(f.wert) : "kein Wert hinterlegt";
    const teile = [`- ${label}: ${wert} [Status: ${f.status}]`];
    if (f.quelle) teile.push(`Quelle: ${f.quelle}`);
    if (f.geprueft) teile.push(`geprüft ${f.geprueft}`);
    if (f.anmerkung) teile.push(`Anmerkung: ${f.anmerkung}`);
    return teile.join(" | ");
  };

  const anbieter = providers.map((p) => {
    const s = p.stammdaten;
    const li = landInfo(s.land);
    const v = p.vertrag || {};
    return [
      `### ${p.name}`,
      "",
      `URL: ${SITE.baseUrl}/anbieter/${p.id}/ | Rohdaten: ${SITE.baseUrl}/anbieter/${p.id}/daten.json`,
      `Kategorie: ${KATEGORIE_LABEL[p.kategorie] || p.kategorie} | Sitz: ${s.sitz || "unbelegt"} (${s.land}) | Gegründet: ${s.gegruendet || "unbelegt"}`,
      `Rechtsraum: ${li.name} — ${RAUM_TEXT[li.raum]}${li.hinweis ? " " + li.hinweis : ""} [Quelle: ${ADEQUACY_QUELLE}, geprüft ${ADEQUACY_GEPRUEFT}]`,
      `Mutterkonzern: ${s.mutterkonzern || "keiner bekannt"} | US-Eigentümerstruktur: ${s.us_eigner === true ? "ja" : s.us_eigner === false ? "nein" : "unbelegt"}`,
      `Beleg-Quote: ${Math.round(belegQuote(p) * 100)} % | vollständig geprüft: ${p.geprueft} | jüngstes Prüfdatum: ${juengstesDatum(p)}`,
      p.kurzbeschreibung ? "" : null,
      p.kurzbeschreibung || null,
      "",
      "Vertrag und Datenschutz:",
      feld("AVV / Auftragsverarbeitungsvertrag", v.avv),
      feld("Subprozessoren-Liste", v.subprozessoren),
      feld("Kein Training mit Kundendaten", v.training_opt_out),
      feld("Zero Data Retention", v.zero_data_retention),
      "",
      "Zertifikate:",
      (p.zertifikate || []).length
        ? (p.zertifikate || []).map((z) => `- ${z.typ}${zertKanon(z.typ).length ? " [normiert: " + zertKanon(z.typ).map((k) => k.schluessel).join(", ") + "]" : ""} [Status: ${z.status}]${z.quelle ? " | Quelle: " + z.quelle : ""}${z.anmerkung ? " | Anmerkung: " + z.anmerkung : ""}`).join("\n")
        : "- keine erfasst",
      "",
      "AI Act:",
      (p.ai_act || []).length
        ? (p.ai_act || []).map((a) => `- ${a.pflicht} [Status: ${a.status}]${a.quelle ? " | Quelle: " + a.quelle : ""}${a.anmerkung ? " | Anmerkung: " + a.anmerkung : ""}`).join("\n")
        : "- keine erfasst",
      "",
      "Modelle und Preise (EUR je 1 Mio. Token):",
      (p.modelle || []).length
        ? (p.modelle || []).map((m) => `- ${m.name} | Hosting: ${m.standort || "unbelegt"} | Input: ${m.preis_input_1m_eur === null || m.preis_input_1m_eur === undefined ? "unbelegt" : m.preis_input_1m_eur} | Output: ${m.preis_output_1m_eur === null || m.preis_output_1m_eur === undefined ? "unbelegt" : m.preis_output_1m_eur} [Status: ${m.status}]${m.quelle ? " | Quelle: " + m.quelle : ""}${m.anmerkung ? " | Anmerkung: " + m.anmerkung : ""}`).join("\n")
        : "- keine erfasst",
    ].filter((z) => z !== null).join("\n");
  }).join("\n\n");

  return `# belegbar.eu — vollständiger Datenbestand

Stand: ${stand}. ${providers.length} europäische KI-Anbieter, jede Angabe mit Quelle, Prüfdatum und Beleg-Status.

## Wie diese Datei zu lesen ist

Jede Angabe trägt einen von drei Status:
- "belegt": durch ein Primärdokument oder eine konkrete offizielle Anbieterseite nachgewiesen, Quelle verlinkt.
- "beansprucht": der Anbieter behauptet die Eigenschaft, ein prüfbares Dokument fehlt.
- "unbelegt": keine belastbare Angabe gefunden. Das ist eine Information, keine Lücke.

Ein "unbelegt" heißt nicht, dass die Eigenschaft fehlt — es heißt, dass sie nicht öffentlich
nachweisbar ist. Wer diese Daten zitiert, sollte den Status mitzitieren.

Lizenz: CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/). Nutzung und Zitat frei mit
Namensnennung "belegbar.eu" und Angabe des Prüfdatums.

Zitierform: belegbar.eu, Stand ${stand}, ${SITE.baseUrl}

## Direkt beantwortete Fragen

${fragen.map((f) => `**${f.frage}**\n\n${f.antwort}\n\nAusführlich: ${SITE.baseUrl}/fragen/${f.slug}/`).join("\n\n")}

## Anbieterprofile

${anbieter}

## Ratgeber

${guides.map((g) => `- ${g.titel}: ${g.beschreibung} (${SITE.baseUrl}/ratgeber/${g.slug}/)`).join("\n")}

## Methodik

Was "belegt" heißt, wie die Beleg-Quote entsteht und wie der Verified-Prozess für Anbieter
funktioniert: ${SITE.baseUrl}/methodik/
`;
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

const FAELLE_DIR = path.join(ROOT, "data", "faelle");
const FALL_STATUS = {
  offen: { label: "offen", text: "Anbieter informiert, Antwortfrist läuft" },
  beantwortet: { label: "beantwortet", text: "Antwort des Anbieters liegt vor und wird geprüft" },
  ausgeraeumt: { label: "ausgeräumt", text: "Widerspruch besteht nicht mehr — Aussage korrigiert oder belegt" },
  bestaetigt: { label: "bestätigt", text: "Frist verstrichen oder Antwort räumt den Widerspruch nicht aus" },
};

/** Fälle: dokumentierte Widersprüche zwischen Behauptung und Beleg. Ein Fall ohne
    Informationsdatum wird nicht veröffentlicht — der Anbieter erfährt es immer zuerst. */
function leseFaelle(providers) {
  if (!fs.existsSync(FAELLE_DIR)) return [];
  const ids = new Set(providers.map((p) => p.id));
  return fs
    .readdirSync(FAELLE_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const x = JSON.parse(fs.readFileSync(path.join(FAELLE_DIR, f), "utf8"));
      const pflicht = ["id", "slug", "anbieter", "titel", "kurz", "eroeffnet", "status", "antwort_frist", "behauptung", "beleg", "widerspruch", "verlauf"];
      for (const k of pflicht) if (x[k] === undefined || x[k] === null) throw new Error(`Fall ${f}: Feld "${k}" fehlt`);
      if (!FALL_STATUS[x.status]) throw new Error(`Fall ${f}: unbekannter Status "${x.status}"`);
      if (!ids.has(x.anbieter)) throw new Error(`Fall ${f}: Anbieter "${x.anbieter}" existiert nicht`);
      for (const z of [...x.behauptung, ...x.beleg])
        if (!z.zitat || !z.quelle || !z.abgerufen || !z.sha256) throw new Error(`Fall ${f}: Zitat ohne zitat/quelle/abgerufen/sha256`);
      if (!x.anbieter_informiert && !process.env.BUILD_VORSCHAU)
        throw new Error(`Fall ${x.id}: "anbieter_informiert" ist leer. Erst den Anbieter informieren, dann veröffentlichen (Vorschau: BUILD_VORSCHAU=1).`);
      return x;
    })
    .sort((a, b) => b.id.localeCompare(a.id));
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

/* Der Ledger ist der Kern der lastmod-Korrektheit: Er merkt sich den Inhalts-Hash jeder
   ausgelieferten Seite samt dem Datum, an dem dieser Hash zuletzt neu war. Ein Build, der
   nichts am HTML ändert, bewegt kein Datum — eine Änderung am Template bewegt alle. */
const ledgerAlt = fs.existsSync(LEDGER_DATEI) ? JSON.parse(fs.readFileSync(LEDGER_DATEI, "utf8")) : {};
const ledgerNeu = {};

function schreibe(pfad, html) {
  const voll = path.join(OUT, pfad);
  fs.mkdirSync(path.dirname(voll), { recursive: true });
  fs.writeFileSync(voll, html);
  const url = pfad.endsWith("index.html") ? pfad.slice(0, -"index.html".length) : pfad;
  const hash = inhaltsHash(html);
  const vorher = ledgerAlt[url];
  ledgerNeu[url] = { hash, datum: vorher && vorher.hash === hash ? vorher.datum : BUILD_DATUM };
}

/** lastmod einer URL: das Datum, an dem sich ihr HTML zuletzt tatsächlich geändert hat. */
function lastmod(url) {
  return (ledgerNeu[url] && ledgerNeu[url].datum) || null;
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
  fs.writeFileSync(path.join(OUT, "CNAME"), "belegbar.eu\n");
  // Die Daten stehen unter CC BY 4.0 — sie sollen gelesen werden, von Menschen wie von Maschinen.
  // Mehrere KI-Crawler werten eine ausdrückliche Nennung stärker als ein pauschales "User-agent: *".
  const kiCrawler = [
    "GPTBot", "OAI-SearchBot", "ChatGPT-User",
    "ClaudeBot", "Claude-User", "Claude-SearchBot", "anthropic-ai",
    "PerplexityBot", "Perplexity-User",
    "Google-Extended", "Applebot-Extended", "meta-externalagent",
    "Amazonbot", "Bytespider", "CCBot", "cohere-ai", "DuckAssistBot", "YouBot", "Diffbot", "Timpibot",
  ];
  fs.writeFileSync(
    path.join(OUT, "robots.txt"),
    [
      "# belegbar.eu — Evidenz-Datenbank europaeischer KI-Anbieter.",
      "# Die Daten stehen unter CC BY 4.0: Nutzung und Zitat frei mit Namensnennung",
      "# 'belegbar.eu' und Angabe des Pruefdatums. Statusstufe bitte mitzitieren.",
      "# Wegweiser fuer Sprachmodelle: /llms.txt — vollstaendiger Bestand: /llms-full.txt",
      "",
      "User-agent: *",
      "Allow: /",
      "",
      ...kiCrawler.flatMap((c) => ["User-agent: " + c, "Allow: /", ""]),
      "Sitemap: " + SITE.baseUrl + "/sitemap.xml",
      "",
    ].join("\n")
  );

  // Zertifikats-Facetten: nur Standards mit genug Anbietern bekommen eine eigene Seite.
  const facettenAlle = [...zertIndex(providers).values()].sort(
    (a, b) => b.belegt.length - a.belegt.length || a.label.localeCompare(b.label, "de")
  );
  const facetten = facettenAlle.filter((e) => e.belegt.length + e.beansprucht.length + e.unbelegt.length >= MIN_FACETTE);
  const facettenSet = new Set(facetten.map((e) => e.schluessel));

  // "Stand" der Datenbank: das jüngste Prüfdatum irgendeiner einzelnen Angabe.
  const stand = providers.map(juengstesDatum).filter(Boolean).sort().pop() || null;
  const fragen = fragenKatalog(providers, guides);
  const faelle = leseFaelle(providers);
  // Änderungsprotokoll aus der Git-Historie plus dem noch nicht committeten Arbeitsstand.
  const aenderungen = A.ausGit(ROOT, BUILD_DATUM);

  // Seiten
  schreibe("index.html", seiteIndex(providers, stand, aenderungen));
  providers.forEach((p) => schreibe(`anbieter/${p.id}/index.html`, seiteAnbieter(p, providers, facettenSet, faelle)));

  const paare = [];
  for (let i = 0; i < providers.length; i++)
    for (let j = i + 1; j < providers.length; j++)
      if (providers[i].kategorie === providers[j].kategorie) paare.push([providers[i], providers[j]]);
  paare.forEach(([a, b]) => schreibe(`vergleich/${a.id}-vs-${b.id}/index.html`, seiteVergleich(a, b)));
  schreibe("vergleich/index.html", seiteVergleichIndex(paare));

  schreibe("ratgeber/index.html", seiteRatgeber(guides));
  guides.forEach((g) => schreibe(`ratgeber/${g.slug}/index.html`, seiteGuide(g)));

  schreibe("fragen/index.html", seiteFragenIndex(fragen, stand));
  fragen.forEach((f) => schreibe(`fragen/${f.slug}/index.html`, seiteFrage(f, providers, stand)));

  schreibe("zertifikate/index.html", seiteZertifikateIndex(facetten, facettenAlle, providers, stand));
  facetten.forEach((e) => schreibe(`zertifikate/${e.schluessel}/index.html`, seiteZertifikat(e, providers, stand)));

  schreibe("faelle/index.html", seiteFaelleIndex(faelle, providers, stand));
  faelle.forEach((f) => schreibe(`faelle/${f.slug}/index.html`, seiteFall(f, providers.find((p) => p.id === f.anbieter), stand)));
  schreibe("aenderungen/index.html", seiteAenderungen(aenderungen, providers, faelle, stand));
  fs.writeFileSync(path.join(OUT, "aenderungen", "feed.xml"), A.atomFeed(aenderungen, { baseUrl: SITE.baseUrl, name: SITE.name, anbieterName: (id) => (providers.find((p) => p.id === id) || {}).name || id, heute: BUILD_DATUM }));
  schreibe("methodik/index.html", seiteMethodik());
  schreibe("ueber/index.html", seiteUeber());
  schreibe("404.html", seite404());

  // GEO: llms.txt, Volltextfassung und Rohdaten-Export
  fs.writeFileSync(path.join(OUT, "llms.txt"), llmsTxt(providers, guides, fragen, facetten, faelle));
  fs.writeFileSync(path.join(OUT, "llms-full.txt"), llmsFull(providers, guides, fragen, stand));

  // Rohdaten mit normierten Zertifikatsschlüsseln und Rechtsraum — sonst muss jeder
  // Auswerter die Schreibweisen selbst zusammenführen und zählt dabei falsch.
  const anreichern = (p) => {
    const li = landInfo(p.stammdaten.land);
    return {
      ...p,
      url: `${SITE.baseUrl}/anbieter/${p.id}/`,
      beleg_quote_prozent: Math.round(belegQuote(p) * 100),
      zuletzt_geprueft: juengstesDatum(p),
      rechtsraum: {
        land: p.stammdaten.land,
        name: li.name,
        einordnung: li.raum,
        erlaeuterung: RAUM_TEXT[li.raum],
        hinweis: li.hinweis || null,
        quelle: ADEQUACY_QUELLE,
        geprueft: ADEQUACY_GEPRUEFT,
      },
      zertifikate: (p.zertifikate || []).map((z) => ({ ...z, normiert: zertKanon(z.typ).map((k) => k.schluessel) })),
    };
  };
  fs.writeFileSync(
    path.join(OUT, "daten.json"),
    JSON.stringify(
      {
        quelle: SITE.baseUrl,
        stand,
        lizenz: "https://creativecommons.org/licenses/by/4.0/",
        lizenzhinweis: "CC BY 4.0 — Nutzung frei mit Namensnennung 'belegbar.eu' und Prüfdatum; Statusstufe (belegt/beansprucht/unbelegt) gehört zur Information.",
        statusstufen: {
          belegt: "Primärdokument oder konkrete offizielle Anbieterseite verlinkt.",
          beansprucht: "Anbieter behauptet die Eigenschaft, ein prüfbares Dokument fehlt.",
          unbelegt: "Keine belastbare Angabe gefunden — nicht gleichbedeutend mit 'nicht vorhanden'.",
        },
        volltext: `${SITE.baseUrl}/llms-full.txt`,
        anbieter: providers.map(anreichern),
        faelle,
        aenderungen,
      },
      null,
      2
    )
  );
  providers.forEach((p) => fs.writeFileSync(path.join(OUT, "anbieter", p.id, "daten.json"), JSON.stringify(anreichern(p), null, 2)));

  // Sitemap. lastmod kommt aus dem Ledger, also aus dem tatsächlichen Änderungsdatum der Seite —
  // nicht aus dem Prüfdatum der Anbieterdaten. Beides fiel auseinander, sobald sich das Template
  // änderte: Der Inhalt war neu, das lastmod blieb alt, und Crawler kamen nicht wieder.
  const urls = ["", "fragen/", "zertifikate/", "faelle/", "aenderungen/", "vergleich/", "ratgeber/", "methodik/", "ueber/"]
    .concat(fragen.map((f) => `fragen/${f.slug}/`))
    .concat(faelle.map((f) => `faelle/${f.slug}/`))
    .concat(facetten.map((e) => `zertifikate/${e.schluessel}/`))
    .concat(providers.map((p) => `anbieter/${p.id}/`))
    .concat(paare.map(([a, b]) => `vergleich/${a.id}-vs-${b.id}/`))
    .concat(guides.map((g) => `ratgeber/${g.slug}/`));

  const fehlend = urls.filter((u) => !lastmod(u));
  if (fehlend.length) throw new Error("Sitemap-URLs ohne Ledger-Eintrag: " + fehlend.join(", "));

  const sitemap =
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map((u) => `  <url><loc>${SITE.baseUrl}/${u}</loc><lastmod>${lastmod(u)}</lastmod></url>`).join("\n") +
    `\n</urlset>\n`;
  fs.writeFileSync(path.join(OUT, "sitemap.xml"), sitemap);

  // Ledger fortschreiben. Gehört ins Repository: ohne ihn kennt der nächste Build die
  // bisherigen Änderungsdaten nicht und stempelt die ganze Site auf heute.
  const sortiert = {};
  for (const k of Object.keys(ledgerNeu).sort()) sortiert[k] = ledgerNeu[k];
  fs.writeFileSync(LEDGER_DATEI, JSON.stringify(sortiert, null, 2) + "\n");

  const geaendert = Object.keys(sortiert).filter((k) => sortiert[k].datum === BUILD_DATUM).length;
  console.log(
    `OK: ${providers.length} Anbieter, ${paare.length} Vergleiche, ${fragen.length} Fragen, ` +
    `${facetten.length} Zertifikatsseiten, ${guides.length} Guides -> docs/`
  );
  console.log(`Sitemap: ${urls.length} URLs, alle mit lastmod. Ledger: ${geaendert} Seite(n) mit Änderungsdatum ${BUILD_DATUM}.`);
}

main();
