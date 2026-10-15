"use strict";
/** Liest eine Ratgeber-Quelle (guides/*.html) in { ...META, html }. Zeilenenden werden auf LF
 *  vereinheitlicht: Ein Windows-Checkout mit core.autocrlf=true liefert CRLF, und weil der
 *  lastmod-Ledger das fertige HTML hasht, bekämen sonst alle Ratgeber-Seiten ein falsches
 *  „geändert heute“ in der Sitemap (Befund Dauerlauf 10.10.2026, frischer Arbeitsbaum). */

function leseGuideText(raw, dateiname) {
  const text = String(raw).replace(/\r\n?/g, "\n");
  const m = text.match(/^<!--META\s*(\{[\s\S]*?\})\s*-->/);
  if (!m) throw new Error(`Guide ohne META-Kopf: ${dateiname}`);
  const meta = JSON.parse(m[1]);
  return { ...meta, html: text.slice(m[0].length).trim() };
}

/* Fußzeile der Ratgeber-Seite. Ein Guide ohne „stand“ wurde seit der ersten Fassung
   (August 2026) nicht nachgeprüft und sagt das auch. */
function standText(g) {
  if (!g.stand) return "Stand: August 2026";
  if (!/^\d{2}\.\d{2}\.\d{4}$/.test(g.stand)) throw new Error(`Guide ${g.slug}: stand muss TT.MM.JJJJ sein`);
  return `Stand: ${g.stand} (Rechtsstand geprüft)`;
}

module.exports = { leseGuideText, standText };
