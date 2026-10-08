# Prüfpunkte (Bau-Auftrag Schlademann): Befunde beim Eintragen, 08.10.2026

Dauerlauf, 19:22–19:45, sieben Unteragenten, alle Quellen am 08.10. abgerufen. Downloads unter
`~/allein/tmp/pruefpunkte-0810/g1..g7`. Alte Felder wurden nicht geändert; was unten als „alt falsch/veraltet“
steht, ist NICHT korrigiert und wartet auf Entscheidung (Frage an Felix).

## Zählung (belegt / beansprucht / unbelegt)

| Anbieter | b | ba | u |
|---|---|---|---|
| ovhcloud | 8 | 11 | 21 |
| hetzner | 9 | 0 | 2 |
| aleph-alpha | 2 | 1 | 10 |
| requesty | 5 | 1 | 10 |
| infomaniak | 9 | 3 | 23 |
| exoscale | 5 | 4 | 25 |
| eurouter | 4 | 0 | 16 |
| nebius | 12 | 3 | 15 |
| greenpt | 10 | 3 | 15 |
| nordference | 1 | 0 | 19 |
| regolo | 19 | 0 | 9 |
| deepl | 6 | 4 | 17 |
| lyceum | 1 | 0 | 26 |
| ionos | 15 | 2 | 8 |
| mistral | 18 | 0 | 7 |
| scaleway | 12 | 3 | 10 |
| black-forest-labs | 12 | 1 | 9 |
| gcore | 4 | 0 | 17 |
| t-systems | 14 | 4 | 17 |
| stackit | 16 | 3 | 11 |
| opper-ai | 9 | 0 | 11 |

## Mögliche neue Fälle (zwei eigene Aussagen widersprechen sich)

1. **OVHcloud AI Endpoints:** Produktseite 'ISO 27001, SOC 2 Type II, and HDS (health data) certified service'; die eigenen Listen (docs.ovhcloud.com …/security-certifications und …/hds-certification, lastUpdated 2026-06-02) nennen AI Endpoints nicht.
2. **Nebius:** Trust Center: SII-QCD 'accredited by … (RvA), authorizing it to certify management systems such as ISO 27001'; RvA-Anlage C096 (rva.nl/…/C096-sce.pdf, gültig 03.09.2025–01.09.2028) deckt nur ISO 9001/13485/14001. ANAB nicht prüfbar (Cloudflare).
3. **GreenPT:** Datenschutzerklärung (Stand 14.01.2026) 'exclusively within EU data centres located in France' gegen eigene Subprozessorliste (Finnland/Verda, US-Endpunkt Neuralwatt); greenpt.com/privacy 'no external AI API ever sees your data' gegen Neuralwatt-Doku.
4. **EUrouter:** DPA §5 'exclusively within the European Economic Area' gegen Subprozessor Better Stack mit 'EU-US Data Privacy Framework or Standard Contractual Clauses'; DPA §10 verweist für Fristen auf Annex 1, der keine nennt; Metadaten inkl. IP und end-user identifiers bis 12 Monate.
5. **Nordference:** 'zero data retention' gegen 'Activity Logs & Export'/'Audit Trails' in allen Tarifen, Frist nirgends; Privacy Policy nennt 3NV OÜ 'data controller' auch für Inferenzdaten.
6. **Regolo:** ZDR-Seite 'no server logs capturing your data, no records of any kind' gegen Datenschutzerklärung 'LOGs (including IP address …) … usage data' bis Kontolöschung (stützt Entwurf 007).
7. **Scaleway:** Doku 'improving the Generative API service through anonymized data' gegen Specific Conditions 'is not used to improve the Service'; Batch speichert Inputs 24 h (Ansatz für Fall 004).
8. **Black Forest Labs:** EU API Service Terms §2b 'perpetual, irrevocable … license' an Input/Output zur Produktverbesserung; Privacy Policy: Training für 'content moderation tools'.
9. **Requesty:** veröffentlicht Auswertungen des Kundenverkehrs (requesty.ai/data/llms.txt) neben 'request and response bodies are never stored' (passt zu Fall 2026-001).
11. **STACKIT:** FAQ 'We do not store any customer data from the requests' gegen Leistungsschein 1.3/1.4 'Die E-Mail und Subject ID werden temporär (30 Tage) in den Logs des Services gespeichert'; Zweck ungenannt. Zweckbindung als true eingetragen (Inhalte), Grenzentscheidung, gegenlesen.
12. **Opper:** Traces 1–30 Tage, zugleich 'weekly snapshots for fourteen months' (opper.ai/security-overview); ob Prompt-Inhalte in Backups liegen, sagt keine Seite. Trust Center: ISO 27001 '"status":"in-progress"', angezeigt 'Compliant'.
13. **T-Systems:** SOC-3-Bericht (t-cloud-public.com, 'TS OTC SOC 3 Report.pdf') ist kennwortgeschützt, als öffentlich beworben.
10. **DeepL:** Pro-AGB 3.3.2 'DeepL API Developer reserves the right to perpetually store any Content' — Profil führt ZDR belegt und das Free-Modell ohne diese Ausnahme.

## Alte Angaben im Profil, die nach heutigem Abruf veraltet oder falsch sind (nicht geändert)

- **Mistral:** drei Zertifikate „beansprucht, nicht öffentlich“ — heute frei abrufbar (ISO 27001/27701 Nr. 122598 Prescient Security LLC bis 11.09.2027; SOC 2 Type 2 Prescient Assurance 18.12.2025, nur Security). Akkreditierung IAS (USA, MSCB-267).
- **Black Forest Labs:** „keine Subprozessoren-Liste“ — trust.bfl.ai/subprocessors listet 10 (u. a. Microsoft Azure); ISO-27001-Zertifikat Nr. 269758 öffentlich (British Assessment Bureau/Amtivo, UKAS 8289, bis 30.11.2028) → könnte „belegt“ werden.
- **Gcore:** ISO 27001:2022 im Trust Center beansprucht (Zertifikat auf Anfrage); SOC 2 Type 1 gelistet (Profil: keins auffindbar); PCI-DSS-Zertifikat öffentlich, **gültig nur bis 07.11.2026**.
- **Hetzner:** ISO-Zertifikat ZN-2025-35 nennt nur Hetzner Online GmbH (nicht Finland Oy); BSI-C5:2020-Typ-2-Testat (17.11.2025) fehlt im Profil, gilt nicht für Inference; Zertifikat 18.09.2025 älter als SOCOTEC-DAkkS-Urkunde (ab 14.10.2025).
- **Infomaniak:** Zertifikate auf Infomaniak Group SA, Vertragspartner Infomaniak Network SA; Folgeseite mit Standorten fehlt im PDF; „seit Juni 2018“ gegen 'Certified since 30 April 2021' (SGS UK).
- **Exoscale:** Changelog 2019 'CSA Star 2' gegen heutiges Level 1 (nicht im Register); Datenschutzerklärung 'Our data isn't encrypted at-rest', AWS (USA) für Archivierung.
- **Regolo:** ISO-Zertifizierer ist AXE Register (nicht Afnor/AxDéf), akkreditiert durch DPA Albanien (EA-MLA); CSA STAR nur für Seeweb-Produkte, nicht Regolo.
- **Scaleway:** ISO/HDS-Einträge „belegt“ nur über Marketingseite, Zertifikate hinter Zugangsanfrage → eher „beansprucht“; Batch-Ausnahme besteht weiter (24 h).
- **Nebius:** CSA STAR Level 1 ist Selbstauskunft und nur 'Nebius AI Cloud', nicht Token Factory; Zertifikats-Scope nur Nebius B.V.
- **OVHcloud:** ISO 27001 laut Compliance-Seite vom LNE, LNE ist bei COFRAC (4-0038 Rev. 54) aber nicht für 27001 akkreditiert.
- **DeepL:** Trust Center: Logs 90 Tage, personenbezogene Nicht-Abrechnungsdaten 14 Tage; Logging/Monitoring ggf. außerhalb der gewählten Region; Blog nennt C5-Testat „vom BSI“ (falsch, Prüfer ungenannt).
- **IONOS:** AI Model Hub weder im TÜV- noch im BSI-Grundschutz-Zertifikat, nur Doku behauptet C5-Scope.
- **T-Systems:** ISO 27001/27701 von DEKRA Certification, Inc. (Atlanta, ANAB), nicht DAkkS; Dachzertifikat der Deutsche Telekom AG ohne AI Foundation Services; ISO 27017/27018 ist ein Testat, kein Zertifikat. Leistungsbeschreibung jetzt v1.24 (30.09.2026, byte-gleich mit Beleg Fall 006 vom 06.10.), Profil-Anmerkung ZDR nennt noch v1.23 § 2.3.1 → für Fall 2026-006 prüfen.
- **STACKIT:** ISO-27001-Inhaber STACKIT GmbH & Co. KG, AVV-Vertragspartner Schwarz Digits Cloud GmbH & Co. KG; AI Model Serving nicht im Scope; 27017/27018 nur SoA-Maßnahmen, kein eigenes Zertifikat (Profil: belegt).
