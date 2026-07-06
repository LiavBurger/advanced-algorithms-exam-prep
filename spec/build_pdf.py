#!/usr/bin/env python3
"""Build a QUESTIONS-ONLY practice workbook PDF for Notability/iPad — a companion to
the study website (which holds the solutions and study guides). Topic by topic, tiered
easy->hard, each question on its own page with blank work space. No solutions, no guides.
Render with headless Chrome (--print-to-pdf --generate-pdf-document-outline)."""
import json, os, html

os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))  # StudySite/
data = json.load(open("data/questions.json"))
WEBSITE = "https://liavburger.github.io/advanced-algorithms-exam-prep/"

DR = {"easy": 0, "medium": 1, "hard": 2}
TIER_LABEL = {1: "Priority 1 — 2023+ Exams", 2: "Priority 2 — Current Homework",
              3: "Priority 3 — Old Homework", 4: "Priority 4 — Pre-2023 Exams"}
def esc(s): return html.escape(s or "")
def src_label(s):
    if s.get("kind") == "homework": return f"HW {s.get('iteration')} · Set {s.get('set')}"
    return f"{s.get('year')}{' Moed ' + s.get('moed') if s.get('moed') else ''} exam"
def sidlab(sid): return sid.replace("-p", " · P")

CSS = """
@page { size: A4; margin: 13mm 14mm 12mm; }
* { -webkit-print-color-adjust: exact; print-color-adjust: exact; box-sizing: border-box; }
html,body{margin:0}
body { font: 11.5pt/1.5 "Helvetica Neue",Arial,sans-serif; color:#15181f; }
a{color:#2b56c9;text-decoration:none}
.cover{height:100%;display:flex;flex-direction:column;justify-content:center;text-align:center;page-break-after:always}
.cover h1{font-size:30pt;margin:0 0 6pt;letter-spacing:-.5pt}
.cover p{color:#555;font-size:12pt;margin:2pt 0}
.cover .rule{width:60pt;height:3pt;background:#3a6df0;margin:14pt auto}
.howto{border:1px solid #d8dce4;border-radius:8pt;padding:10pt 16pt;margin:16pt auto;max-width:410pt;text-align:left;font-size:10.5pt;color:#333}
.howto b{color:#15181f}
.howto .site{display:block;margin-top:8pt;font-size:11pt;color:#2b56c9;word-break:break-all}
h1.topic{page-break-before:always;font-size:19pt;color:#1a2b6b;border-bottom:2.5pt solid #3a6df0;padding-bottom:4pt;margin:0 0 4pt;letter-spacing:-.3pt}
.topicsub{color:#8a93a0;font-size:10pt;margin:0 0 6pt}
h2.tier{page-break-before:always;font-size:13pt;color:#3a6df0;margin:10pt 0 8pt;border-bottom:1pt solid #e6e8ee;padding-bottom:3pt}
h2.tier.nobreak{page-break-before:auto}
.qpage{page-break-before:always}
.qpage.nobreak{page-break-before:auto}
.qhead{font-size:9.5pt;color:#555;font-weight:600;border-bottom:1px solid #e6e8ee;padding-bottom:3pt;margin-bottom:7pt;display:flex;gap:8pt;flex-wrap:wrap;align-items:center}
.qhead .badge{font-size:8pt;font-weight:800;text-transform:uppercase;letter-spacing:.3pt;padding:1pt 7pt;border-radius:10pt}
.b-easy{background:#e7f6ed;color:#1a7f46}.b-medium{background:#fdf3d8;color:#8a6100}.b-hard{background:#fde7e7;color:#b3261e}
.qsum{font-size:10.5pt;color:#2a2f3a;margin-bottom:6pt;font-style:italic}
.qimg img,.stemimg img{max-width:100%;height:auto;display:block;margin:3pt 0}
.stemimg{margin-bottom:4pt}
.worklabel{margin-top:14pt;color:#9aa3b2;font-size:9pt;letter-spacing:.5pt;text-transform:uppercase;border-top:1px dashed #d8dce4;padding-top:5pt}
"""

def q_page(grp, pt, nobreak=False):
    s = grp["source"]; diff = pt["difficulty"]
    lab = f"({pt['part']})" if pt.get("part") else ""
    stem = f'<div class="stemimg"><img src="{grp["stemImage"]}"></div>' if grp.get("stemImage") else ""
    qimg = f'<img src="{pt["questionImage"]}">'
    if pt.get("questionImage2"): qimg += f'<img src="{pt["questionImage2"]}">'
    cls = "qpage nobreak" if nobreak else "qpage"
    return (f'<section class="{cls}"><div class="qhead">'
            f'<b>{sidlab(grp["sid"])} {lab}</b> <span class="badge b-{diff}">{diff}</span>'
            f'<span style="color:#8a93a0">· {src_label(s)}</span></div>'
            f'<div class="qsum">{esc(pt["summary"])}</div>'
            f'{stem}<div class="qimg">{qimg}</div>'
            f'<div class="worklabel">— Your work —</div></section>')

out = [f'<!doctype html><meta charset="utf-8"><title>Advanced Algorithms — Practice Workbook</title><style>{CSS}</style>']
out.append('<div class="cover"><h1>Advanced Algorithms</h1><div class="rule"></div>'
           '<p>Practice Workbook</p><p style="color:#8a93a0">Questions only — a companion to the study website</p>'
           '<div class="howto"><b>How to use this workbook</b><br>'
           'Work topic by topic; within each topic the questions run easy → hard, with 2023+ exams first. '
           'Solve each question by hand in the blank space beneath it. This workbook is <b>questions only</b> — '
           'the <b>solutions</b> and the <b>study guides</b> live on the study website, where you can reveal each '
           'solution and track your progress. Look a question up by its label (e.g. <b>2025B · P1</b>). '
           'Use the bookmarks/outline to jump between topics.'
           f'<span class="site">Solutions &amp; guides: {WEBSITE}</span></div></div>')

for unit in data["units"]:
    for topic in unit["topics"]:
        if not topic["groups"]: continue
        flat = []
        for grp in topic["groups"]:
            for pt in grp["parts"]:
                flat.append((grp, pt))
        flat.sort(key=lambda gp: (gp[0]["tier"], DR[gp[0]["difficulty"]], gp[0]["sid"], str(gp[1].get("part") or "")))
        out.append(f'<h1 class="topic">{esc(unit["unit"])} — {esc(topic["topic_name"])}</h1>'
                   f'<div class="topicsub">{len(flat)} questions · solutions &amp; a study guide for this topic are on the website</div>')
        cur_tier = None; first_tier = True
        for grp, pt in flat:
            first = False
            if grp["tier"] != cur_tier:
                cur_tier = grp["tier"]; first = True
                tcls = "tier nobreak" if first_tier else "tier"  # first tier flows under the topic title
                first_tier = False
                out.append(f'<h2 class="{tcls}">{TIER_LABEL[cur_tier]} · {esc(topic["topic_name"])}</h2>')
            out.append(q_page(grp, pt, nobreak=first))

open("study-workbook.html", "w", encoding="utf-8").write("".join(out))
nq = sum(len(g["parts"]) for u in data["units"] for t in u["topics"] for g in t["groups"])
print(f"wrote study-workbook.html — questions-only, {nq} questions across "
      f"{sum(1 for u in data['units'] for t in u['topics'] if t['groups'])} topics")
