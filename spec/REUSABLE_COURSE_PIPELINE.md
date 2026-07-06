# Reusable prompt — build an exam-prep study site + workbook for any course

Paste everything below to Claude Code (running in a folder that contains one course's
materials). It reproduces the full pipeline: curate → screenshot → guide → explain →
website → PDF workbook → deploy. Edit the **INPUTS** block for your course; the rest is
generic. This is a large, multi-agent job — expect it to spawn dozens of subagents.

---

You are building an offline-first **exam-prep study website** (plus a printable practice
workbook) from a course's own materials. Work topic-by-topic, screenshot every past
question and its solution, teach the strategy, and let me reveal solutions, get a detailed
"I don't understand" walkthrough, and track my progress. Optimize for a student going from
a low level to cleanly passing the exam.

## INPUTS (edit these)
- **Lectures**: `<path>` — the only content that defines what's in scope.
- **Recitations**: `<path>`.
- **Homework (current iteration)**: `<path>` — the current course's problem sets + solutions.
- **Homework (past iterations)**: `<path(s)>` — older problem sets (supplementary).
- **Exams + solutions (historical)**: `<path>` — flag which years are the *current* course
  vs a different-era course; exams older than the current syllabus may contain out-of-scope
  questions and must be filtered.
- **Syllabus**: `<path>`.
- **Cheat sheet** (if allowed in the exam): `<path>`.
- **Exam language**: `<English / bilingual / other>`. **Authoring language**: `<English>`.
- **Current iteration marker**: e.g. exams `2023+` are the current course.

## Phase 0 — Interview me first (one question at a time, with your recommendation)
Before building, walk the design tree and confirm each decision. Defaults (used on the
reference build) in brackets:
1. **Topic granularity** for the site's spine [medium: ~12–15 sub-topics that each map to
   one "thinking pattern", grouped under the ~4 course units].
2. **Screenshot granularity** [crop every question and every solution to its own image].
3. **Corpus scope** [curate + de-dupe: drop out-of-syllabus and different-era questions
   using the syllabus + lecture/recitation coverage as the authority].
4. **Study-guide depth** [strategy playbook: when-to-use cues → core tools → one worked
   example on a real question → pitfalls → checklist].
5. **Delivery** [local static-site folder; optionally host on GitHub Pages].
6. **Difficulty ladder** [you tag Easy/Med/Hard; first question of each topic mirrors the
   worked example].
7. **Progress tracking** [Got-it / Shaky / Failed per sub-question + per-topic bars +
   "show only my weak ones", persisted in localStorage].
8. **Build strategy** [prove the pipeline on ONE topic end-to-end, get sign-off, then fan out].

## Phase 1 — Inventory & taxonomy
- List every source file; get page counts (`pdfinfo`). Read the syllabus + lecture/recitation
  deck titles + cheat sheet to derive the **topic taxonomy**: ~12–15 topic slugs
  (`unit/topic`) grouped under the units, plus an `out-of-syllabus` bucket. Write it, the
  difficulty rules, the JSON schemas, and the crop rules to a `spec/SPEC.md` that every
  subagent reads (so classification and file naming are consistent).
- Extract layout text of every PDF: `pdftotext -layout <pdf> text/<tag>.txt`.

## Phase 2 — Curation (parallel subagents, batched by source)
Dispatch one subagent per batch of source documents. Each reads `SPEC.md` + its text files
and emits, **one entry per independently-gradable sub-question** (lettered parts stay
separate — they become separate cards):
```
{ source_tag, source:{kind:exam|homework, year, moed, iteration, set, problem, part},
  topic:"<slug>", difficulty:"easy|medium|hard", relevant:bool,
  summary:"<=120 chars", has_figure:bool, dup_key:"<semantic slug for near-dups>" }
```
Then merge: de-dupe at the **problem** level by `dup_key` (keep the newest-era copy), and
apply the **era filter** — keep everything from the current course; from older eras keep a
question only if its technique is genuinely in the current cheat-sheet/lectures. Log what
you drop (never silently truncate).

## Phase 3 — Screenshot pipeline (parallel subagents, batched by document)
Build a tested crop helper `spec/crop.py` (poppler `pdftoppm`, Pillow) with modes:
`page` (render a page to PNG), `bbox` (dump word bounding boxes in points to find
"Problem"/"Solution"/part-letter anchors + the column split), `crop --pt x0 y0 x1 y1`
(render at 200 DPI, cut a point-rectangle, `--trim` whitespace), and `region --y0 --y1
--col left|full` (auto-fit the box to the words in a y-band). **Prove it on one problem and
view the output before fanning out.**

Per sub-question, crop the **question** region and the **solution** region to their own
PNGs. Handle the layouts you'll meet:
- **Bilingual exams** (two columns): question = the language-you-study column
  (`--col left`); solutions are single-language → `--col full`.
- **Single-column** exams/homework → `--col full`.
- **Solution-only homework** (no restated question): the "question" crop is a framing slice;
  the curated `summary` is the real prompt.
- **Statement rendered as a non-extractable image** (no text layer): find y-bounds by eye /
  ink-gap detection and use `crop --pt`.
- **Multi-page solutions** → emit `…__sol.png` + `…__sol2.png`.
- **Shared preamble** across sub-parts → crop once as the parent `stemImage`.
Naming: `images/<topicflat>__<sid>-<partOrX>__{q,sol[,sol2]}.png` where `topicflat` = slug
with `/`→`-`, `sid` = e.g. `2025A-p1` or `hw2026s3-p2`, `partOrX` = the sub-part letter or
`x`. **Every crop is viewed and re-cut if clipped or a neighbor bleeds in.** Also generate a
`review/contact-sheet.html` (all crops + labels + MISSING flags) for me to eyeball.

## Phase 4 — Data model (`data/questions.json`, inlined as `data.js`)
```
units:[ { unit, topics:[ { topic, topic_name,
  groups:[ { sid, source, era, tier, tier_name, difficulty(=max of its parts), stemImage,
             parts:[ { part, topic, difficulty, summary,
                       questionImage, solutionImage, solutionImage2?, questionImage2? } ] } ] } ] } ]
```
The **unit of study is the sub-question (part)**; group parts of one problem that share a
topic under one problem card; a problem whose parts span topics appears under each. `era` ∈
{current-exam, current-hw, old-hw, old-exam...}; **tier** = a priority number derived from
era. Emit `data.js` as `window.DATA = {...};` (inlined so the site works from `file://`
with no fetch/CORS).

## Phase 5 — Tiering
Order sources by recency/relevance into priority tiers, e.g. **Tier 1 current exams →
Tier 2 current homework → Tier 3 old homework → Tier 4 old exams**. Within each topic show
the tiers in order, each an easy→hard ladder. The site filter defaults to Tier 1 only.

## Phase 6 — Study guides (parallel subagents, one per unit) → `guides.js`
Each topic gets a guide grounded in the lectures/recitations/cheat-sheet, citing a REAL
question by `sid` for its worked example. All math authored in **LaTeX** (`\( \)` inline,
`\[ \]` display) and converted to **MathML at build time** with `latex2mathml` (native
browser rendering, no runtime library). Build `guides.js` (`window.GUIDES = {slug:{title,
html,worked:[sid]}}`). Badge the worked-example question in the ladder as "worked in guide".

## Phase 7 — Per-question explanations (parallel subagents) → `explanations.js`
For **every** question (exams AND homework), pre-generate an "I don't understand the
solution" walkthrough. Each subagent **views the actual question + solution crops** and
writes a detailed explanation that fills every gap the terse official solution skips —
spelling out algebra, justifying each step, defining notation, keeping it "simple enough to
cleanly pass the exam, not textbook-perfect" (avoid dense asymptotic notation like
`2^{-Ω(t)}` — say "the error shrinks fast, below 2^{-n}"). Store one HTML fragment per
question keyed by `sid#part`; build `explanations.js` (`window.EXPL = {"sid#part": html}`)
with the same LaTeX→MathML step. (Style is tunable — offer me: detailed step-list vs.
roadmap-first vs. clean "model exam answer + one intuition line".)

## Phase 8 — The website (`index.html` + `style.css` + `app.js`, all local)
Plain HTML/CSS/vanilla-JS, data-driven from the inlined JS files, no build step, works by
double-clicking `index.html`. Features:
- Sidebar: units → topics with per-topic progress; overall progress bar.
- Top controls: tier show/hide checkboxes, "show only my Shaky/Failed", **dark/light
  toggle**, reset. Everything persists in `localStorage`.
- Topic page: the study guide (collapsible), then tier sections of problem cards; each
  sub-question shows its question crop, a **Reveal solution** button (→ solution crop), a
  **🤔 I don't understand the solution** button (→ the explanation), and **Got-it / Shaky /
  Failed** marks. Theme-aware CSS (light + dark); keep image cards white so scanned math
  stays readable.

## Phase 9 — PDF practice workbook (companion, questions-only)
Build a print HTML (cover + "how to use" + per topic, tiered easy→hard, each question on its
own page with blank work space, **no solutions/guides** — those live on the site) and render
with headless Chrome: `google-chrome --headless=new --no-sandbox --no-pdf-header-footer
--generate-pdf-document-outline --print-to-pdf=Workbook.pdf file://…/workbook.html`
(A4, MathML via a math-capable font — see gotchas). Bookmarks = topics/tiers. Add a
download link on the site.

## Phase 10 — Deploy (optional) + cache-busting
`gh repo create <name> --public --source=. --push`; enable Pages (branch `main`, root).
**Cache-bust**: stamp `index.html`'s local asset URLs with `?v=<git-short-hash>` before each
deploy (`spec/stamp_version.py`) so browsers/CDN don't serve stale `data.js`/`explanations.js`
(GitHub Pages sets `max-age=600`; a redeploy otherwise looks unchanged for ~10 min). After
deploy, poll the live URL for a content marker (not just HTTP 200) and re-trigger the build
if the `actions/deploy-pages` run fails transiently.

## Orchestration & quality rules (lessons learned — follow these)
- **Fan out with parallel subagents**, batched by source document or topic; give every
  subagent the shared `SPEC.md`. Re-dispatch any agent that misfires (returns with 0 tool
  calls). Merge/dedupe globally in the main thread.
- **Verify before mass-producing**: prove each pipeline stage on one slice and view the
  output before scaling to hundreds.
- **View every crop**; a wrong crop is silent. Solutions run wider than you expect — use
  full text width, not a guessed margin.
- **MathML fonts**: headless Chrome auto-italicizes single-letter identifiers into the
  Mathematical-Alphanumeric block; if your only font is DejaVu (no math-italic Greek),
  Greek shows as tofu. Install a real math font (STIX Two Math / Latin Modern Math) or set
  `math mi{text-transform:none}` so base Greek codepoints render.
- **Re-processing**: when source files change, re-crop only those documents, rebuild the
  manifest (drop stale entries, add new), and redeploy.
- **Keep build intermediates out of git** (`assets/pages/`, extracted `text/`, per-batch
  JSON) but commit the site, `images/`, and the generator scripts.
- **Tooling to build** (reused every run): `crop.py`, `build_guides.py`,
  `build_explanations.py`, `build_pdf.py`, `make_contact_sheet.py`, a manifest
  `rebuild` script, and `stamp_version.py`.

Deliverables: a `StudySite/` folder that opens offline (`index.html`), a hosted URL, a
`Workbook.pdf`, and a `review/contact-sheet.html` QA gallery.
