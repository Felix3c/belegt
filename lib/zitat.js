"use strict";
/** Zitiervorschläge für Profil- und Fallseiten. Reine Textfunktionen, damit der Wortlaut
 *  an einer Stelle steht und getestet ist; build.js rendert daraus die Zitier-Box. */

const LIZENZ = "Lizenz CC BY 4.0";

function datumDE(iso) {
  if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return "unbekannt";
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}

function zitatProfil(p, stand, baseUrl) {
  return `„${p.name} — Beleg-Check“, belegbar.eu, Stand ${datumDE(stand)}, ${baseUrl}/anbieter/${p.id}/, ${LIZENZ}`;
}

function zitatFall(f, stand, baseUrl, statusLabel) {
  return `„Fall ${f.id} — ${f.titel}“, belegbar.eu, Status ${statusLabel}, Stand ${datumDE(stand)}, ${baseUrl}/faelle/${f.slug}/, ${LIZENZ}`;
}

module.exports = { zitatProfil, zitatFall };
