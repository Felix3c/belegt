# Fall-Kandidaten aus dem Widerspruchs-Scan vom 06.09.2026

**Was das ist:** Erster Lauf der Fall-Pipeline (siehe `NAECHSTE-SCHRITTE.md`, Entwicklungslinie Punkt 1). Fünf Agenten haben am 06.09.2026 zwischen 11:23 und 11:54 UTC alle 19 Anbieter ohne laufenden Fall geprüft: Startseite, Pricing, Security/Trust, Privacy Policy, DPA/AVV, AGB, Docs, Subprozessorenlisten, Zertifikate. Gesucht war ausschließlich Aussage gegen Aussage beim selben Anbieter (Definition in `README.md`). Bloß Unbelegtes ist kein Kandidat.

**Was das nicht ist:** Kein Fall ist eröffnet. Jedes Zitat stammt aus dem am 06.09. abgerufenen Seitentext (WebFetch oder `curl -A "Mozilla/5.0 belegbar.eu-check"`, PDFs per pdftotext). Vor einer Eröffnung gilt der Ablauf aus der README: Seiten neu abrufen, hashen, bei web.archive.org sichern, Rohkopien nach `belege/faelle/<id>/`, erst dann Fall-JSON und Mail. Rohdateien der Agenten liegen nur im Session-Scratchpad und sind nicht Teil des Repos.

**Nicht prüfbar ohne Browser:** die Vanta-Trust-Center von Mistral (trust.mistral.ai, inkl. Subprozessoren), Lyceum (trust.lyceum.technology) und Black Forest Labs (trust.bfl.ai); Gcores DPA, Privacy Policy und Subprozessorenliste (clientseitig geladen); DeepL Trust Center (Bot-Sperre). Dort können weitere Kandidaten liegen, insbesondere Zertifikats-Badges.

## Rangliste

| # | Anbieter | Kurz | Konfidenz | Muster |
|---|---|---|---|---|
| 1 | Black Forest Labs | Enterprise-Seite „Zero data retention“ vs. ToS, Privacy Policy und (EU-)API-Terms: Speicher- und Trainingslizenz auf Inputs/Outputs | hoch | Requesty |
| 2 | Scaleway | Doku „no access to, nor knowledge of any inputs and outputs“ vs. dieselbe Seite „temporarily store and access the full content of HTTP requests“ | hoch | Requesty, gleiche Seite |
| 3 | T-Systems | Trust-Seite „never saved“ / „Not stored“ vs. verbindliche Leistungsbeschreibung: Cache standardmäßig an, Anfragen „zwischengespeichert“ | hoch | Requesty |
| 4 | Nebius | Legal Quick Guide „not used to train any models in either mode“ vs. ToS/Privacy „for the purpose of training smaller Models“ | hoch | Requesty |
| 5 | Regolo | ZDR-Seite „no server logs … no records of any kind“ vs. Privacy Policy und eigener Blog: Logs mit IP, Zeit, Token-Zahlen | hoch | Requesty |
| 6 | IONOS | Docs bewerben AI Model Hub für Hochrisiko-Anwendungen vs. KI-Nutzungsbedingungen 4.2: Hochrisiko „ausdrücklich untersagt“ | hoch | neu (Doku vs. AGB) |
| 7 | Exoscale | „Data center operators must hold, at a minimum, … ISO/IEC 27001:2022“ vs. eigene Zonen-Tabelle: 27001:2013, Zagreb ohne 27001 | hoch | GreenPT-nah |
| 8 | Opper AI | FAQ „no listed model provider uses customer requests … to train“ vs. Subprozessorenliste: DeepSeek als Ausnahme | mittel-hoch | Requesty |
| 9 | DeepL | „Texts are never stored … without your consent“ vs. AGB §3.1.4: automatische Speicherung bis 72 Stunden | mittel | Requesty |
| 10 | EUrouter | DPA §5 „exclusively within the EEA“ vs. eigene Subprozessorenliste: Better Stack mit US-Transfer (DPF/SCC) | mittel | intern im DPA |
| 11 | Infomaniak | „No queries are stored“ vs. FAQ: „Generated images are available for 30 days in the history“ | mittel | Requesty |
| 12 | T-Systems | Gemini „Hosted on Google Cloud Platform (EU regions)“ vs. Modellübersicht „Data Processing: Worldwide“ | hoch, Wirkung mittel | Doku vs. Doku |
| 13 | Gcore | „Your audio data never leaves our secure cloud infrastructure“ vs. MSA 8.4: Transfer außerhalb EWR erlaubt | mittel | Marketing vs. Vertrag |
| 14 | Mistral | Startseite „Our servers are hosted in the EU.“ vs. Pricing/Help/News: US-Endpunkte wählbar | mittel | Default-Lesart möglich |
| 15 | STACKIT | „exclusively in our own German data centers“ vs. dieselbe Seite „Germany and Austria“ | mittel | gleiche Seite, Cloud-Ebene |
| 16 | Nebius | Produktseite „Finland and France and US“ vs. Legal-Docs: Israel, Island, Kanada | mittel | Marketing vs. Legal |
| 17 | Scaleway | „Free from the US CLOUD Act“ vs. Subprozessorenliste mit US-Colocation | mittel | Konzernebene |
| 18 | Nebius | Trust Center „remains within the geographic region of their choice“ vs. Privacy Policy „may differ“ | mittel | Prinzip vs. Ausnahme |
| 19 | T-Systems | „Data Processing: EU“ für GPT-5/Claude vs. Leistungsbeschreibung: Kategorie „außerhalb EU/EWR“ | mittel | Feldsemantik |
| 20 | Hetzner | „Certification for all of our data center parks and entire infrastructure“ vs. Zertifikat nur Nürnberg, Falkenstein, Helsinki | mittel-niedrig | Übersetzung |
| 21 | OVHcloud | „Zero data retention“ vs. Sonderbedingungen: Batch API speichert zwischen | niedrig-mittel | funktional erklärbar |
| 22 | Opper AI | „without … 30-day objection windows“ vs. DPA §4.2 | mittel-niedrig | Lesart |
| 23 | Regolo | „Independently Certified … complete architecture“ vs. einseitiges „Red Hive“-Zertifikat ohne Umfang | niedrig-mittel | eher beansprucht |
| 24 | Lyceum | „EU Data Residency“-Badge vs. Magazin „four of the 35 models are global-hosted“ | niedrig | Opt-in |
| 25 | EUrouter | „best EU providers“ vs. Providerliste „HQ: US“ | niedrig | selbst aufgelöst |
| 26 | Infomaniak | „no dependence on foreign players“ vs. Modellkatalog (Qwen, Gemma, Kimi, Mistral) | niedrig | Meinungsnähe |
| 27 | STACKIT | „development … exclusively in Germany“ vs. AVV Annex 2 | niedrig | PDF-Spalten unsicher |
| 28 | Regolo | „no cross-border data transfers“ vs. US-Marketing-Pixel | niedrig | Scope |

Kein Kandidat: **Aleph Alpha** (Website macht keine Zertifikats-, Retention- oder Subprozessor-Aussagen; T&C nicht auffindbar), **Nordference** (SPA, alle Aussagen untereinander konsistent; ISO/SOC-Chips ohne Inhaberangabe = beansprucht).

## Empfehlung für die zwei Fälle bis Ende September

**Fall A: Black Forest Labs (Nr. 1).** Sauberstes Requesty-Muster: eine vorbehaltlose Marketing-Aussage gegen drei eigene Rechtsdokumente, darunter die erst am 26.08.2026 revidierten EU-API-Terms. Deutscher Anbieter (Freiburg), Bildmodelle, also ein anderes Feld als die bisherigen Fälle. Risiko gering: BFL kann den Widerspruch mit einem Satz („ZDR gilt für Enterprise-Verträge“) ausräumen. Genau das ist der gewünschte Ausgang.

**Fall B: Scaleway (Nr. 2).** Beide Aussagen auf derselben Doku-Seite, die Ausnahme ist eng und ehrlich dokumentiert. Hohe Relevanz: Scaleway ist mit 86 % Beleg-Quote einer der am besten belegten Anbieter im Index, was zeigt, dass es nicht um „schlechte“ Anbieter geht. Wahrscheinlicher Ausgang: Scaleway qualifiziert den AI-Act-Satz.

**Reserve: T-Systems (Nr. 3).** Größte Wirkung für die Zielgruppe (Kommunen, DSBs), aber angreifbar: Telekom wird argumentieren, ein Prefix-Cache sei keine Speicherung. Dagegen spricht ihre eigene Doku („retained“, „stored“). Erst nach A und B, oder statt B, wenn Felix die Reichweite höher gewichtet als die Sauberkeit.

Nicht als erste Fälle: IONOS (Nr. 6) ist ein AGB-Widerspruch ohne Datenschutzbezug und würde das Fall-Format dehnen; Exoscale (Nr. 7) ist wahrscheinlich nur eine veraltete Tabelle, taugt aber als kurzer Hinweis per Mail ohne Fall.

## Details nach Anbieter

Alle Abrufe 06.09.2026, Zeiten UTC. Zitate wörtlich; typografische Apostrophe der Originale sind hier als gerade Apostrophe wiedergegeben.

### Black Forest Labs (Nr. 1, hoch)

- **Aussage A:** „Zero data retention and auto-scaling infrastructure. Go from integration to production in minutes. Already powering billions of image generations per year.“ — https://bfl.ai/enterprise (11:23, 11:33), Abschnitt „Our models, your choice“, Karte „Managed / API“. Ebenso Karte „Co-development“: „Dedicated instances with zero data retention and network isolation“.
- **Aussage B:** „Developer grants the Company a fully paid, royalty-free, perpetual, irrevocable, worldwide, non-exclusive, and fully sublicensable right and license to use, sub-license, distribute, reproduce, modify, adapt, publicly perform, and publicly display Developer's Input and Output for the purpose of operating the FLUX Services, improving the Company's products and services, and developing new products and services. Developer acknowledges that the foregoing means the Company may use Inputs and Outputs to train and improve its artificial intelligence models, algorithms, and related technology, products, and services.“ — https://bfl.ai/legal/eu-api-service-terms (11:45, „Last Revised on August 26, 2026“), §2 b „License to the Company“; wortgleich in https://bfl.ai/legal/flux-api-service-terms §2 b. Privacy Policy §2 (https://bfl.ai/legal/privacy-policy, 11:23, „Last Revised on August 1, 2026“): „We may collect, store and use information you provide via the Services, including text prompts, uploaded content (like images) (together, the 'Inputs'), tasks … and the corresponding generated outputs to train and improve our AI models“. ToS §1.2(e) (https://bfl.ai/legal/terms-of-service): „…license to access, use, host, cache, store, reproduce, transmit … any Input, Output, or Tasks to provide, develop, train and improve our technologies…“.
- **Widerspruch:** Die Enterprise-Seite bewirbt die Managed API mit „Zero data retention“; die für genau diese FLUX API geltenden Terms (auch die EU-Fassung, laut Einleitung „also incorporated by reference into the applicable FLUX Model API Services Agreement and accompanying Order Form“) räumen eine unbefristete Lizenz zum Speichern und Trainieren ein.
- **Was es nicht heißt:** BFL dokumentiert ein Opt-out (ToS 1.2(e): „you may opt out … by contacting us at legal@blackforestlabs.ai“); die Privacy Policy nimmt Inhalte unter „enterprise contract“ aus; Enterprise-Verträge können ZDR tatsächlich vereinbaren. Der Fall betrifft nur die öffentliche Aussage ohne Vorbehalt neben öffentlichen Terms, die das Gegenteil erlauben.
- **Auffällig, kein Fall:** Footer-Badges „ISO 27001:2022 SOC 2 Type II“ und Enterprise-Kacheln „SOC 2 Type II / ISO 27001 / GDPR Compliant“ — Trust Center (Vanta) nicht abrufbar, Status beansprucht. bfl.ai/legal/dpa: 404.

### Scaleway (Nr. 2 und 17)

- **Nr. 2, Aussage A:** „Scaleway has no access to, nor knowledge of any inputs and outputs generated by the models.“ — https://www.scaleway.com/en/docs/generative-apis/reference-content/security-and-reliability/ (11:31, „Reviewed on June 16, 2025“), Abschnitt „Compliance“, Unterpunkt „AI Act“. Produktseite https://www.scaleway.com/en/generative-apis/ (11:31), Abschnitt „Security and privacy for your data and applications“: „We do not collect, read, reuse, or analyse the content of your inputs, prompts or outputs generated by the APIs. Your business is yours and has nothing to do with Scaleway's“.
- **Nr. 2, Aussage B:** „Manual interventions might be required occasionally for troubleshooting reasons (such as specific customer requests generating errors or carrying out malicious activity). In this event, we may temporarily store and access the full content of HTTP requests to identify a root cause issue or any security vulnerability.“ — dieselbe Doku-Seite, Abschnitt „Scaleway access“. Privacy Policy https://www.scaleway.com/en/docs/generative-apis/reference-content/data-privacy/ (11:29, „Reviewed on October 03, 2025“), Abschnitt 2: „we may store temporarily and access the full content of HTTP requests of this customer […] Data is stored for up to two weeks“.
- **Widerspruch:** „Kein Zugriff, keine Kenntnis“ und „wir speichern und lesen den vollen Request-Inhalt bis zu zwei Wochen“ können nicht beide uneingeschränkt gelten.
- **Was es nicht heißt:** Die Ausnahme ist offen und eng dokumentiert (500-Fehler, „1 out of a million requests“, maximal zwei Wochen, nur Fehleranalyse und Sicherheit). Die AI-Specific-Conditions (Version 07/04/2026, https://www-uploads.scaleway.com/Specific_Conditions_AI_Services_275907180f.pdf, Art. 4.4) sind in sich konsistent: „Scaleway does not log this data. However, in the event of detected malicious activity […] Scaleway may temporarily retain the content of the HTTP request“.
- **Nr. 17:** „our 100% European infrastructure … Free from the US CLOUD Act, your data remains resilient, secure, and strictly under your control.“ und FAQ „Our guarantee of data sovereignty throughout the value chain protects you against non-European extraterritorial laws (such as the US CLOUD Act).“ — https://www.scaleway.com/en/security-and-compliance/ (11:31) vs. Subprozessorenliste https://www.scaleway.com/en/subprocessorlist/ (11:37, „Last reviewed: July 2025“), Tabelle „Data Centers“: „Equinix EMEA | US | EU (Italy, Netherlands, Poland) | Colocation services“, „Iron Mountain | US | EU (Netherlands)“, „Digital Realty | US | EU (Netherlands)“. Generative APIs laufen nur in Paris (Colocation Op Core, EU), daher Konzernebene.
- **Kein Fall:** SecNumCloud-Meldung „aiming to achieve qualification by the end of 2025“ vs. heute „ongoing“. Verfehltes Ziel, kein gleichzeitiger Widerspruch.

### T-Systems, LLM Hub (Nr. 3, 12, 19)

- **Nr. 3, Aussage A:** Überschrift „No training on customer data“: „Regardless of which model you select hosted by Telekom, customer prompts and responses are never saved or used to train or fine-tune any model.“ Category 1: „Customer prompts and returned results are not stored and not viewable by Telekom or third parties“. Tabelle „Data Handling Summary“, Zeile „Storage“: „Not stored“. — https://docs.llmhub.t-systems.net/reference/enterprise-trust (11:35). Dieselbe Seite: „the Service Description (PDF) (v1.23) is the binding source.“
- **Nr. 3, Aussage B:** Leistungsbeschreibung v1.23, Stand 31.08.2026 (https://docs.llmhub.t-systems.net/files/Leistungsbeschreibung-LLM-Serving-Service.pdf, 11:39), § 2.3.1: „Ihre Anfragen und die darauf erhaltenen Antworten werden im LLM Serving Service standardmäßig nicht dauerhaft gespeichert […] Damit der Service schneller antwortet, gibt es eine sogenannte Cache-Funktion: Dabei werden bereits verarbeitete Anfragen für eine begrenzte Zeit zwischengespeichert […] Diese Funktion ist standardmäßig eingeschaltet, kann von Kunden aber jederzeit ein- oder ausgeschaltet werden.“ Prefix-Caching-Doku (https://docs.llmhub.t-systems.net/guides/prefix-caching/, 11:42, Überschrift „Caching is on by default on T-Cloud-hosted models“): „Caching keeps already-processed requests for a limited time […] If a prompt should not be retained for reuse at all — a one-off, or content you do not want held even briefly — send save_cache: false on that request and nothing from it is stored.“
- **Widerspruch:** „never saved“ / „Not stored“ ohne Vorbehalt vs. eine standardmäßig aktive Zwischenspeicherung, die die eigene Doku mit „retained“ und „stored“ beschreibt. Die Trust-Seite erwähnt den Cache nirgends.
- **Was es nicht heißt:** Laut Doku ein KV-/Prefix-Cache, standardmäßig auf den eigenen API-Key begrenzt, pro Request abschaltbar. „Nicht dauerhaft gespeichert“ und „nicht zum Training genutzt“ bleiben zutreffend. Telekom dokumentiert das im verbindlichen Dokument offen.
- **Nr. 12:** „Gemini 3 Flash — Google — GCP — Hosted on Google Cloud Platform (EU regions).“ (https://docs.llmhub.t-systems.net/models/llms/, ca. 11:44; ebenso Gemini 3 Pro, 3.1 Pro) vs. „Gemini 3 Pro (>200k) — Cloud: GCP — Server Location: Worldwide — Data Processing: Worldwide“ (https://docs.llmhub.t-systems.net/models/, 11:35, „Featured Models“; ebenso Gemini 3 Flash, 3 Pro, 3.1 Pro, 3.5 Flash, 3 Pro Image). Leistungsbeschreibung § 2.3.2: „Der Drittanbieter kann Subunternehmer weltweit einsetzen, so dass die Daten des Kunden weltweit verarbeitet werden.“
- **Nr. 19:** Modellübersicht „GPT-5 — Cloud: Azure — Server Location: Sweden — Data Processing: EU“ und „Claude 4.6 Sonnet — Cloud: GCP — Server Location: Europe — Data Processing: EU“ vs. Leistungsbeschreibung § 2.3.2, Kategorie „LLMs und Embedding-Modelle mit Datenverarbeitung außerhalb EU/EWR und Staaten ohne Angemessenheitsbeschluss“: „Aktuell sind folgende Modelle dieser Kategorie verfügbar: OpenAI GPT-5 Azure Sweden […] Anthropic Claude 4.6 Sonnet […]“; Trust-Seite Category 2: „customer data may be processed worldwide“. Feldsemantik („Data Processing“ = Region oder gesamte Kette?) interpretierbar.
- **Kein Fall:** „ISO 27001 Certified“ verweist auf das Dachzertifikat der Deutschen Telekom AG (DEKRA 172572.00DE, gültig bis 03.12.2027), Anhang nennt T-Systems-Standorte inklusive Magdeburg und Biere. Konsistent. Produktseite AI Foundation Services auf t-systems.com nicht gefunden (404).

### Nebius, Token Factory (Nr. 4, 16, 18)

- **Nr. 4, Aussage A:** „Unless you enable Zero Data Retention, we keep your inputs and outputs to speed up inference using the Speculative Decoding technique described in Section 3. Your content is not used to train any models in either mode.“ — https://docs.tokenfactory.nebius.com/legal/legal-quick-guide (11:41), Abschnitt 4.2 „Default Behavior“. FAQ ebenda: „No. We do not use your content to train, fine-tune or improve any AI models – ours or third parties'. Unless you enable Zero Data Retention, your inputs and outputs may be stored and used solely for Speculative Decoding (see Section 3), which does not involve training any model.“
- **Nr. 4, Aussage B:** „As part of providing the Service, the Company collects and processes both Input and Output data for the purpose of training smaller Models used exclusively for Speculative Decoding.“ — https://docs.tokenfactory.nebius.com/legal/terms-of-service (11:41), Abschnitt 8. Privacy Policy Token Factory (https://docs.tokenfactory.nebius.com/legal/privacy-policy), Abschnitt „Model Interaction“: „Speculative decoding: Input(s) and output(s) for the purpose of training smaller models as specified in the Terms of Service“.
- **Widerspruch:** Der Legal Quick Guide sagt zweimal, es werde in keinem Modus ein Modell trainiert; ToS und Privacy Policy definieren dieselbe Verarbeitung als Training kleinerer Modelle.
- **Was es nicht heißt:** Nebius dokumentiert offen, dass Standard = Speicherung für Speculative Decoding und ZDR = Opt-out; der Quick Guide sagt selbst „in case of any inconsistency, those documents prevail“. Es geht nicht um Training der Hauptmodelle.
- **Nr. 16:** Produktseite https://nebius.com/services/token-factory (11:31), FAQ: „All data is processed in facilities with SOC 2 Type II, HIPAA and ISO 27001 certifications. Data centers are located in Finland and France and US, and meet EU and US data-residency requirements.“ vs. Quick Guide 5.1: „We offer models running in data centers located in the European Union (including Finland and France), Israel, and the United States.“ und Subprozessorenliste (https://docs.tokenfactory.nebius.com/legal/subprocessors, Effective date August 28, 2026): „RunPod, Inc. | Cloud Infrastructure | United States | Iceland“, „Data Section, Inc. | Cloud Infrastructure | United States | Canada“, „Eigen AI, Inc. | AI inference services | United States | United States“, „Nebius Israel Ltd. | Cloud infrastructure; Service Maintenance; Support | Israel“.
- **Nr. 18:** Trust Center https://nebius.com/trust-center (11:31), „Data residency“: „We honor our customers' data residency requirements by ensuring that customer data remains within the geographic region of their choice.“ vs. Privacy Policy https://docs.nebius.com/legal/privacy (11:31), Abschnitt 3: „we store some limited customer data in data centres that may differ from the data centre selected by the Customer as the primary location for data storage.“; Quick Guide 5.1: „the inputs and outputs retained for Speculative Decoding are stored in Finland (EU), regardless of where real-time processing takes place.“; 5.3: „fine-tuning jobs submitted by US users are processed in US data centers, but all data is stored in the EU.“
- **Kein Fall:** Amsterdam und Nasdaq-Listing offen dokumentiert; Yandex-Herkunft auf keiner geprüften Seite.

### Regolo (Nr. 5, 23, 28)

- **Nr. 5, Aussage A:** „No Logging — No logging of API calls or content for future analysis. There are no audit trails of your requests, no server logs capturing your data, no records of any kind.“; Hero: „Every request is processed in real time and permanently discarded. No logs, no traces, no compromise.“; Vergleichstabelle „Regolo.ai — No API call logging“ — https://regolo.ai/zero-data-retention/ (11:24 bis 11:34).
- **Nr. 5, Aussage B:** Privacy Policy https://regolo.ai/privacy-policy/ (Data Controller Seeweb S.r.l., 11:24 bis 11:34), „Information we collect“: „Information received automatically: LOGs (including IP address, browser and configuration, place, date and connection time, type of device used), origin of the access (eventual entry); usage data: request type (without the content), duration of the access to the service.“ Tabelle „Duration“: „Information received automatically — Until the cancellation of the Account“. Eigener Blog https://regolo.ai/zero-data-retention-llm-gdpr-ai-act-compliance/ (11:50): „The logging daemon records only non-content operational telemetry: HTTP response code, duration in milliseconds, input token count, output token count, and request timestamp.“ FAQ in https://regolo.ai/zero-data-retention-vs-provider-policies-what-teams-need-to-verify/: „Regolo does not store prompts and outputs by default; technical metadata may still be logged in a minimized form for reliability and security“.
- **Widerspruch:** „No API call logging“ und „no records of any kind“ vs. Logs mit IP, Verbindungszeit, Request-Typ und Token-Zahlen, aufbewahrt bis zur Kontolöschung.
- **Was es nicht heißt:** Die Kernzusage (keine Prompts und Outputs gespeichert) wird nirgends widersprochen; die Privacy Policy sagt „request type (without the content)“ und „User's contents (Inputs) — Never, excepted the use of storage services activated by the user“. Es geht um die absolute Formulierung der ZDR-Seite.
- **Nr. 23:** ZDR-Seite: „A specialized external firm reviewed our complete architecture and software stack, from infrastructure provisioning to the inference pipeline, and issued a formal certification confirming that our zero data retention policy is not a claim, but a verified fact.“ Das verlinkte PDF (https://regolo.ai/wp-content/uploads/2026/07/Certificate_REGOLO.AI24-Jul-2026.pdf, 11:36) ist eine einseitige Urkunde: Logo „Red Hive“, „CERTIFICATE OF ZERO DATA RETENTION — This is to certify that REGOLO.AI does not log user prompts, messages and responses. Date of Issue: 24/Jul/2026“, signiert „CLAUDIO DE MICHIELI, Data: 24/07/2026“ (InfoCert GoSign). Kein Prüfumfang, kein Standard, keine Methode, keine Gültigkeit, kein Bericht; „Red Hive“ per Websuche nicht identifizierbar. Eher dünner Beleg als Widerspruch, als Anhang zu Nr. 5 brauchbar.
- **Nr. 28:** FAQ https://regolo.ai/faq/ (11:36): „Yes. Regolo is fully GDPR-compliant by design: EU-based infrastructure, zero data retention, and no cross-border data transfers.“ vs. Privacy Policy, Marketing-Pixel: „Transfer destination: United States (Standard Contractual Clauses)“ für X Pixel, LinkedIn Insight Tag, Reddit Pixel, YouTube. Scope-Unterschied (Website-Besucher vs. Inferenzdaten) offensichtlich.
- **Fair:** Die ISO-Badges im Footer stehen unter „Datacenter Certifications“, das ISO-27001-Badge trägt „(Afnor / AxDéf)“, Dateiname seeweb_acn.png. Regolo ordnet die Zertifikate korrekt dem Rechenzentrum Seeweb zu. Kein GreenPT-Fall.

### IONOS, AI Model Hub (Nr. 6)

- **Aussage A:** „If your application's use case falls into a high-risk category, such as employment, credit, or education, you have significant obligations. The AI Model Hub provides the flexible infrastructure to help you achieve the following:“ (gefolgt von „Data Governance“, „Logging and Traceability“, „Human Oversight“) — https://docs.ionos.com/cloud/ai/ai-model-hub/governance-and-compliance/eu-ai-act (11:36), Abschnitt „Enabling your compliance as a developer and Deployer“, Tab „For High-Risk Systems“.
- **Aussage B:** „4.2. Die Nutzung der Dienste zur Entwicklung oder zum Betrieb von „Hochrisiko-KI-Systemen“ (Art. 6 KI-VO) ist ausdrücklich untersagt. Sollte der Kunde entgegen diesem Verbot handeln, stellt er IONOS CLOUD von sämtlichen hieraus resultierenden Ansprüchen Dritter und Bußgeldern vollumfänglich frei.“ — https://cloud.ionos.de/terms-gtc/ki-dienste/ (11:49), Ziffer 4.2. Diese Seite verlinken die Data-Handling-Docs unter „Related documents“ als „Terms for AI services“ für „IONOS CLOUD GmbH (Germany)“. Wortgleich (mit „IONOS“) unter https://www.ionos.de/terms-gtc/ki-dienste/ (11:36).
- **Widerspruch:** Die Doku bewirbt den AI Model Hub als Infrastruktur für Hochrisiko-Anwendungen, die dafür geltenden Nutzungsbedingungen untersagen genau diese Nutzung mit Freistellungspflicht.
- **Was es nicht heißt:** IONOS ist bei Rollen (Modellentwickler, Provider, Deployer) transparent; die Docs sagen ausdrücklich, dass es kein AI-Act-Logging-Template gibt. Kein Datenschutzbezug, deshalb nicht als erster Fall.
- **Kein Fall:** „AI Model Hub falls within the scope of BSI C5.“ vs. Zertifikate-Seite ohne Serviceliste (33 Services in 10 Clustern) = beansprucht, nicht widerlegt. „Keine Drittanbieter-Subprozessoren“, „All inference in Germany“, „100 % DSGVO-konform und sicher in Deutschland gehostet“ untereinander konsistent; UAV-Anlage nennt IONOS Cloud Inc. (USA) nur bei ausdrücklicher Standortwahl.

### Exoscale (Nr. 7)

- **Aussage A:** „Data center operators must hold, at a minimum, ISO 9001:2015 and ISO/IEC 27001:2022 certifications covering access control, operational security, and facility management.“ — https://community.exoscale.com/platform/compliance/ (11:30, „Last updated on April 3, 2026“), Abschnitt „Data Center Operators“. Flankierend https://www.exoscale.com/compliance/, Abschnitt „Datacenter Certifications“: „Our data center partners must meet a strict set of security and quality standards and maintain relevant certifications. For a detailed list of available certifications by location, visit our datacenter page.“
- **Aussage B:** Tabelle auf https://www.exoscale.com/compliance/ (11:30): „AT-VIE-1 ISO/IEC 27001:2013 / ISO 9001:2008 / ISO 9001:2015“, „AT-VIE-2 ISO/IEC 27001:2013 / ISO 9001:2008“, „BG-SOF-1 ISO/IEC 27001:2013 / ISO 20000-1:2011“, „CH-DK-2 ISO/IEC 27001:2013 / ISO 9001:2008“, „CH-GVA-2 ISO/IEC 27001:2013 / ISO 9001:2008“, „DE-MUC-1-OLD ISO/IEC 27001:2013“, „DE-FRA-1-OLD ISO/IEC 27001:2013 … OHSAS 18001:2007“; „HR-ZAG-1 ISO/IEC 27017:2015 / ISO 9001:2015 / ISO 14001:2015 / ISO 45001:2018 / ISO 22301:2019 / IPCI DSS 3.2.1“ (keine 27001-Zeile). Nur DE-FRA-1 trägt „ISO / IEC 27001:2022“.
- **Widerspruch:** Mindestanforderung 27001:2022 und 9001:2015 an alle Rechenzentrumsbetreiber vs. eigene Nachweistabelle mit 27001:2013 und 9001:2008 für sechs von acht aktiven Zonen, Zagreb ohne 27001.
- **Was es nicht heißt:** Exoscales eigene Zertifikate (ISO 27001/27017/27018 seit 2018, SOC 2 Type 2, C5 Type 2, HDS, TISAX) sind klar als eigene ausgewiesen, kein GreenPT-Muster. Wahrscheinlich nur eine veraltete Tabelle, aber genau die Seite, auf die verwiesen wird. Taugt als Hinweis-Mail ohne Fall.
- **Kein Fall:** „Your data never leaves Europe“ inklusive CH-GVA-2 (Schweiz) ist geografisch korrekt. DPA nennt Aiven Oy (Helsinki) als einzigen Subprozessor; die Privacy-Seite trennt US-Provider (PayPal, AWS Archiv, Twilio) sauber von Kundendaten.

### Opper AI (Nr. 8, 22)

- **Nr. 8, Aussage A:** „No, Opper never trains on your data. Provider-side training posture is documented per provider in the sub-processor list, which records that no listed model provider uses customer requests or responses to train its models by default.“ — https://opper.ai/ai-compliance (11:24 bis 11:37), FAQ „Does Opper train on my data?“
- **Nr. 8, Aussage B:** „With one exception, no model provider listed below uses customer request or response content to train the models Opper routes requests to; the exception is DeepSeek's first-party API, whose row says so plainly.“ und DeepSeek-Zeile: „This provider is the exception to the note above: content sent to it may be used to train its models.“ — https://opper.ai/sub-processors (Last updated 2026-08-27).
- **Widerspruch:** Die FAQ behauptet, die Liste verzeichne für keinen Anbieter Training; die Liste verzeichnet es für DeepSeek ausdrücklich. Das „by default“ in der FAQ schwächt leicht ab, aber bei DeepSeeks First-Party-API ist Training laut Zeile der Standard.
- **Was es nicht heißt:** Opper selbst trainiert nicht; DeepSeek ist kundenseitig wählbar; die Provider-Tabelle auf der Compliance-Seite schreibt bei DeepSeek, Meta, Moonshot korrekt „Trains on your data: See provider page“.
- **Nr. 22:** Startseite „One sub-processor — Opper is your single AI sub-processor. Add new models without DPA amendments, customer notifications, or 30-day objection windows.“ vs. DPA §4.2 (https://opper.ai/data-processing-agreement, Last updated 2026-03-14): „Opper shall notify the Customer through the Services at least 30 days in advance of any intended addition or replacement of a Sub-processor. … The Customer is entitled to object to such changes“, während die Subprozessorenliste jeden Modellanbieter einzeln als „Customer configurable sub processor“ führt. Lesart-abhängig.
- **Kein Fall:** „No prompts stored by default“ vs. Security Overview „Control Plane: tracing is enabled, and request inputs and outputs are stored in an encrypted Amazon RDS database“: das „by default“ steht überall dabei, Plan-Unterschied offen dokumentiert.

### DeepL (Nr. 9)

- **Aussage A:** „Texts are never stored or used for model training without your consent“ — https://www.deepl.com/en/pro-data-security (11:35), Abschnitt „Enterprise-grade data encryption, handling, and control“, erster Bullet.
- **Aussage B:** „In derogation from Section 3.1.2, DeepL may, in exceptional cases, automatically store Content and/or Processed Content for a maximum period of 72 hours in case certain error patterns occur during the processing of the translation or improvement request.“ — https://www.deepl.com/en/pro-license (11:23), §3.1.4. Dazu §3.1.2: „DeepL will only temporarily store Content or Processed Content to the extent technically required to provide its Services.“; Privacy Policy §4: „will not be permanently stored and will only be kept temporarily“.
- **Widerspruch:** „never stored“ auf der Security-Seite vs. die in den eigenen Pro-AGB vorgesehene automatische Speicherung bis 72 Stunden.
- **Was es nicht heißt:** DeepL dokumentiert die Ausnahme offen (Verschlüsselung, Management-Freigabe, „will not be linked to any individual Customer“); „without your consent“ lässt sich als AGB-Zustimmung lesen. Training: AGB §3.1.5, §7.4 und API-Seite („Pro customer data is never used to train DeepL's models“) konsistent.
- **Kein Fall:** API-Seite „ISO 27001, SOC 2 Type II, HIPAA, and GDPR certifications“: GDPR und HIPAA sind keine Zertifizierungen (Wording). Certipedia 9000024755 (11:43): DeepL SE, ISO/IEC 27001:2013, „expiring 25/09/2025“; Nachfolgezertifikat nicht prüfbar (Trust Center gesperrt), Status beansprucht. API Free: AGB §3.3.2 „perpetually store“, Produktseite grenzt korrekt auf Pro ein.

### EUrouter (Nr. 10, 25)

- **Nr. 10, Aussage A:** „The Processor shall ensure that all Processing of Personal Data takes place exclusively within the European Economic Area. The Processor shall not transfer Personal Data to any country outside the EEA, unless expressly authorised by the Controller in writing and subject to the requirements of Chapter V GDPR.“ — https://www.eurouter.ai/dpa (11:23), §5. FAQ https://www.eurouter.ai/faq (11:39, JSON-LD): „All requests are routed through EU-based infrastructure. We ensure that no data leaves the European Union, meeting the strictest data residency requirements.“
- **Nr. 10, Aussage B:** „Better Stack — Logs, traces, error tracking and reliability diagnostics. No substantive API content intended. May process diagnostic metadata if present in error events. EU-hosted data region. Transfers involving Better Stack or its sub-processors are protected by the EU-US Data Privacy Framework or Standard Contractual Clauses where applicable.“ — dasselbe DPA, Annex „Sub-Processors for Customer API Data“. Privacy Policy https://www.eurouter.ai/privacy: „Transfers to the United States or other locations are protected by the EU-US Data Privacy Framework or Standard Contractual Clauses where applicable.“
- **Widerspruch:** Dasselbe DPA verspricht ausschließliche EWR-Verarbeitung ohne Drittlandtransfer und listet einen Dienst mit DPF/SCC-abgesicherten US-Transfers. Nur Fehler-Metadaten, im selben Dokument offengelegt.
- **Nr. 25:** Startseite „We guarantee that all your requests are handled safely by the best EU providers, so you are certain your data stays in Europe.“ vs. https://www.eurouter.ai/providers „AWS Bedrock … HQ: US“, „Microsoft Foundry … HQ: US“ (DPA-Tabelle: „EU/EEA configurations only (HQ: United States)“). Vom Anbieter selbst aufgelöst (Filter „European Companies Only“, Docs trennen ownership und location).
- **Kein Fall:** ZDR-Badge konsistent mit FAQ („We never store request bodies unless you explicitly enable logging“), AGB Art. 11 und DPA §10. Anders als bei Requesty ist Logging hier laut allen Dokumenten opt-in.

### Infomaniak (Nr. 11, 26)

- **Nr. 11, Aussage A:** Hero „… No queries are stored, and the energy …“ und Abschnitt „Privacy“: „What you entrust to the AI belongs to you. Your queries are neither recorded nor used to train models or improve our services.“ — https://www.infomaniak.com/en/hosting/ai-services (11:31).
- **Nr. 11, Aussage B:** „Generated images are available for 30 days in the history. … The results and history can be enlarged, used to reconfigure the parameters identically, copied to the clipboard, or downloaded“ — FAQ 1632 „Generate images with AI Services“, gesehen auf https://www.infomaniak.com/en/support/faq/admin2/ai-tools (11:42; kanonische Einzel-URL nur französisch: /fr/support/faq/1632/generer-des-images-avec-ai-services). FAQ 2845: AI Services auch „Via the web app“.
- **Widerspruch:** Unqualifiziertes „No queries are stored / neither recorded“ vs. 30-tägige History im selben Produkt, aus der sich „the parameters identically“ rekonstruieren lassen. Angriffsfläche: Bilder sind keine Queries; „queries“ könnte die API meinen.
- **Nr. 26:** „Total sovereignty: … with no dependence on foreign players.“ vs. Preisliste https://www.infomaniak.com/en/hosting/ai-services/prices (11:31) mit Qwen, google/gemma-4-31B-it, moonshotai/Kimi-K2.6, nvidia/Nemotron, mistralai/Mistral-Small-4, BAAI/bge-reranker; nur swiss-ai/Apertus schweizerisch. Grenzt an Meinungsfrage.
- **Nachtrag 04.10.2026 (Nr. 11):** Die eigenen Bedingungen der LLM API (Art. 6, Fassung 07/10/2025, https://welcome.infomaniak.com/api/web-components/1/cgu/latest?id=87&locale=en_GB, Wayback 20261004155755) sind enger als der Hero-Satz „No queries are stored“: „does not permanently collect any information …, except for data necessary for billing and the proper functioning of the service. Some data is stored temporarily …“ und dauerhaft Kunden-ID, Anzahl/Bearbeitungszeit, Zeitstempel, Metadaten. Stützt Nr. 11 (Produktseite absolut, Vertrag qualifiziert, wie Scaleway Fall 004). Zweiter Befund: Datenschutzerklärung nennt einen AVV-Anhang „Third-Party Subcontractors“, der öffentlich nicht auffindbar ist (schwach, eher Hinweis als Fall).
- **Kein Fall:** Zertifikate (ISO 27001 seit 2018, 9001, 14001, 50001) klar Infomaniak-eigen. DPA Art. 5.1 verweist für Sub-subcontractors auf AGB oder Confidentiality Policy, dort keine Liste (unbelegt).

### Gcore (Nr. 13)

- **Aussage A:** „Your audio data never leaves our secure cloud infrastructure. Perfect for healthcare, legal, and regulated industries requiring data sovereignty and compliance.“ (Abschnitt „Complete Privacy“) und FAQ: „Yes, your audio data never leaves our secure infrastructure. Unlike SaaS speech recognition services, your audio inputs and transcribed outputs stay within your controlled environment“ — https://gcore.com/everywhere-inference/whisper-large-v3-turbo (11:31).
- **Aussage B:** MSA 8.4: „Customer acknowledges that Gcore, its Affiliates and their respective agents may process and transfer Customer Content and/or Customer Data, including to entities located in countries outside the EEA that may not provide an adequate level of data protection.“; MSA 7.2: „Customer grants to Gcore, and its agents, suppliers and subcontractors, the non-exclusive, worldwide right to access and use, ingest, reproduce, format, store, distribute … Customer Content“ — https://gcore.com/legal (11:31). Produktseite https://gcore.com/everywhere-inference: „Everywhere Inference is Gcore's public, serverless platform for AI inference … with integrated security, data isolation, and multi-tenancy“.
- **Widerspruch:** „Bleibt in Ihrer kontrollierten Umgebung, Datensouveränität“ vs. vertragliches Recht auf weltweite Speicherung durch Subunternehmer und Übermittlung in Drittländer; „your controlled environment“ vs. „public, serverless, multi-tenancy“.
- **Was es nicht heißt:** Das MSA ist ein Rahmenvertrag für alle Produkte; das DPA (clientseitig geladen, nicht lesbar) kann Regionen-Bindung enthalten. Vor einem Fall im Browser lesen.
- **Kein Fall:** /infrastructure „ISO/IEC 27001:2013 certified“; dass 27001:2013 seit Oktober 2025 ungültig ist, ist externes Wissen, Status beansprucht. Keine Retention-Aussagen zu Everywhere Inference gefunden.

### Mistral AI (Nr. 14)

- **Aussage A:** „Get started with Studio hosted on Mistral's infrastructure and build your own applications and services with our APIs. Our servers are hosted in the EU.“ — https://mistral.ai/ (11:24, 11:38), Abschnitt „AI deployments designed for privacy.“, Karte Mistral-Cloud.
- **Aussage B:** „Choose global or EU inference endpoints for supported models with regional data processing.“ — https://mistral.ai/pricing/api (11:37). Help 347629 (11:42): „By default, your data is hosted in the European Union. You may, however, explicitely use our US API endpoint and in such a case your data is hosted in the United States.“ und „Depending on the feature you use, your data can be temporarily transferred outside of the European Union, to the locations listed in the “Subprocessors” tab of our Trust Center.“ News vom 11.08.2026 (https://mistral.ai/news/regional-inference-open-models-new-compute): „Mistral Regional Endpoints, now generally available, let customers choose whether their inference runs in Europe or the US“.
- **Widerspruch:** Vorbehaltloses EU-Hosting auf der Startseite vs. eigene Preis-, Hilfe- und Newsseiten mit US-Endpunkten und Transfers an Subprozessoren außerhalb der EU. EU ist Default, US explizite Wahl; Default-Lesart möglich.
- **Kein Fall (ohne Trust Center):** Help 347638 „Yes, Mistral complies with both SOC 2 Type II and ISO 27001/27701 frameworks.“ („complies with frameworks“ ist kein Zertifikat). Privacy Policy: Retention 30 Tage „unless zero data retention is activated“; ZDR nur Pay-as-you-go, „at our discretion“, konsistent dokumentiert. Training-Default opt-in laut Commercial ToS 4.2 und DPA 2.3; der Schalter heißt in Help 455207 „Anonymous improvement data“ (verharmlosend, kein Widerspruch). trust.mistral.ai nicht ladbar; docs.mistral.ai/admin/monitor-comply/privacy-data-controls: 404.

### STACKIT (Nr. 15, 27)

- **Nr. 15, Aussage A:** „Processing of data in Germany — Processes such as the collection, storage and processing of data in the STACKIT Cloud take place exclusively in our own German data centers. We therefore guarantee the highest security standards and EU data protection regulations.“ — https://stackit.com/en/why-stackit/benefits/certificates (11:35), Abschnitt „STACKIT Cloud - 100% GDPR-compliant“, dritter Unterpunkt.
- **Nr. 15, Aussage B:** Dieselbe Seite, zweiter Unterpunkt: „All our data centers and servers are located in Germany and Austria“; unten „DC 10 — Data center DC 10 in Ostermiething (AT)“. Leistungsbeschreibung 1.2 (Version 1.4, gültig ab 04.05.2026, https://stackit.com/en/asset/download/51710/file/STACKIT%20Cloud%20service%20description_EN.pdf?version=6): „STACKIT Cloud Services are provided and operated in STACKIT data centers located in Germany, Austria and potentially other member states of the European Union in the future.“
- **Widerspruch:** Gleiche Seite, zwei Unterpunkte. Für AI Model Serving selbst weist die Preistabelle nur die Region „Germany South“ aus; Cloud-Ebene, nicht produktspezifisch.
- **Nr. 27:** „The development of our cloud takes place exclusively in Germany.“ (dieselbe Seite) vs. AVV Annex 2 (Version 2.4.2, https://stackit.com/en/asset/download/34534/file/STACKIT_data_processing_agreement.pdf?version=12): Exivity BV (Amsterdam), Schwarz Digits Bulgaria EOOD (Sofia), Schwarz Digits Romania S.C.S. (Bukarest), Schwarz IT S.L.U. (Barcelona), SOCIAL BIGDATA COMUNICACION SL (Barcelona) mit Zweck „Development support and operational support“. Die Spaltenzuordnung im PDF-Textlayer ist unsicher, vor Verwendung im Viewer prüfen.
- **Kein Fall:** „Your data and queries are neither stored nor used to train models“ passt zu FAQ („We do not store any customer data from the requests“) und Service-Zertifikat (Version 1.3, gültig ab 18.09.2025: „Customer data is not stored permanently. The e-mail and subject ID are stored temporarily (30 days) in the logs of the service“). Produktseite wirbt mit Llama 3.1, Modellliste führt Llama 3.3: veraltet.

### Hetzner (Nr. 20)

- **Aussage A:** „Certified in accordance with DIN ISO/IEC 27001:2022 … Certification for all of our data center parks and entire infrastructure“ — https://www.hetzner.com/unternehmen/rechenzentrum/ (11:31), Abschnitt „Certification“. Dieselbe Seite, „Locations“: Nuremberg, Falkenstein, Helsinki, „Datacenter Ashburn, Virginia, USA / Datacenter Hillsboro, Oregon, USA / Datacenter Singapore, Singapore“.
- **Aussage B:** „The certified scope covers all hosting services and data centers of Hetzner Online GmbH. The certification applies to the sites in Nuremberg, Falkenstein/Vogtland, and Helsinki, Finland.“ — https://www.hetzner.com/unternehmen/zertifizierung/ (11:31). /cloud/ (11:40): „our data center parks in Germany and Finland are ISO/IEC 27001 certified“. Subunternehmer-PDF (Version 1.0, 06.08.2024): US- und Singapur-Standorte über Hetzner US LLC, NTT Global Data Centers Americas, QTS Hillsboro, Hetzner Singapore Pte. Ltd., NTT SG1.
- **Widerspruch:** „entire infrastructure“ auf einer Seite mit sechs Standorten vs. Zertifikatsgeltung für drei. Die deutsche Fassung ist enger („Zertifizierung für Infrastruktur und Betrieb der gesamten Datacenterparks“), und Hetzner nennt US/SG konsequent „Datacenter“, nicht „Data Center Park“. Hängt an „and entire infrastructure“ in der englischen Version.
- **Kein Fall:** C5 wird auf /cloud/ und im DPA-Anhang 2 beansprucht, die Zertifizierungsseite nennt nur ISO 27001: beansprucht. Inference-API: „We do not store the content of request and response and we do not plan on doing so in the future (unless some law requires us to do so)“, nichts widerspricht dem; „free of charge“ im Experimentstatus.

### OVHcloud, AI Endpoints (Nr. 21)

- **Aussage A:** Feature-Kachel „Privacy — Zero data retention: We keep only the data required for billing purposes.“ — https://www.ovhcloud.com/en/public-cloud/ai-endpoints/ (11:24 bis 11:34); dieselbe Seite bewirbt „AI Endpoints - Batch API — The most economical, your requests processed in batches“.
- **Aussage B:** Specific Conditions for Public Cloud Services, Version 26.08.2026, Appendix 10 „AI Endpoints“ (https://contract.eu.ovhapis.com/1.0/pdf/Conditions_particulieres_OVH_Stack-we.pdf, 11:54), Abschnitte 2 und 5: „The AI Endpoints Service does not include backup or storage, even if it is temporary (with the exception of the AI Endpoint Batch API Service, which is an asynchronous service offer that temporarily stores incoming and outgoing data for the Service).“ und „OVHcloud does not carry out any backups of Inputs or Outputs. This does not apply for the AI Endpoint Batch API Service.“
- **Widerspruch:** Zero Retention ohne Vorbehalt für das Produkt, der Vertrag nimmt eine beworbene Variante aus, ohne Frist. Funktional erklärbar (asynchrone Verarbeitung).
- **Was es nicht heißt:** Der Vertrag sagt „OVHcloud has no knowledge of Inputs and Outputs, and OVHcloud does not reuse them in any way“, passend zu „Your data will never be used to train or improve our AI models“. Zertifikats-Aussage fair („Underlying platform with ISO 27000, SOC, and healthcare data certifications“). Katalog: alle 18 Modelle `country_code: FR`, Docs „located in Gravelines, France“.
- **Auffällig, kein Fall nach Definition:** https://us.ovhcloud.com/legal/faqs/gdpr-compliance/ nennt noch „our EU and Swiss Privacy Shield certifications“ (seit 2020 ungültig). Veraltet, kein Widerspruch zu einer anderen OVH-Aussage. DPA- und Subprozessoren-PDFs auf der EU-Seite per JS geladen, nicht im HTML.

### Lyceum (Nr. 24)

- **Aussage A:** „EU data centres — GPUs hosted in European data centres. Full GDPR compliance, data residency in the EU.“ und Badge „GDPR Compliant · EU Data Residency“ — https://lyceum.technology/ (11:30), Abschnitt „Built for teams that ship.“
- **Aussage B:** „In the serverless catalogue, four of the 35 models are global-hosted and never receive traffic unless you explicitly select them; everything else runs in the EU.“ — https://lyceum.technology/magazine/gdpr-compliant-llm-inference-europe/ (11:43); ähnlich im Sovereign-AI-Guide. Auf https://lyceum.technology/products/inference/models/ („Showing 33 models“) kein Hosting-Kennzeichen.
- **Widerspruch:** Pauschales Badge vs. eingeräumter Teil außerhalb der EU ohne Kennzeichnung im Katalog. Opt-in-Mechanik entkräftet weitgehend.
- **Kein Fall, aber bemerkenswert:** Lyceum ist ungewöhnlich ehrlich: „Lyceum holds no BSI C5 attestation and no ISO 27001 or SOC 2 certificate today“ (C5-Artikel), „No. Lyceum holds no ISO 27001 certificate today“ (GDPR-Artikel), obwohl der Artikel „C5 Certification GPU Cloud Germany“ heißt und es „no German data centre in that footprint“ gibt. Privacy Policy deckt nur Calendly/getwaitlist ab. Falls das Trust Center (Vanta, nicht ladbar) ISO/SOC-Badges zeigt, wäre das gegen die Magazin-Aussagen ein starker Fall. Braucht Browser.

### Aleph Alpha (kein Kandidat)

Geprüft: aleph-alpha.com/ und /en/, /impressum/, /datenschutz/, DQS-Datenbank (11:39), HF-Modellkarten Pharia-1-LLM-7B-control und llama-3_1-8b-tfree-hat-sft. 404: /security, /trust, /legal, /compliance. docs.aleph-alpha.com nur JS-Shell; AGB und API-Nutzungsbedingungen nicht auffindbar. Auffällig: Pharia-Modellkarte „No prompt data is stored when using our systems … We do not log user inputs to the models. We do not train on user data.“ verweist auf nicht auffindbare Terms, Status beansprucht. DQS: ISO/IEC 27001:2022, Scope „Research, development and commercialization of generative AI technology…“, zertifizierte Adresse Ritterstrasse 6, Berlin (Website: Wallstraße 16). Trivia.

### Nordference (kein Kandidat)

Single-Page-App (HTML 2,8 KB); alle Texte inklusive Privacy Policy, Terms, SLA im Bundle https://nordference.ai/assets/index-CGzvo87P.js (11:34). Aussagen untereinander konsistent: Privacy Policy „We maintain a zero data retention policy for inference data. Your prompts and model outputs are processed in real-time and are not stored on our systems.“; GDPR-Seite „we do not transfer data to third countries outside the EEA“; DPA nur auf Anfrage. Chips „ISO 27001“ und „SOC 2 Type II“ in den Enterprise-Branchenkacheln ohne Inhaberangabe und ohne das Wort „certified“ irgendwo im Bundle: beansprucht.

## Nächster Lauf

~28.09.2026, zusammen mit dem Quellenlauf. Dann zusätzlich: die drei Vanta-Trust-Center und Gcores Legal-Tabs im Browser lesen; Anbieter mit zwischenzeitlich abgeschlossenen Fällen wieder aufnehmen.

## Nachtrag 03.10.2026: Widerspruchs-Scan aus dem Quellenlauf

Kein vollständiger Scan wie am 06.09., sondern Nebenbefund der Handprüfung aller 75 am 03.10. als „verändert“ gemeldeten Quellen (drei Prüfer, ca. 16:00–16:25 UTC, `curl` mit Browser-User-Agent; Befunde außerhalb des Repos in `~/allein/ql-teile/befund1-3.md`). Gesucht wurde dabei nur nebenbei nach Aussage gegen Aussage.

| # | Anbieter | Kurz | Konfidenz | Muster |
|---|---|---|---|---|
| 23 | Opper AI | Compliance-Seite „EU data residency on every plan“ vs. DPA 2.1 „Model inference may take place inside or outside the EEA depending on the model route used; it is not restricted to the EEA by default.“ (DPA „Last updated“ jetzt 23.09.2026) | mittel | Lesart: „data residency“ kann gespeicherte Daten meinen, nicht die Inferenz |

- Weiter bestehend, schon Fall: Requesty (2026-001) — DPA-Seite „bodies are never stored“ und auf derselben Seite 30 Tage Logging als Standard.
- Kein neuer Kandidat: Scaleway (Doku jetzt „By default we apply a Zero Data Retention Policy“ mit genannten Ausnahmen, in sich stimmig), T-Systems (Training-Aussage jetzt einheitlich „Not used for model training“).
- Vor einer Eröffnung: beide Opper-Seiten neu abrufen, hashen, archivieren (Ablauf README). Eröffnen nur nach „steht“ von Felix.

**Entwurf 03.10.2026, 17:20 UTC:** Kandidat 23 als `data/faelle/entwurf/2026-005-opper-eu-data-residency.json` angelegt (Rohkopien + SHA256SUMS in `belege/faelle/2026-005/`, Compliance-Seite und DPA im Internet Archive). Alle vier Zitate wörtlich in den Rohkopien geprüft. **Einschätzung beim Neuabruf: schwächer als gedacht (niedrig-mittel).** Dieselbe Compliance-Seite qualifiziert sich selbst: FAQ „A model name without a provider prefix can be served from any region in its pool“ und Grafik „Data leaves the EU only on a route hosted elsewhere, which a bare model name may pick“. Übrig bleibt nur der Einleitungssatz („EU data residency on every plan“ ohne Einschränkung), Muster wie Mistral Nr. 14 (Default-Lesart). Empfehlung: nicht vor einem stärkeren Kandidaten eröffnen.

**Nebenbefund, Nachfolger von Nr. 8:** Die alte FAQ-Aussage („no listed model provider … trains“) ist inzwischen korrigiert. Die Security Overview (Last updated 2026-09-28) sagt aber: „Opper does not use customer data to train models and does not share it with providers for training.“ Das Trust Center (trust.opper.ai, Last updated 30.09.2026) führt dagegen Moonshot AI („Request content may be used to train Moonshot AI's models“), Meta (Training laut Zeile) und Exa („may use search queries to train and improve its own models“). Es ist ebenfalls eine Lesart-Frage („for training“ = Zweck der Weitergabe), Konfidenz mittel. Rohkopie `belege/faelle/2026-005/security-overview.html` und `sub-processors.html` liegen bereits mit Hash vor.

## Nachtrag 03.10.2026, 18:10–18:25 UTC: DeepL und Nebius nach der Standort-Korrektur

Anlass: Beim Quellenlauf wurden beide Standortangaben korrigiert (DeepL seit 2026 hybrid mit AWS, Nebius Serverless „Global“). Frage: Werben beide anderswo mit EU-Verarbeitung? Abruf per `curl` mit Browser-User-Agent; SHA-256 (erste 16 Zeichen) der Abrufe in Klammern, Rohdateien nicht im Repo.

**DeepL — keine EU-Werbung gefunden, ein schwacher neuer Kandidat (Nr. 29, niedrig-mittel):**
- Durchsucht: /en/pro-data-security (76a6b7ee…), /en/pro (f68ef7a2…), /en/products/api (883d014a…), /en/pro-license (1136c4fb…), /en/privacy (149df790…). Keine Aussage, dass Inhalte in der EU verarbeitet werden. /en/pro sagt nur „All processing is performed in secure, ISO 27001-certified data centers.“ (trifft auf AWS ebenso zu). Der EWR-Satz der Privacy Policy („The data is processed exclusively on DeepL’s servers in the EEA, the data is not transferred to the USA.“) steht in Abschnitt 11 „Analysis of User Behaviour“ und betrifft nur pseudonymisierte Nutzungsdaten, nicht Übersetzungsinhalte. Kein Widerspruch.
- **Nr. 29, Aussage A:** Privacy Policy, Voice for Meetings: „The cloud services will only be used to host our bot application and forward the audio data to our infrastructure. Neither will the transcription or translation be happening on Microsoft or AWS servers, nor will we store any data on Microsoft or AWS servers for this purpose.“
- **Nr. 29, Aussage B:** Hilfe-Artikel „DeepL infrastructure and data protection“ (https://support.deepl.com/hc/en-us/articles/26380849099932, edited 2026-05-18, abgerufen über die Help-Center-API, bdcaa748…): „In Europe, services are delivered through a combination of DeepL infrastructure and AWS, while in other regions AWS infrastructure is used only. By default, customer content may be processed in different regions.“ und „If you choose to accept the use of AWS as a sub-processor, DeepL reserves the right to process your content data in any of its global AWS regions.“
- **Was es nicht heißt:** Der Hilfe-Artikel beschreibt eine Umstellung „during the transition in 2026“ mit Widerspruchsrecht (wer widerspricht, bleibt bis Vertragsende auf DeepL-Infrastruktur). Die Privacy Policy kann den Altstand beschreiben. Die Pro-AGB (/en/pro-license) nennen AWS, Subprozessoren und Regionen gar nicht; der Artikel kündigt „updated Terms and Conditions“ erst an. Ob Voice ausgenommen ist: ungeklärt. Eher Hinweis als Fall; beim nächsten Quellenlauf (28.10.) Privacy Policy und AGB auf die AWS-Fassung prüfen.

**Nebius — kein neuer Kandidat:**
- Legal Quick Guide (7e1a7231…) und Doku „Public Serverless Endpoints“ (d5eb5ba6…) sagen offen und übereinstimmend: öffentliche Endpunkte „Global“, Ort „can change at any time without prior notice“, nicht für Produktion mit Regionsbedarf; feste Region nur über Dedicated Endpoint, dort als Vertragspflicht (DPA 6.1). Speculative-Decoding-Speicher liegt in Finnland.
- Trust Center (f18d90ab…) „ensuring that customer data remains within the geographic region of their choice“ bleibt wie Nr. 18 eine Prinzip-Aussage; mit der Doku lesbar als „Wahl = Dedicated Endpoint“. Keine Verschärfung.
- Nr. 16 (Produktseite-FAQ „Data centers are located in Finland and France and US, and meet EU and US data-residency requirements“): steht im ausgelieferten HTML von nebius.com/services/token-factory (3c1024fc…) nicht mehr. Ob die Seite den Satz clientseitig nachlädt: ungeklärt (Browser nötig).

## Nachtrag 03.10.2026, 18:54 UTC: Nr. 3, 5 und 6 live nachgeprüft (Dauerlauf)

Alle Seiten per curl abgerufen (HTTP 200), Text wörtlich gegen die Zitate oben geprüft. Ergebnis: **alle drei Widersprüche stehen unverändert.**

| Nr. | Anbieter | Aussage A (03.10.) | Aussage B (03.10.) | Stand |
|---|---|---|---|---|
| 3 | T-Systems | Trust-Seite: „never saved or used to train“, Category 1 „not stored“, Tabelle „Storage — Not stored“; Cache wird auf der Seite nirgends erwähnt (nur Navigationslink „Prefix Caching“) | Leistungsbeschreibung **weiter v1.23, Stand 31.08.2026**, § 2.3.1 Cache-Funktion „standardmäßig eingeschaltet“; Prefix-Caching-Doku „Caching is on by default on T-Cloud-hosted models“ | steht |
| 5 | Regolo | ZDR-Seite: „no records of any kind“, „No API call logging“, „permanently discarded. No logs, no traces“ | Privacy Policy: LOGs mit IP, Verbindungszeit, Request-Typ, Dauer „Until the cancellation of the Account“; eigener Blog jetzt zusätzlich: geloggt werden „timestamp, HTTP status code, request duration …, input/output token counts, and **API key identifier**“ | steht, eher stärker (Schlüssel-Kennung macht die Zeilen personenbeziehbar) |
| 6 | IONOS | Doku EU AI Act: „If your application's use case falls into a high-risk category … The AI Model Hub provides the flexible infrastructure to help you achieve …“ | KI-AGB Ziffer 4.2 wortgleich auf cloud.ionos.de und ionos.de: Hochrisiko „ausdrücklich untersagt“, Freistellung | steht |

SHA-256 der Abrufe 03.10. 18:54 UTC (nur Prüfung, keine Rohkopien im Repo, weil kein Fall):
ts-trust `df454e98…`, Leistungsbeschreibung-PDF `5c4292ad…`, ts-cache `681e82f2…`, rg-zdr `de1a02c5…`, rg-pp `6ec26403…`, rg-blog `4580afc1…`, io-doc `b728c6d4…`, io-agb `01ed83ce…`.

**Einschätzung für den nächsten Fall-Entwurf:** Nr. 3 T-Systems ist der stärkste offene Kandidat: großer Name, die Trust-Seite nennt die Leistungsbeschreibung selbst „the binding source“, und genau die widerspricht ihr. Nr. 5 Regolo ist sauberer belegt, aber kleiner. Nr. 6 bleibt ohne Datenschutzbezug zweite Wahl. Kein Entwurf angelegt (Frage 47 an Felix).

## Nachtrag 03.10.2026, 19:57–20:05 UTC: Archivkopien für Nr. 3 und Nr. 5 (Dauerlauf)

Bisher gab es für die zwei stärksten offenen Kandidaten nur Hashes, keine Archivkopie. Ändert ein Anbieter die Seite, bevor ein Fall eröffnet ist, wäre der Beleg weg. Jetzt archiviert (Wayback „Save Page Now“) und **jedes Zitat wörtlich in der Archivkopie geprüft** (`lib/archiv.js` → `zitatInText`, Abruf mit `id_`): 11 von 11 Zitaten belegt. PDFs per SHA-256 gegen den Live-Abruf verglichen.

| Nr. | Seite | Archivkopie | Prüfung |
|---|---|---|---|
| 3 | Trust-Seite | https://web.archive.org/web/20261003195658/https://docs.llmhub.t-systems.net/reference/enterprise-trust/ | „never saved or used to train…“, „not stored and not viewable…“, „is the binding source“ OK |
| 3 | Leistungsbeschreibung v1.23 (PDF) | https://web.archive.org/web/20260924143456/https://docs.llmhub.t-systems.net/files/Leistungsbeschreibung-LLM-Serving-Service.pdf | SHA-256 `5c4292ad…` = Live 03.10. (Wayback hat dedupliziert, Kopie vom 24.09. ist byte-gleich) |
| 3 | Prefix-Caching-Doku | https://web.archive.org/web/20261003195704/https://docs.llmhub.t-systems.net/guides/prefix-caching/ | „Caching is on by default…“, „save_cache: false…“ OK |
| 5 | ZDR-Seite | https://web.archive.org/web/20261003195709/https://regolo.ai/zero-data-retention/ | „no records of any kind“, „No logs, no traces“ OK |
| 5 | Privacy Policy | https://web.archive.org/web/20261002111700/https://regolo.ai/privacy-policy/ | „request type (without the content)…“, „Until the cancellation of the Account“ OK (Neuabruf 03.10. scheiterte zweimal mit 520, Kopie vom 02.10. trägt) |
| 5 | Blog (Logging-Daemon) | https://web.archive.org/web/20261003195910/https://regolo.ai/zero-data-retention-llm-gdpr-ai-act-compliance/ | „API key identifier“ OK |
| 23 | Red-Hive-Urkunde (PDF) | https://web.archive.org/web/20260915205027/https://regolo.ai/wp-content/uploads/2026/07/Certificate_REGOLO.AI24-Jul-2026.pdf | SHA-256 `0f28c18c…` = Live 03.10. |
| 28 | FAQ | https://web.archive.org/web/20261003200024/https://regolo.ai/faq/ | „fully GDPR-compliant by design“ OK |

Damit kann ein Fall-Entwurf zu Nr. 3 (oder Ersatz Nr. 5) nach Felix' Antwort auf Frage 47 direkt auf diese Kopien zeigen; Rohkopien ins Repo kommen erst mit dem Entwurf (`belege/faelle/2026-006/`).

## Entwurf 03.10.2026, 20:05 UTC: Nr. 3 T-Systems als Fall 2026-006 (Freigabe Felix, Frage 47)

`data/faelle/entwurf/2026-006-t-systems-not-stored-cache.json`, Rohkopien + SHA256SUMS in `belege/faelle/2026-006/` (Trust-Seite, Prefix-Caching-Doku, Leistungsbeschreibung v1.23). Neuabruf 20:05 UTC: Leistungsbeschreibung weiter v1.23 / 31.08.2026, SHA-256 `5c4292ad…` unverändert; alle vier Zitate wörtlich in Rohkopie und Archivkopie (PDF per Hash). Die Trust-Seite erwähnt den Cache weiter nur als Navigationslink „Prefix Caching“. Nicht eröffnet, Telekom nicht informiert. Vor einer Eröffnung: neu abrufen, hashen, Eröffnen nur nach „steht“. Offen und im Fall als „nicht geprüft“ vermerkt: Cache-Dauer und ob Telekom-Personal auf den Cache zugreifen kann. Erwartbares Gegenargument: Ein Prefix-Cache sei keine Speicherung der Anfrage; dagegen steht die eigene Doku („retained“, „held“, „stored“).

## Entwurf 04.10.2026, 00:21 UTC: Nr. 5 Regolo als Fall 2026-007 (Dauerlauf, Reserve)

`data/faelle/entwurf/2026-007-regolo-no-records.json`, Rohkopien + SHA256SUMS in `belege/faelle/2026-007/`. Alle drei Seiten byte-gleich zum Abruf 03.10. 18:54 (gleiche SHA-256), alle vier Zitate wörtlich in Rohkopie **und** Archivkopie. Liegt als Reserve hinter Fall 006 T-Systems (Frage 53); nicht eröffnet, Regolo nicht informiert. Nebenbefund: Unser eigenes Profil `data/anbieter/regolo.json` übernimmt in der Anmerkung zu `zero_data_retention` „keine Logs/Persistenz“, das wäre bei Eröffnung auf „keine Inhalte gespeichert, Metadaten werden geloggt“ zu präzisieren.

## Nachtrag 04.10.2026, 02:04–02:06 UTC: Archivkopien für Nr. 6 IONOS (Dauerlauf)

Für Nr. 3 und 5 gab es seit 03.10. Archivkopien, für Nr. 6 nur Hashes. Jetzt archiviert (Wayback „Save Page Now“) und jedes Zitatteil wörtlich in der Archivkopie (Abruf mit `id_`) und live geprüft (`lib/archiv.js` → `zitatInText(...).ok`): **5 von 5 belegt, Widerspruch steht unverändert.**

| Seite | Archivkopie | Prüfung |
|---|---|---|
| Doku EU AI Act | https://web.archive.org/web/20261004020427/https://docs.ionos.com/cloud/ai/ai-model-hub/governance-and-compliance/eu-ai-act | „If your application's use case falls into a high-risk category …“, „The AI Model Hub provides the flexible infrastructure …“ OK; SHA-256 live `b728c6d4…` = 03.10. |
| KI-AGB cloud.ionos.de | https://web.archive.org/web/20261004020507/https://cloud.ionos.de/terms-gtc/ki-dienste/ | Ziffer 4.2 „Die Nutzung der Dienste zur Entwicklung oder zum Betrieb von“, „(Art. 6 KI-VO) ist ausdrücklich untersagt“, Freistellungssatz OK; SHA-256 live `01ed83ce…` = 03.10. |
| KI-AGB ionos.de | https://web.archive.org/web/20261004020529/https://www.ionos.de/terms-gtc/ki-dienste/ | wie oben (mit „IONOS“ statt „IONOS CLOUD“) OK; SHA-256 live `8a68019e…` (03.10. nicht gehasht) |

Bewertung unverändert: zweite Wahl hinter 006/007, weil ohne Datenschutzbezug. Der Beleg überlebt jetzt aber eine AGB-Änderung. Kein Entwurf angelegt.

## Nachtrag 04.10.2026, 22:30–22:37 UTC: Nr. 4 und 16 Nebius nach dem Vertragswechsel (Dauerlauf)

Anlass: Nachprüfung des Profils. Nebius hat die Vertragsgrundlage der Token Factory ausgetauscht: Die alten „Terms of Service“ (docs.tokenfactory.nebius.com/legal/terms-of-service, Fassung 20.08.2026) gelten laut eigenem Hinweis nur noch für Kunden mit laufender Reserve; für alle anderen gilt seit 28.09.2026 das Nebius Services Agreement (docs.nebius.com/legal/agreement, veröffentlicht 15.09.2026) mit den „Token Factory Supplemental Terms“ (docs.nebius.com/legal/token-factory, 15.09.2026) und dem DPA vom 15.09.2026. Alle Zitate in zwei Abrufen wörtlich (Markdown- und HTML-Fassung, Hash beider Abrufe gleich) und in der Archivkopie.

**Nr. 4 trägt weiter, Aussage B hat eine neue Fundstelle, und der Widerspruch liegt jetzt auch im Vertrag selbst:**

| Dokument | Wortlaut | Archivkopie |
|---|---|---|
| Supplemental Terms 5.1 (Vertrag) | „Nebius may access, use, host, cache, store, copy, modify, and otherwise process Input and Output to (a) provide, maintain, monitor, protect, and support the Services, Token Factory Service or (b) train smaller Models used for Speculative Decoding.“ | https://web.archive.org/web/20261004223414/https://docs.nebius.com/legal/token-factory |
| DPA Anhang 3 (Vertrag) | „Unless Zero Data Retention is enabled, inputs and outputs may be retained and used solely for the documented speculative-decoding purpose and not for model training or improvement.“ | https://web.archive.org/web/20261004223442/https://docs.nebius.com/legal/dpa |
| Legal Quick Guide 4.2 (Zusammenfassung) | „Your content is not used to train any models in either mode.“ | https://web.archive.org/web/20261004223610/https://docs.tokenfactory.nebius.com/legal/legal-quick-guide |

Rangfolge laut Agreement 20.12: (a) DPA, nur für die Verarbeitung personenbezogener Daten, (c) Service-Specific Terms, (e) Dokumentation. Für personenbezogene Daten gilt also „not for model training“, für alles andere räumt 5.1 das Recht ein, Entwurfsmodelle zu trainieren. Die alte Aussage B („for the purpose of training smaller Models used exclusively for Speculative Decoding“, ToS Abschnitt 7) steht weiter in den alten ToS, gilt aber nur noch für Reserve-Kunden. Was es nicht heißt, bleibt wie oben: Standard = Speicherung und Opt-out ist offen dokumentiert, es geht nicht um die Hauptmodelle.

**Nr. 16, die Subprozessoren-Liste ist umgezogen und hat andere Namen:** neue Adresse docs.nebius.com/legal/sub-processors_tofa (Fassung 23.09.2026, Archiv https://web.archive.org/web/20261004223544/https://docs.nebius.com/legal/sub-processors_tofa). Infrastruktur für die Modellverarbeitung: Nebius B.V. (Frankreich, Island, Finnland, Vereinigtes Königreich), Nebius Inc. (USA), Nebius Israel Ltd. (Israel), RunPod Inc. (Island), BoostRun, LLC (USA), Shadeform, Inc. (USA), Axe Compute Inc. (Kanada). „Data Section, Inc.“ und „Eigen AI, Inc.“ aus der Liste vom 28.08.2026 stehen nicht mehr darin. Die alte Adresse docs.tokenfactory.nebius.com/legal/subprocessors und die Produktseiten-FAQ („Finland and France and US“) wurden in diesem Lauf nicht neu abgerufen; vor einem Fall beides neu prüfen.

Profil am 05.10.2026 nachgezogen (Commit `7281970`): Training `beansprucht` ohne Wert (widersprüchlich, Muster Requesty), Zero Data Retention `belegt` als Schalter (Muster Mistral), Subprozessoren auf die Token-Factory-Liste. Kein Entwurf angelegt; Rang von Nr. 4 unverändert „hoch“.

## Nachtrag 04.10.2026, 23:20–23:35 UTC: STACKIT nachgeprüft, Nr. 30 neu (Dauerlauf)

Profil am 05.10.2026 nachgezogen (Commit `c9588d8`): AVV und Subprozessoren `unbelegt` → `belegt` (AVV Version 2.4.2 mit Anlage 2, deutsche Fassung https://stackit.com/de/asset/download/34534/file/STACKIT_Auftragsverarbeitungsvertrag.pdf, Archiv https://web.archive.org/web/20261004232738/https://stackit.com/de/asset/download/34534/file/STACKIT_Auftragsverarbeitungsvertrag.pdf, byte-gleich zum Abruf). Nr. 15 und Nr. 27 unverändert; die Spaltenzuordnung Firma/Zweck in Anlage 2 ist auch in der deutschen Fassung aus dem Textlayer nicht sicher zu lesen (14 Firmen, 14 Zweckzeilen, aber nicht zeilenweise ausgerichtet).

**Nr. 30 (niedrig), STACKIT, AI-Act-Werbung ohne Nachweis:**
- **Aussage A:** Wissensseite https://stackit.com/en/learn/knowledge/cloud/cloud-ai/ai-act (datiert 30.07.2026, Abruf 04.10.2026 23:20 UTC, Archiv https://web.archive.org/web/20261004233353/https://stackit.com/en/learn/knowledge/cloud/cloud-ai/ai-act): „STACKIT’s high-performance cloud infrastructure meets all key requirements of the AI Act, such as data protection, risk management, governance, and technical compliance.“ und „STACKIT’s certifications, such as ISO 27001 and C5, comply with the security requirements set forth in the AI Act.“
- **Aussage B:** Leistungsschein STACKIT AI Model Serving, Version 1.3 (gültig ab 18.09.2025): „STACKIT weist zusätzlich darauf hin, dass der Kunde etwaig einschlägige gesetzliche Bestimmungen für vom Kunden erstellte KI-Anwendungen einzuhalten hat.“ Eine eigene AI-Act-Dokumentation oder Rollenangabe von STACKIT ist auf Produkt-, Zertifikats-, Compliance- und AGB-Seite nicht zu finden.
- **Einordnung:** kein Widerspruch zweier Tatsachenaussagen, sondern eine Werbeaussage ohne Beleg; für den AI Act gibt es noch keine im Amtsblatt zitierte harmonisierte Norm (siehe Fragenseite, Stand 04.10.). Als Fall nur tragfähig, wenn die Regel „Werbung mit Rechtskonformität ohne Nachweis“ gewollt ist; das wäre nah an einer rechtlichen Bewertung (Regel 18.09.). Kein Entwurf.

## Nachtrag 05.10.2026, 01:25–01:35 UTC: Nordference nachgeprüft, Nr. 31 neu (Dauerlauf)

Profil am 05.10.2026 nachgezogen: `training_opt_out` `unbelegt` → `belegt` (Startseite, Kachel „Legal“: „Your prompts and outputs are never stored or used for training.“; Werbetext, in Terms/Privacy/GDPR-Seite vom 28.01.2026 steht das Wort Training nicht), AI Act `unbelegt` → `beansprucht` (Vergleichstabelle, Zeile „EU AI Act Ready“ mit Häkchen bei Nordference; im Bündel `featureKey:"comparison.features.euAiAct",nordference:!0`), AVV bleibt `beansprucht`, Subprozessoren bleiben `unbelegt`. Quelle für alle Texte ist das Skript-Bündel https://nordference.ai/assets/index-CGzvo87P.js (SHA-256 `e68e235c…`, zwei Abrufe und Archivkopie https://web.archive.org/web/20261005012917/https://nordference.ai/assets/index-CGzvo87P.js byte-gleich; Startseite https://web.archive.org/web/20261005012933/https://nordference.ai/). Die Einschätzung vom September („alle Aussagen untereinander konsistent, kein Kandidat“) gilt für die Vertragstexte weiter.

**Nr. 31 (niedrig), Nordference, Dienst öffentlich nicht erreichbar und „keine Drittland-Übermittlung“ bei Auslieferung über Cloudflare:**
- **Beobachtung 1:** Die Website nennt als Endpunkt `https://api.nordference.ai/v1` (dreimal im Bündel). Der Name `api.nordference.ai` war am 05.10.2026 01:28 UTC bei drei öffentlichen DNS-Diensten (1.1.1.1, 9.9.9.9, 8.8.8.8) nicht eingetragen (NXDOMAIN, SOA der Zone bei Cloudflare); `status.nordference.ai` wurde nur über den lokalen Resolver abgefragt (keine Antwort), nicht über die drei öffentlichen. Zugang gibt es laut Website nur über „Request Beta Access“ („Join our private beta and get free credits to start building.“). Ob der Name früher eingetragen war und ob Beta-Kunden einen anderen Endpunkt bekommen: ungeklärt. Preise und SLA (99,9 %) sind veröffentlicht, ein öffentlich aufrufbarer Dienst ist nicht nachweisbar.
- **Beobachtung 2:** GDPR-Seite: „Unlike many AI providers, we do not transfer data to third countries outside the EEA.“ Die Website selbst (mit dem Beta-Formular: Name, E-Mail, Firma) wird über Cloudflare ausgeliefert (Antwortkopf „Server: cloudflare“, Nameserver `aragorn.ns.cloudflare.com`). Wohin das Formular sendet, war im Bündel nicht zu finden: ungeklärt. Der Satz bezieht sich nach seinem Zusammenhang auf „data processed through Nordference“, also die Inference, nicht auf die Website.
- **Einordnung:** kein Widerspruch zweier Tatsachenaussagen zur Inference. Beobachtung 1 gehört ins Profil (steht seit 05.10. in der Kurzbeschreibung), nicht in einen Fall. Kein Entwurf.

## Nachtrag 05.10.2026, 02:45–03:05 UTC: Exoscale nachgeprüft, Nr. 32 neu (Dauerlauf)

Profil am 05.10.2026 nachgezogen: ISO 27017, ISO 27018 und HDS als eigene Einträge `belegt` (Tabelle „Third-Party Certifications“ auf https://community.exoscale.com/platform/compliance/, Archiv https://web.archive.org/web/20261005024823/https://community.exoscale.com/platform/compliance/, byte-gleich), CSA STAR Level 1 neu als `beansprucht` (siehe Nr. 32), „Managed Inference“ heißt bei Exoscale jetzt „On-Demand Inference“ (weiter „Coming soon“), dazu „Batch Inference“ angekündigt. `training_opt_out`, `zero_data_retention` und AI Act bleiben `unbelegt`: In Terms and Conditions (gültig ab 02.07.2026), DPA, Privacy Policy und Dedicated-Inference-Doku steht dazu nichts. Preise Dedicated Inference unverändert. Beleg-Quote 67 → 69 %. Nr. 7 (Rechenzentrums-Tabelle) nicht erneut geprüft.

**Nr. 32 (niedrig), Exoscale, „published on the CSA STAR Registry“ ohne auffindbaren Eintrag:**
- **Aussage A:** https://www.exoscale.com/compliance/csa-star/ (Abruf 05.10.2026 02:45 UTC, zwei Abrufe und Archiv https://web.archive.org/web/20261005024847/https://www.exoscale.com/compliance/csa-star/ byte-gleich): „Exoscale’s completed CAIQ is available to customers and partners in our Compliance Center, and published on the CSA STAR Registry for full transparency.“
- **Beobachtung B:** Die Registerliste https://cloudsecurityalliance.org/star/registry?q=exoscale (Abruf 05.10.2026, 2.810 Einträge in der ausgelieferten Seite; Kontrolle: `nebius-bv`, `scaleway`, `seeweb`, `ovh-us` stehen darin) enthält keinen Eintrag mit „exoscale“, „akenes“ oder „a1“. Die geratenen Adressen `/star/registry/exoscale`, `/akenes-sa`, `/akenes` liefern 404.
- **Ungeklärt:** ob der Eintrag unter einem anderen Namen läuft, abgelaufen ist oder die Liste nicht vollständig ausgeliefert wird. Die Doku-Seite von Exoscale (community.exoscale.com/platform/compliance/) nennt CSA STAR gar nicht.
- **Einordnung:** eine überprüfbare Tatsachenaussage („im Register veröffentlicht“), deren Beleg am Stichtag fehlt; klein, weil es eine Selbstauskunft und kein Zertifikat ist. Taugt wie Nr. 7 als kurzer Hinweis per Mail ohne Fall. Kein Entwurf.

## Nachtrag 05.10.2026, 04:28–04:40 UTC: EUrouter nachgeprüft, Nr. 33 neu (Dauerlauf)

Profil am 05.10.2026 nachgezogen (Commit `85d7555`): kein Statuswechsel. AVV, Subprozessoren, Training und Zero Data Retention stehen wörtlich wie am 03.10. im DPA („Last updated: May 2026“, Providerliste „Last updated: 25 August 2026“); Training und Zero Data Retention stehen zusätzlich in den AGB („Last updated: June 2026“). ISO 27001, SOC 2 und AI Act bleiben `unbelegt`, jetzt mit Prüfdatum und Fundstellen. Preise der fünf Modelle unverändert. Sieben Seiten in zwei Abrufen und in der Wayback-Kopie byte-gleich: DPA https://web.archive.org/web/20261005042945/https://www.eurouter.ai/dpa, AGB https://web.archive.org/web/20261005043013/https://www.eurouter.ai/terms, Datenschutzerklärung https://web.archive.org/web/20261005043044/https://www.eurouter.ai/privacy, Startseite https://web.archive.org/web/20261005043115/https://www.eurouter.ai/, Provider-Seiten Nebius https://web.archive.org/web/20261005043243/https://www.eurouter.ai/providers/nebius, Mistral https://web.archive.org/web/20261005043322/https://www.eurouter.ai/providers/mistral, Scaleway https://web.archive.org/web/20261005043354/https://www.eurouter.ai/providers/scaleway. Nr. 10 (Better Stack, DPF/SCC) und Nr. 25 stehen unverändert.

**Nr. 33 (niedrig bis mittel), EUrouter, „Zero data retention“ als Pauschalangabe für jeden Provider:**
- **Aussage A:** Provider-Seiten https://www.eurouter.ai/providers/nebius, /mistral, /scaleway (Abruf 05.10.2026 04:28 UTC), Abschnitt „Data & Compliance“, jeweils wörtlich: „Zero data retention“, „No training on prompts“. DPA, Providerliste (25.08.2026): bei allen 15 Providern „No prompt retention / no training“, z. B. „Nebius AI model processing EU/EEA configurations only (Netherlands) No prompt retention / no training“.
- **Beobachtung B (aus unseren eigenen Profilen, dort mit Quelle und Archivkopie):** Nebius speichert Ein- und Ausgaben, solange der Schalter Zero Data Retention nicht eingeschaltet ist, und nutzt sie für Speculative Decoding (DPA 15.09.2026, Anhang 3; Supplemental Terms 5.1). Mistral gewährt Zero Data Retention nur auf Antrag, sonst 30 Tage Missbrauchsüberwachung (Datenschutzerklärung ab 03.09.2026). Scaleway speichert bei Missbrauch oder Fehlern volle Anfragen bis zu zwei Wochen (Doku, Fall 2026-004).
- **Ungeklärt:** ob EUrouter bei diesen Providern den Schalter bzw. den Antrag für das eigene Konto gesetzt hat; dann wäre die Angabe für EUrouter-Kunden richtig. Dazu steht auf keiner gelesenen Seite etwas. Das DPA sagt selbst: „Provider retention and model-training positions may vary. Customers should select providers that match their requirements.“ und nennt die Einträge „position recorded for each in the Service“.
- **Einordnung:** Bei Scaleway ist es dieselbe absolute Aussage wie in Fall 2026-004, eine Ebene höher wiederholt; bei Nebius und Mistral hängt alles an einer Einstellung, die von außen nicht zu sehen ist. Als Fall erst tragfähig nach einer Frage an EUrouter (privacy@eurouter.ai): „Ist bei Nebius und Mistral Zero Data Retention für Ihr Konto eingeschaltet, und wo steht das?“ Kein Fall-Entwurf. **Nachtrag 05.10.2026 09:11:** Nachfrage liegt als Gmail-Entwurf an privacy@eurouter.ai (Freigabe Felix, Frage 111 b), nicht gesendet; Text in `outreach/mails/16-eurouter-nachfrage-zdr-2026-10-05.md`.
- **Nicht geprüft:** die übrigen zwölf Provider-Seiten; FAQ und Cookie-Statement nicht neu gelesen; Doku nur Einstieg, Providers, Routing, Models; OpenAPI-Datei nicht gelesen; Handelsregister (KVK 42054357) nicht abgefragt.

## Nachtrag 05.10.2026, 05:36–05:50 UTC: Opper nachgeprüft, Nr. 34 und 35 neu (Dauerlauf)

Profil am 05.10.2026 nachgezogen (Commit `3a044ad`): kein Statuswechsel. DPA („Last updated on: 2026-09-23“) und Security Overview („Last updated on: 2026-09-28“) sind byte-gleich zu den Rohkopien vom 03.10. in `belege/faelle/2026-005/`. Preise der fünf Modelle unverändert. Sechs Seiten in der Wayback-Kopie byte-gleich zu einem der beiden Abrufe: DPA https://web.archive.org/web/20261005053857/https://opper.ai/data-processing-agreement, Security Overview https://web.archive.org/web/20261005053924/https://opper.ai/security-overview, Trust Center https://web.archive.org/web/20261005053951/https://trust.opper.ai/, Compliance-Seite https://web.archive.org/web/20261005054113/https://opper.ai/ai-compliance, Preise https://web.archive.org/web/20261005054136/https://opper.ai/pricing, Modelle https://web.archive.org/web/20261005054201/https://opper.ai/models (Compliance-Seite und Modelle wechseln zwischen zwei Abrufen die Bytes, die Zitate stehen in allen Fassungen).

Der Nebenbefund vom 03.10. (Nachfolger von Nr. 8, „does not share it with providers for training“ gegen die eigene Liste) besteht weiter und ist breiter geworden: Das Trust Center nennt Training jetzt bei Moonshot AI, DeepSeek, Meta („One contributed model may use request content for training“), Baidu Qianfan („Baidu's published terms allow it to use content to improve its services“) und bei der wählbaren Suchmaschine Exa.

**Nr. 34 (niedrig bis mittel), Opper, Mistral-Zeile „Does not store request content“:**
- **GESCHLOSSEN 07.10.2026 (Entscheidung Felix, Frage 147):** Opper hat am 05.10.2026 per E-Mail an belegbar.eu geantwortet: Mistral habe Zero Data Retention für Oppers Mistral-Organisation gewährt, aller Kundenverkehr laufe darüber, keine Einstellung beim Kunden nötig; öffentliche Stelle sei das Trust Center. Im Profil als Angabe des Anbieters mit Datum und „von außen nicht prüfbar“ eingetragen (Subprozessoren-Anmerkung). Kein Fall.
- **Aussage A:** https://trust.opper.ai/ (Abruf 05.10.2026 05:36 UTC, „Last updated Sep 30, 2026“), Zeile Mistral AI wörtlich: „Model provider. Receives the content of customer requests sent to its models, only when a customer selects them. Does not store request content. Not used to train models.“
- **Beobachtung B (aus unserem Mistral-Profil, dort mit Quelle):** Mistral gewährt Zero Data Retention nur auf Antrag, sonst 30 Tage Missbrauchsüberwachung (Datenschutzerklärung ab 03.09.2026).
- **Ungeklärt:** ob Opper den Antrag für sein Konto gestellt hat; dann stimmt die Zeile für Opper-Kunden. Auf keiner gelesenen Seite steht etwas dazu.
- **Einordnung:** gleiches Muster wie Nr. 33 (EUrouter). Bei Scaleway schreibt Opper dagegen „up to 14 days for abuse monitoring“, deckt sich mit Fall 2026-004; bei Nebius „May retain request content; retention period not published“, deckt sich mit unserem Profil. Opper arbeitet also sichtbar zeilengenau, was eher für eine gesetzte Einstellung bei Mistral spricht (meine Lesart, kein Beleg). Erst nach einer Frage an Opper tragfähig. Kein Entwurf, keine Mail.

**Nr. 35 (niedrig), Opper, DPA nennt nur AWS, Trust Center nennt evroc als zweite Produktionsumgebung:**
- **GESCHLOSSEN 07.10.2026 (Entscheidung Felix, Frage 147):** kein Fall (beide Orte in Stockholm, nur Ankündigungsfrage offen); der Hinweis bleibt in der AVV-Anmerkung des Profils.
- **Aussage A:** DPA 2.1 (23.09.2026): „For the shared Platform deployment, Opper deploys the web application and API service in the Amazon Web Services (AWS) Stockholm, Sweden region.“ Ebenso Security Overview (28.09.2026) und Compliance-Seite („Storage, traces, and analytics stay here“ unter AWS Stockholm).
- **Aussage B:** Trust Center (30.09.2026), Zeile Evroc: „EU sovereign cloud; Opper's second production environment (se-sto, Stockholm) running the self-managed Kubernetes stack, PostgreSQL, storage and backups. Customer data and generation content are hosted here.“
- **Einordnung:** beide Orte liegen in Stockholm, für den Kunden ändert sich das Land nicht; die Liste ist jünger als die beiden Dokumente. Offen ist nur, ob der neue Subprozessor nach DPA 4.4 dreißig Tage vorher „through the Services“ angekündigt wurde; das ist von außen nicht zu sehen. Kein Fall, höchstens ein Hinweis.

**Zum Zertifikat:** Das Trust Center zeigt „ISO/IEC 27001:2022“, „Valid through Sep 15, 2029“, „Certificate 160926-1“, „Request certificate“. Eine Zertifizierungsstelle steht nirgends; in den eingebetteten Seitendaten ist `"auditor":null` und, bei ISO 27001 wie bei GDPR, `"status":"in-progress"` neben `"verification_status":"compliant"`. Was das Feld `status` im Werkzeug (Noru) bedeutet, ist ungeklärt; ich lese daraus nichts ab. Eine Websuche nach der Nummer fand keinen Registereintrag. Status bleibt `beansprucht`.

**Nicht geprüft:** AGB (07.07.2026) und Datenschutzerklärung (17.09.2026) nur auf Training und Speicherung durchsucht (kein Treffer außer Buchhaltungsfristen), nicht ganz gelesen; die 46 Anbieterzeilen nicht einzeln gegen die Bedingungen der Anbieter gehalten (nur Mistral, Scaleway, Nebius gegen unsere Profile); Provider-Verzeichnis und einzelne Modellseiten nicht gelesen; IAF CertSearch nicht abgefragt; Handelsregister nicht abgefragt.

## Nachtrag 05.10.2026, 07:29–07:40 UTC: OVHcloud nachgeprüft, Nr. 36 und 37 neu (Dauerlauf)

Kein Statuswechsel im Profil; Einzelheiten in `NAECHSTE-SCHRITTE.md` (Stand 05.10. 09:40). Beide Kandidaten niedrig, kein Entwurf, keine Frage an den Anbieter vorbereitet.

**Nr. 36 (niedrig), OVHcloud, „Zero data retention“ ohne die Batch-Ausnahme:**
- **Werbung:** Produktseite www.ovhcloud.com/en/public-cloud/ai-endpoints/ (Wayback 20261005073237): „Zero data retention: We keep only the data required for billing purposes.“ Dieselbe Seite bietet „Base“ und „Batch“ (Beta) nebeneinander an.
- **Vertrag:** Besondere Vertragsbedingungen für Public-Cloud-Dienste, Stand 26. August 2026, Anhang 10 Ziffer 2 (Wayback 20261005073126): „Der AI Endpoints Dienst beinhaltet keine Backups oder Storages, auch nicht für kurze Zeit (mit Ausnahme des Dienstes „AI Endpoint Batch API“, bei dem es sich um ein asynchrones Dienstangebot handelt, das die Ein- und Ausgabedaten des Dienstes vorübergehend speichert).“
- **Einordnung:** Ein Batch-Dienst muss zwischenspeichern, das ist technisch erwartbar und steht offen im Vertrag; die Werbezeile nennt die Ausnahme nur nicht. Wie lange gespeichert wird, steht im Vertrag nicht (ungeklärt). Im Profil steht die Ausnahme jetzt in der Anmerkung und in der Kurzbeschreibung. Kein Fall.

**Nr. 37 (niedrig), OVHcloud, zwei Verfügbarkeitszahlen auf einer Seite:**
- Dieselbe Produktseite nennt im Block „Base“ „SLA: 99.98%“ und unter „Key features“ „Guaranteed service level API availability - 99.5% SLA.“ Der Vertrag (Anhang 10 Ziffer 4) gibt Gutschriften erst unterhalb von 99,5 % monatlicher Verfügbarkeit.
- **Einordnung:** Verfügbarkeit ist kein Feld unserer Profile; nur vermerkt. Kein Fall.

**Ungeklärt, kein Kandidat:** Die Produktseite schreibt bei „Base“ und „Batch“ je „Worldwide availability (non-EU)“. Ob damit Kunden außerhalb der EU gemeint sind oder der Ort der Verarbeitung, steht nirgends; die Dokumentation (03.02.2026) nennt als Ort Gravelines.

## Nachtrag 05.10.2026, 10:52–11:15 UTC: GreenPT nachgeprüft, Nr. 38 neu (Dauerlauf)

Kein Statuswechsel im Profil; Einzelheiten in `NAECHSTE-SCHRITTE.md` (Stand 05.10. 13:20). Fall 2026-002: Footer am 05.10. unverändert („Verified by independent audit · GDPR compliant · ISO 27001 · EU Hosted“, deutsche Startseite: „Durch unabhängige Prüfung bestätigt · DSGVO-konform · ISO 27001 · EU-gehostet“).

**Nr. 38 (mittel), GreenPT, „nur EU“ neben einem eigenen US-Endpunkt:**
- **Werbung, alle am 05.10.2026 abgerufen:**
  - greenpt.com/sustainability (Wayback 20261005105944): „Every GreenPT workload runs inside the EU.“
  - greenpt.com/privacy (Wayback 20261005110838): „All data processing happens exclusively within the European Union. Your information never crosses EU borders“ und „Every model is self-hosted on GreenPT infrastructure, so your data never leaves our environment.“
  - greenpt.com/privacy-policy, „Last updated January 14, 2026“ (Wayback 20261005110142): „All your data stays in the European Union. GreenPT processes all personal data exclusively within EU data centres located in France“. Die Unterauftragnehmer-Tabelle derselben Seite nennt drei Hoster in Finnland und Brave Search (USA), Neuralwatt nicht.
  - Deutsche Startseite greenpt.com/de (nicht archiviert, lokale Kopie): „Die Daten verlassen die EU zu keinem Zeitpunkt.“ und „Alle Daten werden innerhalb der EU verarbeitet“; auf derselben Seite oben das Banner „EU- und US-Regionen jetzt verfügbar“.
- **Eigene Doku und Ankündigung:**
  - Blog „EU and US regions are now available“, Robert Keus, 24.09.2026 (Wayback 20261005110329): „US inference is available through a dedicated endpoint, with Neuralwatt as the US inference provider.“ und „Existing integrations stay on the EU endpoint unless you explicitly change the base URL.“
  - docs.greenpt.ai/regions (Wayback 20261005105804): „The default GreenPT endpoint always uses EU inference; to use US inference, call the US endpoint explicitly.“ US-Endpunkt `https://api.us.greenpt.ai/v1` mit fünf Modellen (deepseek-v4.1-flash, glm-5.3-flash, glm-5.3, kimi-k3, qwen3-embedding-8b).
  - docs.greenpt.ai/privacy/processor (Wayback 20261005105622): Neuralwatt, „United States“, „Request content and generated output“; „Requests you send to the US endpoint may therefore be processed outside the EU.“ Ebenso docs.greenpt.ai/privacy/locations (Wayback 20261005110608).
- **Einordnung:** Die absoluten Sätze („every workload“, „never crosses EU borders“, „zu keinem Zeitpunkt“) stimmen seit dem 24.09.2026 nicht mehr für jede Anfrage. Dagegen steht: Der US-Weg ist nur auf ausdrückliche Wahl der Basis-URL offen, der Standard bleibt EU, und GreenPT legt ihn selbst in Blog und Doku offen. Unabhängig vom US-Endpunkt widerspricht „self-hosted on GreenPT infrastructure“ der eigenen Liste mit drei Hosting-Partnern, und „exclusively … in France“ der Tabelle mit Finnland auf derselben Seite. Im Profil stehen US-Endpunkt und Neuralwatt jetzt in Kurzbeschreibung, Unterauftragnehmern und bei kimi-k3. Kein Entwurf, keine Frage an den Anbieter vorbereitet (Frage 135 an Felix).
- **Ungeklärt:** wie Neuralwatt Inc. mit Anfragen umgeht (Speicherung, Training); GreenPT verweist auf deren Datenschutzerklärung, nicht geprüft. Ob es einen Übermittlungsmechanismus (Standardvertragsklauseln o. Ä.) für den US-Endpunkt gibt, steht auf den abgerufenen Seiten nicht.

**Berichtigt, kein Kandidat:** Im Profil stand bei glm-5.2 „Preis am 03.10.2026 geändert“; der Changelog nennt den 26.09.2026 (von 1,25/4,30 € auf 1,55/4,60 €). Bei Brave Search stand „Standort nicht genannt“; die Tabelle nennt „USA“. Der Satz „No training on your data“ steht in der Privacy Policy nur im Seitenmenü; der wörtliche Beleg steht auf greenpt.com/privacy, die Quelle des Feldes zeigt jetzt dorthin.

## Nachtrag 08.10.2026, 23:55–00:10 UTC (07./08.10.): Requesty nachgeprüft, Nr. 39 neu (Dauerlauf)

Kein Statuswechsel im Profil. DPA-Seite und Security-Seite seit 03.10. unverändert (Quellen-Hash gleich); auf der DPA-Seite steht „request and response bodies are never stored“ weiter ohne Einschränkung (Fall 2026-001). Die Anmerkung im Profil sagte noch, auch die Security-Seite sage „No data stored“; das stimmt seit dem Umbau im September nicht mehr und ist berichtigt. Subprozessoren-Liste „Last updated: 6 October 2026“, Teil B 37 → 41 Einträge (neu sicher: Thinking Machines Lab, US; der Rest ungeklärt, Internet Archive am 08.10. offline). Rohkopien mit SHA-256 in `belege/faelle/2026-001/*-2026-10-08.html`.

**Nr. 39 (niedrig), Requesty, „We don't train on your requests“ ohne den Free-Plan:**
- **Werbung/Doku:** docs.requesty.ai/quickstart (Rohkopie `quickstart-2026-10-08.html`): „Is my data used for training? No. Requesty is a pass-through gateway. We don’t train on your requests or responses.“
- **Eigene Policy:** requesty.ai/privacy (Rohkopie `privacy-2026-10-08.html`, gleicher Wortlaut schon in der Kopie vom 25.08.2026): „We do not train machine learning models on your data […] On any paid plan this is absolute: Requesty never trains on your data […] Requesty's own use of content for training is limited to free plan accounts.“
- **Einordnung:** Für bezahlte Tarife decken sich beide Aussagen. Für den Free-Plan behält sich Requesty nach der eigenen Policy Training vor; die Doku-Antwort sagt pauschal „No“. Niedrig, weil die Policy die Einschränkung offen nennt und der Free-Plan für Einkäufer kaum zählt. Kein Entwurf, keine Frage an den Anbieter vorbereitet.
- **Ungeklärt:** was Abschnitt 5.9 der Terms of Service genau sagt (die Seite lädt ihren Text nur per JavaScript, mit curl leer).

## Nachtrag 08.10.2026, 01:38–01:50 UTC: Gcore nachgeprüft, Nr. 40 neu (Dauerlauf)

Kein Statuswechsel im Profil. MSA auf gcore.com/legal („Last updated: June 17, 2026“) textgleich zur Archivkopie https://web.archive.org/web/20261004055218/https://gcore.com/legal, nur Banner und Menü anders; die zitierten Stellen (§7.2, §8.3, §9.4, §9.5.3, §16.3, „integral and essential“) stehen wörtlich. Whisper-Seite („fixed monthly rate“, „your audio data never leaves our secure infrastructure“), Pressemitteilung (LLaMA Pro 8B, Mistral 7B, „Stable-Diffusion XL“, 180+ Knoten), Blog vom 20.11.2024 und docs.gcore.com/edge-ai/billing.md („Resources are charged per minute“) unverändert in der Sache. Rohkopien in `~/allein/tmp/gcore-1008/` (nicht im Repo).

**Nr. 40 (mittel), Gcore, „ISO/IEC 27001:2013 certified“ nach Ende der Übergangsfrist:**
- **Werbung:** gcore.com/infrastructure (Wayback 20261008014212, lokale Rohkopie SHA-256 `418e2a1fe29ac3764aeebe84a9ce6502431879bdb5574c667847712ee755e3ba`): „Our multi-level information protection infrastructure is ISO/IEC 27001:2013 certified and compliant with PCI DCC and GDPR.“ Die deutsche Seite gcore.com/de/infrastructure nennt am 08.10. ebenfalls „27001:2013“.
- **Regel:** IAF MD 26:2023 (Issue 2, iaf.nu, am 08.10.2026 abgerufen, SHA-256 `de665f7bf5fc8289c572795267eb3b02995b8f6e61e7056d54fc3150e7583e31`): Übergangsfrist bis 31. Oktober 2025; „All certifications based on ISO/IEC 27001:2013 shall expire or be withdrawn at the end of the transition period.“
- **Einordnung:** Ein Zertifikat nach der Fassung 2013 kann seit dem 01.11.2025 nicht mehr gültig sein. Entweder ist die Seite veraltet und Gcore hält längst eines nach 27001:2022, oder die Zertifizierung ist ausgelaufen. Welches von beiden: ungeklärt; ein Zertifikat oder Register-Eintrag ist auf gcore.com und docs.gcore.com am 08.10. nicht zu finden, die Websuche liefert nur die eigene Seite. Mittel, weil die Versionsangabe nachprüfbar falsch ist, der Kern (ein ISMS-Audit) aber stimmen kann. Status im Profil bleibt `beansprucht`, Anmerkung ergänzt. Kein Entwurf, keine Frage an den Anbieter vorbereitet.
- **Nebenbei:** „PCI DCC“ auf derselben Seite ist ein Tippfehler für PCI DSS (dieselbe Seite nennt sonst „PCI DSS“), kein Kandidat.

## Nachtrag 09.10.2026, 12:45 (Dauerlauf): Browser-Punkte aus „Nächster Lauf“ abgearbeitet

- **Gcore:** Der DPA (Tab, Stand 17.06.2026) sagt in 10.1 „The current list of subprocessors is available at link“; das Linkziel steht nur im gerenderten DOM: `assets.gcore.pro/site/legal/Gcore_List_of_subprocessors_25_11__2025.pdf` (Stand 25.11.2025, 13 Einträge, darunter Gcore-Gesellschaften in USA, Serbien, Philippinen, Georgien, Usbekistan, dazu Zendesk Inc USA). Profilfeld jetzt belegt. **Kein Fall:** Die Liste gilt allgemein und sagt selbst, dass sie je nach gebuchtem Dienst kleiner ist; die Modellseiten-Aussage „never leave our secure infrastructure“ betrifft den Ort der Modellausführung, nicht Support-Werkzeuge.
- **Lyceum:** Trust Center (Vanta) zeigt DPA und „ISO Certification“ öffentlich, nur die TOMs auf Anfrage. „ISO Certification“ ist ein Vanta Engagement Letter: ISO-27001-Audit „projected to start on August 31, 2026“, kein Zertifikat → der im Profil vermutete Widerspruch besteht nicht. **Beobachtung, kein Fall (noch):** Modellseite „Prompts and outputs are processed, not stored, and never used for training“ ohne Einschränkung; DPA Schedule 1, 2.2 nimmt Inhalte für Rechtspflichten, Betrugs-/Missbrauchserkennung, Cybersicherheit und Stabilität aus. Gleiches Muster wie Fall 004 (Scaleway); die Ausnahme ist aber im öffentlichen DPA offen dokumentiert und zeitlich auf „minimum period strictly necessary“ begrenzt. Ob das ein Fall wird, entscheidet Felix.
- **Mistral und BFL:** Vanta-Trust-Center bereits am 08./09.10. im Browser gelesen (V1). Damit ist der Punkt „drei Vanta-Trust-Center und Gcores Legal-Tabs“ erledigt.

## Nachtrag 14.10.2026 08:45: Requesty, Quickstart jetzt ohne Einschränkung (Dauerlauf, Quellenlauf)

- Quickstart-FAQ neu (Abruf 14.10.2026): „Is my data used for training? No. Requesty is a pass-through gateway and does not train on your requests or responses.“ Der frühere Zusatz zu NVIDIA/Poolside-Free-Modellen steht dort nicht mehr.
- Privacy Policy am selben Tag weiter wörtlich: „Requesty's own use of content for training is limited to free plan accounts.“
- Damit sagt die Quickstart ein vorbehaltloses Nein, die Privacy Policy behält eigenes Training auf Free-Plan-Konten vor. Belege `belege/anbieter/requesty/quickstart-faq-training-2026-10-14.txt` und `privacy-zusammenfassung-2026-10-14.txt` (+ SHA256SUMS). Kein Fall eröffnet (nur mit Felix' „steht“).

## Nachtrag 23.10.2026, ~00:45–01:00 UTC: Nordference, erster Widerspruchs-Scan, Nr. 41 neu (Dauerlauf)

Skript-Bündel `index-CGzvo87P.js` byte-gleich zum 08.10. (SHA-256 `e68e235c…d9ad`), `api.nordference.ai` weiter ohne DNS-Eintrag. Belege `belege/anbieter/nordference/*-2026-10-23.txt` (3 Dateien, gestempelt).

**Nr. 41 (mittel), Nordference, Zugangsformular meldet Erfolg und sendet nichts:**
- **Werbung:** Einziger Zugangsweg ist „Request Beta Access“ („Join our private beta and get free credits to start building.“); nach dem Absenden: „Request submitted! We'll be in touch soon with your beta access.“
- **Code:** Die Absende-Funktion wartet 1 s, ruft `console.log("Beta access request:", …)` auf und zeigt die Meldung; kein Versand an einen Server (kein XMLHttpRequest/sendBeacon/Formular-fetch im Bündel). Ungeklärt bleibt nur, ob das Analyse-Skript des Baukastens (`/~flock.js`) Eingaben mitnimmt.
- **Einordnung:** Wer sich anmeldet, wird nie kontaktiert. Zusammen mit dem fehlenden API-Host spricht viel dafür, dass es den Dienst so nicht gibt. Mittel statt hoch, weil niemand Geld verliert und kein Kunde betroffen sein kann; eher ein Grund, Nordference im Katalog deutlich als „nicht nutzbar“ zu kennzeichnen als ein Fall.
- **Nebenbei (kein eigener Kandidat):** SLA 99,9 %/99,99 % schließt „beta or preview features“ aus, das ganze Angebot ist Beta; Datenschutzseite „we do not transfer data to third countries outside the EEA“, die Website lädt aber Google Fonts; zwei Adressen heißen „Data Protection Officer“ (privacy@ auf /privacy, dpo@ auf /gdpr).

## Nachtrag 23.10.2026, ~02:30 UTC: Opper, Widerspruchs-Scan über 17 Seiten + Trust Center, Nr. 42 und 43 neu (Dauerlauf)

Abruf mit curl, 3 s Abstand, robots.txt erlaubt alles Gelesene. DPA („Last updated on: 2026-09-23“), Security Overview (2026-10-05), Privacy Policy (2026-09-17), Terms (2026-07-07), Trust Center (Oct 19, 2026) mit gleichem Datum wie bei den letzten Prüfungen. Rohseiten in `~/allein/tmp/ws2310o/` (nicht im Repo). Belege `belege/anbieter/opper-ai/opper-zdr-begriff-2026-10-23.txt` und `opper-souveraen-datadog-2026-10-23.txt` (gestempelt).

**Nr. 42 (mittel), Opper, „End-to-end zero data retention on every plan“:**
- **Aussage A:** https://opper.ai/llm-gateway, Kasten „Zero data retention“: „End-to-end zero data retention on every plan“. Preisseite FAQ: „On Gateway, zero data retention: only usage metadata, no prompts or responses.“
- **Aussage B:** Security Overview Abschnitt 2: „For every call, Opper records usage metadata: the model, token counts, latency, status and cost. These records power billing and analytics and are kept for five years.“ und „Enterprise agreements can extend zero retention to the usage metadata too.“ Preisseite: „the zero-retention routes for OpenAI models on Azure (azure-zdr) and Gemini on Google Vertex (vertexai-zdr) need a signed Enterprise agreement.“ Dieselbe Gateway-Seite listet selbst „Usage for billing kept“ und sagt oben nur „zero data retention on most EU routes“.
- **Was es nicht heißt:** Inhalte speichert Opper ohne Tracing tatsächlich nicht; Metadaten zur Abrechnung sind üblich. Der Widerspruch ist das Wort: „zero“ und „every plan“ gegen fünf Jahre Metadaten und Enterprise-Pflicht bei zwei Modellfamilien.
- **Lesart:** „End-to-end“ kann „auf ZDR-Routen an beiden Stellen“ meinen; „every plan“, dass es auf jedem Tarif ZDR-Routen gibt. Darum mittel, nicht hoch.

**Nr. 43 (niedrig bis mittel), Opper, Souverän-Seite „European at every hop“:**
- **Aussage A:** https://opper.ai/sovereign-ai: „European at every hop“, „The gateway, the cloud it runs on and the model provider are all European companies under European law.“, „so the gateway, its storage and your traces stay with European companies under European law.“
- **Aussage B:** trust.opper.ai, Zeile Datadog: „Monitoring of both production environments: infrastructure metrics, traces, access and application logs, request identifiers, IP addresses, and user and organization identifiers. Routine logging is designed to exclude prompts, responses and uploaded files.“ (Datenort Deutschland). Datadog ist laut datadoghq.com/legal/terms/ eine US-Firma („controls the Site from its New York, NY, USA offices“).
- **Ungeklärt:** ob die Instanz evroc.on.opper.ai zu den „both production environments“ gehört. Wenn nicht, entfällt der Kandidat. Eine Fachfrage an Opper würde das in einem Satz klären (nicht gestellt, eilt nicht).

**Unverändert live:** Nr. 22 („No amendments or objection windows“ auf der Compliance-Seite gegen DPA-Vorlauf 30 Tage). Nr. 23/Fall-Entwurf 005 bleibt schwach, die Seite sagt seit 08.10. „EU routes on every plan“. Ohne Widerspruch: Training (Opper selbst nie, je Route im Trust Center), Ort der Plattform (AWS Stockholm + evroc), ISO 27001 weiter nur Anbieterangabe.

## Nachtrag 23.10.2026, ~04:26 UTC: T-Systems, erster breiter Widerspruchs-Scan (Werbeseiten + Doku), Nr. 44 neu (Dauerlauf)

Abruf mit curl, 3 s Abstand, robots.txt erlaubt alles Gelesene, 19 Seiten: t-systems.com (AIFS englisch/deutsch, Fallstudien Nettetal und amber Tech, Pressemitteilung 12.02.2025), t-cloud-public.com (AIFS, Sovereignty, AI in the Classroom), docs.llmhub.t-systems.net (FAQ en/de, Enterprise Trust en/de, Modelle, LLMs en/de, Service Models, Prefix-Caching, Changelog, Start). Rohseiten in `~/allein/tmp/ws2310t/` (nicht im Repo). Beleg `belege/anbieter/t-systems/afs-hosting-werbung-gegen-doku-2026-10-23.txt` (gestempelt).

**Nr. 44 (mittel bis hoch für Kommunen/DSBs), T-Systems, „hosted in T Cloud“ für die ganze Plattform:**
- **Aussage A:** t-systems.com/…/ai-foundation-services: „Our AI solutions are hosted in T Cloud, ensuring compliance with regulations such as GDPR“, im selben Absatz „integrate over 40 AI models“; oben „the only European platform enabling regulated industries […] ensuring full data privacy and control“. t-cloud-public.com/…/ai-foundation-services: „The services are stored and operated on T Cloud Public.“, „can be used by individuals subject to professional secrecy“, „A higher sovereignty in the use of AI can hardly be reached in the public cloud.“ Doku-FAQ, erste Antwort: „over 40 language models […] Operated on the T-Cloud in Germany“.
- **Aussage B:** Modelltabelle /models/llms/: 29 von 39 Zeilen bei Microsoft Azure oder Google Cloud, 10 auf T-Cloud. Enterprise Trust, Kategorie 2: „Forwarded by Telekom directly to the third-party provider“, „customer data may be processed worldwide“. Dieselbe FAQ zwei Antworten weiter: „Closed-source models are forwarded to their upstream provider on Microsoft Azure or Google Cloud“.
- **Was es nicht heißt:** Die Doku ist an den Fachstellen offen und genau (Kategorien, Spalte Cloud je Modell). Wer ein Modell bewusst auswählt, sieht den Ort. Der Widerspruch steht in den Sätzen, die Entscheider zuerst lesen: Plattform-Sätze über „über 40 Modelle“ nennen nur T-Cloud, obwohl drei Viertel der Modellzeilen woanders laufen.
- **Lesart:** „Operated on the T-Cloud“ kann die Plattform (Gateway, Abrechnung) meinen, nicht jedes Modell. Darum mittel bis hoch, nicht hoch. Für die Zielgruppe wichtig: Die Kommune Nettetal nutzt laut Fallstudie GPT, Claude und Gemini über dieselbe Plattform („red zone“).
- **Nebenbefund (klein, kein eigener Fall):** t-cloud-public.com listet als Modelle noch „Meta Llama 3.3, Mistral Small 3 and DeepSeek R“, auf Anfrage „GPT-4o, Claude 3, Gemini 1.5 Pro“. Llama 3.3 ist laut Doku seit 01.09.2026 abgeschaltet. Die Pressemitteilung vom 12.02.2025 („All models and services are operated in Telekom data centers in Germany, Switzerland, and the Netherlands“) ist alt und als Pressemitteilung datiert, darum kein Kandidat.

**Ohne neuen Widerspruch:** Enterprise Trust sagt dasselbe wie im Profil (Kategorie 1 „Not stored“, Kategorie 2 „Per third-party provider’s terms“, „never saved or used to train“); Fall 006 (Cache) unberührt. Die Kategorie-2-Liste nennt heute „OpenAI GPT-5 and GPT-6 families, GPT Image 2, Ada-Text“, „Anthropic Claude (4.6, Opus 4.8, 5 and 5.5 families)“, „Google Gemini 3 family“ und „Mistral Medium 3 — on Google Cloud“ (ob neu gegenüber 09.10.: ungeklärt, kein Wortvergleich gemacht).

## Nachtrag 23.10.2026, ~05:45 UTC: Azure OpenAI, erster Widerspruchs-Scan (Microsoft-Doku), Nr. 45 neu (Dauerlauf)

Gelesen: Datenschutzseite (18.05.2026), Bereitstellungstypen (06.08.2026), Responses-Anleitung (18.08.2026), Stored completions (06.07.2026), Missbrauchsüberwachung, EU Data Boundary, Preisseite. Beleg `belege/anbieter/azure-openai/widerspruchs-scan-2026-10-23.txt`.

**Nr. 45 (niedrig), Azure OpenAI, Umfang der EU-Datenzone:**
- **Aussage A:** Datenschutzseite: „If you create a DataZone deployment in a Foundry resource located in a European Union Member Nation, prompts and responses may be processed in that or any other European Union Member Nation.“
- **Aussage B:** Bereitstellungstypen: „The EU Data Zone follows the Azure EU Data Boundary, which can include European Free Trade Association (EFTA) countries and regions such as Norway and Switzerland in addition to EU member states.“ und „Microsoft can add regions to either data zone without prior notice“.
- **Was es nicht heißt:** Norwegen (EWR) und die Schweiz (Angemessenheitsbeschluss) sind keine unsicheren Drittländer. Der Widerspruch zählt nur für Prüfer, die ihren Kunden vertraglich „nur EU“ zusagen, und wegen „without prior notice“.
- **Kleiner Zusatz:** Preisseite „Data Zone Deployment – Geographic based (EU or US)“, Bereitstellungsseite „(US, EU, or Asia Pacific (APAC))“.

**Neu im Profil, kein Fall:** Responses-Schnittstelle „By default, response data is retained for 30 days.“ (Speicher an, solange store nicht false ist); die Datenschutzseite nennt dafür keine Frist. Nebenbefund: Die Datenschutzseite beschreibt „Stored completions (preview)“ noch als Funktion, laut eigener Seite „retire on October 15, 2026“.

**Ohne Widerspruch:** gespeicherte Daten immer in der Geografie der Ressource (auch Global/DataZone/Batch), Missbrauchs-Speicher ebenso, Prüfer im EWR für EWR-Bereitstellungen, kein Training ohne Zustimmung.

## Nachtrag 23.10.2026, ~06:22 UTC: Google Vertex AI / Gemini Enterprise Agent Platform, erster Widerspruchs-Scan, Nr. 46 neu (Dauerlauf)

Gelesen: Zero-Data-Retention-Seite, Missbrauchsüberwachung (22.10.2026), Data Residency, Produktseite, Sovereign-Cloud-Seite. Alle 23 Profil-Zitate vom 22.10. stehen weiter wörtlich da; die Doku ist nach docs.cloud.google.com umgezogen (alte Adressen leiten weiter). Beleg `belege/anbieter/google-vertex-gemini-api/widerspruchs-scan-2026-10-23.txt`.

**Nr. 46 (niedrig bis mittel), Google, „ZDR-aligned“ bei 30 Tagen Protokoll:**
- **Aussage A:** Missbrauchsüberwachung, Google Frontier Models (derzeit Gemini 4 Argon (Cyber Permissive)): „These logs are stored securely inside the customer's environment for up to 30 days.“ und „these logs adhere to ZDR standards for customers with Cloud Master Agreements“.
- **Aussage B:** Die Zero-Data-Retention-Seite zählt auf, was Kunden für Null-Speicherung selbst abschalten müssen („customers must take additional specific actions within each of these areas“), und nennt diese Protokolle nicht; das Wort „Frontier“ kommt dort nicht vor.
- **Was es nicht heißt:** Google versteckt die 30 Tage nicht, sie stehen auf der Missbrauchs-Seite. Der Punkt ist das Wort: Google nennt 30 Tage Speicherung „ZDR“, weil sie im Kundenprojekt liegt und kein Mensch hinsieht. Wer ZDR als „nichts wird gespeichert“ liest, liegt falsch. Kunden unter Online-AGB bekommen zusätzlich menschliche Prüfung. Gleiches Muster wie Nr. 42 (Opper, ZDR mit Metadaten).

**Neu im Profil, kein Fall:** Der Zwischenspeicher (24 Stunden) liegt nicht nur im Arbeitsspeicher, sondern standardmäßig auch auf Platte („durable caching“, ohne kundeneigene Schlüssel, beim global-Endpunkt in jeder Region). Stand schon in der Kopie vom 22.10., fehlte im Profil.

**Ohne Widerspruch:** Werbeseiten (Produktseite, Sovereign Cloud) machen für Gemini keine Aussage zu Ort, Frist oder Training; „Core customer data … cannot move“ gilt für das eigene Produkt Data Boundary.

## Nachtrag 23.10.2026, ~06:48 UTC: OpenAI API, erster Widerspruchs-Scan, Nr. 47 neu (Dauerlauf)

Gelesen: Leitfaden „Data controls“ (wortgleich mit der Kopie vom 22.10.), Prompt-Caching-Leitfaden, Hintergrund-Modus, Werbeseite openai.com/api (Archivkopie 23.10.2026, direkt HTTP 403). Beleg `belege/anbieter/openai-api/widerspruchs-scan-2026-10-23.txt`.

**Nr. 47 (niedrig bis mittel), OpenAI, „Zero data retention“ mit Zwischenspeicher:**
- **Aussage A:** Werbeseite openai.com/api, „Security and data privacy“: „Zero data retention policy by request“.
- **Aussage B:** Doku, Grenzen bei Chat Completions, Responses und Decisions: „Prompt caching may store encrypted key/value tensors in GPU-local storage as application state. This data is stored on the local GPU machines and is not retained after the 24-hour expiration.“ Für GPT-5.6 und später gibt es nur „30m“ (Standard) und „12h“ als Mindestdauer, kein „in_memory“; die ZDR-Voreinstellung „in_memory“ steht nur bei älteren Modellen. Hintergrund-Modus bei ZDR-Projekten: „Response data is temporarily stored to disk for roughly 10 minutes“.
- **Was es nicht heißt:** OpenAI versteckt das nicht, es steht als Grenze in der Doku, und die Daten sind verschlüsselt und höchstens 24 Stunden da. Der Punkt ist wieder das Wort: „Zero data retention“ heißt bei OpenAI „keine Missbrauchsprotokolle, kein store“, nicht „nichts wird gespeichert“. Ob ZDR-Kunden bei GPT-6 den Zwischenspeicher abschalten können, ist ungeklärt. Gleiches Muster wie Nr. 42 (Opper) und Nr. 46 (Google).

**Neu im Profil, kein Fall:** Zwischenspeicher und Hintergrund-Modus in `zero_data_retention` und `log_frist`; Satz, dass der erweiterte Zwischenspeicher in Regionen ohne Regional processing die Region verlassen kann (Europa hat Regional processing).

**Ohne Widerspruch:** „No training on your data“ (Tabelle überall „No“), „Data residency controls“ nur über den Vertrieb (Doku: „Contact our sales team to see if you're eligible“).

## Nachtrag 23.10.2026, ~07:48 UTC: ChatGPT Enterprise, erster Widerspruchs-Scan, Nr. 48 neu (Dauerlauf)

Gelesen: Werbeseite chatgpt.com/business/enterprise, Sicherheitsseite openai.com/security-and-privacy, Preisseite chatgpt.com/pricing (alle Archivkopien 22.10.2026, direkt HTTP 403), dazu die gesicherten Kopien von Enterprise-Privacy, Services Agreement und Trust-Portal. Beleg `belege/anbieter/openai-chatgpt-enterprise/widerspruchs-scan-2026-10-23.txt`.

**Nr. 48 (niedrig), OpenAI, „We never train on your data“:**
- **Aussage A:** Werbeseite ChatGPT Enterprise, Überschrift: „We never train on your data and your data is secure“.
- **Aussage B:** Satz direkt darunter: „is not used to train our models by default“. Enterprise-Privacy-Seite: „If you have explicitly opted in to share your data with us (for example, through our opt-in feedback mechanisms ) to improve our services, then we may use the shared data to train our models.“ Services Agreement 9.3: Feedback darf OpenAI „without restriction or compensation“ nutzen.
- **Was es nicht heißt:** Ohne Zustimmung trainiert OpenAI nicht, das sagen Vertrag und Datenschutzseite gleich. Der Punkt ist das Wort „never“ gegen „by default“ auf derselben Seite. Ob ein Daumen hoch/runter einzelner Nutzer als Zustimmung des Kunden zählt, ist ungeklärt; das wäre die Frage an OpenAI.

**Kein Fall:** Die Sicherheitsseite überschreibt „ISO 27001, 27017, 27018, and 27701“; laut Trust-Portal ist es ein 27001-Zertifikat, dessen Umsetzung 27017/27018 folgt und um 27701 erweitert ist. Als Anmerkung im Profil.

**Ohne Widerspruch:** „encryption, retention, and compliance controls“ (Admins legen die Frist fest). Preisseite ohne lesbaren Text, nicht ausgewertet.

## Nachtrag 23.10.2026, ~08:17 UTC: Anthropic Claude API, erster Widerspruchs-Scan, Nr. 49 neu (Dauerlauf)

Gelesen: Werbeseite claude.com/platform/api (www.anthropic.com/api leitet dorthin), Managed-Agents-Leitfäden „Self-hosted sandboxes: security“, „Self-hosted sandboxes: memory“, „Memory“, dazu „API and data retention“ (alle direkt, HTTP 200, robots erlaubt; Archiv antwortete 429). Beleg `belege/anbieter/anthropic-api/widerspruchs-scan-2026-10-23.txt`.

**Nr. 49 (mittel), Anthropic, Gedächtnis „on your infrastructure“:**
- **Aussage A:** Werbeseite, Kachel „Memory stores“: „Agents remember across sessions, keeping memory files on your infrastructure.“ Der „Learn more“-Link führt auf den Memory-Leitfaden.
- **Aussage B:** Security-Leitfaden: „Memory stores remain hosted by Anthropic, including their version history.“ Memory-Leitfaden für eigene Sandboxes: „The memory store on Anthropic's side remains the source of truth.“ Versionen bleiben mindestens 30 Tage, die letzten Versionen eines lebenden Eintrags „regardless of age“. Managed Agents insgesamt: ZDR „No“, „transcripts persist until you delete them“, ausdrücklich auch bei „Self-hosted sandboxes“.
- **Was es nicht heißt:** Mit eigener Sandbox liegt während der Sitzung eine Arbeitskopie beim Kunden, und Konversationsinhalte laufen dort durch. Anthropic beschreibt das genau, nur eben in der Doku. Der Punkt ist der Werbesatz: Wer nur die Werbeseite liest, glaubt, das Gedächtnis seiner Agenten liege bei ihm; es liegt in den USA bei Anthropic (Speicherort laut Profil nur „us“). Für EU-Prüfer wichtig, weil darin Kundendaten über Sitzungen hinweg liegen. Ob „your infrastructure“ eine andere Einstellung meint, die wir nicht gefunden haben: ungeklärt; das wäre die Frage an Anthropic.

**Kein Fall:** „privacy of zero data retention“ gegen „flagged … up to 2 years“ (gleiches Wort-Muster wie Nr. 42/46/47, steht schon im Profil). „Residency … regions in … Europe“ ist auf „On your cloud provider“ eingeschränkt, für die direkte API gibt es keine EU-Region; kein Widerspruch, aber leicht misszuverstehen.

**Ohne Widerspruch:** „By default, Anthropic does not use customer data from commercial deployments to train Claude“ passt zu „never used for model training without your express permission“.

## Nachtrag 23.10.2026, ~08:53 UTC: Google Gemini für Workspace, erster Widerspruchs-Scan, Nr. 50 neu (Dauerlauf)

Gelesen: workspace.google.com/solutions/ai (deutsche Fassung), /pricing (englisch), /security (alle direkt, HTTP 200, robots erlaubt; /intl/-Seiten sind per robots gesperrt und wurden nicht verwendet), dazu die gesicherten Kopien vom 22.10. (Privacy Hub, Gemini-App an/aus). Beleg `belege/anbieter/google-gemini-workspace/widerspruchs-scan-2026-10-23.txt`.

**Nr. 50 (mittel), Google, Gemini Notebook außerhalb der Data Regions:**
- **Aussage A:** Preisseite: „Gemini Notebook with expanded access to features“ (ab Business Standard) und „Enterprise data regions“ (Enterprise, „All features mentioned, and:“). Werbeseite: „Mit Ihrem sicheren KI-Recherchepartner können Sie Ihre vertrauenswürdigen Geschäftsdateien in Audio-Zusammenfassungen und visuelle Hilfsmittel umwandeln.“
- **Aussage B:** Privacy Hub: „Gemini Notebook creates a new copy of each file. This new file is stored with the user's Gemini Notebook data, not in their Drive. Your organization's file sharing and data region settings do not apply to data in Gemini Notebook.“
- **Was es nicht heißt:** Google versteckt das nicht, es steht im Privacy Hub. Der Punkt ist, dass beides im selben Paket verkauft wird: Wer Enterprise wegen der Data Regions kauft und Drive-Dateien in Gemini Notebook lädt, hat Kopien außerhalb der gewählten Region und außerhalb der Freigabe-Regeln. Wo diese Kopien liegen, nennt Google nicht (ungeklärt). Ob es einen Admin-Schalter gibt, der Notebook für Data-Regions-Kunden sperrt oder einschränkt, ist ungeklärt; das wäre die Frage an Google.

**Kein eigener Fall (Anmerkung):** „Ihre Daten … werden weder für das Anzeigen-Targeting noch zum Trainieren von Gemini-Modellen verwendet“ steht ohne Einschränkung auf eine Ausgabe; für Workspace-Ausgaben ohne Gemini als Core Service (u. a. Business Base, Essentials Starter, Workspace Individual) gilt laut Hilfe „Their chats may be reviewed by human reviewers and used to improve Google's products“. Die Core-Service-Zusage selbst sagt „not … used for Generative AI model training outside their domain without permission“; was „outside their domain“ ausnimmt, ist ungeklärt.

**Ohne Widerspruch:** „ISO 42001 und SOC 1/2/3“ passt zur ISO-42001-Seite von Google; „Gemini ruft nur relevante Inhalte … ab, auf die die Nutzerin oder der Nutzer Zugriff hat“, nichts Gegenteiliges gefunden.

## Nachtrag 23.10.2026, ~09:12 UTC: Microsoft Copilot (Unternehmensfassung), erster Widerspruchs-Scan, Nr. 51 neu (Dauerlauf)

Gelesen: microsoft.com/en-us/microsoft-365-copilot/enterprise und die drei Vergleichsseiten gegen ChatGPT Enterprise, Claude Enterprise und Gemini Enterprise (alle direkt, HTTP 200, robots erlaubt; die alten Adressen /en-us/microsoft-365/copilot/… lieferten eine Sperrseite und wurden nicht verwendet), dazu die gesicherten Kopien vom 22.10. (Enterprise Data Protection, Websuche, Anthropic-Seite, Flex routing). Beleg `belege/anbieter/microsoft-copilot/widerspruchs-scan-2026-10-23.txt`.

**Nr. 51 (mittel), Microsoft, „all interactions remain within your Microsoft 365 tenant“:**
- **Aussage A:** Vergleichsseiten (wortgleich bei ChatGPT und Gemini, bei Claude ohne „all“): „It doesn’t train on your data, and all interactions remain within your Microsoft 365 tenant“. Über den Wettbewerber: „ChatGPT Enterprise is a separate service outside that boundary“, „Gemini Enterprise connectors … store it outside your Microsoft 365 tenant.“
- **Aussage B:** Enterprise Data Protection: „web search queries … are also a part of Copilot interactions.“ und „The Bing search service operates separately from Microsoft 365 … Microsoft acts as an independent data controller“. Websuche: „The … DPA doesn't apply to the use of generated web search queries … Also, HIPAA compliance and the EU Data Boundary don't apply to generated search queries.“
- **Zusatz:** Anthropic-Modelle mit Datenspeicherung: „data is stored by Anthropic and not subject to your Microsoft Customer Agreement“; ab Werk aus, erst nach Opt-in des Admins. Die Werbung wirbt mit „Model choice“ ohne diesen Hinweis.
- **Was es nicht heißt:** Prompts und Antworten selbst bleiben laut Doku in Microsoft 365. Die Websuche ist ab Werk aus, nach Einschalten durch den Admin aber für Nutzer ab Werk an; die Anfrage ist nur ein paar Wörter, ohne Nutzer- und Tenant-Kennung. Der Punkt ist das Wort „all“: Microsoft nennt die Websuchen selbst Interaktionen und hält dem Wettbewerber das Verlassen des Tenants vor. Ob die Werbung mit „interactions“ nur Prompts und Antworten meint, ist ungeklärt; das wäre die Frage an Microsoft.

**Kein eigener Fall (Anmerkung):** Werbeseite nennt die EU-Datengrenze als Raum „within which to store and process Customer Data“; Flex routing ist für Tenants nach dem 25.03.2026 ab Werk an und erlaubt Verarbeitung außerhalb. Steht offen in der Doku und schon im Profil.

**Ohne Widerspruch:** „not used to train foundation models“ passt zur Doku. „no data duplication“ meint laut Kontext das Arbeiten in den Apps, mehrdeutig, kein Kandidat.

## Nachtrag 23.10.2026, ~09:19 UTC: Amazon Bedrock, erster Widerspruchs-Scan, Nr. 52 neu (Dauerlauf)

Gelesen: aws.amazon.com/bedrock/, /bedrock/security-compliance/, /bedrock/anthropic/, /bedrock/guardrails/ (alle direkt, HTTP 200, robots erlaubt), dazu die gesicherten Kopien vom 23.10. (FAQ, Missbrauchserkennung, Datenaufbewahrung, Cross-Region). Beleg `belege/anbieter/amazon-bedrock/widerspruchs-scan-2026-10-23.txt`.

**Nr. 52 (mittel bis hoch), AWS, „stored at rest in the AWS Region where you are using Amazon Bedrock“:**
- **Aussage A:** FAQ, Frage „Is the content processed by Amazon Bedrock moved outside the AWS Region where I am using Amazon Bedrock?“: „Any customer content processed by Amazon Bedrock is encrypted and stored at rest in the AWS Region where you are using Amazon Bedrock.“
- **Aussage B:** Missbrauchserkennung: Claude Fable 5/5.1 „all traffic will be retained for up to 30 days“, OpenAI-Modelle (außer gpt-oss/Safeguard) markierter Verkehr ebenso; „If cross-region inference is enabled for these models, retained inputs and outputs are stored in destination regions“. Global-Profil: „processed by compute across supported commercial AWS Regions worldwide“.
- **Zusatz:** Startseite „Bedrock never stores or uses your data to train models“; mehrdeutig (Training oder Speichern), darum nur Zusatz.
- **Was es nicht heißt:** AWS nennt die Speicherung offen auf zwei Doku-Seiten; für Fable 5 muss der Kunde aws_review selbst setzen. Der Punkt ist die FAQ-Antwort auf genau die Ortsfrage ohne Ausnahme. Für die Profil-Modelle (Nova Pro, Sonnet 5.5, Mistral Large 3) nennt die Missbrauchsseite keine Speicherung.

**Ohne Widerspruch:** „not shared with model providers“ (Werbung, FAQ) passt zur Missbrauchsseite und zum Altmodus provider_data_share, der heute nichts weitergibt.

## Nachtrag 23.10.2026, ~10:13 UTC: Anthropic Claude Enterprise, erster Widerspruchs-Scan, Nr. 53 neu (Dauerlauf)

Gelesen: claude.com/enterprise (→ /solutions/enterprise) und claude.com/solutions/financial-services (direkt, HTTP 200, robots erlaubt), dazu die gesicherten Kopien vom 22.10. (Speicherdauer Enterprise, Speicherdauer Organisation, Training, Trust Center). Beleg `belege/anbieter/anthropic-claude-enterprise/widerspruchs-scan-2026-10-23.txt`.

**Nr. 53 (mittel), Anthropic, „custom data retention“ für den ganzen Plan:**
- **Aussage A:** Enterprise-Seite, FAQ: „Enterprise is built for organizations with real compliance obligations: […] Data controls — custom data retention, customer-managed encryption keys, and US-only inference.“ Im selben Plan: „Includes Enterprise security and compliance, chat, Claude Code, Cowork, connectors, SSO, SCIM, audit logs, and more.“
- **Aussage B:** Hilfe-Artikel Speicherdauer Enterprise: „Custom retention periods apply to content in chats and projects. They do not apply to Claude Design, Claude Tag, Claude Managed Agents, or any other feature that runs Claude Code in the cloud.“ Dazu: „by default, projects are retained indefinitely, so chats inside projects are not deleted by your chat retention period.“ Feedback: „we retain data associated with that submission for 5 years.“
- **Zusatz:** Finanzseite „Anthropic holds SOC 2 Type II and FedRAMP certification.“; Trust Center: FedRAMP High nur bei Claude for Government, bei Claude Enterprise und Team „N/A“. Für die Firma wahr, für das verkaufte Produkt nicht.
- **Was es nicht heißt:** Anthropic nennt die Ausnahmen offen im Hilfe-Artikel. Der Punkt ist, dass die Werbeseite die Kontrolle für den Plan nennt und Claude Code mitverkauft, während sie für Claude Code in der Cloud nicht gilt. Welche Speicherdauer dort gilt: ungeklärt.

**Ohne Widerspruch:** Training „by default“ (Feedback-Ausnahme steht offen in der Doku, Owner kann sie abschalten). „GDPR compliance“: kein prüfbares Zertifikat, ungeklärt.

## Nachtrag 23.10.2026, ~12:20 UTC: Meta Model API, erster Widerspruchs-Scan, Nr. 54 neu (Dauerlauf)

Gelesen: dev.meta.ai/products/meta-model-api und dev.meta.ai/legal/commitments (direkt, HTTP 200, robots erlaubt), dazu die gesicherten Kopien vom 23.10. (Nutzungsbedingungen, Preise, Modelle, Zero Data Retention). Beleg `belege/anbieter/meta-llama-api/widerspruchs-scan-2026-10-23.txt`.

**Nr. 54 (mittel), Meta, „Not used to improve our products“:**
- **Aussage A:** Werbe- und Modellseite, Tabelle „Models and pricing“: bei jedem Standard-Modell „Not used to improve our products.“ (muse-spark-1.3, 1.2, 1.1), bei den billigen Varianten „Used to improve our products.“
- **Aussage B:** Data Commitments, für Inhalte aller Stufen: „Your Content and Customer Data will be used: […] To improve and maintain the Meta Model API“; Training nur „Discounted Services Content only“. Für Standard zusätzlich „to develop and improve systems that protect the safety and security of Meta's products and services“. Nutzungsbedingungen 4.4: Inhalte werden behalten „for security, safety, abuse, and policy review and improvements“.
- **Zusatz:** Keine Seite nennt eine Speicherfrist ohne ZDR; „You can view and delete your Content through your Account“ sagt nicht, ob nach 4.4 behaltene Kopien mitgelöscht werden. Frist: ungeklärt.
- **Was es nicht heißt:** Bedingungen und Doku versprechen sauber „not used to train Meta Models“; das hält. Der Punkt ist das weitere Wort „improve“ in der Werbung, das die eigenen Zusagen für Standard-Inhalte nicht decken. Ob „improve and maintain“ Inhalte selbst oder nur Nutzungsdaten meint: ungeklärt, das wäre die Frage an Meta.

**Ohne Widerspruch:** Contributor-Stufe (Training, Auswertung ohne Entkopplung) steht offen da. Muse Code: Contributor-Modus ab Werk an, steht offen in der Doku, betrifft das Abo, nicht die Model API.

## Nachtrag 24.10.2026, ~01:00 MESZ (22:59 UTC am 23.10.): Cohere, erster Widerspruchs-Scan, Nr. 55 neu (Dauerlauf)

Gelesen: cohere.com/security, cohere.com/saas-agreement, cohere.com/enterprise-data-commitments (direkt, HTTP 200, robots erlaubt), dazu die gesicherten Kopien vom 24.10. ~00:23 MESZ. Beleg `belege/anbieter/cohere/widerspruchs-scan-2026-10-24.txt`.

**Nr. 55 (mittel bis hoch), Cohere, „your data stays yours“:**
- **Aussage A:** Sicherheitsseite, „Built-in data autonomy“: „Maintain full control over your data with customizable handling and retention settings. Opt out of model training at any time — your data stays yours.“
- **Aussage B:** SaaS-Vertrag (Stand 08.04.2025), „Ownership; Reservation of Rights“: Kunde gibt Cohere ein „IRREVOCABLE, SUBLICENSABLE“ Recht, Kundendaten zu nutzen, um „IMPROVE AND ENHANCE THE SERVICES AND COHERE’S OTHER OFFERINGS […] INCLUDING BY SHARING API DATA AND FINETUNING DATA WITH THIRD PARTIES WHO MAY USE [IT] […] FOR OTHER PURPOSES PERMITTED UNDER THEIR TERMS AND CONDITIONS“; die Dritten dürfen sie „FOR ITS OWN PURPOSES“ nutzen. „API Data“ = alles, was an die API geht. Nach Vertragsende: „no obligation to delete […] any API Data or Finetuning Data submitted […] in accordance with Section 3(a)(iii).“
- **Zusatz:** Datenzusagen: Löschung nach 30 Tagen „unless we need to retain them to comply with […] a customer contract“; der Schalter wirkt nur für Daten „created after you make that change“. Ob der Schalter „Data Controls“ auch die Weitergabe an Dritte nach 3(a)(iii) stoppt, steht nirgends (ungeklärt); der Vertrag erwähnt ihn nicht.
- **Was es nicht heißt:** Cohere schreibt die Rechte offen in den Vertrag, und für Private Deployment und Cloud-Partner („third-party cloud AI/ML platforms“) sagt Cohere, dass es keine Eingaben bekommt; das betrifft nur die SaaS-API. Das DPA (nur gegen Geheimhaltungsvereinbarung) kann 3(a)(iii) einschränken; nicht eingesehen. Der Punkt ist: Die Werbung verspricht „your data stays yours“ mit dem Training-Schalter, der veröffentlichte Vertrag erlaubt Weitergabe an Dritte zu deren Zwecken ohne Löschpflicht. Das wäre die Frage an Cohere: Gilt 3(a)(iii) noch, wenn der Schalter aus ist?

**Ohne Widerspruch:** „ISO 27001 and ISO 42001“, „SOC 2 Type II“ nur auf Anfrage im Trust Center, nicht prüfbar (ungeklärt, kein Widerspruch). Hosting „US-Central“ steht offen im Trust Center und im Profil.

## Nachtrag 24.10.2026, ~01:15 MESZ (23:14 UTC am 23.10.): DeepSeek API, erster Widerspruchs-Scan, Nr. 56 neu (Dauerlauf)

Gelesen: Open-Platform-Bedingungen (gültig ab 29.04.2026), Nutzungsbedingungen (Stand 27.03.2026), Datenschutzerklärung (Stand 10.02.2026), Zusammenfassung der Trainingsdaten V4.1 Flash (je direkt von cdn.deepseek.com, HTTP 200, keine robots.txt), dazu die gesicherten Kopien vom 23.10. ~01:16 MESZ. Beleg `belege/anbieter/deepseek-api/widerspruchs-scan-2026-10-24.txt`.

**Nr. 56 (mittel), DeepSeek API, „you are the controller“ gegen eigenes Training mit den Eingaben:**
- **Aussage A:** Open-Platform-Bedingungen 3.3 und 5.5: Der Entwickler braucht eine Grundlage für die „delegation of personal information processing to us“ und ist „the controller of personal information processing activities in that scenario“; die Datenschutzerklärung erklärt sich für Daten von Endnutzern nachgelagerter Anwendungen für nicht zuständig („not covered by this privacy policy“).
- **Aussage B:** Die Open-Platform-Bedingungen gelten nur als „Specific Agreement to the "DeepSeek Terms of Use"“ und sagen zum Training nichts. Damit gilt Nutzungsbedingungen 4.3 auch für die API: „we may, to a minimal extent, use Inputs and Outputs to provide, maintain, operate, develop or improve the Services or the underlying technologies“. Widerspruch nur über den Schalter „Improve the model for everyone“. Die Zusammenfassung V4.1 kreuzt bei Nutzereingaben fürs Training „☒Yes“ an und verweist fürs Abmelden auf die Datenschutzerklärung, die für die Endnutzer-Daten gerade nicht gilt.
- **Zusatz:** Die Bedingung „strict de-identification“ steht in 4.3 und in der Zusammenfassung, nicht im Trainings-Zweck der Datenschutzerklärung.
- **Was es nicht heißt:** DeepSeek nennt sich nirgends ausdrücklich Auftragsverarbeiter, und „delegation“ ist nicht dasselbe Wort wie Auftragsverarbeitung nach Art. 28 DSGVO. Dass 4.3 für die API gilt, ist unsere Lesart (kein Widerspruch zu den Sonderbedingungen, also kein Vorrang). Ob API-Konten den Schalter haben und was der Rahmenvertrag hinter der Anmeldung regelt: ungeklärt, nicht eingesehen. Der Punkt ist: Der Entwickler soll als Verantwortlicher seinen Endnutzern alles offenlegen, aber DeepSeek darf deren Eingaben für eigene Modelle nutzen, und der Weg zum Abschalten ist für die API nirgends beschrieben. Das wäre die Frage an DeepSeek: Gilt 4.3 für API-Eingaben, und wie schaltet ein API-Konto das ab?

**Ohne Widerspruch:** Speicherung in der VR China steht offen in der Datenschutzerklärung und im Profil. Kein AVV veröffentlicht, steht offen im Profil.

## Nachtrag 24.10.2026, ~03:20 MESZ: Scaleway Generative APIs, erster Widerspruchs-Scan bei einem EU-Anbieter, Nr. 57 neu (Dauerlauf)

Gelesen: Produktseite Generative APIs, Datenschutz-Doku Generative APIs („Reviewed on October 03, 2025“), Specific Conditions AI Services (Version 07/04/2026), je direkt am 24.10. 03:14 MESZ (HTTP 200), dazu die Kopien vom 22.10. Beleg `belege/anbieter/scaleway/widerspruchs-scan-2026-10-24.txt`.

**Nr. 57 (niedrig bis mittel), Scaleway, Werbeseite ohne die Ausnahme, die Doku und Vertrag nennen:**
- **Aussage A:** Die Produktseite sagt ohne Einschränkung: „We do not collect, read, reuse, or analyse the content of your inputs, prompts or outputs generated by the APIs.“ Darüber steht „your data remains yours, and only in Europe“.
- **Aussage B:** Die Doku wiederholt denselben Satz, hängt aber an: „The only exception being …“ (Fehler wie HTTP 500, Missbrauch); dann „may store temporarily and access the full content of HTTP requests“, „up to two weeks“. Der Vertrag sagt „does not retain any requests or generated Content after processing“, erlaubt im selben Abschnitt aber „may temporarily retain the content of the HTTP request“ (ohne Höchstdauer) und Batch-Eingaben 24 Stunden.
- **Zusatz:** Die Doku nennt „a Zero Data Retention Policy“ als Standard und im selben Abschnitt die zwei Wochen. Ein Zwischenspeicher („KV values“) läuft immer mit, „cannot be disabled“, Dauer ungenannt.
- **Was es nicht heißt:** Die Ausnahme ist eng (laut Doku etwa 1 von einer Million Anfragen) und steht offen in Doku und Vertrag; die Produktseite verlinkt die Doku. Kein Hinweis, dass Scaleway mehr speichert, als die Doku sagt. Der Punkt ist nur: Wer allein die Werbeseite liest, erfährt nicht, dass ganze Anfragen bis zu zwei Wochen gelesen werden dürfen, und der Vertrag nennt keine Frist. Das wäre die Frage an Scaleway: Gilt die Zwei-Wochen-Grenze vertraglich, und erfährt der Kunde, wenn seine Anfragen gespeichert wurden?

**Ohne Widerspruch:** Standort Paris steht gleich auf Produktseite („Paris only. This may change in the future.“), in der Doku und im Profil. „Not used for training“ steht gleich in Doku und Vertrag. Die Nutzungsdaten, die die Doku „to … improve our service“ sammelt, sind ohne Inhalt der Anfragen; ob sie unter das Vertragswort „Client data … is not used to improve the Service“ fallen, ist Auslegung, darum kein Widerspruch.

## Nachtrag 24.10.2026, ~05:00 MESZ: Mistral AI, erster Widerspruchs-Scan, Nr. 58 neu (Dauerlauf)

Gelesen: Ankündigung Mistral Large 4, Modellseite Large 4 in der Doku, Werbeseiten Sovereign AI und La Plateforme, Commercial Terms of Service (Effective September 25, 2026), DPA (Effective July 27, 2026), je direkt am 24.10. ~04:56 MESZ (HTTP 200). Beleg `belege/anbieter/mistral/widerspruchs-scan-2026-10-24.txt`.

**Nr. 58 (mittel), Mistral, Vorschau-Modell trainiert mit Kundendaten, Werbung schweigt, und die beiden Verträge sagen für Kunden mit Opt-out Verschiedenes:**
- **Aussage A:** Die Ankündigung vom 06.10. lädt ein: „You can try the preview API today on Mistral Studio“, und wirbt mit „a European deployment that Mistral operates end-to-end … under European law“. Die Werbeseite Sovereign AI: „You control where your data goes and who can use it.“ La Plateforme: „full ownership of your data“.
- **Aussage B:** Commercial Terms 4.2(d) und 4.3: Bei „Labs or Preview Models“ darf Mistral Kundendaten und Ausgaben zum Training nutzen, mit Lizenz „perpetual, irrevocable“; „the opt-out preferences you selected … (including through zero data retention) does not apply“. „If you do not want your data or outputs used for training, do not use Labs or Preview Models.“ Mistral Large 4 ist laut Modellseite „Public Preview“.
- **Widerspruch im Vertrag selbst:** Der DPA 2.3 erlaubt Training mit personenbezogenen Daten nur „unless Customer is or has opted-out of training“, ohne Ausnahme für Vorschau-Modelle, und 11.2 sagt, der DPA geht bei Widerspruch vor. Für personenbezogene Daten in Vorschau-Anfragen sagt also ein Vertragsteil „wird trainiert, auch mit Opt-out“, der andere, vorrangige „nicht, wenn Opt-out“. Welche Lesart Mistral anwendet: ungeklärt.
- **Was es nicht heißt:** Die Vorschau-Regel steht offen in den Terms, in klarer Sprache. Kein Hinweis, dass Mistral außerhalb der Vorschau gegen ein Opt-out trainiert. Ob die Konsole beim Wählen des Modells warnt, ist nicht geprüft (braucht Login). Der Punkt ist: Ankündigung und Modellseite erwähnen das Training nicht, und wer mit Zero Data Retention arbeitet, verliert sie beim Vorschau-Modell, ohne dass es dort steht. Frage an Mistral wäre: Gilt DPA 2.3 auch für Vorschau-Modelle, und zeigt die Konsole einen Hinweis?

**Ohne Widerspruch:** Standort EU für die Vorschau (Ankündigung „served on that same infrastructure“ in Europa) passt zum Profil. Feedback per Daumen trainiert immer (DPA 2.3), steht offen da und ist im Profil schon vermerkt.

## Nachtrag 24.10.2026, ~05:40 MESZ: IONOS CLOUD AI Model Hub, erster Widerspruchs-Scan, Nr. 59 neu (Dauerlauf)

Gelesen: Produktseite cloud.ionos.de/managed/ai-model-hub und Doku „Data Handling“ (je direkt am 24.10. ~05:30 MESZ, HTTP 200), Nutzungsbedingungen für KI-Dienste und Enterprise-Datenschutzpaket (Version 7.4) als Archivkopien vom 24.09.2026, weil robots.txt von cloud.ionos.de „/terms-“ sperrt. Beleg `belege/anbieter/ionos/widerspruchs-scan-2026-10-24.txt`.

**Nr. 59 (niedrig bis mittel), IONOS, Produktseite wirbt für API-Einbindung und Kunden-Chatbots, die KI-Nutzungsbedingungen nennen genau das „missbräuchlich“, wenn die Leistungsbeschreibung es nicht ausdrücklich vorsieht:**
- **Aussage A:** Produktseite: „Integrieren Sie KI über eine OpenAI-kompatible API in bestehende Systeme und Frameworks.“ und „chatbot-gestützte Kundenanfragen“.
- **Aussage B:** Nutzungsbedingungen 1.1 gelten ausdrücklich auch für den API-Zugang (PaaS). 2.5: „für die interaktive Nutzung durch eine natürliche Person bestimmt, soweit in der Leistungsbeschreibung nicht ausdrücklich anders vorgesehen ist“. 2.6: Missbrauch sind u. a. „automatisierte oder repetitive Abfragen“, „skript-, makro- oder softwaregesteuerte Nutzung“ und „Überlassung an Dritte“. Folge nach 2.7: Drosselung, Wechsel auf ein schwächeres Modell, Sperre.
- **Was es nicht heißt:** Der Text ist erkennbar für einen Chat-Dienst geschrieben (Tastatur, Arbeitstag). Eine Leistungsbeschreibung für den AI Model Hub, die die API-Nutzung „ausdrücklich“ vorsieht, war nicht zu finden; sie kann existieren. Kein Hinweis, dass IONOS API-Kunden je so behandelt hat. Frage an IONOS wäre: Gelten 2.5/2.6 für den AI Model Hub, und wo steht die Leistungsbeschreibung?

**Zusatz, kein harter Widerspruch:** Doku „never logged and is never accessed by IONOS CLOUD personnel“; Nutzungsbedingungen 2.3 erlauben die Verwendung der Ein- und Ausgaben „zur Gewährleistung der technischen Sicherheit und Fehlerbehebung“. Datenschutzpaket 4.3 lässt Drittstaaten zu, „sofern … erforderlich“, die Doku sagt „Germany … nowhere else“. Doku „No third-party sub-processors“, Unterauftragnehmer-Anlage hinter einem Link, nicht aufgelöst.

**Ohne Widerspruch:** Kein Training mit Kundendaten (Produktseite, Doku und Nutzungsbedingungen 2.3 gleich). Preise auf der Produktseite gleich dem Profil (Stand 23.10.).

## Nachtrag 24.10.2026, ~06:30 MESZ: Black Forest Labs (FLUX API), erster Widerspruchs-Scan, Nr. 60 neu (Dauerlauf)

Gelesen: bfl.ai/enterprise, EU API Service Terms (Last Revised on August 26, 2026), Privacy Policy (Last Revised on August 1, 2026) und FLUX API Integration Guide (je direkt am 24.10. ~06:23 MESZ, HTTP 200, robots erlaubt). Beleg `belege/anbieter/black-forest-labs/widerspruchs-scan-2026-10-24.txt`.

**Nr. 60 (mittel), Black Forest Labs, Enterprise-Seite verspricht „Zero data retention“ für die Managed API, die EU API Service Terms geben BFL eine dauerhafte, unwiderrufliche Lizenz an Ein- und Ausgaben, ausdrücklich auch zum Training:**
- **Aussage A:** Enterprise-Seite, Kachel „Managed API“: „Zero data retention and auto-scaling infrastructure.“ Enterprise-Verträge stehen dort als eigene Zeile („available from 200K generations/month“), ZDR also nicht erkennbar an sie gebunden.
- **Aussage B:** EU API Service Terms 2b: „perpetual, irrevocable, worldwide, non-exclusive, and fully sublicensable right and license to use, … publicly perform, and publicly display Developer's Input and Output“ und „the Company may use Inputs and Outputs to train and improve its artificial intelligence models“. Laut Einleitung gelten die Terms auch in Enterprise-Verträgen, wenn das Order Form sie nennt.
- **Was es nicht heißt:** Ein Order Form oder DPA ist nicht öffentlich („available on request“); dort kann ZDR geregelt sein. Ob die Standard-API ohne Enterprise-Vertrag speichert, ist ungeklärt. Frage an BFL wäre: Gilt „Zero data retention“ für jede Nutzung der Managed API, und schließt sie Ziffer 2b aus?

**Zusatz, kein harter Widerspruch:** Enterprise-Seite „your data remains private“, 2b erlaubt „publicly display“. Privacy Policy bietet einen „Training Opt Out“ per Mail, 2b nennt die Lizenz „irrevocable“; welche Regel für EU-API-Kunden gilt, ungeklärt. Integration Guide: api.eu.bfl.ai „Multi-cluster routing limited to EU regions“, aber nur als „regional preferences“; Privacy Policy lässt Übermittlung außerhalb des EWR zu.

**Ohne Widerspruch:** Moderation vor und nach dem Modell (Profil, Beleg 18.10.). Preise nicht geprüft (Profil Stand 23.10.).

## Nachtrag 24.10.2026, 08:31 MESZ (Systemuhr): Infomaniak AI Services, erster Widerspruchs-Scan, Nr. 61 neu (Dauerlauf)

Gelesen: Produktseite, Modellseite und Preisseite (mit FAQ) unter infomaniak.com/en/hosting/ai-services, LLM API Special Conditions („Review of 07/10/2025“), DPA-PDF und Privacy Policy (je direkt am 24.10. ~08:25 MESZ, HTTP 200, robots erlaubt). Beleg `belege/anbieter/infomaniak/widerspruchs-scan-2026-10-24.txt`. Damit hat jeder der 33 Anbieter mindestens einen Widerspruchs-Scan.

**Nr. 61 (mittel), Infomaniak, die LLM-Bedingungen versprechen 99,9 % Verfügbarkeit, nehmen Beta-Modelle aber ganz davon aus; 4 der 7 Sprachmodelle sind Beta, darunter die beiden als stärkste beworbenen:**
- **Aussage A:** LLM-Bedingungen Art. 5: „Infomaniak commits … to maintaining a 99.9% service availability level.“
- **Aussage B:** Gleicher Artikel: Beta-Modelle „are an exception to the above rules. They may be withdrawn at any time without notice and may also be temporarily unavailable … shall not give rise to any liability or compensation“. Beta am 24.10.: Kimi-K2.6 („The most powerful for vibe coding“), Qwen3.5-397B („The most powerful“), Qwen3.8-27B („The best performance-to-cost ratio“), Apertus-v1.5-70B. Ohne Beta: Mistral-Small-4, gemma-4-31B, Ministral-3-14B.
- **Was es nicht heißt:** Kein Rechtsbruch; die Ausnahme steht offen im Vertrag. Die Produktseite nennt keine Verfügbarkeitszahl. Wie die 99,9 % gemessen und ob sie vergütet werden, steht nirgends. Frage an Infomaniak wäre: Für welche Modelle gilt die 99,9-%-Zusage heute, und gibt es bei Unterschreitung eine Gutschrift?

**Zusatz, kein Vertragsthema:** FAQ auf Produkt- und Preisseite: Bildfunktionen „currently being analysed“, nennt Mixtral und SDXL-Lightning; dieselbe Preisseite verkauft Flux schnell und Photomaker V2, die Modellseite führt Bild-zu-Text-Modelle. Veralteter FAQ-Text.

**Zusatz, kein harter Widerspruch:** Unterauftragnehmer im Kreis: DPA 5.1 verweist auf Dienstbedingungen oder Datenschutzerklärung, die Datenschutzerklärung auf einen DPA-Anhang „Third-Party Subcontractors“, den das öffentliche DPA nicht hat. „No queries are stored“ gegen Art. 6 „Some data is stored temporarily“ plus Betriebsdaten ohne Frist. DPA 13.1 verbietet Übermittlung außerhalb von EU/EWR ohne schriftliche Zustimmung; die Rechenzentren stehen in der Schweiz (außerhalb EU/EWR), ob der Vertragsschluss als Zustimmung gilt, ungeklärt.

**Ohne Widerspruch:** Kein Training mit Kundendaten (Produktseite und Art. 6 gleich). Preise aller 7 Sprachmodelle gleich dem Profil.
