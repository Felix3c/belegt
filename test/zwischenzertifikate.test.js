"use strict";
const { test } = require("node:test");
const assert = require("node:assert/strict");
const path = require("path");
const { zwischenEnv, ZWISCHEN_DATEI } = require("../lib/quellen.js");

test("zwischenEnv: setzt NODE_EXTRA_CA_CERTS auf die mitgelieferte Datei, wenn sie fehlt", () => {
  const env = zwischenEnv({ PATH: "x" }, () => true);
  assert.equal(env.NODE_EXTRA_CA_CERTS, ZWISCHEN_DATEI);
  assert.equal(env.PATH, "x");
});

test("zwischenEnv: null, wenn die Variable schon gesetzt ist (kein zweiter Neustart)", () => {
  assert.equal(zwischenEnv({ NODE_EXTRA_CA_CERTS: "/irgendwo.pem" }, () => true), null);
});

test("zwischenEnv: null, wenn die Zertifikatsdatei fehlt", () => {
  assert.equal(zwischenEnv({}, () => false), null);
});

test("ZWISCHEN_DATEI liegt im Repo und enthält das Sectigo-Zwischenzertifikat für dpa.gov.al", () => {
  const fs = require("fs");
  assert.equal(path.basename(path.dirname(ZWISCHEN_DATEI)), "certs");
  const pem = fs.readFileSync(ZWISCHEN_DATEI, "utf8");
  assert.match(pem, /-----BEGIN CERTIFICATE-----/);
  const { X509Certificate } = require("crypto");
  const c = new X509Certificate(pem);
  assert.match(c.subject, /Sectigo Public Server Authentication CA DV R36/);
});
