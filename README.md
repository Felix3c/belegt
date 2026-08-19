# belegbar.eu

**Souveräne KI-Anbieter aus Europa. Jede Angabe mit Quelle und Prüfdatum.**

Eine Evidenz-Datenbank für EU-souveräne AI-Inference-Anbieter: Hosting-Standorte, Preise, AVV/DPA, Subprozessoren, Zertifikate und AI-Act-Nachweise — jede Angabe klassifiziert als `belegt` (Primärquelle verlinkt), `beansprucht` (Anbieterangabe ohne Dokument) oder `unbelegt` (nichts Belastbares gefunden).

## Struktur

```
data/anbieter/*.json   → ein Anbieter pro Datei (das eigentliche Produkt)
guides/*.html          → Ratgeber-Artikel (META-Kopf + HTML-Fragment)
src/style.css          → Stylesheet
build.js               → Generator (ohne Abhängigkeiten)
docs/                  → generierte Site (GitHub-Pages-Quellordner)
outreach/              → Anschreiben-Vorlage für Anbieter
```

## Bauen

```
node build.js
```

Liest `data/` und `guides/`, schreibt die komplette statische Site nach `docs/`. Kein npm install, keine Dependencies — Node ≥ 18 genügt.

## Daten pflegen

Eine Angabe ändern = JSON-Datei editieren, `geprueft`-Datum aktualisieren, neu bauen. Statusregeln stehen auf der Methodik-Seite der Website. Eiserne Regel: **keine Quelle → Status niemals `belegt`**.

## Veröffentlichen (GitHub Pages)

1. Repo auf GitHub anlegen (z. B. `belegt`), dieses Verzeichnis pushen.
2. Repo-Settings → Pages → Source: „Deploy from a branch“, Branch `main`, Ordner `/docs`.
3. Eigene Domain (belegbar.eu): in Pages-Settings als Custom Domain eintragen und beim Registrar einen CNAME auf `<username>.github.io` setzen; danach eine Datei `docs/CNAME` mit Inhalt `belegbar.eu` erzeugen lassen (in `build.js` ergänzen, damit sie den Build überlebt).

## Vor dem Launch (offene Pflichten)

- [ ] Impressum in `build.js` → `seiteUeber()` ausfüllen (§ 5 DDG)
- [x] Google Fonts lokal einbinden — erledigt 19.08.2026 (`src/fonts/`, `src/fonts.css`, SIL-OFL-Lizenz)
- [ ] E-Mail-Adresse `hallo@belegbar.eu` einrichten (oder in `build.js` → `SITE.kontakt` ändern)
- [ ] Domain belegbar.eu registrieren

## Lizenz

Daten: CC BY 4.0 (Namensnennung „belegbar.eu“). Code: MIT.
