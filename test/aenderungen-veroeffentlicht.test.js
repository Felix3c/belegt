"use strict";
// 25.10.2026: Das Änderungsprotokoll nannte zu jedem Eintrag Commit-Kurz-ID und Betreff, auch für lokale
// Commits. push-sauber.sh fasst lokale Commits beim Hochladen zu einem zusammen; online zeigten danach
// Einträge auf Commits, die es auf GitHub nie gab (3 am 25.10.), und Betreffe mit Namen von Gesprächspartnern
// wären mitgegangen. Regel: Commit-Angabe nur für Commits, die schon in origin/main stehen. Gibt es kein
// origin/main (Wegwerf-Klon ohne Remote), bleibt alles wie bisher.
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { execFileSync } = require("node:child_process");
const { ausGit } = require("../lib/aenderungen.js");

function profil(status) {
  return {
    id: "x", name: "X",
    vertrag: { avv: { wert: null, status, quelle: "https://x.example/avv.pdf", anmerkung: "Stand " + status + "." } },
    zertifikate: [], ai_act: [], modelle: [], geprueft: "2026-10-20",
  };
}

function repoMitZweiCommits() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "aend-pub-"));
  const g = (...a) => execFileSync("git", a, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  g("init", "-q");
  g("config", "user.email", "t@example.org"); g("config", "user.name", "Test");
  fs.mkdirSync(path.join(root, "data", "anbieter"), { recursive: true });
  const datei = path.join(root, "data", "anbieter", "x.json");
  fs.writeFileSync(datei, JSON.stringify(profil("belegt")));
  g("add", "."); g("commit", "-q", "-m", "data: X angelegt", "--date", "2026-10-20T10:00:00");
  const erster = g("rev-parse", "HEAD");
  fs.writeFileSync(datei, JSON.stringify(profil("unbelegt")));
  g("commit", "-q", "-am", "data: X AVV weg (Hinweis Prüferin Musterfrau)", "--date", "2026-10-21T10:00:00");
  return { root, g, erster };
}

test("ausGit: Commit noch nicht in origin/main → Eintrag ohne Commit-Angabe", () => {
  const { root, g, erster } = repoMitZweiCommits();
  g("update-ref", "refs/remotes/origin/main", erster);
  const e = ausGit(root, "2026-10-25");
  const anlage = e.find((x) => x.typ === "anbieter");
  const wechsel = e.find((x) => x.typ === "status" && x.pfad === "vertrag.avv");
  assert.ok(anlage && wechsel, "Einträge fehlen");
  assert.equal(anlage.commit.sha, erster.slice(0, 7));
  assert.equal(wechsel.commit, null);
  assert.ok(!JSON.stringify(e).includes("Musterfrau"), "Betreff eines lokalen Commits steht im Protokoll");
});

test("ausGit: ohne origin/main behalten alle Einträge ihre Commit-Angabe", () => {
  const { root } = repoMitZweiCommits();
  const e = ausGit(root, "2026-10-25");
  assert.ok(e.length >= 2);
  for (const x of e) assert.ok(x.commit && x.commit.sha, "Commit-Angabe fehlt");
});
