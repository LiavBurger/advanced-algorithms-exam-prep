/* Fixed curriculum. Exam C state never reads or overwrites July's library state. */
(() => {
  const sessions = [
    ['09-09','Probability: definitions and expectation','randomized/prob-basics',null],
    ['09-10','Existence through random choices','randomized/probabilistic-method','2025A-p1#a'],
    ['09-14','Concentration: one event, then all events','randomized/concentration','2025B-p1#c'],
    ['09-15','Sampling and error guarantees','randomized/concentration','2024A-p2#x',1],
    ['09-16','Karger: survival and repetition','randomized/karger-min-cut','2024B-p3#x',2],
    ['09-17','Isolation: what uniqueness means','randomized/isolation-lemma','2023A-p1#b',3],
    ['09-18','Random walks: matrices and mixing','randomized/random-walks','2023B-p1#d',4],
    ['09-22','Polynomials and identity testing','algebraic/pit','2023B-p1#c',6],
    ['09-23','Determinants and matching','algebraic/bipartite-matching','2024C-p1#d',8],
    ['09-24','FFT: encoding a counting problem','algebraic/fft','2023A-p6#x',5],
    ['09-27','Matrix multiplication and graph problems','algebraic/matrix-mult','2023B-p5#x',7],
    ['09-28','LP: variables, constraints, and geometry','lp/basics','2023A-p1#a',10],
    ['09-29','Duality: signs and certificates','lp/duality-farkas','2023B-p2#x',11],
    ['09-30','Integer programs and integrality','lp/ilp-tum','2023A-p2#x',12],
    ['10-04','Approximation: proving the comparison','approx/approximation','2023B-p3#x',13],
    ['10-05','LP rounding and feasibility','approx/approximation','2024B-p5#x',14],
    ['10-06','PSD matrices and semidefinite programs','sdp',null,15],
    ['10-07','Lattices and course algebra','lattices',null,16],
    ['10-08','Mixed practice: probability and algebra',null,'2024B-p6#x',8],
    ['10-09','Mixed practice: LP and approximation',null,'2025B-p2#a',13],
    ['10-10','Timed paper: first half',null,null],
    ['10-12','Timed paper: second half',null,null],
    ['10-13','Paper review and solution structure',null,null],
    ['10-14','Final retrieval and formula-sheet rehearsal',null,null,17]
  ].map(([date,title,topic,question,retry],i)=>({id:i+1,date,title,topic,question,retry}));
  const bank = new Map();
  window.DATA.units.forEach(u=>u.topics.forEach(t=>t.groups.forEach(g=>g.parts.forEach(p=>bank.set(`${g.sid}#${p.part || 'x'}`,{g,p})))));
  const KEY='aa_exam_c_course_v1';
  let state={selected:1,notes:{},done:{},support:{}};
  let warning='';
  try {const saved=JSON.parse(localStorage.getItem(KEY)); if(saved && typeof saved==='object') state={...state,...saved};} catch {warning='Saving is unavailable. Download a backup before closing.';}
  state.notes=state.notes || {};state.done=state.done || {};state.support=state.support || {};
  if(!sessions.some(s=>s.id===state.selected))state.selected=1;
  const requestedSession=window.location.hash.match(/^#session-(\d+)$/);
  if(requestedSession && sessions.some(s=>s.id===Number(requestedSession[1])))state.selected=Number(requestedSession[1]);
  const esc=s=>String(s ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function save(){try{localStorage.setItem(KEY,JSON.stringify(state));}catch{warning='Saving is unavailable. Download a backup before closing.';}document.getElementById('save-status').textContent=warning || 'Saved on this browser.';}
  function field(id,label){return `<label for="${id}">${label}</label><textarea id="${id}" data-note="${id}" placeholder="A rough first sentence is enough.">${esc(state.notes[`${state.selected}:${id}`])}</textarea>`;}
  function question(k,solution=false){
    const item=bank.get(k);if(!item)return '<p>This question is unavailable.</p>';
    const {g,p}=item;
    const pictures=solution?[p.solutionImage,p.solutionImage2]:[g.stemImage,p.questionImage,p.questionImage2];
    return `<p class="muted">${esc(g.sid)} · part ${esc(p.part || 'whole question')}</p>${pictures.filter(Boolean).map(src=>`<img src="${esc(src)}" alt="${solution?'Official solution':'Question statement'}: ${esc(k)}">`).join('')}`;
  }
  function guide(s){
    if(s.topic==='sdp')return `<h3>PSD and SDP foundations</h3><p>A real symmetric matrix M is positive semidefinite (PSD) when zᵀMz ≥ 0 for every real vector z. Equivalently its eigenvalues are nonnegative, or M = BᵀB for some B. Entries of BᵀB are inner products of columns of B.</p><p>An SDP optimizes a linear function of matrix entries subject to linear constraints and a PSD constraint. To show a relaxation bounds an integer optimum, first embed every integer solution as a feasible SDP solution of the same value.</p><p>For a weak-duality proof, subtract the proposed lower bound from the primal objective. Express the difference as a sum of quadratic forms zᵀMz, each nonnegative because M is PSD.</p><p>Read the PSD and SDP sections of your <a href="../Advanced_Algorithms_Formula_Sheet.pdf">formula sheet</a>, then compare the three equivalent PSD definitions above. For random-hyperplane rounding, use the course's approximation lecture to connect separation probability to the angle between vectors.</p>`;
    if(s.topic==='lattices')return `<h3>Lattices, orthogonality, and traces</h3><p>A lattice consists of integer linear combinations of independent basis vectors. A shortest-vector claim concerns nonzero lattice vectors. An arbitrary real change of basis need not preserve the lattice.</p><p>With an orthogonal lattice basis, the squared length of a vector is the sum of the squared integer coefficients times the squared basis lengths. At least one integer coefficient has absolute value at least one. This proves that a shortest basis vector is a shortest nonzero lattice vector.</p><p>Gram–Schmidt produces orthogonal vectors, but you must check whether they still form a basis of the same lattice. Read the Lattices &amp; LLL section of the <a href="../Advanced_Algorithms_Formula_Sheet.pdf">formula sheet</a> for the reduction conditions and guarantee.</p><p>For matrix questions, trace(Aᵏ) is the sum of the kth powers of the eigenvalues, with multiplicity. Newton identities connect these power sums to characteristic-polynomial coefficients. Repeated squaring computes a power using logarithmically many matrix multiplications.</p>`;
    const g=window.GUIDES[s.topic];return g?g.html:'<p>Use the scheduled questions below without opening a topic guide first. The session order remains fixed whatever you find difficult.</p>';
  }
  function render(){
    const s=sessions[state.selected-1];
    document.getElementById('progress').textContent=`${sessions.filter(x=>state.done[x.id]).length} of 24 sessions completed · progress starts fresh`;
    document.getElementById('sessions').innerHTML=sessions.map(x=>`<button data-session="${x.id}" ${x.id===s.id?'aria-current="step"':''}>${state.done[x.id]?'✓ ':''}${x.id}. ${esc(x.title)}<br><small>${x.date}</small></button>`).join('');
    const guidedRenderer=({1:window.renderLessonOne,2:window.renderLessonTwo,3:window.renderLessonThree,4:window.renderLessonFour,5:window.renderLessonFive})[s.id];
    if(guidedRenderer){
      document.querySelectorAll('[data-session]').forEach(b=>b.onclick=()=>{state.selected=Number(b.dataset.session);save();render();});
      guidedRenderer(document.getElementById('lesson'),state,save,()=>{state.done[s.id]=true;save();document.getElementById('progress').textContent=`${sessions.filter(x=>state.done[x.id]).length} of 24 sessions completed · progress starts fresh`;const button=document.querySelector(`[data-session="${s.id}"]`);if(button && !button.textContent.startsWith('✓'))button.prepend('✓ ');});
      return;
    }
    let content=`<p class="eyebrow">Session ${s.id} / 24 · Suggested date ${s.date}-2026</p><h2>${s.title}</h2><p class="prompt">Draft lesson: sessions 1–5 use the teaching-and-feedback format. This session still uses the earlier format.</p><p>60-minute core · optional second hour. Dates are a guide; every session stays accessible. Reviews are already scheduled and your ratings never change the course.</p>`;
    if(s.retry){const r=sessions[s.retry-1];content+=`<details><summary>Scheduled recall · 5 minutes · session ${s.retry}</summary><p>Without notes, recall the main definitions and write the first two steps for ${esc(r.title)}.</p>${r.question?question(r.question):''}${field('retry','Your recall attempt')}</details>`;}
    if(s.id<=18)content+=`<details><summary>1. Learn the tools · 15 minutes</summary><div class="guide-content">${guide(s)}</div><p>Begin here even if you studied this before. Focus on the definitions and core tools; worked examples are available when needed.</p></details>`;
    const q=s.question;
    if(q)content+=`<section class="panel"><h3>${s.id<=18?'2. ':''}Write a first attempt · 15 minutes</h3>${question(q)}<p class="prompt">You do not need the whole answer before writing. Start with what is asked and one definition. If you stay blank for 3–5 minutes, open the starting prompt.</p><details><summary>Help me start</summary><p>Rewrite the required output or claim in one sentence. Name the objects in the input. For a probability question, define the random experiment and a counted event. For an algorithm, state the representation you will compute. For LP, give each variable a meaning before writing constraints. For true/false, test a small example and check the theorem's assumptions.</p></details>${field('goal','What must I show or compute?')}${field('start','My first definition or observation')}${field('answer','My construction, justification, and runtime (as relevant)')}</section><details><summary>Compare with the solution · 15 minutes</summary>${question(q,true)}${window.EXPL[q]?`<details><summary>Explain the reasoning</summary><div class="guide-content">${window.EXPL[q]}</div></details>`:''}<p>Find one missing step, then close this section and reconstruct it. A supported rewrite is practice; the scheduled retry checks independent recall.</p></details>`;
    if(s.id===17)content+=`<section class="panel"><h3>Practice · 20 minutes</h3><p>Prove that M = BᵀB implies M is PSD. Then explain why a matrix of pairwise inner products is PSD.</p>${field('psd','Definitions, calculation, conclusion')}<details><summary>Compare</summary><p>For every z, zᵀMz = zᵀBᵀBz = (Bz)ᵀ(Bz) = ||Bz||² ≥ 0. For a Gram matrix, place the vectors in the columns of B so its entries equal those of BᵀB.</p></details></section>`;
    if(s.id===18)content+=`<section class="panel"><h3>Practice · 20 minutes</h3><p>For an orthogonal lattice basis whose shortest basis vector has length L, prove every nonzero lattice vector has length at least L. Identify exactly where integer coefficients matter.</p>${field('lattice','Write the vector, expand its squared length, and bound it')}<details><summary>Compare</summary><p>Write v = Σ aᵢbᵢ with integer aᵢ, not all zero. Orthogonality gives ||v||² = Σ aᵢ²||bᵢ||². Some |aⱼ| ≥ 1, so the sum is at least ||bⱼ||² ≥ L².</p></details></section>`;
    if(s.id===19)content+=`<details><summary>Optional second hour: matrix algorithm</summary>${question('2024B-p4#x')}<details><summary>Solution</summary>${question('2024B-p4#x',true)}</details></details>`;
    if(s.id===20)content+=`<details><summary>Continue to the approximation proof · 20 minutes</summary>${question('2025B-p2#b')}<details><summary>Solution</summary>${question('2025B-p2#b',true)}</details></details>`;
    if(s.id===21||s.id===22)content+=`<section class="panel"><h3>2025C paper · ${s.id===21?'questions 1–2':'questions 3–4'}</h3><p>Use the <a href="../Exams/Exams/2025C.pdf" target="_blank" rel="noopener">question-only paper</a>. Work for 60 minutes, or 90 if today permits. Record the actual time. Keep solutions closed until session 23. These split sittings do not test full three-hour endurance.</p>${field('timed','Time used, attempted parts, and work left unfinished')}</section>`;
    if(s.id===23)content+=`<section class="panel"><h3>Review the 2025C paper</h3><p>Compare with the <a href="../Exams/Solutions/2025solC.pdf" target="_blank" rel="noopener">official solutions</a>. For each attempted part, identify correct steps and the first gap. Use the remaining core time to attempt question 5 before reading its solution; reviewing it can use the optional hour.</p>${field('review','Correct steps, gaps, and one corrected argument')}</section>`;
    if(s.id===24)content+=`<section class="panel"><h3>Fixed final review · 40 minutes</h3><ol><li>10 min: expectation, tail bounds, union bound, and their assumptions.</li><li>10 min: polynomial encoding, degree bounds, matrix multiplication, and runtime.</li><li>10 min: LP signs, weak duality, rounding feasibility, and objective comparison.</li><li>10 min: PSD, lattice definitions, and locating tools on your permitted sheet.</li></ol><p>Write a starting sentence for each family before checking the sheet. October 15 is a light buffer day.</p>${field('final','Recall notes and formula-sheet locations')}</section>`;
    content+=`<section class="panel"><h3>Close the session · 10 minutes, including a break</h3>${field('repair','One step I can now write more clearly')}<label for="support">How much support did I use? (This does not change the schedule.)</label><select id="support"><option value="">Choose if useful</option>${['Independent start','Starting prompt','Guide or explanation','Worked solution'].map(x=>`<option ${state.support[s.id]===x?'selected':''}>${x}</option>`).join('')}</select><p>Completion means you did the session, not that every answer was perfect. Optional second hour: finish this question and rewrite its argument with the solution closed.</p></section><div class="actions"><button id="complete" class="primary">${state.done[s.id]?'Mark session unfinished':'Mark session complete'}</button>${s.id<24?'<button id="next">Next session →</button>':''}</div>`;
    document.getElementById('lesson').innerHTML=content;
    document.querySelectorAll('[data-session]').forEach(b=>b.onclick=()=>{state.selected=Number(b.dataset.session);save();render();});
    document.querySelectorAll('[data-note]').forEach(t=>t.oninput=()=>{state.notes[`${s.id}:${t.dataset.note}`]=t.value;save();});
    document.getElementById('support').onchange=e=>{state.support[s.id]=e.target.value;save();};
    document.getElementById('complete').onclick=()=>{state.done[s.id]=!state.done[s.id];save();render();};
    const next=document.getElementById('next');if(next)next.onclick=()=>{state.selected++;save();render();window.scrollTo(0,0);};
    document.getElementById('save-status').textContent=warning || 'Notes save automatically on this browser.';
  }
  document.getElementById('export').onclick=()=>{const url=URL.createObjectURL(new Blob([JSON.stringify(state,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='exam-c-progress.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
  render();
})();
