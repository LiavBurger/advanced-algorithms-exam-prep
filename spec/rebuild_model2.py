#!/usr/bin/env python3
"""Rebuild questions.json + data.js: keep existing exam + 2025-homework parts, drop the
stale 2026-homework parts, add the freshly-cropped 2026 parts (data/hw2026/set*.json),
and apply the 4-tier scheme (2023+ exams / current HW 2026 / old HW 2025 / pre-2023 exams)."""
import json, glob, os, collections
os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))  # StudySite/

UNIT_OF = {"randomized": "Randomized", "algebraic": "Algebraic",
           "lp": "Linear Programming", "approx": "Approximation"}
TOPIC_ORDER = ["randomized/prob-basics","randomized/karger-min-cut","randomized/concentration",
 "randomized/probabilistic-method","randomized/random-walks","randomized/isolation-lemma",
 "algebraic/pit","algebraic/fft","algebraic/matrix-mult","algebraic/bipartite-matching",
 "lp/basics","lp/duality-farkas","lp/ilp-tum","approx/approximation"]
TOPIC_NAME = {"randomized/prob-basics":"Probability Basics & Quicksort","randomized/karger-min-cut":"Karger's Min-Cut",
 "randomized/concentration":"Concentration Bounds","randomized/probabilistic-method":"The Probabilistic Method",
 "randomized/random-walks":"Random Walks & Mixing","randomized/isolation-lemma":"Isolation Lemma",
 "algebraic/pit":"PIT & Schwartz–Zippel","algebraic/fft":"FFT & Polynomial Multiplication",
 "algebraic/matrix-mult":"Matrix-Multiplication Applications","algebraic/bipartite-matching":"Algebraic Bipartite Matching",
 "lp/basics":"LP Basics & Geometry","lp/duality-farkas":"LP Duality & Farkas","lp/ilp-tum":"Integer Programming & TUM",
 "approx/approximation":"Approximation Algorithms"}
DR = {"easy": 0, "medium": 1, "hard": 2}; DIFF = ["easy", "medium", "hard"]
TIER_NAME = {1:"2023+ Exams", 2:"Current Homework", 3:"Old Homework", 4:"Pre-2023 Exams"}

def era(s):
    if s.get("kind") == "homework":
        return "hw2026" if s.get("iteration") == 2026 else "hw2025"
    y = s.get("year")
    if y in (2023,2024,2025): return "modern"
    if y == 2021: return "y2021"
    return "old"
def tier(e): return {"modern":1,"hw2026":2,"hw2025":3,"y2021":4,"old":4}[e]

# 1. flatten current data into part records + parent meta
m = json.load(open("data/questions.json"))
parts = {}        # (sid,part) -> record
pmeta = {}        # sid -> {source, stemImage, title}
for u in m["units"]:
    for t in u["topics"]:
        for g in t["groups"]:
            pmeta[g["sid"]] = {"source": g["source"], "stemImage": g.get("stemImage"), "title": g.get("title","")}
            for pt in g["parts"]:
                parts[(g["sid"], pt.get("part"))] = {
                    "sid": g["sid"], "part": pt.get("part"), "topic": pt["topic"],
                    "difficulty": pt["difficulty"], "summary": pt["summary"],
                    "questionImage": pt["questionImage"], "solutionImage": pt["solutionImage"],
                    "solutionImage2": pt.get("solutionImage2"), "questionImage2": pt.get("questionImage2"),
                    "source": g["source"]}

# 2. drop stale 2026 homework
parts = {k:v for k,v in parts.items()
         if not (v["source"].get("kind")=="homework" and v["source"].get("iteration")==2026)}
for sid in [s for s,mm in pmeta.items() if mm["source"].get("kind")=="homework" and mm["source"].get("iteration")==2026]:
    pmeta.pop(sid, None)

# 3. add new 2026 homework parts
added = 0
for f in sorted(glob.glob("data/hw2026/set*.json")):
    for p in json.load(open(f)):
        parts[(p["sid"], p.get("part"))] = {
            "sid": p["sid"], "part": p.get("part"), "topic": p["topic"],
            "difficulty": p["difficulty"], "summary": p["summary"],
            "questionImage": p["questionImage"], "solutionImage": p["solutionImage"],
            "solutionImage2": p.get("solutionImage2"), "questionImage2": p.get("questionImage2"),
            "source": p["source"]}
        pmeta[p["sid"]] = {"source": p["source"], "stemImage": p.get("stemImage"), "title": ""}
        added += 1

# 4. group by topic -> parents (restricted to their parts in that topic)
by_sid = collections.defaultdict(list)
for rec in parts.values():
    by_sid[rec["sid"]].append(rec)

def group_for(sid, recs):
    e = era(pmeta[sid]["source"])
    gdiff = DIFF[max(DR[r["difficulty"]] for r in recs)]
    recs = sorted(recs, key=lambda r: str(r.get("part") or ""))
    return {"sid": sid, "source": pmeta[sid]["source"], "era": e, "tier": tier(e),
            "tier_name": TIER_NAME[tier(e)], "title": pmeta[sid].get("title",""),
            "stemImage": pmeta[sid].get("stemImage"), "difficulty": gdiff,
            "parts": [{k:v for k,v in r.items() if k not in ("sid","source")} for r in recs]}

units = collections.OrderedDict()
tally = collections.Counter()
for topic in TOPIC_ORDER:
    unit = UNIT_OF[topic.split("/")[0]]
    groups = []
    for sid, recs in by_sid.items():
        sub = [r for r in recs if r["topic"] == topic]
        if sub:
            groups.append(group_for(sid, sub)); tally[topic] += len(sub)
    groups.sort(key=lambda g: (g["tier"], DR[g["difficulty"]], g["sid"]))
    units.setdefault(unit, []).append({"topic": topic, "topic_name": TOPIC_NAME[topic],
                                       "n_groups": len(groups), "groups": groups})
out = {"units": [{"unit": u, "topics": ts} for u, ts in units.items()],
       "n_parents": len(by_sid), "generated_parts": len(parts)}
json.dump(out, open("data/questions.json","w"), indent=1)
open("data.js","w").write("window.DATA = " + json.dumps(out, ensure_ascii=False) + ";\n")
print(f"added {added} new 2026 parts | total {len(parts)} parts, {len(by_sid)} problems")
print("tier counts:", collections.Counter(tier(era(pmeta[s]["source"])) for s in by_sid))
for t in TOPIC_ORDER: print(f"  {tally[t]:3}  {t}")
