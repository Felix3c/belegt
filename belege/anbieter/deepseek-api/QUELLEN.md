# Belegkopien deepseek-api (Abruf 23.10.2026, ~01:16–01:35 MESZ)

Jede Textdatei beginnt mit Quelle und Abrufzeit. Alle Seiten direkt abgerufen; robots.txt erlaubt den Abruf (www.deepseek.com `Allow: /`; cdn.deepseek.com und static.deepseek.com haben keine robots.txt, Antwort 404 „NoSuchKey“; api-docs.deepseek.com liefert unter /robots.txt die Startseite der Doku, also keine Sperre; www.datenschutz-berlin.de sperrt nur `/fileadmin/_temp_/` und Typo3-Pfade, www.garanteprivacy.it sperrt PDF-Pfade und `/c/portal/*`, nicht `/home/docweb/`). Ausnahme: app.prighter.com sperrt per robots.txt alle Seiten (`Disallow: /`, geprüft 23.10.2026 nach dem Abruf). Die Datei eu-vertreter-prighter-2026-10-23.txt aus dem früheren Lauf bleibt liegen, wird im Profil aber nicht zitiert; Angaben zum EU-Vertreter stützen sich nur auf die Datenschutzerklärung und die Trainingsdaten-Zusammenfassungen. Die Bedingungen und die Datenschutzerklärung liegen als HTML vor und sind als Text gespeichert. Die API-Doku, das Hilfe-Center und das Prighter-Portal laden ihren Inhalt per Skript; diese Seiten wurden mit Chrome headless gerendert (`--dump-dom`), der Text stammt aus dem gerenderten DOM. Die Zusammenfassungen der Trainingsdaten sind PDFs; der Text wurde mit PyMuPDF ausgelesen, weil nur so die Ankreuzzeichen (☒/☐) erhalten bleiben; die Seiten 4 und 5 liegen zur Gegenprobe als Bild daneben. platform.deepseek.com blockt einfache Abrufe (CloudFront 403) und zeigt Inhalte nur nach Anmeldung; nichts davon ist hier eingesehen. Keine Wayback-Kopien nötig. Prüfsummen in SHA256SUMS.

| Datei | Quelle |
|---|---|
| api-dateien-2026-10-23.txt | https://api-docs.deepseek.com/guides/files_api (direkt, mit Chrome headless gerendert) |
| api-kontext-cache-2026-10-23.txt | https://api-docs.deepseek.com/guides/kv_cache (direkt, mit Chrome headless gerendert) |
| api-ratenlimit-isolation-2026-10-23.txt | https://api-docs.deepseek.com/quick_start/rate_limit (direkt, mit Chrome headless gerendert) |
| behoerde-blnbdi-2025-06-27-mitteilung-2026-10-23.pdf | https://www.datenschutz-berlin.de/fileadmin/user_upload/pdf/pressemitteilungen/2025/20250627-BlnBDI-PM_DeepSeek.pdf (direkt) |
| behoerde-blnbdi-2025-06-27-mitteilung-text-2026-10-23.txt | Text aus dem PDF darüber (pdftotext -layout) |
| behoerde-blnbdi-2025-06-27-seite-2026-10-23.txt | https://www.datenschutz-berlin.de/pressemitteilung/berliner-datenschutzbeauftragte-meldet-ki-app-deepseek-in-deutschland-bei-apple-und-google-als-rechtswidrigen-inhalt/ (direkt) |
| behoerde-blnbdi-jahresbericht-2025-2026-10-23.pdf | https://www.datenschutz-berlin.de/fileadmin/user_upload/pdf/jahresbericht/BlnBDI_Jahresbericht-2025.pdf (direkt) |
| behoerde-blnbdi-jahresbericht-2025-auszug-2026-10-23.txt | Auszug Abschnitt IV.5 (S. 69–70) aus dem PDF darüber |
| behoerde-garante-it-2025-01-30-anordnung-2026-10-23.txt | https://www.garanteprivacy.it/home/docweb/-/docweb-display/docweb/10098477 (direkt; Anordnung vom 30.01.2025, italienisch und englisch) |
| behoerde-garante-it-2025-01-30-mitteilung-2026-10-23.txt | https://www.garanteprivacy.it/home/docweb/-/docweb-display/docweb/10097450 (direkt; Pressemitteilung vom 30.01.2025) |
| datenschutz-2026-10-23.txt | https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html (direkt) |
| eu-vertreter-prighter-2026-10-23.txt | https://app.prighter.com/portal/deepseek und https://app.prighter.com/verify/17162496076 (direkt, mit Chrome gerendert) |
| faq-api-fragenliste-2026-10-23.txt | https://static.deepseek.com/faq/index.html?lang=en#/category/4 (direkt, mit Chrome headless gerendert) |
| faq-kooperationsvertrag-2026-10-23.txt | https://static.deepseek.com/faq/index.html?lang=en#/question/cooperation-agreement (direkt, mit Chrome gerendert) |
| modell-algorithmus-2026-10-23.txt | https://cdn.deepseek.com/policies/en-US/model-algorithm-disclosure.html (direkt) |
| neuigkeiten-v4-1-flash-1017-2026-10-23.txt | https://api-docs.deepseek.com/news/news261017 (direkt, mit Chrome headless gerendert) |
| nutzungsbedingungen-2026-10-23.txt | https://cdn.deepseek.com/policies/en-US/deepseek-terms-of-use.html (direkt) |
| open-platform-bedingungen-2026-10-23.txt | https://cdn.deepseek.com/policies/en-US/deepseek-open-platform-terms-of-service.html (direkt) |
| preise-2026-10-23.txt | https://api-docs.deepseek.com/quick_start/pricing (direkt, mit Chrome headless gerendert) |
| preise-cny-2026-10-23.txt | https://api-docs.deepseek.com/zh-cn/quick_start/pricing (direkt, chinesische Fassung, mit Chrome headless gerendert) |
| trainingsdaten-v4-1-2026-10-23.pdf | https://cdn.deepseek.com/policies/DeepSeek-V4.1-public-summary-of-training-content.pdf (direkt) |
| trainingsdaten-v4-1-text-2026-10-23.txt | Text aus dem PDF darüber (PyMuPDF, mit Ankreuzzeichen) |
| trainingsdaten-v4-1-seite4-2026-10-23.png | Seite 4 des PDF als Bild (Abschnitt 2.4 Nutzerdaten) |
| trainingsdaten-v4-1-seite5-2026-10-23.png | Seite 5 des PDF als Bild (Abschnitt 3.1 Code of Practice) |
| trainingsdaten-v4-2026-10-23.pdf | https://cdn.deepseek.com/policies/DeepSeek-V4-public-summary-of-training-content.pdf (direkt) |
| trainingsdaten-v4-text-2026-10-23.txt | Text aus dem PDF darüber (PyMuPDF, mit Ankreuzzeichen) |
| trainingsdaten-v4-seite4-2026-10-23.png | Seite 4 des PDF als Bild (Abschnitt 2.4 Nutzerdaten) |
| trainingsdaten-v4-seite5-2026-10-23.png | Seite 5 des PDF als Bild (Abschnitt 3.1 Code of Practice) |
| transparenz-2026-10-23.txt | https://www.deepseek.com/en/transparency/ (direkt) |
| widerspruchs-scan-2026-10-24.txt | Auszüge aus den Open-Platform-Bedingungen, Nutzungsbedingungen, der Datenschutzerklärung und der V4.1-Zusammenfassung (direkt, 23.10. ~23:14 UTC) gegen die Kopien vom 23.10. (Fall-Kandidat 56) |

Kein DPF-Abgleich: Für die VR China gibt es weder einen Angemessenheitsbeschluss noch ein Gegenstück zur DPF-Liste.
