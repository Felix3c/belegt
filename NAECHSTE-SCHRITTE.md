# belegbar.eu — Nächste Schritte

**Stand:** 2026-10-09, 13:37 real (Dauerlauf Laufend: TISAX-Gültigkeit Exoscale/T-Systems, lokal `2109a6c`, kein Push, Frage 228; davor 13:25 real (Dauerlauf Laufend: T-Systems-Modellstandorte nach Wortlaut 09.10. berichtigt, EUrouter-Website zeigt 0 Modelle, API-Preise stimmen, lokal `bd46fcb`, kein Push); davor 12:50 real (Dauerlauf Laufend: Gcore-Subprozessoren und Lyceum-DPA aus dem Browser belegt, lokal `62c0f69`, kein Push; davor 12:35 Dauerlauf Laufend: Quellenlauf bricht bei unbekanntem Schalter ab, lokal `35e72a6` + `e6b3929`, kein Push; davor 12:20 Dauerlauf Laufend: Dossier-Anzeigefehler Prüfpunkt-Unterfelder behoben, lokal, kein Push; davor 11:53 Dauerlauf Laufend: Einzelprüfung der offenen „verändert“-Quellen, EUrouter-Preise Kimi K2.6/Gemma 4 berichtigt, lokal `179ce37`, kein Push; davor 11:38 Laufend: Quellenlauf 11:35, Top-Modus-Fehler behoben, `--uebernehmen-nur` neu, lokal `3ef1ee3` + `709a961`, kein Push; davor 09:40 V5 Vorschlag „Wer prüft hier, wie“ in `dossiers/VORSCHLAG-WER-PRUEFT-V5.md`, Frage 221, nichts gebaut; davor V4b Quellenlauf, alle 198 Quellen jetzt im Ledger, PDF-Hash ohne Zeitstempel, lokal `75f45ca` + `a940568`, kein Push; davor 09:30 V4 Vorschlag Quellenlauf sichtbar liegt in `dossiers/VORSCHLAG-QUELLENLAUF-V4.md`, Frage 220, nichts gebaut; davor V3 Vorschlag Dossier-Format `dossiers/VORSCHLAG-FORMAT-V3.md`, Frage 219; davor V2 ISO 42001 lokal `92b2325`, kein Push)
Antwort seit 14.09. live, Status „beantwortet“. LinkedIn: keine Antwort auf Welle 1.) · **16.09. abends (Home-Tab):** Nachfassen an alle vier offenen Welle-1-Kontakte gesendet (`outreach/mails/14-…`), **Perplexity zitiert belegbar.eu (Kriterium 1 erstmals erfüllt, Details MESSUNG.md)**, ChatGPT nicht; Angebots-Entwurf in `ANGEBOT-ENTWURF.md`; **Beschlüsse Felix 21:15 in MESSUNG.md** (B zuerst, GUARD-Wortlaut, kein Einfrieren 14.10.); gebaut und ungetrackt: `dossier.js`, `lib/dossier.js`, `test/dossier.test.js`, `dossiers/BEISPIEL-scaleway-2026-09-16.md`, `ENTWURF-FESTPREIS-ABSATZ.md` (Diff-Plan gegen build.js). **16.09. 21:15: Freigabe erteilt, umgesetzt, LIVE (Commit `e2c64e5`):** /fuer-anbieter/ mit „Eintritt zum Festpreis“ (490 € Aufnahme, 190 € Zusage), neue Seite /fuer-kaeufer/ (Dossier 390 €), Methodik mit Finanzierung Stand 16.09. und Abschnitt „Regeländerungen“; alle Preise ohne USt (§ 19 UStG). Search Console 16.09.: 4 Klicks, 174 Impressionen (28 Tage), 21 Seiten indexiert (24.08.: 0 / 1 / 4). Folgearbeit: Profilfeld für bezahlte Einträge (Entwurf Punkt 10), Dossier-Vorlage, MESSUNG Kriterium 3 auf GUARD-Wortlaut.
**Führendes Dokument:** `MESSUNG.md` (Kill-Kriterien) · Ziel-Satz in `~/THESE.md`
**Phase:** live, 4 Fälle, Engpass ist nicht mehr Code, sondern Rücklauf von außen. Erster Anbieter, der eine Korrektur wörtlich ankündigt: Scaleway (14.09.).

## Neu 09.10.2026 13:37 (Dauerlauf, Laufend): TISAX-Gültigkeit

- **ENX-Bedingungen** (TISAX Participation GTC v3.0.2 vom 12.07.2023, `enx.com/tisaxgtcen.pdf`, SHA-256 `ac864878…5a753535`), XII.1: „Assessment Results shall have validity of a maximum period of 36 months.“ XII.2: nach Ablauf kein Gebrauch von Name/Logo bis zur neuen Bewertung.
- **ENX-Portal ist nicht öffentlich** (Seite `portal.enx.com/en-US/TISAX/tisaxassessmentresults/`, Abruf 09.10.: „TISAX assessment results are only used within this community and not for the general public“). Scope-/Assessment-IDs der Anbieter lassen sich also von uns nicht nachschlagen.
- **Exoscale:** letzte öffentlich genannte Bewertung April 2023 (Blog, DEKRA) → Frist spätestens April 2026; `/compliance/tisax/` nennt kein Datum, Websuche ohne Erneuerung. **T-Systems:** Jan–Jun 2023 (Blog, DEKRA) → spätestens Juni 2026, ebenfalls keine Erneuerung auffindbar. Hinweis in beiden Profilen (Anmerkung des TISAX-Eintrags), Status unverändert „belegt“ → **Frage 228** (Empfehlung: auf „beansprucht“ senken).
- STACKIT nennt Assessment-ID ATA163-1 ohne Datum (nicht prüfbar); Hetzner hat kein TISAX.
- 129/129 Tests, Build ok, lokal `2109a6c`, kein Push (geht mit 209/222).

## Neu 09.10.2026 13:25 (Dauerlauf, Laufend): T-Systems-Standorte, EUrouter-Störung

- **T-Systems `/models/llms/` hat den Standort-Wortlaut geändert** (der „JEV → Jefan“-Unterschied im Quellenlauf ist nur ein Menüpunkt; die Modellzeilen waren schon vor dem Wortstand 09.10. umgestellt). Heute: Telekom-Modelle „Hosted on T-Cloud Public — Telekom's sovereign infrastructure in Germany.“, GPT-5 „Hosted on Microsoft Azure (EU regions).“ (bis 03.10. „Server Location: Sweden“), **Claude 4.6 Sonnet nur noch „GCP / Azure“, „Google Cloud Platform & Microsoft Azure“, keine Region** (bis 03.10. „Server Location: Europe, Data Processing: EU“). Die Enterprise-Trust-Seite führt Claude 4.6 in Kategorie 2 („on Google Cloud or Microsoft Azure“, Subprozessoren weltweit, Verarbeitung weltweit möglich).
- Profil berichtigt: Standort GPT-5 → „Azure, EU-Regionen (Frankreich/Schweden)“, Claude 4.6 → „GCP oder Azure, Region nicht genannt“; Zitate Mistral Small 4/GPT-OSS auf den neuen Wortlaut, Preise alle gleich. Beide T-Systems-Quellen per `--uebernehmen-nur` übernommen. 129/129, Build streng ok, Archivcheck 19 ok. Lokal `bd46fcb`, kein Push (geht mit 209/222).
- **Für H20 (Nachfassen Fall 006, Mi 14.10.):** Prüfschritt „Trust-Seite geändert?“ – die Modellseite hat seit 03.10. die Europa-Angabe für Claude gestrichen; Wayback war 09.10. ~13:20 offline, deshalb kein Archivbeleg des alten Wortlauts außer unserem Commit `623c72a` (03.10.).
- **EUrouter:** `/models` und alle Modellseiten liefern seit heute Mittag nur eine Hülle; im Browser „0 models“, Modellseiten „Model Not Found“. Die API `api.eurouter.ai/v1/models` liefert 144 Modelle, alle fünf Profilpreise stimmen (DeepSeek 0.30/0.50, Kimi K2.6 0.73/3.50, Gemma 4 0.10/0.50 – API nennt hier Währung EUR, Website zeigte $ –, Mistral Large 3 0.55/1.65). Störung der Website, nicht übernommen; nächster Quellenlauf prüft erneut. Das EU-Zitat steht weiter auf `/providers`.
- Offen bleiben 6 „verändert“: 3× HF, Opper 2× (alle Frage 203), EUrouter `/models` (Störung).

## Neu 09.10.2026 12:50 (Dauerlauf, Laufend): Browser-Quellen Gcore und Lyceum

- **Gcore Subprozessoren → belegt.** DPA 10.1 verlinkt („available at link“, Ziel nur im gerenderten DOM) die Liste `assets.gcore.pro/site/legal/Gcore_List_of_subprocessors_25_11__2025.pdf` (Stand 25.11.2025, 13 Einträge, u. a. Gcore USA/Serbien/Philippinen/Georgien/Usbekistan, Zendesk USA). Rohkopie `belege/anbieter/gcore/`, Archivkopie `20261009104129` byte-gleich.
- **Lyceum:** Der DPA liegt im Trust Center **öffentlich** (Profil sagte „erst auf Anfrage“). Daraus: Betroffenenrechte → belegt (Auftraggeber, DPA 4.1/6.3/6.4), Log-Zweck → belegt (Schedule 1, 2.1), ZDR bleibt belegt, jetzt mit den vier Ausnahmen aus Schedule 1, 2.2; Log-Frist bleibt unbelegt; Subprozessoren bleiben beansprucht (DPA 7.1: Liste „upon request“). „ISO Certification“ im Trust Center ist ein **Vanta Engagement Letter** (Audit ab 31.08.2026 geplant), kein Zertifikat, also kein Widerspruch. Rohkopien `belege/anbieter/lyceum/`, Archivkopien `20261009104347`/`20261009104354` byte-gleich.
- Beobachtung (kein Fall, Felix entscheidet bei Bedarf): Lyceum-Modellseite „processed, not stored“ ohne Einschränkung gegen DPA-Ausnahmen; Details `outreach/fall-kandidaten.md` Nachtrag 09.10.
- Quellenlauf danach: 199 URLs, 189 unverändert, **8 verändert** (die 5 an Frage 203, dazu EUrouter `/models` erneut Preise, T-Systems 2× „(JEV)“ → „(Jefan)“ in Modell-/Trust-Doku; nicht übernommen, nächste Einzelprüfung). 129/129 Tests, Build streng ok, Archivcheck 19 Zitate ok. Lokal `62c0f69`, kein Push (geht mit 209/222).

## Neu 09.10.2026 12:35 (Dauerlauf, Laufend): Quellenlauf prüft den Aufruf

- **Fehler gefunden und behoben:** `node quellenlauf.js --help` lief als echter Lauf und schrieb das Ledger (bemerkt, weil dabei ein Zwischen-Hash einer HF-Karte geschrieben wurde; zurückgesetzt). Gleiches galt für jeden Tippfehler, z. B. `--trockn` statt `--trocken`. Jetzt prüft `pruefeAufruf()` in `lib/quellen.js` vor jedem Abruf: unbekannter Schalter, `--json`/`--uebernehmen-nur` ohne Wert oder `--uebernehmen` zusammen mit `--uebernehmen-nur` → Abbruch mit Exit 2, nichts abgerufen, nichts geschrieben. `--help`/`-h` zeigt den Aufruf aus dem Dateikopf.
- Test zuerst (rot, dann grün), 129/129, Build ok, `docs/` unverändert. Lokal `35e72a6` + `e6b3929`, kein Push nötig (Werkzeug, nicht Website).
- Lyceum-Magazin ist schon übernommen (Ledger ohne `veraendert_seit`); der Hinweis im Abschnitt 11:38 ist erledigt. Offen bleiben die 5 „verändert“ an Frage 203 (3× HF, Opper 2×).

## Neu 09.10.2026 12:20 (Dauerlauf, Laufend): Dossier zeigt Prüfpunkt-Werte

- **Fehler aus dem V3-Befund behoben** (unabhängig von Frage 219, betrifft das heutige Dossier): `wertText()` in `lib/dossier.js` kannte die Prüfpunkt-Unterfelder nicht. Zertifikats- und Modell-Unterfelder kamen mit „—“ ins Dossier, `betroffenenrechte_traeger` mit dem Rohschlüssel („geteilt“ statt „geteilt (Anbieter und Auftraggeber)“). Jetzt über `lib/pruefpunkte.js` wie auf der Profilseite.
- Gegenprobe: Scaleway 11 Unterfelder mit Wert, Hetzner 7, T-Systems 16; keine belegte Zeile mehr ohne Angabe. Website (`docs/`) unverändert, nur das Dossier.
- Test zuerst (rot, dann grün), 128/128, Build streng ok. Lokal, kein Push nötig (Dossier wird lokal erzeugt).
- Offen bleibt der zweite V3-Befund (`akkreditiert_dakks` kennt kein COFRAC/EA-MLA, SGS bei Scaleway → „nein“): Feldbedeutung, gehört zu Frage 219, nicht angefasst.

## Neu 09.10.2026 11:53 (Dauerlauf, Laufend): offene „verändert“-Quellen einzeln gelesen, EUrouter-Preise berichtigt

- **Einzelprüfung** der 14 offenen „verändert“-Quellen (Skript `~/allein/tmp/ql1209/pruef.js`: holt die Seite, prüft jedes Zitat aus den Anmerkungen wörtlich). Ausgelassen wegen Frage 203: die drei Aleph-HF-Karten, Opper `/models` und Opper `/ai-compliance`. Bei den übrigen neun stehen alle Zitate; die Fehltreffer stammen aus anderen Quellen derselben Anmerkung (eurouter.ai/providers, Nebius-Doku, Hetzner-Doku, IONOS-Startseite) oder sind dort schon als „steht nicht mehr da“ vermerkt (T-Systems „ohne Dritt-Subprozessoren“, Opper „Last updated“). T Cloud Public: „Audit reports for download via self-service“ ist jetzt die Unterseite hinter „Request report“ (myWorkplace-Login), Anmerkung bleibt richtig.
- **Befund EUrouter, berichtigt:** Modellseiten am 09.10.: **Kimi K2.6 Input $0.73** (bisher 0.66; 03.10. davor 0.80), **Gemma 4 Output $0.50** (bisher 0.35). DeepSeek V3.2 0.30/0.50, Mistral Large 3 0.55/1.65 und alle fünf Claude-Preise unverändert. Archivkopien `web.archive.org/web/20261009094926/…/kimi-k2.6` und `…/20261009094947/…/gemma-4` tragen die neuen Preise. Die EUrouter-Preise schwanken (Kimi dreimal in sechs Tagen); `/models` zeigt statisch nur drei Karten, die übrigen Preise stehen im eingebetteten JSON.
- Quellenlauf echt mit `--uebernehmen-nur` für die neun: Wortstand für alle neun jetzt angelegt (künftig mit Wortprotokoll), Prüfdatum 09.10. in 7 Profilen. Offen bleiben **5 „verändert“** (3× HF, Opper 2×), alle an Frage 203.
- Lokal `179ce37`, 127/127 Tests, Build streng ok, Archivcheck 19 Zitate ok, kein Push (geht mit 209/222).

## Neu 09.10.2026 11:38 (Dauerlauf, Laufend): Quellenlauf, Fehler im Top-Modus behoben

- **Fehler gefunden und behoben:** Ist bei einem Anbieter jede Quelle unverändert, schreibt `quellenlauf.js` im Modus „top“. Der löschte bisher alle Feld-Prüfdaten; die strenge Prüfung (Prüfpunkte H19, ISO 42001 V2) verlangt sie aber. Folge: Nach einem Lauf, in dem 12 Anbieter ganz unverändert waren, brach `node build.js` ab (zuerst BFL: „Prüfdatum fehlt“). Jetzt setzt der Top-Modus alle Feld-Daten auf den Tag des Laufs (Anzeige bleibt gleich, weil gleiche Daten kein „einzelne Angaben zuletzt am …“ erzeugen). Test zuerst, 127/127 grün, Build streng ok, Archivcheck ok.
- **Neu: `node quellenlauf.js --uebernehmen-nur <URL-Anfang>`** (mehrfach): übernimmt nur die von Hand gelesenen „verändert“-Quellen als neue Referenz und setzt ihr Prüfdatum. Bisher gab es nur das pauschale `--uebernehmen`, deshalb blieben die Meldungen tagelang liegen.
- **Lauf 11:35:** 11 Quellen neu „verändert“, alle Vorlagenwechsel, auf allen Seiten einer Domain gleich: DeepL (6 Seiten, Banner „Build multilingual experiences into your products – DeepL API“ fehlt), Regolo (5 Seiten, Blog-Teaser im Fuß gewechselt „Bonsai vs Qwen3.8-27B …“ → „Build an agentic knowledge graph that cites every claim“). Wortprotokoll vollständig (unter 12 Wörtern), kein Vertragstext betroffen → übernommen. Danach: 198 Quellen, 182 unverändert, **14 verändert (die bekannten: Aleph-Datenschutz + 3× HF, EUrouter `/models`, Hetzner-Datenschutz, IONOS 2×, Lyceum-Magazin, Nebius/OpenRouter, Opper 2×, T-Systems 2×)**. Lyceum (Inhalt gleich, 00:17 gelesen) kann beim nächsten Mal mit `--uebernehmen-nur https://lyceum.technology/` raus.
- Lokal `3ef1ee3` (Code) + `709a961` (Prüfdaten, Build), kein Push; geht mit dem nächsten freigegebenen Push mit (209/222).

## Neu 09.10.2026 09:45 (Dauerlauf V6): Aufräumen, zwei Fachantworten waren öffentlich

- **Befund:** Die Notizen `outreach/gespraeche/07-…` und `08-…` (Wortlaut zweier Anwalts-Antworten, eine mit Vertraulichkeits-Hinweis, eine mit ausdrücklich abgelehnter Veröffentlichung) und deren Zitate in dieser Datei sind seit dem Push 08.10. 11:45 auf GitHub abrufbar (raw-Abruf 09.10. ~09:55: HTTP 200). Nicht auf belegbar.eu selbst (404).
- **Lokal behoben:** beide Notizen aus dem Index genommen (Dateien liegen weiter auf der Platte) und in `.gitignore`; Zitate und Namen hier durch neutrale Zeilen ersetzt. Ebenfalls ignoriert: `ANGEBOT-ENTWURF.md`, `ENTWURF-FESTPREIS-ABSATZ.md`, `outreach/vergaben-2026-09.md`, `outreach/HALLO-DNS-ANLEITUNG.md`, `belege/faelle/*/*.pdf.txt`. Committet: `.github/workflows/quellenlauf.yml`. 123 Tests grün.
- **Offen (Felix, Frage 222):** Push dieser Korrektur; die alte Fassung bleibt in der Git-Historie sichtbar, bis sie umgeschrieben wird (Force-Push). Grundsätzlich: diese Datei ist öffentlich; Gesprächsinhalte Dritter gehören nicht hinein.

## Neu 09.10.2026 09:40 (Dauerlauf): V5 Seite „Wer prüft hier, wie“, nur Vorschlag

- `dossiers/VORSCHLAG-WER-PRUEFT-V5.md` (gitignored): neue Seite `/wer-prueft/` mit sechs Abschnitten (1 Wer — **schreibt Felix**, 2 Mensch/Software, 3 vier Schritte Erfassen/Sichern/Nachlesen/Widersprüche, 4 Ergebnis mit beim Build gezählten Zahlen, 5 was wir nicht prüfen, 6 Fehler melden). Ersetzt die Methodik nicht.
- Zahlen 09.10.: 21 Anbieter, Angaben 407 belegt / 86 beansprucht / 362 unbelegt (inkl. Prüfpunkt-Unterfelder; beim Bau dieselbe Zählung wie Beleg-Quote), 4 Fälle alle bestätigt, Antworten von Requesty, GreenPT, Scaleway, Scaleway-Doku laut Verlauf 03.10. korrigiert, Ledger 216.
- Wartet auf Felix: Abschnitt 1 + Frage 221 (KI-Assistent offenlegen; Empfehlung a). Bau ~1 h danach.

## Neu 09.10.2026 09:50 (Dauerlauf): V4b Quellenlauf, Ledger vollständig

- Echter `quellenlauf.js` (09:29): 76 neue Quellen im Ledger samt Wortstand, Prüfdatum 2026-10-09 in 21 Profilen fortgeschrieben (nur `geprueft`-Felder, 237 Zeilen). Kontrolllauf danach: 198 Quellen, **182 unverändert, 14 verändert, 0 verschwunden, 0 neu**, 2 übersprungen.
- Die 14 „verändert“ sind die bekannten offenen (Aleph-Datenschutz + 3× HF, EUrouter `/models`, Hetzner-Datenschutz, IONOS 2× Docs, Lyceum-Magazin (00:17 gelesen, Inhalt gleich), Nebius/OpenRouter, Opper 2×, T-Systems 2×). Kein `--uebernehmen`, weil das pauschal alle übernimmt; bleiben für die Einzelprüfung.
- **Befund + Fix:** Infomaniak-AGB (`welcome.infomaniak.com/api/web-components/1/cgu/latest?id=87…`) wird bei jedem Abruf als PDF neu erzeugt; zwei Abrufe im Abstand von 2 s unterscheiden sich nur in `/CreationDate`, `/ModDate` und `/ID`. Kippte sofort auf „verändert“. `hashInhalt` lässt diese drei Felder bei PDFs jetzt weg (Tests zuerst, 123/123 grün). Umstellung der 42 PDF-Einträge im Ledger mit Einmal-Skript `~/allein/tmp/v4/pdf-umstellung.js`: je Eintrag alter Byte-Hash beim frischen Abruf bestätigt, erst dann neuer Hash; Infomaniak-AGB zweimal gleich gehasht und gesetzt.
- Ledger-Altlasten ohne aktuelle Quelle: `docs.mistral.ai/admin/monitor-comply/privacy-data-controls` (fehler), `opper.ai/sub-processors` (leitet auf trust.opper.ai, steht so in der Opper-Anmerkung). Nichts angefasst.

## Neu 09.10.2026 09:30 (Dauerlauf): V4 Quellenlauf sichtbar, nur Vorschlag

- `dossiers/VORSCHLAG-QUELLENLAUF-V4.md` (gitignored): Kasten „Quellenlauf“ je Profilseite (zuletzt am, x von y belegenden Quellen nachgelesen, unverändert / verändert-gelesen / **offen** / verschwunden, Statuswechsel 30 Tage), „unverändert seit“ an jeder Quelle, Block `quellenlauf` in `daten.json`; `/aenderungen/` bleibt ohne Hash-Wechsel.
- Befund: **77 von 198 Quellen-URLs fehlen im Ledger** `data/quellen-hashes.json` (neue Belege aus H19/V1/V2; OVHcloud 10/15, Nebius 8/15, BFL 7/11, T-Systems 7/11, Regolo 6/11) → werden bis zum nächsten Quellenlauf nicht überwacht. Lokaler Quellenlauf ist als V4b im Dauerlauf eingereiht (geht ohne Felix).
- Ledger trennt „erstmals gesehen“ nicht von „verändert und übernommen“ (beide `geaendert`); Bau bräuchte Felder `erst`/`uebernommen`.
- Wartet auf Felix (Frage 220: a Kasten / b nur daten.json / c lassen; Empfehlung a). Bau ~1,5–2 h nach „steht“.

## Neu 09.10.2026 09:25 (Dauerlauf): V3 Dossier-Format, nur Vorschlag

- `dossiers/VORSCHLAG-FORMAT-V3.md` (Ordner gitignored, kein Commit): **Ergebniszeile** ja/nein/nicht belegbar gegen 15 Vorgaben, die der Auftraggeber setzt („nein“ nur mit Zitat des Anbieters; Scaleway wäre heute „nein“ wegen `vertrag.zweckbindung`), dazu **Kapitel „Nicht öffentlich belegbar: Fragen an den Anbieter“** mit Schlademanns Prüfliste (Herstellererklärung, Trainingsdaten, Tests, Architektur, Backup, Softwareverteilung, Berechtigungen, SoA).
- Beim Rechnen gefunden (Bau-Punkte): `wertText()` in `lib/dossier.js` zeigt Prüfpunkt-Unterfelder nicht an (Scaleway: 8 belegte Zeilen mit „—“); `akkreditiert_dakks` kennt kein COFRAC/EA-MLA (SGS bei Scaleway → falsches „nein“).
- Wartet auf Felix (Frage 219). Bau ~2 h nach „steht“, kein Push nötig.

## Neu 09.10.2026 09:10 (Dauerlauf): V1b erledigt (Frage 211), lokal `4fe6d83`, kein Push

- **Fall-Entwurf 2026-008 OVHcloud AI Endpoints** (`data/faelle/entwurf/2026-008-ovhcloud-ai-endpoints-hds.json`, Rohkopien `belege/faelle/2026-008/` mit SHA256SUMS, Abruf 09.10. 06:59 UTC): Produktseite „ISO 27001, SOC 2 Type II, and HDS (health data) certified service“ gegen OVHs eigene HDS-Produktliste (36 Produkte, Stand 02.06.2026, ohne AI Endpoints), auf die sowohl die Compliance-Seite HDS als auch die Anleitung zur HDS-Option in Public-Cloud-Projekten verweisen. **Nur HDS:** ISO 27001 aus dem Fall genommen, weil OVHs ISO-Compliance-Seite pauschal „AI & machine learning“ als zertifiziert nennt. **Archivlinks fehlen** (Internet Archive am 09.10. ~09:05 „Temporarily Offline“) → nachholen vor jeder Veröffentlichung.
- **Nebius: kein Fall.** SII-QCD ist laut ANAB-Anlage MS-4932 (Ausgabe 24.01.2024, gültig bis 07.11.2026, von SII veröffentlicht) seit 15.06.2016 für ISO/IEC 27001 akkreditiert. Die Trust-Center-Aussage „ANAB … and RvA, authorizing it to certify … such as ISO 27001“ stimmt also über ANAB. Unser Profil sagte „Akkreditierung für 27001 nicht belegt“ → berichtigt; 27018/27701/42001 bleiben „nicht belegt“ (weder ANAB noch RvA). Belege `belege/anbieter/nebius/`. **Achtung 07.11.2026:** ANAB-Akkreditierung läuft ab; Verlängerung dann prüfen.
- **Regolo 007:** nur Verlaufseintrag 08.10. (Prüfpunkt-Durchsicht bestätigt, vier Zitate weiter wörtlich).
- 111 Tests grün, Build ok.

## Neu 09.10.2026 09:00 (Dauerlauf): V1 erledigt, Frage-210-Korrekturen in 14 Profilen

- **Lokal `2bf618b`, kein Push** (Push nur nach Felix' „steht“, zusammen mit 209). Alle Quellen am 09.10. neu abgerufen, fast alle byte-gleich mit 08.10.; Rohabrufe `~/allein/tmp/pp0910/`, `~/allein/tmp/prueft-0910/`. 111 Tests, Build streng ok, Archivcheck 19 Zitate ok.
- **Hochgestuft (belegt):** Mistral ISO 27001/27701/SOC 2 (Trust-Center-Downloads, Prescient, IAS); BFL ISO 27001 (Nr. 269758, Amtivo/UKAS) und Subprozessoren (trust.bfl.ai, 10 Einträge, u. a. Azure); Gcore PCI DSS (gültig nur bis **07.11.2026**, dann neu prüfen).
- **Herabgestuft (beansprucht):** Scaleway ISO 27001 + HDS (Zertifikat nur nach Zugangsanfrage); OVHcloud ISO 27001 + 27701 (LNE nicht für 27001 akkreditiert, LNE-Datenbank 0 Treffer); DeepL ZDR (true → null, Pro-AGB 3.3.2 gilt für API Free laut 1.13) und C5 (Blog „vom BSI“ falsch, kein Dokument). Gcore SOC 2 → „SOC 2 Type 1“, beansprucht.
- **Berichtigt ohne Statuswechsel:** Hetzner ISO nur Hetzner Online GmbH, DAkkS-Urkunde jünger als Zertifikat (ungeklärt); **Hetzner BSI C5 neu** (Typ 2, 17.11.2025, gilt nicht für Inference); Infomaniak Group SA vs. Network SA, „seit 2018“ vs. 2021; Exoscale CSA Star 2 → 1, AWS-Archivierung USA; Regolo Zertifizierer AXE Register (DPA Albanien), CSA STAR nur Seeweb; Nebius ISO nur Nebius B.V., CSA STAR nur AI Cloud; IONOS AI Model Hub in keinem Zertifikat; T-Systems DEKRA Inc./ANAB, 27017/27018 = Testat, ZDR-Verweis auf v1.24 § 2.3.1; STACKIT 27017/27018 = nur SoA-Maßnahmen, Inhaber STACKIT GmbH & Co. KG vs. AVV Schwarz Digits.
- **Fall 006:** Entwurf zitiert v1.23; Zitat steht wortgleich in v1.24 unter § 2.3.1, also nichts falsch. Optional Ergänzung im Beleg-Kontext (v1.24, SHA-256 1a8fb494…). Nebenbefund: Trust-Seite verweist weiter auf v1.23. Achtung: `belege/faelle/2026-006/…pdf.txt` (unversioniert) ist der Text von v1.23.
- **Offen für Felix (Frage 217):** Strenge-Linie für weitere Einträge, die nur über Anbieterseiten „belegt“ sind (OVH SOC/C5/HDS/27017/27018, IONOS C5, DeepL Pentests, Hetzner-C5-Kopf, CSA STAR Regolo/Nebius gilt nicht für den Dienst). Mögliche Fall-Kandidaten: Gcore 27001:2013 (Website) vs. 2022 (Trust Center); T Cloud Public bewirbt Testat als „Certification“; STACKIT wirbt mit „ISO 27017 certification“.

## Neu 09.10.2026 08:50 (Dauerlauf): Handelsblatt antwortet zu Fall 003

Larissa Holzki (Handelsblatt, KI-Team) hat am 09.10. 08:29 auf die BFL-Mail von 07:31 geantwortet (Thread `1a11f24c6180123e`): Sie schaut es sich an und gibt es an Luisa Bomke weiter, die Beat-Reporterin für Black Forest Labs. Kein Handgriff nötig. Niemand sonst vom Handelsblatt anschreiben. Meldet sich Bomke, Antwort-Entwurf in die Fragen-Mail.

## Neu 09.10.2026 08:15 (Dauerlauf): DNS-Anleitung hallo@

- **`outreach/HALLO-DNS-ANLEITUNG.md` liegt bereit** (N4): Kopfzeilen ansehen, TXT `_dmarc` = `v=DMARC1; p=none; rua=mailto:hallo@belegbar.eu`, Prüfbefehl `nslookup -type=TXT _dmarc.belegbar.eu 8.8.8.8`. DKIM nicht (167 a).
- **Registrar/DNS ist INWX, nicht netcup** (NS ns.inwx.de/ns2.inwx.de/ns3.inwx.eu, abgefragt 09.10. 08:10). SPF unverändert richtig, `_dmarc` fehlt weiter.

## Neu 09.10.2026 00:15 (Dauerlauf): Tagesprüfung

- **Fälle 003/004/006:** alle 10 Quellen HTTP 200, jedes Zitat steht noch (vier Abgleich-Treffer waren Satzzeichen/Umlaute; Scaleway-Satz „…, except temporarily and exceptionally …“ ist die bekannte Korrektur aus Fall 004). Fall 006 weiter nicht öffentlich, Push = Felix.
- **Quellenlauf trocken:** 198 Quellen, 109 unverändert, 14 verändert, 0 verschwunden, 73 neu, 2 übersprungen. Neu verändert gegenüber 08.10. nur `lyceum.technology/magazine/c5-certification-gpu-cloud-germany/`: Satz jetzt „Lyceum holds no BSI C5 attestation and no ISO 27001 or SOC 2 certificate today.“ (vorher „…holds no C5 attestation, and no ISO 27001 or SOC 2 certificate today, and says so plainly“). Inhalt gleich, Profil (`unbelegt`) bleibt richtig, nichts geändert.
- **Gmail:** keine Antwort von T-Systems, Scaleway, EUrouter, Opper; Schlademann hat noch nicht geantwortet (nicht nachfassen). hallo@ ist erst nach Felix' DNS-Eintrag erreichbar.
- **Tests:** `node --test` 111/111, `node archivcheck.js` 19 Zitate in 13 Kopien ok.

## Neu 08.10.2026 20:50 (Dauerlauf): Termine Fall 006 berichtigt, Nachfassen vorbereitet

- Abschnitt „Termine“ nannte noch Mo 12.10. (Nachfassen) und Di 20.10. (Frist), gerechnet ab dem gescheiterten Versand 05.10. Richtig seit dem Neuversand 07.10.: **Nachfassen Mi 14.10., Frist Mi 21.10.**; berichtigt.
- Nachfass-Text mit drei Prüfschritten (Antwort da? Trust-Seite geändert? sonst Entwurf im Thread `1a116649cb8a70cd` von der Gmail-Adresse) steht in `outreach/mails/15-t-systems-fall-2026-006.md` „Nachfassen“. Am 14.10. legt der Dauerlauf nur den Gmail-Entwurf an, Felix sendet.

## Neu 08.10.2026 20:20 (Dauerlauf): Leitfaden für Gespräch 2 bis 5 nachgeschärft

- `outreach/gespraeche/leitfaden.md`: nach der Guard-Frage fest **8a** („Was müsste die Quelle vorweisen? Person, Haftung, Akkreditierung, Mitgliedschaft?“) und **8b** (dann ja/nein), weil Gespräch 1 nur „bedingt“ brachte. Neuer Abschnitt „Lehren aus Gespräch 1“: Geldfrage kurz („in Euro oder in Stunden?“), Wartezeit des Fachbereichs, Aussehen des Berichts, nicht-öffentliche Teile, BayLDA-Punkte erfragen statt vortragen. Raster um eine Zeile 8a/8b ergänzt.
- Entscheidungsregel unverändert. Lokal `23d0d91`, kein Push nötig (nur Doku).

## Neu 08.10.2026 19:56 (Dauerlauf): Quellenlauf nach dem Prüfpunkte-Bau

- `quellenlauf.js --trocken` (19:53): 198 Quellen, 110 unverändert, 13 verändert (dieselben wie bisher: Aleph-HF, EUrouter, Hetzner, IONOS, Opper, T-Systems; alle „kein Wortstand zur Referenz“), 73 neu (die Quellen der sieben Prüfpunkt-Felder aus `fd6da3c`).
- **Einzige „verschwunden“ war falsch:** Regolo `akkreditiert_dakks` (`http://dpa.gov.al/axe-cs007-shkurt-2026/`) ist erreichbar (curl 200, leitet auf das PDF der Akkreditierungsurkunde CS 007, 656 KB). Der Server liefert kein Zwischenzertifikat, Node meldet `UNABLE_TO_VERIFY_LEAF_SIGNATURE`. Profil unverändert.
- **Fix `c984346` (lokal, kein Push):** `pruefe()` in `lib/quellen.js` meldet unvollständige TLS-Ketten jetzt als „übersprungen, im Browser prüfen“ statt „nicht-erreichbar“; echte Netzfehler (DNS) bleiben nicht-erreichbar. Gilt auch für `linkcheck.js` und `preisarchiv.js`. 2 Tests neu (einer rot vorher), alle 9 Testdateien grün, Build ok. Danach: verschwunden 0, übersprungen 2.
- Nicht geschrieben (nur Trockenlauf): die 73 neuen Quellen kommen mit dem nächsten schreibenden Lauf in den Ledger; sinnvoll erst nach Felix' Antwort 209 (Push).

## Neu 08.10.2026 19:45 (Dauerlauf): Bau-Auftrag Schlademann ERLEDIGT, lokal, kein Push

- **Alle sieben Felder in allen 21 Profilen** (Schema `lib/pruefpunkte.js` aus `d4d4422`), jedes mit Status/Quelle/Prüfdatum 08.10.; was der Anbieter nicht schreibt, steht als „unbelegt“ mit Anmerkung, was gesucht wurde. `PRUEFPUNKTE_STRENG = true` in `build.js`: ein fehlendes Feld bricht jetzt den Build ab. Build ok, alle 9 Testdateien grün. Commit `fd6da3c`.
- **Befunde:** `outreach/pruefpunkte-befunde-2026-10-08.md` (Zählung je Anbieter, 13 Fall-Kandidaten, alte Angaben, die nicht mehr stimmen — NICHT korrigiert). Alte Felder unverändert.
- **Offen bei Felix (ALLEIN 209–211):** Push (Empf. erst nach Durchsicht), alte Angaben korrigieren (Empf. ja), welche Fall-Kandidaten als Entwurf (Empf. OVHcloud AI Endpoints und EUrouter zuerst).
- Hinweis Fall 006: Leistungsbeschreibung T-Systems ist v1.24 (30.09.2026), Profil-Anmerkung ZDR nennt noch v1.23 § 2.3.1.

## Neu 08.10.2026 18:45 (Home-Tab): Schlademann-Raster gebaut, BAU-AUFTRAG für den Dauerlauf

- **Abschrift und Raster liegen:** `outreach/gespraeche/06-schlademann-transkript.md` (beide Seiten, Zeitstempel; Aufnahme `~/Downloads/Aufnahme (1).wav`) und `06-schlademann.md` (Raster, Entscheidungsregel, offene Punkte; Vorbereitung darunter). Gespräch 1 von 5: 40 h, schriftlicher Prüfbericht, Guard-Frage **bedingt** („kommt auf die Vertrauensstellung der Quelle an“), keine Namen, Verband als Ersatz.
- **BAU-AUFTRAG (Felix 18:40: „alles bauen, von oben nach unten, die Liste vollständig“):** sieben neue Felder in dieser Reihenfolge, Liste mit Quellen in `06-schlademann.md` Abschnitt „Bau-Auftrag“: (1) `zertifikate[].anwendungsbereich`, (2) `zertifikate[].zertifizierer` + `akkreditiert_dakks`, (3) `modelle[].backup_standort`, (4) `vertrag.zweckbindung` (Filter/Marketing), (5) `vertrag.betroffenenrechte_traeger`, (6) `modelle[].vorgeschaltete_filter`, (7) `vertrag.log_frist` + `log_zweck`. Erst Schema, Tests, Build; dann 21 Profile; leer = „unbelegt“, nie weglassen. Kein Push ohne Felix' „steht“.
- **DeepL-Profil lokal geändert (nicht gepusht):** Schlademanns DORA-Befund (Backups trotz fester Region gespiegelt) als „Angabe eines Dritten, 08.10.2026, nicht belegt“ in allen vier `modelle[].anmerkung`. Felix hatte gefragt „was würdest du machen“; Empfehlung umgesetzt, rückgängig per `git checkout data/anbieter/deepl.json`.
- **Mail an Schlademann:** Gmail-Entwurf im Thread `1a0af7be7a28d5c8` (Dank, Kriterien-Anfrage schriftlich, Verbands-Vorstellung, Alarm-Angebot). **Felix sendet** (Verband = Geldgeber-Kategorie).

## Neu 08.10.2026 18:15 (Home-Tab): BvD-Gespräch Schlademann geführt, Raster noch nicht gebaut (überholt durch 18:45)

- **Gespräch 17:30 Teams hat stattgefunden.** Inhalt liegt nur bei Felix (Stichpunkte auf Papier / in `outreach/gespraeche/06-schlademann-fragen.md`). Nächste Session: Felix tippt oder diktiert die rohen Zeilen (Guard-Begründung wörtlich), daraus das Raster aus `leitfaden.md` bauen, Vorbereitungsdatei in `06-schlademann.md` umbenennen. Zählt als Gespräch 1 von 5 für die Zahler-Frage. Danach: welche der vier BayLDA-Lücken hat er bestätigt → erster Bau-Auftrag (Felix 17:05: „warum kümmern wir uns nicht um die vier Schwächen“; Antwort: nach dem Gespräch, mit seinen Worten als Feldname).
- **Push 11:45 erfolgt** (`98df2d6`): Methodik-Satz neu live, Opper mit Namen und Datum live. **Fehler Home-Tab:** Fall 006 ging damit online, obwohl der Zettel vom 07.10. abends „kein Push“ sagte (Einseiter 13:48 sagte das Gegenteil, der neuere Zettel war nicht gelesen). Um ~12:00 zurück nach `data/faelle/entwurf/` (`5bc583a`, gepusht, Seite 404, Übersicht ohne T-Systems). Memory `belegt-push-erst-neuesten-zettel-lesen` geschrieben. Seitdem 6 Commits des Dauerlaufs lokal vor origin (`d134679`), nicht gepusht; Dauerlauf hat ungesicherte Änderungen an dieser Datei und `07-marxen-…`, nichts davon vom Home-Tab angefasst.
- Vorbereitungsdateien: `06-schlademann-zettel.md` und `-einseiter.md` tragen oben einen Stand-Block 12:05; neu `06-schlademann-wissen.md` (12 Rückfragen mit Fakten, Zahlen live 12:20: 91 Änderungen/30 Tage, Beleg-Quote 20–95 %, Median 75) und `06-schlademann-fragen.md` (Ablese-Liste). Alle vier liegen im gitignorierten Ordner.
- Media-Bericht heute auf Felix' Wunsch nicht gelaufen.

## Neu 08.10.2026 17:20 (Dauerlauf): Fall 006, Zustellung an T-Systems belegt

- Neuversand 07.10. 14:37 UTC (felix.h.lind@gmail.com, Thread `1a116649cb8a70cd`): bis 08.10. 15:16 UTC (24 h 39 min) weder Delay noch Bounce. Beim ersten Versand kam die erste Delay nach ~24,5 h, damit gilt die Zustellung als belegt (Lesebestätigung gibt es nicht).
- Erstversand 05.10. von hallo@: endgültig gescheitert, „Delivery Status Notification (Failure)“ 08.10. 15:14 UTC (Nachricht `1a11c14e8b1c1bee`). hallo@ kommt bei der Telekom nicht an (Reputation), für Telekom-Adressen nur noch von Gmail senden.
- `data/faelle/entwurf/2026-006-…json`: `anbieter_informiert` 2026-10-07, `antwort_frist` 2026-10-21, Verlauf um beide Punkte ergänzt. 98 Tests, Build, Archivcheck grün. Lokal `d134679`, 6 vor origin.
- **Bleibt im Entwurf.** Zurück nach `data/faelle/`, Profil-Prüfdatum t-systems nachziehen und Push nur nach Felix' „steht“ (Frage in der Fragen-Mail), nicht vor dem BvD-Gespräch (Do 18:00). Nachfassen bei T-Systems Mi 14.10., Frist 21.10.

## Neu 08.10.2026 12:18 (Dauerlauf): EUrouter `/providers` nachgeprüft

- Seite zweimal im Abstand von 5–8 s über `pruefe()` abgerufen, Hash jeweils `6f9e2c5fc7a97e98` (kein Kippen). Weiter 15 Provider; das Profil-Zitat „All models in EUrouter use EU inference profiles or EU regional deployments to ensure data stays within the EU.“ steht wörtlich da (beim AWS-Bedrock-Eintrag). Lyceum weiter mit „EU, UK, and US inference regions“ (schon vermerkt 05:10). Kein Statuswechsel, Profil unverändert.
- Was sich gegenüber der Referenz von heute früh (`7628b4c8bea97bd8`) geändert hat: ungeklärt (kein Wortstand, keine Rohkopie). Das Banner „GLM-5.2, Kimi K3 and Opus 5 are now live“ stand schon um 05:10; wahrscheinlich sind es die Modellzähler je Provider (Katalog 143 → 145 um 10:42), belegt ist das nicht.
- Nur der Ledger-Eintrag geändert; dazu der **erste Wortstand** in `data/quellen-woerter/` (`f85460d252c92873.txt`, 536 Wörter), damit der nächste Wechsel dieser Seite mit `weg:`/`dazu:` gemeldet wird. 98 Tests grün, Build ok, Archivcheck ok. Lokal committet, Push = Felix.
- `quellenlauf.js --trocken` (12:15) meldet jetzt noch 7 verändert: Aleph-HF (3) und Opper (2) (Frage 203, H16b ab 12:30), T-Systems (2, bis H7). Dazu 2 „verschwunden“: die zwei EU-Kommissionsseiten zum GPAI-Kodex (`digital-strategy.ec.europa.eu`, „fetch failed“) — vermutlich vorübergehend, beim nächsten Lauf gegenprüfen, erst bei zweitem Fehlschlag am anderen Tag Status anfassen. **Gegengeprüft 08.10. 12:40:** beide Seiten per curl 200 (94.591 bzw. 60.288 Bytes), `quellenlauf.js --trocken` meldet verschwunden 0, unverändert 115, verändert 7 (dieselben: Aleph-HF 3, Opper 2, T-Systems 2) — Ausfall war vorübergehend, nichts anzufassen.

## Neu 08.10.2026 12:08 (Dauerlauf): Hetzner Datenschutz + Zertifizierung nachgeprüft

- Keine ältere Rohkopie, Wayback 429; beide Seiten zweimal im Abstand von 20 s abgerufen, Hash jeweils gleich (kein Kippen). Datenschutzerklärung „Stand: 14. September 2026“: Abschnitt 4.5.2 Inference mit beiden Profil-Zitaten wörtlich da („Werden im Rahmen unserer Zero-Retention-Policy nicht gespeichert.“, „… auch nicht anderweitig zum Training oder zur Verbesserung der KI-Modelle verwendet.“), Logfiles 6 Monate, Abrechnung 8 Jahre. Kein Statuswechsel.
- **Eigener Fehler berichtigt:** Das Profil nannte als ISO-27001-Scope „alle Hosting-Services und Rechenzentren“. Die Zertifizierungsseite sagt: Hetzner Online GmbH und Hetzner Finland Oy, Infrastruktur, Betrieb und Kundensupport der Rechenzentrumsparks **Nürnberg, Falkenstein und Helsinki** (USA und Singapur nicht genannt). Anmerkung angepasst, Status bleibt „belegt“. Ob der Scope früher anders formuliert war: ungeklärt (keine Rohkopie).
- Ledger: Datenschutz `1d2ba3941ff95d11`, Zertifizierung `f656a40a47bcee6d`. 98 Tests grün, Build ok, lokal `0b722a9` + Doku-Commit, damit 3 vor origin (origin stand vorher auf `5bc583a`, also zwischenzeitlich gepusht). Push = Felix.
- `quellenlauf.js --trocken` meldet jetzt noch 8 verändert: Aleph-HF (3) und Opper (2) (Frage 203, H16b ab 12:30), T-Systems (2, bis H7), EUrouter `/providers` (nächstes Stück reihum).

## Neu 08.10.2026 11:11 (Dauerlauf): Scaleway Data-Privacy nachgeprüft

- Seite gegen die Rohkopie `belege/faelle/2026-004/data-privacy-2026-10-03.html` verglichen (Wortdiff): nichts weg, dazu nur Menüwörter (neuer Doku-Link „Creating a Windows golden image“ unter Elastic Metal, fünfmal „(External link)“). Weiter „Reviewed on October 03, 2025“.
- Alle Profil-Zitate wörtlich da: „Your data is not used for training, retraining, or improving the base models“, „By default we apply a Zero Data Retention Policy …“, „stored for up to two weeks“, Aggregate „up to 6 months“. Kein Statuswechsel, Profil unverändert (Prüfdaten standen schon auf 08.10.).
- Nur der Ledger-Eintrag geändert (Hash `ef0b43c5a06763ee`, zwei Abrufe im Abstand von 20 s gleich). 98 Tests grün; lokal `eeb64db`, damit 69 vor origin. Push = Felix.
- `quellenlauf.js --trocken` meldet jetzt 10 verändert: 3 Aleph-HF-Karten und Opper (2) (kippende Hashes, H16 ab 11:30), T-Systems (2, zurückgestellt bis H7), **neu: EUrouter `/providers`, Hetzner Datenschutzerklärung und Hetzner Zertifizierungsseite**. Nächstes Stück reihum nach H16: die zwei Hetzner-Seiten von Hand lesen, dann EUrouter `/providers`.

## Neu 08.10.2026 10:58 (Dauerlauf): Wortprotokoll im Quellenlauf

- `quellenlauf.js` merkt sich jetzt zu jedem HTML-Hash, der Referenz ist, die Wortliste (`data/quellen-woerter/<sha256(url)[:16]>.txt`, ein Wort je Zeile, sortiert). Bei „verändert“ steht im Bericht unter jeder Quelle `weg:` und `dazu:` (je höchstens 12 Wörter mit Anzahl), im `--json`-Bericht als `wortDiff`. Ledger-Format unverändert. Neu in `lib/quellen.js`: `woerterInhalt`, `wortDiff`, `wortDateiName`; `hashInhalt` rechnet über dieselbe Wortliste (Hashes bleiben gleich). 98 Tests grün (+5). Trockenlauf gegen alle Quellen läuft durch.
- Wortstand entsteht erst mit dem nächsten **schreibenden** Lauf (für „unverändert“ wird er nachgetragen, für „verändert“ erst mit `--uebernehmen`). Bis dahin zeigt der Bericht „kein Wortstand zur Referenz“. Größe: etwa 40 KB je HF-/Opper-Seite, über alle ~120 Quellen grob 2–4 MB im Repo (geschätzt, ungemessen).
- **Diagnose der kippenden Hashes (H16, 08.10. 11:50, Wortprobe gegen Stand 10:56):** (1) Alle drei Aleph-HF-Karten: nur `Follow Aleph Alpha 890` → `892` (Follower-Zähler der Organisation). (2) Kolibri-1 zusätzlich: Likes 791 → 794 und umsortierte `evalResults`. Ursache ist ein Leck in `normalisiereText` (`lib/quellen.js`:70): der Tag-Filter `<[^>]+>` endet am ersten `>` innerhalb eines Attributwerts (`&lt;|im_end|>` im eingebetteten JSON), der Rest des JSON landet als „Text“ im Hash. (3) Opper `/models`: `1,156 of 1,172` → `1,154 of 1,170` (Zähler der Modelle im Katalog, steht vor „Filters“). (4) Opper `/ai-compliance`: seit 10:56 wortgleich, das Kippen um 10:40 ist dort ungeklärt; Nachprüfung 12:30. **Nachprüfung 12:30 (H16b): geklärt.** Einziger Unterschied `5` → `3` in der Spalte „Models“ der Tabelle „Data handling by provider“ („Live data … straight from the model directory“); ein Anbieter hat zwei Modelle weniger, passend zu Opper `/models` 1,172 → 1,170 zur selben Zeit. Welche Zeile (Opper oder Meta, beide jetzt 3) ist ungeklärt, Rohtext von 10:56 fehlt. Spalten Hosting/ZDR/Trains/DPA unverändert. Dieselbe Probe 12:30: HF-Follower 890 → 894, Kolibri-1 Downloads 5,775 → 6,777 und Likes 791 → 795 (beides im JSON-Leck). Für Frage 203 heißt das: bei Opper `/ai-compliance` die Spalte „Models“ ausnehmen (Zellen nach „DPA“), nicht die ganze Tabelle. Vorschlag als Frage 203 an Felix (Tag-Filter mit Anführungszeichen-Regel + gezielte Ausnahme je Quelle, keine Zahlen pauschal).

## Neu 08.10.2026 10:42 (Dauerlauf): EUrouter-Modellseite nachgezogen

- `eurouter.ai/models` aus dem Next-Datenblock gelesen: alle fünf Profilfelder gleich (USD/1M): DeepSeek V3.2 0.30/0.50, Kimi K2.6 0.66/3.50, Gemma 4 0.10/0.35, Mistral Large 3 0.55/1.65, Claude Opus 5 5.50/27.50, Opus 5.5 4.40/22.00, Sonnet 5 2.20/11.00, Sonnet 4.6 3.30/16.50, Haiku 4.5 1.10/5.50. Kein Statuswechsel. Der Hash-Wechsel kommt vom Katalog (145 statt 143 Modelle um 05:10).
- Kimi K2.6 führt als Provider weiter Inceptron, GreenPT, Tensorix und **Lyceum Technology GmbH**, obwohl Lyceum K2.6 seit 08.10. als abgeschaltet führt (Abschnitt 04:47). Weiter ungeklärt, kein Eintrag ins Profil.
- Nur der EUrouter-Eintrag in `data/quellen-hashes.json` geändert (Hash `db38cfc54f2f0a12`, zwei Abrufe gleich). 93 Tests grün, Build, Archivcheck ok (23 Zitate); lokal `c2e50f1`, damit 67 vor origin. Push = Felix.
- **Auffällig: Hashes kippen nach einer halben Stunde wieder.** Die Hugging-Face-Karten von Aleph Alpha (übernommen 10:22) und Opper `/models` + `/ai-compliance` (übernommen 10:10) melden um 10:40 schon wieder „verändert“, bei zwei Abrufen hintereinander gleich. Vermutung, ungeklärt: Zähler im sichtbaren Text (HF: Downloads/Likes; Opper: ?). Folge: diese Quellen melden jeden Tag falschen Alarm. Vorschlag für ein eigenes Stück: die geänderten Wörter je Quelle protokollieren (`quellenlauf.js` merkt sich die Wortmenge) und erst dann über eine Ausnahme entscheiden; Zahlen nicht pauschal ausblenden, sonst fallen Preisänderungen durch.
- `quellenlauf.js --trocken` meldet jetzt 8 verändert: die 3 Aleph-HF-Karten, Opper (2), **Scaleway Data-Privacy-Seite** (neu seit dem letzten Lauf, `training_opt_out` +1 Feld) und die zwei T-Systems-Seiten (zurückgestellt bis H7). Nächstes Stück reihum: die Scaleway-Data-Privacy-Seite von Hand lesen.

## Neu 08.10.2026 10:22 (Dauerlauf): Hash-Ledger Aleph Alpha nachgezogen

- Die drei Hugging-Face-Karten (Kolibri-1, Pharia-1-Embedding-4608-control, Pharia-1-LLM-7B-control) neu gelesen. Laut HF-API ist der Repo-Stand unverändert (Kolibri `lastModified` 03.10.2026, Pharia 2024), die Hash-Änderung seit 03:16 kommt also nur vom Seitenrahmen. Kolibri: Apache 2.0, nicht zugangsbeschränkt, 78 Mrd. Parameter, 3,46 Mrd. aktiv je Token, Kontext 1.048.576 Token; Pharia: Open Aleph License, nicht zugangsbeschränkt. Kein Statuswechsel.
- Berichtigt: In der Kolibri-Anmerkung stand „davon 3 Mrd. aktiv“, jetzt steht dort „3,46 Mrd. aktiv je Token“, wie auf der Karte.
- Nur diese drei Ledger-Einträge geschrieben, die neuen Hashes waren über zwei Abrufe stabil. 93 Tests grün, Build, Archivcheck ok (23 Zitate); lokal `53ff806` + `173f50a` (64 vor origin, Push = Felix).
- `quellenlauf.js --trocken` meldet danach 3 verändert: **EUrouter Modellseite** (`eurouter.ai/models`, 5 Felder, neu seit diesem Lauf) und die zwei T-Systems-Seiten (zurückgestellt bis H7). Nächstes Stück reihum: die EUrouter-Modellseite von Hand lesen (Preise der fünf Felder).

## Neu 08.10.2026 10:10 (Dauerlauf): Hash-Ledger Opper AI nachgezogen

- Rest aus der Opper-Nachprüfung 07:07. Vier Quellen neu abgerufen und vor dem Übernehmen von Hand geprüft: Security Overview („Last updated on: 2026-10-05“, Trainingssatz ohne den Halbsatz zu Providern), Compliance („EU routes on every plan“, „leave the EU only on a route hosted elsewhere“, Tracing-Satz; „EU data residency on every plan“ weg), Modelle (alle fünf Profilpreise gleich), DPA (gegen Wayback 20261005053857 nur der Menüpunkt „Sovereign alternatives“ neu). Trust Center hash-gleich.
- Nur die Opper-Einträge in `data/quellen-hashes.json` geändert, kein `--uebernehmen` (das hätte alle gemeldeten Quellen übernommen). Durch das Sortieren rücken die vier STACKIT-Adressen vom 08:35-Lauf an ihren Platz, Inhalt gleich. 93 Tests grün, Build, Archivcheck ok (23 Zitate); lokal `b036e84`, damit 61 vor origin. Push = Felix.
- `quellenlauf.js --trocken` meldet danach noch 5 verändert: drei Hugging-Face-Seiten von Aleph Alpha (Kolibri-1, Pharia-1-Embedding, Pharia-1-LLM-7B) und zwei T-Systems-Seiten (Enterprise Trust, Zertifikate; zurückgestellt bis Fall 006 zugestellt ist, ALLEIN H7). Dazu 7 neue Adressen ohne Ledger-Eintrag. Nächstes Stück reihum: Aleph-Alpha-Modellseiten von Hand lesen.

## Neu 08.10.2026 09:45 (Dauerlauf): Linkcheck nach den Nachprüfungen

- `node linkcheck.js`: 130 Quellen (00:15: 129; neu Mistral Large 4), 129 ok, 1 übersprungen (DeepL Trust Center), **0 Befunde**. 11 Weiterleitungen, nur Website-Wurzeln, Lyceum `/index.html`, Mistral Terms → `/get-started/`, OVH-PDFs → DE-8.0/DE-3.0.
- Der Punkt „OVH-PDFs: Inhalt geändert? ungeklärt, 28.10. hashen“ aus der Zwischenmessung ist erledigt: laut OVHcloud-Nachprüfung 06:11 byte-gleich zum 05.10. In `MESSUNG.md` nachgetragen (gitignored).
- Für den Kill-Check 13./14.10. bleibt beim Dauerlauf: Technik, Linkcheck, Websuche 5 Fragen, Markensuche, Fall 006/004. Felix: Search Console + Perplexity/ChatGPT (~20 min).

## Neu 08.10.2026 09:30 (Dauerlauf): Kopfdatum-Nachzügler

- Black Forest Labs und Requesty waren schon um 01:03 bzw. 02:06 Eintrag für Eintrag nachgeprüft (`9123e6a`, Requesty-Commit 02:06), nur das Kopfdatum stand noch auf 20.08./19.08. → auf 08.10. gesetzt. 93 Tests grün (`node --test test/*.js`; `node --test test/` meldet unter Windows einen Scheinfehler), Build, Archivcheck ok (23 Zitate); lokal `0f91e0b`, damit 58 vor origin. Push = Felix.
- Einziger Kopfdatum-Nachzügler jetzt t-systems (19.08.), bewusst zurückgestellt bis Fall 006 zugestellt ist (ALLEIN H7, Do nachmittags).
- Presse: Jürgen Hill (Computerwoche, STACKIT-Mail 07:32) ist laut Abwesenheitsnotiz bis Mo 12.10. weg, Vertretung Manfred Bremmer. Nicht an die Vertretung weiterleiten, nicht nachfassen vor 19.10. (`allein/ENTWUERFE-LISTE.md` Tag 3 Nr 10).

## Neu 08.10.2026 09:20 (Dauerlauf): Fachantwort zu Fall 2026-004 (intern)

- Fachantwort eines Anwalts zu Fall 2026-004 (manuelles Abuse Monitoring) ist eingegangen. Wortlaut, Name und Auswertung nur intern (`outreach/gespraeche/08-…`, seit 09.10. nicht mehr im Repo; Vertraulichkeits-Hinweis).
- Stützt Fall 2026-004 (Scaleway) in der Sache. Grenzen: gilt für Berufsgeheimnis-Inhalte und nur, wenn der Kunde die Einsicht nicht genehmigt hat; ob Scaleways Vertragswerk eine solche Genehmigung enthält, ist ungeklärt; kein Gutachten zum Fall.
- Dank-Entwurf mit Zitat-Bitte lag im Gmail-Thread, Felix entscheidet (Frage 200). Ohne Erlaubnis nichts verwenden.

## Neu 08.10.2026 09:15 (Dauerlauf): IONOS nachgeprüft

- Kein Statuswechsel. Modellseite: dieselben sieben Modelle mit denselben Preisen je 1M In/Out (Llama 3.3 70B 0,65/0,65; Mistral Small 24B 0,10/0,30; Mistral Nemo 0,15/0,15; gpt-oss-120b 0,15/0,65; Qwen3.5-397B-A17B 0,60/3,60; Qwen3.5-9B 0,10/0,15; Qwen3.8-27B 0,40/2,70 €), Llama 3.1 8B weiter nicht gelistet.
- Data-Handling-Doku: alle Profil-Zitate wörtlich da („not used to train, fine-tune …“, „never logged“, „not written to any log or to persistent storage“, „stateless per request“, „No third-party sub-processors“, „falls within the scope of BSI C5“, Metadaten Zeitstempel/Modell/Tokenzahl). AI-Act-Seite: „provider of the system within the meaning of Article 3(3)“ und „irrespective of whether we modify it“ da, „Distributor“ und „Code of Practice“ weiter nicht.
- Zertifikate: ISO 27001 TÜV NORD (Nr. 44 121 160247-012, gültig 19.04.2025–18.04.2028) und IT-Grundschutz (BSI-IGZ-0730-2025, bis 13.09.2028) aus den PDFs bestätigt; C5:2020 Typ 1 vom 28. Mai 2026 (PwC, 33 Services) auf der Zertifikatsseite. AVV-Seite und Subunternehmer-Liste v4.5 hash-gleich zum 03.10.
- Vier Seiten-Hashes neu (Modellseite, Zertifikatsseite, beide Doku-Seiten) bei gleichem Inhalt der Belegstellen; Ledger nachgezogen. Archivkopien 20261008070121 (Data Handling), 20261008070200 (AI Act), 20261008070354 (Zertifikate); Modellseite Save ohne Antwort (Zeitüberschreitung), ungeklärt ob gespeichert.
- 15 Prüfdaten + Kopfdatum (stand noch auf 19.08.) auf 08.10.; 93 Tests grün, Build, Archivcheck ok (23 Zitate); lokal `c39b6d7` + `eac8652`, damit 55 vor origin. Push = Felix. Kopfdatum-Nachzügler jetzt nur noch black-forest-labs (20.08.), requesty (19.08.) und t-systems (19.08., wegen Fall 006 zurückgestellt) → nächste reihum: black-forest-labs, dann requesty.

## Neu 08.10.2026 08:55 (Dauerlauf): Fachantwort Vergaberecht (intern)

- Fachantwort eines Anwalts zur Vergabefrage ist eingegangen. Wortlaut, Name und Auswertung nur intern (`outreach/gespraeche/07-…`, seit 09.10. nicht mehr im Repo). Veröffentlichung abgelehnt.
- Dank-Mail mit Zitat-Bitte (Frage 199).
- **15:40: Zitat abgelehnt.** Dank-Mail ging 11:30 raus (`1a11ad92bc2bb1ed`); Veröffentlichung abgelehnt (Nachricht `1a11bbec49207296`). Nichts davon auf die Seite, auch nicht namenlos als „ein Fachanwalt sagt“. Seite geprüft: enthält nichts von ihm.

## Neu 08.10.2026 08:35 (Dauerlauf): STACKIT nachgeprüft

- Kein Statuswechsel. Modellseite (vier Modelle, Kategorien Plus/Premium), englische Produktseite und Zertifikatsseite hash-gleich zum 03.10.; Kategoriepreise je 1M In/Out unverändert (Standard 0,15/0,25, Plus 0,45/0,65, Premium 1,50/1,75 €).
- AVV Version 2.4.2 und Leistungsschein AI Model Serving 1.3 byte-gleich zu den Archivkopien 20261004232738 / 20261004232816; die AGB-Seite verlinkt beide weiter.
- **Leistungsschein 1.4 (gültig ab 06.11.2026)** liegt unter `/de/asset/download/61500/…_1-4.pdf`, hatte noch keine Archivkopie → neu web.archive.org/web/20261008063123 (byte-gleich). Speicher-, Log- (30 Tage E-Mail und Subject ID) und Backup-Sätze wortgleich zu 1.3. Neu nur: Private/Public-Preview-Modelle ohne SLA, jederzeit ohne Vorankündigung einstellbar; keines der vier Profilmodelle ist als Preview markiert. In der Modell-Anmerkung vermerkt.
- AI Act: Nachsuche in Produktseite DE/EN, Zertifikatsseite, AGB-Seite und Leistungsschein 1.4 ohne Treffer, bleibt unbelegt.
- 15 Prüfdaten + Kopfdatum (stand noch auf 19.08.) auf 08.10.; Ledger: 4 Seiten „gesehen“, 4 Adressen neu (AGB-Seite, AVV, Leistungsschein 1.3 und 1.4), Hashes ohne `quellenlauf.js` mit `hashInhalt` aus `lib/quellen.js` gerechnet; 93 Tests grün, Build, Archivcheck ok; lokal `3ff30e4` + `94e95e7`, damit 52 vor origin. Push = Felix. Stand der Prüfdaten (ältester Eintrag je Profil, Kopfdatum mitgezählt): Kopfdatum noch August bei ionos, requesty, t-systems (19.08.) und black-forest-labs (20.08.), obwohl deren Einträge meist jünger sind; einzelne ältere Einträge bei lyceum (03.10.), deepl (04.10.), mistral (05.10.); alle übrigen 08.10. → nächste reihum: Kopfdatum-Nachzügler einzeln nachprüfen (black-forest-labs, requesty, ionos; t-systems wegen Fall 006 zurückgestellt), danach Kill-Check-Vorbereitung (`MESSUNG.md`).

## Neu 08.10.2026 07:07 (Dauerlauf): Opper AI nachgeprüft

- Kein Statuswechsel. Die fünf Profilpreise (USD/1M, „Pricing from“) unverändert: Opus 5 5/25, Sonnet 5 2/10, GPT-5.4 2.5/15, DeepSeek V4 Pro 0.87/1.74 (0813: 1.06/2.60), Gemini 3.5 Flash 1.5/9.
- **Security Overview neu „Last updated on: 2026-10-05“:** Trainingssatz jetzt nur „Opper does not use customer data to train models.“; der Halbsatz „and does not share it with providers for training“ (Fassung 28.09., Wayback 20261005053924) ist weg. Er widersprach ohnehin Oppers eigener Subprozessoren-Liste (vier Modellanbieter + Exa dürfen trainieren). Training-Opt-out bleibt „belegt“ für Opper selbst, Anmerkung umgeschrieben. Neue Kopie 20261008050437.
- **Compliance-Seite umgebaut, ohne „Last updated“:** „EU data residency on every plan“ ersetzt durch „EU routes on every plan“ und „Prompts and completions leave the EU only on a route hosted elsewhere, which a bare model name may pick“. Der in der AVV-Anmerkung notierte Widerspruch zum DPA ist damit aufgelöst; AI-Act-Zitat auf den neuen Wortlaut („plus full traces of each call once you turn tracing on“). Neue Kopie 20261008050530.
- DPA textgleich zu Wayback 20261005053857 (nur zwei neue Menüpunkte „Sovereign AI“, „OpenRouter alternatives“); Trust Center textgleich zu 20261005053951 (Zertifikat 160926-1, evroc-Zeile, kein SOC 2).
- 13 Prüfdaten + Kopfdatum (stand noch auf 19.08.) auf 08.10.; 93 Tests grün, Build, Archivcheck ok (23 Zitate); lokal `e230915` + `22ba000`, damit 50 vor origin. Push = Felix. **Hash-Ledger für Opper NICHT fortgeschrieben** (der Lauf meldet Security Overview, Compliance, Modelle beim nächsten `quellenlauf.js` als verändert; dann nach Blick in diesen Abschnitt `--uebernehmen`). Achtung: `node quellenlauf.js` hat keine Hilfe-Option, jeder Aufruf ohne `--trocken` schreibt Ledger und Prüfdaten aller Profile (07:0x versehentlich passiert, per `git checkout` zurückgenommen). Ältestes Prüfdatum jetzt 05.10.: stackit (t-systems wegen Fall 006 zurückgestellt) → nächste reihum STACKIT.

## Neu 08.10.2026 06:53 (Dauerlauf): Nebius nachgeprüft

- Kein Statuswechsel. Die drei Profilpreise bei OpenRouter unverändert (gpt-oss-120b 0.15/0.60, Qwen3 235B 0.20/0.60, GLM 5.1 1.40/4.40 USD/1M); Llama 3.3 70B weiter nicht gelistet, Liste jetzt 12 Modelle (neu u. a. DeepSeek V4 Pro 0813, Hermes 4 405B).
- Serverless-Doku wortgleich: Region „Global“, Ort wechselt ohne Ankündigung, feste Region nur per Dedicated Endpoint.
- DPA hash-gleich zum 03.10.; Subprozessoren-Liste Token Factory weiter Fassung 23.09.2026 (RunPod, BoostRun, Shadeform, Axe Compute); Supplemental Terms weiter 15.09.2026, Ziffer 5.1 (Speculative Decoding) und 5.4 (Opt-out) wortgleich. Produktseite weiter ohne Aussage zu Training/Retention. Trust Center mit denselben Zertifikaten, ISO 42001 weiter „certified“.
- GPAI-Zeile ohne Prüfdatum, nicht neu gesucht. Legal Quick Guide nicht neu abgerufen (keine Quell-URL im Profil).
- 14 Prüfdaten + Kopfdatum (stand noch auf 19.08.) auf 08.10.; Ledger: 3 Hashes nach Handprüfung übernommen (OpenRouter, Trust Center, Produktseite), 4 neue Adressen; 93 Tests grün, Build, Archivcheck ok (23 Zitate); lokal `204682e` + `6cc6f14`, damit 48 vor origin. Push = Felix. Ältestes Prüfdatum jetzt 05.10.: opper-ai, stackit (t-systems wegen Fall 006 zurückgestellt) → nächste reihum Opper AI.

## Neu 08.10.2026 06:30 (Dauerlauf): Mistral nachgeprüft

- Kein Statuswechsel. Die fünf Profilpreise (USD/1M) unverändert: Large 3 0.5/1.5, Medium 3.5 1.5/7.5, Small 4 0.15/0.6, Codestral 0.3/0.9, Ministral 3 8B 0.15/0.15.
- **Preisseite umgezogen:** `mistral.ai/pricing/api` (am 05.10. noch eigene Seite, Wayback 20261005092417) leitet jetzt auf `docs.mistral.ai/inference/pricing` um; Quelle in allen Modelleinträgen umgestellt (Wayback 20261008042634).
- **Neu: Mistral Large 4**, vorgestellt 06.10.2026 als „public preview“ (Listenpreis 1.36/4.18 USD, Aktionspreis 0.68/2.09, Dauer ungeklärt; laut Ankündigung in Mistrals eigenen Rechenzentren in Europa). Als Eintrag ergänzt. **Für Käufer wichtig:** Commercial Terms (25.09.2026) Ziffer 4.3: bei „Labs or Preview Models“ darf Mistral Daten zum Training nutzen, Opt-out und ZDR gelten nicht. Das steht jetzt im Large-4-Eintrag und bei Training. Möglicher Stoff für einen Hinweis/Beitrag (das neue Flaggschiff fällt aus ZDR heraus), kein Fall: Mistral sagt es selbst im Vertrag.
- ZDR-Doku satzgleich zur Wayback-Kopie vom 05.10. (20261005091937) bis auf den Admin-Pfad („› API › Privacy“ → „› Vibe › Privacy“). Hilfe-Artikel 347638, 455207, 455208, 347629, 347617, 347612 mit unverändertem Datum und Wortlaut der zitierten Sätze. DPA, Terms-Übersicht, Trust-Center-Seite hash-gleich.
- GPAI-Signatarliste nicht neu belegt (Seite nennt Mistral nur einmal ohne lesbaren Listenkontext); Prüfdatum dort bleibt 05.10.
- 12 Prüfdaten + Kopfdatum (stand noch auf 19.08.) auf 08.10., ein Eintrag neu; Ledger: 6 Hashes nach Handprüfung übernommen, 2 neue Adressen; 93 Tests grün, Build, Archivcheck ok (23 Zitate); lokal `ce0e4ee` + `52d6658`, damit 46 vor origin. Push = Felix. Ältestes Prüfdatum jetzt 05.10.: nebius, opper-ai, stackit (t-systems wegen Fall 006 zurückgestellt) → nächste reihum Nebius.

## Neu 08.10.2026 06:11 (Dauerlauf): OVHcloud nachgeprüft

- Kein Statuswechsel. Katalog inhaltsgleich zur Wayback-Kopie vom 05.10. (20261005073306): 20 Einträge, gleiche Namen und Preise; die sechs Profilpreise (Llama 3.3 70B 0,67/0,67 €, gpt-oss-120b 0,08/0,40 €, gpt-oss-20b 0,04/0,15 €, Qwen3.5-397B 0,60/3,60 €, Qwen3.6-27B 0,40/2,70 €, Qwen3.5-9B 0,10/0,15 €) unverändert. Qwen3.8-27B (0,40/2,70 €) stand schon am 05.10. im Katalog, nicht im Profil.
- Vertrags-PDFs (Besondere Bedingungen Public Cloud DE, DPA DE-8.0, Subprozessoren DE) byte-gleich zu den Abrufen vom 05.10.; Anhang-10-Sätze zu Training und Speicherung unverändert.
- **Produktseite AI Endpoints geändert** (gegen Wayback 20261005073237): Trainingssatz jetzt „Your data is never used to train our models, and we only keep what is strictly necessary for billing.“ (vorher „never be used to train or improve our AI models“, „or improve“ entfallen). Neu: „ISO 27001, SOC 2 Type II, and HDS (health data) certified service“ für den Dienst AI Endpoints selbst; kein Bericht und kein Geltungsbereich-Dokument verlinkt. Beides in den Anmerkungen (Training, ISO 27001, SOC 1/2/3, HDS) vermerkt, neue Archivkopie web.archive.org/web/20261008040757 (trägt beide Sätze).
- 19 Prüfdaten + Kopfdatum (stand noch auf 19.08.) auf 08.10.; Ledger: 3 Hashes nach Handprüfung (Katalog, Produktseite, Compliance), 3 weitere nur „gesehen“; us.ovhcloud.com/legal/faqs/gdpr-compliance hat einen neuen Hash, wird im Profil aber nicht mehr zitiert (nicht übernommen). 93 Tests grün, Build; lokal `89c2894` + `d7cc1c6`, damit 44 vor origin. Push = Felix. Ältestes Prüfdatum jetzt 05.10.: mistral, nebius, opper-ai, stackit (t-systems wegen Fall 006 zurückgestellt) → nächste reihum Mistral.

## Neu 08.10.2026 05:49 (Dauerlauf): GreenPT nachgeprüft

- Kein Statuswechsel. Preise der sechs Profilmodelle unverändert (green-r 0,35/0,95 €, mistral-small-3.2 0,20/0,40 €, gemma4 0,50/1,50 €, glm-5.2 1,55/4,60 €, kimi-k3 3,30/16,50 €, green-embedding 0,20 €). Model-Cards, Regions, Data Processors, /sustainability, /privacy-policy, /privacy und ToS sind textgleich zu den lokalen Kopien vom 05.10. (`/tmp/gp`), bis auf das Banner („Meet Metis, our decision model“ statt „EU and US regions are now available“) und minimax-m2.5 → minimax-m3 (0,44/2,20 €, 1M; nicht im Profil).
- **Neu im Profil als `beansprucht`: SOC 2 Type II.** greenpt.com/privacy, Abschnitt „Security Certifications“: „Our infrastructure maintains ISO 27001 and SOC 2 Type II certifications“ (stand schon am 05.10. da, war nicht erfasst). Wortlaut meint die Infrastruktur, kein Bericht verlinkt; Scaleways Seite „Security & Compliance“ nennt am 08.10. kein SOC 2, für Verda ungeklärt. Gleiches Muster wie ISO 27001 (Fall 2026-002); kein neuer Kandidat, kein Entwurf.
- Footer unverändert „Verified by independent audit · GDPR compliant · ISO 27001 · EU Hosted“ (für H14/B3 vor dem Versand trotzdem neu abrufen).
- 14 Prüfdaten + Kopfdatum (stand noch auf 20.08.) auf 08.10.; Ledger: 4 Hashes nach Handprüfung übernommen, /privacy und /privacy/processor neu; 93 Tests grün, Build, Archivcheck ok; lokal `310f1fd` + `e2e1722`, damit 42 vor origin. Push = Felix. Ältestes Prüfdatum jetzt 05.10.: mistral, nebius, opper-ai, ovhcloud, stackit (t-systems wegen Fall 006 zurückgestellt) → nächste reihum Mistral.

## Neu 08.10.2026 05:50 (Dauerlauf): Nordference nachgeprüft

- Kein Statuswechsel. Die Website ist weiter eine Ein-Seiten-Anwendung mit demselben Skript-Bündel `assets/index-CGzvo87P.js`; es ist byte-gleich zur Archivkopie web.archive.org/web/20261005012917 (entpackt, SHA-256 e68e235c…). Damit unverändert: Preise der fünf Modelle, „Zero retention for inference data“, „never stored or used for training“ (nur Werbetext, bleibt beansprucht), DPA nur für Enterprise auf Anfrage, „EU AI Act Ready“-Häkchen, ISO 27001/SOC 2 nur als Schlagworte, Dokumente „January 28, 2026“.
- `api.nordference.ai` weiter nicht im DNS (NXDOMAIN 08.10.), Zugang weiter nur „Request Beta Access“. Ledger-Hashes der drei Adressen gleich.
- 8 Prüfdaten + Kopf auf 08.10., 93 Tests grün, Build, Archivcheck ok, lokal `f816fd1` + `5faad3d` (40 vor origin, Push = Felix). Ältestes Prüfdatum jetzt 05.10.: opper-ai, mistral, nebius, stackit, ovhcloud, greenpt (t-systems wegen Fall 006 zurückgestellt).

## Neu 08.10.2026 05:35 (Dauerlauf): Exoscale nachgeprüft

- Kein Statuswechsel. Preistabelle Dedicated Inference unverändert (gpt-oss-20b 1,34 €/h; gpt-oss-120b 2,15 bzw. 4,55 €/h; Qwen3-Coder-480B 15,97 €/h). On-Demand Inference weiter „Coming soon“ mit Warteliste, Satz „Detailed pricing tiers … will be published upon launch“ steht; Batch Inference weiter angekündigt.
- DPA (Aiven Oy, 30 Tage Vorankündigung, Löschung binnen 10 Werktagen), Terms (gültig ab 02.07.2026, Log-Ausnahme wörtlich), Compliance-Seite (27001/27017/27018, SOC 2, C5, TISAX, HDS) und Zitat „Fully dedicated down to logs and GPU memory“: hash- bzw. wortgleich. Training und AI Act kommen weiter nirgends vor.
- CSA STAR: Selbstauskunfts-Zitat steht; Register-Suche „exoscale“ rendert clientseitig, Eintrag weiter nicht gefunden → bleibt „beansprucht“, ungeklärt.
- 14 Prüfdaten auf 08.10.; drei neue Adressen (/inference/dedicated/, /inference/on-demand/, /compliance/csa-star/) in den Hash-Ledger, inhaltsgleich zu den alten. 93 Tests grün, Build, Archivcheck ok, lokal `1e1beaf` + `dcc909c` (38 vor origin, Push = Felix). Nächste reihum (ältestes Prüfdatum 05.10.): GreenPT, Mistral, Nebius, Nordference, Opper, OVHcloud, STACKIT, T-Systems.

## Neu 08.10.2026 05:10 (Dauerlauf): EUrouter nachgeprüft

- **Kein Statuswechsel.** Die fünf Profilpreise (USD/1M) stehen unverändert in den eingebetteten Modelldaten von `/models`: DeepSeek V3.2 0.30/0.50, Kimi K2.6 0.66/3.50, Gemma 4 0.10/0.35, Mistral Large 3 0.55/1.65, Claude Opus 5 5.50/27.50, Opus 5.5 4.40/22.00, Sonnet 5 2.20/11.00, Sonnet 4.6 3.30/16.50, Haiku 4.5 1.10/5.50. Die Seite selbst zeigt die Tabelle erst nach Skript; Preise aus dem Next-Datenblock gelesen.
- Katalog jetzt **143 Modelle** (neu u. a. Kimi K3 $3.00/$15.00, GLM 5.2/5.3; Banner „GLM-5.2, Kimi K3 and Opus 5 are now live“). Nicht ins Profil übernommen, das Profil führt eine Auswahl.
- **Auffällig, ungeklärt:** EUrouter nennt **Lyceum** weiter als Provider für Kimi K2.6, Lyceum selbst führt K2.6 seit heute als abgeschaltet (Abschnitt 04:47). Die Providerseite beschreibt Lyceum außerdem mit „EU, UK, and US inference regions“, Lyceums eigene Seiten sagen „Paris and Finland“. Ob EUrouter K2.6 noch über Lyceum routet: ungeklärt (nur mit API-Schlüssel prüfbar). Kein Eintrag ins Profil.
- DPA hash-gleich zum 03.10. („Last updated: May 2026“); AGB („June 2026“), Datenschutz (Version 1.2, 25.08.2026) textgleich zum Abruf 05.10.; Providerseite weiter 15 Provider (US-Sitz: AWS Bedrock, Microsoft Foundry); `/security`, `/trust`, `/compliance`, `/ai-act` weiter 404; AI-Act-Satz der Startseite wörtlich.
- 12 Prüfdaten + Kopfdatum (stand noch auf 19.08.) auf 08.10.; Hashes Modell- und Providerseite nach Handprüfung übernommen; 93 Tests grün (`node --test test/*.test.js`); Build; Archivcheck ok (23 Zitate); lokal `ee30e3a` + `ab9ac01`, damit 36 vor origin. Push = Felix. Nächste Nachprüfung reihum: exoscale, dann greenpt, mistral, nebius, nordference, opper-ai, ovhcloud, stackit.

## Neu 08.10.2026 04:47 (Dauerlauf): Lyceum nachgeprüft

- **Modellseite umgezogen, ohne dass der Linkcheck es merkt.** `/products/inference/models/` liefert HTTP 200, enthält aber nur „Redirecting… This page has moved to /models/“ (Weiterleitung per Skript). Quelle im Profil auf `https://lyceum.technology/models/` umgestellt. Gleiche Lücke kann bei anderen Anbietern stecken: `linkcheck.js`/`quellenlauf.js` erkennen Skript-Weiterleitungen nicht (Textlänge der Seite ~50 Zeichen wäre das Zeichen); nicht gebaut, nur notiert.
- **Zwei Modelle abgeschaltet** (Retired-Liste auf `/models/`, „Requests to their model IDs return 404 model not found“): Kimi K2.6 → Nachfolger **Kimi K3** ($3.00/$15.00, 1M), Qwen3 235B A22B → Nachfolger **Qwen3.8 2.4T A95B** ($2.50/$6.00, 256K). Alte Einträge auf „unbelegt“ mit Verlauf, Nachfolger als „belegt“ ergänzt. DeepSeek V4 Pro unverändert $1.75/$3.50 (Kontext dort „Not confirmed“). Katalog: 23 Modelle (Kurzbeschreibung sagte „30+“, berichtigt).
- **Standort geändert:** C5-Artikel („Last updated 3 August 2026“) und Residency-Artikel sagen jetzt „European data centres in Paris and Finland“, ausdrücklich ohne deutsches Rechenzentrum; „Spain, Paris and the Nordics“ (Stand 04.10.) steht dort nicht mehr. Alle belegten Modelle auf „EU (Paris, Finnland)“.
- Kein C5/ISO 27001/SOC 2 weiter wörtlich; Subprozessoren weiter nur „on request“; AGB Ziff. 5.2 (Inference: nicht gespeichert, kein Training) wörtlich gleich, Modellseite sagt dazu „Prompts and outputs are processed, not stored, and never used for training“. Trust Center Hash gleich.
- 13 Prüfdaten + Kopfdatum (stand noch auf 19.08.) auf 08.10.; Hashes Modellseite, C5-Artikel, AGB nach Handprüfung übernommen; 93 Tests grün; Build; Archivcheck ok; lokal `cad7144` + `91b6def`, damit 34 vor origin. Push = Felix. Nächste Nachprüfung reihum: die neun vom 05.10. (eurouter, exoscale, greenpt, mistral, nebius, nordference, opper-ai, ovhcloud, stackit), beginnend mit eurouter.

## Neu 08.10.2026 04:35 (Dauerlauf): Infomaniak nachgeprüft

- **Kein Statuswechsel, ein Modell fehlte.** Die Preisseite führt sieben LLM; im Profil standen seit 20.08. sechs. Neu ergänzt: **Ministral-3-14B-Instruct-2512**, CHF 0.30 / 0.40 je 1 Mio. Token, 100k Kontext, Bild-Text zu Text, nicht Beta (Modellseite `/en/hosting/ai-services/open-source-models`). Seit wann Infomaniak es anbietet: ungeklärt (Wayback-Kopie der Preisseite 24.09. enthält die Modellliste nicht, sie wurde damals nachgeladen). Wayback-Save von Preis- und Modellseite angestoßen (HTTP 302).
- Übrige sechs Preise, Kontextlängen und Beta-Kennzeichen wörtlich gleich; Photomaker V2 (CHF 0.30/min) in die Whisper-Anmerkung. Bedingungen der LLM API (Fassung „Review of 07/10/2025“) Art. 6 und 7 wörtlich; DPA-PDF Hash gleich (weiter kein Unterauftragnehmer-Anhang, die Datenschutzerklärung verweist weiter darauf); Zertifikatsseite: ISO 27001:2022, 9001, 14001, 50001, B Corp, Swiss Hosting, kein SOC 2.
- Hashes der drei HTML-Seiten (Preise, Produkt, Zertifikate) nach Handprüfung übernommen; die Seiten sind ~2,6 MB mit Menü/Skript, der Hash wechselt auch ohne Sachänderung.
- 17 Prüfdaten + Kopfdatum (stand noch auf 20.08.) auf 08.10.; 93 Tests grün; Build; Archivcheck ok (23 Zitate); lokal `8548e1b` + `81919ba`, damit 32 vor origin. Push = Felix. Nächste Nachprüfung reihum: Lyceum.

## Neu 08.10.2026 04:15 (Dauerlauf): Hetzner nachgeprüft

- **Kein Statuswechsel, aber zwei eigene Fehler im Profil berichtigt.** (1) Das Profil nannte Qwen3.6-35B-A3B-FP8 als „einziges Modell“; die Inference-Doku führt zwei: dazu **Qwen3.8-27B** (dicht, 262.144 Token, Text/Bild, Apache 2.0). Das zweite Modell steht schon in den Wayback-Kopien vom 20.08. und 26.09.; Doku-Hash seit 28.08. unverändert, der Fehler war also unserer, nicht eine Änderung bei Hetzner. Zweites Modell als eigene Zeile ergänzt (0 €, `belegt`). (2) Die ZDR-Anmerkung sagte „Die Inference-Doku selbst sagt dazu nichts“; die FAQ sagt „We do not store the content of request and response“ (gespeichert nur Nutzungsdaten wie Zeitstempel, Token-Zahlen). Anmerkung berichtigt. Zum Training sagt die Doku weiter nichts (Anmerkung dort bleibt).
- **Datenschutzerklärung** (Stand 14. September 2026), Abschnitt 4.5.2: „Werden im Rahmen unserer Zero-Retention-Policy nicht gespeichert. Sie werden auch nicht anderweitig zum Training oder zur Verbesserung der KI-Modelle verwendet.“ wörtlich; Logfiles 6 Monate, Abrechnungsdaten 8 Jahre. Erstmals im Hash-Ledger (`014337646b1bc9f5`).
- **Preis:** weiter „free of charge“, solange experimentell; Ankündigung per E-Mail vor einer Änderung. DPA, Subunternehmerliste, Zertifizierungsseite: Hash gleich.
- 8 Prüfdaten + Kopfdatum (stand noch auf 19.08.) auf 08.10.; 93 Tests grün; Build; Archivcheck ok; lokal `888d5b3` + `c5c974f`, damit 30 vor origin. Push = Felix. Wayback-Save der Doku angestoßen. Nächste Nachprüfung reihum: Infomaniak, dann Lyceum.
- **Lehre fürs Nachprüfen:** Bei unveränderten Hashes trotzdem einmal den Text gegen jede Profil-Anmerkung lesen; der Hash sagt nur, dass sich nichts geändert hat, nicht, dass wir richtig abgeschrieben haben.

## Neu 08.10.2026 03:50 (Dauerlauf): Gcore nachgeprüft

- **Kein Statuswechsel.** MSA (gcore.com/legal, „Last updated: June 17, 2026“) textgleich zur Archivkopie `20261004055218`, nur Banner/Menü anders; alle zitierten Stellen wörtlich. Whisper-Seite, Pressemitteilung, Blog 20.11.2024 und Billing-Doku („charged per minute“) in der Sache unverändert; weiter keine Token-Preise.
- **Neu: Kandidat Nr. 40 (mittel)** in `outreach/fall-kandidaten.md`: gcore.com/infrastructure sagt „ISO/IEC 27001:2013 certified“ (Wayback `20261008014212`); nach IAF MD 26:2023 sind alle 2013-Zertifizierungen seit 31.10.2025 abgelaufen oder zurückgezogen. Ob Gcore ein 27001:2022-Zertifikat hält: ungeklärt. Status bleibt `beansprucht`, Anmerkung ergänzt. Kein Entwurf.
- **Hashes:** alle fünf gehashten Gcore-Quellen neu (keine ältere Rohkopie außer der MSA-Archivkopie), von Hand gegengelesen, übernommen.
- 12 Prüfdaten + Kopfdatum auf 08.10.; 93 Tests grün; Build; Archivcheck ok; lokal `9dc4863` + `b70dd33`, damit 28 vor origin. Push = Felix. Nächste Nachprüfung reihum: Hetzner, dann Infomaniak, Lyceum.

## Neu 08.10.2026 03:16 (Dauerlauf): Aleph Alpha nachgeprüft

- **Kein Statuswechsel.** Gewählt als nächste reihum (alphabetisch, Felder vom 03./04.10.).
- **Doku Pharia-1, Abschnitt „Data privacy“:** „No prompt data is stored …“, „We do not log user inputs to the models.“, „We do not train on user data.“ stehen wörtlich; Seitentext zeilengleich zur Archivkopie `20261004091251`. Die Wendung „as detailed in our Terms and Conditions“ ist dort (auch am 04.10.) kein Link; `/terms-and-conditions/` antwortet 404. Beide Felder bleiben `beansprucht`.
- **Datenschutzerklärung:** weiter nur Website, Kontakt, Bewerbungen (Fastly als Auftragsverarbeiter); AVV und Subprozessoren bleiben `unbelegt`.
- **Modelle:** drei Hugging-Face-Karten erreichbar; Kolibri-1 weiter Apache 2.0, 78 Mrd. Parameter (3,46 Mrd. aktiv je Token), Kontext 1M; keine öffentlichen Preise.
- **ISO 27001:2022:** DQS-Datenbank sperrt Skriptabrufe (Cloudflare 403), im Browser am 08.10. bestätigt (Aleph Alpha GmbH, ISO IEC 27001:2022). Anmerkung ergänzt.
- **AI Act:** auf der GPAI-Unterzeichnerliste und unter den Unterstützern des Transparenz-Kodex weiter genannt.
- **Cohere:** Zusammenschluss (verbindlich seit 16.09.) laut Websuche 08.10. weiter in der Genehmigungsphase, keine Vollzugsmeldung gefunden; Kurzbeschreibung um diesen Stand ergänzt.
- **Hashes:** Datenschutz, Doku und Kolibri hatten noch keinen Eintrag (neu angelegt); Pharia-Karten und GPAI-Seite mit neuem Hash (Karten: Zähler/Seitencode, GPAI: Liste gewachsen, Aleph Alpha drin), übernommen.
- 11 Prüfdaten + Kopfdatum auf 08.10.; 93 Tests grün; Build; lokal `af89658` + `83a2d53` + `0c8eb34`, damit 26 vor origin. Push = Felix. Nächste Nachprüfung reihum: Gcore, dann Hetzner, Infomaniak, Lyceum.

## Neu 08.10.2026 03:05 (Dauerlauf): DeepL nachgeprüft

- **Kein Statuswechsel.** Gewählt statt Aleph Alpha, weil DeepL die älteste Nachprüfung hatte (04.10. 06:26, nur Trust Center; Modelle/Vertrag vom 03.10.).
- **Preise unverändert** (aus der eingebetteten Preisliste der DE-Seite, `api-growth`/`api-enterprise`): Growth 285,60 €/Jahr = 23,80 €/Monat, Mehrverbrauch 22,00 € je 1 Mio. Zeichen, 1,96 € je STT-Stunde, 3,93 € je STS-Stunde; Developer 0 €. Pro Translator 7,49/24,99/49,99 €. Die Zeile „No data training“ im API-Tab lädt nur per JavaScript; die Preisliste führt dazu `enhancedDataSecurity` false (Developer) / true (Growth, Enterprise), passt zur Anmerkung.
- **Vertrag:** Pro-AGB Ziff. 3.1.2 (nur temporäre Speicherung) und 8.1.5 (DPA im Trust Centre, „integral part“) wörtlich; „Pro customer data is never used to train DeepL’s models“ wörtlich auf `/en/products/api`. Subprozessoren nicht neu geprüft (Rubrik zugriffsbeschränkt), Datum bleibt 04.10.
- **Zertifikate:** Trust Center wie 04.10.: ISO/IEC 27001:2022, SOC 2 Type 2, C5, Pentests; SOC-2-Bridge-Letter weiter nur bis 30.07.2026, kein neuerer Bericht (Anmerkung auf 08.10.). C5-Blog „Zuletzt aktualisiert: 3. Oktober 2025“, 114 Kriterien, sechs Monate wörtlich.
- **AI Act:** GPAI-Unterzeichnerliste der Kommission am 08.10. abgerufen: 22 Namen, DeepL nicht dabei (Anmerkung ergänzt).
- **Hashes:** alle fünf gehashten DeepL-Quellen hatten neue Hashes, keine ältere Rohkopie (Wayback 429); Zitate und Zahlen von Hand gegengelesen, neue Hashes übernommen.
- 13 Prüfdaten + Kopfdatum auf 08.10.; 93 Tests grün; Build; lokal committet `c197399` + `d9fb70b`, damit 23 vor origin. Push = Felix. Nächste Nachprüfung reihum: Aleph Alpha, dann Gcore, Hetzner, Infomaniak, Lyceum (alle 04.10.).

## Neu 08.10.2026 02:40 (Dauerlauf): Scaleway nachgeprüft

- **Kein Statuswechsel.** Preise der sechs belegten Modelle unverändert (gpt-oss-120b 0,15/0,60 €, Llama 3.3 70B 0,90/0,90 €, Mistral Small 3.2 0,15/0,35 €, Qwen3 235B 0,75/2,25 €, deepseek-v4-flash-0731 0,40/0,80 €, GLM-5.2 1,80/5,50 €); DeepSeek hat zusätzlich einen Cache-Preis 0,08 € (Anmerkung, nicht in die Tabelle).
- **Vertrag:** DPA 2024 (EN) weiter auf der Contracts-Seite verlinkt, PDF unverändert (Hash gleich, Last-Modified 06.02.2025). Subprozessoren „Last reviewed: July 2025“, Liste unverändert. Datenschutz-Doku Generative APIs „Reviewed on October 03, 2025“: Training-Satz, Zero Data Retention, Metadaten/Token-Zahlen bis 6 Monate, Caching, Missbrauchsfälle bis zwei Wochen wörtlich wie zuvor.
- **Zertifikate:** ISO 27001:2022 und HDS weiter ausgewiesen. SecNumCloud bleibt `beansprucht`: eigene Seite `/en/security-and-compliance/secnumcloud/` sagt am 08.10. „undergoing SecNumCloud (ANSSI) qualification — … not yet granted“ (Anmerkung ergänzt). ANSSI-Liste selbst lädt nur per JavaScript, dort ungeklärt.
- **Hashes:** Preisseite und Datenschutz-Doku hatten neue Hashes; Doku-Textvergleich mit der Rohkopie 03.10. (`belege/faelle/2026-004/data-privacy-2026-10-03.html`) zeigt nur Menü-Zeilen, Preisseite von Hand gegengelesen (für sie gibt es keine ältere Rohkopie). Neue Hashes übernommen.
- 15 Prüfdaten + Kopfdatum auf 08.10.; 93 Tests grün; Build; lokal committet. Push = Felix. Commits `7c3d93a` + `0ff71df`. Requesty/Regolo/Scaleway damit durch; weitere Profile mit Feldern vom 03.10.: Aleph Alpha, DeepL, Gcore, Hetzner u. a. — nächste Nachprüfung reihum: Aleph Alpha (alphabetisch).

## Neu 08.10.2026 02:20 (Dauerlauf): Regolo nachgeprüft

- **Kein Statuswechsel.** Preise der fünf belegten Modelle unverändert (gpt-oss-120b 1,00/4,20 €, Qwen3.5-122B 1,00/4,20 €, Apertus-70B 0,40/2,10 €, Mistral Small 4 0,50/2,10 €, GLM-5.2 2,00/5,20 €); Llama weiter nicht in der Preisliste. AGB „Version 01 January 2026“ mit DPA und Abschnitt 5 Sub-Processors unverändert; keine öffentliche Subprozessoren-Liste.
- **Zertifikate:** Seitenfuß „Datacenter Certifications“ zeigt weiter ISO 27001 (Alt-Text: Afnor / AxDéf), 27017, 27018, 9001, 14001, 20000, CSA STAR Level 1, dazu ISO 22301, CISPE, ACN, DNSH. Anmerkungen ergänzt. ZDR-Zertifikat (PDF, ausgestellt 24.07.2026) weiter erreichbar, Last-Modified 30.07.2026.
- **Fall-Entwurf 2026-007:** alle vier Zitate (zwei Behauptungen auf der ZDR-Seite, Privacy Policy, Blog) stehen am 08.10. weiter wörtlich, „No API call logging“ in der Vergleichstabelle ebenfalls. Rohkopien mit SHA-256 in `belege/faelle/2026-007/*-2026-10-08.html`.
- **Werkzeug-Befund:** Die Quellen-Hashes aller vier Regolo-URLs hatten sich geändert, Ursache nur die zwei neuesten Blog-Titel im Menü (Textvergleich mit Rohkopien 04.10. und Archivkopie AGB 02.10.). Bei Regolo meldet `quellenlauf.js` deshalb nach jedem Blogartikel „verändert“; neue Hashes nach Handprüfung übernommen. Keine Frage, nur beim Monatslauf wissen.
- 16 Prüfdaten auf 08.10.; 93 Tests grün; Build; lokal `78f9055` + `d4a32ea`. Push = Felix. Nächste Nachprüfung reihum: Scaleway (zuletzt 03.10.).

## Neu 08.10.2026 02:10 (Dauerlauf): Requesty nachgeprüft

- **Kein Statuswechsel.** Ältestes letztes Prüfdatum war 03.10. (Requesty, Regolo, Scaleway); Requesty zuerst wegen Fall 2026-001.
- **Fall 001:** DPA-Seite und Security-Seite seit 03.10. unverändert (Quellen-Hash gleich). „request and response bodies are never stored“ steht auf der DPA-Seite weiter ohne Einschränkung. Die Profil-Anmerkung sagte noch, auch die Security-Seite sage „No data stored“; das stimmt seit dem Umbau im September nicht mehr und ist berichtigt.
- **Subprozessoren:** „Last updated: 6 October 2026“ (vorher 30 August), Teil B 37 → 41 Modellprovider, 16 reine US-Provider (neu Thinking Machines Lab), China unverändert vier. Welche weiteren drei neu sind: ungeklärt (Internet Archive am 08.10. offline, keine Kopie vom 03.10.). Lyceum (eigenes Profil) steht als EU-Provider in der Liste.
- **Training:** Die Privacy Policy behält Requesty eigenes Training für Free-Plan-Konten vor (Wortlaut schon am 25.08.), die Quickstart-Doku sagt pauschal „No“ → **Fall-Kandidat Nr. 39 (niedrig)** in `outreach/fall-kandidaten.md`. Terms of Service Abschnitt 5.9 ungeklärt (Text lädt nur per JavaScript).
- SOC 2 Type II weiter „programme in progress“, kein Zieltermin; Preis weiter 5 % Aufschlag.
- Rohkopien mit SHA-256 in `belege/faelle/2026-001/*-2026-10-08.html`; 8 Prüfdaten auf 08.10.; 93 Tests grün; Build; lokal `8cac5c0` + `96ac1e0` + `5c7889a`. Push = Felix. Nächste Nachprüfung reihum: Regolo, dann Scaleway (beide zuletzt 03.10.).

## Neu 08.10.2026 00:10 (Dauerlauf): Tagesprüfung

- **Fälle 003/004/006:** alle 11 Quellen HTTP 200, jedes Zitat steht noch; 003/004 Text zeilengleich zum 07.10., einzige Änderung: Scaleway generative-apis, drei Preiszahlen (16,7694 → 16,7228; 100,1180 → 99,6442; ca. 501 → ca. 498), kein Zitat betroffen. Geklärt 08.10. 01:30 (J3): die drei Zahlen sind CO₂-Angaben (kgCO2e) auf den Dedicated-Deployment-Karten (z. B. 99,6442 kgCO2e neben €2,775), keine Preise; Profil und Fälle führen weder CO₂-Werte noch Dedicated-Preise → nichts anzupassen. 006 alle drei Dateien byte-gleich (Leistungsbeschreibung v1.24, Trust-Seite nennt 1.23). Rohkopien `~/allein/tmp/tp-1008/dl/`.
- **Fall 006 öffentlich weiter 404**, `main` jetzt **12** Commits vor `origin/main` (Push = Felix). Zustellung: hallo@-Mail (Thread `1a10c27064700ccd`) weiter nur „verzögert“ (letzte Meldung 07.10. 15:17, Gmail gibt Do ~17:10 auf); zweiter Versand von felix.h.lind@gmail.com 07.10. 16:37 (Thread `1a116649cb8a70cd`) bis 00:10 **ohne Fehlermeldung** — Zustellung damit wahrscheinlich, aber nicht belegt (5a erst mit Beleg).
- **Gmail:** keine Antwort von T-Systems, EUrouter, Opper, Scaleway, The Register.
- **Tests:** `node --test` 93/93, `node archivcheck.js` 23 Zitate in 16 Kopien ok.

## Neu 07.10.2026 23:55 (Dauerlauf): IONOS nachgeprüft

- **Kein Statuswechsel,** alle sechs Preise unverändert, Llama 3.1 8B weiter nicht in der Liste; Training/ZDR/Sub-Processors/AI-Act-Zitate stehen wörtlich. Lokal `e2d4d64` + `8498d52`, 93 Tests grün, Push = Felix.
- **Neu in der Data-Handling-Doku:** „AI Model Hub falls within the scope of BSI C5“ (Wayback `20261007214204`; ob schon am 03.10. da: ungeklärt, die Wayback-Kopie vom 01.10. ist eine leere JS-Hülle). C5-Anmerkung jetzt: Angabe des Anbieters, Service-Liste des Testats nur auf Anfrage.
- **ISO 27001 präzisiert:** TÜV-NORD-Zertifikat (Reg.-Nr. 44 121 160247-012, bis 18.04.2028) deckt die Rechenzentren; das IT-Grundschutz-Zertifikat BSI-IGZ-0730-2025 nennt Compute Engine, Kubernetes, S3, nicht den AI Model Hub. Kein Fall-Kandidat (IONOS behauptet nur „data centers certified“).

## Neu 07.10.2026 08:00 (Dauerlauf): Tagesprüfung

- **Fälle 003/004/006:** alle 11 Quellen HTTP 200, jedes Zitat steht noch; 003/004 Hash anders nur durch Seitencode/Navigation (Text zeilengleich zu den Kopien vom 03.10.), 006 alle drei Dateien byte-gleich zum 06.10. (Leistungsbeschreibung weiter v1.24, Trust-Seite nennt weiter 1.23). Nichts zu ändern. Rohkopien in `~/allein/tmp/tp-1007/dl/`.
- **Fall 006 öffentlich weiter 404** (`/faelle/t-systems-not-stored-cache/`), `main` 9 Commits vor `origin/main`; Push steht bei Felix (Home-Tab 07.10.). Zustellung an ai@t-systems.com weiter nur „verzögert“, keine neue Meldung (Frage 159, Gmail gibt Do 08.10. 15:10 UTC auf).
- **Gmail:** keine Antwort von Anbietern (T-Systems, EUrouter, Scaleway) seit 06.10.
- **Tests:** `node --test` 93/93, `node archivcheck.js` 23 Zitate in 16 Kopien ok.

## Neu 07.10.2026 00:15 (Dauerlauf): Felix' Antworten 147/148/153 (Tab 06.10. ~23:55) und Kunert gesendet

- **Entschieden (Felix):** 147 steht: Opper-Antwort (05.10. 16:39, Zero Data Retention bei Mistral für Oppers Organisation) ins Opper-Profil als Angabe des Anbieters mit Datum und „von außen nicht prüfbar“, Kandidaten 34/35 schließen (ALLEIN G8); Dank-Entwurf an jose@opper.ai sendet Felix von hallo@ (Antwort an einen Anbieter, keine Presse/Fachfrage). 148 steht: drei neue T-Systems-Kopien in den Beleg-Ordner, SHA256SUMS, Verlaufs-Eintrag 06.10., lokal committen (ALLEIN G10; Schreibrecht jetzt eingetragen, Sperre melden). 153 steht: Satz zur 14-Tage-Frist an beiden Stellen in `build.js` so fassen, dass er die Praxis sagt (Anbieter erfährt es zuerst, am selben Tag „offen“, 14 Tage bis „bestätigt“), Regeländerungs-Eintrag, Tests + Build grün, lokal committen vor Do 08.10. 17:30; Push meldet der Lauf, Felix pusht (ALLEIN G12).
- **Gesendet durch den Dauerlauf 07.10. 00:14 (Frage 152 „steht“):** Paul Kunert, The Register (Airbus-zu-Scaleway-Story 16.07., Fall 2026-004), Absender felix.h.lind@gmail.com (kein Absender-Feld im Werkzeug), Nachricht `1a11347ebe31ea9e`. Lindsay Clark (Nr. 15) bleibt Entwurf, bis von Kunert nichts kommt. Antwort prüft die Tagesprüfung.

## Wo wir stehen

- **Fälle, Stand aus den JSONs:** 2026-001 Requesty `bestaetigt` (Frist 08.09. abgelaufen),
  2026-002 GreenPT `bestaetigt` (Frist 11.09.; Footer am 14.09. weiter unverändert, „Verified by
  independent audit · ISO 27001“), 2026-003 Black Forest Labs `offen` (Frist **24.09.**),
  **2026-004 Scaleway `beantwortet` seit 14.09.** `data/faelle/entwurf/`: 005 Opper (zurückgestellt), 006 T-Systems (Frage 53 steht; gesendet von felix.h.lind@gmail.com 07.10. 16:37, Thread `1a116649cb8a70cd`, Zustellung wird Do 08.10. nachmittags geprüft, ALLEIN H7), 007 Regolo (Reserve, Frage 62).
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
- Git: lokal 23 Commits vor origin/main, HEAD `d9fb70b` (08.10. 03:05, DeepL-Nachprüfung); Push = Felix. (berichtigt 08.10. 01:55, vorher stand hier HEAD `898b7c9` vom 14.09.)

## Tagesprüfung 03.10.2026 (Dauerlauf)

- **Postfach** (Gmail, hallo@ läuft dort mit ein): keine Antwort von BFL, keine neue von Scaleway, keine Anfrage über /fuer-anbieter/.
- **Fall 2026-003 BFL:** Frist 24.09. ohne Antwort verstrichen, alle vier Seiten am 03.10. 11:38 UTC unverändert (Privacy Policy nur um einen nachgestellten Satz zum Trainingszweck ergänzt). Status lokal `bestaetigt`, Verlauf, Rohkopien `*-2026-10-03.html`, SHA256SUMS, Snapshot Enterprise-Seite.
- **Fall 2026-004 Scaleway:** Doku-Seite „Security and reliability“ jetzt qualifiziert (wörtlich die am 14.09. angekündigte Fassung), Produktseite wiederholt die absolute Aussage. Status lokal `bestaetigt` nach dem Muster von Fall 001 (eine Seite korrigiert, eine nicht), geht auf `ausgeraeumt`, sobald die Produktseite qualifiziert ist. Snapshots beider Seiten 03.10.
- Build und 64 Tests grün (`node --test test/*.test.js`; `node --test test/` ohne Glob schlägt fehl, kein package.json). Commit `f322fe9`, **Push wartet auf Felix' „steht“**.
- **Gmail-Entwurf an privacy@scaleway.com** im bestehenden Thread: Dank, Doku-Satz live, Produktseite offen, Fall jetzt „bestätigt“. Erst nach dem Push senden; Absender vorher auf hallo@belegbar.eu umstellen (frühere Antworten gingen von hallo@).
- Hinweis Technik: `core.autocrlf=true` ohne `.gitattributes` → Git normalisiert die HTML-Rohkopien beim Commit auf LF. Die Arbeitskopien stimmen mit SHA256SUMS überein, ein frischer Klon nicht. Vorschlag: `.gitattributes` mit `belege/** -text` (betrifft auch ältere Belege).

## Kill-Check-Vorbereitung 03.10.2026 (Dauerlauf)

Details und Vorlage in `MESSUNG.md` (gitignored, Abschnitt „Messung 03.10.2026“). Kurz:
- THESE-Kriterien: **1 Anbieter von selbst = 0**, **2 zwei Fälle abgeschlossen = erfüllt** (alle vier `bestaetigt`), **3 Fremder zitiert = einmal** (Perplexity 16.09., Wiederholung offen).
- Websuche 0 von 5 (wie 16.09.); Marke ist indexiert (`/methodik/`). Sitemap 61 URLs (gewollt, noindex auf Vergleichsseiten).
- **Linkcheck 3 Befunde:** Mistral Training-Opt-out (404), Opper Subprozessoren (→ trust.opper.ai), Aleph Alpha DQS (403, wohl Bot-Sperre). **Repariert 03.10. abends (`4b0301d`, lokal):** Mistral Opt-out → Help Center 455207 (Inhalt geändert: für Pay-as-you-go nennt Mistral keinen Trainings-Standard mehr, nur das Opt-out; Anmerkung korrigiert), Mistral ZDR → docs …/zero-data-retention (bezahlte Pläne auf Antrag, 30-Tage-Standard nicht mehr genannt), Opper → trust.opper.ai, Aleph Alpha DQS im Browser bestätigt (ISO/IEC 27001:2022), `dqsglobal.com` in BOT_SPERREN. Push = Frage 29.
- **Felix vor/am 14.10. (~20 min):** Search Console ablesen, 5 Fragen an Perplexity und ChatGPT.
- **Zwischenmessung 08.10. 00:30 (Dauerlauf, `MESSUNG.md`):** Technik 13/13 200, Sitemap 65 URLs; Linkcheck 129 Quellen, 0 Befunde (nur Weiterleitungen, OVH-AVV/Subprozessoren jetzt DPA-DE-8.0 / Sub_processors-DE-3.0 → Inhalt beim Quellenlauf 28.10. hashen); Websuche weiter 0/5, Markensuche diesmal ohne Treffer (am 13./14.10. wiederholen); Kriterium 1 weiter 0, Kriterium 2 erfüllt (4 bestätigt, 006 offen).

## Nächster konkreter Schritt

**0. Fall 006 (T-Systems) läuft seit 05.10.2026.** **Zustellung offen (Stand 07.10. 00:31): Telekom lehnt die Mail vom 05.10. wegen Domain-Ruf ab, Gmail versucht bis Do 08.10. 15:10 UTC; kommt dann ein endgültiger Fehlschlag, gilt der Anbieter als nicht informiert (Frage an Felix im Dauerlauf).** Antworten im Gmail-Thread `1a10c27064700ccd` prüft die Tagesprüfung; eine Antwort wörtlich ins Fall-JSON (`antworten`), Status `beantwortet`. **Mo 12.10.:** einmal nachfassen (Gmail-Entwurf, Felix sendet). **Di 20.10.:** Frist; ohne Antwort Trust-Seite neu abrufen, Status `bestaetigt`. Bis 006 abgeschlossen ist, keinen weiteren Fall eröffnen (Regolo 007 ist Reserve, Frage 62). Nachfragen ohne Frist laufen bei EUrouter (Nr. 33) und Opper (Nr. 34), beide gesendet 05.10.; nach 14 Tagen ohne Antwort (Mo 19.10.) als Fall-Entwurf prüfen. GreenPT (Nr. 38): Entwurf liegt, Felix sendet.

**1. Fall 004 nur noch beobachten** (Antwort an Scaleway ist am 14.09. raus): sobald
Scaleway den neuen Text meldet oder ein Abruf ihn zeigt, Seite hashen, Snapshot, Status `ausgeraeumt`;
Produktseite dabei mitprüfen (Antwort erwähnt sie nicht).

**2. (Veraltet, Stand 04.10.: Welle 2 gesendet 19./22.09., keine Welle 3 laut Felix 22.09.; einziges zugesagtes Gespräch ist Schlademann/BvD, siehe `06-schlademann-vorbereitung.md`.)** Warten auf Rücklauf von Gossen, Groß, C. Arndt, Köhler-Heite. Nächste Claude-Handlung erst bei Antwort
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
- ~~Die acht indexierten Vergleichspaare gegenlesen~~ erledigt 04.10. (Dauerlauf, `a14b107`); Push + zwei Darstellungsfragen = Frage 65.
- **Push main** (fünf Commits `9bc5bf0`…`14ba6db`, Fall 006 wird erst damit öffentlich; der Rechte-Filter des Dauerlaufs hat den Push am 05.10. 16:57 gesperrt): `git -C ~/belegt push origin main`. Die Mail an T-Systems nennt die Adresse belegbar.eu/faelle/t-systems-not-stored-cache/, bis zum Push gibt sie 404.
- **BvD-Gespräch Schlademann: GEFÜHRT 08.10. 17:30.** Rohe Stichpunkte an Claude geben → Raster (`06-schlademann.md`). Siehe Abschnitt 18:15 oben.
- **GreenPT-Nachfrage senden** (Gmail-Entwurf an robert@greenpt.ai vom 05.10. 16:56, Absender auf hallo@ stellen; `outreach/mails/18-…`).
- **Ausschreibungs-Baustein lesen** (Frage 96 a): `git checkout fuer-vergabestellen`, `docs/fuer-vergabestellen/index.html`, zurück `git checkout main`; danach „steht“ oder Änderungen. WBS-Zeile (96 b) kommt in die nächste WBS-Anfrage.
- Exoscale-Hinweis per Mail ohne Fall (veraltete Zonen-Tabelle) — Claude entwirft auf Zuruf.

## Blocker

Keiner.

## Termine

- **~17.09.:** Halbzeit-Nachfassen nur noch für 003 (Black Forest Labs); 004 hat geantwortet. **Erledigt 19.09. 09:07 UTC** (Verlauf im Fall-JSON, Details `outreach/mails/11-…`; ging von der Gmail-Adresse mit BFL in CC, nicht von hallo@).
- **24.09.:** Frist Fall 003. Für 004 ohne Bedeutung mehr.
- **~28.09.:** erster monatlicher Quellenlauf (`node quellenlauf.js`) und zweiter
  Widerspruchs-Scan. **Erledigt 03.10.** (siehe Stand); nächster Lauf 28.10. Hinweis: `--uebernehmen` ruft neu ab — nach Handprüfung stattdessen `neu_hash` im Ledger übernehmen (so am 03.10. gemacht).
- **30.09.:** fünf ausgefüllte Gesprächsraster, zwei neue Fälle eröffnet.
- **Mi 14.10.:** Halbzeit-Nachfassen Fall 006 (T-Systems), einmal, als Gmail-Entwurf im Thread `1a116649cb8a70cd` von der Gmail-Adresse, Felix sendet. Text und Prüfschritte vorher: `outreach/mails/15-t-systems-fall-2026-006.md` Abschnitt „Nachfassen“. (Vorher stand hier Mo 12.10., gerechnet ab dem gescheiterten Versand 05.10.)
- **Mo 19.10.:** EUrouter- und Opper-Nachfrage 14 Tage alt: ohne Antwort als Fall-Entwurf prüfen (Frage an Felix).
- **Mi 21.10.:** Frist Fall 006 (Neuversand 07.10. + 14 Tage, so im Betreff der Mail; vorher stand hier Di 20.10.).
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


- 08.10.2026 18:54 (Dauerlauf H18): Fachfragen/Presse gesendet an Kroes, Pustal (GÖRG), Menhard (netzpolitik); Antworten abwarten. Live-Stand dabei: 21 Anbieter, 4 öffentliche Fälle, Mistral 73 %, STACKIT 93 %.
