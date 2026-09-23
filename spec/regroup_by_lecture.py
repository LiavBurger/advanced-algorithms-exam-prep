#!/usr/bin/env python3
"""Re-sort the question bank so every unit matches one of the four lecture decks in
Presentations/Lectures/ (Randomized, Algebraic, LinearProgramming, ApproximationAlgorithms).

Only topic/unit placement changes. Question ids (sid) and part letters are untouched, so the
browser's saved marks and reveals (keyed "sid#part") keep working. Topic slugs are kept
stable too (guides.js and course.js refer to them); a slug's prefix no longer implies its unit.
Rewrites data/questions.json and data.js. Idempotent."""
import json, os, collections
os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))  # StudySite/

DR = {"easy": 0, "medium": 1, "hard": 2}

# Unit -> topics, in the order the lecture deck covers them.
LAYOUT = [
  ("Randomized", [
    ("randomized/prob-basics", "Probability Basics & Quicksort"),
    ("randomized/karger-min-cut", "Karger's Min-Cut"),
    ("algebraic/pit", "PIT & Schwartz–Zippel"),                       # Randomized deck, slides 35-40
    ("algebraic/bipartite-matching", "Bipartite Matching via Determinants"),  # slides 41-46
    ("randomized/concentration", "Concentration Bounds"),
    ("randomized/random-walks", "Random Walks & Mixing"),
    ("randomized/isolation-lemma", "Isolation Lemma"),
  ]),
  ("Algebraic", [
    ("algebraic/matrix-mult", "Matrix-Multiplication Applications"),
    ("algebraic/fft", "FFT & Polynomial Multiplication"),
  ]),
  ("Linear Programming", [
    ("lp/basics", "LP Basics & Geometry"),
    ("lp/duality-farkas", "LP Duality & Farkas"),
    ("lp/ilp-tum", "Integer Programming & TUM"),
  ]),
  ("Approximation", [
    ("approx/approximation", "Approximation Algorithms"),
    ("randomized/probabilistic-method", "Averaging & the Probabilistic Method"),  # Approx deck, slides 7-15 (Max-Cut, Max-3SAT)
    ("approx/sdp", "SDP, PSD Matrices & Goemans–Williamson"),            # Approx deck, slides 22-41
    ("algebraic/lattices", "Lattices & LLL"),                            # Approx deck, slides 42-67
  ]),
]

# Individual parts that sit in the wrong topic: (sid, part) -> new topic.
MOVE = {
  # PSD / SDP (Approx deck slides 24-41), previously under Algebraic -> Matrix multiplication
  ("2024A-p1", "b"): "approx/sdp",
  ("hw2025s3-p6", "a"): "approx/sdp",
  ("hw2025s3-p6", "b"): "approx/sdp",
  ("hw2025s3-p6", "c"): "approx/sdp",
  # same PSD homework (2026 edition) and the Goemans-Williamson homework, previously in the general approx topic
  ("hw2026s2-p6", "a"): "approx/sdp",
  ("hw2026s2-p6", "b"): "approx/sdp",
  ("hw2026s2-p6", "c"): "approx/sdp",
  ("hw2026s4-p4", None): "approx/sdp",
  # Gram-Schmidt orthonormal basis: taught only as part of LLL (Approx deck slides 47-49)
  ("2024A-p1", "c"): "algebraic/lattices",
  # densest-subgraph LP rounding: keep parts (d),(e) with their siblings (a),(b),(c),(f)
  ("hw2026s3-p3", "d"): "approx/approximation",
  ("hw2026s3-p3", "e"): "approx/approximation",
}

m = json.load(open("data/questions.json"))

# 1. flatten to part records, keeping each group's metadata
meta, parts = {}, []
for u in m["units"]:
    for t in u["topics"]:
        for g in t["groups"]:
            meta[g["sid"]] = {k: v for k, v in g.items() if k != "parts"}
            for pt in g["parts"]:
                pt = dict(pt)
                pt["topic"] = MOVE.get((g["sid"], pt.get("part")), pt["topic"])
                parts.append((g["sid"], pt))

# 2. regroup by topic
known = {slug for _, ts in LAYOUT for slug, _ in ts}
stray = {pt["topic"] for _, pt in parts} - known
assert not stray, f"parts in topics missing from LAYOUT: {stray}"
by_topic = collections.defaultdict(lambda: collections.OrderedDict())
for sid, pt in parts:
    by_topic[pt["topic"]].setdefault(sid, []).append(pt)

units = []
for unit, topics in LAYOUT:
    ts = []
    for slug, name in topics:
        groups = []
        for sid, pts in by_topic[slug].items():
            pts.sort(key=lambda p: str(p.get("part") or ""))
            g = dict(meta[sid])
            g["difficulty"] = max((p["difficulty"] for p in pts), key=lambda d: DR[d])
            g["parts"] = pts
            groups.append(g)
        groups.sort(key=lambda g: (g["tier"], DR[g["difficulty"]], g["sid"]))
        ts.append({"topic": slug, "topic_name": name, "n_groups": len(groups), "groups": groups})
    units.append({"unit": unit, "topics": ts})

out = {"units": units, "n_parents": len(meta), "generated_parts": len(parts)}
assert out["generated_parts"] == m["generated_parts"] and out["n_parents"] == m["n_parents"]
json.dump(out, open("data/questions.json", "w"), indent=1)
open("data.js", "w").write("window.DATA = " + json.dumps(out, ensure_ascii=False) + ";\n")
print(f"{len(parts)} parts, {len(meta)} problems")
for u in units:
    print(u["unit"])
    for t in u["topics"]:
        print(f"  {sum(len(g['parts']) for g in t['groups']):3}  {t['topic']:34} {t['topic_name']}")
