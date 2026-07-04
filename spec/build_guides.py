#!/usr/bin/env python3
"""Assemble StudySite/guides.js from per-topic HTML fragments in data/guides2/.

Each fragment file is named <unit>__<topic>.html (e.g. randomized__concentration.html
-> slug randomized/concentration) and begins with:  <!-- title: ... -->
Math is authored in LaTeX with \\( ... \\) (inline) and \\[ ... \\] (display) and is
converted to MathML at build time (native browser rendering, no runtime library)."""
import glob, os, re, json, sys
from latex2mathml.converter import convert

os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))  # StudySite/

def to_mathml(latex, block):
    try:
        m = convert(latex.strip())
    except Exception as e:
        sys.stderr.write(f"  math FAIL: {latex[:40]!r}: {e}\n")
        return '<code>' + latex.strip() + '</code>'
    if block:
        m = m.replace('display="inline"', 'display="block"', 1)
    return m

def render_math(html):
    # display first (\[ ... \]), then inline (\( ... \)); non-greedy, DOTALL
    html = re.sub(r'\\\[(.+?)\\\]', lambda m: '<div class="gmath">' + to_mathml(m.group(1), True) + '</div>',
                  html, flags=re.S)
    html = re.sub(r'\\\((.+?)\\\)', lambda m: to_mathml(m.group(1), False), html, flags=re.S)
    return html

EXPECTED = ["randomized/prob-basics","randomized/karger-min-cut","randomized/concentration",
  "randomized/probabilistic-method","randomized/random-walks","randomized/isolation-lemma",
  "algebraic/pit","algebraic/fft","algebraic/matrix-mult","algebraic/bipartite-matching",
  "lp/basics","lp/duality-farkas","lp/ilp-tum","approx/approximation"]

def norm_sid(s):
    """'2014A P9' -> '2014A-p9'; 'hw2025 s5 P2' -> 'hw2025s5-p2'; '2024C P1d' -> '2024C-p1'."""
    s = s.strip().rstrip(".")
    m = re.search(r'[Pp]\s*(\d+)', s)
    if not m:
        return None
    prefix = s[:m.start()].strip().replace(" ", "")
    return f"{prefix}-p{m.group(1)}" if prefix else None

def worked_sids(body):
    out = []
    for m in re.finditer(r'class="gworked"', body):
        seg = body[m.end():m.end() + 240]
        b = re.search(r'<b>([^<]+)</b>', seg)
        if b:
            sid = norm_sid(b.group(1))
            if sid and sid not in out:
                out.append(sid)
    return out

def build():
    guides = {}
    for f in sorted(glob.glob("data/guides2/*.html")):
        slug = os.path.basename(f)[:-5].replace("__", "/")
        raw = open(f, encoding="utf-8").read()
        mt = re.search(r'<!--\s*title:\s*(.+?)\s*-->', raw)
        title = mt.group(1).strip() if mt else slug
        body = raw[mt.end():] if mt else raw
        works = worked_sids(body)
        guides[slug] = {"title": title, "html": render_math(body), "worked": works}
        print(f"  {slug:34} title={title[:34]!r}  worked={works}")
    missing = [s for s in EXPECTED if s not in guides]
    open("guides.js", "w", encoding="utf-8").write("window.GUIDES = " + json.dumps(guides, ensure_ascii=False) + ";\n")
    print(f"\nwrote guides.js — {len(guides)}/{len(EXPECTED)} guides")
    if missing: print("MISSING:", missing)

if __name__ == "__main__":
    build()
