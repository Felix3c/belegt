# belegbar.eu

**Souveräne KI-Anbieter aus Europa. Jede Angabe mit Quelle und Prüfdatum.**

Eine Evidenz-Datenbank für EU-souveräne AI-Inference-Anbieter: Hosting-Standorte, Preise, AVV/DPA, Subprozessoren, Zertifikate und AI-Act-Nachweise — jede Angabe klassifiziert als `belegt` (Primärquelle verlinkt), `beansprucht` (Anbieterangabe ohne Dokument) oder `unbelegt` (nichts Belastbares gefunden).

## Struktur

```
data/anbieter/*.json   → ein Anbieter pro Datei (das eigentliche Produkt)
data/lastmod.json      → Inhalts-Ledger für die Sitemap (versioniert, nicht löschen)
data/faelle/*.json     → Fälle: dokumentierte Widersprüche zwischen Behauptung und Beleg
belege/faelle/<id>/    → Rohkopien der zitierten Seiten + SHA256SUMS (Beweismittel, nicht auf der Site)
guides/*.html          → Ratgeber-Artikel (META-Kopf + HTML-Fragment)
src/style.css          → Stylesheet
build.js               → Generator (ohne Abhängigkeiten)
linkcheck.js           → prüft alle Quellen-URLs auf verlorene Belege
docs/                  → generierte Site (GitHub-Pages-Quellordner)
outreach/              → Anschreiben-Vorlage für Anbieter
MESSUNG.md             → Messprotokoll für die Kill-Kriterien
```

## Bauen

```
node build.js
```

Liest `data/` und `guides/`, schreibt die komplette statische Site nach `docs/`. Kein npm install, keine Dependencies — Node ≥ 18 genügt.

### Der lastmod-Ledger

`data/lastmod.json` merkt sich je URL den Inhalts-Hash der zuletzt ausgelieferten Seite und das Datum, an dem dieser Hash neu war. Beim Build gilt: gleicher Hash → Datum bleibt, anderer Hash → Datum wird zum Baudatum. Dadurch steht in der Sitemap das Datum, an dem sich eine Seite **tatsächlich** geändert hat.

**Die Datei gehört ins Repository.** Fehlt sie, kennt der nächste Build keine Vorgeschichte und stempelt die ganze Site auf heute — Suchmaschinen sehen dann ein Massen-Update, das keines war.

Für reproduzierbare Builds lässt sich das Datum setzen: `BUILD_DATUM=2026-08-24 node build.js`.

## Fälle

Ein Fall (`data/faelle/<id>-<slug>.json`) dokumentiert, dass zwei öffentliche Aussagen eines Anbieters nicht zugleich wahr sein können. Pflichtfelder: `id`, `slug`, `anbieter` (= Anbieter-`id`), `titel`, `kurz`, `eroeffnet`, `status` (`offen|beantwortet|ausgeraeumt|bestaetigt`), `antwort_frist`, `behauptung[]`, `beleg[]` (je `zitat`, `quelle`, `abgerufen` als UTC-Zeitstempel, `sha256` der abgerufenen Seite, optional `archiv`), `widerspruch`, `verlauf[]`. Optional: `was_es_nicht_heisst`, `aufloesung[]`, `antworten[]` (`datum`, `text`, `von`).

**Der Anbieter erfährt es zuerst.** Solange `anbieter_informiert` leer ist, bricht der Build ab. Zum Prüfen vor dem Versand: `BUILD_VORSCHAU=1 node build.js` — die Ausgabe dann nicht committen. Regeln stehen auf der Methodik-Seite unter `#faelle`.

Ablauf je Fall: Seiten abrufen und hashen (`sha256sum`), bei web.archive.org/save/ archivieren, Rohkopien nach `belege/faelle/<id>/`, Fall-Datei schreiben, Anbieter anschreiben (Vorlage in `outreach/mails/`), `anbieter_informiert` setzen, bauen, pushen. Antworten wörtlich in `antworten[]` eintragen, Status fortschreiben, jeden Schritt im `verlauf[]` datieren. Ein Fall wird nie gelöscht.

## Quellen prüfen

```
node linkcheck.js            # optional: --json bericht.json
```

Ruft jede in `data/anbieter/*.json` hinterlegte Quellen-URL ab. Wichtig: Der Statuscode allein genügt nicht — eine gelöschte Dokumentseite antwortet oft mit `200`, weil der Server auf die Startseite weiterleitet. `linkcheck.js` bewertet deshalb das Weiterleitungsziel mit und meldet einen tief verlinkten Beleg, der auf einer Startseite landet, als **verlorenen Beleg**. Exit-Code ≠ 0 bei Befunden, damit der Check in CI laufen kann.

Findet er einen verlorenen Beleg: Status im Profil zurücksetzen (`belegt` → `unbelegt`), die tote URL in der `anmerkung` dokumentieren und ein Feld-`geprueft` setzen. Nicht einfach löschen — dass ein Beleg verschwunden ist, ist selbst eine Information.

## Daten pflegen

Eine Angabe ändern = JSON-Datei editieren, Prüfdatum aktualisieren, neu bauen. Statusregeln stehen auf der Methodik-Seite der Website. Eiserne Regel: **keine Quelle → Status niemals `belegt`**.

**Zwei Ebenen von Prüfdaten:**

- `geprueft` auf oberster Profilebene = Datum der letzten **vollständigen** Prüfung des Anbieters.
- `geprueft` **innerhalb eines einzelnen Feldes** (Vertragsfeld, Zertifikat, AI-Act-Eintrag, Modell) = Datum, an dem genau diese Angabe nachgeprüft wurde. Es hat Vorrang vor dem Profildatum.

Wer nur ein Feld nachprüft, setzt das Feld-Datum — nicht das Profil-Datum. Sonst behauptet das Profil, alle Angaben seien gleichzeitig geprüft worden.

**Zertifikate:** Der `typ` wird im Wortlaut des Anbieters erfasst und so auch angezeigt. Für Filter und Facettenseiten normalisiert `build.js` ihn zusätzlich (`ISO/IEC 27001:2022` → `iso-27001`); die Zuordnung steht in `ZERT_KANON`. Nennt ein Anbieter mehrere Normen in einem Feld (`SOC 1/2/3`), werden sie automatisch aufgeteilt. Nennt er ein Zertifikat nur in der `anmerkung`, wird es **nicht** gezählt — für die Facetten zählt allein ein eigener Eintrag.

## Veröffentlichen (GitHub Pages)

1. Repo auf GitHub anlegen (z. B. `belegt`), dieses Verzeichnis pushen.
2. Repo-Settings → Pages → Source: „Deploy from a branch“, Branch `main`, Ordner `/docs`.
3. Eigene Domain (belegbar.eu): in Pages-Settings als Custom Domain eintragen und beim Registrar einen CNAME auf `<username>.github.io` setzen; danach eine Datei `docs/CNAME` mit Inhalt `belegbar.eu` erzeugen lassen (in `build.js` ergänzen, damit sie den Build überlebt).

## Was die Site ausliefert

| Pfad | Inhalt |
|---|---|
| `/` | Anbietertabelle mit Filtern |
| `/anbieter/<id>/` | Profil je Anbieter (+ `daten.json` je Profil) |
| `/fragen/<slug>/` | Antwortseiten — die Antwort wird beim Build **aus den Daten berechnet** |
| `/zertifikate/<norm>/` | wer weist einen Standard nach, wer beruft sich nur darauf |
| `/vergleich/<a>-vs-<b>/` | Direktvergleiche innerhalb einer Kategorie |
| `/ratgeber/<slug>/` | redaktionelle Guides |
| `/daten.json` | alle Anbieter, mit normierten Zertifikaten und Rechtsraum |
| `/llms.txt`, `/llms-full.txt` | Wegweiser und Volltext für Sprachmodelle |

Die Antworttexte unter `/fragen/` sind bewusst **nicht** von Hand geschrieben, sondern gerechnet. Dadurch kann keine Antwort von der Datenbank abweichen, und Fehlstellen („bei 15 Anbietern keine belastbare Angabe gefunden") erscheinen von selbst, statt weggelassen zu werden.

## Vor dem Launch (offene Pflichten)

- [x] Impressum in `build.js` → `seiteUeber()` ausfüllen (§ 5 DDG) — erledigt 20.08.2026
- [x] Google Fonts lokal einbinden — erledigt 19.08.2026 (`src/fonts/`, `src/fonts.css`, SIL-OFL-Lizenz)
- [ ] E-Mail-Adresse `hallo@belegbar.eu` einrichten (oder in `build.js` → `SITE.kontakt` ändern)
- [x] Domain belegbar.eu registrieren — live seit 19./20.08.2026

## Lizenz

Daten: CC BY 4.0 (Namensnennung „belegbar.eu“). Code: MIT.
