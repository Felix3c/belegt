# belegbar.eu — Nächste Schritte

**Stand:** 2026-09-02, abends (GreenPT auf „bestätigt“ gesetzt und Robert vorab informiert; Requesty hat die Security-Seite still umgebaut, Nachfassen gesendet)
**Führendes Dokument:** `MESSUNG.md` (Kill-Kriterien) · Ziel-Satz in `~/THESE.md` („Das Ziel ist der Stempel, nicht das Urteil“)
**Phase:** live, 21 Anbieter, 123 URLs, 2 Fälle. Beide Fälle laufen auf ein Ende zu: Requesty auf die Frist 08.09., GreenPT auf die Footer-Korrektur.

## Wo wir stehen

- **Fall 2026-002 GreenPT / ISO 27001 — Status `bestaetigt` seit 02.09.** Robert Keus (Founder & CEO) hatte am 01.09. (12:57 UTC) den Befund bestätigt: kein eigenes ISO-27001-Zertifikat, Badge meint Scaleway/Verda, Footer wird korrigiert, eigene Zertifizierung läuft, Zitat freigegeben. Antwort wörtlich in `antworten[]`. Felix hat am 02.09. entschieden: Der Status beschreibt die Website, nicht die Absicht. Weil die Antwort den Widerspruch bestätigt (Definition „bestätigt“ auf der Seite: „Antwort räumt den Widerspruch nicht aus“) und der Footer unverändert ist, steht der Fall auf `bestaetigt` mit Anmerkung „Anbieter bestätigt den Befund, Korrektur angekündigt“. Robert wurde vorher mit Zwei-Satz-Mail informiert (02.09., 19:19 UTC, von hallo@; Text in `outreach/mails/09`), erst danach gepusht. Die Frist 11.09. ist für diesen Fall ohne Bedeutung. Wechsel auf `ausgeraeumt`, sobald der korrigierte Footer live ist. Footer am 02.09. (17:37 UTC) unverändert, Snapshot `web.archive.org/web/20260902174027`. Profil-Feld ISO 27001 bleibt `beansprucht`, bis ein eigenes Zertifikat mit Geltungsbereich vorliegt.
- **Fall 2026-001 Requesty / ZDR — Status `beantwortet`, Security-Seite still umgebaut.** Keine Reaktion seit Felix’ Mail vom 28.08. Beim Abruf am 02.09. (17:37 UTC) ist `/security` komplett neu („compliance / status September 2026“): Diagramm „No data stored“ und „with zero data retention it is never stored“ sind weg, Gateway-Knoten heißt „logged per your retention setting“, die FAQ nennt ZDR ausdrücklich „on written request“. `/dpa` sagt weiter unqualifiziert „never stored“. Also Auflösungsweg 1 zur Hälfte, ohne Mitteilung an uns; Ursache nicht belegbar, im Verlauf steht nur „nach Eröffnung des Falls geändert“. Wayback hat keine Zwischen-Snapshots (25.08. → 02.09.); neue Snapshots `20260902173945` (/security) und `20260902174004` (/dpa). Nachfassen am 02.09. um 18:49 UTC von hallo@ gesendet (an Thibault, CC sales@; Text in `outreach/mails/08`): benennt die Security-Änderung als Fortschritt, fragt nach der DPA-Zeile, erinnert an den 08.09. Kein weiteres Nachfassen.
- **Postfach/LinkedIn 02.09. geprüft:** außer Roberts „Thanks Felix.“ (01.09., 14:03 UTC, nur im Verlauf) nichts. Requesty nichts, Regolo-Privacy nichts, Gossen nichts, keine eingehenden Anfragen, kein Anbieter meldet sich von selbst (Kriterium 1 in `~/THESE.md` offen).
- **Einordnung (02.09. mit Felix besprochen):** Requesty wird den Stempel wahrscheinlich nicht wollen; der Fall endet am 08.09. als `bestaetigt` (Anmerkung „Security-Seite korrigiert“) oder als `ausgeraeumt`, falls die DPA-Zeile noch qualifiziert wird. Beides ist ein abgeschlossener Fall. GreenPT ist der erste Fall, in dem ein Anbieter den Befund selbst bestätigt hat — das Schaufenster für den Notar-Stempel (Guard, `~/THESE.md`). Guard selbst wartet laut `~/REIHENFOLGE.txt` bis nach dem 11.09.
- **Köhl:** Direkt-URL funktioniert (01.09. im Browser geprüft). Anfrage ohne Notiz ist EIN Klick — noch nicht gemacht.
- **Build-Eigenheiten:** Entwürfe nach `data/faelle/entwurf/`; `antworten[].anmerkung` wird gerendert; `core.autocrlf` lässt docs/ nach Build scheinbar „M“ erscheinen. JSONs nie per `JSON.parse`→`stringify` zurückschreiben, sondern gezielt per String-Ersatz; die Fall-JSONs haben CRLF-Zeilenenden. Roh-SHA-256 der Seiten ändern sich bei jedem Abruf (Build-IDs, Nonces) — „unverändert“ heißt: zitierter Wortlaut plus Wayback-Snapshot, nicht Byte-Hash. `node --test test/quellen.test.js` ist der richtige Aufruf (15/15 grün, 02.09. gemessen); `node --test test/` meldet fälschlich 1 fail.
- **Termine/Sonstiges:** Search-Console-Sitemap-Kontrolle (geplant ~02.09.) — ungeklärt, ob erledigt. Quellenlauf ~28.09. (`node quellenlauf.js`). Kill-Check ~14.10.
- Git: sauber, alles gepusht (HEAD `320d30f`).

## Plan bis zum Kill-Check (beschlossen 05.09.2026)

Anlass: ein externer 10-Punkte-Vorschlag (Preisspalte, Vergleichsseiten, geführter Weg, Änderungsprotokoll, Englisch, mehr Anbieter, Newsletter, Dossier-Generator, API/MCP, DSB-Gespräche). Gegen `~/THESE.md` geprüft: gut als Plan für eine Vergleichsseite, nur zur Hälfte als Plan für den Guard-Prototyp, weil die Fälle darin nicht vorkommen. Nebenbedingung: etwa eine Stunde pro Abend.

Reihenfolge, von Felix bestätigt:

1. **Fälle zu Ende bringen** (08.09., siehe unten).
2. **Änderungsprotokoll `/aenderungen/` plus Atom-Feed** — **gebaut 05.09.** (`lib/aenderungen.js`, `test/aenderungen.test.js`, 10 Tests). Quelle ist die Git-Historie von `data/anbieter` und `data/faelle` plus der noch nicht committete Arbeitsstand (Datum = Baudatum): kein Hand-Ledger, jeder kann es aus den öffentlichen Commits nachrechnen. Ein Eintrag je Status- oder Quellenwechsel eines belegenden Feldes, je Fall-Statuswechsel, je Anbieter-Aufnahme; Prüfdatum und Anmerkung allein zählen nicht. Grund = Anmerkung des Feldes, wenn sie sich mitbewegt hat. Beim ersten Build 37 Einträge seit 19.08. Startseite zeigt „Zuletzt geprüft · n Änderungen in 30 Tagen“; `daten.json` trägt das Feld `aenderungen`; `llms.txt` verweist. Bewusste Lücke: Quellenlauf-Befunde ohne Handprüfung erscheinen nicht — erst der Statuswechsel. Nach dem Lauf am 28.09. prüfen, ob das stört.
3. **Fünf Gespräche mit DSBs oder IT-Einkäufern** (Felix). Frage: „Wie hast du es beim letzten Mal gemacht, wie lange hat es gedauert?“ Zusatzfrage für Guard: „Würdest du ein Dokument unterschreiben, das sagt, was nicht belegbar war?“ Claude bereitet Kandidatenliste und Leitfaden vor. Das Ergebnis entscheidet die Zahler-Frage (Anbieter zahlt für den Stempel vs. Käufer zahlt für das Dossier).
4. **Preis-Statusstufen**: vierte Stufe „kein öffentlicher Preis“, Einheit €/GPU-Stunde für Hetzner/Exoscale, Abrufdatum je Preis, Archivkopie der Preisseite. Output-Preis existiert bereits.
5. **Belegt-Filter** auf der Übersicht („nur Anbieter, bei denen AVV, Subprozessoren, Trainings-Opt-out belegt sind“). Zeigt, sortiert nicht.
6. **noindex** auf alle Vergleichsseiten bis auf etwa acht handverlesene Paarungen.

Gestrichen: Shortlist-Wizard (Urteil statt Zeuge, RDG-Nähe). Verschoben bis nach den Gesprächen: Dossier-Generator, MCP/API, Englisch, neue Anbieter. Nicht vergessen: Fall-Template einmal von jemandem mit Medienrecht-Erfahrung lesen lassen; Benachrichtigungs-Mails und Hashes revisionssicher archivieren.

## Nächster konkreter Schritt

**Postfach prüfen** (Gmail, hallo@ und Gmail-Adresse): Antwort von Thibault auf das Nachfassen? Mail von Robert mit der Footer-URL? Antworten wörtlich in den Fall, Status setzen, `node build.js`, `node --test test/quellen.test.js`, committen, pushen — binnen eines Tages. Dazu `https://greenpt.com/` abrufen: trägt der Footer die Zuordnung, dann neuer Wortlaut mit Abrufzeit, SHA-256 und Wayback-Snapshot in den Verlauf, Status `ausgeraeumt`. Spätestens am 08.09. beides ohne Mail prüfen und Requesty nach Fristablauf auf `bestaetigt` setzen (Anmerkung „Security-Seite korrigiert, DPA-Seite unverändert“), sofern die DPA-Zeile bis dahin nicht qualifiziert ist.

## Wartet auf Felix

- **Requesty-Status am 08.09.:** Claudes Vorschlag `bestaetigt` mit Anmerkung „Security-Seite korrigiert“ — von Felix noch nicht ausdrücklich bestätigt, folgt aber derselben Logik wie die GreenPT-Entscheidung.
- **Köhl:** „Connect“-Klick auf https://www.linkedin.com/in/stefanie-k%C3%B6hl-8159a1179/ (ohne Notiz) — oder endgültig streichen (`outreach/mails/06`).
- Optional: Kommentar bei Lara Gsell (unverändert offen).
- Anderes Projekt, gesehen 29.08.: Doorway-Pages-Deploy fehlgeschlagen (Commit `751a1af`) — gehört in den Doorway-Tab.

## Blocker

Keiner.

## Termine

- 08.09.: Frist Fall 2026-001 (Requesty) · spätestens dann GreenPT-Footer selbst nachsehen.
- 11.09.: Frist Fall 2026-002 formal, ohne Bedeutung (Status bereits `bestaetigt`; `ausgeraeumt` sobald Footer live).
- ~28.09.: erster monatlicher Quellenlauf · ~14.10.: Kill-Kriterien-Check (`MESSUNG.md`).
