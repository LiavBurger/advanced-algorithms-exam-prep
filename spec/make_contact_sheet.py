#!/usr/bin/env python3
"""Generate StudySite/review/contact-sheet.html — a QA gallery of every curated
sub-question showing its question + solution crop side by side, grouped by unit/topic,
with provenance labels and MISSING flags. Run after the cropping agents finish."""
import json, os, html

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # StudySite/
os.chdir(ROOT)
m = json.load(open("data/questions.json"))
os.makedirs("review", exist_ok=True)

def img_exists(p): return bool(p) and os.path.exists(p)
# review page lives in review/, images are ../images/...
def rel(p): return "../" + p if p else ""

miss = []
out = ['<h1>Advanced Algorithms — Question Catalog (QA contact sheet)</h1>']
total_q = total_missing = 0
for unit in m["units"]:
    out.append(f'<h2 class="unit">{html.escape(unit["unit"])}</h2>')
    for t in unit["topics"]:
        n = sum(len(p["parts"]) for p in t["parents"])
        out.append(f'<h3>{html.escape(t["topic_name"])} '
                   f'<span class="meta">{t["n_parents"]} problems · {n} sub-Qs · '
                   f'{t.get("n_cross",0)} cross-topic</span></h3>')
        if not t["parents"]:
            out.append('<p class="empty">— no dedicated problems (guide + cross-topic parts only) —</p>')
        for p in t["parents"]:
            stem = p.get("stemImage")
            src = html.escape(p.get("source_tag",""))
            out.append(f'<div class="prob"><div class="phdr"><b>{html.escape(p["sid"])}</b> '
                       f'<span class="tag {p["difficulty"]}">{p["difficulty"]}</span> '
                       f'<span class="src">{src} · {html.escape(p.get("title",""))}</span></div>')
            if stem:
                if img_exists(stem):
                    cell = f'<img src="{rel(stem)}">'
                else:
                    cell = f'<span class="miss">MISSING STEM: {html.escape(stem)}</span>'
                out.append(f'<div class="stem"><em>shared stem:</em> {cell}</div>')
            for pt in p["parts"]:
                total_q += 1
                q, s = pt["questionImage"], pt["solutionImage"]
                qok, sok = img_exists(q), img_exists(s)
                if not qok: miss.append(q); total_missing += 1
                if not sok: miss.append(s); total_missing += 1
                lab = f'({pt["part"]})' if pt["part"] else '(·)'
                qcell = f'<img src="{rel(q)}">' if qok else f'<span class="miss">MISSING Q<br>{html.escape(q)}</span>'
                scell = f'<img src="{rel(s)}">' if sok else f'<span class="miss">MISSING SOL<br>{html.escape(s)}</span>'
                if pt.get("questionImage2") and img_exists(pt["questionImage2"]):
                    qcell += f'<img src="{rel(pt["questionImage2"])}">'
                if pt.get("solutionImage2") and img_exists(pt["solutionImage2"]):
                    scell += f'<img src="{rel(pt["solutionImage2"])}">'
                out.append(f'<div class="part"><div class="plab">{lab} <span class="tag {pt["difficulty"]}">{pt["difficulty"]}</span> '
                           f'<span class="psum">{html.escape(pt["summary"])}</span></div>'
                           f'<div class="pair"><div class="q">{qcell}</div><div class="s">{scell}</div></div></div>')
            out.append('</div>')

CSS = """
body{font:15px/1.5 -apple-system,Segoe UI,Roboto,sans-serif;margin:0;padding:24px;background:#0f1216;color:#e6e6e6}
h1{font-size:24px} h2.unit{margin-top:40px;border-bottom:2px solid #3a6df0;padding-bottom:6px;color:#8ab4ff}
h3{margin-top:26px;color:#cfe0ff} .meta{font-weight:400;font-size:12px;color:#8a93a0}
.prob{border:1px solid #262b33;border-radius:10px;margin:14px 0;padding:12px;background:#161a20}
.phdr{margin-bottom:8px} .src{color:#8a93a0;font-size:12px} .empty{color:#6b7280;font-style:italic}
.tag{font-size:11px;padding:1px 7px;border-radius:10px;text-transform:uppercase;font-weight:700}
.tag.easy{background:#0f5132;color:#7ee2a8} .tag.medium{background:#664d03;color:#ffd666} .tag.hard{background:#5c1a1a;color:#ff9b9b}
.part{margin:10px 0;padding:8px;border-top:1px solid #21262e}
.plab{font-size:13px;margin-bottom:6px} .psum{color:#aeb6c0}
.pair{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.q,.s{background:#fff;border-radius:6px;padding:6px;overflow:auto}
.q img,.s img,.stem img{max-width:100%;display:block}
.stem{background:#fff;border-radius:6px;padding:6px;margin-bottom:8px}
.miss{display:inline-block;background:#5c1a1a;color:#ffb3b3;padding:10px;border-radius:6px;font-family:monospace;font-size:11px}
.summary{position:sticky;top:0;background:#3a6df0;color:#fff;padding:10px 14px;border-radius:8px;margin-bottom:16px;font-weight:600}
"""
header = (f'<div class="summary">Catalog: {m["n_parents"]} problems · {total_q} sub-questions · '
          f'{total_q*2} expected crops · <b>{total_missing} MISSING</b></div>')
htmldoc = f"<!doctype html><meta charset=utf-8><title>AA Contact Sheet</title><style>{CSS}</style>{header}{''.join(out)}"
open("review/contact-sheet.html","w").write(htmldoc)
print(f"wrote review/contact-sheet.html — {m['n_parents']} problems, {total_q} sub-Qs, {total_missing} missing crops")
if miss:
    print("MISSING (first 40):")
    for x in miss[:40]: print("  ", x)
