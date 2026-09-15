/* Session 3: expectation, concentration for a fixed count, then a union bound. */
window.renderLessonThree = function(host,state,save,onComplete){
  const pages=[
    {
      title:'From an average to a probability guarantee',time:'5 minutes',
      body:`<p>Session 2 used averages to prove existence. Today the goal is stronger: bound the chance of a bad deviation, then make many requirements hold simultaneously.</p><p>The seven sections total about 60 minutes, including paper practice. The sequence is fixed; no score changes the next step.</p><div class="example"><p>Let X count heads in k independent fair coin tosses. E[X] = k/2. Knowing this average alone does not quantify P(|X − k/2| ≥ k/4).</p><p>The absolute value means we count deviations in <strong>either direction</strong>: X ≤ k/4 or X ≥ 3k/4. A concentration bound estimates how likely that deviation is.</p></div>`,
      checks:[{id:'mean-vs-probability',prompt:'What does the expectation E[X] = k/2 establish by itself?',options:[
        ['Some outcome has X ≥ k/2, by averaging.',true,'That is the existence conclusion from session 2. To show most outcomes are near k/2, use additional information about the distribution.'],
        ['Every outcome has exactly k/2 heads.',false,'All tails and all heads remain possible. Expectation is a weighted average over outcomes.'],
        ['The probability of X ≥ k/2 must be at least 0.99.',false,'The mean by itself does not give this probability. A tail or success-probability bound needs an additional argument.']
      ]}]
    },
    {
      title:'Match the bound to its assumptions',time:'8 minutes',
      body:`<p><strong>Markov.</strong> If X is nonnegative and a &gt; 0, then P(X ≥ a) ≤ E[X]/a. No independence is needed. On the event X ≥ a, X contributes at least a to its value; averaging gives E[X] ≥ a × P(X ≥ a).</p><div class="example"><p>If E[X] = 10 and X ≥ 0, then P(X ≥ 50) ≤ 10/50 = 1/5. The actual probability may be smaller. A bound above 1 is uninformative, since a probability is already at most 1.</p></div><p><strong>Chebyshev.</strong> Write μ = E[X]. The variance is Var(X) = E[(X − μ)²], the average squared distance from the mean. For a &gt; 0 and finite variance:</p><p>P(|X − μ| ≥ a) ≤ Var(X)/a².</p><p>This follows by applying Markov to the nonnegative variable (X − μ)². Chebyshev itself does not require independence. When calculating the variance of a sum, independence lets us add variances. For k independent indicators each equal to 1 with probability p, Var(X) = kp(1 − p).</p><p><strong>Chernoff</strong> will give a stronger exponential bound for a sum of mutually independent indicators. Check that assumption before using it.</p>`,
      checks:[{id:'markov-condition',prompt:'If E[X] = 0 but X can be negative, can Markov conclude P(X ≥ 1) = 0?',options:[
        ['Yes; the mean is zero.',false,'Markov requires nonnegativity. A variable equal to −1 or 1 with equal probability has mean zero and P(X ≥ 1) = 1/2.'],
        ['No; X must be nonnegative for that application.',true,'Negative values can cancel positive ones in the average. That is why the nonnegativity assumption is essential.']
      ]},{id:'chebyshev-threshold',prompt:'If Var(X) = 9, what upper bound does Chebyshev give for P(|X − E[X]| ≥ 6)?',options:[
        ['9/6',false,'The denominator is the square of the deviation threshold. Chebyshev applies Markov to a squared distance.'],
        ['9/36 = 1/4',true,'Substitute Var(X) = 9 and a = 6 into Var(X)/a².'],
        ['0, because 6 is larger than the variance.',false,'Variance is an average squared distance, not a limit on possible deviations. Large deviations may still occur.']
      ]}]
    },
    {
      title:'Chernoff: identify the count and the deviation',time:'8 minutes',
      body:`<p>Use the <strong>Simple Fractional Form</strong> on page 1 of your <a href="../Advanced_Algorithms_Formula_Sheet.pdf#page=1">formula sheet</a>. Its notation is:</p><div class="example"><p>X = Σᵢ₌₁ᴺ Xᵢ, Xᵢ ∈ {0,1}</p><p>The N indicators must be mutually independent. For ε &gt; 0:</p><p>P(|X − E[X]| ≥ εN) ≤ 2e^(−2ε²N)</p></div><p>The sheet's <strong>Absolute Deviation</strong> form writes the deviation as t:</p><p>t = εN, ε = t/N</p><p>P(|X − E[X]| ≥ t) ≤ 2e^(−2t²/N)</p><p>The leading two accounts for both tails. A one-sided event can also be bounded by this two-sided bound.</p><p>Keep the quantities separate: N counts indicators; E[X] is their mean; t is the absolute deviation. The fractional parameter ε is t divided by N, not by the mean.</p><p>In our examples the number of indicators is called k, so N = k. For indicators of probability p, E[X] = kp. Thus a deviation of εk has the bound:</p><p>P(|X − kp| ≥ εk) ≤ 2 exp(−2ε²k)</p><p>The exponent is typeset above the e, just as on the sheet. Use this same form in the exercises below.</p>`,
      checks:[{id:'additive-epsilon',prompt:'X sums 100 independent indicators of probability 0.2. To bound |X − 20| ≥ 5, what ε belongs in this additive formula?',options:[
        ['5/20 = 1/4',false,'That divides the deviation by the mean. In this additive formula εk = 5 and k = 100, so divide by 100.'],
        ['5/100 = 1/20',true,'The event becomes |X − kp| ≥ εk with k = 100, p = 0.2, and ε = 0.05.'],
        ['5',false,'5 is the absolute deviation a. In the εk form, divide that deviation by the number of indicators.']
      ]},{id:'dependent-colors',prompt:'One fair coin makes all k vertices red or all blue. Can this Chernoff formula be applied to the red count using k indicators?',options:[
        ['Yes; each vertex is red with probability 1/2.',false,'Correct marginal probabilities do not imply independence. These indicators are all determined by the same coin.'],
        ['No; the vertex indicators are not mutually independent.',true,'Linearity still gives mean k/2, but this construction always has either 0 or k red vertices. The independent-sum Chernoff theorem does not apply.']
      ]}]
    },
    {
      title:'Worked proof: control one vertex first',time:'8 minutes',
      body:`<p><strong>Problem.</strong> Independently color every vertex of a simple graph red or blue with equal probability. Fix a vertex v with degree d &gt; 0. Bound the probability that its number of red neighbors lies outside [d/4, 3d/4].</p><div class="worked-line"><strong>1. Fix the object and define its count.</strong><p>Let Xᵥ be the number of red neighbors of v. For each of its d distinct neighbors, use an indicator for being red. These indicators are independent because the vertex colors are independently chosen.</p></div><div class="worked-line"><strong>2. Write the mean and bad event.</strong><p>E[Xᵥ] = d/2. If Xᵥ is outside [d/4, 3d/4], then |Xᵥ − d/2| &gt; d/4.</p></div><div class="worked-line"><strong>3. Substitute into the bound.</strong><p>Use k = d, p = 1/2 and ε = 1/4. Chernoff bounds the larger event |Xᵥ − d/2| ≥ d/4 by</p><p>2 exp(−2 × (1/4)² × d) = 2 exp(−d/8).</p><small>A bound on the larger event also bounds our strict bad event. Noninteger thresholds cause no problem: Xᵥ is still an integer count.</small></div><div class="worked-line"><strong>4. State exactly what has been proved.</strong><p>This bounds failure for this fixed vertex v. It has not yet bounded failure somewhere in the graph.</p></div>`,
      checks:[{id:'fixed-vertex',prompt:'Why is this not already a bound on failure anywhere in the graph?',options:[
        ['Because another vertex could fail; there are many possible bad events.',true,'For a simultaneous guarantee, account for the event that at least one vertex fails, using a union bound next.'],
        ['Because linearity does not apply to neighbor indicators.',false,'Linearity does apply. The missing step is combining bad events across vertices, not calculating a mean.'],
        ['Because the probability bound must equal the true failure probability.',false,'An upper bound is sufficient. The issue is which event it bounds: failure at one fixed vertex versus failure at any vertex.']
      ]}]
    },
    {
      title:'Union bound: turn one guarantee into many',time:'8 minutes',
      body:`<p>For bad events B₁, …, Bᵣ:</p><div class="example"><p>P(at least one Bᵢ occurs) ≤ Σ P(Bᵢ)</p><p>If every bad-event probability is at most q, this is at most rq. No independence between the bad events is needed.</p></div><p>Why: the indicator for “at least one failure” is at most the sum of the individual failure indicators. Take expectations.</p><p>Let Bᵥ denote failure at vertex v. For minimum degree D &gt; 0, the worked calculation gives:</p><p>P(Bᵥ) ≤ 2 exp(−deg(v)/8) ≤ 2 exp(−D/8)</p><p>There are n vertices. Therefore:</p><p>P(some vertex fails) ≤ 2n exp(−D/8)</p><p>Shared neighbors can make these events dependent. That is fine for the union bound.</p><p>For an overall failure target η, require:</p><p>2n exp(−D/8) ≤ η</p><p>Taking natural logarithms gives the sufficient condition:</p><p>D ≥ 8 ln(2n/η)</p><p>Here ln is the natural logarithm. Use the identity e^(−3 ln n) = n^(−3) to simplify powers before multiplying by the number of events.</p>`,
      checks:[{id:'count-events',prompt:'There are 100 bad events, each of probability at most 0.0001. What does the union bound give?',options:[
        ['At most 0.01 for at least one failure.',true,'Add the 100 bounds: 100 × 0.0001 = 0.01. Therefore all requirements hold with probability at least 0.99.'],
        ['At most 0.0001 for at least one failure.',false,'That is the bound for a single event. The union can be more likely because any one of 100 events can cause failure.'],
        ['Exactly 0.01 for at least one failure.',false,'The union bound is an upper bound, not generally an equality. Overlapping events can make the union probability smaller.']
      ]}]
    },
    {
      title:'Practice A · complete the bound',time:'8 minutes',
      body:`<p><strong>Problem.</strong> For n ≥ 2, a family contains at most n² subsets of a finite ground set. Every subset has exactly k elements. Color each ground-set element independently red or blue, with equal probability. Call a subset bad if its red count is outside [k/4, 3k/4]. Subsets may overlap.</p><p>Complete these lines on paper:</p><div class="example"><p>For a fixed subset, the count has mean k/2 and absolute deviation threshold k/4. In the additive bound, ε = <strong>[A]</strong>.</p><p>Thus its bad-event probability is at most 2 exp(−[B] × k).</p><p>There are at most n² bad events, so the total failure probability is at most <strong>[combine the events]</strong>.</p><p>If k ≥ 32 ln n, substitute this into the exponent and simplify.</p></div>`,
      numeric:[
        {id:'subset-epsilon',label:'A · deviation divided by the number of elements',value:0.25,correct:'The deviation is k/4 and there are k indicators, so ε = (k/4)/k = 1/4.',wrong:'Divide the absolute deviation k/4 by k. Dividing by the mean k/2 would give a multiplicative parameter, not the ε in this formula.'},
        {id:'subset-exponent',label:'B · positive coefficient of k in the negative exponent',value:0.125,correct:'2ε² = 2 × (1/4)² = 1/8, so the exponent is −k/8.',wrong:'Square ε before multiplying by 2: 2 × (1/4)². Enter the positive coefficient B; the minus sign is already in the formula.'}
      ],
      checks:[{id:'subset-union',prompt:'Which upper bound accounts for all subsets?',options:[
        ['2n² exp(−k/8)',true,'Multiply the per-subset bound by at most n² subsets. Their overlap does not invalidate the union bound.'],
        ['2 exp(−k/8)',false,'That is only the fixed-subset bound. There may be up to n² different ways for the construction to fail.'],
        ['It cannot be bounded unless the subsets are disjoint.',false,'Distinct elements within one subset have independent colors. Across subsets, dependence is allowed by the union bound.']
      ]},{id:'subset-log',prompt:'With k ≥ 32 ln n, what follows from that upper bound?',options:[
        ['It is at most 2/n², and hence at most 1/n for n ≥ 2.',true,'exp(−k/8) ≤ exp(−4 ln n) = n⁻⁴. Multiplying by 2n² gives 2/n².'],
        ['The substitution gives n⁻¹ instead of n⁻⁴.',false,'The exponent is −(32/8) ln n = −4 ln n, so the substitution gives n⁻⁴. Keep the factor of four in the exponent.'],
        ['It becomes zero.',false,'A small exponential bound is still positive. This is a probability guarantee, not a claim that failure is impossible.']
      ]}],
      end:`<details><summary>Compare the complete calculation</summary><p>For a fixed subset S, let Xₛ count red elements. It sums k independent fair indicators, so E[Xₛ] = k/2. Being outside [k/4, 3k/4] implies |Xₛ − k/2| ≥ k/4. With ε = 1/4, Chernoff gives a failure bound 2 exp(−k/8). By a union bound over at most n² subsets, the probability any subset fails is at most 2n² exp(−k/8). If k ≥ 32 ln n, this is at most 2n² × n⁻⁴ = 2/n² ≤ 1/n. Therefore all subsets satisfy their count bounds with probability at least 1 − 1/n.</p></details>`
    },
    {
      title:'Practice B · write a simultaneous guarantee',time:'15 minutes',
      body:`<p><strong>Problem.</strong> Let G be a simple undirected graph with n ≥ 2 vertices and degree at least 24 ln n at every vertex. Independently color each vertex red or blue with equal probability.</p><p>Prove that, with probability at least <strong>1 − 2/n²</strong>, every vertex v has at least deg(v)/4 red neighbors and at least deg(v)/4 blue neighbors. Conclude that such a coloring exists.</p><p>Write your proof on paper. Allow about ten minutes to attempt it and five to compare and repair. You may use the additive Chernoff formula from section 3 without proving it. This question analyzes the specified random coloring; no runtime analysis is requested.</p><details><summary>Hint 1 · express both color requirements with one count</summary><p>If Xᵥ counts red neighbors and d = deg(v), then the blue count is d − Xᵥ. Both conditions hold when d/4 ≤ Xᵥ ≤ 3d/4.</p></details><details><summary>Hint 2 · fix one vertex first</summary><p>Xᵥ sums d independent fair indicators, with mean d/2. Use an absolute deviation d/4, and therefore ε = 1/4.</p></details><details><summary>Hint 3 · combine and simplify</summary><p>Bound failure at one vertex by 2 exp(−d/8). Use d ≥ 24 ln n, then a union bound over n vertices. Only after that take the complementary probability.</p></details><p>Your paper proof is self-checked below; it is not automatically graded.</p>`,
      checks:[],
      end:`<details><summary>Compare · event and independence</summary><p>Fix v and let d = deg(v). Let Xᵥ count its red neighbors. Write Xᵥ as a sum of d indicators, one for each distinct neighbor being red. These indicators are independent because colors of distinct vertices are independently chosen. Hence E[Xᵥ] = d/2.</p><p>Both red and blue counts are at least d/4 precisely when Xᵥ lies in [d/4, 3d/4]. Failure implies |Xᵥ − d/2| &gt; d/4.</p></details><details><summary>Compare · concentration and the union bound</summary><p>Apply Chernoff to the larger event with deviation at least d/4, using ε = 1/4: P(v fails) ≤ 2 exp(−d/8). Since d ≥ 24 ln n, this is at most 2 exp(−3 ln n) = 2/n³.</p><p>A union bound over all n vertices gives P(some vertex fails) ≤ n × (2/n³) = 2/n². Failure events at different vertices need not be independent.</p></details><details><summary>Compare · conclude both requested statements</summary><p>By taking the complement, every vertex meets both neighbor-count requirements with probability at least 1 − 2/n². This number is positive for n ≥ 2, so there exists a coloring with the required property.</p><p>Notice the order: calculate for a fixed vertex, union bound over vertices, then conclude the simultaneous guarantee and existence. A per-vertex guarantee alone does not establish the claim.</p></details><section class="panel"><h3>Check your written proof</h3><p>Mark only the arguments that actually appear in your answer. If one is missing, add it and reconstruct that step with the comparison closed.</p><div id="paper-rubric"></div><p id="rubric-status" role="status"></p></section><p class="prompt">The sequence to remember: fix an object → define the count and mean → express its failure event → apply a bound with checked assumptions → count all bad events → take the complement.</p><p>Session 6 contains the fixed recall of this topic. Next is session 4, sampling and error guarantees; the schedule does not change based on your answers.</p>`
    }
  ];
  window.renderGuidedLesson(host,state,save,onComplete,{pages,number:3,stateKey:'lessonThree',typeset:true,
    source:'<p>Markov, Chebyshev, and the additive Chernoff form follow the <a href="../Presentations/Lectures/Randomized.pdf">randomized-algorithms lectures</a>. Combining concentration with a union bound follows <a href="../Presentations/Recitations/recitation3-probabilistic_method_and_chernoff_slides.pdf">recitation 3</a>. The worked problems here are teaching variants, not quoted exam questions.</p>',
    rubric:[
      ['event','I expressed both color requirements using the red count and its failure interval.'],
      ['independence','I explained why the indicators inside a fixed vertex’s count are independent.'],
      ['parameters','I used mean d/2 and additive ε = 1/4 to obtain 2 exp(−d/8).'],
      ['degree','I used the minimum degree to bound one vertex’s failure by 2/n³.'],
      ['union','I applied a union bound over n vertices to obtain total failure at most 2/n².'],
      ['conclusion','I took the complement and used its positive probability to conclude existence.']
    ]});
};
