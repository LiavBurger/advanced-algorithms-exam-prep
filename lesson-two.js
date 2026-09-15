/* Session 2: fixed sequence, authored feedback, then paper practice. */
window.renderLessonTwo = function(host,state,save,onComplete){
  const pages=[
    {
      title:'Recall the count, then add one new step',time:'5 minutes',
      body:`<p>Last lesson, you calculated expected counts using indicators. Today you will use those averages to prove that a good object <strong>exists</strong>.</p><p>The complete lesson is about 60 minutes, including paper practice. The first check is a short retrieval exercise; your answer will not change the sequence.</p><div class="example"><p>A directed graph has m edges and no self-loops. Independently put each vertex into U or W with equal probability. Let X count edges directed from U to W.</p></div>`,
      checks:[{id:'recall-directed',prompt:'What is E[X]?',options:[
        ['m/2',false,'Only the direction from U to W counts. Each directed edge contributes (1/2) × (1/2) = 1/4; counting both directions gives the wrong event.'],
        ['m/4',true,'Define one indicator per edge, compute its probability 1/4, and add the m contributions by linearity.'],
        ['(1/4)ᵐ',false,'An expected count adds contributions. A product would concern simultaneous events, and edge indicators are not assumed mutually independent.']
      ]}]
    },
    {
      title:'Why an average proves existence',time:'10 minutes',
      body:`<p>In a finite random experiment, at least one outcome has value <strong>at least E[X]</strong>. Otherwise every outcome with positive probability would have value strictly below E[X], making their weighted average strictly below E[X] too—a contradiction.</p><div class="worked-line"><strong>The line to add to an exam proof</strong><p>“Since E[X] ≥ t, some outcome has X ≥ t; otherwise the average would be below t.”</p></div><p>For the directed cut, E[X] = m/4 therefore proves there is a partition with at least m/4 edges from U to W. If the threshold is not an integer, an integer count must reach its ceiling: at least 2.5 means at least 3.</p><p>This is an existence proof. It need not identify the partition or give a useful probability that a single random trial finds one.</p><div class="example"><p>Suppose X is 100 with probability 0.01 and 0 otherwise. E[X] = 1, but P(X ≥ 1) = 0.01. The average establishes existence, not a success probability of 1/2 or 0.99.</p></div>`,
      checks:[{id:'average-witness',prompt:'A finite experiment has an integer-valued score X with E[X] = 4.2. What follows?',options:[
        ['Every outcome scores at least 4.',false,'An average does not bound every outcome from below. Scores below the mean can be offset by scores above it.'],
        ['Some outcome scores at least 5.',true,'Some outcome reaches or exceeds 4.2. Since scores are integers, that outcome scores at least 5.'],
        ['An outcome must score exactly 4.2.',false,'The mean need not itself be a possible score, especially when all scores are integers.']
      ]},{id:'rare-good',prompt:'In the 100-or-0 example above, does repeating ten times guarantee finding a positive score?',options:[
        ['Yes, because the expected score is positive.',false,'Positive expectation ensures a positive score is possible, not certain. All ten trials can still score zero.'],
        ['No. Even independent trials can all score zero.',true,'The probability of ten zero scores is 0.99¹⁰, which is positive. A search guarantee requires its own success-probability analysis.']
      ]}]
    },
    {
      title:'Worked proof: a cut with many edges exists',time:'10 minutes',
      body:`<p><strong>Claim.</strong> Every simple undirected graph with m edges has a partition into two sides with at least m/2 crossing edges.</p><div class="worked-line"><strong>1. Choose a random candidate.</strong><p>Assign each vertex independently to A or B with equal probability.</p><small>Why: this gives a distribution over valid partitions. We are free to choose the experiment because the problem asks us to prove existence.</small></div><div class="worked-line"><strong>2. Count the desired feature.</strong><p>For each edge e, let Yₑ be an indicator random variable for its endpoints being on different sides. Let X = Σ Yₑ count crossing edges.</p></div><div class="worked-line"><strong>3. Calculate the expectation.</strong><p>For a fixed edge, (A,B) and (B,A) each have probability 1/4. Hence E[Yₑ] = 1/2. By linearity, E[X] = m/2.</p><small>Independence of the vertex choices calculates each edge's probability. Linearity adds the expectations without requiring independence between edge indicators.</small></div><div class="worked-line"><strong>4. Conclude the requested statement.</strong><p>Some partition has at least E[X] = m/2 crossing edges, by the averaging argument.</p><small>The task asks for existence, so this proof does not need to find that particular partition or analyze a search algorithm.</small></div>`,
      checks:[{id:'missing-existence',prompt:'A solution stops at “E[X] = m/2.” Which sentence explicitly finishes the existence proof?',options:[
        ['Therefore the sampled partition always has m/2 crossing edges.',false,'This converts an average into a per-trial guarantee, which the calculation does not establish.'],
        ['The crossing-edge indicators are mutually independent.',false,'This is not needed for the proof and does not provide the existence conclusion.'],
        ['Some partition has at least m/2 crossing edges, since at least one score is at least its average.',true,'This connects the expectation calculation to the actual claim: a single partition with enough edges exists.']
      ]}]
    },
    {
      title:'A second route: fewer than one expected failure',time:'10 minutes',
      body:`<p>Sometimes the target is that <strong>no bad event</strong> occurs. Let B count how many bad events occur. It is a nonnegative integer.</p><p>If E[B] &lt; 1, there must be an outcome with B = 0. Otherwise B ≥ 1 on every outcome with positive probability, implying E[B] ≥ 1.</p><div class="example"><p>For instance, suppose a random construction can violate 20 constraints and each constraint is violated with probability at most 1/100. Define one indicator for each violation. Linearity gives E[B] ≤ 20/100 = 0.2 &lt; 1. Hence there is a construction with no violated constraints.</p><p>The violations may be dependent. Their expected counts still add.</p></div><p>A related route is to show P(at least one failure) &lt; 1. Then its complement has positive probability, so a failure-free outcome exists. The union bound gives P(at least one failure) ≤ the sum of the individual failure probabilities.</p><p>Both arguments need a strict inequality below 1. An upper bound equal to 1 tells us nothing about whether zero failures is possible.</p>`,
      checks:[{id:'one-bad',prompt:'If E[B] = 1 for a nonnegative integer failure count, must there be an outcome with B = 0?',options:[
        ['Yes, by rounding the average down.',false,'Consider B = 1 on every outcome. Its expectation is 1, yet no failure-free outcome exists. The strict inequality matters.'],
        ['No; B might equal 1 on every outcome.',true,'This counterexample satisfies the premise while excluding B = 0. The theorem requires E[B] < 1.']
      ]},{id:'integer-bad',prompt:'Why is it important that B is an integer count, rather than any nonnegative real number?',options:[
        ['If B is never zero, integrality forces B ≥ 1.',true,'That is the contradiction step. A real-valued variable could be 0.2 on every outcome, with expectation below 1 but no zero outcome.'],
        ['Real-valued random variables do not have expectations.',false,'Real-valued random variables can have expectations. The issue is that positive real values need not be at least one.']
      ]}]
    },
    {
      title:'Practice A · complete a satisfiability proof',time:'10 minutes',
      body:`<p><strong>Definitions.</strong> A Boolean variable is true or false. A literal is a variable or its negation. An OR-clause is satisfied when at least one of its literals is true. A 3-CNF formula is a collection of such clauses, each containing three literals.</p><p><strong>Claim.</strong> If each clause uses three distinct variables, some assignment satisfies at least 7m/8 of the m clauses.</p><p>Copy and complete this short proof on paper:</p><div class="example"><p>Set each variable independently true or false with equal probability. Each clause is unsatisfied exactly when all three literals are false, which has probability <strong>[A]</strong>. Thus its satisfaction indicator has expectation <strong>[B]</strong>. By linearity, the total satisfied count has expectation <strong>[B] × m</strong>. Therefore <strong>[finish the existence argument]</strong>.</p></div><p>Check the two numerical gaps, then the reasoning choices. Negation does not change a literal's probability of being false under a fair random assignment.</p>`,
      numeric:[
        {id:'clause-fails',label:'A · probability one clause is unsatisfied',value:0.125,correct:'All three literals must be false. They involve distinct, independently assigned variables, so the probability is (1/2)³ = 1/8.',wrong:'For an OR-clause to fail, all three literals must be false simultaneously. Multiply the three probabilities 1/2; do not add them.'},
        {id:'clause-succeeds',label:'B · expected value of one satisfaction indicator',value:0.875,correct:'The clause is satisfied with probability 1 − 1/8 = 7/8, which equals its indicator expectation.',wrong:'This indicator counts satisfaction, not failure. Subtract the probability of all three literals being false from one.'}
      ],
      checks:[{id:'shared-variables',prompt:'Two clauses may share variables. Does that prevent using linearity for their satisfaction indicators?',options:[
        ['No; linearity does not require independence between clauses.',true,'The distinct-variable assumption is within each clause, to compute its failure probability. Shared variables between clauses do not stop us adding expectations.'],
        ['Yes; every clause must use entirely different variables from every other clause.',false,'That restriction is stronger than needed. Linearity works for dependent indicators as well.']
      ]},{id:'sat-conclusion',prompt:'Choose the final sentence of the proof.',options:[
        ['The formula is fully satisfiable because 7/8 is positive.',false,'The target is satisfying a fraction of the clauses. Neither positive expectation nor a 7/8 bound guarantees satisfying every clause.'],
        ['At least one assignment satisfies at least 7m/8 clauses, by averaging.',true,'This is exactly the existence conclusion supported by E[X] = 7m/8. It does not promise the first random assignment attains it.'],
        ['Every assignment satisfies at least 7m/8 clauses.',false,'Individual assignments can fall below the average. We have proved existence, not a statement about every assignment.']
      ]}],
      end:`<details><summary>Compare the completed argument</summary><p>Assign variables independently and uniformly. Let Yⱼ be an indicator random variable for clause j being satisfied, and let X = Σ Yⱼ. Because a clause has three distinct variables, the probability all of its literals are false is 1/8. Consequently E[Yⱼ] = 7/8, and linearity gives E[X] = 7m/8. Some assignment has X ≥ 7m/8, since a finite collection of scores contains a score at least its average.</p><p>If repeated variables were permitted within a clause, the exact 1/8 calculation would need reconsideration. For example, x OR x OR x is satisfied with probability only 1/2. Always check the assumptions.</p></details>`
    },
    {
      title:'Practice B · prove existence on paper',time:'15 minutes',
      body:`<p><strong>Problem.</strong> Let V be a finite set and F a family of m subsets of V, each containing exactly three distinct elements. Prove that V can be colored red and blue so that at least 3m/4 of the subsets contain <strong>both colors</strong>. Different subsets may overlap.</p><p>Spend about ten minutes writing a proof, then five checking and repairing it. This is an existence problem; you do not need a deterministic algorithm or a runtime bound. Write on paper, with hints and solutions closed initially.</p><details><summary>Hint 1 · choose a random candidate</summary><p>Color each element independently red or blue with probability 1/2.</p></details><details><summary>Hint 2 · calculate one subset's success probability</summary><p>A fixed subset has eight equally likely assignments of colors to its three distinct elements. It fails to contain both colors only when all three are red or all three are blue.</p></details><details><summary>Hint 3 · finish the proof</summary><p>Define one indicator per successful subset and add them. Once you know the expected successful count, state why some complete coloring achieves at least that many.</p></details><p>The checking rubric below is for self-assessment. The site does not grade your written proof automatically.</p>`,
      checks:[],
      end:`<details><summary>Compare · random experiment and counted events</summary><p>Color each element of V independently red or blue, with equal probability. For each S in F, let Yₛ be an indicator random variable for S containing both colors. Let X = Σ Yₛ be the number of such subsets.</p></details><details><summary>Compare · probability and expectation</summary><p>For a fixed S, the all-red and all-blue events are disjoint and each has probability (1/2)³ = 1/8. Therefore P(Yₛ = 1) = 1 − 1/8 − 1/8 = 3/4. Linearity gives E[X] = (3/4)m. Overlap between subsets can cause dependence, but does not affect linearity.</p></details><details><summary>Compare · existence conclusion</summary><p>By averaging over the finite set of colorings, some coloring has X ≥ E[X] = 3m/4. Thus that coloring satisfies the claim. We have not proved that all subsets can simultaneously contain both colors.</p></details><section class="panel"><h3>Check your written proof</h3><p>Mark only the arguments actually present on your page. Fix a missing line, then close the comparison and rewrite it.</p><div id="paper-rubric"></div><p id="rubric-status" role="status"></p></section><p class="prompt">Two conclusions to keep distinct: a high expected score gives a good outcome by averaging; an integer failure count with expectation below one gives an outcome with no failures.</p><p>Your next fixed session is concentration bounds. Session 5 includes the scheduled recall of this lesson. You can stop here today.</p>`
    }
  ];
  window.renderGuidedLesson(host,state,save,onComplete,{pages,number:2,stateKey:'lessonTwo',
    source:'<p>The existence method follows the course’s <a href="../Presentations/Recitations/recitation3-probabilistic_method_and_chernoff_slides.pdf">probabilistic-method recitation</a>. These teaching examples and practice questions are authored for this lesson. Expectation and indicators build on session 1. Searching efficiently for a guaranteed good outcome is a separate topic.</p>',
    rubric:[
      ['experiment','I specified independent, fair coloring of the elements.'],
      ['indicators','I defined indicators for subsets containing both colors and their total count.'],
      ['probability','I counted both monochromatic cases and obtained success probability 3/4.'],
      ['linearity','I used linearity to obtain expected count 3m/4.'],
      ['overlap','My proof does not require independence between overlapping subsets.'],
      ['existence','I explicitly concluded that some coloring attains at least the average.']
    ]});
};
