#!/usr/bin/env python3
"""Cache-busting: stamp index.html's local assets with ?v=<git-short-hash> so each
deploy gets a fresh URL and browsers/CDN don't serve stale data.js/guides.js/
explanations.js/app.js/style.css. Run this before committing a deploy."""
import subprocess, re, os
os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))  # StudySite/
h = subprocess.check_output(["git", "rev-parse", "--short", "HEAD"]).decode().strip()
html = open("index.html", encoding="utf-8").read()
# add/replace ?v=... on our own js/css assets (not external)
html = re.sub(r'(href="style\.css)(\?v=[^"]*)?"', rf'\1?v={h}"', html)
html = re.sub(r'(src="(?:data|guides|explanations|app)\.js)(\?v=[^"]*)?"', rf'\1?v={h}"', html)
open("index.html", "w", encoding="utf-8").write(html)
print(f"stamped assets with ?v={h}")
