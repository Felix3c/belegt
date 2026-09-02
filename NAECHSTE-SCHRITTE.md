# belegbar.eu — Nächste Schritte

**Stand:** 2026-09-02, abends (Postfach geprüft: nur Roberts „Thanks Felix.“; Requesty hat die Security-Seite still umgebaut, DPA-Seite unverändert — Verlauf beider Fälle ergänzt)
**Führendes Dokument:** `MESSUNG.md` (Kill-Kriterien) · Ziel-Satz in `~/THESE.md` („Das Ziel ist der Stempel, nicht das Urteil“)
**Phase:** live, 21 Anbieter, 123 URLs. Fall 2026-001 Requesty (beantwortet; Security-Seite am 02.09. still qualifiziert, DPA-Seite nicht), Fall 2026-002 GreenPT (beantwortet, Footer-Korrektur angekündigt, 02.09. noch nicht live).

## Wo wir stehen

- **Fall 2026-002 GreenPT / ISO 27001 — der Durchbruch vom 01.09.** Robert Keus (Founder & CEO) antwortete 12:57 UTC: Befund korrekt („we would rather document the fix than dispute the finding“), GreenPT BV hält **kein eigenes** ISO-27001-Zertifikat (Badge meint Scaleway/Verda), eigene ISO-27001/9001-Zertifizierung inkl. Pentest läuft („coming months“), Footer wird korrigiert, URL wird nachgereicht, Zitat ausdrücklich freigegeben. Wörtlich in `antworten[]` (ohne Telefon/Link-Zeilen der Signatur und ohne interne Weiterleitung — steht so in der `anmerkung`), Status `beantwortet`, Profil-Anmerkung ISO 27001 ergänzt (bleibt `beansprucht`). Felix hat 13:53 UTC von hallo@ geantwortet (Status-Logik, Bitte um URL; Text in `outreach/mails/09`). Commits `dbd5d30`, `cab673a`. Footer am 01.09. noch unverändert geprüft.
- **Status-Regel für 2026-002 (Vorschlag Claude, 01.09., von Felix noch nicht bestätigt):** Der Status beschreibt die Website, nicht die Absicht. Footer korrigiert → `ausgeraeumt` (Seite neu abrufen, SHA-256 + Wayback, Verlauf). Bis 11.09. nicht korrigiert → `bestaetigt` mit Anmerkung „Korrektur angekündigt“, später `ausgeraeumt` sobald live. In der Mail an Robert steht die Original-Variante („11 September window no longer matters“) — die härtere Statuswechsel-Ansage wurde NICHT mitgeschickt.
- **Fall 2026-001 Requesty / ZDR — Security-Seite am 02.09. still umgebaut.** Keine Reaktion seit Felix’ Mail vom 28.08. Beim Abruf am 02.09. (17:37 UTC): `/security` komplett neu („compliance / status September 2026“) — Diagramm „No data stored“ und „with zero data retention it is never stored“ sind weg, Gateway-Knoten heißt jetzt „logged per your retention setting“, FAQ nennt ZDR ausdrücklich „on written request“. `/dpa` sagt weiter unqualifiziert „never stored“. Also Auflösungsweg 1 zur Hälfte, ohne Mitteilung. Wayback hat keine Zwischen-Snapshots (25.08. → 02.09.); neue Snapshots 20260902173945 (/security) und 20260902174004 (/dpa). Verlauf ergänzt, Status bleibt `beantwortet` (Widerspruch auf /dpa besteht fort). **Nachfass-Entwurf** liegt in `outreach/mails/08` (Abschnitt „Nachfassen 03./04.09.“): benennt die Security-Änderung als Fortschritt, fragt nach der DPA-Zeile, erinnert an den 08.09.
- **Postfach/LinkedIn 02.09. geprüft:** Robert Keus antwortete am 01.09. 14:03 UTC nur „Thanks Felix.“ (im Verlauf vermerkt, nicht als Antwort). Requesty nichts, Regolo-Privacy nichts, Gossen nichts (LinkedIn nur Wochenstatistik), keine eingehenden Anfragen, kein Anbieter meldet sich von selbst (Kriterium 1 THESE.md offen). GreenPT-Footer am 02.09. unverändert (Snapshot 20260902174027).
- **Köhl:** Direkt-URL funktioniert (01.09. im Browser geprüft: Profil erreichbar, 2nd degree via Frenzel, „Connect“-Button da). Anfrage ohne Notiz ist EIN Klick — Felix hat ihn noch nicht gemacht.
- **Build-Eigenheiten** — unverändert (Entwürfe nach `data/faelle/entwurf/`, `antworten[].anmerkung` wird gerendert, `core.autocrlf` lässt docs/ nach Build scheinbar „M“ erscheinen). Neu gelernt 01.09.: Anbieter-JSONs nie per `JSON.parse`→`stringify` zurückschreiben (zerstört kompakte Formatierung, `0.20`→`0.2`) — gezielt per String-Ersatz editieren. `node --test test/` (Verzeichnis) meldet fälschlich 1 fail; `node --test test/quellen.test.js` ist der richtige Aufruf (15/15 grün, 01.09. gemessen).
- **Termine/Sonstiges:** Search-Console-Sitemap-Kontrolle ~02.09. steht noch aus. Quellenlauf ~28.09. (`node quellenlauf.js`). Kill-Check ~14.10.
- Git: sauber, alles gepusht (Stand 02.09. abends).

## Nächster konkreter Schritt

**Requesty-Nachfass-Mail senden (3./4.9.)** — Entwurf in `outreach/mails/08`, als Antwort im Thread an Thibault (CC sales@), von hallo@. Danach Verlauf ergänzen („Nachfassen gesendet“), bauen, pushen. Parallel weiter: **GreenPT-Footer prüfen** — sobald Roberts Mail mit der URL kommt, sonst spätestens 08.09. selbst: `https://greenpt.com/` abrufen. Wenn der Footer die Zuordnung trägt (z. B. „ISO 27001 certified infrastructure“ o. ä.): neuen Wortlaut mit Abrufzeit, SHA-256 und Wayback-Snapshot in den Fall (`verlauf`, ggf. Anmerkung), Status `ausgeraeumt`, `node build.js`, committen, pushen. Das wäre der **erste abgeschlossene Fall** (Kriterium 2 in `~/THESE.md`).

## Wartet auf Felix

- **Requesty-Nachfass-Mail** aus `outreach/mails/08` senden (3./4.9.) — oder streichen, falls Felix die stille Änderung der Security-Seite für sich sprechen lassen will.
- **Status-Frage Requesty:** Reicht die qualifizierte Security-Seite allein für `ausgeraeumt`? Claude sagt nein — der Fall hängt an der DPA-Zeile, die unverändert ist; `beantwortet` bleibt, bis /dpa qualifiziert ist oder am 08.09. die Frist abläuft (dann `bestaetigt` mit Anmerkung „Security-Seite korrigiert“).

- **Status-Regel bestätigen:** Fall 2026-002 auf `bestaetigt` setzen, wenn der Footer am 11.09. noch unverändert ist (Anmerkung „Korrektur angekündigt“)? Claude empfiehlt ja; Robert wurde es nicht angekündigt — vorher ggf. kurze Mail.
- **Köhl:** „Connect“-Klick auf https://www.linkedin.com/in/stefanie-k%C3%B6hl-8159a1179/ (ohne Notiz) — oder endgültig streichen (`outreach/mails/06`).
- Optional: Kommentar bei Lara Gsell (unverändert offen).
- Anderes Projekt, gesehen 29.08.: Doorway-Pages-Deploy fehlgeschlagen (Commit `751a1af`) — gehört in den Doorway-Tab.

## Blocker

Keiner.

## Termine

- 02.09.: Search-Console-Sitemap-Kontrolle.
- 3./4.9.: Nachfassen Requesty (Entwurf liegt, Mail 08). GreenPT-Nachfassen entfällt.
- 08.09.: Frist Fall 2026-001 · spätestens dann GreenPT-Footer selbst nachsehen.
- 11.09.: Frist Fall 2026-002 (Statuswechsel je nach Footer-Stand und Felix’ Entscheidung).
- ~28.09.: erster monatlicher Quellenlauf · ~14.10.: Kill-Kriterien-Check (`MESSUNG.md`).
