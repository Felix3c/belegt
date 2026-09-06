# belegbar.eu — Nächste Schritte

**Stand:** 2026-09-06, nachmittags (Postfach leer, beide Fälle unverändert; Plan-Punkte 4, 5, 6 gebaut; Widerspruchs-Scan ausgewertet; Für-Anbieter-Seite, Verified-Regel, Zitier-Box und Fall-JSON live; Fälle 2026-003 BFL und 2026-004 Scaleway als Entwurf fertig, warten auf Felix’ Versand)
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
2. **Anbieter-Eingang — gebaut 06.09. (Commit 3e22ec0), von Felix freigegeben.** Korrektur zur Mittagsfassung: Ein Eingang existierte schon, verstreut (Methodik-Abschnitt „Verified“, Profil-Footer „Sie arbeiten bei X?“, Fall-Footer), aber mit der niedrigsten Latte („hat irgendetwas eingereicht“). Jetzt: Seite `/fuer-anbieter/` (Belege nachreichen mit Zusage „Prüfung binnen sieben Tagen“, Fall beantworten, Verified beantragen, was wir nicht annehmen; verlinkt aus Site-Footer, Profil- und Fall-Footer, Methodik, llms.txt, Sitemap). **Verified-Regel angehoben** (Felix: Variante „vier Vertragsfelder“, einen Tick weicher): AVV, Subprozessorenliste und Trainings-Opt-out durch anbieterbenannte Primärdokumente belegt, ZDR-Frage beantwortet (belegt oder ausdrücklich „keine Zusage“, datiert), benannte Rolle hat gegengelesen; Rolle wird veröffentlicht, kein Name. Datenfeld `verified: { datum, rolle, anmerkung }` in der README. Antwortvorlagen für hallo@ in `outreach/anbieter-antwort-vorlage.md` (Eingangsbestätigung, Ergebnis, Verified-Anfrage, Fall-Antwort). **Die Sieben-Tage-Zusage ist jetzt öffentlich; sie hält nur mit der Postfach-Regel.**
3. **Zitier-Box — gebaut 06.09. (Commit 3e22ec0).** `lib/zitat.js` (4 Tests) liefert die Zitiertexte; Kasten mit Kopierknopf auf allen Profil- und Fallseiten; `faelle/<slug>/daten.json` mit Zitaten, Hashes, Snapshots, Antworten, Verlauf, Lizenz.

Weiter verschoben bis nach den Gesprächen: Dossier-Generator, MCP/API, Englisch, neue Anbieter. Gestrichen bleibt der Shortlist-Wizard.

## Widerspruchs-Scan 06.09. — Ergebnis

Fünf Agenten, 19 Anbieter, Abrufe 11:23 bis 11:54 UTC, alles in `outreach/fall-kandidaten.md` (Rangliste, wörtliche Zitate, URLs, Abrufzeiten, „Was es nicht heißt“ je Kandidat). **28 Kandidaten, davon 7 mit hoher Konfidenz**, 2 Anbieter ohne Befund (Aleph Alpha, Nordference). Die sieben starken: Black Forest Labs („Zero data retention“ vs. Speicher- und Trainingslizenz in ToS, Privacy Policy und EU-API-Terms), Scaleway („no access to, nor knowledge of any inputs and outputs“ vs. „temporarily store and access the full content of HTTP requests“ auf derselben Seite), T-Systems („never saved“ vs. Cache-Default in der verbindlichen Leistungsbeschreibung), Nebius („not used to train any models in either mode“ vs. ToS „training smaller Models“), Regolo („no records of any kind“ vs. Logs in Privacy Policy und Blog), IONOS (Docs bewerben Hochrisiko-Nutzung, KI-AGB verbieten sie), Exoscale (RZ-Mindestanforderung ISO 27001:2022 vs. eigene Tabelle mit 27001:2013). Fünf davon sind das Requesty-Muster: absolute Retention-Aussage gegen eigenes Kleingedrucktes.

**Claudes Empfehlung für die zwei Fälle bis Ende September:** Fall A Black Forest Labs, Fall B Scaleway; Reserve T-Systems (größte Wirkung für Kommunen und DSBs, aber angreifbar, weil Telekom „Prefix-Cache ist keine Speicherung“ einwenden wird). Nicht als erste Fälle: IONOS (kein Datenschutzbezug) und Exoscale (vermutlich veraltete Tabelle, Hinweis-Mail reicht). Nicht prüfbar ohne Browser: Trust Center von Mistral, Lyceum, BFL und Gcores Legal-Tabs — dort können weitere Kandidaten liegen. Alle Zitate stammen aus Agenten-Abrufen; vor einer Eröffnung neu abrufen, hashen, Wayback, Rohkopien (README-Ablauf).

## Fälle 2026-003 und 2026-004 — Entwürfe fertig (06.09., Felix hat BFL + Scaleway gewählt)

- **2026-003 Black Forest Labs / Zero Data Retention.** Entwurf `data/faelle/entwurf/2026-003-black-forest-labs-zero-data-retention.json`, Mail `outreach/mails/11-black-forest-labs-fall-2026-003.md` (an legal@blackforestlabs.ai, CC privacy@ und dpo@). Fünf Seiten abgerufen 13:48 UTC, gehasht, Rohkopien in `belege/faelle/2026-003/`, fünf Wayback-Snapshots. Alle Zitate von Claude in den eigenen Rohkopien wörtlich nachgeprüft, nicht aus dem Agenten-Scan übernommen. Hinweis: Das BFL-Profil trug den Widerspruch schon seit 19.08. als Anmerkung im ZDR-Feld; Mutter ist BFL Inc. (Delaware), das steht im Fall unter „Was es nicht heißt“.
- **2026-004 Scaleway / Generative APIs „no access“.** Entwurf `data/faelle/entwurf/2026-004-scaleway-generative-apis-no-access.json`, Mail `outreach/mails/12-scaleway-fall-2026-004.md` (an privacy@scaleway.com). Drei Seiten plus Specific Conditions (PDF, Version 07.04.2026) abgerufen, gehasht, Rohkopien in `belege/faelle/2026-004/`, drei Snapshots. ZDR bleibt im Profil „belegt“; der Fall betrifft nur die zwei absoluten Sätze.
- **Ablauf beim Versand (steht auch in jeder Mail-Datei):** Mail raus → in der JSON `eroeffnet` und `anbieter_informiert` auf das Versanddatum, `antwort_frist` auf +14 Tage, Betreff-Datum anpassen → Datei nach `data/faelle/` verschieben → Verlaufseintrag „Anbieter informiert“ → `node build.js`, Tests, pushen. Ohne `anbieter_informiert` weigert sich der Build. Die Entwürfe sind auf Versand am 07.09. mit Frist 21.09. vorgeschrieben.

## Nächster konkreter Schritt

**Felix:** beide Mails (11 und 12) von hallo@ schicken, am besten am 07.09. oder 08.09. Dann Claude sagen: „gesendet am …“ — Claude verschiebt die Entwürfe, setzt die Daten, baut, pusht.

**08.09. (Montag), Claude:** Postfach. Requesty-DPA und GreenPT-Footer abrufen. Requesty nach Fristablauf auf `bestaetigt` (Anmerkung „Security-Seite korrigiert, DPA-Seite unverändert“), Rohkopie, Hash, Wayback, Verlauf, bauen, testen, pushen. Falls GreenPT-Footer korrigiert: `ausgeraeumt`.

## Wartet auf Felix

- **Mails 11 und 12 schicken** (siehe oben).
- **Gespräche, Welle 1 (Plan Punkt 3):** LinkedIn-Nachricht an Gossen, C. Arndt, Groß mit dem Text aus `outreach/gespraeche/leitfaden.md`; Köhler-Heite hat angenommen, also gleich mit dazu (dann sind es vier, Hansen-Oest zwei Tage später). Nicht mehr als drei am Tag.
- **Offen gelassen am 06.09. (Frage übersprungen):** Requesty am 08.09. auf `bestaetigt` (Claude macht es nach der GreenPT-Logik, wenn nichts kommt); die acht indexierten Vergleichspaare gegenlesen; Exoscale-Hinweis per Mail ohne Fall (veraltete Zonen-Tabelle) — Claude entwirft auf Zuruf.
- **LinkedIn:** eine neue, unbekannte Einladung vom 04.09. ansehen.
- Optional: Kommentar bei Lara Gsell.

Gestrichen am 06.09. (Felix): Stefanie Köhl (`outreach/mails/06`).

## Blocker

Keiner.

## Termine

- 08.09.: Frist Fall 2026-001 (Requesty) · GreenPT-Footer selbst nachsehen.
- 11.09.: Frist Fall 2026-002 formal, ohne Bedeutung.
- ~28.09.: erster monatlicher Quellenlauf (`node quellenlauf.js`) · zweiter Widerspruchs-Scan.
- 30.09.: Ziel fünf ausgefüllte Gesprächsraster · zwei neue Fälle eröffnet.
- ~14.10.: Kill-Kriterien-Check (`MESSUNG.md`, `~/THESE.md`).
