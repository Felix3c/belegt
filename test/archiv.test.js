"use strict";
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { normText, zitatTeile, rohUrl, zitatInText, sammleFallZitate, istPdf, pdfTraegt } = require("../lib/archiv.js");

test("normText: Tags, Entities, Trennzeichen und Groß-/Kleinschreibung fallen weg", () => {
  assert.equal(normText("<b>GDPR</b>&nbsp;compliant · ISO&#160;27001 — EU"), "gdpr compliant iso 27001 eu");
});

test("normText: Prozentzeichen bleibt (100% renewable)", () => {
  assert.equal(normText("100% Renewable"), "100% renewable");
});

test("zitatTeile: Auslassung […] und … teilen das Zitat", () => {
  assert.deepEqual(zitatTeile("Your data is never stored […] Requesty Gateway Frankfurt, EU — No data stored"), [
    "your data is never stored",
    "requesty gateway frankfurt eu no data stored",
  ]);
  assert.deepEqual(zitatTeile("eins zwei drei … vier fünf sechs"), ["eins zwei drei", "vier fünf sechs"]);
});

test("zitatTeile: zu kurze Reste (unter drei Wörtern) zählen nicht", () => {
  assert.deepEqual(zitatTeile("so steht es geschrieben […] ja"), ["so steht es geschrieben"]);
});

test("rohUrl: Wayback-Link bekommt id_ für die unveränderte Seite", () => {
  assert.equal(
    rohUrl("https://web.archive.org/web/20260825152830/https://www.requesty.ai/security"),
    "https://web.archive.org/web/20260825152830id_/https://www.requesty.ai/security"
  );
  assert.equal(rohUrl("https://web.archive.org/web/20260825152830id_/https://x.y/"), "https://web.archive.org/web/20260825152830id_/https://x.y/");
});

test("zitatInText: alle Teile müssen vorkommen, fehlende werden genannt", () => {
  const html = "<p>Your data is <em>never</em> stored.</p><div>Requesty Gateway Frankfurt, EU – No data stored</div>";
  assert.deepEqual(zitatInText("Your data is never stored […] Requesty Gateway Frankfurt, EU — No data stored", html), { ok: true, fehlt: [] });
  const r = zitatInText("Your data is never stored […] Gateway Paris, EU — No data stored", html);
  assert.equal(r.ok, false);
  assert.deepEqual(r.fehlt, ["gateway paris eu no data stored"]);
});

test("sammleFallZitate: behauptung und beleg, Einzelobjekt oder Liste", () => {
  const fall = {
    id: "2026-009",
    behauptung: { zitat: "a b c", quelle: "q1", archiv: "w1" },
    beleg: [{ zitat: "d e f", quelle: "q2", archiv: "w2" }, { zitat: "g h i", quelle: "q3" }],
  };
  assert.deepEqual(sammleFallZitate(fall), [
    { fall: "2026-009", feld: "behauptung", nr: 0, zitat: "a b c", quelle: "q1", archiv: "w1" },
    { fall: "2026-009", feld: "beleg", nr: 0, zitat: "d e f", quelle: "q2", archiv: "w2" },
    { fall: "2026-009", feld: "beleg", nr: 1, zitat: "g h i", quelle: "q3", archiv: null },
  ]);
});

test("istPdf: erkennt PDF am Dateianfang, nicht an der Adresse", () => {
  assert.equal(istPdf(Buffer.from("%PDF-1.7\n…")), true);
  assert.equal(istPdf(Buffer.from("<!doctype html><title>x.pdf</title>")), false);
});

test("pdfTraegt: Archivkopie byte-gleich zur geprüften Rohkopie trägt, sonst Befund", () => {
  const bytes = Buffer.from("%PDF-1.7 inhalt");
  const sha = require("crypto").createHash("sha256").update(bytes).digest("hex");
  assert.deepEqual(pdfTraegt(bytes, sha), { ok: true, grund: "" });
  assert.equal(pdfTraegt(bytes, "0".repeat(64)).ok, false);
  assert.match(pdfTraegt(bytes, "0".repeat(64)).grund, /weicht ab/);
  assert.match(pdfTraegt(bytes, undefined).grund, /keine Prüfsumme/);
});

test("sammleFallZitate: reicht sha256 durch, wenn vorhanden", () => {
  const fall = { id: "2026-009", beleg: [{ zitat: "a b c", quelle: "q", archiv: "w", sha256: "ab" }] };
  assert.equal(sammleFallZitate(fall)[0].sha256, "ab");
});
