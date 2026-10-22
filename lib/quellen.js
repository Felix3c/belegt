"use strict";
/**
 * belegbar.eu — gemeinsame Quellen-Logik für linkcheck.js und quellenlauf.js.
 * Sammelt Quellen-URLs aus data/anbieter/*.json, ruft sie ab, bewertet Weiterleitungen
 * und hasht den sichtbaren Inhalt, damit ein Monat später erkennbar ist, ob eine Quelle
 * noch dasselbe sagt.
 */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const DATA_DIR = path.join(__dirname, "..", "data", "anbieter");
const UA = "Mozilla/5.0 (compatible; belegbar.eu-linkcheck/1.0; +https://belegbar.eu/)";
const TIMEOUT_MS = 20000;

/** Quellen, die automatisierte Abrufe zeitweise blocken. Sie werden trotzdem abgerufen; nur eine
 *  Sperre (Status unten oder Challenge-Seite) ist hier kein Befund, sondern "uebersprungen" — die
 *  Angabe wurde dann im Browser geprüft, die Anmerkung im Profil hält das fest. Ein vorgetäuschter
 *  Browser-UA hilft nicht: SafeBase sperrt ihn (04.10.2026), den ehrlichen Linkcheck-UA nicht. */
const BOT_SPERREN = ["trust.deepl.com", "deepl.safebase.us", "dqsglobal.com"];
const SPERR_STATUS = [401, 403, 429, 503];
const TLS_KETTE = ["UNABLE_TO_VERIFY_LEAF_SIGNATURE", "UNABLE_TO_GET_ISSUER_CERT_LOCALLY"];
// Fehlende Zwischenzertifikate liefern wir selbst mit (certs/zwischen.pem). Node liest
// NODE_EXTRA_CA_CERTS nur beim Start, deshalb starten quellenlauf.js und linkcheck.js sich damit neu.
const ZWISCHEN_DATEI = path.join(__dirname, "..", "certs", "zwischen.pem");

/** Umgebung für den Neustart mit den Zwischenzertifikaten, oder null (schon gesetzt / Datei fehlt). */
function zwischenEnv(env, gibtEs = fs.existsSync) {
  if (env.NODE_EXTRA_CA_CERTS || !gibtEs(ZWISCHEN_DATEI)) return null;
  return { ...env, NODE_EXTRA_CA_CERTS: ZWISCHEN_DATEI };
}

/** Startet das laufende Skript einmal mit den Zwischenzertifikaten neu; kehrt nur zurück, wenn nicht nötig. */
function mitZwischenzertifikaten() {
  const env = zwischenEnv(process.env);
  if (!env) return;
  const r = require("child_process").spawnSync(process.execPath, process.argv.slice(1), { env, stdio: "inherit" });
  process.exit(r.status === null ? 1 : r.status);
}
// Nicht "challenge-platform": Cloudflare hängt scripts/jsd/main.js auch an normal ausgelieferte Seiten.
// Imperva/Incapsula liefert die Sperre mit Status 200 und wechselnder "incident ID" (esante.gouv.fr seit 14.10.2026).
const CHALLENGE = /<title>\s*(Just a moment|Attention Required)|cf-chl-|_Incapsula_Resource|Incapsula incident ID/i;

/** Alle Quellen-URLs, dedupliziert, mit der Liste der Felder, die sie belegen. */
function sammleUrls() {
  const proUrl = new Map();
  for (const datei of fs.readdirSync(DATA_DIR).filter((f) => f.endsWith(".json"))) {
    const p = JSON.parse(fs.readFileSync(path.join(DATA_DIR, datei), "utf8"));
    const lauf = (o, pfad) => {
      if (!o || typeof o !== "object") return;
      for (const [k, v] of Object.entries(o)) {
        const ist = typeof v === "string" && v.startsWith("http");
        if (ist && (k === "quelle" || k === "website" || k === "wert" || k === "preisdaten")) {
          if (!proUrl.has(v)) proUrl.set(v, { anbieter: p.id, datei, feld: pfad + "." + k, url: v, felder: [] });
          proUrl.get(v).felder.push({ anbieter: p.id, datei, feld: pfad + "." + k, schluessel: k });
        } else if (v && typeof v === "object") lauf(v, pfad + "." + k);
      }
    };
    lauf(p, p.id);
  }
  // Startseiten (nur "website") belegen nichts — sie rotieren Kampagnen-Texte und würden jeden Monat
  // als "verändert" auftauchen. Für sie zählt allein, ob sie erreichbar sind.
  return [...proUrl.values()].map((u) => ({ ...u, nurErreichbar: u.felder.every((f) => f.schluessel === "website") }));
}

/** Zwei URLs, die auf dieselbe Ressource zeigen: www-Präfix, Schrägstrich am Ende und
 *  Fragment sind für die Frage "ist der Beleg noch da" bedeutungslos. */
function gleicheRessource(a, b) {
  const norm = (u) => {
    const x = new URL(u);
    const host = x.hostname.startsWith("www.") ? x.hostname.slice(4) : x.hostname;
    let pfad = x.pathname;
    while (pfad.length > 1 && pfad.endsWith("/")) pfad = pfad.slice(0, -1);
    return host + pfad + x.search;
  };
  try { return norm(a) === norm(b); } catch { return false; }
}

/** Ist das Weiterleitungsziel nur noch eine Startseite, obwohl die Quelle tief verlinkt war? */
function aufStartseiteGelandet(von, nach) {
  try {
    const a = new URL(von), b = new URL(nach);
    return a.pathname.replace(/\/+$/, "").length > 0 && b.pathname.replace(/\/+$/, "").length === 0;
  } catch { return false; }
}

// Prüfdatum nach Ortszeit. toISOString() ist UTC: Ein Lauf um 01:30 MESZ schrieb sonst den Vortag
// (16.10.2026: Quellenlauf setzte 21 Profile von 2026-10-16 auf 2026-10-15 zurück).
function heuteLokal(d = new Date()) {
  const zwei = (n) => String(n).padStart(2, "0");
  return d.getFullYear() + "-" + zwei(d.getMonth() + 1) + "-" + zwei(d.getDate());
}

// --help: den Block "Aufruf: …" bis zur nächsten Leerzeile " *" aus dem Kopfkommentar eines Skripts.
// Zeilenenden erst vereinheitlichen: Mit CRLF-Checkout fand die Suche nichts und --help stürzte ab (16.10.2026).
function hilfeAusKopf(quelltext) {
  const treffer = quelltext.replace(/\r\n?/g, "\n").match(/\* Aufruf:[\s\S]*?(?=\n \*\n)/);
  if (!treffer) return "Keine Hilfe im Kopfkommentar gefunden.";
  return treffer[0].replace(/^ ?\* ?/gm, "");
}

/** Sichtbarer Text einer HTML-Seite: ohne Scripts, Styles, Kommentare, Tags; Whitespace normalisiert.
 *  Nonces, Build-IDs und Cookie-Banner-Skripte ändern sich bei jedem Abruf — der Text nicht. */
function normalisiereText(html) {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Inhalts-Hash (16 Hex-Zeichen wie im lastmod-Ledger). HTML über die sortierte Wortmenge des
 *  sichtbaren Texts, alles andere über die Bytes. Sortiert, weil manche Seiten (dqsglobal.com) ihre
 *  Menüs bei jedem Abruf anders anordnen: Ein hinzugefügtes, entferntes oder geändertes Wort wird
 *  weiterhin erkannt — eine bloße Umsortierung nicht. */
function hashInhalt(contentType, bytes) {
  const woerter = woerterInhalt(contentType, bytes);
  const basis = woerter ? woerter.join(" ") : ohneAntwortzeit(contentType, ohnePdfZeitstempel(bytes));
  return crypto.createHash("sha256").update(basis).digest("hex").slice(0, 16);
}

/** Manche PDFs werden bei jedem Abruf neu erzeugt (Infomaniak-AGB, 09.10.2026): Zwischen zwei Abrufen
 *  unterscheiden sich nur /CreationDate, /ModDate und die Datei-/ID im Trailer. Die fallen vor dem
 *  Hash weg; jedes andere Byte zählt weiter. latin1, damit Binärströme unverändert bleiben. */
function ohnePdfZeitstempel(bytes) {
  if (bytes.subarray(0, 5).toString("latin1") !== "%PDF-") return bytes;
  return Buffer.from(bytes.toString("latin1")
    .replace(/\/(CreationDate|ModDate)\s*\([^)]*\)/g, "/$1 ()")
    .replace(/\/ID\s*\[\s*<[0-9A-Fa-f]*>\s*<[0-9A-Fa-f]*>\s*\]/g, "/ID []"), "latin1");
}

/** JSON-Preisdatenbanken (BFL/Sanity, 15.10.2026) hängen die Antwortzeit als oberstes Feld "ms" an,
 *  die bei jedem Abruf anders ist. Sie fällt vor dem Hash weg; jeder andere Wert zählt weiter. JSON
 *  ohne "ms" oder nicht lesbares JSON bleibt bei den rohen Bytes, damit alte Ledger-Hashes stimmen. */
function ohneAntwortzeit(contentType, bytes) {
  if (!/json/i.test(contentType || "")) return bytes;
  let j;
  try { j = JSON.parse(bytes.toString("utf8")); } catch { return bytes; }
  if (!j || typeof j !== "object" || Array.isArray(j) || typeof j.ms !== "number") return bytes;
  const { ms, ...rest } = j;
  return JSON.stringify(rest);
}

/** Hash, wie er bis 09.10.2026 für alles außer HTML im Ledger steht (rohe Bytes). Nur für die
 *  einmalige Umstellung: Stimmt er beim frischen Abruf noch, hat sich die Quelle nicht verändert. */
function hashInhaltAlt(bytes) {
  return crypto.createHash("sha256").update(bytes).digest("hex").slice(0, 16);
}

/** Die sortierte Wortliste, über die der HTML-Hash läuft; null für PDFs und andere Bytes (PDF-Wörter: woerterPdf). */
function woerterInhalt(contentType, bytes) {
  if (!/html|xml/i.test(contentType || "")) return null;
  return normalisiereText(bytes.toString("utf8")).split(" ").sort();
}

/** pdftotext (xpdf, liegt Git for Windows bei): PDFTOTEXT, sonst PATH, sonst der Git-Pfad; null, wenn keins da. */
let pdftotextGefunden;
function pdftotextPfad() {
  if (pdftotextGefunden !== undefined) return pdftotextGefunden;
  const { spawnSync } = require("child_process");
  const kandidaten = [process.env.PDFTOTEXT, "pdftotext", "C:\\Program Files\\Git\\mingw64\\bin\\pdftotext.exe"].filter(Boolean);
  pdftotextGefunden = kandidaten.find((k) => !spawnSync(k, ["-v"], { timeout: 5000 }).error) || null;
  return pdftotextGefunden;
}

/** Wortliste eines PDFs nur fürs Wortprotokoll (Zoom-AVV, Slack-Liste, 16.10.2026: bisher nur "verändert"
 *  ohne Wörter). Der Hash bleibt der Byte-Hash, damit alte Ledger-Einträge gültig bleiben.
 *  null bei Nicht-PDF, kaputtem PDF oder fehlendem pdftotext. */
function woerterPdf(contentType, bytes, { bin = pdftotextPfad() } = {}) {
  const istPdf = /pdf/i.test(contentType || "") || bytes.subarray(0, 5).toString("latin1") === "%PDF-";
  if (!istPdf || !bin) return null;
  const { spawnSync } = require("child_process");
  const os = require("os");
  const datei = path.join(os.tmpdir(), "belegbar-" + crypto.randomBytes(6).toString("hex") + ".pdf");
  try {
    fs.writeFileSync(datei, bytes);
    const r = spawnSync(bin, ["-enc", "UTF-8", "-q", datei, "-"], { timeout: 30000, maxBuffer: 64 * 1024 * 1024 });
    if (r.error || r.status !== 0) return null;
    const text = r.stdout.toString("utf8").replace(/\s+/g, " ").trim();
    return text ? text.split(" ").sort() : [];
  } finally {
    fs.rmSync(datei, { force: true });
  }
}

/** Wortprotokoll: welche Wörter (mit Anzahl) sind seit der Referenz weg bzw. dazu?
 *  Damit sieht man bei "verändert", ob nur ein Zähler tickt oder die Aussage sich ändert. */
function wortDiff(alt, neu) {
  const zaehle = (liste) => liste.reduce((m, w) => m.set(w, (m.get(w) || 0) + 1), new Map());
  const a = zaehle(alt), n = zaehle(neu);
  const rest = (x, y) => [...x].filter(([w, k]) => k > (y.get(w) || 0)).map(([w, k]) => [w, k - (y.get(w) || 0)]).sort((p, q) => (p[0] < q[0] ? -1 : 1));
  return { weg: rest(a, n), dazu: rest(n, a) };
}

/** Dateiname des gespeicherten Wortstands einer URL (data/quellen-woerter/). */
function wortDateiName(url) {
  return crypto.createHash("sha256").update(url).digest("hex").slice(0, 16) + ".txt";
}

/** Hugging-Face-Modellseite (huggingface.co/<org>/<modell>) → "<org>/<modell>", sonst null.
 *  Die HTML-Karte trägt Download-, Like- und Org-Zähler, die täglich ticken (Aleph Alpha, 16.–18.10.2026). */
function hfModellId(url) {
  const m = /^https:\/\/huggingface\.co\/([^/?#]+)\/([^/?#]+)\/?$/.exec(url);
  if (!m || ["api", "datasets", "spaces", "docs", "blog"].includes(m[1])) return null;
  return m[1] + "/" + m[2];
}

/** Git-Revision der Modellkarte aus der offenen API; null, wenn nicht lesbar (dann gilt der HTML-Hash). */
async function hfRevision(id, holen) {
  try {
    const r = await holen("https://huggingface.co/api/models/" + id, { method: "GET", redirect: "follow", signal: AbortSignal.timeout(TIMEOUT_MS), headers: { "user-agent": UA, accept: "application/json" } });
    if (r.status >= 400) return null;
    const j = JSON.parse(Buffer.from(await r.arrayBuffer()).toString("utf8"));
    return j && typeof j.sha === "string" && j.sha ? ["hf-revision:" + j.sha, "lastModified:" + (j.lastModified || "?")] : null;
  } catch { return null; }
}

/** Seiten mit einer Tabelle, deren Zähler mehrmals am Tag ticken: zwischen Anfangs- und End-Überschrift
 *  fallen reine Zahlen weg, Wörter (Einstufungen, Namen) zählen weiter. opper.ai/ai-compliance: Spalte
 *  "Models" je Anbieter (16.–18.10.2026 dreimal "verändert", nur Zähler). Optionales drittes Feld: nur Zahlen
 *  direkt vor diesem Wort fallen weg. eurouter.ai/providers: "<n> models" je Provider (Tensorix 23 → 24,
 *  18./19.10.2026); "17 providers" zählt weiter. Mehrere Abschnitte je URL als Liste. eurouter.ai/models:
 *  Filterleiste ("Chat 118 → 119") und Gesamtzahl ("151 → 152 models", oben und "models." unten), 19.10.2026;
 *  belegt sind dort nur Preise ("$0.30"), die keine reinen Zahlen sind und weiter zählen. */
const ZAEHLER_ABSCHNITTE = {
  "https://opper.ai/ai-compliance": ["Data handling by provider", "GDPR and AI compliance FAQ"],
  "https://eurouter.ai/providers": ["EUrouter Providers", "Are you looking to become a provider", "models"],
  "https://eurouter.ai/models": [
    ["pick what works.", "EUrouter routes your requests", "models"],
    ["Search models Endpoint", "Capabilities"],
  ],
};

function ohneZaehlerAbschnitt(regel, text) {
  const a = text.indexOf(regel[0]);
  const b = a < 0 ? -1 : text.indexOf(regel[1], a + regel[0].length);
  if (b < 0) return text;
  const w = text.slice(a, b).split(" ");
  const folgt = (i) => (w[i + 1] || "").replace(/[.,;:]$/, "") === regel[2];
  const mitte = w.filter((x, i) => x && !(/^\d+$/.test(x) && (!regel[2] || folgt(i)))).join(" ");
  return text.slice(0, a) + mitte + " " + text.slice(b);
}

function ohneZaehler(url, text) {
  const regel = ZAEHLER_ABSCHNITTE[url];
  if (!regel) return text;
  const regeln = Array.isArray(regel[0]) ? regel : [regel];
  return regeln.reduce((t, r) => ohneZaehlerAbschnitt(r, t), text);
}

/** Ranglisten-Seiten, auf denen nur einzelne Modell-Karten belegt werden: es zählt nur der Text dieser Karten
 *  (vom Namen "<Modell> by" bis zur Region-Angabe). opper.ai/models: ~1.200 Modelle, Gesamtzähler, Rangfolge
 *  und fremde Kontextfenster wechseln täglich (18./19.10.2026 "verändert", kein Profilpreis betroffen).
 *  Namen = Profilmodelle mit dieser Quelle (Test hält beides gleich). */
const KARTEN_SEITEN = {
  "https://opper.ai/models": ["Claude Opus 5", "Claude Sonnet 5", "GPT-5.4", "DeepSeek V4 Pro", "Gemini 3.5 Flash"],
};
const KARTE_ENDE = /Region (?:EU|US|Multi)(?:(?:, | \+ )(?:EU|US|Multi))*/;

/** Text der Karten einer KARTEN_SEITEN-URL; fehlt eine Karte oder ihr Ende, steht ein Merker im Text
 *  (der Hash ändert sich also, statt still zu bleiben). null ohne Regel. */
function nurKarten(url, text) {
  const namen = KARTEN_SEITEN[url];
  if (!namen) return null;
  return namen.map((name) => {
    const m = new RegExp("(?:^| )" + name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + " by ").exec(text);
    if (!m) return "KARTE-FEHLT:" + name;
    const start = m.index + (m[0].startsWith(" ") ? 1 : 0);
    const ende = KARTE_ENDE.exec(text.slice(start));
    return ende ? text.slice(start, start + ende.index + ende[0].length) : "KARTE-OHNE-ENDE:" + name;
  }).join(" ");
}

/** Wortliste wie woerterInhalt, bei ZAEHLER_ABSCHNITTE ohne die Zähler, bei KARTEN_SEITEN nur die Karten;
 *  null ohne Regel oder ohne HTML. */
function woerterOhneZaehler(url, contentType, bytes) {
  if (!(ZAEHLER_ABSCHNITTE[url] || KARTEN_SEITEN[url]) || !/html|xml/i.test(contentType || "")) return null;
  const text = normalisiereText(bytes.toString("utf8"));
  return (KARTEN_SEITEN[url] ? nurKarten(url, text) : ohneZaehler(url, text)).split(" ").sort();
}

/** Öffentliche Notion-Seite (<x>.notion.site/<slug>-<32 Hex>) → { site, id mit Bindestrichen }, sonst null.
 *  Ihr Text lädt erst im Browser; ohne Browser bleibt eine Hülle von ~15 Wörtern (Pilot-Prüfung 16.10.2026). */
function notionSeite(url) {
  const m = /^https:\/\/([a-z0-9-]+\.notion\.site)\/(?:[^?#]*-)?([0-9a-f]{32})\/?(?:[?#].*)?$/.exec(url);
  if (!m) return null;
  const h = m[2];
  return { site: m[1], id: [h.slice(0, 8), h.slice(8, 12), h.slice(12, 16), h.slice(16, 20), h.slice(20)].join("-") };
}

/** Text einer Notion-Seite über die offene Seiten-API (loadPageChunk, Cursor bis leer, höchstens 30 Chunks).
 *  { woerter: sortiert (darüber läuft der Hash), lesefolge: eine Zeile je Block in Seitenreihenfolge }.
 *  Reihenfolge: Baum ab der Seite über `content`, Tabellenzeilen Spalte für Spalte mit " | " (Spalten nach
 *  `table_block_column_order` der Tabelle); Blöcke außerhalb des Baums hinten in Ankunftsreihenfolge.
 *  null, wenn nicht lesbar oder ohne Text (dann gilt der HTML-Hash, und der Wächter meldet DÜNN). */
async function notionWoerter({ site, id }, holen) {
  const woerter = [];
  const bloecke = new Map();
  let cursor = { stack: [] };
  try {
    for (let chunkNumber = 0; chunkNumber < 30; chunkNumber++) {
      const r = await holen(`https://${site}/api/v3/loadPageChunk`, {
        method: "POST", redirect: "follow", signal: AbortSignal.timeout(TIMEOUT_MS),
        headers: { "user-agent": UA, "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify({ pageId: id, limit: 100, cursor, chunkNumber, verticalColumns: false }),
      });
      if (r.status >= 400) return null;
      const j = JSON.parse(Buffer.from(await r.arrayBuffer()).toString("utf8"));
      for (const [schluessel, eintrag] of Object.entries((j.recordMap && j.recordMap.block) || {})) {
        const v = eintrag && eintrag.value && (eintrag.value.value || eintrag.value);
        if (!v) continue;
        if (!bloecke.has(schluessel)) bloecke.set(schluessel, v);
        for (const teile of Object.values(v.properties || {})) {
          for (const teil of teile) if (Array.isArray(teil) && typeof teil[0] === "string") woerter.push(...teil[0].split(/\s+/).filter(Boolean));
        }
      }
      cursor = j.cursor;
      if (!cursor || !Array.isArray(cursor.stack) || cursor.stack.length === 0) break;
    }
  } catch { return null; }
  return woerter.length ? { woerter: woerter.sort(), lesefolge: notionLesefolge(bloecke, id) } : null;
}

function notionLesefolge(bloecke, wurzel) {
  const text = (teile) => (Array.isArray(teile) ? teile : []).map((t) => (Array.isArray(t) && typeof t[0] === "string" ? t[0] : "")).join("").replace(/\s+/g, " ").trim();
  const zeile = (v, spalten) => {
    const p = v.properties || {};
    const schluessel = v.type === "table_row" && Array.isArray(spalten) ? [...spalten, ...Object.keys(p).filter((k) => !spalten.includes(k))] : Object.keys(p);
    return schluessel.map((k) => text(p[k])).filter(Boolean).join(" | ");
  };
  const zeilen = [], gesehen = new Set();
  const besuche = (schluessel, spalten) => {
    if (gesehen.has(schluessel) || !bloecke.has(schluessel)) return;
    gesehen.add(schluessel);
    const v = bloecke.get(schluessel);
    const z = zeile(v, spalten);
    if (z) zeilen.push(z);
    const eigene = v.format && v.format.table_block_column_order;
    for (const kind of Array.isArray(v.content) ? v.content : []) besuche(kind, eigene);
  };
  besuche(wurzel);
  for (const schluessel of bloecke.keys()) besuche(schluessel);
  return zeilen;
}

/** Folgt Weiterleitungen selbst und nimmt Cookies desselben Hosts mit. Node-fetch vergisst Cookies zwischen
 *  den Sprüngen; ovhcloud.com leitet seit 19.10.2026 mit "Set-Cookie: cdn=…" auf dieselbe Adresse um und
 *  ohne Cookie endlos weiter (12 Quellen "fetch failed"). Mehr als 10 Sprünge: Fehler wie bei fetch. */
async function folgeMitCookies(holen, url, opts) {
  const dose = new Map(); // host -> Map(name -> "name=wert")
  let ziel = url, methode = opts.method;
  for (let sprung = 0; sprung <= 10; sprung++) {
    const host = new URL(ziel).host;
    const cookie = dose.has(host) ? [...dose.get(host).values()].join("; ") : "";
    const r = await holen(ziel, { ...opts, method: methode, redirect: "manual", headers: { ...opts.headers, ...(cookie ? { cookie } : {}) } });
    const wohin = r.status >= 300 && r.status < 400 ? r.headers.get("location") : null;
    if (!wohin) return r;
    const gesetzt = typeof r.headers.getSetCookie === "function" ? r.headers.getSetCookie() : [r.headers.get("set-cookie")].filter(Boolean);
    for (const c of gesetzt) {
      const paar = c.split(";")[0].trim();
      if (!paar.includes("=")) continue;
      if (!dose.has(host)) dose.set(host, new Map());
      dose.get(host).set(paar.split("=")[0], paar);
    }
    if (r.status === 303) methode = "GET";
    ziel = new URL(wohin, ziel).href;
  }
  throw new TypeError("fetch failed", { cause: { code: "ZU_VIELE_WEITERLEITUNGEN" } });
}

/** Ruft eine Quelle ab: Befund wie im Linkcheck, bei "ok" zusätzlich der Inhalts-Hash. */
async function pruefe(t, { mitHash = false, holen = fetch } = {}) {
  const host = new URL(t.url).hostname;
  const gesperrt = BOT_SPERREN.some((h) => host.endsWith(h));
  const sperre = (grund) => ({ ...t, befund: "uebersprungen", hinweis: `Abruf geblockt (${grund}); im Browser prüfen` });
  // Gesperrte Quellen immer per GET: die Challenge-Seite erkennt man nur am Inhalt.
  const methoden = gesperrt || (mitHash && !t.nurErreichbar) ? ["GET"] : ["HEAD", "GET"];
  for (const methode of methoden) {
    try {
      const r = await folgeMitCookies(holen, t.url, { method: methode, signal: AbortSignal.timeout(TIMEOUT_MS), headers: { "user-agent": UA, accept: "*/*" } });
      if (methode === "HEAD" && [403, 405, 501].includes(r.status)) continue;
      if (gesperrt && SPERR_STATUS.includes(r.status)) return sperre("Status " + r.status);
      if (r.status >= 400) return { ...t, befund: "fehler", status: r.status };
      if (aufStartseiteGelandet(t.url, r.url)) return { ...t, befund: "beleg-verloren", status: r.status, ziel: r.url };
      const ok = { ...t, befund: "ok", status: r.status, ziel: gleicheRessource(t.url, r.url) ? null : r.url };
      const bytes = gesperrt || (mitHash && !t.nurErreichbar) ? Buffer.from(await r.arrayBuffer()) : null;
      if (gesperrt && CHALLENGE.test(bytes.toString("utf8"))) return sperre("Challenge-Seite");
      if (mitHash && !t.nurErreichbar) {
        // Auch ungelistete Quellen: eine Sperrseite darf nie als neuer Inhalt in den Ledger.
        if (CHALLENGE.test(bytes.toString("utf8"))) return sperre("Challenge-Seite");
        const hfId = hfModellId(t.url);
        const notion = notionSeite(t.url);
        const notionText = !hfId && notion ? await notionWoerter(notion, holen) : null;
        const rev = hfId ? await hfRevision(hfId, holen) : notionText ? notionText.woerter : woerterOhneZaehler(t.url, r.headers.get("content-type"), bytes);
        if (notionText) Object.defineProperty(ok, "lesefolge", { value: notionText.lesefolge, enumerable: false });
        ok.hash = rev ? crypto.createHash("sha256").update(rev.join(" ")).digest("hex").slice(0, 16) : hashInhalt(r.headers.get("content-type"), bytes);
        // Nicht aufzählbar: die Wortliste soll nicht im --json-Bericht landen, nur im Wortprotokoll.
        Object.defineProperty(ok, "woerter", { value: rev || woerterInhalt(r.headers.get("content-type"), bytes) || woerterPdf(r.headers.get("content-type"), bytes), enumerable: false });
      }
      return ok;
    } catch (e) {
      // Fehlt dem Server das Zwischenzertifikat, scheitert Node, Browser und curl laden die Seite (dpa.gov.al, 08.10.2026).
      const code = e.cause && e.cause.code;
      if (TLS_KETTE.includes(code)) return sperre("TLS-Kette des Servers unvollständig, " + code);
      if (methode === "GET") return { ...t, befund: "nicht-erreichbar", hinweis: e.message };
    }
  }
  return { ...t, befund: "nicht-erreichbar", hinweis: "unbekannt" };
}

async function pruefeAlle(urls, opts, gleichzeitig = 8) {
  const ergebnis = [];
  let i = 0;
  await Promise.all(Array.from({ length: gleichzeitig }, async () => {
    while (i < urls.length) ergebnis.push(await pruefe(urls[i++], opts));
  }));
  return ergebnis.sort((a, b) => a.anbieter.localeCompare(b.anbieter) || a.url.localeCompare(b.url));
}

/** Teilt einen Lauf gegen den Ledger in: neu, unverändert, verändert, verschwunden, übersprungen.
 *  Ledger-Einträge mit "nur_erreichbar": true (von Hand gesetzt, mit "grund") werden nicht inhaltlich
 *  verglichen — für Seiten, die bei jedem Abruf andere Blöcke einblenden. Sparsam einsetzen. */
function ordneLauf(ergebnis, ledger) {
  const o = { neu: [], unveraendert: [], veraendert: [], verschwunden: [], uebersprungen: [] };
  for (const e of ergebnis) {
    if (e.befund === "uebersprungen") o.uebersprungen.push(e);
    else if (e.befund !== "ok") o.verschwunden.push(e);
    else if (e.nurErreichbar || (ledger[e.url] && ledger[e.url].nur_erreichbar)) o.unveraendert.push(e);
    else if (!ledger[e.url]) o.neu.push(e);
    else if (ledger[e.url].hash === e.hash) o.unveraendert.push(e);
    else o.veraendert.push(e);
  }
  return o;
}

/** Manche Seiten liefern unter Last kurzzeitig eine andere Variante (Cache-Knoten, A/B-Text).
 *  "Verändert" und "verschwunden" werden deshalb einmal seriell nachgeladen; nur was beim zweiten Abruf so bleibt, zählt. */
async function bestaetigeVeraendert(o, ledger, nochmal = (t) => pruefe(t, { mitHash: true })) {
  const veraendert = [], verschwunden = [], unveraendert = [...o.unveraendert];
  const alt = (u) => ledger[u] && ledger[u].hash;
  for (const e of o.veraendert) {
    const z = await nochmal(e);
    if (z.befund === "ok" && z.hash === alt(e.url)) unveraendert.push(z);
    else veraendert.push(z.befund === "ok" ? z : e);
  }
  // Ein 503 oder Timeout unter Last ist noch kein verlorener Beleg — erst der zweite Fehlschlag.
  for (const e of o.verschwunden) {
    const z = await nochmal(e);
    if (z.befund !== "ok") verschwunden.push(z);
    else if (e.nurErreichbar || !alt(e.url) || z.hash === alt(e.url)) unveraendert.push(z);
    else veraendert.push(z);
  }
  return { ...o, veraendert, verschwunden, unveraendert };
}

const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Setzt das Feld-geprueft in jeder Zeile, die genau diese URL als "quelle" trägt.
 *  Zeilenweise Textersetzung statt JSON.stringify: Die Anbieter-Dateien sind handformatiert
 *  (ein Beleg-Objekt je Zeile), und ein Diff soll nur die Zeilen zeigen, die sich geändert haben. */
function setzeGeprueft(text, url, datum) {
  const quelle = `"quelle": "${url}"`;
  // Pro Treffer nur das Datum im selben Objekt: geprueft steht in allen Dateien hinter seiner quelle
  // und vor dem nächsten {, } oder der nächsten quelle. Vorher wurde das erste Datum der Zeile ersetzt,
  // in Zeilen mit Unterobjekten also das eines anderen Belegs (OVHcloud HDS, bis 21.10.).
  const treffer = new RegExp(escRe(quelle) + "(?=[, ])([^{}]*?)(?=\"quelle\":|[{}]|$)", "g");
  return text.split("\n").map((zeile) => zeile.replace(treffer, (ganz, rest) => {
    if (/"geprueft": "\d{4}-\d{2}-\d{2}"/.test(rest)) return quelle + rest.replace(/"geprueft": "\d{4}-\d{2}-\d{2}"/, `"geprueft": "${datum}"`);
    return rest.startsWith(",") ? `${quelle}, "geprueft": "${datum}"${rest}` : ganz;
  })).join("\n");
}

/** Anbieter komplett unverändert: Top-Level-Datum und alle Feld-Daten auf denselben Tag setzen.
 *  Gleiche Daten erzeugen kein "einzelne Angaben zuletzt am …"; entfernen ginge nicht, weil
 *  Prüfpunkt- und ISO-42001-Felder ein eigenes Prüfdatum brauchen (Build streng, 09.10.). */
function setzeTopGeprueft(text, datum) {
  return text.replace(/"geprueft": "\d{4}-\d{2}-\d{2}"/g, `"geprueft": "${datum}"`);
}

/** Was je Anbieter-Datei geschrieben wird. Nur "quelle"/"wert"-Felder tragen ein geprueft;
 *  "website" ist Stammdatum ohne Prüfanspruch. Ist bei einem Anbieter alles Belegende unverändert,
 *  reicht das Top-Level-Datum; sonst bekommen nur die unveränderten Felder ein eigenes Datum. */
function planeFortschreibung(ordnung, alleUrls) {
  const belegend = (f) => f.schluessel !== "website";
  const unv = new Set([...ordnung.unveraendert, ...(ordnung.uebernommen || [])].map((e) => e.url));
  const plan = {};
  for (const u of alleUrls) {
    for (const f of u.felder.filter(belegend)) {
      const eintrag = (plan[f.datei] ||= { offen: 0, urls: new Set() });
      if (unv.has(u.url)) eintrag.urls.add(u.url); else eintrag.offen++;
    }
  }
  const aus = {};
  for (const [datei, e] of Object.entries(plan)) {
    if (e.urls.size === 0) continue;
    aus[datei] = e.offen === 0 ? { modus: "top", urls: [] } : { modus: "felder", urls: [...e.urls] };
  }
  return aus;
}

/** Von Hand gelesene "verändert"-Quellen gezielt übernehmen: Einträge, deren URL mit einem der
 *  Präfixe beginnt, wandern nach "uebernommen" (neue Referenz, Prüfdatum wie unverändert).
 *  Leere Präfixe zählen nicht — pauschal übernimmt nur --uebernehmen. Eingang bleibt unverändert. */
function teileUebernahme(ordnung, praefixe) {
  const p = praefixe.filter(Boolean);
  const passt = (e) => p.some((x) => e.url.startsWith(x));
  return { ...ordnung, veraendert: ordnung.veraendert.filter((e) => !passt(e)), uebernommen: [...(ordnung.uebernommen || []), ...ordnung.veraendert.filter(passt)] };
}

/**
 * Aufruf von quellenlauf.js prüfen, bevor irgendetwas abgerufen oder geschrieben wird.
 * Grund (09.10.2026): Unbekannte Schalter wurden still ignoriert, ein Tippfehler wie "--trockn"
 * machte aus einem Trockenlauf einen Lauf, der Ledger und Anbieter-Dateien schreibt.
 */
const SCHALTER = new Set(["--trocken", "--uebernehmen"]);
const MIT_WERT = new Set(["--json", "--uebernehmen-nur"]);
function pruefeAufruf(argv) {
  if (argv.includes("--help") || argv.includes("-h")) return { hilfe: true };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (SCHALTER.has(a)) continue;
    if (MIT_WERT.has(a)) {
      const w = argv[i + 1];
      if (!w || w.startsWith("--")) return { fehler: a + " braucht einen Wert" };
      i++;
      continue;
    }
    return { fehler: "unbekannter Schalter: " + a };
  }
  if (argv.includes("--uebernehmen") && argv.includes("--uebernehmen-nur")) return { fehler: "--uebernehmen und --uebernehmen-nur nicht zusammen (pauschal oder gezielt)" };
  return { ok: true };
}

/** Ledger fortschreiben: neu/unverändert → Referenz; verändert → nur neu_hash merken.
 *  erst = Datum des ersten Eintrags, uebernommen = Datum der letzten Übernahme nach Handprüfung (V4):
 *  So unterscheidet der Kasten auf der Profilseite "erstmals gesehen" von "verändert, gelesen, übernommen". */
function fuehreLedger(alt, o, uebernehmen, datum) {
  const l = { ...alt };
  const uebernimm = (e) => ({ hash: e.hash, gesehen: datum, geaendert: datum, erst: (l[e.url] && l[e.url].erst) || datum, uebernommen: datum });
  for (const e of o.neu) l[e.url] = { hash: e.hash, gesehen: datum, geaendert: datum, erst: datum };
  // Von Hand gesetztes nur_erreichbar (mit grund) bleibt erhalten; der Hash wird trotzdem mitgeführt.
  for (const e of o.unveraendert) l[e.url] = e.nurErreichbar ? { nur_erreichbar: true, gesehen: datum } : { ...l[e.url], gesehen: datum, neu_hash: undefined, veraendert_seit: undefined, verschwunden: undefined };
  for (const e of o.veraendert) {
    l[e.url] = uebernehmen ? uebernimm(e) : { ...l[e.url], gesehen: datum, neu_hash: e.hash, veraendert_seit: l[e.url].veraendert_seit || datum };
  }
  for (const e of o.uebernommen || []) l[e.url] = uebernimm(e);
  for (const e of o.verschwunden) l[e.url] = { ...l[e.url], gesehen: datum, verschwunden: e.befund };
  const sortiert = {};
  for (const k of Object.keys(l).sort()) sortiert[k] = JSON.parse(JSON.stringify(l[k]));
  return sortiert;
}

module.exports = { nurKarten, KARTEN_SEITEN, heuteLokal, hilfeAusKopf, ZWISCHEN_DATEI, zwischenEnv, mitZwischenzertifikaten, fuehreLedger, DATA_DIR, pruefeAufruf, BOT_SPERREN, sammleUrls, gleicheRessource, aufStartseiteGelandet, normalisiereText, hashInhalt, hashInhaltAlt, hfModellId, notionSeite, ZAEHLER_ABSCHNITTE, ohneZaehler, woerterInhalt, woerterPdf, pdftotextPfad, wortDiff, wortDateiName, pruefe, pruefeAlle, ordneLauf, bestaetigeVeraendert, setzeGeprueft, setzeTopGeprueft, planeFortschreibung, teileUebernahme };
