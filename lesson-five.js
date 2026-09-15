/* Session 5: contraction, conditional survival, amplification, and counting cuts. */
window.renderLessonFive = function(host,state,save,onComplete){
  const pages=[
    {
      title:'What a minimum cut asks for',time:'5 minutes',
      body:`<p>Today we use randomness to find a minimum cut. The seven sections take about 60 minutes, including a past-exam proof on paper. This is a different goal from estimating a proportion.</p><p>Work with a <strong>connected, undirected, unweighted</strong> graph on n vertices, with ⟦s5.n-positive⟧. A cut partitions the vertices into two nonempty sides:</p><p>⟦s5.cut⟧</p><p>Its size ⟦s5.size⟧ counts edges crossing between the sides. Swapping the sides gives the same cut. The minimum possible size is</p><p>⟦s5.lambda⟧</p><p>Connectedness ensures ⟦s5.positive⟧. Parallel edges, when present, count separately.</p><p><strong>Scheduled recall of session 2.</strong> Proving that a good outcome exists is not the same as proving a particular random trial finds it with high probability. This lesson will explicitly bound one run and then use repetition.</p>`,
      checks:[{id:'cut-objective',prompt:'If a randomized algorithm always returns a valid cut, has it necessarily solved minimum cut?',options:[
        ['Yes; any partition is a minimum cut.',false,'A valid partition may have too many crossing edges. Minimum cut requires the smallest possible crossing count.'],
        ['No; we must analyze the probability that the cut is minimum.',true,'Every run can return a valid cut while only some runs attain the optimum. Repetition will help with this kind of error.']
      ]}]
    },
    {
      title:'Contraction: merge vertices, preserve edge copies',time:'8 minutes',
      body:`<p>A <strong>supervertex</strong> represents a group of original vertices. Initially each group has one vertex. To contract an edge, merge its endpoints into one supervertex.</p><ol><li>Choose uniformly from the current <strong>edge copies</strong>.</li><li>Merge the endpoint groups and update incident edges.</li><li>Delete self-loops created inside the merged group.</li><li>Keep parallel edges as distinct copies.</li></ol><p>Stop when two supervertices remain. Their original-vertex groups define the returned cut.</p><div class="example"><p><strong>Small example.</strong> Start with a triangle on A, B, C. Contract edge AB.</p><table><thead><tr><th>Original edge</th><th>After merging A and B</th></tr></thead><tbody><tr><td>AB</td><td>A self-loop: delete it.</td></tr><tr><td>AC</td><td>One edge from group AB to C.</td></tr><tr><td>BC</td><td>A second edge from group AB to C: keep it.</td></tr></tbody></table><p>The returned cut has two crossing edges. Merging the parallel copies into one would change that value and the probabilities in later steps.</p></div>`,
      checks:[{id:'edge-uniform',prompt:'A current multigraph has three edge copies between U and V, and one between U and W. What is the probability the next contraction merges U and V?',options:[
        ['⟦s5.threequarters⟧',true,'Three of the four equally likely edge copies connect U and V. Uniform over edge copies is not uniform over distinct endpoint pairs.'],
        ['⟦s5.half⟧',false,'That samples one of two endpoint pairs uniformly. Karger instead samples one of the four edge copies uniformly.'],
        ['⟦s5.quarter⟧',false,'That is the probability of choosing one specified copy, but three different copies merge U and V.']
      ]},{id:'parallel-edges',prompt:'Which edges should be deleted after contraction?',options:[
        ['Self-loops only; retain parallel edges.',true,'Self-loops cannot cross a cut between supervertices. Parallel copies still represent distinct original crossing edges.'],
        ['Self-loops and all duplicate edges.',false,'Removing parallel copies changes cut sizes and changes the distribution used by the proof.']
      ]}]
    },
    {
      title:'Protect one fixed minimum cut',time:'10 minutes',
      body:`<p><strong>Analysis device.</strong> Fix one particular minimum cut before running the algorithm:</p><p>⟦s5.fixed⟧</p><p>The algorithm does not know this cut. We use it only to describe a sufficient event for success: never contract one of its edges.</p><p>Contracting within one side leaves that partition representable by supervertices. Contracting across its sides merges vertices that the fixed cut needs to separate, destroying that particular cut.</p><div class="worked-line"><strong>1. Condition on survival so far.</strong><p>Suppose ⟦s5.r⟧ supervertices remain and no edge of ⟦s5.fixed-alone⟧ has been contracted. Its crossing edges still number ⟦s5.lambda-alone⟧.</p></div><div class="worked-line"><strong>2. Lower-bound the current edge count.</strong><p>Any cut between supervertices lifts to a cut of the original graph, so it has size at least ⟦s5.lambda-alone⟧. In particular, isolating one supervertex shows</p><p>⟦s5.minimum-degree⟧</p><p>Sum degrees, counting parallel edges:</p><p>⟦s5.edges⟧</p><p>⟦s5.edge-bound⟧</p></div><div class="worked-line"><strong>3. Bound the dangerous choice.</strong><p>Exactly the edges of the fixed cut are dangerous:</p><p>⟦s5.bad-step⟧</p><p>Taking the complement gives</p><p>⟦s5.good-step⟧</p></div>`,
      checks:[{id:'fixed-cut-knowledge',prompt:'Does the algorithm need to know which edges belong to the fixed minimum cut?',options:[
        ['No; it samples blindly, and the fixed cut is used only in the analysis.',true,'We analyze the chance that random contractions happen to avoid its edges. We do not instruct the algorithm to avoid an unknown optimum.'],
        ['Yes; it must filter out those edges before sampling.',false,'Filtering would assume we already knew a minimum cut. The proof instead shows that uniform choices avoid it with sufficient probability.']
      ]},{id:'degree-reason',prompt:'Why does a supervertex have degree at least the original minimum-cut value?',options:[
        ['Because its incident edges define a cut that lifts to the original graph.',true,'The represented original vertices form one side of a nontrivial cut. That cut cannot have size below the original minimum.'],
        ['Because contraction leaves every individual degree unchanged.',false,'Degrees can change. The lower bound comes from the definition of the original minimum cut, not from unchanged degrees.']
      ]}]
    },
    {
      title:'Multiply conditional probabilities, not independent steps',time:'10 minutes',
      body:`<p>The successive contractions are not independent. The graph changes after every choice. Nevertheless, the chain rule multiplies the conditional survival probabilities.</p><p>The one-step bound holds for every surviving history. Apply it from n vertices down to three:</p><p>⟦s5.product⟧</p><p>The product cancels:</p><p>⟦s5.cancel⟧</p><p>If the fixed cut survives until only two supervertices remain, those two groups must be its two sides. The run therefore outputs that fixed cut.</p><div class="example"><p>For four starting vertices there are two contraction steps:</p><p>⟦s5.n4⟧</p><p>Do not include a contraction at two vertices: that is where the algorithm stops. For ⟦s5.n2⟧, it performs no contractions and returns the only partition; the success bound is one.</p></div><p>This is a lower bound for returning <strong>each fixed minimum cut</strong>. The probability of returning any minimum cut may be larger.</p>`,
      checks:[{id:'conditional-product',prompt:'What justifies multiplying the survival bounds?',options:[
        ['The chain rule, with each factor conditional on earlier survival.',true,'Each factor bounds the next step for any history that preserved the fixed cut. Independence between contractions is unnecessary.'],
        ['All contraction choices are independent events on the original graph.',false,'Each choice changes the graph. Use conditional probabilities for the current graph, rather than asserting independence.']
      ]},{id:'one-run-exact',prompt:'Is the final lower bound necessarily the exact probability of finding any minimum cut?',options:[
        ['No; it lower-bounds the chance of returning one fixed minimum cut.',true,'The graph may have several minimum cuts, and the inequalities in the survival analysis may be loose.'],
        ['Yes; every graph attains this exact success probability.',false,'The proof uses inequalities and tracks only one fixed minimum cut. It does not establish equality for every graph.']
      ]}]
    },
    {
      title:'Repeat from the original graph and keep the smallest cut',time:'7 minutes',
      body:`<p>One run succeeds with probability at least</p><p>⟦s5.success⟧</p><p>Run the algorithm R times, each time on a fresh copy of the <strong>original graph</strong> with independent randomness. Return the smallest cut found.</p><p>If any run finds a minimum cut, choosing the smallest returned cut succeeds: every output is a valid cut, so none can have size below the optimum.</p><p>Using ⟦s5.exp⟧,</p><p>⟦s5.failure⟧</p><p>For an allowed failure probability ⟦s5.eta⟧, take</p><p>⟦s5.repeats⟧</p><p><strong>A concrete runtime bound.</strong> A straightforward implementation stores current edge copies in a list. Each contraction can relabel endpoints and remove loops by scanning the list, while maintaining the original-vertex groups. For an initial connected graph with m edges, this gives a safe bound ⟦s5.runtime⟧ per run and ⟦s5.total-runtime⟧ overall. This is a simple implementation bound, not a claim of optimal runtime.</p>`,
      checks:[{id:'keep-smallest',prompt:'Why keep the smallest cut rather than the majority output?',options:[
        ['Any successful run suffices, and every output is a valid cut.',true,'An optimal cut cannot be beaten by another valid cut. Different successful runs may also return different minimum cuts, so majority voting is not the appropriate rule.'],
        ['Repeated runs must all agree before we can accept a cut.',false,'We do not need agreement. Selecting the smallest value succeeds whenever at least one run finds an optimum.']
      ]}]
    },
    {
      title:'Practice A · check the parameters',time:'5 minutes',
      body:`<p>Complete the two numerical gaps. Keep the number of <strong>current</strong> supervertices separate from the number of <strong>original</strong> vertices.</p><p>For ⟦s5.r5⟧, compute the lower bound on surviving just the next step. For ⟦s5.n5⟧, compute the lower bound on preserving a fixed minimum cut through an entire run.</p><p>Enter a fraction or decimal. Then choose the repetition rule for ⟦s5.eta100⟧.</p>`,
      numeric:[
        {id:'step-five',label:'Lower bound on surviving one next step with five current supervertices',value:0.6,correct:'⟦s5.n5-step⟧. This is a conditional one-step bound, not the success probability of a whole run.',wrong:'The dangerous-edge probability is at most two divided by the current vertex count. Subtract that bound from one.'},
        {id:'run-five',label:'Lower bound on returning a fixed minimum cut from a graph with five original vertices',value:0.1,correct:'⟦s5.n5-success⟧. This combines the conditional survival probabilities until two supervertices remain.',wrong:'Use the full-run bound: two divided by the product of n and n minus one. A one-step survival probability does not account for all contractions.'}
      ],
      checks:[{id:'repeat-five',prompt:'Which repetition choice is justified by the exponential failure bound for five original vertices?',options:[
        ['⟦s5.numeric-repeat⟧',true,'The full-run lower bound is one tenth. Choosing at least ten times the natural logarithm of 100 makes the exponential failure bound at most one hundredth.'],
        ['Five runs, because there are five vertices.',false,'The vertex count alone is not the repetition rule. Substitute the full-run success bound and the desired failure tolerance.'],
        ['One run, because a minimum cut certainly exists.',false,'Existence does not guarantee that one random run finds it. This is the distinction recalled at the start of the lesson.']
      ]}]
    },
    {
      title:'Practice B · count the minimum cuts',time:'15 minutes',
      body:`<p><strong>2024B, Problem 3 — connected-graph version.</strong> Let G be a connected, undirected, unweighted graph on n vertices, with ⟦s5.n-positive⟧. Count distinct cuts as <strong>unordered nontrivial partitions</strong>, so swapping sides does not create another cut.</p><p>Prove that the family of minimum cuts satisfies</p><p>⟦s5.bound-cuts⟧</p><p>You may use the fixed-cut success bound just proved. Write a proof on paper: about ten minutes to attempt it and five to compare. This is a counting proof; no runtime analysis is requested.</p><details><summary>Hint 1 · name one event per minimum cut</summary><p>For each minimum cut C, define the event that <strong>one run</strong> outputs C. The success analysis applies separately to each fixed C.</p></details><details><summary>Hint 2 · how do these events relate?</summary><p>A single run returns only one partition. The events of returning two different cuts are disjoint, not independent.</p></details><details><summary>Hint 3 · add the lower bounds</summary><p>Add the probabilities of these disjoint events. The total is at most one; each term is at least the fixed-cut success bound.</p></details><details><summary>Why the connectedness assumption is explicit here</summary><p>The <a href="../Exams/Exams/2024B.pdf#page=5">original question</a> says “undirected graph.” For a count of vertex partitions, the usual theorem needs connectedness. An edgeless graph has ⟦s5.disconnected⟧ unordered nontrivial partitions, all with cut value zero, which exceeds the stated bound for some n. We explicitly use the connected setting of this analysis so that the cut value is positive and the theorem has its standard meaning.</p></details><p>The rubric is a self-check of your paper proof, not automatic grading.</p>`,
      checks:[],
      end:`<details><summary>Compare · events and per-cut bound</summary><p>Let ⟦s5.collection⟧ be the family of minimum cuts. For each member C define</p><p>⟦s5.event⟧</p><p>The fixed-cut survival analysis yields</p><p>⟦s5.each-cut⟧</p></details><details><summary>Compare · disjointness and the final inequality</summary><p>One run outputs exactly one cut. These events are therefore pairwise disjoint:</p><p>⟦s5.disjoint⟧</p><p>Combining the lower bound for each cut with this upper bound on their sum gives</p><p>⟦s5.count-proof⟧</p><p>Rearranging proves ⟦s5.bound-cuts⟧.</p><p>The fixed-cut guarantee is essential: merely knowing a lower bound on finding <em>some</em> minimum cut would not justify a lower bound for each event in this sum.</p></details><details><summary>Compare with the official solution</summary><p>The <a href="../Exams/Solutions/2024solB.pdf#page=5">official solution</a> uses the same disjoint-events argument. There is no need to enumerate the cuts or assume their output probabilities are equal.</p></details><section class="panel"><h3>Check your written argument</h3><p>Mark only what appears on your page. Repair a missing line, then rewrite that step with its comparison closed.</p><div id="paper-rubric"></div><p id="rubric-status" role="status"></p></section><p class="prompt">Fix a cut → preserve it under contraction → bound one conditional step → multiply along the run → use repetition or a disjoint-events count.</p><p>The next fixed lesson is the isolation lemma. Your answers do not change the sequence.</p>`
    }
  ];
  window.renderGuidedLesson(host,state,save,onComplete,{pages,number:5,stateKey:'lessonFive',typeset:true,
    source:'<p>Contraction and survival follow the <a href="../Presentations/Lectures/Randomized.pdf">randomized-algorithms lectures</a> and the minimum-cut section of <a href="../Advanced_Algorithms_Formula_Sheet.pdf#page=1">the formula sheet</a>. Paper practice uses 2024B Problem 3 with the connectedness and counting conventions explicitly stated.</p>',
    rubric:[
      ['family','I identified the family of distinct, unordered minimum cuts in the connected graph.'],
      ['events','I defined one output event per cut, for a single run.'],
      ['percut','I used the success lower bound for each fixed minimum cut, not just for some optimum.'],
      ['disjoint','I justified disjointness because one run outputs only one cut.'],
      ['sum','I bounded the sum of these probabilities by one and combined it with the per-cut lower bounds.'],
      ['conclusion','I rearranged to conclude ⟦s5.bound-cuts⟧.']
    ]});
};
