#!/usr/bin/env python3
"""
Shared crop helper for the Advanced Algorithms study-site pipeline.

Two modes:

1) bbox — dump word bounding boxes (in PDF points) for a page, so you can find
   the vertical anchors of a question ("Problem"/"Solution"/number) and the
   column split. Also prints page width/height in points.
       python3 crop.py bbox --pdf <pdf> --page N [--grep Solution]

2) crop — render a page at DPI and cut a rectangle given in PDF POINTS.
       python3 crop.py crop --pdf <pdf> --page N --pt X0 Y0 X1 Y1 \
               --out images/foo__q.png [--dpi 200] [--pad 8] [--trim]
   --trim  auto-crops surrounding white margins after the point-rect cut.
   Coordinates are in points (72 pt = 1 inch); origin top-left. A US-letter
   page is 612x792 pt. Use `bbox` first to read off coordinates.

Full-page render (handy for eyeballing before cropping):
       python3 crop.py page --pdf <pdf> --page N [--dpi 150] --out pages/foo.png
"""
import argparse, subprocess, sys, os, re, html, glob, tempfile
from PIL import Image

DPI_DEFAULT = 200

def _run(cmd):
    return subprocess.run(cmd, capture_output=True, text=True)

def render_page(pdf, page, dpi, out_prefix):
    _run(["pdftoppm", "-png", "-r", str(dpi), "-f", str(page), "-l", str(page),
          pdf, out_prefix])
    # pdftoppm suffixes -NN or -N depending on total pages; find the file
    hits = sorted(glob.glob(out_prefix + "*.png"))
    if not hits:
        sys.exit(f"ERROR: render produced no PNG for {pdf} p{page}")
    return hits[-1]

def cmd_page(a):
    out = a.out or f"page-{a.page}.png"
    prefix = out[:-4] if out.endswith(".png") else out
    f = render_page(a.pdf, a.page, a.dpi or 150, prefix)
    if f != out and not os.path.exists(out):
        os.replace(f, out)
        f = out
    print(f, Image.open(f).size)

def get_words(pdf, page):
    r = _run(["pdftotext", "-bbox", "-f", str(page), "-l", str(page), pdf, "-"])
    txt = r.stdout
    pw = ph = None
    m = re.search(r'<page width="([\d.]+)" height="([\d.]+)"', txt)
    if m:
        pw, ph = float(m.group(1)), float(m.group(2))
    words = []
    for m in re.finditer(
        r'<word xMin="([\d.]+)" yMin="([\d.]+)" xMax="([\d.]+)" yMax="([\d.]+)">(.*?)</word>',
        txt):
        x0, y0, x1, y1 = map(float, m.groups()[:4])
        words.append((html.unescape(m.group(5)), x0, y0, x1, y1))
    return pw, ph, words

def cmd_bbox(a):
    pw, ph, words = get_words(a.pdf, a.page)
    print(f"# page {a.page}  size(pt)= {pw} x {ph}")
    print(f"# {len(words)} words; columns split ~ x={ (pw or 612)/2:.0f} pt")
    for (w, x0, y0, x1, y1) in words:
        if a.grep and a.grep.lower() not in w.lower():
            continue
        print(f"y0={y0:7.1f} y1={y1:7.1f}  x0={x0:6.1f} x1={x1:6.1f}  {w}")

def cmd_crop(a):
    x0, y0, x1, y1 = a.pt
    dpi = a.dpi or DPI_DEFAULT
    with tempfile.TemporaryDirectory() as td:
        full = render_page(a.pdf, a.page, dpi, os.path.join(td, "p"))
        img = Image.open(full).convert("RGB")
    s = dpi / 72.0
    pad = a.pad
    L = max(0, int(x0 * s) - pad); T = max(0, int(y0 * s) - pad)
    R = min(img.width, int(x1 * s) + pad); B = min(img.height, int(y1 * s) + pad)
    crop = img.crop((L, T, R, B))
    if a.trim:
        from PIL import ImageChops
        bg = Image.new("RGB", crop.size, (255, 255, 255))
        diff = ImageChops.difference(crop, bg)
        bbox = diff.getbbox()
        if bbox:
            p = a.pad
            bbox = (max(0, bbox[0]-p), max(0, bbox[1]-p),
                    min(crop.width, bbox[2]+p), min(crop.height, bbox[3]+p))
            crop = crop.crop(bbox)
    os.makedirs(os.path.dirname(os.path.abspath(a.out)), exist_ok=True)
    crop.save(a.out)
    print(f"{a.out}  {crop.size[0]}x{crop.size[1]}")

def cmd_region(a):
    """Auto-fit a crop to the words in a y-band. col=left keeps the English/left
    column (x1<COLSPLIT); col=full uses fixed page text margins (so centered display
    math is never clipped). y-extent is tightened to the actual words in the band."""
    pw, ph, words = get_words(a.pdf, a.page)
    pw = pw or 612.0
    COLSPLIT = a.colsplit
    band = [w for w in words if not (w[4] < a.y0 - 2 or w[2] > a.y1 + 2)]  # yMin..yMax overlap
    if a.col == "left":
        band = [w for w in band if w[3] < COLSPLIT]      # xMax < split
    if not band:
        sys.exit(f"ERROR: no words in y[{a.y0},{a.y1}] col={a.col} on {a.pdf} p{a.page}")
    y0 = min(w[2] for w in band); y1 = max(w[4] for w in band)
    if a.col == "left":
        x0 = min(w[1] for w in band); x1 = max(w[3] for w in band)
    else:
        margin = a.margin
        x0 = margin; x1 = pw - margin
    ns = argparse.Namespace(pdf=a.pdf, page=a.page, pt=[x0, y0, x1, y1],
                            out=a.out, dpi=a.dpi, pad=a.pad, trim=True)
    cmd_crop(ns)

def main():
    p = argparse.ArgumentParser()
    sub = p.add_subparsers(dest="mode", required=True)
    b = sub.add_parser("bbox"); b.add_argument("--pdf", required=True)
    b.add_argument("--page", type=int, required=True); b.add_argument("--grep")
    b.set_defaults(func=cmd_bbox)
    c = sub.add_parser("crop"); c.add_argument("--pdf", required=True)
    c.add_argument("--page", type=int, required=True)
    c.add_argument("--pt", type=float, nargs=4, required=True, metavar=("X0","Y0","X1","Y1"))
    c.add_argument("--out", required=True); c.add_argument("--dpi", type=int)
    c.add_argument("--pad", type=int, default=8); c.add_argument("--trim", action="store_true")
    c.set_defaults(func=cmd_crop)
    g = sub.add_parser("page"); g.add_argument("--pdf", required=True)
    g.add_argument("--page", type=int, required=True); g.add_argument("--dpi", type=int)
    g.add_argument("--out"); g.set_defaults(func=cmd_page)
    r = sub.add_parser("region"); r.add_argument("--pdf", required=True)
    r.add_argument("--page", type=int, required=True)
    r.add_argument("--y0", type=float, required=True); r.add_argument("--y1", type=float, required=True)
    r.add_argument("--col", choices=["left", "full"], required=True)
    r.add_argument("--out", required=True); r.add_argument("--dpi", type=int)
    r.add_argument("--pad", type=int, default=10); r.add_argument("--colsplit", type=float, default=312.0)
    r.add_argument("--margin", type=float, default=67.0); r.set_defaults(func=cmd_region)
    a = p.parse_args(); a.func(a)

if __name__ == "__main__":
    main()
