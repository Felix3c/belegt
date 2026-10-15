"use strict";
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { leseGuideText } = require("../lib/guides.js");

const LF = '<!--META {"slug":"x","titel":"T"} -->\n<h1>Titel</h1>\n<p>Satz</p>\n';

test("leseGuideText: META-Kopf wird gelesen, HTML ohne Kopf und getrimmt", () => {
  const g = leseGuideText(LF, "x.html");
  assert.equal(g.slug, "x");
  assert.equal(g.titel, "T");
  assert.equal(g.html, "<h1>Titel</h1>\n<p>Satz</p>");
});

test("leseGuideText: CRLF-Checkout (Windows, core.autocrlf) ergibt byte-gleiches HTML wie LF", () => {
  const crlf = LF.replace(/\n/g, "\r\n");
  assert.deepEqual(leseGuideText(crlf, "x.html"), leseGuideText(LF, "x.html"));
  assert.equal(leseGuideText(crlf, "x.html").html.includes("\r"), false);
});

test("leseGuideText: einzelnes CR (altes Mac-Format) wird ebenfalls zu LF", () => {
  const cr = LF.replace(/\n/g, "\r");
  assert.equal(leseGuideText(cr, "x.html").html, "<h1>Titel</h1>\n<p>Satz</p>");
});

test("leseGuideText: ohne META-Kopf bricht der Build mit Dateinamen ab", () => {
  assert.throws(() => leseGuideText("<h1>x</h1>", "ohne.html"), /Guide ohne META-Kopf: ohne\.html/);
});

const { standText } = require("../lib/guides.js");

test("standText: ohne stand im META-Kopf bleibt der alte Stand August 2026", () => {
  assert.equal(standText(leseGuideText(LF, "x.html")), "Stand: August 2026");
});

test("standText: stand im META-Kopf wird als geprüftes Datum gezeigt", () => {
  const g = leseGuideText('<!--META {"slug":"x","titel":"T","stand":"15.10.2026"} -->\n<p>a</p>', "x.html");
  assert.equal(standText(g), "Stand: 15.10.2026 (Rechtsstand geprüft)");
});

test("standText: stand muss TT.MM.JJJJ sein", () => {
  const g = leseGuideText('<!--META {"slug":"x","titel":"T","stand":"Oktober"} -->\n<p>a</p>', "x.html");
  assert.throws(() => standText(g), /stand.*TT\.MM\.JJJJ/);
});
