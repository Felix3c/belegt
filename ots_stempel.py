"""belegbar.eu — OpenTimestamps-Stempel für Belegkopien (Frage 500, Felix 22.10.2026).

    python -I ots_stempel.py stamp <datei> [<datei> …]   -> legt <datei>.ots daneben
    python -I ots_stempel.py upgrade <datei.ots>          -> holt die Bitcoin-Bestätigung nach

Macht dasselbe wie `ots stamp` / `ots upgrade` aus opentimestamps-client 0.7.2, nur ohne dessen
Bitcoin-Teil: der lädt unter Windows OpenSSL über ctypes und bricht ab (python-bitcoinlib,
bitcoin/core/key.py, getestet 22.10.2026). Je Datei wird der SHA-256 gebildet, ein Zufallszusatz
angehängt (damit benachbarte Belege nichts über einander verraten), alle zu einem Merkle-Baum
verbunden und nur dessen Wurzel an die Kalender-Server geschickt. Der Inhalt verlässt den Rechner nie.
Die .ots-Dateien prüft jeder mit dem offiziellen Werkzeug (`ots verify`) oder opentimestamps.org.
"""
import os
import sys

from opentimestamps.calendar import DEFAULT_CALENDAR_WHITELIST, RemoteCalendar
from opentimestamps.core.notary import BitcoinBlockHeaderAttestation, PendingAttestation
from opentimestamps.core.op import OpAppend, OpSHA256
from opentimestamps.core.serialize import StreamDeserializationContext, StreamSerializationContext
from opentimestamps.core.timestamp import DetachedTimestampFile, make_merkle_tree

KALENDER = [
    "https://a.pool.opentimestamps.org",
    "https://b.pool.opentimestamps.org",
    "https://a.pool.eternitywall.com",
    "https://ots.btc.catallaxy.com",
]
MINDESTENS = 2  # wie der offizielle Client: ohne zwei Kalender-Antworten kein Stempel
UA = "belegbar.eu-zeitstempel/1.0 (+https://belegbar.eu/)"


def stempeln(pfade):
    stempel = []
    wurzeln = []
    for p in pfade:
        with open(p, "rb") as fd:
            ts = DetachedTimestampFile.from_fd(OpSHA256(), fd)
        mit_zusatz = ts.timestamp.ops.add(OpAppend(os.urandom(16)))
        wurzeln.append(mit_zusatz.ops.add(OpSHA256()))
        stempel.append(ts)
    spitze = make_merkle_tree(wurzeln)

    antworten = 0
    for url in KALENDER:
        try:
            spitze.merge(RemoteCalendar(url, user_agent=UA).submit(spitze.msg, timeout=20))
            antworten += 1
        except Exception as e:  # ein ausgefallener Kalender ist kein Abbruch, solange zwei antworten
            print(f"Kalender {url}: {e}", file=sys.stderr)
    if antworten < MINDESTENS:
        sys.exit(f"nur {antworten} Kalender-Antwort(en), mindestens {MINDESTENS} nötig; nichts geschrieben")

    for p, ts in zip(pfade, stempel):
        with open(p + ".ots", "xb") as out:
            ts.serialize(StreamSerializationContext(out))
    print(f"gestempelt: {len(pfade)} Datei(en), {antworten} Kalender")


def offene_stellen(stamp):
    if stamp.attestations:
        yield stamp
    for sub in stamp.ops.values():
        yield from offene_stellen(sub)


def ist_fertig(stamp):
    return any(isinstance(a, BitcoinBlockHeaderAttestation) for _, a in stamp.all_attestations())


def nachziehen(ots_pfad):
    with open(ots_pfad, "rb") as fd:
        dtf = DetachedTimestampFile.deserialize(StreamDeserializationContext(fd))
    if ist_fertig(dtf.timestamp):
        print(f"{ots_pfad}: schon bestätigt")
        return
    neu = False
    for sub in list(offene_stellen(dtf.timestamp)):
        for a in list(sub.attestations):
            if isinstance(a, PendingAttestation) and a.uri in DEFAULT_CALENDAR_WHITELIST:
                try:
                    sub.merge(RemoteCalendar(a.uri, user_agent=UA).get_timestamp(sub.msg, timeout=20))
                    neu = True
                except Exception as e:  # meist: noch nicht im Block (404)
                    print(f"{ots_pfad}: {a.uri}: {e}", file=sys.stderr)
    if neu:
        tmp = ots_pfad + ".neu"
        with open(tmp, "wb") as out:
            dtf.serialize(StreamSerializationContext(out))
        os.replace(tmp, ots_pfad)
    print(f"{ots_pfad}: {'bestätigt' if ist_fertig(dtf.timestamp) else 'wartet noch auf Bitcoin-Block'}")


if __name__ == "__main__":
    if len(sys.argv) < 3 or sys.argv[1] not in ("stamp", "upgrade"):
        sys.exit(__doc__)
    if sys.argv[1] == "stamp":
        stempeln(sys.argv[2:])
    else:
        for p in sys.argv[2:]:
            nachziehen(p)
