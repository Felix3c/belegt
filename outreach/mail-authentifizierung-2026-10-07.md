# Mail-Authentifizierung hallo@belegbar.eu — Befund 07.10.2026 (Dauerlauf, ALLEIN H2, Frage 159 c)

Anlass: Die Fall-Mail an ai@t-systems.com (05.10., Thread `1a10c27064700ccd`) wird von
mailin.ng.telekom.net abgewiesen: „554 Your access to this mail system has been rejected due to poor
reputation of a domain used in message transfer“ (4.7.1). Zweite Verzögerungsmeldung 07.10. 13:17 UTC.
Gmail gibt Do 08.10. 06:10 PDT auf, das ist 13:10 UTC = 15:10 deutscher Zeit; die alte Angabe
„15:10 UTC“ in ALLEIN.md war falsch. Andere Mails von hallo@ (Opper, EUrouter, Scaleway) kamen an,
Opper hat geantwortet.

## DNS (abgefragt 07.10.2026 ~16:05 über 8.8.8.8 und 1.1.1.1, Nameserver INWX)

| Eintrag | Befund |
|---|---|
| MX | mx1/mx2.improvmx.com (Weiterleitung ImprovMX) |
| SPF `belegbar.eu TXT` | `v=spf1 include:spf.improvmx.com include:_spf.google.com ~all` — vorhanden, korrekt für Gmail |
| DKIM | **keiner gefunden.** Geprüft: google, default, selector1/2, k1, s1, dkim, mail, zoho, protonmail, resend, dkimprovmx1/2, ga1, mx — alle „Non-existent domain“ |
| DMARC `_dmarc.belegbar.eu` | **fehlt** (NXDOMAIN) |
| Spamhaus DBL, SURBL | keine Antwort = nicht gelistet |
| URIBL | Antwort 127.0.0.1 = Abfrage über öffentlichen Resolver gesperrt, **ungeklärt** |

## Wie die Mail rausgeht

Die Verzögerungsmeldungen kommen von mailer-daemon@googlemail.com, Gmail versucht selbst neu: hallo@ ist
in Gmail als „Senden als“ eingerichtet, die Mail verlässt Googles Server. Dann trägt sie nach üblichem
Gmail-Verhalten eine DKIM-Signatur für gmail.com, nicht für belegbar.eu. Die Kopfzeilen der gesendeten
Mail kann der Dauerlauf über die Gmail-Schnittstelle nicht lesen, das ist **nicht nachgeprüft**
(Handgriff 1 unten).

Folge: Für belegbar.eu gibt es keine eigene Signatur und keine DMARC-Regel. Die Domain ist erst etwa
zwei Monate alt. Dass Telekom deshalb ablehnt, ist eine **Vermutung**: Die Meldung nennt keine Domain,
gemeint sein könnten auch belegbar.eu in Absender oder Links. Ausgewertet wurde nur die Meldung, nicht
Telekoms Regeln.

## Handgriffe für Felix (in dieser Reihenfolge)

1. **Kopfzeilen ansehen (2 min):** In Gmail die gesendete Mail an Opper oder T-Systems öffnen → ⋮ →
   „Original anzeigen“. Oben stehen SPF / DKIM / DMARC mit PASS/FAIL. Wichtig ist, bei DKIM `d=` zu lesen
   (gmail.com oder belegbar.eu).
2. **DMARC eintragen (5 min, kostenlos, INWX → DNS belegbar.eu):** neuer TXT-Eintrag, Name `_dmarc`,
   Wert `v=DMARC1; p=none; rua=mailto:hallo@belegbar.eu`. `p=none` weist nichts ab, die Domain zeigt nur,
   dass jemand sie verwaltet, und Felix bekommt Berichte.
3. **DKIM für belegbar.eu:** geht nur, wenn die Mail über einen Dienst läuft, der mit der eigenen Domain
   signiert (z. B. SMTP von ImprovMX im Bezahl-Tarif oder ein Mail-Anbieter mit eigener Domain). Das
   kostet Geld und ist Felix' Entscheidung → Frage 167. Preise hat der Dauerlauf nicht geprüft.
4. Für T-Systems gilt weiter 159 a: Entwurf von felix.h.lind@gmail.com, Felix sendet. gmail.com hat eigenes
   DKIM und DMARC (`v=DMARC1; p=none; sp=quarantine`), das umgeht das Problem.
