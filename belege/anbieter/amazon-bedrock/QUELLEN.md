# Belegkopien amazon-bedrock (Abruf 23.10.2026, 00:57–00:59 MESZ)

Jede Textdatei beginnt mit Quelle und Abrufzeit. Alle Seiten direkt abgerufen; robots.txt erlaubt den Abruf (docs.aws.amazon.com und docs.aws.eu sperren nur alte API-Versionen wie `/AmazonCloudFront/2008-06-30/`; aws.amazon.com sperrt u. a. `/blogs/*/tag/` und einzelne `/compliance/…-confirmation/`-Seiten, keine der hier genutzten; www.aws.eu `Allow: *`; d1.awsstatic.com und b0.p.awsstatic.com liefern keine robots.txt, nur „Access Denied“ bzw. 403; codeofconduct.cloud ohne robots.txt; verhaltensregel.eu sperrt nur `/wp-admin/`). Die AWS-Dokumentation liefert Markdown-Fassungen direkt (Anhang `.md`); die übrigen Seiten sind als Text aus dem HTML gespeichert, Bilder mit ihrem Alternativtext in eckigen Klammern (z. B. „[supported]“). Keine Wayback-Kopien nötig (nichts blockiert). Prüfsummen in SHA256SUMS, Zeitstempel (OpenTimestamps) als `.ots` daneben.

Preise: Die Preisseite enthält nur Platzhalter wie `{priceOf!bedrock/bedrock!<Kennung>!*!1000}`; die Beträge lädt die Seite per Skript aus zwei Preisdateien (`preise-json-*.json`, Abschnitt je Region, z. B. `"EU (Frankfurt)"`). Rohes HTML der Seite liegt als `preise-roh-2026-10-23.html` daneben. Der Faktor `*!1000` steht in der Vorlage (Preis in der Datei je 1.000 Token).

ISO-27001-Zertifikat: Bild-PDF ohne Textebene, von Hand gelesen (Seiten 1–2); darum keine wörtlichen Zitate daraus im Profil.

| Datei | Quelle | Abruf |
|---|---|---|
| aufrufprotokoll-2026-10-23.txt | https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.md (direkt) | 00:58:02 |
| c5-faq-2026-10-23.txt | https://aws.amazon.com/compliance/bsi-c5/ (direkt) | 00:58:09 |
| cross-region-2026-10-23.txt | https://docs.aws.amazon.com/bedrock/latest/userguide/cross-region-inference.md (direkt) | 00:57:59 |
| cross-region-geo-2026-10-23.txt | https://docs.aws.amazon.com/bedrock/latest/userguide/geographic-cross-region-inference.md (direkt) | 00:57:59 |
| cross-region-global-2026-10-23.txt | https://docs.aws.amazon.com/bedrock/latest/userguide/global-cross-region-inference.md (direkt) | 00:58:00 |
| datenaufbewahrung-2026-10-23.txt | https://docs.aws.amazon.com/bedrock/latest/userguide/data-retention.md (direkt) | 00:57:58 |
| datenschutz-2026-10-23.txt | https://docs.aws.amazon.com/bedrock/latest/userguide/data-protection.md (direkt) | 00:57:58 |
| dpa-2026-10-23.pdf | https://d1.awsstatic.com/legal/aws-dpa/aws-dpa.pdf (direkt, verlinkt vom DSGVO-Center) | 00:58:15 |
| dpa-text-2026-10-23.txt | Textauszug aus dpa-2026-10-23.pdf (pdftotext) | 00:58:15 |
| dsgvo-center-2026-10-23.txt | https://aws.amazon.com/compliance/gdpr-center/ (direkt) | 00:58:05 |
| esc-bedrock-2026-10-23.txt | https://docs.aws.eu/esc/latest/userguide/bedrock.html (direkt, AWS European Sovereign Cloud) | 00:58:11 |
| esc-modelle-regionen-2026-10-23.txt | https://docs.aws.eu/bedrock/latest/userguide/models-region-compatibility.html (direkt) | 00:58:11 |
| faq-2026-10-23.txt | https://aws.amazon.com/bedrock/faqs/ (direkt) | 00:58:02 |
| geltungsbereich-c5-2026-10-23.txt | https://aws.amazon.com/compliance/services-in-scope/C5/ (direkt) | 00:58:09 |
| geltungsbereich-cispe-2026-10-23.txt | https://aws.amazon.com/compliance/services-in-scope/CISPE/ (direkt) | 00:58:11 |
| geltungsbereich-soc-2026-10-23.txt | https://aws.amazon.com/compliance/services-in-scope/SOC/ (direkt) | 00:58:10 |
| guardrails-2026-10-23.txt | https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.md (direkt) | 00:58:01 |
| iso-zertifizierte-dienste-2026-10-23.txt | https://aws.amazon.com/compliance/iso-certified/ (direkt) | 00:58:06 |
| iso27001-faq-2026-10-23.txt | https://aws.amazon.com/compliance/iso-27001-faqs/ (direkt) | 00:58:07 |
| iso27001-zertifikat-2026-10-23.pdf | https://d1.awsstatic.com/onedam/marketing-channels/website/aws/en_US/certification/compliance/iso_27001_global_certification.pdf (direkt, verlinkt von der ISO-27001-FAQ) | 00:58:16 |
| iso42001-faq-2026-10-23.txt | https://aws.amazon.com/compliance/iso-42001-faqs/ (direkt) | 00:58:08 |
| kundenvertrag-2026-10-23.txt | https://aws.amazon.com/agreement/ (direkt) | 00:58:06 |
| missbrauchserkennung-2026-10-23.txt | https://docs.aws.amazon.com/bedrock/latest/userguide/abuse-detection.md (direkt) | 00:57:58 |
| modellkarte-claude-sonnet-5-5-2026-10-23.txt | https://docs.aws.amazon.com/bedrock/latest/userguide/model-card-anthropic-claude-sonnet-5-5.md (direkt) | 00:58:00 |
| modellkarte-mistral-large-3-2026-10-23.txt | https://docs.aws.amazon.com/bedrock/latest/userguide/model-card-mistral-ai-mistral-large-3.md (direkt) | 00:58:01 |
| modellkarte-nova-pro-2026-10-23.txt | https://docs.aws.amazon.com/bedrock/latest/userguide/model-card-amazon-nova-pro.md (direkt) | 00:58:00 |
| preise-2026-10-23.txt | https://aws.amazon.com/bedrock/pricing/ (direkt, Text aus dem HTML) | 00:58:03 |
| preise-roh-2026-10-23.html | dieselbe Seite als rohes HTML (mit den Preis-Vorlagen) | 00:58:03 |
| preise-json-bedrock-2026-10-23.json | https://b0.p.awsstatic.com/pricing/2.0/meteredUnitMaps/bedrock/USD/current/bedrock.json (direkt, entpackt; Preisdatei der Seite, u. a. Amazon Nova) | 00:58:15 |
| preise-json-bedrockfoundationmodels-2026-10-23.json | https://b0.p.awsstatic.com/pricing/2.0/meteredUnitMaps/bedrockfoundationmodels/USD/current/bedrockfoundationmodels.json (direkt, entpackt; u. a. Anthropic) | 00:58:14 |
| register-cispe-2026-10-23.txt | https://www.codeofconduct.cloud/public-register/ (direkt, CISPE-Register) | 00:58:13 |
| register-eu-cloud-coc-2026-10-23.txt | https://eucoc.cloud/en/public-register/list-of-adherent-services (direkt) | 00:58:13 |
| register-trusted-data-processor-2026-10-23.txt | https://www.verhaltensregel.eu/verpflichtete-unternehmen/ (direkt) | 00:58:14 |
| service-terms-2026-10-23.txt | https://aws.amazon.com/service-terms/ (direkt, „Last Updated: October 22, 2026“) | 00:58:04 |
| unterauftragnehmer-2026-10-23.txt | https://aws.amazon.com/compliance/sub-processors/ (direkt) | 00:58:06 |
| widerspruchs-scan-2026-10-23.txt | Auszüge aus https://aws.amazon.com/bedrock/ und /bedrock/security-compliance/ (direkt, 09:19 UTC) gegen faq, missbrauchserkennung, datenaufbewahrung, cross-region-global (Fall-Kandidat 52) | 11:19 |

DPF-Prüfung: belege/rechtsraum/dpf-amazon-2026-10-23/ (Amazon.com, Inc., Id 5776, aktiv, erfasst Amazon Web Services, Inc.; Gegenprobe Microsoft).
