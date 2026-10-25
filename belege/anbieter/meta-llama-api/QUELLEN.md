# Belegkopien meta-llama-api (Abruf 23.10.2026, ~01:16–01:36 MESZ)

Jede Datei beginnt mit Quelle und Abrufzeit. Die frühere Adresse der Llama API (llama.developer.meta.com) leitet auf dev.meta.ai um (`weiterleitung-llama-developer-2026-10-23.txt`); das Produkt heißt dort „Meta Model API“. robots.txt erlaubt den Abruf: dev.meta.ai sperrt nur `/*cursor=`, `/*fb_comment_id=`, `/ajax/`, `/tealium/`, `/intern/`, `/internal/`, `/login/`, `/oidc/callback/`, `/*.php`; llama.developer.meta.com hat keine robots.txt-Sperre; forwork.meta.com sperrt die abgerufenen Pfade nicht (robots.txt, Prüfung 23.10.2026), liefert ohne JavaScript aber nur eine Fehlerseite (`*-2026-10-23.txt` mit „Fehler“/„Error“) und wurden mit Chrome headless gerendert (`--dump-dom`, Dateien `*-gerendert-*`). www.facebook.com sperrt alle Abrufe (`User-agent: *` / `Disallow: /`); MGPT, Data Security Terms, Datenschutzrichtlinie, Global Data Transfer Addendum, DPF-Disclosure und „European Region“ stammen deshalb aus der Wayback Machine (Adresse mit `id_` = unveränderte Archivkopie). Die „European Region Terms“ der MGPT (https://www.facebook.com/legal/terms/Meta-Global-Processor-Terms/Europe) hat die Wayback Machine nicht (HTTP 404, 23.10.2026) – nicht eingesehen.

Hinweis: `wayback-datenschutzrichtlinie-2026-10-23.txt` (früherer Lauf) ist unlesbar (komprimierte Antwort beim Speichern beschädigt); lesbare Fassung derselben Archivkopie in `wayback-datenschutzrichtlinie-text-2026-10-23.txt`. `wayback-dpf-disclosure-2026-10-23.txt` enthält die Textfelder aus dem Quelltext der archivierten Seite (rendert per JavaScript). `nutzungsbedingungen-linkziele-2026-10-23.txt` belegt, wohin die Links in den Nutzungsbedingungen zeigen (u. a. Unterauftragnehmerliste). Prüfsummen in SHA256SUMS.

| Datei | Quelle |
|---|---|
| account-warnings-2026-10-23.txt | https://dev.meta.ai/help/policies-and-privacy/account-warnings |
| api-modelle-liste-2026-10-23.txt | https://dev.meta.ai/docs/api-reference/models/list-models |
| authentifizierung-2026-10-23.txt | https://dev.meta.ai/docs/authentication |
| contributor-tier-2026-10-23.txt | https://dev.meta.ai/help/policies-and-privacy/contributor-tier |
| dateien-2026-10-23.txt | https://dev.meta.ai/docs/file-handling |
| datenverarbeitung-hilfe-2026-10-23.txt | https://dev.meta.ai/help/policies-and-privacy/data-handling |
| fehlerbehandlung-2026-10-23.txt | https://dev.meta.ai/docs/error-handling |
| geo-nutzungsrichtlinie-2026-10-23.txt | https://dev.meta.ai/legal/geographic-use-policy |
| geschaeftsdaten-hilfe-2026-10-23.txt | https://dev.meta.ai/help/teams-and-members/update-business-info |
| immutable-guardrails-2026-10-23.txt | https://dev.meta.ai/docs/cookbook/immutable-guardrails |
| konto-daten-download-2026-10-23.txt | https://dev.meta.ai/help/accounts-and-login/download-account-data |
| konto-loeschen-2026-10-23.txt | https://dev.meta.ai/help/accounts-and-login/delete-account |
| llama-guard-4-2026-10-23.txt | https://dev.meta.ai/llama/docs/model-cards-and-prompt-formats/llama-guard-4 |
| llama-protections-2026-10-23.txt | https://dev.meta.ai/llama/llama-protections |
| llama-und-model-api-2026-10-23.txt | https://dev.meta.ai/help/about-model-api/llama-and-model-api |
| managed-accounts-bedingungen-2026-10-23.txt | https://forwork.meta.com/gb/legal/mma-terms-of-service/ |
| managed-accounts-bedingungen-gerendert-2026-10-23.txt | https://forwork.meta.com/gb/legal/mma-terms-of-service/ |
| modell-muse-spark-1-1-2026-10-23.txt | https://dev.meta.ai/models/muse-spark-1-1 |
| modell-muse-spark-1-2-2026-10-23.txt | https://dev.meta.ai/models/muse-spark-1-2 |
| modell-muse-wonder-2026-10-23.txt | https://dev.meta.ai/models/muse-wonder |
| modelle-2026-10-23.txt | https://dev.meta.ai/docs/models |
| modellversionen-2026-10-23.txt | https://dev.meta.ai/help/about-model-api/model-versions |
| nutzungsbedingungen-2026-10-23.txt | https://dev.meta.ai/legal/terms-of-service |
| nutzungsbedingungen-linkziele-2026-10-23.txt | https://dev.meta.ai/legal/terms-of-service (Linkziele aus dem HTML, direkt abgerufen) |
| nutzungsrichtlinie-2026-10-23.txt | https://dev.meta.ai/legal/acceptable-use-policy |
| open-weight-modelle-2026-10-23.txt | https://dev.meta.ai/docs/open-weight-models |
| playground-verlauf-2026-10-23.txt | https://dev.meta.ai/help/playground/chat-history |
| preise-2026-10-23.txt | https://dev.meta.ai/docs/pricing-rate-limits |
| privacy-disclosure-managed-accounts-2026-10-23.txt | https://forwork.meta.com/legal/privacy-disclosure/ |
| privacy-disclosure-managed-accounts-gerendert-2026-10-23.txt | https://forwork.meta.com/legal/privacy-disclosure/ |
| produkt-model-api-2026-10-23.txt | https://dev.meta.ai/products/meta-model-api |
| prompt-caching-2026-10-23.txt | https://dev.meta.ai/docs/prompt-caching |
| rate-limits-hilfe-2026-10-23.txt | https://dev.meta.ai/help/usage-and-limits/rate-limits |
| rechnung-hilfe-2026-10-23.txt | https://dev.meta.ai/help/billing/api-bill |
| rechtszentrum-2026-10-23.txt | https://dev.meta.ai/legal |
| reisen-zugang-2026-10-23.txt | https://dev.meta.ai/help/accounts-and-login/travel-access |
| responses-erstellen-2026-10-23.txt | https://dev.meta.ai/docs/api-reference/responses/create-response |
| responses-protokoll-2026-10-23.txt | https://dev.meta.ai/docs/protocols/responses |
| richtlinien-aenderungen-2026-10-23.txt | https://dev.meta.ai/help/policies-and-privacy/policy-updates |
| richtlinien-und-bedingungen-hilfe-2026-10-23.txt | https://dev.meta.ai/help/policies-and-privacy/policies-and-terms |
| startseite-2026-10-23.txt | https://dev.meta.ai/ |
| suchverankerung-2026-10-23.txt | https://dev.meta.ai/docs/search-grounding |
| uebersicht-2026-10-23.txt | https://dev.meta.ai/docs/overview |
| unterauftragnehmer-2026-10-23.txt | https://forwork.meta.com/legal/mfw-subprocessor-list/ |
| unterauftragnehmer-gerendert-2026-10-23.txt | https://forwork.meta.com/legal/mfw-subprocessor-list/ |
| unterstuetzte-laender-2026-10-23.txt | https://dev.meta.ai/help/accounts-and-login/supported-countries |
| use-policy-weiterleitung-2026-10-23.txt | https://dev.meta.ai/use-policy |
| wayback-data-security-terms-2026-10-23.txt | https://web.archive.org/web/20261002083548id_/https://www.facebook.com/legal/terms/data_security_terms |
| wayback-datenschutzrichtlinie-2026-10-23.txt | https://web.archive.org/web/20261022213200id_/https://www.facebook.com/privacy/policy/ |
| wayback-datenschutzrichtlinie-text-2026-10-23.txt | https://web.archive.org/web/20261022213200id_/https://www.facebook.com/privacy/policy/ (Wayback-Kopie, US-Fassung; facebook.com sperrt Abrufe per robots.txt) |
| wayback-dpf-disclosure-2026-10-23.txt | https://web.archive.org/web/20261013032521id_/https://www.facebook.com/privacy/policies/data_privacy_framework/ (Wayback-Kopie) |
| wayback-europaeische-region-2026-10-23.txt | https://web.archive.org/web/20261010064047id_/https://www.facebook.com/help/681634310058367 |
| wayback-global-data-transfer-addendum-2026-10-23.txt | https://web.archive.org/web/20260812102423id_/https://www.facebook.com/legal/terms/Privacy/GDTA (Wayback-Kopie) |
| wayback-meta-global-processor-terms-2026-10-23.txt | https://web.archive.org/web/20260419222032id_/https://www.facebook.com/legal/terms/Meta-Global-Processor-Terms/ |
| weiterleitung-llama-developer-2026-10-23.txt | https://llama.developer.meta.com/ (Kopfzeilen der Antwort, direkt abgerufen; robots.txt der Domain leer) |
| zero-data-retention-2026-10-23.txt | https://dev.meta.ai/help/policies-and-privacy/zero-data-retention |
| zusagen-2026-10-23.txt | https://dev.meta.ai/legal/commitments |

DPF-Prüfung: belege/rechtsraum/dpf-meta-2026-10-23/ (1 Treffer Meta Platforms, Inc., Id 4452; Gegenprobe Microsoft).
| register-abgleich-2026-10-23.txt | Auswertung der Registerkopien unter belege/anbieter/deepseek-api/ (EU Cloud CoC, CISPE, Trusted Data Processor) |
| widerspruchs-scan-2026-10-23.txt | Auszüge aus https://dev.meta.ai/products/meta-model-api und /legal/commitments (direkt, 23.10. ~12:20 UTC) gegen nutzungsbedingungen, preise, modelle, zero-data-retention (Fall-Kandidat 54) |
