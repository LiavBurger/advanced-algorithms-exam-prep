#!/usr/bin/env python3
"""Add the four 2023+ exam parts that the original pipeline dropped (two dedup drops,
two lattice items tagged out-of-syllabus), plus a new 'algebraic/lattices' topic.
Rewrites data/questions.json, data.js and data/parents.json. Idempotent."""
import json, os, collections
os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))  # StudySite/

DR = {"easy": 0, "medium": 1, "hard": 2}
NEW_TOPIC = ("algebraic/lattices", "Lattices & LLL", "Algebraic", "algebraic/bipartite-matching")  # slug, name, unit, insert-after

def src(year, moed, problem, part): return {"kind": "exam", "year": year, "moed": moed, "iteration": None, "set": None, "problem": problem, "part": part}
NEW = [
  dict(sid="2024A-p5", topic="algebraic/fft", part=None, difficulty="easy", stem=None,
       summary="O(n log n) algorithm computing all values of the convolution f*g of two value lists via FFT polynomial multiplication.",
       q="images/algebraic-fft__2024A-p5-x__q.png", sol="images/algebraic-fft__2024A-p5-x__sol.png", source=src(2024,"A",5,None)),
  dict(sid="2024B-p1", topic="algebraic/lattices", part="c", difficulty="easy", stem="images/lp-ilp-tum__2024B-p1__stem.png",
       summary="T/F: for an orthogonal lattice basis sorted by length, b1 is a shortest nonzero lattice vector (true; integer coefficients, sum of squares).",
       q="images/lp-ilp-tum__2024B-p1-c__q.png", sol="images/lp-ilp-tum__2024B-p1-c__sol.png", source=src(2024,"B",1,"a")),
  dict(sid="2024C-p5", topic="algebraic/lattices", part=None, difficulty="medium", stem=None,
       summary="Prove the LLL bound ||b1|| <= 2^((n-1)/4) (det L)^(1/n) for a reduced basis, via ||b~i||^2 >= (1/2)||b~(i-1)||^2 and det L = prod ||b~i||.",
       q="images/algebraic-lattices__2024C-p5-x__q.png", sol="images/algebraic-lattices__2024C-p5-x__sol.png", source=src(2024,"C",5,None)),
  dict(sid="2025C-p5", topic="randomized/concentration", part=None, difficulty="hard", stem=None,
       summary="Construct a k-tertiary matrix over {0,1,2} (balanced symbol counts on every k x k submatrix) whp, via Chernoff + union bound.",
       q="images/randomized-concentration__2025C-p5-x__q.png", sol="images/randomized-concentration__2025C-p5-x__sol.png", source=src(2025,"C",5,None)),
]

m = json.load(open("data/questions.json"))
# 1. ensure the new topic exists in its unit
slug, name, unit, after = NEW_TOPIC
u = next(u for u in m["units"] if u["unit"] == unit)
if not any(t["topic"] == slug for t in u["topics"]):
    idx = next(i for i, t in enumerate(u["topics"]) if t["topic"] == after) + 1
    u["topics"].insert(idx, {"topic": slug, "topic_name": name, "n_groups": 0, "groups": []})

# 2. insert parts
added = 0
for n in NEW:
    t = next(t for uu in m["units"] for t in uu["topics"] if t["topic"] == n["topic"])
    already = any(g["sid"] == n["sid"] and any(p.get("part") == n["part"] for p in g["parts"]) for g in t["groups"])
    if already: continue
    part = {"part": n["part"], "topic": n["topic"], "difficulty": n["difficulty"], "summary": n["summary"],
            "questionImage": n["q"], "solutionImage": n["sol"], "solutionImage2": None, "questionImage2": None}
    g = next((g for g in t["groups"] if g["sid"] == n["sid"]), None)
    if g:
        g["parts"].append(part); g["parts"].sort(key=lambda p: str(p.get("part") or ""))
        g["difficulty"] = max((p["difficulty"] for p in g["parts"]), key=lambda d: DR[d])
    else:
        t["groups"].append({"sid": n["sid"], "source": n["source"], "era": "modern", "tier": 1, "tier_name": "2023+ Exams",
                            "title": "", "stemImage": n["stem"], "difficulty": n["difficulty"], "parts": [part]})
    t["groups"].sort(key=lambda g: (g["tier"], DR[g["difficulty"]], g["sid"]))
    t["n_groups"] = len(t["groups"])
    added += 1

# 3. recount
sids = set(); parts = 0
for uu in m["units"]:
    for t in uu["topics"]:
        for g in t["groups"]:
            sids.add(g["sid"]); parts += len(g["parts"])
m["n_parents"] = len(sids); m["generated_parts"] = parts
json.dump(m, open("data/questions.json", "w"), indent=1)
open("data.js", "w").write("window.DATA = " + json.dumps(m, ensure_ascii=False) + ";\n")

# 4. keep parents.json consistent (move the two dedup drops back to 'kept')
p = json.load(open("data/parents.json"))
moved = [d for d in p["dropped"] if d["sid"] in ("2024A-p5", "2025C-p5")]
for d in moved:
    d.pop("dup_of", None); p["dropped"].remove(d); p["kept"].append(d)
json.dump(p, open("data/parents.json", "w"), indent=1)
print(f"added {added} parts | total {parts} parts, {len(sids)} problems | parents moved back: {[d['sid'] for d in moved]}")
