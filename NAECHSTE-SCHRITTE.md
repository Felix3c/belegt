# belegbar.eu — Nächste Schritte

**Stand:** 2026-08-25 (abends)
**Führendes Dokument:** `MESSUNG.md` (Kill-Kriterien) · Ziel-Satz in `~/THESE.md` („Das Ziel ist der Stempel, nicht das Urteil“)
**Phase:** live, 21 Anbieter, 122 URLs. **Fall 2026-001 ist LIVE** (seit 25.08.2026 abends, Commit d70d311).

## Wo wir stehen

Heute ist der erste **Fall** entstanden — die Stelle, an der belegbar.eu vom Katalog zum Notar wird:
ein dokumentierter Widerspruch zwischen Behauptung und Beleg, wörtlich zitiert, mit Zeitstempel,
SHA-256 und Archivkopie, mit Antwortfrist für den Anbieter.

- **Fall 2026-001 — Requesty, Zero Data Retention.** DPA- und Security-Seite sagen ohne Einschränkung
  „request and response bodies are never stored“ / „No data stored“; dieselben Seiten plus Privacy Policy
  sagen: Self-Serve-Logging standardmäßig an, 30 Tage. Datei: `data/faelle/2026-001-requesty-zero-data-retention.json`.
  Rohkopien + Hashes: `belege/faelle/2026-001/`. Wayback-Kopien aller drei Seiten vom 25.08. liegen im JSON.
- **Neuer Seitentyp `/faelle/`** in `build.js` (Index + Fallseite mit ClaimReview-JSON-LD), Hinweisbox im
  Anbieterprofil, Methodik-Abschnitt `#faelle`, Eintrag in `llms.txt` und `daten.json`, CSS. Alles lokal gebaut
  und geprüft; `docs/` ist bewusst **nicht** neu gebaut worden, damit nichts vor der Mail live geht.
- **Sicherung im Build:** Ein Fall ohne `anbieter_informiert` bricht den Build ab. Vorschau nur mit `BUILD_VORSCHAU=1`.
- **Mail-Entwurf:** `outreach/mails/08-requesty-fall-2026-001.md` (englisch, nicht gesendet).

## Erledigt am 25.08.2026 (abends)

1. Mail an sales@requesty.ai gesendet (Gmail-ID 1a03997d2072513d).
2. `anbieter_informiert` = 2026-08-25, Verlaufseintrag ergänzt.
3. Gebaut, committet (`d70d311 feat: Fall 2026-001 veröffentlicht`), gepusht; nach ~150 s live verifiziert:
   `/faelle/requesty-zero-data-retention/` 200, Sitemap 122 URLs.
4. Sitemap in der Search Console neu eingereicht („Sitemap wurde eingereicht“). Hinweis: Eine frühere Einreichung
   vom selben Tag stand auf „Konnte nicht abgerufen werden“ — beim nächsten Login prüfen, ob der Status jetzt grün ist.

## Nächster konkreter Schritt

**Warten und beobachten.** Antwortfrist läuft bis 08.09.2026. Nachfassen am 3./4.9. (Text am Ende von
`outreach/mails/08-requesty-fall-2026-001.md`). Search-Console-Status der Sitemap beim nächsten Login prüfen.

## Danach

- **Nachfassen** 3./4.9. (Halbzeit), Text steht am Ende des Mail-Entwurfs. Am 8.9. ohne Antwort: Status → `bestaetigt`,
  Verlaufseintrag, bauen, pushen. Mit Antwort: wörtlich in `antworten[]`, Status → `beantwortet`, prüfen, dann
  `ausgeraeumt` oder `bestaetigt`.
- **Zweiter Fall in der Pipeline:** GreenPT — ISO-27001-Badge im Footer, eigene Sustainability-Seite sagt, das
  Zertifikat gehöre den genutzten Rechenzentren (Scaleway, Verda). Gleiche Struktur: eigene Dokumente widersprechen sich.
  Erst anfangen, wenn 2026-001 live ist.
- **Nicht als Fall geeignet** (nur „beansprucht“, kein Widerspruch): Nordference ISO/SOC2-Badges, Black Forest Labs ZDR
  (bezieht sich erkennbar auf ein anderes Produkt), DeepL „HIPAA certification“ (Kategorienfehler, kein Widerspruch).

## Termine

- 01.–03.09.: Messung + Outreach-Wiedervorlage (MESSUNG.md), Nachfassen Requesty am 3./4.9.
- 08.09.: Antwortfrist Fall 2026-001.
- ~14.10.: Kill-Kriterien-Check.

## Blocker

Keiner. Alles Weitere hängt am Versand der Mail — der ist bewusst nicht automatisiert.
