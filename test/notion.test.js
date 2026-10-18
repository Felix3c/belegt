"use strict";
// Notion-Seiten (Unterauftragnehmer-Liste, AVV) laden ihren Text erst im Browser; ohne Browser bleiben
// ~15 Wörter Hülle (Pilot-Prüfung 16.10.2026, Lücke 2). Die öffentliche Seiten-API liefert den Text.
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { notionSeite, pruefe, hashInhalt } = require("../lib/quellen.js");

const LISTE = "https://notion.notion.site/Notion-s-List-of-Subprocessors-268fa5bcfa0f46b6bc29436b21676734";

test("notionSeite: nur *.notion.site mit 32-Hex-ID am Ende, ID mit Bindestrichen", () => {
  assert.deepEqual(notionSeite(LISTE), { site: "notion.notion.site", id: "268fa5bc-fa0f-46b6-bc29-436b21676734" });
  assert.deepEqual(notionSeite(LISTE + "?pvs=74"), { site: "notion.notion.site", id: "268fa5bc-fa0f-46b6-bc29-436b21676734" });
  assert.equal(notionSeite("https://www.notion.so/notion/Data-Processing-Addendum-361b540101274b1fa7e16b90402b0d99"), null);
  assert.equal(notionSeite("https://notion.notion.site/ohne-id"), null);
  assert.equal(notionSeite("https://example.org/Seite-268fa5bcfa0f46b6bc29436b21676734"), null);
});

// Zwei Chunks: der erste gibt einen Cursor zurück, der zweite einen leeren.
const block = (id, text, extra = {}) => ({ [id]: { value: { value: { id, type: "text", properties: { title: [[text]] }, ...extra } } } });
const notionHolen = ({ chunks, html = "<div id=notion-app></div>", aufrufe = [] }) => async (u, opt = {}) => {
  if (u.endsWith("/api/v3/loadPageChunk")) {
    const body = JSON.parse(opt.body);
    aufrufe.push(body);
    const c = chunks[body.chunkNumber];
    if (c instanceof Error) throw c;
    const text = JSON.stringify(c);
    return { status: 200, url: u, headers: { get: () => "application/json" }, arrayBuffer: async () => Buffer.from(text) };
  }
  return { status: 200, url: u, headers: { get: () => "text/html" }, arrayBuffer: async () => Buffer.from(html) };
};
const zweiChunks = (zeile) => [
  { cursor: { stack: [[{ table: "block", id: "x", index: 1 }]] }, recordMap: { block: { ...block("a", "Subprocessor AWS USA"), ...block("b", "Hosting") } } },
  { cursor: { stack: [] }, recordMap: { block: block("c", zeile) } },
];

test("pruefe: Notion-Seite → Wörter aus allen Chunks der API, Cursor wird weitergereicht", async () => {
  const aufrufe = [];
  const e = await pruefe({ url: LISTE }, { mitHash: true, holen: notionHolen({ chunks: zweiChunks("Anthropic Global"), aufrufe }) });
  assert.equal(e.befund, "ok");
  assert.deepEqual(e.woerter, ["AWS", "Anthropic", "Global", "Hosting", "Subprocessor", "USA"]);
  assert.equal(aufrufe.length, 2);
  assert.equal(aufrufe[0].pageId, "268fa5bc-fa0f-46b6-bc29-436b21676734");
  assert.deepEqual(aufrufe[1].cursor, { stack: [[{ table: "block", id: "x", index: 1 }]] });
});

test("pruefe: Notion-Seite, neuer Unterauftragnehmer → anderer Hash; gleicher Text → gleicher Hash", async () => {
  const a = await pruefe({ url: LISTE }, { mitHash: true, holen: notionHolen({ chunks: zweiChunks("Anthropic Global") }) });
  const b = await pruefe({ url: LISTE }, { mitHash: true, holen: notionHolen({ chunks: zweiChunks("Anthropic Global") }) });
  const c = await pruefe({ url: LISTE }, { mitHash: true, holen: notionHolen({ chunks: zweiChunks("Anthropic OpenAI Global") }) });
  assert.equal(a.hash, b.hash);
  assert.notEqual(a.hash, c.hash);
});

test("pruefe: Notion-API kaputt oder leer → Hash über die HTML-Hülle wie bisher (DÜNN-Warnung greift)", async () => {
  const html = "<div>Notion</div>";
  const kaputt = await pruefe({ url: LISTE }, { mitHash: true, holen: notionHolen({ chunks: [new Error("netz weg")], html }) });
  assert.equal(kaputt.befund, "ok");
  assert.equal(kaputt.hash, hashInhalt("text/html", Buffer.from(html)));
  const leer = await pruefe({ url: LISTE }, { mitHash: true, holen: notionHolen({ chunks: [{ cursor: { stack: [] }, recordMap: { block: {} } }], html }) });
  assert.equal(leer.hash, hashInhalt("text/html", Buffer.from(html)));
});

// Lesefolge (18.10.2026): die sortierten Wörter tragen den Hash, taugen aber nicht als Zitat. Der Text
// in Seitenreihenfolge (Baum über `content`, Tabellenzeilen Spalte für Spalte) kommt als zweiter Beleg dazu.
const SEITE = "268fa5bc-fa0f-46b6-bc29-436b21676734";
const roh = (id, value) => ({ [id]: { value: { value: { id, ...value } } } });
test("pruefe: Notion-Seite → Lesefolge in Baum-Reihenfolge, Tabellenzeile mit | , Hash bleibt der Wort-Hash", async () => {
  const chunks = [{ cursor: { stack: [] }, recordMap: { block: {
    ...roh("z2", { type: "table_row", properties: { s1: [["OpenAI"]], s2: [["USA"]] } }),
    ...roh(SEITE, { type: "page", properties: { title: [["Subprocessors"]] }, content: ["t", "n"] }),
    ...roh("n", { type: "text", properties: { title: [["Stand ", ["b"]], ["Oktober"]] } }),
    ...roh("t", { type: "table", content: ["z1", "z2"] }),
    ...roh("z1", { type: "table_row", properties: { s1: [["AWS"]], s2: [["Hosting"]] } }),
  } } }];
  const e = await pruefe({ url: LISTE }, { mitHash: true, holen: notionHolen({ chunks }) });
  assert.deepEqual(e.lesefolge, ["Subprocessors", "AWS | Hosting", "OpenAI | USA", "Stand Oktober"]);
  assert.ok(!Object.keys(e).includes("lesefolge"), "nicht im --json-Bericht");
  const crypto = require("crypto");
  assert.equal(e.hash, crypto.createHash("sha256").update(e.woerter.join(" ")).digest("hex").slice(0, 16));
});

test("pruefe: Notion-Blöcke ohne Baum → Lesefolge in Ankunftsreihenfolge, nichts geht verloren", async () => {
  const e = await pruefe({ url: LISTE }, { mitHash: true, holen: notionHolen({ chunks: zweiChunks("Anthropic Global") }) });
  assert.deepEqual(e.lesefolge, ["Subprocessor AWS USA", "Hosting", "Anthropic Global"]);
});
