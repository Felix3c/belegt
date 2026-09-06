# belegbar.eu — Nächste Schritte

**Stand:** 2026-09-06, abends (Plan-Punkte 4–6 gebaut; Widerspruchs-Scan über 19 Anbieter ausgewertet; Für-Anbieter-Seite, Verified-Regel, Zitier-Box und Fall-JSON live; Fälle 2026-003 BFL und 2026-004 Scaleway als Entwurf fertig, warten auf Felix’ Versand)
**Führendes Dokument:** `MESSUNG.md` (Kill-Kriterien) · Ziel-Satz in `~/THESE.md` („Das Ziel ist der Stempel, nicht das Urteil“)
**Phase:** live, 21 Anbieter, 57 URLs in der Sitemap (seit 06.09.; vorher 124), 2 Fälle live, 2 Fälle im Entwurf. Git sauber, alles gepusht (HEAD `fad849a`), Tests 4/10/15/13 grün (zitat, preise, quellen, aenderungen; einzeln aufrufen, `node --test test/` meldet fälschlich 1 fail).

## Wo wir stehen

- **Fall 2026-001 Requesty / ZDR — `beantwortet`.** 06.09. (11:05 UTC): keine Antwort auf Felix’ persönliche Mail vom 04.09. DPA-Seite byte-identisch zum 04.09., „request and response bodies are never stored“ weiter ohne Vorbehalt. Snapshot `web.archive.org/web/20260906110722`. Frist 08.09.
- **Fall 2026-002 GreenPT / ISO 27001 — `bestaetigt`.** 06.09.: keine Mail von Robert mit der Footer-URL, Footer unverändert (Snapshot `…20260906110759`). `ausgeraeumt`, sobald der korrigierte Footer live ist.
- **Postfach 06.09.:** Requesty, GreenPT, Regolo, Gossen nichts; keine eingehende Anfrage. LinkedIn: Anke Köhler-Heite hat am 04.09. angenommen; eine weitere, noch nicht angesehene Einladung liegt vor.
- **Fälle 2026-003 und 2026-004 — Entwürfe fertig, nicht gebaut.** Felix hat am 06.09. BFL und Scaleway gewählt (aus `outreach/fall-kandidaten.md`, 28 Kandidaten, 7 hoch). Entwürfe in `data/faelle/entwurf/` (der Build liest diesen Ordner nicht), Rohkopien und SHA256SUMS in `belege/faelle/2026-003/` (5 Seiten) und `2026-004/` (3 Seiten + Specific-Conditions-PDF), Wayback-Snapshots für alle acht HTML-Seiten. Alle Zitate in den eigenen Rohkopien wörtlich nachgeprüft. Mails in `outreach/mails/11-…` (BFL, an legal@blackforestlabs.ai, CC privacy@ und dpo@) und `12-…` (Scaleway, an privacy@scaleway.com); der Ordner ist per .gitignore privat. Entwürfe sind auf Versand 07.09., Frist 21.09. vorgeschrieben.
- **Gebaut 06.09.:** Preis-Statusstufen (`lib/preise.js`, vierte Stufe „kein öffentlicher Preis“, Einheitenpreise, Stand je Preis, `preisarchiv.js`, Commit 7480547) · Belegt-Filter auf der Übersicht, trifft 9 von 21 · noindex auf 68 von 76 Vergleichsseiten, acht Paare bleiben (`VERGLEICH_INDEXIERT` in build.js, Claudes Auswahl, Commit 44b9b50) · Seite `/fuer-anbieter/`, Verified-Regel angehoben (drei Vertragsfelder durch anbieterbenannte Primärdokumente belegt, ZDR-Frage beantwortet, benannte Rolle hat gegengelesen; Feld `verified: { datum, rolle, anmerkung }`), Zitier-Box mit Kopierknopf, `faelle/<slug>/daten.json`, Antwortvorlagen in `outreach/anbieter-antwort-vorlage.md` (Commit 3e22ec0). **Die Sieben-Tage-Zusage auf der Für-Anbieter-Seite ist öffentlich; sie hält nur mit der Postfach-Regel.**
- **Entwicklungslinie (06.09., Felix: „kann nicht sein, dass es am Zenit ist“):** Das Produkt sind die Fälle. Fall-Pipeline = monatlicher Widerspruchs-Scan (erster Lauf 06.09., nächster ~28.09. mit dem Quellenlauf; dann die Vanta-Trust-Center von Mistral, Lyceum, BFL und Gcores Legal-Tabs im Browser lesen). Ziel: zwei neue Fälle eröffnet bis Ende September — die Entwürfe liegen.
- **Bewusste Lücken:** Preisstufen-Wechsel erscheinen nicht im Änderungsprotokoll (zählt nur `status`/`quelle`). Hetzner hat keinen GPU-Stundenpreis, weil nur die kostenlose Inference-API als Modell erfasst ist.
- **Build-Eigenheiten:** `build.js` und Fall-JSON 001 haben CRLF, 002 und die Entwürfe LF. JSONs nur zeilenweise per String-Ersatz ändern. Der Bash-Wrapper in Claude Code scheitert bei Heredocs mit `→`, `’` oder einfachen Anführungszeichen; große Texte per Write-Tool oder als Script-Datei. Ledger zählt „Seiten mit Änderungsdatum heute“ kumulativ.
- **Regel seit 04.09. (Felix):** Vor jeder Arbeit an belegt zuerst beide Postfächer (hallo@, Gmail).

## Nächster konkreter Schritt

**08.09. (Montag), Claude:** Postfach prüfen. Dann `https://www.requesty.ai/dpa` und `https://greenpt.com/` roh abrufen, hashen, Wayback. Requesty nach Fristablauf auf `bestaetigt` setzen, Anmerkung „Security-Seite korrigiert, DPA-Seite unverändert“, sofern die DPA-Zeile nicht qualifiziert ist; GreenPT auf `ausgeraeumt`, falls der Footer korrigiert ist. Verlauf, `node build.js`, Tests, committen, pushen. Meldet Felix „Mail 11/12 gesendet am …“: in der jeweiligen Entwurfs-JSON `eroeffnet` und `anbieter_informiert` auf das Versanddatum, `antwort_frist` auf +14 Tage, Verlaufseintrag „Anbieter informiert“, Datei nach `data/faelle/`, bauen, pushen.

## Wartet auf Felix

- **Mails 11 (BFL) und 12 (Scaleway) von hallo@ schicken**, am besten 07.09. oder 08.09.; Betreff-Datum ggf. anpassen. Danach Claude das Versanddatum nennen.
- **Gespräche, Welle 1 (Plan Punkt 3):** LinkedIn-Nachricht an Gossen, C. Arndt, Groß und Köhler-Heite mit dem Text aus `outreach/gespraeche/leitfaden.md`, nicht mehr als drei am Tag; Hansen-Oest zwei Tage später. Ziel: fünf Raster bis 30.09.
- **Offen gelassen 06.09.:** Requesty-Status am 08.09. (Claude setzt `bestaetigt` nach GreenPT-Logik, wenn nichts kommt); die acht indexierten Vergleichspaare gegenlesen; Exoscale-Hinweis per Mail ohne Fall (veraltete Zonen-Tabelle), Claude entwirft auf Zuruf.
- **LinkedIn:** eine neue, unbekannte Einladung vom 04.09. ansehen. Optional: Kommentar bei Lara Gsell.
- Gestrichen 06.09. (Felix): Stefanie Köhl.

## Blocker

Keiner.

## Termine

- 08.09.: Frist Fall 2026-001 (Requesty) · GreenPT-Footer selbst nachsehen · Versand Mails 11 und 12.
- 14.09.: Halbzeit-Nachfassen für 003 und 004, falls gesendet und keine Antwort.
- 21.09.: Frist 003 und 004 (bei Versand am 07.09.).
- ~28.09.: erster monatlicher Quellenlauf (`node quellenlauf.js`) · zweiter Widerspruchs-Scan.
- 30.09.: Ziel fünf ausgefüllte Gesprächsraster · zwei neue Fälle eröffnet.
- ~14.10.: Kill-Kriterien-Check (`MESSUNG.md`, `~/THESE.md`).
