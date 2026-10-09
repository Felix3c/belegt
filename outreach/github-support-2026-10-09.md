# GitHub-Support-Anfrage: alte Commit-Ansichten entfernen (09.10.2026)

**Zweck:** Nach dem Force-Push vom 09.10. 14:4x (alte Spitze `5bc583a` → neue `6ca0283`) liefert GitHub die verwaisten alten Commits weiter per Adresse aus (geprüft 09.10. ~15:00: `/commit/ceacb04` und `/commit/69c317c` HTTP 200). Nur der GitHub-Support kann die Objekte per Garbage Collection und die gecachten Ansichten entfernen.

**Formular:** https://support.github.com/request → „Account or repository data“ → *Remove data from a repository* (Anmeldung mit dem Konto Felix3c nötig). Repository-Feld: `Felix3c/belegt`.

**Belege für die Pflichtangaben** (GitHub-Doku „Removing sensitive data from a repository“, Stand 09.10.):
- Historie mit `git filter-repo` umgeschrieben und per Force-Push ersetzt: ja (09.10.).
- Forks: 0 (API `forks_count`, 09.10.). Pull Requests: 0 (API, state=all). Offene Issues: 0.
- „First changed commit“ laut `git filter-repo`: `69c317c4439954886058782129511c282488fc6f`.
- Keine LFS-Objekte.
- Betroffene alte SHAs, die je auf GitHub lagen (19, alle vom 08.10.2026, `69c317c` bis `5bc583a`): Liste unten. Die 46 späteren lokalen Commits waren nie auf GitHub.

**Nicht in die Anfrage schreiben:** Namen der Anwälte, Kanzleien oder Zitate. Der Support braucht nur Repo, SHAs und die Art der Daten.

---

## Text zum Einfügen (englisch)

**Subject:** Remove cached commits after history rewrite (Felix3c/belegt)

Hello GitHub Support,

I rewrote the history of the public repository **Felix3c/belegt** with `git filter-repo` and force-pushed the result on 2026-10-09. The removed commits contained two files with confidential notes from private correspondence with third parties (personal names, law firm names and verbatim quotes that I was not entitled to publish). The same names and quotes also appeared in `NAECHSTE-SCHRITTE.md` and in commit messages of the affected range; all of that has been replaced in the new history.

The old commits are still reachable by SHA, for example:
- https://github.com/Felix3c/belegt/commit/69c317c4439954886058782129511c282488fc6f
- https://github.com/Felix3c/belegt/commit/ceacb04ea7f5f4a2094b7e2199c34e9608dd621f

Please run garbage collection on the repository and remove the cached views of the old commits.

Details:
- Repository: Felix3c/belegt (public, owned by me)
- First changed commit reported by git-filter-repo: 69c317c4439954886058782129511c282488fc6f
- Forks: 0 · Pull requests referencing the data: 0 · LFS objects: none
- All 19 old commits that were ever pushed to GitHub and are no longer part of the new history (old `main` tip was 5bc583a9b39dd5d2b1921a6276cb951ef6b3fd0d, new tip is 6ca0283):

69c317c4439954886058782129511c282488fc6f
c39b6d7f78b2cc93da9accbc908a2e360eea47ba
eac86528fb0d1603c30a23fc082133317aa70dd1
24663eb1c66f902daef5e5b892a67c58f36259a6
ceacb04ea7f5f4a2094b7e2199c34e9608dd621f
0f91e0be4cd0623f26cc3293ccc7c8ca99b9ae47
18365ddab72b1a259b9b9aea745dca2f929f427b
9ad9b107e032d2325bd2d9243563149fe756e48e
b036e849bf2d84c985f1c16a81794b73cacb37b2
5378ec68b8f6d170361da1395cf9449fbaa1a4da
53ff806c2a6f602f39b948adeb2a0b5dcebb8d2f
173f50a5ef00726e2f4992633815f1d8a7773c6d
13cf1dd9bb65d491cd8cc82c904b1aaf13d57ae3
83ef932f988e546a71997d31f76dc43513c50e63
c2e50f18909269f93d266366e23b90ba29dc0e55
83285baef8fdec1276e92ecb704f7ba803d94fc9
eeb64db04e0bfe812e140233f0ce58acd85a3a32
98df2d6bc970bc0763b8090ecd565abea8c99e0d
5bc583a9b39dd5d2b1921a6276cb951ef6b3fd0d

Thank you.

Felix Lind

---

## Nach dem Absenden
- Ticketnummer hier eintragen: …
- Prüfung nach Antwort: `curl -s -o /dev/null -w "%{http_code}" https://github.com/Felix3c/belegt/commit/ceacb04` muss 404 liefern.
- Lokal liegen die alten Objekte weiter im Reflog von `~/belegt` (Zweig `vor-bereinigung-0910` wurde nicht angelegt); `git reflog expire --expire=now --all && git gc --prune=now` erst, wenn der Support fertig ist, falls die alte Fassung noch gebraucht wird.
