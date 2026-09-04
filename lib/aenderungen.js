"use strict";
/**
 * belegbar.eu — Änderungsprotokoll aus der Git-Historie.
 * Vergleicht jede Version der Anbieter- und Fall-Dateien mit der vorherigen und hält fest, wo sich
 * ein Status oder eine Quelle geändert hat. Kein eigenes Ledger: Das Repository ist öffentlich,
 * also kann jeder das Protokoll aus denselben Commits nachrechnen.
 *
 * Was zählt: Statuswechsel oder Quellenwechsel an einem belegenden Feld, Statuswechsel eines Falls,
 * Aufnahme eines Anbieters. Was nicht zählt: fortgeschriebenes Prüfdatum, geänderte Anmerkung,
 * Beschreibungstexte. Der Grund eines Eintrags ist die Anmerkung des Feldes, sofern sie sich mit
 * der Änderung bewegt hat — dort steht bei einem verlorenen Beleg schon die alte URL.
 *
 * Aufrufer: build.js (Seite /aenderungen/, Atom-Feed, Startseite, daten.json).
 */
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const VERTRAG_LABEL = {
  avv: "AVV / Auftragsverarbeitungsvertrag",
  subprozessoren: "Subprozessoren-Liste",
  training_opt_out: "Kein Training mit Kundendaten",
  zero_data_retention: "Zero Data Retention",
};

/** Alle belegenden Felder eines Anbieters, adressiert über einen stabilen Pfad.
 *  Listen werden über ihren Namen zugeordnet (Zertifikatstyp, Pflicht, Modellname), nicht über
 *  die Position — sonst würde eine Umsortierung wie eine Statusänderung aussehen. */
function belegFelder(p) {
  const m = new Map();
  const setze = (pfad, feld, o) => m.set(pfad, { feld, status: o.status === undefined ? null : o.status, quelle: o.quelle || null, anmerkung: o.anmerkung || null });
  for (const [k, label] of Object.entries(VERTRAG_LABEL)) if (p.vertrag && p.vertrag[k]) setze("vertrag." + k, label, p.vertrag[k]);
  for (const z of p.zertifikate || []) setze(`zertifikate[${z.typ}]`, "Zertifikat " + z.typ, z);
  for (const a of p.ai_act || []) setze(`ai_act[${a.pflicht}]`, "AI Act: " + a.pflicht, a);
  for (const mo of p.modelle || []) setze(`modelle[${mo.name}]`, "Modell " + mo.name, mo);
  return m;
}

function vergleicheAnbieter(alt, neu, datum) {
  if (!neu) return alt ? [{ datum, anbieter: alt.id, typ: "anbieter", pfad: null, feld: "Anbieter", alt: "aufgenommen", neu: "entfernt", quelle_alt: null, quelle_neu: null, grund: null }] : [];
  if (!alt) return [{ datum, anbieter: neu.id, typ: "anbieter", pfad: null, feld: "Anbieter", alt: null, neu: "aufgenommen", quelle_alt: null, quelle_neu: (neu.stammdaten && neu.stammdaten.website) || null, grund: null }];
  const a = belegFelder(alt), n = belegFelder(neu);
  const aus = [];
  for (const pfad of new Set([...a.keys(), ...n.keys()])) {
    const va = a.get(pfad), vn = n.get(pfad);
    const statusAlt = va ? va.status : null, statusNeu = vn ? vn.status : null;
    const quelleAlt = va ? va.quelle : null, quelleNeu = vn ? vn.quelle : null;
    const typ = statusAlt !== statusNeu ? "status" : quelleAlt !== quelleNeu ? "quelle" : null;
    if (!typ) continue;
    const grund = vn && vn.anmerkung && vn.anmerkung !== (va && va.anmerkung) ? vn.anmerkung : null;
    aus.push({ datum, anbieter: neu.id, typ, pfad, feld: (vn || va).feld, alt: statusAlt, neu: statusNeu, quelle_alt: quelleAlt, quelle_neu: quelleNeu, grund });
  }
  return aus;
}

function vergleicheFall(alt, neu, datum) {
  if (!neu) return alt ? [{ datum, anbieter: alt.anbieter, typ: "fall", fall: alt.id, slug: alt.slug, pfad: null, feld: `Fall ${alt.id}: ${alt.titel}`, alt: alt.status, neu: "entfernt", quelle_alt: null, quelle_neu: null, grund: null }] : [];
  if (alt && alt.status === neu.status) return [];
  return [{ datum, anbieter: neu.anbieter, typ: "fall", fall: neu.id, slug: neu.slug, pfad: null, feld: `Fall ${neu.id}: ${neu.titel}`, alt: alt ? alt.status : null, neu: neu.status, quelle_alt: null, quelle_neu: null, grund: null }];
}

/* ---------------- Git ---------------- */

const PFADE = ["data/anbieter", "data/faelle"];
const istDatendatei = (p) => /^data\/(anbieter|faelle)\/[^/]+\.json$/.test(p);

/** Ohne Git keine Historie, ohne Historie kein Protokoll. Ein leeres Protokoll wäre eine falsche
 *  Aussage auf der Seite — deshalb bricht der Build ab, statt still ohne Einträge zu bauen. */
function git(root, args) {
  try {
    return execFileSync("git", args, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"], maxBuffer: 64 * 1024 * 1024 });
  } catch (e) {
    throw new Error("Änderungsprotokoll: git-Aufruf fehlgeschlagen (" + args.slice(0, 2).join(" ") + "). Der Build braucht git und die Repository-Historie. " + (e.message || ""));
  }
}

/** "%H<Tab>%ad<Tab>%s": Ein Tab im Betreff darf den Betreff nicht abschneiden. */
function parseLogZeile(zeile) {
  const t = zeile.split("\t");
  return { sha: t[0], datum: t[1], betreff: t.slice(2).join("\t") };
}

function leseVersion(root, ref, datei) {
  try { return JSON.parse(git(root, ["show", `${ref}:${datei}`])); } catch { return null; }
}

function leseArbeitsstand(root, datei) {
  try { return JSON.parse(fs.readFileSync(path.join(root, datei), "utf8")); } catch { return null; }
}

/** Zeilen aus --name-status: "M\tpfad", "A\tpfad", "D\tpfad", "R100\talt\tneu". */
function parseNameStatus(text) {
  return text.split("\n").filter(Boolean).map((z) => {
    const t = z.split("\t");
    return { art: t[0][0], alt: t[1], neu: t[t.length - 1] };
  }).filter((d) => istDatendatei(d.neu) || istDatendatei(d.alt));
}

function vergleicheDatei(datei, alt, neu, datum) {
  return datei.startsWith("data/faelle/") ? vergleicheFall(alt, neu, datum) : vergleicheAnbieter(alt, neu, datum);
}

function sortiere(eintraege) {
  return eintraege.sort((x, y) => y.datum.localeCompare(x.datum) || x.anbieter.localeCompare(y.anbieter) || String(x.pfad || x.fall).localeCompare(String(y.pfad || y.fall)));
}

/** Alle Einträge aus der Historie plus dem noch nicht committeten Arbeitsstand (Datum = heute).
 *  Der Build läuft vor dem Commit; ohne den Arbeitsstand erschiene jede Änderung erst einen Build später. */
function ausGit(root, heute) {
  const eintraege = [];
  const log = git(root, ["log", "--reverse", "--format=%H%x09%ad%x09%s", "--date=short", "--", ...PFADE]).split("\n").filter(Boolean);
  for (const zeile of log) {
    const { sha, datum, betreff } = parseLogZeile(zeile);
    for (const d of parseNameStatus(git(root, ["show", "--name-status", "--format=", sha, "--", ...PFADE]))) {
      const alt = d.art === "A" ? null : leseVersion(root, sha + "^", d.alt);
      const neu = d.art === "D" ? null : leseVersion(root, sha, d.neu);
      for (const e of vergleicheDatei(d.neu, alt, neu, datum)) eintraege.push({ ...e, commit: { sha: sha.slice(0, 7), betreff } });
    }
  }
  const offen = parseNameStatus(git(root, ["diff", "--name-status", "HEAD", "--", ...PFADE]))
    .concat(git(root, ["ls-files", "--others", "--exclude-standard", "--", ...PFADE]).split("\n").filter(istDatendatei).map((p) => ({ art: "A", alt: p, neu: p })));
  for (const d of offen) {
    const alt = d.art === "A" ? null : leseVersion(root, "HEAD", d.alt);
    const neu = d.art === "D" ? null : leseArbeitsstand(root, d.neu);
    for (const e of vergleicheDatei(d.neu, alt, neu, heute)) eintraege.push({ ...e, commit: null });
  }
  return sortiere(eintraege);
}

/** Zieht eine Quelle um, wandern alle Felder mit, die sie belegen — bei OVHcloud waren es sieben
 *  Zertifikate für eine URL. Für die Anzeige wird daraus ein Eintrag mit der Liste der Felder;
 *  die Rohdaten bleiben je Feld einzeln. */
function gruppiere(eintraege) {
  const aus = [], index = new Map(), anker = new Map();
  for (const e of eintraege) {
    const schluessel = e.typ === "quelle" ? [e.datum, e.anbieter, e.quelle_alt, e.quelle_neu].join("\n") : null;
    if (schluessel && index.has(schluessel)) { index.get(schluessel).felder.push(...(e.felder || [e.feld])); continue; }
    const g = { ...e, felder: e.felder || [e.feld] };
    // Zwei Änderungen desselben Feldes am selben Tag (zwei Commits) brauchen zwei Anker.
    const basis = ankerBasis(g), n = (anker.get(basis) || 0) + 1;
    anker.set(basis, n);
    g.anker = n === 1 ? basis : basis + "-" + n;
    if (schluessel) index.set(schluessel, g);
    aus.push(g);
  }
  return aus;
}

/** Einträge, deren Datum in den letzten `tage` Tagen vor `stichtag` liegt (Stichtag inklusive). */
function anzahlSeit(eintraege, stichtag, tage) {
  const ab = new Date(stichtag + "T00:00:00Z");
  ab.setUTCDate(ab.getUTCDate() - tage);
  const abIso = ab.toISOString().slice(0, 10);
  return eintraege.filter((e) => e.datum >= abIso && e.datum <= stichtag).length;
}

/* ---------------- Darstellung ---------------- */

const STATUS_TEXT = { belegt: "belegt", beansprucht: "beansprucht", unbelegt: "unbelegt", offen: "offen", beantwortet: "beantwortet", ausgeraeumt: "ausgeräumt", bestaetigt: "bestätigt", aufgenommen: "aufgenommen", entfernt: "entfernt" };
const statusText = (s) => (s === null || s === undefined ? "–" : STATUS_TEXT[s] || s);

function ankerBasis(e) {
  return `${e.datum}-${e.anbieter}-${e.typ === "fall" ? "fall-" + e.fall : e.pfad || e.typ}`.toLowerCase().replace(/[^a-z0-9.\-]+/g, "-").replace(/^-+|-+$/g, "");
}

/** Anker eines Eintrags. Nach gruppiere() auch bei Doppeländerungen am selben Tag eindeutig. */
function ankerId(e) {
  return e.anker || ankerBasis(e);
}

function titel(e, anbieterName) {
  const name = anbieterName(e.anbieter);
  if (e.typ === "anbieter") return `${name} ${statusText(e.neu)}`;
  if (e.typ === "fall") return `${name}: Fall ${e.fall} ${e.alt === null ? "eröffnet" : statusText(e.alt) + " → " + statusText(e.neu)}`;
  if (e.typ === "quelle") return `${name}: ${e.feld} — Quelle geändert`;
  return `${name}: ${e.feld} ${statusText(e.alt)} → ${statusText(e.neu)}`;
}

function beschreibung(e) {
  const t = [];
  if (e.typ === "quelle" && e.felder && e.felder.length > 1) t.push("Betroffene Felder: " + e.felder.join(", "));
  if (e.grund) t.push(e.grund);
  if (e.quelle_alt && e.quelle_alt !== e.quelle_neu) t.push("Alte Quelle: " + e.quelle_alt);
  if (e.quelle_neu && e.quelle_alt !== e.quelle_neu) t.push("Neue Quelle: " + e.quelle_neu);
  if (e.commit) t.push(`Commit ${e.commit.sha}: ${e.commit.betreff}`);
  return t.join(" · ");
}

const xml = (s) => String(s === null || s === undefined ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function atomFeed(eintraege, { baseUrl, name, anbieterName, heute }) {
  const seite = `${baseUrl}/aenderungen/`;
  const stand = eintraege.length ? eintraege[0].datum : heute || new Date().toISOString().slice(0, 10);
  // Gruppiert wie die Seite, damit jeder Feed-Link auf einen vorhandenen Anker zeigt.
  const items = gruppiere(eintraege).map((e) => `  <entry>
    <id>${xml(seite)}#${xml(ankerId(e))}</id>
    <title>${xml(titel(e, anbieterName))}</title>
    <link rel="alternate" href="${xml(seite)}#${xml(ankerId(e))}"/>
    <updated>${e.datum}T00:00:00Z</updated>
    <content type="text">${xml(beschreibung(e))}</content>
  </entry>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${xml(name)} — Änderungen</title>
  <subtitle>Jede Status- und Quellenänderung der Evidenz-Datenbank, aus der öffentlichen Git-Historie berechnet.</subtitle>
  <id>${xml(seite)}</id>
  <link rel="alternate" href="${xml(seite)}"/>
  <link rel="self" href="${xml(seite)}feed.xml"/>
  <updated>${stand}T00:00:00Z</updated>
  <rights>CC BY 4.0</rights>
${items}
</feed>
`;
}

module.exports = { VERTRAG_LABEL, belegFelder, vergleicheAnbieter, vergleicheFall, parseNameStatus, parseLogZeile, ausGit, gruppiere, anzahlSeit, ankerId, titel, beschreibung, statusText, atomFeed };
