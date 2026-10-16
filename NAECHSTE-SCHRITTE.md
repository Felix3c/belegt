# belegbar.eu — Nächste Schritte

## Neu 16.10.2026 ~21:30 (Dauerlauf, Auftrag Felix PZ1): Fachstimme Patel auf der ISO-27001-Seite, lokal `3875d4d`

- Neuer Abschnitt „Wer steht auf dem Zertifikat?“ unter der Tabelle von `zertifikate/iso-27001/`: zwei Sätze Einleitung, dann Patels Satz auf Englisch, wortgleich, Zuordnung „Punit Suketu Patel, Independent Researcher“, Link arxiv.org/abs/2610.10644, Verweis Abschnitt 5.4 und E8 (4.8). Nur diese Seite ändert sich, die anderen neun Zertifikatsseiten bleiben bytegleich.
- Code: `lib/fachstimmen.js` (Daten + Block, je Zertifikatsschlüssel), eingehängt in `seiteZertifikat` in `build.js`. Test zuerst: `test/fachstimmen.test.js` (5). 210/210 Tests, Build ok.
- Patel hat die Stelle am 16.10. ~21:30 zur Vorabprüfung bekommen (im selben Thread, gefragt: passt „Sicherheitsforscher“, passt „Fehlerklasse E8“). **Online erst nach seinem Ok**, dann Push nur über `dossiers/push-sauber.sh`.

## Neu 16.10.2026 ~08:45 (Dauerlauf, Auftrag Felix HR1): Muster ohne Haftungsübernahme, KI-Agent offen, lokal `f1a89d5`

- **Dossier (`lib/dossier.js`):** „Ich bestätige, dass die Angaben … vorlagen, und dass Abschnitt 2 vollständig ausweist …“ ist raus. Neu `## Vermerk`: „Die Fundstellen sind mit Abrufdatum und, wo vorhanden, Prüfsumme und Archivkopie dokumentiert. Der Vermerk sagt, was wann wo stand, nicht, ob es stimmt. Keine Gewähr für die Richtigkeit der Angaben des Anbieters, keine Rechtsberatung.“ Darunter „Freigegeben: Köln, den …, Felix Lind“.
- **Aufbau:** oben Leseseite (Kopf, Ergebnis, `## Auf einen Blick` mit Zahlen und Änderungsalarm, Vermerk), dann `# Belege` mit Abschnitt 1–4. Abschnitt 5 Änderungsalarm und 6 Unterschrift entfallen. Wortgleiche Zeilen werden zusammengefasst (`fasseZusammen`), lange Striche durch Komma/Bindestrich ersetzt, wörtliche Zitate in '…' bleiben. Muster IONOS 4282 → 3065 Wörter.
- **KI offen:** Dossier-Kopf „**Erstellt:** Ein KI-Agent hat die Quellen gesammelt und verglichen. Felix Lind (belegbar.eu) hat sie geprüft und freigegeben.“ Methodik neuer Abschnitt `#wer` „Wer hier arbeitet“. Quellenlauf-Kasten und Methodik: „verändert und von Hand gelesen“ → „verändert und gelesen“. Käuferseite und llms.txt: „freigegeben“ statt „unterschrieben“.
- **Offen:** Ältere private Dossiers in `dossiers/` (Scaleway-Beispiele, OVH, Nordference, Pilot-Vorrat) tragen noch den alten Satz. Vor jedem Versand mit `node dossier.js` neu erzeugen.
- Test zuerst: `test/dossier-haftung.test.js` (5). 205/205 Tests, Build streng ok. Bilder `belege/haftung-2026-10-16/` (vorher/nachher, `vergleich-klein.jpg`). Mail an Felix 08:45, **Push nur durch Felix** (`bash dossiers/push-sauber.sh --push`), Frage 358.

## Neu 16.10.2026 ~08:00 (Dauerlauf Laufend): Lyceum-AGB neu gefasst, 15 weitere „verändert“-Quellen gelesen, lokal `02dfd49`

- **Lyceum AGB** (`lyceum.technology/legal/terms`): Stand jetzt „October 2026“ statt „August 2026“. Satzvergleich gegen Archivkopie web.archive.org/web/20261008004853: gestrichen ist nur das Nutzungsverbot „Use as a reseller or sublicensing to third parties.“ (Liste der verbotenen Nutzungen, Ziff. 6.1); dazu neuer Cookie-Banner („for marketing“). Alle Profilzitate wortgleich: 5.1 (Code nicht fürs Training), 5.2 (Inference: nicht gespeichert, nicht trainiert), 15.4, 17.2, 19.1. Neue Archivkopie 20261016055842. Belege `belege/anbieter/lyceum/terms-*-2026-10-16/-20261008004853.txt` + SHA. Anmerkungen `training_opt_out`/`zweckbindung` nennen den neuen Stand.
- Lyceum-Modellseite: neu nur ein API-Hinweis („GET /openai/v1/models“). Preise DeepSeek V4 Pro 1.75/3.50, Qwen3.8 2.4T 2.50/6.00, Kimi K3 3.00/15.00 unverändert, Prüfdatum 16.10.
- Nur Menü/Banner, übernommen: T-Systems (Branchenmenü ohne „Finance & insurance“, 2 Seiten), Scaleway Verträge/Sicherheit/Unterauftragnehmer (Banner „Discover the products available in Milan“), STACKIT AGB + Zertifikate (Teaser „Cloud Security Posture Management“), Gcore Blog/Pressemitteilung/Whisper (Teaser „Traffic Gate“), Aleph Alpha Hugging-Face-Seiten (nur Zähler).
- **Weiter offen (15):** BFL (Preise nur im Browser, BF1), Opper Security-Overview (OP1), GreenPT-Modellkarten (neues Modell „Decision“/systemone?), Scaleway Preise (Wort „ocr“ neu) und Datenschutz-Doku, STACKIT Modellliste (viele Modellzeilen weg, **lesen lohnt**) und Preisformat, Nebius auf OpenRouter, OVH HDS-Umfang, Exoscale HDS-Liste (Abruf geblockt, Incapsula), Aleph-Alpha Datenschutz, EUrouter-Modelle (schon gelesen 03:40, Zähler 151).
- 200/200 Tests, Build streng ok. Kein Push.

## Neu 16.10.2026 ~07:15 (Dauerlauf Laufend): Wächter-Vorrat, 14 weitere Dienste vorab geprüft

- Je Dienst Vertrags- und Unterauftragnehmer-Seite gesucht und zweimal mit dem Wächter-Code abgerufen. Ergebnis: 5 voll automatisch beobachtbar, 6 nur zur Hälfte (eine Seite lädt erst im Browser oder antwortet mit Fehlerstatus), 3 nur von Hand (Bot-Sperre bzw. leere Trust-Center-Hülle). Einzelheiten und fertige Einträge privat (`waechter/`, Gesprächsordner).
- Nichts an `waechter.js` geändert, keine Tests berührt, kein Commit nötig (alles gitignored). Kein Push.

## Neu 16.10.2026 ~07:05 (Dauerlauf Laufend): acht „verändert“-Quellen von Hand gelesen, lokal `42282d8` + `8271542`

- Quellenlauf trocken 16.10.: 203 Quellen, 164 unverändert, 38 verändert. Gelesen und per `--uebernehmen-nur` übernommen: `gcore.com/legal`, `opper.ai/data-processing-agreement`, `opper.ai/ai-compliance`, `opper.ai/models`, `regolo.ai/terms-and-conditions/`, `regolo.ai/privacy-policy/`, `regolo.ai/zero-data-retention/`, `regolo.ai/pricing/`. Vergleich satzweise gegen die nächste Archivkopie (Gcore 04.10., übrige ~08.–14.10.).
- Ergebnis: Vertragstexte satzgleich, geändert nur Menü, Banner, Blog-Teaser. Alle Profilzitate stehen wörtlich (Gcore MSA 7.2/8.3/9.5.3/16.3, Opper DPA 1.1/2.1/3.3 „Last updated on: 2026-09-23“, Regolo DPA „Frosinone, 28 January 2026“, Zweck-/Frist-/ZDR-Sätze). Alle Profilpreise unverändert (Regolo 5 Modelle, Opper 5 Modelle).
- Regolo-Datenschutz steht auf Version 1.1 vom 07.10. (Google Ads als Werbepartner neu); betrifft Website-Tracking, keine Profilaussage, Beleg lag schon (`belege/anbieter/regolo/privacy-v1.1-2026-10-14.txt`). Regolo-Preisseite: neuer Reiter „Decision“, Testphase anders formuliert.
- **Opper-Compliance-Seite trägt kein Datum mehr:** am 05.10. noch „Last updated: 2026-09-23“ (Archiv 20261005054113), am 08.10. ohne (Archiv 20261008050530), heute ohne. Anmerkung in `ai_act` entsprechend datiert. Für den Entwurf von Fall 005 (Satz „EU data residency on every plan“ am 05.10. entfernt) ist das ein weiteres Indiz für eine Überarbeitung in diesen Tagen; der Entwurf selbst ist unverändert.
- Hinweis zum Archiv: `id_`-Abrufe kommen teils gzip-komprimiert, mit `curl --compressed` lesen (ein erster Abruf ohne sah fälschlich „kein Datum“ und wurde im zweiten Commit korrigiert).
- Offen von den 38: noch 30, darunter BFL (Preise nur im Browser, BF1), Opper Security-Overview (OP1), STACKIT, Scaleway, T-Systems, Lyceum, GreenPT-Modellkarten, Gcore Blog/Modellseiten.
- 200/200 Tests, Build streng ok. Kein Push.

## Neu 16.10.2026 ~05:15 (Dauerlauf Laufend): alle Skripte rechnen „heute“ jetzt nach Ortszeit, lokal `2bc9ec5`

- Rest aus dem Datumsfehler von ~01:55: `dossier.js`, `preisarchiv.js`, `messung.js` und der Atom-Feed in `lib/aenderungen.js` (Fallback ohne Einträge) nahmen ihr Standarddatum noch aus UTC. Ein Dossier oder Preisarchiv-Lauf zwischen 00:00 und 02:00 MESZ hätte den Vortag in den Dateinamen geschrieben. Jetzt überall `heuteLokal()`.
- Neuer Test `test/ortsdatum.test.js` zuerst (rot mit genau diesen vier Dateien, dann grün): durchsucht alle Skripte und `lib/` nach `new Date().toISOString().slice(0, 10)`, damit der Fehler nicht wiederkommt. `anzahlSeit()` rechnet nur mit übergebenen Daten und bleibt.
- 200/200 Tests, Build streng ok, Arbeitsbaum danach sauber. Kein Push.

## Neu 16.10.2026 ~03:40 (Dauerlauf Laufend): EUrouter-Modellseite gelesen, Gemma 4 billiger, lokal `3d30587`

- `eurouter.ai/models` (Abruf 16.10.): jetzt **151 Modelle** (Banner „GLM-5.2, Kimi K3 and Opus 5 are now live“). Profilpreise DeepSeek V3.2 0.30/0.50, Kimi K2.6 0.73/3.50, Mistral Large 3 0.55/1.65 und alle Claude-Varianten unverändert, Prüfdatum auf 16.10.
- **Gemma 4 Output $0.50 → $0.20** (Input $0.10 gleich), auf Modellseite, Modellliste und in der Modell-API gleich; Archivkopie web.archive.org/web/20261016012752 zeigt $0.20. Verlauf damit 0.35 (bis 08.10.) → 0.50 (09.10.) → 0.20 (16.10.), ohne Änderungsdatum bei EUrouter. Beleg `belege/anbieter/eurouter/gemma-4-2026-10-16.txt` + SHA, Preisarchiv `belege/preise/eurouter/2026-10-16-*`.
- **Währungsfrage Gemma 4 erledigt:** API und eingebettete Daten führen Gemma 4 jetzt mit `currency: USD` (am 11.10. noch `EUR`). In der API stehen insgesamt noch 42 von 151 Modellen mit `EUR`; ob das Abrechnung oder Anzeige ist, bleibt ungeklärt (keins davon im Profil).
- Neu als Gemma-4-Anbieter auf der Modellseite: Berget AI AB (neben Infercom, AKI.IO, GreenPT, Regolo, AR Arkane SARL).
- 198/198 Tests, Build streng ok. Kein Push. Das Muster-Dossier `dossiers/pilot-vorrat-2026-10-14/eurouter.md` ist ein datierter Stand und bleibt unverändert.

## Neu 16.10.2026 ~03:00 (Dauerlauf Laufend): Wächter meldet jetzt „DÜNN“, wenn eine Seite erst im Browser lädt

- Probe für einen möglichen Pilot (fünf fremde Büro-Tools, je AVV + Unterauftragnehmer, zwei Abrufe): Zoom, Slack, Atlassian, HubSpot stabil lesbar (zwei davon PDF, also ohne Wortprotokoll); Notion liefert ohne Browser 15 Wörter, der Wächter wäre dort still blind gewesen.
- Fix `waechter.js`: unter 100 Wörtern Zeile `DÜNN: … (N Wörter; lädt vermutlich erst im Browser, Wächter hier blind)`. Test zuerst (rot→grün), 198/198, Trockenlauf über die 10 beobachteten Quellen ohne falschen Alarm. Lokal `560395b`, kein Push.
- Befund für das Gespräch Mi 21.10. (was ein Pilot noch braucht: PDF-Vergleich von Hand, Browser-Quellen wöchentlich, Feld je Kunde ab Kunde 2) liegt im privaten Gesprächsordner, Datei `09-…-pilot-pruefung.md`.

## Neu 16.10.2026 ~02:05 (Dauerlauf Laufend): `quellenlauf.js --help` stürzt nicht mehr ab

- Ursache: Die Suche nach dem Hilfeblock im Kopfkommentar erwartete `
`, die Datei hat im Windows-Checkout CRLF. Jetzt `hilfeAusKopf()` in `lib/quellen.js` (Zeilenenden vereinheitlicht, ohne Block klare Meldung statt Absturz); Test `test/hilfe.test.js` zuerst (4 rot, dann grün). Nebenbei den verrutschten Kommentar über `normalisiereText` zurückgestellt.
- 197/197 Tests, Build streng ok. Kein Push.
- Weiter offen: `eurouter.ai/models` (Modellzahl/Preise) lesen; `--uebernehmen-nur` muss je URL wiederholt werden.

## Neu 16.10.2026 ~01:55 (Dauerlauf Laufend): EUrouter-Providerliste 17 statt 15, Datumsfehler behoben, lokal `56e1080` + `de0e4a2`

- EUrouter DPA-Liste und `eurouter.ai/providers` (Abruf 16.10.): **neu Berget AI AB (Schweden, 11 Modelle) und Entrim (Slowenien, 3 Modelle)**, beide „EU/EEA configurations only“, „No prompt retention / no training“. Sonst kein Wort weg. **Das Listendatum „9 October 2026“ blieb unverändert**, obwohl zwei Anbieter dazukamen (laut DPA wird die Liste aus den aktuell freigeschalteten Anbietern erzeugt). Profil: Kurzbeschreibung und Subprozessoren auf 17, Archivkopien web.archive.org/web/20261015233016 (DPA) und 20261015233037 (Providerseite), beide geprüft mit den neuen Namen; Textauszüge + SHA in `belege/anbieter/eurouter/`. Quellenlauf: beide URLs nach Handprüfung übernommen.
- **Fehler behoben:** `quellenlauf.js`, `waechter.js` und `build.js` nahmen als Standarddatum UTC. Ein Lauf um 01:30 MESZ schrieb deshalb den Vortag und setzte 21 Profile von 2026-10-16 auf 2026-10-15 zurück (Lauf verworfen, mit `LAUF_DATUM=2026-10-16` wiederholt). Jetzt `heuteLokal()` in `lib/quellen.js`, Test zuerst (rot, dann grün). `dossier.js`, `preisarchiv.js`, `messung.js` und `lib/aenderungen.js` rechnen weiter in UTC (tagsüber harmlos, nicht angefasst).
- Offen aus der Tagesprüfung: `eurouter.ai/models` (veränderte Modellzahl/Preise) noch nicht gelesen; `node quellenlauf.js --help` stürzt weiter ab (CRLF).
- 193/193 Tests, Build streng ok, Archivcheck 19/13 ok. Kein Push.

## Neu 16.10.2026 ~01:10 (Dauerlauf): zweite schriftliche Rückmeldung ausgewertet (privat)

- Einzelheiten nur in `outreach/gespraeche/PRIVAT-NOTIZEN.md` (16.10.). Zwei Fragen an Felix offen: Unterschriftsabschnitt im Muster-Dossier (`lib/dossier.js`:170–172) und ein Satz zur Arbeitsweise auf `/methodik/`. Nichts geändert, nichts gepusht.

## Neu 16.10.2026 ~01:05 (Dauerlauf Laufend): Push-Vorbereitung, lokal `3ab0645`

- Strategie-Absätze vom 15.10. aus dieser (öffentlichen) Datei in die privaten Notizen verschoben; Sicherungskopien `*.bak-20*` und verkleinerte Mail-Bilder in `.gitignore` (eine Sicherungskopie eines privaten Gesprächsblatts war vorher nicht ignoriert).
- Die Namensprüfung vor dem Push meldete einen Fehlalarm (Fotografenname in einem Bild-Dateinamen eines Fremdbelegs von Fall 002) und hätte jeden Push gestoppt. Prüfung ausgelagert in ein eigenes Skript mit Ausnahmeliste und Test (6/6 grün, beides privat in `dossiers/`).
- Trockenlauf `bash dossiers/push-sauber.sh` grün: 21 lokale Commits werden zu einem. Push macht Felix, nach Blick auf Vorher/Nachher (Frage 346).
- 192/192 Tests, Build streng ok.

## Neu 16.10.2026 ~00:40 (Dauerlauf NW2): IONOS-Modellseite nachgeprüft, lokal `4519e16`

- `docs.ionos.com/cloud/ai/ai-model-hub/models` am 16.10. abgerufen: **Llama 3.1 8B steht trotz Datum 15.10.2026 weiter unter „Scheduled for Retirement“**, nicht unter „Retired models“ (Seite „Last updated 8 days ago“). Darum nicht ausgetragen, nur die Anmerkung nachgezogen; Status bleibt „unbelegt“, Muster-Dossier unverändert 12/0/3.
- **Neu auf derselben Liste: Mistral Nemo (12B) und BGE Large 1.5 werden am 22.10.2026 abgeschaltet** (Alternative Qwen3.5-9B bzw. BGE M3). Nemo steht im Profil als „belegt“ und noch in der Preisliste (0,15/0,15 €), Anmerkung ergänzt, Status unverändert. BGE ist ein Embedding-Modell und steht nicht im Profil.
- Nachprüfung ab Fr 23.10.: beide Modelle; stehen sie unter „Retired“ oder fehlen sie in der Preisliste, aus `modelle` nehmen bzw. auf „unbelegt“ setzen (eingereiht als NW2b in ALLEIN.md).
- 192/192 Tests, Build ok. Kein Push.

## Neu 16.10.2026 ~00:50 (Dauerlauf Tagesprüfung): GreenPT-Datenschutz neu gefasst, lokal

- 192/192 Tests, Build streng ok, Archivcheck 19 ok. Quellenlauf trocken 203 Quellen: 156 unverändert, 46 verändert, 1 neu. Fälle 003 (BFL) und 004 (Scaleway): alle 9 Zitate live wörtlich da.
- **GreenPT** Datenschutzerklärung „Last updated October 14, 2026“ (greenpt.com und docs.greenpt.ai): Google Workspace nicht mehr Unterauftragnehmer, Moneybird (NL, Rechnungen) neu, Brave Search und Deepgram ausdrücklich „not a sub-processor“; Zweck „Anonymised research on aggregated energy-consumption metrics only“ statt „Anonymized research and service improvement“; Hosting „France and Finland“. **Neu: „certifications held by our hosting provider Scaleway; GreenPT BV is working towards its own ISO 27001 certification“** → Verlaufseintrag Fall 2026-002 (Status bleibt „bestätigt“, Footer-Badge unverändert). Profil-Anmerkungen nachgezogen, Textkopien `belege/anbieter/greenpt/*-2026-10-16.txt` + SHA256SUMS. GreenPT- und BFL-Quellen nach Handprüfung übernommen (BFL nur Menü „FLUX Image Klein“). Lokal `3bdd129`, `d4ef58d`, kein Push.
- Übrige 40 „verändert“ offen gelassen; gelesen und unkritisch: Aleph-Alpha/Opper/Regolo Menü und Teaser, STACKIT Preise jetzt mit €-Zeichen statt langer Dezimalzahlen und Security-Teaser, Scaleway Banner „Milan“. **Lesen lohnt noch:** EUrouter DPA und Providerliste (neue Anbieter u. a. Berget AI (SE), Entrim) bei der nächsten Laufend-Runde.
- Änderungs-Wächter (WB1) erste Tagesprüfung: 10 Quellen, Google-Cloud-Unterauftragnehmerseite „verändert“, aber nur halbiert (jedes Wort genau halb so oft, kein Wort weg: Tabelle früher doppelt ausgeliefert) → nach Handprüfung übernommen, kein Fund.
- Kleiner Fehler: `node quellenlauf.js --help` stürzt ab (Regex findet den Hilfeblock wegen CRLF-Zeilenenden nicht). `--uebernehmen-nur` muss je URL wiederholt werden.

## Neu 15.10.2026 ~22:00 (Dauerlauf Laufend): Änderungs-Wächter für Dienste ohne Profil, lokal

- Neues Skript `waechter.js` (Test `test/waechter.test.js`, 4 Fälle): gleiche Hash- und Wortprotokoll-Logik wie `quellenlauf.js`, aber Quellen aus einer eigenen Liste statt aus den Profilen. Liste, Ledger, Wortstände und Rohkopien mit SHA-256 liegen in `waechter/` (gitignored, Auswahl ist Strategie).
- Grundlinie 15.10.2026 gezogen, zwei Trockenläufe danach je 10/10 unverändert. Eine Seite lieferte ohne Sprachwahl wechselnd zwei Sprachen und ist deshalb mit `?hl=en` festgenagelt.
- Erster echter Fund aus dem Abgleich mit dem Webarchiv, Einzelheiten nur privat.
- Aufruf: `node waechter.js` (schreibt), `--trocken` (nur Bericht), `--uebernehmen` nach Handprüfung. Noch kein fester Takt; Vorschlag: in der Tagesprüfung mitlaufen lassen.
- 192/192 Tests, Build streng ok. Kein Push.

## Neu 15.10.2026 ~21:10 bis ~19:15 (Home-Tab und Dauerlauf): Ausrichtung, Gesprächsfragen, Muster-Meldung

- Inhalte dieser drei Abschnitte (Ausrichtung nach einer schriftlichen Rückmeldung, Zusatzfragen für Gespräche, Muster-Meldung, Kill-Check-Stand) liegen seit 16.10.2026 nur noch privat in `outreach/gespraeche/PRIVAT-NOTIZEN.md` (Strategie, nicht öffentlich).
- Öffentlich bleibt: IONOS-AVV Version 1.3 per Archivkopie web.archive.org/web/20260917054210 belegt (Abschnitt 12 endet mit 12.5), Beleg `belege/anbieter/ionos/ionos-avv-v1.3-archiv-2026-09-17.txt` + SHA, Profil-Anmerkung verweist darauf.
- Seite sprachlich überarbeitet (BV3, lokal `6ce7cb5` + `1966ccb`): lange Gedankenstriche im sichtbaren Seitentext durch Punkt, Doppelpunkt, Komma oder Klammer ersetzt, einige Sätze kürzer, Inhalt unverändert. Texte in `data/` bewusst nicht angefasst (Zitate, Änderungsprotokoll). Bilder vorher/nachher in `belege/entkien-2026-10-15/`. Push wartet auf Felix (Frage 346).
- Änderungs-Wächter läuft ab Fr 16.10. täglich in der Tagesprüfung (WB1).

## Neu 15.10.2026 ~16:35: Entscheidungen Felix (Home-Tab)

- Name: bei belegbar.eu bleiben bis zum Kill-Check 09.12. (Attestry/OnRecord nicht weiter verfolgen).
- Presse-Entwurf an netzpolitik.org (Mistral-Zertifikat) senden nach Prüfschritt, Entwurf an Bitkom löschen (Aufgabe EG4 im Dauerlauf).

## Neu 15.10.2026 ~15:55 (Dauerlauf Laufend): Infomaniak B Corp nachgeprüft, lokal `2596830`

- Das B-Lab-Verzeichnis (bcorporation.net/en-us/find-a-b-corp/company/infomaniak-group-sa/) war am 08.10. HTTP 403, heute mit Browser-Kennung per curl HTTP 200. Es zeigt „INFOMANIAK GROUP SA“, „Certified since 2025“, Standards Version 2.2, Branche „Data processing & hosting“, Schweiz; keine Punktzahl.
- `data/anbieter/infomaniak.json` B Corp: Zertifizierer B Lab „beansprucht“ → „belegt“ (Register des Ausstellers, wie DQS bei Aleph Alpha); Geltungsbereich „unbelegt“ → „belegt“ (ganzes Unternehmen INFOMANIAK GROUP SA). Beleg `belege/anbieter/infomaniak/bcorp-profil-2026-10-15.txt` + SHA.
- DQS-Kundendatenbank (Aleph Alpha) heute erneut versucht: weiter Cloudflare-Prüfung (HTTP 403, „Just a moment“), nicht umgangen, Profil unverändert.
- 188/188 Tests, Build streng ok, Archivcheck 19/13 ok. Kein Push; geht mit `bash dossiers/push-sauber.sh --push` durch Felix mit.

## Neu 15.10.2026 ~15:35 (Dauerlauf Laufend): Fall-Entwurf 005 (Opper) nachgezogen — Widerspruch von Opper selbst weitgehend behoben

- Der Entwurf stand seit 03.10. unverändert, das Profil kannte die Änderung schon seit 08.10. Neu abgerufen 15.10. 13:28 UTC: Die Compliance-Seite (dateModified 2026-10-05; Wayback alt 05.10. 05:41 UTC, neu 08.10. 05:05 UTC) sagt in der Einleitung jetzt „with EU routes on every plan“ statt „EU data residency on every plan“. Beide Behauptungs-Zitate stehen nicht mehr auf der Seite. DPA 2.1 und der FAQ-Satz zum Modellnamen ohne Präfix unverändert.
- Rest: „EU data residency“ ohne Einschränkung nur noch in der Meta-Beschreibung, „EU residency“ im Schlussaufruf. Das trägt keinen Fall.
- Verlaufseintrag im Entwurf, Rohkopien `belege/faelle/2026-005/*-2026-10-15.html` + SHA256SUMS. Status unverändert „offen“ (zurückgestellt). **Empfehlung: Fall 005 einstellen** (Frage 340). Opper änderte, ohne informiert zu sein.
- 188/188 Tests, Build streng ok, Website unverändert. Lokal, kein Push.

## Neu 15.10.2026 ~15:20 (Dauerlauf DT1): DeepL ISO 42001 nachgeprüft, lokal `4cef032`

- trust.deepl.com antwortet mit Browser-Kennung per curl (HTTP 200), ohne sie mit Cloudflare-Prüfung (403). Das Trust Center nennt als „four core compliance programs“ ISO 27001:2022, SOC 2 Type 2, HIPAA, BSI C5:2020 Type 2; „42001“ kommt im ganzen Dokument nicht vor.
- `data/anbieter/deepl.json` iso_42001: Status bleibt „unbelegt“, Anmerkung berichtigt (nicht mehr „nicht abrufbar“), geprüft 15.10. Beleg `belege/anbieter/deepl/iso42001-trustcenter-2026-10-15.txt` + SHA.
- 188/188 Tests, Build streng ok. Kein Push; geht mit `bash dossiers/push-sauber.sh --push` durch Felix mit.

## Neu 15.10.2026 ~15:30 (Dauerlauf Laufend): C5-Fassung je Anbieter nachgetragen, lokal `b079284`

- Offener Punkt aus RG2 Teil 3 erledigt: Bei allen sieben Anbietern mit C5-Angabe steht jetzt die Fassung. C5:2020 bei Exoscale, Hetzner, IONOS (stand schon da), neu DeepL (Trust Center, Karte „Compliance Overview“: „BSI C5:2020 Type 2“) und OVHcloud (C5-Seite, FAQ zum SOC-2-Bericht mit C5:2020). STACKIT und T-Systems nennen keine Fassung → „ungeklärt“. Dazu je ein Satz: C5:2026 gilt seit 07.04.2026, Pflicht erst für Prüfungen ab 01.06.2027.
- Belege mit SHA in `belege/anbieter/{deepl,ovhcloud,stackit,t-systems}/` (Abruf 15.10.2026 per curl). Status bleibt überall „beansprucht“.
- Nebenbefund: trust.deepl.com war am 15.10. per curl lesbar (HTTP 200, Inhalte als JSON eingebettet); das Profil sagt bei ISO 42001 noch „nicht abrufbar (HTTP 403)“. Nachprüfen, ob das Trust Center ISO 42001 nennt, wäre ein eigener Punkt (nicht gemacht).
- 188/188 Tests, Build streng ok. Kein Push; geht mit `bash dossiers/push-sauber.sh --push` durch Felix mit.

## Neu 15.10.2026 ~15:10 (Dauerlauf, RG2 Teil 4): Kommunen-Ratgeber nachgeprüft, lokal `d77f854` — damit alle fünf Ratgeber geprüft

- Berichtigt: „KI-Kompetenz-Pflicht (Art. 4)“ → Förderpflicht ohne garantiertes Niveau seit Digital Omnibus (VO (EU) 2026/1744), gleicher Wortlaut wie AI-Act-Ratgeber.
- Ergänzt: Grundrechte-Folgenabschätzung (Art. 27) für öffentliche Stellen bei Hochrisiko nach Anhang III ab 02.12.2027 (artificialintelligenceact.eu/de/ai-act-explorer/digital-omnibus/, digitalpolicyalert.org/change/333, buzer.de/27_KI-VO.htm, abgerufen 15.10.).
- Stimmig: BITV 2.0 (letzte Änderung 24.10.2023, BMAS-Änderungsentwurf nicht in Kraft; buzer.de/3_BITV.htm, abgerufen 15.10.), RL 2016/2102, Art. 50, C5/ISO-27001-Hinweis, Vergabe-Hinweis mit SEAL (passt zu Ratgeber 04).
- `"stand":"15.10.2026"`; 188/188, Build streng ok. Kein Push; alle fünf Ratgeber gehen mit `bash dossiers/push-sauber.sh --push` durch Felix mit.

## Neu 15.10.2026 ~15:20 (Dauerlauf, RG2 Teil 3): Zertifikate-Ratgeber nachgeprüft, lokal `faa465b`

- Berichtigt (1): SEAL heißt „Sovereignty Effectiveness Assurance Level“ und hat die Stufen 0–4, je Souveränitätsziel (vorher „Sovereign European Assurance Level, Stufen 1–4“). Quelle: Cloud Sovereignty Framework der EU-Kommission, Version 1.2.1, Okt. 2025 (PDF-Kopie über ppc.land, sha256 aa5b6ad1…82cc, abgerufen 15.10.).
- Berichtigt (2): „Cloud-III-Vergabe 2026: OVHcloud, STACKIT, Scaleway SEAL-3“ → Sovereign-Cloud-Ausschreibung, Zuschlag April 2026: STACKIT, Scaleway und Bietergemeinschaft Post Telecom mit OVHcloud + Clever Cloud SEAL-3, Proximus/S3NS SEAL-2 (commission.europa.eu, Meldung 17.04.2026, abgerufen 15.10.).
- Ergänzt: C5:2026 seit 07.04.2026 (heise 07.04.2026), ersetzt C5:2020, Pflicht für alle C5-Prüfungen ab 01.06.2027, alte Testate bleiben gültig (roedl.com 08.04.2026). Profile nennen „BSI C5“ ohne Fassung; Fassung je Anbieter nachtragen wäre ein eigener Punkt (nicht gemacht).
- Stimmig: ISO 27001/SOC 2, Aleph Alpha DQS (Profil 08.10.), SecNumCloud, ISO 42001 seit 2023, Lyceum-Transparenz (Profil 09.10.).
- `"stand":"15.10.2026"`; 188/188, Build streng ok. Kein Push. Offen: 05 (Kommunen).

## Neu 15.10.2026 ~15:05 (Dauerlauf, RG2 Teil 2): CLOUD-Act-Ratgeber nachgeprüft, lokal `6a2e667`

- Berichtigt: „rein europäisches Eigentum“ war zu stark. Jetzt „europäische Mehrheitskontrolle“ mit Zahlen: IONOS United Internet 63,8 % (ionos-group.com, Details zur Aktie, Stand 30.06.2026; Warburg Pincus nicht mehr gelistet, Wellington 3,0 % = US-Fonds im Streubesitz), OVHcloud Familie Klaba 68 → 81 % nach Rückkauf 06.01.2025 (Bredin Prat 16.01.2025; Restanteile KKR/TowerBrook ungeklärt). Satz ergänzt: für den CLOUD Act zählt Kontrolle, nicht einzelne Aktien.
- Rest geprüft und stimmig: CLOUD Act 2018, Art. 48 DSGVO, Nebius Nasdaq, SecNumCloud. EU-US-Abkommen zum CLOUD Act: kein Abschluss gefunden (ungeklärt, keine 2026-Quelle), daher nichts ergänzt.
- `"stand":"15.10.2026"`; 188/188, Build streng ok. Kein Push. Offen: 04 (Zertifikate), 05 (Kommunen).

## Neu 15.10.2026 ~14:45 (Dauerlauf, RG2 Teil 1): DSGVO-Ratgeber nachgeprüft, lokal `49f7952`

- Mistral-ZDR stand falsch („nur im Scale-Plan“): jetzt laut unserem Profil nur bezahlte Tarife, nur auf begründeten Antrag (Mistral kann ablehnen), nur zustandslose API-Aufrufe; sonst 30 Tage Missbrauchsüberwachung.
- Gateway-Beispiel „17 US-Modellanbieter“ auf heutige Requesty-Liste (06.10.2026) gebracht: 41 Modellanbieter, davon 16 reine US-Firmen.
- Ergänzt: Data Privacy Framework gilt weiter (EuG 03.09.2025, T-553/23 Latombe, Klage abgewiesen; Rechtsmittel beim EuGH seit 31.10.2025 offen; Quellen wilmerhale.com 01.12.2025, dataguidance/secureprivacy, abgerufen 15.10.). Neuer Absatz: DSGVO-Teil des Digital Omnibus nicht beschlossen (Quelle acompli.ie 24.09.2026: erste Lesung, Ratsmandat-Abstimmung abgesagt, kein Trilog).
- `"stand":"15.10.2026"`; 188/188 Tests, Build streng ok. Kein Push. Offen: Ratgeber 03 (CLOUD Act), 04 (Zertifikate), 05 (Kommunen).

## Neu 15.10.2026 ~14:30 (Dauerlauf Laufend): AI-Act-Ratgeber auf den Digital Omnibus gebracht, lokal

- Alle fünf Ratgeber trugen fest „Stand: August 2026“ und waren seit dem 19.08. unverändert. Der AI-Act-Ratgeber war an zwei Stellen veraltet: KI-Kompetenz (Art. 4) ist seit dem Digital Omnibus (Verordnung (EU) 2026/1744, in Kraft 27.07.2026) nur noch eine Förderpflicht ohne garantiertes Niveau; Hochrisiko gilt jetzt ab 02.12.2027 (Anhang III) bzw. 02.08.2028 (Anhang I) statt „bis 2027“. Art. 50 gilt seit 02.08.2026, Übergang für die maschinenlesbare Kennzeichnung bis 02.12.2026 ergänzt.
- Quellen (abgerufen 15.10.): artificialintelligenceact.eu/ai-act-explorer/digital-omnibus/ (Wortlaut Art. 4 und Art. 113) und nicfab.eu (Amtsblatt 24.07.2026). EUR-Lex selbst liefert ohne Browser nichts (HTTP 202 leer).
- Neu: Feld `stand` (TT.MM.JJJJ) im META-Kopf eines Ratgebers; Fußzeile dann „Stand: 15.10.2026 (Rechtsstand geprüft)“, ohne Feld bleibt „Stand: August 2026“ (ehrlich: nicht nachgeprüft). Die anderen vier Ratgeber sind noch nicht nachgeprüft.
- 188/188 Tests (3 neu, vorher rot), Build streng ok, nur die AI-Act-Seite geändert. Kein Push; geht mit `bash dossiers/push-sauber.sh --push` durch Felix mit.

## Neu 15.10.2026 ~13:50 (Dauerlauf Laufend): Fall-Entwurf 008 (OVHcloud HDS) nachgeprüft, lokal

- Alle vier Quellen neu abgerufen (11:49 UTC): Alle vier Zitate stehen weiter wörtlich da. Die HDS-Produktliste trägt weiter „Last updated: June 2, 2026“, Tabelle textgleich zum 09.10., AI Endpoints weiter nicht darin. Widerspruch unverändert, nur Verlaufseintrag im Entwurf.
- 185/185 Tests, Build streng ok. Fall bleibt Entwurf; Anbieter informieren und Veröffentlichen erst nach Felix' Entscheidung.

## Neu 15.10.2026 ~11:55 (Dauerlauf): Gespräch 2 bestätigt (Mi 21.10.)

- Die Gegenseite hat den Termin Mi 21.10. 18:00 bestätigt und bittet um eine Video-Einladung (Teams). Kalender eingetragen, Antwort-Entwurf liegt. **Offen nur Felix:** Teams-Link erzeugen, in den Entwurf setzen, senden. Einzelheiten privat (`outreach/gespraeche/PRIVAT-NOTIZEN.md`).

## Neu 15.10.2026 ~11:35 (Dauerlauf Laufend): interne Links der Website sauber

- Gebaute Seite `docs/` geprüft: 134 Seiten, 4110 interne Links und Anker, 0 kaputt. Sitemap (65 Einträge) und `noindex` passen genau zusammen (Vergleichsseiten bewusst noindex außer 9, siehe `build.js`:49). Nichts geändert.

## Neu 15.10.2026 ~05:55 (Dauerlauf Laufend): Kill-Check-Stand nachgezogen (privat)

- Die Kill-Check-Tabelle im privaten Messprotokoll steht jetzt auf 15.10.: 1 von 5 Gesprächen, 0 von 2 Bedingungen, 0 von 1 Pilot, 55 Tage bis Mi 09.12. Ein zweites Gespräch ist angefragt, Termin von der Gegenseite unbestätigt.
- Engpass ist der Versand: Die am 14.10. freigegebenen Anfragen für die Gespräche 3 bis 5 liegen noch als Entwurf. Der nächste Handgriff liegt bei Felix (senden von hallo@), nicht beim Code.

## Neu 15.10.2026 ~04:50 (Dauerlauf Laufend): Aleph Alpha nachgeprüft, lokal

- Aleph Alpha war das einzige Profil mit Prüfständen vom 08.10. Neu abgerufen 15.10.: Startseite, `aleph-alpha.com/datenschutz/` (regelt weiter nur Website, Newsletter, Bewerbungen; kein Wort zu Pharia/API/Kunden), Produktdoku Pharia-LLM (Wortlaut „No prompt data is stored …“, „We do not log user inputs“, „We do not train on user data“ unverändert; die „Terms and Conditions“ sind weiter nicht verlinkt, der einzige Terms-Link `third-party-model-licensing-terms/` liefert 404), `aleph-alpha.com/trust/` weiter 404, Startseite nennt kein Zertifikat.
- Cohere-Zusammenschluss: Presse (Stand 15.10.) meldet weiter nur die Vereinbarung vom 16.09., kein Vollzug, Genehmigungen (Kanada, Deutschland/EU) offen. Kurzbeschreibung auf „bis 15.10.2026“ gesetzt.
- 9 Felder (Backup, Filter je Modell, Zweckbindung, Betroffenenrechte, Log-Zweck) `geprueft` 15.10., Status unverändert, darum kein Änderungsprotokoll.
- Nicht neu datiert: die drei DQS-Felder (Zertifizierer, Anwendungsbereich, DAkkS) und `iso_42001`. DQS-Kundendatenbank gibt weiter HTTP 403, die Angaben hängen an der Browser-Bestätigung vom 08.10. **Nachtrag ~05:00:** Mit Chrome versucht: Cloudflare verlangt jetzt das Häkchen „Bestätigen Sie, dass Sie ein Mensch sind“ (Ray ID a4ab845e89d9c7df). Das klickt der Dauerlauf nicht weg → Nur Felix (1 Klick, dann Zertifikatsnummer, Gültigkeit, Anwendungsbereich ablesen). aleph-alpha.com selbst nennt kein ISO 27001 (Startseite; /trust/, /security/, /compliance/ = 404). Felder bleiben auf 08.10./14.10.
- 185/185 Tests, Build streng ok. Kein Push; geht mit `bash dossiers/push-sauber.sh --push` durch Felix mit.

## Neu 15.10.2026 ~04:30 (Dauerlauf Laufend): Spickzettel für Gespräch 2 liegt (privat)

- Für das angefragte Gespräch Mi 21.10. liegt ein Spickzettel im privaten Gesprächsordner (gitignored, Muster Gespräch 1): Vertrauensfrage zuerst (Weg A), Ja/Nein festmachen, zwei Namen. Termin von der Gegenseite noch nicht bestätigt; Tagesprüfung achtet darauf. Einzelheiten nur in `outreach/gespraeche/PRIVAT-NOTIZEN.md`.

## Neu 15.10.2026 ~03:45 (Dauerlauf Laufend): Arbeitskopie push-fertig, Regolo-Quelle wieder da

- `VERBESSERER.md` (interne Dauerlauf-Notiz, verweist auf `~/allein`) steht jetzt in `.gitignore`; vorher blockte sie `dossiers/push-sauber.sh` („Arbeitskopie nicht sauber“). Lokal `811b8e8`.
- Prüfschritte 1–3 von `push-sauber.sh` von Hand nachgefahren (ohne Fetch/Push): keine privaten Namen im Endstand, kein Entwurfsfall in `docs/faelle`, 185/185 Tests, Build streng ohne Änderungen, Arbeitskopie sauber. 50 lokale Commits über dem zuletzt geholten origin/main. **Felix muss nur noch `bash dossiers/push-sauber.sh --push` tippen** (Opper, BFL, IONOS gehen damit online).
- `dpa.gov.al/axe-cs007-shkurt-2026/` (Regolo-Akkreditierung, Zeitüberschreitung im Trockenlauf 03:05): wieder erreichbar (301 auf das PDF, erster Abruf 11 s, zweiter 0,8 s), Inhalts-Hash `97e2e17ec76eff46` = Ledger. Unverändert, kein Status anzufassen; die Zeitüberschreitung war ein langsamer Server.

## Neu 15.10.2026 ~03:15 (Dauerlauf Laufend): Quellenlauf liest die BFL-Preisdatenbank mit, lokal

- Problem aus BF1: `docs.bfl.ai/quick_start/pricing` liefert ohne Browser leere Tabellen, eine BFL-Preisänderung hätte der Quellenlauf nie gemeldet.
- Neu im Profil: Feld `preisdaten` je Modell (alle 7 BFL-Modelle) mit der öffentlichen Sanity-Abfrage. `quelle` bleibt die lesbare Preisseite. Der Quellenlauf sammelt `preisdaten` mit und liest sie nach (nicht nur Erreichbarkeit), `preisarchiv.js` nimmt sie ohne `--url` mit.
- Die Abfrage hängt die Antwortzeit `"ms"` an (6, 7, … je Abruf). Der Inhalts-Hash lässt bei JSON nur dieses oberste Feld weg, alles andere zählt; JSON ohne `ms` bleibt Byte-Hash wie bisher (alte Ledger-Hashes unverändert).
- Ledger: nur die neue Quelle eingetragen (Hash `d1ceb21413946b7c` = Beleg von 00:40 ohne `ms`, die Preise stimmen also weiter). Die übrigen 21 Dateien nicht fortgeschrieben.
- 185/185 Tests (3 neu, 2 davon vorher rot), Build streng ok, Archivcheck 19 ok. Kein Push; geht mit dem nächsten `bash dossiers/push-sauber.sh --push` durch Felix mit.
- Nebenbefund Trockenlauf 03:05: `dpa.gov.al/axe-cs007-shkurt-2026/` (Regolo-Akkreditierung) lief in die Zeitüberschreitung, um 00:20 noch erreichbar. Bei der nächsten Tagesprüfung nachsehen, erst bei zweitem Ausfall Status anfassen.

## Neu 15.10.2026 ~00:40 (Dauerlauf BF1): BFL-Preise wieder belegt, Videopreise gesenkt, lokal, wartet auf Push durch Felix

- Die Preisseite `docs.bfl.ai/quick_start/pricing` füllt ihre Tabellen jetzt per JavaScript aus einer öffentlichen Sanity-Abfrage (`2gpum2i6.api.sanity.io`, `*[_type == "pricing"]`, Werte in Cent). Diese Abfrage ist ohne Browser lesbar; Beleg mit `node preisarchiv.js black-forest-labs --url <Abfrage>` unter `belege/preise/black-forest-labs/` (Seite + JSON, SHA256SUMS). Kein Chrome nötig.
- FLUX.2 [pro]/[max]/[flex]/[klein], Kontext [pro]/[max]: Profilpreise stimmen, `geprueft` 15.10.
- **FLUX 3 (Video) billiger:** jetzt 0,15/0,24/0,28/0,41 $/s (hd/fhd/qhd/uhd), v2v 0,21–0,45 $/s, Draft 0,06 $/s, v2v-Draft nicht mehr genannt (vorher 0,17/0,29/0,40/0,80, v2v 0,41–0,95). Anmerkung berichtigt, alter Stand darin genannt.
- **Neu im Profil: FLUX 3 (Bild)**, 0,041–0,607 $/Bild je Auflösung (768 bis 4k).
- Fall 2026-003 nennt keine Preise, also nicht betroffen.
- 182/182 Tests, Build streng ok, Archivcheck 19 ok. Online nur über `bash dossiers/push-sauber.sh --push` durch Felix (zusammen mit Opper/IONOS).
- Tipp für den Quellenlauf: Die Preis-URL im Profil liefert jetzt immer leere Tabellen; eine Preisänderung sieht der Lauf dort nicht mehr. Bei der nächsten Tagesprüfung die Sanity-Abfrage mitprüfen.

## Neu 15.10.2026 ~00:45 (Dauerlauf OP1): Opper-Profil berichtigt, lokal, wartet auf Push durch Felix

- `data/anbieter/opper-ai.json`: Backup-Zitat in allen 5 Modellen auf „monthly snapshots for fourteen months“ (mit Hinweis auf den alten Wortlaut „weekly“), `vertrag.log_frist` Wert jetzt „monatliche 14 Monate“ + hochgeladene Dateien bleiben, bis der Kunde sie löscht (Tracing-Regeln gelten für sie nicht, auch nicht 0 Tage), Anmerkung mit Zitat Abschnitt 3. `geprueft` dieser 6 Felder 15.10. Status unverändert, darum kein Eintrag im Änderungsprotokoll.
- Beleg `belege/anbieter/opper-ai/opper-security-overview-2026-10-15.txt` + `SHA256SUMS`, Archivkopie web.archive.org/web/20261014221545 (enthält den neuen Wortlaut, geprüft).
- 182/182 Tests, Build streng ok, Archivcheck 19 ok. Online nur über `bash dossiers/push-sauber.sh --push` durch Felix (Frage im Dauerlauf). Der Pilot-Vorrat `dossiers/pilot-vorrat-2026-10-14/opper-ai.md` zitiert noch „weekly“; er ist ein datierter Stand und bleibt so, ein neues Opper-Dossier zieht den neuen Wortlaut.

## Neu 15.10.2026 ~00:20 (Dauerlauf Tagesprüfung): Opper umformuliert, BFL-Preise unlesbar

- 182/182 Tests (`node --test test/*.js`), Build streng ok, Archivcheck 19 ok. Quellenlauf trocken 201/176/24/0. Fälle 003/004 inhaltlich unverändert.
- **Opper** `opper.ai/security-overview` bei gleichem Datum (2026-10-05) umformuliert: Backups jetzt „monthly snapshots for fourteen months“ (vorher „weekly“), Files „Retention rules do not apply to them at any period, including zero days“. Profilfelder `backup_standort`/`vertrag.log_frist` betroffen → Dauerlauf OP1 (lokal, kein Push). Kopie `~/allein/tmp/tp1015/dl/opsec.html`.
- **BFL** Preis-Seite zeigt ohne Browser keine Einzelpreise mehr → Dauerlauf BF1 (mit Chrome lesen).
- Lyceum AGB „October 2026“: zitierte Ziffern 5.2, 15.4, 17.2, 19.1 unverändert.

## Neu 14.10.2026 ~18:15 (Dauerlauf): IONOS-Korrektur freigegeben, Push liegt bei Felix

- Frage 278: Felix sagt ja, die korrigierte IONOS-Angabe (AVV 1.4, Ziffer 12.6) soll online, nur über `bash dossiers/push-sauber.sh --push`. Der Dauerlauf darf nicht ins öffentliche Repo pushen (Rechte-Filter hat den Lauf abgelehnt). Felix pusht. Vorher: Arbeitskopie sauber machen (diese Datei committen; `VERBESSERER.md` ist neu und intern, also gitignoren oder aus dem Ordner nehmen), dann erst `bash dossiers/push-sauber.sh` (nur Prüfung), dann `--push`.
- Ein Gespräch für den Kill-Check ist angefragt (Termin Mi 21.10.), Einzelheiten privat.

## Neu 14.10.2026 ~12:25 (Dauerlauf Verbesserer): Idee Feed je Anbieter, wartet auf Felix

- Bisher gibt es nur einen Atom-Feed für alle Anbieter. Vorbild UpGuard Trust Center (Abo nur für einen Anbieter, nur wesentliche Änderungen). Vorschlag: `/anbieter/<id>/feed.xml`, gefiltert aus `atomFeed`. Details `VERBESSERER.md`, nichts gebaut.

## Neu 14.10.2026 ~10:25 (Dauerlauf Laufend): Messprotokoll zeigt jetzt den gültigen Kill-Check

- `MESSUNG.md` (privat, gitignored) nannte oben noch die August-Kriterien (Zitat, 500 Besucher, zahlender Anbieter). Jetzt steht oben der Kill-Check vom 09.12. mit Zählstand (Gespräche 1/5, Bedingungen 0/2, Pilot 0/1) und Zwischenzielen je Mittwoch (28.10.: 2 Gespräche + 1 Dossier angeboten, 11.11.: 3, 18.11.: 4, 02.12.: 5, eine Woche Puffer). Zwischenziele sind Vorschlag, nicht abgenommen. Die alten Kriterien stehen darunter als Verlauf.

## Neu 14.10.2026 ~09:50 (Dauerlauf Laufend): Push nur noch über `dossiers/push-sauber.sh`, lokal `d7915dd`

- **Befund:** Diese Datei ist öffentlich, trotzdem standen seit 12.10. wieder Mail-Inhalte Dritter darin (zwei Fachantworten, die BvD-Weiterleitung, Kandidatennamen, Entwurfs-IDs, ein Satz über einen Anwalt, der vertraulich bleiben will). Gleiches Muster wie Frage 222 (09.10.).
- **Bereinigt:** Die Stellen stehen jetzt in `outreach/gespraeche/PRIVAT-NOTIZEN.md` (gitignored), hier neutrale Zeilen. **Regel: Mail- und Gesprächsinhalte Dritter nur dort, nie hier.**
- **Push-Falle:** Ein normaler `git push` der jetzt 45 Commits stellt die Zwischenstände mit diesen Inhalten in die öffentliche Historie. Deshalb `bash dossiers/push-sauber.sh` (prüft nur) bzw. `--push`: prüft private Namen, Entwurfsfälle in `docs/faelle`, Tests, Build streng, fasst alles zu **einem** Commit über origin/main zusammen (kein Force-Push), Einzelcommits bleiben lokal im Zweig `sicherung-vor-push-<datum>`. An Wegwerf-Kopien geprobt: ein Commit, Baum gleich lokal, eingefügter Name → Stopp; frische Windows-Kopien melden nach dem Build Schein-Änderungen, das Skript löst sie per `git add -u` auf.
- **Was online ginge:** `dossiers/PUSH-UEBERSICHT-2026-10-14.md` (privat). → Frage 302.
- 182/182 Tests, Build streng ok.


## Neu 14.10.2026 ~09:25 (Dauerlauf Laufend): Nordference-Widerspruch geklärt, lokal `64c7c0d`

- Skript-Bündel `nordference.ai/assets/index-CGzvo87P.js` neu abgerufen (unverändert derselbe Dateiname): Tabellen-Definition `{featureKey:"comparison.features.euAiAct",nordference:!0,…}` → das Bündel zeichnet für Nordference ein **Häkchen** (Wert `true` wird als Haken-Symbol gerendert). Die `ai_act`-Anmerkung stimmte, die `iso_42001`-Anmerkung („keinen Eintrag“) war falsch.
- `iso_42001`-Anmerkung berichtigt (Häkchen bei der Bereitschafts-Zeile, keine ISO-42001-Zertifizierung damit behauptet), Status `unbelegt` unverändert. Auszug + SHA in `belege/anbieter/nordference/` (neu).
- 182/182 Tests, Build streng ok, Dossier Nordference ok, Archivcheck ok. Kein Push.

## Neu 14.10.2026 ~09:30 (Dauerlauf Laufend): Pilot-Vorrat, alle 21 Profile ergeben jetzt ein Dossier, lokal `f8a1f3b`

- **Befund:** Für den Pilot (Kill-Check Kriterium 3: „Ich mache Ihnen für den Anbieter, den Sie gerade prüfen, ein Dossier“) lief `node dossier.js <id>` nur bei 10 von 21 Anbietern. Bei 11 (Black Forest Labs, DeepL, EUrouter, Gcore, Hetzner, Infomaniak, Mistral, Nordference, Requesty, STACKIT, T-Systems) verweigerte der Normenbezugs-Wächter die Ausgabe. Ursache: Artikelnummern und „AI Act“ in unseren eigenen `ai_act[].pflicht`-Bezeichnungen, bei Nordference zusätzlich die Quell-URL `nordference.ai/gdpr`.
- **Behoben nach Beschluss 18.09.** („beim ersten Dossier für so ein Profil wird genau dieses Profil auf Tatsachen umgeschrieben“): Bezeichnungen ohne Artikelnummer, Muster der sauberen Profile („Transparenzdokumentation für Basismodelle“, „EU-Regeln für KI“). Status, Quellen, Zitate unverändert. Bei Nordference zwei Anmerkungen umformuliert, die den Anbieterwortlaut „EU AI Act Ready“ einbetteten (jetzt „Zeile zur Bereitschaft für die EU-Regeln für KI ('… Ready')“).
- **Wächter-Fehler behoben:** Ein Feld, das nur aus einer URL besteht, wird nicht mehr geprüft (der Kommentar im Code erlaubte URLs schon, die Prüfung nicht). Zwei neue Tests: URL-Feld bleibt sauber, und **jedes Profil in `data/anbieter/` muss ein Dossier ergeben** (fängt künftige Profile ab).
- **Vorrat:** `dossiers/pilot-vorrat-2026-10-14/<id>.md` für alle 21 (gitignored, Feld „Für:“ leer). Im Gespräch zusagen, danach mit `node dossier.js <id> --fuer "Name, Funktion, Organisation"` frisch erzeugen.
- Live-Seite zeigt die neuen Bezeichnungen erst nach dem nächsten Push (kein Push ohne „steht“).
- **Nebenbefund (ERLEDIGT 14.10. ~09:25, `64c7c0d`, Häkchen steht):** Nordference widerspricht sich im eigenen Profil: Die `iso_42001`-Anmerkung sagt, die Bereitschafts-Zeile habe „für Nordference keinen Eintrag“, die `ai_act`-Anmerkung (05.10., aus dem Skript-Bündel) sagt „mit Häkchen“. Beim nächsten Nordference-Quellenlauf von Hand klären.
- 182/182 Tests, Build streng ok, Archivcheck 19 ok.

## Neu 14.10.2026 08:48 (Dauerlauf Laufend): Quellenlauf, alle 46 offenen Meldungen gesichtet, lokal `1fa0d9e`

- **Exoscale, echte Preisänderung:** Qwen3-Coder-480B (Dedicated Inference, 4x RTX Pro 6000) jetzt **ab 8,61 €/h statt 15,97 €/h** (= 4 × 2,15 €). Profil nachgezogen; gpt-oss-20b/-120b unverändert (1,34 / 2,15 bzw. 4,55 €/h). Live steht bis zum Push noch 15,97 €.
- **EUrouter:** Subprozessorliste im DPA jetzt „Stand 9 October 2026“ (weiter 15 AI-Provider, Scaleway, Better Stack, PostHog, Mollie; CaptchaFox entfallen), Datenschutzerklärung Version 1.3 vom 09.10.; alle zitierten Sätze wörtlich unverändert, nur Version/Datum im Profil nachgezogen. Modellpreise (DeepSeek V3.2, Kimi K2.6, Gemma 4, Mistral Large 3) über die offene API unverändert.
- **Regolo:** Datenschutz Fassung 1.1 vom 07.10. (neu nur Google-Ads-Tracking auf der Website, USA per DPF/SCC); Sätze zu Ein-/Ausgaben unverändert, Anmerkung ergänzt.
- **Requesty:** Quickstart-FAQ neu: „No. Requesty is a pass-through gateway and does not train on your requests or responses.“, NVIDIA/Poolside-Zusatz weg. Privacy Policy behält weiter „own use of content for training is limited to free plan accounts“. Widerspruch damit schärfer; Nachtrag in `outreach/fall-kandidaten.md`, kein Fall eröffnet.
- Rest Menüs, Cookie-Banner, Blog-Teaser, Download-Zähler (Aleph Alpha, GreenPT, Infomaniak, Lyceum, Scaleway, Opper, OVH, CSA-Register, T-Systems neue Modelle), bei GreenPT/STACKIT die Zitate maschinell gegengeprüft. Belege `belege/anbieter/{exoscale,eurouter,requesty,regolo}/*-2026-10-14.txt` + SHA256SUMS. 47 Quellen übernommen.
- **Rauschen, bleibt „verändert“:** esante.gouv.fr HDS-Liste (Zufallswert je Abruf) und opper.ai/models (Preise anderer Modelle ändern sich im Minutentakt; unsere fünf fest).
- 180/180 Tests, Build streng ok, Archivcheck 19 ok. Kein Push.

## Neu 14.10.2026 06:40 (Dauerlauf): Fall 006 Halbzeit-Nachfassen als Entwurf

- Keine Antwort von T-Systems (Thread `1a116649cb8a70cd`, Suche 8 Tage). Quellen neu abgerufen: Leistungsbeschreibung unverändert v1.24; Trust-Seite und Prefix-Caching-Doku haben die **Versionsnummer der Leistungsbeschreibung gestrichen**, „Not stored“/„never saved“ stehen unverändert → nicht ausgeräumt. Kopien `belege/faelle/2026-006/*-2026-10-14.html`.
- Gmail-Entwurf `r1029420454938602694` im Thread an ai@t-systems.com liegt, **Felix sendet** (von felix.h.lind@gmail.com). Danach Verlauf im Fall-JSON „Halbzeit-Erinnerung gesendet <Datum UTC>“, lokal committen.
- Frist Mi 21.10.2026: ohne Antwort Status `bestaetigt`, Fall bleibt bis Felix' „steht“ im Entwurf (kein Push).

## Beschluss 12.10.2026 abends (Felix, Home-Tab): neuer Kill-Check, Weg A

- **Grund:** Der alte Kill-Check (KI zitiert, 500 Besucher/Monat, 1 zahlender Anbieter) mass das Geschaeft vom August. Durch das Schlademann-Gespraech wissen wir: Zahler sind eher Datenschutzbeauftragte und Rechtsabteilungen (40 h pro Pruefung). Kriterien 2 und 3 alt waeren sicher verfehlt, sie messen das Falsche.
- **Neuer Kill-Check, Frist Mi 09.12.2026:** (1) 5 Gespraeche mit Pruefern, Datenschutzbeauftragten oder Rechtsabteilungen (1 geführt: Schlademann 08.10.); (2) mindestens 2 nennen eine konkrete Bedingung, unter der sie zahlen oder unterschreiben; (3) 1 Pilot: jemand nimmt ein Gratis-Dossier an und nutzt es. Bei 2 von 3 verfehlt: einfrieren. Der Check vom Mi 14.10. entfaellt.
- **Weg A:** Gespraeche 2 bis 5 drehen sich um die Vertrauensfrage: „Was muesste die Quelle vorweisen (Person, Haftung, Versicherung, Akkreditierung, Verbands-Mitgliedschaft), damit Sie dem Stempel vertrauen und dafuer zahlen?“ Der Dauerlauf sucht die Gespraechspartner und bereitet vor, Felix fuehrt die Gespraeche.
- **Rahmen (Felix):** Guard ist die Mission, belegbar.eu ist das Projekt, das Geld bringt. Daneben Souffleur. Der Rest ist Spass.


**Stand:** 2026-10-14, ~09:50 (Dauerlauf Laufend: Mail-Inhalte Dritter aus dieser Datei verschoben, Push nur über `dossiers/push-sauber.sh`, lokal `d7915dd`, Frage 302); davor 2026-10-14, ~09:25 (Dauerlauf Laufend: Nordference-Widerspruch geklärt, lokal `64c7c0d`); davor 2026-10-14, ~09:30 (Dauerlauf Laufend: alle 21 Profile dossierfähig, Wächter-URL-Fehler behoben, lokal `f8a1f3b`); davor 2026-10-14, 08:48 (Dauerlauf Laufend: alle 46 Quellenlauf-Meldungen gesichtet, Exoscale-Preis gesenkt, lokal `1fa0d9e`); davor 2026-10-14, 08:45 (Dauerlauf Laufend: vier vom Quellenlauf gemeldete Quellen von Hand gelesen, OVH SecNumCloud nachgezogen, lokal `d7d8d78`); davor 2026-10-14, 07:50 (Dauerlauf J12: Reichweite-Messung als Verlaufswert, alter Kill-Check 14.10. entfällt, nichts verändert); davor 2026-10-12, 03:45 (Fachantwort zur Zertifikats-Grenze, privat, Frage 271); davor 2026-10-11, 19:05 (Felix hat von hallo@ gesendet: GreenPT-Nachfrage, Opper-Dank, BvD-Ausschuss; Dauerlauf schickte Fachfrage an Kekatos/Clone Systems 18:42; Tagesprüfung achtet auf Antworten, Schlademann-Entwurf bleibt bis zu seiner Antwort); davor 2026-10-11, 01:15 (Dauerlauf AF5: OVH HDS, BYCYB bei COFRAC akkreditiert, lokal `b783141`); davor 2026-10-10, 22:10 (Dauerlauf Laufend: IONOS-Log-Frist erneut gesucht, keine öffentliche Zahl, Profil unverändert); davor 2026-10-10, 21:05 (Dauerlauf Laufend: `node messung.js` = Technik-Teil des Kill-Checks als ein Befehl); davor 2026-10-10, 20:46 (Dauerlauf Laufend: `.gitattributes` LF für docs/guides/src/Ledger, lokal `e14a6b8` + `424b75b`); davor 2026-10-10, 20:30 (Dauerlauf Laufend: Merge-Probe der vier Vorschlags-Zweige + CRLF-Fix Ratgeber, lokal `a905939`); davor 2026-10-10, 20:10 (Dauerlauf Laufend: Filter-Lücke HIPAA u. a., Zweig `vorschlag-257` `8b9bb2b`); davor 2026-10-10, 19:55 (Dauerlauf Laufend: Filter-Lücke DORA/NIS 2, Zweig `vorschlag-256` `88e6882`); davor 2026-10-10, 19:00 (Dauerlauf Laufend: Filter-Lücke „AI-Act“ mit Bindestrich, Zweig `vorschlag-234b` `a4fd71b`); davor 2026-10-10, 18:55 (Dauerlauf HV3: Garantie-Vorschlag für den Kill-Check); davor 2026-10-10, 18:32 (Dauerlauf Laufend: Frage 234 a als Zweig `vorschlag-234` `597e3e3`, main unberührt); davor 2026-10-10, 17:40 (Dauerlauf Laufend: IONOS-Modellliste, lokal `5a83607`); davor 2026-10-10, 17:10 (Dauerlauf Laufend: Welle 3 Gesprächskandidaten, Frage 248); davor 2026-10-10, 15:47 (Dauerlauf B4: Vorlage Kill-Check 14.10. in `MESSUNG.md`, Messung 10.10., Vorschlag „nicht einfrieren bis 30.11.“, Frage 244); davor 2026-10-10, 15:55 (Dauerlauf B3: BvD-Nachfassen an Ausschuss Prüfaufgaben als Gmail-Entwurf, Leitfaden-Kernfragen 3/4/5/7 geschärft); davor 2026-10-10, 15:45 (Dauerlauf B2: /fuer-kaeufer/ Abschnitt für Auditoren/DSB + Muster-Dossier IONOS, lokal `dcb6b45`, Frage 242); davor 2026-10-10, 15:40 (Dauerlauf B1: Pilot-Angebot Schlademann als Gmail-Entwurf); davor 2026-10-10, 14:26 (Dauerlauf Laufend: Quellenlauf liest dpa.gov.al, lokal `da6e66b`); davor 2026-10-10, 14:10 (Dauerlauf Laufend: Quellenlauf, 15 veränderte Quellen von Hand gelesen, IAS-Blatt Mistral-Zertifizierer neu, lokal `c474152`, Frage 236); davor 2026-10-10, 11:45 (Dauerlauf E1: Anmerkungen ohne Normenbezug nach 232 a, lokal `fbe8ede`, Dossiers 3 → 10 von 21, Frage 234); davor 2026-10-10, 10:59 (Dauerlauf K7: V5 Abschnitt 2 neu gefasst nach 221 a, nur Entwurf, Frage 233 zu „ein Mensch hat gelesen“); davor 2026-10-10, 10:33 (Dauerlauf K6: Quellenlauf-Kasten V4 gebaut, lokal `f692f6d`, main 18 vor origin, kein Push ohne „steht“); davor 2026-10-10, 09:13 (Dauerlauf K5: Dossier V3 gebaut, lokal `eb7030c`, kein Push nötig); davor 2026-10-10, 08:07 (Dauerlauf R1: Rosenthal-Zitat als „Fachliche Einordnung“ auf Fall 004, lokal `bddccdc`, kein Push bis Frage 231); davor 2026-10-09, 20:55 (Dauerlauf K4b: Strenge-Runde außerhalb der 217-Liste, lokal `f8765e2`, kein Push); davor 19:35 (Dauerlauf K4: Strenge-Runde 217, zehn Einträge auf „beansprucht“, lokal `6cf0a88`, kein Push); davor 18:55 (Dauerlauf K3: TISAX Exoscale/T-Systems auf „beansprucht“, lokal `facf6e5`, kein Push); davor 13:37 real (Dauerlauf Laufend: TISAX-Gültigkeit Exoscale/T-Systems, lokal `2109a6c`, kein Push, Frage 228; davor 13:25 real (Dauerlauf Laufend: T-Systems-Modellstandorte nach Wortlaut 09.10. berichtigt, EUrouter-Website zeigt 0 Modelle, API-Preise stimmen, lokal `bd46fcb`, kein Push); davor 12:50 real (Dauerlauf Laufend: Gcore-Subprozessoren und Lyceum-DPA aus dem Browser belegt, lokal `62c0f69`, kein Push; davor 12:35 Dauerlauf Laufend: Quellenlauf bricht bei unbekanntem Schalter ab, lokal `35e72a6` + `e6b3929`, kein Push; davor 12:20 Dauerlauf Laufend: Dossier-Anzeigefehler Prüfpunkt-Unterfelder behoben, lokal, kein Push; davor 11:53 Dauerlauf Laufend: Einzelprüfung der offenen „verändert“-Quellen, EUrouter-Preise Kimi K2.6/Gemma 4 berichtigt, lokal `179ce37`, kein Push; davor 11:38 Laufend: Quellenlauf 11:35, Top-Modus-Fehler behoben, `--uebernehmen-nur` neu, lokal `3ef1ee3` + `709a961`, kein Push; davor 09:40 V5 Vorschlag „Wer prüft hier, wie“ in `dossiers/VORSCHLAG-WER-PRUEFT-V5.md`, Frage 221, nichts gebaut; davor V4b Quellenlauf, alle 198 Quellen jetzt im Ledger, PDF-Hash ohne Zeitstempel, lokal `75f45ca` + `a940568`, kein Push; davor 09:30 V4 Vorschlag Quellenlauf sichtbar liegt in `dossiers/VORSCHLAG-QUELLENLAUF-V4.md`, Frage 220, nichts gebaut; davor V3 Vorschlag Dossier-Format `dossiers/VORSCHLAG-FORMAT-V3.md`, Frage 219; davor V2 ISO 42001 lokal `92b2325`, kein Push)
Antwort seit 14.09. live, Status „beantwortet“. LinkedIn: keine Antwort auf Welle 1.) · **16.09. abends (Home-Tab):** Nachfassen an alle vier offenen Welle-1-Kontakte gesendet (`outreach/mails/14-…`), **Perplexity zitiert belegbar.eu (Kriterium 1 erstmals erfüllt, Details MESSUNG.md)**, ChatGPT nicht; Angebots-Entwurf in `ANGEBOT-ENTWURF.md`; **Beschlüsse Felix 21:15 in MESSUNG.md** (B zuerst, GUARD-Wortlaut, kein Einfrieren 14.10.); gebaut und ungetrackt: `dossier.js`, `lib/dossier.js`, `test/dossier.test.js`, `dossiers/BEISPIEL-scaleway-2026-09-16.md`, `ENTWURF-FESTPREIS-ABSATZ.md` (Diff-Plan gegen build.js). **16.09. 21:15: Freigabe erteilt, umgesetzt, LIVE (Commit `e2c64e5`):** /fuer-anbieter/ mit „Eintritt zum Festpreis“ (490 € Aufnahme, 190 € Zusage), neue Seite /fuer-kaeufer/ (Dossier 390 €), Methodik mit Finanzierung Stand 16.09. und Abschnitt „Regeländerungen“; alle Preise ohne USt (§ 19 UStG). Search Console 16.09.: 4 Klicks, 174 Impressionen (28 Tage), 21 Seiten indexiert (24.08.: 0 / 1 / 4). Folgearbeit: Profilfeld für bezahlte Einträge (Entwurf Punkt 10), Dossier-Vorlage, MESSUNG Kriterium 3 auf GUARD-Wortlaut.
**Führendes Dokument:** `MESSUNG.md` (Kill-Kriterien) · Ziel-Satz in `~/THESE.md`
**Phase:** live, 4 Fälle, Engpass ist nicht mehr Code, sondern Rücklauf von außen. Erster Anbieter, der eine Korrektur wörtlich ankündigt: Scaleway (14.09.).


## Neu 14.10.2026 08:45 (Dauerlauf Laufend): Quellenlauf, vier Quellen von Hand gelesen, lokal `d7d8d78`

- **OVH SecNumCloud-Seite neu gegliedert, inhaltlich geändert:** neu „In September 2026, OVHcloud obtained the SecNumCloud qualification for the SNC Cloud Platform solution.“; die Stelle von 2020 heißt jetzt „Managed VMware vSphere“ statt „VMware on OVHcloud“ (unser altes Zitat stand damit nicht mehr wörtlich da). Anwendungsbereich und Anmerkung im Profil nachgezogen, Status bleibt „beansprucht“, AI Endpoints weiter nicht unter den qualifizierten Angeboten. Textkopie `belege/anbieter/ovhcloud/secnumcloud-seite-2026-10-14.txt` + SHA256SUMS.
- **Mistral ZDR:** nur der Linktext zur Training-FAQ geändert; die zitierten Sätze („may approve or deny it“, Admin Panel › Vibe › Privacy) stehen wörtlich. Nichts geändert.
- **Nebius auf OpenRouter:** die Seite sortiert nur ihre Modellliste um. Über die offene API (`/api/v1/models/<id>/endpoints`) geprüft: GLM-5.1 1,40/4,40, gpt-oss-120b 0,15/0,60, Qwen3-235B 0,20/0,60 USD, unverändert.
- **RvA C096 (Akkreditierung SII):** nur der Stellenzähler „Work at (1)“ → „(0)“, Akkreditierung unverändert gelistet.
- Diese vier mit `--uebernehmen-nur` als neue Referenz übernommen; 46 weitere „verändert“ bleiben offen (laut Tagesprüfung fast alles Menüs/Preise/Teaser). 180/180 Tests, Build streng ok, Archivcheck 19 ok. Kein Push.

## Neu 14.10.2026 06:55 (Dauerlauf BA1): Gespräche 2 bis 5 vorbereitet, 9 Entwürfe, nichts gesendet

- Blatt `outreach/gespraeche/GESPRAECHE-2-5.md`: 10 Kandidaten (warm zuerst) mit Quelle, Grund und ob sie für den Kill-Check zählen; Fragezettel mit der **Vertrauensfrage zuerst** (bewusste Abweichung von `leitfaden.md`), dann Ja/Nein, Geld, letztes Mal, Pilot-Angebot, zwei Namen; Einstiegssatz je Person.
- Gmail-Entwürfe (Felix sendet, Absender auf hallo@ umstellen): 9 Anfragen, Namen und Reihenfolge nur im privaten Blatt; zwei davon erst ab Fr 16.10.
- Empfehlung zuerst: vier Kandidaten laut Blatt → Frage 286. Das Blatt ist per .gitignore privat (Namen, Entwurfs-IDs).
- **BvD Ausschuss Prüfaufgaben 13.10.:** Bitte an die Mitglieder weitergeleitet (Inhalt privat: `outreach/gespraeche/PRIVAT-NOTIZEN.md`, gitignored); Tagesprüfung achtet auf Antworten.

## Neu 14.10.2026 06:15 (Dauerlauf Tagesprüfung): IONOS-AVV Version 1.4 mit neuer Ziffer 12.6, eine Fachantwort mit Gesprächsangebot

- **IONOS AVV jetzt Version 1.4, Stand 10/2026** (vorher 1.3, 03/2026). Neu Ziffer 12.6 wörtlich: „Der Auftraggeber erlaubt dem Auftragnehmer, personenbezogene Daten, die im Auftrag verarbeitet wurden, zu anonymisieren und die anonymisierten Daten anschließend zum Zweck der Produktverbesserung zu verwenden.“ Textkopie `belege/anbieter/ionos/ionos-avv-v1.4-2026-10-14.txt` + SHA256SUMS.
- Damit war der Satz im Profil (Zweckbindung) „Weitere Zwecke (… Produktverbesserung …) nennt keines der beiden Dokumente“ falsch. Anmerkung in `data/anbieter/ionos.json` korrigiert (wörtliches Zitat, Version, Abrufdatum; ob 12.6 für den AI Model Hub greift = ungeklärt). **Wert `zweckbindung: true` nicht geändert** → Frage 278 (Wert ändern? IONOS fragen?). Lokal committet, kein Push; live steht bis zum Push der alte, jetzt falsche Satz.
- **Fachantwort 13.10.** (Forscher, Prüf-Verfahren) mit Angebot eines Gesprächs → warmer Kontakt für Gespräche 2 bis 5, Frage 279 (Inhalt privat: `outreach/gespraeche/PRIVAT-NOTIZEN.md`, gitignored).
- 180/180 Tests, Archivcheck 19 ok, Build streng ok. Quellenlauf trocken 201: 149 unverändert, **50 verändert** (seit dem letzten Übernehmen am 10.10. aufgelaufen; fast alles Menüs/Preise/Teaser), 0 verschwunden, 1 neu, 1 übersprungen. Von Hand lesen beim nächsten Laufend-Punkt: OVH SecNumCloud-Seite neu gegliedert (`ovhcloud.zertifikate.4.anwendungsbereich`), Mistral-ZDR-Seite (FAQ „opt out of training“ neu), Nebius-Modellpreise. Fallquellen 003 (BFL) und 004 (Scaleway, nur Menüwörter) inhaltlich unverändert.

## Neu 12.10.2026 03:45 (Dauerlauf): Fachantwort zur Zertifikats-Grenze (Common Criteria / ISO 27001)

- Fachantwort eines Forschers auf die Fachfrage vom 11.10. (Inhalt privat: `outreach/gespraeche/PRIVAT-NOTIZEN.md`, gitignored). Nicht zitieren und nicht nennen ohne Zusage; Bitte um Zitiererlaubnis liegt als Gmail-Entwurf → Frage 271.
- Käufer-Signal: keins (Forscher, kein Auditor).

## Neu 11.10.2026 01:15 (Dauerlauf AF5): OVH HDS, Zertifizierer BYCYB akkreditiert, lokal `b783141`

- COFRAC-Attestation **N° 4-0660 Rev. 4** für BYCYB (Montrouge, SIREN 942788845) nach NF EN ISO/IEC 17021-1:2015, gültig **02.06.2026 bis 31.01.2029**, Anhang: „Certification selon le référentiel Hébergeurs de données de santé HDS“ (Référentiel d'accréditation HDS V2) und ISO/IEC 27001:2022 (https://tools.cofrac.fr/annexes/Sect4/4-0660.pdf, Abruf 11.10. 01:10, PDF-SHA256 `4d33ba25…6e5f`).
- `ovhcloud.json` HDS → `akkreditiert_dakks`: von „unbelegt“ auf `wert: false, stelle: COFRAC, stelle_ea_mla: true, belegt` (Muster wie Scaleway HDS). Textkopie `belege/anbieter/ovhcloud/cofrac-4-0660-bycyb-2026-10-11.txt` + SHA256SUMS. Wayback-Sicherung lief in einen Timeout, nicht wiederholt.
- Offen bleibt: ob das OVH-Zertifikat unter genau dieser Akkreditierung ausgestellt ist (Zertifikat nicht öffentlich), und HDS v2018 (Doku) gegen V2.0 (Register).
- 180/180 Tests, Build streng ok, Archivcheck 19 ok. Kein Push.

## Neu 11.10.2026 01:05 (Dauerlauf AF4): Infomaniak Swiss-Hosting-Label geprüft

- **Was es zusagt:** laut Labelgeberin einen Rechtsstatus, keine Technik: Sitz und Leitung in der Schweiz, Daten/Anwendungen in einem Schweizer Rechenzentrum, Schweizer Recht, kein Zugriff aus dem Ausland (auch nicht über Konzernfirmen); „a promise of a specific legal status – not a technical one“.
- **Wer vergibt:** die Firma swiss made software, nur an Mitglieder, per Nutzungsbedingungen mit Sanktionen bei Missbrauch; eine Prüfung durch Dritte beschreibt die Seite nicht, Vertragsdokumente „temporarily unavailable“. Keine Akkreditierung.
- **Führt Infomaniak es öffentlich:** ja, doppelt: Infomaniak-Zertifikatsseite und die Liste „hosting-partner of swiss hosting“ der Labelgeberin (ohne Teil-Vermerk). Status „belegt“ bleibt damit nach Grundsatz 217 stehen (Labelbesitz durch Dritte öffentlich belegt), Anwendungsbereich bleibt „beansprucht“ (kein Label-Dokument mit Umfang).
- Anmerkungen im Profil ergänzt, Textkopie `belege/anbieter/infomaniak/swissmadesoftware-swiss-hosting-2026-10-11.txt` + SHA256SUMS. 180/180 Tests, Build streng ok, Archivcheck ok, lokal committet. Kein Push.

## Neu 11.10.2026 00:57 (Dauerlauf AF3): EUrouter-Profil nachgezogen, lokal `619eece`

- `api.eurouter.ai/api/v1/models` (ohne Schlüssel, 144 Modelle, Abruf 10.10. 22:55 UTC, Kopie `~/allein/tmp/af3/models.json`, SHA-256 4d500e68…): Claude Sonnet 5.5 2,20/11,00 USD, Haiku 5.5 0,11/0,55 USD, beide auch auf den Modellseiten `/models/claude-sonnet-5-5` und `/claude-haiku-5-5` (die Einzelseiten sind wieder erreichbar, Fund 10.10. „404“ gilt nicht mehr). In der Claude-Sammelanmerkung nachgetragen; dazu: die API führt für alle Claude-Varianten nur „AWS Bedrock“, Microsoft Foundry nicht. Das `standort`-Feld („AWS Bedrock / Microsoft Foundry EU-Regionen“) ist unverändert, siehe Frage unten.
- **Gemma 4, Währung bleibt ungeklärt:** Die Modellseite zeigt sichtbar $0.10/$0.50 und im Markup `priceCurrency USD`, API und eingebettete Modelldaten sagen `currency EUR`. In der Anmerkung stehen beide Angaben, das Profil sagt weiter USD (sichtbare Anzeige). Klärbar nur über EUrouter selbst (Fachfrage) oder eine Rechnung.
- Übrige Preise (DeepSeek V3.2, Kimi K2.6, Mistral Large 3, ältere Claude-Varianten) unverändert. 180/180 Tests, Build streng ok. Kein Push.

## Neu 11.10.2026 00:35 (Dauerlauf, Wöchentlich KW 41): Ausbau-Vorschlag

- Frage 260 an Felix: alle 21 Anbieter zur Prüfung ihres Profils einladen (Gmail-Entwürfe, Felix sendet) und je Profil eine Zeile „Zur Prüfung eingeladen am …, Antwort: …“ (lokaler Zweig `profil-einladung`); zielt auf Kriterium 3. Empfehlung: nach dem Kill-Check 14.10.

## Neu 12.10.2026 00:40 (Dauerlauf Tagesprüfung)

- 180/180 Tests, Archivcheck 19 Zitate in 13 Kopien ok, Quellenlauf trocken 201 Quellen: 182 unverändert, 17 verändert, 0 verschwunden, 1 neu, 1 übersprungen. Fallquellen 003 (BFL) und 004 (Scaleway) unverändert. Gmail: keine Antwort von GreenPT, Opper, BvD oder Anbietern.
- **EUrouter Datenschutzerklärung jetzt Version 1.3 („Last updated: 9 October 2026“)**, vorher 1.2. Die im Profil zitierten Sätze (12 Monate Metadaten, Inhalte standardmäßig nicht gespeichert, 90 Tage Fehlerdaten) stehen wörtlich weiter. Weg ist die Bot-Abwehr CaptchaFox (Scoria Labs GmbH) bei der Anmeldung, neu ist IP/E-Mail-Rate-Limit bei Registrierung und Login. DPA weiter „Last updated: May 2026“, Ziffer 5 (nur EWR) unverändert; der Unterschied auf /dpa ist dieselbe Bot-Abwehr-Zeile. `eurouter.ai/models` zeigt wieder Preise im HTML. Profil nicht geändert; beim nächsten `--uebernehmen` in der log_frist-Anmerkung „Version 1.2, Abruf 08.10.“ auf 1.3 heben.
- GreenPT: alle Seiten mit neuem Menü (Honey, Shorthand models, Metis); zitierte Sätze (ISO 27001 auf Sustainability, „No persistent storage“, „We never use your conversations…“) unverändert. Sonst Seitenrauschen (Aleph-Alpha Downloadzähler, Opper-Seitenrahmen, Nebius auf OpenRouter, HDS-Liste Token).

## Neu 11.10.2026 00:25 (Dauerlauf Tagesprüfung)

- 180/180 Tests, Archivcheck 19 Zitate in 13 Kopien ok, Quellenlauf trocken 200 Quellen: 187 unverändert, 12 verändert (nur Nebius-Preise auf OpenRouter und Opper-Seitenrahmen), 0 verschwunden. Fallquellen 003/004/006 unverändert. Gmail: keine Antwort von Anbietern. Nichts geändert.

## Neu 10.10.2026 22:10 (Dauerlauf, Laufend): IONOS-Log-Frist weiter nicht belegbar

- Websuche 10.10. 22:10 nach einer Aufbewahrungsfrist für Metadaten/Betriebslogs des AI Model Hub: keine Zahl. Die gefundenen 7/14/30 Tage (Standard 30) gehören zum **IONOS Logging Service** (docs.ionos.com …/logging-service/…/modify-log-retention-policy), einem anderen Produkt, nicht übertragbar. Muster-Dossier bleibt 12/0/3, bis NW2 (ab Fr 16.10.) Llama 3.1 8B austrägt.

## Neu 10.10.2026 21:05 (Dauerlauf, Laufend): Technik-Messung als ein Befehl

- `node messung.js` ruft die zwölf Pfade der Kill-Check-Messung ab (`/` … `/methodik/`, Liste in `lib/technik.js`) und zählt die Sitemap live gegen `docs/sitemap.xml`; gibt eine Zeile für `MESSUNG.md` aus, Exit 1 wenn ein Pfad nicht 200 liefert. Live ≠ Build gilt nicht als Fehler (main liegt vor origin), wird aber benannt.
- Erster Lauf 10.10. 21:05: „Technik: 12/12 = 200; Sitemap live 65 = Build 65.“ (gleich der Handmessung von heute).
- 6 Tests (`test/technik.test.js`), zusammen 180/180 grün. Am Di 13.10. (J12): `node messung.js`, `node linkcheck.js`, dann Websuche von Hand. **Gelaufen 14.10. 07:50** (13.10. lief kein Durchlauf): 12/12 = 200, Sitemap 65, 201 Quellen ohne Befund, Websuche 0/5 zum fünften Mal, Marke zum dritten Mal nicht gefunden; Schlademann und T-Systems ohne Antwort. Details `MESSUNG.md` „Messung 14.10.2026“.

## Neu 10.10.2026 20:46 (Dauerlauf, Laufend): Zeilenenden fest auf LF, lokal `e14a6b8` + `424b75b`

- **Befund:** Nach dem Build um 20:27 zeigte `git status` in `~/belegt` 39 Dateien unter `docs/` als geändert, alle bytegleich mit HEAD (md5 geprüft). Ursache: `core.autocrlf=true`, Build schreibt LF. Im frischen Windows-Klon kamen außerdem `src/style.css`/`src/fonts.css` mit CRLF an und wurden so nach `docs/` kopiert (echter Byte-Unterschied zur Seite).
- **Fix:** `.gitattributes` um `docs/**`, `guides/**`, `src/**` (`text=auto eol=lf`, damit woff2 binär bleibt) und `data/lastmod.json`, `data/quellen-hashes.json` (`text eol=lf`) ergänzt. `belege/** -text` unverändert (Rohkopien bleiben byte-genau). Index war schon LF, Renormalisieren änderte keinen Inhalt; Schriften per md5 gegen HEAD geprüft.
- **Beweis:** frischer Klon mit `autocrlf=true`, Build streng → `git status` leer (bis auf `package-lock.json` vom Probe-`npm install`), keine Textdatei in `docs/` mit CR; 174/174 Tests (`node --test test/*.js`) in Klon und `~/belegt`. `~/belegt` jetzt 0 Statuszeilen. Damit ist auch der „zweite Riegel“ aus dem Eintrag 20:30 gesetzt.
- main 21 vor origin. Kein Push (mit dem nächsten Push nach „steht“).

## Neu 10.10.2026 20:30 (Dauerlauf, Laufend): Merge-Probe 234/234b/256/257 + CRLF-Fix Ratgeber, lokal main `a905939`

- **Merge-Probe:** Die vier Zweige sind eine Kette (234 → 234b → 256 → 257). `git merge vorschlag-257` auf das heutige main geht **ohne Konflikt**, 186/186 Tests, Build streng ok, gebaut = eingecheckt. Wer „257 steht“ sagt, bekommt alle vier auf einmal; soll einer davon NICHT rein, geht es nur mit `cherry-pick` der übrigen (dann neu prüfen).
- **Befund dabei:** In einem frischen Windows-Arbeitsbaum (`core.autocrlf=true`) checkt Git `guides/*.html` mit CRLF aus. Der Build übernahm das `
` ins HTML, der lastmod-Ledger sah neue Hashes, und alle fünf Ratgeber-Seiten bekamen in der Sitemap „geändert heute“, obwohl sich nichts geändert hatte. In `~/belegt` (LF) trat es nicht auf, bei einem neuen Klon oder Rechner schon.
- **Fix:** `leseGuides` liest jetzt über `lib/guides.js` (`leseGuideText`, Zeilenenden auf LF), Test `test/guides.test.js` (4 Fälle, zuerst rot). 174/174 Tests auf main. Beweis im frischen CRLF-Baum: Quelle 19 CR, HTML 0 CR, Ratgeber-Datum bleibt 2026-09-16, kein Inhaltsunterschied. Im selben Commit der Build-Nachzug Commit-Link `5a83607` (IONOS). Ausgabe auf LF unverändert, deshalb direkt auf main; **kein Push** (mit dem nächsten Push nach „steht“).
- Nicht gemacht: `.gitattributes` für `guides/**` (eol=lf) wäre der zweite Riegel, ändert aber Checkout-Verhalten; nur bei Bedarf.

## Neu 10.10.2026 20:10 (Dauerlauf, Laufend): Filter-Lücke HIPAA u. a. geschlossen, Zweig `vorschlag-257` (`8b9bb2b`), nicht in main

- Prüfung: alle 21 Profile feldweise (ohne Zitat-Felder, ohne Web-Adressen) nach Gesetzesnamen außerhalb der bisherigen Liste durchsucht. Treffer nur **HIPAA**: DeepL (Zertifikatstyp „HIPAA“, Anmerkung „HIPAA kennt keine formale Zertifizierung … Nur für US-Gesundheitskontext relevant“ = eigene Einordnung eines Gesetzes, Anwendungsbereich, iso_42001-Anmerkung) und Nebius („Inkl. HIPAA-Mapping“). CLOUD Act, FISA, CCPA usw.: 0 Treffer, vorsorglich im Filter.
- Fix: `GESETZESKUERZEL` + HIPAA, CCPA, FISA, BSIG, eIDAS, nDSG; Muster + CLOUD Act, ePrivacy, Data Governance Act. DeepL-Typ → „Gesundheitsdaten-Zusage (USA)“, neue Tabelle `ZERT_FRUEHERE_NAMEN` in `lib/aenderungen.js` (wie AI_ACT_FRUEHERE_NAMEN): Änderungsprotokoll ohne Scheinwechsel (geprüft: /aenderungen/ inhaltlich unverändert). Texte nur noch Tatsachen („kein Zertifikat, kein Prüfer und keine Zertifizierungsstelle genannt“).
- Bewusst nicht im Filter: KRITIS (Hetzner „KRITIS-Nachweis“, Nachweis wie C5), PCI DSS, SOC 2, HDS, SecNumCloud (Standards/Zertifikate).
- 182/182 Tests, Build streng ok, ausstellbar weiter **20 von 21**. Zweig baut auf `vorschlag-256` auf. **Bei „257 steht“:** `git merge vorschlag-257` auf main (enthält 234 a, 234 b, 256), Build, Push zusammen mit 242. Frage 257: Typname so oder anders.

## Neu 10.10.2026 19:55 (Dauerlauf, Laufend): Filter-Lücke DORA/NIS 2 geschlossen, Zweig `vorschlag-256` (`88e6882`), nicht in main

- Prüfung: alle 21 Dossiers erzeugt und nach Gesetzesnamen außerhalb von Web-Adressen durchsucht. DeepL („DORA-Infoseite“, „DORA-Prüfung“), Nebius („Trust Center nennt NIS 2 und DORA“) und Opper (Pflicht „… DORA und NIS2“) liefen durch, weil der Filter DSA/DMA kannte, DORA/NIS 2 aber nicht.
- Fix: `GESETZESKUERZEL` + DORA, BDSG, TDDDG, TKG; Muster + NIS 2 (ohne Folgeziffer), Data Act, Cyber Resilience Act. Negativtest: Hidora, Pandora, „Data Actions“, „NIS 20“ bleiben sauber. Drei Profile umformuliert („Seite/Prüfung zur digitalen Betriebsstabilität im Finanzsektor“, Opper „Reviews nach EU-Regeln (KI, Finanzsektor, Netzsicherheit)“, im Zitat „[…]“ wie bei 234 b); Opper-Pflicht: beide früheren Namen in `AI_ACT_FRUEHERE_NAMEN` direkt auf den neuen, /aenderungen/ unverändert.
- Bewusst nicht im Filter: Standardvertragsklauseln, Angemessenheitsbeschluss, SCC (Vertragsinstrumente, Prüfpunkt AVV, keine Einordnung).
- 178/178 Tests, Build streng ok, ausstellbar weiter **20 von 21**. **Bei „256 steht“:** `git merge vorschlag-256` auf main (enthält 234 a und 234 b), Build, Push zusammen mit 242.

## Neu 10.10.2026 19:00 (Dauerlauf, Laufend): Filter-Lücke „AI-Act“ geschlossen, Zweig `vorschlag-234b` (`a4fd71b`), nicht in main

- Befund: `lib/normenbezug.js` kannte nur „AI Act“ mit Leerzeichen. „AI-Act-…“/„EU-AI-Act-…“ rutschten durch, auch im **Muster-Dossier IONOS** („EU-AI-Act-Rollen- und Transparenzdokumentation“), das mit dem Push nach Frage 242 öffentlich würde.
- Fix: Muster `AI[\s-]?Act`; Web-Adressen (mit Pfad, Endung aus Buchstaben) werden vor der Prüfung durch Leerzeichen gleicher Länge ersetzt, damit „…/eu-ai-act“ oder „…/gdpr-faq“ als Fundort nicht anschlagen („Art.53/55“ bleibt Treffer, Test). Neun Profile im Stil von 234 a umbenannt (DeepL, Gcore, GreenPT, Infomaniak, IONOS, Opper, OVHcloud, Regolo, Requesty), sechs alte Pflicht-Namen in `AI_ACT_FRUEHERE_NAMEN`, Protokoll ohne Scheinwechsel.
- 176/176 Tests, Build streng ok, ausstellbar **20 von 21** (nur Nordference, 234 b). Zweig baut auf `vorschlag-234` auf. **Bei „255 steht“:** `git merge vorschlag-234b` auf main (enthält 234 a), Build, dann Push zusammen mit 242.

## Neu 10.10.2026 18:55 (Dauerlauf, HV3 Hormozi): Geschenk steht, Garantie als Frage für 14.10.

- Muster-Dossier IONOS als kostenloses Geschenk gibt es schon (B2, lokal `dcb6b45`, live mit Push nach Frage 242).
- Garantie-Vorschlag („Findet Ihr Auditor einen Beleg, der am Stichtag nicht sagt, was das Dossier sagt, zahlen Sie nichts“) mit enger Definition in `MESSUNG.md` Abschnitt „Geschenk und Garantie“ → Frage 254, Entscheidung am Kill-Check Mi 14.10.

## Neu 10.10.2026 18:32 (Dauerlauf, Laufend): Frage 234 a fertig auf Zweig `vorschlag-234` (`597e3e3`), nicht in main

- Pflicht-Bezeichnungen im AI-Act-Block ohne Artikelnummer und Gesetzesnamen, elf Profile (BFL, DeepL ×2, EUrouter, Gcore, Hetzner, Infomaniak, Mistral, Nordference, Requesty, STACKIT, T-Systems), z. B. „Art.-53-Transparenzdokumentation“ → „Transparenzdokumentation des Modells“, „Transparenz-/Compliance-Angaben zum EU AI Act“ → „… zur KI-Regulierung der EU“.
- Änderungsprotokoll: `AI_ACT_FRUEHERE_NAMEN` in `lib/aenderungen.js` ordnet alte Namen den neuen zu; das Umbenennen erzeugt 0 Einträge auf /aenderungen/, ältere Einträge behalten ihren Pfad (Anker und Feed-IDs stabil). 4 neue Tests.
- Ergebnis: Dossiers ausstellbar 10 → **20 von 21**; Nordference bleibt gesperrt (Anbieter-Claim „EU AI Act Ready“ in der Anmerkung, 234 b).
- 174/174 Tests, Build streng ok. **Bei „234 a steht“:** `git merge vorschlag-234` auf main, Build, Push nach Felix. Nebenbefund, nicht angefasst: Infomaniak „Öffentliche AI-Act-Compliance-Aussage“ rutscht durch den Filter, weil „AI-Act“ mit Bindestrich nicht als Gesetzeskürzel zählt.

## Neu 10.10.2026 17:40 (Dauerlauf, Laufend): IONOS-Modellliste nachgezogen, lokal `5a83607`

- Anlass: Muster-Dossier IONOS hatte 3 „nicht belegbar“; geprüft, ob eins davon öffentlich zu belegen ist.
- **Modellliste:** `cloud.ionos.de/managed/ai-model-hub` (abgerufen 10.10.) führt sieben Modelle; Qwen3.5-9B (0,10/0,15 €) und Qwen3.8-27B (0,40/2,70 €) fehlten im Profil, jetzt ergänzt (belegt, Standort Deutschland, Backup/Filter wie die übrigen). **Llama 3.1 8B** steht laut `docs.ionos.com/cloud/ai/ai-model-hub/models` unter „Scheduled for Retirement“ am **15.10.2026**, Alternative Qwen3.5-9B; Anmerkung ergänzt, Status bleibt „unbelegt“ (wie bei Lyceum-Abschaltungen).
- **Log-Frist:** weiter nicht belegbar, Doku sagt nur „retained only for the period necessary to operate the service reliably“ nach interner Richtlinie, keine Zahl. **Filter:** weiter kein Wort zu Moderation/Guardrails.
- Muster-Dossier bleibt 12 ja / 0 nein / 3 nicht belegbar, bis Llama 3.1 8B raus ist. **Ab Fr 16.10.:** Modellseite erneut abrufen; ist Llama 3.1 8B unter „Retired“, Eintrag aus `modelle` entfernen (Änderungsprotokoll hält es fest) → Punkt 5 wird „ja“, Muster 13/0/2.
- 170/170 Tests, Build streng ok. main 8 vor origin. Kein Push.

## Neu 10.10.2026 17:10 (Dauerlauf, Laufend): Welle 3 Gesprächskandidaten (Rückfallebene zu B3)

- `outreach/gespraeche/kandidaten.md` Abschnitt „Welle 3“ (gitignored): 11 externe DSB/Auditoren (Nr. 12–22) aus öffentlichen Quellen, je Beleg mit Titel/Datum und geöffneter Impressums-/Kontaktseite, abgerufen 10.10. Niemand kontaktiert.
- **Befund:** Keiner prüft öffentlich belegt KI-/Cloud-Anbieter für Mandanten (Passung 3 = 0). Nächste vier Namen nur im privaten Blatt.
- Bündelorte: DAFTA 11.–13.11. Köln (1.340 € netto), BvD-Herbstkonferenz 14.–15.10. Stuttgart, IDACON 27.–29.10. München. GDD-Erfa NRW Herbst vorbei.
- Frage 248: Empfehlung a, Entwürfe an 12–14 erst, wenn der BvD-Ausschuss bis Mi 21.10. keine Namen liefert.

## Neu 10.10.2026 15:47 (Dauerlauf, B4): Kill-Check 14.10. vorbereitet
- `MESSUNG.md` Abschnitt „Vorlage Kill-Check Mi 14.10.2026“ (Datei ist gitignored, nur lokal): Messung 10.10. (Technik 12/12 = 200, Sitemap 65, Linkcheck „Alle Belege tragen“, Websuche 0/5 zum vierten Mal, Marke zum zweiten Mal nicht gefunden), Tabelle K1/K2/K3, ehrliche Lesart, Vorschlag mit Gegenargumenten.
- K1 erfüllt einmal (Perplexity 16.09.), K2 ohne Login nicht messbar (keine Besucherstatistik auf der Seite) → Search Console = Felix, Erwartung verfehlt; K3 0 €.
- Vorschlag: nicht einfrieren, neuer Prüftermin Antwort Schlademann bzw. Mo 30.11.2026 (Prüffrage: hat ein Auditor/Käufer ein Dossier bezahlt?). Entscheidung Felix am 14.10. (Frage 244).
- Felix am 14.10. (~20 min): Search Console 3 Zahlen, 5 Fragen an Perplexity + ChatGPT. Dauerlauf am 13./14.10.: Technik, Linkcheck, Websuche, Gmail (Schlademann, T-Systems Fall 006) wiederholen.

## Neu 10.10.2026 15:55 (Dauerlauf, B3): Gespräche 2–5 über den BvD, ENTWURF liegt

- **Leitfaden** (`outreach/gespraeche/leitfaden.md`): die vier „nicht gefragt“-Punkte aus Gespräch 1 stehen jetzt direkt in den Kernfragen: 3 Wartezeit in Wochen getrennt von Stunden, 4 „Was hätte ein Außenstehender ohne NDA bekommen?“, 5 Seiten/Gliederung/Ja-Nein oben, 7 Geldfrage kurz („in Euro oder in Stunden?“) plus Tagessatz/Pauschale bei Externen.
- **GESENDET 11.10.2026 von Felix (hallo@)** an den BvD-Ausschuss Prüfaufgaben: Bitte um 3–4 Mitglieder für je 30 Minuten (Inhalt privat: `outreach/gespraeche/PRIVAT-NOTIZEN.md`, gitignored).

## Neu 10.10.2026 15:45 (Dauerlauf, B2): /fuer-kaeufer/ für Auditoren/DSB, lokal `dcb6b45`

- Neuer Abschnitt `#auditoren` aus `lib/kaeuferseite.js` (Tests `test/kaeuferseite.test.js`, 7): anonymer 40-Stunden-Satz (Gespräch 06, ohne Namen), Ergebniszeile ja/nein/nicht belegbar erklärt, Tabelle der 15 Prüfpunkte aus `lib/vorgaben.js` mit Muster-Spalte, die 8 festen Anfragen aus `V.IMMER_ANFRAGEN`; Hinweis oben auf der Seite verlinkt dorthin.
- **Muster-Dossier IONOS** (`KS.MUSTER_ANBIETER`): `build.js` `baueMuster` erzeugt bei jedem Build `docs/fuer-kaeufer/muster-ionos.md` aus den aktuellen Daten (Datum = Baudatum, Unterschrift leer). Heute 12 ja, 0 nein, 3 nicht belegbar (Standort Llama 3.1 8B, Filter, Log-Frist). Sperrt der Normenbezugs-Filter das Muster einmal, steht die Seite ohne Muster und der Build schreibt eine WARNUNG.
- Dossier-Fuß: „390 € netto“ → „390 € je Anbieter-Dossier, ohne Umsatzsteuer (Kleinunternehmer)“, passend zur Seite.
- 170/170 Tests, Build ok. main 1 vor origin. **Push nach Frage 242.**

## Neu 10.10.2026 15:40 (Dauerlauf, B1): Pilot-Angebot an Gesprächspartner 1 liegt als ENTWURF

- **Gmail-Entwurf** liegt, **Felix sendet erst nach dessen Antwort** (nicht nachfassen) (Inhalt privat: `outreach/gespraeche/PRIVAT-NOTIZEN.md`, gitignored).
- **Kern:** Dossier V3 zum Festpreis laut /fuer-kaeufer/ für einen Anbieter, den der Gesprächspartner gerade prüft; Gegenleistung eine Zahl zur gesparten Zeit, Name nur nach Freigabe.

## Neu 10.10.2026 14:26 (Dauerlauf, Laufend): dpa.gov.al nachgelesen, lokal `da6e66b`

- **Ursache:** Der Server dpa.gov.al schickt das Zwischenzertifikat nicht mit; Node bricht ab (`UNABLE_TO_VERIFY_LEAF_SIGNATURE`), Browser/curl laden es selbst nach. Die Akkreditierungsquelle für Regolo (DPA Albanien, Urkunde CS 007) war deshalb nie im Ledger.
- **Fix:** `certs/zwischen.pem` (Sectigo Public Server Authentication CA DV R36, gültig bis 21.03.2036, SHA-256 und AIA-Quelle im Kopf der Datei); `lib/quellen.js` `zwischenEnv`/`mitZwischenzertifikaten`: `quellenlauf.js` und `linkcheck.js` starten sich einmal mit `NODE_EXTRA_CA_CERTS` neu (Node liest die Variable nur beim Start). Test `test/zwischenzertifikate.test.js` (4 Fälle). Weitere Server mit gleicher Lücke: Zwischenzertifikat an dieselbe Datei anhängen.
- **Urkunde von Hand gelesen** (PDF mit Textebene, 21 S.): S. 1 AXE Register sh.p.k., CS 007, ISO/IEC 17021-1, Erstakkreditierung 25.02.2022, letzte 24.02.2026, gültig bis 23.02.2030, Fußzeile EA MLA/IAF-MLA; S. 8–9 27001:2022, 27701:2019, 27001 mit 27017 und 27018. Deckt sich mit der Anmerkung in `regolo.json`; beide `akkreditiert_dakks.geprueft` auf 10.10.
- esante.gouv.fr (HDS-Register, Exoscale/OVH) „verändert“: nur eine technische Kennzahl getauscht, per `--uebernehmen-nur` übernommen. Lauf: 200 URLs, 197 unverändert, 1 neu (dpa), 1 übernommen, 1 übersprungen (DQS 403 wie immer).
- **Merken:** Das Serverzertifikat von dpa.gov.al läuft am 24.10.2026 ab; kommt das neue von einer anderen Zwischenstelle, meldet der Quellenlauf wieder „übersprungen (TLS-Kette)“ → neues Zwischenzertifikat aus der AIA-Adresse anhängen.
- 163/163 Tests, Build streng ok, Linkcheck „Alle Belege tragen“. Kein Push.

## Neu 10.10.2026 14:10 (Dauerlauf, Laufend): Quellenlauf, alle 15 Veränderten von Hand gelesen, lokal `c474152`

- `node quellenlauf.js`: 200 URLs, 182 unverändert, 15 verändert, 1 neu (ANS-HDS-Register esante.gouv.fr, jetzt im Ledger), 2 übersprungen (DQS 403 wie immer; dpa.gov.al TLS-Kette unvollständig → im Browser prüfen, noch nie nachgelesen).
- **Inhaltlich geändert nur das IAS-Blatt MSCB-267 (Prescient Security, Zertifizierer von Mistral ISO 27001/27701):** „Effective Date October 9, 2026“ (vorher April 6, 2026); 27701 jetzt nach ISO/IEC 27706:2025 statt TS 27006-2:2021, dazu 27701:2025 im Scope, Übergang bis 31.10.2028; 27001:2022 nach 27006-1:2024 unverändert, 42001 im Scope. Beide Anmerkungen in `mistral.json` berichtigt, Status unverändert (Punkt 9 bleibt „nein“, IAS keine EA-Stelle).
- Nur Navigation/Banner: Aleph-Datenschutz, CSA-Register Nebius/Seeweb (Kursbanner), Opper DPA/Security („Agent SDK“), OVH-HDS-Doku (Menü), T-Systems zwei Seiten („Blog“). HF-Karten Aleph (Lizenzfeld, Kolibri Apache 2.0, 3.46B aktiv) und Opper `/models`, `/ai-compliance` gelesen, Aussagen gleich (Frage 203 bleibt offen, die Zähler kippen weiter). Alle 15 per `--uebernehmen-nur` übernommen; Kasten „offen“ ist damit bei allen Anbietern 0.
- **Fund EUrouter, Frage 236:** `/models` liefert im HTML keine Modelle und Preise mehr (Next.js lädt nach), die Einzelseiten `/models/kimi-k2.6` usw. sind 404, die Sitemap führt nur `/models`. Preise lassen sich ohne Schlüssel über `api.eurouter.ai/api/v1/models` (144 Modelle) lesen: DeepSeek V3.2 0,30/0,50, Kimi K2.6 0,73/3,50, Gemma 4 0,10/0,50, Mistral Large 3 0,55/1,65, Claude-Varianten wie im Profil, alle gleich. Neu gelistet Claude Sonnet 5.5 (2,20/11,00) und Haiku 5.5 (0,11/0,55), nicht eingetragen. **Ungeklärt:** die API führt Gemma 4 in EUR (43 Modelle EUR, 101 USD), die Modellseite zeigte am 09.10. „$0.10“ (Archivkopie); Profil sagt USD, nicht geändert.
- 159/159 Tests, Build streng ok. Kein Push.

## Neu 10.10.2026 11:45 (Dauerlauf E1): Anmerkungen ohne Normenbezug (232 a steht), lokal `fbe8ede`

- 18 Profile umgeschrieben, nur Anmerkungen + Kurzbeschreibung T-Systems: „Ziffer N“ statt „§ N“/„Art. N“ bei Anbieter-Dokumenten, „Hilfeseite Nr.“ statt „Hilfe-Artikel“, eigene Rechtsverweise gestrichen („AVV nach Art. 28 DSGVO“ → „AVV“, „DSGVO-konform“, „ist nicht gleichzusetzen“), „GDPR-Seite“ → „Datenschutzseite“, Gesetzesnamen in Anbieter-Zitaten als „[…]“. Zitatfelder, Quellen-URLs, Pflicht-Labels unverändert; Filter unverändert. Skript `~/allein/tmp/e1/ersetze.py`.
- **Ausstellbar jetzt 10 von 21** (vorher 3): neu exoscale, greenpt, ionos, nebius, opper-ai, ovhcloud, regolo.
- **Noch gesperrt (11), Frage 234:** Pflicht-Labels im AI-Act-Block mit „Art. 53/50“ oder „EU AI Act“ (BFL, DeepL, EUrouter, Gcore, Hetzner, Infomaniak, Mistral, Requesty, STACKIT, T-Systems; die Labels sind zugleich Schlüssel im Änderungs-Ledger `lib/aenderungen.js`), Nordference zusätzlich zwei Quellen-URLs `nordference.ai/gdpr` und der Anbieterclaim „EU AI Act Ready“.
- 159/159 Tests, Build streng ok. Kein Push (öffentliche Profiltexte ändern sich mit, nächster Push nur nach „steht“).

## Neu 10.10.2026 10:59 (Dauerlauf K7): V5 Abschnitt 2 neu gefasst (221 a), nur Entwurf

- `dossiers/VORSCHLAG-WER-PRUEFT-V5.md` Abschnitt 2: Software und KI-Assistent offengelegt (was die Software macht, was Felix freigibt), **keine Modellnamen, keine Kosten**. Behauptet nur, was stimmt: Freigabe durch Felix, Zitatprüfung automatisch. Alte Fassung: `~/allein/tmp/V5-vor-K7.md`.
- **Fund, Frage 233:** „ein Mensch hat die Quelle gelesen“ steht im Quellenlauf-Kasten (`build.js` ~1044, nur lokal seit K6 `f692f6d`) und in V5 Abschnitt 3. Gelesen hat der Dauerlauf, nicht Felix. **Vor dem nächsten Push klären** (Empfehlung a: Satz ändern).
- Offen für den Bau: Felix prüft Abschnitt 2, schreibt Abschnitt 1, Antwort 233.

## Neu 10.10.2026 10:33 (Dauerlauf K6): Quellenlauf-Kasten V4 gebaut (220 a steht), lokal `f692f6d`

- `lib/quellenstand.js`: je Anbieter aus `data/quellen-hashes.json` zählen: belegende Quellen (Startseiten aus), nachgelesen, unverändert, verändert und von Hand gelesen, **offen** (neu_hash), verschwunden; Statuswechsel 30 Tage aus dem Änderungsprotokoll (ohne Fälle). Von Hand auf `nur_erreichbar` gesetzte Quellen (DQS Aleph Alpha) zählen nicht als nachgelesen.
- Haken 2 gelöst: Ledger hat jetzt `erst` (erster Eintrag) und `uebernommen` (letzte Übernahme nach Handprüfung). Fortschreibung als `Q.fuehreLedger` in `lib/quellen.js` (Tests); „unverändert“ räumt jetzt auch `veraendert_seit` und `verschwunden` (blieben vorher für immer stehen). Altbestand einmalig aus 32 Commits des Ledgers (`~/allein/tmp/v4/rueckfuellen.js`): erst 199, uebernommen 88; die PDF-Hash-Umstellung `8741e74` zählt nicht als Übernahme; Hashfunktion für HTML seit 28.08. unverändert (geprüft).
- Profilseite: Kasten „Quellenlauf“ über dem Fuß, an jeder Quelle „unverändert seit TT.MM.JJJJ“ bzw. fett „verändert seit …, noch nicht gelesen“ / „beim Quellenlauf … nicht erreichbar“; `daten.json` je Profil und gesamt Feld `quellenlauf`; Methodik-Abschnitt `#quellenlauf`.
- **Abweichung vom Vorschlag:** statt „verändert, von Hand gelesen, Aussage gleich“ steht „verändert und von Hand gelesen“, weil nach dem 03.10. auch übernommene Quellen mit Korrektur dabei sind (Aussage nicht immer gleich, Korrektur steht dann im Protokoll; so in der Methodik erklärt).
- Zahlen heute: offen nur Aleph Alpha 3 (HF-Karten Kolibri-1, Pharia Embedding, Pharia LLM), EUrouter 1 (`/models`), Opper 2 (`/ai-compliance`, `/models`; HF und Opper hängen an Frage 203) → **öffentlich sichtbar, sobald gepusht; vorher lesen und `--uebernehmen-nur`, sonst steht „3 offen“ bei Aleph Alpha**. Nicht nachgelesen: OVH HDS-Register (esante.gouv.fr), Regolo DPA Albanien (dpa.gov.al), beide nach dem letzten Lauf eingetragen.
- 159/159 Tests, Build streng ok. Kein Push (zusammen mit den übrigen 17 lokalen Commits erst nach „steht“).

## Neu 10.10.2026 09:13 (Dauerlauf K5): Dossier-Format V3 gebaut (219 steht), lokal `eb7030c`

- `lib/vorgaben.js`: 15 Standard-Vorgaben wie im Vorschlag, Ergebnis je Punkt und gesamt ja / nein / nicht belegbar. „nein“ nur bei belegter Angabe, die die Vorgabe nicht trifft; beansprucht/unbelegt/kein Zertifikat = nicht belegbar; **offener Fall (offen/beantwortet) zu einem Punkt = nicht belegbar** (Felix 219), bestätigter Fall nur Hinweis. Modell-Punkte (5, 10, 11) müssen für alle Modelle gelten. Standort EU nur bei eindeutigem Wortlaut (EU/EU-Land ohne US/Schweiz/global), gemischt = nicht belegbar.
- Akkreditierung: Vorgabe 9 heißt „DAkkS oder EA-MLA-Stelle“. Neues optionales Feldpaar `stelle` + `stelle_ea_mla` an `akkreditiert_dakks` (geprüft in `pruefpunkte.pruefe`), eingetragen aus den vorhandenen Anmerkungen: Scaleway COFRAC, BFL/Infomaniak UKAS, Regolo DPA Albanien (je EA-MLA ja); Mistral IAS (USA) und T-Systems ANAB (USA) mit `stelle_ea_mla: false` → Punkt 9 dort „nein“ (siehe Frage 232 b).
- Dossier: Abschnitt „Ergebnis“ vor Abschnitt 1, neues Kapitel 4 „Nicht öffentlich belegbar: Fragen an den Anbieter“ (4a offene Punkte mit Frage, 4b Schlademanns feste Liste), Alarm jetzt 5, Unterschrift 6 mit Zusatzsatz. CLI `node dossier.js <id> --vorgaben avv,training,…`.
- Probe `dossiers/BEISPIEL-scaleway-2026-10-10-V3.md`: **Ergebnis nein, 10 ja / 1 nein (Zweckbindung) / 4 nicht belegbar** (ISO 27001, Anwendungsbereich, Zertifizierer, Filter), genau wie im Vorschlag gerechnet. 149 Tests grün, Build streng ok (nur `daten.json` der sechs Profile ändern sich).
- **Befund (alt, nicht durch V3):** Nur 3 von 21 Dossiers lassen sich ausstellen (Aleph Alpha, Lyceum, Scaleway). Die anderen 18 verweigert der Normenbezugs-Filter, meist wegen „§ 2.3.1“ (Ziffer im Anbieter-Dokument), „DSGVO“ in der Kurzbeschreibung oder „Art. 53“ im AI-Act-Block. Gegenprobe auf HEAD vor dem Bau: gleiche Sperre. → Frage 232 a.

## Neu 10.10.2026 08:07 (Dauerlauf R1): Rosenthal-Zitat eingebaut, lokal

- Neues optionales Fall-Feld `einordnung` (text, von, datum, quelle, quelle_titel, kontext), geprüft in `leseFaelle`, Abschnitt „Fachliche Einordnung“ nach „Was dieser Fall nicht heißt“ mit Hinweis „kein Gutachten, kein Beleg“ (`lib/einordnung.js`, `test/einordnung.test.js`).
- Fall 2026-004: Rosenthals Satz wörtlich in seiner Fassung (Gmail `1a1229a2ef338d4c`), „David Rosenthal (VISCHER), 09.10.2026“, Link https://vischerlnk.com/ki-tools-0726-blog (302 auf vischer.com „Teil 31: KI-Tools – Wie es um den Schutz der Daten steht (2026)“, 10.10. geprüft); Verlaufseintrag 10.10., Status unverändert „bestätigt“.
- Fälle ohne Einordnung bleiben byte-gleich (lastmod springt nur bei Scaleway und /aenderungen/).
- 138/138 Tests, Build streng ok, Archivcheck 19 Zitate ok, lokal `bddccdc` (main 13 vor origin). **Push erst nach Frage 231 „steht“.**

## Neu 10.10.2026 00:05 (Dauerlauf Tagesprüfung): Rosenthal erlaubt Zitat

- David Rosenthal (VISCHER) am 09.10. 23:38, Gmail `1a1229a2ef338d4c`: Zitat mit Namen erlaubt, aber nur in seiner Fassung: „Die Speicherung von Daten für eigene Zwecke im Klartext durch einen Provider, auch wenn nur in gewissen Fällen, ist kein Zero Data Retention mehr nach unserem Verständnis.“ Er wünscht dazu einen Link auf https://vischerlnk.com/ki-tools-0726-blog.
- Einbau auf der Fallseite Scaleway als Aufgabe R1 in ALLEIN.md (ab 10.10. 08:00), Push erst nach Frage 231 „steht“.
- Tagesprüfung: 129/129 Tests, Quellenlauf trocken 185/12/0/1 (Fallquellen unverändert, Änderungen nur Seitenrauschen; eurouter.ai/models zeigt im HTML keine Preise mehr).

## Neu 09.10.2026 20:55 (Dauerlauf K4b, Grundsatz 217): Strenge außerhalb der Liste

- **Auf „beansprucht“** (Bericht/Zertifikat nicht öffentlich, Grund vorne in der Anmerkung): Exoscale ISO 27001, SOC 2, BSI C5, ISO 27017, ISO 27018 (alles nur im Compliance Center des Kontos bzw. unter NDA, Wortlaut der Unterseiten 09.10.); Nebius SOC 2 (Trust Center: NDA nötig); DeepL SOC 2 (aktueller Bericht 2025 zugriffsbeschränkt, öffentlich nur Prüfurteil HKKG 2022/23); STACKIT C5 und SOC 2 (Zertifikatsseite verlinkt nur ISO/BSI-IGZ/CCI); T-Systems C5 und SOC 2 (der verlinkte `TS OTC SOC 3 Report.pdf` ist kennwortgeschützt, Kopie `belege/anbieter/t-systems/`).
- **Belegt über öffentliche Quelle statt Anbieterseite:** HDS bei Exoscale (ANS-Register: „AKENES 1, 2, 3, 4, 6, sur version V2.0 … Bureau Veritas Certification France“, Akenes SA = Betreiber) und **OVH wieder belegt** („OVH GROUPE 1–6, V2.0, BYCYB“; OVH-Doku nennt noch HDS v2018); Zertifizierer jetzt belegt, Akkreditierung (COFRAC) nicht geprüft. ANS-Seite lädt nur im Browser, Textkopie `belege/anbieter/{exoscale,ovhcloud}/ans-hds-liste-2026-10-09.txt`. Regolo ISO 27017/27018 Quelle → Seeweb-Anhänge (Betreiber, nicht Regolo), Nebius ISO 27018 Quelle → Zertifikat SII-QCD 1125668.
- Unverändert belegt: Mistral SOC 2 (Prüfer-Bescheinigung öffentlich), alle Einträge mit öffentlichem Zertifikats-PDF. Infomaniak Swiss-Hosting-Label am 11.10. nachgeprüft (siehe oben), bleibt belegt.
- 129/129 Tests, Build streng ok, Archivcheck 19 Zitate ok, lokal `f8765e2`, kein Push (nächster Push nur nach „steht“).

## Neu 09.10.2026 19:35 (Dauerlauf K4, Frage 217): Strenge-Runde Anbieterangaben

- Von „belegt“ auf „beansprucht“, Grund je Eintrag vorne in der Anmerkung: OVHcloud SOC 1/2/3, BSI C5, HDS, ISO 27017, ISO 27018; IONOS BSI C5 (Testat nicht öffentlich); DeepL Externe Penetrationstests; Hetzner BSI C5 (nur Selbstbescheinigung); CSA STAR bei Regolo (nur Seeweb-Produkte) und Nebius (nur AI Cloud).
- OVH HDS: Das ANS-Register (esante.gouv.fr/offres-services/hds/liste-des-hebergeurs-certifies) lieferte am 09.10. maschinell keinen Inhalt; steht OVH dort im Browser mit passenden Tätigkeiten, kann HDS mit dieser Quelle wieder „belegt“ werden (offen, beiläufig).
- **Gleiche Lücke außerhalb der 217-Liste (K4b eingereiht):** Exoscale BSI C5, HDS, ISO 27017, ISO 27018, SOC 2 (alles nur Compliance-Seite, Berichte unter NDA); Regolo ISO 27017/27018 (Logos in den AGB); Nebius ISO 27018 und SOC 2 (Trust Center); dazu DeepL/Mistral/STACKIT/T-Systems SOC 2 und STACKIT/T-Systems C5 je prüfen, ob der Bericht öffentlich ist.
- 129/129 Tests, Build streng ok, Archivcheck 19 Zitate ok, lokal `6cf0a88`, kein Push (nächster Push nur nach „steht“).

## Neu 09.10.2026 18:55 (Dauerlauf K3, Frage 228 b): TISAX auf „beansprucht“

- TISAX-Eintrag bei Exoscale (Level 2) und T-Systems (Level 3) von „belegt“ auf „beansprucht“; der Gültigkeitshinweis (letzte öffentliche Bewertung 2023, ENX-Frist 36 Monate, Portal nicht öffentlich) bleibt in der Anmerkung.
- Folge: `zertifikate/tisax/` listet nur noch STACKIT als belegt; Vergleichsseiten mit Exoscale/T-Systems neu gebaut.
- 129/129 Tests, Build streng ok, lokal `facf6e5`, kein Push (nächster Push nur nach „steht“).

## Neu 09.10.2026 14:45 (Home-Tab, Nachtrag Dauerlauf 15:05): Force-Push erledigt

- **222 b und 216 erledigt:** Historie bereinigt (filter-repo, 295 Commits, Notizen 07/08 + beide Zitatzeilen weg), Force-Push `5bc583a` → `6ca0283` auf main, `~/belegt` lokal nachgezogen. Damit sind auch die 216-Korrekturen online. **Historie ist neu:** vor jedem Commit `git -C ~/belegt log --oneline -1` ansehen.
- **Rest nur Felix (eilig):** GitHub liefert den alten Commit `ceacb04` per Adresse weiter aus (raw HTTP 200, 09.10. 14:44), bis die Garbage Collection läuft. Supporttext liegt in `outreach/github-support-2026-10-09.md` (lokal `173f26b`); Felix sendet über support.github.com („Remove sensitive data“).

## Neu 09.10.2026 14:35 (Dauerlauf K1, Frage 222 b): Historie bereinigt, Force-Push vorbereitet

- Felix 09.10. 14:10: „222 b steht (Historie bereinigen, Force-Push vorbereiten und Befehl zeigen)“. Push macht Felix.
- Skript `~/allein/tmp/k1-force-push.sh`: klont `~/belegt` frisch, entfernt die beiden internen Fachantwort-Notizen aus allen Commits, ersetzt Wortlaut, Namen und Kanzleien in allen früheren Fassungen (auch Commit-Nachrichten), prüft 0 Treffer, Tests, Build, Archivcheck. Probe 14:33: 0 Treffer, 294 → 294 Commits, 129/129 Tests, Build + Archivcheck ok; Inhalt des aktuellen Stands ändert sich nur in `.gitignore` (Muster `07-*fachantwort*`, `08-*fachantwort*`) und einer Zeile hier.
- **Befehl für Felix:** `bash ~/allein/tmp/k1-force-push.sh` (Probe) und dann `bash ~/allein/tmp/k1-force-push.sh --push`. Danach steht `~/belegt` auf der neuen Historie, die alte bleibt lokal als Zweig `vor-bereinigung-0910`; nur bei sauberem Arbeitsbaum.
- **09.10. 15:09 ERLEDIGT (Felix):** GitHub-Support-Ticket **#4840405** gestellt (Text und 19 alte SHAs in `outreach/github-support-2026-10-09.md`). Offen: Antwort des Supports abwarten, danach prüfen, dass `github.com/Felix3c/belegt/commit/ceacb04` HTTP 404 liefert. Zweig `vor-bereinigung-0910` wurde vom Skript nicht angelegt; alte Historie nur im Reflog (`70a51b0`).
- Bringt alle 45+ lokalen Commits mit online (u. a. 216-Korrekturen `2bf618b`, TISAX-Hinweis, Fall-Entwurf 006 bleibt Entwurf). Ungeklärt: wie lange GitHub alte Commit-Links aus dem Cache ausliefert; sicher entfernt nur per Anfrage an den GitHub-Support (Formular „Remove data from a repository“).

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
