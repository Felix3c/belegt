# BV3 (15.10.2026): Gedankenstriche und KI-Ton aus dem sichtbaren Text der Seite.
# Jede Ersetzung muss genau einmal passen, sonst bricht das Skript ab, bevor eine Datei geschrieben wird.
import sys, pathlib

ROOT = pathlib.Path(__file__).resolve().parents[2]

BUILD = [
    ("im Dezember 2025 verlängert — je eine Erneuerung", "im Dezember 2025 verlängert, je einmal"),
    ('"EU-Mitgliedstaat — keine Drittlandübermittlung,', '"EU-Mitgliedstaat. Keine Drittlandübermittlung,'),
    ("der EU-Kommission — Übermittlung ohne", "der EU-Kommission. Übermittlung ohne"),
    ('"Drittland ohne Angemessenheitsbeschluss — Übermittlung nur', '"Drittland ohne Angemessenheitsbeschluss. Übermittlung nur'),
    ("datumDE(p.verified.datum)} — Anbieter hat Nachweise eingereicht, von uns geprüft", "datumDE(p.verified.datum)}: Anbieter hat Nachweise eingereicht, wir haben sie geprüft"),
    ("<p><strong>belegbar.eu</strong> — ${esc(SITE.claim)}</p>", "<p><strong>belegbar.eu</strong>: ${esc(SITE.claim)}</p>"),
    ("`${beispiel.name} — AVV / Auftragsverarbeitung`", "`${beispiel.name}: AVV / Auftragsverarbeitung`"),
    ("AI-Act-Nachweise — <strong>jede Angabe mit Quelle und Prüfdatum</strong>", "AI-Act-Nachweise. <strong>Jede Angabe mit Quelle und Prüfdatum</strong>"),
    ('name: "belegbar.eu — Evidenz-Datenbank europäischer KI-Anbieter"', 'name: "belegbar.eu: Evidenz-Datenbank europäischer KI-Anbieter"'),
    ('titel: "belegbar.eu — Souveräne KI-Anbieter aus Europa', 'titel: "belegbar.eu: Souveräne KI-Anbieter aus Europa'),
    ("AI-Act-Nachweise — jede Angabe belegt oder ehrlich als unbelegt markiert.", "AI-Act-Nachweise. Jede Angabe ist belegt oder als unbelegt markiert."),
    ('"Ja — Kundendaten werden nicht zum Training genutzt"', '"Ja, Kundendaten werden nicht zum Training genutzt"'),
    ('"Nein — Anbieter trainiert mit Kundendaten (oder nur mit Opt-out)"', '"Nein, Anbieter trainiert mit Kundendaten (oder nur mit Opt-out)"'),
    ('"Ja — keine Speicherung der Anfragen"', '"Ja, keine Speicherung der Anfragen"'),
    ('"Nein — Anfragen werden (zeitweise) gespeichert"', '"Nein, Anfragen werden (zeitweise) gespeichert"'),
    ("ja — CLOUD-Act-Relevanz prüfen", "ja, CLOUD-Act-Relevanz prüfen"),
    ('<dd>${esc(li.name)} — ${esc(RAUM_TEXT[li.raum])}', '<dd>${esc(li.name)}: ${esc(RAUM_TEXT[li.raum])}'),
    ('Für Anbieter</a> — Belege, Fälle und Verified kostenl', 'Für Anbieter</a>. Belege, Fälle und Verified sind kostenl'),
    ("name: `${p.name} — Beleg-Check`", "name: `${p.name}: Beleg-Check`"),
    ("titel: `${p.name} — DSGVO, Hosting", "titel: `${p.name}: DSGVO, Hosting"),
    ("Feld für Feld gegenüber — mit Beleg-Status pro Angabe.", "Feld für Feld gegenüber, mit Beleg-Status pro Angabe."),
    ("Preise, Zertifikate — jede Angabe mit Beleg-Status.", "Preise, Zertifikate. Jede Angabe mit Beleg-Status."),
    ("<p>Kompakte Orientierung zu DSGVO, AI Act und Zertifikaten beim Einsatz von KI-Anbietern — geschrieben für Entscheider, nicht für Juristen. Keine Rechtsberatung.</p>",
     "<p>Kurze Ratgeber zu DSGVO, AI Act und Zertifikaten, wenn Sie KI-Anbieter einsetzen. Geschrieben für Entscheider, nicht für Juristen. Keine Rechtsberatung.</p>"),
    ("Keine Rechtsberatung — für verbindliche Auskünfte wenden Sie sich", "Keine Rechtsberatung. Für verbindliche Auskünfte wenden Sie sich"),
    ('esc(a.von) : ""} — wörtlich, ungekürzt', 'esc(a.von) : ""}, wörtlich und ungekürzt'),
    ("Ein Fall wird nie gelöscht — auch ein ausgeräumter Fall bleibt", "Ein Fall wird nie gelöscht. Auch ein ausgeräumter Fall bleibt"),
    ("${SITE.kontakt}</a> — Ihre Antwort erscheint", "${SITE.kontakt}</a>. Ihre Antwort erscheint"),
    ("desselben Anbieters — oder eine Aussage und ihr Primärdokument — nicht zugleich wahr sein können",
     "desselben Anbieters (oder eine Aussage und ihr Primärdokument) nicht zugleich wahr sein können"),
    ('titel: "Fälle — dokumentierte Widersprüche', 'titel: "Fälle: dokumentierte Widersprüche'),
    ("aufgenommen wird, steht es hier — mit Datum,", "aufgenommen wird, steht es hier. Mit Datum,"),
    ('titel: "Änderungsprotokoll — jede Status-', 'titel: "Änderungsprotokoll: jede Status-'),
    ("umgezogene Quellen, neue Fälle — datiert, mit altem", "umgezogene Quellen, neue Fälle. Datiert, mit altem"),
    ("Mitwirken lohnt sich trotzdem — nicht, weil es ein Ranking gäbe, sondern weil jede Angabe",
     "Mitwirken lohnt sich trotzdem. Ein Ranking gibt es nicht, aber jede Angabe"),
    ("innerhalb von Tagen reagiert haben — das ist eine der nützlichsten", "innerhalb von Tagen reagiert haben. Das ist eine der nützlichsten"),
    ("Wir bewerten nicht, wir belegen — und wo wir nichts belegen können, sagen wir das.",
     "Wir bewerten nicht, wir belegen. Wo wir nichts belegen können, sagen wir das."),
    ("Anbieterseite nachgewiesen — Vertragsdokument, Audit-Zertifikat", "Anbieterseite nachgewiesen: Vertragsdokument, Audit-Zertifikat"),
    ("Das ist kein Vorwurf — aber ein Unterschied, den Einkäufer und Datenschutzbeauftragte kennen sollten",
     "Das ist kein Vorwurf. Einkäufer und Datenschutzbeauftragte sollten den Unterschied trotzdem kennen"),
    ("keinen Preis veröffentlicht — Enterprise-Vertrieb, „auf Anfrage“", "keinen Preis veröffentlicht: Enterprise-Vertrieb, „auf Anfrage“"),
    ("nicht Qualität</em> — ein junger Anbieter", "nicht Qualität</em>. Ein junger Anbieter"),
    ("Anbieterangaben ändern sich — wenn Sie einen Fehler finden, schreiben Sie", "Anbieterangaben ändern sich. Wenn Sie einen Fehler finden, schreiben Sie"),
    ("dann weil die Belege es hergeben — nicht, weil er uns darum gebeten", "dann weil die Belege es hergeben. Nicht, weil er uns darum gebeten"),
    ("auf „belegt“ — Vertragsdokument, Liste, Policy.", "auf „belegt“: Vertragsdokument, Liste, Policy."),
    ("Bedingung für die Aufnahme — gelistet wird, wer relevant ist", "Bedingung für die Aufnahme. Gelistet wird, wer relevant ist"),
    ("desselben Anbieters — oder eine Marketing-Aussage und das eigene Primärdokument — nicht zugleich",
     "desselben Anbieters (oder eine Marketing-Aussage und das eigene Primärdokument) nicht zugleich"),
    ("dass ein Beleg fehlt — das ist „beansprucht“.", "dass ein Beleg fehlt. Das ist „beansprucht“."),
    ("die Seite später ändert — und so kann uns niemand vorwerfen", "die Seite später ändert. Und niemand kann uns vorwerfen"),
    ("(Aussage korrigiert oder belegt — der Widerspruch besteht nicht mehr)", "(Aussage korrigiert oder belegt, der Widerspruch besteht nicht mehr)"),
    ("nicht abwendbar durch Sponsoring — und kein Pranger.", "nicht abwendbar durch Sponsoring. Und kein Pranger."),
    ("<h2>Verfallen Belege? Ja — und wir prüfen das</h2>", "<h2>Verfallen Belege? Ja. Deshalb prüfen wir sie</h2>"),
    ("jede hinterlegte Quellen-URL — und zwar nicht nur auf den Statuscode.", "jede hinterlegte Quellen-URL, und zwar nicht nur auf den Statuscode."),
    ("STACKIT keinen AVV hätte — es heißt, dass er sich nicht mehr öffentlich nachweisen lässt", "STACKIT keinen AVV hätte. Er lässt sich nur nicht mehr öffentlich nachweisen"),
    ("C5-Typ-2-Testat zutage — die Angabe steht seitdem", "C5-Typ-2-Testat zutage. Die Angabe steht seitdem"),
    ("ihr eigenes Prüfdatum — sichtbar an der Quelle", "ihr eigenes Prüfdatum, sichtbar an der Quelle"),
    ("Nutzung und Zitat sind frei — mit Namensnennung „belegbar.eu“ und An", "Nutzung und Zitat sind frei, mit Namensnennung „belegbar.eu“ und An"),
    ('titel: "Methodik — was „belegt“ heißt', 'titel: "Methodik: was „belegt“ heißt'),
    ("„DSGVO-konform“ — aber wer das prüfen will, findet Marketing statt Dokumente", "„DSGVO-konform“. Wer das prüfen will, findet aber Marketing statt Dokumente"),
    ("mit Namensnennung — bitte als „belegbar.eu, Stand", "mit Namensnennung, bitte als „belegbar.eu, Stand"),
    ("nicht zugleich wahr sein können — wörtlich zitiert,", "nicht zugleich wahr sein können, wörtlich zitiert,"),
    ("/aenderungen/ — als Atom-Feed:", "/aenderungen/, als Atom-Feed:"),
    ("Verified-Stempel beantragen — kostenlos, ohne Gegenleistung;", "Verified-Stempel beantragen, kostenlos und ohne Gegenleistung;"),
    ("keine belastbare C5-Angabe gefunden — das heißt nicht, dass keine existiert, sondern dass sie nicht öffentlich auffindbar ist.",
     "keine belastbare C5-Angabe gefunden. Vielleicht gibt es eine, aber öffentlich auffindbar ist sie nicht."),
    ("keine Zertifizierung — deshalb unterscheiden wir", "keine Zertifizierung. Deshalb unterscheiden wir"),
    ("Zertifikatsnachweisen — belegt, beansprucht und unbelegt sauber getrennt.", "Zertifikatsnachweisen. Belegt, beansprucht und unbelegt getrennt."),
    ("`Keiner — jedenfalls stellt das niemand fest, der es dürfte.", "`Keiner. Jedenfalls stellt das niemand fest, der es dürfte."),
    ("Bedingungen zugleich — Sitz in einem EU-Mitgliedstaat", "Bedingungen zugleich: Sitz in einem EU-Mitgliedstaat"),
    ("tatsächlich läuft, steht — soweit belegbar — in der Modelltabelle", "tatsächlich läuft, steht (soweit belegbar) in der Modelltabelle"),
    ("US-Eigentümerstruktur — es fehlt aber ein öffentlich", "US-Eigentümerstruktur. Es fehlt aber ein öffentlich"),
    ("lässt sich von außen nicht feststellen — welche Pflichten", "lässt sich von außen nicht feststellen. Welche Pflichten"),
    ("GPAI Code of Practice — weil die EU-Kommission", "GPAI Code of Practice, weil die EU-Kommission"),
    ("ein BSI-C5-Testat nach — für die öffentliche Verwaltung", "ein BSI-C5-Testat nach. Für die öffentliche Verwaltung ist das"),
    ('frage: "Souveräne KI für Kommunen — welche Anbieter kommen infrage?"', 'frage: "Souveräne KI für Kommunen: Welche Anbieter kommen infrage?"'),
    ("heißt: nicht belegt — das kann bedeuten", "heißt: nicht belegt. Das kann bedeuten"),
    ("aus den Daten erzeugt — sie kann nicht von der Datenbank", "aus den Daten erzeugt. Sie kann nicht von der Datenbank"),
    ("aus den Anbieterprofilen berechnet — mit Beleg-Status, Quelle und Prüfdatum.", "aus den Anbieterprofilen berechnet, mit Beleg-Status, Quelle und Prüfdatum."),
    ("CC BY 4.0 nachnutzbar — mit Namensnennung", "CC BY 4.0 nachnutzbar, mit Namensnennung"),
    ("souveräner KI für Kommunen — jede Zahl aus der Datenbank", "souveräner KI für Kommunen. Jede Zahl aus der Datenbank"),
    ("beim Anbieter vorgefunden haben — dieselbe Norm", "beim Anbieter vorgefunden haben. Dieselbe Norm"),
    ("titel: `${e.label} — europäische KI-Anbieter mit Nachweis", "titel: `${e.label}: europäische KI-Anbieter mit Nachweis"),
    ("mit einem Dokument nach — und wer beruft sich nur darauf?", "mit einem Dokument nach, und wer beruft sich nur darauf?"),
    ("keine eigene Seite — sie stehen vollständig", "keine eigene Seite. Sie stehen vollständig"),
    ("bei europäischen KI-Anbietern — belegt, beansprucht oder unbelegt", "bei europäischen KI-Anbietern: belegt, beansprucht oder unbelegt"),
    ("führt ins Leere — ein Tippfehler, oder", "führt ins Leere. Ein Tippfehler, oder"),
    ("`Rechtsraum: ${li.name} — ${RAUM_TEXT[li.raum]}", "`Rechtsraum: ${li.name}: ${RAUM_TEXT[li.raum]}"),
    ("return `# belegbar.eu — vollständiger Datenbestand", "return `# belegbar.eu: vollständiger Datenbestand"),
    ('Ein "unbelegt" heißt nicht, dass die Eigenschaft fehlt — es heißt, dass sie nicht öffentlich',
     'Ein "unbelegt" heißt nicht, dass die Eigenschaft fehlt. Es heißt, dass sie nicht öffentlich'),
    ('text: "Widerspruch besteht nicht mehr — Aussage korrigiert oder belegt"', 'text: "Widerspruch besteht nicht mehr, Aussage korrigiert oder belegt"'),
    ('lizenzhinweis: "CC BY 4.0 — Nutzung frei', 'lizenzhinweis: "CC BY 4.0, Nutzung frei'),
    ("\"Keine belastbare Angabe gefunden — nicht gleichbedeutend mit 'nicht vorhanden'.", "\"Keine belastbare Angabe gefunden. Nicht gleichbedeutend mit 'nicht vorhanden'."),
    ('title="belegbar.eu — Änderungen"', 'title="belegbar.eu: Änderungen"'),
    ('"# belegbar.eu — Evidenz-Datenbank europaeischer KI-Anbieter."', '"# belegbar.eu: Evidenz-Datenbank europaeischer KI-Anbieter."'),
    ('"# Wegweiser fuer Sprachmodelle: /llms.txt — vollstaendiger Bestand: /llms-full.txt"', '"# Wegweiser fuer Sprachmodelle: /llms.txt, vollstaendiger Bestand: /llms-full.txt"'),
]

LIB = {
    "lib/aenderungen.js": [
        ("`${name}: ${e.feld} — Quelle geändert`", "`${name}: ${e.feld}, Quelle geändert`"),
        ("<title>${xml(name)} — Änderungen</title>", "<title>${xml(name)}: Änderungen</title>"),
    ],
    "lib/einordnung.js": [("${datumDE(e.datum)} — wörtlich, mit Namen freigegeben.", "${datumDE(e.datum)}, wörtlich, mit Namen freigegeben.")],
    "lib/pruefpunkte.js": [
        ("fmt(`${c.typ} — ${d.label}`", "fmt(`${c.typ}: ${d.label}`"),
        ("fmt(`${m.name} — ${d.label}`", "fmt(`${m.name}: ${d.label}`"),
    ],
    "lib/zitat.js": [
        ("`„${p.name} — Beleg-Check“", "`„${p.name}: Beleg-Check“"),
        ("`„Fall ${f.id} — ${f.titel}“", "`„Fall ${f.id}: ${f.titel}“"),
    ],
}


def ersetzt(pfad, paare):
    text = open(ROOT / pfad, encoding="utf-8", newline="").read()
    for alt, neu in paare:
        n = text.count(alt)
        if n != 1:
            sys.exit(f"{pfad}: {n} Treffer statt 1 für: {alt[:70]}")
        text = text.replace(alt, neu)
    return text




# Teil 2: Ratgeber (guides/*.html), gleiche Regeln.
GUIDES = {
    "guides/01-ai-act-pflichten.html": [
        ("Art. 4 — was seit", "Art. 4: was seit"),
        ("Deployer) — und trägt deutlich schlankere", "Deployer) und trägt deutlich schlankere"),
        ("Allzweck-KI-Modells — etwa Mistral oder OpenAI — trägt", "Allzweck-KI-Modells (etwa Mistral oder OpenAI) trägt"),
        ("Deployer) — Ihr Unternehmen, wenn es die API einsetzt — trägt", "Deployer), also Ihr Unternehmen, wenn es die API einsetzt, trägt"),
        ("Compliance prüfen können — AVV, Hosting-Standorte", "Compliance prüfen können: AVV, Hosting-Standorte"),
        ("der EU-Kommission — Mistral und Aleph Alpha stehen darauf)", "der EU-Kommission, Mistral und Aleph Alpha stehen darauf)"),
        ("Jahresumsatzes — die für Betreiberpflichten", "Jahresumsatzes. Die für Betreiberpflichten"),
    ],
    "guides/02-dsgvo-ki.html": [
        ("einer KI-API stellt — und wie Sie sie", "einer KI-API stellt, und wie Sie sie"),
        ("durch eine KI-API fließen — und das passiert schneller, als viele denken: ein Kundenname im Prompt genügt — verarbeitet",
         "durch eine KI-API fließen (ein Kundenname im Prompt genügt schon), verarbeitet"),
        ("AVV/DPA als Dokument — Scaleway", "AVV/DPA als Dokument: Scaleway"),
        ("Genehmigung einsetzen — und muss sie benennen", "Genehmigung einsetzen und muss sie benennen"),
        ("braucht es eine Rechtsgrundlage — in der Praxis", "braucht es eine Rechtsgrundlage. In der Praxis sind das"),
        ("ist ein Sonderfall — dazu unser", "ist ein Sonderfall, dazu unser"),
        ("Die Antworten stehen — wenn überhaupt — in Produktdokumentation", "Die Antworten stehen, wenn überhaupt, in Produktdokumentation"),
        ("mit Quelle und Prüfdatum — inklusive der Fälle", "mit Quelle und Prüfdatum, auch die Fälle"),
        ("um Wochen — oder macht sie unmöglich", "um Wochen oder macht sie unmöglich"),
    ],
    "guides/03-cloud-act.html": [
        ("keine Souveränität schafft — und welche", "keine Souveränität schafft, und welche"),
        ("im KI-Vertrieb — und das am häufigsten missverstandene", "im KI-Vertrieb. Es ist auch das am häufigsten missverstandene"),
        ("Daten herauszugeben — <strong>", "Daten herauszugeben, <strong>"),
        ("Tochtergesellschaften — die Reichweite", "Tochtergesellschaften. Die Reichweite"),
        ("zwischen zwei Rechtsordnungen — und Ihr Unternehmen", "zwischen zwei Rechtsordnungen, und Ihr Unternehmen"),
        ("im Betrieb einsetzen — für CRM", "im Betrieb einsetzen, etwa für CRM"),
        ("geografisch in Europa — die CLOUD-Act-Frage", "geografisch in Europa. Die CLOUD-Act-Frage"),
        ("kein Massenüberwachungsinstrument — Anordnungen", "kein Massenüberwachungsinstrument. Anordnungen"),
        ("ein Ausschlusskriterium — Frankreich", "ein Ausschlusskriterium. Frankreich"),
    ],
    "guides/04-zertifikate.html": [
        ("wie sie sich unterscheiden — und woran", "wie sie sich unterscheiden und woran"),
        ("im Cloud-Vertrieb — und das am leichtesten missbrauchte", "im Cloud-Vertrieb und das am leichtesten missbrauchte"),
        ("Informationssicherheits-Managementsystem — Prozesse, nicht Produkte", "Informationssicherheits-Managementsystem, also Prozesse, keine Produkte"),
        ("für Cloud-Sicherheit — ein Testat", "für Cloud-Sicherheit: ein Testat"),
        ("über einen Zeitraum — Typ 2 ist", "über einen Zeitraum. Typ 2 ist"),
        ("Nicht-EU-Recht — also europäische", "Nicht-EU-Recht, also europäische"),
        ("KI-Managementsysteme — das KI-Pendant", "KI-Managementsysteme, das KI-Pendant"),
        ("SEAL-Register</em> — Einstufungen existieren", "SEAL-Register</em>. Einstufungen existieren"),
        ("hält — das ist mehr Vertrauenssignal", "hält. Das ist mehr Vertrauenssignal"),
    ],
    "guides/05-kommunen.html": [
        ("stellen müssen — Vergaberecht", "stellen müssen: Vergaberecht"),
        ("effizienter zu machen — und Anforderungen", "effizienter zu machen, und Anforderungen"),
        ("hoheitlichen Verfahren — Kategorien", "hoheitlichen Verfahren, also Kategorien"),
        ("Ausschlusskriterium — die Details", "Ausschlusskriterium. Die Details"),
        ("Subprozessorenliste — vor der Vergabe", "Subprozessorenliste, vor der Vergabe"),
        ("ist Betreiber — mit Transparenzpflichten", "ist Betreiber, mit Transparenzpflichten"),
        ("begründet sind — die EU-Cloud-Beschaffungen", "begründet sind. Die EU-Cloud-Beschaffungen"),
        ("für interne Zwecke — Textentwürfe, Protokollzusammenfassungen, interne Suche — bevor", "für interne Zwecke (Textentwürfe, Protokollzusammenfassungen, interne Suche), bevor"),
    ],
}

if __name__ == "__main__":
    # Teil 1 lief am 15.10. ohne Schalter; Teil 2 mit --guides.
    auftraege = GUIDES if "--guides" in sys.argv else {"build.js": BUILD, **LIB}
    fertig = {pfad: ersetzt(pfad, paare) for pfad, paare in auftraege.items()}  # erst alles prüfen
    for pfad, text in fertig.items():
        (ROOT / pfad).write_text(text, encoding="utf-8", newline="")
        print(f"{pfad}: {len(auftraege[pfad])} Ersetzungen")
