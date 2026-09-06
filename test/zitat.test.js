"use strict";
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { zitatProfil, zitatFall } = require("../lib/zitat.js");

const base = "https://belegbar.eu";

test("zitatProfil: Name, Stand, Permalink, Lizenz", () => {
  const p = { id: "mistral", name: "Mistral AI" };
  assert.equal(
    zitatProfil(p, "2026-09-06", base),
    "„Mistral AI — Beleg-Check“, belegbar.eu, Stand 06.09.2026, https://belegbar.eu/anbieter/mistral/, Lizenz CC BY 4.0"
  );
});

test("zitatFall: Fall-Nummer, Titel, Status, Stand, Permalink, Lizenz", () => {
  const f = { id: "2026-001", slug: "requesty-zero-data-retention", titel: "Requesty: „never stored“", status: "beantwortet" };
  assert.equal(
    zitatFall(f, "2026-09-06", base, "beantwortet"),
    "„Fall 2026-001 — Requesty: „never stored““, belegbar.eu, Status beantwortet, Stand 06.09.2026, https://belegbar.eu/faelle/requesty-zero-data-retention/, Lizenz CC BY 4.0"
  );
});

test("zitatFall: Status-Label wird übergeben, nicht der Schlüssel", () => {
  const f = { id: "2026-002", slug: "greenpt-iso-27001", titel: "GreenPT", status: "bestaetigt" };
  assert.match(zitatFall(f, "2026-09-06", base, "bestätigt"), /Status bestätigt,/);
});

test("Datum ohne Stand fällt nicht um", () => {
  assert.match(zitatProfil({ id: "x", name: "X" }, null, base), /Stand unbekannt/);
});
