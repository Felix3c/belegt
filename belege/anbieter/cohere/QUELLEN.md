# Belegkopien cohere (Abruf 24.10.2026, ~00:22–00:32 MESZ)

Jede Textdatei beginnt mit Quelle und Abrufzeit. Alle Seiten direkt abgerufen, mit 2 s Abstand. robots.txt geprüft am 24.10.2026 vor dem Abruf: cohere.com erlaubt alles außer Werbe- und Studio-Pfaden (`/helloworld`, `/studio*`, `/labormap` u. a.); docs.cohere.com sperrt nur `/api/fern-docs/`; trustcenter.cohere.com hat eine robots.txt ohne Disallow; digital-strategy.ec.europa.eu sperrt Technik-, Such- und Filterpfade, nicht `/en/policies/`; Register siehe register-abgleich-2026-10-24.txt. trust.cohere.com gibt es nicht (keine Antwort); das Trust Center liegt unter trustcenter.cohere.com (Secureframe).

Die cohere.com-Seiten liefern ihren Text im Server-HTML und sind als Text gespeichert (Menü und Fußzeile stehen mit drin, der eigentliche Text folgt nach der Sprachauswahl „Deutsch“). Das Trust Center lädt per Skript; Startseite und Unterauftragnehmer-Liste wurden mit Chrome headless gerendert (`--dump-dom`), der Text stammt aus dem gerenderten DOM. Die Modell-Übersicht der Doku ist die Markdown-Fassung, die die Doku selbst anbietet (`.md` an die Adresse). Die Zusammenfassung der Trainingsdaten ist ein PDF; der Text wurde mit PyMuPDF ausgelesen. Die Ankreuzkästchen sind im PDF Grafiken, keine Zeichen: Sie fehlen im Text. Die Seiten 5, 6 und 7 liegen deshalb als Bild daneben; daran abgelesen (24.10.2026): Seite 5 „Was data from user interactions with the AI model (e.g. user input and prompts) used to train the model?“ → Yes angekreuzt; „Was data collected from user interactions with the provider’s other services or products used to train the model?“ → Yes; Seite 7 „Are you a Signatory to the Code of Practice …?“ → Yes.

Nicht eingesehen: Data Processing Addendum (laut Trust Center nur gegen unterschriebene Geheimhaltungsvereinbarung), Zertifikate und SOC-2-Bericht (nur auf Anfrage im Trust Center), Dashboard (nur nach Anmeldung). Keine Wayback-Kopien nötig. Prüfsummen in SHA256SUMS.

| Datei | Quelle |
|---|---|
| daten-zusagen-2026-10-24.txt | https://cohere.com/enterprise-data-commitments (direkt; Stand „Last Update: December 5, 2025“) |
| datenschutz-2026-10-24.txt | https://cohere.com/privacy (direkt; Stand „Last Updated: May 1, 2026“) |
| gpai-kodex-unterzeichner-2026-10-24.txt | https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai (direkt; Liste der Unterzeichner, Seite „Last update 7 October 2026“) |
| model-vault-2026-10-24.txt | https://cohere.com/solutions/model-vault (direkt) |
| modellkarte-command-a-plus-2026-10-24.txt | https://docs.cohere.com/docs/command-a-plus.md (direkt, Markdown-Fassung der Modellkarte) |
| modelle-2026-10-24.txt | https://docs.cohere.com/docs/models.md (direkt, Markdown-Fassung von /docs/models) |
| newsroom-2026-10-24.txt | https://cohere.com/newsroom (direkt; Gegenprobe: keine Meldung über den Vollzug des Zusammenschlusses) |
| nutzungsbedingungen-2026-10-24.txt | https://cohere.com/terms-of-use (direkt; Stand „Last updated: September 7, 2022“) |
| preise-2026-10-24.txt | https://cohere.com/pricing (direkt) |
| rechtsseite-2026-10-24.txt | https://cohere.com/legal (direkt) |
| register-abgleich-2026-10-24.txt | Auswertung der drei Register-Rohkopien |
| register-cispe-roh-2026-10-24.html | https://www.codeofconduct.cloud/public-register/ (direkt) |
| register-eucoc-roh-2026-10-24.html | https://eucoc.cloud/en/public-register/list-of-adherent-services (direkt) |
| register-trusted-data-processor-roh-2026-10-24.html | https://www.verhaltensregel.eu/verpflichtete-unternehmen/ (direkt) |
| saas-vertrag-2026-10-24.txt | https://cohere.com/saas-agreement (direkt; Stand „Last updated: April 8, 2025“) |
| sicherheit-2026-10-24.txt | https://cohere.com/security (direkt) |
| training-datenschutzhinweis-2026-10-24.txt | https://cohere.com/model-training-privacy-notice (direkt) |
| trainingsdaten-command-a-plus-2026-10-24.pdf | https://docs.cohere.com/_fern-files/cohere.docs.buildwithfern.com/465ad10da2a73b55ca4291e34e665bf843f8f918fd8a0c4e8f0092a8d60f93ef/assets/documents/eu-ai-public-summary_command-a-plus-family_20260910.pdf (direkt; verlinkt aus https://docs.cohere.com/docs/command-a-plus) |
| trainingsdaten-command-a-plus-text-2026-10-24.txt | Text aus dem PDF darüber (PyMuPDF; ohne Ankreuzkästchen, siehe oben) |
| trainingsdaten-command-a-plus-seite5-2026-10-24.png | Seite 5 des PDF als Bild (Abschnitt 2.4 Nutzerdaten) |
| trainingsdaten-command-a-plus-seite6-2026-10-24.png | Seite 6 des PDF als Bild (2.5 synthetische Daten, 2.6 andere Quellen) |
| trainingsdaten-command-a-plus-seite7-2026-10-24.png | Seite 7 des PDF als Bild (3.1 Code of Practice) |
| trust-center-2026-10-24.txt | https://trustcenter.cohere.com/ (direkt, mit Chrome headless gerendert) |
| ueber-uns-2026-10-24.txt | https://cohere.com/about (direkt) |
| widerspruchs-scan-2026-10-24.txt | Auszüge aus https://cohere.com/security, /saas-agreement, /enterprise-data-commitments (direkt, 23.10. ~22:59 UTC) gegen die Kopien sicherheit, saas-vertrag, daten-zusagen (Fall-Kandidat 55) |
| unterauftragnehmer-2026-10-24.txt | https://trustcenter.cohere.com/subprocessors (direkt, mit Chrome headless gerendert; 12 Einträge, kein Stand-Datum auf der Seite) |
| zusammenschluss-aleph-alpha-ankuendigung-2026-10-24.txt | https://cohere.com/blog/cohere-alephalpha-join-forces (direkt; Meldung vom 24.04.2026) |
| zusammenschluss-aleph-alpha-vereinbarung-2026-10-24.txt | https://cohere.com/blog/cohere-and-aleph-alpha-sign-agreement (direkt; Meldung vom 16.09.2026) |

Rechtsraum: Angemessenheitsbeschluss Kanada (Kommissionsseite + Entscheidung 2002/2/EG) in `belege/rechtsraum/adequacy-kanada-2026-10-24/`; DPF-Abgleich (Cohere nicht eingetragen) in `belege/rechtsraum/dpf-cohere-2026-10-24/`.
