# 2026 Exam Intelligence — Advanced Algorithms (Ben Lee Volk)

*Produced 2026-07-12 by a 63-agent research run: 8 per-exam source hunters + 4 specialty sweeps, 48 adversarial verifications of claimed matches, 3 prediction analysts. Verdicts: 24 CONFIRMED, 13 PLAUSIBLE, 11 REJECTED.*

---

## TL;DR — the five things that matter

1. **Volk posts nothing publicly.** No course page, no problem sets, no exams online (his site `benleevolk.bitbucket.io` only lists that he teaches the course 2023–2026 and hosts Hebrew notes for a *different* course). So there is no leaked "answer key" — but his **source pools were identified and verified** (below).
2. **His strongest habit is recycling *himself*.** Roughly 60–80% of each new exam is a near-clone of one of his own prior questions with the object/constants swapped. Every exam is built from the same ~8 archetypes.
3. **Smoking gun: hw2026 ex1 Q6 is *literally* 2025 Moed A Problem 4** (ε-balanced/unbiased set via sampling + Chernoff + union bound, same O(n/ε²), same proof). His question bank flows directly between homework and exams. **Your 2026 homework is the single best predictor of the 2026 exam.**
4. **Verified external pools:** Williamson & Shmoys (free PDF) for everything approximation/set-cover; Mitzenmacher & Upfal for probability/Karger/Chernoff; **Uri Zwick's TAU "Advanced Algorithms" slides** (Volk's alma mater) for the matrix-graph-algorithms problems — three exam questions traced to *one* Zwick deck; CLRS Ch. 30 + Erickson's FFT notes for the FFT problems; Vazirani/standard lecture notes for primal-dual set cover.
5. **The 2026 Moed A skeleton is nearly certain** (all three 2025 exams share it byte-for-byte): **P1 = 4×8 T/F (32 pts), P2 = two-part LP-duality problem (10+10), P3–P5 = 16 pts each.** Slot-by-slot predictions in Part 3.

---

## Part 1 — Verified source map (question → origin)

Only matches that survived adversarial verification (a reviewer agent fetched the source, located the problem, and compared it against the exam wording).

### CONFIRMED (same problem, up to cosmetic edits)

| Exam Q | Question | Source | Where |
|---|---|---|---|
| 2023A-P3 | Max Triple Cut 2/3-approx + derandomization | **Williamson & Shmoys, Ex. 5.1** (Max k-Cut, (k−1)/k) + Ch. 5 conditional expectations | [designofapproxalgs.com/book.pdf](https://www.designofapproxalgs.com/book.pdf) |
| 2023A-P6 | Sumset A+B with counts via FFT, O(n log n) | **CLRS Exercise 30.1-7** ("Cartesian sum") | [walkccc.me/CLRS/Chap30/30.1](https://walkccc.me/CLRS/Chap30/30.1/) |
| 2023B-P4 | TSP IP + subtour elimination (a,b,c) | **Dantzig–Fulkerson–Johnson formulation** (classic; verbatim on Wikipedia TSP page) | [wikipedia: TSP](https://en.wikipedia.org/wiki/Travelling_salesman_problem) |
| 2023B-P5 | Transitive closure in o(n³) via (A+I)ⁿ | **Uri Zwick, TAU Advanced Algorithms — "Matrix and Graph Algorithms" slides** | [cs.tau.ac.il/~zwick/Adv-Alg-2015/Matrix-Graph-Algorithms.pdf](https://www.cs.tau.ac.il/~zwick/Adv-Alg-2015/Matrix-Graph-Algorithms.pdf) |
| 2023B-P6 | Discrepancy ≤ C√(n log m) random coloring | **Mitzenmacher & Upfal §4.4 "Set Balancing"** (also Alon–Spencer) | [M&U PDF](https://www.cs.purdue.edu/homes/spa/courses/pg17/mu-book.pdf) |
| 2024A-P4 | Weighted Max-SAT ILP | **Williamson & Shmoys Ch. 5** MAX-SAT IP (near word-for-word; also Wikipedia Max-SAT ILP) | book.pdf above |
| 2024B-P3 | #min-cuts ≤ n(n−1)/2 via Karger analysis | **Mitzenmacher & Upfal Exercise 1.23** (verbatim) | M&U PDF above |
| 2024B-P4 | Diameter of digraph in o(n³) via matrix powers | **Zwick TAU slides** (same deck as 2023B-P5) | Zwick PDF above |
| 2024B-P5 | Representative-set d-approx via LP rounding | **Williamson & Shmoys §1.3, Thm 1.6** (frequency-f set-cover rounding, reskinned; also CMU 15-451 f16 Lec 21) | book.pdf; [CMU lec21](https://www.cs.cmu.edu/~15451-f16/lectures/lec21-approx2.pdf) |
| 2024C-P2 | Boolean matrix product in o(n³) | **Zwick TAU slides** (same deck — third hit!) | Zwick PDF above |
| 2024C-P4 | Bin-packing ILP | Standard formulation (verbatim on Wikipedia bin packing) | [wikipedia](https://en.wikipedia.org/wiki/Bin_packing_problem) |
| 2025A-P1(a) | 3-CNF ≤ 7m/8 satisfiable T/F | **Mitzenmacher & Upfal Theorem 6.4** (probabilistic method for MAX-SAT) | M&U PDF above |
| 2025B-P2 | Set-cover ILP + f-approx via 1/f-threshold rounding | **Vazirani Ch. 14 / Williamson & Shmoys §1.3 / Chekuri UIUC CS 583 notes** (assigned exercise there) | [Chekuri covering.pdf](https://courses.grainger.illinois.edu/cs583/sp2018/Notes/covering.pdf) |
| 2025C-P2 | Set-cover dual + tight sets + primal-dual f-approx | **Williamson & Shmoys §1.5/Ch. 7 (Algorithm 1.1)** / **Vazirani Ch. 15** | book.pdf; [Vazirani book.pdf](https://ics.uci.edu/~vazirani/book.pdf) |

### PLAUSIBLE (same unusual idea / clear ancestor, but adapted)

| Exam Q | Question | Likely origin |
|---|---|---|
| 2023A-P4 | Matching LP → dual → vertex cover, Kőnig | Canonical LP-duality lecture chain (e.g. IIT Bombay CS602 Lec 10); **also appears in FOUR pre-2023 exams of this course** (see below) |
| 2023A-P5 | Matrix completion max-rank via Schwartz-Zippel | **Motwani & Raghavan** Ch. 7 + Problem 12.19 (random substitution preserves rank) |
| 2023A-P1(d) | Strassen: 4×4 in 49 mults T/F | **Volk's own Hebrew "Algebraic Computation" notes §3.1** |
| 2023B-P3 | 3-uniform hypergraph VC 3-approx | Williamson & Shmoys §1.3 specialization |
| 2024A-P3 | Unique min-weight paths via random weights | **Isolation lemma (MVV)** direct application |
| 2025B-P5 | Estimate fraction of legal 3-colorings | **M&U Exercise 4.5** paradigm (sampling + Chernoff) |
| 2025C-P1(a) | roots of unity order k \| n T/F | **Volk's notes §7.3 (roots of unity)** |
| 2025C-P1(b) | α_{k²} ≤ (α_k)² T/F | **Volk's notes §3.1–3.2.2** |

### Recycled from previous instructors' exams (local analysis, Mozes 2014–2018 / Tamir 2021)

Volk recycled a modest but predictable slice — the shared combinatorial-optimization toolkit:

- **Dominating-set ILP**: 2014A-Q4 → 2023A-P2
- **Bin-packing ILP**: 2014B-Q7 → 2024C-P4
- **Matching↔Vertex-Cover LP/dual chain**: 2014B-Q8, 2015B-Q7, 2016A-Q6, 2018A-Q3 → 2023A-P4 (the single most-repeated template across ALL instructors)
- **Hitting-set/set-cover IP + dual + bounded-frequency approx**: 2017A-Q6, 2018A-Q2, 2015A-Q8 → 2025B-P2, 2025C-P2, 2023B-P3
- **Threshold LP-rounding**: Tamir 2021A-Q2 / 2021B-Q1 → 2024B-P5, 2025B-P2(b)
- **Chernoff sampling estimators**: 2015A-Q5, 2017A-Q4 → 2024A-P2, 2024C-P3, 2025A-P4, 2025B-P5
- **MAX-3SAT 7/8 averaging**: 2014A-Q8, 2017B-Q4a → 2025A-P1(a)

**Implication: the old exams in your site's "Old (2025)" tier are legitimate prediction material for the LP/IP/approx/Chernoff slots — keep drilling them.**

### Honest negatives

- The **P1 True/False items are mostly instructor-written** — across all 8 exams, almost no T/F item traced to a specific external source (the matrix-mult/roots-of-unity ones echo his own Hebrew lecture notes).
- Several free-response problems (2024A-P2 CNF density, 2024C-P3 far-vector, 2025A-P4 ε-unbiased set, 2025A-P5, 2025B-P3/P4) are **his own compositions** on standard techniques — no single ancestor exists. For these, the archetype (Part 2) is the prediction, not a document.
- 11 lower-priority claims hit the verification cap and were not reviewed; none were load-bearing.

---

## Part 2 — The 8 archetypes (every free-response question he has ever written is one of these)

1. **ILP modeling** — "write an IP for X, explain variables + why feasible solutions correspond" (every exam)
2. **LP duality / simplex theory** — compute a dual, weak/strong duality, reduced-cost optimality, complementary slackness, primal-dual f-approx (every exam, the 20-pt P2 slot in all of 2025)
3. **Schwartz-Zippel randomized-algorithm design** — substitute random values in {1..cn}, evaluate a determinant/product, error < 1/10 (every Moed A: matrix completion 2023A, invertible-in-span 2024A, determinantal equivalence 2025A, branching programs 2025C)
4. **Chernoff + union bound** — (a) construction flavor: random object is good w.h.p. (discrepancy 2023B, balanced bipartite 2024B, far vector 2024C, ε-unbiased 2025A, tertiary matrix 2025C); (b) sampling flavor: estimate a fraction (CNF 2024A, 3-colorings 2025B)
5. **FFT / polynomial O(n log n)** — sumset 2023A, convolution 2024A, Walsh–Hadamard 2024B, division h=f/g 2025B
6. **Fast matrix mult, o(n³) reduction** — transitive closure 2023B, diameter 2024B, boolean product 2024C (**Moed B/C only, never Moed A free-response**)
7. **Approximation ratio design** — triple cut 2023A, hypergraph VC 2023B, set cover 2024B/2025B/2025C
8. **Spectral / random walk** — mostly T/F; full problem only 2025C-P3 (lazy random walk)

Near-duplicate pairs proving the recycle habit: 2024B-P6 ≈ 2025C-P5 (same proof, 2 symbols → 3 symbols); 2024A-P6 ≈ 2025A-P5 ≈ 2025C-P4 (same SZ determinant trick); 2024A-P2 ≈ 2025B-P5 (same estimator); 2023A-P6 ≈ 2024A-P5 (same FFT); 2023A-P1(c) ≈ 2024C-P1(c) (BPP, constants tweaked, answer flipped).

---

## Part 3 — Predicted 2026 Moed A blueprint

**Format (high confidence):** 5 problems, 100 pts, 3h, two double-sided A4 sheets. P1 = T/F 4×8=32; P2 = 10+10=20; P3–P5 = 16 each.

| Slot | Prediction | Conf. |
|---|---|---|
| **P1(a)** | Fast-matrix-mult T/F (Strassen-style bound, α_{k²}≤(α_k)², n×n by n×n² < n⁴, "n products Avᵢ needs n³"=false). Absent from hw2026 ⇒ recycled from past T/F pool. | med-high |
| **P1(b)** | Schwartz-Zippel / roots-of-unity T/F ("nonzero poly of degree < m vanishing on all order-m roots of unity"=false; "{1..d+1} contains a non-root"=true). hw2026 ex1 leads with SZ. | high |
| **P1(c)** | LP/simplex/duality/vertex T/F (strong duality equality; "optimal iff vertex"=false; reduced-cost ⇒ unique; ≤2ⁿ vertices). | med-high |
| **P1(d)** | Spectral/random-walk T/F lifted from homework (dim{v:Av=v}=1 for connected regular = hw claim; det(A+I)=0 ⇒ bipartite; PSD ⇔ eigenvalues ≥ 0 — **hw2026 ex2 Q6 proves exactly this**) OR isolation-lemma/Karger-count T/F (**hw2026 ex1 Q3 = min-cut counting, ex2 Q3 = isolation**) OR Markov one-liner. | med |
| **P2 (LP, 10+10)** | Duality problem: write/relax an IP, derive the dual, prove optimality via strong duality / complementary slackness — most likely wrapped around **set cover** (his favorite: 3 of 3 in 2025) or a fresh LP like **densest subgraph (hw2026 ex3 Q3!)** or a **Farkas-lemma proof (hw2026 ex3 Q4/ex4 Q1)**. | high |
| **P3** | **ILP modeling** of a described combinatorial problem — hw2026 ex4 Q2 drills clique/subset-sum/coloring formulations; makespan/scheduling was 2025A. Alternatively a spectral proof (random walk reach via eigenvalue gap, hw2026 ex2 Q1). | high |
| **P4** | **Schwartz-Zippel + determinant randomized algorithm** — hw2026 doubles down on this (ex1 Q4 invertible-matrix-in-span — *which was already exam 2024A-P6!* — ex1 Q5 Cauchy–Binet common basis, ex2 Q3). Expect a mutated PIT/determinant equivalence test. | high |
| **P5** | **Chernoff + union-bound construction** — the guaranteed slot. hw2026 ex1 Q6 IS 2025A-P4 (ε-balanced set); expect the same template on a renamed object (ε-biased set, balanced matrix/graph, code-like property). | high |
| **Wildcard** | An **FFT free-response is "due"** (appeared 2023A, 2024A, rested in 2025A): sumset variant, convolution, f^n coefficients, division h=f/g, or **Walsh–Hadamard (new in hw2026 ex2 Q5)** — may displace P3 or P4. | med |

---

## Part 4 — Ranked practice list

### Tier 1 — Highest yield: his own bank + hw2026 mutations (do these first)

1. **ε-balanced/unbiased set** (2025A-P4 = hw2026 ex1 Q6): be able to write the full proof cold — sample m = Cn/ε² vectors, Chernoff each of the ~2ⁿ events, union bound. Then practice mutating it: same proof for a random ±1 *matrix* (2025C-P5), random bipartite graph (2024B-P6), far vector (2024C-P3).
2. **SZ determinant algorithms**: redo 2024A-P6 (invertible matrix in span — reappeared as hw2026 ex1 Q4!), 2025A-P5, 2025C-P4, 2023A-P5. Master the template: symbolic det ≠ 0 → random values from {1..cn} → SZ error ≤ deg/|S|.
3. **Set-cover trilogy**: ILP (2025B-P2a) → 1/f-threshold rounding f-approx (2025B-P2b) → dual/tight-sets primal-dual (2025C-P2). Read **Williamson & Shmoys §1.3 + §1.5** (his verified source): [book.pdf](https://www.designofapproxalgs.com/book.pdf).
4. **Sampling estimators**: 2024A-P2 (CNF density) ↔ 2025B-P5 (3-colorings) — same proof; practice writing it for an arbitrary "fraction of good objects."
5. **T/F pool**: drill every past T/F item (they recycle with flipped answers): BPP amplification pair (2023A-1c / 2024C-1c — *rested through 2025, due back*), isolation-lemma variants (2023A-1b, 2025C-1c), matrix-mult bounds (2023A-1d, 2025A-1c, 2025B-1b, 2025C-1b), roots of unity (2025B-1a, 2025C-1a), LP facts (all years), spectral facts (2025A-1d, 2025B-1d, 2023B-1d).
6. **hw2026-specific**: densest-subgraph LP + threshold rounding (ex3 Q3), Farkas II proofs (ex3 Q4, ex4 Q1), Walsh–Hadamard O(N log N) (ex2 Q5), expander mixing lemma (ex2 Q2), Karger min-cut counting (ex1 Q3 = M&U Ex 1.23 = exam 2024B-P3!), PSD characterization (ex2 Q6).

### Tier 2 — Mined from his verified source documents (unused neighbors of used questions)

From **Erickson's FFT notes** (source of 2023A-P6) — [A-fft.pdf](https://courses.grainger.illinois.edu/CS473/fa2025/notes/A-fft.pdf):
1. **Well-spaced triples** (Ex. 2): given bit string B, count triples i<j<k with B[i]=B[j]=B[k]=1 and k−j=j−i in O(n log n). *(Square the indicator polynomial, read coefficient 2j.)*
2. **Bounded 3SUM** (Ex. 3): X ⊆ [−10000n, 10000n], decide ∃a,b,c ∈ X with a+b+c=0 in O(n log n) via p(x)² coefficients.
3. **Pattern matching with Hamming distance** (Ex. 4): all-alignments Hamming distance between pattern P and text T in O(n log n) via cross-correlation.
4. **Radix-3 FFT** (Ex. 9): DFT for 3^k coefficients — divide into three, state twiddle factors, prove O(n log n).

From **Zwick's TAU deck** (source of three exam problems!) — [Matrix-Graph-Algorithms.pdf](https://www.cs.tau.ac.il/~zwick/Adv-Alg-2015/Matrix-Graph-Algorithms.pdf):

5. **Triangle detection in O(n^ω)** via trace/entries of A³; extend to k-cycles. *(The natural next problem after transitive closure / boolean product / diameter.)*
6. **Freivalds' algorithm**: verify AB=C in O(n²) randomized, error ≤ 1/2, amplify to 2^{−k}.

From **Williamson & Shmoys** (source of 4+ exam problems):

7. **Greedy MAX CUT = derandomized random cut** (Ex. 5.2): prove 1/2-approx and that greedy is exactly the conditional-expectations derandomization.
8. **MAX DICUT random 1/4-approx** (Ex. 5.3) and **MAX DICUT IP + LP rounding 1/2-approx** (Ex. 5.6) — combines "write the IP" + "round the relaxation," his two favorite moves in one.
9. **Vertex-cover LP half-integrality** (Ex. 1.5): every BFS has xᵢ ∈ {0, ½, 1} — ties LP geometry to approximation.
10. **Set-cover randomized-rounding derandomization** (Ex. 5.7).
11. **Local-ratio set cover f-approx** (Ex. 7.3).

From **Mitzenmacher & Upfal Ch. 1** (source of 2024B-P3):

12. **r-way min cut** (Ex. 1.24): contraction until r vertices; survival probability; bound the number of minimum r-way cuts.
13. **Karger amplification / early stopping** (Ex. 1.25) — doubles as BPP-amplification practice.

### Tier 3 — Due-to-return topics

- **FFT free-response** (rested in 2025A): sumset/convolution/division/f^n — see Tier 2 items 1–4.
- **BPP amplification T/F** (rested all of 2025).
- **Makespan or scheduling ILP** (2025A-P3; not in hw2026 ⇒ would be recycled verbatim).
- **Weak/strong duality proof** (2023B-P2, 2024C-P6 Farkas — hw2026 ex3/ex4 heavily drill Farkas ⇒ elevated odds).

---

## Method + caveats

- 8 hunter agents read each exam (questions + official solutions) and swept the web; 4 sweeps covered Volk's own footprint, parallel courses, textbooks, and pre-2023 local exams. Every claimed match was re-fetched and adversarially compared by an independent reviewer agent; only CONFIRMED/PLAUSIBLE survivors are reported. 11 REJECTED claims (inaccessible source or merely topical similarity) were discarded.
- **Caveat:** for problems marked "his own composition," no document will hand you the exact question — the archetype + his recycle pattern is the prediction. The blueprint's biggest risk is a format change (rated unlikely: 2025's template ran identically three moadim in a row) or a new topic emphasis (watch: hw2026 introduces SDP/Goemans–Williamson in ex4 — a Max-2-LIN/GW question would be genuinely new; know the 0.878 statement at T/F level).
