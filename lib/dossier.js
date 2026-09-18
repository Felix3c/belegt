"use strict";
/** Anbieter-Dossier (Angebot Variante B): aus einem Profil ein datiertes Markdown-Dokument für die
 *  Käuferseite erzeugen. Nur, was im Profil steht; fehlende Nachweise landen unter „Nicht belegbar“.
 *  Keine Bewertung, keine Empfehlung — Zusammenstellung und Datierung, sonst nichts. */
const fs = require("fs");
const path = require("path");
const { belegFelder } = require("./aenderungen.js");
const { pruefeProfilUndFaelle } = require("./normenbezug.js");

const DATA_DIR = path.join(__dirname, "..", "data");
const STATUS_TEXT = { belegt: "belegt", beansprucht: "beansprucht, nicht belegt", unbelegt: "unbelegt" };

function leseJson(p) { return JSON.parse(fs.readFileSync(p, "utf8")); }

function ladeAnbieter(id, dataDir = DATA_DIR) {
  return leseJson(path.join(dataDir, "anbieter", id + ".json"));
}

function ladeHashes(dataDir = DATA_DIR) {
  const p = path.join(dataDir, "quellen-hashes.json");
  return fs.existsSync(p) ? leseJson(p) : {};
}

function ladeFaelle(anbieterId, dataDir = DATA_DIR) {
  const dir = path.join(dataDir, "faelle");
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".json")).map((f) => leseJson(path.join(dir, f)))
    .filter((c) => c.anbieter === anbieterId).sort((a, b) => a.id.localeCompare(b.id));
}

/** Hash-Eintrag zu einer Quelle: exakte URL, sonst Variante mit/ohne Schrägstrich. */
function hashZu(url, hashes) {
  if (!url) return null;
  for (const k of [url, url.endsWith("/") ? url.slice(0, -1) : url + "/"]) if (hashes[k] && hashes[k].hash) return hashes[k];
  return null;
}

/** Archiv- und SHA-256-Belege aus Fällen, die dieselbe Quelle zitieren (nur dort gibt es Archivlinks). */
function archivZu(url, faelle) {
  if (!url) return null;
  for (const c of faelle) for (const b of [...(c.behauptung || []), ...(c.beleg || [])]) {
    if (b.quelle === url && (b.archiv || b.sha256)) return { archiv: b.archiv || null, sha256: b.sha256 || null, abgerufen: b.abgerufen || null, fall: c.id };
  }
  return null;
}

function wertText(profil, pfad) {
  const m = pfad.match(/^vertrag\.(\w+)$/);
  if (m) { const w = profil.vertrag[m[1]].wert; return w === true ? "ja" : w === false ? "nein" : w === null || w === undefined ? null : String(w); }
  const mo = pfad.match(/^modelle\[(.+)\]$/);
  if (mo) {
    const x = (profil.modelle || []).find((e) => e.name === mo[1]);
    if (!x) return null;
    const teile = [];
    if (x.standort) teile.push("Standort " + x.standort);
    if (x.preis_input_1m_eur !== undefined) teile.push(`Input ${x.preis_input_1m_eur} €/1M`);
    if (x.preis_output_1m_eur !== undefined) teile.push(`Output ${x.preis_output_1m_eur} €/1M`);
    return teile.join(", ") || null;
  }
  return null;
}

/** Zeilen des Dossiers als Datenstruktur; testbar ohne Dateisystem. */
function baueZeilen(profil, { hashes = {}, faelle = [] } = {}) {
  const zeilen = [];
  for (const [pfad, f] of belegFelder(profil)) {
    const h = hashZu(f.quelle, hashes);
    const a = archivZu(f.quelle, faelle);
    const belegt = f.status === "belegt" && !!f.quelle;
    zeilen.push({
      pfad, feld: f.feld, status: f.status, statusText: STATUS_TEXT[f.status] || f.status || "–",
      angabe: wertText(profil, pfad), quelle: f.quelle, anmerkung: f.anmerkung,
      pruefdatum: profil.geprueft || null,
      hash: a && a.sha256 ? a.sha256 : h ? h.hash : null,
      hashArt: a && a.sha256 ? "SHA-256 (Fall " + a.fall + ")" : h ? "Kurz-Hash Quellenlauf, gesehen " + h.gesehen : null,
      archiv: a ? a.archiv : null,
      belegbar: belegt,
    });
  }
  return zeilen;
}

const esc = (s) => String(s === null || s === undefined ? "" : s).replace(/\|/g, "\\|").replace(/\n/g, " ");

function rendere(profil, zeilen, faelle, { datum, auftraggeber = "[Auftraggeber, Funktion, Organisation]" } = {}) {
  const b = zeilen.filter((z) => z.belegbar);
  const nb = zeilen.filter((z) => !z.belegbar);
  const L = [];
  L.push(`# Anbieter-Dossier: ${profil.name}`);
  L.push("");
  L.push(`**Ausgestellt am:** ${datum}  `);
  L.push(`**Für:** ${auftraggeber}  `);
  L.push(`**Ausgestellt von:** Felix Lind, belegbar.eu  `);
  L.push(`**Datenstand des Profils:** ${profil.geprueft || "nicht belegbar"} (letzte Prüfung aller Quellen)  `);
  L.push(`**Anbieter:** ${profil.name}, ${profil.stammdaten ? [profil.stammdaten.sitz, profil.stammdaten.mutterkonzern].filter(Boolean).join(", ") : ""}${profil.stammdaten && profil.stammdaten.website ? ", " + profil.stammdaten.website : ""}`);
  L.push("");
  L.push("Dieses Dossier ist eine datierte Zusammenstellung dessen, was der Anbieter öffentlich belegt, mit Quelle, Prüfdatum und, wo vorhanden, Hash und Archivkopie. Es enthält **keine Bewertung, keine Empfehlung und keine Rechtsberatung**. Ob der Anbieter für einen Zweck geeignet ist, entscheidet der Auftraggeber. Jede Angabe kann beim Anbieter selbst nachgeprüft werden; die Quellen sind unten verlinkt.");
  L.push("");
  L.push(`## 1. Belegte Angaben (${b.length})`);
  L.push("");
  L.push("| Feld | Angabe | Quelle | Prüfdatum | Hash | Archiv |");
  L.push("|---|---|---|---|---|---|");
  for (const z of b) L.push(`| ${esc(z.feld)} | ${esc(z.angabe || "—")} | ${z.quelle} | ${z.pruefdatum || "—"} | ${z.hash ? esc(z.hash) + " (" + esc(z.hashArt) + ")" : "kein Hash"} | ${z.archiv || "keine Archivkopie"} |`);
  L.push("");
  if (b.some((z) => z.anmerkung)) {
    L.push("Anmerkungen aus dem Profil:");
    L.push("");
    for (const z of b) if (z.anmerkung) L.push(`- **${z.feld}:** ${z.anmerkung}`);
    L.push("");
  }
  L.push(`## 2. Nicht belegbar (${nb.length})`);
  L.push("");
  L.push("Angaben, für die trotz Suche kein Primärnachweis gefunden wurde, oder die der Anbieter nur behauptet. Das heißt nicht, dass sie falsch sind; es heißt, dass sie am Prüfdatum nicht nachprüfbar waren.");
  L.push("");
  if (nb.length === 0) L.push("_Keine._");
  else {
    L.push("| Feld | Status | Was gesucht / gefunden wurde | Quelle der Behauptung |");
    L.push("|---|---|---|---|");
    for (const z of nb) L.push(`| ${esc(z.feld)} | ${esc(z.statusText)} | ${esc(z.anmerkung || "—")} | ${z.quelle || "keine"} |`);
  }
  L.push("");
  L.push(`## 3. Fälle auf belegbar.eu zu diesem Anbieter (${faelle.length})`);
  L.push("");
  if (faelle.length === 0) L.push("_Keine Fälle eröffnet._");
  else {
    L.push("| Fall | Betrifft | Status | Eröffnet | Frist | Seite |");
    L.push("|---|---|---|---|---|---|");
    for (const c of faelle) L.push(`| ${c.id} | ${esc(c.feld)} | ${esc(c.status)} | ${c.eroeffnet || "—"} | ${c.antwort_frist || "—"} | https://belegbar.eu/faelle/${c.slug}/ |`);
    L.push("");
    for (const c of faelle) L.push(`- **${c.id}:** ${c.kurz || c.titel || ""}`);
  }
  L.push("");
  L.push("## 4. Änderungsalarm (12 Monate ab Ausstellung)");
  L.push("");
  L.push("Der Auftraggeber erhält per E-Mail eine Meldung, wenn der monatliche Quellenlauf für diesen Anbieter eines der folgenden Ereignisse feststellt:");
  L.push("");
  L.push("- eine belegte Angabe aus Abschnitt 1 wechselt den Status (Quelle verschwunden, geändert oder widerrufen);");
  L.push("- eine Angabe aus Abschnitt 2 wird belegt;");
  L.push("- die Subprozessoren-Liste, der AVV oder ein Zertifikat ändert sich;");
  L.push("- ein Fall zu diesem Anbieter wird eröffnet, beantwortet oder geschlossen.");
  L.push("");
  L.push(`Alarmzeitraum: ${datum} bis ${jahrSpaeter(datum)}. Grundlage ist das öffentliche Änderungsprotokoll unter https://belegbar.eu/aenderungen/.`);
  L.push("");
  L.push("## 5. Unterschrift");
  L.push("");
  L.push("Ich bestätige, dass die Angaben in Abschnitt 1 am genannten Prüfdatum an den genannten Quellen so vorlagen, und dass Abschnitt 2 vollständig ausweist, was nicht belegbar war.");
  L.push("");
  L.push("Köln, den ____________  ______________________________  ");
  L.push("Felix Lind, belegbar.eu");
  L.push("");
  L.push("---");
  L.push("");
  L.push("Die zugrunde liegenden Buchdaten stehen unter CC BY 4.0 auf https://belegbar.eu (Profil: https://belegbar.eu/anbieter/" + profil.id + "/). Dieses Dossier ist die datierte Zusammenstellung dieser Daten für den genannten Auftraggeber; Weitergabe mit Quellenangabe erlaubt. Preis laut Angebot: 390 € netto je Anbieter-Dossier inklusive zwölf Monate Änderungsalarm.");
  L.push("");
  return L.join("\n");
}

function jahrSpaeter(datum) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(datum);
  return m ? `${Number(m[1]) + 1}-${m[2]}-${m[3]}` : datum;
}

function erzeugeDossier(anbieterId, { datum, auftraggeber, dataDir = DATA_DIR, erlaubeNormenbezug = false } = {}) {
  const profil = ladeAnbieter(anbieterId, dataDir);
  const hashes = ladeHashes(dataDir);
  const faelle = ladeFaelle(anbieterId, dataDir);
  const zeilen = baueZeilen(profil, { hashes, faelle });
  const markdown = rendere(profil, zeilen, faelle, { datum, auftraggeber });
  if (!erlaubeNormenbezug) {
    // Feldweise VOR dem Rendern geprüft (nicht das fertige Markdown): Was der Anbieter selbst sagt
    // (Zitatfelder), darf Gesetzesnamen enthalten; unsere eigenen Texte (Anmerkung, Kurztext, …)
    // bleiben streng. Siehe lib/normenbezug.js.
    const funde = pruefeProfilUndFaelle(profil, faelle);
    if (funde.length > 0) {
      const liste = funde.map((f) => `Feld ${f.feld}: „${f.muster}“ in „${f.fundstelle}“`).join("\n");
      const fehler = new Error(`Dossier enthält Normenbezug oder rechtliche Bewertung, Ausgabe verweigert:\n${liste}`);
      fehler.funde = funde;
      throw fehler;
    }
  }
  return { profil, zeilen, faelle, markdown };
}

function schreibeDossier(anbieterId, { datum, auftraggeber, dataDir, ausgabeDir, dateiname, erlaubeNormenbezug } = {}) {
  const d = erzeugeDossier(anbieterId, { datum, auftraggeber, dataDir, erlaubeNormenbezug });
  const dir = ausgabeDir || path.join(__dirname, "..", "dossiers");
  fs.mkdirSync(dir, { recursive: true });
  const ziel = path.join(dir, dateiname || `${anbieterId}-${datum}.md`);
  fs.writeFileSync(ziel, d.markdown, "utf8");
  return { ...d, pfad: ziel };
}

module.exports = { DATA_DIR, STATUS_TEXT, ladeAnbieter, ladeHashes, ladeFaelle, hashZu, archivZu, baueZeilen, rendere, erzeugeDossier, schreibeDossier, jahrSpaeter };
