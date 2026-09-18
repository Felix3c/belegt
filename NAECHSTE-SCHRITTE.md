# belegbar.eu — Nächste Schritte

**Stand:** 2026-09-14, 16:10 (Scaleway hat auf Fall 004 geantwortet und kündigt die Korrektur an;
Antwort seit 14.09. live, Status „beantwortet“. LinkedIn: keine Antwort auf Welle 1.) · **16.09. abends (Home-Tab):** Nachfassen an alle vier offenen Welle-1-Kontakte gesendet (`outreach/mails/14-…`), **Perplexity zitiert belegbar.eu (Kriterium 1 erstmals erfüllt, Details MESSUNG.md)**, ChatGPT nicht; Angebots-Entwurf in `ANGEBOT-ENTWURF.md`; **Beschlüsse Felix 21:15 in MESSUNG.md** (B zuerst, GUARD-Wortlaut, kein Einfrieren 14.10.); gebaut und ungetrackt: `dossier.js`, `lib/dossier.js`, `test/dossier.test.js`, `dossiers/BEISPIEL-scaleway-2026-09-16.md`, `ENTWURF-FESTPREIS-ABSATZ.md` (Diff-Plan gegen build.js). **16.09. 21:15: Freigabe erteilt, umgesetzt, LIVE (Commit `e2c64e5`):** /fuer-anbieter/ mit „Eintritt zum Festpreis“ (490 € Aufnahme, 190 € Zusage), neue Seite /fuer-kaeufer/ (Dossier 390 €), Methodik mit Finanzierung Stand 16.09. und Abschnitt „Regeländerungen“; alle Preise ohne USt (§ 19 UStG). Search Console 16.09.: 4 Klicks, 174 Impressionen (28 Tage), 21 Seiten indexiert (24.08.: 0 / 1 / 4). Folgearbeit: Profilfeld für bezahlte Einträge (Entwurf Punkt 10), Dossier-Vorlage, MESSUNG Kriterium 3 auf GUARD-Wortlaut.
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
  unten; **gesendet 14.09. 14:05 UTC** von hallo@ im Thread (Claude, auf Felix' Zuruf). Halbzeit-Nachfassen 17.09. entfällt.
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
- **Geklärt 14.09. (Home-Tab):** seit dem 24.08. wurde **nicht** nach `MESSUNG.md` gemessen,
  die Messtabelle hat genau eine Zeile. Die Messung (Search Console + 15 Zitier-Fragen) braucht
  Felix' Login und ist kein GitHub-Job; vor dem Kill-Check 14.10. mindestens einmal nachholen.
  Neu, ungepusht: `.github/workflows/quellenlauf.yml` (Quellenlauf am 28. jedes Monats, committet
  Ledger + Prüfdaten + Site; erster Lauf von Hand als 'trocken' empfohlen, weil GitHub-IPs
  bei manchen Quellen geblockt sein könnten).
- **Regel seit 04.09. (Felix):** Vor jeder Arbeit an belegt zuerst beide Postfächer prüfen
  (hallo@, Gmail). Die Sieben-Tage-Zusage auf `/fuer-anbieter/` hängt daran.
- Git sauber, nichts ungepusht, HEAD `898b7c9` (14.09.).

## Nächster konkreter Schritt

**1. Fall 004 nur noch beobachten** (Antwort an Scaleway ist am 14.09. raus): sobald
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

## 18.09., Dossier-Wächter

Gebaut: `lib/normenbezug.js` (Paragraphen, Gesetzeskürzel, Bewertungswörter) mit Feld-Ausnahme nur für Zitatfelder (zitat/aussage/wortlaut) und Fall-Kurztext; `lib/dossier.js::erzeugeDossier` wirft bei Fund und nennt das Feld. Scaleway-Profil und Fall 2026-004 auf Tatsachen umgeschrieben, Beispieldossier neu erzeugt, läuft sauber. `node --test test/*.test.js` = 64 grün (nachgemessen). Rechtsgrund: WBS + Plutte 18.09., kein Normenbezug im Dossier (GUARD.md:72).

**Warum das Dossier ohne Normenbezug nicht schwächer wird (18.09., Felix' Frage, Antwort angenommen):** Der Hauptkunde
ist der Einkäufer, der wissen muss, ob „wir speichern nichts" belegt ist, bevor er einen Anbieter unter Vertrag nimmt.
Für den ist das RDG kein Thema; nur der abmahnende Mitbewerber ist die Grauzone. Der Satz „könnte gegen § 5 UWG
verstoßen" ist das Billigste am Dossier, den schreibt jeder Anwalt in zehn Minuten, sobald die Tatsachen auf dem Tisch
liegen; die zwanzig Stunden stecken im Finden, Datieren, Anfragen und Dokumentieren des Schweigens. Ein Anwalt traut
einem Faktenblatt sogar mehr als einer Rechtsmeinung vom Nicht-Anwalt. Muster: Creditreform verkauft Fakten über Firmen,
kein Urteil. In Guard-Sprache: belegt, datiert, angreifbar — der Notar sagt auch nicht, wer den Prozess gewinnt.
Ehrliche Grenze: Wer „kann ich klagen" beantwortet haben will, bekommt bei uns das Dossier und den Hinweis, wer das darf
(Rolle Vollstrecker, GUARD.md).

**Entschieden 18.09. (Felix):** (1) Die drei Scaleway-Texte stimmen. (2) Die Tabellenüberschrift „AI Act:" im Dossier bleibt, weil Kategorie, nicht Bewertung. (3) 17 weitere Anbieterprofile enthalten in eigenen Feldern (pflicht/anmerkung) „Art. 53", „DSGVO", „AI Act" usw. (am stärksten infomaniak, nordference, hetzner). Das ist der Katalog, nicht das Dossier, und bricht nichts. Beschluss: nicht auf Verdacht umschreiben. Der Wächter wirft beim ersten Dossier für so ein Profil einen Fehler und nennt das Feld; dann wird genau dieses Profil auf Tatsachen umgeschrieben. Alles committet (Wächter, Scaleway, Fall 004). Nicht committet, weil nicht Teil davon: ANGEBOT-ENTWURF.md, ENTWURF-FESTPREIS-ABSATZ.md (interne Entwürfe 16.09., Repo ist öffentlich) und .github/workflows/quellenlauf.yml (14.09., Entscheidung offen).

