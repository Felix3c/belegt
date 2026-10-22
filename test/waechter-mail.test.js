"use strict";
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { pruefeMail, nenntQuellen, fuehreMailLedger, mailBerichtZeilen, mailDateiName } = require("../waechter-mail.js");

const QUELLEN = [
  { anbieter: "openai", art: "avv", url: "https://openai.com/policies/data-processing-addendum/" },
  { anbieter: "openai", art: "unterauftragnehmer", url: "https://openai.com/policies/sub-processor-list/" },
  { anbieter: "google", art: "avv-cloud", url: "https://cloud.google.com/terms/data-processing-addendum" },
];
const mail = (x = {}) => ({
  id: "1a15aaaa00000001", von: "OpenAI <noreply@email.openai.com>", an: ["hallo@belegbar.eu"],
  datum: "2026-10-22T09:00:00Z", betreff: "Sub-processor list update", text: "We updated https://openai.com/policies/sub-processor-list/.", ...x,
});

test("pruefeMail: OpenAI an hallo@ wird angenommen, Subdomain des Absenders zählt", () => {
  assert.equal(pruefeMail(mail()).anbieter, "openai");
  assert.equal(pruefeMail(mail({ von: "privacy@openai.com", an: ["Hallo@Belegbar.eu"] })).anbieter, "openai");
});

test("pruefeMail: fremder oder nachgemachter Absender, falsches Ziel und fehlende Felder brechen ab", () => {
  assert.throws(() => pruefeMail(mail({ von: "noreply@openai.com.evil.example" })), /Absender/);
  assert.throws(() => pruefeMail(mail({ von: "noreply@notopenai.com" })), /Absender/);
  assert.throws(() => pruefeMail(mail({ an: ["felix.h.lind@gmail.com"] })), /hallo@belegbar.eu/);
  assert.throws(() => pruefeMail(mail({ id: "" })), /id/);
  assert.throws(() => pruefeMail(mail({ text: undefined })), /text/);
  assert.throws(() => pruefeMail(mail({ id: "../x" })), /id/);
});

test("nenntQuellen: Links auf beobachtete Seiten werden erkannt, auch ohne Schrägstrich und mit Satzzeichen", () => {
  const t = "See https://openai.com/policies/sub-processor-list. Also (https://openai.com/policies/data-processing-addendum/?utm=x) and https://openai.com/policies/new-page/";
  const r = nenntQuellen(t, QUELLEN, "openai");
  assert.deepEqual(r.beobachtet.map((q) => q.art).sort(), ["avv", "unterauftragnehmer"]);
  assert.deepEqual(r.fremd, ["https://openai.com/policies/new-page/"]);
});

test("nenntQuellen: Links anderer Anbieter und Abmelde-Links zählen nicht als neue Seite", () => {
  const r = nenntQuellen("https://cloud.google.com/terms/data-processing-addendum https://email.openai.com/unsubscribe?x=1 https://example.com/a", QUELLEN, "openai");
  assert.deepEqual(r.beobachtet, []);
  assert.deepEqual(r.fremd, []);
});

test("fuehreMailLedger: neue Mail wird eingetragen, dieselbe ID nicht doppelt, Eingabe bleibt unverändert", () => {
  const alt = {};
  const r1 = fuehreMailLedger(alt, mail(), "2026-10-22", "abc123");
  assert.equal(r1.neu, true);
  assert.deepEqual(alt, {});
  assert.equal(r1.ledger["1a15aaaa00000001"].sha256, "abc123");
  assert.equal(r1.ledger["1a15aaaa00000001"].eingang, "2026-10-22");
  const r2 = fuehreMailLedger(r1.ledger, mail(), "2026-10-23", "abc123");
  assert.equal(r2.neu, false);
  assert.equal(r2.ledger["1a15aaaa00000001"].eingang, "2026-10-22");
});

test("mailDateiName: Anbieter und Gmail-ID", () => {
  assert.equal(mailDateiName("openai", "1a15aaaa00000001"), "openai-1a15aaaa00000001.txt");
});

test("mailBerichtZeilen: beobachtete Seite führt zu Wächter-Lauf und Wayback, schon bekannt nur eine Zeile", () => {
  const z = mailBerichtZeilen({ neu: true, mail: mail(), anbieter: "openai", beobachtet: [QUELLEN[1]], fremd: ["https://openai.com/policies/new-page/"] }).join("\n");
  assert.match(z, /NEU: openai .*Sub-processor list update/);
  assert.match(z, /NENNT: unterauftragnehmer https:\/\/openai.com\/policies\/sub-processor-list\//);
  assert.match(z, /node waechter.js/);
  assert.match(z, /web.archive.org\/save\/https:\/\/openai.com\/policies\/sub-processor-list\//);
  assert.match(z, /UNBEOBACHTET: https:\/\/openai.com\/policies\/new-page\//);
  const alt = mailBerichtZeilen({ neu: false, mail: mail(), anbieter: "openai", beobachtet: [], fremd: [] }).join("\n");
  assert.match(alt, /SCHON BEKANNT: 1a15aaaa00000001/);
  assert.doesNotMatch(alt, /waechter.js/);
});
