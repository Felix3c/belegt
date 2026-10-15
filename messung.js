#!/usr/bin/env node
/**
 * belegbar.eu — Technik-Teil der Kill-Check-Messung (MESSUNG.md).
 * Aufruf: node messung.js   → eine Zeile zum Einfügen in MESSUNG.md, Exit 1 wenn ein Pfad nicht 200 liefert.
 * Logik in lib/technik.js. Linkcheck (node linkcheck.js) und Websuche bleiben eigene Schritte.
 */
"use strict";

const fs = require("fs");
const path = require("path");
const T = require("./lib/technik.js");

const BASIS = "https://belegbar.eu";

async function abruf(pfad) {
  try {
    const r = await fetch(BASIS + pfad, { redirect: "follow", headers: { "user-agent": "belegbar-messung/1" } });
    return { status: r.status, text: pfad === "/sitemap.xml" ? await r.text() : "" };
  } catch (e) {
    process.stderr.write(pfad + ": " + e.message + "\n");
    return { status: 0, text: "" };
  }
}

(async () => {
  const status = {};
  let sitemapLive = 0;
  for (const p of T.PFADE) {
    const r = await abruf(p);
    if (r.status) status[p] = r.status;
    if (p === "/sitemap.xml") sitemapLive = T.zaehleSitemapUrls(r.text);
  }
  const sitemapBuild = T.zaehleSitemapUrls(fs.readFileSync(path.join(__dirname, "docs", "sitemap.xml"), "utf8"));
  const b = T.bewerteTechnik(status, sitemapLive, sitemapBuild);
  console.log(new Date().toISOString().slice(0, 10) + " " + b.zeile);
  if (!b.ok) process.exit(1);
})();
