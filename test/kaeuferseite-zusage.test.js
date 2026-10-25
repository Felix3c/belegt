"use strict";
// Frage 452 (Felix 22.10.2026): Die Käuferseite darf nicht mehr versprechen, als das Dossier hat.
// In den 21 Dossiers vom 19.10. tragen 13 von 314 Angaben eine Archivkopie und 13 einen vollen SHA-256.
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const quelle = fs.readFileSync(path.join(__dirname, "..", "build.js"), "utf8");
const zusage = quelle.split("\n").find((z) => z.includes("<strong>Was Sie bekommen"));

test("Käuferseite: Zusage-Absatz ist da", () => {
  assert.ok(zusage, "Absatz „Was Sie bekommen“ fehlt in build.js");
});

test("Käuferseite verspricht Archivkopie nur „wo vorhanden“", () => {
  assert.doesNotMatch(zusage, /SHA-256 der Quelle und Archivkopie/);
  assert.match(zusage, /Prüfsumme des gelesenen Texts und, wo vorhanden, Archivkopie/);
});

test("Käuferseite sagt, dass bei Bestellung jede Quelle gesichert wird", () => {
  assert.match(zusage, /bei Bestellung sichern wir jede Quelle des Dossiers/);
});
