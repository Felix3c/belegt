"use strict";
/** Vorauswahl an einer Stelle (Fachantwort eines Prüfers 23.10.2026, Felix' „ja“ zu Frage 531).
 *
 *  Drei Felder je Anbieter unter `vertrag`, je { wert, status, quelle, geprueft, anmerkung }:
 *    tom                    Link zur öffentlichen Beschreibung der technischen und organisatorischen Maßnahmen
 *    subprozessoren_anzahl  Zahl der Einträge in der öffentlichen Unterauftragnehmer-Liste, am Prüftag gezählt
 *    drittlaender           Länder außerhalb von EU/EWR, in denen laut Liste Unterauftragnehmer sitzen
 *  Ohne Wert („ungeklärt“) beginnt die Anmerkung mit „Ungeklärt:“ und sagt, woran es hängt.
 *  Die Tabelle stellt diese drei mit Preis und AVV-Link zusammen; sie bewertet nichts. */

const FELDER = ["tom", "subprozessoren_anzahl", "drittlaender"];
const STATUS = ["belegt", "beansprucht", "unbelegt"];
const EU_EWR = new Set([
  "Belgien", "Bulgarien", "Dänemark", "Deutschland", "Estland", "Finnland", "Frankreich", "Griechenland", "Irland",
  "Italien", "Kroatien", "Lettland", "Litauen", "Luxemburg", "Malta", "Niederlande", "Österreich", "Polen", "Portugal",
  "Rumänien", "Schweden", "Slowakei", "Slowenien", "Spanien", "Tschechien", "Ungarn", "Zypern",
  "Island", "Liechtenstein", "Norwegen",
]);

function pruefeWert(k, w) {
  if (w === null || w === undefined) return null;
  if (k === "tom") return typeof w === "string" && /^https:\/\//.test(w) ? null : "wert muss eine https-URL sein";
  if (k === "subprozessoren_anzahl") return Number.isInteger(w) && w >= 0 ? null : "wert muss eine ganze Zahl ab 0 sein";
  if (!Array.isArray(w) || w.some((x) => typeof x !== "string" || !x)) return "wert muss eine Liste von Ländernamen sein";
  const meldungen = w.filter((x) => EU_EWR.has(x)).map((x) => `${x} liegt in EU/EWR, ist kein Drittland`);
  const sortiert = [...w].sort((a, b) => a.localeCompare(b, "de"));
  if (!sortiert.every((x, i) => x === w[i])) meldungen.push("Länder bitte alphabetisch");
  return meldungen.length ? meldungen.join("; ") : null;
}

/** Fehlerliste für ein Profil (leer = in Ordnung). */
function pruefe(p) {
  const v = p.vertrag || {};
  const fehler = [];
  for (const k of FELDER) {
    const f = v[k];
    if (!f) { fehler.push(`${k} fehlt`); continue; }
    if (!STATUS.includes(f.status)) fehler.push(`${k}: Status „${f.status}“ unbekannt`);
    const wf = pruefeWert(k, f.wert);
    if (wf) fehler.push(`${k}: ${wf}`);
    const ohneWert = f.wert === null || f.wert === undefined;
    if (f.status === "belegt") {
      if (ohneWert) fehler.push(`${k}: belegt ohne Wert`);
      if (!f.quelle) fehler.push(`${k}: belegt ohne Quelle`);
      if (!f.geprueft) fehler.push(`${k}: belegt ohne Prüfdatum`);
    }
    if (ohneWert && !/^Ungeklärt:/.test(f.anmerkung || "")) fehler.push(`${k}: ohne Wert muss die Anmerkung mit „Ungeklärt:“ beginnen`);
  }
  return fehler;
}

const UNGEKLAERT = '<span class="leer">ungeklärt</span>';

/** HTML je Zelle; `h` = { esc, datumDE, preisKurz }. Jede Zelle trägt ihr Prüfdatum als title. */
function zellen(p, h) {
  const v = p.vertrag || {};
  const titel = (f) => (f && f.geprueft ? ` title="Stand ${h.esc(h.datumDE(f.geprueft))}${f.status !== "belegt" ? ", " + h.esc(f.status) : ""}"` : "");
  const link = (url, text) => `<a href="${h.esc(url)}" rel="noopener nofollow" target="_blank">${h.esc(text)}</a>`;
  const a = v.subprozessoren_anzahl, d = v.drittlaender, t = v.tom;
  const listeUrl = v.subprozessoren && /^https?:\/\//.test(v.subprozessoren.wert || "") ? v.subprozessoren.wert : null;
  const hat = (f) => f && f.wert !== null && f.wert !== undefined;
  return {
    preis: (() => { const k = h.preisKurz(p); return k === "–" ? `<a href="../anbieter/${h.esc(p.id)}/">kein EUR-Preis erfasst, siehe Profil</a>` : h.esc(k); })(),
    avv: v.avv && v.avv.wert ? link(v.avv.wert, "AVV") : UNGEKLAERT,
    anzahl: `<span${titel(a)}>${hat(a) ? (listeUrl ? link(listeUrl, String(a.wert)) : h.esc(String(a.wert))) : UNGEKLAERT}</span>`,
    laender: `<span${titel(d)}>${hat(d) ? (d.wert.length ? h.esc(d.wert.join(", ")) : "keine (alle in EU/EWR)") : UNGEKLAERT}</span>`,
    tom: `<span${titel(t)}>${hat(t) ? link(t.wert, "TOM") : t && t.status === "beansprucht" ? "nur auf Anfrage" : UNGEKLAERT}</span>`,
  };
}

/** Die ganze Tabelle, alphabetisch nach Anbieter. Profil-Links relativ zu /vorauswahl/. */
function tabelle(providers, h) {
  const zeilen = [...providers].sort((x, y) => x.name.localeCompare(y.name, "de")).map((p) => {
    const z = zellen(p, h);
    return `<tr class="va-zeile"><td><a href="../anbieter/${h.esc(p.id)}/">${h.esc(p.name)}</a></td><td>${z.preis}</td><td class="num">${z.anzahl}</td><td>${z.laender}</td><td>${z.avv}</td><td>${z.tom}</td></tr>`;
  });
  return `<div class="tabelle-scroll"><table>
<thead><tr><th>Anbieter</th><th>Preis (günstigster in EUR)</th><th class="num">Unterauftragnehmer</th><th>Drittländer der Unterauftragnehmer</th><th>AVV</th><th>Sicherheitsmaßnahmen</th></tr></thead>
<tbody>
${zeilen.join("\n")}
</tbody>
</table></div>`;
}

/* ---- CSV zum Herunterladen (WX-CSV, 25.10.2026): Prüfer führen die Dienstleister-Prüfung in Excel. ---- */

const P = require("./preise.js");
const UNG = "ungeklärt";

/** Ein Feld für Excel (Semikolon-Trenner): Formelzeichen vorne entschärfen, bei Bedarf quoten. */
function csvFeld(x) {
  let s = x === null || x === undefined ? "" : String(x);
  if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
  return /[;"\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

/** Das Modell, aus dem der günstigste Preis stammt (für Quelle und Datum). */
function preisModell(p) {
  const g = P.guenstigsterPreis(p);
  const ms = p.modelle || [];
  if (!g) return null;
  if (g.art === "token") return ms.find((m) => m.preis_input_1m_eur === g.wert) || null;
  if (g.art === "einheit") return ms.find((m) => m.preis_einheit === g.einheit && m.preis_ab_eur === g.wert) || null;
  if (g.art === "kostenlos") return ms.find((m) => P.preisArt(m) === "kostenlos" || m.preis_input_1m_eur === 0) || null;
  return ms[0] || null;
}

/** Drei Spalten je Wert: Wert, Quelle, geprüft am. Ohne Wert „ungeklärt“ und leere Quelle. */
function drei(wert, quelle, geprueft, h) {
  if (wert === null || wert === undefined || wert === "") return [UNG, "", ""];
  return [wert, quelle || "", geprueft ? h.datumDE(geprueft) : ""];
}

/** Wie die Webseite: Preis belegt, aber nicht in Euro (meist nur USD). */
const KEIN_EUR = "kein EUR-Preis erfasst, siehe Profil";

/** Eine CSV-Zeile je Anbieter als Feldliste; `h` = { datumDE, preisKurz, baseUrl }. */
function csvZeile(p, h) {
  const v = p.vertrag || {};
  const hat = (f) => f && f.wert !== null && f.wert !== undefined;
  const k = h.preisKurz(p), pm = preisModell(p);
  const a = v.subprozessoren_anzahl, d = v.drittlaender, t = v.tom, avv = v.avv;
  const listeUrl = v.subprozessoren && /^https?:\/\//.test(v.subprozessoren.wert || "") ? v.subprozessoren.wert : null;
  const zert = (p.zertifikate || []).filter((c) => c.status === "belegt");
  const zQuellen = [...new Set(zert.map((c) => c.quelle).filter(Boolean))];
  const zDatum = zert.map((c) => c.geprueft).filter(Boolean).sort().pop();
  return [
    p.name, `${h.baseUrl}/anbieter/${p.id}/`,
    ...(k === "–" && (p.modelle || []).some((m) => m.quelle)
      ? drei(KEIN_EUR, `${h.baseUrl}/anbieter/${p.id}/`, p.geprueft, h)
      : drei(k === "–" ? null : k, pm && pm.quelle, pm && (pm.geprueft || p.geprueft), h)),
    ...drei(hat(a) ? String(a.wert) : null, a && (a.quelle || listeUrl), a && a.geprueft, h),
    ...drei(hat(d) ? (d.wert.length ? d.wert.join(", ") : "keine (alle in EU/EWR)") : null, d && d.quelle, d && d.geprueft, h),
    ...drei(avv && avv.wert ? avv.wert : null, avv && (avv.quelle || avv.wert), avv && avv.geprueft, h),
    ...drei(hat(t) ? t.wert : t && t.status === "beansprucht" ? "nur auf Anfrage" : null, t && (t.quelle || t.wert), t && t.geprueft, h),
    zert.length ? zert.map((c) => c.typ).join(", ") : "keine belegt", zQuellen.join(" | "), zDatum ? h.datumDE(zDatum) : "",
  ];
}

const CSV_SPALTEN = [
  "Anbieter", "Profil",
  "Preis (günstigster in EUR)", "Preis Quelle", "Preis geprüft am",
  "Unterauftragnehmer (Anzahl)", "Unterauftragnehmer Quelle", "Unterauftragnehmer geprüft am",
  "Drittländer der Unterauftragnehmer", "Drittländer Quelle", "Drittländer geprüft am",
  "AVV", "AVV Quelle", "AVV geprüft am",
  "Sicherheitsmaßnahmen (TOM)", "TOM Quelle", "TOM geprüft am",
  "Zertifikate (belegt)", "Zertifikate Quelle", "Zertifikate geprüft am",
];

/** Ganze Datei: UTF-8-BOM, Semikolon, CRLF, alphabetisch wie die Seite. */
function csv(providers, h) {
  const zeilen = [...providers].sort((x, y) => x.name.localeCompare(y.name, "de")).map((p) => csvZeile(p, h));
  return "\uFEFF" + [CSV_SPALTEN, ...zeilen].map((z) => z.map(csvFeld).join(";")).join("\r\n") + "\r\n";
}

module.exports = { FELDER, STATUS, EU_EWR, pruefe, zellen, tabelle, csv, csvFeld, CSV_SPALTEN };
