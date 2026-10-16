"use strict";
// Kein Skript darf "heute" aus toISOString() nehmen: das ist UTC, und ein Lauf zwischen 00:00 und
// 02:00 MESZ schreibt sonst den Vortag (passiert 16.10.2026 mit quellenlauf.js, 21 Profile zurückgesetzt).
// Richtig ist heuteLokal() aus lib/quellen.js.
const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const path = require("path");

const WURZEL = path.join(__dirname, "..");
const UTC_HEUTE = /new Date\(\)\.toISOString\(\)\.slice\(0,\s*10\)/;

function jsDateien() {
  const oben = fs.readdirSync(WURZEL).filter((f) => f.endsWith(".js")).map((f) => path.join(WURZEL, f));
  const lib = fs.readdirSync(path.join(WURZEL, "lib")).filter((f) => f.endsWith(".js")).map((f) => path.join(WURZEL, "lib", f));
  return [...oben, ...lib];
}

test("kein Skript nimmt das heutige Datum aus UTC", () => {
  const treffer = jsDateien().filter((f) => UTC_HEUTE.test(fs.readFileSync(f, "utf8"))).map((f) => path.relative(WURZEL, f));
  assert.deepStrictEqual(treffer, []);
});

test("heuteLokal nimmt den Ortstag, auch kurz nach Mitternacht", () => {
  const { heuteLokal } = require("../lib/quellen.js");
  const kurzNachMitternacht = new Date(2026, 9, 16, 0, 30); // Ortszeit 16.10. 00:30
  assert.strictEqual(heuteLokal(kurzNachMitternacht), "2026-10-16");
});
