# Abgleich: Was ein Prüfer für die Vorauswahl an einer Stelle haben will — und was belegbar.eu schon führt

Stand 23.10.2026 ~14:00 (Dauerlauf). Anlass: Fachantwort eines Datenschutz-Prüfers vom 23.10.2026
(Name und Wortlaut nur in den privaten Notizen). Sein Punkt: Der Nutzen einer solchen Seite liegt in der
**Auswahl** der Dienstleister, nicht in der Prüfung selbst. Heute müssen Unternehmen sechs Angaben
zusammensuchen. Gezählt aus `data/anbieter/*.json` (32 Profile, 138 Modellzeilen), nur lesen.

| Angabe des Prüfers | Feld bei uns | Stand 23.10. |
|---|---|---|
| 1. Preismodelle | `modelle[].preis_*` | 18 von 32 Anbietern mit mindestens einem Preis in EUR; 14 ohne (vor allem US-Anbieter mit USD-Preisen und Firmen ohne öffentliche Preise) |
| 2. Leistungsfähigkeit der Produkte | — (nur Modellnamen) | **fehlt** |
| 3. Länge der Lieferkette | `vertrag.subprozessoren` (nur: gibt es eine Liste, wo) | **fehlt als Zahl**; Liste belegt bei 23, beansprucht bei 4, unbelegt bei 5 |
| 4. Liste der Drittländer in der Lieferkette | — (nur vereinzelt in Anmerkungen, z. B. Mistral) | **fehlt** |
| 5. Link zur AVV | `vertrag.avv.wert` | Link bei 25 von 32 |
| 6. Link zur Beschreibung der Sicherheitsmaßnahmen (TOM) | — | **fehlt** |

**Ergebnis:** Zwei der sechs Angaben führen wir für die meisten Anbieter (AVV-Link, Preise teilweise).
Vier fehlen ganz oder nur als Ja/Nein: Leistungsfähigkeit, Zahl der Unterauftragnehmer, Drittländer,
TOM-Link. Drei davon (3, 4, 6) passen zur Methode (öffentliche Quelle, wörtlich, Datum). Nummer 2
(Leistungsfähigkeit) ist eine Bewertung und passt nicht zum Grundsatz „belegt, nicht beurteilt“; höchstens
als Link auf die Modellkarte des Anbieters.

**Vorschlag (wartet auf Felix, Frage 531):** Drei neue Felder je Anbieter — `vertrag.tom_link`,
`vertrag.subprozessoren_anzahl`, `vertrag.drittlaender` (je Wert, Status, Quelle, Datum wie üblich),
Test zuerst, lokal, Push = Felix. Aufwand grob: 32 Anbieter, je Subprozessor-Liste lesen; JS-gerenderte
Listen (z. B. Mistral) bleiben „ungeklärt“.
