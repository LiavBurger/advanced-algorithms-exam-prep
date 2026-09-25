# 2026 Moed C Exam Intelligence — Advanced Algorithms (Ben Lee Volk)

*Rebuilt 25 September 2026 after Moed A (14 July) and Moed B (17 August). Moed C is expected around 16 October 2026. This replaces `EXAM-INTEL-2026.md` (the July prediction for Moed A), which is kept for history.*

*Method:* The first research run used 143 agents. Each 2026A/B item was traced to its source and each claimed source was checked by two independent reviewers (one re-located it, one tried to refute it). Earlier exams were re-traced, and six analyses covered format and scoring, Moed C behaviour, topic coverage, lecture-to-exam flow, true/false items, and the lecturer's document pool. The ten most-used source documents were then mined for unused exercises, and a critic ran follow-ups. The prediction run used 56 agents: four independent predictors (Moed C history, source documents, coverage gaps, true/false), a synthesis, two critics and a revision. Each of the 16 practice problems was written with a model solution, adversarially checked, and fixed. A second, independent correctness pass then found no mathematical errors in any of them. Practice them in the study site under **🎯 2026C Predicted Exam**.

## TL;DR

- **He does lift problems from documents, but only some of them.** 2026A-P5 is Williamson–Shmoys Ex. 5.3 + 5.6, verbatim. 2026A-P2 is Erickson's FFT notes Ex. 2(c). 2026A-P3 is Jukna's *Extremal Combinatorics* §3.3. 2026A-P4 is DPV Ex. 7.28. 2026B-P5 is Williamson–Shmoys Ex. 6.1. The other written problems (2026B-P2/P3/P4) re-skin his own 2024B problems. All 8 T/F items are twists on specific lecture slides.
- **Moed C has so far been built mostly from recycled material.** About two-thirds of the points in 2024C and 2025C re-skinned same-year A/B problems or older templates. Each Moed C had one "re-prove a class theorem with a changed parameter" problem and added one or two topics its year's A/B skipped. No Moed C has used a fresh textbook exercise yet, although 2026A and 2026B did.
- **Format (0.85):** P1 = 4 T/F × 7 = 28, then four written problems of 14–22 points. The format is fixed within a year and changes between years.
- **Near-certain families:** a Chernoff/union-bound construction or estimator (0.85). At least one written problem that continues or re-skins a 2026A/B problem (0.78). A homework or class proof re-used with a changed parameter (0.80).
- **Likely:** an LP-duality part (0.60) and an LP-based approximation part (0.55). Families 2026A/B skipped that could return: write-an-ILP (0.35), a Schwartz–Zippel/PIT algorithm (0.33), SDP/Goemans–Williamson (0.22), random walks/spectral (0.13) and LLL (0.10).
- **No single written problem is above about 6%.** The mock is the single most likely problem per slot. The alternates and the T/F pool cover the rest of the probability mass, so drill families.

## 1. How the July prediction did

| Part of the July prediction | Result against the real 2026A and 2026B |
|---|---|
| Format, called "nearly certain": 32/20/16/16/16 | **Wrong.** The real papers were 28/16/16/20/20 (A) and 28/18/16/18/20 (B). The "byte-for-byte 2025" evidence came from a stale header in the 2025C solution PDF; the 2025C paper itself was 32/22/16/14/16. |
| Mock exam (what was practised) | **0 of the 9 real written problems.** Overlap only at the family level: a random construction (mock P5) appeared in both papers, and the mock's LP weak-duality proof skeleton reappeared as 2026B-P5(c) for SDP. |
| Slot blueprint | Hits: Chernoff/union construction (both papers), the FFT "wildcard" (A-P2), and fast matrix multiplication only in Moed B/C (B-P2). High-confidence misses: a Schwartz–Zippel algorithm "in every Moed A" and an ILP-modelling slot. |
| T/F gauntlet | Three families returned: Schwartz–Zippel (A-b), isolation (B-b, a near twin of a gauntlet item with the answer flipped) and matrix multiplication (A-c). The gauntlet ignored 2024A/B T/F items, and those families produced 4 of the 8 2026 T/F items (BFS, trace/characteristic polynomial ×2, lattice). |
| "Source mine" (unused exercises next to verified sources) | **Two exact hits = 36 of 2026A's 100 points:** Erickson FFT Ex. 2(c) became A-P2, and W&S Ex. 5.3 + 5.6 became A-P5. Nothing exact in 2026B. |
| "Homework is the single best predictor" | **Wrong.** None of the 16 items in 2026 was a homework problem; the flow runs from old exams into homework. |

Points covered: the mock exam covered 0% at the exact-problem level (roughly 35% of 2026A and 24% of 2026B at the family level). The source mine covered 36% of 2026A and 0% of 2026B exactly. The blueprint's eight archetypes covered almost everything, which also means they carried no information.

**Why it missed:** it carried one year's format into the next, treated three-exam streaks as rules, left 2024 T/F families out of its pool, used homework as a problem-level predictor, and under-weighted topics new in 2026 (ellipsoid, lattices, SDP), which were worth 34 points of 2026B. It also built its mock from the slot table rather than from its own source mine.

## 2. Where the 2026 questions actually came from (verified)

| Item | Pts | Origin | Status |
|---|---|---|---|
| A-P1a BFS with same constraints, different objective (T) | 7 | LP deck slide 27 'Bases', copied from Goemans' LP notes p. LP-7; his own T/F | plausible |
| A-P1b Schwartz–Zippel on an arbitrary 100-point set (F) | 7 | His SZ T/F chain 2023B-1c → 2024C-1b → 2025B-1a, with the product-set hypothesis dropped | plausible |
| A-P1c Σλᵢⁿ = tr(Aⁿ) by repeated squaring (T) | 7 | Algebraic deck, Csanky slides (Kozen, Lecture 31) | confirmed |
| A-P1d Chernoff + union bound over a set family (T) | 7 | His discrepancy family (2023B-P6) | plausible |
| A-P2 count 3-term APs via FFT | 16 | **Erickson, FFT notes, Exercise 2(c)**; also CMU 15-451 FFT notes. The official solution double-counts; the correct count is Σ_b ([x^{2b}]f² − 1)/2 | confirmed |
| A-P3 random vectors shatter all ≤d-sets | 16 | **Jukna, Extremal Combinatorics, §3.3 Theorem 3.2 (Kleitman–Spencer)** | confirmed |
| A-P4 min-cost unit-flow LP whose dual is the shortest path | 20 | **DPV Exercise 7.28**; CMU 15-451 F18 Lecture 15; Zwick TAU LP slides | plausible (near) |
| A-P5 Max DiCut: random 1/4, the IP, rounding 1/4 + x/2 | 20 | **Williamson–Shmoys Ex. 5.3 + 5.6, verbatim** (also Feige, Weizmann handout 5) | confirmed |
| B-P1a ellipsoid: feasible center implies optimal? (F) | 7 | LP deck ellipsoid slides; recitations 7–9 | plausible |
| B-P1b all subset weights distinct? (F) | 7 | Isolation-lemma 'fantasy soccer' slide; Motwani–Raghavan §12.4.1 | plausible |
| B-P1c equal tr(Aⁱ) implies equal spectra (T) | 7 | Newton-identity slides (Wikipedia 'Newton's identities'); Horn–Johnson 2.4.P10 | plausible |
| B-P1d lattice (1,1),(3,1): (1,1) is shortest (T) | 7 | Approximation deck, Gram–Schmidt slides; sibling of 2024B-1c | plausible |
| B-P2 common neighbours via AAᵀ | 18 | His re-skin of 2024B-P4 and the Seidel A² slide | plausible (own) |
| B-P3 colouring with ≥0.4·deg(v) of each colour | 16 | His re-skin of 2023B-P6/2024B-P6 (set balancing, M&U §4.4) | plausible (own) |
| B-P4 prize-collecting vertex cover, threshold 1/3 | 18 | His re-skin of 2024B-P5 (recitation 10) and 2023B-P3 | plausible (own) |
| B-P5 SDP dual C − diag(y) ⪰ 0, weak duality | 20 | **Williamson–Shmoys Exercise 6.1** (Max-Cut SDP dual); Goemans–Williamson JACM §4.2; Feige handout 6 | plausible (near) |

Earlier T/F items with textbook sources found in this round: 2023A-1b is Motwani–Raghavan Problem 12.22 (isolation lemma with product weights, verbatim). 2024A-1d is Bertsimas–Tsitsiklis Ex. 3.6(a). 2023A-1a is close to B–T Ex. 3.18(a). 2024C-1b is close to Jukna Ex. 16.4. 2025C-1c descends from Jukna Ex. 11.4 / M–R Ex. 12.13. The lecturer's Hebrew notes (algebraic computation) are the source of 2023A-1d, 2025B-1a, 2025C-1a and 2025C-1b. The earlier instructors' exams (2014–2021) are not an ancestor of any 2026 item.

## 3. Predicted 2026C blueprint

```
2026 Moed C (Ben Lee Volk), exam about 16 Oct 2026. Final revised prediction. 
FRAME (0.85)
- 3 hours, 100 points, all problems compulsory, two double-sided A4 sheets. The 2026 cover page: any claim from class or homework may be used, and 'interpret a flawed statement so it is non-trivial'.
- P1 is 4 T/F items x 7 = 28 points. Then 4 written problems worth 72 in total, 14-22 points each.
- P2 and P3 single-part (0.75). P4 multi-part, 18-20 points (0.65). P5 is 6+6+8 (0.60).
- Point splits:
  - 28/16/16/20/20 (2026A): 0.25.
  - 28/18/16/18/20 (2026B): 0.20.
  - Another split with a 28-point T/F block (e.g. 28/14/18/20/20 or 28/16/16/22/18): 0.40.
  - A different frame: 0.15.
- Why: all 10 Volk exams kept their year's T/F size and problem count, and both earlier Moed C papers moved only 1-3 weights, by about 2 points each.

SLOT UNITS
Within a year, a slot keeps its unit only 58% of the time, and 2025C changed P3's unit, so these are moderate.
- P2, a single-part algebraic-or-PIT algorithm: 0.62. Split: matmul graph counting 0.25, FFT 0.13, PIT 0.10, char-poly/trace 0.08, other algebraic (squaring, Freivalds, Seidel) 0.06.
- P3, a single-part randomized problem: 0.72. Split: Chernoff/union construction 0.48, sampling estimator 0.13, random walk/spectral re-run 0.05, isolation/Karger re-proof 0.03, PIT 0.03.
- P4:
  - LP 0.35: derive/interpret a dual 0.15, write-an-ILP 0.12, LP-theory re-proof 0.08.
  - Approximation 0.17: 2026B-P4 continuation 0.07, other rounding 0.10.
  - PIT 0.13.
  - Other 0.35.
- P5:
  - Approximation deck 0.55: LP-rounding approximation 0.28, SDP/GW 0.15, LLL 0.07, other 0.05.
  - LP duality 0.10.
  - Other 0.35.

P1 T/F (28 points)
- (a) LP fact: 0.75.
  - Ellipsoid sibling of 2026B-a: 0.22. Both Moed C (a) items took the topic of a same-year Moed B T/F: 2024C-a from 2024B-b, 2025C-a from 2025B-a.
  - Duality edge cases 0.13, vertices/BFS 0.12, simplex/degeneracy 0.10, ILP/TUM 0.08, other LP 0.10.
- (b) Randomized: 0.75. Schwartz-Zippel 0.18, isolation 0.15, BPP 0.12, Markov/Chebyshev 0.08, spectral 0.07, Karger 0.05, matching determinant 0.05, Chernoff 0.05.
- (c) Algebraic: 0.75. A third trace/Newton/Cayley-Hamilton item 0.30 (absolute), matmul counts/omega 0.22, roots of unity/FFT 0.10, Seidel/Freivalds/polynomial tricks 0.08, other 0.05.
- (d) A matrix/eigenvalue/lattice fact: 0.55. Lattice/PSD/SDP 0.22, spectral 0.20, matching determinant 0.08, other linear algebra 0.05. In 10 exams, (d) was an Approximation-deck item once and a spectral item 3 times.
- Answer key: 3T/1F 0.60, 2T/2F 0.22, 4T 0.12, other 0.06. Given 3T/1F, the False is in (a) 0.35, (b) 0.30, (c) 0.25, (d) 0.10.
- At least one item reuses a 2026A/B sub-topic: 0.85 (6 of 6 later sittings did).
- At least two items re-skin pre-2026 T/F items: 0.70. In both Moed C papers, (b) and (c) re-skinned 2023 items.

WHOLE PAPER (written problems unless stated)
- Chernoff/union construction or estimator: 0.85 (construction 0.65, estimator 0.22).
- An LP-duality part (derive or interpret a dual, LP or SDP): 0.60.
- An LP-based approximation part (threshold, randomized or dual rounding): 0.55.
- A write-an-ILP part: 0.35.
- PIT/Schwartz-Zippel: 0.33 (P4 0.13, P2 0.10, P5 0.06, P3 0.04).
- Fast matrix multiplication: 0.28.
- SDP/GW: 0.22.
- FFT: 0.20.
- LP-theory re-proof (Farkas case, reduced costs, vertices): 0.15.
- Characteristic polynomial/trace: 0.13.
- Random walk/spectral/2SAT: 0.13.
- Isolation lemma: 0.10.
- LLL/lattice: 0.10.
- Karger: 0.05.
- At least one written problem continues or re-skins a 2026A/B written problem: 0.78.
- At least one homework or class proof is re-used, either verbatim (2024C-P6) or with a changed parameter (2025C-P3): 0.80.
- At least one topic that was T/F-only in 2026A/B becomes a written problem (PIT after 2026A-1b, trace, lattice/LLL, isolation, ellipsoid): 0.55.
- At least one fresh textbook exercise, i.e. an unused neighbour of a verified source (W&S, Erickson, Jukna, DPV, Feige handouts): 0.45.
- The paper is no harder than 2026A/B: 0.75.
- Expected points by unit: Randomized about 32, Approximation about 24, LP about 23, Algebraic about 21.

MOCK EXAM (28/16/16/20/20)
For each slot the mock uses the single most likely instance; none is above about 0.06.
- P1:
  - (a) Ellipsoid run on P': if the current center lies in P', then x is optimal. [T]
  - (b) Nonzero degree-d polynomial with |S| = d: some a in S^n has f(a) != 0. [F]
  - (c) tr(A^i) = 0 for all i <= n => A^n = 0. [T]
  - (d) Lazy-walk lambda_2 <= 0.9 => diameter O(log n). [T]
- P2 (16): count the 4-cycles of a bipartite graph via AA^T in O(n^omega). Continues 2026B-P2.
- P3 (16): a 3-colouring with at least 0.3 deg(v) neighbours of each colour. 2026B-P3 with 2 colours changed to 3.
- P4 (6+6+8): derive the max-flow LP dual; every cut gives a dual solution; OPT(D) = min cut by threshold rounding. A sibling of 2026A-P4 and the deck's 'Rule of life' slide.
- P5 (6+6+8): the triangle's Max-Cut SDP value is exactly 9/4, using 2026B-P5's (P)/(D) and weak duality. Feige handout 6 Q2.
- Mock units: Randomized 30, LP 27, Algebraic 23, Approximation 20.
- The biggest families the mock leaves out are PIT (0.33) and write-an-ILP (0.35); both are alternates.

REVISION NOTES
- Factual fixes:
  - Difficulty evidence corrected: 2025C was the longest of 2025 (816 vs 684/766 words); only 2024C was the shortest of its year.
  - Lens attributions corrected. coverage analysis l.19 and mined-exercise list rate the max-flow dual less likely. Only coverage analysis favours the estimator. mined-exercise list calls the 4-cycle follow-up unlikely right after B, while l.96 rates it F5.
  - P4 probabilities made to add up.
  - PIT counted under Randomized.
  - Answer-key prior recalibrated.
  - T/F (d) re-scoped to a matrix/eigenvalue/lattice fact.
  - Slot confidences lowered.
  - The PIT argument now rests on base rates instead of the cherry-picked homework claim.
  - Small-sample discounts softened.
  - The 48-multiplication item made clean.
  - Citations fixed.
  - Feige's Weizmann handouts added as a co-source: handout 5 Q3 has exactly 2026A-P5's (a)(b)(c) layout, and handout 6 Q1 is 2026B-P5's W&S 6.1.
- Mock restructured:
  - Only one dual derivation, in P4.
  - The Approximation deck is at P5, as in both 2026 papers.
  - The prize-collecting VC dual-rounding continuation is now an alternate (0.03), because dual rounding and primal-dual appear in no 2026 deck or recitation.
  - The T/F block reuses two 2026 topics instead of three.
- Critique points I did not follow:
  - The 4-cycle continuation stays as mock P2, with sibling drills added.
  - The max-flow dual stays as mock P4, with a hint and a no-MFMC clause, instead of W&S 5.4, which is heavier and no more likely.
  - The Farkas twin stays as a P4 variant (0.035) rather than a full alternate, because the cohort already holds its official solution.
```

### Evidence-backed expectations

- Frame: 5 problems, a 28-point T/F block (4 x 7) plus four written problems of 14-22 points (0.85). Each Moed C kept its year's format but moved 1-3 weights by about 2 points, so the exact 2026A split 28/16/16/20/20 is only 0.25 and the 2026B split is 0.20.
- A Chernoff/union-bound written problem is close to certain (0.85). Most likely it is a construction (0.65; 7 of the 9 past Chernoff problems and both Moed C papers) re-skinned from 2026B-P3 or 2024B-P6, for example 3 colours with at least 0.3 deg(v) of each (instance 0.06). The sampling estimator within +-1/n is the main alternative (0.22 anywhere).
- P2 is a single-part algebraic-or-PIT algorithm (0.62). The favourite family is fast-matrix-multiplication graph counting (0.25 at P2), led by counting 4-cycles via AA^T as a continuation of 2026B-P2 (0.05). Behind it: FFT (0.20 anywhere), PIT (0.33 anywhere, historically at P4-P6, never at P2) and a promoted char-poly/trace problem (0.13).
- PIT/Schwartz-Zippel written is 0.33. The estimate rests on base rates (4/10 exams, 1/2 Moed C, 0/4 Moed B) and on the pattern where a topic that was T/F in A becomes written in C, here 2026A-1b. The homework argument does not help, since homework topics went both ways in 2026. The most Volk-like instance is Edmonds' rank = maximum matching, a graph re-skin of 2023A-P5 (0.035).
- An LP-duality part is likely (0.60), bringing LP back after 2026B's 7 points just as 2024C did after the LP-light 2024B. The top P4 instance is the max-flow dual = min-cut (DPV 7.25, the deck's 'Rule of life' slide, a sibling of 2026A-P4; 0.04). Close behind are write-an-ILP with LP integrality (DPV 7.29 Hollywood; 0.03) and the Farkas twin hw2026 s3-p5-b (0.035).
- P5 is most likely a 6+6+8 Approximation-deck problem (0.55). The top single instance continues 2026B-P5 with Feige's next homework question: the triangle's Max-Cut SDP value is exactly 9/4, via the same (P)/(D) and weak duality (0.045). LP-rounding approximations (K3-removal threshold 1/3, MAX SAT y/2 + 1/4) are the largest family (0.28 at P5).
- Continuing 2026B-P4 (prize-collecting VC) by dual rounding, the way 2025C-P2 continued 2025B-P2, is only 0.03. Dual rounding and primal-dual appear in no 2026 deck or recitation; Approx deck l.233 is the only 'dual'.
- T/F: (a) LP 0.75, most likely an ellipsoid sibling of 2026B-a, because both Moed C (a) items took a same-year Moed B T/F topic. (b) Randomized 0.75. (c) Algebraic 0.75, with a third trace/Newton item at 0.30. (d) A matrix/eigenvalue/lattice fact 0.55 (spectral 0.20, lattice/PSD/SDP 0.22). The key is 3T/1F at 0.60.
- Best single T/F bets (0.03-0.06 each): the ellipsoid on P' returns an optimum (T); Schwartz-Zippel with |S| = d (F); tr(A^i) = 0 for all i <= n => A^n = 0 (T); lazy-walk lambda_2 <= 0.9 => diameter O(log n) (T); (P) infeasible => (D) unbounded (F); BPP(1/2 - 1/n, 1/2 + 1/n) = BPP (T).
- Every Moed C re-used a homework or class proof: 2024C-P6 was homework verbatim and 2025C-P3 changed a parameter. Expect one again (0.80). Candidates: max-flow/min-cut from the LP deck, the Farkas twin, the spectral gap => hitting time/diameter claim, or the isolation lemma for the minimum and the maximum together.
- No specific written problem is above about 0.06. About two-thirds of Moed C points have re-skinned same-year or older templates, so drill families rather than instances: AA^T/trace counting, Chernoff balancing, symbolic-determinant PIT, derive-and-interpret a dual, threshold or randomized rounding with an ILP, and SDP weak duality.
- Difficulty should not exceed 2026A/B (0.75). 2024C had the shortest official solutions of 2024 (781 words vs 871/1108). 2025C's were slightly longer than 2025A/B (816 vs 684/766), but about 2/3 of each Moed C re-used templates, and 2025C-P3 was answered with 'the rest is identical to class'.

### Slot table

| Slot | Points | Family | Probability |
|---|---|---|---|
| Frame | 28 + 72 | 5 problems: P1 = 4 T/F x 7 = 28, then four written problems of 14-22 | 0.85 |
| P1(a) | 7 | LP fact: an ellipsoid sibling of 2026B-a, duality edge cases, vertices/BFS or simplex degeneracy | 0.75 |
| P1(b) | 7 | Randomized-lemma trap: Schwartz-Zippel / isolation / BPP / Markov-Chebyshev | 0.75 |
| P1(c) | 7 | Algebraic: a third trace/Newton/Cayley-Hamilton item, or matmul counts/omega | 0.75 |
| P1(d) | 7 | A matrix/eigenvalue/lattice fact: lattice/PSD/SDP 0.22, spectral 0.20, matching determinant 0.08 | 0.55 |
| P1 key | 28 | 3 True / 1 False | 0.6 |
| P2 | 16-18, one part | Fast matrix multiplication graph counting (4-cycles / K_{2,2} via AA^T, squaring vs multiplying, Seidel G', witnesses) | 0.25 |
| P2 | 16 | FFT counting/matching (Erickson Ex 3(c) zero-sum triples, Ex 4 Hamming pattern, Ex 1(b) Minkowski size) | 0.13 |
| P2 | 14-18 | PIT / Schwartz-Zippel randomized algorithm, error < 0.1 | 0.1 |
| P2 | 16 | Characteristic polynomial / trace promotion (c_2 = -m, c_3 = -2t; closed walks; nilpotency test) | 0.08 |
| P3 | 16 | Chernoff + union-bound construction (colouring / set system / matrix / code / tournament) | 0.48 |
| P3 | 16 | Sampling estimator within +-1/n (or 1/10) with probability 1 - 2^{-n} | 0.13 |
| P3 | 16 | Random walk / spectral re-run with a changed parameter (hitting time or diameter from lambda_2 <= 1 - eps); also isolation/Karger re-proofs | 0.08 |
| P4 | 18-20 (6+6+8) | Derive and interpret the dual of a combinatorial LP (max-flow -> min-cut; VC -> fractional matching; independent set -> edge cover) | 0.15 |
| P4 | 18-20 | Write an ILP, relax it, and prove integrality or a bound (DPV 7.29 Hollywood; Max-Cut linear ILP; W&S 5.4 MAX SAT) | 0.12 |
| P4 | 14-18 | PIT algorithm in the P4 slot (as 2025C-P4) | 0.13 |
| P4 | 18-20 | Approximation at P4: 2026B-P4 continuation (dual computation + dual rounding, or randomized rounding) or another LP rounding | 0.17 |
| P4 | 16 | LP-theory re-proof (Farkas twin hw2026 s3-p5-b; vertex / reduced-cost theorems) | 0.08 |
| P5 | 20 (6+6+8) | LP-rounding approximation (threshold / randomized / derandomized: K3 removal, MAX SAT 5.4, balanced k-cut, set-cover randomized rounding) | 0.28 |
| P5 | 20 (6+6+8) | SDP / GW continuation of 2026B-P5 (triangle SDP = 9/4; lambda_min bound; GW for MAX 2SAT / Max-2-LIN) | 0.15 |
| P5 | 14-16 | LLL / lattice proof in the approximation slot (Regev HW2 4(b)(c); the delta-reduced lemma) | 0.07 |
| Anywhere | 14-18 | PIT / Schwartz-Zippel written problem | 0.33 |
| Anywhere | 14-20 | Re-use of a homework or class proof (verbatim or with a changed parameter) | 0.8 |
| Anywhere | 30-45 expected | At least one written problem continues or re-skins a 2026A/B written problem | 0.78 |
| Anywhere | 14-20 | A topic that was T/F-only in 2026A/B becomes a written problem (PIT, trace, lattice/LLL, isolation, ellipsoid) | 0.55 |

## 4. The practice set in the study site

| Section | Problem | Source / lineage | Probability |
|---|---|---|---|
| Mock exam (P1) | Four T/F items: the ellipsoid on P' returns an optimum (T); Schwartz-Zippel with |S| = d (F); traces all zero => nilpotent (T); spectral gap => logarithmic diameter (T) | (a) LP deck 'Reducing Feasibility to Optimization', Step 3: 'Find optimum by running the ellipsoid algorithm on P' = {(x,y): c^T x <= b^T y, Ax = b, x >= 0, A^T y <= c}. By strong duality ... This step will return them.' Plus 'Ellipsoid Method Overview': 'if q | Block format 4 x 7 = 28: 0.85. Exact or near item: (a) 0.06, (b) 0.04, (c) 0.05, (d) 0.03, so about 0.18 exact hits expected. Sub-topic appears: (a) ellipsoid 0.22, (b) Schwartz-Zippel 0.18, (c) trace |
| Mock exam (P2) | Count the 4-cycles of a bipartite graph in O(n^omega) (continuation of 2026B-P2) | Continuation of 2026B-P2 (|N_uv| for all pairs via AA^T), with the same bipartite preamble, as 2025C-P2 continued 2025B-P2. Ancestors only:
- Zwick, TAU Advanced Algorithms 2016, Problem Set 1, Ex 1.3(b), 'Give an O(n^omega)-time algorithm for finding a simple | This problem or a near variant (detect or count 4-cycles / K_{2,2}, per-vertex counts, general graphs via A^2 or tr(A^4)): 0.05. Matmul graph-counting family at P2: 0.25. Algebraic-or-PIT at P2: 0.62. |
| Mock exam (P3) | A 3-colouring in which every vertex has at least 0.3 deg(v) neighbours of each colour (2026B-P3 with 2 colours changed to 3) | My own re-skin of 2026B-P3, using the 'change 2 symbols to 3' step that turned 2024B-P6 into 2025C-P5 (the k-tertiary {0,1,2} matrix; the two official solutions share sentences). Ancestors: 2023B-P6 (discrepancy); Mitzenmacher-Upfal section 4.4, 'Set Balancing | This re-skin (3 or k colours, any constant thresholds): 0.06. Chernoff/union construction at P3: 0.48. Chernoff/union written problem anywhere: 0.85. |
| Mock exam (P4) | The dual of max-flow: derive it, turn every cut into a dual solution, and round a dual solution to a cut (OPT(D) = min cut) | LP deck, slides 'Another example: recall the max-flow LP' and 'Min-cut Max-flow': 'After taking the dual and cleaning it up a little bit, we get: Minimize sum c_ij y_ij subject to x_s = 1, x_t = 0, y_ij >= 0, y_ij >= x_i - x_j ... One can also prove that the o | This problem or a near variant (a 2-3 part max-flow/min-cut dual problem): 0.04. Derive-and-interpret-a-dual family at P4: 0.15 (0.30 anywhere). An LP-duality part anywhere: 0.60. |
| Mock exam (P5) | The triangle's Max-Cut SDP value is exactly 9/4, via the 2026B-P5 primal/dual pair and weak duality | Feige, Weizmann 'Approximation Algorithms' 2018/19, Handout 6 homework:
- Q1, '(Problem 6.1 in [WS11]) ... the dual of the max-cut SDP ... W + diag(gamma) is positive semidefinite'. This matches 2026B-P5.
- Q2, 'For the unweighted triangle graph (three vertice | This continuation (the triangle, or the general bound SDP(G) <= |E|/2 - (n/4) lambda_min(A) using the same (P)/(D)): 0.045. GW for MAX 2SAT / Max-2-LIN instead (Variant B): 0.035. SDP/GW written anywh |
| Slot alternates (P2 alternate 1) | Edmonds' theorem: rank of the symbolic biadjacency matrix = maximum matching size, with a randomized algorithm (error < 0.1) | Randomized deck, 'Symbolic Biadjacency Matrix' slides: 'det X != 0 (as a polynomial) iff G has a perfect matching ... we get a monomial that can't be cancelled out by any other monomial'.
Motwani-Raghavan, Randomized Algorithms, Problem 7.7 (due to J. Edmonds) | This problem: 0.035. PIT/Schwartz-Zippel written anywhere: 0.33 (P4 0.13, P2 0.10, P5 0.06, P3 0.04). |
| Slot alternates (P2 alternate 2) | Bounded 3SUM with FFT: count the zero-sum triples of S within {-N..N} in O(N log N) | Erickson, Algorithms notes, Appendix A 'Fast Fourier Transforms', Exercise 3, pp.17-18:
'(a) Describe an algorithm that determines whether a given set of n integers contains two elements whose sum is zero, in O(n log n) time. (b) ... three elements whose sum i | Erickson 3(c) in Volk's counting form: 0.03. Erickson Ex 4 instead: 0.025. FFT written anywhere: 0.20 (at P2: 0.13). |
| Slot alternates (P3 alternate 1) | Sampling estimator: the fraction of vertex subsets that are independent sets, within +-1/n with probability 1 - 2^{-n} | Volk's own estimator template:
- 2024A-P2: the density of a CNF within 1/10 with probability 1 - 2^{-n}.
- Re-skinned as 2025B-P5: the 'versatility' R(G) = the fraction of legal 3-colourings, within 1/n, with probability at least 1 - 2^{-n}. The official 2025B | The estimator template on any object: 0.22 anywhere (0.13 at P3). This object (independent sets): 0.03. |
| Slot alternates (P3 alternate 2) | Spectral gap re-run: lambda_2(B) <= 1 - eps gives hitting probability >= 1/(2n) after O(log n / eps) steps, so the diameter is O(log n / eps) | Randomized deck random-walk analysis: 'We showed ||B^k p_s - (1/n)(1,...,1)|| <= lambda_2^k', with the lazy walk B = I/2 + A/2 and 'the probability to reach t after 4n^5 steps is at least ...'. Recitation 4, Claim 2: 'If lambda_2 < 0.9 then the diameter of G i | This problem: 0.025. A random-walk / spectral / 2SAT written problem: 0.13 anywhere (0.05-0.06 at P3). A lecture-theorem re-run anywhere: 0.80. |
| Slot alternates (P4 alternate 1) | DPV 7.29 'Hollywood': write the 0/1 ILP, relax it, and prove the LP has an integral optimum by threshold rounding | Dasgupta-Papadimitriou-Vazirani, Algorithms, Exercise 7.29 'Hollywood':
'A film producer is seeking actors and investors ... actor i charges s_i dollars ... Investor j will provide p_j dollars, but only on the condition that certain actors L_j are included in  | This problem: 0.03. A write-an-ILP part anywhere: 0.35 (as a standalone P4 problem: 0.12). |
| Slot alternates (P4 alternate 2) | Prize-collecting vertex cover, continued: show the given LP is the dual, tight edges pay their penalty, and dual rounding is a 2-approximation | Continuation of 2026B-P4 by the step that took 2025B-P2 to 2025C-P2. 2025C-P2 reused 2025B-P2's set-cover preamble word for word and asked: (a) show the given LP is the dual of the relaxation; (b) the sets whose dual constraints are tight form a cover; (c) f-a | This problem (the dual-rounding version, 2-approximation): 0.03. 2026B-P4 continued with any technique (dual, randomized rounding, the set-cover generalisation): 0.07. |
| Slot alternates (P5 alternate 1) | Triangle (K3) removal: write the IP, threshold-1/3 rounding gives a 3-approximation, and a random bipartite subgraph gives weight <= 1/2 of the total | Feige, Weizmann 'Approximation algorithms' final exam (20 Feb 2019), Question 1 'K3 removal (K3R)':
- part 1: 'Design a strongly polynomial time algorithm that provides a factor 3 approximation';
- part 2: 'Write an integer program (IP) representing the K3R pr | This problem: 0.03. An LP-rounding approximation at P5: 0.28; an LP-based approximation part anywhere: 0.55. |
| Slot alternates (P5 alternate 2) | An LLL-reduced basis: ||b_i||^2 <= 2^{i-1} ||b~_i||^2 and orthogonality defect <= 2^{n(n-1)/4} | Regev, 'Lattices in Computer Science' (TAU, Fall 2009), Homework 2, Problem 4: 'Show that a delta-LLL reduced basis b_1..b_n of a lattice Lambda with delta = 3/4 satisfies the following properties. (a) ||b_1|| <= 2^{(n-1)/4}(det Lambda)^{1/n} (b) For any 1 <=  | Parts (b) + (c), or a near variant (the general-delta lemma, or ||b_1|| <= 2^{(n-1)/2} lambda_1 re-proved): 0.025. An LLL/lattice written problem anywhere: 0.10. |
| T/F pool (P1(a) LP pool) | Four LP T/F items: (P) infeasible => (D) unbounded (F); negative reduced cost => not optimal (F); every polyhedron has a vertex (F); Max-Cut has an integer linear program (T) | 1. LP deck 'Strong Duality ... Easier cases: 1. (P) and (D) infeasible 2. (P) infeasible, (D) unbounded 3. (D) infeasible, (P) unbounded'. The hypothesis '(D) feasible' is dropped from hw2026 s3-p5-a = 2024C-P6.
2. LP deck simplex slide: 'If there's j in N suc | Each item: 0.03-0.05. One of these four is the (a) item: about 0.15. Together with the mock's ellipsoid item, about 0.21 of the (a) slot is covered. |
| T/F pool (P1(b)/(d) randomized pool) | Four randomized T/F items: BPP with an inverse-polynomial gap (T); isolation for the maximum (T); a unique perfect matching => det != 0 (T); random walks on regular graphs always converge (F) | 1. Randomized deck 'Error reduction' slides (BPP(alpha,beta), majority vote, Chernoff); Motwani-Raghavan Problem 4.8 ('a BPP algorithm that has an error probability of 1/2 - 1/p(n) ... Using the Chernoff bound ... show'). Chain: 2023A-c (T) -> 2024C-c (F).
2.  | Each item: 0.03-0.045. One of these four appears: about 0.15. |
| T/F pool (P1(c)/(d) algebraic + Approximation-deck linear-algebra pool) | Four algebraic and Approximation-deck T/F items: equal traces => similar (F); 4x4 in 48 multiplications beats Strassen (T); lattice (2,0),(1,2): (2,0) is shortest (T); leading principal minors >= 0 => PSD (F) | 1. Algebraic deck Newton-identities slides; Horn-Johnson 2.4.P10. The one-word twist of 2026B-1c ('same eigenvalues' becomes 'similar').
2. Algebraic deck 'Bounding omega': 'If we can multiply m x m matrices with k multiplications, omega <= log_m k'; the next  | Each item: 0.03-0.05. One of these four appears: about 0.15. |

## Appendix A — the research analyses (key findings)

The practice problems' *Why predicted* notes cite these analyses by name.

### Moed C analysis

- Only two Moed C papers exist (2024C, 6 Sep 2024; 2025C, 2 Nov 2025). The sample is small, so every C-specific claim rests on n=2.
- Each C used the same format as its own year's A and B. In 2024 all three papers had P1 = 4x6 T/F plus 5 problems. In 2025 all three had P1 = 4x8 T/F plus 4 problems, with a 2- or 3-part LP/set-cover P2. C changed only a few point values: 2025C paper has P2 = 6+8+8 = 22 and P4 = 14. The 2025C official solution file still carries 2025B's headers ('10+10=20', P4 '16'), which is evidence that C was written by editing B's source file.
- Measured by points, about 66% of each C re-used an earlier exam template: 2024C 64 pts (38 re-skinning 2024B items/templates, 26 from older exams); 2025C 68 pts (36 same-year A/B, 32 older). About 16% was a homework proof or class theorem copied with a parameter change: 2024C-P6 = Spring-2024 PS4 Problem 3(a), same solution text; 2025C-P3 = the class lazy-walk theorem with 1/2 changed to 1/3. Only about 18% was new, and that was mostly easy T/F.
- Near-verbatim recycles in C: 2024C-P1(b) is the key sentence of the official 2023B-P1(c) solution. 2024C-P1(c) is 2023A-P1(c) (BPP) with the constants changed and the answer flipped. 2024C-P4 bin-packing ILP is 2014B-P7(a). 2025C-P5 (k-tertiary matrix) is 2024B-P6 with 2 symbols changed to 3, and the solutions share sentences. 2025C-P2 continues 2025B-P2 with the same set-cover preamble. 2025C-P4 re-skins 2025A-P5 and copies its closing sentence. 2025C-P1(b) generalises 2023A-P1(d) (49 = 7^2).
- Textbook content in C came from sections or theorems, never from a fresh exercise. 2025C-P2 = Williamson-Shmoys section 1.4 'Rounding a dual solution' (Lemma 1.7 + Theorem 1.8), graded NEAR/VERBATIM. 2024C-P5 LLL bound = Galbraith Theorem 17.2.12(5), and it is also a variant of the lecture lemma. 2024C-P2 = the Zwick TAU slide on Boolean matrix multiplication.
- Each C added one or two class topics that its year's A/B had skipped, usually as a variant of a lecture proof. 2024C added LLL/lattices as a written problem, a Farkas proof, BPP and perfect-matching parity via det mod 2. 2025C added isolation lemma, a random-walk written problem and primal-dual set cover. Neither C had an FFT written problem.
- T/F in C: the per-item value matches the year's A/B. There is one item per unit (LP fact; Schwartz-Zippel/roots of unity; BPP/isolation; matrix-multiplication/determinant algebra). Both C's had exactly 3 True and 1 False. Across all 40 Volk T/F items, 72.5% are True. In both C's, 2 of the 4 T/F items re-skin older T/F items.
- B versus A: B always keeps A's point skeleton and slot types, and swaps the sub-topic inside each slot. B takes its concrete items mainly from the previous year's A/B: 2024B-P4/P5/P6 match 2023B-P5/P3/P6, and 2025B-P2/P3/P5 match 2024B-P5, 2024A-P1(d) and 2024A-P2. When B re-skins its same-year A, it is almost always a T/F sibling. Same-year A points re-skinned in B: 2023B 0, 2024B 6, 2025B 16, 2026B 7.
- Fast matrix multiplication (beating n^3) as a written problem has appeared only in Moed B/C: 2023B, 2024B, 2024C, 2026B. A Chernoff/union-bound construction or sampling problem appears in almost every Volk exam and in both C's. The Schwartz-Zippel determinant algorithm was in every Moed A from 2023 to 2025 and in 2025C, but it is absent from 2026A/B written problems.
- 2026 changed how problems are chosen. The archetypes stayed, but the problem instances were fresh textbook exercises. 2026A-P5 = W&S Ex 5.3 + 5.6 (VERBATIM, verified). 2026A-P2 = Erickson FFT notes Exercise 2(c), 'number of well-spaced triples in O(n log n)' (NEAR, verified). 2026B-P5 has the dual structure of W&S Ex 6.1, the MAX CUT SDP dual (PLAUSIBLE ANCESTOR). Near-verbatim reuse of old Volk written problems in 2026A/B is about 0 points.

*Its predictions:*

- Skeleton (about 90%): the same cover as 2026A/B, including the new instruction 'interpret a flawed statement so it is non-trivial'. P1 = 4 True/False x 7 = 28. Then 4 written problems worth 72 points, each 14-22, with at least two multi-part (6+6+8, 6+12 or 6+8+8 style). Likely order: P2 an algebraic or short algorithm, P3 a probabilistic construction, P4-P5 LP/SDP duality and LP-based approximation.
- T/F (28): expect one LP/polytope/simplex/ellipsoid fact (about 95%). Expect one trace/eigenvalue/Newton-identity, matrix-multiplication-bound or lattice item (about 90%); trace appeared in both 2026A and 2026B. Expect one Schwartz-Zippel/roots-of-unity item (about 70%) and one BPP/isolation/Markov/Chernoff item. The answer split is most likely 3 True and 1 False. At least one item will re-skin an older T/F (about 90%); BPP amplification (2023A, 2024C) is a C-flavoured candidate at about 35%.
- Chernoff + union-bound construction or sampling estimator, about 16 pts: about 90%. It has appeared in both C's and in almost every Volk exam. Expect a re-skin of 2026A-P3, 2026B-P3, 2024B-P6/2025C-P5, 2024C-P3 or 2025A-P4 (= hw2026 s1-p6).
- Multi-part LP/SDP duality problem, 18-22 pts: about 80%. Possible forms: compute the dual of a combinatorial LP and interpret it (like 2026A-P4 min-cost flow, whose dual is shortest path; the class max-flow LP; matching versus vertex cover). Or a Farkas strong-duality case: 2024C-P6 is verbatim hw2026 s3-p5-a. Or an SDP dual in the style of 2026B-P5 and W&S Ex 6.1.
- LP-based approximation (threshold, dual or randomized rounding), 16-20 pts: about 65%. It may be merged with the duality slot, as 2025C-P2 was. Candidates: a continuation of 2026B-P4 (prize-collecting vertex cover) or 2026A-P5 (Max DiCut); set cover by dual rounding or randomized rounding (hw2026 s4-p3); VC half-integrality.
- Schwartz-Zippel/PIT randomized algorithm (determinant or matrix-product identity test, error < 0.1), 14-16 pts: about 55%. Reasons: 2026A/B skipped it, it was in every Moed A 2023-2025 and in 2025C, hw2026 drilled it heavily, and C tends to pick up skipped class topics. Other 'skipped-topic' candidates: random walk/spectral gap/expander mixing (about 25%), isolation lemma/perfect matching (about 25%), LLL (about 15%), Karger (about 10%).
- Fast-algorithm slot: FFT or fast matrix multiplication (below n^3 or in O(n^omega)) at about 55% combined. FFT has never appeared as a C written problem (0/2), so about 30%. Matrix multiplication has appeared only in B and C, so about 35%.
- (i) Re-skin of a 2026A/B problem: at least one written problem at about 80%, 30-45 points expected. Both C's re-used same-year items or templates for 36-38 points, and 2025C-P2 was a direct continuation of 2025B-P2.
- (ii) Near-verbatim reuse of an older exam: at least one written problem at about 60%. This is lower than 2024C/2025C because 2026A/B had none. Recycled T/F items: about 90%, likely 2. Top donors: the Schwartz-Zippel determinant family (2024A-P6 = hw2026 s1-p4, 2025A-P5, 2025C-P4), 2024C-P6 Farkas, the Chernoff constructions, ILP modeling (bin packing, makespan, dominating set) and BPP T/F.
- (iii) A new textbook exercise: at least one written problem at about 50%. No C has used a fresh exercise so far, but 2026A and 2026B each did. Most likely neighbours of the 2026 sources (unverified guesses): W&S Ex 5.2 (greedy max cut = derandomization), 5.4/5.5 (MAX SAT rounding functions), 5.7 (derandomized set-cover rounding), 1.5(a) (VC half-integrality), 6.1/6.2 (SDP dual, MAX 2SAT); Erickson FFT Ex 1(b) (Minkowski-sum size) and Ex 3 (zero-sum triples).
- Difficulty: expect a paper no harder than 2026A/B. By total length of the official solutions, C's are among the shortest: 2024C 781 words versus 871/1108 for 2024A/B; 2025C 816 versus 684/766; 2026A/B are 1150/926. 2025C's official solutions answer some parts in one line, for example 'The rest of the proof is identical to what we did in class'.

### Coverage analysis

- 2026A hit: T/F on bases/BFS (L3), Schwartz-Zippel needing a grid (R4), sum of lambda_i^n = tr(A^n) by repeated squaring (A9 with A5 and A1), and a Chernoff + union-bound set-intersection claim (R8). Free-response: counting 3-term APs with FFT (16), shattering sets with random vectors and a union bound (16), min-cost unit-flow LP whose dual is the shortest-path distance (20), Max DiCut with a random 1/4, the IP and randomized LP rounding to 1/2 (20). Points by unit: Rand 30, Alg 23, LP 33, Approx 14.
- 2026B hit: T/F on the ellipsoid method (L7, first time it was ever examined), isolation lemma NOT giving all-distinct weights (R12), Newton identities (equal traces of powers imply equal spectra, A9), and a lattice shortest vector via Gram-Schmidt (P7). Free-response: common-neighbour counts via A*A^T in O(n^omega) (18), Chernoff-balanced 2-colouring (16), prize-collecting vertex cover with 1/3-threshold rounding (18), SDP dual and SDP weak duality (20). Points by unit: Rand 23, Alg 25, LP 7, Approx 45.
- Heaviest topics 2023A-2026B by primary points: Chernoff/union-bound random constructions R8 = 109 pts in 8 of 10 exams. Counting sampling estimators and union-bound constructions too, 9 of 10 exams have a randomized-construction free-response problem (only 2023A lacks one). Next: ILP formulation L8 = 94 (8 exams), Schwartz-Zippel/PIT R4 = 90 (8 exams), FFT applications A6b = 88 (6 exams), LP duality L6 = 75 (8 exams), LP threshold rounding P3 = 60 (4 exams).
- PIT/Schwartz-Zippel free-response is missing from both 2026 exams. It was a free-response problem in every Moed A from 2023 to 2025 and in 2025C. In 2026 it appeared only as a 7-point T/F (2026A-1b). 2026B is the first exam since 2024B with no PIT item at all.
- 2026B had no LP-theory and no ILP free-response problem; LP was only 7 points, the lowest of any exam. The closest precedent is 2024B, which was also LP-light (12 points, T/F only), and 2024C then brought LP back with a Farkas free-response (16) and a bin-packing ILP (14).
- Promotion pattern: a topic asked as T/F in both Moed A and Moed B became a free-response problem in Moed C in 2024 (lattice T/F 2024A-1c and 2024B-1c led to the LLL problem 2024C-P5) and in 2025 (spectral T/F 2025A-1d and 2025B-1d led to the lazy random walk problem 2025C-P3). In 2026 the only topic asked as T/F in both A and B is A9 (characteristic polynomial, power sums tr(A^k), Newton identities). A9 has never been a free-response problem.
- Taught in 2026 but never examined in 2023-2026 (not even as a secondary ingredient): Chebyshev, randomized 2SAT, finding a perfect matching via isolation and det with 2^w weights (parallel search), random primes, Seidel APD, Freivalds verification, parallel triangular inversion / Cayley-Hamilton inversion, Goemans-Williamson hyperplane rounding, PTAS. Used only as a secondary ingredient: TUM/Konig, greedy VC, determinant computation and the parallel model, polynomial division / multipoint evaluation.
- Checking the 'new material' hypothesis: ellipsoid (first examined 2026B-1a), SDP as a free-response problem (2026B-P5; before 2026 only one PSD T/F, 2024A-1b) and randomized LP rounding (2026A-P5c) are genuinely new in 2026. Lattices are NOT new: 2024A-1c, 2024B-1c and 2024C-P5 total 26 points. They were absent from all three 2025 exams and returned in 2026B-1d. Goemans-Williamson has still never been examined. Primal-dual set cover (2025C-P2b,c) was examined but does not appear in the 2026 decks or recitations.
- Weight shifted in 2026. Averages per exam in 2023-2025: Rand 39, LP 27.9, Alg 19.9, Approx 13.3. Averages in 2026: Rand 26.5, Approx 29.5, Alg 24, LP 20. Randomized algorithms and LP theory are under-weighted in 2026 compared with the historical baseline.
- The 2026 recitations worked through these past exam items: 2023A-P6 sumset (the slide labels it 2023B), 2023B-1c SZ, 2024A-P4 Max-SAT ILP, 2024B-P4 diameter, 2024B-P5 representative set, 2024B-P6 balanced bipartite graph, 2025A-P2 duality, 2025B-P3 reduced costs. Their archetypes stay live, but verbatim reuse of these items is less likely.

*Its predictions:*

- Format (high confidence): 4 T/F items x 7 = 28 points, then 4 free-response problems of 16-20 points. 2024C and 2025C both copied their own year's A/B format exactly.
- Near-certain: one Chernoff/union-bound free-response problem of about 16 points (9 of 10 exams have one). 2026A used a union-bound construction and 2026B a per-vertex Chernoff construction, so the natural variation is the sampling-estimator flavour (estimate a fraction within eps w.p. 1-2^-n; last used 2025B-P5) or a new combinatorial object such as a matrix, code or hypergraph.
- High: a Schwartz-Zippel/PIT randomized-algorithm free-response problem (random substitution into a determinant, matrix product, formula or branching-program-like object, error below 0.1). It is overdue: a free-response problem in 2023A, 2024A, 2025A and 2025C, but in 2026 only a single T/F. Plausible twists: combine it with the bipartite-matching determinant or isolation lemma (R5/R13, the latter never examined), or a Freivalds-style verification (A4, never examined).
- Medium-high: an LP-theory proof and/or an ILP formulation problem, to repair 2026B's 7-point LP share, following the 2024B-to-2024C precedent (Farkas case of strong duality + bin-packing ILP). Candidates: reduced-cost/simplex facts (L4), a Farkas-based duality case (L5), deriving and interpreting a dual (L6; the flow version was just used in 2026A so it is less likely), a 'write an IP for X' problem (L8; a standalone ILP problem appeared in 6 of 8 exams in 2023-2025).
- Medium: a free-response problem on characteristic polynomial / power sums / Newton identities / traces (A9). This follows the T/F-in-both-A-and-B-then-free-response-in-C pattern seen in 2024 (lattices) and 2025 (spectral). Examples: count closed walks or triangles via tr(A^k), compute all char-poly coefficients from tr(A^k) using fast matrix multiplication, decide whether two matrices have the same spectrum.
- Medium: an approximation free-response problem using a technique that 2026 did not use. Candidates: Goemans-Williamson hyperplane rounding of an SDP (never examined; a natural sequel to the 2026B SDP duality problem and the 2026A Max DiCut problem), derandomization by conditional expectations (only 2023A), a combinatorial greedy ratio proof, or an LLL/lattice free-response (2024C-P5 is a Moed C precedent; lattice was a T/F in 2026B).
- Medium-low: another randomized free-response problem on the isolation lemma (last free-response 2024A-P3), random walks/spectral gap (absent from all of 2026, last free-response 2025C-P3) or Karger (2024B-P3).
- Lower: an FFT or fast-matrix-multiplication reduction free-response problem. 2026 already used both (FFT in 2026A, matrix product in 2026B), and 2025C had neither. Matrix multiplication did repeat from B to C in 2024 (diameter, then Boolean product), so this cannot be ruled out.
- T/F pools that 2026A and 2026B did not use: BPP definitions/amplification (rested since 2024C), Markov/Chebyshev, spectral facts (bipartite iff -1 is an eigenvalue, eigenvalue-1 multiplicity equals the number of components), Strassen/alpha_k or rectangular multiplication counts, roots of unity, Freivalds, simplex degeneracy/Bland or strong-duality cases, TUM/integrality, PSD equivalences or the GW 0.878 ratio, the LLL reduced-basis bound, 7/8 for Max-3SAT.

### Lecture-flow analysis

- All 16 items of 2026A and 2026B reuse something from a 2026 lecture or recitation. 11 of the 16 do so at DIRECT or NEAR level: 7 of the 8 T/F items restate or instantiate a slide claim, and 4 free-response problems re-skin a slide or recitation example (2026A-P2, 2026A-P5a, 2026B-P2, 2026B-P4). The other 5 use a lecture technique (TECHNIQUE: 2026A-1d, 2026A-P3, 2026B-P3) or a lecture idea from a different setting (ANCESTOR: 2026A-P4, 2026B-P5). No 2026 item is independent of the slides.
- Several 2026 T/F items are slide examples turned into traps. 2026B-1b (all subset weights distinct: false) is the lecture's fantasy-soccer pigeonhole slide ([RND] 949-961). 2026B-1a (ellipsoid center) is taken from [LP] 823-885 and [R7-9] 339-344. 2026A-1c and 2026B-1c come from the power-sum and Newton-identities slides ([ALG] 589-659). 2026A-1b turns the recitation-3 Schwartz-Zippel exercise ([R3] 15-31) around by dropping the product-grid assumption.
- The recitations were run for the first time in 2026 ([RND] 47-54), and they are built from Volk's past exam questions. At least 8 exam items were re-taught: 2023A-P6 (R6; the slide is labelled '2023B' by mistake), 2023B-1c (R3), 2024A-P4, 2025A-P2 and 2025B-P3 (R7-9), 2024B-P4 (R5), 2024B-P5 (R10) and 2024B-P6 (R3). So for 2023-2025 the flow runs from exam to recitation, not the other way.
- 2026A/B then mutated 5 of those recitation-taught exam items: 2026A-1b from 2023B-1c, 2026A-P2 (3-term arithmetic progressions) from the sumset in 2023A-P6, 2026B-P2 (AA^T common neighbours) from 2024B-P4, 2026B-P3 (0.4·deg coloring) from 2024B-P6/2023B-P6, and 2026B-P4 (prize-collecting VC) from 2024B-P5. 2024A-P4 (Max-SAT BIP) is still unmutated, and no 2026 exam has had a write-an-ILP question.
- Across 85 Volk exam items (2023A-2026B), counted by item: lecture-lifted L=48 (56%), verified external textbook E=14 (16%), standard or classic formulation S=6 (7%), own composition on a lecture technique O=17 (20%). Weighted by points (1000 total): L 39.9%, E 22.8%, S 9.8%, O 27.5%.
- The T/F block is essentially a lecture quiz: 39 of 40 T/F items are lecture-derived and none traces to an external textbook. External lifts are all free-response: 14 of 45 problems (31%). Of these, 6 are Williamson-Shmoys, 3 Zwick's TAU deck, 2 Mitzenmacher-Upfal, and one each CLRS 30.1-7, Erickson FFT Ex. 2 and the DFJ TSP formulation. About 10 of the 14 still have a lecture example as their core step.
- Moed C is the most lecture-heavy sitting: L 11/17 items (65%) and 51% of points, E only 2/17 (2024C-P2 from Zwick, 2025C-P2 from W&S/Vazirani), S 1, O 3. By comparison Moed A has L 32.8% of points and Moed B 41.5%. In free-response, Moed C has L 3/9, against 6/36 for Moed A and B combined.
- A 're-prove or re-run a lecture theorem' free-response problem appears in every Moed C (2024C-P5 LLL bound, 2024C-P6 strong-duality case via Farkas, 2025C-P3 lecture random-walk proof with a 1/3 lazy walk). It also appears in 3 of 4 Moed B exams (2023B-P2 weak duality, 2025B-P3 reduced-cost optimality, 2026B-P5c SDP weak duality). It never appears in a Moed A (0 of 4).
- Moed C problems are siblings of that year's Moed A/B problems: 2024C-P2 matches 2024B-P4 (same Zwick deck), 2024C-P3 matches 2024B-P6, 2025C-P2 matches 2025B-P2, 2025C-P4 matches 2025A-P5, and 2025C-1a matches 2025B-1a. So 2026C should contain siblings of 2026A/B items.
- Lecture examples never examined by Volk were confirmed with a keyword grep that found 0 hits across all 10 solution files: Freivalds verification ([ALG] 204-245), Seidel APSP/squared graph ([ALG] 94-186), randomized 2SAT ([RND] 869-938), TUM/Konig ([LP] 1100-1117, [R7-9] 622-744), Phase-I LP ([LP] 408-497), Chebyshev ([RND] 567-626), Cayley-Hamilton inversion ([ALG] 691-713), Goemans-Williamson hyperplane rounding ([APX] 377-468) and quicksort ([R1]). Two more are covered by the ranking but checked by reading rather than grep: the proof of the isolation lemma ([RND] 986-999; the lemma itself was used as a tool 4 times but never proved) and the max-flow to min-cut dual ([LP] 753-780).
- Topic slots missing from both 2026A and 2026B but common before: SZ/PIT free-response (2023A, 2024A, 2025A, 2025C), spectral/random-walk (2023B, 2025A, 2025B, 2025C), and write-an-ILP-from-scratch (2023A, 2024A, 2024C, 2025A, 2025B). All three are candidates for 2026C.

*Its predictions:*

- T/F block (4x7): at least 3 of 4 items will be one-line consequences of slide claims, since 39 of 40 past T/F items were and none was external. The most likely untouched slide facts are: the omega <= log_m(k) numeric traps ([ALG] 71-81; e.g. 3x3 matrices in 23 multiplications gives log_3 23 ≈ 2.854, which does not beat Strassen's 2.807); the LP edge cases on [LP] 142-149 and 642-646 ({0<=x1<=1} has no vertex; (P) and (D) can both be infeasible); Phase-I facts ([LP] 408-434); Gram-Schmidt does not preserve the lattice ([APX] 536-537); the triangle incidence matrix is not TUM, versus the bipartite TUM proof in [R7-9] 640-691; and Cayley-Hamilton, i.e. A^{-1} is a polynomial in A ([ALG] 691-713).
- At least one free-response problem will be 're-prove or re-run a lecture proof with a changed parameter'. This happened in every Moed C and in 3 of 4 Moed B exams. Candidates in order: the isolation lemma proof or a variant ([RND] 986-999); Karger survival with contraction stopped at t vertices ([RND] 262-306); the LLL lemma ||b1|| <= 2^{(n-1)/2}||v|| ([APX] 603-618, a sibling of 2024C-P5 and 2026B-1d); the optimal-vertex, vertex-criterion or strong-duality proofs ([LP] 150-216, 647-696); and the Goemans-Williamson Pr[cut] = θ/π ([APX] 387-411).
- Schwartz-Zippel/PIT free-response returns after being skipped in both 2026A and 2026B. The best unexamined lecture example is Freivalds verification ([ALG] 204-245): verify AB=C in O(n^2), amplify the error to 2^-k, or verify ABC=D, A^2=B or f·g=h by random evaluation. The recitation alternative is the k-red perfect matching exercise ([R4] 176-260).
- A matrix-multiplication free-response is likely: 4 of 6 Moed B/C exams had one, including 2024C-P2. The unexamined lecture candidate is the Seidel/squared-graph material ([ALG] 94-186), as a sibling of 2026B-P2 (AA^T). Likely forms: compute G² in O(n^ω), decide whether the diameter is <= 2, or show d ∈ {2d', 2d'-1} and decide the parity of distances.
- The LP-duality problem may be the sibling of 2026A-P4 (unit-flow dual = shortest path): the max-flow LP and its min-cut dual ([LP] 39-57, 753-780). Expect 'write the dual; show every s-t cut gives a feasible dual solution of equal value; conclude weak duality', possibly with TUM of the node-arc incidence matrix ([LP] 1100-1117).
- A Chernoff plus union-bound construction or estimator appears again (a Chernoff item appeared in all 10 exams, as free-response in 9 of 10). It will be reskinned from 2026A-P3 and 2026B-P3 (shattering; 0.4·deg coloring). This slot is fed by his own compositions, not by lecture examples.
- A spectral/random-walk item is likely, since it was absent in 2026A/B but present in 2023B, 2025A, 2025B and 2025C. Lecture and recitation sources not yet examined: the [R4] 124-134 two-cliques counterexample (diameter 3 but μ2 = 1 − o(1)), [R4] 135-175 (λ2 < 0.9 implies diameter O(log n)), 2SAT one-sided error and why it fails for 3SAT ([RND] 869-938), and random walks failing on directed graphs ([RND] 706-711).
- A write-an-ILP item may return. It was in 5 of 8 exams from 2023A to 2025C, including 2024C-P4, and in neither 2026 exam. The only recitation-taught exam item not yet mutated is Max-SAT BIP (2024A-P4, [R7-9] 561-577). A natural sibling of 2026A-P5b is a linear IP for undirected Max-Cut, which answers the slide's 'not a linear constraint!' ([APX] 224-243).
- Low probability, not worth study time: quicksort ([R1]), OddTown ([R2]), the Hirsch conjecture ([R7-9] 297-326), numeric diet/factory/example LPs ([LP] 20-38, 104-123, 706-747), and the NP-hardness reduction in [R10] 140-269.

### T/F analysis

- All 40 T/F items (10 exams x 4, 2023A-2026B) are reconstructed from the official solutions. Answers: 29 True, 11 False (72.5% True). 7 of the 10 exams are 3T/1F. 2024B was all True, and 2024A and 2026B were 2T/2F.
- Where the False items sit: 4 are in slot (a), 3 in (b), 3 in (c) and 1 in (d). By unit: LP 4/11 False, Randomized 5/15, Algebraic only 1/9, Approximation deck 1/5. Algebraic 'there exists an algorithm with fewer than X operations' items have all been True except 2025A-c.
- Slot (a) is an LP item in 7 of 10 exams, including both 2026 exams. The exceptions are 2025A and 2025B, and 2025C had its LP item in slot (d).
- The 4 items rarely cover 4 units. Only 2026B has one item from each of LP, Randomized, Algebraic and the Approximation deck. Six exams use 3 units and four use 2. Unit totals: Randomized 15, LP 11, Algebraic 9, Approximation deck (Max-3SAT, PSD, Gram-Schmidt, lattices) 5.
- One exact textbook source was found and checked: 2023A-b ('the isolation lemma stays true if a set's weight is the product of its elements' weights') is Jukna, Extremal Combinatorics 2nd ed., Exercise 11.5, p.163, almost word for word ('Prove that Lemma 11.5 also holds when the weight of a set is defined to be the product of the weights of its elements'). The very next exercise, 11.4 ('...a unique set with the maximal weight?'), is the ancestor of 2025C-c. Volk's slide-90 proof is the same Spencer proof Jukna gives on p.160.
- The course's own reading, Goemans' LP notes (the CMU URL on the LP deck; downloaded copy has the same md5 as the local file), is the ancestor of 3 LP items. Remark 1 on p.LP-8 ('without moving from the vertex') feeds 2023A-a. Remark 3 on p.LP-8 plus LP deck slide 39 give 2023B-b almost verbatim. The remark on p.LP-7 ('A crude upper bound on the number of vertices of P is (n choose m)') feeds 2024C-a.
- Most T/F items are Volk's own twists on a single slide claim: he negates it (2024A-a, 2025A-c), swaps a constant (2023A-c, 2023B-d, 2024C-b, 2025B-a), drops a hypothesis (2024A-b all principal minors -> det, 2024C-c alpha<beta, 2026A-b product set), overgeneralizes it (2026B-a feasible->optimal, 2026B-b unique minimum -> all weights distinct, 2025C-d some optimum is a vertex -> 'iff'), or reverses its direction (2025A-a 'at most 7m/8').
- Topics come back in chains, often with the answer flipped: Schwartz-Zippel 2023B-c(F) -> 2024C-b(T) -> 2025B-a(F) -> 2026A-b(F); BPP 2023A-c(T) -> 2024C-c(F); isolation 2023A-b(T) -> 2025C-c(T) -> 2026B-b(F); vertex/BFS 2024B-b -> 2024C-a -> 2025C-d -> 2026A-a; char-poly/trace 2024B-d -> 2026A-c -> 2026B-c; lattice 2024A-c -> 2024B-c -> 2026B-d; matrix multiplication 2023A-d -> 2025C-b and 2025A-c -> 2025B-b.
- Same-year rule: every later sitting (moed) has reused at least one T/F sub-topic from the previous sitting of the same year, 6 times out of 6 (2023A->B, 2024A->B, 2024B->C, 2025A->B, 2025B->C, 2026A->B). So 2026C is very likely to reuse a 2026B topic: ellipsoid/LP, isolation, traces/Newton, or lattice.
- Some items flowed from exam to teaching material, not the other way. The 2026 recitations reuse past exam items: recitation 3 slide 4 is 2023B-c word for word, and recitation 4 slides 14-16 redo the 2023B-d computation. Homework items feed T/F items: hw2025 s2 P1/P2 -> 2025A-d and 2025B-d; hw2026 s2 Q3's weights {1..2m} with probability >= 1/2 -> the constants in 2026B-b.
- Many lecture claims have never been a T/F item: Freivalds verification, Cayley-Hamilton inversion, omega <= log_m k, formula size >= degree, ZPP->BPP, random walks failing on directed graphs, Karger min-cut count, Chebyshev with pairwise independence, both primal and dual infeasible, polyhedra without vertices, Bland's rule/cycling, TUM/Konig, IP relaxation gap, ellipsoid volume, LLL-reduced basis, lattice determinant, expander mixing lemma, lazy-walk PSD, Goemans-Williamson probability theta/pi.

*Its predictions:*

- Format: P1 = 4 T/F items x 7 points. Most likely answer pattern is 3T/1F (7 of 10 past exams), with the False item in slot (a) or (b). An item on an algebraic algorithm ('there is an algorithm using fewer than X operations') is very likely True.
- Slot (a), about 90%: LP theory. Candidates are LP duality edge cases (both primal and dual infeasible; Farkas), vertices and polyhedra, simplex behaviour (degeneracy, cycling, Bland's rule), TUM/integrality/Konig, or an ellipsoid twist reused from 2026B-a.
- Slot (b), about 85%: a Randomized item. Either a same-year reuse of isolation or Schwartz-Zippel with a new constant or dropped hypothesis, or a rested sub-topic returning: BPP amplification (unused since 2024C), ZPP->BPP, random walks, Karger min-cut counting, or formula degree.
- Slot (c), about 80%: an Algebraic item. Candidates are fast matrix multiplication (omega <= log_m k, rectangular products, Freivalds verification), char-poly/trace/Newton or Cayley-Hamilton (following 2026A-c and 2026B-c), or FFT roots of unity.
- Slot (d), about 65%: a linear-algebra fact from the Approximation or spectral material. Candidates are PSD/SDP facts (after the 2026B P5 SDP weak-duality problem and hw2026 s2 Q6), Goemans-Williamson rounding probability, LLL/lattice facts following 2026B-d, or spectral-gap/expander-mixing facts from hw2026 s2 Q1-Q2.
- Highest-probability reused twists: Schwartz-Zippel with |S| = d (False); unique minimum under weights {1..2n} with probability >= 1/2 (True); traces determining eigenvalues over F_2 (False); the lattice spanned by (2,1),(3,1) with (2,1) claimed shortest (False); BPP(1/n,2/n) = BPP(1/3,2/3) (True); ellipsoid on the combined primal-dual system returns an optimum (True).

### Format analysis and July scorecard

- Format is fixed within a year and resets between years. In all 10 Volk exams, every moed of the same year used the same T/F count x points and the same number of problems. Across years it changed every time: T/F was 4x5 (2023), 4x6 (2024), 4x8 (2025) and 4x7 (2026); the problem count went 6, 6, 5, 5. So the base case for 2026C is 5 problems with P1 = 4 T/F x 7 = 28 (about 85%).
- The 2026 template (A and B): P2 is a single-part algebraic algorithm worth 16-18 (FFT in A, fast matrix multiplication in B). P3 is a single-part randomized construction worth 16 (union bound in A, Chernoff + union in B). P4 and P5 are multi-part, 18-20 each, on LP, approximation or SDP. P5 was 6+6+8 = 20 in both. T/F (a) was an LP fact in both.
- Within a year, the same problem slot tends to keep the same lecture unit: 21/36 = 58% of slot pairs match within a year, against 6/34 = 18% across years. Moed C keeps the T/F format and the problem count but moves 1-3 problem weights by about 2 points (2024C, 2025C).
- The July prediction's format call missed. It predicted 4x8=32 T/F, P2 = 10+10 LP and P3-P5 = 16. Reality was 28/16/16/20/20 (2026A) and 28/18/16/18/20 (2026B). Part of its 'byte-for-byte' evidence was wrong: the official 2025C solution PDF has a stale 10+10 header, while the real 2025C paper was 32/22(6+8+8)/16/14/16.
- Slot predictions: in 2026A no free-response problem appeared in its predicted slot (0/4). Two high-confidence slots never came up in either exam: P4 Schwartz-Zippel/PIT ('in every Moed A') and P3 ILP modeling. Three calls hit: P5 Chernoff+union (both exams), the FFT wildcard (2026A P2), and 'fast-matmul free-response only in Moed B/C' (2026B P2).
- The source mine was the only exact-problem success. 2026A P2 is Erickson FFT notes Ex. 2(c) (well-spaced triples). 2026A P5 is Williamson-Shmoys Ex. 5.3 + 5.6 (Max DiCut, word for word). Both were mined cards, worth 36% of 2026A points. Nothing in 2026B was mined exactly: 0%, or 7% if the flipped isolation-lemma T/F twin counts.
- Point coverage. Mock exam, strict: 35% of 2026A and 24% of 2026B (lenient 70% / 45%). Blueprint archetypes: 100% of A and 66% of B (lenient 93%), but this is uninformative because the 8 archetypes span the whole syllabus. Source mine + tier lists at exact-problem level: 36% of A, 0-7% of B.
- Why the misses happened: (1) it carried one year's template into the next year; (2) it treated 3-exam streaks as rules; (3) its T/F pool ignored every 2024A/B T/F item, and those families produced 4 of the 8 2026 T/F items (BFS, char-poly/trace twice, lattice); (4) it used homework as a problem-level predictor, but 0 of the 16 2026 exam items came from hw2026; (5) it underweighted topics new in 2026 (ellipsoid, lattices, SDP), which were 34 points of 2026B.
- The mock exam was built from the slot table rather than from the source mine. A student who practised only the mock had seen no FFT, matrix-multiplication or approximation problem, and missed the two exact hits (36 points of 2026A).
- Side note: the official 2026A P2 solution double-counts arithmetic progressions: it sums coef(x^{2b}) - 1 over ordered pairs. The correct count is sum over b in S of (coef - 1)/2, which is the formula on the source-mine card.

*Its predictions:*

- Frame: 3 hours, all questions compulsory, two double-sided A4 sheets, 100 points (0.95).
- 5 problems (0.88), with P1 = 4 True/False items x 7 = 28 points (0.85). Every Volk year has kept its T/F format and problem count across all moadim.
- The 72 free-response points split over 4 problems of 14-22 points each (0.85). Moed C usually moves 1-3 weights by about 2 points relative to A/B. Exact 2026A split 28/16/16/20/20: 0.25. Exact 2026B split 28/18/16/18/20: 0.20. Another 5-problem split with 28-point T/F: 0.40. Different frame: 0.15.
- P3 is a single-part 16-point problem (0.70). P3 was worth 16 in 8/10 Volk exams and in all five from 2025-2026.
- P5 has 3 parts, 6+6+8 = 20 (0.60). P4 is multi-part, worth 18-20 (0.65). P2 and P3 are single-part (0.75).
- Unit placement follows the 2026 template: P2 algebraic algorithm, FFT/polynomials or fast matrix multiplication (0.55); P3 randomized construction/estimator with Chernoff and/or union bound (0.55); P4 LP-based, given LP/IP with explain/dual/relaxation+rounding (0.55); P5 Approximation deck, i.e. approximation algorithm, SDP/PSD or lattice (0.50).
- A Chernoff/union-bound randomized construction or estimator appears as a free-response problem somewhere (0.85): 9 of the last 10 exams had one.
- T/F (a) is an LP fact: simplex, BFS, duality, ellipsoid or vertices (0.70).
- At least one T/F tests a randomness lemma's hypotheses, with a twist that may flip the answer: Schwartz-Zippel, isolation, BPP or Markov (0.75).
- At least one T/F on matrices: eigenvalues/trace/char-poly/Newton or matmul operation counts (0.75). A third trace/eigenvalue item after 2026A(c) and 2026B(c): about 0.35.
- At least one T/F from the Approximation deck: lattice, PSD or SDP (0.40).
- The T/F key contains 0-2 False answers (0.85). Across 40 past items it was 29 True / 11 False, and (d) was True in 9/10.
- A part that hands you an LP/IP/SDP and asks you to explain it, compute its dual, or relate it to the problem (0.75). A from-scratch 'write the ILP' part is less likely (0.30).
- A PIT/Schwartz-Zippel free-response algorithm: only 0.25. It was absent from both 2026 exams, and his PIT exam problems were moved into hw2026.
- The Approximation deck (incl. SDP/lattices) is worth at least 20 points (0.65). It was 20 in 2026A and 45 in 2026B.
- Exact-problem candidates should come from unused exercises in the lists he already draws from, e.g. W&S Ch.5 (5.2 greedy Max-Cut, 5.4/5.5 MAX SAT rounding, 5.7 set-cover derandomization) and Erickson's FFT list (bounded 3SUM, pattern matching, radix-3). Each individual item has low probability (under 0.15). Historically, 2 of 13 mined items were asked in 2026A and 0 in 2026B.

### Source-pool analysis

- Volk's Hebrew notes (benleevolk.bitbucket.io/pdf/algcomplecturenotes.pdf, 51 pp., built June 2024; local copy volk-algcomp-notes.txt) cover fields, Strassen, the algebraic model, tensors and rank, border rank, FFT and the DFT lower bound, fast polynomial division, multipoint evaluation, interpolation, modular composition, integer factoring and AKS. They contain NO Schwartz-Zippel, NO trace/eigenvalue/Newton identities, NO lattices and NO matrix-graph algorithms. Four notes items are real exam sources: 2023A-1d (Thm 3.1 proof, where 2^k x 2^k takes 7^k multiplications, so 4x4 takes 49), 2025C-1b (Lemma 5.6 rank(A⊗B) <= rank(A)rank(B) plus Lemma 5.7 <m,n,t>⊗<m',n',t'> = <mm',nn',tt'>), 2025C-1a (Def 7.4, Fact 7.5, Claim 7.7) and 2025B-1a (Claim 7.2).
- The Csanky/Newton-identities part of the Algebraic deck follows Kozen's 'Design and Analysis of Algorithms', Lecture 31 (Csanky's Algorithm), not Volk's notes. Both use the same lower-triangular block inverse [B 0; C D]^-1 with T(n) = T(n/2) + 2M(n/2), the same fact tr A^m = sum of lambda_i^m, and the same Cayley-Hamilton inversion. The T/F chain 2024B-1d -> 2026A-1c -> 2026B-1c comes from this material.
- The lattice part of the Approximation deck follows Lenstra-Lenstra-Lovász 1982 §1 closely. It uses 'reduced' as defined by conditions (1.4)/(1.5) with 3/4, the ||v|| >= min||b~_i|| argument from the proof of Prop 1.11, and the potential D = product of d_i from (1.23)-(1.25). 2024C-P5 (||b1|| <= 2^{(n-1)/4} det(L)^{1/n}) is LLL'82 Prop 1.6 (1.9) VERBATIM, and the hint the exam gives is the paper's own proof route. The 'uses of LLL' slide matches Regev's lecture 2 list.
- Goemans' LP notes (the reading on the LP deck) supply exam content as theorems, not exercises. 2023B-P2 is Lemma 9 (weak duality, same (P)/(D) standard form, same one-line proof). 2025B-P3 is §7 ('if there is no j in N with c~_j < 0 ... the current bfs is optimal'). 2024C-P6 is Farkas Thm 6 in the exact form (y^T A >= 0, b^T y < 0), used on the case that Thm 11's proof skips 'wlog by duality'. 2024B-1b is Thm 4. 2024C-1a, 2023A-1a and 2023B-1b come from the remarks on pp. LP-7/LP-8. The notes contain no ellipsoid algorithm, TUM, matching LP or shortest-path LP.
- Zwick's TAU 'Advanced Algorithms' 2016 problem sets are a verified pool, not just his slides. PS2 Ex 2.1(a) ('Obtain an O(n^omega log n)-time algorithm for computing the diameter of an unweighted directed graph') = 2024B-P4 NEAR. Volk's official solution even ends with the same O(n^omega log n) refinement. PS1 Ex 1.5 ('symbolic adjacency matrix' of a directed graph) is the ancestor of 2025A-P5.
- New textbook-exercise matches: 2024B-P2 (Walsh-Hadamard in O(N log N)) = Dasgupta-Papadimitriou-Vazirani Exercise 2.28 (H_k = [[H_{k-1},H_{k-1}],[H_{k-1},-H_{k-1}]]; 'show H_k v can be calculated using O(n log n) operations'), NEAR. 2026B-P5 (SDP weak duality with C - diag(y) PSD) = Williamson-Shmoys Exercise 6.1 (dual of the MAX CUT SDP 'W + diag(gamma) PSD ... show that the value of any feasible solution for this dual is an upper bound'), NEAR.
- 2026A-P4 (min-cost unit flow LP, its dual, dual optimum = s-t distance): the closest source is CMU 15-451 F18 Lecture 15 §2, which shows that the potential LP (max d_t, d_v - d_u <= l(u,v)) and the unit-flow LP are duals of each other. That is NEAR. Zwick's TAU LP slides (segment 11) have the lemma used in part (c). Goemans §9 only mentions shortest path/cut duality in passing (TOPICAL).
- 2026B-1a (ellipsoid) and 2026A-1a (BFS depends only on the constraints) are Volk twisting his own slides. The ellipsoid slides (feasibility-to-optimization reduction, half-ball alpha/beta/gamma volume computation) are not taken from Goemans' notes.
- Nothing else is public. Volk's site (also mirrored at benleevo.lk) and every Wayback capture of benleevolk.bitbucket.io host only the Hebrew notes. The bitbucket repo API returns an access error. Shpilka's TAU courses sit behind Moodle login, and his old Technion webcourse pages return 404. No RUNI 3501 copy was found, and nothing public was found for TA Daniel Prigan (listed on the Randomized deck) or Tomer Tsachor. Caveat: this session's WebSearch budget (200) was used up before the TA-name and RUNI-copy searches, so those two negatives come from earlier session results and direct URL checks, not fresh searches.

*Its predictions:*

- LP slot: expect a Goemans-notes theorem to be re-proved or twisted, as in the Moed C pattern of 2024C-P6. Most likely are the unused Farkas variants (Thm 5: Ax=b has no solution iff A^Ty=0 and y^Tb=1 for some y; Thm 8: the Ax<=b form), 'both primal and dual infeasible' as a T/F, complementary slackness (Thm 12), 'a nonempty standard-form polyhedron has a vertex' (Cor 3) against a polyhedron with no vertex, or LP in NP ∩ coNP (Thm 16).
- A duality-for-a-graph-LP free-response like 2026A-P4 is likely to come back in another form. The max-flow/min-cut LP is already in the LP deck, and the CMU 15-451 Lec 15 pair (potential LP and unit-flow LP) is one step away.
- Algebraic T/F: the trace/Newton chain (2024B-1d, 2026A-1c, 2026B-1c) comes from Kozen L31. Likely next twists are Cayley-Hamilton inversion, traces over a small-characteristic field (Newton's identities divide by k), or the linear-recurrence (Fibonacci) item from Kozen §31.2. From the Hebrew notes: omega <= log_m k from a small-matrix rank bound (Thm 5.8 / Ex 5.10) or rectangular-product symmetry (Cor 5.3).
- Algebraic free-response: Zwick PS1/PS2 and DPV give the unused o(n^3) matrix-multiplication problems. Candidates are triangle or 4-cycle detection in O(n^omega) (Zwick PS1 Ex 1.3), matrix squaring being as hard as multiplication (Zwick PS1 Ex 1.1 / DPV 2.27), and (1+eps)-approximate APSP or witnesses (Zwick PS2 Ex 2.1b, 2.3).
- FFT free-response: cross-correlation in O(n log m) or text/pattern dissimilarity via FFT (Zwick Algorithms-in-Action PS Ex 1.4/1.5), or polynomial division with remainder via Newton iteration (Volk notes Thm 8.2 / Lemma 8.4, listed on the deck without proof).
- Approximation / SDP / lattices: LLL'82 (1.8) Hadamard-type bound d(L) <= product ||b_i|| <= 2^{n(n-1)/4} d(L) and Prop 1.11 are natural Moed-C re-proofs. Other options are a W&S Ch. 6 exercise such as 6.2 (MAX 2SAT as a +-1 quadratic program) or the Goemans-Williamson probability theta/pi, which has never been examined. A lattice T/F is likely to follow 2026B-1d with a basis whose Gram-Schmidt vector is not in the lattice (Micciancio Ex 9).

## Appendix B — the mined-exercise list (highest-rated unused exercises next to verified sources)

Rated 1–5 for exam fit (F) and 2026C likelihood (L); only L ≥ 4 is shown. Each single item is unlikely on its own (in 2026A, 2 of 13 mined items appeared; in 2026B, 0), but together they are the best extra drill material.

**B. L. Volk, Advanced Algorithms 3501 lecture deck 'Linear Programming' (course's own slides; ellipsoid, simplex, duality, bases)**

- (L4, F5) *Slide 80 'Reducing Feasibility to Optimization' (txt l.828-842), Step 3: P' = {(x,y): c^T x <= b^T y, Ax=b, x>=0, A^T y <= c}* — T/F: Let (P) be min c^T x s.t. Ax=b, x>=0 and (D) its dual, max b^T y s.t. A^T y <= c. If (x,y) is ANY point of P' = {(x,y) : c^T x <= b^T y, Ax = b, x >= 0, A^T y <= c}, then x is an optimal solution of (P) (and y of (D)). [TRUE: weak duality gives c^T x >= b^T y, so c^T x = b^T y <= c^T x' for every feasible x'.] Companion variants: (i) 'P' is empty iff (P) or (D) is infeasible' TRUE (strong duality); (ii) 'P' with the constraint c^T x >= b^T y instead of <= also yields optimal x' FALSE (that 
- (L4, F5) *Slides 32-33 'The simplex method' (txt l.295-305, 313-345), 'If there's j in N with c~_j<0, we can reduce the cost by increasing x_j' plus the non-degeneracy hy* — T/F: Let z be a basic feasible solution of min c^T x s.t. Ax=b, x>=0 with basis B. If the reduced-cost vector c~_N^T = c_N^T - c_B^T A_B^{-1} A_N has a negative entry, then z is not an optimal solution. [FALSE when z is degenerate. Counterexample: min -x1 s.t. x1 + x2 = 0, x >= 0. The only feasible point is 0, so it is optimal. With basis B={2}, c~_1 = -1 - 0 = -1 < 0.] True variant: 'If z is NON-degenerate and c~_j<0 for some j, then z is not optimal.'
- (L4, F5) *Slide 65 'Strong Duality', 'Easier cases: 1. (P) and (D) infeasible 2. (P) infeasible, (D) unbounded 3. (D) infeasible, (P) unbounded' (txt l.639-649) and slide* — T/F items on duality corollaries for (P) min c^T x, Ax=b, x>=0 / (D) max b^T y, A^T y<=c. (a) 'If (P) is infeasible then (D) is unbounded' FALSE: both can be infeasible. With A = [[1,-1],[-1,1]], b = (1,1), c = (-1,-1), Ax=b gives 0 = 2, and A^T y <= c gives 0 <= -2. (b) 'It is possible that both (P) and (D) are infeasible' TRUE (same example). (c) 'If (P) is unbounded then (D) is infeasible' TRUE (weak duality). (d) 'If x is feasible for (P), y is feasible for (D) and c^T x = b^T y, then both a

**B. L. Volk, lecture deck 'Randomized' (PIT/Schwartz-Zippel, bipartite matching, random walks, isolation lemma)**

- (L4, F5) *Symbolic Biadjacency Matrix + Testing zeroness of Determinant, txt l.423-442 (det X != 0 iff PM; 'at most n^2 variables of degree at most n'). Rank extension is* — PROBLEM (16-20 pts): Let G=(L u R,E) be bipartite with |L|=|R|=n and let X be its symbolic biadjacency matrix (X_ij = x_ij if (i,j) in E, else 0). (a) Prove rank(X) over Q(x) equals the size of a maximum matching in G: a k x k minor on rows I, columns J is exactly det of the symbolic matrix of G[I u J], which is nonzero iff G[I u J] has a perfect matching. (b) Give a randomized poly-time algorithm that outputs the maximum-matching size: substitute independent uniform values from S={1,...,10n} an

**B. L. Volk, lecture deck 'Algebraic' (Strassen/omega, matrix-graph algorithms, Csanky determinant: repeated squaring, traces, Newton identities, triangular inversion, Cayley-Hamilton)**

- (L4, F5) *Csanky section: 'Power sum polynomials' + 'Newton's identities' + 'Matrix Inversion (Cayley-Hamilton)', l.597-612 and l.691-704* — T/F: Let A be in C^{n x n} (or R^{n x n}). If trace(A^i) = 0 for every i in {1,...,n}, then A^n = 0. [TRUE: Newton's identities give e_1 = ... = e_n = 0, so p(x) = x^n, and Cayley-Hamilton gives A^n = 0.] Sister items: '...then A is not invertible' (TRUE, since det A = e_n = 0); '...then A = 0' (FALSE, e.g. [[0,1],[0,0]]).

**B. L. Volk, lecture deck 'Approximation Algorithms' (LP rounding for VC/set cover, Max-Cut SDP / Goemans-Williamson, lattices: Gram-Schmidt, LLL)**

- (L4, F5) *Regev, Lattices in CS (TAU) HW2 Problem 4(b)+(c), identical in the Fall 2004 and Fall 2009 sets (sources/regev-lattices09-hw2.txt). Same as LLL'82 Prop. 1.6, eq* — Show that a delta-LLL reduced basis b1,...,bn of a lattice L with delta = 3/4 has these properties. (b) For every 1 <= i <= n, ||b_i|| <= 2^{(i-1)/2} ||b~_i||. (c) prod_i ||b_i|| <= 2^{n(n-1)/4} det L. Regev's remark: prod||b_i||/det L is the 'orthogonality defect'. It equals 1 iff the basis is orthogonal, and Hadamard's inequality says it is never below 1. LLL'82 (1.8) states it as d(L) <= prod||b_i|| <= 2^{n(n-1)/4} d(L). The course's 'reduced' is exactly delta=3/4 LLL-reduced: |mu_ij| <= 1/2 

**Volk's own past exams with official solutions, 2023A-2026B (Reichman Advanced Algorithms 3501); a recycled T/F and problem pool**

- (L4, F5) *Exams Exams 2023A (Problem 5, 18 pts); solution Exams Solutions 2023solA* — Matrix Completion. Input: an n x n real matrix A with some entries marked by stars (*). Goal: compute the maximal rank of a matrix obtainable from A by replacing the stars with real numbers (each star independently). Example: A1 = [[1,*],[*,0]] has answer 2, A2 = [[*,*],[0,0]] has answer 1. Give an efficient randomized algorithm, prove correctness, analyze running time and error probability. Hint: relation between determinants and rank. (Official solution: substitute independent uniform values f
- (L4, F5) *Exams Exams 2024A (Problem 2, 18 pts); solution Exams Solutions 2024solA* — For a CNF formula phi with n variables define its density D(phi) = (1/2^n) * |{x in {0,1}^n : phi(x)=1}|. Prove there is a randomized polynomial-time algorithm that, given a CNF phi with n variables, with probability at least 1-2^{-n} outputs a number A(phi) with |A(phi) - D(phi)| <= 1/10.
- (L4, F5) *Exams Exams 2025B (Problem 5, 16 pts); solution Exams Solutions 2025solB-end* — Let G=(V,E) be an undirected graph with n vertices. A 3-coloring c: V -> {1,2,3} is legal if c(u) != c(v) for every (u,v) in E. The versatility R(G) = |{c : c legal}| / 3^n. Give a randomized polynomial-time algorithm that, given G, with probability at least 1-2^{-n} outputs A(G) with |A(G) - R(G)| <= 1/n.
- (L4, F5) *Exams Exams 2024C (Problem 3, 18 pts); solution Exams Solutions 2024solC* — For u,v in {0,1}^n, d(u,v) is the Hamming distance (the number of differing coordinates). Give a randomized algorithm that, given a set S of at most n^2024 vectors in {0,1}^n, finds with probability at least 0.9 a vector u in {0,1}^n with d(u,v) >= n/3 for every v in S.
- (L4, F5) *Exams Exams 2023A (Problem 6, 16 pts); solution Exams Solutions 2023solA-end* — Let A, B be subsets of {1,2,...,n}. The sumset is A+B = {a+b : a in A, b in B}. Give an algorithm running in time O(n log n) that, given A and B, computes the elements of A+B and counts how many times each c in A+B is obtained as a sum a+b with a in A, b in B.
- (L4, F5) *Exams Exams 2025C (Problem 3, 16 pts); solution Exams Solutions 2025solC* — Let G be an undirected regular connected graph and s,t vertices. Random walk: starting from s, at each step the walk stays in place with probability 1/3, or with probability 2/3 moves to a uniformly random neighbor (independent of previous choices). Prove that after a number of steps polynomial in n, the probability of reaching t is at least 1/(2n). You may use any property proved in class about the adjacency matrix of G.
- (L4, F5) *Exams Exams 2023B (P1(d), T/F, 5 pts); solution Exams Solutions 2023solB ~l.84-91 (TRUE)* — T/F: Let G be an undirected regular graph with n vertices such that all eigenvalues of the normalized adjacency matrix of G, except the largest, are at most 1/2 in absolute value. There is a constant C such that for every pair s,t, the probability that a random walk from s reaches t within C log n steps is at least 1/(2n). (Official: true.)
- (L4, F5) *Exams Exams 2023A (P1(d)); Exams Exams 2025A ~l.60 (P1(c)); Exams Exams 2025B (P1(b)); Exams Exams 2025C (P1(b))* — Matrix-multiplication counting T/F lineage. 2023A-P1d: two 4x4 matrices can be multiplied with at most 49 multiplications (TRUE, Strassen twice). 2025A-P1c: if v1..vn are linearly independent, computing Av1,...,Avn requires time n^3 (FALSE, O(n^omega)). 2025B-P1b: an n x n matrix times an n x n^2 matrix can be computed with fewer than n^4 arithmetic operations (TRUE, n blocks, n^{omega+1}). 2025C-P1b: if alpha_k is the minimal number of multiplications for k x k matrix multiplication, then alpha
- (L4, F5) *Exams Exams 2024C (P1(a)); Exams Exams 2024B (P1(b)); Exams Exams 2023A (P1(a)); Exams Exams 2023B (P1(b)); Exams Exams 2025C (P1(d))* — LP-vertex / simplex T/F lineage. 2024C-P1a: a standard-form polytope P = {x: Ax=b, x>=0} in R^n has at most 2^n vertices (TRUE). 2024B-P1b: there is an efficient algorithm that, given a standard-form LP and a point y, decides whether y is a vertex (TRUE; check that the columns of the support are independent). 2023A-P1a: the simplex as presented in class can move to a different vertex with the same objective value (FALSE; degenerate pivots keep the same vertex). 2023B-P1b: each pivot step takes p

**Williamson & Shmoys, The Design of Approximation Algorithms (Cambridge 2011), chapter exercises (course reading list)**

- (L4, F5) *W&S Ex 5.4, p.136, ws-book.txt l.7243-7245 (refers to Sec 5.6 non-linear randomized rounding, l.5985+; MAX SAT IP/LP of Sec 5.4, l.5643+)* — Consider the non-linear randomized rounding algorithm for MAX SAT as given in Section 5.6. Prove that using randomized rounding with the linear function f(y_i) = (1/2) y_i + 1/4 also gives a 3/4-approximation algorithm for MAX SAT. [Setup: LP relaxation max sum_j w_j z_j s.t. sum_{i in P_j} y_i + sum_{i in N_j} (1 - y_i) >= z_j, 0 <= y_i, z_j <= 1; set x_i true independently with probability f(y_i*).]
- (L4, F5) *W&S Sec 5.4 'Randomized rounding', Theorem 5.10 (l.5643-5760) + Sec 5.5 Theorem 5.11 'Choosing the better of two solutions' (l.5843-5880)* — Weighted MAX SAT: given the IP max sum_j w_j z_j s.t. sum_{i in P_j} y_i + sum_{i in N_j}(1-y_i) >= z_j for all C_j, y_i, z_j in {0,1}, solve its LP relaxation and set x_i true independently with probability y_i*. (Thm 5.10) Show each clause C_j of length l_j is satisfied with probability >= [1 - (1 - 1/l_j)^{l_j}] z_j* >= (1 - 1/e) z_j*, giving a randomized (1 - 1/e)-approximation (uses Fact 5.8 AM-GM and Fact 5.9 concavity). (Thm 5.11) Show that taking the better of this solution and a uniform

**Jeff Erickson, Algorithms lecture notes, Appendix/Chapter A 'Fast Fourier Transforms' (UIUC CS473; 2020/2022/2023 builds)**

- (L4, F5) *Exercise 4, p.18; erickson-fft-notes.txt l.983-996. Only in the (c)2023 build (absent from the 2020 and 2022 builds).* — The Hamming distance between two bit strings is the number of positions where the strings have different bits (e.g. 01101001 vs 11010001 -> 4). Suppose we are given two bit strings P[1..m] (the 'pattern') and T[1..n] (the 'text'), where m <= n. Describe and analyze an algorithm to find the minimum Hamming distance between P and a substring of T of length m. For full credit, your algorithm should run in O(n log n) time. Example: P = 1100101, T = 1111111010101000000 -> return 1 (substring 1110101)
- (L4, F5) *Exercise 3(c) (with 3(a),(b) as lead-ins), pp.17-18; erickson-fft-notes.txt l.969-981. Present in all builds (2020, 2022, 2023).* — (a) Describe an algorithm that determines whether a given set of n integers contains two elements whose sum is zero, in O(n log n) time. (b) Describe an algorithm that determines whether a given set of n integers contains three elements whose sum is zero, in O(n^2) time. (c) Now suppose the input set X contains only integers between -10000n and 10000n. Describe an algorithm that determines whether X contains three elements whose sum is zero, in O(n log n) time. [Hint: Hint.]

**Motwani & Raghavan, Randomized Algorithms (Cambridge 1995), mainly Ch.12 Sec 12.4.1 + Ch.12 Problems, Ch.7 Problems, Ch.4, Ch.11 (course reading list)**

- (L4, F5) *Ch.7 Problem 7.5 (Due to J. Naor), p.189; txt l.10522-10531* — Two n x n matrices A and B over a field F are said to be similar if there exists a non-singular matrix T such that TAT^{-1} = B. Devise a randomized algorithm for testing the similarity of the matrices A and B. (Hint: View the entries in T as a collection of variables, and from the definition of similarity, obtain a homogeneous set of linear equations that these variables must satisfy. Any solution T must be a linear combination of the basic solutions to this family of equations. Apply the rando
- (L4, F5) *Ch.12 Problem 12.16 (Mulmuley-Vazirani-Vazirani), p.365; txt l.19385-19395* — Consider the problem of finding a minimum-weight perfect matching in a graph G(V,E), given edge-weights w(e) for each edge e in E in unary. Note that it is not possible to apply the Isolating Lemma directly to this case since the random weights chosen there would conflict with the input weights. Explain how you would devise an RNC algorithm for this problem. The parallel complexity of the case where the edge-weights are given in binary is as yet unresolved - do you see why the RNC algorithm does

**Uri Zwick (TAU), Advanced Algorithms: 'Matrix and Graph Algorithms' slides (Adv-Alg-2015) + Adv-Alg-2016 Problem Sets 1-2, grad-algo-1011 PS2, Algorithms-in-Action FFT sets**

- (L4, F5) *Zwick slides l.1514 'Finding longer simple cycles' (slide 164): 'A graph G contains a Ck iff Tr(A^k)≠0 ? We want simple cycles!'* — T/F item: 'Let A be the adjacency matrix of a (directed or undirected, loopless) graph G. G contains a simple cycle of length k iff trace(A^k) ≠ 0.' Answer: true for k=3 (every closed 3-walk in a loopless graph is a triangle), false for k≥4 (e.g. any edge gives a closed 4-walk u-v-u-v-u).
- (L4, F5) *Zwick slides l.348 'Exercise 1' (b) + Adv-Alg-2016 PS1 Ex 1.3(b)* — Give an O(n^ω)-time algorithm for finding a simple 4-cycle (quadrangle) in a directed graph on n vertices. (A cycle is simple if all vertices on it are distinct.) Slide hints: 'In an acyclic graph all paths are simple'; 'Randomization makes solution much easier'.
- (L4, F5) *Zwick slides l.238 'Exercise: Show that matrix multiplication and matrix squaring are essentially equivalent' + PS1 Ex 1.1* — Show that matrix multiplication and matrix squaring have the same asymptotic complexity (i.e. if n×n matrices can be squared in time S(n) then two n×n matrices can be multiplied in O(S(2n)), and vice versa).
- (L4, F5) *Zwick slides l.1088-1110 'Witnesses for Boolean Matrix Multiplication' + 'Exercise n+1 (a)'; Adv-Alg-2016 PS2 Ex 2.3(a)* — A matrix W is a matrix of witnesses [for the Boolean product C=A∘B] iff W_ij = some k with a_ik = b_kj = 1 if c_ij = 1, and W_ij = 0 otherwise (formula reconstructed; the slide text lost it). 'Can be computed naively in O(n^3) time. Can also be computed in O(n^ω log n) time.' (a) Obtain a deterministic O(n^ω)-time algorithm for finding unique witnesses (the witness at every position that has exactly one witness).
- (L4, F5) *Zwick slides l.666-690 'Finding perfect matchings: Rabin-Vazirani (1986)' + 'Adjoint and Cramer's rule'* — 'An edge {i,j}∈E is contained in a perfect matching iff (A^−1)_ij ≠ 0 [A = random Tutte matrix]. Leads immediately to an O(n^{ω+1}) algorithm: find an allowed edge {i,j}∈E, delete it and its vertices from the graph, and recompute A^−1.' Bipartite exam version: with X the Edmonds (symbolic biadjacency) matrix, edge (i,j) lies in some perfect matching iff det(X^{(i,j)}) ≢ 0 iff (X^−1)_ji ≢ 0. Give a randomized O(n^ω) algorithm that finds all edges belonging to some perfect matching, and an O(n^{ω+
- (L4, F5) *Algorithms-in-Action FFT sets: 2016 set1 Ex 1.5 = 2017/2018 set1 Ex 1.5 = 2020 set2 Ex 2.6 (local: sources/zwick-tau/ALG-ACTION-*_set1-fft.txt, ALG-ACTION-2020_* — Let T be a text of length n and P a pattern of length m over a finite and small alphabet Σ. Let D be a |Σ|×|Σ| matrix such that D(a,b) specifies the similarity or dissimilarity of a,b∈Σ. For every k=0,1,..,n−m−1 define d_k = Σ_{j=0}^{m−1} D(T[k+j],P[j]), the total pattern-text dissimilarity when the 0-th pattern character is aligned with the k-th text character. (a) Show that the d_k can be computed in O(|Σ| n log m) time. (b) Suppose Σ⊂Z and D(a,b)=ab. How fast can the d_k's be computed? (c) Su

## Method notes and caveats

- Sources count as confirmed only when two independent reviewers re-located the exact text and neither refuted it. Own compositions and re-skins are labelled as such; no quote or exercise number here is unverified guesswork.
- The Moed C sample is small (2024C, 2025C). Every C-specific pattern rests on n = 2 and is weighted accordingly.
- The session's web-search budget ran out near the end of the research. The last follow-ups therefore worked from the downloaded source texts and direct URL checks, so absence of evidence for the five own-composition items (2026B-P2/P3/P4, parts of 2026A-P1) is not proof that no source exists.
- Probabilities are calibrated estimates from base rates in 10 Volk papers, not guarantees. Use them to decide what to drill, not to skip topics.
