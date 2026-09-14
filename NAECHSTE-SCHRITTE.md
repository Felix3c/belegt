# belegbar.eu — Nächste Schritte

**Stand:** 2026-09-14, 16:10 (Scaleway hat auf Fall 004 geantwortet und kündigt die Korrektur an;
Antwort seit 14.09. live, Status „beantwortet“. LinkedIn: keine Antwort auf Welle 1.)
**Führendes Dokument:** `MESSUNG.md` (Kill-Kriterien) · Ziel-Satz in `~/THESE.md`
**Phase:** live, 4 Fälle, Engpass ist nicht mehr Code, sondern Rücklauf von außen. Erster Anbieter, der eine Korrektur wörtlich ankündigt: Scaleway (14.09.).

## Wo wir stehen

- **Fälle, Stand aus den JSONs:** 2026-001 Requesty `bestaetigt` (Frist 08.09. abgelaufen),
  2026-002 GreenPT `bestaetigt` (Frist 11.09.; Footer am 14.09. weiter unverändert, „Verified by
  independent audit · ISO 27001“), 2026-003 Black Forest Labs `offen` (Frist **24.09.**),
  **2026-004 Scaleway `beantwortet` seit 14.09.** `data/faelle/entwurf/` ist leer.
- **Scaleway-Antwort 14.09., 09:37 UTC (Privacy Team, Zendesk-Ticket, ohne Namen):** bestreitet
  nichts, schlägt dem zuständigen Team den qualifizierten AI-Act-Satz vor („… except temporarily
  and exceptionally for troubleshooting or security purposes …“), bittet um „resolved“, sobald
  live. Zur Produktseite kein Wort. Wörtlich in `antworten[]`, beide Seiten am 14.09. erneut
  abgerufen (absolute Sätze unverändert, Rohkopien in `belege/faelle/2026-004/`), Commit
  `d105ef1`, live geprüft. Wayback-Snapshots vom 14.09. sind zweimal mit 500 gescheitert,
  nachholen. Antwortentwurf an Scaleway steht in `outreach/mails/12-scaleway-fall-2026-004.md`
  unten, **Felix sendet** von hallo@ als Antwort im Thread. Halbzeit-Nachfassen 17.09. entfällt.
- **Welle 1, Tag 1 — gesendet 12.09. von Claude mit Felix' ausdrücklicher Erlaubnis:**
  Heiko Gossen 12:01, Marc Groß 12:02, Claus Arndt 12:04 (neuer Thread). Text ist das
  Anschreiben aus `outreach/gespraeche/leitfaden.md`, Sie-Form, keine Zahl, kein Verkauf;
  bei Groß mit dem KGSt/Vitako-Leitfaden und dem KGSt-Forum nächste Woche als Aufhänger,
  bei Arndt auf die letzte Freigabe in Moers zugeschnitten. Alle drei mit Sendehaken
  gegengeprüft. Uhrzeiten im Status-Block von `outreach/mails/06-linkedin-kontakte.md`.
  Nachmittags erneut live geprüft: alle drei mit Haken im Postfach, noch keine Antwort,
  keine Benachrichtigung von den dreien.
- **Welle 1, Tag 3 vorgezogen auf 12.09. (Felix: „warum nicht jetzt?", dann „mach"):**
  Anke Köhler-Heite 12:26 (neuer Thread, PROSOZ-Zugehörigkeit im Profil bestätigt) und
  Stephan Hansen-Oest 12:31 (bestehender Thread). Beide mit Sendehaken. Welle 1 ist
  damit an alle fünf raus, noch keine Antwort von niemandem.
- **Erste Antwort 13:28, Hansen-Oest:** 20 Minuten nur als Erstberatung, 250 € netto + USt.
  Felix hat abgesagt („Ja sag ihm ab"), Absage 16:00 von Claude gesendet. Datenpunkt in
  `outreach/gespraeche/05-hansen-oest.md`: für den Anwalt ist Anbieterprüfung eine bezahlte
  Leistung der Käuferseite. Zählt nicht als Gespräch. **Welle 1: 4 offen, 1 abgesagt.**
- **LinkedIn 14.09. live geprüft:** keine Antwort von Gossen, Groß, C. Arndt, Köhler-Heite; alle vier
  Threads enden mit unserer Nachricht vom 12.09. Claus Arndt hat am 14.09. das Profil angesehen
  (Benachrichtigung), also gelesen. Keine neue Einladung, keine Annahme.
- **LinkedIn sonst (12.09. live geprüft):** 9 Kontakte, keine Antwort auf die Notizen vom
  22./24./28.08., keine eingehende Einladung, sieben eigene Anfragen weiterhin offen
  (Kroll, Hedde, Herwig, Hense, Ganten, Kücük, vom Sondern). Anke Köhler-Heite ist laut
  Profil weiter bei PROSOZ Herten.
- **Unstimmigkeit, nur Felix kann sie klären:** David Arndt, Uda Bastians und Katrin Giebel
  stehen weder unter „Gesendet" noch in den Kontakten, obwohl die Kontaktliste sie für den
  28.08. als gesendet führt. Entweder nie abgeschickt oder zurückgezogen.
- **Ungeklärt:** ob seit dem 24.08. noch einmal nach `MESSUNG.md` gemessen wurde (geplant
  war 1.–3.09.). Vor dem Kill-Check nachholen, sonst fehlt die Reihe.
- **Regel seit 04.09. (Felix):** Vor jeder Arbeit an belegt zuerst beide Postfächer prüfen
  (hallo@, Gmail). Die Sieben-Tage-Zusage auf `/fuer-anbieter/` hängt daran.
- Git sauber, nichts ungepusht, HEAD `130d42f`.

## Nächster konkreter Schritt

**1. Felix schickt die Antwort an Scaleway** (Entwurf in `outreach/mails/12-scaleway-fall-2026-004.md`,
als Antwort im Zendesk-Thread, Betreff unverändert). Danach Fall 004 nur noch beobachten: sobald
Scaleway den neuen Text meldet oder ein Abruf ihn zeigt, Seite hashen, Snapshot, Status `ausgeraeumt`;
Produktseite dabei mitprüfen (Antwort erwähnt sie nicht).

**2. Warten auf Rücklauf** von Gossen, Groß, C. Arndt, Köhler-Heite. Nächste Claude-Handlung erst bei Antwort
(dann Terminvorschlag entwerfen, Felix schickt) oder am **~19.09.**, wenn bis dahin
niemand geantwortet hat: dann Welle 2 vorbereiten (Kandidaten 6–11 in
`outreach/gespraeche/kandidaten.md`; davon sind nur Seniuk und Gsell schon Kontakte,
Kroll, Giebel, Hedde und Bastians haben die Anfrage noch nicht angenommen; Anwälte
künftig anders anschreiben, siehe Lehre in 05-hansen-oest.md). Kein
Nachfassen bei den fünf vor dem 26.09. (zwei Wochen).

## Wartet auf Felix

- **Antwort an Scaleway senden** (Entwurf liegt, hallo@, im Thread). Selbstgesetzt: bis 15.09.

- **Antworten auf die vier offenen Nachrichten** kommen in sein Postfach. Je Gespräch am selben
  Abend das Raster aus dem Leitfaden ausfüllen (`outreach/gespraeche/NN-name.md`), sonst
  verfällt die wörtliche Formulierung. Ziel: fünf Raster bis 30.09.
- **D. Arndt, Bastians, Giebel:** waren die Anfragen vom 28.08. je draußen?
- Die acht indexierten Vergleichspaare gegenlesen (offen seit 06.09.).
- Exoscale-Hinweis per Mail ohne Fall (veraltete Zonen-Tabelle) — Claude entwirft auf Zuruf.

## Blocker

Keiner.

## Termine

- **~17.09.:** Halbzeit-Nachfassen nur noch für 003 (Black Forest Labs); 004 hat geantwortet.
- **24.09.:** Frist Fall 003. Für 004 ohne Bedeutung mehr.
- **~28.09.:** erster monatlicher Quellenlauf (`node quellenlauf.js`) und zweiter
  Widerspruchs-Scan.
- **30.09.:** fünf ausgefüllte Gesprächsraster, zwei neue Fälle eröffnet.
- **~14.10.:** Kill-Check nach `~/THESE.md` — ein Anbieter meldet sich von selbst, zwei
  Fälle abgeschlossen, ein Fremder zitiert.
