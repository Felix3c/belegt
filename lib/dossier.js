"use strict";
/** Anbieter-Dossier (Angebot Variante B): aus einem Profil ein datiertes Markdown-Dokument für die
 *  Käuferseite erzeugen. Nur, was im Profil steht; fehlende Nachweise landen unter „Nicht belegbar“.
 *  Keine Bewertung, keine Empfehlung: Zusammenstellung und Datierung, sonst nichts. */
const fs = require("fs");
const path = require("path");
const { belegFelder } = require("./aenderungen.js");
const { pruefeProfilUndFaelle } = require("./normenbezug.js");
const PP = require("./pruefpunkte.js");
const V = require("./vorgaben.js");

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
    if (b.quelle === url && (b.archiv || b.sha256)) return { archiv: b.archiv || null, sha256: b.sha256 || null, abgerufen: b.abgerufen ? String(b.abgerufen).slice(0, 10) : null, fall: c.id };
  }
  return null;
}

function wertText(profil, pfad) {
  // Prüfpunkt-Unterfelder zuerst: sonst zeigt vertrag.betroffenenrechte_traeger den Rohschlüssel und
  // die Unterfelder von Zertifikaten und Modellen gar nichts (Befund V3, 09.10.2026).
  const pp = PP.felder(profil).find((x) => x.pfad === pfad);
  if (pp) return pp.feld ? PP.wertText(pp.def.k, pp.feld.wert) : null;
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
    // Bezahlte Einträge sind keine Angaben über den Anbieter; sie zählen weder als belegt noch als Lücke.
    if (pfad === "eintritt" || pfad.startsWith("zusagen[")) continue;
    const h = hashZu(f.quelle, hashes);
    const a = archivZu(f.quelle, faelle);
    const belegt = f.status === "belegt" && !!f.quelle;
    zeilen.push({
      pfad, feld: f.feld, status: f.status, statusText: STATUS_TEXT[f.status] || f.status || "–",
      angabe: wertText(profil, pfad), quelle: f.quelle, anmerkung: f.anmerkung,
      // Das Feld trägt sein eigenes Datum, seit der Quellenlauf einzelne Angaben nachprüft; die
      // Vermerk bezieht sich auf genau dieses Datum.
      pruefdatum: f.geprueft || profil.geprueft || null,
      // Wie auf Profil- und Vergleichsseite: ein Fall gehört neben die Angabe, die er betrifft.
      faelle: faelle.filter((c) => c.feld === pfad).map((c) => ({ id: c.id, status: c.status })),
      hash: a && a.sha256 ? a.sha256 : h ? h.hash : null,
      hashArt: a && a.sha256 ? "SHA-256 (Fall " + a.fall + (a.abgerufen ? ", abgerufen " + a.abgerufen : "") + ")" : h ? "Kurz-Hash Quellenlauf, gesehen " + h.gesehen : null,
      archiv: a ? a.archiv : null,
      belegbar: belegt,
    });
  }
  return zeilen;
}

const esc = (s) => String(s === null || s === undefined ? "" : s).replace(/\|/g, "\\|").replace(/\n/g, " ");

/** Angabe mit Hinweis auf Fälle zu genau diesem Feld; ohne Fall unverändert. */
function angabeMitFall(z) {
  const fl = (z.faelle || []).map((c) => `Fall ${c.id} (${c.status})`).join(", ");
  const a = z.angabe || "—";
  return fl ? `${a}; dazu ${fl}, siehe Abschnitt 3` : a;
}

/** Wortgleiche Zeilen einmal zeigen, die Felder davor zusammen (acht Modelle mit derselben Doku-Stelle
 *  ergaben acht gleiche Zeilen; Auftrag Felix 16.10.2026: Muster deutlich kürzen). */
function fasseZusammen(zeilen, schluessel) {
  const gruppen = new Map();
  for (const z of zeilen) {
    const k = schluessel(z);
    if (gruppen.has(k)) gruppen.get(k).felder.push(z.feld);
    else gruppen.set(k, { ...z, felder: [z.feld] });
  }
  return [...gruppen.values()].map((g) => ({ ...g, feld: g.felder.join("; ") }));
}

function rendere(profil, zeilen, faelle, { datum, auftraggeber = "[Auftraggeber, Funktion, Organisation]", vorgaben = null } = {}) {
  const ergebnis = V.werteAus(profil, { faelle, auswahl: vorgaben });
  const b = zeilen.filter((z) => z.belegbar);
  const juengstes = zeilen.map((z) => z.pruefdatum).filter(Boolean).sort().pop() || null;
  const nb = zeilen.filter((z) => !z.belegbar);
  const offen = ergebnis.punkte.filter((p) => p.ergebnis === "nicht_belegbar").length;
  const L = [];
  L.push(`# Anbieter-Dossier: ${profil.name}`);
  L.push("");
  L.push(`**Ausgestellt am:** ${datum}  `);
  L.push(`**Für:** ${auftraggeber}  `);
  L.push("**Erstellt:** Ein KI-Agent hat die Quellen gesammelt und verglichen. Felix Lind (belegbar.eu) hat sie geprüft und freigegeben.  ");
  L.push(`**Datenstand des Profils:** ${profil.geprueft || "nicht belegbar"} (letzte Prüfung aller Quellen)${juengstes && profil.geprueft && juengstes > profil.geprueft ? ", einzelne Angaben zuletzt nachgeprüft " + juengstes : ""}  `);
  L.push(`**Anbieter:** ${profil.name}, ${profil.stammdaten ? [profil.stammdaten.sitz, profil.stammdaten.mutterkonzern].filter(Boolean).join(", ") : ""}${profil.stammdaten && profil.stammdaten.website ? ", " + profil.stammdaten.website : ""}`);
  L.push("");
  L.push("Dieses Dossier stellt datiert zusammen, was der Anbieter öffentlich belegt, mit Quelle, Prüfdatum und, wo vorhanden, Hash und Archivkopie. Es enthält **keine Bewertung, keine Empfehlung und keine Rechtsberatung**. Ob der Anbieter für einen Zweck geeignet ist, entscheidet der Auftraggeber. Jede Angabe lässt sich beim Anbieter selbst nachprüfen.");
  L.push("");
  L.push("## Ergebnis");
  L.push("");
  L.push(...V.ergebnisZeilen(ergebnis));
  L.push("");
  L.push("## Auf einen Blick");
  L.push("");
  L.push(`- Belegt: ${b.length} Angaben mit Quelle (Abschnitt 1)`);
  L.push(`- Nicht belegbar: ${nb.length} Angaben (Abschnitt 2)`);
  L.push(`- Fälle auf belegbar.eu: ${faelle.length} (Abschnitt 3)`);
  L.push(`- Offene Prüfpunkte, als Frage an den Anbieter: ${offen} (Abschnitt 4)`);
  L.push(`- Änderungsalarm: ${datum} bis ${jahrSpaeter(datum)}. Sie bekommen eine Mail, wenn der monatliche Quellenlauf bei diesem Anbieter etwas findet: eine Angabe wechselt den Status, AVV, Subprozessoren oder ein Zertifikat ändern sich, ein Fall wird eröffnet oder geschlossen. Grundlage: https://belegbar.eu/aenderungen/`);
  L.push("");
  L.push("## Vermerk");
  L.push("");
  L.push("Die Fundstellen sind mit Abrufdatum und, wo vorhanden, Prüfsumme und Archivkopie dokumentiert. Der Vermerk sagt, was wann wo stand, nicht, ob es stimmt. Keine Gewähr für die Richtigkeit der Angaben des Anbieters, keine Rechtsberatung. Die Ergebniszeile folgt allein aus den Vorgaben des Auftraggebers und den belegten Angaben in Abschnitt 1.");
  L.push("");
  L.push("Freigegeben: Köln, den ____________  ______________________________  ");
  L.push("Felix Lind, belegbar.eu");
  L.push("");
  L.push("---");
  L.push("");
  L.push("# Belege");
  L.push("");
  const bz = fasseZusammen(b, (z) => JSON.stringify([angabeMitFall(z), z.quelle, z.pruefdatum, z.hash, z.hashArt, z.archiv]));
  L.push(`## 1. Belegte Angaben (${b.length})`);
  L.push("");
  L.push("| Feld | Angabe | Quelle | Prüfdatum | Hash | Archiv |");
  L.push("|---|---|---|---|---|---|");
  for (const z of bz) L.push(`| ${esc(z.feld)} | ${esc(angabeMitFall(z))} | ${z.quelle} | ${z.pruefdatum || "-"} | ${z.hash ? esc(z.hash) + " (" + esc(z.hashArt) + ")" : "kein Hash"} | ${z.archiv || "keine Archivkopie"} |`);
  L.push("");
  const anm = fasseZusammen(b.filter((z) => z.anmerkung), (z) => z.anmerkung);
  if (anm.length) {
    L.push("Anmerkungen aus dem Profil:");
    L.push("");
    for (const z of anm) L.push(`- **${z.feld}:** ${z.anmerkung}`);
    L.push("");
  }
  L.push(`## 2. Nicht belegbar (${nb.length})`);
  L.push("");
  L.push("Angaben, für die trotz Suche kein Primärnachweis gefunden wurde, oder die der Anbieter nur behauptet. Das heißt nicht, dass sie falsch sind. Es heißt, dass sie am Prüfdatum nicht nachprüfbar waren.");
  L.push("");
  if (nb.length === 0) L.push("_Keine._");
  else {
    L.push("| Feld | Status | Was gesucht / gefunden wurde | Quelle der Behauptung |");
    L.push("|---|---|---|---|");
    for (const z of fasseZusammen(nb, (z) => JSON.stringify([z.statusText, z.anmerkung, z.quelle]))) L.push(`| ${esc(z.feld)} | ${esc(z.statusText)} | ${esc(z.anmerkung || "-")} | ${z.quelle || "keine"} |`);
  }
  L.push("");
  L.push(`## 3. Fälle auf belegbar.eu zu diesem Anbieter (${faelle.length})`);
  L.push("");
  if (faelle.length === 0) L.push("_Keine Fälle eröffnet._");
  else {
    L.push("| Fall | Betrifft | Status | Eröffnet | Frist | Seite |");
    L.push("|---|---|---|---|---|---|");
    for (const c of faelle) L.push(`| ${c.id} | ${esc(c.feld)} | ${esc(c.status)} | ${c.eroeffnet || "-"} | ${c.antwort_frist || "-"} | https://belegbar.eu/faelle/${c.slug}/ |`);
    L.push("");
    for (const c of faelle) L.push(`- **${c.id}:** ${c.kurz || c.titel || ""}`);
  }
  L.push("");
  L.push(...fragenAnDenAnbieter(ergebnis));
  L.push("---");
  L.push("");
  L.push("Die zugrunde liegenden Buchdaten stehen unter CC BY 4.0 auf https://belegbar.eu (Profil: https://belegbar.eu/anbieter/" + profil.id + "/). Dieses Dossier ist die datierte Zusammenstellung dieser Daten für den genannten Auftraggeber; Weitergabe mit Quellenangabe erlaubt. Preis laut Angebot: 390 € je Anbieter-Dossier, ohne Umsatzsteuer (Kleinunternehmer), inklusive zwölf Monate Änderungsalarm.");
  L.push("");
  return ohneLangeStriche(L.join("\n"));
}

/** Keine langen Gedankenstriche (Auftrag Felix 16.10.2026), auch nicht aus Profil-Anmerkungen. Wörtliche
 *  Zitate in '…' bleiben unberührt, sonst stimmt der Beleg nicht mehr mit der Quelle überein. */
function ohneLangeStriche(text) {
  return text.split(/('[^'\n]*')/).map((teil, i) => (i % 2 ? teil : teil.replace(/ [—–] /g, ", ").replace(/[—–]/g, "-"))).join("");
}

/** Abschnitt 4: offen gebliebene Prüfpunkte als Frage (a) und was eine Prüfung immer anfragen muss (b). */
function fragenAnDenAnbieter(ergebnis) {
  const offen = ergebnis.punkte.filter((p) => p.ergebnis === "nicht_belegbar");
  const L = ["## 4. Nicht öffentlich belegbar: Fragen an den Anbieter", ""];
  L.push(`### 4a. Prüfpunkte, die bei diesem Anbieter offen blieben (${offen.length})`);
  L.push("");
  if (offen.length === 0) L.push("_Keine._");
  else {
    L.push("| Nr. | Prüfpunkt | Frage an den Anbieter | Was gesucht / gefunden wurde |");
    L.push("|---|---|---|---|");
    for (const p of offen) L.push(`| ${p.nr} | ${esc(p.label)}${p.wo ? ` (${esc(p.wo)})` : ""} | ${esc(p.frage || "-")} | ${esc(p.offenerFall ? `offener Fall ${p.faelle.join(", ")}` : p.anmerkung || "-")} |`);
  }
  L.push("");
  L.push("### 4b. Was eine Prüfung immer beim Anbieter anfragen muss");
  L.push("");
  L.push("| Unterlage beim Anbieter | Warum öffentlich nicht belegbar |");
  L.push("|---|---|");
  for (const [u, w] of V.IMMER_ANFRAGEN) L.push(`| ${u} | ${w} |`);
  L.push("");
  L.push("Diese Unterlagen hat belegbar.eu nicht gesehen. Dieses Dossier ersetzt ihre Prüfung nicht. Es zeigt, welcher Teil der Prüfung schon öffentlich erledigt ist.");
  L.push("");
  return L;
}

function jahrSpaeter(datum) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(datum);
  return m ? `${Number(m[1]) + 1}-${m[2]}-${m[3]}` : datum;
}

function erzeugeDossier(anbieterId, { datum, auftraggeber, vorgaben = null, dataDir = DATA_DIR, erlaubeNormenbezug = false } = {}) {
  const profil = ladeAnbieter(anbieterId, dataDir);
  const hashes = ladeHashes(dataDir);
  const faelle = ladeFaelle(anbieterId, dataDir);
  const zeilen = baueZeilen(profil, { hashes, faelle });
  const markdown = rendere(profil, zeilen, faelle, { datum, auftraggeber, vorgaben });
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
  return { profil, zeilen, faelle, markdown, ergebnis: V.werteAus(profil, { faelle, auswahl: vorgaben }) };
}

function schreibeDossier(anbieterId, { datum, auftraggeber, vorgaben, dataDir, ausgabeDir, dateiname, erlaubeNormenbezug } = {}) {
  const d = erzeugeDossier(anbieterId, { datum, auftraggeber, vorgaben, dataDir, erlaubeNormenbezug });
  const dir = ausgabeDir || path.join(__dirname, "..", "dossiers");
  fs.mkdirSync(dir, { recursive: true });
  const ziel = path.join(dir, dateiname || `${anbieterId}-${datum}.md`);
  fs.writeFileSync(ziel, d.markdown, "utf8");
  return { ...d, pfad: ziel };
}

module.exports = { DATA_DIR, STATUS_TEXT, ladeAnbieter, ladeHashes, ladeFaelle, hashZu, archivZu, baueZeilen, rendere, erzeugeDossier, schreibeDossier, jahrSpaeter };
