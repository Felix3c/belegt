"use strict";
/**
 * Technik-Teil der Kill-Check-Messung (MESSUNG.md, 03./08./10.10.2026): zwölf Pfade müssen 200 liefern,
 * Sitemap live wird gegen den Build gezählt. Reine Funktionen; Abruf macht messung.js.
 */

const PFADE = [
  "/", "/llms.txt", "/llms-full.txt", "/daten.json", "/sitemap.xml", "/robots.txt",
  "/fragen/", "/zertifikate/", "/fuer-anbieter/", "/fuer-kaeufer/", "/faelle/", "/methodik/",
];

function zaehleSitemapUrls(xml) {
  return (String(xml || "").match(/<loc>/g) || []).length;
}

// status: { pfad: HTTP-Status } – fehlender Eintrag = Abruf gescheitert.
// Live ≠ Build ist kein Fehler: main liegt oft lokal vor origin, bis Felix pusht.
function bewerteTechnik(status, sitemapLive, sitemapBuild) {
  const fehler = PFADE.filter((p) => status[p] !== 200).map((p) => p + (status[p] ? " " + status[p] : " kein Abruf"));
  const gut = PFADE.length - fehler.length;
  const sitemap = sitemapLive === sitemapBuild
    ? "Sitemap live " + sitemapLive + " = Build " + sitemapBuild
    : "Sitemap live " + sitemapLive + ", Build " + sitemapBuild + " (Unterschied " + Math.abs(sitemapLive - sitemapBuild) + ", Push ausstehend?)";
  const zeile = "Technik: " + gut + "/" + PFADE.length + " = 200" + (fehler.length ? " (" + fehler.join(", ") + ")" : "") + "; " + sitemap + ".";
  return { ok: fehler.length === 0, fehler, zeile };
}

module.exports = { PFADE, zaehleSitemapUrls, bewerteTechnik };
