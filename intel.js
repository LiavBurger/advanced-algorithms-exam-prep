/* 2026 Exam Intel tab — content. Rendered by app.js when the "🎯 2026 Predicted Exam" nav entry
   is selected. Derived from EXAM-INTEL-2026.md (63-agent source-tracing run, 2026-07-12). */
window.INTEL = {
  overviewTitle: "Intel briefing — how his exams are built & what to expect",
  overview: `
<p><b>Where this comes from:</b> every 2023–2025 exam question was traced to its origin and each claimed match was
independently re-verified against the actual source (24 confirmed, 13 plausible). Full report:
<a href="EXAM-INTEL-2026.md">EXAM-INTEL-2026.md</a> in this folder.</p>

<h3>The three facts that matter</h3>
<ul>
<li><b>He recycles himself.</b> Roughly 60–80% of each new exam is a near-clone of one of his own earlier questions with the
object or constants swapped (e.g. 2024B-P6 balanced bipartite graph ≈ 2025C-P5 tertiary matrix; 2024A-P6 ≈ 2025A-P5 ≈ 2025C-P4,
all the same Schwartz–Zippel determinant trick). Every free-response he has ever written is one of <b>8 archetypes</b>.</li>
<li><b>Homework feeds the exam.</b> hw2026 ex1&nbsp;Q6 is <em>literally</em> exam 2025A-P4 (ε-balanced set). T/F items are
routinely lifted from homework claims ("as proved in the HW"). Your 2026 homework sets are the single best predictor.</li>
<li><b>His external pools are known and verified:</b>
<a href="https://www.designofapproxalgs.com/book.pdf">Williamson &amp; Shmoys</a> (Max&nbsp;k-Cut Ex&nbsp;5.1, Max-SAT Ch.5, set-cover §1.3/§1.5/Ch.7),
<a href="https://www.cs.purdue.edu/homes/spa/courses/pg17/mu-book.pdf">Mitzenmacher &amp; Upfal</a> (Ex&nbsp;1.23 min-cut count, §4.4 set balancing, Thm&nbsp;6.4),
<a href="https://www.cs.tau.ac.il/~zwick/Adv-Alg-2015/Matrix-Graph-Algorithms.pdf">Uri Zwick's TAU slides</a> (transitive closure, boolean product, diameter — three exam problems from one deck),
CLRS Ex&nbsp;30.1-7 (sumset via FFT), <a href="https://courses.grainger.illinois.edu/CS473/fa2025/notes/A-fft.pdf">Erickson's FFT notes</a>,
Vazirani Ch.14–15. The "Source mine" section below drills the <em>unused neighbors</em> of the exact problems he already took.</li>
</ul>

<h3>Predicted 2026 Moed A blueprint</h3>
<p>All three 2025 exams share one rigid skeleton — expect it again: <b>5 problems, 100 pts</b> —
P1 = True/False 4×8&nbsp;=&nbsp;32; P2 = two-part LP problem 10+10; P3–P5 = 16 each.</p>
<div class="gtool"><div class="gtool-h">SLOT-BY-SLOT PREDICTION</div><div class="gtool-body">
<ul>
<li><b>P1 (T/F ×4):</b> one from each bucket — fast matrix multiplication · Schwartz–Zippel / roots of unity · LP / simplex / vertices · spectral / probability one-liner. BPP amplification and isolation-lemma items rested all of 2025 and are <em>due back</em>.</li>
<li><b>P2 (10+10, LP):</b> duality — compute a dual and prove optimality via strong duality / complementary slackness; set cover is his favorite wrapper (used in all three 2025 sittings). Farkas-based proofs are heavily drilled in hw2026 (ex3 Q4, ex4 Q1) — elevated odds.</li>
<li><b>P3 (16):</b> ILP modeling of a described combinatorial problem — hw2026 ex4 Q2 drills clique / subset-sum / <b>coloring</b> formulations.</li>
<li><b>P4 (16):</b> Schwartz–Zippel randomized-algorithm design (a determinant / rank / equivalence test with error ≤ 1/10) — in <em>every</em> Moed A so far; hw2026 doubles down on PIT (ex1 Q4–Q5, ex2 Q3).</li>
<li><b>P5 (16):</b> Chernoff + union-bound construction ("random object is good w.h.p.") — the guaranteed slot.</li>
<li><b>Wildcard:</b> an FFT free-response (sumset / convolution / division / Walsh–Hadamard) is due to return after resting in 2025A.</li>
</ul>
</div></div>

<h3>How to use this tab</h3>
<ol class="gsteps">
<li>Take the <b>mock exam</b> below under exam conditions (3 hours, your two A4 sheets). Mark honestly.</li>
<li>Run the <b>T/F gauntlet</b> until every item is instant — these are his actual recycled statements plus fresh variants.</li>
<li>Work the <b>source mine</b>: problems sitting next to his verified sources that he has not used yet.</li>
<li>Anything Shaky/Failed → drill the matching topic in the regular tabs (each card says which topic it belongs to).</li>
</ol>
<div class="box pitfall"><b>Honesty box:</b> predictions are pattern extrapolation, not leaks. The blueprint held rigid for three straight 2025 sittings, but hw2026 introduces SDP / Goemans–Williamson (ex4) — genuinely new material. Know the 0.878 statement at T/F level.</div>
`,

  sections: [

  /* ================= SECTION 1 — MOCK EXAM ================= */
  {
    tier: 1, open: true,
    title: "Predicted 2026 Moed A — full mock exam",
    blurb: "Built slot-by-slot from the verified blueprint. Every problem is a fresh variant of the family he draws that slot from — if the prediction holds, the real exam differs mainly in the objects and constants.",
    items: [
      {
        id: "intel-mock-p1", sid: "2026 MOCK · P1", difficulty: "medium",
        src: "True/False, 4×8 = 32 pts — one item per predicted bucket",
        stem: "For each of the following statements, write whether it is true or false, and briefly explain your answer.",
        parts: [
          {
            part: "a", difficulty: "easy",
            summary: "T/F: two 8×8 matrices can be multiplied with at most 343 scalar multiplications.",
            q: "<p>There exists an algorithm for multiplying two 8×8 matrices that performs at most <b>343</b> multiplications.</p>",
            basis: "Constant-swap of 2023A-P1(d) (4×4 with 49 = 7²). A matrix-mult T/F appeared in every 2025 sitting.",
            sol: "<p><b>True.</b> Strassen's algorithm multiplies 2×2 matrices with 7 multiplications. View an 8×8 matrix as a 2×2 block matrix of 4×4 blocks and recurse three levels: each level costs a factor of 7 multiplications, so 8×8 = 2³×2³ needs at most 7³ = <b>343</b> multiplications (of scalars, at the bottom of the recursion).</p>"
          },
          {
            part: "b", difficulty: "medium",
            summary: "T/F: a nonzero degree-≤100 polynomial can vanish on all 201 roots of unity of order 201.",
            q: "<p>Let Ω₂₀₁ ⊆ ℂ be the set of roots of unity of order 201. There exists a <em>nonzero</em> univariate polynomial <em>f</em>(x) with deg(<em>f</em>) ≤ 100 such that <em>f</em>(ω) = 0 for every ω ∈ Ω₂₀₁.</p>",
            basis: "Roots-of-unity T/F is the 2025-era favorite (2025B-P1(a), 2025C-P1(a)); this is the univariate root-counting version.",
            sol: "<p><b>False.</b> A nonzero univariate polynomial of degree at most 100 has at most 100 roots. |Ω₂₀₁| = 201 &gt; 100, so <em>f</em> would have 201 distinct roots and must be the zero polynomial — a contradiction. (The multivariate version of this statement is exactly what the Schwartz–Zippel lemma rules out: Pr[<em>f</em> = 0] ≤ deg(<em>f</em>)/|Ω| &lt; 1, as in 2025B-P1(a).)</p>"
          },
          {
            part: "c", difficulty: "medium",
            summary: "T/F: an optimal solution that is not a vertex forces infinitely many optimal solutions.",
            q: "<p>Let (P) be a linear program with feasible polyhedron <em>P</em>. If x* is an optimal solution of (P) and x* is <em>not</em> a vertex of <em>P</em>, then (P) has infinitely many optimal solutions.</p>",
            basis: "Twist on 2025C-P1(d) (\"x optimal iff x is a vertex\" — false). An LP-geometry T/F appears in nearly every exam.",
            sol: "<p><b>True.</b> Since x* is not a vertex (= extreme point), there are feasible y ≠ z with x* = ½(y + z). Then c<sup>T</sup>x* = ½(c<sup>T</sup>y + c<sup>T</sup>z), and since c<sup>T</sup>y, c<sup>T</sup>z ≥ c<sup>T</sup>x* (x* optimal, minimization), both inequalities must be equalities: y and z are optimal too. By convexity the whole segment [y, z] is feasible, and the objective is linear, hence constant and optimal on it — infinitely many optima.</p>"
          },
          {
            part: "d", difficulty: "easy",
            summary: "T/F: at most a third of students can score at least three times the average (Markov).",
            q: "<p>In any exam, at most a third of the students receive a grade that is at least 3 times the average grade.</p>",
            basis: "Constant-swap of 2025B-P1(c) (at most half score at least twice the average).",
            sol: "<p><b>True.</b> Let X be the grade of a uniformly random student; the average grade is E[X], and grades are non-negative. By Markov's inequality, Pr[X ≥ 3·E[X]] ≤ 1/3. (Non-negativity is what licenses Markov — the statement would fail for signed quantities.)</p>"
          }
        ]
      },
      {
        id: "intel-mock-p2", sid: "2026 MOCK · P2", difficulty: "medium",
        src: "LP duality theory, 10+10 = 20 pts — weak duality + Farkas (hw2026 ex3–ex4 drill exactly this)",
        stem: "Consider the standard-form primal–dual pair: (P) minimize c<sup>T</sup>x subject to Ax = b, x ≥ 0; and (D) maximize b<sup>T</sup>y subject to A<sup>T</sup>y ≤ c.",
        parts: [
          {
            part: "a", difficulty: "medium",
            summary: "State and prove the weak duality theorem for the standard-form pair.",
            q: "<p>State and prove the <b>weak duality</b> theorem: for every feasible x of (P) and every feasible y of (D), b<sup>T</sup>y ≤ c<sup>T</sup>x.</p>",
            basis: "Was a full 16-pt problem in 2023B-P2 (Moed B) — never yet asked on a Moed A. Proof-of-duality slots anchor P2 in all of 2025.",
            sol: "<p>Let x be feasible for (P) (Ax = b, x ≥ 0) and y feasible for (D) (A<sup>T</sup>y ≤ c). Then</p><div class=\"qmath\">b<sup>T</sup>y = (Ax)<sup>T</sup>y = x<sup>T</sup>(A<sup>T</sup>y) ≤ x<sup>T</sup>c = c<sup>T</sup>x,</div><p>where the inequality holds coordinate-wise: x ≥ 0 and A<sup>T</sup>y ≤ c, so x<sup>T</sup>(A<sup>T</sup>y) ≤ x<sup>T</sup>c (multiplying each inequality (A<sup>T</sup>y)ᵢ ≤ cᵢ by xᵢ ≥ 0 and summing). In particular every dual-feasible value lower-bounds every primal-feasible value.</p>"
          },
          {
            part: "b", difficulty: "hard",
            summary: "Prove via Farkas: if (P) is infeasible and (D) is feasible, then (D) is unbounded.",
            q: "<p>Suppose (P) is infeasible and (D) is feasible. Prove that (D) is unbounded.<br><em>Hint: Farkas' lemma.</em></p>",
            basis: "Verbatim recycle candidate: this was 2024C-P6 (a Moed C — his Moed A exams recycle B/C material). Farkas is drilled in hw2026 ex3 Q4 & ex4 Q1.",
            sol: "<p>Since {x : Ax = b, x ≥ 0} = ∅, Farkas' lemma gives a vector y₀ with</p><div class=\"qmath\">A<sup>T</sup>y₀ ≤ 0 &nbsp;and&nbsp; b<sup>T</sup>y₀ &gt; 0.</div><p>Let ŷ be any feasible solution of (D), i.e. A<sup>T</sup>ŷ ≤ c. For every t ≥ 0, the point ŷ + t·y₀ is dual-feasible:</p><div class=\"qmath\">A<sup>T</sup>(ŷ + t·y₀) = A<sup>T</sup>ŷ + t·A<sup>T</sup>y₀ ≤ c + 0 = c.</div><p>Its objective value is b<sup>T</sup>ŷ + t·(b<sup>T</sup>y₀) → ∞ as t → ∞, since b<sup>T</sup>y₀ &gt; 0. Hence (D) has feasible solutions of arbitrarily large value — unbounded.</p>"
          }
        ]
      },
      {
        id: "intel-mock-p3", sid: "2026 MOCK · P3", difficulty: "medium",
        src: "ILP modeling, 16 pts — the guaranteed slot; hw2026 ex4 Q2 drills coloring formulations",
        parts: [
          {
            part: null, difficulty: "medium",
            summary: "Write an integer program for Graph Coloring (minimize number of colors) and justify it.",
            q: "<p>In the <b>Graph Coloring</b> problem, the input is an undirected graph G = (V, E) with n vertices, and the goal is to color the vertices with as few colors as possible so that no edge has both endpoints of the same color.</p><p>Write an integer program whose optimal value equals the minimum number of colors. Explain your answer briefly: write what the variables are and what they mean, and explain why every feasible solution of the IP corresponds to a proper coloring (and vice versa).</p>",
            basis: "ILP-modeling appears in EVERY exam (dominating set 2023A, Max-SAT 2024A, bin packing 2024C, makespan 2025A, set cover 2025B). Coloring is fresh and drilled in hw2026 ex4 Q2.",
            sol: "<p>Since n colors always suffice, use color indices c = 1, …, n. Variables: x<sub>v,c</sub> ∈ {0,1} indicating that vertex v receives color c, and y<sub>c</sub> ∈ {0,1} indicating that color c is used at all.</p><div class=\"qmath\">minimize&nbsp; Σ<sub>c=1..n</sub> y<sub>c</sub></div><div class=\"qmath\">subject to&nbsp; Σ<sub>c</sub> x<sub>v,c</sub> = 1 &nbsp;∀v ∈ V &nbsp;&nbsp;(every vertex gets exactly one color)</div><div class=\"qmath\">x<sub>u,c</sub> + x<sub>v,c</sub> ≤ 1 &nbsp;∀(u,v) ∈ E, ∀c &nbsp;&nbsp;(no edge is monochromatic)</div><div class=\"qmath\">x<sub>v,c</sub> ≤ y<sub>c</sub> &nbsp;∀v, c &nbsp;&nbsp;(a used color is paid for)</div><div class=\"qmath\">x<sub>v,c</sub>, y<sub>c</sub> ∈ {0,1}.</div><p><b>Feasible IP ⇒ coloring:</b> the first constraint assigns each vertex exactly one color; the second forbids equal colors across an edge, so the assignment is a proper coloring; the third forces y<sub>c</sub> = 1 for every color actually used, so the objective counts at least the number of used colors. <b>Coloring ⇒ feasible IP:</b> given a proper coloring with k colors, set the corresponding x's and y's; all constraints hold and the objective equals k. Hence the IP optimum equals the chromatic number.</p>"
          }
        ]
      },
      {
        id: "intel-mock-p4", sid: "2026 MOCK · P4", difficulty: "hard",
        src: "Schwartz–Zippel algorithm design, 16 pts — in every Moed A (2023A-P5, 2024A-P6, 2025A-P5); hw2026 ex1 Q4–Q5 deepen exactly this",
        parts: [
          {
            part: null, difficulty: "hard",
            summary: "Randomized algorithm: decide if a bipartite graph has a matching of size ≥ k (Edmonds matrix rank + random substitution + SZ).",
            q: "<p>Let H = (L ∪ R, E) be a bipartite graph with |L| = |R| = n, and let k ∈ ℕ. Give an efficient <em>randomized</em> algorithm that decides whether H contains a matching of size at least k, with error probability at most 1/10. Prove correctness and analyze the running time and the error probability.</p><p><em>Hint: consider the symbolic (Edmonds) matrix B with B<sub>ij</sub> = x<sub>ij</sub> if (i,j) ∈ E and 0 otherwise, and recall that the maximum matching size of H equals the rank of B over the field of rational functions (seen in class / homework). Think about the relation between rank and determinants.</em></p>",
            basis: "Structural clone of 2023A-P5 (matrix completion max-rank): same random-substitution + submatrix-determinant + SZ proof, re-skinned to matchings (hw2026's favorite object).",
            sol: "<p><b>Algorithm:</b> build B, replace each variable x<sub>ij</sub> independently with a uniform value from {1, …, 10n}, compute the rank r of the resulting numeric matrix (Gaussian elimination), and answer \"yes\" iff r ≥ k.</p><p><b>Never overshoots:</b> if the numeric rank is r, some r×r submatrix has nonzero numeric determinant, so the corresponding <em>symbolic</em> r×r determinant is a nonzero polynomial, giving rank(B) ≥ r. Hence r ≤ rank(B) = max-matching size always — a \"yes\" answer is wrong with probability 0 when the true matching number is &lt; k… more precisely, the output r never exceeds the truth.</p><p><b>Rarely undershoots:</b> let r₀ = rank(B). Some r₀×r₀ submatrix of B has determinant P(x) ≠ 0 as a polynomial, and deg(P) ≤ r₀ ≤ n (each entry has degree ≤ 1 and the determinant is a sum of products of r₀ entries). By the Schwartz–Zippel lemma, a uniform substitution from {1, …, 10n} gives</p><div class=\"qmath\">Pr[P(α) = 0] ≤ deg(P)/10n ≤ n/10n = 1/10,</div><p>so with probability ≥ 9/10 the numeric rank is exactly r₀ and the comparison with k is answered correctly.</p><p><b>Running time:</b> building B and the substitution take O(n²); rank via Gaussian elimination is O(n³) (or O(n<sup>ω</sup>)). Total error ≤ 1/10.</p>"
          }
        ]
      },
      {
        id: "intel-mock-p5", sid: "2026 MOCK · P5", difficulty: "hard",
        src: "Chernoff + union bound construction, 16 pts — the guaranteed slot (2023B-P6, 2024B-P6, 2024C-P3, 2025A-P4 = hw2026 ex1 Q6, 2025C-P5)",
        parts: [
          {
            part: null, difficulty: "hard",
            summary: "Randomized construction of n binary vectors of length O(log n/ε²) with pairwise distance ≥ (1/2−ε)m, w.p. ≥ 0.99.",
            q: "<p>Let ε ∈ (0,1). Show that there is an efficient randomized algorithm that, given n, outputs with probability at least 0.99 a set of n vectors v₁, …, v<sub>n</sub> ∈ {0,1}<sup>m</sup> with m = O(log(n)/ε²), such that every pair v<sub>i</sub> ≠ v<sub>j</sub> differs in at least (1/2 − ε)·m coordinates.</p><p><em>You may use the Chernoff bound: for X a sum of independent indicator variables with mean μ, Pr[X ≤ (1−δ)μ] ≤ exp(−δ²μ/2).</em></p>",
            basis: "Near-clone of the family: renamed object, identical proof skeleton (sample randomly → Chernoff per pair/subset → union bound → fix constants).",
            sol: "<p><b>Algorithm:</b> pick every coordinate of every vector independently and uniformly from {0,1}, with m = ⌈(4 ln n + 8)/ε²⌉ = O(log(n)/ε²), and output v₁, …, v<sub>n</sub>.</p><p><b>Analysis:</b> fix a pair i &lt; j and let X = Hamming distance(v<sub>i</sub>, v<sub>j</sub>) = Σ<sub>t</sub> 𝟙[v<sub>i,t</sub> ≠ v<sub>j,t</sub>], a sum of m independent indicators, each 1 with probability 1/2; so E[X] = m/2. Apply Chernoff with δ = 2ε:</p><div class=\"qmath\">Pr[X &lt; (1/2 − ε)m] = Pr[X &lt; (1 − 2ε)·(m/2)] ≤ exp(−(2ε)²·(m/2)/2) = exp(−ε²m).</div><p><b>Union bound</b> over the fewer than n²/2 pairs:</p><div class=\"qmath\">Pr[some pair too close] ≤ (n²/2)·exp(−ε²m) ≤ (n²/2)·e<sup>−4 ln n − 8</sup> = (n²/2)·n<sup>−4</sup>·e<sup>−8</sup> ≤ 0.01.</div><p>So with probability ≥ 0.99 all pairs differ in at least (1/2 − ε)m coordinates. The algorithm just tosses n·m coins — polynomial time. (Distinctness of the vectors follows since (1/2 − ε)m &gt; 0.)</p>"
          }
        ]
      }
    ]
  },

  /* ================= SECTION 2 — T/F GAUNTLET ================= */
  {
    tier: 1, open: false,
    title: "Problem 1 gauntlet — the recycled T/F pool + fresh variants",
    blurb: "His T/F items recycle across years with tweaked constants and flipped answers. Items marked ⟲ are verbatim past-exam statements (official answers); the rest are the variants most likely to appear. Target: instant, one-line justifications.",
    items: [
      {
        id: "intel-tf-bpp", sid: "T/F DRILL · BPP", difficulty: "medium",
        src: "BPP amplification — rested ALL of 2025 ⇒ due back in 2026",
        parts: [
          {
            part: "a", difficulty: "medium",
            summary: "⟲ 2023A-P1(c): BPP(1/8,1/4) = BPP(2⁻ⁿ, 1−2⁻ⁿ).",
            q: "<p>BPP(1/8, 1/4) = BPP(2<sup>−n</sup>, 1 − 2<sup>−n</sup>) &nbsp;(n is the input length; in BPP(a,b), \"no\"-inputs are accepted w.p. ≤ a and \"yes\"-inputs w.p. ≥ b).</p>",
            sol: "<p><b>True</b> (official answer, 2023A). ⊆ of the right side in the left is clear. For the converse, given M for the (1/8, 1/4) version, run it O(n) times independently and accept iff at least a 3/16-fraction of runs accept (3/16 is the midpoint). Since the acceptance probabilities are separated by the constant gap 1/4 − 1/8, the Chernoff bound drives both error sides down to 2<sup>−n</sup>.</p>"
          },
          {
            part: "b", difficulty: "medium",
            summary: "⟲ 2024C-P1(c): BPP(1/2,1/2) = BPP(1/3,2/3).",
            q: "<p>BPP(1/2, 1/2) = BPP(1/3, 2/3).</p>",
            sol: "<p><b>False</b> (official answer, 2024C). BPP(1/2, 1/2) is trivial: the algorithm that ignores its input and accepts with probability exactly 1/2 puts <em>every</em> language in the class (≤ 1/2 on no-inputs, ≥ 1/2 on yes-inputs). There is no gap to amplify. BPP(1/3, 2/3) is the usual BPP, which does not contain all languages (e.g. undecidable ones).</p>"
          },
          {
            part: "c", difficulty: "medium",
            summary: "Fresh variant: BPP(1/4,1/3) = BPP(1/4,3/4) — does a 1/12 gap amplify?",
            q: "<p>BPP(1/4, 1/3) = BPP(1/4, 3/4).</p>",
            sol: "<p><b>True.</b> BPP(1/4, 3/4) ⊆ BPP(1/4, 1/3) trivially (acceptance ≥ 3/4 ≥ 1/3). Conversely, in BPP(1/4, 1/3) the two probabilities are separated by the constant gap 1/3 − 1/4 = 1/12, which is all amplification needs: run O(n) independent copies, accept iff the fraction of accepting runs is at least 7/24 (the midpoint). By Chernoff the error drops below 2<sup>−n</sup> on both sides, so the language is in BPP(2<sup>−n</sup>, 1−2<sup>−n</sup>) ⊆ BPP(1/4, 3/4). The lesson: <em>any</em> constant gap with soundness &lt; completeness amplifies; equal constants (item b) do not.</p>"
          }
        ]
      },
      {
        id: "intel-tf-iso", sid: "T/F DRILL · Isolation lemma", difficulty: "medium",
        src: "Isolation lemma bucket — 2023A-P1(b), 2024A-P3, 2025C-P1(c); also hw2026 ex2 Q3",
        parts: [
          {
            part: "a", difficulty: "medium",
            summary: "⟲ 2023A-P1(b): isolation lemma with product weights instead of sums.",
            q: "<p>The isolation lemma remains true even if we define the weight of a set to be the <em>product</em> of the weights of the elements in the set, instead of their sum.</p>",
            sol: "<p><b>True</b> (official answer, 2023A). The map w ↦ log w turns products into sums and is order-preserving, so \"unique minimal set\" transfers between the two weight notions; alternatively, the original proof never uses more than the fact that there are N distinct weight values. Hence with weights uniform in {1,…,N}, the minimal-product set is unique w.p. ≥ 1 − n/N.</p>"
          },
          {
            part: "b", difficulty: "medium",
            summary: "⟲ 2025C-P1(c): random weights from {1..4|E|} give a unique min-weight AND unique max-weight cut w.p. ≥ 1/2.",
            q: "<p>Let G = (V,E) be an undirected graph. If each edge independently gets a uniform weight from {1, 2, …, 4|E|}, then with probability at least 1/2 there is a unique minimum-weight cut and a unique maximum-weight cut.</p>",
            sol: "<p><b>True</b> (official answer, 2025C). Apply the isolation lemma to the family F of edge-sets of cuts with N = 4|E|: Pr[min-weight cut not unique] ≤ |E|/N = 1/4, and likewise ≤ 1/4 for the maximum (isolation applies to max by negating/reversing order). Union bound: Pr[either fails] ≤ 1/2.</p>"
          },
          {
            part: "c", difficulty: "easy",
            summary: "Fresh variant: weights from {1..2m} on m elements isolate any family w.p. ≥ 1/2.",
            q: "<p>Let F be <em>any</em> family of subsets of {1, …, m}. If each element gets an independent uniform weight from {1, …, 2m}, then with probability at least 1/2 the minimum-weight set in F is unique.</p>",
            sol: "<p><b>True.</b> This is the isolation lemma verbatim with N = 2m: the probability of a non-unique minimum is at most m/N = m/2m = 1/2. Note the bound does not depend on |F| — that is the whole magic of the lemma (F can be exponentially large, e.g. all cuts, all matchings…).</p>"
          }
        ]
      },
      {
        id: "intel-tf-mat", sid: "T/F DRILL · Matrix mult & FFT", difficulty: "medium",
        src: "Fast-matmul / roots-of-unity bucket — appeared in every 2025 sitting; absent from hw2026 ⇒ recycled statements likely",
        parts: [
          {
            part: "a", difficulty: "easy",
            summary: "⟲ 2023A-P1(d): 4×4 matrices with at most 49 multiplications.",
            q: "<p>There exists an algorithm for multiplying two 4×4 matrices that performs at most 49 multiplications.</p>",
            sol: "<p><b>True</b> (official answer, 2023A). One level of block recursion with Strassen: a 4×4 matrix is a 2×2 matrix of 2×2 blocks; Strassen needs 7 block-multiplications, each a 2×2 product costing 7 scalar multiplications: 7×7 = 49.</p>"
          },
          {
            part: "b", difficulty: "medium",
            summary: "⟲ 2025C-P1(b): α_{k²} ≤ (α_k)² for the minimal multiplication count.",
            q: "<p>Let α<sub>k</sub> be the minimal number of multiplications needed to multiply two k×k matrices. Then α<sub>k²</sub> ≤ (α<sub>k</sub>)².</p>",
            sol: "<p><b>True</b> (official answer, 2025C). Partition two k²×k² matrices into k×k blocks (each block is k×k). Run the optimal k×k algorithm at the block level — α<sub>k</sub> block-multiplications — and each block-multiplication is a k×k product costing α<sub>k</sub> scalar multiplications. Total: α<sub>k</sub>·α<sub>k</sub>.</p>"
          },
          {
            part: "c", difficulty: "medium",
            summary: "⟲ 2025B-P1(b): n×n times n×n² in fewer than n⁴ operations.",
            q: "<p>There exists an algorithm for multiplying an n×n matrix by an n×n² matrix that performs fewer than n⁴ arithmetic operations.</p>",
            sol: "<p><b>True</b> (official answer, 2025B). Write B = [B₁ | B₂ | ⋯ | B<sub>n</sub>] with each Bᵢ of size n×n. Then AB = [AB₁ | ⋯ | AB<sub>n</sub>]: n products of n×n matrices, i.e. time n·n<sup>ω</sup> = n<sup>ω+1</sup> &lt; n⁴ since ω &lt; 3.</p>"
          },
          {
            part: "d", difficulty: "medium",
            summary: "⟲ 2025A-P1(c): computing Av₁,…,Avₙ requires n³ time — true or false?",
            q: "<p>Given an n×n matrix A and n vectors v₁, …, v<sub>n</sub>, computing all n products Av₁, …, Av<sub>n</sub> requires Ω(n³) time (each product takes n² and there are n of them).</p>",
            sol: "<p><b>False</b> (official answer, 2025A). Stack the vectors as columns of a matrix V; then [Av₁ | ⋯ | Av<sub>n</sub>] = AV is a single n×n matrix product, computable in O(n<sup>ω</sup>) = o(n³) time. Batch problems into one matrix multiplication whenever possible — this is his favorite \"gotcha\" in the bucket.</p>"
          },
          {
            part: "e", difficulty: "easy",
            summary: "⟲ 2025C-P1(a): if k | n, every order-k root of unity is an order-n root of unity.",
            q: "<p>Let k, n ∈ ℕ with k | n. Every root of unity of order k is also a root of unity of order n.</p>",
            sol: "<p><b>True</b> (official answer, 2025C). Write n = km. If ω<sup>k</sup> = 1 then ω<sup>n</sup> = (ω<sup>k</sup>)<sup>m</sup> = 1.</p>"
          }
        ]
      },
      {
        id: "intel-tf-lp", sid: "T/F DRILL · LP & simplex", difficulty: "medium",
        src: "LP bucket — an LP/simplex T/F appears in nearly every exam",
        parts: [
          {
            part: "a", difficulty: "medium",
            summary: "⟲ 2023B-P1(a): bounded non-empty primal polyhedron ⟹ primal and dual optima coincide.",
            q: "<p>In a linear program, if the polyhedron of the primal problem is bounded and non-empty, then the optimal values of the primal and the dual are equal.</p>",
            sol: "<p><b>True</b> (official answer, 2023B). Bounded + non-empty ⟹ the primal is feasible and its optimum is finite; by the strong duality theorem the dual is then feasible with the same optimal value (were the dual infeasible, the primal would have to be unbounded).</p>"
          },
          {
            part: "b", difficulty: "medium",
            summary: "⟲ 2023B-P1(b): each simplex pivoting step takes polynomial time.",
            q: "<p>Each pivoting step in the simplex algorithm takes polynomial time in the input length.</p>",
            sol: "<p><b>True</b> (official answer, 2023B). One pivot = pick an entering coordinate via the reduced-cost vector, pick a leaving coordinate via the ratio test, and update via linear-algebra operations (solving/inverting) — all polynomial. What is <em>not</em> known to be polynomial is the <em>number</em> of pivots; don't confuse the two claims.</p>"
          },
          {
            part: "c", difficulty: "easy",
            summary: "⟲ 2025C-P1(d): x is optimal iff x is a vertex — the classic trap.",
            q: "<p>Let (P) be a linear program. Then x is an optimal solution of (P) if and only if x is a vertex.</p>",
            sol: "<p><b>False</b> (official answer, 2025C, \"obviously false\"). Example: minimize 0 subject to 0 ≤ x ≤ 1 — every point of [0,1] is optimal, not only the two vertices. And conversely vertices need not be optimal. The true theorem is only: <em>if</em> an optimum exists (and the polyhedron has a vertex), then <em>some</em> vertex is optimal.</p>"
          },
          {
            part: "d", difficulty: "medium",
            summary: "⟲ 2023A-P1(a): can simplex move to a different vertex with equal objective value?",
            q: "<p>In the simplex algorithm as presented in class, it is possible that the algorithm moves to a <em>different vertex</em> whose objective value equals that of the previous vertex.</p>",
            sol: "<p><b>False</b> (official answer, 2023A). The algorithm moves to a different vertex only when it strictly decreases the objective. The degenerate case is the trap: there the <em>basis</em> changes while the <em>vertex stays the same</em> — so \"different vertex, equal value\" never happens.</p>"
          }
        ]
      },
      {
        id: "intel-tf-spec", sid: "T/F DRILL · Spectral & polynomials", difficulty: "medium",
        src: "Spectral/random-walk + Schwartz–Zippel buckets — T/F fixtures; hw2026 ex2 re-derives the spectral claims",
        parts: [
          {
            part: "a", difficulty: "medium",
            summary: "⟲ 2025B-P1(d): det(A+I) = 0 for normalized adjacency ⟹ G bipartite.",
            q: "<p>Let G be an undirected regular connected graph with normalized adjacency matrix A. If det(A + I) = 0 then G is bipartite.</p>",
            sol: "<p><b>True</b> (official answer, 2025B). det(A+I) = 0 ⟹ some v ≠ 0 has (A+I)v = 0, i.e. Av = −v, so −1 is an eigenvalue of A. As seen in class, a connected (regular) graph is bipartite iff −1 is an eigenvalue of its normalized adjacency matrix.</p>"
          },
          {
            part: "b", difficulty: "medium",
            summary: "⟲ 2025A-P1(d): for connected regular G, the eigenspace {v : Av = v} has dimension exactly 1.",
            q: "<p>Let G be a connected regular graph with normalized adjacency matrix A. The eigenspace {v : Av = v} has dimension exactly 1.</p>",
            sol: "<p><b>True</b> (official answer, 2025A). The all-ones vector is always in the eigenspace of eigenvalue 1, and the multiplicity of eigenvalue 1 equals the number of connected components (proved in the homework); connected ⟹ multiplicity 1.</p>"
          },
          {
            part: "c", difficulty: "medium",
            summary: "⟲ 2023B-P1(c): a nonzero 5-variable polynomial vanishing on every integer assignment.",
            q: "<p>There exists a nonzero polynomial in five variables which evaluates to zero on every assignment of <em>integers</em> to the variables.</p>",
            sol: "<p><b>False</b> (official answer, 2023B). If f ≠ 0 has degree d, apply Schwartz–Zippel with S = {1, …, d+1}: Pr[f = 0] ≤ d/(d+1) &lt; 1, so some integer assignment (α₁,…,α₅) ∈ S⁵ has f(α) ≠ 0.</p>"
          },
          {
            part: "d", difficulty: "medium",
            summary: "⟲ 2024C-P1(b): a nonzero degree-d polynomial is nonzero somewhere on {1,…,d+1}ⁿ.",
            q: "<p>For every nonzero polynomial f(x₁,…,x<sub>n</sub>) of total degree d there exist α₁, …, α<sub>n</sub> ∈ {1, …, d+1} such that f(α₁,…,α<sub>n</sub>) ≠ 0.</p>",
            sol: "<p><b>True</b> (official answer, 2024C). Same Schwartz–Zippel computation as the previous item, stated positively: Pr<sub>α∈{1..d+1}ⁿ</sub>[f(α) = 0] ≤ d/(d+1) &lt; 1. Note how (c) and (d) are the same fact with flipped framing — he does this deliberately.</p>"
          }
        ]
      }
    ]
  },

  /* ================= SECTION 3 — SOURCE MINE ================= */
  {
    tier: 2, open: false,
    title: "Source mine — unused problems next to his verified sources",
    blurb: "He demonstrably took problems from these exact documents. These are the neighboring exercises he has NOT used yet — the most likely hunting ground for fresh 2026 questions. Each card names the source.",
    items: [
      {
        id: "intel-mine-fft1", sid: "MINE · FFT #1", difficulty: "medium",
        src: "Erickson FFT notes (source of exam 2023A-P6) — Exercise 2",
        parts: [
          {
            part: null, difficulty: "medium",
            summary: "Detect and count evenly-spaced 1-triples in a bit string in O(n log n) via squaring an indicator polynomial.",
            q: "<p>Let B[1..n] be a bit string. A triple of indices i &lt; j &lt; k is <b>well-spaced</b> if B[i] = B[j] = B[k] = 1 and k − j = j − i (an arithmetic progression of 1-positions).</p><p>(1) Describe an O(n²) brute-force algorithm. (2) Give an O(n log n) algorithm to <em>decide</em> whether a well-spaced triple exists. (3) Extend it to <em>count</em> the well-spaced triples in O(n log n).</p>",
            sol: "<p>(1) For every pair i &lt; j with B[i] = B[j] = 1, check whether 2j − i ≤ n and B[2j−i] = 1 — O(n²).</p><p>(2)+(3) Let p(x) = Σ<sub>i: B[i]=1</sub> x<sup>i</sup>. The coefficient of x<sup>s</sup> in p(x)² is the number of <em>ordered</em> pairs (i, k) of 1-positions with i + k = s. A triple (i, j, k) is well-spaced iff B[j] = 1 and i + k = 2j with i ≠ k (then automatically i &lt; j &lt; k for the ordered version). For each j with B[j] = 1, the coefficient c<sub>2j</sub> of x<sup>2j</sup> in p² equals 2·(number of unordered pairs i &lt; k with i+k = 2j) + 1, the +1 coming from the pair (j, j). Hence:</p><div class=\"qmath\">well-spaced triple with middle j exists ⟺ B[j] = 1 and c<sub>2j</sub> ≥ 3; &nbsp; #triples = Σ<sub>j: B[j]=1</sub> (c<sub>2j</sub> − 1)/2.</div><p>Compute p² once with FFT in O(n log n), then scan the coefficients — total O(n log n).</p>",
            srcline: "Source: Jeff Erickson, Algorithms — FFT notes, Ex. 2 (same document as verified exam 2023A-P6). courses.grainger.illinois.edu/CS473/fa2025/notes/A-fft.pdf"
          }
        ]
      },
      {
        id: "intel-mine-fft2", sid: "MINE · FFT #2", difficulty: "medium",
        src: "Erickson FFT notes — Exercise 3 (bounded-universe 3SUM)",
        parts: [
          {
            part: null, difficulty: "medium",
            summary: "Decide 3SUM for n integers of magnitude O(n) in O(n log n) via convolution.",
            q: "<p>Let X be a set of n integers, each in the range [−10000n, 10000n]. Design an O(n log n) algorithm that decides whether X contains three elements a, b, c (not necessarily distinct) with a + b + c = 0.</p>",
            sol: "<p>Shift to non-negative exponents: let M = 10000n and q(x) = Σ<sub>a∈X</sub> x<sup>a+M</sup>, a polynomial of degree ≤ 2M = O(n). Compute q(x)² by FFT in O(n log n). The coefficient of x<sup>s</sup> in q² is the number of ordered pairs (a, b) ∈ X² with a + b = s − 2M. Now a + b + c = 0 for some c ∈ X iff a + b = −c, i.e. iff for some c ∈ X the coefficient of x<sup>2M − c</sup> in q² is positive. Scan all c ∈ X in O(n). Repetition (a = b, or a = c) is allowed by the problem statement, so ordered pairs are exactly what we want. Total O(n log n).</p><p><em>Why the range matters:</em> the polynomial degree — and hence the FFT size — is proportional to the universe size, so the trick works only for integers of magnitude O(n) (general 3SUM is famously not known to be subquadratic).</em></p>",
            srcline: "Source: Erickson FFT notes, Ex. 3 — same document as verified 2023A-P6."
          }
        ]
      },
      {
        id: "intel-mine-fft3", sid: "MINE · FFT #3", difficulty: "hard",
        src: "Erickson FFT notes — Exercise 4 (pattern matching via cross-correlation)",
        parts: [
          {
            part: null, difficulty: "hard",
            summary: "All-offsets Hamming distance between a pattern and a text in O(n log n).",
            q: "<p>Given a pattern bit string P[1..m] and a text bit string T[1..n] (m ≤ n), give an O(n log n) algorithm that computes, for <em>every</em> offset t, the Hamming distance between P and the substring T[t+1 .. t+m], and returns the minimum over all offsets.</p>",
            sol: "<p>Count matching positions instead of mismatches. The number of positions where both strings have a 1, at offset t, is the cross-correlation c₁(t) = Σ<sub>j=1..m</sub> P[j]·T[t+j]. Encode T as the polynomial T(x) = Σ<sub>i</sub> T[i]x<sup>i</sup> and the <em>reversed</em> pattern as P̃(x) = Σ<sub>j</sub> P[j]x<sup>m−j</sup>. Then the coefficient of x<sup>m+t</sup> in P̃(x)·T(x) is exactly Σ<sub>j</sub> P[j]·T[t+j] = c₁(t) — one FFT multiplication gives all offsets at once.</p><p>Similarly compute c₀(t) (positions where both have 0) by running the same computation on the complemented strings P̄, T̄. Then for every offset:</p><div class=\"qmath\">Hamming(t) = m − c₁(t) − c₀(t),</div><p>and we return min<sub>t</sub> Hamming(t). Two polynomial multiplications of degree O(n): total O(n log n).</p>",
            srcline: "Source: Erickson FFT notes, Ex. 4 — same document as verified 2023A-P6."
          }
        ]
      },
      {
        id: "intel-mine-fft4", sid: "MINE · FFT #4", difficulty: "hard",
        src: "Erickson FFT notes — Exercise 9 (radix-3 FFT); tests real understanding of the recursion",
        parts: [
          {
            part: null, difficulty: "hard",
            summary: "Design a divide-and-conquer DFT for polynomials with 3^k coefficients and prove O(n log n).",
            q: "<p>The radix-2 FFT assumes the number of coefficients is a power of 2. Suppose instead n = 3<sup>k</sup>. Design a divide-and-conquer algorithm that evaluates a polynomial p(x) of degree &lt; n at all n-th roots of unity, by splitting into <em>three</em> recursive subproblems, and prove it runs in O(n log n).</p>",
            basis: "He asked the analogous 'prove the FFT-style recursion works' for Walsh–Hadamard in 2024B-P2 — this is the same skill on a fresh object.",
            sol: "<p>Split p by residues of exponents mod 3:</p><div class=\"qmath\">p(x) = a(x³) + x·b(x³) + x²·c(x³),</div><p>where a, b, c have degree &lt; n/3 (a collects coefficients of exponents ≡ 0 mod 3, etc.). Let ω = e<sup>2πi/n</sup>. For any j, (ω<sup>j</sup>)³ = ω<sub>n/3</sub><sup>j mod n/3</sup> is an (n/3)-rd root of unity, so</p><div class=\"qmath\">p(ω<sup>j</sup>) = A[j mod n/3] + ω<sup>j</sup>·B[j mod n/3] + ω<sup>2j</sup>·C[j mod n/3],</div><p>where A, B, C are the size-(n/3) DFTs of a, b, c. So: recursively compute the three DFTs, then combine each of the n outputs with two multiplications by the \"twiddle factors\" ω<sup>j</sup>, ω<sup>2j</sup> and two additions — O(n) work. The recurrence T(n) = 3T(n/3) + O(n) solves (recursion tree of depth log₃n with O(n) per level) to T(n) = O(n log n).</p>",
            srcline: "Source: Erickson FFT notes, Ex. 9 — same document as verified 2023A-P6."
          }
        ]
      },
      {
        id: "intel-mine-zwick", sid: "MINE · Matrix–graph", difficulty: "medium",
        src: "Uri Zwick TAU slides (verified source of 2023B-P5, 2024B-P4, 2024C-P2) — the natural next problems in the deck",
        parts: [
          {
            part: "a", difficulty: "medium",
            summary: "Detect a triangle in O(n^ω) via A².",
            q: "<p>Let A be the adjacency matrix of an undirected graph G on n vertices. Give an O(n<sup>ω</sup>)-time algorithm that decides whether G contains a triangle.</p>",
            sol: "<p>Compute A² over the integers with fast matrix multiplication — O(n<sup>ω</sup>). Entry (A²)<sub>ij</sub> counts common neighbors of i and j (walks of length 2). G has a triangle iff there is an edge (i, j) ∈ E with (A²)<sub>ij</sub> ≥ 1: the edge plus a common neighbor k closes the triangle {i, j, k}. Scan all n² pairs in O(n²). (Equivalently: trace(A³) = 6·#triangles, so a triangle exists iff trace(A³) &gt; 0.)</p>",
            srcline: "Neighboring material in: Zwick, \"Matrix and Graph Algorithms\", TAU Advanced Algorithms. cs.tau.ac.il/~zwick/Adv-Alg-2015/Matrix-Graph-Algorithms.pdf"
          },
          {
            part: "b", difficulty: "medium",
            summary: "Decide whether diameter ≤ 2 in O(n^ω).",
            q: "<p>Give an O(n<sup>ω</sup>)-time algorithm that decides whether a connected undirected graph G has diameter at most 2.</p>",
            basis: "His 2024B-P4 asked for the exact diameter of a digraph in o(n³); this is the entry-level version of the same idea.",
            sol: "<p>Compute A² and check that for every pair i ≠ j, A<sub>ij</sub> + (A²)<sub>ij</sub> ≥ 1: distance(i,j) ≤ 2 iff i, j are adjacent or share a common neighbor. One fast multiplication + an O(n²) scan. (The full 2024B-P4 exam problem extends this: dist(i,j) ≤ k iff ((A+I)<sup>k</sup>)<sub>ij</sub> &gt; 0, and binary search over k with repeated squaring finds the diameter in O(n<sup>ω</sup> log² n) = o(n³).)</p>"
          }
        ]
      },
      {
        id: "intel-mine-freivalds", sid: "MINE · Freivalds", difficulty: "medium",
        src: "Zwick TAU slides, 'Checking Matrix Multiplication' — randomized verification, sits at the matmul × randomization intersection",
        parts: [
          {
            part: null, difficulty: "medium",
            summary: "Verify AB = C in O(n²) randomized time with one-sided error ≤ 2⁻ᵏ.",
            q: "<p>Given three n×n matrices A, B, C, give a randomized O(n²)-time algorithm that decides whether AB = C with one-sided error at most 1/2, and show how k independent repetitions reduce the error to 2<sup>−k</sup>. Prove the error bound.</p>",
            sol: "<p><b>Algorithm (Freivalds):</b> pick r ∈ {0,1}<sup>n</sup> uniformly; accept iff A(Br) = Cr. Three matrix–vector products: O(n²). If AB = C we always accept (no error). </p><p><b>Error bound:</b> suppose AB ≠ C and let D = AB − C ≠ 0; fix a nonzero entry, say row d = D<sub>i·</sub> ≠ 0 with d<sub>j</sub> ≠ 0. We accept only if Dr = 0, in particular d·r = 0, i.e. r<sub>j</sub> = −(Σ<sub>t≠j</sub> d<sub>t</sub>r<sub>t</sub>)/d<sub>j</sub>. Condition on all coordinates of r except r<sub>j</sub>: at most one of the two values {0,1} of r<sub>j</sub> satisfies the equation, so Pr[d·r = 0] ≤ 1/2. Hence Pr[accept | AB ≠ C] ≤ 1/2.</p><p>Repeat with k independent r's and accept only if all runs accept: false-accept probability ≤ 2<sup>−k</sup>, total time O(kn²). (This is the same one-coordinate conditioning trick that proves Schwartz–Zippel's base case — worth saying on the exam.)</p>",
            srcline: "Source: Zwick, \"Matrix and Graph Algorithms\" deck — the verified source of three exam problems."
          }
        ]
      },
      {
        id: "intel-mine-maxcut", sid: "MINE · Greedy Max-Cut", difficulty: "medium",
        src: "Williamson & Shmoys Ex. 5.2 (Ch. 5 = verified source of 2023A-P3 and 2024A-P4)",
        parts: [
          {
            part: "a", difficulty: "medium",
            summary: "Prove the greedy vertex-placement algorithm is a 1/2-approximation for Max Cut.",
            q: "<p>Consider this greedy algorithm for MAX CUT: number the vertices 1..n; put vertex 1 in U; for k = 2..n, consider the edges from k to vertices 1..k−1, and place k in U or in W — whichever side puts more of those edges across the (U, W) cut. Prove this is a 1/2-approximation.</p>",
            sol: "<p>When vertex k is placed, let d<sub>k</sub> be the number of edges from k to 1..k−1; the greedy choice cuts at least ⌈d<sub>k</sub>/2⌉ ≥ d<sub>k</sub>/2 of them. Every edge of G is counted exactly once — at its higher-numbered endpoint — so Σ<sub>k</sub> d<sub>k</sub> = |E| and the final cut has at least Σ<sub>k</sub> d<sub>k</sub>/2 = |E|/2 edges. Since OPT ≤ |E|, the cut is ≥ OPT/2.</p>",
            srcline: "Source: Williamson & Shmoys, The Design of Approximation Algorithms, Ex. 5.2. designofapproxalgs.com/book.pdf"
          },
          {
            part: "b", difficulty: "hard",
            summary: "Show greedy = the conditional-expectations derandomization of the random cut.",
            q: "<p>Prove that this greedy algorithm is <em>exactly</em> the derandomization, via the method of conditional expectations, of the algorithm that assigns each vertex to U or W independently with probability 1/2.</p>",
            basis: "Derandomization via conditional expectations was the closer of exam 2023A-P3 — he cites it as 'as seen in class'.",
            sol: "<p>With random ±assignments, each edge is cut with probability 1/2, so for any partial assignment of x₁..x<sub>k</sub> (sides of vertices 1..k):</p><div class=\"qmath\">E[cut | x₁..x<sub>k</sub>] = #(decided edges already cut) + ½·#(edges with an undecided endpoint).</div><p>The second term does not depend on the choice of x<sub>k</sub>, and among decided edges, only the edges from k to 1..k−1 are affected by x<sub>k</sub>. So maximizing E[cut | x₁..x<sub>k</sub>] over the two choices of x<sub>k</sub> = choosing the side that cuts more of the back-edges — precisely the greedy rule. The method of conditional expectations guarantees the final (deterministic) cut is ≥ E[cut] = |E|/2, re-proving (a).</p>"
          }
        ]
      },
      {
        id: "intel-mine-dicut", sid: "MINE · Max DiCut", difficulty: "hard",
        src: "Williamson & Shmoys Ex. 5.3 + 5.6 — combines his two favorite moves: 'write the IP' and 'round the relaxation'",
        parts: [
          {
            part: "a", difficulty: "medium",
            summary: "Random assignment gives a 1/4-approximation for Max DiCut.",
            q: "<p>In MAX DICUT the input is a directed graph with non-negative arc weights; we must choose U ⊆ V to maximize the total weight of arcs (i, j) with i ∈ U and j ∉ U. Prove that placing each vertex in U independently with probability 1/2 gives a randomized 1/4-approximation.</p>",
            sol: "<p>An arc (i, j) is cut iff i ∈ U and j ∉ U — two independent events of probability 1/2 each, so Pr[(i,j) cut] = 1/4. By linearity, E[weight cut] = (1/4)·Σ w<sub>ij</sub> ≥ OPT/4, since OPT can never exceed the total arc weight. (Derandomizable by conditional expectations exactly as in Max Cut.)</p>",
            srcline: "Source: Williamson & Shmoys Ex. 5.3."
          },
          {
            part: "b", difficulty: "hard",
            summary: "LP relaxation + biased rounding (1/4 + x*/2) gives a 1/2-approximation.",
            q: "<p>(i) Show this IP is valid for MAX DICUT: maximize Σ w<sub>ij</sub>z<sub>ij</sub> subject to z<sub>ij</sub> ≤ x<sub>i</sub>, z<sub>ij</sub> ≤ 1 − x<sub>j</sub>, x<sub>i</sub> ∈ {0,1}, 0 ≤ z<sub>ij</sub> ≤ 1. (ii) Solve the LP relaxation to get (x*, z*), and put i ∈ U independently with probability 1/4 + x*ᵢ/2. Prove the expected cut weight is at least (1/2)·OPT.</p>",
            sol: "<p>(i) With x<sub>i</sub> = 𝟙[i ∈ U]: if arc (i,j) is cut, x<sub>i</sub> = 1 and x<sub>j</sub> = 0, so z<sub>ij</sub> can be set to 1; otherwise min(x<sub>i</sub>, 1−x<sub>j</sub>) = 0 forces z<sub>ij</sub> = 0. So the IP optimum equals the max dicut weight, and OPT ≤ OPT<sub>LP</sub>.</p><p>(ii) Under the rounding, Pr[i ∈ U] = 1/4 + x*ᵢ/2 and Pr[j ∉ U] = 3/4 − x*ⱼ/2 = 1/4 + (1 − x*ⱼ)/2, independent, so with a := x*ᵢ, b := 1 − x*ⱼ and s := min(a, b) ≥ z*<sub>ij</sub>:</p><div class=\"qmath\">Pr[(i,j) cut] = (1/4 + a/2)(1/4 + b/2) ≥ (1/4 + s/2)² = 1/16 + s/4 + s²/4 ≥ s/2,</div><p>where the last inequality is equivalent to (2s − 1)² ≥ 0. Hence Pr[(i,j) cut] ≥ z*<sub>ij</sub>/2, and by linearity E[cut] ≥ (1/2)Σ w<sub>ij</sub>z*<sub>ij</sub> = OPT<sub>LP</sub>/2 ≥ OPT/2.</p>",
            srcline: "Source: Williamson & Shmoys Ex. 5.6."
          }
        ]
      },
      {
        id: "intel-mine-vchalf", sid: "MINE · VC half-integrality", difficulty: "hard",
        src: "Williamson & Shmoys Ex. 1.5 (Ch. 1 = verified source of the set-cover exam problems) — LP geometry meets approximation",
        parts: [
          {
            part: "a", difficulty: "hard",
            summary: "Every extreme point of the vertex-cover LP is half-integral (coords in {0, ½, 1}).",
            q: "<p>Consider the vertex-cover LP: minimize Σ wᵢxᵢ subject to xᵢ + xⱼ ≥ 1 for every edge (i,j), and 0 ≤ xᵢ ≤ 1. Prove that every extreme point (vertex) of the feasible polytope has xᵢ ∈ {0, ½, 1} for all i.</p>",
            sol: "<p>Let x be feasible with P = {i : ½ &lt; xᵢ &lt; 1} and Q = {i : 0 &lt; xᵢ &lt; ½}. If P ∪ Q = ∅ we are done. Otherwise define, for small ε &gt; 0:</p><div class=\"qmath\">y = x + ε·(𝟙<sub>P</sub> − 𝟙<sub>Q</sub>), &nbsp;&nbsp; z = x − ε·(𝟙<sub>P</sub> − 𝟙<sub>Q</sub>).</div><p>Both are feasible for small enough ε: box constraints hold since P, Q avoid {0, ½, 1}; for an edge constraint that is <em>tight</em> (xᵢ + xⱼ = 1), the endpoints are either {0-valued, 1-valued} or {½, ½} (both unmoved), or one in P and one in Q — where the +ε and −ε cancel, keeping the sum exactly 1. (Two endpoints of a tight edge cannot both be in P — their sum would exceed 1 — nor both in Q.) Non-tight constraints have slack and tolerate small ε. Then x = ½(y + z) with y ≠ z, so x is not an extreme point. Contrapositive: extreme points have P ∪ Q = ∅, i.e. all coordinates in {0, ½, 1}.</p>",
            srcline: "Source: Williamson & Shmoys, Ex. 1.5(a)."
          },
          {
            part: "b", difficulty: "hard",
            summary: "Use half-integrality + 4-coloring to get a 3/2-approximation for weighted VC on planar graphs.",
            q: "<p>Any planar graph can be properly 4-colored in polynomial time (you may use this). Using part (a), give a 3/2-approximation algorithm for weighted vertex cover on planar graphs.</p>",
            sol: "<p>Solve the LP and take an optimal <em>extreme-point</em> solution x*, so V splits into V₀, V<sub>½</sub>, V₁ by value. The induced (planar) graph G[V<sub>½</sub>] can be 4-colored; let C be the color class of <em>largest weight</em>, so w(V<sub>½</sub> \\ C) ≤ (3/4)·w(V<sub>½</sub>). Output S = V₁ ∪ (V<sub>½</sub> \\ C).</p><p><b>S is a cover:</b> an edge with an endpoint of value 0 has its other endpoint at value ≥ 1 (constraint), so it is covered by V₁; an edge with both endpoints in V<sub>½</sub> cannot have both in C (C is independent in G[V<sub>½</sub>]); edges touching V₁ are covered; ½–0 edges are infeasible so don't exist.</p><p><b>Ratio:</b> w(S) ≤ w(V₁) + (3/4)w(V<sub>½</sub>) ≤ (3/2)·(w(V₁) + ½·w(V<sub>½</sub>)) = (3/2)·(LP value) ≤ (3/2)·OPT.</p>",
            srcline: "Source: Williamson & Shmoys, Ex. 1.5(b)."
          }
        ]
      },
      {
        id: "intel-mine-karger", sid: "MINE · Karger amplification", difficulty: "medium",
        src: "Mitzenmacher & Upfal Ch. 1, next to Ex. 1.23 (= verified source of exam 2024B-P3)",
        parts: [
          {
            part: "a", difficulty: "medium",
            summary: "Survival probability of a fixed min cut until k vertices remain: k(k−1)/(n(n−1)).",
            q: "<p>Run Karger's contraction algorithm on G (n vertices) but stop when k vertices remain. Prove that a <em>fixed</em> minimum cut F survives (no edge of F contracted) with probability at least k(k−1) / (n(n−1)).</p>",
            sol: "<p>Let c = |F|. When j vertices remain, the (multi)graph still has min cut ≥ c, so every vertex has degree ≥ c and there are ≥ jc/2 edges. Hence Pr[the next contraction hits F] ≤ c/(jc/2) = 2/j. So</p><div class=\"qmath\">Pr[F survives] ≥ Π<sub>j=k+1..n</sub> (1 − 2/j) = Π<sub>j=k+1..n</sub> (j−2)/j = k(k−1) / (n(n−1))</div><p>by telescoping (numerators n−2, n−3, …, k−1 against denominators n, n−1, …, k+1). Setting k = 2 recovers the classic 2/(n(n−1)) bound — and the exam's 2024B-P3 corollary that there are at most n(n−1)/2 minimum cuts.</p>",
            srcline: "Source: Mitzenmacher & Upfal, Probability and Computing, Ch. 1 (Ex. 1.25 territory; Ex. 1.23 is exam 2024B-P3)."
          },
          {
            part: "b", difficulty: "easy",
            summary: "How many independent runs of basic Karger to succeed w.p. ≥ 1 − 1/n²?",
            q: "<p>A single run of the basic contraction algorithm (down to 2 vertices) finds a specific minimum cut with probability ≥ 2/(n(n−1)). How many independent runs guarantee finding a minimum cut with probability at least 1 − 1/n², and what is the total running time?</p>",
            sol: "<p>With t independent runs (output the best cut found), the failure probability is at most</p><div class=\"qmath\">(1 − 2/(n(n−1)))<sup>t</sup> ≤ (1 − 2/n²)<sup>t</sup> ≤ e<sup>−2t/n²</sup>,</div><p>using 1 − x ≤ e<sup>−x</sup>. Taking t = n²·ln n gives failure ≤ e<sup>−2 ln n</sup> = 1/n². Each run is O(n²), so O(n⁴ log n) total. This \"repeat and take the best, bound failure with 1−x ≤ e^{−x}\" pattern is the same amplification move as in the BPP T/F items — one trick, many costumes.</p>"
          }
        ]
      }
    ]
  }
]};
