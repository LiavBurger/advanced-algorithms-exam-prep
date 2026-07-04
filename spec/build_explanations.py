#!/usr/bin/env python3
"""Assemble StudySite/explanations.js (window.EXPL) from per-question HTML fragments in
data/explain/html/<sid>__<part>.html. Math authored in LaTeX (\\( \\) / \\[ \\]) is
converted to MathML at build (same pipeline as the study guides)."""
import glob, os, json
from build_guides import render_math  # reuse LaTeX->MathML converter

os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))  # StudySite/

def build():
    expl = {}
    for f in sorted(glob.glob("data/explain/html/*.html")):
        base = os.path.basename(f)[:-5]        # "<sid>__<part>"
        if "__" not in base:
            print("  skip (bad name):", f); continue
        sid, part = base.rsplit("__", 1)
        key = f"{sid}#{part}"
        expl[key] = render_math(open(f, encoding="utf-8").read())
    open("explanations.js", "w", encoding="utf-8").write(
        "window.EXPL = " + json.dumps(expl, ensure_ascii=False) + ";\n")
    print(f"wrote explanations.js — {len(expl)} explanations")

if __name__ == "__main__":
    build()
