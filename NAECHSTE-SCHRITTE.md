# belegbar.eu — Nächste Schritte

**Stand:** 2026-09-06, mittags (Postfach leer, beide Fälle unverändert; Plan-Punkte 4, 5, 6 gebaut; erster Widerspruchs-Scan über 19 Anbieter läuft)
**Führendes Dokument:** `MESSUNG.md` (Kill-Kriterien) · Ziel-Satz in `~/THESE.md` („Das Ziel ist der Stempel, nicht das Urteil“)
**Phase:** live, 21 Anbieter, 56 URLs in der Sitemap (seit 06.09.; vorher 124), 2 Fälle. Beide laufen auf ein Ende zu: Requesty auf die Frist 08.09., GreenPT auf die Footer-Korrektur.

## Wo wir stehen

- **Fall 2026-001 Requesty / ZDR — Status `beantwortet`.** 06.09. (11:05 UTC): keine Antwort auf Felix’ persönliche Mail vom 04.09. DPA-Seite byte-identisch zum 04.09. (SHA-256 `6c3cab7a…`), „request and response bodies are never stored“ steht weiter ohne Vorbehalt. Snapshot `web.archive.org/web/20260906110722`. Verlauf fortgeschrieben. **Am 08.09. nach Fristablauf auf `bestaetigt`** setzen, Anmerkung „Security-Seite korrigiert, DPA-Seite unverändert“ — sofern die DPA-Zeile bis dahin nicht qualifiziert ist. Kein weiteres Nachfassen.
- **Fall 2026-002 GreenPT / ISO 27001 — Status `bestaetigt`.** 06.09.: keine Mail von Robert mit der Footer-URL; Footer unverändert „Verified by independent audit … ISO 27001“ (SHA-256 `0d1350b4…`, Snapshot `…20260906110759`). Wechsel auf `ausgeraeumt`, sobald der korrigierte Footer live ist. Frist 11.09. ohne Bedeutung.
- **Postfach 06.09. geprüft** (Gmail, hallo@): Requesty nichts, GreenPT nichts, Regolo nichts, Gossen nichts, keine eingehende Anfrage. LinkedIn: **Anke Köhler-Heite hat am 04.09. angenommen** (Welle 1, Kandidat 4) und eine weitere, noch nicht angesehene Einladung liegt vor.
- **Plan Punkt 4 gebaut (06.09., Commit 7480547):** vierte Preisstufe „kein öffentlicher Preis“ (`preis_status`), Einheitenpreise (`preis_einheit` + `preis_ab_eur`, z. B. Exoscale ab 1,34 €/GPU-Stunde aus der Preis-API), `0` = kostenlos (Hetzner), Abrufdatum („Stand“) je Preis in der Modelltabelle, Methodik-Abschnitt „Preise: eine vierte Stufe“, `lib/preise.js` mit 10 Tests, `preisarchiv.js` legt Archivkopien nach `belege/preise/<anbieter>/` (erster Lauf: Exoscale inkl. API-JSON). Gesetzt nur, wo die Anmerkung es schon belegte: Aleph Alpha (3), Exoscale Managed Inference, Gcore Whisper, Requesty Claude Bedrock, DeepL Enterprise. **Abweichung vom Plan:** Hetzner hat keinen GPU-Stundenpreis bekommen — das erfasste Modell ist die kostenlose experimentelle Inference-API, GPU-Server sind nicht als Modelle erfasst. **Bewusste Lücke:** ein Wechsel der Preisstufe erscheint nicht im Änderungsprotokoll (das zählt nur `status`/`quelle`).
- **Plan Punkt 5 gebaut (06.09., Commit 44b9b50):** Checkbox „nur AVV, Subprozessoren und Trainings-Opt-out belegt“ auf der Übersicht, trifft 9 von 21 (EUrouter, GreenPT, IONOS, Mistral, Nebius, Opper, OVHcloud, Scaleway, T-Systems). Zeigt, sortiert nicht.
- **Plan Punkt 6 gebaut (06.09., Commit 44b9b50):** 68 von 76 Vergleichsseiten tragen `noindex,follow` und fehlen in der Sitemap. Indexiert bleiben acht Paare (`VERGLEICH_INDEXIERT` in `build.js`): ionos-vs-t-systems, ionos-vs-stackit, stackit-vs-t-systems, ionos-vs-ovhcloud, ovhcloud-vs-scaleway, aleph-alpha-vs-mistral, exoscale-vs-hetzner, eurouter-vs-opper-ai. **Claudes Auswahl, nicht Felix’ — Zeile im Build ändern, wenn andere Paare besser passen.** Search Console wird in den nächsten Wochen „durch noindex ausgeschlossen“ für 68 URLs melden; das ist gewollt.
- **Regel seit 04.09. (Felix):** Vor jeder Arbeit an belegt zuerst beide Postfächer.
- **Build-Eigenheiten:** `build.js` hat CRLF-Zeilenenden (Patch-Scripts müssen das beachten); Fall-JSON 001 CRLF, 002 LF. JSONs nie per `JSON.parse`→`stringify` zurückschreiben, sondern zeilenweise per String-Ersatz. Roh-SHA-256 der Seiten ändern sich meist bei jedem Abruf — „unverändert“ heißt zitierter Wortlaut plus Wayback-Snapshot (Requesty-DPA war am 06.09. ausnahmsweise byte-identisch). Tests einzeln: `node --test test/preise.test.js test/quellen.test.js test/aenderungen.test.js` (10/15/13 grün am 06.09.). Der Ledger zählt „Seiten mit Änderungsdatum heute“ kumulativ über alle Builds des Tages.
- Git: sauber, alles gepusht (HEAD `44b9b50`).

## Entwicklungslinie über den Kill-Check hinaus (Vorschlag 06.09., nach Felix: „kann nicht sein, dass es schon am Zenit ist“)

Gegen `~/THESE.md` geprüft (Wer ist gebunden? Was kostet es ihn? Wer braucht das heute? Nachprüfbarer oder bequemer?). Das Produkt sind die Fälle, nicht die Tabelle. Drei Stücke, in dieser Reihenfolge:

1. **Fall-Pipeline (gestartet 06.09.).** Monatlicher Widerspruchs-Scan über alle Anbieter ohne laufenden Fall: Marketing-Aussage gegen eigenes Dokument (Badge vs. Inhaberschaft, „never stored“ vs. Logging-Default, „EU only“ vs. eigene Subprozessorenliste, „kein Training“ vs. AGB). Ergebnis: `outreach/fall-kandidaten.md` mit wörtlichen Zitaten, URLs, Abrufzeiten und Konfidenz. Felix wählt, Claude bereitet den Fall vor (Rohkopien, Hashes, Wayback, Fall-JSON, Mail-Entwurf), Felix schickt. Ziel: **zwei neue Fälle eröffnet bis Ende September**, damit zum Kill-Check nicht nur zwei abgeschlossene, sondern auch laufende Fälle da sind. Bindet: den Anbieter an seine Aussage. Kostet ihn: die öffentliche Dokumentation. Erster Lauf läuft heute (fünf Agenten, 19 Anbieter) — Ergebnis siehe unten.
2. **Anbieter-Eingang (nicht gebaut, wartet auf Felix).** Kriterium 1 („ein Anbieter meldet sich von selbst“) hat heute keinen Weg: Es gibt keine Seite, die einem Anbieter sagt, was er tun kann. Vorschlag: Seite `/anbieter/nachreichen/` („Für Anbieter“): *Sie finden eine Angabe als „beansprucht“ oder „unbelegt“? Schicken Sie die Primärquelle an hallo@ — wir prüfen binnen sieben Tagen, tragen sie mit Datum ein, und die Änderung steht im Änderungsprotokoll. Sind alle vier Vertragsfelder mit Dokumenten belegt, trägt das Profil den Stempel „Verified“.* Der `verified`-Stempel existiert im Build bereits (`verifiedStempel()`), ist aber bei keinem Anbieter gesetzt und auf der Methodik-Seite nicht erklärt. Regel aus der Methodik gilt weiter: keine Gegenleistung, kein Logo, keine Reihenfolge-Änderung. Das ist der Notar-Stempel aus THESE.md in seiner kleinsten Form: Der Anbieter bindet sich an eingereichte, datierte, gehashte Dokumente. Aufwand: ein Abend (Seite, Methodik-Absatz „Verified“, Mail-Vorlage für die Antwort).
3. **Zitier-Box (nicht gebaut).** Kriterium 3 („ein Fremder zitiert“) wird leichter, wenn jede Fall- und Profilseite einen Zitiervorschlag mit Permalink, Stand, Hash und Wayback-Link trägt, plus `daten.json` je Fall. Aufwand: ein Abend. Nach 2.

Weiter verschoben bis nach den Gesprächen: Dossier-Generator, MCP/API, Englisch, neue Anbieter. Gestrichen bleibt der Shortlist-Wizard.

## Widerspruchs-Scan 06.09. — Ergebnis

Fünf Agenten, 19 Anbieter, Abrufe 11:23 bis 11:54 UTC, alles in `outreach/fall-kandidaten.md` (Rangliste, wörtliche Zitate, URLs, Abrufzeiten, „Was es nicht heißt“ je Kandidat). **28 Kandidaten, davon 7 mit hoher Konfidenz**, 2 Anbieter ohne Befund (Aleph Alpha, Nordference). Die sieben starken: Black Forest Labs („Zero data retention“ vs. Speicher- und Trainingslizenz in ToS, Privacy Policy und EU-API-Terms), Scaleway („no access to, nor knowledge of any inputs and outputs“ vs. „temporarily store and access the full content of HTTP requests“ auf derselben Seite), T-Systems („never saved“ vs. Cache-Default in der verbindlichen Leistungsbeschreibung), Nebius („not used to train any models in either mode“ vs. ToS „training smaller Models“), Regolo („no records of any kind“ vs. Logs in Privacy Policy und Blog), IONOS (Docs bewerben Hochrisiko-Nutzung, KI-AGB verbieten sie), Exoscale (RZ-Mindestanforderung ISO 27001:2022 vs. eigene Tabelle mit 27001:2013). Fünf davon sind das Requesty-Muster: absolute Retention-Aussage gegen eigenes Kleingedrucktes.

**Claudes Empfehlung für die zwei Fälle bis Ende September:** Fall A Black Forest Labs, Fall B Scaleway; Reserve T-Systems (größte Wirkung für Kommunen und DSBs, aber angreifbar, weil Telekom „Prefix-Cache ist keine Speicherung“ einwenden wird). Nicht als erste Fälle: IONOS (kein Datenschutzbezug) und Exoscale (vermutlich veraltete Tabelle, Hinweis-Mail reicht). Nicht prüfbar ohne Browser: Trust Center von Mistral, Lyceum, BFL und Gcores Legal-Tabs — dort können weitere Kandidaten liegen. Alle Zitate stammen aus Agenten-Abrufen; vor einer Eröffnung neu abrufen, hashen, Wayback, Rohkopien (README-Ablauf).

## Nächster konkreter Schritt

**08.09. (Montag):** Postfach. Dann Requesty-DPA und GreenPT-Footer abrufen. Requesty nach Fristablauf auf `bestaetigt` (Anmerkung „Security-Seite korrigiert, DPA-Seite unverändert“), Rohkopie, Hash, Wayback, Verlauf, bauen, testen, pushen. Falls GreenPT-Footer korrigiert: `ausgeraeumt`. Danach aus `outreach/fall-kandidaten.md` den stärksten Kandidaten mit Felix auswählen und den Fall vorbereiten.

## Wartet auf Felix

- **Gespräche, Welle 1 (Plan Punkt 3):** LinkedIn-Nachricht an Gossen, C. Arndt, Groß mit dem Text aus `outreach/gespraeche/leitfaden.md`; Köhler-Heite hat angenommen, also gleich mit dazu (dann sind es vier, Hansen-Oest zwei Tage später). Nicht mehr als drei am Tag.
- **Entwicklungslinie:** Punkt 2 (Anbieter-Eingang) freigeben oder verwerfen; Punkt 6 (acht Paare) gegenlesen.
- **Requesty-Status am 08.09.:** `bestaetigt` — folgt der GreenPT-Logik, von Felix noch nicht ausdrücklich bestätigt.
- **Köhl:** „Connect“-Klick auf https://www.linkedin.com/in/stefanie-k%C3%B6hl-8159a1179/ (ohne Notiz) — oder endgültig streichen (`outreach/mails/06`).
- **LinkedIn:** eine neue, unbekannte Einladung vom 04.09. ansehen.
- Optional: Kommentar bei Lara Gsell.

## Blocker

Keiner.

## Termine

- 08.09.: Frist Fall 2026-001 (Requesty) · GreenPT-Footer selbst nachsehen.
- 11.09.: Frist Fall 2026-002 formal, ohne Bedeutung.
- ~28.09.: erster monatlicher Quellenlauf (`node quellenlauf.js`) · zweiter Widerspruchs-Scan.
- 30.09.: Ziel fünf ausgefüllte Gesprächsraster · zwei neue Fälle eröffnet.
- ~14.10.: Kill-Kriterien-Check (`MESSUNG.md`, `~/THESE.md`).
