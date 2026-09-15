/* Introductory lesson pilot: finite choices receive authored, specific feedback. */
window.renderLessonOne = function (host, state, save, onComplete) {
  const pages = [
    {
      title: 'Turn a random outcome into a number', time: '8 minutes',
      body: `<p>Our goal is to write a short expectation proof. We will build each ingredient before combining them. You only need fractions and basic graph vocabulary: a neighbor of a vertex is a vertex joined to it by an edge.</p><p>A <strong>random experiment</strong> describes what is chosen and how. An <strong>outcome</strong> is one complete result. An <strong>event</strong> is a collection of outcomes satisfying a condition. A <strong>random variable</strong> assigns a number to each outcome.</p><div class="example"><p>Toss two fair coins independently. The four equally likely outcomes are HH, HT, TH, TT.</p><p>Let X be the number of heads. Its values on those outcomes are 2, 1, 1, 0. The event “at least one head” contains HH, HT, TH.</p></div><p>When a problem asks about a count, defining that count as a random variable is a useful first mathematical line.</p>`,
      checks: [{id:'variable',prompt:'Which line defines a random variable that counts heads?',options:[
        ['Let X be the event that a head appears.',false,'That defines an event, not a numerical count. A random variable assigns a number to each complete outcome.'],
        ['Let X be the number of heads in the two tosses.',true,'This assigns 0, 1, or 2 to every outcome, exactly the count we need.'],
        ['Let X be the probability of heads, equal to 1/2.',false,'That is a fixed probability, not the number of heads observed in two tosses.']]}]
    },
    {
      title: 'Expectation is a weighted average', time: '8 minutes',
      body: `<p>For a finite random variable, multiply each possible value by its probability and add. This number is the <strong>expectation</strong>, written E[X].</p><div class="example"><p>For the number of heads in two fair independent tosses:</p><p>P(X = 0) = 1/4, P(X = 1) = 1/2, P(X = 2) = 1/4.</p><p>E[X] = 0 × 1/4 + 1 × 1/2 + 2 × 1/4 = 1.</p></div><p>Expectation describes an average over the random experiment. It does not say what happens on every run, and it need not be an integer.</p>`,
      checks:[{id:'average',prompt:'A fair die pays you 0 points on 1–4 and 3 points on 5–6. What is the expected payout?',options:[
        ['1 point',true,'E[X] = 0 × (4/6) + 3 × (2/6) = 1. Neither individual payout needs to equal the expectation.'],
        ['1.5 points',false,'That averages the two payout values equally. They are not equally likely: 0 occurs with probability 4/6 and 3 with probability 2/6.'],
        ['3 points',false,'3 is the maximum payout. Expectation also accounts for the four die faces paying zero.']]}]
    },
    {
      title: 'Break a count into small pieces', time: '10 minutes',
      body: `<p>An <strong>indicator random variable</strong> is 1 when a specified event occurs and 0 otherwise. If the event has probability p, its expectation is 1 × p + 0 × (1 − p) = p.</p><p>To count red vertices, define one indicator per vertex: Yᵢ is 1 if vertex i is red and 0 otherwise. Their sum counts every red vertex exactly once.</p><div class="example"><p><strong>Linearity of expectation:</strong> E[Y₁ + ⋯ + Yₙ] = E[Y₁] + ⋯ + E[Yₙ].</p><p>No independence assumption is needed for this identity. Independence may still be needed to calculate an individual event's probability.</p></div><p>This avoids listing all possible colorings just to calculate an average.</p>`,
      checks:[{id:'indicator',prompt:'A vertex is colored red with probability 0.3. Y is 1 if it is red and 0 otherwise. What is E[Y]?',options:[
        ['1',false,'1 is Y’s value when the event occurs. Its average also includes the outcomes where Y is 0.'],
        ['0.7',false,'0.7 is the probability of not being red. Y equals 1 for red, whose probability is 0.3.'],
        ['0.3',true,'For an indicator, expectation equals the probability of the event it indicates.']
      ]},{id:'dependent',prompt:'One fair coin determines all ten vertices: heads makes all red; tails makes all blue. What is the expected number of red vertices?',options:[
        ['Linearity cannot be used because the colors are dependent.',false,'Linearity does not require independence. Every vertex still has probability 1/2 of being red.'],
        ['5',true,'Each of ten indicators has expectation 1/2, so their sum has expectation 5. You can also calculate 10 × 1/2 + 0 × 1/2.'],
        ['Exactly five vertices are red on every run.',false,'This experiment produces either ten red vertices or zero. An expectation of five is not a per-run guarantee.']]}]
    },
    {
      title: 'See how the proof is assembled', time: '10 minutes',
      body: `<p><strong>Problem.</strong> A vertex v has d distinct neighbors. Color every vertex red or blue independently, each with probability 1/2. Find the expected number of red neighbors of v.</p><div class="worked-line"><strong>1. Name the requested count.</strong><p>Let X be the number of red neighbors of v.</p><small>Why: this makes “find the expected number” into “compute E[X].”</small></div><div class="worked-line"><strong>2. Define pieces that add up to it.</strong><p>Label the neighbors 1 through d. Let Yᵢ be an indicator random variable for neighbor i being red. Then X = Y₁ + ⋯ + Yᵈ.</p><small>Why: each red neighbor contributes one, and each blue neighbor contributes zero.</small></div><div class="worked-line"><strong>3. Evaluate one piece.</strong><p>For every i, E[Yᵢ] = P(neighbor i is red) = 1/2.</p><small>Why: expectation of an indicator is its event's probability.</small></div><div class="worked-line"><strong>4. Add the expectations.</strong><p>By linearity, E[X] = E[Y₁] + ⋯ + E[Yᵈ] = d/2.</p><small>Why: there are d terms, each equal to 1/2. This question asks for an expectation, so no runtime analysis is needed.</small></div>`,
      checks:[{id:'conclusion',prompt:'Which conclusion is justified by this proof?',options:[
        ['Every vertex has exactly half its neighbors red.',false,'The proof calculates an average for a fixed vertex. It does not guarantee a count on each coloring or a simultaneous property for all vertices.'],
        ['The expected number of red neighbors of v is d/2.',true,'This matches the requested quantity and follows directly from the indicator calculation.'],
        ['With probability at least 0.99, v has at least d/2 red neighbors.',false,'An expectation alone does not establish that probability. A probability guarantee needs a separate argument.']]}]
    },
    {
      title: 'Complete a proof with less support', time: '10 minutes',
      body: `<p><strong>New problem.</strong> A vertex v has 12 neighbors. Each neighbor is red with probability 1/4. Find the expected number of <strong>blue</strong> neighbors. Define X to be that count.</p><p>Choose the three missing steps below. Pay attention to the color being counted. Use the feedback to repair a step before moving on.</p>`,
      checks:[{id:'blue-definition',prompt:'Step 1: which indicator should we define so X is their sum?',options:[
        ['Yᵢ is 1 when neighbor i is red, and 0 otherwise.',false,'Those indicators sum to the red count. To represent X directly, use the event that neighbor i is blue.'],
        ['Yᵢ is 1 when neighbor i is blue, and 0 otherwise.',true,'Then X = Y₁ + ⋯ + Y₁₂ counts the blue neighbors exactly.']
      ]},{id:'blue-probability',prompt:'Step 2: what is the expectation of one blue indicator?',options:[
        ['1/4',false,'That is the red probability. Red and blue are the only possibilities, so the blue probability is 1 − 1/4.'],
        ['3/4',true,'E[Yᵢ] = P(neighbor i is blue) = 1 − 1/4 = 3/4.'],
        ['12 × 3/4',false,'That would add all twelve contributions. This step asks for one indicator’s expectation.']
      ]},{id:'blue-sum',prompt:'Step 3: finish the calculation.',options:[
        ['E[X] = 12 × 3/4 = 9, by linearity of expectation.',true,'This adds the twelve indicator expectations. The result is an average count, not a guarantee of exactly nine.'],
        ['E[X] = (3/4)¹², by independence.',false,'A product would calculate the probability that all twelve are blue if they are independent. Counting blue neighbors calls for a sum.'],
        ['E[X] = 3/4, because blue has probability 3/4.',false,'3/4 is one neighbor’s contribution. X counts twelve neighbors, so add twelve contributions.']]}]
    },
    {
      title: 'Transfer the idea to an algorithm', time: '10 minutes',
      body: `<p><strong>New problem.</strong> Take a simple undirected graph with m edges. Independently put each vertex into side A or side B with equal probability. A crossing edge has one endpoint on each side. Let X count crossing edges. Find E[X].</p><p>This time the pieces are edges, not vertices. For an edge e, define Yₑ to be 1 when it crosses and 0 otherwise. Then X is the sum of Yₑ over the m edges.</p>`,
      checks:[{id:'cross',prompt:'For one edge with distinct endpoints u and v, what is P(Yₑ = 1)?',options:[
        ['1/4',false,'That counts u in A and v in B only. The reverse assignment also crosses; the two cases are disjoint.'],
        ['1/2',true,'The disjoint crossing cases are (A,B) and (B,A). Each has probability 1/4 by independent endpoint choices, giving 1/2 in total.'],
        ['1',false,'Both endpoints may also land on the same side. Only two of the four equally likely assignments cross.']
      ]},{id:'edges',prompt:'Different edge indicators may share a vertex. Can we still conclude E[X] = m/2?',options:[
        ['Yes: linearity adds the m expectations, regardless of dependence between indicators.',true,'Each edge contributes expectation 1/2. Linearity adds them without requiring mutual independence of the edge indicators.'],
        ['No: all edge indicators must first be proved mutually independent.',false,'That extra condition is not required for linearity. Independence was used for each edge’s endpoint choices, not for adding edge expectations.']]}],
      end:`<details><summary>Read the complete exam-style answer</summary><p>For every edge e, let Yₑ be an indicator random variable for its endpoints being on different sides. The two disjoint assignments (A,B) and (B,A) each have probability 1/4, so E[Yₑ] = 1/2. Since X is the sum of these indicators, linearity of expectation gives E[X] = m/2.</p><p>If also asked to implement and evaluate the random cut: assign sides in O(n) time and scan the edges in O(m), giving O(n + m) time.</p></details><p class="prompt">The reusable structure is: define the count → express it as indicators → compute one event's probability → add. An expectation is not automatically a high-probability guarantee.</p><p>The teaching sections end here. Sections 7–8 add about 40 minutes of practice, which you can do separately. Session 4 contains a scheduled recall; the course order stays fixed.</p>`
    },
    {
      title: 'Practice A · complete a directed-cut proof', time: '15 minutes',
      body: `<p><strong>Problem.</strong> A directed graph has n vertices and m directed edges, with no self-loops. Independently assign each vertex to U or W with equal probability. Count only edges directed <strong>from U to W</strong>. Find the expected count and give the time needed to assign sides and count these edges.</p><p>On paper, copy the proof below and fill its gaps before checking. This changes one condition from the undirected example: orientation matters.</p><div class="example"><p>For each directed edge e = (u, v), let Yₑ be an indicator random variable for u being in U and v being in W. Let X be the number of edges counted. Then X = Σ Yₑ.</p><p>Because endpoint assignments are independent,<br>E[Yₑ] = P(u in U and v in W) = <strong>[A]</strong>.</p><p>By <strong>[B]</strong>, E[X] = Σ E[Yₑ] = <strong>[C]</strong> × m.</p><p>Assigning sides takes O(n) time and scanning the edges takes O(m), for a total of <strong>[D]</strong>.</p></div><p>Enter A and C as fractions or decimals. These fields check only the numerical gaps, not an arbitrary written proof.</p>`,
      numeric:[
        {id:'directed-event',label:'A · probability for one directed edge',value:0.25,correct:'Only u in U and v in W counts, so independence gives (1/2) × (1/2) = 1/4.',wrong:'Only one orientation counts. List the four equally likely endpoint assignments and keep (U, W). The reverse orientation (W, U) is not counted.'},
        {id:'directed-coefficient',label:'C · coefficient multiplying m',value:0.25,correct:'There are m indicator expectations, each equal to 1/4. Adding gives E[X] = m/4.',wrong:'C is the contribution of one edge, repeated m times. It is the coefficient before m, not the probability that every edge is counted.'}
      ],
      checks:[{id:'directed-rule',prompt:'B · which fact justifies adding these expectations?',options:[
        ['Linearity of expectation, without requiring independence between edge indicators.',true,'X is a sum of indicators, so its expectation is the sum of their expectations. Endpoint independence was used to compute each individual edge probability.'],
        ['Independence of all edge indicators.',false,'Mutual independence of edge indicators is neither given nor needed. Use linearity; keep it separate from the independence of vertex assignments.'],
        ['The union bound.',false,'The union bound bounds the probability of at least one event. This step computes the expected number of counted events exactly.']
      ]},{id:'directed-runtime',prompt:'D · runtime for assigning all vertices and scanning the edges',options:[
        ['O(n + m)',true,'There is constant work per vertex plus constant work per edge, so the costs add.'],
        ['O(nm)',false,'The algorithm does not scan every edge for each vertex. A single vertex pass and a single edge pass give a sum of costs.'],
        ['O(m), even when many vertices are isolated.',false,'The requested algorithm assigns every vertex, including isolated ones. That requires the additional O(n) term.']
      ]}],
      end:`<details><summary>Compare the complete proof after filling all four gaps</summary><p>For every directed edge e = (u, v), let Yₑ indicate u in U and v in W. Its expectation is (1/2)(1/2) = 1/4 by independent vertex assignments. If X counts edges from U to W, then X = Σ Yₑ. Linearity gives E[X] = Σ E[Yₑ] = m/4. Assign sides in O(n) time and scan the edges in O(m) time, for O(n + m) total.</p><p>Repair check: if you got m/2, you counted both orientations. If you multiplied probabilities over all edges, you calculated a different event instead of an expected count.</p></details>`
    },
    {
      title: 'Practice B · write a solution on paper', time: '25 minutes',
      body: `<p><strong>Problem.</strong> Given a simple undirected graph with n vertices and m edges, design a randomized algorithm that assigns one of <strong>three colors</strong> to each vertex so that the expected number of edges whose endpoints have different colors is at least 2m/3.</p><p>Describe the algorithm, prove its expectation guarantee, and analyze the time to produce the coloring and count its differently colored edges. Assume choosing a uniformly random color takes constant time.</p><p>Allow about 15 minutes for your paper attempt and 10 for comparison and repair. You may stop earlier or open one hint if you remain stuck. No timer runs here. You do not need to repeat sections 1–6 first.</p><p>Your written proof is self-checked against specific criteria below. The site does not automatically grade it.</p><details><summary>Hint 1 · choosing the algorithm</summary><p>Try assigning each vertex one of the three colors uniformly and independently. A deterministic coloring need not be constructed for this question.</p></details><details><summary>Hint 2 · finding the first mathematical line</summary><p>For each edge e, define an indicator for its endpoints receiving different colors. Their sum is the count asked for.</p></details><details><summary>Hint 3 · calculating one edge's probability</summary><p>There are nine equally likely ordered color pairs for the endpoints. Three pairs have equal colors. Count the remaining pairs, or use the complement.</p></details>`,
      checks:[],
      end:`<details><summary>Compare your solution · algorithm</summary><p>Assign each vertex independently and uniformly one of colors 1, 2, 3. Return this coloring. To evaluate it, scan the edges and count those whose endpoints have different colors.</p><p><strong>Check:</strong> “Color randomly” alone is incomplete: state the distribution and independence. The expectation calculation relies on them.</p></details><details><summary>Compare your solution · correctness and expectation</summary><p>For every edge e = {u, v}, let Yₑ be an indicator random variable for u and v receiving different colors. Let X be the number of such edges, so X = Σ Yₑ.</p><p>By independent uniform choices, each of the nine ordered color pairs has probability 1/9. Six pairs have different colors. Thus E[Yₑ] = 6/9 = 2/3. Equivalently, the probability of matching v's color to u's is 1/3, so the probability of different colors is 1 − 1/3.</p><p>Linearity of expectation gives E[X] = Σ E[Yₑ] = 2m/3, meeting the required bound. We do not require independence between the edge indicators.</p><p><strong>Check:</strong> The statement concerns expectation. It does not say every returned coloring has at least 2m/3 such edges. Other mathematically valid proofs are acceptable.</p></details><details><summary>Compare your solution · runtime</summary><p>Choosing colors costs O(n). Checking all edges costs O(m), using constant-time color lookup. The combined runtime is O(n + m).</p><p><strong>Check:</strong> The probability proof sums over edges; the algorithm does not enumerate all possible colorings.</p></details><section class="panel"><h3>Check the evidence in your paper answer</h3><p>Mark a criterion only when the corresponding argument appears in your answer. These are self-checks, not an exam score. If one is missing, add the line and read the matching explanation.</p><div id="paper-rubric"></div><p id="rubric-status" role="status"></p><p>Finish by closing the comparisons and rewriting the step you changed. You can continue on the fixed schedule even with unchecked criteria.</p></section>`
    }
  ];
  window.renderGuidedLesson(host,state,save,onComplete,{pages,number:1,stateKey:'lessonOne',
    source:'<p>Definitions and linearity follow the course’s <a href="../Presentations/Recitations/recitation1-Introduction_Probability_Quicksort.pdf">first probability recitation</a>. The small exercises are written for this lesson, not quoted exam questions. They introduce the expectation technique used in randomized algorithms; amplification and concentration come later.</p>',
    rubric:[
      ['algorithm','I specified independent, uniform choices from three colors.'],
      ['count','I defined the count, or equivalent indicators, and connected them with a sum.'],
      ['probability','I justified the per-edge probability 2/3 using endpoint choices.'],
      ['expectation','I used linearity to conclude E[X] = 2m/3.'],
      ['claim','My conclusion is an expectation guarantee, not a per-run claim.'],
      ['runtime','I accounted for both the vertices and edges in O(n + m) time.']
    ]});
};

/* Shared interaction logic; lesson content and saved answers remain separate. */
window.renderGuidedLesson = function(host,state,save,onComplete,lesson){
  const {pages,number,stateKey,rubric}=lesson;
  const checks=pages.flatMap(p=>p.checks);
  state[stateKey]=state[stateKey] || {page:0,answers:{},attempts:{}};
  const current=state[stateKey];
  current.answers=current.answers || {};current.attempts=current.attempts || {};
  current.numeric=current.numeric || {};current.rubric=current.rubric || {};
  const escapeText=value=>String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  if(!Number.isInteger(current.page)||current.page<0||current.page>=pages.length)current.page=0;
  function paint(focus=false){
    const page=pages[current.page];
    host.innerHTML=`<p class="eyebrow">Session ${number} · Section ${current.page+1} of ${pages.length}</p><h2 tabindex="-1" id="lesson-title">${page.title}</h2><p class="muted">About ${page.time} · stop and resume whenever you need. Answers save automatically.</p><nav class="lesson-steps" aria-label="Lesson sections">${pages.map((p,i)=>`<button data-page="${i}" ${i===current.page?'aria-current="step"':''}>${i+1}. ${p.title}</button>`).join('')}</nav><section class="panel">${page.body}</section>${page.checks.map(q=>`<section class="panel exercise"><h3 id="question-${q.id}">${q.prompt}</h3><div role="group" aria-labelledby="question-${q.id}">${q.options.map((o,i)=>`<button class="answer-choice" data-question="${q.id}" data-choice="${i}" aria-pressed="${current.answers[q.id]===i}">${o[0]}</button>`).join('')}</div><div class="answer-feedback" id="feedback-${q.id}" role="status" aria-live="polite"></div></section>`).join('')}${page.end || ''}<div class="actions">${current.page?'<button id="lesson-back">← Previous</button>':''}${current.page<pages.length-1?'<button id="lesson-forward" class="primary">Continue →</button>':'<button id="lesson-done" class="primary">Mark lesson complete</button>'}</div><p class="muted">You can revisit any section. There is no score gate, countdown, or change to your schedule.</p><details><summary>Course source and scope</summary>${lesson.source}</details>`;
    function feedback(q){
      const option=q.options[current.answers[q.id]];
      const box=document.getElementById(`feedback-${q.id}`);
      if(!option){box.textContent='Choose an answer to see an explanation.';return;}
      box.className='answer-feedback '+(option[1]?'correct':'reconsider');
      box.textContent=(option[1]?'Correct. ':'Reconsider this step. ')+option[2]+(option[1]?'':' You can try another answer.');
      if(lesson.typeset)MathTypeset(box);
    }
    if(page.numeric){
      const panel=document.createElement('section');panel.className='panel';
      panel.innerHTML=`<h3>Check the numerical gaps</h3>${page.numeric.map(q=>{const answer=current.numeric[q.id] || {};return `<form data-number="${q.id}"><label for="number-${q.id}">${q.label}</label><div class="number-row"><input id="number-${q.id}" type="text" inputmode="text" autocomplete="off" spellcheck="false" aria-describedby="number-feedback-${q.id}" value="${escapeText(answer.raw)}" placeholder="e.g. 1/3 or 0.5"><button type="submit">Check this gap</button></div><p id="number-feedback-${q.id}" class="answer-feedback" role="status" aria-live="polite"></p></form>`;}).join('')}`;
      host.querySelector('.exercise').before(panel);
      const showNumber=q=>{
        const a=current.numeric[q.id] || {},box=document.getElementById(`number-feedback-${q.id}`);
        if(!a.checked){box.textContent='Enter a fraction or decimal, then check.';box.className='answer-feedback';return;}
        const raw=String(a.raw || '').trim(),match=raw.match(/^([+-]?(?:\d+(?:\.\d*)?|\.\d+))(?:\s*\/\s*([+-]?(?:\d+(?:\.\d*)?|\.\d+)))?$/);
        const value=match?Number(match[1])/(match[2]===undefined?1:Number(match[2])):NaN;
        if(!Number.isFinite(value)){box.textContent='Use a number or fraction with a nonzero denominator, such as 0.5 or 1/2. Expressions and prose are not checked here.';box.className='answer-feedback reconsider';return;}
        const correct=Math.abs(value-q.value)<1e-10;
        box.textContent=(correct?'Correct. ':'Reconsider this gap. ')+(correct?q.correct:q.wrong);
        if(lesson.typeset)MathTypeset(box);
        box.className='answer-feedback '+(correct?'correct':'reconsider');
      };
      page.numeric.forEach(q=>{
        const input=document.getElementById(`number-${q.id}`),form=host.querySelector(`[data-number="${q.id}"]`);
        input.oninput=()=>{current.numeric[q.id]={raw:input.value,checked:false};save();showNumber(q);};
        form.onsubmit=e=>{e.preventDefault();current.numeric[q.id]={raw:input.value,checked:true};current.attempts[q.id]=(current.attempts[q.id]||0)+1;save();showNumber(q);};
        showNumber(q);
      });
    }
    const rubricHost=document.getElementById('paper-rubric');
    if(rubricHost){
      rubricHost.innerHTML=rubric.map(([id,text])=>`<label class="rubric-item"><input type="checkbox" data-rubric="${id}" ${current.rubric[id]?'checked':''}> <span>${text}</span></label>`).join('');
      const update=()=>{const n=rubric.filter(([id])=>current.rubric[id]).length;document.getElementById('rubric-status').textContent=`${n} of ${rubric.length} criteria self-checked. This does not automatically verify your proof.`;};
      rubricHost.querySelectorAll('[data-rubric]').forEach(box=>box.onchange=()=>{current.rubric[box.dataset.rubric]=box.checked;save();update();});update();
    }
    page.checks.forEach(feedback);
    host.querySelectorAll('[data-question]').forEach(b=>b.onclick=()=>{
      const q=checks.find(x=>x.id===b.dataset.question),choice=Number(b.dataset.choice);
      current.answers[q.id]=choice;current.attempts[q.id]=(current.attempts[q.id]||0)+1;save();
      host.querySelectorAll(`[data-question="${q.id}"]`).forEach(x=>x.setAttribute('aria-pressed',String(Number(x.dataset.choice)===choice)));
      feedback(q);
    });
    const go=i=>{current.page=i;save();paint(true);};
    host.querySelectorAll('[data-page]').forEach(b=>b.onclick=()=>go(Number(b.dataset.page)));
    const back=document.getElementById('lesson-back');if(back)back.onclick=()=>go(current.page-1);
    const forward=document.getElementById('lesson-forward');if(forward)forward.onclick=()=>go(current.page+1);
    const done=document.getElementById('lesson-done');if(done)done.onclick=()=>{onComplete();done.textContent='Lesson completed · you can keep reviewing';};
    if(lesson.typeset)MathTypeset(host);
    if(focus)document.getElementById('lesson-title').focus();
  }
  paint();
  function MathTypeset(root){window.formatCourseMath(root);}
};
