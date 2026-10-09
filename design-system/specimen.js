const reducedMotion=matchMedia("(prefers-reduced-motion: reduce)");
/* Reference navigator demo only. Does not modify existing project controllers. */
(() => {
  const nav=document.querySelector('.spec-nav');
  if(!nav)return;
  const links=[...nav.querySelectorAll('a[href^="#"]')];
  const sections=links.map(a=>document.querySelector(a.getAttribute('href')));
  let scheduled=false;
  function update(){
    scheduled=false;
    const header=document.querySelector('.portfolio-navbar');
    const navOffset=matchMedia('(max-width:800px)').matches?nav.getBoundingClientRect().height:0;
    const offset=header.getBoundingClientRect().height+navOffset+32;
    let current=0;
    sections.forEach((s,i)=>{if(s.getBoundingClientRect().top<=offset)current=i;});
    links.forEach((a,i)=>i===current?a.setAttribute('aria-current','location'):a.removeAttribute('aria-current'));
  }
  function schedule(){if(!scheduled){scheduled=true;requestAnimationFrame(update);}}
  nav.addEventListener('click',event=>{
    const a=event.target.closest('a');if(!a)return;
    event.preventDefault();
    const section=sections[links.indexOf(a)];
    const offset=parseFloat(getComputedStyle(section).scrollMarginTop)||97;
    window.scrollTo({top:window.scrollY+section.getBoundingClientRect().top-offset,
      behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'});
    history.replaceState(null,'',a.getAttribute('href'));
  });
  addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);update();
})();

document.querySelectorAll('details[data-preview]').forEach(detail=>{
  const summary=detail.querySelector('summary');let pinned=false,preview=false;
  const peek=()=>{if(!pinned){preview=true;detail.toggleAttribute('data-previewing',true);detail.open=true;}};
  const dismiss=()=>{if(!pinned&&!detail.contains(document.activeElement)){preview=false;detail.removeAttribute('data-previewing');detail.open=false;}};
  detail.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'&&matchMedia('(hover:hover)').matches)peek();});
  detail.addEventListener('pointerleave',dismiss);detail.addEventListener('focusin',peek);
  detail.addEventListener('focusout',()=>requestAnimationFrame(dismiss));
  summary.addEventListener('click',e=>{e.preventDefault();if(preview&&!pinned)pinned=true;else pinned=!pinned;preview=false;detail.removeAttribute('data-previewing');detail.open=pinned;});
});
document.querySelectorAll('[data-tabs]').forEach(group=>{
  const tabs=[...group.querySelectorAll('[role="tab"]')];
  const activate=(tab,focus=false)=>{tabs.forEach(t=>{const selected=t===tab;t.setAttribute('aria-selected',String(selected));t.tabIndex=selected?0:-1;document.getElementById(t.getAttribute('aria-controls')).hidden=!selected;});if(focus)tab.focus();};
  tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>activate(tab));tab.addEventListener('keydown',e=>{let target;
    if(e.key==='ArrowRight')target=(i+1)%tabs.length;if(e.key==='ArrowLeft')target=(i-1+tabs.length)%tabs.length;
    if(e.key==='Home')target=0;if(e.key==='End')target=tabs.length-1;
    if(target!==undefined){e.preventDefault();activate(tabs[target],true);}});});activate(tabs[0]);
});
function initReferenceGallery(gallery){
  const source=[...gallery.children];if(source.length<2)return;
  gallery.replaceChildren();
  const sets=[0,1,2].map(set=>source.map((card,item)=>{const n=card.cloneNode(true);n.dataset.loopSet=set;n.dataset.loopItem=item;if(set!==1){n.setAttribute('aria-hidden','true');n.querySelectorAll('button,[tabindex]').forEach(el=>el.tabIndex=-1);if(n.hasAttribute('tabindex'))n.tabIndex=-1}gallery.appendChild(n);return n}));
  let cycle=0,home=0,frame=0,wheelDelta=0,down=false,lastX=0,dragDistance=0,pointerId=null;
  const instant=left=>gallery.scrollTo({left,behavior:'instant'});
  function measure(){const oldCycle=cycle,relative=gallery.scrollLeft-home;cycle=sets[2][0].offsetLeft-sets[1][0].offsetLeft;home=sets[1][0].offsetLeft-(parseFloat(getComputedStyle(gallery).paddingLeft)||0);instant(home+(oldCycle?relative*cycle/oldCycle:0));gallery.dataset.ready='1';updateCount()}
  function updateCount(){const cards=[...gallery.children];let closest=cards[0],distance=Infinity;cards.forEach(card=>{const d=Math.abs(card.offsetLeft-gallery.scrollLeft-gallery.offsetLeft);if(d<distance){closest=card;distance=d}});wrap.querySelector('[data-gallery-count]').textContent=(Number(closest.dataset.loopItem)+1)+' / '+source.length;}
  function flush(){frame=0;if(wheelDelta){instant(gallery.scrollLeft+wheelDelta);wheelDelta=0}if(!cycle)return;const delta=gallery.scrollLeft-home;if(delta>=cycle*.8)instant(gallery.scrollLeft-cycle);else if(delta< -cycle*.8)instant(gallery.scrollLeft+cycle);updateCount()}
  function schedule(){if(!frame)frame=requestAnimationFrame(flush)}
  gallery.addEventListener('scroll',schedule,{passive:true});
  const resize=new ResizeObserver(measure);resize.observe(gallery);sets[1].forEach(card=>resize.observe(card));
  gallery.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.button!==0||e.target.closest('button'))return;down=true;pointerId=e.pointerId;lastX=e.clientX;dragDistance=0});
  gallery.addEventListener('pointermove',e=>{if(!down)return;const dx=e.clientX-lastX;lastX=e.clientX;dragDistance+=Math.abs(dx);if(dragDistance>5){gallery.dataset.dragging='true';gallery.setPointerCapture(pointerId);instant(gallery.scrollLeft-dx);schedule();e.preventDefault()}});
  function release(){if(!down)return;down=false;if(dragDistance>5)gallery.dataset.dragEnd=String(performance.now()+250);delete gallery.dataset.dragging;if(gallery.hasPointerCapture(pointerId))gallery.releasePointerCapture(pointerId)}
  gallery.addEventListener('pointerup',release);gallery.addEventListener('pointercancel',release);gallery.addEventListener('lostpointercapture',release);gallery.addEventListener('pointerleave',()=>{if(pointerId===null||!gallery.hasPointerCapture(pointerId))release()});
  gallery.addEventListener('dragstart',e=>e.preventDefault());
  gallery.addEventListener('wheel',e=>{if(e.ctrlKey)return;const delta=Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:e.deltaY;if(!delta)return;e.preventDefault();wheelDelta+=delta*(e.deltaMode===1?16:e.deltaMode===2?gallery.clientWidth:1);schedule()},{passive:false});
  const wrap=gallery.closest('[data-gallery-demo]');
  [['[data-gallery-prev]',-1,'Previous items'],['[data-gallery-next]',1,'Next items']].forEach(([selector,sign,label])=>{const button=wrap.querySelector(selector);button.setAttribute('aria-label',label);button.addEventListener('click',()=>{flush();gallery.scrollBy({left:sign*Math.min(gallery.clientWidth*.75,700),behavior:reducedMotion.matches?'instant':'smooth'})})});
  gallery.addEventListener('click',e=>{if(performance.now()<Number(gallery.dataset.dragEnd||0)){e.preventDefault();e.stopPropagation()}},true);
  gallery.tabIndex=0;gallery.addEventListener('keydown',e=>{if(e.target!==gallery||!['ArrowLeft','ArrowRight'].includes(e.key))return;e.preventDefault();gallery.scrollBy({left:(e.key==='ArrowLeft'?-1:1)*Math.min(gallery.clientWidth*.75,700),behavior:reducedMotion.matches?'instant':'smooth'})});
}

document.querySelectorAll('[data-gallery-demo] .ds-gallery').forEach(initReferenceGallery);
document.querySelectorAll('[data-document-expand]').forEach(button=>{button.addEventListener('click',()=>{
  const pages=document.getElementById(button.getAttribute('aria-controls')),expanded=!pages.hasAttribute('data-expanded');
  pages.toggleAttribute('data-expanded',expanded);button.setAttribute('aria-expanded',String(expanded));button.textContent=expanded?'Collapse pages':'Expand pages';});});
document.querySelector('[data-load-pdf]')?.addEventListener('click',e=>{const frame=document.querySelector('[data-pdf-frame]');frame.src='../selected-visual-work/assets/veup/board-deck.pdf';frame.hidden=false;e.currentTarget.hidden=true;});
const seen=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.dataset.seen='true';seen.unobserve(e.target);}}),{threshold:.15});
document.querySelectorAll('.ds-enter').forEach(el=>seen.observe(el));
