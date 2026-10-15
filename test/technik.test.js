"use strict";
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { PFADE, zaehleSitemapUrls, bewerteTechnik } = require("../lib/technik.js");

test("PFADE: die zwölf Pfade der Kill-Check-Messung (03./08./10.10.)", () => {
  assert.equal(PFADE.length, 12);
  for (const p of ["/", "/llms.txt", "/sitemap.xml", "/fuer-kaeufer/", "/faelle/", "/methodik/"]) assert.ok(PFADE.includes(p), p);
  assert.equal(new Set(PFADE).size, 12);
});

test("zaehleSitemapUrls: zählt <loc>-Einträge, leer bei leerem Text", () => {
  const xml = "<urlset><url><loc>https://belegbar.eu/</loc></url>\n<url><loc>https://belegbar.eu/faelle/</loc></url></urlset>";
  assert.equal(zaehleSitemapUrls(xml), 2);
  assert.equal(zaehleSitemapUrls(""), 0);
});

test("bewerteTechnik: alles 200 und Sitemap gleich → ok, Zeile für MESSUNG.md", () => {
  const status = Object.fromEntries(PFADE.map((p) => [p, 200]));
  const b = bewerteTechnik(status, 65, 65);
  assert.equal(b.ok, true);
  assert.deepEqual(b.fehler, []);
  assert.match(b.zeile, /12\/12 = 200/);
  assert.match(b.zeile, /Sitemap live 65 = Build 65/);
});

test("bewerteTechnik: ein Pfad nicht 200 → nicht ok, Pfad mit Status genannt", () => {
  const status = Object.fromEntries(PFADE.map((p) => [p, 200]));
  status["/faelle/"] = 404;
  const b = bewerteTechnik(status, 65, 65);
  assert.equal(b.ok, false);
  assert.deepEqual(b.fehler, ["/faelle/ 404"]);
  assert.match(b.zeile, /11\/12 = 200/);
});

test("bewerteTechnik: Netzfehler (Status fehlt) zählt als Fehler", () => {
  const status = Object.fromEntries(PFADE.map((p) => [p, 200]));
  delete status["/llms.txt"];
  const b = bewerteTechnik(status, 65, 65);
  assert.equal(b.ok, false);
  assert.deepEqual(b.fehler, ["/llms.txt kein Abruf"]);
});

test("bewerteTechnik: Sitemap live ≠ Build ist kein Fehler, aber benannt (Push ausstehend)", () => {
  const status = Object.fromEntries(PFADE.map((p) => [p, 200]));
  const b = bewerteTechnik(status, 65, 66);
  assert.equal(b.ok, true);
  assert.match(b.zeile, /Sitemap live 65, Build 66 \(Unterschied 1, Push ausstehend\?\)/);
});
