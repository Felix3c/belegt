# Log-Aufbewahrung bei den 21 Anbietern — wie lange, welche Daten, wozu

Stand 04.10.2026, Dauerlauf. Anlass: Lücke aus `outreach/gespraeche/06-schlademann-vorbereitung.md`
(BayLDA-KI-Checkliste S. 11: Protokollierung, Zweckbindung über Training hinaus). Unser Feld
`vertrag.zero_data_retention` sagt nur, *ob* Inhalte gespeichert werden, nicht wie lange und wozu.

Nur Primärquellen der Anbieter, alle abgerufen 04.10.2026. Zitate von drei Recherche-Agenten gesammelt;
**selbst wörtlich gegen die Live-Seite geprüft (curl, 04.10. ~05:40):** Scaleway (3), EUrouter (3),
STACKIT-PDF (1), Hetzner (3), Mistral (2), Nebius (1) — alle 13 wörtlich gefunden. Die übrigen Zitate
vor Veröffentlichung einzeln gegenlesen. Keine Dauer ist geschätzt; fehlt sie, steht „ungeklärt“.

## Übersicht

| Anbieter | Inhalte (Prompts/Outputs) | Metadaten/Logs: Dauer | Zweck über Abrechnung hinaus |
|---|---|---|---|
| Aleph Alpha | „not stored“, „do not log user inputs“ | ungeklärt | – |
| Black Forest Labs | Privacy Policy: „as long as reasonably necessary“ | ungeklärt | **Training, content moderation tools**, Sicherheit |
| DeepL API | nur technisch nötig; im Fehlerfall **bis 72 h** | Zugriffslogs: keine Frist | Sicherheit, Statistik |
| EUrouter | Standard: keine | **12 Monate** Metadaten, **90 Tage** Fehler/Monitoring | **abuse** |
| Exoscale | Kunde verantwortlich | ungeklärt | (misuse detection nur Website-DSE) |
| Gcore | nichts zur Inferenz | ungeklärt (MSA: personenbez. Daten bis 10 J. nach Vertragsende) | fraud, Produktentwicklung |
| GreenPT API | „in-memory only“ | **12 Monate**, dann anonymisiert/gelöscht | analytics, service improvement |
| Hetzner | nicht gespeichert (Zero-Retention-Policy) | **Logfiles 6 Monate**, Abrechnung 8 Jahre | – (Betrieb) |
| Infomaniak | nur für die Bearbeitung | ungeklärt (Konto-Logs allg. 12 Monate) | – |
| IONOS | „never logged“ | ungeklärt („internal retention policy“) | – |
| Lyceum | nicht über technisch Nötiges hinaus | ungeklärt | – |
| Mistral API | **30 Tage** (außer ZDR aktiv) | technische Daten inkl. IP **1 Jahr** | **abuse monitoring, automated moderation** |
| Nebius Token Factory | **standardmäßig gespeichert** (Speculative Decoding), keine Frist | ungeklärt; Metadaten auch bei ZDR | Inferenz-Beschleunigung |
| Nordference | nicht gespeichert | ungeklärt | – |
| Opper | nur mit Tracing, 1–30 Tage | **5 Jahre** Nutzungsmetadaten; Datadog-Logs ungeklärt | vorgeschaltete Modellanbieter: abuse monitoring ohne Frist |
| OVHcloud | nicht gespeichert (außer Batch API) | ungeklärt („required for billing“) | – |
| Regolo | „cancelled at the end of every session“ | Logs (IP, Zeit, Request-Typ) **bis Kontokündigung** | Cybercrime-Aufklärung, Werbe-Mails |
| Requesty | Logging standardmäßig an, **bis 30 Tage** | Telemetrie immer, Dauer ungeklärt | – |
| Scaleway | im Missbrauchs-/Fehlerfall voller Request **bis 2 Wochen** | **6 Monate** aggregiert/anonymisiert | **misuse**, Verbesserung |
| STACKIT | nicht gespeichert | E-Mail + Subject-ID **30 Tage** | – |
| T-Systems LLM Hub | nicht dauerhaft; Prefix-Cache Minuten | ungeklärt | – |

**Zählung:** Eine Frist für Metadaten/Logs nennen 8 von 21 (EUrouter, GreenPT, Hetzner, Mistral, Opper,
Regolo [bis Kündigung], Scaleway, STACKIT). Missbrauch/Moderation als Zweck nennen ausdrücklich 4 selbst
(BFL, EUrouter, Mistral, Scaleway), Opper für vorgeschaltete Anbieter.

## Abgleich mit unseren Profilen (nichts geändert)

- **Hetzner** `zero_data_retention` = `unbelegt` („Keine Angabe zur Speicherung … in der Inference-Dokumentation“).
  Die Datenschutzerklärung Abschnitt 4.5.2 sagt jetzt wörtlich: „Prompts und Outputs : Werden im Rahmen
  unserer Zero-Retention-Policy nicht gespeichert.“ → Profil ist **veraltet**, wäre `belegt` mit Quelle
  https://www.hetzner.com/de/rechtliches/datenschutz. Frage 74.
- **Mistral** `belegt` mit Anmerkung „ZDR nur auf Antrag“: stimmt; ohne ZDR 30 Tage Missbrauchsprüfung —
  die Anmerkung nennt die 30 Tage nicht ausdrücklich, könnte ergänzt werden.
- **Requesty** (Fall 001): „bis zu 30 Tage“ bei aktivem Logging passt zum Fall.
- **Regolo** (Entwurf 007): Logs „Until the cancellation of the Account“ stützt den Entwurf.
- **Scaleway** (Fall 004): bis 2 Wochen voller Inhalt bei Missbrauch = genau der qualifizierte Satz.
- **EUrouter** `belegt`: Startseite „Zero Data Retention“, aber 12 Monate Metadaten — Anmerkung nennt
  Metadaten, aber nicht die Frist.

## Zitate und Quellen

- Aleph Alpha: „We do not log user inputs to the models.“ — https://docs.aleph-alpha.com/phariaai-dev-guide/latest/pharia-llm/intro.html
- BFL: „We retain your information for as long as is reasonably necessary … safety and security reasons“ — https://bfl.ai/legal/privacy-policy; „Zero data retention and auto-scaling infrastructure.“ — https://bfl.ai/enterprise
- DeepL: „DeepL shall be entitled to create and retain access logs for billing, security and statistical purposes.“; „… for a maximum period of 72 hours in case certain error patterns occur“ — https://www.deepl.com/en/pro-license
- EUrouter ✔: „API metadata, such as timestamps, token counts and usage data, for up to 12 months“; „Error and monitoring data is retained for up to 90 days“; „monitor performance, reliability, errors, abuse and security incidents“ — https://www.eurouter.ai/privacy
- Exoscale: „operational telemetry or log data … to the extent such telemetry or logs do not contain Client Data payloads“ — https://www.exoscale.com/terms/
- Gcore: „… up to ten (10) years following the termination thereof“ — https://gcore.com/legal?tab=privacy_policy (MSA; DPA nicht erreicht)
- GreenPT: „API payloads are processed in-memory only and not stored.“; „Retained for billing and analytics, then anonymised or deleted within 12 months“ — https://docs.greenpt.ai/privacy/privacy-policy
- Hetzner ✔: „Logfiles : 6 Monate Abrechnungsdaten : 8 Jahre“; „Prompts und Outputs : Werden im Rahmen unserer Zero-Retention-Policy nicht gespeichert.“; „Die Inhalte Ihrer Anfragen und Antworten sind nicht Bestandteil des Logfiles.“ — https://www.hetzner.com/de/rechtliches/datenschutz (4.5.2)
- Infomaniak: „… except for data necessary for billing and the proper functioning of the service.“ — https://welcome.infomaniak.com/api/components/cgu/latest?id=87&locale=en_GB (Art. 6)
- IONOS: „We record metadata describing each API call: the timestamp, the model invoked and the number of tokens processed.“ — https://docs.ionos.com/cloud/ai/ai-model-hub/governance-and-compliance/data-handling
- Lyceum: „… not stored beyond what is technically necessary for this purpose, nor used for training, improvement or analysis“ — https://lyceum.technology/legal/terms (/legal/dpa liefert 404)
- Mistral ✔: „… then for thirty (30) rolling days to monitor abuse (unless zero data retention is activated)“; „Technical data … for 1 rolling year from the date of connection“ — https://legal.mistral.ai/terms/privacy-policy (Effective 03.09.2026)
- Nebius ✔: „Unless you enable Zero Data Retention, we keep your inputs and outputs to speed up inference using the Speculative Decoding technique“ — https://docs.tokenfactory.nebius.com/legal/legal-quick-guide; „request metadata and observability data are retained and are not covered by Zero Data Retention“ — https://docs.nebius.com/legal/dpa
- Nordference: „Your prompts and model outputs are processed in real-time and are not stored on our systems.“ — https://nordference.ai/privacy
- Opper: „… These records power billing and analytics and are kept for five years.“; „Model providers may retain request and response content for abuse monitoring, depending on the route.“ — https://opper.ai/security-overview
- OVHcloud: „Zero data retention: We keep only the data required for billing purposes.“ — https://www.ovhcloud.com/en/public-cloud/ai-endpoints/
- Regolo: „Until the cancellation of the Account, …“ (Logs inkl. IP) — https://regolo.ai/privacy-policy/
- Requesty: „When logging is enabled, data is stored encrypted within the EU for up to 30 days.“ — https://www.requesty.ai/privacy
- Scaleway ✔: „Aggregated and anonymized data is stored for up to 6 months …“; „… we may store temporarily and access the full content of HTTP requests of this customer“; „Data is stored for up to two weeks …“ — https://www.scaleway.com/en/docs/generative-apis/reference-content/data-privacy/
- STACKIT ✔: „The e-mail and subject ID are stored temporarily (30 days) in the logs of the service“ — Service-Zertifikat v1.3, https://stackit.com/en/asset/download/34346/file/Service_Certificate_STACKIT_AI_Model_Serving.pdf?inLanguage=eng-DE
- T-Systems: „… standardmäßig nicht dauerhaft gespeichert“ — https://docs.llmhub.t-systems.net/files/Leistungsbeschreibung-LLM-Serving-Service.pdf

✔ = am 04.10. selbst wörtlich gegen die Live-Seite geprüft.

## Nutzen

- Für das BvD-Gespräch (Schlademann, Frage 2 „Log-Aufbewahrung“): 8 von 21 nennen eine Frist, 13 nicht.
- Kandidat für ein späteres Profilfeld `vertrag.log_aufbewahrung` {dauer, daten, zweck, quelle} — erst nach
  dem Gespräch entscheiden, ob DSB das abfragen (YAGNI).
