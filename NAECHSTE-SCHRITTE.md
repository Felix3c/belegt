# belegbar.eu — Nächste Schritte

**Stand:** 2026-09-12, mittags (Welle 1 Tag 1 ist raus: drei Gesprächsbitten auf LinkedIn.
Die Datei stand vorher auf dem 06.09. und war überholt — die Fall-Stände sind jetzt gegen
`data/faelle/*.json` und die Commit-Historie nachgezogen.)
**Führendes Dokument:** `MESSUNG.md` (Kill-Kriterien) · Ziel-Satz in `~/THESE.md`
**Phase:** live, 4 Fälle, Engpass ist nicht mehr Code, sondern Rücklauf von außen.

## Wo wir stehen

- **Fälle, Stand aus den JSONs:** 2026-001 Requesty `bestaetigt` (Frist 08.09. abgelaufen),
  2026-002 GreenPT `bestaetigt` (Frist 11.09.), 2026-003 Black Forest Labs und 2026-004
  Scaleway `offen`, beide Frist **24.09.**, Anbieter am 10.09. informiert (Commit 4956fe2).
  `data/faelle/entwurf/` ist leer, es liegt kein unveröffentlichter Fall mehr herum.
- **Welle 1, Tag 1 — gesendet 12.09. von Claude mit Felix' ausdrücklicher Erlaubnis:**
  Heiko Gossen 12:01, Marc Groß 12:02, Claus Arndt 12:04 (neuer Thread). Text ist das
  Anschreiben aus `outreach/gespraeche/leitfaden.md`, Sie-Form, keine Zahl, kein Verkauf;
  bei Groß mit dem KGSt/Vitako-Leitfaden und dem KGSt-Forum nächste Woche als Aufhänger,
  bei Arndt auf die letzte Freigabe in Moers zugeschnitten. Alle drei mit Sendehaken
  gegengeprüft. Uhrzeiten im Status-Block von `outreach/mails/06-linkedin-kontakte.md`.
  Nachmittags erneut live geprüft: alle drei mit Haken im Postfach, noch keine Antwort,
  keine Benachrichtigung von den dreien.
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

**Mo 14.09.: Welle 1 Tag 3** — die Gesprächsbitte an Anke Köhler-Heite und Stephan
Hansen-Oest, Text aus `outreach/gespraeche/leitfaden.md`, danach Uhrzeiten in den
Status-Block von `outreach/mails/06-linkedin-kontakte.md`. Felix' Zuruf genügt
(„Welle 1 Tag 3"), die Erlaubnis für Tag 1 galt nur für die drei von heute.

## Wartet auf Felix

- **Antworten auf die drei Nachrichten** kommen in sein Postfach. Je Gespräch am selben
  Abend das Raster aus dem Leitfaden ausfüllen (`outreach/gespraeche/NN-name.md`), sonst
  verfällt die wörtliche Formulierung. Ziel: fünf Raster bis 30.09.
- **D. Arndt, Bastians, Giebel:** waren die Anfragen vom 28.08. je draußen?
- Die acht indexierten Vergleichspaare gegenlesen (offen seit 06.09.).
- Exoscale-Hinweis per Mail ohne Fall (veraltete Zonen-Tabelle) — Claude entwirft auf Zuruf.

## Blocker

Keiner.

## Termine

- **~17.09.:** Halbzeit-Nachfassen für 003 und 004 (Mitte zwischen Versand 10.09. und Frist
  24.09.; die alte Angabe 14.09. galt für einen Versand am 07.09.).
- **24.09.:** Frist Fälle 003 und 004.
- **~28.09.:** erster monatlicher Quellenlauf (`node quellenlauf.js`) und zweiter
  Widerspruchs-Scan.
- **30.09.:** fünf ausgefüllte Gesprächsraster, zwei neue Fälle eröffnet.
- **~14.10.:** Kill-Check nach `~/THESE.md` — ein Anbieter meldet sich von selbst, zwei
  Fälle abgeschlossen, ein Fremder zitiert.
