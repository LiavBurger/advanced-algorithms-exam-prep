# Advanced Algorithms Study-Site — Shared Spec (v1)

All agents MUST follow this exactly so classification and file naming are consistent.

Project root: `/mnt/c/Users/liavb/Desktop/Reichman/Semester B/Advanced Algorithms`
Working dir:  `StudySite/`
- `StudySite/text/*.txt`      — pre-extracted layout text of every source (for curation)
- `StudySite/assets/pages/`   — full-page PNG renders (intermediate)
- `StudySite/images/`         — final cropped question/solution PNGs
- `StudySite/data/`           — inventory + manifest JSON
- Source PDFs: `Exams/Solutions/*.pdf`, `Homework/2025-solutions/*.pdf`, `Homework/2026-solutions/*.pdf`

## Topic taxonomy (the site's spine). Use the slug EXACTLY.

Randomized:
- `randomized/prob-basics`        — Probability Basics & Quicksort (linearity of expectation, indicators, union bound, quicksort analysis, basic recurrences/master-theorem warm-ups)
- `randomized/karger-min-cut`     — Karger's Min-Cut
- `randomized/concentration`      — Concentration Bounds (Markov, Chebyshev, Chernoff)
- `randomized/probabilistic-method` — The Probabilistic Method
- `randomized/random-walks`       — Random Walks & Mixing (spectral gap, 2-SAT walk, s-t / USTCON connectivity)
- `randomized/isolation-lemma`    — Isolation Lemma

Algebraic:
- `algebraic/pit`                 — PIT & Schwartz–Zippel Lemma
- `algebraic/bipartite-matching`  — Algebraic Bipartite / Perfect Matching (symbolic determinant, Tutte/biadjacency matrix, isolation-based matching)
- `algebraic/fft`                 — FFT, polynomial multiplication, convolutions, sumsets
- `algebraic/matrix-mult`         — Matrix-Multiplication applications (Strassen, boolean product, graph diameter, APSP, Freivalds identity testing, binary exponentiation)

Linear Programming:
- `lp/basics`                     — LP Basics & Geometry (standard form, feasibility, BFS/vertices, simplex, ellipsoid)
- `lp/duality-farkas`             — LP Duality & Farkas' Lemma
- `lp/ilp-tum`                    — Integer Programming & Total Unimodularity

Approximation:
- `approx/approximation`          — Approximation Algorithms (vertex cover, set cover, MAX-SAT/MAX-3SAT, TSP, k-center, PTAS, LP-rounding, greedy, local search)

Special:
- `out-of-syllabus`               — NOT in the current course. Mark relevant=false. Examples seen: convex hull / computational geometry, stable marriage / matching markets, pathwidth / treewidth, generic data structures, amortized analysis, network flow *algorithms* per se (but flow used as LP/approx IS relevant), anything clearly outside the four units above.

If a question's PRIMARY technique is ambiguous or straddles topics, pick the dominant one and add a `note`.

## Relevance rule
- `relevant: true`  — primary technique is one of the 14 real topics above.
- `relevant: false` — `out-of-syllabus`.
- If unsure (e.g. a pure master-theorem recurrence warm-up), set `relevant: true`, topic `randomized/prob-basics`, and `note: "borderline warm-up"`. The merge step decides.

## Difficulty
- `easy`   — one technique, direct application, close to a canonical example; true/false with short justification; basic recurrence.
- `medium` — chains 2 techniques or needs one non-obvious step; typical exam sub-question.
- `hard`   — multi-part, needs a clever construction/insight, or a full algorithm design + analysis + runtime.

## Granularity — SUB-QUESTIONS ARE FIRST-CLASS
The site lets the user work a multi-part problem **piece by piece**: every sub-question
gets its OWN question screenshot, its OWN solution screenshot, its OWN reveal-on-click,
and its OWN Got-it/Shaky/Failed marking.

- The unit is the **sub-question**. Keep EVERY lettered/numbered sub-part (a, b, c, ...) as
  its own inventory entry (a "part"). Do NOT merge — not even True/False checklists.
  (Previous merge rule is REMOVED.)
- Group parts under their **parent problem** via `(source_tag, problem)`. Parts sharing a
  parent are siblings and will render grouped under one parent card, each independently
  revealable and markable.
- If a problem has NO sub-parts, it is a parent with a single part (`part: null`).
- Sub-parts may differ in topic/difficulty; classify each part on its own. Record the
  parent's dominant topic too (see data model).

## Parent / sub-question data model (used by manifest + site)
A `question` (parent problem) groups `parts` (sub-questions):
```
question = {
  "qid": "2025A-p1",                 // stable: <sourceid>-p<problem>
  "unit": "Randomized",
  "topic": "randomized/prob-basics", // PRIMARY topic = dominant/first part's topic
  "also_topics": ["algebraic/fft"],  // other topics its parts touch (for cross-links); [] if none
  "title": "True/False warm-up",
  "difficulty": "easy",              // overall = hardest part
  "source": {...},                    // as in schema below (problem-level; part=null here)
  "stemImage": "images/..__stem.png", // OPTIONAL: shared preamble crop shown once above parts; null if none
  "parts": [
     { "part": "a", "topic": "...", "difficulty": "easy", "summary": "...",
       "has_figure": false, "dup_key": "...",
       "questionImage": "images/..__p1a__q.png",
       "solutionImage": "images/..__p1a__sol.png" },
     ...
  ]
}
```
The **curation stage still emits one flat entry per part** (schema below); the parent
grouping is assembled at the merge step from `(source_tag, problem)`.

## Inventory JSON schema (curation stage output)
Array of objects:
```
{
  "source_tag": "exam-2025solA",              // matches StudySite/text/<tag>.txt
  "source": { "kind": "exam"|"homework", "year": 2025, "moed": "A"|"B"|"C"|null,
              "iteration": null, "set": null, "problem": 1, "part": "a"|null },
  "topic": "randomized/prob-basics",
  "difficulty": "easy",
  "relevant": true,
  "summary": "<=120 char plain-English description of what the question asks",
  "has_figure": false,                          // true if a diagram/plot is essential
  "dup_key": "3cnf-7m8-bound"                   // short semantic slug; SAME key => same/near-identical question across years
}
```
For homework: `moed:null`, `iteration:2025|2026`, `set:<n>` (problem-set number), `year` = iteration year.

## dup_key
A normalized semantic key for the underlying question so identical/near-identical questions recurring across years collapse. E.g. Karger success-probability bound → `karger-success-prob`; Schwartz–Zippel proof → `sz-lemma-proof`. Keep it short, lowercase, hyphenated, technique-first.

## Crop rules (cropping stage — for reference now)
- Render final crops at **200 DPI** (`pdftoppm -r 200`). Page 612x792pt -> 1700x2200px. pixel = pt * 200/72.
- Detect bilingual page: contains Hebrew glyphs. In bilingual pages the ENGLISH problem statement is the LEFT column (word xMax < ~305 pt). Hebrew is right column.
- ONE question crop + ONE solution crop PER SUB-QUESTION (part), not per problem.
  If the problem has a shared preamble/stem (e.g. "For each statement, T/F, explain"),
  crop it ONCE as the parent `stemImage`; each part's question crop is just that part's
  own statement (the letter + its text). If there is no shared stem, stemImage=null.
- QUESTION crop: the sub-question statement region only.
    - bilingual page  -> crop LEFT (English) column. If a centered display equation overflows the column, widen to full width for that crop (fidelity beats losing math).
    - single-column page -> full content width.
- SOLUTION crop: solutions are English-only -> always full content width.
- Vertical bounds from bbox anchors: question = from its "Problem/שאלה/number" anchor down to the "Solution:"/answer start; solution = from there to the next problem anchor (or column/page end). Multi-page: produce stacked crops, one per page slice.
- Add ~8px padding. Trim large whitespace.
- Naming: `images/<topicflat>__<sid>__q.png` and `__sol.png`, where `<topicflat>` = topic slug with `/`->`-`, and `<sid>` = e.g. `2025A-p1a`, `hw2026s1-p3`, `2021A-p2`.

## VALIDATED CROP WORKFLOW (tool-based — use this)
Use `python3 StudySite/spec/crop.py`. Tested end-to-end. Per assigned document:

1. **Render & map.** `crop.py page --pdf <pdf> --page N --out StudySite/assets/pages/<sid>-pN.png`
   for the page(s) you need, and VIEW them to see where each problem/part/solution sits.
   Detect format: if the page has Hebrew on the right, it is **bilingual** (English = left
   column); otherwise **single-column** (old exams + homework).
2. **Find y-anchors.** `crop.py bbox --pdf <pdf> --page N --grep Solution` (and `--grep Problem`,
   or a distinctive word from the part) to read the yMin of the part-letter marker, the
   "Solution"/answer start, and the next part/problem. These y-values (PDF points) bound each region.
3. **Cut with `region`** (auto-fits the box to the words in the band — preferred):
   - Question, bilingual page:  `crop.py region --pdf <pdf> --page N --y0 <partY> --y1 <solY> --col left  --out images/<...>__q.png`
   - Question, single-column:    same but `--col full`
   - Solution (ALWAYS):          `crop.py region --pdf <pdf> --page N --y0 <solY> --y1 <nextY> --col full --out images/<...>__sol.png`
   `--col full` uses fixed page margins so centered display equations are never clipped.
   `--col left` auto-fits the English column. `region` always trims whitespace.
   (If `region` misbehaves on a page, fall back to `crop.py crop --pt X0 Y0 X1 Y1`.)
4. **Shared stem.** If a problem has a preamble shared by all parts (e.g. "For each
   statement, T/F, explain"), crop it once: `--col left` (bilingual) or `full`, output
   `images/<topicflat>__<sid>__stem.png`. Otherwise no stem.
5. **VERIFY EVERY CROP** by viewing the PNG. If text is clipped on any side, widen the
   y-band (region re-fits) or bump the far edge and re-cut. A question crop must contain the
   full sub-question statement and nothing from the next part; a solution crop must contain
   the entire worked solution for that part (may span a page — then also make `__q2`/`__sol2`).
6. Output image paths are FIXED by the manifest/croptask (`questionImage`/`solutionImage`);
   write exactly those filenames. 200 DPI (the tool default).

**Coordinates reference (letter-size 612x792pt bilingual exams):** column split ~312pt;
English column x 76-306; full text width x 67-545. Old/homework single-column: full width.
