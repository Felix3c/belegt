# belegbar.eu — Nächste Schritte

## Neu 25.10.2026 ~18:20 (Dauerlauf Laufend): openai-api, Backup- und SOC-2-Felder neu geprüft

- Anlass: openai-api hatte nach Google Vertex den ältesten Stand, 9 Einträge auf 22.10. (4× Backup-Ort je Modell, SOC 2 mit Geltungsbereich, Prüfer, Akkreditierung, dazu das Profildatum).
- Trust-Portal direkt abgerufen (HTTP 200): beide SOC-2-Sätze stehen wörtlich da, Bericht weiter nur mit Konto; Prüfer weiter ohne Namen („an independent third-party auditor“); im Schellman-Verzeichnis für OpenAI nur ISO, kein SOC 2. Kein Status geändert.
- Leitfaden „your data“ direkt abgerufen: weiter kein Satz zu Backups für die API. Backup-Ort bleibt „unbelegt“.
- Nicht neu geprüft: Enterprise-Privacy-Seite (HTTP 403, Bot-Prüfung, nicht umgangen; letzte Archivkopie 02.10., Archiv nahm keine Verbindung an), Security Measures (nur Archiv).
- Profil-Prüfdatum 22.10. → 23.10. (ältestes Feld). Kopien `belege/anbieter/openai-api/{trust-portal,your-data}-2026-10-25.txt` mit `nachpruefung-soc2-backup-2026-10-25.sha256` und Zeitstempel. 418/418 Tests, Build streng im Wegwerf-Klon ok (33 Anbieter). Lokal `45d13d1c`, kein Push, keine Frage.
- Als Nächstes in dieser Reihe: das Profil mit dem nächstältesten Prüfdatum (vorher per Skript zählen).

## Neu 25.10.2026 ~17:50 (Dauerlauf Laufend): Google Vertex, Prüfer für SOC 2 nachgetragen

- Anlass: Google Vertex hatte nach Exoscale/OVHcloud (blockierte Register) den ältesten Stand, 8 Zertifikatsfelder auf 22.10. Vorher geprüft: Google steht nicht im Schellman-Verzeichnis (Suche „Google“, „Google LLC“, „Alphabet“ leer).
- Die SOC-2-Seite beantwortet „Who performs the independent third-party audit?“ mit „Google Cloud’s independent auditors are Ernst & Young LLP and Coalfire.“ Der Satz stand schon in der Kopie vom 22.10., der Eintrag sagte trotzdem „nicht genannt“. Jetzt „beansprucht“ (wie Nebius/Deloitte), mit Vermerk: welche Firma welchen Bericht prüft, sagt Google nicht.
- ISO 27001, ISO 42001 und C5 neu gelesen: weiter kein Name, kein PDF, nur Compliance Reports Manager. Werte bleiben „unbelegt“, Prüfdatum 25.10.; Profil-Prüfdatum 22.10. → 24.10.
- Kopien `belege/anbieter/google-vertex-gemini-api/{iso-27001,iso-42001,soc-2,bsi-c5}-2026-10-25.txt` mit `nachpruefung-2026-10-25.sha256` und Zeitstempel. 418/418 Tests, Build streng im Wegwerf-Klon ok. Lokal `17aac019`, kein Push, keine Frage.
- Als Nächstes in dieser Reihe: openai-api (9 Einträge 22.10.).

## Neu 25.10.2026 ~17:20 Systemuhr (Dauerlauf E22-5, Stapel 46): 654 von 961, 1 gesichert, Archiv-Link mit Amazon-Schlüssel

- Gesichert: das Schellman-Zertifikat von Anthropic (1279091-2). Danach das nächste Schellman-Zertifikat (1404936-2) „fetch failed“ → Sperre, angehalten (kein Fehlversuch angerechnet). 95 Quellen offen (961 Zeilen statt 944, weil die SC-A-Läufe heute Zertifikate als neue Quellen eingetragen haben).
- **Schellman-Archivlink (geprüft 25.10. ~17:40, SH-A erledigt):** Schellman leitet auf eine 15-Minuten-Amazon-S3-Adresse weiter, das Archiv speichert die Kopie nur unter dieser signierten Adresse. Die kurze Form `web.archive.org/web/20261025161428/https://integrator.schellman.com/public/v2/certificate/1279091-2/file` und der S3-Pfad ohne Signatur geben beide 404, nur der lange Link (1.660 Zeichen) liefert das PDF (HTTP 200). Darum bleibt der Eintrag in `data/quellen-archiv.json` so; kein Code geändert. Die Archivlinks erscheinen nicht in `docs/`, nur in den Daten. GitHub hält Pushes mit „Amazon AWS Session Token“ an; ob dieser abgelaufene Fremd-Link anschlägt, ist ungeklärt. Was dann zu tun ist, steht in der privaten Push-Karte vom 25.10.
- Nächster Stapel nicht vor 18:20, weiter `node nachsichern.js --anzahl 8` (die nächsten drei Schellman-Zertifikate laufen in dasselbe Problem). 418/418 Tests (`node --test`), lokal `831c7118`, kein Push.

## Neu 25.10.2026 ~17:15 (Dauerlauf SC-A, Meta): Meta Model API ISO 27001 jetzt belegt, sogar UKAS-akkreditiert

- Schellman-Verzeichnis (Suche „Meta“) zeigt vier öffentliche Zertifikate von Meta Platforms, Inc.: ISO 9001 (Sicherheitsteams), ISO/IEC 27018 (Workplace/Horizon), Nr. 1974840-3 ISO/IEC 27001:2022 und Nr. 1861919-1 ISO/IEC 42001:2023.
- 1974840-3 (Version 3, ausgestellt 14.09.2026, gültig bis 28.08.2028): Geltungsbereich nennt wörtlich „Meta Model API“ (dazu MM Lite API, Business AI, WhatsApp Pay India), „hosted by Meta“. Trägt UKAS 8685 und ANAB → EA-MLA ja (wie Anthropic). Meta selbst nennt das Zertifikat auf den Model-API-Seiten nicht. Inhaber ist die US-Gesellschaft, EU-Vertragspartei ist Meta Platforms Ireland (so in der Anmerkung).
- 1861919-1 (ISO 42001, ausgestellt 09.10.2026): nur „Meta Business Agent services“, „The underlying large language models are explicitly excluded from this scope.“ → `iso_42001` bleibt unbelegt, Nachtrag in der Anmerkung.
- Geändert: meta-llama-api `zertifikate[]` (vorher leer) mit ISO 27001 „belegt“ samt Geltungsbereich, Zertifizierer, Akkreditierung. Belege `belege/anbieter/meta-llama-api/*-2026-10-25.*` mit `zertifikate-2026-10-25.sha256` und Zeitstempel. 418/418 Tests, Build streng im Wegwerf-Klon ok (33 Anbieter). Lokal `8be3f666`, kein Push, keine Frage.
- SC-A damit fertig (Anthropic, Microsoft, Amazon Bedrock, Meta).

## Neu 25.10.2026 ~17:00 Systemuhr (Dauerlauf SC-A, Amazon Bedrock): ISO 42001 jetzt belegt

- Schellman-Verzeichnis (Suche „Amazon“) zeigt acht öffentliche Zertifikate, nur eins für AWS: Nr. 1821017-2 ISO/IEC 42001:2023, Inhaber Amazon Web Services, Inc., Version 2, ausgestellt 20.11.2025, gültig bis 14.11.2027. Geltungsbereich nennt wörtlich „Amazon Bedrock, Amazon Q Business, Amazon Transcribe, and Amazon Textract“; Seite 2 nennt u. a. Frankfurt und Irland. Die anderen sieben gehören zu Amazon.com Services, Amazon Business und Kuiper (Leo), nicht zu AWS.
- Nur ANAB-Zeichen → EA-MLA nein (wie OpenAI/Microsoft). Ob Bedrock-Marketplace-Modelle erfasst sind, sagt das Zertifikat nicht (ungeklärt, so in der Anmerkung).
- Geändert: amazon-bedrock `zertifikate[]` ISO/IEC 42001 und Feld `iso_42001` von „beansprucht“ auf „belegt“ (Geltungsbereich, Zertifizierer, Akkreditierung). ISO 27001 war schon belegt (EY CertifyPoint, RvA), unverändert.
- Belege `belege/anbieter/amazon-bedrock/*-2026-10-25.*` (Zertifikat PDF + Text, Verzeichnis-JSON, ANAB-Seite) mit `zertifikate-2026-10-25.sha256` und Zeitstempel. 418/418 Tests, Build streng im Wegwerf-Klon ok. Lokal `eb34765b`, kein Push, keine Frage.
- Weiter in SC-A: Meta (letzter Anbieter).

## Neu 25.10.2026 ~17:20 (Dauerlauf SC-A, Microsoft): Azure OpenAI ISO 27001 belegt, Copilot bleibt beansprucht

- Schellman-Verzeichnis (Suche „Microsoft“) zeigt fünf öffentliche Zertifikate von Microsoft Corporation: ISO 22301, ISO 9001, ISO/IEC 20000-1, HDS und Nr. 1729711-18 ISO/IEC 27001:2022 + 27701:2019 (Version 18, ausgestellt 25.06.2026, gültig bis 16.06.2029). Kein ISO/IEC 42001.
- 1729711-18: Tabelle „Registered Scope“ (S. 2) nennt „Microsoft Foundry: Foundry Models“ mit Haken bei Azure und Azure Government. Das deckt das Profil („Foundry Models sold by Azure“). Der Name „Azure OpenAI“ steht nicht wörtlich drin, steht so in der Anmerkung. Nur ANAB-Zeichen → EA-MLA nein (wie OpenAI).
- Auffällig, offen in der Anmerkung: Die Textebene der Seiten 2–16 enthält unsichtbar „CONTENT DRAFT“; im gerenderten Blatt nicht zu sehen, Verzeichnis-Status „PUBLISHED“.
- Geändert: azure-openai ISO 27001 mit Geltungsbereich, Zertifizierer, Akkreditierung auf „belegt“. microsoft-copilot: ISO 27001 bleibt „beansprucht“ (das Azure-Zertifikat nennt Copilot Studio, Security Copilot, Copilot for Sales/Service/Finance, aber nicht Microsoft 365 Copilot; ein M365-Zertifikat steht nicht im Verzeichnis), Vermerk ergänzt. Bei beiden ISO 42001: Vermerk „kein 42001 im Schellman-Verzeichnis“.
- Belege `belege/anbieter/azure-openai/*-2026-10-25.*` (Zertifikat PDF + Text, Verzeichnis-JSON, ANAB-Seite) und `belege/anbieter/microsoft-copilot/schellman-verzeichnis-microsoft-2026-10-25.json`, je mit `zertifikate-2026-10-25.sha256` und Zeitstempel. 418/418 Tests, Build streng im Wegwerf-Klon ok. Lokal `73d50f7f`, kein Push, keine Frage.
- Weiter in SC-A: Amazon Bedrock, dann Meta (je ein Durchlauf).

## Neu 25.10.2026 ~17:00 (Dauerlauf SC-A, Anthropic): ISO 27001 und 42001 jetzt belegt, 27001 sogar UKAS-akkreditiert

- Schellman-Verzeichnis (Suche „Anthropic“) zeigt zwei öffentliche Zertifikate, beide Inhaber Anthropic, PBC, Version 2, ausgestellt 13.11.2025: Nr. 1279091-2 ISO/IEC 27001:2022 (gültig bis 06.01.2028) und Nr. 1806475-2 ISO/IEC 42001:2023 (gültig bis 05.01.2028). PDF hinter einer Weiterleitung, darum `curl -L`.
- Geltungsbereich beider Zertifikate: Claude Development Platform, Claude for Work (Team and Enterprise), Claude Code. Deckt also beide Profile. Kleiner Namensunterschied offen in der Anmerkung: Anthropic selbst schreibt „Claude Developer Platform“; das Trust-Portal hakt die Zeile „Claude via Anthropic's API“ ab.
- Anders als bei OpenAI: Das 27001-Zertifikat trägt neben ANAB auch das UKAS-Zeichen 8685. UKAS-Umfang 8685 (Schellman Compliance, LLC, Issue 013 vom 31.10.2025) deckt ISO/IEC 27001:2022 → Stelle UKAS, EA-MLA ja (wie Black Forest Labs, Infomaniak). Das 42001-Zertifikat trägt nur ANAB → EA-MLA nein (wie OpenAI).
- Geändert in anthropic-api und anthropic-claude-enterprise: ISO 27001 und ISO/IEC 42001 je Status, Geltungsbereich, Zertifizierer und Akkreditierung auf „belegt“; Feld `iso_42001` gleichgezogen. SOC 2 bleibt „beansprucht“ (Bericht nur auf Anfrage).
- Belege `belege/anbieter/{anthropic-api,anthropic-claude-enterprise}/` (Zertifikate, Verzeichnis-JSON, UKAS-Umfang PDF + Text, ANAB-Seiten) mit `zertifikate-2026-10-25.sha256` und Zeitstempel. 418/418 Tests, Build streng im Wegwerf-Klon ok. Lokal `a2ec38ba`, kein Push, keine Frage.
- Weiter in SC-A: Microsoft, Amazon Bedrock, Meta (je ein Durchlauf).

## Neu 25.10.2026 ~17:05 (Dauerlauf Laufend): OpenAI-Zertifikate jetzt selbst eingesehen, ISO 27001/27701/42001 belegt

- Anlass: ChatGPT Enterprise hatte den ältesten Prüfstand nach Exoscale/OVHcloud (drei Werte 21.10.). Bei der Frage „welche Akkreditierungsstelle?“ fand sich: Schellman führt ein öffentliches Zertifikatsverzeichnis (www.schellman.com/certificate-directory) mit PDF. OpenAI zeigt dieselben Zertifikate im Trust-Portal nur mit Konto.
- Zertifikat 1404936-2: ISO/IEC 27001:2022 + 27701:2019, OpenAI, OpCo, LLC, gültig bis 07.08.2028, Geltungsbereich = Produkte der Tabelle „Product compliance status“ (API Platform und ChatGPT Enterprise mit Haken), ausdrücklich nicht ChatGPT Business. Zertifikat 1764566-1: ISO/IEC 42001:2023, gültig bis 10.12.2028, nennt API, ChatGPT Business, Enterprise und Edu. Beide tragen das ANAB-Zeichen; ANAB-Verzeichnis: Schellman-MS-3780 akkreditiert u. a. für 27001, 27701, 42001.
- Geändert: openai-api ISO 27001, 27701, 42001 und openai-chatgpt-enterprise ISO 27001, 42001 von „beansprucht“ auf „belegt“, Zertifizierer belegt, Akkreditierung „nicht DAkkS, ANAB (USA)“ wie bei T-Systems (Punkt 9 bleibt „nein“, ANAB ist keine EA-MLA-Stelle); Feld `iso_42001` mitgezogen (der strenge Bau prüft die Gleichheit). SOC 2 bleibt „beansprucht“.
- ChatGPT Enterprise Zweckbindung und Protokollfrist neu nachgeprüft: keine neuere Archivkopie der Business Terms als 08.10. (live 403), Sätze weiter wörtlich; Enterprise-Privacy-Seite (Archivkopie 22.10.) nennt weiter keine Frist für Missbrauchsprotokolle. Profil-Prüfdatum 21.10. → 23.10.
- Belege `belege/anbieter/{openai-api,openai-chatgpt-enterprise}/*-2026-10-25.*` mit SHA-256 und Zeitstempel. 418/418 Tests, Build streng im Wegwerf-Klon ok. Lokal `101666f5`, kein Push, keine Frage.
- Folge: Im selben Verzeichnis stehen auch Anthropic (27001, 42001), Microsoft (27001+27701 u. a.), Amazon (27001, AWS 42001) und Meta (27001, 42001, 27018) → Aufgabe SC-A.

## Neu 25.10.2026 ~16:50 (Dauerlauf Laufend): Hochladen ist wieder ein Befehl

- Anlass: 216 lokale Commits seit dem letzten Hochladen (22.10.), daran hängen Vorauswahl und erstes Pilot-Angebot (Zwischenziel Mi 28.10.). Die Prüfschritte von `push-sauber.sh` einzeln laufen lassen (das Skript selbst sperrt die Rechteprüfung für den Dauerlauf).
- Befund 1: 51 gebaute Seiten (9 US-Profile + Vergleiche) waren unversioniert, das Skript wäre bei „Arbeitskopie nicht sauber“ stehen geblieben. Jetzt committet (`cb9ff7b6` + lastmod), Bau danach stabil.
- Befund 2: Die Namensprüfung fand einen privaten Namen in 8 versionierten Dateien, auch in `docs/daten.json` und `docs/aenderungen/feed.xml`. Ursache im Feed: Das Änderungsprotokoll nannte Kurz-ID und Betreff auch lokaler Commits. Weil `push-sauber.sh` sie zusammenfasst, zeigten online schon 3 Einträge auf Commits, die es auf GitHub nie gab.
- Fix `4e570890`: `ausGit` nennt den Commit nur, wenn er in origin/main steht (ohne origin/main wie bisher); die Einträge bekommen nach dem Hochladen beim nächsten Bau die echte ID. Namen in Kommentaren, Testnamen und Stand-Dateien durch die Rolle ersetzt, die Testdatei mit dem Namen heißt jetzt `test/auditor-hinweise.test.js`. Test zuerst `test/aenderungen-veroeffentlicht.test.js` (1 rot), dann 418/418. Namensprüfung leer, Feed 42 Verweise, alle auf GitHub.
- Handgriff für Felix steht in der privaten Karte `dossiers/PUSH-KARTE-2026-10-25.md` (2 min). Lokal, **kein Push**, keine neue Frage (533/536 offen).

## Neu 25.10.2026 ~16:00 (Dauerlauf Laufend): OVHcloud nachgeprüft, 18 von 20 alten Einträgen neu bestätigt

- Anlass: OVHcloud war nach Exoscale das letzte Profil mit Stand 14.10. 20 Einzelwerte standen auf 14.10. (vorgeschaltete Filter je Modell ×6, Protokollfrist, Prüfer und Akkreditierung bei SOC, C5, SecNumCloud, ISO 27017/27018, ISO 42001, HDS).
- Zwölf Quellen neu gelesen (Compliance-Übersicht, C5-, SOC-, SecNumCloud- und ISO-Seite, Produktseite AI Endpoints, Doku Zertifikate, Doku HDS, Doku „Features, Capabilities and Limitations“ (Stand 03.02.2026), BVB Public Cloud Stand 26.08.2026 mit Anhang 10, AVV Version 17.10.2025, KI-Verhaltenskodex 28.04.2025). Alle zitierten Sätze stehen weiter wörtlich da, kein Wert ändert sich. Compliance-Übersicht gleich der Archivkopie vom 22.10. (22 Rahmenwerke, kein ISO 42001). 18 Einträge haben jetzt Prüfdatum 25.10.
- Nicht neu lesbar: das französische HDS-Register (Incapsula-Sperre wie bisher). Die 2 HDS-Einträge bleiben bei 14.10., darum bleibt auch das Profil-Prüfdatum 14.10.
- Kopien `belege/anbieter/ovhcloud/*-2026-10-25.txt` mit SHA-256 (`nachpruefung-2026-10-25.sha256`) und Zeitstempel. 416/416 Tests, Build streng im Wegwerf-Klon ok. Lokal `e9f3ec4d`, kein Push, keine Frage.

## Neu 25.10.2026 ~15:50 (Dauerlauf E22-5, Stapel 45): 649 von 944, nichts gesichert

- Neu in der Liste: das DQS-Zertifikat-PDF von Aleph Alpha (seit 15:00 Quelle, darum 944 statt 943). Archiv: „kein Snapshot“ (Status 520). Danach openai.com/security-and-privacy/ „fetch failed“ → Sperre, angehalten (kein Fehlversuch angerechnet).
- 91 Quellen offen. Nächster Stapel nicht vor 16:50, weiter `node nachsichern.js --anzahl 8`. 416/416 Tests (`node --test test/*.test.js`), lokal `b8acf2a2`, kein Push.

## Neu 25.10.2026 ~15:30 (Dauerlauf Laufend): Exoscale nachgeprüft, 23 von 28 alten Einträgen neu bestätigt

- Anlass: Exoscale und OVHcloud hatten den ältesten Profilstand (14.10.). Bei Exoscale standen 28 Einzelwerte auf 14.10. (Prüfer, Akkreditierung und Umfang je Zertifikat, ISO 42001, Protokollfrist, Filter, Backup On-Demand).
- Zwölf Seiten neu gelesen (Compliance-Seite, Übersicht, ISO 27001, BSI C5, TISAX, HDS, CSA STAR, AGB, DPA, Datenschutz, Dedicated, On-Demand). Alle zitierten Sätze stehen weiter wörtlich da, kein Wert ändert sich. 23 Einträge haben jetzt Prüfdatum 25.10.
- Nicht neu lesbar: das französische HDS-Register (sperrt den Rechner, die Archivkopie vom 22.10. enthält die Liste nicht) und das CSA-STAR-Register (lädt nur im Browser). Diese 5 Einträge bleiben bei 14.10., darum bleibt auch das Profil-Prüfdatum 14.10. Die Notiz sagt das jetzt.
- Neu nur als Satz in der Notiz zur Protokollfrist: Die On-Demand-Seite sagt „Exoscale retains only metadata required for usage reporting“, ohne Frist.
- Kopien `belege/anbieter/exoscale/*-2026-10-25.txt` mit SHA-256 und Zeitstempel. 416/416 Tests, Build streng im Wegwerf-Klon ok. Lokal `41b23304`, kein Push, keine Frage.
- Als Nächstes in dieser Reihe: OVHcloud (auch 14.10.).

## Neu 25.10.2026 ~15:15 (Dauerlauf Laufend): Aleph Alpha ganz geprüft, Profil-Prüfdatum 08.10. → 25.10.

- Die neun Werte mit Stand 15.10. (Zweckbindung, Betroffenenrechte, Zweck der Protokolle, je Modell Backups und vorgeschaltete Filter) neu von Hand gelesen: Produktdoku Pharia-1 „Data privacy“ unverändert (dieselben drei Sätze, kein Wort zu Backups, Filtern, Zweck, Betroffenen), Datenschutzerklärung regelt weiter nur Website, Kontakt, Newsletter und Bewerbungen, Sitemap ohne Rechts- oder Trust-Seite. Alle bleiben „unbelegt“, Prüfdatum 25.10.
- Damit ist das Profil-Prüfdatum 25.10. Neuer Test `test/profil-pruefdatum.test.js`: Profil-Datum = ältestes Einzel-Datum (vorher rot nur bei Aleph Alpha, alle 32 anderen hielten es schon).
- Nebenbefund: Impressum nennt als Vertreter Ilhan Scheer; kein Profilfeld betroffen.
- Kopien `belege/anbieter/aleph-alpha/{doku,datenschutz,impressum}-2026-10-25.html` mit SHA-256 (ohne Zeitstempel-Datei). 416/416 Tests, Build streng im Wegwerf-Klon ok. Lokal `9b98c7ce`, kein Push, keine Frage.

## Neu 25.10.2026 ~15:00 (Dauerlauf Laufend): Aleph Alpha ISO 27001 jetzt mit Geltungsbereich und Aussteller belegt

- Anlass: ältester Prüfstand aller Profile (Geltungsbereich und Zertifizierer von Aleph Alpha, 08.10.). Damals sperrte Cloudflare die DQS-Datenbank.
- Heute ist der DQS-Eintrag per Skript lesbar, der Eintrag der Muttergesellschaft im Browser. Er verlinkt das Zertifikat selbst (PDF): Nr. 31623205 ISMS22, gültig bis 19.12.2027, Aussteller DQS GmbH Frankfurt, Scope „Research, development and commercialization of generative AI technology with focus on multimodal large language models.“, Standorte Heidelberg, Berlin, Bayreuth (zwei Adressen, eine davon Rechenzentrum).
- Geändert: Geltungsbereich unbelegt → belegt; Zertifizierer „DQS“ → „DQS GmbH, Frankfurt am Main“; der Vorbehalt bei der DAkkS-Akkreditierung („ob genau diese Gesellschaft“) ist weg; ISO 42001 bleibt unbelegt (beide DQS-Einträge nennen nur 27001). Das PDF sagt selbst, gültig sei es nur über den QR-Code; das steht in der Anmerkung.
- Belege `belege/anbieter/aleph-alpha/dqs-*-2026-10-25.*` mit SHA-256 und Zeitstempel. 415/415 Tests, Build streng im Wegwerf-Klon ok. Lokal `bf1f4b33`, kein Push, keine Frage.
- ~~Offen: Das Gesamt-Prüfdatum des Profils steht noch auf 08.10.~~ Erledigt 25.10. ~15:15 (Abschnitt darüber).

## Neu 25.10.2026 ~14:42 (Dauerlauf E22-5, Stapel 44): 649 von 943, nichts gesichert

- openai.com/policies/business-terms/ und /sub-processor-list/ „kein Snapshot“ (Status 520), openai.com/security-and-privacy/ „fetch failed“ → Sperre, angehalten (kein Fehlversuch angerechnet). Die OpenAI-Seiten liegen hinter Bot-Prüfung, das Archiv kommt dort seit Stapel 43 nicht durch.
- 90 Quellen offen. Nächster Stapel nicht vor 15:45, weiter `node nachsichern.js --anzahl 8`. 415/415 Tests, lokal `b96d4974`, kein Push.

## Neu 25.10.2026 ~14:05 (Dauerlauf Laufend): Vorauswahl-CSV sagt beim Preis dasselbe wie die Webseite
- Fund: In der CSV stand bei 15 Anbietern der Preis auf „ungeklärt“ (OpenAI, Anthropic, Google, Microsoft, Meta, Amazon, DeepL, Cohere u. a.). Die Webseite sagt an derselben Stelle richtig „kein EUR-Preis erfasst, siehe Profil“: Die Preise sind im Profil belegt, nur nicht in Euro (meist USD in der Anmerkung). Ein Prüfer in Excel hätte gelesen, wir wüssten den Preis nicht.
- Jetzt: CSV-Zelle „kein EUR-Preis erfasst, siehe Profil“, Quelle = Profil-Adresse, Datum = Profil-Prüfdatum. „ungeklärt“ bleibt nur, wenn kein Modell eine Quelle hat (heute keiner).
- Test zuerst rot, dann grün; 415/415, Build streng im Wegwerf-Klon ok (15 Zellen). Lokal `f42fb2ef`, kein Push, keine Frage.

## Neu 25.10.2026 ~13:45 (Dauerlauf Laufend): Meta-Wächterfund nachrecherchiert, alte Zahl 92 dreimal zitiert, keine Ankündigung gefunden
- Die zwei „ungeklärt“-Punkte aus der privaten Wächter-Meldung vom 25.10. (Muse-Wonder-Modellkarte, ExploitGym 92 → 20) geklärt, so weit es geht.
- Ankündigung der Korrektur durch Meta (Blog, Leaderboard): in drei Websuchen nicht gefunden; Suchindizes zeigen noch die alte Fassung.
- Alte Zahl zitiert: felloai.com, Handy AI (Substack) und aiwiz.uk, jeweils mit 21/71-Aufteilung; aiwiz sagt „Last updated 24 October“ und hat trotzdem 92/21. Lokale Kopien mit SHA-256 in `waechter/roh/2026-10-25/zitate-92/` (git-ignoriert), Nachtrag in der privaten Meldung.
- Nutzen: Beispiel für Gespräche mit Prüfern (Vergleichsseiten hinken der Modellkarte hinterher, nur eine datierte Kopie zeigt das). Kein Profilwert betroffen, keine Tests berührt, nichts committet (nur git-ignorierte Dateien), kein Versand, keine Frage.

## Neu 25.10.2026 ~13:20 (Dauerlauf Laufend): DPF-Liste von Hand neu abgefragt, alles gleich
- Neunter bis 13. blinder Fleck aus dem DÜNN-Block: www.dataprivacyframework.gov/list und /participant/5776, 6474, 5780, 4452 (je 12 Wörter Hülle; Feld stammdaten.dpf in 11 Profilen).
- Abfrage über die Schnittstelle der Liste (robots offen), Liste laut Schnittstelle zuletzt geändert 25.10. 6:00 EST. Amazon, Microsoft, Google, Meta: Einträge Feld für Feld gleich wie die Kopien vom 22./23.10. OpenAI, Anthropic, Claude: 0 Treffer. Cohere: nur OpaVote/Coherent Inc. Gegenproben je 1 Treffer.
- Keine Wertänderung; je ein Satz „am 25.10. von Hand neu abgefragt“ in den 11 Anmerkungen. Beleg `belege/rechtsraum/dpf-2026-10-25/` (22 Antworten, SHA256SUMS, gestempelt). 414/414 Tests, Build streng im Klon ok, lokal `078a9c42`, kein Push.
- Damit sind alle 24 DÜNN-Seiten einmal von Hand gelesen (Meta ×2 über die Archivkopie 25.10.). Frage 546 (Prüfdatum bei DÜNN-Seiten nicht automatisch fortschreiben) bleibt offen.

## Neu 25.10.2026 ~12:55 (Dauerlauf Laufend): DeepSeek-Hilfe-Center von Hand gerendert, Angabe stimmt
- Achter blinder Fleck aus dem DÜNN-Block: static.deepseek.com/faq (Frage zum Kooperationsvertrag, 2 Wörter Hülle; Feld vertrag.avv).
- Chrome headless, dazu die API-Fragenliste. Beide Texte wortgleich mit dem Render vom 23.10. (nur Zeilenumbrüche anders). Zitate „self-service and standardized model“, „cannot be modified“, „Bank Transfer“ weiter da.
- AVV bleibt „unbelegt“, ein Satz „von Hand gerendert 25.10.“ in der Anmerkung. Beleg `belege/anbieter/deepseek-api/handpruefung-faq-2026-10-25.txt`. 414/414 Tests, Build streng im Klon ok, lokal `88b70bf2`, kein Push.
- Rest DÜNN ohne Handprüfung: Meta ×2 (Archivkopie da), DPF ×5.

## Neu 25.10.2026 ~13:40 (Dauerlauf E22-5, Stapel 43): 649 von 943

- 1 vorhandene Archivkopie übernommen (Text gleich): docs.greenpt.ai/privacy/locations (Kopie 20261025112833). Danach openai.com/business-data/ (Status 520) und openai.com/policies/business-terms/ „fetch failed“ → Sperre, angehalten (kein Fehlversuch angerechnet).
- 90 Quellen offen. Nächster Stapel nicht vor 14:40, weiter `node nachsichern.js --anzahl 8`. 414/414 Tests, lokal `64b9aa6f`, kein Push.

## Neu 25.10.2026 ~11:25 (Dauerlauf OA-Z): OpenAI-Liste nachgezählt, 17 statt 18 Gesamtzeilen
- Archiv-CDX fand eine lesbare Kopie vom 21.10.2026 (Stand „Last updated: October 14, 2026“; Kopie 20.10. war nur 403). Live-Seite nicht angefasst.
- Zählung: 17 Fremdfirmen-Zeilen (Cloudflare zweimal), davon 14 mit „API“, dazu 5 OpenAI-Gesellschaften. Werte bleiben: API 19, ChatGPT Enterprise 22 (Business 21). Nur die Anmerkung bei openai-api sagte „18“ → korrigiert, sagt es offen.
- Neuer Test in `test/subprozessoren-link.test.js` (beide Profile nennen 17). OpenAI bleibt in der Ausnahme „je Produkt“, weil die Liste das Produkt je Zeile nennt (wie Anthropic).
- Belege `belege/anbieter/{openai-api,openai-chatgpt-enterprise}/handpruefung-oa-z-2026-10-25.txt`. 414/414 Tests, Build streng im Klon ok, lokal `e8e16e1a`, kein Push.

## Neu 25.10.2026 ~11:45 (Dauerlauf Laufend): Microsoft-Liste von Hand nachgezählt, Azure OpenAI 89 → 88
- Siebter blinder Fleck aus dem DÜNN-Block: servicetrust.microsoft.com/DocumentPage/115f… und aka.ms/subprocessor (je 12 Wörter Hülle). aka.ms leitet weiter auf dieselbe Seite; Seite nennt weiter „Online Services Subprocessors List (2026-09-10)“.
- PDF ohne Anmeldung über api.servicetrust.microsoft.com/api/v2/downloadDocuments/<id> gelesen: 7 + 4 + 5 + 35 Fremdfirmen, 37 Rechenzentrums-Gesellschaften = 88. Copilot (88) stimmt, Azure OpenAI stand bei 89 (38) → korrigiert, Anmerkung sagt es offen.
- Neuer Test „gleiche Liste → gleiche Zahl“ in `test/subprozessoren-link.test.js`. Er fand zusätzlich OpenAI: Gesamtliste einmal 18 (openai-api), einmal 17 Drittanbieter-Zeilen (openai-chatgpt-enterprise). Live hinter Bot-Prüfung, Archiv nur Juni → offen als Aufgabe OA-Z, im Test ausdrücklich ausgenommen (Anthropic zählt je Produkt, das ist richtig).
- Belege `belege/anbieter/{azure-openai,microsoft-copilot}/handpruefung-stp-2026-10-25.txt` (PDF-SHA-256 + Text). 413/413 Tests, Build streng im Klon ok, lokal `8b6e2143`, kein Push.
- Rest DÜNN ohne Handprüfung: Meta ×2 (Archivkopie da), DeepSeek-FAQ, DPF ×5.

## Neu 25.10.2026 ~11:00 (Dauerlauf Laufend): Gcore- und Lyceum-Trust-Portal von Hand gerendert, Werte stimmen
- Fünfter und sechster blinder Fleck aus dem DÜNN-Block: trustcentre.gcore.com Start + /resources, trust.lyceum.technology Start + /resources (je 3 Wörter Hülle).
- Chrome headless wie bei Mistral/BFL. Gcore: Compliance weiter ISO 27001:2022, PCI-DSS 4.0, SOC 2 Type 1, GDPR; ISO-Zertifikat und SOC-2-Bericht nur auf Anfrage, PCI-Zertifikat frei; kein 42001, kein SOC 2 Type II. Lyceum: DPA und Engagement Letter frei, TOMs nur auf Anfrage, weiter kein ISO-Zertifikat.
- Keine Status- oder Wertänderung; je ein Satz „von Hand gerendert 25.10.“ in den Anmerkungen (Gcore ISO 27001 + SOC 2, Lyceum TOM). Hinweis: Lyceum-Startseite sagt „Lyceum Technology GmbH“, die DPA „Lyceum Technology Germany GmbH“, nur im Beleg vermerkt.
- Belege `belege/anbieter/gcore/` und `belege/anbieter/lyceum/handpruefung-trust-2026-10-25.txt`. 411/411 Tests, Build streng im Wegwerf-Klon ok, lokal `2986de89`, kein Push.
- Rest DÜNN ohne Handprüfung: Meta ×2 (Archivkopie da), DeepSeek-FAQ, DPF ×5, Microsoft ×2.

## Neu 25.10.2026 ~10:50 (Dauerlauf E22-5, Stapel 41): 645 von 943

- 1 vorhandene Archivkopie übernommen (Text gleich): IONOS-TOM-PDF (AVV Anlage 2, Kopie 20261025082847). Danach deepl.safebase.us „fetch failed“ → Sperre, angehalten (kein Fehlversuch angerechnet).
- 92 Quellen offen. Nächster Stapel nicht vor 11:50, weiter `node nachsichern.js --anzahl 8`. 411/411 Tests, lokal `5c5163e8`, kein Push.

## Neu 25.10.2026 ~10:20 (Dauerlauf Laufend): BFL-Trust-Portal von Hand gerendert, Werte stimmen
- Vierter blinder Fleck aus dem DÜNN-Block: trust.bfl.ai Start + /subprocessors (je 3 Wörter Hülle; Felder TOM, Subprozessoren, Anzahl, Drittländer, Zertifikate).
- Chrome headless wie bei Mistral. 10 Subprozessoren wie im Profil, weiter ohne Orte (Drittländer bleibt ungeklärt). Kontroll-Zitate „Data encryption utilized“, „Penetration testing performed“ wörtlich da; ISO-27001- und SOC-2-Dokument wie im Profil.
- Neu gesehen: ein weiterer Prüfbericht zum Datenschutz unter „Resources“, nur nach Zugangsanfrage. Ein Satz dazu in der TOM-Anmerkung (ohne Normen-Namen, Test normenbezug), Status unverändert.
- Beleg `belege/anbieter/black-forest-labs/handpruefung-trust-2026-10-25.txt` (Vergleichsstand ab heute). 411/411 Tests, Build streng im Wegwerf-Klon ok, lokal `16eff0e8`, kein Push.
- Rest DÜNN ohne Handprüfung: Meta ×2 (Archivkopie da), DeepSeek-FAQ, Gcore, Lyceum, DPF ×5, Microsoft ×2.

## Neu 25.10.2026 ~09:55 (Dauerlauf Laufend): Gesprächskarte Fr 30.10. auf Stand gebracht
- Zählstand-Zeile neu (3/5 · 2/2 · Pilot 0/1; das andere Gespräch der Woche hat seit 23.10. keine Termin-Antwort), Anbieterzahl online 24 statt 21.
- Der Kalendereintrag zeigte auf zwei ältere Vorbereitungsdateien, jetzt auf die Karte (ohne Benachrichtigung). Nichts gesendet, keine Frage.

## Neu 25.10.2026 ~09:45 (Dauerlauf Laufend): Mistral-Trust-Portal von Hand gerendert, Werte stimmen
- Dritter blinder Fleck aus dem DÜNN-Block: trust.mistral.ai/subprocessors + /controls (je 4 Wörter Hülle; Felder Subprozessoren, Anzahl, Drittländer, TOM).
- Chrome headless wie bei Anthropic. Subprozessoren: 25 Einträge (Seite „1-10 of 25 results“, von Hand gezählt), USA bei Google, Stripe, Blackforest Labs, Brave, Twilio, CrowdStrike, OVH, Gradual; Worldwide bei Megaport, Vultr, Cloudflare → Profilwerte stimmen. Controls: 26 Kontrollen, Pentest-Zitat wörtlich da.
- Kein früherer Render gespeichert; der Text steht jetzt im Beleg `belege/anbieter/mistral/handpruefung-trust-2026-10-25.txt` als Vergleichsstand.
- Korrigiert: Anmerkung `vertrag.subprozessoren` sagte noch „Einträge nicht gelesen“; jetzt: von Hand gelesen 25.10. 411/411 Tests, lokal, kein Push.
- Rest DÜNN ohne Handprüfung: Meta ×2 (Archivkopie da), DeepSeek-FAQ, BFL ×2, Gcore, Lyceum, DPF ×5, Microsoft ×2.

## Neu 25.10.2026 ~09:35 (Dauerlauf E22-5, Stapel 40): 644 von 943

- 1 vorhandene Archivkopie übernommen (Text gleich): aleph-alpha.com (Kopie 20261023001908). Danach IONOS-TOM-PDF (AVV Anlage 2) „fetch failed“ → Sperre, angehalten (kein Fehlversuch angerechnet). Stapel 38/39 (Infomaniak-TOM-PDF, Infomaniak-Datenschutz) stehen nur in ALLEIN.md.
- 93 Quellen offen. Nächster Stapel nicht vor 10:35, weiter `node nachsichern.js --anzahl 8`. 411/411 Tests (`node --test test/*.test.js`), lokal `c1fa047c`, kein Push.

## Neu 25.10.2026 ~08:30 (Dauerlauf Laufend): Anthropic-Trust-Portal von Hand gerendert, alles gleich
- Zweitgrößter blinder Fleck aus dem DÜNN-Block: trust.anthropic.com Start + /subprocessors (je 3 Wörter Hülle, zusammen 15 Felder in anthropic-api und anthropic-claude-enterprise).
- Wie am 22.10. mit Chrome headless gerendert, Text mit demselben Skript aus altem und neuem DOM gezogen: beide Texte haben dieselbe SHA-256 wie am 22.10. Liste (22 Einträge), Haken „Claude via Anthropic's API“, Berichtsnamen und letzte Änderung 15.10. unverändert.
- Keine Profiländerung; die Prüfdaten 25.10. sind hier sachlich gedeckt. Beleg `belege/anbieter/anthropic-api/handpruefung-trust-2026-10-25.txt`.
- Rest DÜNN ohne Handprüfung: Meta ×2 (Archivkopie da), DeepSeek-FAQ, BFL ×2, Gcore, Lyceum, Mistral ×2 (alle Trust-Portale, gleiche Methode möglich), DPF ×5, Microsoft ×2.

## Neu 25.10.2026 ~07:25 (Dauerlauf Laufend): Nordference von Hand über das Skript-Bündel geprüft, alles gleich
- Nordference ist der größte blinde Fleck aus dem DÜNN-Block (6 Seiten, über 30 Felder). Alle Seiten laden dasselbe Skript-Bündel `index-CGzvo87P.js`; dort steht der ganze Text.
- SHA-256 heute gleich wie am 08.10. (e68e235c…d9ad): Der Seitentext hat sich seit 08.10. nicht geändert. Alle Zitate aus den Anmerkungen stehen wörtlich drin, alle fünf Preise stimmen, „certified“ und „subprocessor“ kommen weiter nicht vor, Auslieferung weiter über Cloudflare.
- Damit sind die automatisch fortgeschriebenen Prüfdaten 25.10. bei Nordference diesmal sachlich gedeckt. Beleg `belege/anbieter/nordference/handpruefung-buendel-2026-10-25.txt`. Keine Profiländerung.
- Hinweis zu Frage 546: Bei Nordference würde ein Hash über das Bündel statt über die Hülle den Quellenlauf wieder sehend machen (neuer Dateiname nach Neuauslieferung = Signal). Nicht gebaut, gehört zur Antwort auf 546.

## Neu 25.10.2026 ~07:00 (Dauerlauf AK3 Teil 2 + Fund): 24 Quellen, bei denen der Quellenlauf blind ist
- AK3 Rest: OVHcloud ISO-Seite + AI-Endpoints-Katalog, Requesty DPA + Datenschutz weiter „fetch failed“ aus dem Archiv (Drosselung). GreenPT Nachhaltigkeit und Claude-Datenhaltung wie am 24.10. (echte Änderung schon übernommen bzw. nur Cookie-Banner). Bleibt so; nächster Blick nur, wenn der Archivcheck in der Tagesprüfung sie wieder trifft.
- **Fund:** Der Wortstand für facebook.com/legal/terms/data_security_terms (TOM-Quelle Meta Model API) ist ein einziges Wort: „Facebook“. Die Seite lädt ihren Text erst im Browser. Der Hash läuft über die Hülle, der Quellenlauf meldet sie täglich „unverändert“ und schreibt das Prüfdatum fort. Die Wayback-Kopie 20261025022236 hat den vollen Text (825 Wörter, „Effective Date: April 25, 2023“).
- Neu im Quellenlauf: Block **DÜNN** (wie im Wächter, unter 100 Wörtern HTML; PDFs, Hugging Face und Notion-API zählen nicht). Trockenlauf 25.10.: 24 Seiten – Meta Data Security Terms + MGPT (je 1 Wort), DeepSeek-FAQ (2), Trust-Center Anthropic ×2, BFL ×2, Gcore, Lyceum, Mistral ×2 (3–4), DPF-Liste + 4 Teilnehmerseiten, Microsoft Service Trust + aka.ms/subprocessor (12), nordference.ai ×6 (12). Liste `allein/tmp/ql-duenn-2026-10-25.txt`.
- Meta-TOM-Anmerkung: Zitat war eine deutsche Übersetzung in Anführungszeichen; jetzt englisch wörtlich („Logging and auditing of physical access to the data center by employees and contractors“) mit Übersetzung in Klammern, Stand-Datum und Satz, dass der Quellenlauf hier blind ist.
- Offen (Frage 546 an Felix): Prüfdatum bei DÜNN-Seiten nicht mehr automatisch fortschreiben, nur nach Lesen von Hand oder über eine Archivkopie.
- 411/411 Tests (neu `test/duenn.test.js`), Build streng im Wegwerf-Klon ok (33 Anbieter), lokal `bf536fae`, kein Push.

## Neu 25.10.2026 ~05:35 (Dauerlauf E22-5, Stapel 37): 641 von 943

- 1 frisch gesichert: facebook.com/legal/terms/data_security_terms (Kopie 20261025022236, Text ungleich dem Prüfstand, zählt trotzdem; vermutlich Login-Hülle). Danach Infomaniak-TOM-PDF „fetch failed“ → Sperre, angehalten.
- 96 Quellen offen. Nächster Stapel nicht vor 06:35, weiter `node nachsichern.js --anzahl 8`. 408/408 Tests, lokal `66228d21`, kein Push.

## Neu 25.10.2026 ~03:25 (Dauerlauf E22-5, Stapel 36): 640 von 943

- 1 vorhandene Archivkopie übernommen (Text gleich): exoscale.com/security. Danach facebook.com/legal/terms/data_security_terms „fetch failed“ → Sperre, angehalten (kein Fehlversuch angerechnet).
- 97 Quellen offen. Nächster Stapel nicht vor 04:25, weiter `node nachsichern.js --anzahl 8`. 408/408 Tests, lokal, kein Push.

## Neu 25.10.2026 ~02:05 (Dauerlauf E22-5, Stapel 35): 639 von 943

- 1 vorhandene Archivkopie übernommen (Text gleich): Scaleway-TOM-PDF. Danach exoscale.com/security „fetch failed“ → Sperre, angehalten (kein Fehlversuch angerechnet).
- 98 Quellen offen. Nächster Stapel nicht vor 03:05, weiter `node nachsichern.js --anzahl 8`. 408/408 Tests, lokal, kein Push.

## Neu 25.10.2026 ~02:00 (Dauerlauf WX-CSV): Vorauswahl als Tabelle zum Herunterladen

- Neu `docs/vorauswahl/vorauswahl.csv` (Build schreibt sie, `VA.csv` in `lib/vorauswahl.js`): 33 Zeilen, 20 Spalten. Je Wert (Preis, Zahl der Unterauftragnehmer, Drittländer, AVV, TOM, belegte Zertifikate) eine Spalte Quelle und eine Spalte „geprüft am“; ohne Wert steht „ungeklärt“ (42 Zellen). UTF-8 mit BOM, Semikolon, CRLF (`.gitattributes`: `*.csv -text`), Formelzeichen vorne entschärft.
- Link „Als Tabelle (CSV)“ unter der Tabelle auf `/vorauswahl/`. Grund: Prüfer und Datenschutzbeauftragte führen die Dienstleister-Prüfung in Excel, so landen unsere Belege samt Quelle in ihren Akten.
- Test zuerst (`test/vorauswahl-csv.test.js`, 0/6 → 6/6), alle 408/408 grün. Lokal `1abde8f4` + `a963643d` (darin auch die Build-Ausgabe vom 25.10. für schon versionierte Seiten; die unversionierten Build-Ordner bleiben unangetastet). **Kein Push**, geht mit dem nächsten Hochladen der Vorauswahl mit.

## Neu 25.10.2026 ~01:10 (Dauerlauf Tagesprüfung): Wächter-Fund Meta, sonst Rauschen

- 402/402 Tests, Build streng im Wegwerf-Klon ok (33 Anbieter). Vier Tests waren nach dem Quellenlauf rot: `test/subprozessoren-link.test.js` verlangte fest `geprueft: 2026-10-24`, der Quellenlauf setzt das Datum täglich neu → jetzt „24.10. oder später“.
- Archivcheck 23 Zitate: nur zwei Kopien „fetch failed“ (Drosselung). Fälle 003/004 wörtlich bis auf BFL-Privacy (nur Leerraum, bekannt).
- Quellenlauf 328: 292 gleich, 13 verändert, 15 weg, 6 neu. Alle 13 von Hand gelesen: EUrouter bewirbt neue Modelle (Mistral Large 4, DeepSeek V4.1 Flash, Claude Haiku 5.5), Preise der fünf Profilmodelle im Seiten-JSON gleich; OpenAI „your data“: ein Satz zu Zero Data Retention und erweitertem Prompt-Caching fehlt (Wortlaut ungeklärt, Archiv 429), alle zitierten Sätze stehen wörtlich da; Rest Menü, Build-IDs, Sprachwechsel. Übernommen. Weg: OpenAI 403, Archiv-Drosselung, Cohere-Trust-Center (bekannt).
- **Wächter echt:** Meta, Modellkarte Muse Wonder: Tabelle „ExploitGym 92*“ → „20*“, neue Fußnote „Updated ExploitGym Evaluations (23 October 2026)“ (Messaufbau korrigiert, 20 statt 92 bzw. 21 Flags; Risikostufe „moderate or lower“ bleibt). Kopien `waechter/roh/2026-10-22/` und `2026-10-25/` mit SHA-256 und Zeitstempel; private Meldung `outreach/gespraeche/ECHTE-WAECHTER-MELDUNG-2026-10-25.md`. Kein Profilwert betroffen. Pilot 10 gleich.
- Lokal `087330a3`, **kein Push**. Die 43 Build-Ordner in `docs/` vom 24.10. 00:07 liegen weiter unangetastet (gehören zum Push-Schritt im Home-Tab).

## Neu 24.10.2026 ~20:38 (Dauerlauf Verbesserer): Ablaufdatum der Zertifikate fehlt als Feld

- 112 Zertifikats-Einträge, keiner mit eigenem Ablaufdatum; 14 Daten stehen nur im Freitext. Fünf „belegte“ enden am 07.11.2026 (Nebius ISO 27001/27701/27018/42001, Gcore PCI DSS) und würden danach weiter als belegt erscheinen.
- Vorschlag Feld `gueltig_bis` + Anzeige „abgelaufen“ in `VERBESSERER.md`, wartet auf Felix. Nachprüfung Nebius/Gcore am So 08.11. ist eingeplant. Nichts gebaut.

## Neu 24.10.2026 ~20:40 (Dauerlauf E22-5, Stapel 34): 638 von 943

- 1 vorhandene Archivkopie übernommen (Text gleich): Mistral-Unterauftragnehmer. Danach Scaleway-TOM-PDF „fetch failed“ → Sperre, angehalten (kein Fehlversuch angerechnet).
- 99 Quellen offen. Nächster Stapel nicht vor 21:40, weiter `node nachsichern.js --anzahl 8`. 402/402 Tests grün. Lokal `c1b62265`, kein Push, keine Frage.

## Neu 24.10.2026 ~18:15 (Dauerlauf Laufend): Lücken in der Vorauswahl-Tabelle nachgeprüft

- Stand: 102 von 132 Zellen (33 Anbieter × AVV, Sicherheitsmaßnahmen, Zahl der Unterauftragnehmer, Drittländer) haben einen belegten Wert. 9 Zellen sind „nur auf Anfrage“, 21 fehlen ganz. Die meisten Lücken liegen bei 6 Anbietern ohne jede öffentliche Liste (Aleph Alpha, DeepSeek, Nordference, Regolo, Lyceum, Infomaniak).
- Zwei Lücken neu versucht, beide bleiben „ungeklärt“:
  - Gcore Sicherheitsmaßnahmen: Die Seite gcore.com/legal liefert beim Abruf nur den Rahmenvertrag; der DPA-Reiter lädt per JavaScript nach, die Schnittstelle `/api/cms` hat keine öffentliche Route (404). Web-Suche ohne Treffer.
  - Infomaniak Unterauftragnehmer: Die DSGVO-Seite (infomaniak.com/en/legal/general-data-protection-regulation, Abruf 24.10.) verspricht nur „Be transparent when we use subcontractors“, eine Liste oder der Anhang „Third-Party Subcontractors“ ist weiter nicht öffentlich.
- Für ein Prüfer-Gespräch brauchbar: Die Lücken sind selbst ein Befund (wer nichts öffentlich zeigt). Nichts an den Daten geändert, nichts gebaut, keine Frage.

## Neu 24.10.2026 ~17:53 (Dauerlauf E22-5, Stapel 33): 636 von 943

- 2 vorhandene Archivkopien übernommen (Text gleich): Lyceum Trust Center, Mistral Trust-Controls. Danach Mistral-Unterauftragnehmer „fetch failed“ → Sperre, angehalten (kein Fehlversuch angerechnet).
- Versehen: `node nachsichern.js --help` startet einen Stapel (es gibt keine Hilfe-Option, Standard 15), darum lief er 17:52 statt ab 18:00. Kein Schaden.
- 101 Quellen offen. Nächster Stapel nicht vor 19:00, weiter `node nachsichern.js --anzahl 8`. 402/402 Tests grün. Lokal, kein Push, keine Frage.
- Nebenbei geprüft: die 43 ungetrackten Ordner in `docs/` (Build 24.10. 00:07) sind gewollter Build-Stand; Felix' Hochlade-Befehl (unten, „Reihenfolge für den Home-Tab“) nimmt sie mit `git add -A docs` mit. Nicht löschen.

## Neu 24.10.2026 ~17:45 (Dauerlauf Laufend): Kill-Check-Stand auf heute

- Stand: 3 von 5 Gesprächen, 2 von 2 Bedingungen, Pilot 0 von 1. Unverändert seit 22.10.
- Das Zwischenziel Mi 28.10. („1 Dossier angeboten“) hängt nur noch an zwei Handgriffen: Vorauswahl-Seite hochladen, dann das fertige Angebot senden. Beides ist eine offene Frage an Felix.
- Posteingang 24.10.: ein Prüfer hat eine Antwort für die nächste Woche angekündigt; eine Terminanfrage für 28./29.10. ist weiter unbeantwortet. Details nur in der privaten Messdatei.
- Nichts gesendet, nichts gebaut, keine neue Frage.

## Neu 24.10.2026 ~17:20 (Dauerlauf Laufend): Wachsen (WX1) braucht neue Namen

- WX1 steht heute bei 1 von 5 (Cohere). Die Liste aus WX1 ist abgearbeitet, und kein Prüfer hat seit DeepL einen weiteren Anbieter genannt.
- Vorschlag (nichts gebaut): die KI-Funktionen der fünf Büro-Tools aus dem Probe-Pilot aufnehmen (Zoom AI Companion, Slack AI, Notion AI, Atlassian Rovo, HubSpot Breeze). AVV und Unterauftragnehmer-Liste liest der Pilot-Wächter schon seit 18.10.; Produktseiten am 24.10. live geprüft (5 von 5 erreichbar). Ungeklärt: Modell dahinter und EU-Datenhaltung je Tool.
- Blatt `WX1-KANDIDATEN-2026-10-24.md`, Frage 540 an Felix. Bis zur Antwort kein neuer Anbieter.

## Neu 24.10.2026 ~16:40 (Dauerlauf E22-5, Stapel 32): 634 von 943

- STACKIT-TOMs-PDF als schon vorhandene Archivkopie übernommen (Text gleich). Danach Lyceum Trust Center „fetch failed“: das Archiv sperrt weiter, der Stapel hielt nach 2 Quellen an (kein Fehlversuch angerechnet).
- 103 Quellen offen. Nächster Stapel nicht vor 18:00, weiter `node nachsichern.js --anzahl 8`. 402/402 Tests grün. Lokal `f5d203d2`, kein Push, keine Frage.

## Neu 24.10.2026 ~14:10 (Dauerlauf Laufend): Nachsichern schaut erst im Archiv nach und hält bei Sperre an

- Problem: Vier Archiv-Stapel in Folge schafften nur 1 von 8. Eine reine Lese-Probe (keine neue Sicherung) zeigt den Grund: Nach etwa 6 Abrufen lehnt web.archive.org jede Verbindung ab, auch Leseabfragen, bei allen Zielseiten gleich. Die übrigen 7 Quellen je Stapel bekamen trotzdem einen Fehlversuch angerechnet.
- Neu 1: `nachsichern.js` fragt zuerst das Archiv-Verzeichnis (CDX, nur lesen), ob es schon eine Kopie gibt (höchstens 60 Tage alt, `--max-tage`). Sie wird nur übernommen, wenn ihr Text gleich dem Prüfstand ist; sonst wie bisher Save Page Now. In der Probe hatten 2 von 3 prüfbaren Quellen so eine Kopie (STACKIT TOM-PDF, Mistral Trust-Controls).
- Neu 2: „fetch failed“, ECONNREFUSED, ECONNRESET und 429 gelten als Sperre des Archivs: Stapel hält an, die Quelle bekommt keinen Fehlversuch. „kein Snapshot“ und Zeitüberschreitung zählen weiter.
- Test zuerst (3 rot, dann 1 rot), 402/402. Lokal `dd621509`, kein Push, keine Frage. Nächster Stapel wegen der Probe-Sperre nicht vor 15:10.


## Neu 24.10.2026 ~13:35 (Dauerlauf E22-5, Stapel 31): 633 von 943

- Die Zählung ist gewachsen (943 Angaben-Zeilen statt 844), weil die Vorauswahl-Felder aus LP1 eigene Quellen haben; vorher 631 mit Kopie.
- 1 von 8 gesichert: Microsoft-Unterauftragnehmerliste (aka.ms/subprocessor, gleich). Abgelehnt („fetch failed“): Aleph Alpha Startseite, IONOS TOM-Anlage (PDF), DeepL Safebase, GreenPT Standorte, OpenAI ×3 (Business-Daten, Unterauftragnehmer, Sicherheit).
- 104 Quellen offen. Vierter Stapel in Folge nur 1 von 8: das Archiv drosselt. Nächster Stapel nicht vor 14:35, weiter `node nachsichern.js --anzahl 8`. 398/398 Tests grün. Lokal `6b104ece`, kein Push, keine Frage.
## Neu 24.10.2026 ~13:35 (Dauerlauf Laufend): Hetzner steht jetzt als „kostenlos (solange experimentell)“

- Offener Punkt von 13:02: Hetzner stand in Tabelle und Dossier nur als „kostenlos“. Quelle live geprüft am 24.10.: docs.hetzner.com Inference API, FAQ „As long as the Inference API remains in experimental status, it is free of charge“, dazu „should not use the platform for production environments“. Der Wert 0 stimmt, aber ohne die Bedingung liest ein Prüfer ihn als Dauerpreis.
- Neu: optionales Modellfeld `preis_bedingung` (nur bei Preis 0 erlaubt, sonst Fehler). Wenn alle freien Modelle dieselbe Bedingung nennen, steht sie überall neben „kostenlos“: Vorauswahl, Übersicht, Profil-Modelltabelle, Dossier. Hetzner: beide Modelle „solange experimentell“. README ergänzt.
- Test zuerst (2 rot, dann 398/398), Build streng ok im Wegwerf-Klon, Hetzner-Dossier neu erzeugt. Lokal `40059999`, kein Push, keine Frage.
- Der Wegwerf-Klon `~/allein/tmp/bk-preis` ließ sich nicht löschen (Schutzprüfung von Claude Code, weil er kurz Arbeitsordner war). Kann weg, Felix oder ein späterer Lauf.

## Neu 24.10.2026 13:02 Systemuhr (Dauerlauf Laufend): Vorauswahl-Zeile im Dossier nennt jetzt auch Preis und AVV

- Lücke: Der Auditor (Gespräch 3) wollte Preis, Unterauftragnehmer, Drittländer, AVV und TOM an einer Stelle. Die Tabelle /vorauswahl/ hat alle fünf, die Zeile oben im Dossier hatte nur drei.
- Jetzt: „- Vorauswahl: Preis: ab 0,15 € / 1M Input; Unterauftragnehmer 11; Drittländer: Kanada, USA; AVV: <Link>; Sicherheitsmaßnahmen: <Link>“, gleiche Reihenfolge und gleicher Preis wie die Tabelle (`preisKurz`), ohne Preis „kein EUR-Preis erfasst“, ohne AVV „ungeklärt“.
- Vorrat neu erzeugt: alle 33 `dossiers/<id>-2026-10-24.md` (privat) tragen die Zeile.
- Auffällig, nicht geändert: Hetzner steht in Tabelle und Dossier als „kostenlos“ (günstigster Modellpreis 0). Beim nächsten Hetzner-Blick prüfen, ob das ein Gratis-Kontingent ist und so stehen soll.
- Test zuerst (2 rot, dann 396/396), Build streng ok im Wegwerf-Klon. Lokal `b999568e`, kein Push, keine Frage.

## Neu 24.10.2026 12:07 Systemuhr (Dauerlauf Laufend): Dossier zeigt jetzt Unterauftragnehmer, Drittländer und Sicherheitsbeschreibung

- Lücke: Die drei Felder aus LP1 (Zahl der Unterauftragnehmer, Drittländer, Link zur Sicherheitsbeschreibung) standen nur auf /vorauswahl/, nicht im Dossier. Genau danach hat der Auditor gefragt, und ihm wird das erste Gratis-Dossier angeboten.
- Jetzt: je eine Zeile in Abschnitt 1 (belegt) oder 2 (nicht belegbar, mit „Ungeklärt: …“), dazu oben unter „Auf einen Blick“ eine Zeile „Vorauswahl: Unterauftragnehmer …; Drittländer: …; Sicherheitsmaßnahmen: …“ (gleiche Wörter wie die Tabelle, auch „nur auf Anfrage“). Das Änderungsprotokoll bleibt unberührt, die Felder laufen bewusst nicht über `belegFelder`.
- Vorrat neu: 33 Dossiers `dossiers/<id>-2026-10-24.md` (privat, gitignored), alle mit der Vorauswahl-Zeile. Wählt der Auditor drei Anbieter, sind sie am selben Tag fertig (`node dossier.js <id> --fuer "…"`).
- Test zuerst `test/dossier-vorauswahl.test.js` (4 rot, dann 1 rot für „nur auf Anfrage“), dann 395/395; Build streng ok im Wegwerf-Klon (vor dem kleinen Nachtrag, danach gelöscht). Lokal `a7053b6c` + `ba789680`, 147 Commits vor origin/main, kein Push, keine Frage.

## Neu 24.10.2026 ~12:30 (Dauerlauf E22-5, Stapel 30): 587 von 844

- 1 von 8 gesichert: Cohere Command A Plus. Abgelehnt („fetch failed“): Nebius Token-Factory-Bedingungen, GreenPT Datenschutz, OpenAI-Hilfe ×2 (Compliance-API, Datenresidenz), Microsoft Learn ×3 (Bereitstellungsarten, C5, ISO 27001).
- 87 Quellen offen. Drei Stapel in Folge nur 1 von 8: das Archiv drosselt. Nächster Stapel nicht vor 13:30, weiter `node nachsichern.js --anzahl 8`. Lokal, kein Push, keine Frage.

## Neu 24.10.2026 ~11:45 (Dauerlauf Laufend): erstes Pilot-Angebot liegt als Entwurf (Auditor, Gespräch 3)

- Die Mail des Auditors vom 23.10. (Wunsch: Preise, Lieferkette, Drittländer, AVV- und TOM-Link an einer Stelle) war unbeantwortet. Die Seite dafür ist lokal fertig (`456c90a5`, `docs/vorauswahl/`, 32 Anbieter).
- Antwort-Entwurf `r-6658349793740131607` im Thread `1a138bde6b317db6` (von der Gmail-Adresse wie bisher): Link belegbar.eu/vorauswahl/, offen gesagt, dass „Leistungsfähigkeit der Produkte“ fehlt, seine AVV-Regel aufgenommen, **Angebot: kostenloses Dossier für bis zu drei Anbieter seiner Wahl, Gegenleistung nur „was hat gefehlt“**.
- Zählt nach dem Senden für Kill-Check-Kriterium 3 (Zwischenziel Mi 28.10. „1 Dossier angeboten“).
- **Versand erst nach dem Hochladen** (Frage 533, die Seite enthält auch US-Profile), dann Frage 536 „senden?“. Nichts gesendet, nichts gepusht.

## Neu 24.10.2026 ~11:25 (Dauerlauf E22-5, Stapel 29): 586 von 844

- 1 von 8 gesichert: die neue IONOS-Cloud-Unterauftragnehmerliste (Kopie gleich dem Prüfstand). Abgelehnt („fetch failed“): Microsoft Service Trust Portal, Cohere Preise, Datenschutz, SaaS-Vertrag, Meta ZDR und Nutzungsbedingungen, AWS Bedrock Missbrauchserkennung.
- Ausgangsstand war 585 statt 587, weil fünf Unterauftragnehmer-Links seit 11:00 auf neue Listen zeigen, die noch keine Kopie hatten.
- 88 Quellen offen. Cohere und Meta lehnt das Archiv seit zwei Stapeln ab; nächster Stapel nicht vor 11:55, weiter `node nachsichern.js --anzahl 8`. 388/388 Tests grün. Lokal, kein Push, keine Frage.

## Neu 24.10.2026 ~11:00 (Dauerlauf Laufend): Unterauftragnehmer-Link zeigt jetzt auf die Liste, die gezählt wurde

- Offener Rest aus LP1: Bei fünf Profilen zeigte „Subprozessoren-Liste“ auf eine andere Liste als die, die bei „Zahl der Unterauftragnehmer“ gezählt wurde, oder auf gar keine.
- **IONOS:** jetzt die eigene Liste der IONOS Cloud GmbH (1 Eintrag, IONOS SE), vorher die Gruppenliste für ionos.de-Produkte (27 Einträge), die für den AI Model Hub nicht gilt. **EUrouter:** jetzt eurouter.ai/dpa (dort steht die Liste mit Better Stack und PostHog), vorher /providers. **Azure OpenAI und Copilot:** jetzt die Service-Trust-Portal-Seite der „Online Services Subprocessors List“, Status beansprucht → belegt (die Liste ist ohne Anmeldung lesbar, gezählt am 24.10.). **T-Systems:** stand auf „belegt“ ohne Link, jetzt Anhang IV der ErgB-AV T Cloud Public.
- Alle Ziel-URLs am 24.10. ~10:55 live geprüft (HTTP 200); IONOS-Cloud sperrt `/terms-` in robots.txt, dort nur Erreichbarkeit.
- Folge im Filter „vollständig belegt“ (AVV + Liste + kein Training): Azure OpenAI und Copilot erfüllen ihn jetzt. Beide sind US-Profile und noch nicht online.
- Test zuerst `test/subprozessoren-link.test.js` (6 rot, u. a. Regel „belegte Zählung → Liste nicht nur beansprucht“ und „belegte Liste ist ein Link“), dann 388/388; Build streng ok im Wegwerf-Klon. Lokal `3f9d58d6`, kein Push, keine Frage.

## Neu 24.10.2026 ~10:50 (Dauerlauf E22-5, Stapel 28): 587 von 844

- 1 von 8 gesichert: Cohere Enterprise Data Commitments. Abgelehnt („fetch failed“): Cohere Preise, Datenschutz, SaaS-Vertrag, Command-A-Plus-Doku, Trust Center ×2, Meta-Preisseite. Die neuen Cohere-Quellen nimmt das Archiv gerade nicht an.
- 87 Quellen offen. Nächster Stapel nicht vor 11:20, weiter `node nachsichern.js --anzahl 8`. 382/382 Tests grün. Lokal `d59fc5ae`.

## Neu 24.10.2026 ~10:25 (Dauerlauf Laufend): Hochladen mit `push-sauber.sh` hält heute an, so geht es

- In `~/belegt` liegen 43 ungetrackte Ordner unter `docs/` (8 US-Profile, 33 Vergleiche mit US-Anbietern, `docs/vorauswahl/`). Sie stammen vom Build der Tagesprüfung 24.10. 00:07; zurückgesetzt wurden nur geänderte Dateien, neue blieben liegen. Nichts davon ist online, nichts geht versehentlich raus: `push-sauber.sh` hält schon beim ersten Schritt an („Arbeitskopie nicht sauber“).
- Probe im Wegwerf-Klon (24.10. ~10:20, danach gelöscht): `node build.js --streng` läuft grün, ändert aber 168 eingecheckte Dateien und legt 52 neue an. Darum hält `push-sauber.sh` auch nach dem Aufräumen bei Schritt 3 an („Build hat echte Änderungen erzeugt“). Das ist gewollt: Seit dem 22.10. wurde `docs/` nie mitcommittet. Kein Entwurfsfall landet in `docs/faelle/`.
- **Reihenfolge für den Home-Tab (Felix, ~3 min), erst nach dem Ja zu den US-Profilen (Frage oben, „US-Anbieter so online stellen?“):** `cd ~/belegt && node build.js --streng && git add -A docs && git commit -m "build: docs Stand 24.10." && bash dossiers/push-sauber.sh` (nur prüfen), dann `bash dossiers/push-sauber.sh --push`. Die liegenden 43 Ordner baut der Build ohnehin neu, sie müssen nicht vorher weg.
- Lokal liegen jetzt 138 Commits vor origin/main (nicht 135). Für die Tagesprüfung gilt ab jetzt: Build nur im Wegwerf-Klon, nie direkt in `~/belegt` (Regel in ALLEIN.md).

## Neu 24.10.2026 ~10:00 Systemuhr (Dauerlauf Laufend): Fall-Entwurf 007 (Regolo) nachgeprüft, Widerspruch steht unverändert

- Letzte Prüfung war der 08.10. Alle drei Quellen neu abgerufen (07:59 UTC, robots.txt erlaubt alles): ZDR-Seite, Datenschutzerklärung, Blog „Zero Data Retention LLM …“.
- Alle vier Zitate und fünf Kontext-Stellen stehen weiter wörtlich da. ZDR-Seite im Text gleich wie am 08.10., Blog nur im Seitenrahmen anders.
- Nebenfund ohne Folge für den Fall: Der Cookie-Teil der Datenschutzerklärung hat seit 07.10.2026 (Version 1.1) Google Ads als Werbepartner, mit Übermittlung in die USA.
- Kopien `*-2026-10-24.html` in `belege/faelle/2026-007/`, SHA-256 in `SHA256SUMS`, OpenTimestamps gestempelt; Verlauf im Entwurf ergänzt. 382/382 Tests, lokal `2b7ab748`, kein Push. Entwurf bleibt Entwurf (Anbieter nicht informiert), keine Frage an Felix.

## Neu 24.10.2026 ~10:15 (Dauerlauf Laufend): Spickzettel für Gespräch 4 auf Stand gebracht

- Der private Spickzettel für das nächste Prüfer-Gespräch (Termin 28./29.10. noch nicht bestätigt) ist auf Stand 24.10.: zählt als Gespräch 4 von 5, Schwerpunkt Pilot (Kriterium 3, 0 von 1), Lehre aus dem Forscher-Gespräch 21.10. („Herkunft der Daten“ = dieselbe Bedingung), Status der vier eigenen Lücken.
- Neu gezählt (jedes Feld mit Status und Quellfeld): **online** (Stand 22.10. mittags) 24 Anbieter, 936 Angaben (440 belegt, 116 beansprucht, 380 unbelegt), 204 Quell-URLs, 221 Einträge im Änderungsprotokoll; **lokal** 33 Anbieter, 1.312 Angaben (656/177/479), 294 Quell-URLs, 580 von 844 Zeilen mit Archivkopie. Die Zahl „408 Angaben“ vom 19.10. war anders gezählt, nicht vergleichen.
- Hinweis für den Home-Tab: lokal liegen 135 Commits vor origin/main. Was im Gespräch gezeigt werden soll (Register-Feld, Vorauswahl, ehrlicher Satz auf der Käuferseite), ist erst nach dem Hochladen sichtbar (`bash dossiers/push-sauber.sh --push`, Felix).
- Nichts gebaut, keine Tests nötig, keine Frage an Felix.

## Neu 24.10.2026 08:42 Systemuhr (Dauerlauf Laufend): Mistral-Profil um den DPA-Widerspruch zum Preview-Training ergänzt

- Der offene Profil-Nachtrag aus dem Mistral-Scan (05:00) ist erledigt. Mistral Large 4 und „Training-Opt-out“ nennen jetzt zusätzlich DPA 2.3 (Training nur „unless Customer is or has opted-out of training“, ohne Preview-Ausnahme) und DPA 11.2 (DPA geht bei Widerspruch vor). Ergebnis bleibt „ungeklärt“, Status und Werte unverändert.
- Test zuerst (`test/ws-mistral.test.js`, 1 rot), dann 382/382; lokal `91113090`, kein Push, keine Frage.

## Neu 24.10.2026 08:31 Systemuhr (Dauerlauf Laufend): Widerspruchs-Scan Infomaniak, 99,9 % Verfügbarkeit gelten nicht für 4 der 7 Sprachmodelle

- Erster Scan bei Infomaniak, dem letzten Anbieter ohne jeden Widerspruchs-Scan; jetzt hat jeder der 33 einen. Abruf 24.10. ~08:25 MESZ direkt, robots erlaubt: Produkt-, Modell- und Preisseite, LLM-Bedingungen („Review of 07/10/2025“), DPA, Datenschutzerklärung.
- **Fund (Fall-Kandidat 61, mittel):** LLM-Bedingungen Art. 5 versprechen „99.9% service availability“, im selben Artikel sind Beta-Modelle davon ausgenommen (jederzeit abschaltbar, keine Entschädigung). Beta sind Kimi-K2.6, Qwen3.5-397B, Qwen3.8-27B und Apertus-v1.5-70B, also 4 von 7, darunter die beiden als „most powerful“ beworbenen.
- Zusätze: Die FAQ sagt, Bildfunktionen würden „noch geprüft“, und nennt Mixtral und SDXL-Lightning; dieselbe Preisseite verkauft Flux schnell und Photomaker V2. Die Unterauftragnehmer-Verweise laufen im Kreis (DPA → Datenschutzerklärung → DPA-Anhang, den es nicht gibt). „No queries are stored“ gegen „stored temporarily“ plus Betriebsdaten ohne Frist. DPA 13.1 verbietet Übermittlung außerhalb EU/EWR ohne Zustimmung, die Rechenzentren stehen in der Schweiz: ungeklärt.
- Profil: Qwen3.8-27B hat jetzt 100k Kontext (Modellseite; am 21.10. „NaN“). Preise aller 7 Sprachmodelle unverändert.
- Neu in `belege/anbieter/infomaniak/`: 6 Kopien + Scan mit SHA-256 und OpenTimestamps, neu `QUELLEN.md`. Test zuerst `test/ws-infomaniak.test.js` (2 rot), dann 381/381; Build nicht gelaufen (Rücksetzen der Ausgabe im Dauerlauf nicht erlaubt). Lokal `41e5c195`, kein Push, keine Frage. Die Zahl „17 ohne Scan“ von 06:30 zählte Anbieter ohne eigene Scan-Datei, nicht ohne Scan.

## Neu 24.10.2026 ~06:20 (Dauerlauf AK3): letzte Archiv-Abweichungen, Teil 1
- 7 Quellen standen auf „Text weicht vom Prüfstand ab“ (5 aus AK2, 2 neue Claude-Seiten vom 23.10.).
- Claude „Our approach to user safety“: Archivkopie gleicht dem Prüfstand Wort für Wort und im Fingerabdruck, jetzt „gleich“.
- Claude „API and data retention“: Unterschied ist nur das Cookie-Banner (43 Wörter weg, nichts dazu), Rauschen. Bleibt abweichend, bis eine Kopie ohne Banner gesichert ist; inhaltlich kein Befund.
- GreenPT Nachhaltigkeit: Archivkopie vom 22.10. nennt noch Scaleway, Helsinki, Finnland; der Prüfstand nicht mehr. Echte Änderung, schon übernommen; braucht frische Sicherung. Save Page Now hat die Rechte-Prüfung im Dauerlauf heute abgelehnt (bei Gdańsk), darum nicht versucht.
- Offen: OVHcloud ISO-Seite + AI-Endpoints-Katalog, Requesty DPA + Datenschutz. Das Archiv verweigert seit ~06:15 jede Verbindung (ECONNREFUSED), also Drosselung. Nächster Versuch frühestens So 25.10. (AK3 in ALLEIN.md).
- 377/377 Tests, lokal `a9a1960a`, kein Push, keine Frage.

## Neu 24.10.2026 ~06:30 (Dauerlauf Laufend): Widerspruchs-Scan Black Forest Labs, „Zero data retention“ gegen dauerhafte Trainingslizenz

- Enterprise-Seite nennt für die Managed API „Zero data retention“; EU API Service Terms 2b geben BFL eine „perpetual, irrevocable“ Lizenz an Ein- und Ausgaben, auch zum Training und zum öffentlichen Zeigen, und gelten laut Einleitung auch in Enterprise-Verträgen, wenn das Order Form sie nennt. Order Form/DPA nicht öffentlich: ungeklärt. Fall-Kandidat 60 (mittel) in `outreach/fall-kandidaten.md`. Zusätze ohne harten Widerspruch: „private“ gegen „publicly display“; Opt-out per Mail (Privacy Policy) gegen „irrevocable“; EU-Endpunkt nur „regional preferences“, Privacy Policy erlaubt Übermittlung außerhalb des EWR.
- Neu gesichert in `belege/anbieter/black-forest-labs/`: Enterprise-Seite, EU API Service Terms, Privacy Policy, Integration Guide und Scan, alle mit SHA-256 und OpenTimestamps, neu `QUELLEN.md`. Test zuerst `test/ws-bfl.test.js` (2 rot), dann 379/379; lokal, nicht gepusht. Profil nicht geändert (ZDR-Widerspruch zur Privacy Policy stand schon in der Anmerkung; 2b-Wortlaut auch). Noch 17 EU-Anbieter ohne Scan. Keine Frage an Felix.

## Neu 24.10.2026 ~05:40 (Dauerlauf Laufend): Widerspruchs-Scan IONOS AI Model Hub, API-Werbung gegen „nur interaktive Nutzung“ in den KI-Nutzungsbedingungen

- Produktseite wirbt mit API-Einbindung in bestehende Systeme und Kunden-Chatbots; die Nutzungsbedingungen für KI-Dienste gelten laut 1.1 auch für den API-Zugang und nennen in 2.5/2.6 automatisierte, skriptgesteuerte Abfragen und Überlassung an Dritte „missbräuchlich“, außer die Leistungsbeschreibung sieht es ausdrücklich vor. Eine Leistungsbeschreibung für den AI Model Hub war nicht zu finden: ungeklärt. Fall-Kandidat 59 (niedrig bis mittel) in `outreach/fall-kandidaten.md`. Zusätze ohne harten Widerspruch: Doku „never accessed by personnel“ gegen Vertrag 2.3 „Fehlerbehebung“; Datenschutzpaket 4.3 erlaubt Drittstaaten „sofern erforderlich“, Doku „Germany … nowhere else“.
- Neu gesichert in `belege/anbieter/ionos/`: Produktseite, Doku Data Handling (direkt), Nutzungsbedingungen KI-Dienste und Enterprise-Datenschutzpaket 7.4 (Archivkopien 24.09., weil robots.txt „/terms-“ sperrt), Scan; alle mit SHA-256 und OpenTimestamps, neu `QUELLEN.md`. Test zuerst `test/ws-ionos.test.js` (2 rot), dann 377/377; lokal, nicht gepusht. Profil nicht geändert (Preise gleich, kein Training gleich). Noch 18 EU-Anbieter ohne Scan. Keine Frage an Felix.

## Neu 24.10.2026 ~05:00 (Dauerlauf Laufend): Widerspruchs-Scan Mistral, Vorschau-Modell trainiert trotz Opt-out, DPA sagt das Gegenteil

- Ankündigung Mistral Large 4 lädt ein, die Vorschau-API zu testen („You can try the preview API today“), Werbeseiten versprechen „You control where your data goes and who can use it“ und „full ownership of your data“. Commercial Terms 4.2(d)/4.3: Bei Vorschau-Modellen darf Mistral mit Kundendaten trainieren, Opt-out und Zero Data Retention gelten dort nicht. DPA 2.3 erlaubt Training mit personenbezogenen Daten nur ohne Opt-out, ohne Vorschau-Ausnahme, und geht laut 11.2 vor. Welche Lesart gilt: ungeklärt. Fall-Kandidat 58 (mittel) in `outreach/fall-kandidaten.md`.
- Erstmals eigener Belegordner `belege/anbieter/mistral/`: 6 Kopien (Ankündigung, Modellseite, Sovereign AI, La Plateforme, Terms, DPA) + Scan, mit QUELLEN.md, SHA256SUMS und OpenTimestamps (`ots_stempel.py`, 7 Dateien). Test zuerst `test/ws-mistral.test.js` (2 rot), dann 375/375; lokal, nicht gepusht. Profil nicht geändert (Vorschau-Regel stand schon in der Anmerkung zu Large 4; der DPA-Widerspruch ist neu, Profil-Nachtrag wäre eine eigene Aufgabe). Noch 19 EU-Anbieter ohne Scan. Offen: Save Page Now für die sechs Seiten (nächster Archiv-Stapel). Kein neuer Fall, keine Frage an Felix.

## Neu 24.10.2026 ~03:20 (Dauerlauf Laufend): Widerspruchs-Scan Scaleway, erster EU-Anbieter, Werbeseite ohne die Ausnahme aus Doku und Vertrag

- Produktseite: „We do not collect, read, reuse, or analyse the content of your inputs …“ ohne Ausnahme. Doku: derselbe Satz plus „The only exception being …“ (HTTP-500-Fehler, Missbrauch), ganze Anfragen bis zwei Wochen; Vertrag (Specific Conditions AI Services 07/04/2026): „does not retain any requests …“, aber „may temporarily retain the content of the HTTP request“ ohne Frist, Batch 24 h. Zwischenspeicher („KV values“) nicht abschaltbar, Dauer ungeklärt. Fall-Kandidat 57 (niedrig bis mittel) in `outreach/fall-kandidaten.md`.
- Neu gesichert: `belege/anbieter/scaleway/specific-conditions-ai-2026-10-24.txt` (Vertragstext), Beleg `widerspruchs-scan-2026-10-24.txt`, beide mit SHA-256 und OpenTimestamps; neu `QUELLEN.md` für den Ordner. Test zuerst `test/ws-scaleway.test.js` (2 rot), dann 373/373; lokal, nicht gepusht. Profil nicht geändert (Ausnahmen standen schon in der Anmerkung zum Backup-Ort). Noch 20 EU-Anbieter ohne Scan. Kein neuer Fall, nur Kandidat; keine Frage an Felix.

## Neu 24.10.2026 ~01:20 (Dauerlauf Laufend): Widerspruchs-Scan DeepSeek API, „you are the controller“ gegen eigenes Training mit den Eingaben
- Fall-Kandidat 56 (mittel) in `outreach/fall-kandidaten.md`: Open-Platform-Bedingungen machen den Entwickler zum „controller“ und DeepSeek zum Empfänger einer „delegation“; dieselben Bedingungen sind nur „Specific Agreement“ zu den Nutzungsbedingungen, deren 4.3 DeepSeek erlaubt, Ein- und Ausgaben zur Entwicklung zu nutzen (Abschalten nur per Chat-Schalter, für API ungeklärt); V4.1-Zusammenfassung: Nutzereingaben fürs Training „☒Yes“. Zitate am 23.10. 23:14 UTC live neu geprüft, Seiten unverändert.
- Beleg `belege/anbieter/deepseek-api/widerspruchs-scan-2026-10-24.txt` mit SHA-256 und OpenTimestamps; Test zuerst `test/ws-deepseek.test.js` (2 rot), dann 371/371; lokal, nicht gepusht. Profil nicht geändert (stand schon so drin). Damit haben alle 12 Anbieter außerhalb der EU einen Scan, die 21 EU-Anbieter noch keinen. Kein neuer Fall, nur Kandidat; keine Frage an Felix.

## Neu 24.10.2026 ~01:15 (Dauerlauf Laufend): Widerspruchs-Scan Cohere, „your data stays yours“ gegen SaaS-Vertrag 3(a)(iii)
- Fall-Kandidat 55 (mittel bis hoch) in `outreach/fall-kandidaten.md`: Sicherheitsseite „Opt out of model training at any time — your data stays yours“; der veröffentlichte SaaS-Vertrag (08.04.2025) gibt Cohere ein unwiderrufliches Recht, API-Daten zur Verbesserung auch an Dritte „for other purposes permitted under their terms“ weiterzugeben, ohne Löschpflicht nach Vertragsende. Ob der Training-Schalter das stoppt: ungeklärt (Vertrag erwähnt ihn nicht, DPA nur gegen NDA). Zitate am 23.10. 22:59 UTC live neu geprüft.
- Beleg `belege/anbieter/cohere/widerspruchs-scan-2026-10-24.txt` mit SHA-256 und OpenTimestamps; 369/369 Tests; lokal `571d6c13`/`126d65b2`, nicht gepusht. Kein neuer Fall, nur Kandidat; keine Frage an Felix.

## Neu 24.10.2026 ~01:20 (Dauerlauf Verbesserer): Anbieter-Nachfragen sichtbar machen (Vorschlag, nichts gebaut)
- Vorbild Stanford Foundation Model Transparency Index (Dez. 2025, abgerufen 24.10.): fragt jede Firma selbst und nennt die Antwortquote (2025: 30 %). Bei uns stehen Anbieter-Auskünfte nur im Freitext, und dass wir gefragt haben, steht nirgends. Vorschlag: je Profil ein Block „Beim Anbieter nachgefragt“ (Datum, Frage, beantwortet/keine Antwort), Wortlaut nur mit Erlaubnis. Wartet auf Felix (Frage 534 in der Aufgabenliste).

## Neu 24.10.2026 ~00:55 (Dauerlauf WX1): keine weiteren „von Prüfern genannten“ Anbieter
- Genannt hat bisher nur Schlademann DeepL (schon drin); der Gesprächspartner vom 21.10. nannte keine Tools (Liste im privaten Gesprächsordner war Vorbereitung); Vergaben nennen nur Microsoft 365 Copilot (drin). Kein Anbieter erfunden; nächster, sobald ein Prüfer einen nennt.

## Neu 24.10.2026 ~00:45 (Dauerlauf WX1 Wachsen): Cohere als Profil, Kanada als neues Land, lokal, NICHT online
- Neues Profil `data/anbieter/cohere.json` (Modell-Anbieter). Kanada steht jetzt in `lib/rechtsraum.js` als Land mit Angemessenheitsbeschluss, mit Hinweis: Die Entscheidung 2002/2/EG gilt nur für Empfänger, die dem PIPEDA unterliegen (Art. 1: „recipients subject to the Personal Information Protection and Electronic Documents Act“). Beleg: Kommissionsseite („Canada (commercial organisations)“) und Wortlaut auf EUR-Lex in `belege/rechtsraum/adequacy-kanada-2026-10-24/`. Katalog jetzt 33 Anbieter, Seite sagt „21 europäische, 10 US-, 1 kanadische und 1 chinesische KI-Anbieter“ (Reihenfolge nach Profilnamen).
- DPF: Cohere steht nicht in der amtlichen Liste, auch keine US-Tochter (Suche Cohere, Cohere Inc, Cohere Technologies, Cohere US, Aleph Alpha; Treffer nur OpaVote und Coherent Inc. ohne Bezug; Gegenprobe Microsoft 1 Treffer). Beleg `belege/rechtsraum/dpf-cohere-2026-10-24/`. Register (EU Cloud CoC, CISPE, Trusted Data Processor, 00:31): kein Eintrag, Europrivacy nicht ausgewertet.
- Belegkopien direkt abgerufen 24.10. 00:22–00:36 (robots.txt erlaubt): 27 Dateien (davon 20 Texte) mit QUELLEN.md, SHA256SUMS (alle ok) und OpenTimestamps (36 gestempelt mit Rechtsraum, nachziehen mit ZS1). Trust Center (Secureframe) per Chrome headless gerendert. Zitatprüfung: 79 verschiedene Zitate, alle wörtlich in einer Kopie (77 prüft der Test, die zwei kurzen „n/a“ und „Request“ von Hand).
- **Für Prüfer wichtig:** (1) Keine EU-Region: „Our hosting centers are on Google Cloud Platform servers located in US-Central. We do not use servers outside of the US“; alle 12 Unterauftragnehmer „Location: USA“. Der Kanada-Beschluss deckt also nur den ersten Schritt, für Google Cloud verweist Cohere auf dessen DPF-Teilnahme. (2) AVV nicht öffentlich, nur gegen Geheimhaltungsvereinbarung; TOM stehen in dessen Anhang B. Der öffentliche SaaS-Vertrag verbietet personenbezogene Daten außer Geschäftskontakten („Prohibited Data“). (3) SaaS-Vertrag 3(a)(iii): Cohere darf API- und Finetuning-Daten zur Verbesserung nutzen und an Dritte weitergeben, die sie „FOR OTHER PURPOSES PERMITTED UNDER THEIR TERMS AND CONDITIONS“ nutzen dürfen; nach Vertragsende keine Löschpflicht dafür. Ob der AVV das einschränkt, ist ungeklärt. (4) Training bis zum Abschalten im Dashboard, wirkt nur für neue Daten; Voreinstellung nicht ausdrücklich genannt. Speicherung 30 Tage, bei Missbrauchsverdacht länger; Null-Speicherung nur auf Antrag. (5) Zertifikate (ISO 27001, ISO 42001, SOC 2 Type 2) nur „beansprucht“, Dokumente nur auf Anfrage. GPAI-Kodex unterzeichnet (Kommissionsliste, Stand 07.10.2026); Anbieter laut Trainingsdaten-Zusammenfassung Command A+ ist „Cohere Germany GmbH“. (6) Zusammenschluss mit Aleph Alpha: Vereinbarung 16.09.2026, „The transaction remains subject to final regulatory approvals.“; bis 24.10. keine Vollzugsmeldung im Newsroom, passt zu aleph-alpha.json.
- Preise nur USD, EUR-Felder null: Command R+ 08-2024 2,50/10,00 $ (unter „For existing customers“), Aya Expanse 32B 0,50/1,50 $ je 1 Mio. Token.
- Unbelegt: Tokenpreis für Command A+ (nicht sichtbar auf der Preisseite; eine Karte im Seiten-JSON nicht eindeutig zuzuordnen, darum nicht verwendet), Voreinstellung des Trainingsschalters, Backup-Ort, US-Eigentümerstruktur (Investoren nicht ausgewertet, Feld null), Ankündigung neuer Unterauftragnehmer und Widerspruch (nur im AVV), Zertifizierer, EU-Hosting über Partner (Bedrock, Azure, Oracle: nicht wörtlich bei Cohere belegt), EU-Vertreter (Datenschutzerklärung nennt keinen).
- Test zuerst `test/wx1-cohere.test.js` (6 rot), dann 369/369, Build streng ok im Wegwerf-Klon (33 Anbieter, `docs/` nicht angefasst). Lokal `dc3d7c26`, **kein Push** (Push = Home-Tab über `dossiers/push-sauber.sh`, mit den übrigen US-Profilen). MESSUNG.md Zeile 24.10. nachgetragen (Datei ist gitignored). Rohdaten `~/allein/tmp/wx1-cohere/`. WX1 heute 1 von 5.
- Offen: Save Page Now für die neuen Quellen (nächster Archiv-Stapel), Stempel nachziehen mit ZS1; der nächste Quellenlauf meldet die Cohere-URLs als „neu“, normal übernehmen.

## Neu 24.10.2026 ~00:10 (Dauerlauf Tagesprüfung): EUrouter streicht Nebius, sonst Rauschen

- 363/363 Tests, Build streng ok (nur Datum, zurückgesetzt). Archivcheck: das Archiv lieferte je Lauf bei einer anderen Kopie „fetch failed“ (erst T-Systems Prefix-Caching, dann Scaleway Security), die übrigen Zitate ok; Drosselung, nächster Lauf.
- Fälle 003/004: 8 von 9 Zitaten wörtlich live (BFL-Privacy nur Leerraum, Scaleway-Zusatz „except temporarily…“ wie seit 03.10. bekannt).
- Quellenlauf: 322 Quellen, 220 unverändert, 52 verändert, 44 neu (Vorauswahl-Felder aus LP1, normal), 4 weg (Hetzner-Datenschutz 502, eine Stunde später wieder 200; drei OpenAI-Archivkopien „fetch failed“ wie bekannt). Alle 52 übernommen.
- **Echt:** EUrouter führt Nebius nicht mehr, weder in der DPA-Liste noch unter /providers (23.10. noch drin). Es bleiben 17 KI-Anbieter, weil Melious am 23.10. dazukam. Das Listendatum steht weiter auf „9 October 2026“, zum zweiten Mal in zwei Tagen trotz Änderung. Kurzbeschreibung und Anmerkungen angepasst, Zahl der Unterauftragnehmer bleibt 20. Textauszug `belege/anbieter/eurouter/dpa-subprozessorliste-2026-10-24.txt` mit SHA256 und Zeitstempel.
- Von Hand geprüft, kein Profilwert falsch: Nebius (alle drei Preise gleich in Katalog und OpenRouter), DeepL (Preistabelle umgebaut, 7,49/24,99/49,99 € gleich), Anthropic Datenaufbewahrung (alle Zitate dieser Seite wörtlich, nur HIPAA-Absatz umformuliert), Microsoft Copilot OpenAI- und Anthropic-Seite (Seite 23.10. aktualisiert, beide Zitate wörtlich). Rest: Menüs, Datumsstempel, Sprachwechsel (Vertex koreanisch → englisch), Skript-Daten.
- Wächter: 25 gleich, OpenAI-Unterauftragnehmer nur Menü („Apps SDK“ → „Plugins“), übernommen; AVV und Sicherheit 403 wie immer. Pilot: Slack AVV und Unterauftragnehmer nur Navigation, übernommen. hallo@ und OpenAI-Mail: nichts Neues.

## Neu 23.10.2026 ~23:55 (Dauerlauf LP1): Vorauswahl an einer Stelle gebaut, lokal `456c90a5`, nicht gepusht

- Neue Seite **/vorauswahl/**: eine Tabelle mit allen 32 Anbietern: günstigster EUR-Preis (sonst „kein EUR-Preis erfasst, siehe Profil“), Zahl der Unterauftragnehmer (verlinkt auf die Liste), Drittländer der Unterauftragnehmer, AVV-Link, TOM-Link. Verlinkt aus jedem Profil (unter „Vertrag“) und von /fuer-kaeufer/.
- Drei neue Felder je Profil unter `vertrag`: `tom`, `subprozessoren_anzahl`, `drittlaender`, je mit Quelle, wörtlichem Zitat, Prüfdatum 23.10.2026; ohne Wert beginnt die Anmerkung mit „Ungeklärt:“. Prüfung im Build (`lib/vorauswahl.js`), Test zuerst `test/vorauswahl.test.js`, alle **363/363** grün, Build ok (zurückgesetzt).
- Stand: TOM-Link bei 26 von 32, Zahl der Unterauftragnehmer bei 25, Drittländer bei 24. Ganz ungeklärt: Aleph Alpha, DeepSeek, Nordference (nichts öffentlich). Nur auf Anfrage: Lyceum, Regolo (TOM), DeepL (Liste hinter Freigabe). Infomaniak: Anhang „Third-Party Subcontractors“ nirgends zu finden; Gcore-TOM nur per JavaScript.
- Zählweisen stehen je Anmerkung: große Listen (AWS 102, Google 108/112, Microsoft 88/89) gelten für alle Dienste und zählen konzerninterne Gesellschaften mit; Anthropic/OpenAI nur die Zeilen fürs jeweilige Produkt. Neuer Fund: Microsofts Liste ist inzwischen ohne Anmeldung abrufbar (Azure OpenAI deshalb gezählt); IONOS AI Model Hub hat eine eigene Liste (1 Eintrag), die bisher verlinkte gilt für ionos.de-Produkte; EUrouter-Liste steht im DPA, nicht unter /providers. Diese drei bisherigen Subprozessoren-Links sind NICHT geändert, nur in den neuen Feldern vermerkt (eigene Aufgabe, falls gewünscht).
- Recherche-Rohdaten: `tmp/lp1/` (gitignored). Neue Quellen-URLs meldet der nächste Quellenlauf als „neu“, normal übernehmen.
- **Offen:** Push = Felix (Frage 533). Danach könnte Felix dem Prüfer, der das angeregt hat, den Link schicken (seine Entscheidung).

## Neu 23.10.2026 ~21:30 (Felix, Home-Tab 19:15 über EINGANG): 531 ja, 532 offen

- **531 entschieden:** Preise, Zahl der Unterauftragnehmer, Drittländer außerhalb der EU und Link zur Sicherheitsbeschreibung für alle 32 Anbieter an einer Stelle nachtragen (Wunsch des Auditors aus Gespräch 3, 23.10.). Aufgabe LP1 in ALLEIN.md.
- **532 erledigt (Home-Tab 19:25):** Felix hat die Erinnerung an die Auditorin selbst neu geschrieben und gesendet (Mi 28. oder Do 29.10., 17:30 Video). Jetzt nur auf Antwort achten; Termin dann in MESSUNG.md und den Spickzettel.

## Neu 23.10.2026 ~14:35 (Dauerlauf): Auditorin weiter ohne Antwort, Erinnerung nicht gesendet

- Die Auditorin (Video-Gespräch zugesagt, Gegenvorschlag Mi 28.10./Do 29.10. 17:30 vom 19.10.) hat bis Fr 23.10. 14:35 nicht geantwortet.
- Die vorbereitete Erinnerung sollte laut Felix' Entscheidung ab 12:00 rausgehen. Sie liegt aber nicht mehr in Gmail (nicht gesendet, nicht im Papierkorb). Darum nichts gesendet; Frage 532 an Felix.

## Neu 23.10.2026 ~14:20 (Dauerlauf Laufend): Widerspruchs-Scan Meta Model API, „Not used to improve our products“ gegen „To improve and maintain the Meta Model API“

- Erster Scan bei Meta. dev.meta.ai/products/meta-model-api und /legal/commitments direkt abgerufen (HTTP 200, robots erlaubt), dazu die gesicherten Kopien vom 23.10. ~01:16. Rohdateien in `~/allein/tmp/ws-meta/`.
- **Fall-Kandidat 54 (mittel):** Werbe- und Modellseite schreiben bei jedem Standard-Modell „Not used to improve our products“. Die Data Commitments nennen für Inhalte aller Stufen „To improve and maintain the Meta Model API“, bei Standard zusätzlich „develop and improve systems that protect the safety and security of Meta's products“; Nutzungsbedingungen 4.4 behalten Inhalte „for security, safety, abuse, and policy review and improvements“. Versprochen ist sauber nur „not used to train“.
- Zusatz: keine Speicherfrist ohne ZDR genannt (ungeklärt). Ohne Widerspruch: Contributor-Stufe, Muse-Code-Contributor ab Werk an (steht offen da).
- Profil nicht geändert. Beleg `belege/anbieter/meta-llama-api/widerspruchs-scan-2026-10-23.txt` + SHA256SUMS (ok) + OpenTimestamps. 352/352 Tests, lokal, **kein Push**, keine Frage.
- Noch nie gescannt (US-Große): DeepSeek.

## Neu 23.10.2026 ~14:00 (Dauerlauf): Prüfer sieht Nutzen in der Vorauswahl, vier von sechs gewünschten Angaben fehlen

- Zweite schriftliche Antwort von Gespräch 3 (Einzelheiten nur in `PRIVAT-NOTIZEN.md`): Wer klug ist, sichert die wirksam vereinbarte AVV selbst; ein Archiv öffentlicher Fassungen ersetzt das nicht. Nutzen sieht er bei der **Auswahl**: sechs Angaben an einer Stelle (Preise, Leistungsfähigkeit, Länge der Lieferkette, Drittländer, AVV-Link, Link zu den Sicherheitsmaßnahmen).
- Abgleich `outreach/gespraeche/ABGLEICH-VORAUSWAHL-2026-10-23.md`: AVV-Link bei 25/32, EUR-Preise bei 18/32; **fehlen:** TOM-Link, Zahl der Unterauftragnehmer, Drittländer (passen zur Methode), Leistungsfähigkeit (Bewertung, passt nicht).
- **Frage 531 an Felix:** drei Felder (TOM-Link, Zahl Unterauftragnehmer, Drittländer) für alle 32 nachtragen? Empfehlung ja. Bis dahin nichts gebaut. MESSUNG-Nachtrag, Zahlen unverändert.

## Neu 23.10.2026 ~12:20 (Dauerlauf Laufend): Widerspruchs-Scan Claude Enterprise, „custom data retention“ gilt nicht für Claude Code in der Cloud

- Erster Scan bei Claude Enterprise. claude.com/enterprise (→ /solutions/enterprise) und /solutions/financial-services direkt abgerufen (HTTP 200, robots erlaubt), dazu die gesicherten Kopien vom 22.10. Rohdateien in `~/allein/tmp/ws-ce/`.
- **Fall-Kandidat 53 (mittel):** Werbung nennt „custom data retention“ als Datenkontrolle für Firmen „with real compliance obligations“ und verkauft im selben Plan Claude Code und Cowork. Hilfe-Artikel: eigene Speicherdauer gilt nur für Chats und Projekte, nicht für Claude Design, Claude Tag, Managed Agents und „any other feature that runs Claude Code in the cloud“; Chats in Projekten bleiben ohne Projekt-Frist unbefristet; Feedback 5 Jahre. Speicherdauer der ausgenommenen Funktionen: ungeklärt.
- Zusatz: Finanzseite „Anthropic holds SOC 2 Type II and FedRAMP certification“; Trust Center führt FedRAMP High nur für Claude for Government, bei Enterprise/Team „N/A“. Für die Firma wahr, fürs verkaufte Produkt nicht.
- Ohne Widerspruch: Training „by default“ (Feedback-Ausnahme steht offen in der Doku, Owner kann „Rate chats“ abschalten). „GDPR compliance“ ohne prüfbares Zertifikat: ungeklärt, kein Widerspruch.
- Profil nicht geändert. Beleg `belege/anbieter/anthropic-claude-enterprise/widerspruchs-scan-2026-10-23.txt` + SHA256SUMS (ok) + OpenTimestamps. 352/352 Tests, lokal, **kein Push**, keine Frage.
- Noch nie gescannt (US-Große): Meta, DeepSeek.

## Neu 23.10.2026 ~11:40 (Dauerlauf Laufend): Widerspruchs-Scan Amazon Bedrock, „gespeichert in deiner Region“ gegen Missbrauchs-Kopien in der Zielregion

- Erster Scan bei Amazon Bedrock. aws.amazon.com/bedrock/, /security-compliance/, /anthropic/, /guardrails/ direkt abgerufen (HTTP 200, robots erlaubt), dazu die gesicherten Kopien vom 23.10. Rohdateien in `~/allein/tmp/ws2310ab/`.
- **Fall-Kandidat 52 (mittel bis hoch):** FAQ beantwortet „moved outside the AWS Region?“ mit „stored at rest in the AWS Region where you are using Amazon Bedrock“. Die Seite zur Missbrauchserkennung speichert bei Claude Fable 5/5.1 allen Verkehr, bei den meisten OpenAI-Modellen markierten Verkehr bis 30 Tage, und bei Cross-Region „in destination regions“; mit dem Global-Profil also weltweit. Zusatz: Startseite „never stores or uses your data to train models“, mehrdeutig.
- Ohne Widerspruch: „not shared with model providers“.
- Profil nicht geändert: Die drei Profil-Modelle (Nova Pro, Sonnet 5.5, Mistral Large 3) stehen nicht auf der Speicherliste. Beleg `belege/anbieter/amazon-bedrock/widerspruchs-scan-2026-10-23.txt` + SHA256SUMS (ok) + OpenTimestamps. 352/352 Tests, lokal `dcebd8f0`, **kein Push**, keine Frage.
- Noch nie gescannt: Claude Enterprise, Meta, DeepSeek.

## Neu 23.10.2026 ~11:20 (Dauerlauf Laufend): Widerspruchs-Scan Microsoft Copilot, „alle Interaktionen bleiben im Tenant“ gegen Bing-Websuche

- Erster Scan bei Microsoft Copilot (Unternehmensfassung). Werbeseite microsoft.com/en-us/microsoft-365-copilot/enterprise und drei Vergleichsseiten (gegen ChatGPT, Claude, Gemini Enterprise), direkt abgerufen (HTTP 200, robots erlaubt; die alten Adressen unter /en-us/microsoft-365/copilot/ liefern eine Sperrseite), dazu die gesicherten Kopien vom 22.10. Rohdateien in `~/allein/tmp/ws2310mc/`.
- **Fall-Kandidat 51 (mittel):** Vergleichsseiten „all interactions remain within your Microsoft 365 tenant“ und Vorwurf an die Wettbewerber, außerhalb des Tenants zu speichern; Microsofts eigene Doku nennt Websuchen „a part of Copilot interactions“, Bing läuft „separately from Microsoft 365“, ohne DPA und ohne EU-Datengrenze. Zusatz: Anthropic-Modelle mit Datenspeicherung liegen nach Opt-in bei Anthropic außerhalb des Microsoft-Vertrags, die Werbung nennt nur „Model choice“.
- Kein eigener Fall: EU-Datengrenze in der Werbung ohne Hinweis auf Flex routing (ab Werk an für Tenants nach 25.03.2026), steht schon im Profil.
- Profil: Satz zur Werbung im Modell-Standort ergänzt, kein Status, kein Preis geändert. Beleg `belege/anbieter/microsoft-copilot/widerspruchs-scan-2026-10-23.txt` + SHA256SUMS (ok) + OpenTimestamps. 352/352 Tests, lokal, **kein Push**, keine Frage.
- Noch nie gescannt: Claude Enterprise, Amazon Bedrock, Meta, DeepSeek.

## Neu 23.10.2026 ~11:05 (Dauerlauf): Nebius beantwortet die Ortsfrage, Finnland ist keine Zusage

- Antwort auf die Fachfrage vom 23.10. (Frage 507, Widerspruch 1 aus dem Scan 22.10.): Für öffentliche Serverless-Endpunkte ist die Region im Katalog keine Zusage; der Ort wechselt ohne Ankündigung (Legal Quick Guide 5.1), feste Region nur über Dedicated Endpoint.
- Profil: In gpt-oss-120b, Qwen3-235B-A22B-Instruct und GLM-5.1 ersetzt „ungeklärt; Standort darum unverändert“ durch die Auskunft mit Datum (Muster wie GreenPT 22.10.). Standort „Global“ bleibt, kein Status, kein Preis geändert. Widerspruch 1 ist damit geklärt, kein Fall-Kandidat.
- 352/352 Tests, lokal, **kein Push**, keine Frage an Felix. Einzelheiten der Mail in `outreach/gespraeche/PRIVAT-NOTIZEN.md`.

## Neu 23.10.2026 ~10:55 (Dauerlauf Laufend): Widerspruchs-Scan Google Workspace, Gemini Notebook außerhalb der Data Regions

- Erster Scan bei Gemini für Google Workspace. Werbeseite workspace.google.com/solutions/ai (deutsche Fassung), Preisseite /pricing, Sicherheitsseite /security, direkt abgerufen (HTTP 200, robots erlaubt; /intl/-Seiten sind per robots gesperrt und nicht verwendet), dazu die gesicherten Kopien vom 22.10.
- **Fall-Kandidat 50 (mittel):** Preisseite verkauft „Gemini Notebook with expanded access to features“ und „Enterprise data regions“ im selben Paket; Privacy Hub: „Your organization's file sharing and data region settings do not apply to data in Gemini Notebook.“ Notebook legt von jeder Drive-Datei eine eigene Kopie an. Wo sie liegt, nennt Google nicht (ungeklärt).
- Kein eigener Fall: „werden … nicht zum Trainieren von Gemini-Modellen verwendet“ steht ohne Einschränkung, gilt laut Hilfe aber nicht für Ausgaben ohne Gemini als Core Service (u. a. Workspace Individual); die Core-Zusage selbst sagt „outside their domain“ (Bedeutung ungeklärt). ISO 42001 / SOC passt.
- Profil: Satz zur Preisseite im Modell-Standort ergänzt, kein Status, kein Preis geändert. Beleg `belege/anbieter/google-gemini-workspace/widerspruchs-scan-2026-10-23.txt` + SHA256SUMS (ok) + OpenTimestamps. 352/352 Tests, lokal, **kein Push**, keine Frage.
- Noch nie gescannt: Microsoft Copilot, Claude Enterprise, Amazon Bedrock, Meta, DeepSeek.

## Neu 23.10.2026 ~10:20 (Dauerlauf Laufend): Widerspruchs-Scan Anthropic API, Gedächtnis „on your infrastructure“ liegt bei Anthropic

- Erster Scan bei der Anthropic API. Werbeseite claude.com/platform/api und vier Doku-Seiten (Managed Agents: Self-hosted sandboxes security/memory, Memory; API and data retention), direkt abgerufen (HTTP 200, robots erlaubt; Archiv gab 429, Archivkopie offen).
- **Fall-Kandidat 49 (mittel):** Werbung „Memory stores … keeping memory files on your infrastructure“; Doku „Memory stores remain hosted by Anthropic, including their version history“ und „The memory store on Anthropic's side remains the source of truth“, auch mit eigener Sandbox. Beim Kunden liegt nur eine Arbeitskopie für die Sitzung.
- Kein Fall: ZDR-Ausnahme „flagged … up to 2 years“ (schon im Profil); „Residency … Europe“ gilt nur „On your cloud provider“, direkte API weiter nur USA.
- Profil: Satz zu Gedächtnis-Ordnern in `zero_data_retention` ergänzt, kein Status, kein Preis geändert. Beleg `belege/anbieter/anthropic-api/widerspruchs-scan-2026-10-23.txt` + SHA256SUMS (ok) + OpenTimestamps. 352/352 Tests, Bau ok (zurückgesetzt), lokal, **kein Push**, keine Frage.
- Noch nie gescannt: Google Workspace, Microsoft Copilot, Claude Enterprise, Amazon Bedrock, Meta, DeepSeek.

## Neu 23.10.2026 09:55 Systemuhr (Dauerlauf Laufend): Widerspruchs-Scan ChatGPT Enterprise, „never train“ gegen „by default“; Fehler im Quellenlauf behoben

- Erster Scan bei ChatGPT Enterprise. Werbeseite chatgpt.com/business/enterprise, Sicherheitsseite openai.com/security-and-privacy, Preisseite chatgpt.com/pricing, alle aus dem Archiv (22.10.2026; direkt HTTP 403), dazu die gesicherten Kopien vom 22.10. Rohdateien in `~/allein/tmp/ws2310ce/`.
- **Fall-Kandidat 48 (niedrig):** Überschrift „We never train on your data“, Satz darunter „not used to train our models by default“; die Enterprise-Privacy-Seite erlaubt Training nach Opt-in, „for example, through our opt-in feedback mechanisms“, und Feedback darf OpenAI laut Vertrag 9.3 „without restriction“ nutzen. Ob ein Daumen hoch einzelner Nutzer als Zustimmung des Kunden zählt, ist ungeklärt.
- Kein Fall: Überschrift „ISO 27001, 27017, 27018, and 27701“ ist laut Trust-Portal ein 27001-Zertifikat mit Erweiterungen. Beides als Anmerkung im Profil (`training_opt_out`, ISO 27001).
- **Fehler im Quellenlauf behoben (`lib/quellen.js` `setzeGeprueft`):** Bei Profilen mit einem Feld pro Zeile (OpenAI API, ChatGPT Enterprise, Google Vertex) suchte der Lauf das Prüfdatum nur in der Zeile der Quelle und fügte ein zweites „geprueft“ ein. Beim Lesen gewann das alte Datum, die Bestätigung vom 23.10. ging still verloren. 62 doppelte Schlüssel entfernt (jeweils das neuere Datum behalten), Test zuerst (rot 4 statt 3 → grün), dazu neuer Wächter-Test `test/doppelte-schluessel.test.js`: kein Anbieter-Profil darf einen Schlüssel doppelt haben.
- Kein Status, kein Preis geändert. Beleg `belege/anbieter/openai-chatgpt-enterprise/widerspruchs-scan-2026-10-23.txt` + SHA256SUMS (ok) + OpenTimestamps. 352/352 Tests, lokal, **kein Push**, keine Frage.
- Noch nie gescannt: Google Workspace, Microsoft Copilot, Anthropic (API, Enterprise), Amazon Bedrock, Meta, DeepSeek.

## Neu 23.10.2026 ~08:55 (Dauerlauf Laufend): Widerspruchs-Scan OpenAI API, „Zero data retention“ mit Zwischenspeicher bis 24 Stunden

- Erster Scan bei OpenAI API. Leitfaden „Data controls“ (wortgleich mit 22.10.), Prompt-Caching-Leitfaden, Hintergrund-Modus direkt von developers.openai.com (robots „Allow: /“), Werbeseite openai.com/api aus dem Archiv (23.10. 00:20 UTC, direkt 403). Rohdateien in `~/allein/tmp/ws2310oa/`.
- **Fall-Kandidat 47 (niedrig bis mittel):** Werbung „Zero data retention policy by request“; Doku: Prompt-Caching legt auch mit ZDR verschlüsselte Zwischenstände bis 24 Stunden auf GPU-Speicher, Hintergrund-Modus ~10 Minuten auf Platte. Für GPT-5.6 und später gibt es kein „in_memory“ mehr; ob ZDR-Kunden bei GPT-6 ohne Zwischenspeicher arbeiten können, ist ungeklärt. Gleiches Muster wie Nr. 42 (Opper) und Nr. 46 (Google).
- **Neu im Profil:** `zero_data_retention` und `log_frist` um Zwischenspeicher, Hintergrund-Modus und den Regions-Satz ergänzt (Europa hat Regional processing, trifft dort nicht zu).
- Ohne Widerspruch: „No training on your data“, Data Residency nur über den Vertrieb.
- Kein Status, kein Preis geändert. Beleg `belege/anbieter/openai-api/widerspruchs-scan-2026-10-23.txt` + SHA256SUMS (ok) + OpenTimestamps. 349/349 Tests, Build streng ok (Wegwerf-Klon, `docs/` nicht angefasst), lokal, **kein Push**, keine Frage.
- Noch nie gescannt: ChatGPT Enterprise, Google Workspace, Microsoft Copilot, Anthropic (API, Enterprise), Amazon Bedrock, Meta, DeepSeek.

## Neu 23.10.2026 ~08:30 (Dauerlauf Laufend): Widerspruchs-Scan Google Vertex AI, „ZDR“ heißt bei Frontier-Modellen 30 Tage Protokoll

- Zweiter Scan bei einem US-Profil. 5 Google-Seiten (Zero-Data-Retention, Missbrauchsüberwachung, Data Residency, Produktseite, Sovereign Cloud) plus die 7 Profil-Quellen neu, Abruf 23.10. ~06:22 UTC, curl mit 3 s Abstand, robots.txt erlaubt alles. Rohdateien in `~/allein/tmp/ws2310gv/`.
- **Alle 23 Profil-Zitate vom 22.10. stehen wörtlich da.** Die Doku ist nach `docs.cloud.google.com/gemini-enterprise-agent-platform/…` umgezogen, die alten Adressen im Profil leiten weiter (kein Handlungsbedarf, beim Quellenlauf beobachten).
- **Neu im Profil:** Der 24-Stunden-Zwischenspeicher liegt standardmäßig auch auf Platte („durable caching“, ohne kundeneigene Schlüssel, beim global-Endpunkt in jeder Region). Stand schon in der Kopie vom 22.10., fehlte im Profil. Nachtrag in `zero_data_retention` und `log_frist`.
- **Fall-Kandidat 46 (niedrig bis mittel):** Google nennt 30 Tage Prompt-Protokoll bei Frontier-Modellen (Gemini 4 Argon Cyber Permissive) „ZDR-aligned“; die eigene ZDR-Seite nennt diese Protokolle nicht. Gleiches Muster wie Nr. 42 (Opper).
- Werbeseiten ohne feste Aussage zu Ort, Frist oder Training, darum kein Werbung-gegen-Doku-Widerspruch. Die Data-Residency-Tabelle kam per curl ohne Zellwerte, nicht neu geprüft (Stand 22.10. bleibt).
- Kein Status, kein Preis geändert. Beleg `belege/anbieter/google-vertex-gemini-api/widerspruchs-scan-2026-10-23.txt` + SHA256SUMS + OpenTimestamps. 349/349 Tests, Build streng ok (Wegwerf-Klon `~/allein/tmp/bk-gv`, `docs/` nicht angefasst), lokal, **kein Push**, keine Frage.
- Noch nie gescannt: OpenAI API, ChatGPT Enterprise, Google Workspace, Microsoft Copilot, Anthropic (API, Enterprise), Amazon Bedrock, Meta, DeepSeek.

## Neu 23.10.2026 ~07:55 (Dauerlauf Laufend): Widerspruchs-Scan Azure OpenAI, Antworten bleiben 30 Tage liegen

- Erster Scan bei einem US-Profil. 7 Microsoft-Seiten (Datenschutz, Bereitstellungstypen, Responses, Stored completions, Missbrauchsüberwachung, EU Data Boundary, Preisseite), Abruf 23.10. ~05:45 UTC, curl mit 3 s Abstand, robots.txt erlaubt alles. Rohdateien in `~/allein/tmp/ws2310az/`.
- **Neu im Profil:** Die Responses-Schnittstelle speichert Antworten standardmäßig 30 Tage („By default, response data is retained for 30 days.“), aus nur mit store=false; der Hintergrundmodus geht nur mit Speicher. Das Feld Log-Frist bleibt „unbelegt“ (gilt für den Missbrauchs-Speicher), hat aber jetzt diesen Nachtrag; ZDR-Feld ebenso.
- **Fall-Kandidat 45 (niedrig):** Datenschutzseite sagt, die EU-Datenzone verarbeitet nur in EU-Staaten; die Seite zu den Bereitstellungstypen sagt, auch EFTA-Staaten wie Norwegen und die Schweiz, erweiterbar „without prior notice“. Beide Zitate standen schon im Profil, jetzt als Widerspruch markiert. Preisseite nennt 2 Zonen, Doku 3.
- Nebenbefund: Datenschutzseite (18.05.) beschreibt Stored completions noch, die laut eigener Seite am 15.10.2026 abgeschaltet wurden.
- Kein Status, kein Preis geändert. Beleg `belege/anbieter/azure-openai/widerspruchs-scan-2026-10-23.txt` + SHA256SUMS (ok) + OpenTimestamps. 349/349 Tests, Build ok (Wegwerf-Klon, `docs/` nicht angefasst), lokal, **kein Push**, keine Frage.
- Noch nie gescannt: OpenAI API, ChatGPT Enterprise, Google (Vertex, Workspace), Microsoft Copilot, Anthropic (API, Enterprise), Amazon Bedrock, Meta, DeepSeek (DeepSeek erst heute Nacht sehr gründlich angelegt, darum hinten).

## Neu 23.10.2026 ~06:45 (Dauerlauf Laufend): Widerspruchs-Scan T-Systems, Werbung sagt „hosted in T Cloud“, drei Viertel der Modelle laufen bei Microsoft/Google

- Erster breiter Scan bei T-Systems (bisher nur Einzelfunde): 19 Seiten auf t-systems.com, t-cloud-public.com und docs.llmhub.t-systems.net, Abruf 23.10. ~04:26 UTC, curl mit 3 s Abstand, robots.txt erlaubt alles.
- **Fund (Fall-Kandidat 44, mittel bis hoch):** Werbeseiten und der erste FAQ-Satz sprechen für die ganze Plattform mit „über 40 Modellen“ nur von der T-Cloud („hosted in T Cloud“, „stored and operated on T Cloud Public“, „Operated on the T-Cloud in Germany“). Laut Modelltabelle laufen 29 von 39 Zeilen bei Microsoft Azure oder Google Cloud, die Trust-Seite sagt dafür „customer data may be processed worldwide“. Die Doku selbst ist an den Fachstellen offen; der Widerspruch steht in den Sätzen, die Entscheider zuerst lesen.
- Nebenbefund: t-cloud-public.com nennt noch Llama 3.3 (seit 01.09. abgeschaltet), GPT-4o, Claude 3, Gemini 1.5 Pro.
- Profil: eine Anmerkung im Feld Unterauftragnehmer, kein Status, kein Preis. Beleg `belege/anbieter/t-systems/afs-hosting-werbung-gegen-doku-2026-10-23.txt` + SHA256SUMS (ok) + OpenTimestamps. 349/349 Tests, Build streng ok (in einem Wegwerf-Klon gebaut, `docs/` nicht angefasst), lokal, **kein Push**, keine Frage.
- Damit steht auf der Liste „Noch nie gescannt“ kein europäischer Anbieter mehr. Die neuen Profile aus den USA und China (seit 22.10.) wurden noch nie gescannt; das ist der nächste Kandidat für diesen Lauf.

## Neu 23.10.2026 ~06:40 (Dauerlauf ZS1): alle Zeitstempel in Bitcoin bestätigt, Methodik-Abschnitt steht lokal

- `node stempeln.js --nachziehen`: 574 Stempel (Belege + Wächter-Rohkopien), 348 neu bestätigt, 226 waren es schon, keiner wartet mehr. Das „nachziehen mit ZS1“ in den Einträgen darunter ist damit erledigt. Hinweis: der Lauf braucht über 5 Minuten (ein Kalender-Abruf je Datei).
- Methodik-Seite: neuer Abschnitt „Zeitstempel von außen“ (`#zeitstempel`, nach „Prüfdatum je Angabe“): nur der Fingerabdruck geht raus, `.ots` liegt neben der Kopie, jeder kann selbst nachrechnen, der Stempel beweist nicht das Aussehen der Webseite (dafür Internet Archive).
- 349/349 Tests, Build streng ok (in einer Wegwerf-Kopie gebaut, `docs/` nicht angefasst), lokal `c063041f`, **Push = Home-Tab**, keine Frage.

## Neu 23.10.2026 ~06:10 (Dauerlauf SV23): letzte drei Anbieter-Fragen gesendet

- Gesendet nach Felix' Freigabe vom 22.10.: Gcore (SOC 2 Type I oder II?), EUrouter (was wird gespeichert, wenn Logging an ist?), Nebius (Finnland fest oder „Global“?). Damit sind alle sechs Fragen der Widerspruchs-Scans vom 22.10. raus.
- Antworten kommen ins jeweilige Profil mit Datum; bis dahin bleiben die Profile wie sie sind.

## Neu 23.10.2026 ~06:00 (Dauerlauf AK2): die übrigen „Text weicht vom Prüfstand ab“ eingeordnet
- Von 25 Abweichungen waren 18 keine: Die Archivkopie gleicht Wort für Wort dem Prüfstand, der Quellenlauf von heute Nacht hatte ihn nachgezogen (u. a. Aleph-Alpha-Datenschutz, EUrouter Modelle/Datenschutz, GreenPT AGB, Lyceum, OpenRouter Nebius, STACKIT ×2, DeepL ×3, Exoscale ×4, OVHcloud ×2). Jetzt „gleich“.
- Kopie älter als der Prüfstand (echte Änderung, schon übernommen): EUrouter DPA (Melious neu) und GreenPT Datenschutz (Scaleway/Finnland weg) frisch gesichert, jetzt gleich. GreenPT Nachhaltigkeit: Sicherung scheiterte („fetch failed“), bleibt abweichend.
- **HDS-Liste der ANS (Exoscale, OVHcloud):** Der gespeicherte Prüfstand ist seit 14.10. die Sperrseite von Incapsula (6 Wörter), nicht die Liste. Seit es die Sperr-Erkennung gibt, meldet der Quellenlauf die Seite nur als „gesperrt“ und vergleicht nicht mehr; der alte Fingerabdruck blieb stehen. Die Archivkopie vom 22.10. ist die echte Seite, zeigt aber nur Seite 1 (A bis ACMI), AKENES und OVH stehen weiter hinten. Gefilterte Seiten (`?hds_letter=A`, `?hds_letter=O`) heute im Archiv gesichert: auch dort nur die Sperrseite. Darum Archivkopie jetzt „nicht vergleichbar“ (wie Notion). Der HDS-Beleg bleibt Felix' Browser-Abruf vom 09.10.; maschinell ist die Liste gerade weder direkt noch übers Archiv lesbar.
- Offen: 4 Kopien nicht geladen (Archiv drosselte): OVHcloud ISO-Seite und AI-Endpoints-Katalog, Requesty DPA und Datenschutz; dazu GreenPT Nachhaltigkeit neu sichern. Stand gleich/abweichend/offen: 122/5/27 (vorher 103/25/26). 349/349 Tests, lokal `19125c4`, kein Push.

## Neu 23.10.2026 ~04:40 (Dauerlauf Laufend): Widerspruchs-Scan Opper, „zero data retention“ heißt fünf Jahre Metadaten
- Frage: Sagen die Opper-Seiten untereinander etwas anderes als das Profil? Abruf 23.10. ~02:30 UTC, curl mit 3 s Abstand, robots.txt erlaubt alles Gelesene, 17 Seiten (Start, Compliance, Souverän, DPA, Security Overview, Privacy, Terms, Preise, Enterprise, Gateway, EU-Souverän-Modelle, drei Blogposts, OpenRouter-Vergleich, Mistral, Anthropic) + Trust Center. Rechtstexte mit gleichem Datum wie bisher. Rohseiten in `~/allein/tmp/ws2310o/` (nicht im Repo).
- **Fund 1 (neu, Fall-Kandidat 42, mittel):** Gateway-Seite „End-to-end zero data retention on every plan“, Preisseite nennt den Normalfall „zero data retention: only usage metadata“. Security Overview: Nutzungsmetadaten „kept for five years“, ZDR für Metadaten nur per Enterprise-Vertrag; die ZDR-Routen für OpenAI auf Azure und Gemini auf Vertex brauchen laut Preisseite „a signed Enterprise agreement“.
- **Fund 2 (neu, Fall-Kandidat 43, niedrig bis mittel):** Souverän-Seite „European at every hop“ / „all European companies“, das Trust Center führt Datadog (US-Firma) für die Überwachung „of both production environments“ mit Traces, Logs, IP-Adressen (ohne Prompts). Ungeklärt, ob die Instanz evroc.on.opper.ai dazugehört.
- Unverändert: Kandidat 22 (keine Einspruchsfristen gegen DPA 30 Tage) weiter live; Fall-Entwurf 005 bleibt schwach.
- Profil: zwei Nachträge (ZDR-Feld, Unterauftragnehmer-Feld), kein Status, kein Preis. Belege `belege/anbieter/opper-ai/*-2026-10-23.txt` (2 Dateien) + SHA256SUMS (ok) + OpenTimestamps (2 gestempelt, nachziehen mit ZS1). 349/349 Tests, Build streng ok (Ausgabe zurückgesetzt), lokal `1fab50a`, **kein Push**, keine Frage.
- Noch nie gescannt: T-Systems (nur Einzelfunde).

## Neu 23.10.2026 ~02:55 (Dauerlauf Laufend): Widerspruchs-Scan Nordference, das Zugangsformular schickt nichts ab
- Frage: Sagen die Nordference-Seiten untereinander etwas anderes als das Profil? Erster Scan bei Nordference. Abruf 23.10. ~00:45–00:55 UTC, curl mit 3 s Abstand, robots.txt erlaubt alles. Die Website ist eine Ein-Seiten-Anwendung; das Skript-Bündel ist byte-gleich zum 08.10. (SHA-256 `e68e235c…d9ad`), `api.nordference.ai` hat weiter keinen DNS-Eintrag. Rohdateien in `~/allein/tmp/ws2310n/` (nicht im Repo).
- **Fund 1 (neu):** Das Formular „Request Beta Access“ (einziger Zugangsweg) zeigt „Request submitted! We'll be in touch soon with your beta access.“, die Absende-Funktion schreibt die Eingaben aber nur in die Browser-Konsole (`console.log`) und sendet sie nirgends hin. Ungeklärt: ob das Analyse-Skript des Baukastens (`/~flock.js`) Eingaben mitnimmt.
- **Fund 2 (neu):** Die SLA (99,9 % Pay-as-you-go, 99,99 % Enterprise) gilt laut eigenem Text nicht für „beta or preview features“; das Angebot ist laut Preis- und Modellseite insgesamt „in private beta“.
- **Fund 3 (neu, klein):** Datenschutzseite „we do not transfer data to third countries outside the EEA“, die Website lädt ihre Schriften aber von Google (fonts.googleapis.com/gstatic.com). Betrifft Website-Besuche, nicht die API.
- Schon bekannt: zwei verschiedene „Data Protection Officer“-Adressen (privacy@ und dpo@), ISO 27001/SOC 2 nur als Schlagworte.
- Profil: Kurzbeschreibung um Fund 1 + 2 ergänzt, Anmerkung im Feld Unterauftragnehmer um Fund 3; kein Status, kein Preis. Belege `belege/anbieter/nordference/*-2026-10-23.txt` (3 Dateien) + SHA256SUMS + OpenTimestamps (3 gestempelt, nachziehen mit ZS1). Fall-Kandidat Nr. 41 (mittel) in `outreach/fall-kandidaten.md`. 349/349 Tests, Build streng ok (Ausgabe zurückgesetzt), lokal `ef9f0c4`, **kein Push**, keine Frage.
- Noch nie gescannt: Opper, T-Systems (nur Einzelfunde).

## Neu 23.10.2026 ~02:40 (Dauerlauf Laufend): Widerspruchs-Scan Requesty, EU-Seiten versprechen mehr als Security/Privacy
- Frage: Sagen andere Requesty-Seiten etwas anderes als das Profil? Erster Scan bei Requesty. Abruf 23.10. ~00:27 UTC, curl mit 3 s Abstand, robots.txt erlaubt alles, 19 Seiten (Start, /eu und vier Unterseiten, DPA, Enterprise, Security, Privacy, Unterauftragnehmer, Terms, Leitfaden EU-Datenresidenz, Governance, Preise, zwei Vergleichsseiten, ein Kundenfall, Doku EU-Routing). Rohseiten in `~/allein/tmp/ws2310q/` (nicht im Repo).
- **Widerspruch 1 (Speicherung, gehört zu Fall 2026-001):** Die DPA-Seite sagt weiter ohne Einschränkung „request and response bodies are never stored“. Neu: Die Seite requesty.ai/eu sagt unter „Zero data retention“ „Requests are proxied in real-time. Nothing is stored, logged, or cached after delivery.“ und auf „Do you store or retain any of my data?“ „No.“; /eu/claude, /eu/openai, /eu/gemini, /eu/mistral nennen das Frankfurter Gateway ebenso ohne Einschränkung „with zero data retention“. Die Security-Seite sagt am selben Tag „Logging is on by default, encrypted, in the EU, for 30 days.“ Der Fall-001-Satz hat sich also auf fünf weitere Seiten ausgebreitet.
- **Widerspruch 2 (Ort):** /eu: „All data is hosted, stored, and processed exclusively in Frankfurt […] No data ever leaves the European Union.“ Privacy Policy: der Frankfurt-Endpunkt „governs our own processing; where inference happens follows the model you select“; Leitfaden: bei einem Modell außerhalb des EWR „a restricted transfer arises at the inference layer“.
- Schon bekannt, kein neuer Fund: Privacy Policy sagt „We do not train machine learning models on your data“ und zwei Sätze später „Requesty's own use of content for training is limited to free plan accounts“ (Fall-Kandidat Nr. 39).
- Ohne Widerspruch: Security-FAQ und Privacy einig (30 Tage, EU, ZDR pro Schlüssel oder schriftlich), SOC 2 weiter „in progress“, kein DPF („does not rely on it“), Unterauftragnehmer mit 30 Tagen Vorlauf.
- Profil: zwei Anmerkungen (ZDR-Feld, Modell-Standort), kein Status, kein Preis. Belege `belege/anbieter/requesty/*-2026-10-23.txt` (9 Dateien) + SHA256SUMS (ok) + OpenTimestamps (9 gestempelt, nachziehen mit ZS1). Kein Wayback in diesem Lauf. 349/349 Tests, Build streng ok (Ausgabe zurückgesetzt), lokal `1a29f8e`, **kein Push**.
- **Vorschlag für den nächsten Push (Home-Tab, keine Frage-Mail):** Fall 001 bekommt einen Verlauf-Eintrag 23.10. („DPA-Satz unverändert; dieselbe Aussage jetzt zusätzlich auf /eu und vier Unterseiten“). Nicht eigenmächtig, weil der Fall öffentlich ist.
- Noch nie gescannt: Nordference, Opper, T-Systems (nur Einzelfunde).

## Neu 23.10.2026 ~02:20 (Dauerlauf Laufend): Widerspruchs-Scan Regolo, „keine Protokolle“ gegen Datenschutz-Protokolle, Orte uneinheitlich
- Frage: Sagen andere Regolo-Seiten etwas anderes als das Profil (Ort, Speicherung, Training, Zertifikate)? Erster Scan bei Regolo. Abruf 23.10. ~00:08–00:12 UTC, curl mit 3 s Abstand, robots.txt erlaubt alles, 17 Seiten aus der Sitemap (Start, ZDR, AGB/DPA, Datenschutz, FAQ, Preise, Infrastruktur, Nachhaltigkeit, DHH, Modelle, Preis-Update, Gesundheit IT, Partnerseite, drei Vergleichsseiten). Rohseiten in `~/allein/tmp/ws2310r/` (nicht im Repo).
- **Widerspruch 1 (Werbung gegen Datenschutzerklärung):** ZDR-Seite: „No logging of API calls or content for future analysis. There are no audit trails of your requests, no server logs capturing your data, no records of any kind.“ Die Datenschutzerklärung erfasst automatisch „LOGs (including IP address, browser and configuration, place, date and connection time, type of device used)“ und „request type (without the content), duration of the access to the service“, Frist „Until the cancellation of the Account“. Für Inhalte stimmen beide überein, für Metadaten nicht. Das Profil stand schon richtig (Log-Frist belegt), nur Anmerkung bei ZDR ergänzt.
- **Widerspruch 2 (Ort):** Infrastrukturseite (geändert 14.07.) nur „Lazio, Italy“ und „Lombardy, Italy“, OpenAI-Vergleich (01.10.) „Lombardy and Lazio, Italy“; Claude- und DeepSeek-Vergleich (01.10.) „100% European Union (Italy, France, Germany)“ bzw. „Seeweb datacenters in Europe (Italy, France, Germany)“; Partnerseite (16.10.) „100% EU facilities (Milan & Frankfurt)“. Der ISO-27001-Umfang deckt nur Mailand und Frosinone. Ob Anfragen in Frankreich oder Frankfurt laufen, ist ungeklärt. Alles EU, aber für Prüfer zählt der Zertifikatsumfang. Anmerkung beim ISO-27001-Eintrag; Standort der Modelle bleibt „Italien“ (Infrastrukturseite + Zertifikat).
- Klein, kein Fall: FAQ sagt „no cross-border data transfers“, die Cookie-Tabelle der Datenschutzerklärung schickt Werbe-Daten der Website in die USA (X, LinkedIn, Reddit, Google; Website, nicht API). Datenschutzerklärung inhaltlich wie die Fassung 1.1 vom 14.10.
- Ohne Widerspruch: Training nirgends, ZDR-Zertifikat überall „24 July 2026“, AGB/DPA (28.01.2026) Übermittlung außerhalb der EU nur mit schriftlicher Zustimmung, Unterauftragnehmer weiter nur auf Anfrage.
- Belegkopien `belege/anbieter/regolo/*-2026-10-23.txt` (8 Dateien) + SHA256SUMS (9/9 ok) + OpenTimestamps (8 gestempelt, nachziehen mit ZS1). Kein Wayback in diesem Lauf. Profil: nur zwei Anmerkungen, kein Status, kein Preis. 349/349 Tests, Build streng ok (Ausgabe zurückgesetzt), lokal `72c4a5a`/`120f70a`, **kein Push**. Keine Frage (eine Fachfrage an Regolo zu Ort und Metadaten wäre möglich, eilt nicht).
- Noch nie gescannt: Requesty, Nordference, Opper, T-Systems (nur Einzelfunde).

## Neu 23.10.2026 ~01:50 (Dauerlauf WX1 Wachsen + NW2b): Meta und DeepSeek als Profile, IONOS-Altmodelle raus, lokal, NICHT online
- **Meta:** Die „Llama API“ gibt es so nicht mehr: llama.developer.meta.com leitet auf dev.meta.ai um, das Produkt heißt „Meta Model API“ und bietet nur Muse-Modelle (Meta: „Llama models aren't run for you through Model API.“). Profil `data/anbieter/meta-llama-api.json` heißt darum „Meta Model API (früher Llama API)“. DPF ja: „Meta Platforms, Inc.“ (Id 4452, „Active - Re-certification under Review“, bis 23.07.2027); ob die Model API erfasst ist, ungeklärt. Preise nur USD (Muse Wonder 1.0 Vorschau 4/20 $, Muse Spark 1,25/4,25 $, Contributor 0,10/0,20 $ je 1M).
- **Für Prüfer wichtig (Meta):** Training hängt an der Modell-ID („-contributor“ = Inhalte gehen ins Training, Meta darf Anfragen dorthin leiten, Muse-Code-Abos stehen standardmäßig auf Contributor); Null-Speicherung nur auf Antrag und nur im Hilfe-Artikel, markierte Inhalte bis 2 Jahre; gespeicherte Antworten standardmäßig an, Dateien ohne Ablauf; Unterauftragnehmer-Link führt zur Liste von „Meta Horizon Managed Solutions“ (13.11.2023), passt wohl nicht; keine EU-Region, kein Zertifikat, kein Trust-Portal; European Region Terms öffentlich nicht abrufbar.
- **DeepSeek:** Profil `data/anbieter/deepseek-api.json`, erstes Land ohne Angemessenheitsbeschluss im Katalog (China in `lib/rechtsraum.js` als Drittland; Zählzeile zählt es eigens: Startseite „21 europäische, 10 US- und 1 chinesische KI-Anbieter“). Speicherung in der VR China (wörtlich belegt), Training mit Ein- und Ausgaben ist Standard (eigene EU-Trainingsdaten-Zusammenfassungen V4/V4.1: „Yes“), kein öffentlicher AVV, keine Unterauftragnehmer mit Namen, keine Null-Speicherung, Recht der VR China, Gerichtsstand Hangzhou, GPAI-Kodex nicht unterzeichnet. Behörden mit Datum und Zitat: Garante Italien 30.01.2025 (Beschränkung mit sofortiger Wirkung), Berliner Datenschutzbeauftragte 27.06.2025 (Meldung an Apple/Google); beide betreffen App/Website, nicht ausdrücklich die API. Preise nur USD (V4.1-Flash 0,30/1,20 $, V4-Pro 1,32/3,96 $, außerhalb der Spitzenzeit halb).
- Register (EU Cloud CoC, CISPE, Trusted Data Processor, 23.10. ~01:41): beide ohne Eintrag, Europrivacy nicht ausgewertet; neu in `data/register-datenschutz.json`.
- Zitatprüfung: Meta 146, DeepSeek 100 Zitate, 0 Fehltreffer. Belege mit QUELLEN.md, SHA256SUMS (ok) und OpenTimestamps (97 gestempelt, nachziehen mit ZS1).
- **Nicht im Repo:** `belege/anbieter/deepseek-api/eu-vertreter-prighter-2026-10-23.txt` wurde im abgebrochenen Lauf geholt, obwohl app.prighter.com per robots.txt alles sperrt. Nicht zitiert, nicht in SHA256SUMS, per `.git/info/exclude` ausgeschlossen; löschen darf nur Felix (Nur Felix, umkehrbar, eilt nicht).
- **NW2b:** IONOS führt Llama 3.1 8B (15.10.) und Mistral Nemo (22.10.) jetzt unter „Retired models“; beide aus `data/anbieter/ionos.json` genommen (6 Modelle), Beleg `belege/anbieter/ionos/modelle-retired-2026-10-23.txt`. Lokal `58a0926`.
- Test zuerst (2 rot vom abgebrochenen Lauf), dann 349/349, Build streng ok im Klon (32 Anbieter). Lokal `370b122`, **kein Push** (Push = Home-Tab über `dossiers/push-sauber.sh`, mit den übrigen US-Profilen). WX1 heute 5 von 5, nächste ab Sa 24.10.: Cohere, dann von Prüfern genannte.

## Neu 23.10.2026 ~01:10 (Dauerlauf WX1 Wachsen): Amazon Bedrock als US-Profil, lokal, NICHT online
- Neues Profil `data/anbieter/amazon-bedrock.json` (Kategorie Cloud wie Azure OpenAI und Vertex). DPF: ja, Eintrag „Amazon.com, Inc.“ (Id 5776, aktiv, nur Nicht-HR-Daten, bis 02.01.2027), erfasst ausdrücklich „Amazon Web Services, Inc.“; Gegenprobe Microsoft 1 Treffer. Beleg `belege/rechtsraum/dpf-amazon-2026-10-23/`. Katalog jetzt 30 Anbieter, Seite sagt „21 europäische und 9 US-KI-Anbieter“.
- Vier Modelleinträge: Nova Pro (EU-Profil), Claude Sonnet 5.5 einmal über das EU-Profil und einmal über Global, Mistral Large 3 (nur In-Region Stockholm/London). Preise nur in USD, EUR-Felder null. Die Preisseite lädt die Beträge per Skript; belegt über Vorlage im HTML plus die Preisdateien der Seite (Abschnitt „EU (Frankfurt)“).
- Belegkopien direkt abgerufen 23.10. 00:57–00:59 (robots.txt erlaubt): 35 Dateien mit QUELLEN.md, SHA256SUMS (alle ok) und OpenTimestamps (43 gestempelt, nachziehen mit ZS1). Zitatprüfung: 131 verschiedene Zitate, alle wörtlich in einer Kopie (11 erst nach Angleich von geschützten Leerzeichen und Apostroph).
- Register: **Bedrock steht selbst im CISPE-Register** („Amazon Bedrock [excludes Amazon Bedrock Marketplace]“, AWS EMEA SARL, 14.06.2024–14.06.2027). Dafür neues Ergebnis „Dienst im Register eingetragen“ in `lib/register.js`. EU Cloud CoC und Trusted Data Processor ohne Eintrag, Europrivacy nicht abgefragt.
- **Für Prüfer wichtig:** (1) Der Ort hängt von der Wahl ab: In-Region, EU-Profil (z. B. aus Frankfurt nach Frankfurt, Stockholm, Mailand, Spanien, Irland, Paris) oder Global (weltweit, rund 10 % billiger). Claude Sonnet 5.5 gibt es in keiner EU-Region als In-Region. (2) Modellanbieter sehen laut AWS weder Eingaben noch Logs; Abrechnung der Drittmodelle aber über Amazon Web Services, Inc. (USA), Vertragspartner sonst AWS EMEA SARL (Luxemburg). (3) Null-Speicherung je Region per API (Modus none), nicht in der Konsole; Standard ist das Verhalten des Modells. (4) Claude Fable 5/5.1: aller Verkehr bis 30 Tage, Freigabe zur Prüfung durch AWS ist Pflicht; OpenAI-Modelle: markierter Verkehr bis 30 Tage. (5) Neue Unterauftragnehmer: 30 Tage vorher, Widerspruch nur durch Kündigen, Dienst meiden oder Region wechseln. (6) ISO 27001 belegt (öffentliches Zertifikat 2013-009, EY CertifyPoint, Bedrock ohne Marketplace im Umfang); C5, SOC 2, ISO 42001 nur „beansprucht“ (Berichte in AWS Artifact).
- Unbelegt: EU-Preis für Mistral Large 3 (Zeile fehlt in den EU-Tabellen), Preis in der Sovereign Cloud (Nova Pro dort In-Region gelistet), Backup-Ort, Gründungsjahr, ob Bedrock im ISO-42001-Umfang ist, Prüfer von C5/SOC 2, Filter vor dem Modell bei Nova Pro (Karte: „Abuse detection“ nicht unterstützt). Ungeklärt: welche Datenschutzerklärung im DPF-Eintrag für AWS gilt.
- Test zuerst (2 rot), dann 345/345, Build streng ok im Klon (30 Anbieter). Lokal `2589874`, **kein Push** (Push = Home-Tab über `dossiers/push-sauber.sh`, zusammen mit den US-Profilen vom 22./23.10.).
- Offen: Save Page Now für die neuen Quellen (mit dem nächsten Archiv-Stapel), Stempel nachziehen mit ZS1.

## Neu 23.10.2026 ~01:00 (Dauerlauf QP2): sieben „verändert“-Quellen von Hand geprüft, lokal, kein Push
- **Exoscale On-Demand Inference ist echt neu:** aus „Coming soon“ wurde „Private Preview“ auf Einladung, nur Zone AT-VIE-2 (Wien), ohne SLA. Vorläufige Preise (EUR = USD = CHF): Qwen3.8-27B 0,40 / 2,40 je 1 Mio. Token, Cache-Read 0,09; Qwen3-Embedding-8B 0,09. Neue Zusage nur auf der Produktseite: Prompts und Antworten werden nach der Inferenz nicht gespeichert, kein Training, nur Abrechnungs-Metadaten. Profil: Modell-Standort, Preis 0,40/2,40 (ersetzt „kein öffentlicher Preis“), Status bleibt „beansprucht“; ZDR und Training im Vertragsteil bleiben unbelegt (steht nicht in DPA/AGB), Nachtrag in den Anmerkungen; Backup-Notiz „noch nicht gestartet“ korrigiert.
- **Nebius:** Qwen3-235B-A22B-Instruct steht nicht mehr unter openrouter.ai/provider/nebius, im offiziellen Nebius-Katalog aber weiter „active“, 0,20/0,60 $, Region FI. Preisquelle dieses Modells umgestellt auf tokenfactory.nebius.com/api/public/models_info; Belegkopien `belege/anbieter/nebius/modellkatalog-2026-10-23.json` und `provider-seite-2026-10-23.txt` mit SHA256 und OpenTimestamps. gpt-oss-120b (0,15/0,60) und GLM-5.1 (1,40/4,40) unverändert.
- **Rauschen, Profilwerte stimmen:** DeepL /pro (Tabelle umgebaut, 7,49/24,99/49,99 € gleich; API-Preise stehen weiter nicht im Server-HTML), Mistral Preisseite (alle sechs Preise gleich; neu: Mistral verkauft auch Z.ai GLM 5.3 / 5.3 Flash), Mistral Large 4 (nur Seitenleiste), Requesty Security (Seite neu gestaltet; 30 Tage EU, Metadaten-Audit, „SOC 2 Type II programme in progress“ wörtlich gleich).
- Quellenlauf mit `--uebernehmen-nur` für alle sieben: 7 übernommen, Nebius-Katalog als neue Quelle erfasst. Tests 343/343, Build streng ok (zurückgesetzt).

## Neu 23.10.2026 ~00:45 (Dauerlauf Tagesprüfung)
- 343/343 Tests, Build streng ok (nur Datum, zurückgesetzt; neue US-Profil-Seiten liegen ungetrackt in docs/, harmlos, entstehen beim Push-Build neu), Archivcheck 23 Zitate in 16 Kopien ok. Fälle 003/004: 8 von 9 Zitaten wörtlich live, Scaleway-Zusatz „except temporarily…“ wie seit 03.10. bekannt.
- Quellenlauf: 56 neu (US-Profile), 158 unverändert, 46 verändert, 9 verschwunden (OpenAI 403/fetch failed wie bekannt, IAS-PDF). 39 übernommen `634c21d` (Menüs, Banner, Blog-Teaser; Handprüfung siehe unten).
- **Echt, kein Profilwert falsch:** (1) EUrouter-DPA: 18 statt 17 KI-Anbieter, neu Melious (Deutschland), Listendatum wieder „9 October 2026“ unverändert → Anmerkung Unterauftragnehmer ergänzt. (2) Nebius Token Factory Terms: neue Fassung vom 22.10.2026 (vorher 15.09.); alle zitierten Sätze (5.1, 5.2, 5.3, Speculative Decoding) stehen wörtlich auch in der neuen Fassung; „Fassung 15.09.2026“ in den Anmerkungen ist jetzt alt. (3) GreenPT: Seiten neu getextet, die Angabe „Scaleway, Finnland/Frankreich“ ist von greenpt.com/privacy weg, dort jetzt „Every model is self-hosted on GreenPT infrastructure“. Passt zu Roberts Mail 22.10. („We will change that“). Profilstandort kommt aus docs.greenpt.ai/model-cards, Trainingszitat steht weiter wörtlich.
- **Noch nicht von Hand geprüft (bleiben „verändert“):** DeepL /pro und /pro#api (Preistabelle umgebaut), Exoscale on-demand (neue Preise, ZDR-Frage), Mistral pricing, Mistral Large 4, OpenRouter Nebius, Requesty security. Nächster Laufend-belegbar-Durchlauf: QP2.
- Wächter: 25 gleich, OpenAI AVV/Unterauftragnehmer/Sicherheit 403 (Unterauftragnehmer zuerst nur Menü „Apps SDK“ → „Plugins“, nicht übernommen). hallo@ und OpenAI-Mail: nichts Neues.

## Neu 23.10.2026 ~00:10 (Dauerlauf WX1 Wachsen): Anthropic API und Claude Enterprise als US-Profile, lokal, NICHT online
- Zwei neue Profile in `data/anbieter/`: `anthropic-api` (Modell-Anbieter) und `anthropic-claude-enterprise` (Assistent, Team-Plan in den Anmerkungen). DPF: Anthropic steht nicht in der amtlichen Liste (0 Treffer für Anthropic, Anthropic PBC, Anthropic Ireland, Claude; Gegenprobe Microsoft 1 Treffer), Beleg `belege/rechtsraum/dpf-anthropic-2026-10-22/`. Katalog jetzt 29 Anbieter, Seite sagt „21 europäische und 8 US-KI-Anbieter“.
- Belegkopien direkt abgerufen 22.10. 23:49–23:55 (robots.txt erlaubt): 23 bzw. 27 Kopien mit QUELLEN.md, SHA256SUMS (alle ok) und OpenTimestamps (nachziehen mit ZS1). Trust-Portal per Chrome headless gerendert (Text + Roh-DOM).
- Zitatprüfung: 92 bzw. 80 verschiedene Zitate, alle wörtlich in einer Kopie (nachgeprüft 23.10. 00:07).
- Register: EU Cloud CoC, CISPE, Trusted Data Processor ohne Eintrag (gelesen 23.10. ~00:00), Europrivacy nicht abgefragt.
- **Für Prüfer wichtig:** (1) Keine EU-Region: „Currently, `"us"` is the only available workspace geo.“; Rechenarbeit standardmäßig weltweit, „Nur USA“ kostet 10 % mehr. (2) Nicht im DPF, Übermittlung über SCC; Vertragspartner im EWR ist Anthropic Ireland. (3) Bei Missbrauchsverdacht Ein-/Ausgaben bis 2 Jahre, Einstufungen bis 7 Jahre, auch mit Null-Speicherung. (4) Für „Covered Models“ (Fable, Mythos) gelten seit 09.06.2026 30 Tage Pflicht-Speicherung, „this supersedes any modified retention commitments (e.g., ZDR)“. (5) Claude Enterprise speichert Chats standardmäßig unbefristet, Chat-Oberfläche „not ZDR-eligible“. (6) Widerspruch gegen neue Unterauftragnehmer nur binnen 15 Tagen; 22 Einträge, letzte Änderung 15.10.2026.
- Unbelegt: alle Zertifikate nur „beansprucht“ (Trust-Portal nur nach Zugangsanfrage, nicht gestellt), Zertifizierer ISO 27001, Backup-Ort, Gründungsjahr. Ungeklärter Widerspruch zur API-Speicherdauer („not retained by default“ vs. „delete … within 30 days“) steht im Profil.
- Test zuerst (2 rot), dann 343/343, Build streng ok im Klon. Lokal `0a52568`, **kein Push** (Push = Home-Tab über `dossiers/push-sauber.sh`, zusammen mit den sechs US-Profilen vom 22.10.).
- Offen: Save Page Now für die neuen Quellen (Archiv drosselt gerade, mit dem nächsten Archiv-Stapel ab Fr 23.10. 06:00), Stempel nachziehen mit ZS1.

## Neu 22.10.2026 ~23:45 (Dauerlauf, Laufend belegbar): Prüfer-Startseite-Entwurf sagt jetzt, was uns trennt
- Unter den drei Schritten steht ein neuer Satz: „Ein Text-Wächter meldet, dass sich eine Seite geändert hat. Wir prüfen zusätzlich, ob die Zusage stimmt, etwa ob der genannte Hosting-Ort zur Liste der Unterauftragnehmer passt. Betreiber in der EU, mit Namen im Impressum.“ Grund: Konkurrenz-Suche KO1 (ConductAtlas & Co. melden nur Textänderungen, Betreiber in den USA).
- Keine Konkurrenten beim Namen (UWG-Frage liegt beim Anwalt). Impressum auf /ueber/ nennt Felix Lind, geprüft.
- Von der Maschine entschieden 22.10. (nur lokale Vorschau, umkehrbar). Test zuerst (1 rot → grün), 341/341, lokal `0063cc6`, `entwurf-startseite/index.html` neu gebaut; `vorschau.png` ist noch das Bild von 17:45 ohne den Satz. Gehört zu Frage 521.

## Neu 22.10.2026 ~22:45 (Dauerlauf, Laufend belegbar): 5 falsche „Text weicht ab“ behoben
- 29 Archivkopien standen auf „weicht vom Prüfstand ab“. 5 davon kamen nur daher, dass `nachsichern.js` den einfachen Fingerabdruck nahm, der Quellenlauf aber bei Zähler- und Karten-Seiten nur die gefilterten Wörter und bei Hugging Face die Git-Revision.
- Neu `hashVergleich()` in `lib/quellen.js`, rechnet wie der Quellenlauf; Hugging Face und Notion gelten als „nicht vergleichbar“. Test zuerst (2 rot → grün), 340/340, lokal `469f6e5`, kein Push.
- Korrigiert: opper.ai/ai-compliance und opper.ai/models jetzt gleich; die zwei Aleph-Alpha-Seiten auf Hugging Face jetzt „nicht vergleichbar“. Stand gleich/abweichend/offen: 103/25/26 (vorher 101/29/24).
- eurouter.ai/models weicht echt ab: Die Seite zeigt ohne Browser eine wechselnde Auswahl (21.10. DeepSeek V4 Flash, Kopie 22.10. 13:40 Mistral Large 3). Kein Profilwert betroffen, der Preis Mistral Large 3 (0,55/1,65 $) steht in der Kopie. Der nächste Quellenlauf meldet die Seite vermutlich als verändert: dann Rauschen übernehmen.
- Offen: die übrigen 24 Abweichungen. Das Archiv lieferte ab der 8. Kopie nur „fetch failed“; Wortvergleich je Seite beim nächsten Lauf (Werkzeug liegt in `~/allein/tmp/ak2210/diff.js`).


## Neu 23.10.2026 ~12:05 (Dauerlauf E22-5, Stapel 25): 565 von 822

- 3 von 8 gesichert: Bedrock Mistral-Large-3-Modellkarte, Meta-for-Work-Unterauftragnehmer, Anthropic API-Datenaufbewahrung (Archivtext weicht vom Quellenlauf ab → beim nächsten Quellenlauf ansehen). Abgelehnt: Anthropic-Preise (Status 520), privacy.claude.com ×2, support.claude.com US-Inferenz, DeepSeek FAQ („fetch failed“).
- 86 Quellen offen. Nächster Stapel nicht vor 12:35, weiter `node nachsichern.js --anzahl 8`. Lokal `8e4117eb`.

## Neu 23.10.2026 ~11:35 (Dauerlauf E22-5, Stapel 24): 561 von 822

- 4 von 8 gesichert: AWS DPA, AWS ISO-27001-Zertifikat, Bedrock Datenaufbewahrung, Nova-Pro-Modellkarte. Abgelehnt („fetch failed“): Meta Model API ×3 (Preise, Zero Data Retention, Nutzungsbedingungen), Bedrock Missbrauchserkennung.
- 90 Quellen offen. Nächster Stapel nach ≥ 30 min (nicht vor 12:05), weiter `node nachsichern.js --anzahl 8`. Lokal `233d7e7e`.

## Neu 23.10.2026 ~10:15 (Dauerlauf E22-5, Stapel 22): Archiv nimmt wieder an

- 5 von 8 gesichert: DeepSeek KV-Cache, Preise, Rate-Limit; AWS ISO 27001 und ISO 42001 FAQ. Abgelehnt („fetch failed“): AWS Bedrock FAQ, Bedrock-Preise, BSI C5.
- Stand 550/822 (Zeilen gewachsen durch die Widerspruchs-Scans 23.10.), 98 Quellen offen. Nächster Stapel nach ≥ 30 min, weiter `node nachsichern.js --anzahl 8`. Lokal `ce2ff9f8`.

## Neu 22.10.2026 ~22:35 (Dauerlauf E22-5, Stapel 21): wieder 0 gesichert

- Alle 8 abgelehnt (7× Status 520 bei Google Cloud, OpenAI-Preisseite, EU-Kommission; 1× „fetch failed“ T-Systems). Zwei leere Stapel in Folge: Das Archiv nimmt gerade nichts an.
- Stand bleibt 543/723, 62 Quellen offen. Nächster Stapel nicht vor Fr 23.10. 06:00, weiter `node nachsichern.js --anzahl 8`. Lokal `d771c4d`.

## Neu 22.10.2026 ~21:45 (Dauerlauf E22-5 Teil 2, Stapel 20): 0 gesichert, Archiv drosselt
- Alle 8 abgelehnt: 7× Status 520 (T-Cloud ×5, UKAS ×2), 1× „fetch failed“ (Google Service-Terms). Fehlversuche gezählt, die Quellen rücken ans Ende.
- Stand bleibt 543/723, 62 Quellen offen. Nächster Stapel erst nach ≥ 60 min Pause (nicht vor 22:45), weiter `node nachsichern.js --anzahl 8`.

## Neu 22.10.2026 ~22:35 (Dauerlauf, Laufend): ConductAtlas genauer angesehen
- Betreiber steht doch drin: in Datenschutz und AGB (21.04.2026) eine Einzelperson, Recht der USA, kein Impressum. Unser Unterschied heißt damit „Betreiber in der EU“, nicht „Betreiber mit Namen“.
- Beleg-Export mit SHA-256 gibt es dort nur im Team-Tarif für 399 $/Monat (nicht 5–20 $).
- Von unseren 25 Anbietern führen sie 6 (Azure, Copilot, DeepL, Mistral inkl. AVV, OpenAI, Gemini); die 19 kleineren EU-Anbieter fehlen dort ganz. Einzelheiten und Belege in `dossiers/KONKURRENZ-2026-10-22.md` (lokal).

## Neu 22.10.2026 ~21:05 (Dauerlauf KO1): Konkurrenz-Suche fertig, 9 Funde
- Tabelle in `dossiers/KONKURRENZ-2026-10-22.md` (lokal, nicht im Repo, dossiers/ ist ausgeschlossen).
- Gefährlichste drei: **ConductAtlas** (tägliche Kopie + SHA-256 + Diffs, 343 Plattformen, schon Mistral und System Cards, ab 4,99 $/Mo, Betreiber nicht genannt), **Open Terms Archive** GenAI (kostenlos, EU, 48 Dienste, nur AGB), **PageCrawl** (Selbstbau-Wächter für Unterauftragnehmer-Listen/Trust Center).
- Unser Unterschied: EU-Anbieter, Prüfung der Zusagen statt nur Textänderung, Betreiber mit Namen, OpenTimestamps. Vorschlag: ein Satz dazu im EH3-Entwurf; ConductAtlas monatlich ansehen.

## Neu 22.10.2026 ~21:05 (Dauerlauf E22-5 Teil 2, Stapel 19): 543 von 723 Zeilen mit Archivkopie

- 2 Quellen gesichert (Scaleway SecNumCloud-Meldung, Scaleway Preise Model-as-a-Service), beide gleich, lokal `2d4bbad`, kein Push.
- 6× „fetch failed“: Scaleway security-and-compliance + subprocessorlist, zwei Seeweb-Zertifikat-PDFs, Swiss Made Software, T-Cloud-Testat-PDF. Das Archiv drosselt weiter. 62 Quellen offen, nächster Stapel nach ≥ 30 min, `--anzahl 8`.
- Gmail: Der BvD-Kontakt aus dem Gespräch vom 08.10. hat kurz geantwortet, er meldet sich Anfang nächster Woche (nicht nachfassen).

## Neu 22.10.2026 ~21:00 (Dauerlauf WS1): Wächter-Rohkopien haben jetzt einen Zeitstempel von außen

- `waechter.js` stempelt nach jedem Lauf alle Rohkopien unter `roh/` ohne `.ots` (OpenTimestamps, nur der Fingerabdruck geht raus). Das passiert erst nach dem Ledger: fällt ein Kalender aus, bleibt nur der Stempel offen, der nächste Lauf holt ihn nach.
- `node stempeln.js --nachziehen` holt jetzt auch die Bitcoin-Bestätigung für diese Stempel (unter `waechter/`).
- Die vorhandenen 58 Rohkopien sind gestempelt (38 Hauptliste, 20 Pilot, je 4 von 4 Kalendern). Achtung: Bei Kopien vom 15.–21.10. beweist der Stempel nur „gab es spätestens am 22.10.“.
- Test zuerst (3 rot → grün), 338/338, lokal `ea9ce2b`, kein Push. Nächster Schritt: ZS1 (Fr 23.10. ab 06:00) zieht beide Bestände nach.

## Neu 22.10.2026 ~20:15 (Dauerlauf E22-5 Teil 2, Stapel 18): 536 von 723 Zeilen mit Archivkopie

- 3 Quellen gesichert: Azure SOC 2, Requesty privacy, RvA-Eintrag c096, lokal `bc078c6`, kein Push.
- Requesty privacy: Archivkopie weicht vom Text im Quellenlauf ab (gleich: false) → beim nächsten Quellenlauf ansehen.
- Abgelehnt 5×: Microsoft Privacy-and-Security-Terms (Status 520), Requesty subprocessors + security, Scaleway contracts + data-privacy („fetch failed“). 64 Quellen offen, nächster Stapel nach ≥ 30 min, `--anzahl 8`.

## Neu 22.10.2026 ~20:20 (Dauerlauf GP7): Wächter deckt jetzt alle stampr-Labore ab, Vergleich liegt

- Liste „stampr hat / wir haben / fehlt uns“ privat in `dossiers/us/STAMPR-VERGLEICH-2026-10-22.md`. Kurz: stampr beobachtet 53 Modellkarten von 4 Laboren (Anthropic, OpenAI, Google, Meta) ohne Diff und ohne Käufer; die Modell-Fingerabdrücke sind seit 26.11.2025 pausiert, nur bei gpt-4o/gpt-4.1 laufen noch API-Kennungen.
- Wir sind jetzt bei allen vier Laboren dabei, plus Microsoft. Vorn sind wir bei Gemini 4 Argon (fehlt bei stampr), bei Wort-Diffs (stampr hat nirgends eins) und bei Datenschutz-/AVV-Seiten.
- 9 Seiten neu im Wächter (19 → 28): Karten GPT-6.1 Sol, Claude Opus/Sonnet/Haiku 5.5, Fable 5.1, Muse Wonder, Gemini 3.7 Flash, dazu Anthropic system-cards und transparency. Zweimal abgerufen, gleich, Rohkopien + SHA-256 ok. Gesamtlauf trocken: 26 gleich, OpenAI AVV/Unterauftragnehmer 403 (bekannt).
- Bewusst nicht: Altmodelle, eigene Modell-Fingerabdrücke (API-Schlüssel, Geld, nie versprochen).
- Nächster Schritt: WS1 (Wächter-Rohkopien bei neu/verändert mit OpenTimestamps stempeln, Test zuerst). Tests 335/335, kein Code geändert, nichts zu committen (git-ignoriert), kein Push.

## Neu 22.10.2026 ~20:00 (Dauerlauf EH2): Wächter beobachtet jetzt auch Modell- und Sicherheitsbeschreibungen

- Neun neue Seiten in der privaten Wächter-Liste (`waechter/liste.json`, git-ignoriert, Auswahl dort mit Begründung): je drei bei OpenAI, Google und Microsoft, nämlich System Cards bzw. Modellkarten, die Verzeichnisse dazu (damit eine neue Karte auffällt) sowie Sicherheits- und Transparenzseiten. Gleicher Beleg-Standard: Rohkopie + SHA-256 unter `waechter/roh/2026-10-22/` (Prüfsummen ok), Wortstand als Referenz.
- Vorher zweimal abgerufen: eine Seite (Microsoft „Responsible AI“) liefert bei jedem Abruf ein anderes Zufallskennzeichen und bleibt deshalb draußen (wäre täglich Fehlalarm). Die übrigen neun waren beim zweiten Abruf unverändert.
- Liste jetzt 19 Seiten. Beim Kontrolllauf meldeten die zwei alten OpenAI-Seiten (AVV, Unterauftragnehmer) nur geänderte Menüeinträge („Apps SDK“ → „Plugins“): nicht übernommen, das prüft die Tagesprüfung 23.10.
- stampr-Recherche oben als ÜBERHOLT markiert; stampr wird nie als Beleg genannt.
- Kein Code geändert, Tests 335/335. Nichts zu committen (alles git-ignoriert), kein Push.
- Nächster Schritt dazu: GP7 (Liste „stampr hat / wir haben / fehlt uns“).

## Neu 22.10.2026 ~19:40 (Dauerlauf E22-5 Teil 2, Stapel 17): 531 von 723 Zeilen mit Archivkopie

- 4 Quellen gesichert: OpenAI safety-checks und your-data, Azure content-filter und data-privacy (Microsoft leitet auf `foundry-classic`/`foundry` um, Archiv nimmt die Umleitung), lokal `1ad7507`, kein Push.
- Abgelehnt 4× „fetch failed“: OpenAI pricing, Azure deployment-types, Microsoft C5, Microsoft ISO 27001. Das Archiv drosselt Microsoft wie vorher Google.
- 67 Quellen offen, weiter `node nachsichern.js --anzahl 8`, nach ≥ 30 min Pause.

## Neu 22.10.2026 ~19:00 (Dauerlauf E22-5 Teil 2, Stapel 16): 511 von 723 Zeilen mit Archivkopie

- Die Zahl der Zeilen stieg von 649 auf 723, weil die API-Profile Azure OpenAI, Vertex/Gemini API und OpenAI API (EH1 Teil 2c) dazukamen.
- 3 Google-Cloud-Quellen gesichert (BSI C5, SOC 2, Datenresidenz), lokal `93395cf`, kein Push.
- Achtung: Die Google-Seite `vertex-ai/generative-ai/docs/learn/data-residency` leitet jetzt um auf `docs.cloud.google.com/gemini-enterprise-agent-platform/resources/data-residency`. Beim nächsten Quellenlauf prüfen, ob das Zitat noch auf der neuen Seite steht.
- Abgelehnt 5× (Google Service-Terms, Subprozessoren, Vertex Data-Governance, Abuse-Monitoring: „fetch failed“; Safety-Filter: Zeitüberschreitung). Das Archiv drosselt Google gerade.
- 74 Quellen offen, weiter `node nachsichern.js --anzahl 8`, nach ≥ 30 min Pause; danach die Fehlversuche einzeln nachfassen.

## Neu 22.10.2026 ~18:55 Systemuhr (Dauerlauf EH1 Teil 2c): Azure OpenAI, Vertex/Gemini API und OpenAI API als eigene Profile, lokal, NICHT online

- Drei neue Profile in `data/anbieter/`: `azure-openai` (Kategorie Cloud), `google-vertex-gemini-api` (Cloud), `openai-api` (Modell-Anbieter). DPF wie die Firma (Microsoft/Google ja, OpenAI nein). Katalog jetzt 27 Anbieter, Seite sagt „21 europäische und 6 US-KI-Anbieter“.
- Belegkopien `belege/anbieter/<id>/` (19 / 23 / 12 Kopien) mit QUELLEN.md, SHA256SUMS (alle ok) und OpenTimestamps (55 gestempelt, nachziehen mit ZS1). Azure und Google direkt abrufbar; OpenAI 4 Seiten direkt von developers.openai.com, Rest Wayback-Kopien aus dem ChatGPT-Enterprise-Ordner.
- Zitatprüfung: 95 / 109 / 130 Zitate gegen die Kopien, alle wörtlich (ein Apostroph bei Google berichtigt; „EU-US Certification“ steht im DPF-Beleg unter `belege/rechtsraum/`).
- Registerabgleich ergänzt (`data/register-datenschutz.json`): Azure und Vertex = Konzern im EU Cloud CoC (Dienst ungeklärt), OpenAI kein Eintrag.
- **Für Prüfer wichtig:** (1) Azure „Global“ und Vertex „global endpoint“ geben keine Ortsgarantie, nur Data Zone EU bzw. EU-Endpunkt/Region; Microsoft kann Regionen „without prior notice“ zur Datenzone nehmen. (2) Missbrauchsprotokolle mit Prompts: OpenAI bis 30 Tage, Google bis 90 Tage (Kunden mit Cloud Master Agreement standardmäßig ausgenommen), Azure ohne genannte Frist. (3) Null-Speicherung überall nur auf Antrag/Freigabe; Google-Cache standardmäßig an (bis 24 h, abschaltbar). (4) Grounding mit Google Search ist vom Datenstandort ausgenommen, Logs bis 3 Tage, nicht abschaltbar. (5) OpenAI-Europa-Region nur mit Freigabe + „Modified Retention amendment“, Systemdaten weiter außerhalb.
- Unbelegt: alle Zertifikate nur „beansprucht“ (Login nötig), Backup-Orte, Azure-Unterauftragnehmerliste (Login), Frist der Azure-Missbrauchsprotokolle. Recherche-Notizen privat in `dossiers/us/RECHERCHE-*-2026-10-22.md`.
- Test zuerst (3 rot), dann 335/335, Build streng ok im Klon (27 Anbieter). Lokal `c067e0c`, **kein Push** (Push = Home-Tab über `dossiers/push-sauber.sh`, zusammen mit den drei Assistenten-Profilen).
- **EH1 Save Page Now erledigt 22.10. ~19:30 (`11d1103`):** Von den 30 Seiten hatte der Archiv-Stapel E22-5 schon 13 gesichert, 4 liegen dort in der Wiederholungs-Schlange (Microsoft-DPA-Seite + DOCX, Workspace Service Terms + Subprocessors). Die übrigen 13 sind jetzt im Internet Archive, Links unten in den drei `belege/anbieter/*/QUELLEN.md`. Nächster Schritt: EH2 (System Cards/Safety-Seiten im Wächter).

## Neu 22.10.2026 ~18:20 Systemuhr (Dauerlauf E22-15): Filter-Lücken 255–257 geschlossen, auf main

- **Was:** Der Normenbezugs-Filter erkennt jetzt „AI-Act“ mit Bindestrich und in Zusammensetzungen, dazu DORA, NIS 2, BDSG, TDDDG, TKG, Data Act, Cyber Resilience Act, HIPAA, CCPA, CLOUD Act, FISA, BSIG, eIDAS, ePrivacy, nDSG, Data Governance Act. Web-Adressen („…/dora-info“, „…/eu-ai-act“) zählen nicht.
- **Daten:** 11 Profile ohne Gesetzesnamen im eigenen Text (DeepL, Gcore, GreenPT, Infomaniak, IONOS, Nebius, Nordference, Opper, OVHcloud, Regolo, Requesty). 7 Pflicht-Namen heißen jetzt „… zu den EU-Regeln für KI“, DeepLs Zertifikatstyp „HIPAA“ heißt „Gesundheitsdaten-Zusage (USA)“. Wörtliche Zitatfelder bleiben unverändert.
- **Änderungsprotokoll:** `AI_ACT_FRUEHERE_NAMEN` / `ZERT_FRUEHERE_NAMEN` in `lib/aenderungen.js` ordnen alte Namen den neuen zu; das Umbenennen erzeugt keinen Eintrag (nach Commit + Build geprüft).
- Die alten Zweige `vorschlag-234b/256/257` (10.10.) sind damit überholt, nicht mergen (Daten 12 Tage alt).
- Tests 332/332, Build streng ok (24 Anbieter). Lokal `117db54` auf main, **kein Push** (Push = Home-Tab, zusammen mit dem Rest).

## Neu 22.10.2026 ~17:45 (Dauerlauf EH3 + E22-8): Entwurf Startseite für Prüfer und DSB liegt als Vorschau

- **Ansehen:** `entwurf-startseite/index.html` im Browser öffnen (Bild: `entwurf-startseite/vorschau.png`, heute zum Vergleich `vorher.png`). Neu bauen: `node entwurf-startseite.js` (nimmt die gebaute `docs/index.html`, tauscht nur den oberen Kasten).
- **Inhalt:** Kopfzeile „Für Datenschutzbeauftragte, Prüfer und Kanzleien“, Satz „Sie prüfen KI-Anbieter für Ihre Kunden? Wir sammeln die Belege und halten sie aktuell.“, drei Schritte (sammeln, sichern, melden), „Sie bewerten und zeichnen. Wir nicht.“, Knopf „Preise und Ablauf“ → /fuer-kaeufer/. Die Anbieter-Tabelle darunter bleibt wie heute.
- **Wächter-Beispiel (Frage 513, Felix: kein Fall):** GPT-6-Astra-System-Card, Deckblatt-Datum in allen 5 Fassungen „2026-09-03“; 03.09. 117 Seiten vs. 30.09. 175 Seiten, beide SHA-256 und Wayback-Links aus `dossiers/us/gpt6-card/BELEG-…`. Ausdrücklich „kein Vorwurf, OpenAI protokolliert offen“.
- Nicht live, nicht im Build: Ordner `entwurf-startseite/` ist git-ignoriert, `noindex,nofollow`. Lokal `8b92465`, Tests 321/321.
- **Offen = Felix (Frage 521):** So übernehmen (dann baut der Dauerlauf es in `seiteIndex` ein, Push = Home-Tab)?

## Neu 22.10.2026 ~17:40 (Dauerlauf E22-6, Frage 500): Jeder Beleg hat jetzt einen Zeitstempel von außen

- **Ablauf ab jetzt:** Nach jedem neuen Beleg unter `belege/` einmal `node stempeln.js`. Es legt `<datei>.ots` daneben (OpenTimestamps, kostenlos, kein Konto). Raus geht nur der Fingerabdruck mit Zufallszusatz, nie der Inhalt. Von Git ignorierte Dateien (Text-Auszüge, b64) bekommen keinen Stempel.
- **Nachsicherung:** 237 vorhandene Belege gestempelt, 4 von 4 Kalendern haben geantwortet. Beweis für die alten Belege: „gab es spätestens am 22.10.2026“. Lokal `b07a753`, kein Push.
- **Bestätigung nachziehen:** Die Stempel warten noch auf den Bitcoin-Block (normal, dauert Stunden). Ab Fr 23.10. `node stempeln.js --nachziehen` (Aufgabe ZS1 in ALLEIN).
- `ots`-Programm startet unter Windows nicht (python-bitcoinlib findet OpenSSL nicht). Darum `ots_stempel.py` mit der OpenTimestamps-Bibliothek; prüfen kann jeder mit dem offiziellen `ots verify` oder auf opentimestamps.org.
- Offen, braucht Push = Home-Tab: ein Satz auf der Methodik-Seite („Jede Belegkopie ist mit OpenTimestamps gestempelt, .ots liegt daneben im Repository“). Noch nicht geschrieben.
- Tests 316/316.

## Neu 22.10.2026 ~17:50 (Dauerlauf E22-5 Teil 2, Stapel 13–14): 476 von 649 Zeilen mit Archivkopie

- 9 Quellen gesichert in zwei Teilläufen (Exoscale ×3, Hetzner ×2, IAS-Zertifikat, Infomaniak ×2, OVHcloud), lokal `f04bd8a`/`c9dd166`, kein Push.
- Abgelehnt 7× „fetch failed“ (Hetzner Subunternehmer, Infomaniak ISO-PDFs + Preise, IONOS AVV, Microsoft DPA ×2). Das Archiv drosselt gerade; im zweiten Teillauf gingen nur 3 von 8 durch.
- Archiv ≠ Quellenlauf bei Exoscale CSA-STAR/DPA/Terms und OVHcloud Verträge (beim nächsten Quellenlauf ansehen).
- 57 Quellen offen, weiter `node nachsichern.js --anzahl 8`, nach einer Pause (≥ 30 min), noch ~4 Läufe; danach die Fehlversuche einzeln nachfassen.

## Neu 22.10.2026 ~17:20 (Dauerlauf E22-5 Teil 2, Stapel 12): 450 von 649 Zeilen mit Archivkopie

- 10 Quellen gesichert in zwei Teilläufen (Scaleway, Infomaniak B Corp, DAkkS ×3, DeepL ×3, Exoscale ×2), lokal `5a2786a`/`3e25dd2`, kein Push.
- Abgelehnt 6×, fast alle „fetch failed“ (DeepL, DAkkS, Exoscale; DQS Status 520), rücken ans Ende. Archiv ≠ Quellenlauf bei drei DeepL-Seiten und Exoscale on-demand.
- 69 Quellen offen, weiter `node nachsichern.js --anzahl 8`, noch ~5 Läufe; danach die Fehlversuche einzeln nachfassen.

## Neu 22.10.2026 ~16:25 (Dauerlauf E22-5 Teil 2, Stapel 8): 302 von 649 Zeilen mit Archivkopie

- 16 Quellen gesichert (Microsoft EU Data Boundary, Mistral AGB/AVV/Datenschutz, Lyceum, Nebius Trust Center inkl. CSA STAR/ISO 42001/SOC 2, Nordference), lokal, kein Push.
- Archiv ≠ Quellenlauf bei Lyceum `magazine/c5-certification-gpu-cloud-germany/` (Blogartikel, beim nächsten Quellenlauf ansehen); Microsoft-Seite ohne Textvergleich.
- 110 Quellen offen, weiter `node nachsichern.js --anzahl 8`.

## Neu 22.10.2026 ~16:10 (Dauerlauf E22-5 Teil 2, Stapel 7): 237 von 649 Zeilen mit Archivkopie

- 14 Quellen gesichert (Mistral-Hilfe, Aleph Alpha auf Hugging Face, Google Workspace, Microsoft Learn/Copilot), lokal `b1bf1ba`, kein Push.
- Abgelehnt: zwei OpenAI-Hilfeseiten (Compliance API, Data Residency), Archiv antwortet mit Status 520.
- Archiv ≠ Quellenlauf bei Kolibri-1 und Pharia-1-Embedding (Hugging Face). Beim nächsten Quellenlauf prüfen, ob sich eine Angabe geändert hat.
- 126 Quellen offen, weiter `node nachsichern.js --anzahl 8`.

## Neu 22.10.2026 ~16:00 (Dauerlauf E22-5 Teil 2, Stapel 6): 212 von 649 Zeilen mit Archivkopie

- 7 Quellen gesichert (Gcore Blog/Whisper/Legal/Presse, GreenPT privacy/sustainability/terms), `greenpt.com/privacy-policy` fetch failed.
- Bei den drei GreenPT-Seiten ist der Inhalt der Archivkopie **anders** als beim Quellenlauf (gleich: false). Passt zu GreenPTs Antwort vom 22.10. (will die Seiten ändern, Inhalt in `outreach/gespraeche/PRIVAT-NOTIZEN.md`). Nächster Quellenlauf zeigt, ob sich die Angaben geändert haben.
- 140 Quellen offen, weiter `node nachsichern.js --anzahl 8`.

## Neu 22.10.2026 ~15:55 (Dauerlauf): Zwei Antworten auf die Berufsrecht-Anfrage

- Zwei Antwort-Entwürfe liegen, Fragen 519/520 in ALLEIN.md. Inhalt nur in `outreach/gespraeche/PRIVAT-NOTIZEN.md` (privat).

## Neu 22.10.2026 ~15:45 (Dauerlauf E22-5 Teil 2, Stapel 5): 191 von 649 Zeilen mit Archivkopie

- 8 Quellen gesichert (Requesty EU-Routing/Guardrails/Quickstart, HDS-Liste esante.gouv.fr, EUrouter DPA/Modelle/Datenschutz, Hetzner BSI-C5-Testat).
- Bei 4 davon weicht die Kopie vom Prüfstand ab (HDS-Liste, alle drei EUrouter-Seiten, die jetzt auf www. umleiten). Das Dossier sagt das schon von selbst („Text weicht vom Prüfstand ab“); der nächste Quellenlauf zeigt, ob sich wirklich etwas geändert hat.
- Nächster Lauf: wieder `node nachsichern.js --anzahl 8`, 147 Quellen offen.

## Neu 22.10.2026 ~15:35 (Dauerlauf E22-5 Teil 2, Stapel 4): 163 von 649 Zeilen mit Archivkopie

- 7 Quellen gesichert (T-Systems Enterprise-Trust, Mistral ZDR/Preise/Large 4, Nebius DPA + Unterauftragnehmer, OVHcloud HDS), alle Kopien gleich dem Quellenlauf.
- Nicht gesichert: Nebius Token-Factory (Netzfehler), rückt ans Ende.
- Nächster Lauf: wieder `node nachsichern.js --anzahl 8`, 155 Quellen offen.

## Neu 22.10.2026 ~15:25 (Dauerlauf E22-5 Teil 2, Stapel 3): 143 von 649 Zeilen mit Archivkopie

- 11 Quellen gesichert (bfl.ai, DAkkS-Urkunden, GreenPT-Doku, Hetzner, IONOS-Doku u. a.), alle Kopien gleich dem Quellenlauf.
- Nicht gesichert: IONOS AI Model Hub + Zertifikate (3. Mal „kein Snapshot“), zwei EU-Kommissions-Seiten (Status 520), T-Systems LLM-Hub-Doku (Netzfehler).
- Neu: Fehlversuche je Quelle in `data/quellen-archiv-fehlversuche.json`; solche Quellen rücken ans Ende und blockieren keinen Stapel mehr. Wer dauerhaft scheitert, braucht die eigene Kopie aus E22-6. Tests 310/310, lokal `867d759`.
- Nächster Lauf: wieder `node nachsichern.js --anzahl 8`, 168 Quellen offen.

## Neu 22.10.2026 ~15:05 (Dauerlauf E22-5 Teil 2, Stapel 2): 80 von 649 Zeilen mit Archivkopie

- Zwei Teilläufe (`--anzahl 15` brach nach 9 Quellen am 10-Minuten-Rahmen ab, dann `--anzahl 8`): 15 Quellen gesichert, Stand **80/649**, 177 Quellen offen. Lokal committet, kein Push.
- Abgelehnt: cloud.ionos.de/managed/ai-model-hub und cloud.ionos.de/zertifikate („kein Snapshot“, live 200) → eigene Kopie + OpenTimestamps (E22-6). Sie stehen vorn in der Liste und werden bei jedem Lauf neu versucht (kostet ~1 min); bfl.ai EU-API-Bedingungen ging diesmal durch.
- Drei Google-Cloud-Kopien ohne Textvergleich (`gleich: null`, Rohkopie nicht lesbar), Kopie zählt trotzdem.
- Nächster Lauf: `node nachsichern.js --anzahl 8` (passt in 10 Minuten), ~22 Läufe bis alle durch.

## Neu 22.10.2026 ~15:30 (Dauerlauf E22-5 Teil 2, Stapel 1): Jede Dossier-Quelle bekommt eine Archivkopie

- Neu: Ablage `data/quellen-archiv.json` (je Quelle Wayback-Kopie, Datum, ob der Text der Kopie dem Hash des Quellenlaufs gleicht). Das Dossier nimmt die Kopie, wenn kein Fall eine liefert; weicht der Text ab, steht „Kopie vom …, Text weicht vom Prüfstand ab“ neben dem Link.
- Skript `node nachsichern.js [--anzahl 15] [--pause 20]` sichert die nächsten Quellen ohne Kopie (Save Page Now), schreibt nach jeder Quelle, macht beim nächsten Lauf weiter; `--zaehlen` gibt nur den Stand.
- Test zuerst (`test/quellen-archiv.test.js`, 6 Tests, erst rot), **308/308**. Lokal `502e295`, **kein Push**. Seite unverändert (Dossiers sind privat).
- Stand: **45 von 649** Angaben-Zeilen mit Kopie (vorher 27); 11 Quellen gesichert, 187 offen. Drei Kopien sind vom Archiv selbst schon da gewesen (04.–13.10.), Text gleich.
- Auffällig: aleph-alpha.com/datenschutz Text der Kopie ≠ Hash vom Quellenlauf (Seite geändert? Quellenlauf prüft nachts). bfl.ai/legal/eu-api-service-terms: Archiv lehnt ab (404), live 200 → eigene Kopie + OpenTimestamps (E22-6).
- Nächster Lauf: weiter mit `node nachsichern.js --anzahl 15`, ~13 Stapel bis alle durch. Danach Dossiers neu erzeugen, dann starker Satz zurück (Test zuerst).

## Neu 22.10.2026 ~14:50 (Dauerlauf E22-5 Teil 1): Käuferseite ehrlich

- `/fuer-kaeufer/` sagt jetzt: „Prüfsumme des gelesenen Texts und, wo vorhanden, Archivkopie (bei Bestellung sichern wir jede Quelle des Dossiers im Internet Archive)“. Vorher stand dort „SHA-256 der Quelle und Archivkopie“ für jede Angabe; das hatten nur 13 von 314.
- Test zuerst (`test/kaeuferseite-zusage.test.js`, erst 2 rot), danach 302/302, Build streng ok, nur die Käuferseite geändert. Lokal `432c661`, **kein Push** (Push = Home-Tab über `dossiers/push-sauber.sh`).
- Offen (Teil 2, nächste Läufe): alle 314 Dossier-Quellen nachsichern (Wayback mit Pausen, sonst eigene Kopie + OpenTimestamps), Zählung in `MESSUNG.md` (Start 13/314). Bei 100 % kommt der starke Satz zurück.

## Neu 22.10.2026 ~14:20 Systemuhr (Dauerlauf): GreenPT hat die Ortsfrage zu den Ärzte-/Anwaltsseiten beantwortet

- Antwort kam 22.10. auf die Fachfrage 19a (Inhalt in `outreach/gespraeche/PRIVAT-NOTIZEN.md`). Kurz: Speicherort Frankreich, Rechnen auch in Finnland, beides EU; GreenPT will die zwei Seiten ändern.
- Im Profil als Auskunft mit Datum ergänzt (Feld Subprozessoren, wie die Auskunft vom 13.10.). Tests 299/299, Build streng ok, lokal committet, **nicht gepusht** (Push = Home-Tab).
- Nächster Schritt: Quellenlauf merkt, wenn GreenPT die Seiten ändert; dann Satz „Stand 22.10. noch unverändert“ im Profil streichen. Kein Fall, keine Frage an Felix.

## Neu 22.10.2026 ~14:20 (Dauerlauf BH1): Berufshaftpflicht-Anfrage hat einen Empfänger

- Der Entwurf fragt nach dem Produkt „Pro Media“, also an den Versicherer, der es anbietet (Adresse von dessen Produktseite, abgerufen 22.10.). Text unverändert.
- Wartet auf Felix: ein Wort „senden“ (ALLEIN Frage 517), dann sendet die Maschine.

## Neu 22.10.2026 13:57 Systemuhr (Dauerlauf E22-4, Felix „ja“ zu 438 + 441): Auditor-Vorschlag A komplett + Feld „Datenschutz-Nachweis laut Register“

- **Seite:** Spalte heißt „Kein Training“ (mit Erklärung: Opt-out zählt nicht), Filter „nur AVV, Subprozessoren und ‚kein Training‘ belegt“, Kommunen-Texte und Profil-„nein“ ohne „Trainings-Opt-out“; Methodik erklärt, dass ein Opt-out nicht reicht und wir Art. 28 nicht prüfen.
- **Mistral:** „kein Training“ jetzt unbelegt (nur Opt-out, Voreinstellung ungeklärt, Preview-Modelle ohne Opt-out). Steht im Änderungsprotokoll/Feed. Mistral fällt aus dem Belegt-Filter. Mistral-Dossier widerspricht sich nicht mehr, darf wieder als Gratis-Dossier raus.
- **Guides:** Zertifikate („ISO 27001 kein Nachweis, nur Art. 42/43 und 40/41“), Kommunen („Untergrenze (Informationssicherheit, kein Datenschutz-Nachweis)“), DSGVO-Guide (Training per Art. 28 Abs. 3 lit. a ausgeschlossen; Ein-Stunden-Formel ersetzt).
- **Neues Feld** im Profil unter „Vertrag & Datenschutz“: „Datenschutz-Nachweis laut Register (Art. 40–43 DSGVO)“, Daten in `data/register-datenschutz.json`, Code `lib/register.js`. EU Cloud CoC und CISPE am 22.10. neu gelesen (gleicher Befund wie 19.10.). Ergebnis: OVHcloud und T-Systems „nur Selbstangabe, nicht im Register“, Regolo „Mutterfirma (Seeweb) im Register, dieser Dienst nicht“, **neu: Google und Microsoft „Konzern im Register (EU Cloud CoC für cloud.google.com / azure.com), dieses Produkt ungeklärt“** (welche Dienste erklärt sind, steht nur im Prüfbericht-PDF, nicht gelesen), alle übrigen „kein Eintrag gefunden“.
- **Dossier:** Unter der Prüfpunkt-Tabelle ein Satz zu ISO 27001 und eine Registerzeile, beides **ohne Gesetzesverweis** (Regel 18.09.: kein Normenbezug im Dossier, sonst Rechtsdienstleistung). Der Satz aus dem Vorschlag („… im Sinne der DSGVO (Art. 40/41 …)“) wäre am Normenbezugs-Filter hängen geblieben; jetzt: „Der Prüfpunkt ‚ISO 27001 belegt‘ sagt nur etwas über Informationssicherheit. Ob der Anbieter in einem Register … steht, zeigt die nächste Zeile.“
- Alle 24 Dossiers neu: `dossiers/*-2026-10-22.md` (privat). Normenbezugs-Funde je Dossier gleich wie am 21.10. (nur die alten „AI Act:“-Feldnamen). US-Dossiers unter `dossiers/us/` nicht neu erzeugt.
- Test zuerst `test/auditor-hinweise.test.js` (11 Tests), **299/299**, Build streng ok (24 Anbieter). Lokal `2166db4` + `f0f453c`, **nicht gepusht** (Push = Home-Tab).
- Offen (nicht beschlossen): OVHcloud „wirbt mit Kodex, nicht im Register“ als Fall? Nur nach Felix. Google/Microsoft: Prüfberichte lesen, ob Gemini für Workspace / Microsoft 365 Copilot erklärt sind.

## Neu 22.10.2026 ~14:05 (Dauerlauf E22-3): sechs Fachfragen als Entwurf, Felix sendet von hallo@

- Sechs Gmail-Entwürfe zu den Widersprüchen der Scans vom 22.10.: GreenPT (Robert, Ärzte-/Anwaltsseiten vs. finnische Partner), DeepL (Dokumente nur EWR?), Aleph Alpha (Kolibri-API speichert?), Nebius (Finnland oder „Global“?), EUrouter (was speichert das einschaltbare Logging?), Gcore (SOC 2 Type I oder II?). Liste mit Entwurf-IDs: `outreach/mails/19-fachfragen-widersprueche-2026-10-22.md`.
- Alle Zitate am 22.10. ~13:55 live nachgeprüft, stehen noch. belegbar.eu nur als Text (Frage 490).
- **Nicht gesendet:** Das Mail-Werkzeug hat kein Absender-Feld, die Maschine könnte nur von felix.h.lind@gmail.com senden. Felix wollte hallo@ → **Nur Felix: sechs Entwürfe von hallo@ senden.**
- Antworten prüft die Tagesprüfung; Antwort → Profil-Anmerkung mit Datum.

## Neu 22.10.2026 ~14:00 (Dauerlauf E22-2, Felix „klär das 479“): Was am Veröffentlichen der US-Dossiers heikel ist

- Blatt `recht/US-DOSSIERS-VEROEFFENTLICHEN.md` (privat, `recht/` gitignored): zehn Punkte mit Quellen, keine Rechtsberatung.
- Größte Punkte: „nicht belegbar“ oben kann wie „hat es nicht“ klingen; „Ergebnis: nein“ oben wirkt wie ein Testurteil; gilt die Seite als Werbung, müssen wir die Wahrheit beweisen. Ein bestelltes Dossier an einen Prüfer ist milder gestellt als eine offene Seite.
- Namen für Äußerungs-/Wettbewerbsrecht: WBS Köln (Erstberatung laut Seite kostenlos), Schlun & Elseven Köln (Kosten ungeklärt), Corporate Law Clinic (kostenlos). Preis vorher schriftlich festmachen.
- Offen: Frage 515 im Home-Tab (privat lassen + drei Zustände statt „nicht belegbar“ + öffentliche Fassung ohne Ergebniszeile, dann Erstberatung). Der Satz unten „Veröffentlichung erst nach Rechtsrat (Fr 30.10.)“ ist überholt: am 30.10. nur nach einem Namen fragen.

## Neu 22.10.2026 ~13:35 (Dauerlauf E22-1): Push `d28b2b7` live geprüft, Fall 006 hat „veröffentlicht 22.10.“

- Live (22.10. ~13:30): Startseite, /faelle/, /fuer-kaeufer/ und /faelle/t-systems-not-stored-cache/ alle HTTP 200; /vergleich/ nennt OpenAI, Google, Microsoft. Kurztext von Fall 006 sagt „Abschnitt 2.3.1“, „§“ steht nur noch im Verlauf (Wortlaut der Leistungsbeschreibung, so gewollt).
- Verlauf Fall 006 um „22.10.2026: Fall veröffentlicht (nach Ablauf der Antwortfrist ohne Antwort des Anbieters)“ ergänzt, wie bei 004 üblich. 288/288 Tests. Lokal `9bda794`, **nicht gepusht** (Push = Home-Tab). Vom Build nur Fall-006-Seiten übernommen; Änderungsliste/daten.json/Startseite zurückgesetzt, weil der Build dort auch fremde Einträge umsortiert – beim nächsten Push über push-sauber.sh baut es neu.
- Befund ohne Änderung: Die Fallseite meldet Suchmaschinen `datePublished 2026-10-05` (Tag der Mail an T-Systems), online ist der Fall aber erst seit 22.10. Ungeklärt, ob das Feld bei allen Fällen „eröffnet“ statt „veröffentlicht“ nimmt; bei der nächsten Arbeit am Fall-Bau prüfen.

## Neu 22.10.2026 ~13:20 (Dauerlauf EH1 Teil 2b): Die drei US-Anbieter haben jetzt Belegkopien mit Prüfsumme
- 44 Kopien in `belege/anbieter/{microsoft-copilot,openai-chatgpt-enterprise,google-gemini-workspace}/` (14/15/15), je `QUELLEN.md` (Datei → Quelle) und `SHA256SUMS` (alle ok). Lokal `36a7af0`, kein Push.
- openai.com, help.openai.com und trust.openai.com: direkt 403 oder robots.txt sperrt → Kopien aus dem Internet Archive (Zeitstempel 08.07.–22.10.2026 im Dateinamen). Trust Center zusätzlich als rohes HTML, weil die Zertifikatsdaten in Skript-Blöcken stehen. Archiv-Antworten kommen gepackt (gzip), das Holskript entpackt sie jetzt.
- **Zitatprüfung:** 133 Zitate in den drei Profilen gegen alle Kopien des Anbieters: 127 wörtlich, 4 nur Formatierung (Zeilenumbruch, Leerzeichen vor Punkt, Link-Pfeil), **2 ohne Kopie**: OpenAI Academy („saved indefinitely“, „minimum of 90 days“ in `vertrag.zero_data_retention`), robots.txt sperrt, kein Archiv. Kein Zitat widerspricht der Kopie.
- Viele Profil-Zitate stehen auf Nebenseiten, nicht auf der im Feld `quelle` genannten Seite (z. B. Flex routing auf `copilot-flex-routing`, Gemini-Aufbewahrung im Privacy Hub). Die Nebenseiten sind mitgesichert; das Feld `quelle` ist unverändert.
- **Erledigt 22.10. ~19:30 (siehe oben):** ~~Save Page Now ging nur für 1 von 30 direkt geholten Seiten durch~~ (Flex routing → web.archive.org/web/20261022110713), danach nur Verbindungsfehler. Nachholen mit 60 s Abstand. Liste `~/allein/tmp/eh1b/spn-urls.txt`.
- **Nächster Schritt EH1 Teil 2c:** API-Produkte Azure OpenAI, Vertex/Gemini API, OpenAI API als eigene Profile (eigene Recherche, gleiche Felder).

## Neu 22.10.2026 12:55 Systemuhr (Dauerlauf MX1, Entscheidung Felix 22.10.): Telefonat Fr 30.10. nur Vergabe + zwei Namen
- Der private Spickzettel für Fr 30.10. 17:00 (gitignored) ist gekürzt: Die Vergabe-Fragen für den Kill-Check bleiben (letztes Verfahren, Vertrauensfrage, Ja/Nein, drei Haftungen, Pilot). Die US-Frage ist raus.
- Zu den US-Mustern und zur Kanal-Doku fragt Felix nur nach zwei Namen: jemand für Äußerungs-/Wettbewerbsrecht, jemand für Medizinprodukterecht. Keine Frage zur Sache.
- Damit gilt nicht mehr „Veröffentlichung erst nach Rechtsrat (Fr 30.10.)“ (Abschnitt 21.10. ~14:30): Der Rechtsrat zur Veröffentlichung kommt erst von der Person, deren Name am 30.10. fällt, oder aus einem eigenen Rat. Bis dahin bleiben die US-Muster privat.
- Sicherung der alten Fassung liegt daneben (`.bak-2026-10-22-zwei-namen`, gitignored).

## Neu 22.10.2026 ~12:45 (Dauerlauf GP6, Auftrag Felix 22.10.): GPT-6-Astra-System-Card, fünf Fassungen selbst belegt
- Fünf verschiedene Fassungen des PDF `deploymentsafety.openai.com/gpt-6-astra/gpt-6-astra.pdf` zwischen 03.09. und 30.09.2026 aus dem Web-Archiv geholt, Bytes gegen den Archiv-Digest geprüft, SHA-256 je Fassung; Fassung 5 ist heute (22.10.) noch live.
- Deckblatt-Datum in allen fünf „2026-09-03“. Still ist nur 1→2 (Tabellenüberschrift „Harmful“ → „Misaligned outcomes“) und eine Umformulierung eines alten Protokolleintrags in 4→5; die inhaltlichen Schritte (Alignment 09.09., HealthBench-Korrektur + Anhang Sol/Luna 22.09., Anhang Dots 29.09.) stehen in einem Änderungsprotokoll im PDF.
- Beleg lokal (nicht im Repo): `dossiers/us/gpt6-card/BELEG-gpt6-system-card-2026-10-22.md`. Kein Fall vorbereitet, weil kein Widerspruch; Frage 513 an Felix (Fall ja/nein, Empfehlung: als Wächter-Beispiel nutzen).

## Neu 22.10.2026 ~13:10 (Dauerlauf EH1 Teil 2a): DPF-Teilnahme der drei US-Anbieter belegt, lokal, NICHT online

- Amtliche Liste dataprivacyframework.gov über ihre eigene Schnittstelle abgefragt (robots offen, Liste zuletzt geändert 22.10. 06:00 EST). **Microsoft Corporation** (Id 6474) und **Google LLC** (Id 5780): EU-US Certification „Active“, HR + Nicht-HR, bis 31.08.2027 bzw. 13.09.2027. **OpenAI: 0 Treffer**, weder aktiv noch inaktiv (Suchen „OpenAI“, „Open AI“, „OpCo“, „OpenAI OpCo“). OpenAI nennt selbst SCCs (DPA 4.1, Unterauftragnehmer-Seite).
- Neues Feld `stammdaten.dpf` (status/wert/quelle/geprueft/anmerkung) in den drei Profilen. Anbieterseite, llms-Text und daten.json nennen jetzt den Satz je Anbieter (`rechtsraumHinweis`), die Tabelle „DPF-Teilnehmer“ / „Drittland, nicht im DPF“ (`rechtsraumKurz`), sonst bleibt der allgemeine Satz.
- Belege: `belege/rechtsraum/dpf-2026-10-22/` (6 JSON-Antworten + LIESMICH + SHA256SUMS).
- Test zuerst (5 neue Tests rot), dann 288/288.
- **Für Prüfer wichtig:** Bei OpenAI greift der Angemessenheitsbeschluss nicht; das ist ein echter Unterschied zu Microsoft und Google.
- **Noch offen aus EH1 Teil 2:** (1) Hashes/Belegkopien der übrigen US-Quellen (Wayback gab am 22.10. ~13:00 HTTP 429, nicht weiter versucht); (2) API-Produkte Azure OpenAI, Vertex/Gemini API, OpenAI API als eigene Profile.

## Neu 22.10.2026 ~12:40 (Dauerlauf EH1 Teil 1, Felix Home-Tab 22.10. „jetzt bauen lassen“): drei US-Anbieter im Katalog, lokal, NICHT online

- Microsoft Copilot, OpenAI ChatGPT Enterprise und Google Gemini für Workspace stehen jetzt in `data/anbieter/` (aus den privaten Profilen vom 21.10., gleiche Felder wie die 21 EU-Anbieter). Neue Kategorie „KI-Assistent (Unternehmen)“. Der Satz „PRIVATES Muster“ ist raus, sonst inhaltlich unverändert.
- An die strengen Regeln angepasst: ISO 42001 bei allen dreien „beansprucht“ mit Wert ja und eigenem Zertifikatseintrag; Zertifizierer, Akkreditierung und (bei OpenAI) Geltungsbereich „unbelegt“, weil die Zertifikate nur hinter Login liegen.
- **USA eigener Rechtsraum:** Kommissionsseite am 22.10. neu abgerufen: „the United States (commercial organisations participating in the EU-US Data Privacy Framework)“, Beschluss 10.07.2023. Die Seite zeigt „Drittland. Beschluss gilt nur für DPF-Teilnehmer …“ statt „Drittland ohne Beschluss“. Ob die drei Firmen am DPF teilnehmen: noch nicht geprüft (steht so auf der Seite). Beleg `belege/rechtsraum/adequacy-decisions-2026-10-22.html` + SHA256SUMS. Rechtsraum-Angaben aus `build.js` nach `lib/rechtsraum.js` verschoben (testbar), Prüfdatum Angemessenheit 22.10.
- **Zählsätze:** „24 europäische KI-Anbieter“ wäre falsch gewesen; neun Stellen schreiben jetzt über `anbieterZahl()` „21 europäische und 3 US-KI-Anbieter“. Titel wie „Evidenz-Datenbank europäischer KI-Anbieter“ unverändert (Felix fragen, wenn die Startseite neu gemacht wird, EH3).
- Test zuerst `test/us-anbieter.test.js` (7 Tests), 283/283, Build streng ok (24 Anbieter, 79 Vergleiche).
- **Offen (EH1 Teil 2+):** (1) Hashes/Belegkopien für die US-Quellen (viele nur als Wayback, direkt 403); (2) die API-Produkte, die Felix nennt: Azure OpenAI, Google Vertex/Gemini API, OpenAI API; (3) DPF-Teilnahme der drei Firmen auf dataprivacyframework.gov prüfen; (4) Wächter auch auf System Cards/Safety-Seiten (EH2).
- **Frage an Felix:** US-Anbieter so online stellen? Push nur über `dossiers/push-sauber.sh`.

## Neu 22.10.2026 ~21:50 (Dauerlauf Laufend): Widerspruchs-Scan Lyceum, Rechtsseite sagt „nie geloggt“, der eigene DPA kennt vier Ausnahmen

- Frage: Sagen andere Lyceum-Seiten etwas anderes als das Profil (Ort, Speicherung, Training, Zertifikate, Vertragspartner)? Erster Scan bei Lyceum. Abruf 22.10. ~21:40, curl: Startseite, `/models/`, `/legal/`, `/legal/terms` (Stand „October 2026“, inhaltlich gleich wie 16.10.), `/legal/privacy`, `/trust/`, C5-Artikel, Artikel „EU Data Residency“ („Last updated 20 October 2026“), Doku `llms-full.txt`. Rohseiten in `~/allein/tmp/lyc1022/` (nicht im Repo). DPA = Fassung aus dem Trust Center vom 09.10. (Rohkopie liegt).
- **Widerspruch (Werbung gegen Vertrag):** Rechtsseite `lyceum.technology/legal/`: „Never recorded“, „We never log them or write them to a database, so there’s nothing to open“, „We never stored them, so there’s nothing to return“; Startseite: „Prompts and outputs are processed, not stored. Nothing is written to disk.“ Der eigene DPA, Schedule 1, 2.2, erlaubt das Aufbewahren von Kundeninhalten für Rechtspflichten, Betrugs-/Missbrauchserkennung, Cybersicherheit und Stabilität (2.3: „minimum period strictly necessary“, keine Frist). Gleiches Muster wie Scaleway. Profil stand schon richtig („Zusage mit vier Ausnahmen“), nur Anmerkung ergänzt.
- **Neu, kein Widerspruch:** zweiter Vertragspartner „Lyceum Switzerland GmbH“; Team mit Zugriff auf Kontodaten, Nutzungsdatensätze und System-Logs sitzt in Berlin und Zürich (Schweiz außerhalb EU/EWR, mit Angemessenheitsbeschluss). Der DPA vom 09.10. nennt nur die deutsche GmbH. Orte für Dedicated und GPU-VMs „agreed per contract“, fest sind nur Serverless Paris + Finnland. Ehrlich genannt: der Anfang neuer Prompts bleibt als Cache im GPU-Speicher. Anmerkung beim AVV.
- Kleiner, kein Fall: Batch-Schnittstelle der Dedicated-Inferenz lädt JSONL-Dateien hoch (`POST /files`) – das ist mit „Nothing is written to disk“ schwer vereinbar, aber nur Dedicated und durch AGB 5.2 „technically necessary“ gedeckt. AGB 3.4 erlaubt „third-party hardware and/or data centres“ ohne Ortsgrenze, die Startseite sagt „Two pins, and that’s all of them“ (nur Serverless gemeint).
- Ohne Widerspruch: Training nirgends, Zertifikate überall „ISO 27001 audit in progress“ (kein C5, kein SOC 2), Unterauftragnehmer-Liste weiter nur auf Anfrage, Paris + Finnland auf allen Seiten.
- Belegkopien `belege/anbieter/lyceum/legal-datenhandling-2026-10-22.txt`, `startseite-2026-10-22.txt`, `magazin-eu-data-residency-2026-10-22.txt` + SHA256SUMS (7/7 ok) + OpenTimestamps. Archivkopien am 22.10. abgelehnt (Archiv 520, drosselt wie bei E22-5) → beim nächsten Nachsichern-Stapel mit. Profil: zwei Anmerkungen, kein Status, kein Preis. 338/338 Tests, Build streng ok (27 Anbieter, Ausgabe zurückgesetzt), lokal `136b063`, kein Push. Keine Frage.
- Noch nie gescannt: Nordference (nur 14.10. geklärt), Opper, Regolo, Requesty, T-Systems.

## Neu 22.10.2026 ~11:58 (Dauerlauf Laufend): Widerspruchs-Scan Gcore, drei Abrechnungsarten und SOC 2 „Type II“ in der Werbung

- Erster Scan bei Gcore. Abruf 22.10. per Unteragent, curl mit 3 s Abstand, robots.txt beachtet (gesperrt u. a. `/*?tab=`, `/*.pdf`): rund 30 Seiten gcore.com + 10 Doku-Seiten HTTP 200, Unterauftragnehmer-PDF unverändert (gleicher Hash). Nicht abrufbar: DPA-, Datenschutz-, AUP-Tab (nur `/legal?tab=`, gesperrt), Trust Center (nur JS). Rohseiten `~/allein/tmp/ws1022g/` (nicht im Repo). Kernzitate selbst an den Rohseiten nachgeprüft.
- **Widerspruch 1 (Abrechnung):** /everywhere-inference „per-second GPU billing“, /pricing/ai „measured down to the minute“, Doku „Resources are charged per minute.“, Modellseiten „Pay a fixed monthly GPU rental fee instead of per-minute transcription costs.“ Anmerkung bei Whisper.
- **Widerspruch 2 (SOC 2):** /european-digital-sovereignty „AUDIT-READY ISO 27001 & SOC 2 Type II certification“; Trust Center am 09.10. nur „SOC 2 Type 1“, /secure-infrastructure nennt SOC 2 gar nicht. Anmerkung beim Zertifikat, Status bleibt „beansprucht“.
- **Widerspruch 3 (Daten bleiben):** Modellseiten „Your data never leaves our secure infrastructure.“ gegen MSA 8.4 „… transfer Customer Content and/or Customer Data, including to entities located in countries outside the EEA“; /european-digital-sovereignty „No third party in the underlay.“ gegen MSA 2.2 („does not own or control all local circuit links, leased co-location spaces …“). Anmerkung bei zero_data_retention.
- **Profil berichtigt/ergänzt:** Whisper „konkrete Raten nicht öffentlich“ war zu streng (/pricing/ai nennt Stundenpreise, z. B. „1×L40S … €1.08“); LLaMA Pro 8B und Mistral 7B stehen nicht mehr im Doku-Katalog (Beleg nur Pressemitteilung 06.06.2024), buchbar heute: ungeklärt; Mistral-Seite sagt „the model doesn't include built-in moderation mechanisms“ (Anmerkung beim Filter, Status bleibt).
- Weich, ohne Profiländerung: Standorte „180+“ / „over 210 PoPs“ / „five dedicated EU regions“; Ausfall-Weiterleitung „to the next-closest inference region“ ohne Aussage, ob sie die gewählten Regionen verlässt (ungeklärt); HIPAA nur auf Modellseiten; ISO 27001:2013 auf /infrastructure (schon im Profil); Platzhalter-Testimonial auf der Souveränitätsseite; Speicherangaben „4×A100 240 GB“ rechnen nicht; Everywhere AI rechnet seit 24.03.2026 nach Tokens (anderes Produkt).
- Unverändert: MSA „Last updated: June 17, 2026“, Klauseln 7.2/8.3/8.4/9.5.3/16.3 wörtlich wie im Profil, Sitz Contern, kein Trainingsausschluss, keine ZDR-Zusage.
- Belege `belege/anbieter/gcore/*-2026-10-22.*` (7 Dateien) + SHA256SUMS (alle ok). 276/276 Tests, Build streng ok im Klon, lokal `c805b81`, kein Push.
- **Frage an Felix (511):** Gcore kurz fragen, ob SOC 2 Type II wirklich vorliegt? Empfehlung: ja, Fachfrage über hallo@, niedrig, mit 502/506/507/509 bündeln.
- Noch nie gescannt: lyceum, nordference, opper-ai, requesty, t-systems, regolo.

## Neu 22.10.2026 11:22 Systemuhr (Dauerlauf Laufend): Widerspruchs-Scan EUrouter, FAQ kennt ein Mitschreiben, das DPA und AGB nicht kennen

- Frage: Sagen andere EUrouter-Seiten etwas anderes als das Profil? Erster Scan bei EUrouter. Abruf 22.10. per Unteragent, curl mit 3 s Abstand, robots.txt beachtet (gesperrt nur /admin/, /api/, /dashboard/, /sign-in/, /sign-up/ auf www), rund 45 Seiten HTTP 200 plus `api.eurouter.ai/api/v1/models` (157 Modelle) und `/providers` (17). Nicht vorhanden (404): /security, /trust, /compliance, /blog. Rohseiten in `~/allein/tmp/ws1022e/` (nicht im Repo). Kernzitate selbst an den Rohseiten nachgeprüft.
- **Widerspruch 1 (Speicherung):** FAQ und Startseite: „We never store request bodies unless you explicitly enable logging, and you can disable it per key.“ und „By default we store only minimal metadata needed for billing and observability. You control retention and redaction policies in the dashboard.“ DPA Ziffer 10 und AGB versprechen Zero Retention ohne Ausnahme und nennen kein einschaltbares Logging; die Datenschutzerklärung nennt feste Fristen (12 Monate / 90 Tage). Dazu Doku „Broadcast“ (Beta): Traces mit „Request and response data -- the input messages and model output“ an vom Kunden gewählte Ziele. Was beim Einschalten gespeichert wird, wo und wie lange: ungeklärt. Anmerkung bei zero_data_retention, Status bleibt „belegt“ (Standard ist weiter Zero Retention).
- **Widerspruch 2 (EU):** FAQ „We ensure that no data leaves the European Union“, AGB „European Union or the European Economic Area“, DPA 5 „European Economic Area“; DPA-Liste zu Better Stack „EU-US Data Privacy Framework or Standard Contractual Clauses where applicable“, Datenschutz „Some of these third parties are located outside the European Economic Area“. Betrifft laut DPA EUrouters eigene Diagnose- und Kundendaten, nicht die Anfrage-Inhalte. Anmerkung bei subprozessoren.
- **Nebul:** Providerseite „no retention beyond operational needs“ neben dem Abzeichen „Zero data retention“; DPA-Liste „No prompt retention / no training“. Lyceum-Seite nennt „EU, UK, and US inference regions“, DPA „EU/EEA configurations only“ (kein harter Widerspruch, welche Region EUrouter nutzt, ungeklärt).
- **Eigener Fehler berichtigt:** Das Profil sagte fünfmal „Eine Region „EU-West“ wird nicht genannt.“ Die Startseite zeigt sie im Dashboard-Bild („Compliance: Active Region: EU-West“); Satz angepasst.
- **Währung:** Doku „Credits“: „All costs are calculated in EUR … daily ECB exchange rate.“ Modellseiten zeigen $, die API führt 107 Modelle in USD und 50 in EUR. Anmerkung bei Gemma 4; die Felder `preis_*_eur` tragen weiter die $-Werte der Seite (wie bisher vermerkt).
- Kleinigkeiten ohne Profiländerung: Modellzahl „100+“ / „120+“ / „157“ auf verschiedenen Seiten; Modellzahl je Provider weicht zwischen Providerseiten, /providers und API ab; neu in der DPA-Liste Phare.io (Statusseite).
- Unverändert: DPA „Last updated: May 2026“, Liste „9 October 2026“, Datenschutz 1.3, AGB „June 2026“, 17 Provider (2 mit US-Sitz), Preise der 5 Profil-Modelle Seite = API, kein Training, Response Healing einziges Plugin und aus, alle Modelle `is_moderated: false`, keine Zertifikate.
- Belege `belege/anbieter/eurouter/faq-2026-10-22.html`, `credits-doku-2026-10-22.md`, `provider-nebul-2026-10-22.txt`, `startseite-2026-10-22.txt` + SHA256SUMS (alle ok). Kein Wayback in diesem Lauf. 276/276 Tests, Build streng ok (in einem Klon), lokal committet, kein Push.
- **Frage an Felix (509):** EUrouter kurz fragen, was beim eingeschalteten Mitschreiben gespeichert wird? Empfehlung: ja, Fachfrage über hallo@, niedrig, mit 502/506/507 bündeln.
- Noch nie gescannt: gcore, lyceum, nordference, opper-ai, requesty, t-systems.

## Neu 22.10.2026 ~11:00 (Dauerlauf Laufend): Widerspruchs-Scan Exoscale, On-Demand „kommt bald“ gegen Doku und Endpunkt, die schon da sind

- Frage: Sagen andere Exoscale-Seiten etwas anderes als das Profil? Erster Scan bei Exoscale. Abruf 22.10. ~08:45–08:57 UTC, curl mit 3 s Abstand, robots.txt erlaubt alles außer `/register/` (community: außer `/community/open-source/`, `/vendor/`), 31 Seiten alle HTTP 200 (KI-Produktseiten, AGB, DPA, Datenschutz, Compliance-Seiten, GPU-Seiten, fünf Blogbeiträge, Concrete-AI-Doku, llms.txt, Preise). Rohseiten in `~/allein/tmp/ws1022x/` (nicht im Repo).
- **Widerspruch (On-Demand Inference):** Die Produktseite `/ai-cloud-infrastructure/inference/on-demand/` sagt weiter „Coming soon“, „Join the Waitlist“ und „planned“. Die Übersichtsseite `/inference/` beschreibt den Dienst ohne Einschränkung („Call a curated catalog of production-ready models through a pay-per-token API“; FAQ: „All Inference workloads run in European and Swiss data centers … This applies to both Dedicated and On-demand Inference.“), nur Batch heißt dort „Coming soon“. Die Doku „Quick Start – Concrete AI“ erklärt schon den Aufruf eines „public model on the on-demand endpoint“ unter `https://inference.<zone>.exoscale-cloud.com/v1`. Der Endpunkt antwortet in de-fra-1 und ch-gva-2 ohne Schlüssel mit HTTP 401. Ob der Dienst allen offensteht, welche Modelle laufen und was ein Token kostet: ungeklärt. Status bleibt „beansprucht“, Anmerkung ergänzt.
- **Unverändert:** AGB „Applicable starting July 2nd, 2026“ mit 5.2 (Speicherung nur im gewählten Land, Ausnahme (d) Telemetrie/Logs), DPA ab 05.05.2025 (Aiven Oy einziger Unterauftragnehmer), Datenschutz „(currently no third-party processor)“ für Compute/Storage/SKS, Dedicated-Preise 2,15 € und 8,61 €/h, „Fully dedicated down to logs and GPU memory“. Training kommt in AGB, DPA, Datenschutz und KI-Seiten weiter nicht vor. Zertifikate weiter nur über das Compliance Center.
- Belege in `belege/anbieter/exoscale/` (*-2026-10-22.txt, SHA256SUMS ergänzt). 276/276 Tests, Build streng ok (in einem Klon gebaut, `docs/` hier nicht angefasst), lokal committet, kein Push. Kein Fall-Kandidat, keine Frage an Felix.

## Neu 22.10.2026 10:38 Systemuhr (Dauerlauf Laufend): Widerspruchs-Scan Nebius, Katalog sagt Finnland, Doku sagt „Global“

- Frage: Sagen andere Nebius-Seiten etwas anderes als das Profil (Ort, Speicherung, Training, Unterauftragnehmer, Zertifikate, Filter, AI Act)? Erster Scan bei Nebius. Abruf 22.10. 08:31–08:35 UTC per Unteragent, curl mit 3 s Abstand, vier robots.txt erlauben alle Pfade, 35 Seiten alle HTTP 200 (Token-Factory-Doku, Modellkatalog-API, Legal: Supplemental Terms/DPA/Unterauftragnehmer/Datenschutz, Marketing-Unterseiten, Trust Center 27001/42001, 5 Newsroom-Seiten). Rohseiten in `~/allein/tmp/ws1022n/` (nicht im Repo). Kernfunde selbst an den Rohseiten nachgeprüft.
- **Widerspruch 1 (Ort):** Der Modellkatalog `tokenfactory.nebius.com/api/public/models_info` („the authoritative machine-readable source“ laut model-catalog.md) nennt für gpt-oss-120b, Qwen3-235B-A22B-Instruct-2507 und GLM-5.1 nur `{"country_code":"FI","name":"eu-north1"}`. Die Doku public-serverless sagt weiter „Region field displays Global: the processing location is decided dynamically and can change at any time, without notice“. DPA 6.1: „the applicable processing location is specified in the API or displayed in the Token Factory interface.“ Welche Angabe gilt, ist ungeklärt; Standort im Profil unverändert, Anmerkung ergänzt.
- **Widerspruch 2 (Training):** `nebius.com/services/token-factory/enterprise-grade-inference` und `/inference-service` werben weiter mit „zero-retention mode, where requests and outputs are never stored or reused for training“ und „Data centers are located in Finland and France and US“ (die Hauptseite nicht mehr). Supplemental Terms 5.1 erlauben Training kleiner Entwurfsmodelle, 3.2 neu zitiert: „Nebius retains ownership of any smaller Models for Speculative Decoding created by or for Nebius.“ Anmerkung bei training_opt_out.
- Weitere Anmerkungen: Llama 3.3 70B laut Nebius-Hinweis am 31.08.2026 abgeschaltet (Primärquelle statt nur OpenRouter); Preise jetzt öffentlich im Katalog, gleiche Werte wie im Profil; Datenschutzerklärung neu (Effective date October 20, 2026), weiter ohne Log-Frist; Supplemental Terms Ziffer 4 verbieten das Umgehen von „safety filters, content moderation“ (setzt Filter voraus, beschreibt keine); Trust Center 42001 „assessed by an accredited, third-party certification body“, Akkreditierung bleibt unbelegt. Werbeseiten nennen außerdem SOC 2 Type II und HIPAA für die Rechenzentren, nicht im Profil, nicht geprüft.
- Ohne Widerspruch: DPA (15.09.), Supplemental Terms (15.09.), Unterauftragnehmer-Liste (23.09.), Legal Quick Guide 4.2/5.1 („stored in Finland (EU)“), Observability „eu-north“, ISO-27001-Umfang, Herkunft Yandex/NBIS, keine GPAI-Code-Unterzeichnung.
- Belegkopien `belege/anbieter/nebius/modellkatalog-2026-10-22.json`, `marketing-enterprise-inference-2026-10-22.txt`, `public-serverless-2026-10-22.md`, `datenschutz-2026-10-22.txt` + SHA256SUMS (8/8 ok). Kein Wayback in diesem Lauf. Profil: nur Anmerkungen, kein Status, kein Preis. 276/276 Tests, Build streng ok (Ausgabe zurückgesetzt), lokal `7fcce19`, kein Push.
- **Frage an Felix (507):** Nebius kurz fragen, welche Ortsangabe gilt (Katalog „Finnland“ oder Doku „Global“)? Empfehlung: ja, Fachfrage über hallo@, niedrig, mit 502/506 bündeln.
- Noch nie gescannt: Regolo.

## Neu 22.10.2026 ~10:20 (Dauerlauf Laufend): Widerspruchs-Scan Hetzner, eigener Fehler im Profil (Finnland ist EU) berichtigt

- Frage: Sagen andere Hetzner-Seiten etwas anderes als das Profil (Standort, Speicherung, Training, Zertifikate, experimentelle Inference-API)? Erster Scan bei Hetzner. Abruf 22.10. 08:07–08:10 UTC, curl mit 3 s Abstand, robots.txt (www, docs) erlaubt alles außer `?search=`, 21 Seiten alle HTTP 200 (Inference-Doku DE/EN, Experimente-Plattform, Zertifizierung DE/EN, Datenschutz DE/EN, Doku Datenschutz/TOMs/Informationssicherheit, AGB, GPU-Server, Blog „Inference Experiment“ DE/EN, ISO-Zertifikat, DPA, Subunternehmerliste). Rohseiten in `~/allein/tmp/ws1022h/` (nicht im Repo).
- **Eigener Fehler berichtigt:** Die Subprozessoren-Anmerkung nannte Finnland einen „Nicht-EU-Standort“. Die Liste selbst sagt: „Soweit Sie sich für einen Serverstandort in der EU entschieden haben, werden Ihre Serverdaten ausschließlich innerhalb der EU verarbeitet.“ Jetzt richtig.
- **Widerspruch, schon bekannt, gilt weiter:** Zertifizierungsseite DE/EN nennt „Hetzner Online GmbH und Hetzner Finland Oy“, das Zertifikat ZN-2025-35 V 1.1 nur Hetzner Online GmbH.
- **Neu im Profil (nur Anmerkungen):** Datenschutz 4.5.2: Modelle „vollständig auf unserer eigenen Hetzner-Infrastruktur“, Anfragen „verlassen die Hetzner-Infrastruktur nicht“; welches Rechenzentrum, sagt keine Seite. Blog 17.08.2026: Start 07.08. mit vier Modellen (Qwen3.6, Kimi-K2.7-Code, GLM-5.2, DeepSeek-V4-Flash), danach nur kleine Modelle; „rate limit and filter“ bei auffälligen Nutzungsmustern → bei vorgeschaltete_filter vermerkt, Status bleibt unbelegt (Inhalts- oder Musterfilter ungeklärt).
- Kleine Abweichungen, kein Fall: Doku-Datum „Last change 2026-07-24“ liegt vor dem Start und wurde nie nachgezogen; Plattform-Seite „an Open-Weight LLM“, Doku zwei Modelle; Doku-FAQ nennt nur Zeitstempel/Tokenzahlen, die Datenschutzerklärung zusätzlich Logfiles 6 Monate (kein harter Widerspruch).
- Ohne Widerspruch: kostenlos solange experimentell, keine Backups, kein Speichern von Prompts („We do not store the content of request and response“, Blog „We do not log any prompt data“), kein Training, ISO-Zertifikat unverändert, kein ISO 42001, AGB ohne Sonderbedingungen für Experimente.
- Belegkopien `belege/anbieter/hetzner/blog-inference-experiment-2026-10-22.txt`, `datenschutz-de-2026-10-22.txt`, `doku-inference-2026-10-22.txt`, `subunternehmer-2026-10-22.txt` + SHA256SUMS (4/4 ok); Wayback web.archive.org/web/20261022081250 (Inference-Doku); Blog nicht gesichert (Wayback 429), später nachholen. Profil: nur Anmerkungen, kein Status, kein Preis. 276/276 Tests, Build ok (Ausgabe zurückgesetzt), lokal, kein Push. Keine Frage.
- Noch nie gescannt: Nebius, Regolo.

## Neu 22.10.2026 09:40 Systemuhr (Dauerlauf Laufend): Widerspruchs-Scan Aleph Alpha, Kolibri gibt es jetzt per API-Anmeldung, aber ohne Angaben zu Ort und Speicherung

- Frage: Sagen andere Aleph-Alpha-Seiten etwas anderes als das Profil (Standort, Speicherung, Training, Zertifikate, Cohere-Stand)? Erster Scan bei Aleph Alpha. Abruf 22.10. ~07:30 UTC, curl mit 3 s Abstand, robots.txt erlaubt alles, 23 Seiten aus der Sitemap (116 Adressen: Startseite, Kolibri DE/EN, Kolibri-Anmeldung DE/EN, Modelle, Plattform, Lösungen, Services, Vertrieb, vier Meldungen zu Cohere/Kolibri/Rechenzentrum, Kolibri-Blog, zwei Blogbeiträge Code of Practice, Datenschutz, Impressum, Kontakt) plus Produktdoku Pharia-1, alle HTTP 200. Rohseiten in `~/allein/tmp/ws1022a/` (nicht im Repo).
- **Neu, kein Widerspruch, aber eine Lücke:** Startseite „Now via API. Experience Kolibri […] and use it directly via API.“ Die Seite `/en/signup-kolibri-api/` ist ein Anmeldeformular (Firma, Branche, geschäftliche E-Mail). Weder dort noch irgendwo sonst stehen Preis, Standort oder Speicherregeln für diesen Zugang; die Datenschutzerklärung regelt weiter nur Website, Kontakt, Newsletter und Bewerbungen. Die einzige Speicher-Aussage („No prompt data is stored […] for any of our public API users“) steht in der Pharia-1-Doku und verweist auf „Terms and Conditions“, die dort jetzt nicht einmal mehr verlinkt sind; der Doku-Link „Licences“ liefert 404. Ob sie für Kolibri gilt, ist ungeklärt → Anmerkung bei Kolibri und bei Zero Data Retention, kein Status geändert.
- **Kleine Abweichungen, kein Fall:** Kolibri-Seite „3B“ aktive Parameter, Blog und Modellkarte 3,46 Mrd. (Meldung 05.10.: „around 3 billion“). Deutsch-Anteil am Vortraining: Meldung 05.10. „around 23%“, Blog „21.3%“ und „about 4.3T“ von 20T. Modellübersicht: „Our model weights, training data, and curation are transparent, making them fully auditable“, der Blog sagt enger „transparent about our model weights and about curation of our training data“.
- **Cohere:** neueste Meldung weiter 05.10. („Until closing, Aleph Alpha continues to operate independently“), Meldung 16.09. erwartet den Abschluss „later this year“; keine Vollzugsmeldung bis 22.10. → Kurzbeschreibung nachgezogen.
- Ohne Widerspruch: Pharia-Doku „Data privacy“ wortgleich zum Profil; Plattform „Every action is logged and traceable“ betrifft die Agenten-Laufzeit, nicht die Modelleingaben; Zertifikate nennt keine Seite (wie im Profil).
- Belegkopien `belege/anbieter/aleph-alpha/startseite-en-2026-10-22.txt`, `signup-kolibri-api-2026-10-22.txt`, `doku-pharia-intro-2026-10-22.txt` + SHA256SUMS (5/5 ok); Wayback web.archive.org/web/20261022074024 (Anmeldeseite), /20261022074058 (Startseite). Profil: nur Anmerkungen, kein Status, kein Preis. 276/276 Tests, Build streng ok (Ausgabe zurückgesetzt), lokal `78b53d2`, kein Push.
- **Frage an Felix (506):** Aleph Alpha kurz fragen, ob „No prompt data is stored“ auch für die Kolibri-API gilt? Empfehlung: ja, als Fachfrage über hallo@, niedrig.
- Noch nie gescannt: Hetzner, Nebius, Regolo.

## Neu 22.10.2026 09:25 Systemuhr (Dauerlauf Laufend): Widerspruchs-Scan Scaleway, zwei Werbesätze verschweigen die Speicher-Ausnahmen

- Frage: Sagen andere Scaleway-Seiten etwas anderes als das Profil (Standort, Speicherung, Training, Zertifikate)? Erster Scan bei Scaleway. Abruf 22.10. ~07:15 UTC, curl mit 3 s Abstand, robots.txt erlaubt, 24 Seiten aus der Sitemap (Generative APIs, SLA, Managed Inference, AI-Lösungen, Security & Compliance, SecNumCloud, HDS, Gesundheit, Datenschutzerklärung, Impressum, Preise, Verträge, Unterauftragnehmer, Doku Datenschutz, acht Meldungen/Blog) plus Specific Conditions AI Services (Version 07/04/2026, unverändert). Rohseiten in `~/allein/tmp/ws1022s/` (nicht im Repo).
- **Widerspruch (Werbung gegen Vertrag):** Produktseite `scaleway.com/en/generative-apis/`: „We do not collect, read, reuse, or analyse the content of your inputs, prompts or outputs generated by the APIs.“ (ohne Ausnahme). Meldung 06.08.2025 (Qwen3 235B / gpt-oss): „prompts are never stored, logged, or reused“. Die Doku sagt denselben Satz mit „The only exception being …“ (Fehler/Missbrauch, volle HTTP-Inhalte bis zwei Wochen), die Specific Conditions zusätzlich Batch-Eingaben 24 Stunden. Das Profil stand schon richtig (ZDR mit Ausnahmen), nur Anmerkung ergänzt.
- Kleiner, kein Fall: FAQ der Produktseite „This service is totally free while in beta“ ist veraltet (Preisseite nennt Preise). Security-and-Compliance-Seite nennt ISO 27001 und HDS zugleich als „certified“ und als „committed to obtaining … currently undergoing assessment“ (stand schon im Profil). Menüzeile „HDS-certified AI-driven solutions“ ist durch GPU-Instanzen gedeckt; Generative APIs stehen weder auf der HDS- noch auf der Gesundheitsseite im HDS-Umfang (wie im Profil).
- **Eigener Fehler berichtigt:** Die ISO-42001-Anmerkung nannte „ISO/IEC 27001:2022 (BSI, Zertifikat IS 787020)“; dafür gibt es keine Quelle, das Trust Center nennt SGS (FR2600000200). Jetzt „Zertifizierer laut Trust Center SGS, siehe Zertifikate“.
- Ohne Widerspruch: Standort überall Paris/Europa, Training nirgends, GLM-5.2-Meldung (26.06.2026) „no third-party routing or telemetry“, SecNumCloud überall „not yet granted“/„ongoing“.
- Belegkopien `belege/anbieter/scaleway/produktseite-genapis-2026-10-22.txt`, `news-qwen-gptoss-2026-10-22.txt`, `datenschutz-genapis-2026-10-22.txt` + SHA256SUMS (5/5 ok); Wayback web.archive.org/web/20261022072129 (Produktseite), /20261022072105 (Meldung). Profil: nur zwei Anmerkungen, kein Status, kein Preis. 276/276 Tests, Build streng ok (Ausgabe zurückgesetzt), lokal `3312b8d`, kein Push. Keine Frage.
- Noch nie gescannt: Aleph Alpha, Hetzner, Nebius, Regolo.

## Neu 22.10.2026 ~09:05 (Dauerlauf Laufend): Widerspruchs-Scan DeepL, Datenschutzerklärung sagt „nur EWR“, Hilfe-Seite sagt „auch andere Regionen“

- Frage: Sagen andere DeepL-Seiten etwas anderes als das Profil (Standort, Speicherung, Training, Zertifikate)? Abruf 22.10. 06:50–07:00 UTC, curl mit 3 s Abstand, robots.txt beachtet, 28 Seiten aus der Sitemap (6.387 Adressen: Datensicherheit EN/DE, Enterprise, API, AWS Marketplace, DORA-Info, fünf Branchenseiten, sechs Blogbeiträge, vier Pressemitteilungen, Datenschutzerklärung, Pro-AGB) plus zwei Hilfe-Artikel über die öffentliche Help-Center-Schnittstelle. Rohseiten in `~/allein/tmp/ws1022d/` (nicht im Repo).
- **Widerspruch:** Datenschutzerklärung (`deepl.com/en/privacy`, „Last update: October 2026“, Abschnitt 7.1): „With both DeepL Pro and DeepL Translator, the translation of your documents will be provided exclusively by DeepL and processed on our infrastructure in the EEA.“ Hilfe-Seite „DeepL infrastructure and data protection“ (geändert 12.10.2026): „By default, customer content may be processed in different regions“, „in other regions AWS infrastructure is used only“; Blog 23.04.2026: „We will no longer process data exclusively within Europe“. Welche Aussage für Dokumente gilt, ist ungeklärt (möglich: alter Satz aus der Zeit vor AWS).
- **Hilfe-Seite am 12.10. geändert** (Abgleich mit Wayback 13.09.): Datenresidenz jetzt nur „Sales-managed customers“ (Team, Business, API for Business als Zusatz, Enterprise inklusive), neu „DeepL for Sovereign Markets“; Widerspruch gegen AWS gilt höchstens bis Ende 2026.
- Kleiner, kein Fall: AWS-Marketplace-Seite „regional data residency built in“ ist weiter gefasst als die Hilfe-Seite (nur als Zusatz für vertriebsbetreute Kunden). Branchenseiten nennen „HIPAA, GDPR, and C5 certifications“ (HIPAA/DSGVO sind keine Zertifikate, C5 ist ein Testat; steht so schon im Profil). Hilfe-Seite „not used for training models outside your account“ ist enger als die Werbung „never used to train DeepL’s models“.
- Ohne Widerspruch: Pro-AGB 3.1.2/3.3.2/1.13 wortgleich zum Profil (API Free darf dauerhaft speichern); DORA-Seite (April 2026) nennt keinen Ort, verweist auf den Auftragsverarbeitungsvertrag, neu nur „DeepL generally assumes that its services support non-critical and non-important functions“.
- Belegkopien `belege/anbieter/deepl/privacy-2026-10-22.txt`, `hilfe-infrastruktur-2026-10-22.txt` + SHA256SUMS (4/4 ok); Wayback web.archive.org/web/20261022070139 (Datenschutzerklärung), Hilfe-Seite Wayback 520 (nicht gesichert). Profil: nur Anmerkungen in allen vier Modellen (Standort-Text), kein Status, kein Preis geändert. 276/276 Tests, lokal `78ceb42`, kein Push.
- **Frage an Felix (502):** DeepL kurz fragen, welche der beiden Aussagen für Dokumente gilt? Empfehlung: ja, als Fachfrage über hallo@.

## Neu 22.10.2026 ~08:45 (Dauerlauf Laufend): Widerspruchs-Scan OVHcloud, drei Unterschiede zwischen OVHcloud-Seiten

- Frage: Sagen andere OVHcloud-Seiten etwas anderes als das Profil? Abruf 22.10. 06:28–06:40 UTC, curl mit 3 s Abstand, robots.txt beachtet, 25 Seiten alle HTTP 200 (AI Endpoints Produktseite und Katalog en/de/fr, Preisseite en/de/fr, Compliance-Seiten SecNumCloud/ISO/HDS/C5, Doku Capabilities/Batch/Billing/Getting started/Zertifikate, Vertrag Public Cloud en/de). Rohseiten in `~/allein/tmp/ws1022o/` (nicht im Repo).
- **Batch API:** Doku „Using Batch mode“ (lastUpdated 2026-07-21): Ausgabe- und Fehlerdateien werden „automatically deleted after 15 days“. Profil sagte nur „vorübergehend, Dauer nicht genannt“ → nachgetragen; Dauer der Eingabedateien bleibt ungeklärt. Die Doku „Getting started“ (08.10.) sagt dagegen allgemein „we do not store user data“.
- **Mehrwertsteuer:** dieselben Preise stehen auf der deutschen Preisseite unter „inkl. MwSt.“, auf der französischen unter „HT“ (ohne Steuer). Ob die Profilpreise netto oder brutto sind, ist damit ungeklärt → Anmerkung im Profil.
- **Modellliste:** Katalog zeigt am 22.10. „22 models available“ (Profil: 20 am 05.10.), neu u. a. Qwen3.8-27B und zwei Qwen3Guard-Modelle; die Preisseite führt drei Modelle, die im Katalog fehlen. Die sechs Profilmodelle und ihre Preise unverändert.
- Ohne Widerspruch: Standort Gravelines (Doku), kein Training, Vertrag Anhang 10 wortgleich, Zertifikate unverändert (AI Endpoints weiter in keiner Liste). Vorgeschaltete Filter weiter ungeklärt (Qwen3Guard ist nur ein eigenes Modell, nicht belegt vorgeschaltet).
- Profil `data/anbieter/ovhcloud.json` angepasst (nur Anmerkungen, Backup-Wert, Modellzahl; keine Preise geändert), Tests 276/276, lokal, kein Push. Kein Fall, keine Frage an Felix.

## Neu 22.10.2026 ~08:20 (Dauerlauf Laufend): Widerspruchs-Scan IONOS, kein Widerspruch

- Frage: Sagen andere IONOS-Seiten etwas anderes als das Profil (nur Deutschland, keine Speicherung von Prompts/Ausgaben, kein Training, Zertifikate beim AI Model Hub)? Abruf 22.10. ~06:06 UTC, curl mit 3 s Abstand, robots.txt beachtet, 20 Seiten aus den Sitemaps von cloud.ionos.de, cloud.ionos.com und www.ionos.de (AI Model Hub DE/EN, Zertifikate, Datensicherheit, Gaia-X, GPU-VM, Success Stories KI/Wictory/Datenschutz, KI-Lösungen, IONOS GPT, AI-Agent-Hosting) plus die Data-Handling-Doku, alle HTTP 200. Rohseiten in `~/allein/tmp/ws1022i/` (nicht im Repo).
- **Data-Handling-Doku unverändert in der Aussage:** Verarbeitung „in Germany […] and nowhere else“, Inhalte „never logged“, nicht persistent, kein Training, keine Weitergabe, „AI Model Hub falls within the scope of BSI C5“. Passt zum Profil.
- **Produktseite AI Model Hub (DE):** Kopf „100 % DSGVO-konform und sicher in Deutschland gehostet“, im Text aber „Ihre KI-Anwendungen laufen in europäischen IONOS CLOUD Rechenzentren“. Weiter gefasst als die Doku, kein Widerspruch zum Profil (Deutschland liegt in Europa). Kein Fall.
- **Preise DE-Seite** stimmen mit dem Profil (sechs Modelle, Qwen3.8-27B 0,40/2,70 € „Neu“). EN-Seite nennt Dollarpreise (Qwen3.5-9B $0.11/$0.17), Profil führt Euro.
- **Zertifikatsseite:** C5:2020 Typ 1 vom 28.05.2026, PwC, „33 Services in 10 Service-Clustern“, Liste nur auf Anfrage; IT-Grundschutz weiter nur Compute Engine, Object Storage, Managed Kubernetes. Steht so schon im Profil.
- **IONOS GPT** (www.ionos.de/momentum/ionos-gpt) ist ein eigenes Produkt („europäische Rechenzentren“, „niemals für KI-Training“), nicht der AI Model Hub; nicht im Profil, kein Abgleich nötig.
- Profil nicht geändert, kein Fall, keine Frage an Felix.

## Neu 22.10.2026 ~05:35 (Dauerlauf Laufend): Widerspruchs-Scan STACKIT, ein kleiner Unterschied Werbung gegen Leistungsschein

- Frage: Sagen andere STACKIT-Seiten etwas anderes als das Profil (Speicherung, Standort, Zertifikate beim KI-Dienst)? Abruf 22.10. ~03:25 UTC, curl, 53 Seiten aus der Sitemap (DE/EN: Produkte Data & AI, Compliance, Zertifikate, Datensouveränität, Wissensseiten KI, Use-Cases), alle HTTP 200. Rohseiten in `~/allein/tmp/ws1022s/` (nicht im Repo).
- **Wissensseite „AI Act“ (stackit.com/de/lernen/wissen/cloud/cloud-ai/ai-act, Stand 30.07.2026):** „STACKIT AI Model Serving […] Es werden keine Nutzerdaten gespeichert oder für Trainings verwendet.“ **Leistungsschein AI Model Serving** (heute unter derselben Adresse wie im Profil weiter Version 1.3, gültig ab 18.09.2025), Anhang Datentypen: „Kundendaten werden nicht dauerhaft gespeichert. Die E-Mail und Subject ID werden temporär (30 Tage) in den Logs des Services gespeichert“.
- Also: Inhalte der Anfragen werden laut Vertrag nicht dauerhaft gespeichert (passt zur Werbung und zum Profil), aber E-Mail und Kennung der Nutzer 30 Tage lang. „Keine Nutzerdaten gespeichert“ ist enger als der eigene Leistungsschein. Klein und deutungsabhängig („Nutzerdaten“ kann Inhalte meinen), darum **kein Fall**.
- Nebenbei veraltet: dieselbe Seite nennt „Llama 3.1“ als Beispiel; die Modellseite der Doku (16.10.) führt Llama 3.1 nicht mehr (nur Llama 3.3 70B). Dieselbe Seite: „Die Zertifizierungen von STACKIT, wie ISO 27001 und C5, erfüllen die geforderten Sicherheitsbestimmungen aus dem AI Act“; der ISO-27001-Geltungsbereich nennt AI Model Serving nicht (steht schon im Profil).
- Rest ohne Widerspruch: Zertifikats-Wissensseite „ausschließlich in der EU gespeichert und verarbeitet“ passt zu AVV Ziffer 2.5; Produktseiten nennen nur EU01; „Training data never leaves our secure European cloud“ betrifft AI Model Experiments, nicht Model Serving.
- Belegkopien `belege/anbieter/stackit/wissen-ai-act-2026-10-22.txt`, `leistungsschein-ams-v1.3-2026-10-22.txt` + SHA256SUMS; Wayback web.archive.org/web/20261022032716 (Wissensseite). Profil nicht geändert, 276/276 Tests, lokal committet, kein Push, keine Frage an Felix. Kandidat für ein späteres Dossier-Beispiel „Werbung vs. Vertrag“, falls ein Prüfer danach fragt.

## Neu 22.10.2026 ~05:15 (Dauerlauf Laufend): Fachstimme auf der ISO-27001-Seite live geprüft

- `belegbar.eu/zertifikate/iso-27001/` antwortet 200; Abschnitt „Wer steht auf dem Zertifikat?“, Einleitung, Zitat und Bildunterschrift mit arXiv-Link stehen live wortgleich zur freigegebenen Fassung vom 16.10. (Abgleich mit `lib/fachstimmen.js`).
- Der Forscher hat die Live-Seite selbst angesehen und bestätigt (Mail 22.10. nachts); keine Antwort nötig. Einzelheiten nur in PRIVAT-NOTIZEN.md.
- Nebenbei: Die Namensprüfung schlug auf dieser Datei an (vier ältere Verweise vom 21.10. auf private Gesprächsdateien mit dem Namen im Dateinamen). Name dort herausgekürzt, Prüfung jetzt leer; ein Push hätte vorher an `push-sauber.sh` gehangen.

## Neu 22.10.2026 ~05:00 (Dauerlauf Laufend): GreenPT-Branchenseiten widersprechen der eigenen Unterauftragnehmer-Liste

- Merkposten von 02:05 („ungeklärter Ortsunterschied“) gegen die Processor-Seite geprüft (Abruf 22.10. ~00:00 UTC, Kopie `belege/anbieter/greenpt/processor-2026-10-22.txt` + SHA256SUMS, Commit `64f859e`).
- **/ai-for-doctors und /ai-for-lawyers:** „All processing happens inside the EU on Scaleway infrastructure in France.“ und „Open-weight models run on our own servers […] no external API is ever called.“
- **docs.greenpt.ai/privacy/processor (Standard-Endpunkt EU):** neben Scaleway (Paris) drei weitere Unterauftragnehmer für „AI model hosting“ mit „Prompt content and output during processing“: Inceptron, Tensorix, Melious, alle „Finland (EU)“. Gleich wie am 16.10.
- Also: Prompts können laut GreenPT selbst auch in Finnland bei Dritten verarbeitet werden. „Nur Frankreich“ und „eigene Server“ auf den Seiten für Ärzte und Anwälte ist enger, als die eigene Liste trägt. EU bleibt EU, der Satz „No data ever crosses an EU border“ stimmt weiter. Für Ärzte zählt der Ort trotzdem: HDS nennt die Liste nur bei Scaleway.
- Ungeklärt bleibt, ob GreenPT Chat (GLM-5.3) selbst über die finnischen Partner läuft; die Seiten sagen es nicht, /sustainability nennt Helsinki nur für die Code-Modelle.
- Profil nicht geändert (Unterauftragnehmer stimmen dort schon). Kein Fall eröffnet. **Frage an Felix (497):** GreenPT dazu kurz anfragen (bestehender Kontakt)? Empfehlung: ja.
- 276/276 Tests, lokal committet, kein Push.

## Neu 22.10.2026 ~02:05 (Dauerlauf Laufend): Widerspruchs-Scan GreenPT nach der SOC-2-Streichung, SOC 2 nirgends mehr

- Frage: Steht „SOC 2“ nach der Änderung vom 21.10. (/privacy) noch auf anderen GreenPT-Seiten? Abruf 22.10. ~00:00 UTC, curl, 117 Seiten (alle Links von Startseite, Profilquellen und Doku, EN/DE/FR/NL); die Sitemap führt nur eine Adresse, docs.greenpt.ai hat weder Sitemap noch llms.txt. Rohseiten in `~/allein/tmp/ws1022g/` (nicht im Repo).
- **SOC 2: auf keiner der 117 Seiten mehr.** Die Streichung ist also durchgezogen, kein Widerspruch. Profil (`zertifikate.1` unbelegt) passt.
- **ISO 27001:** Alle Fließtexte ordnen es jetzt den Rechenzentren bzw. der Infrastruktur zu; /privacy in allen vier Sprachen mit „GreenPT BV is working towards its own ISO 27001 certification“. Unverändert nur das Footer-Badge „Verified by independent audit · … · ISO 27001“ ohne Zuordnung (seit 05.10. im Profil vermerkt, Kern von Fall 2026-002).
- **Kleiner, ungeklärter Ortsunterschied auf zwei neuen Landingpages** (/ai-for-doctors, /ai-for-lawyers): „All processing happens inside the EU on Scaleway infrastructure in France. […] Open-weight models run on our own servers, led by GLM-5.3 from Z.ai, the default model in GreenPT Chat.“ Die Seite /sustainability sagt dagegen: „The GreenPT Code models (glm-5.3 and kimi-k2.7-code) run in Verda’s ISO 27001 certified data centers in Helsinki, Finland“, /privacy nennt Hosting-Partner Inceptron, Tensorix, Melious bei Verda in Finnland. Ob das Chat-Modell GLM-5.3 auf denselben Rechnern läuft wie das Code-Modell glm-5.3, ist **ungeklärt**. Beides ist EU, der Satz „No data ever crosses an EU border“ wird dadurch nicht falsch (US-Endpunkt ist Opt-in und betrifft die API). **Kein Fall-Kandidat**, nur Merkposten: beim nächsten Kontakt mit GreenPT fragen, wo GLM-5.3 im Chat läuft.
- Belegkopien `belege/anbieter/greenpt/ai-for-doctors-2026-10-22.txt`, `ai-for-lawyers-2026-10-22.txt`, `sustainability-2026-10-22.txt` + `SHA256SUMS` (8/8 ok). Profil nicht geändert, 276/276 Tests, lokal committet, kein Push, keine Frage an Felix.

## Neu 22.10.2026 ~01:45 (Dauerlauf GA1): Antworten auf die Gesprächsbitten vom 15.10. geprüft

- Seit dem 19.10. keine neue Antwort. Drei von sieben Angeschriebenen haben noch nicht geantwortet; ein Termin steht (30.10.), ein weiterer wartet auf die Wahl der Gesprächspartnerin (28./29.10.).
- Ab Do 29.10. einmal kurz nachfassen, nur bei den zwei Datenschutz-Büros ohne Antwort (Fahrplan Fall 4, ALLEIN NF1). Namen und Einzelheiten nur im privaten Gesprächsordner.

## Neu 22.10.2026 ~01:10 (Dauerlauf AF21): Fall 006 (T-Systems) nach Fristablauf als „bestätigt“ vorbereitet, nicht online

- Frist 21.10. verstrichen, **keine Antwort** von T-Systems (Gmail geprüft 21.10. 22:55 UTC, auch nichts von telekom.de/.com), auch nicht auf die Erinnerung vom 15.10. 14:31 UTC.
- Alle drei Quellen 21.10. 22:56 UTC neu abgerufen: Leistungsbeschreibung byte-gleich zum 06.10. (v1.24, § 2.3.1 gleich); Trust-Seite mit beiden Zitaten und „Storage: Not stored“ unverändert, neu nur Menü + Banner; Prefix-Caching-Doku Zitat unverändert. Kopien `belege/faelle/2026-006/*-2026-10-22.*` + SHA256SUMS, Wayback `20261021225741` byte-gleich.
- Entwurf `data/faelle/entwurf/2026-006-…json`: Status `bestaetigt`, Verlauf um 14.10., 15.10. und 21.10. ergänzt; im Eintrag 05.10. den falschen Satz „Fall veröffentlicht.“ gestrichen (der Fall war nie dauerhaft online). 276/276 Tests, Probe-Build mit dem Fall als veröffentlicht ok (Seite zeigt „Status bestätigt“, Archivcheck 23 Zitate ok), danach zurückgesetzt. Lokal `e4d471d`, kein Push.
- **Veröffentlichen = Felix (Frage 492):** Datei nach `data/faelle/` verschieben, `node build.js`, Push nur über `dossiers/push-sauber.sh`.

## Neu 22.10.2026 ~00:40 (Dauerlauf Tagesprüfung): nur Rauschen, RvA wieder erreichbar

- 276/276 Tests, Build streng ok (schrieb nur Datum, zurückgesetzt), Archivcheck 19 Zitate in 13 Kopien ok.
- Quellenlauf 201 URLs: 195 unverändert, 4 verändert, 0 verschwunden, 2 übersprungen (DQS, HDS-Register gesperrt wie bisher). Alle vier von Hand gelesen, **alle Rauschen**: Lyceum-C5-Artikel (nur Teaser „Weitere Artikel“: neuer Beitrag 20.10. statt ISO-27001-Leitfaden, Artikeltext gleich), Nebius SOC 2 (eingebettetes Formular „Enable JavaScript …“), T-Cloud Zertifikatsübersicht + TISAX-Blog (Menüwort „Solutions“ weg). Per `--uebernehmen-nur` übernommen, Prüfdatum 2026-10-22, sonst kein Feld geändert (gesperrte Daten HDS 14.10., DQS 09.10./08.10. unangetastet). Lokal `2381932` + Build `4665bea`, kein Push.
- **RvA-Akkreditierungsseite (Nebius) wieder HTTP 200 und unverändert** → der offene Punkt von gestern Abend ist erledigt, nichts zurückgesetzt.
- Fälle 003/004: alle 9 Zitate live (BFL-Privacy nur Leerzeichen um „ Inputs “, Scaleway-Zusatz „except temporarily…“ seit 03.10. bekannt).
- Wächter: 8 unverändert, OpenAI 2× 403 (bekannt). Mail-Eingang hallo@: keine Änderungs-Benachrichtigung. Pilot: Zoom und Slack-AVV nur Menü (AVV-Absatz wortgleich), übernommen; **Notion-Unterauftragnehmerliste echt, aber klein:** bei Fireworks, Baseten und Modal heißt der Zweck jetzt „Compute infrastructure for serving large language models and powering AI services“ (vorher laut Wortliste mit „Service hosting provider … embeddings“), Standort weiter „Global“, keine Firma neu oder weg. Übernommen; alte Wortliste und neue Lesefolge unter `waechter/pilot/roh/2026-10-22/` (gitignored).

## Neu 21.10.2026 ~20:10 (Dauerlauf Laufend): Quellenlauf mit der reparierten Datumslogik nachgefahren

- Voller Quellenlauf (201 URLs: 177 unverändert, 21 verändert, 1 nicht erreichbar, 2 übersprungen). Die Reparatur von 16:55 wirkt: 25 Prüfdaten von Unterquellen bei OVHcloud, Exoscale und Aleph Alpha (Vertrag, Compliance-Seiten, COFRAC, DAkkS-Urkunde) wurden auf 21.10. nachgezogen (zuvor 14.10. bzw. 08.10.); die gesperrten Register (HDS 14.10., DQS 09.10./08.10.) blieben unangetastet.
- Alle 21 veränderten Quellen gelesen. **Echt nur eine:** Requesty-Unterauftragnehmerliste, „Last updated: 21 October 2026“ (vorher 6. Oktober). Einziger Unterschied im Wortlaut: AWS-Vertragspartner heißt jetzt „Amazon Web Services EMEA SARL“ statt „Inc.“, Rechenzentrum weiter Frankfurt, Modellprovider-Liste wortgleich. Anmerkung im Profil nachgezogen. Fall 2026-001 ist davon nicht berührt (es geht dort um die Speicherdauer, nicht um den AWS-Vertragspartner).
- Rest Rauschen, gegen die Profilwerte geprüft: EUrouter (neues Banner, alle fünf Profilpreise in den Seitendaten unverändert), Mistral (neuer Abschnitt Voice Agents, alle Modellpreise gleich), Black Forest Labs (neue Karten Video Edit [fast] und Upscale, alle Profilpreise gleich), T-Systems (Banner Qwen3 Embedding, Preise gleich), DeepL Trust (neue Sicherheitsmeldung zu PHP-Lücken, nichts zu Standorten), Regolo/Requesty-Doku/Scaleway-Doku/CSA-Register (Fußzeilen-Beiträge, Navigation). Alle übernommen.
- Offen: RvA-Akkreditierungsseite (Nebius, Zertifizierer-Akkreditierung) gab HTTP 503, zweimal hintereinander. Status nicht zurückgesetzt; ist sie bei der Tagesprüfung 22.10. weiter weg, dann zurücksetzen und tote URL in der Anmerkung festhalten.
- 276/276 Tests, Build streng ok, lokal committet `9deaae9`, kein Push, keine Frage an Felix.

## Neu 21.10.2026 ~19:45 (Dauerlauf BV6): Welle 4 als Entwürfe, nichts gesendet

- Zehn Gesprächsanfragen an externe Datenschutzbeauftragte mit KI-Qualifikation liegen als Gmail-Entwurf, je Kontakt vorher auf der eigenen Website gegengeprüft (sechs im Impressum bestätigt, vier nur laut Verbandsverzeichnis).
- Text wie die Anfragen vom 15.10., Vertrauensfrage zuerst; neu in der Liste „eine dokumentierte Prüfmethode“ (Rückmeldungen aus den Gesprächen vom 19. und 21.10.), per Video, die zwei NRW-Büros auch vor Ort.
- Versand erst nach Felix' Wort zur Stapel-Mail. Einzelheiten nur im privaten Gesprächsordner.

## Neu 21.10.2026 ~19:15 (Dauerlauf Laufend): Kill-Check-Stand nach dem Gespräch heute Abend

- Das Gespräch mit dem Forscher (18:00, ~21 min) ist im privaten Messprotokoll eingetragen. Es **zählt nicht** (Felix: Forscher, kein Käufer). Zahlen unverändert: Gespräche 3 nach Zählregel, Bedingungen 2 nach Lesart Dauerlauf, Pilot 0.
- Er nannte als Voraussetzung für Vertrauen die belegte Herkunft der Daten und gab die Haftungsfrage an einen Juristen weiter; die steht als Vergabe-Frage im Spickzettel für Fr 30.10.
- Zwischenziel Mi 28.10. (ein Dossier angeboten) hängt nur noch an einem unbestätigten Termin (Nachfrage frühestens Fr 23.10.) oder an einer Antwort auf die offenen Anfragen. Das Abo-Modell für Prüfer bleibt, Welle 4 läuft weiter.

## Neu 21.10.2026 ~18:55 (Dauerlauf): Nachbarprojekt für Modell-Fingerabdrücke angesehen, keine Konkurrenz

- Ein Forschungsprojekt archiviert die System Cards von vier US-Laboren mit Prüfsumme und Datum und will Modelltausch per Fingerabdruck erkennen (pausiert, Alpha). belegbar prüft dagegen die Zusagen von Anbietern (Datenschutz, Zertifikate, Standort), also kein Wettbewerb.
- Nutzen: öffentlicher fremder Beleg, dass Herstellerdokumente still neu gefasst werden (eine System Card fünfmal im September). Ob das in den Gesprächsleitfaden kommt, entscheidet Felix. Notiz privat.

## Neu 21.10.2026 ~16:55 (Dauerlauf Laufend): Quellenlauf schrieb Prüfdaten ins falsche Feld, behoben

- Anlass: Der alte offene Punkt „HDS-Liste im Browser“. Das ANS-Register liefert weiter nur die Incapsula-Sperrseite (212 Byte, Abruf 21.10. ~16:35), Wayback hat seit 26.09. keine brauchbare Kopie (16.10. = Sperrseite), data.gouv.fr führt die Liste nicht. Registerstand bleibt 09.10.
- Dabei gefunden: Bei OVHcloud stand HDS trotzdem „geprüft 21.10.“, bei Exoscale (gleiche Quelle) richtig 14.10. Ursache in `lib/quellen.js` `setzeGeprueft`: Es ersetzte das **erste** Datum der Zeile. Steht ein Zertifikat mit Unterobjekten (Anwendungsbereich, Zertifizierer) in einer Zeile, bekam so das Hauptfeld das Datum einer anderen, geprüften Unterquelle, die Unterquelle selbst keins. Seit 16.10. jeden Quellenlauf. Gegen alle Dateien nachgespielt: in 203 von 321 Fällen schrieb die alte Fassung anders als die neue.
- Behoben: Datum nur im selben Objekt hinter der passenden quelle (bis zum nächsten `{`, `}` oder `quelle`), fehlt es, wird es dort eingefügt. Zwei Tests zuerst (rot 45/2 → 47/47), gesamt 276/276, Build streng ok.
- Falsch frische Daten gesucht (Feld-Datum jünger als letzte Bestätigung im Ledger): genau zwei, beide zurückgesetzt. **OVHcloud HDS 21.10. → 14.10.** (Register gesperrt, wie Exoscale). **Aleph Alpha ISO 27001 (DQS-Kundendatenbank) 21.10. → 09.10.** (DQS seit ~10.10. hinter Cloudflare, 403 am 21.10.). Zu alte Daten bei Unterquellen (z. B. OVH-Doku, DAkkS-Urkunde) zieht der nächste Quellenlauf selbst nach.
- Lokal committet, kein Push, keine Frage an Felix. Offen bleibt: HDS-Register und DQS nur noch mit Felix' Browser (normaler, nicht automatisierter) lesbar, steht unter Nur Felix nicht neu, weil der Stand vom 09.10. als Belegkopie trägt.

## Neu 21.10.2026 ~17:00 (Home-Tab, /feierabend): Spickzettel für das Gespräch heute Abend gekürzt, Probelauf gemacht

- Spickzettel (privat, gitignored) auf das Format des Gesprächs vom 08.10. gekürzt, ~6 statt 13 KB; lange Fassung als `.bak-2026-10-21-lang` daneben. Neu: deutsche Lesefassung `09-…-spickzettel-deutsch.md` (Vokabeln + jeder Satz übersetzt), privat.
- Aus dem Probelauf geändert: Hauptfrage fragt erst „have you seen … pay for“, dann „would they pay for“ (Gesprächspartner ist Forscher, kein Käufer); Nachhaken nach Zahl der genannten Haftungen; Anwalts-Frage nur, wenn er den Anwalt selbst nennt; Minute 18–22 beginnt mit „I'm testing …“ statt Pitch.
- Felix-Entscheidung Frage 462: **ja**, auf Nachfrage den echten Google-Fund (englisch) zeigen.
- Einwände (jetzt vier, neu: „Reading websites isn't verification“) stehen mit ⚠ direkt in den Minuten, in denen sie wahrscheinlich kommen, je mit der Frage, mit der es danach weitergeht.
- **Nächster Schritt:** nach dem Gespräch die fünf Zeilen aus `09-…-nachher.md` in den ALLEIN-Tab. Hauptziel-Satz (zwei Namen) wurde im Probelauf nicht mehr geübt.

## Neu 21.10.2026 ~16:45 (Dauerlauf Verbesserer): Zertifikat selbst im Register prüfen, nicht nur die Stelle

- Fund in `VERBESSERER.md`: `akkreditiert_dakks` prüft nur die Zertifizierungsstelle. Ob das einzelne Zertifikat (Nummer, Geltungsbereich, Status) eingetragen und gültig ist, prüft niemand; Vorbild IAF CertSearch (Register der Akkreditierer, gratis 3 Suchen/Tag mit Konto). Würde auch bei Opper/Exoscale (keine Stelle genannt) weiterhelfen. Nichts gebaut; wartet auf Felix' Ja (Konto auf seinen Namen).

## Neu 21.10.2026 ~16:20 (Dauerlauf Laufend): alte Vanta-Adresse von BFL im Browser gelesen, kein Widerspruch

- Offen seit dem Widerspruchs-Scan 12:45: Die BFL-Startseite verlinkt SOC 2 / ISO 27001 noch auf `app.vanta.com/blackforestlabs.ai/trust/0cb6ffww8qmy60nxzo3p5` (per curl nur JS). Jetzt im Browser gerendert (21.10. ~16:15, eigener Kontext): Titel „Trust Center - BFL“, gleiche Trust-Center-ID wie trust.bfl.ai, Compliance „ISO 27001:2022 / SOC 2 / GDPR“.
- Alle drei Dokumente (ISO-27001-Zertifikat, „Black Forest Labs Inc Report SOC 2 Type 2 12.17.25.pdf“, GDPR-Audit-Report) nur über „Request access“; das ISO-Zertifikat mit derselben Ressourcen-ID `6936c03e7afd0fe5c25dcad5` wie im Profil. Also derselbe Stand wie trust.bfl.ai seit 21.10., kein zweiter, freier Zugang.
- Profil unverändert richtig (ISO 27001 belegt über Belegkopie 18.10., SOC 2 beansprucht). Kein Fall-Kandidat, keine Frage an Felix, nichts committet außer dieser Notiz.

## Neu 21.10.2026 ~15:00 (Dauerlauf OA1): Mail-Eingang für den Wächter

- `waechter-mail.js` (Tests `test/waechter-mail.test.js`, gesamt 274/274, Commit `f5d4b73`, kein Push): Änderungs-Benachrichtigungen an hallo@ werden geprüft (Absender nur echte Anbieter-Domain, Ziel hallo@), mit SHA-256 und Eingangsdatum unter `waechter/` gesichert und gegen die Beobachtungsliste abgeglichen. Nennt eine Mail eine beobachtete Seite: Wächter-Lauf und Wayback. Läuft ab jetzt in der Tagesprüfung. Bisher keine Benachrichtigung eingegangen.

## Neu 21.10.2026 ~14:50 (Dauerlauf Laufend): Kill-Check-Stand, keine neuen Antworten seit 19.10.

- Posteingang gezielt geprüft: keine neue Antwort der angefragten Gesprächspartner seit 19.10.; Zahlen im privaten Messprotokoll unverändert.
- Ein zugesagtes Gespräch hat noch keinen bestätigten Termin; eine kurze Terminnachfrage liegt als Entwurf (nicht gesendet), Entscheidung bei Felix, frühestens Fr 23.10. Einzelheiten privat.

## Neu 21.10.2026 ~14:30 (Dauerlauf): Spickzettel für das Gespräch heute Abend um einen öffentlichen Anker ergänzt

- Ein Satz aus der öffentlichen Microsoft-Doku (Copilot: Anthropic-Modelle außerhalb der EU Data Boundary, Flex routing standardmäßig an für Tenants ab 25.03.2026), live geprüft 21.10. Nur als Nachhaken; die privaten Vergleichsmuster werden nicht erwähnt.

## Neu 21.10.2026 (Dauerlauf, US1 fertig 3/3): drei private Vergleichsmuster

- Privat in `dossiers/us/` (gitignored, nicht im Katalog, kein Push); Befunde und Wortlaute nur dort. Gebaut mit dem gleichen Renderer und der gleichen Normenbezugsprüfung wie der Katalog (`node dossiers/us/erzeuge.js <id>`).
- Erledigt: 3 von 3. Beim dritten waren die Seiten des Anbieters direkt gesperrt (HTTP 403); Wortlaute stammen aus datierten Archivkopien, das steht im Muster bei jeder Angabe.
- Offen: Durchsicht durch Felix vor jedem Gespräch; Veröffentlichung erst nach Rechtsrat (Fr 30.10.) und Felix' „steht“.
- Nachtrag 21.10. ~15:05: Das Gespräch am Fr 30.10. ist Vergaberecht. Ob die Muster veröffentlicht werden dürfen, ist Äußerungs-/Wettbewerbsrecht und wird dort nicht beantwortet; im Gespräch nur die Vergabe-Sicht (würde eine Vergabestelle so einen Hinweis aufgreifen?) und eine Namensfrage, Spickzettel privat angepasst. Rechtsrat zur Veröffentlichung bleibt offen (Frage 479).

## Neu 21.10.2026 ~13:30 (Dauerlauf, Eingang): Opper ISO 27001 nach Anbieter-Hinweis nachgeprüft

- Trust Center unverändert: Zertifikat 160926-1, gültig bis 15.09.2029, nur auf Anfrage; Zertifizierungsstelle nirgends genannt (`auditor:null`), Eintrag in den Seitendaten `in-progress`. Status bleibt **beansprucht**, Anmerkung im Profil ergänzt, Archiv web.archive.org/web/20261021111904. 267/267 Tests, Build streng ok, lokal committet, kein Push.
- Antwort an den Anbieter liegt als Entwurf (Details nur in `outreach/gespraeche/PRIVAT-NOTIZEN.md`); Felix sendet von hallo@.

## Neu 21.10.2026 ~12:45 (Dauerlauf Laufend): Widerspruchs-Scan bei den drei QP1-Anbietern, kein neuer Widerspruch

- Frage: Steht der alte Stand (vor QP1 heute früh) noch auf **anderen** Seiten derselben Firma? Abruf 21.10. ~10:35–10:41 UTC, curl, Rohseiten in `~/allein/tmp/ws1021/` (nicht im Repo).
- **Infomaniak:** Preisseite in EN/DE/FR/IT/ES und Modellseite führen alle dieselben vier Qwen-Modelle (3.5-397B, 3.8-27B, Embedding-8B, Reranker-0.6B), Qwen3.5-122B nirgends mehr. Modellseite zeigt bei Qwen3.8-27B weiter „Max. input tokens NaN“ → Kontextlänge bleibt ungeklärt. Entwickler-Doku nennt Qwen3-Coder-480B nur als Beispiel im Modellnamen-Feld, keine Angebotsaussage.
- **Mistral:** Modellseite Large 4 und Doku-Preistabelle beide $1.36/$4.18, kein Aktionspreis 0.68/2.09 mehr auf docs.mistral.ai (Modelle, Preise) oder mistral.ai/pricing. „50% discount“ betrifft nur die Batch-API.
- **BFL:** Startseite, Enterprise, AGB, Datenschutz, EU-API-Bedingungen tragen im Footer „ISO 27001:2022“ (Link trust.bfl.ai). Die Startseite verlinkt „SOC 2“ und „ISO 27001“ zusätzlich auf die alte Vanta-Adresse `app.vanta.com/blackforestlabs.ai/trust/0cb6ffww8qmy60nxzo3p5` (HTTP 200, reine JS-Seite, Inhalt ohne Browser ungeprüft). Kein Satz mehr, der das Zertifikat „frei herunterladbar“ nennt; Profil (Status belegt über Belegkopie 18.10.) passt.
- Kein Fall-Kandidat, nichts am Profil geändert, keine Frage an Felix.

## Neu 21.10.2026 ~12:00 (Dauerlauf Laufend): 21 Dossiers auf Stand 21.10. neu erzeugt

- `node dossier.js <id> --datum 2026-10-21` für alle 21 Anbieter → `dossiers/*-2026-10-21.md` (privat, gitignored). Die Dateien vom 19.10. bleiben als datierte Momentaufnahme liegen.
- Gegen den 19.10. verglichen (Datum herausgerechnet): bei 7 Anbietern nur das Alarm-Enddatum (2027-10-21), sonst nur neue Kurz-Hashes aus den Quellenläufen 20./21.10. und die QP1-Änderungen. Inhaltlich neu: GreenPT SOC 2 Type II und dessen Anwendungsbereich jetzt **unbelegt** (statt „beansprucht, nicht belegt“), Infomaniak mit Qwen3.8-27B, Mistral-Aktionspreis als beendet vermerkt, BFL-ISO-27001 mit Quelle trust.bfl.ai und „Request access“.
- Ergebnis je Dossier unverändert gegenüber 19.10. (13 × „nein“, 8 × „nicht belegbar“). Kein Code geändert, nichts committet außer dieser Notiz, kein Push.

## Neu 21.10.2026 ~11:05 (Dauerlauf): Spickzettel Gespräch 09 ergänzt

- `outreach/gespraeche/09-…-spickzettel.md` (privat, nicht eingecheckt): GreenPT-SOC-2-Fund als englischer Ein-Satz-Anker ohne Anbieternamen (Profiländerung noch nicht online), Einsatz nur Minute 18–22 oder auf Nachfrage.

## Neu 21.10.2026 ~10:50 (Dauerlauf QP1): die vier Profilstellen angepasst

- Alle vier Befunde vom Morgen selbst nachgeprüft (Abruf 21.10. 08:08 UTC, curl; BFL-Trust-Center per Browser, weil die Seite nur per JavaScript lädt). Rohseiten in `~/allein/tmp/qp1/` (nicht im Repo).
- **GreenPT:** `zertifikate.1` SOC 2 Type II → **unbelegt** (Anwendungsbereich `wert: null`, unbelegt), Anmerkung mit altem Wortlaut und Zeitraum (zwischen Quellenlauf 20.10. morgens und 21.10.). `zertifikate.0`-Schlusssatz neu: /privacy ordnet ISO 27001 jetzt den Rechenzentren zu, Footer weiter ohne Zuordnung. Belegkopie `belege/anbieter/greenpt/privacy-2026-10-21.txt` (SHA-256 `12dec8a0…`, in SHA256SUMS). **Fall 2026-002:** Verlaufseintrag 21.10. (Status bleibt „bestätigt“, Auflösung 1 hängt am Footer-Badge).
- **Infomaniak:** `modelle.1` jetzt Qwen3.8-27B-FP8, CHF 0.40/3.00, Beta; Kontextlänge ungeklärt (Modellseite zeigt „Max. input tokens NaN“). Qwen3.5-122B in der Anmerkung als „nicht mehr angeboten“.
- **Mistral Large 4:** Anmerkung „Aktionspreis 0.68/2.09 am 08.10., am 21.10. weg“; Listenpreis 1.36/4.18 unverändert.
- **BFL ISO 27001:** Quelle (Eintrag + Anwendungsbereich + Zertifizierer) → `trust.bfl.ai/`, „frei herunterladbar“ → „bis 18.10. frei, seit 21.10. nur per Request access, gleiche Ressourcen-ID“. Status bleibt **belegt** über die Belegkopie vom 18.10.
- Normenbezug-Test schlug zuerst an („GDPR“ im Footer-Zitat), wie früher mit „[…]“ gekürzt. 267/267 Tests, Build ok, Quellenlauf `--uebernehmen-nur` für die drei Adressen (201 geprüft, 196 gleich, 3 übernommen, 0 verändert). Lokal `75ff106` + Build `bac90f6`, **kein Push**.
- Offen: Die Dossiers vom 19.10. (`dossiers/*-2026-10-19.md`) bleiben als datierte Momentaufnahme mit dem alten Stand; beim nächsten Dossier-Lauf neu erzeugen.

## Neu 21.10.2026 ~10:20 (Dauerlauf Tagesprüfung): GreenPT streicht SOC 2, drei weitere Profilstellen veraltet

- 267/267 Tests, Build streng ok, Archivcheck 19 Zitate ok. Fälle 003/004: alle 9 Zitate live (BFL-Privacy nur Leerzeichen um „ Inputs “, Scaleway-Zusatz „except temporarily…“ seit 03.10. bekannt).
- Quellenlauf trocken 202 URLs: 167 unverändert, 32 verändert, 1 verschwunden, 2 übersprungen. Unteragent hat alle von Hand gelesen (Abruf 09:41–09:45). **29 nur Menü/Teaser/Banner/Zusatzmodelle**, per `--uebernehmen-nur` übernommen, Prüfdatum 2026-10-21, lokal `8194bdd` + Build `41751f6`, kein Push.
- **Offen, nicht übernommen, Profil muss angepasst werden:**
  - **GreenPT /privacy:** alt „Our infrastructure maintains ISO 27001 and SOC 2 Type II certifications“, neu Abschnitt „Security Certifications“: „The data centres we run on are ISO 27001 certified for information security. GreenPT BV is working towards its own ISO 27001 certification.“ SOC 2 steht nirgends mehr auf der Seite → `greenpt.zertifikate.1` (SOC 2) ohne Quelle, Schlusssatz der Anmerkung in `zertifikate.0` falsch. Für Fall 2026-002: GreenPT schreibt die Einschränkung jetzt auch auf /privacy; Footer weiter „ISO 27001“.
  - **Infomaniak Preise:** `modelle.1` Qwen3.5-122B-A10B-FP8 (CHF 0.40/3.20) steht nicht mehr da, an der Stelle Qwen/Qwen3.8-27B-FP8 CHF 0.40/3.00.
  - **Mistral Large 4:** Listenpreis $1.36/$4.18 unverändert, aber der Aktionspreis 0.68/2.09 aus der Anmerkung ist weg (Aktion beendet).
  - **BFL ISO-27001-Zertifikat:** alter Download-Link 404; trust.bfl.ai listet das Zertifikat weiter (gleiche Ressourcen-ID 6936c03e…), aber nur noch per „Request access“. Belegkopie vom 18.10. bleibt gültig; Quell-URL und „frei herunterladbar“ anpassen.
- Wächter: Anthropic AGB/AVV nur neues Layout (Fließtext Zeile für Zeile gleich), übernommen. Pilot: Salesforce/Slack-Unterauftragnehmer-PDF neue Fassung „Published: October 20, 2026“ (vorher 02.10.), fast nur Umbruch; sichtbar u. a. Schweiz neu bei den eigenen Rechenzentren, „Apromore Services (legacy)“, „GovCloud (US) Regions“; Atlassian nur Tabellen-Markup, Zoom nur Telefonnummer. Alles übernommen.

## Neu 20.10.2026 ~07:15 (Dauerlauf Laufend): Morgen-Quellenlauf vor dem Gespräch 21.10., nur Menü bei T-Cloud neu

- Trockenlauf 202 URLs: 198 unverändert, 2 verändert, 2 übersprungen. Beide Änderungen sind T-Cloud-Seiten (Zertifikatsübersicht, TISAX-Blogbeitrag); neu ist nur der Menüpunkt „Partner: CIRCLE Partner, TECH Partner“ in der Kopfleiste, an den Zertifikatsangaben nichts. Von Hand gelesen, beide Hashes per `--uebernehmen-nur` übernommen, Prüfdatum 2026-10-20 in allen 21 Anbieter-Dateien.
- 267/267 Tests, Build streng ok, lokal committet, kein Push.

## Neu 20.10.2026 ~06:30 (Dauerlauf Laufend): Live-Seite vor dem Gespräch 21.10. geprüft, alles heil

- Die ausgelieferte Seite belegbar.eu einmal ganz durchgegangen (nur lesen, 0,3 s Abstand): Sitemap 65 Seiten, von dort jeden internen Link und jede eingebundene Datei abgerufen, **163 Adressen, 0 Fehler** (alle HTTP 200).
- 68 erreichbare Vergleichsseiten stehen nicht in der Sitemap. Das ist gewollt (`build.js`:50). Live nachgeprüft: alle 68 tragen `noindex`, keine der 65 Sitemap-Seiten trägt es. Damit stimmt der Stand vom lokalen Check (15.10.) auch online. **Nichts geändert**, Skript und Rohdaten in `~/allein/tmp/wb-eigencheck/` (nicht im Repo).

## Neu 20.10.2026 ~04:55 (Dauerlauf Laufend): Die vier eigenen Fallseiten haben jetzt eine Archivkopie

- Zur Lücke vom 04:10-Lauf: die vier Fallseiten auf belegbar.eu hatten keine Kopie im Internet Archive. Je ein Save Page Now (20.10. 02:50–02:54 UTC, 20 s Abstand), danach die Kopie im Rohformat geholt und gegen die Live-Seite gehasht: **alle vier byte-gleich**.
  - 2026-001 Requesty: web.archive.org/web/20261020025223/https://belegbar.eu/faelle/requesty-zero-data-retention/ — SHA-256 `9f843d8f2800763e4d6119f11934e294254784089108b330ad5bc84b42ced5e8`
  - 2026-002 GreenPT: web.archive.org/web/20261020025132/https://belegbar.eu/faelle/greenpt-iso-27001/ — SHA-256 `5fb8485262f50597aa580c13ed2fd938382b224aceaf59e86a1bbe34942affeb`
  - 2026-003 Black Forest Labs: web.archive.org/web/20261020025054/https://belegbar.eu/faelle/black-forest-labs-zero-data-retention/ — SHA-256 `723343090ef28b07f4c6c1c8611f5623fd62799a5f11fcbfe510be07af6d9765`
  - 2026-004 Scaleway: web.archive.org/web/20261020025347/https://belegbar.eu/faelle/scaleway-generative-apis-no-access/ — SHA-256 `6ea83c377a015757be10e1b08c22d0231cf7e30b1296068b071e5d409abc267a`
- Damit sind die vier Verweise auf eigene Fallseiten in den 21 Dossiers vom 19.10. archiviert (vorher 34 Quellen ohne Kopie, jetzt 30). In die Dossiers selbst ist der Link **noch nicht** eingetragen (Code/Daten unverändert, nichts committet); das gehört zur Entscheidung zu Frage 452. Rohdaten in `~/allein/tmp/wb-fallseiten/` (nicht im Repo).

## Neu 20.10.2026 ~04:10 (Dauerlauf Laufend): Wie viele Dossier-Quellen haben schon eine Archivkopie?

- Zu Frage 452 (Käuferseite verspricht für jede Angabe eine Archivkopie): die 181 verschiedenen Quell-URLs der 21 Dossiers vom 19.10. bei der Wayback-Verfügbarkeitsschnittstelle abgefragt (nur lesen, 20.10. ~04:00).
- **147 haben irgendeine Kopie, 34 keine.** Alter der nächsten Kopie zum Prüftag 19.10.: 22 höchstens 7 Tage, 82 weitere höchstens 30 Tage, 28 bis 180 Tage, 15 älter. Verlinkt sind in den Dossiers bisher nur 13.
- Ohne Kopie vor allem: Zertifikats-PDFs (Nebius 3, DAkkS 3, T-Cloud 2, OVHcloud-Verträge 3), Trust-Portal-Downloads mit Einmal-Link (Mistral 3, BFL, Gcore; vermutlich gar nicht archivierbar) und die **vier eigenen Fallseiten** auf belegbar.eu.
- Heißt: Eine vorhandene Kopie zu verlinken reicht nicht als Beleg, weil sie meist Wochen vom Prüftag abweicht und nicht gegen den Hash geprüft ist. Ehrlich bleibt nur der Satz aus Frage 452 („wo vorhanden“ + Sicherung bei Bestellung). Die eigenen Fallseiten könnte man sofort sichern lassen. **Nichts geändert**, Rohdaten in `~/allein/tmp/wb-dossier/ergebnis.json` (nicht im Repo).

## Neu 20.10.2026 ~01:25 (Dauerlauf Laufend): Google-Fund auf Englisch fürs Gespräch Mi 21.10.

- Die Google-Meldung von heute Nacht liegt jetzt zusätzlich auf Englisch im privaten Gesprächsordner (gitignored); Namen und Datum gegen die Rohkopie vom 20.10. 00:23 nachgeprüft. Der Spickzettel für Mi 21.10. sagt: nur auf Nachfrage zeigen, und nur wenn Felix Frage 462 mit ja beantwortet, sonst bleibt es beim geschwärzten Muster. **Sonst nichts geändert.**

## Neu 20.10.2026 ~00:55 (Dauerlauf Tagesprüfung): Google ändert Unterauftragnehmer, sonst nichts

- 267/267 Tests, Build streng ok (nur Datum, zurückgesetzt), Archivcheck 19 Zitate ok. Quellenlauf trocken: 200 unverändert, 0 verändert, 2 übersprungen. Fälle 003/004: alle 9 Zitate live.
- Wächter: Google Workspace und Google Cloud haben ihre Unterauftragnehmer-Listen geändert („Last modified October 19, 2026“). Workspace: neu NTT MSC Sdn. Bhd (Malaysia), NTT DATA Information Processing Services, NTT Managed Services India, Niveus Solutions (alle Indien, Technical Support); weg Genpact Japan K.K. (AppSheet); NTT DATA Americas jetzt „India, Malaysia, United States of America“ statt nur USA. Cloud: NTT DATA Americas ebenso, sonst nur Umbenennung „Gemini platform“. Zeilenvergleich gegen die Kopien vom 15./17.10., übernommen. OpenAI weiter 403.
- Pilot: nur Slack-Menüpunkt „Frontline“, übernommen.

## Neu 19.10.2026 ~21:15 (Dauerlauf Laufend): Abend-Quellenlauf, IONOS nimmt Mistral Nemo raus, Opper sortiert um

- Trockenlauf 202 URLs: 178 unverändert, 22 verändert, 2 übersprungen (nachts waren es 2). Alle 22 von Hand gelesen, dazu eine 23. (OVHcloud HDS), die während der Übernahme kam.
- **IONOS:** Mistral Nemo Instruct steht nicht mehr in der Preisliste des AI Model Hub (Abruf ~21:05). Die Doku nennt „Mistral Nemo (12B)“ weiter unter „Scheduled for Retirement“ am 22.10.2026, Ersatz Qwen3.5-9B. Im Profil wie Llama 3.1 8B ausgetragen: Preis leer, Status unbelegt, Anmerkung mit beiden Abrufen.
- **Opper Trust Center** („Last updated Oct 19, 2026“, Archivkopie web.archive.org/web/20261019190905): weiter 57 Einträge, jetzt 9 Plattform-Dienstleister + 48 Modellanbieter (vorher 11 + 46). Jina AI und Exa nur umsortiert, Text gleich. Neu bei AWS: liefert auch Modelle über Amazon Bedrock, Datenort jetzt „Germany, France, Sweden, United States, Global“. Als Nachtrag in die Anmerkung der Unterauftragnehmer.
- **Regolo:** AGB mit neu gefasster Weiterverkaufs-Klausel (Pay-per-Token darf weiterverkaufen, Flatrate nicht); Fassung 01.01.2026, AVV 28.01.2026 und das zitierte Ziff. 3.2 (kein Filter) unverändert. Übrige Regolo-Seiten nur neuer Blog-Teaser im Fuß.
- Nur Rauschen: Kolibri-1 (nur `config.json`), BFL-Menü („FLUX 3 Max“), GreenPT (Sprache Französisch), Scaleway-Fuß, Nebius-Banner, Aleph-Alpha-Veranstaltungsbanner, OVHcloud (Menü/Zeichen; Produktliste gleich, weiter ohne AI Endpoints, „Last updated June 2, 2026“).
- Alle 23 per `--uebernehmen-nur`, 267/267 Tests, Build streng ok, lokal `720c078`, kein Push.

## Neu 19.10.2026 ~20:30 (Dauerlauf Laufend): Zwischenziel 28.10. („ein Dossier angeboten“) hat keinen Termin

- Bis Mi 28.10. ist kein Gespräch geplant, in dem ein Gratis-Dossier angeboten wird: das Gespräch am 21.10. hat bewusst keine Dossier-Minute mehr, das Video-Gespräch liegt frühestens am 28.10. abends (Termin unbestätigt), der Pilot-Entwurf für Gespräch 1 wartet auf eine Antwort, das Telefonat ist erst am 30.10.
- Vorschlag: am 21.10. nur ein Schlusssatz mit dem Angebot, keine eigene Minute. Wartet auf Felix (Frage 455 in `~/allein/ALLEIN.md`), Wortlaut privat in `MESSUNG.md`. **Nichts geändert.**

## Neu 19.10.2026 ~19:55 (Dauerlauf Laufend): Käuferseite verspricht mehr als das Dossier

- `/fuer-kaeufer/` (`build.js:989`) verspricht für jede Angabe „Quelle, Prüfdatum, SHA-256 der Quelle und Archivkopie“. Gezählt in den 21 Dossiers vom 19.10.: **314 Angaben-Zeilen, 13 mit Wayback-Kopie** (dazu 4 Verweise auf eigene Fallseiten), 13 mit vollem SHA-256 (alle aus Fällen), der Rest mit 16-stelligem Kurz-Hash des Quellenlaufs über den sichtbaren Text (`lib/dossier.js:87`).
- Das Dossier selbst schreibt ehrlich „wo vorhanden“ (Kopf und Vermerk), nur die Verkaufsseite nicht. Das ist dieselbe Lücke (3) aus dem Spickzettel für das Video-Gespräch, aber hier steht sie als Zusage neben einem Preis.
- Vorschlag: Satz zu „Prüfsumme des gelesenen Texts und, wo vorhanden, Archivkopie; bei Bestellung sichern wir jede Quelle des Dossiers im Internet Archive“ ändern (Test zuerst, lokal, Push nur über `dossiers/push-sauber.sh`). Wartet auf Felix (Frage 452 in `~/allein/ALLEIN.md`). **Nichts geändert.**

## Neu 19.10.2026 ~18:00 (Dauerlauf Laufend): Messdatei für den Kill-Check auf heute gebracht

- Die Messdatei (privat) stand noch auf 18.10. Heute haben drei der sieben Anfragen vom 15.10. geantwortet: eine schriftliche Fachantwort, eine Zusage für ein Video-Gespräch (Termin 28./29.10. vorgeschlagen, Antwort offen) und ein Telefontermin Fr 30.10. 17:00.
- Die schriftliche Fachantwort beantwortet die Vertrauensfrage (nur vollständige Prüfberichte oder Nachweise nach Art. 40/42 DSGVO tragen; die Prüfpflicht geht nur per Vertrag mit festgelegter Haftung über). Nach der Zählregel wäre das **Gespräch 3** und die **zweite genannte Bedingung**. Gezählt wird erst nach Felix' Ja (Frage 450 in `~/allein/ALLEIN.md`).
- Mit Ja: Kriterium 1 = 3 von 5, Kriterium 2 = 2 von 2 (erfüllt), Zwischenziel 11.11. schon erreicht. Einzige echte Lücke bleibt der **Pilot** (noch kein Dossier angeboten, Zwischenziel 28.10.). **Nichts an Daten oder Code geändert.**

## Neu 19.10.2026 ~16:50 (Dauerlauf Laufend): Opt-out-Fund betrifft auch die Dossiers

- Geprüft: alle 21 Dossiers vom 19.10. Prüfpunkt 3 heißt schon „Kein Training mit Kundendaten“, liest aber das Opt-out-Feld (`lib/vorgaben.js:45`).
- **Nur Mistral widerspricht sich im selben Dossier:** Tabelle „Kein Training: ja“, darunter nur ein Opt-out-Schalter und der DPA-Satz „unless … opted-out“. Dieses Dossier bis zur Antwort auf Frage 438 nicht als Gratis-Dossier anbieten. Die anderen 15 „ja“ sind sauber (vier davon ausdrücklich „kein Opt-out nötig“), Black Forest Labs folgerichtig „nein“.
- Kein Dossier sagt, dass ISO 27001 kein Datenschutz-Nachweis nach DSGVO ist. Bei „ja“ zu 438 im selben Durchlauf: Dossiers neu erzeugen und einen Satz unter Prüfpunkt 6 (Test zuerst). **Nichts geändert.**

## Neu 19.10.2026 ~16:25 (Dauerlauf Laufend): Spickzettel für das Video-Gespräch mit der Auditorin

- Für Gespräch 3 von 5 (Termin offen, Gegenvorschlag Mi 28.10./Do 29.10. 17:30) liegt ein Spickzettel im privaten Gesprächsordner (gitignored, neue Regel `17-*.md`): Minutenplan um ihre eigene Frage „wie dokumentiert die Datenbank die Prüfung“, Pilot-Frage, Stand der Doku mit Zahlen (21 Anbieter, 408 Angaben: 259 belegt / 65 beansprucht / 84 unbelegt, 139 Quell-URLs, 232 Einträge im Änderungsprotokoll) und ein Beispiel zum Zeigen.
- Beim Zählen fielen vier eigene Lücken auf, die im Gespräch offen genannt werden sollen: (1) das Prüfdatum trennt nicht „Seite maschinell unverändert gesehen“ von „Angabe von Hand neu gelesen“; (2) `/methodik/` nennt eine Prüfsumme, die Profilseiten zeigen keine; (3) Archivkopien gibt es nur für Fälle, nicht für Profilangaben; (4) fast alle Quellen sind Firmenseiten. **Nichts geändert**; erst ihre Antwort abwarten, dann Vorschlag an Felix.


## Neu 19.10.2026 ~15:30 (Dauerlauf Laufend): Spickzettel für das Telefonat Fr 30.10. 17:00

- Ein weiterer Gesprächspartner aus der Anfrage-Runde vom 15.10. (berät öffentliche Auftraggeber) hat einen Telefontermin gegeben: Fr 30.10. 17:00, Felix ruft an, vertraulich, kein Zitat, kein Name.
- Spickzettel liegt im privaten Gesprächsordner (gitignored): Minutenplan mit Fokus auf das letzte echte Verfahren, die Vertrauensfrage, welche der drei Haftungen eine Vergabestelle braucht, und **Pilot** (Kriterium 3). Nach dem Gespräch fünf Zeilen in den ALLEIN-Tab.
- **Erledigt 21.10. ~19:00:** Minute 12–22 an das Gespräch vom 21.10. angepasst (Nachhak Herkunft/Dokumentation der Prüfung; Frage „reicht versicherte Haftung nur für die Dokumentation, oder muss ein benannter Prüfer zeichnen?“ als Vergabe-Praxis, nicht als Rechtsrat). Das Gespräch vom 21.10. zählt nicht für den Kill-Check (Felix 21.10.).

## Neu 19.10.2026 13:50 Systemuhr (Dauerlauf): ANAB-Verzeichnis wieder gültig

- `anabdirectory.remoteauditor.com` hat seit 19.10. 07:03 GMT ein neues Zertifikat (gültig bis 17.01.2027), Abruf 200 ohne TLS-Fehler. Der Beleg für „DEKRA Inc. ANAB-akkreditiert“ bei T-Systems bleibt, wie er ist. Die Prüfung für So 25.10. entfällt.

## Neu 19.10.2026 ~13:30 (Dauerlauf): eine weitere Prüferin sagt ein Gespräch zu

- Eine der sechs Anfragen vom 15.10. (Auditorin, extern) hat geantwortet: Gespräch per Video ja. Ihre Bedingung vorab: überprüfbare, eher amtliche Quellen, und dass die Datenbank ihre eigene Prüfung dokumentiert.
- Ihre Zeiten liegen werktags tagsüber; ein Antwort-Entwurf mit Gegenvorschlag Mi 28.10./Do 29.10. 17:30 liegt. Felix entscheidet (Frage 442 in `~/allein/ALLEIN.md`). Details privat im Gesprächsordner (gitignored).
- Zählt nach dem Gespräch als Gespräch 3 von 5 für den Kill-Check (Zwischenziel 3 bis 11.11.).

## Neu 19.10.2026 ~13:00 (Dauerlauf Laufend): Datenschutz-Register abgeglichen, nur Vorschlag

- Anlass: derselbe Fachhinweis wie bei LP1. Datenschutzrechtlich tragen nur genehmigte Verhaltensregeln (Art. 40, überwacht nach Art. 41) und Zertifizierungen nach Art. 42, nicht ISO 27001. Gelesen am 19.10. für alle 21 Anbieter: EU Cloud CoC (eucoc.cloud), CISPE (codeofconduct.cloud), Trusted Data Processor (verhaltensregel.eu), Europrivacy, datenschutz cert.
- Im Register steht nur **Seeweb S.r.l.** (Regolo-Mutter): CISPE, 11 IaaS-Dienste, Controlled adherence, erklärt 26.02.2024, fällig 26.02.2027. Die Inferenz von regolo.ai ist kein gelisteter Dienst.
- **OVHcloud** schreibt auf ovhcloud.com/en/compliance/ „signatory of its code of conduct“ (CISPE), steht aber nicht mehr im Register. Laut Wayback stand OVH SA am 13.04.2026 noch drin, damals mit Fälligkeit 01.02.2025. Heute selbst per Abruf bestätigt.
- **T-Systems/Open Telekom Cloud** fehlt im EU-Cloud-CoC-Register (früher Level 2, fällig 06.12.2025, im Wayback-Stand vom 12.04.2026 schon weg), obwohl T-Systems im Blog „mindestens bis Ende 2026“ schrieb.
- AUDITOR, EuroPriSe und TÜV NORD (Art. 42) haben kein öffentliches Verzeichnis: ungeklärt.
- Vorschlag: ein neues Feld je Anbieter „Datenschutz-Nachweis laut Register“ mit Datum. Wartet auf Felix (Frage 441 in `~/allein/ALLEIN.md`). **Nichts geändert**, Details privat im Gesprächsordner (gitignored).

## Neu 19.10.2026 ~12:15 (Dauerlauf Jetzt LP1): „Training-Opt-out“ und ISO 27001 geprüft, nur Vorschlag

- Anlass: Fachhinweis eines Datenschutz-Auditors (Inhalt privat). Gesucht: alle sichtbaren „Opt-out“-Texte (`build.js:468`, `:474`, `:570`, `:1389`) und alle Stellen, an denen ISO 27001 nach Datenschutz-Nachweis klingen könnte.
- Hauptfund: **Mistral** steht bei „kein Training“ auf ja/belegt, hat laut eigener Anmerkung aber nur einen Opt-out-Schalter (Voreinstellung ungeklärt, Preview-Modelle ohne Opt-out); **Black Forest Labs** mit Opt-out steht auf „trainiert“. Mistral besteht dadurch den Filter „nur … belegt“ (`build.js:250`).
- ISO: Fall 2026-002 und die DSGVO-FAQ sind sauber. Zertifikate- und Kommunen-Guide grenzen ISO 27001 nicht von DSGVO-Nachweisen (Art. 40–43) ab; im DSGVO-Guide tragen Abschnitt 4 (Training) und die Kurzformel nicht mehr.
- Vorschlag mit Wortlaut liegt privat (`outreach/gespraeche/15-*.md`, gitignored). **Nichts geändert.** Wartet auf Felix (Frage 438 in `~/allein/ALLEIN.md`); bei „ja“ ein Durchlauf, Test zuerst, Push nur nach „steht“.

## Neu 19.10.2026 ~09:55 (Dauerlauf Laufend): EUrouter-Modellseite ohne Zähler, OVHcloud wieder lesbar

- eurouter.ai/models meldete heute zum 2. Mal „verändert“, nur weil Zähler tickten: Filterleiste (Chat 118 → 119, DeepSeek 7 → 8) und Gesamtzahl (151 → 152 models, oben und unten). Belegt sind aus der Seite nur Preise („$0.30“), die zählen weiter. Die Zählerregel kann jetzt mehrere Abschnitte je URL; für /models fallen die Zahlen der Filterleiste und die Zahl direkt vor „models“ weg, „120+ models“ und alles andere zählen weiter.
- Beim Prüflauf fiel auf: **alle 12 OVHcloud-Quellen meldeten „nicht erreichbar“**. Ursache: ovhcloud.com (alle Hosts) leitet seit heute per 307 auf sich selbst um und setzt dabei ein Cookie `cdn=…`; Node-fetch vergaß das Cookie und lief in die Schleife. Der Quellenlauf folgt Weiterleitungen jetzt selbst und nimmt Cookies desselben Hosts mit (höchstens 10 Sprünge, nie an fremde Hosts). Gilt für Quellenlauf, Linkcheck und Wächter.
- Test zuerst (`test/zaehler-eurouter-models.test.js` 7, 3 vorher rot; `test/cookie-weiterleitung.test.js` 5, alle vorher rot), 267/267, Build streng ok. Live: zwei Abrufe von /models 20 s auseinander mit gleichem Hash, Wortdiff nur weggefallene Zahlen; Trockenlauf danach 199 unverändert, 0 verändert, nur ANAB weiter weg (AN1 ab So 25.10.), OVH 12/12 und dpa.gov.al wieder unverändert. Neue Referenz nur für /models; die falschen „nicht-erreichbar“-Marker aus einem Zwischenlauf sind nicht im Ledger. Lokal `8bf9c1b`, kein Push.

## Neu 19.10.2026 ~05:25 (Dauerlauf Laufend): T-Cloud-Meldung war nur das Menü, ANAB hat ein abgelaufenes Zertifikat

- Die zwei T-Cloud-Seiten (Zertifikatsseite, TISAX-Blog) meldeten „verändert“, weil im Hauptmenü unter Resources → Partner der Punkt „CIRCLE Partner“ wegfiel (je einmal Desktop- und Handy-Menü, daher 2×). Live-Abruf 19.10. ~05:20: C5, ISAE 3000, SOC 1/2/3, TISAX, Level 3, DEKRA, 27017, 27018 stehen weiter auf der Seite. Neue Referenz nur für diese zwei URLs (`--uebernehmen-nur`), keine Zählerregel gebaut (einmalige Menüänderung, kein tägliches Rauschen). 255/255, Build streng ok, lokal `f5c32bb`, kein Push.
- ANAB-Verzeichnis (`anabdirectory.remoteauditor.com`, Beleg für „DEKRA Inc. ANAB-akkreditiert“ bei T-Systems ISO 27001): nicht unser Fehler. Das TLS-Zertifikat der Seite (Sectigo DV) lief am 18.10.2026 23:59 GMT ab, Server erreichbar. Status bleibt vorerst; **ist die Seite am So 25.10. noch nicht wieder gültig, Feld `akkreditiert_dakks` prüfen** (Beleg per Wayback oder anderer ANAB-Quelle, sonst Status zurücksetzen).
- Weiter offen: eurouter.ai/models meldet jetzt auch nur Zähler (118→119, 151→152, 7→8). Wiederholt es sich in der nächsten Tagesprüfung, dieselbe Zählerregel wie bei /providers prüfen.

## Neu 19.10.2026 ~04:10 (Dauerlauf Laufend): EUrouter /providers meldet nicht mehr bei Modellzählern

- Die Seite meldete am 18. und 19.10. „verändert“, nur weil bei Tensorix „23 models“ zu „24 models“ wurde. Jetzt fällt auf eurouter.ai/providers zwischen „EUrouter Providers“ und „Are you looking to become a provider“ nur eine Zahl direkt vor „models“ weg. „17 providers“, Namen, Sitz (HQ), Beschreibungen und alles außerhalb der Liste zählen weiter. Die Regel ist ein optionales drittes Feld in `ZAEHLER_ABSCHNITTE` (`lib/quellen.js`); die Opper-Regel bleibt, wie sie ist.
- Test zuerst (`test/zaehler-eurouter.test.js`, 7 Tests ohne Netz, 3 vorher rot), 255/255, Build streng ok. Live-Probe: zwei Abrufe 20 s auseinander mit gleichem Hash; Wortdiff zum Stand vom 16.10. zeigt nur weggefallene Zähler, nichts dazu. Neue Referenz nur für diese URL (`--uebernehmen-nur`). Lokal `ca928f5`, kein Push.
- Weiter offen für die Tagesprüfung (nicht angefasst): T-Cloud-Zertifikatsseiten (Menüpunkt „CIRCLE Partner“ weg, 2. Tag), ANAB-Verzeichnis nicht erreichbar (fetch failed).

## Neu 19.10.2026 ~03:00 (Dauerlauf Laufend): opper.ai/models meldet nur noch bei den fünf Profilmodellen

- Die Seite meldete am 18. und 19.10. „verändert“, ohne dass sich ein Profilpreis bewegte: Sie ist eine Rangliste von ~1.200 Modellen, oben tickt „1,216 of 1,244“, Rangfolge und Kontextfenster fremder Modelle wechseln täglich.
- Jetzt zählt für diese eine URL nur der Text der fünf Modell-Karten aus dem Profil (Claude Opus 5, Claude Sonnet 5, GPT-5.4, DeepSeek V4 Pro, Gemini 3.5 Flash), jeweils vom Namen bis zur Region-Angabe. Preise stehen in den Karten und zählen weiter. Fehlt eine Karte oder ihr Ende, steht ein Merker im Text und der Hash ändert sich (Alarm statt Schweigen). Ein Test hält die Namensliste gleich den Profilmodellen mit dieser Quelle (`KARTEN_SEITEN` in `lib/quellen.js`).
- Test zuerst (`test/karten.test.js`, 7 Tests ohne Netz), 248/248, Build streng ok. Live-Probe: alle fünf Karten gefunden, Preise gleich dem Profil (5/25, 2/10, 2,5/15, 0,87/1,74, 1,5/9), zwei Abrufe 20 s auseinander mit gleichem Hash. Neue Referenz nur für diese URL, Trockenlauf danach ohne Opper. Lokal `332a95d`, kein Push.
- Weiter offen für die nächste Tagesprüfung (nicht angefasst): EUrouter /providers (Zähler Tensorix 23 → 24, zum 2. Mal), T-Cloud-Zertifikatsseiten (Menüpunkt „CIRCLE Partner“ weg, neu am 19.10.), ANAB-Verzeichnis nicht erreichbar (fetch failed). Wiederholt sich EUrouter, dieselbe Zählerregel wie bei /ai-compliance prüfen.

## Neu 19.10.2026 ~00:30 (Dauerlauf Tagesprüfung): nichts Neues, nichts committet

- 241/241 Tests, Build streng ok (schrieb nur Datum 19.10. in lastmod/feed/daten, nicht committet), Archivcheck 19 Zitate ok.
- Quellenlauf trocken: 198 unverändert, 2 verändert, 2 übersprungen. EUrouter /providers: nur Modellzähler bei Tensorix 23 → 24, weiter 17 Provider wie im Beleg vom 16.10. Opper /models: nur Gesamtzähler und ein Kontextfenster (wie 18.10.). Kein Profil betroffen.
- Wächter: 8 unverändert, OpenAI weiter 403 Bot-Sperre. Pilot (Zoom, Slack, Atlassian, HubSpot, Notion): 10/10 unverändert.
- Fälle 003/004: alle 9 Zitate live (BFL /enterprise beide Sätze im HTML).

## Neu 18.10.2026 ~23:45 (Dauerlauf Laufend): Messdatei auf Felix' Beschluss von 19:37 gebracht

- Die private Messdatei sagte noch „Gespräch 2 nicht bestätigt“ und „Zwischenziele nicht abgenommen“. Beides hat Felix um 19:37 entschieden. Jetzt: Gespräche 2 von 5, Zwischenziel 28.10. bei den Gesprächen schon erreicht; einzige Lücke bis 28.10. ist ein angebotenes Gratis-Dossier (Kriterium 3).
- Posteingang geprüft: von den sieben offenen Anfragen hat noch niemand geantwortet. Nächster Messpunkt Do 22.10.

## Neu 18.10.2026 ~23:20 (Dauerlauf Laufend): Nachher-Zettel für das Gespräch am 21.10.

- Direkt nach dem Gespräch genügen fünf Zeilen mit je einem Wort (Vertrauen, welche Haftung zuerst, reicht Haftung für Tatsachen, Vehikel, Namen/Zitat) im ALLEIN-Tab. Daraus entscheidet der Dauerlauf, ob Anwälte/Versicherer (AV1) und Welle 4 (BV6) losgehen oder ruhen; nichts wird ohne Felix' Zeilen umgebaut.
- Zettel im privaten Gesprächsordner (gitignored), verlinkt aus dem Spickzettel und aus `~/HANDGRIFFE-A-KACHELN.md`. Ohne Angabe zählt das Gespräch nicht in `MESSUNG.md`.

## Neu 18.10.2026 ~22:40 (Dauerlauf Laufend): Opper-Compliance meldet nicht mehr bei jedem Zählerstand

- Die Schwachstelle vom Abend (3. Mal seit 16.10.) ist behoben: Auf opper.ai/ai-compliance fallen in der Tabelle „Data handling by provider“ nur reine Zahlen (Spalte „Models“) aus Hash und Wortliste. Einstufungen (Yes / Abuse monitoring / Retained), Anbieternamen und alle Sätze außerhalb der Tabelle zählen weiter. Die Regel gilt nur für diese eine URL (`ZAEHLER_ABSCHNITTE` in `lib/quellen.js`).
- Test zuerst (`test/zaehler.test.js`, 7 Tests ohne Netz), 241/241. Live-Probe: zwei Abrufe ~20 min auseinander, gleicher Hash; Wortdiff zum alten Stand nur 29 Zahlen weg, nichts dazu. Einmalig neue Referenz per `--uebernehmen-nur`. Lokal `1865bd8`, kein Push.
- Im selben Lauf gemeldet, nicht angefasst: opper.ai/models (Gesamtzähler 1,215 → 1,216, ein Kontextfenster 524K → 1M). Kein Profilpreis betroffen; liest die nächste Tagesprüfung. Wiederholt sich das täglich, dieselbe Regel für /models prüfen.

## Neu 18.10.2026 ~21:00 (Dauerlauf BV5 Teil 1): Welle 4 gesammelt, niemand angeschrieben

- Das BvD-Verzeichnis lässt sich ohne Browser lesen. Nur der Filter „AI-qualified“ (BvD-Zertifikat) wirkt, die übrigen Qualifikations-Filter gibt die Seite ungefiltert zurück. Bundesweit tragen 25 Einträge das Zertifikat, **in Köln/Düsseldorf nur einer (Bonn), in ganz NRW zwei**. Auf zwei Kölner Profilen stand „AI-qualified DPO“ nur im Fußmenü der Seite, beide sind aussortiert.
- 10 Kandidaten + 4 Reserve mit Profiltext und SHA je Detailseite liegen im privaten Gesprächsordner (Welle 4, gitignored). Die meisten gehen nur per Video.
- **Teil 2 nicht vor Mi 21.10. 20:00:** erst wenn nach dem Gespräch am 21.10. klar ist, dass das Vehikel bleibt, je ein Entwurf mit der Vertrauensfrage, Kontakt vorher auf der eigenen Website gegenprüfen, dann EINE Stapel-Mail an Felix.

## Neu 18.10.2026 ~20:00: Entscheidungen Felix (Mail 19:37, alles wie vorgeschlagen)

- Welle 4: 8–10 externe Datenschutzbeauftragte mit KI-Qualifikation in Köln/Düsseldorf aus dem öffentlichen BvD-Verzeichnis, Gesprächsanfragen nur als Entwurf, Felix gibt frei.
- Zählung Kill-Check: die schriftliche Antwort vom 15.10. zählt als Gespräch 2 (Stand 2 von 5); Zwischenziele 2 bis 28.10., 3 bis 11.11., 4 bis 18.11., 5 bis 02.12.
- Berufsrecht-Anwälte und Versicherer erst nach dem Gespräch am 21.10. und nur, wenn Fakten-Haftung den Kunden des Gesprächspartners reicht.

## Neu 18.10.2026 ~19:06 (Dauerlauf Laufend): Abend-Quellenlauf, nur Opper, nichts Inhaltliches

- Trockenlauf 202 URLs: verändert nur opper.ai/ai-compliance und opper.ai/models. Abruf 18.10. ~19:05: Das zitierte FAQ („Every call is logged with model, cost, latency, and policy decisions …“) steht wörtlich, weiter ohne „Last updated“. Geändert hat sich nur die Anbieter-Tabelle (55 Provider, Modellzähler und Einstufungen „Yes/Abuse monitoring/Retained“). Auf /models stehen alle fünf Profilpreise gleich (Opus 5 5/25, Sonnet 5 2/10, GPT-5.4 2,5/15, DeepSeek V4 Pro 0,87/1,74, Gemini 3.5 Flash 1,5/9). Neu sind nur Zähler, ein Cache-Read-Preis 0,11 → 0,10 $ bei einem Modell außerhalb des Profils und mehr Routen-Namen (Azure, AWS Bedrock) in den „Available on“-Zeilen.
- Beide per `--uebernehmen-nur`, dabei entstand der erste Wortstand für 51 weitere Quellen (meist PDFs, Folge von `649efe6`). 234/234 Tests, Build streng ok, lokal `29ae083`, kein Push.
- Schwachstelle (nicht gebaut): Die Zähler-Tabelle auf /ai-compliance ändert sich mehrmals am Tag (zwischen Trockenlauf und Übernahme ~10 min erneut). Die Seite meldet darum fast täglich „verändert“. Möglicher Fix wie bei Hugging Face: für diese URL nur den FAQ-Block hashen. Erst bauen, wenn es sich wiederholt (heute zum 3. Mal seit 16.10.).

## Neu 18.10.2026 ~19:00 (Dauerlauf Laufend): Reserve für Gespräche 2–5 steht bereit

- Falls die sechs Anfragen vom 15./16.10. bis Do 29.10. weniger als zwei Termine bringen: zwei Ersatz-Prüfer (externer DSB Köln, AVV-Prüfer Bayern) sind am 18.10. live nachgeprüft (Beitrag, Impressum, Adresse), je ein fertiger Text liegt im privaten Gesprächsordner. Zwei weitere Reserve-Namen sind nicht mehr sauber belegt und bleiben draußen.
- Nichts gesendet, kein Entwurf angelegt. Ab 29.10. eine Ja/Nein-Frage an Felix, dann Entwürfe. Lokal nur `.gitignore` committet (`036b205`), kein Push.

## Neu 18.10.2026 ~17:10 (Dauerlauf Laufend): Notion-Beleg jetzt auch wörtlich zitierbar

- Grenze aus WP1 behoben: Der Wort-Beleg ist sortiert und taugt nicht als Zitat. Neu legt der Wächter daneben `<anbieter>-<art>-lesefolge.txt` ab: der Text in Seitenreihenfolge, eine Zeile je Block, Tabellenzeilen als „Subprocessor | Purpose of Processing | Location“, mit eigenem SHA in `SHA256SUMS`.
- Der Ledger-Hash bleibt der über die sortierten Wörter, alte Einträge bleiben gültig. Reihenfolge kommt aus dem Seitenbaum (`content`), Spalten aus `table_block_column_order`; Blöcke außerhalb des Baums hinten, nichts geht verloren.
- Test zuerst (4 Tests ohne Netz), 234/234, Build streng ok. Probe ohne Schreiben gegen die zwei echten Notion-Seiten: AVV 147 Zeilen, Liste 68 Zeilen, Zeilen lesen sich wie die Seite, Hashes gleich dem Pilot-Ledger. Lokal `5710677`, kein Push.

## Neu 18.10.2026 ~16:10 (Dauerlauf, WP1): Notion-Meldungen haben jetzt einen echten Beleg

- Bisher legte der Wächter bei einer Notion-Seite nur die HTML-Hülle (~15 Wörter) als Rohkopie ab; eine Notion-Meldung hätte keinen lesbaren Beleg gehabt.
- Jetzt landet der Text aus der Seiten-API als `<anbieter>-<art>.txt` in `roh/<datum>/`, mit SHA in `SHA256SUMS`. Der Text ist genau das, worüber der Ledger-Hash läuft: die ersten 16 Zeichen des SHA sind gleich dem Ledger-Hash, der Beleg lässt sich also gegen den Ledger nachrechnen. Scheitert die API, bleibt es beim Abruf wie bisher (kein falscher .txt-Beleg aus der Hülle).
- Grenze: die Wörter sind sortiert (so hasht der Quellenlauf), die Lesereihenfolge geht im Beleg verloren. Für „welcher Unterauftragnehmer kam dazu“ reicht das, für ein wörtliches Zitat nicht (dann Seite im Browser speichern).
- Test zuerst (2 Tests ohne Netz), 230/230; Probe ohne Schreiben gegen die zwei echten Notion-Seiten: 6146 und 724 Wörter, Hashes gleich dem Pilot-Ledger. Lokal `60747e7`, kein Push.

## Neu 18.10.2026 ~15:50 (Dauerlauf Laufend): Probe-Pilot mit fünf Büro-Tools läuft

- Der Wächter kann jetzt eine zweite, getrennte Liste führen: `WAECHTER_DIR=waechter/pilot node waechter.js` (nur Unterordner von `waechter/`, bleibt gitignored). Test zuerst, 228/228, Build streng ok, lokal `57ed244`, kein Push.
- Probe-Pilot gestartet 18.10.: Zoom, Slack, Atlassian, HubSpot, Notion, je AVV + Unterauftragnehmer-Liste (10 Quellen; Auswahl ist eine Annahme, nicht die Tools eines echten Kunden). Erster Lauf: alle 10 gelesen, Wortstände 724 bis 20.054 Wörter, keine DÜNN-Meldung; Gegenlauf nach 20 s: 10/10 unverändert. Läuft ab jetzt in jeder Tagesprüfung mit, damit es bei einem Pilot schon eine Verlaufsreihe gibt.
- Schwachstelle gefunden (nicht gebaut): Die Rohkopie als Beleg (`sichereRoh`) lädt bei Notion die HTML-Hülle, nicht den Text aus der Seiten-API. Der Beleg einer Notion-Meldung wäre damit leer. Fix: bei Notion die API-Wörter als Textbeleg mit SHA ablegen.

## Neu 18.10.2026 ~14:50 (Dauerlauf Laufend): Notion-Seiten ohne Browser lesbar

- Notion veröffentlicht Unterauftragnehmer-Liste und AVV als Notion-Seiten. Deren Text lädt erst im Browser; ohne Browser sah der Wächter nur ~15 Wörter Hülle und meldete DÜNN (Lücke 2 der Pilot-Prüfung, Handabruf 1x pro Woche).
- Jetzt liest `pruefe` Seiten unter `<x>.notion.site/…-<32 Hex>` über die offene Seiten-API (`/api/v3/loadPageChunk`, blättert per Cursor, höchstens 30 Chunks) und hasht die Wörter, wie bei den Hugging-Face-Karten. Geht die API nicht oder liefert sie keinen Text, gilt der alte HTML-Hash, und die DÜNN-Meldung greift weiter.
- Probe 18.10.: Liste 724 Wörter (vorher 15), AVV 6.146 Wörter, je zwei Abrufe im Abstand von 15 s gleicher Hash. In Listen die `notion.site`-Adresse eintragen; `notion.so`/`notion.com` leiten ohne Browser auf eine 404.
- Test zuerst (`test/notion.test.js`, 4 Tests ohne Netz), 227/227, Build streng ok, lokal `3c8544e`, kein Push. Offen aus der Pilot-Prüfung bleibt nur das Feld „für welchen Kunden“ (erst ab zwei Kunden nötig).

## Neu 18.10.2026 ~13:50 (Dauerlauf Laufend): Wortprotokoll jetzt auch für PDF-Quellen

- Bisher meldeten Quellenlauf und Wächter bei geänderten PDFs (AVV, Unterauftragnehmer-Listen als PDF) nur „verändert“, ohne zu sagen, welche Wörter weg oder dazu sind. Eine Meldung brauchte einen Handvergleich (~15 min je Fund).
- Jetzt liest `woerterPdf` den Text über pdftotext (xpdf, liegt Git for Windows bei; Suche: `PDFTOTEXT`, PATH, Git-Pfad). Der Ledger-Hash bleibt der Byte-Hash, alte Einträge bleiben gültig. Fehlt pdftotext, läuft alles wie vorher. Probe an einem echten 15.600-Wörter-AVV ok.
- Der Wortstand für PDFs entsteht beim nächsten echten Lauf (Tagesprüfung), ab dann zeigt „verändert“ die Wörter. Test zuerst (`test/pdf-woerter.test.js`, Mini-PDF ohne Netz), 223/223, Build streng ok, lokal `649efe6`, kein Push.

## Neu 18.10.2026 ~11:40 (Dauerlauf Laufend): Opper, Gemini-Regionsangabe berichtigt

- Der Quellenlauf meldete opper.ai/models und /ai-compliance erneut als verändert. Abruf 18.10.: Die Preise aller fünf Profilmodelle stehen unverändert (Opus 5 5/25, Sonnet 5 2/10, GPT-5.4 2,5/15, DeepSeek V4 Pro 0,87/1,74, Gemini 3.5 Flash 1,5/9; „0813“ weiter 1,06/2,60). Auf /ai-compliance hat sich nur die Zählertabelle geändert, das zitierte FAQ steht wortgleich.
- Fehler gefunden: Die Anmerkung zu Gemini 3.5 Flash nannte noch „Google Cloud (US)“ und den Region-Tag „US, Multi, EU“ (Stand 03.10.). Live steht „Available on Google Cloud“ ohne Region und der Tag „Multi, EU“, so auch schon im Beleg vom 17.10. Wann sich das geändert hat, ist ungeklärt. Die Anmerkung ist berichtigt. Das Feld `standort` bleibt bewusst stehen, weil Opper nicht sagt, was „Multi“ heißt; ein „EU + Multi“ würde die EU-Prüfung fälschlich auf „ja“ setzen.
- Archivkopie web.archive.org/web/20261018093030, Beleg `belege/anbieter/opper-ai/opper-models-2026-10-18.txt` + SHA, beide Quellen per `--uebernehmen-nur`. 217/217 Tests, Build streng ok, lokal `10388d4`, kein Push.

## Neu 18.10.2026 ~05:20 (Dauerlauf Laufend): Exoscale HDS, Register bleibt für den Rechner gesperrt

- Das ANS-Register (esante.gouv.fr, Liste der HDS-Hoster) liefert dem Rechner nur die Incapsula-Sperrseite, per curl und auch im automatisierten Chrome („Request unsuccessful“). Der Quellenlauf führt es richtig unter „übersprungen“ (seit 16.10.), es ist kein echter Änderungsfall.
- Gegenprobe über Exoscales eigene Seiten (Abruf 18.10.): exoscale.com/compliance/hds/ und die Compliance-Seite nennen HDS weiter mit Scope 1–4 und 6. Als Satz in der HDS-Anmerkung des Profils ergänzt; Status „belegt“ und Prüfdatum 14.10. bleiben, Registerstand bleibt der vom 09.10.
- 217/217 Tests, Build streng ok, lokal `0f13859`, kein Push. Der Blick ins Register geht nur in einem normalen Browser (Handgriff für Felix, eine Minute, nicht eilig).

## Neu 18.10.2026 ~04:55 (Dauerlauf Laufend): letzte fünf offenen Quellen gelesen, Quellenlauf wieder leer

- T-Systems (Zertifikatsseite + TISAX-Blog): neu ist nur der Menüpunkt „Database & Analysis“. Alle zitierten Sätze stehen live (C5 Typ II, „This report verifies…“, „ISO27001 Audits by DEKRA“, SOC-3-PDF-Link, TISAX „protection level three for the Netherlands region“, „P0R4YM“, „between January and June, DEKRA…“).
- Nebius auf OpenRouter: Seite nennt jetzt 14 Modelle (03.10.: 10, 08.10.: 12); Llama 3.3 70B hat weiter keinen Nebius-Endpunkt (Endpunkt-API), Anmerkung ergänzt, Beleg `belege/anbieter/nebius/provider-seite-2026-10-18.txt`. Preise waren um 02:20 schon geprüft.
- Opper: /models und /ai-compliance wie in der Tagesprüfung 18.10. gelesen (nur Liste/Zähler, Profilpreise gleich).
- Alle fünf per `--uebernehmen-nur`. 217/217 Tests, Build streng ok, lokal `802ad3b`, kein Push. Offen bleibt nur Exoscale HDS-Liste (Browser).

## Neu 18.10.2026 ~04:35 (Dauerlauf Laufend): BFL, vier offene Quellen gelesen, neues Modell FLUX 3 Image Klein

- Preisdatenbank (Sanity-Abfrage, Abruf 18.10.): alle bisherigen Preise unverändert. Neu ist nur eine Karte „FLUX 3 Image Klein“ (`/v1/flux-3-image-klein`), 0,008/0,009/0,011/0,014/0,036 $ je Bild (768/1k/1.5k/2k/4k). Die Release Notes vom 15.10. (docs.bfl.ai/release-notes) nennen dieselben Preise, 5,6 Mrd. Parameter, offene Gewichte unter „FLUX Kommunity License“ (Lizenztext nicht geprüft). Als eigenes Modell ins Profil, Prüfdatum 18.10.
- Fehlerseite (Moderations-Belege): nur das Ankündigungs-Banner ist neu, die zitierten Sätze zu „Request Moderated“/„Content Moderated“ stehen unverändert.
- ISO-27001-Zertifikat (Trust-Center-PDF): Nummer 269758, Erstzertifizierung 01.12.2025, Ablauf 30.11.2028, Geltungsbereich und Standorte gleich. Inhabername („Black Forest Labs Inc. & BFL GmbH“) und Ausstellerzeile („British Assessment Bureau Limited t/a Amtivo“) lauten anders als das alte Zitat; ob das PDF umformuliert wurde, ist ungeklärt (keine Kopie vom 09.10.). Zitat berichtigt, Textauszug + SHA unter `belege/anbieter/black-forest-labs/`.
- Preis-Belege `belege/preise/black-forest-labs/2026-10-18-*`, vier Quellen per `--uebernehmen-nur`. 217/217 Tests, Build streng ok. Lokal committet, kein Push.
- Weiter offen: Nebius-Seite auf OpenRouter (Zahlen, Preise schon über die API geprüft), Opper (Zähler), T-Systems (zwei Seiten, nur „&amp;“/„Analysis“/„Database“ neu), Exoscale HDS-Liste (Browser).

## Neu 18.10.2026 ~04:30 (Dauerlauf Laufend): Kill-Check-Stand auf 18.10. nachgezogen (privat)

- Die Tabelle in der privaten Messdatei stand noch auf 15.10. Neu: Gespräche 1 sicher, 2 nach der Zählregel (eine schriftliche Antwort auf die Vertrauensfrage, als Gespräch noch nicht von Felix bestätigt, Frage 406); Bedingungen 1 von 2 (von Felix am 15.10. gezählt); Pilot 0, auch noch keiner angeboten. 52 Tage bis Mi 09.12., nächster Messpunkt Do 22.10.
- Befund: Der Pilot ist das schwächste Kriterium. Beide schriftlichen Antworten sagen, ein Dossier ohne Haftung habe keinen Wert; ein Pilot gelingt eher als Arbeitsvorlage denn als Beleg (Vermutung, die Gespräche ab 22.10. zeigen es). Keine Vorlage geändert, nichts gesendet.

## Neu 18.10.2026 ~03:45 (Dauerlauf Laufend): Antworten auf die Gesprächsbitten vorbereitet (privat)

- Für die sechs noch offenen Gesprächsbitten (gesendet 15./16.10., Antworten ab Do 22.10. erwartet) liegt ein privates Blatt mit je einer fertigen Antwort für Zusage, Rückfrage, Absage und „keine Antwort bis 29.10.“ sowie Terminvorschlägen ab Mi 28.10. Felix sagt nur „Name, Fall, Termin“, der Dauerlauf füllt aus und sendet. Gmail 18.10. ~03:40: noch keine Antwort. Datei gitignored (`.gitignore` lokal `d221cfc`), kein Push.

## Neu 18.10.2026 ~03:30 (Dauerlauf Laufend): Hugging-Face-Karten jetzt über die Git-Revision überwacht

- Die Idee von 02:40 ist gebaut: Für Modellseiten `huggingface.co/<org>/<modell>` hasht der Quellenlauf nicht mehr die HTML-Seite (Download-, Like- und Org-Zähler ticken täglich), sondern `sha` und `lastModified` aus der offenen API `huggingface.co/api/models/<id>`. Ist die API nicht lesbar oder fehlt `sha`, gilt wie bisher der HTML-Hash. Das Wortprotokoll zeigt bei einer echten Änderung die alte und neue Revision.
- Einmalige Umstellung: Die drei Aleph-Alpha-Karten meldeten wegen der neuen Hash-Grundlage „verändert“. Die Revisionen stimmen mit der Handprüfung von 02:40 überein, darum per `--uebernehmen-nur` übernommen. Danach meldet ein Trockenlauf keine HF-Quelle mehr.
- 4 neue Tests (217/217), Build streng ok. Lokal committet, kein Push.

## Neu 18.10.2026 ~02:40 (Dauerlauf Laufend): Aleph Alpha, drei Hugging-Face-Karten gelesen, nur Zähler, lokal `a26c8e4`

- Der Quellenlauf meldete Kolibri-1 (offen seit 16.10.) und die zwei Pharia-Karten (seit 17.10.) als verändert. Über die offene API (`huggingface.co/api/models/Aleph-Alpha/<id>`, Abruf 18.10. 00:36 UTC) die Git-Revision jeder Karte geprüft: Kolibri-1 `lastModified` 16.10. 10:14 wie im Beleg vom 16.10., Pharia-LLM (2024-08-30) und Pharia-Embedding (2024-12-19) unverändert. Geändert haben sich nur Downloads (17.864 → 19.214), Likes (944 → 948), der Organisations-Zähler (992 → 996) und ein neu verlinktes Fremd-Finetune (`angelosb3/kolibri-1-opencode`).
- Beleg `belege/anbieter/aleph-alpha/hf-revisionen-2026-10-18.txt` + SHA, `--uebernehmen-nur` für die drei Karten (Prüfdatum 18.10.). 213/213 Tests, Build streng ok. Kein Push.
- Weiter offen: BFL (Preise nur im Browser), Exoscale HDS-Liste (Browser). Idee für später: HF-Karten über die API-Revision statt über die HTML-Seite überwachen, dann fallen die Zähler-Meldungen weg (nicht gebaut).

## Neu 18.10.2026 ~02:20 (Dauerlauf Laufend): Nebius auf OpenRouter, Preise unverändert

- Über die offene API (`openrouter.ai/api/v1/models/<id>/endpoints`, Abruf 18.10. 00:14 UTC) die drei Profilmodelle mit Nebius-Endpunkt gelesen: GLM-5.1 1,40/4,40, gpt-oss-120b 0,15/0,60, Qwen3-235B 0,20/0,60 USD je 1M, alle wie im Profil. Llama 3.3 70B hat weiter keinen Nebius-Endpunkt (bleibt „unbelegt“). Randnotiz: Der Qwen3-Endpunkt trägt bei OpenRouter `status -2` (die anderen 0); was das Feld bedeutet, ist ungeklärt, nicht übernommen.
- Beleg `belege/anbieter/nebius/openrouter-endpunkte-2026-10-18.txt` + SHA. Profil nicht geändert. Kein Push.
- Weiter offen: BFL (Preise nur im Browser), Aleph Alpha (Pharia-Zähler), Exoscale HDS-Liste (Browser).

## Neu 18.10.2026 ~01:45 (Dauerlauf Laufend): EUrouter-Modellseite gelesen, Gemma 4 wieder teurer

- `eurouter.ai/models` + Modell-API `api.eurouter.ai/api/v1/models` (Abruf 18.10.): weiter **151 Modelle**, keins neu, keins weg. Profilpreise DeepSeek V3.2 0.30/0.50, Kimi K2.6 0.73/3.50, Mistral Large 3 0.55/1.65 und alle Claude-Varianten unverändert, Prüfdatum 18.10.
- **Gemma 4 Output $0.20 → $0.50** (Input $0.10 gleich), Modellseite und API gleich; Archivkopie web.archive.org/web/20261017233433 zeigt $0.50. Die API führt Gemma 4 wieder mit `currency: EUR` (am 16.10. `USD`). Verlauf damit 0.35 (bis 08.10.) → 0.50 (09.10.) → 0.20 (16.10.) → 0.50 (18.10.), ohne Änderungsdatum bei EUrouter. Als Anbieter fehlt jetzt AR Arkane SARL (16.10. noch da). Beleg `belege/anbieter/eurouter/gemma-4-2026-10-18.txt` + SHA, Preisarchiv `belege/preise/eurouter/2026-10-18-*`.
- Weitere Preisänderungen in der API, alle nicht im Profil: deepseek-v4-pro 1.70/3.40 → 1.75/3.50, glm-4.7 0.70/2.80 → 0.72/2.64, glm-5.3 1.40/4.40 USD → 1.47/4.62 EUR, llama-3.3-70b 0.70 → 0.71, minimax-m3 0.30/1.20 → 0.40/2.00, ministral-3-14b 0.15 → 0.22, mistral-medium-3.5 gleich, aber USD → EUR. Das Hin und Her bei Gemma 4 (dreimal in zehn Tagen) ist ein gutes Beispiel für den Änderungs-Wächter.
- `--uebernehmen-nur https://eurouter.ai/models` (setzt wie vorgesehen das Prüfdatum aller unveränderten Quellen auf 18.10.). 213/213 Tests, Build streng ok. Kein Push.
- Weiter offen: BFL (Preise nur im Browser), Aleph Alpha (Pharia-Zähler), Nebius auf OpenRouter, Exoscale HDS-Liste (Browser).

## Neu 18.10.2026 ~01:05 (Dauerlauf Laufend): Spickzettel fürs Gespräch am 21.10. nachgezogen

Der private Spickzettel (eine Bildschirmseite) enthält jetzt das Ergebnis der Haftungs-Recherche und die Vehikel-Fragen als Minute 22–24
(drei Fragen, Felix wählt zwei) sowie je Antwort den nächsten Schritt. Kein neues Material, nur zusammengeführt; nichts gesendet, nichts committet.

## Neu 18.10.2026 ~00:30 (Dauerlauf): Kann Felix der Haftende sein? (vor dem Gespräch am 21.10.)

Abschnitt 7 im privaten Entscheidungsblatt (Recherche mit Quellen privat daneben). Ergebnis: ja für Tatsachen, als Einzelunternehmer,
mit Versicherung (Kandidat Markel Pro Media, 500.000 € ≈ 340 € netto/Jahr) und ohne Wörter wie „konform“; keine UG jetzt.
Zwei Anwalts-Entwürfe auf die Frage „Haftung für Tatsachen ohne Rechtsdienstleistung?“ geschärft, eine Deckungsanfrage an
den Versicherer als Entwurf (Empfänger fehlt noch). Nichts gesendet, alles wartet auf Felix' Freigabe nach Gespräch 2 (21.10.).

## Neu 17.10.2026 ~22:45 (Dauerlauf): Entscheidungsblatt Vehikel vor dem Gespräch am 21.10.

- Auf Felix' Auftrag (Idee gut, Vehikel vielleicht falsch; mehrere Abos; einen Prüfer dazuholen) ein privates Blatt im Gesprächsordner, eine Seite, nichts entschieden. Empfehlung: Vehikel erst nach dem Gespräch am 21.10. wechseln; Kandidat „belegbar liefert, ein benannter Prüfer zeichnet“. Drei Fragen an Felix (389–391), Antwort bis Di 20.10. abends. Datei ist in `.gitignore` (lokal `174121e`).

## Neu 17.10.2026 ~12:50 (Dauerlauf Laufend): STACKIT, Preise jetzt direkt je Modell belegt, lokal `f3f3a2e`

- `stackit.com/en/products/data-ai/stackit-ai-model-serving`: Die Preistabelle nennt jetzt jedes Modell einzeln (bis 16.10. nur Kategoriepreise Standard/Plus/Premium, ohne Modellnamen). Für die vier Profilmodelle: Llama 3.3 70B, GPT-OSS 120B, Gemma 4 31B je 0,45/0,65 €, Qwen3-VL 235B 1,50/1,75 € (je 1M In/Out, EU01). Damit war der Grund für den leeren Preis weg (nur ableitbar, nicht direkt verlinkt). Die Preise stehen jetzt im Profil, die Quelle der vier Modelle ist die Produktseite, und die Doku-Modellseite (Region „Germany South“, Status) steht in der Anmerkung. Die Übersicht zeigt STACKIT mit „ab 0,45 €“ statt „–“. Der Trainings-Satz ist wortgleich.
- `why-stackit/benefits/certificates`: Alle zitierten Sätze (C5 Type 2, 21 Produkte inkl. AI Model Serving, ISAE 3000/3402, ISO 27001/27017/27018, TISAX ATA163-1/SH938N, „The data is also backed up“) sind wortgleich, die Zertifikatslinks unverändert. Neu ist nur der Rechenzentrums-Block anstelle der alten Standortliste: „The certifications apply to Schwarz Digits KG, Schwarz Digits IT KG and Schwarz Digits Cloud GmbH & Co. KG as units of the Schwarz Group.“ (gilt dort für Rechenzentrums-Zertifikate). Das ist eine Randnotiz und nicht übernommen.
- Archivkopien web.archive.org/web/20261017104106 (Produktseite) und …/20261017104129 (Zertifikate), beide byte-gleich zum Abruf. Textauszüge `belege/anbieter/stackit/{produktseite-preise,zertifikate}-2026-10-17.txt` + `SHA256SUMS`, beide per `--uebernehmen-nur` übernommen. 213/213 Tests, Build streng ok. Kein Push.
- Nebenwirkung: Die Doku-Modellseite ist keine `quelle` mehr und wird darum vom Quellenlauf nicht mehr überwacht. Verschwindet ein Modell, fällt es trotzdem auf, weil es dann auch aus der Preistabelle der Produktseite fehlt.
- Weiter offen: BFL (Preise nur im Browser), Aleph Alpha (Pharia-Zähler), EUrouter-Modelle, Nebius auf OpenRouter, Exoscale HDS-Liste (Browser).

## Neu 17.10.2026 ~19:30 (Dauerlauf): Anfrage an deutsche Berufsrechtler vorbereitet

- Nach Frage 383: zwei deutsche Anwälte mit belegter Spezialisierung auf Berufsrecht/RDG ausgewählt, Anfrage als Gmail-Entwurf (RDG-Grenze für den Software-Teil, Honorar des zeichnenden Anwalts, gibt es ein Muster). Nichts gesendet; Freigabe einzeln durch Felix (Frage 388). Namen und Belege privat.

## Neu 17.10.2026 ~11:20 (Dauerlauf): Schweizer Anwalt sagt ab

- Antwort auf die Nachfrage vom 16.10.: keine Einschätzung zu Berufsrecht/Honorar/RDG, kein Gespräch; Verweis auf seine Veröffentlichungen erlaubt. Grund: keine Auskunft, für die er haften müsste. Zählt nicht für den Kill-Check. Auswertung privat (GESPRAECHE-2-5, Antwort C). Anwalt-Preisstufe bleibt offen, bis ein deutscher Berufsrechtler antwortet (Frage 383).

## Neu 17.10.2026 ~11:30 (Dauerlauf Laufend): Opper, drei gemeldete Quellen gelesen, nichts Inhaltliches, lokal `e1b223b`

- `opper.ai/ai-compliance`: FAQ-Satz zu EU AI Act/DORA/NIS2 wortgleich (Profil `ai_act`), Seite weiter ohne „Last updated“. Geändert hat sich nur die Live-Tabelle „Data handling by provider“: Lyceum (EU, ZDR Yes) neu, Zählerstände. Randnotiz, nicht übernommen: In dieser Tabelle führt Opper Scaleway und Alibaba mit „Abuse monitoring“, GreenPT mit „Yes“ (Opper-Sicht, keine Anbieterquelle).
- `opper.ai/models`: alle fünf Profilpreise unverändert (Opus 5 5/25, Sonnet 5 2/10, GPT-5.4 2,50/15, DeepSeek V4 Pro 0,87/1,74, Gemini 3.5 Flash 1,50/9; 0813 weiter 1,06/2,60), 1.220 statt 1.206 Modelle, Lyceum EU als neue Route.
- `opper.ai/security-overview`: Text gegen Beleg vom 15.10. Satz für Satz gleich, nur die Fußzeile (Menü) anders.
- Belege `belege/anbieter/opper-ai/opper-{ai-compliance,models,security-overview}-2026-10-17.txt` + `SHA256SUMS`, Hashes per `--uebernehmen-nur`. 213/213 Tests, Build streng ok. Kein Push.
- Weiter offen: BFL (Preise nur im Browser), STACKIT Preisseite + Zertifikate, Aleph Alpha (Pharia-Zähler), EUrouter-Modelle, Nebius auf OpenRouter, Exoscale HDS-Liste (Browser).

## Neu 17.10.2026 ~10:55 (Dauerlauf Laufend): Scaleway, Preisseite und Datenschutz-Doku gelesen, nichts Inhaltliches

- `scaleway.com/en/pricing/model-as-a-service/`: alle sechs Profilpreise unverändert (gpt-oss-120b 0,15/0,60, Llama 3.3 70B 0,90/0,90, Mistral Small 3.2 0,15/0,35, Qwen3 235B 0,75/2,25, deepseek-v4-flash-0731 0,40/0,80, GLM-5.2 1,80/5,50). Neu sind nur das OCR-Modell „lightonocr-3-0.8b“ (2,20 €/1M) und ein Banner „Discover the products available in Milan“. Daneben steht `deepseek-v4.1-flash` (0,60/1,80), nicht im Profil; seit wann, ist ungeklärt.
- `docs/generative-apis/reference-content/data-privacy/`: weiter „Reviewed on October 03, 2025“, Trainings-Satz und „Paris, France“ wörtlich da; geändert hat sich nur das Seitenmenü (Containers/Functions).
- Textauszüge `belege/anbieter/scaleway/preise-maas-2026-10-17.txt` und `datenschutz-genapis-2026-10-17.txt` + `SHA256SUMS`, beide per `--uebernehmen-nur` übernommen. 213/213 Tests, Build streng ok (das Datum 17.10. aus dem Build ist jetzt mit committet). Kein Push.
- Weiter offen: BFL (Preise nur im Browser), Opper, STACKIT Preisseite + Zertifikate, Aleph Alpha (Kolibri-Zähler, Pharia-Karte), EUrouter-Modelle, Nebius, Exoscale HDS-Liste (Browser).

## Neu 17.10.2026 ~10:20 (Dauerlauf Laufend): T-Systems, vier gemeldete Quellen gelesen, nichts Inhaltliches

- `docs.llmhub.t-systems.net/models/llms/`: alle vier Profilpreise unverändert (Mistral Small 4 0,60/1,20, GPT-OSS 120B 0,20/0,65, GPT-5 1,20/9,55, Claude 4.6 Sonnet 2,97/14,85). Neu ist nur das Modell „d3“ (Independent maker, auf T-Cloud Public, Plan „Test“, ohne Preis), 39 statt 38 Modelle, dazu ein neues Werbebanner. Steht nicht im Profil, also keine Änderung. Textauszug `belege/anbieter/t-systems/llmhub-modelle-2026-10-17.txt` + SHA.
- `reference/enterprise-trust`: nur das Banner gewechselt (d3 statt Chat-Werbung), Kategorien 1/2 unverändert.
- `t-cloud-public.com` Zertifizierungen und TISAX-Blog: nur das Menü (Branchen „Finance & insurance“ statt der alten Punkte).
- Alle vier per `--uebernehmen-nur` übernommen (setzt wie vorgesehen auch das Prüfdatum der unveränderten Quellen auf 17.10.). 213/213 Tests, Build streng ok. Kein Push.

## Neu 17.10.2026 ~00:15 (Dauerlauf Tagesprüfung): nichts Neues, nichts committet

- 213/213 Tests, Build streng ok, Archivcheck 19 Zitate ok. Fälle 003/004: alle Zitate live (Scaleway-Zusatz „except temporarily…“ seit 03.10. bekannt).
- Wächter: 4× „verändert“ nur neue Menüpunkte (Anthropic, Google), privat protokolliert und übernommen; OpenAI 403 wie bekannt.
- Quellenlauf trocken: 18 verändert (Stichprobe Likezähler/Banner), Handlesen bleibt Laufend-Aufgabe.
- Achtung: `build.js` hat das Datum 17.10. in `data/lastmod.json`, `docs/sitemap.xml`, `docs/fuer-kaeufer/` geschrieben (nur Datum). Nicht committet; vor dem nächsten Commit mitnehmen oder neu bauen.

## Neu 16.10.2026 ~23:35 (Dauerlauf): Fachstimme ISO 27001 freigegeben und wieder eingesetzt, lokal `e18571d`/`12bfc20`

- Der Zitierte hat den ganzen Abschnitt gegengelesen und freigegeben, ohne Korrektur. Rücknahme `c1b009d` rückgängig gemacht (`e18571d`), Freigabe im Code vermerkt (`12bfc20`). 213/213 Tests, Build streng ok.
- Push der ISO-27001-Seite wartet auf Felix' „steht“ (nur über `dossiers/push-sauber.sh`).

## Neu 16.10.2026 ~23:15 (Dauerlauf Laufend): GreenPT Model Cards gelesen, lokal `d4c1a53`

- `docs.greenpt.ai/model-cards` meldete „verändert“ (+12). Von Hand gelesen: alle sechs Preise im Profil stimmen (green-r 0,35/0,95, mistral-small 0,20/0,40, gemma4 0,50/1,50, glm-5.2 1,55/4,60, kimi-k3 3,30/16,50, green-embedding 0,20). Neu ist nur das Entscheidungsmodell **metis** (Verlauf „30 September 2026 · New model“): beantwortet Ja/Nein-, Auswahl- und Skalenfragen mit Wahrscheinlichkeiten, erzeugt keinen Text, Aufruf über `POST /v1/systemone`, 0,12 € Input, kein Output-Preis, 32k Kontext. Katalog zeigt jetzt 11 Modelle im EU-Filter. Kein Profil-Eintrag, weil wir nur Text-/Embedding-Modelle führen.
- Beleg `belege/anbieter/greenpt/model-cards-2026-10-16.txt` + `SHA256SUMS`; Hash per `--uebernehmen-nur`, Prüfdatum der Felder mit dieser Quelle 16.10. 208/208 Tests, Build streng ok. Aleph Alpha zeigt nach dem Lauf wieder 1 offene Quelle.
- Weiter offen (16): BFL (4, Preise nur im Browser), EUrouter-Modelle, Exoscale HDS-Liste (Browser), Nebius auf OpenRouter, Opper (3), Scaleway Datenschutz-Doku + Preise, STACKIT Preisseite + Zertifikate, T-Systems (2), Aleph Alpha (1).
- Kein Push.

## Neu 16.10.2026 ~23:10 (Dauerlauf Laufend): HDS-Liste war seit 14.10. blind, Quellenlauf erkennt Sperrseiten jetzt überall, lokal `e6d1716`

- `esante.gouv.fr/.../liste-des-hebergeurs-certifies` (HDS-Register, Beleg für Exoscale und OVHcloud) liefert unserem Abruf seit 14.10. nur eine Imperva/Incapsula-Sperrseite mit Status 200 („Request unsuccessful. Incapsula incident ID …“). Die „technische Kennzahl“, die am 14.10. übernommen wurde, war diese Sperrseite; seitdem meldete jeder Lauf „verändert“, weil die Incident-ID wechselt. Der Inhalt der Liste wurde also seit 14.10. nicht mehr geprüft.
- Fix in `lib/quellen.js`: Sperrseiten (Cloudflare und Incapsula) zählen auf **jeder** Quelle als „übersprungen, im Browser prüfen“, nicht mehr nur auf den gelisteten. Test zuerst, 3 neue Fälle in `test/quellen.test.js`; 208/208 Tests, Build streng ok.
- Beleg für beide Profile bleibt der Auszug vom 09.10. (`belege/anbieter/exoscale/ans-hds-liste-2026-10-09.txt` + SHA). Neueste brauchbare Archivkopie 26.09.; die heute angestoßene Kopie (web.archive.org/web/20261016205933) zeigt ebenfalls nur die Sperrseite.
- **Offen:** HDS-Liste einmal im Browser öffnen, Exoscale (Akenes) und OVHcloud suchen, Textauszug mit Datum ablegen. Die Ledger-Referenz ist noch der Hash der Sperrseite; sobald die echte Seite wieder durchkommt, meldet der Lauf „verändert“ und sie muss von Hand gelesen werden.
- Kein Push.

## Neu 16.10.2026 ~22:35 (Dauerlauf Laufend): Kolibri-1-Modellkarte gelesen, lokal `c9b677b` + `c10976d`

- Inhaltlich neu ist nur ein Punkt: In der Übersicht steht jetzt „Acceptable Use Policy n/a, cf. Responsible Use“, im Abschnitt Responsible Use neu „we do not implement an acceptable use policy“ (am 04.10. stand dort nur der Appell, nichts Rechtswidriges zu tun). Lizenz weiter Apache 2.0, Kontext 1.048.576 Token, Parameter unverändert; neu genannt ist der Wissensstand 18.06.2026 (EN/DE). Sonst nur Zähler (Downloads, Quantisierungen, Community).
- Profil-Anmerkung ergänzt, Status unverändert. Beleg `belege/anbieter/aleph-alpha/kolibri-1-modellkarte-2026-10-16.txt` + `SHA256SUMS`, Archivkopie web.archive.org/web/20261016203048 (enthält den neuen Satz). Hash per `--uebernehmen-nur` übernommen.
- Weiter offen (17): BFL (4, Preise nur im Browser), EUrouter-Modelle, Exoscale HDS-Liste, GreenPT-Modellkarten, Nebius auf OpenRouter, Opper (3), Scaleway Datenschutz-Doku + Preise, STACKIT Preisseite + Zertifikate, T-Systems (2).
- 205/205 Tests, Build streng ok. Kein Push.

## Neu 16.10.2026 ~22:10 (Dauerlauf Laufend): STACKIT-Modellseite gelesen, 26 Quellen übernommen, lokal `59153d1`

- **STACKIT Shared Models** („Last updated on Oct 15, 2026“): entfernt ist nur Gemma 3 27B, das schon als „Deprecated“ geführt war und nie im Profil stand. Die vier Profilmodelle (Llama 3.3 70B, GPT-OSS 120B, Qwen3-VL 235B, Gemma 4 31B) weiter „Supported“, Kategorien unverändert, keines als Preview (wichtig wegen Leistungsschein 1.4 ab 06.11.). Anmerkung im Profil ergänzt, Textauszug `belege/anbieter/stackit/modelle-shared-2026-10-16.txt` + SHA.
- Seit dem Lauf am Morgen hatten Gcore, Regolo, OVH, Scaleway, CSA-Register, Aleph Alpha (Datenschutz, zwei Pharia-Karten) und STACKIT-AGB **wieder** nur Teaser, Menü, Webinar-Banner oder Zähler gewechselt; per Wortprotokoll vollständig gelesen und übernommen (25). Sonst hätte die Seite sie als „offen“ gezählt.
- **Weiter offen (18):** Kolibri-1-Modellkarte (neu „Acceptable Use Policy“, lesen lohnt), BFL (4, Preise nur im Browser), EUrouter-Modelle (151), Exoscale HDS-Liste, GreenPT-Modellkarten, Nebius auf OpenRouter, Opper (3), Scaleway Datenschutz-Doku + Preise, STACKIT Preisseite + Zertifikate, T-Systems (2).
- 205/205 Tests, Build streng ok. Kein Push.

## Neu 16.10.2026 ~22:00 (Dauerlauf, Auftrag Felix GP1b): GreenPT-Profil mit der Klarstellung des Anbieters zum US-Endpunkt, lokal `5ff356b`

- Anmerkung bei den Unterauftragnehmern ergänzt: US-Endpunkt ist Opt-in, Standard bleibt EU, Konto/Abrechnung bleiben bei EU-Dienstleistern, die Processor-Seite ist die maßgebliche Liste, Übermittlungsgarantien nur im DPA auf Anfrage (Mechanismus öffentlich nicht genannt). Quelle: Mail des Anbieters vom 13.10., Anbieter hat der Aufnahme zugestimmt.
- Status unverändert. 205/205 Tests, Build streng ok. Kein Push (geht mit dem nächsten freigegebenen Push über `dossiers/push-sauber.sh`).
- Offen: Sobald GreenPT den Mechanismus auf docs.greenpt.ai/privacy/processor nennt, dort verlinken und den Satz „öffentlich nicht genannt“ ersetzen.

## Neu 16.10.2026 ~21:30 (Dauerlauf, Auftrag Felix PZ1): Fachstimme eines Sicherheitsforschers auf der ISO-27001-Seite, nur auf eigenem Zweig

- Neuer Abschnitt „Wer steht auf dem Zertifikat?“ unter der Tabelle von `zertifikate/iso-27001/` (Code `lib/fachstimmen.js`, Test `test/fachstimmen.test.js`). Die anderen neun Zertifikatsseiten bleiben bytegleich.
- Beim Push 16.10. ~21:40 (`87ff205`) auf main zurückgenommen, liegt auf einem eigenen Zweig. **Online erst nach dem Ok des Zitierten**, dann cherry-pick und Push nur über `dossiers/push-sauber.sh`. Namen, Zweig und Thread in `outreach/gespraeche/PRIVAT-NOTIZEN.md`.
- Diese Datei ist öffentlich: Namen von Gesprächspartnern und Zitierten stehen nur in den PRIVAT-NOTIZEN (Felix 16.10.).

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

- **ab Push der Vorauswahl (533):** Antwort an den Auditor (Gespräch 3) mit Pilot-Angebot (Gratis-Dossier, bis zu 3 Anbieter) liegt als Entwurf `r-6658349793740131607`; „senden“ sagen (Frage 536). Erstes Angebot für Kriterium 3, Zwischenziel Mi 28.10.

*Aufgeräumt 22.10.2026 (Dauerlauf, Auftrag Felix Home-Tab ~14:40): Erledigtes und Überholtes gestrichen (alte Fassung in `NAECHSTE-SCHRITTE.md.bak-2026-10-22-wartet`), jeder Punkt mit Datum, Altes ohne Frist unter „## Ruht“. Gesamtliste: `~/NAECHSTE-SCHRITTE.md`.*

- **Fr 30.10. 17:00 Marxen:** nur zwei Namen erfragen (Äußerungs-/Wettbewerbsrecht, Medizinprodukterecht); ersetzt Frage 383.
- **ab 22.10. (Anleitung liegt, `anleitungen/IAF-CERTSEARCH-KONTO.md`, lokal `395eaa5`):** IAF-CertSearch-Konto auf deinen Namen (484), höchstens 5 min; danach im ALLEIN-Tab „IAF-Konto steht“. Dann schlägt der Dauerlauf 3 Anbieter/Tag nach (Opper, Exoscale, Gcore zuerst); ob er das selbst kann (Captcha beim Login), ist ungeklärt.
- *Überholt/erledigt 22.10.:* Prüfer-Gespräch 21.10. gelaufen; Frage 360 → Deckungsanfrage liegt als Entwurf, der Dauerlauf trägt den Versicherer ein; Frage 303 ersetzt durch 450 (Kill-Check 3/5); Fachstimme ISO 27001 ist ein Dauerlauf-Punkt (Fr 23.10.); Schweizer Anwalt: gesendet 16.10., Absage 17.10.

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

## Neu 22.10.2026 (Home-Tab mit Felix): Startseite für Prüfer, erst Nutzen klären

- Anlass: Mark hat am 21.10. gedacht, die Seite sei für Privatleute („geben die meine Daten weiter?“). Der erste Satz „Wem dürfen Sie Ihre Daten geben?“ spricht alle an, nicht Prüfer.
- Felix 22.10.: Zielgruppe der Startseite = Prüfer und DSB. Umbau erst, wenn klar ist, ob das Abo ihnen wirklich etwas bringt.
- Feste Frage in jedem Prüfer-Gespräch ab jetzt: „Was kostet Sie heute die Prüfung eines KI-Anbieters (Stunden je Anbieter, wie oft prüfen Sie nach), und welchen Teil davon würde ein Abo sparen? Welche Anbieter prüfen Sie am häufigsten?“
- Antwort an Nicolaysen (EcoDeco AS) 22.10. gesendet, mit Gegenfrage „welche eine Tatsache vor dem Unterschreiben belegt?“. Antwort abwarten, zählt als möglicher Gesprächsfaden.

## Ruht

*Punkte ohne Frist, die über 14 Tage lagen; zählen nicht als offen (Felix 22.10.). Wieder hoch, sobald es einen Anlass gibt.*

- (ruht seit 22.10.) 345 Anbieter unterschreiben selbst, 307 Feed je Anbieter, 338 stille Änderungen öffentlich, 340 Opper-Fall still einstellen, 299 Requesty vormerken, 291 Brännström-Entwurf löschen, 96 a Ausschreibungs-Baustein (alle ohne Frist, seit ≤ 08.10.).
