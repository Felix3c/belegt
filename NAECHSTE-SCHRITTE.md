# belegbar.eu — Nächste Schritte

**Stand:** 2026-09-01, spät (GreenPT hat geantwortet und alles zugegeben — Fall 2026-002 auf „beantwortet“, Antwort von Felix raus)
**Führendes Dokument:** `MESSUNG.md` (Kill-Kriterien) · Ziel-Satz in `~/THESE.md` („Das Ziel ist der Stempel, nicht das Urteil“)
**Phase:** live, 21 Anbieter, 123 URLs. Fall 2026-001 Requesty (beantwortet, keine weitere Reaktion), Fall 2026-002 GreenPT (beantwortet, Footer-Korrektur angekündigt).

## Wo wir stehen

- **Fall 2026-002 GreenPT / ISO 27001 — der Durchbruch vom 01.09.** Robert Keus (Founder & CEO) antwortete 12:57 UTC: Befund korrekt („we would rather document the fix than dispute the finding“), GreenPT BV hält **kein eigenes** ISO-27001-Zertifikat (Badge meint Scaleway/Verda), eigene ISO-27001/9001-Zertifizierung inkl. Pentest läuft („coming months“), Footer wird korrigiert, URL wird nachgereicht, Zitat ausdrücklich freigegeben. Wörtlich in `antworten[]` (ohne Telefon/Link-Zeilen der Signatur und ohne interne Weiterleitung — steht so in der `anmerkung`), Status `beantwortet`, Profil-Anmerkung ISO 27001 ergänzt (bleibt `beansprucht`). Felix hat 13:53 UTC von hallo@ geantwortet (Status-Logik, Bitte um URL; Text in `outreach/mails/09`). Commits `dbd5d30`, `cab673a`. Footer am 01.09. noch unverändert geprüft.
- **Status-Regel für 2026-002 (Vorschlag Claude, 01.09., von Felix noch nicht bestätigt):** Der Status beschreibt die Website, nicht die Absicht. Footer korrigiert → `ausgeraeumt` (Seite neu abrufen, SHA-256 + Wayback, Verlauf). Bis 11.09. nicht korrigiert → `bestaetigt` mit Anmerkung „Korrektur angekündigt“, später `ausgeraeumt` sobald live. In der Mail an Robert steht die Original-Variante („11 September window no longer matters“) — die härtere Statuswechsel-Ansage wurde NICHT mitgeschickt.
- **Fall 2026-001 Requesty / ZDR** — Status `beantwortet`, seit Felix’ Mail vom 28.08. keine Reaktion (Postfach 01.09. geprüft). Frist 08.09., Nachfassen 3./4.9. nur ohne Reaktion.
- **Postfach/LinkedIn 01.09. geprüft:** Regolo-Privacy nichts, Gossen keine Antwort auf Dankesnachricht (nur Annahme-Benachrichtigung 27.08.), keine eingehenden Anfragen, kein Anbieter meldet sich von selbst (Kriterium 1 THESE.md offen).
- **Köhl:** Direkt-URL funktioniert (01.09. im Browser geprüft: Profil erreichbar, 2nd degree via Frenzel, „Connect“-Button da). Anfrage ohne Notiz ist EIN Klick — Felix hat ihn noch nicht gemacht.
- **Build-Eigenheiten** — unverändert (Entwürfe nach `data/faelle/entwurf/`, `antworten[].anmerkung` wird gerendert, `core.autocrlf` lässt docs/ nach Build scheinbar „M“ erscheinen). Neu gelernt 01.09.: Anbieter-JSONs nie per `JSON.parse`→`stringify` zurückschreiben (zerstört kompakte Formatierung, `0.20`→`0.2`) — gezielt per String-Ersatz editieren. `node --test test/` (Verzeichnis) meldet fälschlich 1 fail; `node --test test/quellen.test.js` ist der richtige Aufruf (15/15 grün, 01.09. gemessen).
- **Termine/Sonstiges:** Search-Console-Sitemap-Kontrolle ~02.09. steht noch aus. Quellenlauf ~28.09. (`node quellenlauf.js`). Kill-Check ~14.10.
- Git: sauber, alles gepusht (Stand 01.09. spät, HEAD `102a601`).

## Nächster konkreter Schritt

**GreenPT-Footer prüfen** — sobald Roberts Mail mit der URL kommt, sonst spätestens 08.09. selbst: `https://greenpt.com/` abrufen. Wenn der Footer die Zuordnung trägt (z. B. „ISO 27001 certified infrastructure“ o. ä.): neuen Wortlaut mit Abrufzeit, SHA-256 und Wayback-Snapshot in den Fall (`verlauf`, ggf. Anmerkung), Status `ausgeraeumt`, `node build.js`, committen, pushen. Das wäre der **erste abgeschlossene Fall** (Kriterium 2 in `~/THESE.md`). Vorher noch offen: Requesty-Nachfassen 3./4.9., falls bis dahin keine Reaktion (kurz: „Reminder — the case goes to *confirmed* on 8 Sept …“).

## Wartet auf Felix

- **Status-Regel bestätigen:** Fall 2026-002 auf `bestaetigt` setzen, wenn der Footer am 11.09. noch unverändert ist (Anmerkung „Korrektur angekündigt“)? Claude empfiehlt ja; Robert wurde es nicht angekündigt — vorher ggf. kurze Mail.
- **Köhl:** „Connect“-Klick auf https://www.linkedin.com/in/stefanie-k%C3%B6hl-8159a1179/ (ohne Notiz) — oder endgültig streichen (`outreach/mails/06`).
- Optional: Kommentar bei Lara Gsell (unverändert offen).
- Anderes Projekt, gesehen 29.08.: Doorway-Pages-Deploy fehlgeschlagen (Commit `751a1af`) — gehört in den Doorway-Tab.

## Blocker

Keiner.

## Termine

- 02.09.: Search-Console-Sitemap-Kontrolle.
- 3./4.9.: Nachfassen Requesty (nur ohne Reaktion). GreenPT-Nachfassen entfällt.
- 08.09.: Frist Fall 2026-001 · spätestens dann GreenPT-Footer selbst nachsehen.
- 11.09.: Frist Fall 2026-002 (Statuswechsel je nach Footer-Stand und Felix’ Entscheidung).
- ~28.09.: erster monatlicher Quellenlauf · ~14.10.: Kill-Kriterien-Check (`MESSUNG.md`).
