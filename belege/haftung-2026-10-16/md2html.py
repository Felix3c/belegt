# HR1 (16.10.2026): Muster-Dossier als HTML für Vorher/Nachher-Bilder.
import sys, markdown
src, ziel = sys.argv[1], sys.argv[2]
html = markdown.markdown(open(src, encoding="utf-8").read(), extensions=["tables"])
css = "body{font:15px/1.45 Georgia,serif;max-width:900px;margin:24px auto;padding:0 20px}table{border-collapse:collapse;font-size:12px}td,th{border:1px solid #ccc;padding:2px 5px}h1{font-size:24px}h2{font-size:18px;margin-top:18px}"
open(ziel, "w", encoding="utf-8").write(f"<!doctype html><meta charset=utf-8><style>{css}</style>{html}")
