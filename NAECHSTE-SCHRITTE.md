# belegbar.eu — Nächste Schritte

**Stand:** 2026-09-01 (GreenPT hat geantwortet — Fall 2026-002 auf „beantwortet“, Commit `dbd5d30`)
**Führendes Dokument:** `MESSUNG.md` (Kill-Kriterien) · Ziel-Satz in `~/THESE.md` („Das Ziel ist der Stempel, nicht das Urteil“)
**Phase:** live, 21 Anbieter, 123 URLs. Zwei Fälle: 2026-001 Requesty (beantwortet, keine weitere Reaktion), 2026-002 GreenPT (beantwortet 01.09., Footer-Korrektur angekündigt).

## Wo wir stehen

- **Fall 2026-001 Requesty / ZDR** — Status `beantwortet`. Thibault Jaigu (Co-Founder) hatte am 25.08., 26 Min. nach unserer Mail, geantwortet („written by an AI agent?“, DPA sei „for customers only“); erst 28.08. gelesen, Fall war da schon live — Ablauffehler, öffentlich im Verlauf eingestanden. Antwort wörtlich im Fall + Anmerkung (DPA-Seite ist öffentlich, Wortlaut unverändert). Felix hat am 28.08. geantwortet (Entschuldigung für den Ablauf, KI-Entwurf offengelegt, zwei Auflösungswege). Frist 08.09., Nachfassen 3./4.9. nur ohne weitere Reaktion. Commit `ebc1f48`.
- **Fall 2026-002 GreenPT / ISO 27001** — Status `beantwortet`. Robert Keus (Founder & CEO) hat am 01.09. 12:57 UTC geantwortet: Befund korrekt, GreenPT BV hält kein eigenes Zertifikat (Badge meint Scaleway/Verda), eigene ISO-27001/9001-Zertifizierung läuft, Footer wird korrigiert, URL wird nachgereicht, Zitat freigegeben. Wörtlich in `antworten[]` (ohne Telefon/Links der Signatur), Verlauf und Profil-Anmerkung ergänzt, Commit `dbd5d30`. Footer am 01.09. noch unverändert → `ausgeraeumt` erst bei Live-Korrektur (dann Seite neu abrufen, SHA-256 + Wayback, Verlauf). Nachfassen 4./5.9. entfällt. Felix hat am 01.09. 13:53 UTC von hallo@ geantwortet (Status-Logik, Bitte um URL der Korrektur; Text in `outreach/mails/09`). Belege in `belege/faelle/2026-002/`.
- **Regolo/Seeweb** — Chiara Grande hatte das Kontaktformular als Bewerbung fürs „Builder Program“ gelesen (Tokens gegen Logo/Post). Felix hat am 28.08. abgelehnt (Neutralität) und das Evidenz-Angebot bekräftigt; Privacy-Abteilung soll zu Subprozessoren/AI-Act antworten. Protokoll `outreach/mails/04-regolo.md`.
- **Methodik** — neuer Abschnitt `/methodik/#unabhaengigkeit` (kein Logo, keine Gegenleistung, keine Sponsorenposts; „Finanzierung, Stand 28.08.2026: privat, keine Einnahmen“ — bei Änderung dort mit Datum ausweisen). Commit `9084340`.
- **Mail-Infrastruktur** — Gmail „Senden als hallo@belegbar.eu“ eingerichtet (smtp.gmail.com + App-Passwort, 2-Faktor aktiviert); SPF bei INWX: `v=spf1 include:spf.improvmx.com include:_spf.google.com ~all`. ⚠️ Per Gmail-API angelegte Entwürfe verpacken Links beim Senden in `google.com/url?q=` — Anbieter-Mails deshalb als **neue Mail von Hand** in Gmail schreiben (Text aus `outreach/mails/`), Von = hallo@.
- **Build-Eigenheiten** — `antworten[].anmerkung` wird jetzt gerendert. Fall ohne `anbieter_informiert` direkt in `data/faelle/` lässt `node build.js` abbrechen, nachdem `docs/` geleert wurde (`git restore docs`); Entwürfe deshalb in `data/faelle/entwurf/`. `core.autocrlf=true` → nach Build zeigt `docs/` scheinbar alles „M“ (nur EOL).
- **Prüfung 28.08.** — Linkcheck 117/117 Quellen tragen; keine veralteten Zahlen; ISO-27001-Seite mit Auditor/Scope je Anbieter.
- **LinkedIn (28.08.)** — 8 Kontakte; Anfragen an D. Arndt, Bastians, Giebel gesendet; Köhl über Suche nicht gefunden (Direkt-URL in `06`). Dankesnachricht an Heiko Gossen 15:13 gesendet (ohne Podcast-Bezug). NEGZ-Kommentar: keine Antwort. Stand in `outreach/mails/06`, `07`.
- **Search Console** — Sitemap-Status unverändert „Konnte nicht abgerufen werden“, aber Seiten werden indexiert; nächste Kontrolle ~02.09.
- **Was „funktionieren“ heißt (28.08., `~/THESE.md`)** — belegbar gilt zum Kill-Check 14.10. als funktionierend, wenn: (1) ein Anbieter sich *von selbst* meldet (Requesty/GreenPT zählen nicht, wir haben sie angeschrieben), (2) zwei Fälle abgeschlossen sind (`ausgeraeumt`/`bestaetigt`), (3) ein Fremder es zitiert. Besucherzahl nachrangig. Guard beginnt erst, wenn Doorway seinen ersten Amts-Fall dokumentiert und `seiteFall()` aus belegbar kopiert würde — nicht vor Frühjahr 2027.
- Git: sauber, alles gepusht (Stand 29.08. abends, Quellenlauf `c002490`).

## Nächster konkreter Schritt

**1. Footer-Korrektur abwarten:** sobald GreenPT die URL schickt (oder spätestens beim Nachsehen ~08.09.), `https://greenpt.com/` abrufen, neuen Wortlaut mit SHA-256 + Wayback in `behauptung`/`verlauf` dokumentieren, Status `ausgeraeumt`, Build, Push — erster abgeschlossener Fall (Kriterium 2 in `~/THESE.md`). **2. Weiter Postfach:** Requesty (Frist 08.09., Nachfassen 3./4.9. nur ohne Reaktion; Stand 01.09.: keine), Regolo-Privacy (nichts), Gossen (LinkedIn 01.09. geprüft: keine Antwort). Regolo-Dokumente ins Profil mit neuem Prüfdatum, falls sie kommen.

## Nächster Bau-Schritt

**Monatlicher Quellenlauf ist gebaut (28.08.):** `node quellenlauf.js` → drei Listen (unverändert / verändert /
verschwunden), Ledger `data/quellen-hashes.json`, Prüfdaten werden bei unveränderten Quellen fortgeschrieben; Details
in README „Monatlicher Quellenlauf“. Erstlauf 28.08.: 117 URLs, Ledger befüllt, 115 stabil, `website`-URLs nur auf
Erreichbarkeit, dqsglobal.com (rotierende Blöcke) per Ledger-Schalter `nur_erreichbar` auf Handprüfung.
**Erster echter Lauf: ~28.09.** Danach `node build.js`, Diff ansehen (nur `geprueft`-Zeilen dürfen sich ändern),
committen. Damit ist der Weg frei für den nächsten Doorway-Abschnitt bzw. einen dritten Fall.

## Wartet auf Felix

- Köhl: Direkt-URL funktioniert (01.09. geprüft, 2nd via Frenzel, „Connect“-Button vorhanden) — Anfrage ohne Notiz senden oder streichen (`outreach/mails/06`).
- Antworten an Anbieter/Gossen selbst senden (Claude entwirft, Felix sendet als neue Mail von hallo@).
- Optional: Kommentar bei Lara Gsell.

## Blocker

Keiner.

## Termine

- ~02.09.: Search-Console-Sitemap; Nachfassen Requesty 3./4.9. (GreenPT-Nachfassen entfällt); ~08.09.: GreenPT-Footer nachsehen, falls keine URL kam.
- 08.09.: Frist Fall 2026-001 · 11.09.: Frist Fall 2026-002.
- ~28.09.: erster monatlicher Quellenlauf (`node quellenlauf.js`), danach jeden Monat.
- ~14.10.: Kill-Kriterien-Check (`MESSUNG.md`).
