"use strict";
const { test } = require("node:test");
const assert = require("node:assert/strict");
const Q = require("../lib/quellen.js");

/** Kleinstes gültiges PDF mit einer Textzeile (Helvetica), xref mit echten Offsets. */
function miniPdf(text) {
  const strom = `BT /F1 12 Tf 72 720 Td (${text}) Tj ET`;
  const objekte = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>",
    `<< /Length ${strom.length} >>\nstream\n${strom}\nendstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  ];
  let pdf = "%PDF-1.4\n";
  const offs = [];
  objekte.forEach((o, i) => { offs.push(pdf.length); pdf += `${i + 1} 0 obj\n${o}\nendobj\n`; });
  const xref = pdf.length;
  pdf += `xref\n0 ${objekte.length + 1}\n0000000000 65535 f \n` + offs.map((o) => String(o).padStart(10, "0") + " 00000 n \n").join("");
  pdf += `trailer\n<< /Size ${objekte.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  return Buffer.from(pdf, "latin1");
}

const hatPdftotext = Q.pdftotextPfad() !== null;

test("woerterPdf: Text eines PDFs als sortierte Wortliste (für das Wortprotokoll)", { skip: !hatPdftotext && "pdftotext fehlt" }, () => {
  assert.deepEqual(Q.woerterPdf("application/pdf", miniPdf("Zoom nutzt AWS und AWS")), ["AWS", "AWS", "Zoom", "nutzt", "und"]);
});

test("woerterPdf: erkennt PDF auch am Dateikopf, wenn der Server einen falschen Typ schickt", { skip: !hatPdftotext && "pdftotext fehlt" }, () => {
  assert.deepEqual(Q.woerterPdf("application/octet-stream", miniPdf("Slack")), ["Slack"]);
});

test("woerterPdf: HTML und kaputte Bytes ergeben null statt Absturz", () => {
  assert.equal(Q.woerterPdf("text/html", Buffer.from("<p>a</p>")), null);
  assert.equal(Q.woerterPdf("application/pdf", Buffer.from("%PDF-kaputt")), null);
});

test("woerterPdf: ohne pdftotext null (Wächter läuft weiter wie bisher)", () => {
  assert.equal(Q.woerterPdf("application/pdf", miniPdf("Zoom"), { bin: null }), null);
});

test("pruefe: PDF-Quelle bekommt eine Wortliste, der Hash bleibt der Byte-Hash (Ledger unverändert)", { skip: !hatPdftotext && "pdftotext fehlt" }, async () => {
  const bytes = miniPdf("Subprocessor Liste Stand Oktober");
  const holen = async (u) => ({ status: 200, url: u, headers: { get: () => "application/pdf" }, arrayBuffer: async () => bytes });
  const e = await Q.pruefe({ url: "https://explore.zoom.us/docs/doc/Zoom_GLOBAL_DPA.pdf" }, { mitHash: true, holen });
  assert.equal(e.hash, Q.hashInhalt("application/pdf", bytes));
  assert.deepEqual(e.woerter, ["Liste", "Oktober", "Stand", "Subprocessor"]);
  assert.equal(Object.keys(e).includes("woerter"), false);
});

test("wortDiff über zwei PDF-Stände zeigt, was sich in der Liste geändert hat", { skip: !hatPdftotext && "pdftotext fehlt" }, () => {
  const alt = Q.woerterPdf("application/pdf", miniPdf("AWS Google Twilio"));
  const neu = Q.woerterPdf("application/pdf", miniPdf("AWS Google OpenAI"));
  assert.deepEqual(Q.wortDiff(alt, neu), { weg: [["Twilio", 1]], dazu: [["OpenAI", 1]] });
});
