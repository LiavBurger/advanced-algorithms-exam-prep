/* Only replaces authored notation in text nodes, never input values or attributes. */
window.formatCourseMath = function(root){
  const formulas=window.COURSE_MATH;
  if(!formulas)return;
  const escape=s=>Array.from(s,c=>'.*+?^$' .concat('{}()|[]\\').includes(c)?'\\'+c:c).join('');
  const pattern=new RegExp('(?<![\\p{L}\\p{N}_])(?:'+Object.keys(formulas).sort((a,b)=>b.length-a.length).map(escape).join('|')+')(?![\\p{L}\\p{N}_])','gu');
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
  const texts=[];
  while(walker.nextNode()){
    const text=walker.currentNode;
    if(!text.parentElement.closest('math, textarea, input, script, style, code, #lesson-title, #number-feedback-invalid'))texts.push(text);
  }
  for(const text of texts){
    const source=text.nodeValue;
    pattern.lastIndex=0;
    const matches=[...source.matchAll(pattern)];
    if(!matches.length)continue;
    const fragment=document.createDocumentFragment();let cursor=0;
    for(const match of matches){
      fragment.append(document.createTextNode(source.slice(cursor,match.index)));
      const template=document.createElement('template');template.innerHTML=formulas[match[0]];
      fragment.append(template.content.cloneNode(true));cursor=match.index+match[0].length;
    }
    fragment.append(document.createTextNode(source.slice(cursor)));text.replaceWith(fragment);
  }
  root.querySelectorAll('p').forEach(p=>{
    if(p.children.length===1 && p.firstElementChild.tagName.toLowerCase()==='math' && ![...p.childNodes].some(n=>n.nodeType===3&&!/^[\s.,;:]*$/.test(n.textContent))){
      [...p.childNodes].filter(n=>n.nodeType===3).forEach(n=>n.remove());
      p.classList.add('course-equation');p.firstElementChild.setAttribute('display','block');
    }
  });
};
