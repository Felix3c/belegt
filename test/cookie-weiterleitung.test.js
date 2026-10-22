"use strict";
// ovhcloud.com (alle Hosts) antwortet seit 19.10.2026 erst mit 307 auf dieselbe Adresse und setzt dabei ein
// Cookie "cdn=…"; ohne Cookie wieder 307, Node-fetch folgt 50-mal und meldet "fetch failed" → 12 Quellen
// fälschlich "nicht-erreichbar". curl mit Cookie-Speicher bekommt beim zweiten Abruf 200.
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { pruefe } = require("../lib/quellen.js");

const URL_O = "https://www.ovhcloud.com/de/";
const antwort = (status, { url = URL_O, html = "", kopf = {} } = {}) => ({
  status, url, arrayBuffer: async () => Buffer.from(html),
  headers: {
    get: (n) => (n.toLowerCase() === "content-type" ? "text/html" : kopf[n.toLowerCase()] ?? null),
    getSetCookie: () => (kopf["set-cookie"] ? [kopf["set-cookie"]] : []),
  },
});
const cookieServer = () => {
  const aufrufe = [];
  const holen = async (u, o) => {
    aufrufe.push({ u, o });
    if (o.redirect === "follow") throw new TypeError("fetch failed"); // so endet die Schleife in Node
    const c = (o.headers && o.headers.cookie) || "";
    return c.includes("cdn=abc")
      ? antwort(200, { url: u, html: "<p>OVHcloud ISO 27001 SecNumCloud</p>" })
      : antwort(307, { url: u, kopf: { location: u, "set-cookie": "cdn=abc; HttpOnly; Path=/; Max-Age=1800" } });
  };
  return { holen, aufrufe };
};

test("Cookie-Weiterleitung: Seite wird mit gesetztem Cookie gelesen, nicht 'nicht-erreichbar'", async () => {
  const { holen } = cookieServer();
  const e = await pruefe({ url: URL_O }, { mitHash: true, holen });
  assert.equal(e.befund, "ok");
  assert.ok(e.woerter.includes("SecNumCloud"));
});

test("Cookie-Weiterleitung: gleicher Hash wie dieselbe Seite ohne Umweg", async () => {
  const { holen } = cookieServer();
  const direkt = async (u) => antwort(200, { url: u, html: "<p>OVHcloud ISO 27001 SecNumCloud</p>" });
  assert.equal((await pruefe({ url: URL_O }, { mitHash: true, holen })).hash, (await pruefe({ url: URL_O }, { mitHash: true, holen: direkt })).hash);
});

test("Endlose Weiterleitung ohne Cookie endet als 'nicht-erreichbar', nicht als leerer Inhalt", async () => {
  const holen = async (u) => antwort(307, { url: u, kopf: { location: u } });
  const e = await pruefe({ url: URL_O }, { mitHash: true, holen });
  assert.equal(e.befund, "nicht-erreichbar");
});

test("Weiterleitung auf andere Seite: Ziel wird gemeldet, Startseiten-Regel greift weiter", async () => {
  const holen = async (u) => (u === "https://beispiel.de/alt" ? antwort(301, { url: u, kopf: { location: "/" } }) : antwort(200, { url: u, html: "<p>Start</p>" }));
  const e = await pruefe({ url: "https://beispiel.de/alt" }, { mitHash: true, holen });
  assert.equal(e.befund, "beleg-verloren");
});

test("Cookies gehen nicht an einen fremden Host", async () => {
  const gesehen = [];
  const holen = async (u, o) => {
    gesehen.push([new URL(u).host, (o.headers && o.headers.cookie) || ""]);
    return u.startsWith("https://a.example/")
      ? antwort(302, { url: u, kopf: { location: "https://b.example/x", "set-cookie": "geheim=1" } })
      : antwort(200, { url: u, html: "<p>B</p>" });
  };
  await pruefe({ url: "https://a.example/y" }, { mitHash: true, holen });
  assert.deepEqual(gesehen.find(([h]) => h === "b.example"), ["b.example", ""]);
});
