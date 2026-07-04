/* Advanced Algorithms — Exam Prep. Renders from window.DATA + window.GUIDES.
   All progress persists in localStorage; works offline via file://. */
(function () {
  const DATA = window.DATA, GUIDES = window.GUIDES || {}, EXPL = window.EXPL || {};
  const LS = {
    marks: "aa_marks_v1",     // { "sid#part": "got"|"shaky"|"failed" }
    reveal: "aa_reveal_v1",   // { "sid#part": true }
    ui: "aa_ui_v1"            // { topic, tiers:{1,2,3}, weak }
  };
  const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) || d; } catch { return d; } };
  let storageWarned = false;
  const save = (k, v) => {
    try { localStorage.setItem(k, JSON.stringify(v)); }
    catch (e) {
      if (!storageWarned) { storageWarned = true;
        console.warn("Progress can't be saved (browser blocked storage). The app still works this session.");
      }
    }
  };
  let marks = load(LS.marks, {}), reveal = load(LS.reveal, {});
  let ui = load(LS.ui, { topic: null, tiers: { 1: true, 2: false, 3: false }, weak: false, theme: "dark" });
  const applyTheme = () => document.documentElement.setAttribute("data-theme", ui.theme || "dark");
  applyTheme();

  const allTopics = [];
  DATA.units.forEach(u => u.topics.forEach(t => { t.unit = u.unit; allTopics.push(t); }));
  if (!ui.topic) {
    const t1 = allTopics.find(t => t.groups.some(g => g.tier === 1));
    ui.topic = (t1 || allTopics.find(t => t.groups.length) || allTopics[0]).topic;
  }

  const key = (sid, part) => sid + "#" + (part || "x");
  const isHW = p => p.source && p.source.kind === "homework";

  // ---- gather every studyable part in a topic (for progress) ----
  function topicParts(t, respectFilter) {
    const out = [];
    t.groups.forEach(g => {
      if (respectFilter && !ui.tiers[g.tier]) return;
      g.parts.forEach(pt => out.push({ k: key(g.sid, pt.part) }));
    });
    return out;
  }
  function counts(parts) {
    const c = { got: 0, shaky: 0, failed: 0, none: 0, total: parts.length };
    parts.forEach(x => { const s = marks[x.k]; c[s || "none"]++; });
    return c;
  }

  // ---------------- Sidebar ----------------
  function renderSidebar() {
    const el = document.getElementById("side");
    let h = `<div class="brand">Advanced Algorithms<small>Exam Prep · ${DATA.n_parents} problems · ${DATA.generated_parts} sub-questions</small></div>`;
    const g = counts(allTopics.flatMap(t => topicParts(t, true)));
    h += overallBar(g);
    DATA.units.forEach(u => {
      h += `<div class="nav-unit"><h4>${u.unit}</h4>`;
      u.topics.forEach(t => {
        const c = counts(topicParts(t, true));
        const done = c.total && c.got === c.total;
        const some = c.got + c.shaky + c.failed > 0;
        const dot = done ? "done" : some ? "part" : "";
        h += `<div class="nav-topic ${t.topic === ui.topic ? "active" : ""}" data-topic="${t.topic}">
          <span class="dot ${dot}"></span><span class="nm">${t.topic_name}</span>
          <span class="ct">${c.got}/${c.total}</span></div>`;
      });
      h += `</div>`;
    });
    el.innerHTML = h;
    el.querySelectorAll(".nav-topic").forEach(n =>
      n.onclick = () => { ui.topic = n.dataset.topic; persist(); renderAll(); document.querySelector(".main").scrollTo(0, 0); });
  }
  function overallBar(c) {
    const pct = s => c.total ? (100 * s / c.total) + "%" : "0%";
    return `<div class="overall"><div class="lbl"><span>Overall progress</span><span>${c.got}/${c.total} solved</span></div>
      <div class="bar"><span class="g" style="width:${pct(c.got)}"></span><span class="s" style="width:${pct(c.shaky)}"></span><span class="f" style="width:${pct(c.failed)}"></span></div></div>`;
  }

  // ---------------- Controls ----------------
  function renderControls() {
    const el = document.getElementById("controls");
    const tchk = (n, lbl) => `<label class="chk ${ui.tiers[n] ? "on" : ""}"><input type="checkbox" data-tier="${n}" ${ui.tiers[n] ? "checked" : ""}>${lbl}</label>`;
    el.innerHTML =
      `<div class="grp">Show tiers: ${tchk(1, "2023+ Exams")} ${tchk(2, "Homework")} ${tchk(3, "Pre-2023")}</div>
       <div class="grp"><label class="chk ${ui.weak ? "on" : ""}"><input type="checkbox" id="weak" ${ui.weak ? "checked" : ""}>Show only my Shaky / Failed</label></div>
       <div class="grp" style="margin-left:auto">
         <a class="btn" href="Advanced-Algorithms-Practice-Workbook.pdf" download title="Questions-only PDF workbook for iPad / Notability (solutions stay here on the site)">📄 iPad workbook</a>
         <button class="btn" id="theme">${ui.theme === "light" ? "🌙 Dark" : "☀️ Light"}</button>
         <button class="btn" id="reset">Reset progress</button></div>`;
    el.querySelectorAll("[data-tier]").forEach(c => c.onchange = () => { ui.tiers[c.dataset.tier] = c.checked; persist(); renderAll(); });
    el.querySelector("#weak").onchange = e => { ui.weak = e.target.checked; persist(); renderAll(); };
    el.querySelector("#theme").onclick = () => { ui.theme = ui.theme === "light" ? "dark" : "light"; applyTheme(); persist(); renderControls(); };
    el.querySelector("#reset").onclick = () => { if (confirm("Clear all your Got-it/Shaky/Failed marks and reveals?")) { marks = {}; reveal = {}; persist(); renderAll(); } };
  }

  // ---------------- Topic view ----------------
  function renderTopic() {
    const t = allTopics.find(x => x.topic === ui.topic);
    const el = document.getElementById("view");
    const c = counts(topicParts(t, true));
    let h = `<div class="topic-head"><div class="crumb">${t.unit}</div><h1>${t.topic_name}</h1>
      <div class="tprog">${overallBar(c)}</div></div>`;
    h += guideHTML(t.topic);

    // group problems by tier
    const tiers = [[1, "2023+ Exams"], [2, "Homework"], [3, "Pre-2023 Exams"]];
    let anyShown = false;
    tiers.forEach(([tn, tlabel]) => {
      if (!ui.tiers[tn]) return;
      let groups = t.groups.filter(g => g.tier === tn);
      if (!groups.length) return;
      const cards = groups.map(cardHTML).filter(Boolean);
      if (!cards.length) return;
      anyShown = true;
      const cc = counts(groups.flatMap(g => g.parts.map(pt => ({ k: key(g.sid, pt.part) }))));
      h += `<details class="tier t${tn}" ${tn === 1 ? "open" : ""}>
        <summary><span class="tbadge">Priority ${tn}</span> ${tlabel}
        <span class="tcount">· ${groups.length} problems · ${cc.got}/${cc.total} solved</span></summary>
        ${cards.join("")}</details>`;
    });

    if (!anyShown) h += `<div class="empty">Nothing to show with the current filters. ${ui.weak ? "You have no Shaky/Failed items here — nice." : "Enable more tiers above, or this topic has no questions in the selected tiers."}</div>`;
    el.innerHTML = h;
    wire(el);
  }

  function guideHTML(topic) {
    const g = GUIDES[topic];
    if (!g) return `<details class="guide"><summary>📘 Study guide — strategy & how to think</summary><div class="gbody"><p class="empty">Study guide coming soon for this topic.</p></div></details>`;
    return `<details class="guide" open><summary>📘 Study guide — ${g.title || "strategy & how to think"}</summary><div class="gbody">${g.html}</div></details>`;
  }

  function partVisible(p, pt) { return !ui.weak || ["shaky", "failed"].includes(marks[key(p.sid, pt.part)]); }

  function cardHTML(p) {
    const parts = p.parts.filter(pt => partVisible(p, pt));
    if (!parts.length) return "";
    const cc = counts(p.parts.map(pt => ({ k: key(p.sid, pt.part) })));
    const srcTxt = sourceLabel(p);
    const worked = ((GUIDES[ui.topic] || {}).worked || []).includes(p.sid);
    let h = `<div class="prob"><div class="phdr"><span class="sid">${p.sid.replace(/-p/, " · P")}</span>
      <span class="tag ${p.difficulty}">${p.difficulty}</span>
      ${worked ? `<span class="worked-badge" title="This question is walked through in the study guide above">📘 worked in guide</span>` : ""}
      <span class="src">${srcTxt}${p.title ? " — " + esc(p.title) : ""}</span>
      <span class="pprog">${cc.got}/${cc.total} parts</span></div>`;
    if (p.stemImage) h += `<div class="stem"><em>Problem stem</em><img loading="lazy" src="${p.stemImage}"></div>`;
    parts.forEach(pt => h += partHTML(p, pt));
    h += `</div>`;
    return h;
  }

  function partHTML(p, pt) {
    const k = key(p.sid, pt.part);
    const st = marks[k];
    const lab = pt.part ? "(" + pt.part + ")" : "";
    const hw = isHW(p), heb = p.era === "y2021";
    let qvisual = `<div class="qimg"><img loading="lazy" src="${pt.questionImage}">${pt.questionImage2 ? `<img loading="lazy" src="${pt.questionImage2}">` : ""}</div>`;
    let note = "";
    if (hw) note = `<div class="hwnote">Homework PDF is solution-only — the prompt above is the curated summary; the image is the solution's framing.</div>`;
    else if (heb) note = `<div class="hebrew-note">Original 2021 statement is in Hebrew (no English version existed); see the summary above for the English.</div>`;
    const revealed = reveal[k];
    const explBlock = EXPL[k]
      ? `<button class="expl-btn" data-expl="${k}">🤔 I don't understand the solution</button><div class="expl" style="display:none">${EXPL[k]}</div>`
      : "";
    const sol = `<div class="sol" ${revealed ? "" : "style=display:none"}><div class="solcap">Solution</div>
      <img loading="lazy" src="${pt.solutionImage}">${pt.solutionImage2 ? `<img loading="lazy" src="${pt.solutionImage2}">` : ""}${explBlock}</div>`;
    return `<div class="part ${st ? "st-" + st : ""}" data-k="${k}">
      <div class="plab"><span class="lt">${lab}</span><span class="tag ${pt.difficulty}">${pt.difficulty}</span>
        <span class="psum">${esc(pt.summary)}</span></div>
      ${qvisual}${note}
      <div class="reveal-row">
        <button class="reveal-btn" data-reveal="${k}">${revealed ? "Hide solution" : "Reveal solution"}</button>
        <span class="marks">
          <button class="mark got ${st === "got" ? "on" : ""}" data-mark="got" data-k="${k}">✓ Got it</button>
          <button class="mark shaky ${st === "shaky" ? "on" : ""}" data-mark="shaky" data-k="${k}">~ Shaky</button>
          <button class="mark failed ${st === "failed" ? "on" : ""}" data-mark="failed" data-k="${k}">✗ Failed</button>
        </span>
      </div>${sol}</div>`;
  }

  function wire(el) {
    el.querySelectorAll("[data-reveal]").forEach(b => b.onclick = () => {
      const k = b.dataset.reveal; reveal[k] = !reveal[k]; if (!reveal[k]) delete reveal[k];
      save(LS.reveal, reveal);
      const part = b.closest(".part"); const sol = part.querySelector(".sol");
      sol.style.display = reveal[k] ? "" : "none"; b.textContent = reveal[k] ? "Hide solution" : "Reveal solution";
    });
    el.querySelectorAll("[data-expl]").forEach(b => b.onclick = () => {
      const box = b.nextElementSibling;
      const open = box.style.display === "none";
      box.style.display = open ? "" : "none";
      b.textContent = open ? "Hide explanation" : "🤔 I don't understand the solution";
      b.classList.toggle("on", open);
    });
    el.querySelectorAll("[data-mark]").forEach(b => b.onclick = () => {
      const k = b.dataset.k, m = b.dataset.mark;
      if (marks[k] === m) delete marks[k]; else marks[k] = m;
      save(LS.marks, marks); renderAll();
    });
  }

  function sourceLabel(p) {
    const s = p.source;
    if (s.kind === "homework") return `HW ${s.iteration} · Set ${s.set}`;
    return `${s.year}${s.moed ? " Moed " + s.moed : ""} exam`;
  }
  function esc(x) { return (x || "").replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c])); }
  function persist() { save(LS.ui, ui); }
  function renderAll() { renderSidebar(); renderControls(); renderTopic(); }

  document.addEventListener("DOMContentLoaded", renderAll);
})();
