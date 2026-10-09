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
document.querySelectorAll('[data-gallery-demo]').forEach(shell=>{
  const rail=shell.querySelector('.ds-gallery'),slides=[...rail.querySelectorAll('figure')];
  const previous=shell.querySelector('[data-gallery-prev]'),next=shell.querySelector('[data-gallery-next]'),count=shell.querySelector('[data-gallery-count]');
  const motion=()=>matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth';
  let frame=0,down=false,lastX=0,totalDrag=0,pointer=null;
  const index=()=>{let best=0,distance=Infinity;slides.forEach((s,i)=>{const d=Math.abs(s.offsetLeft-rail.offsetLeft-rail.scrollLeft);if(d<distance){best=i;distance=d;}});return best;};
  const update=()=>{frame=0;count.textContent=(index()+1)+' / '+slides.length;previous.disabled=rail.scrollLeft<=1;next.disabled=rail.scrollLeft>=rail.scrollWidth-rail.clientWidth-1;};
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
  const step=direction=>{const i=Math.max(0,Math.min(slides.length-1,index()+direction));rail.scrollTo({left:slides[i].offsetLeft-rail.offsetLeft,behavior:motion()});};
  previous.addEventListener('click',()=>step(-1));next.addEventListener('click',()=>step(1));rail.addEventListener('scroll',schedule,{passive:true});
  rail.addEventListener('keydown',e=>{if(e.target!==rail)return;
    if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();step(e.key==='ArrowLeft'?-1:1);}
    if(e.key==='Home'||e.key==='End'){e.preventDefault();rail.scrollTo({left:e.key==='Home'?0:rail.scrollWidth,behavior:motion()});}});
  rail.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.button!==0)return;down=true;lastX=e.clientX;pointer=e.pointerId;totalDrag=0;});
  rail.addEventListener('pointermove',e=>{if(!down)return;const delta=e.clientX-lastX;lastX=e.clientX;totalDrag+=Math.abs(delta);if(totalDrag>5){rail.dataset.dragging='true';rail.setPointerCapture(pointer);rail.scrollLeft-=delta;e.preventDefault();}});
  const release=()=>{down=false;delete rail.dataset.dragging;if(pointer!==null&&rail.hasPointerCapture(pointer))rail.releasePointerCapture(pointer);pointer=null;};
  rail.addEventListener('pointerup',release);rail.addEventListener('pointercancel',release);rail.addEventListener('lostpointercapture',release);
  rail.addEventListener('wheel',e=>{if(e.ctrlKey)return;if(Math.abs(e.deltaX)>Math.abs(e.deltaY))return;if(!e.shiftKey)return;
    const delta=e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?rail.clientWidth:1);
    const canMove=delta>0?rail.scrollLeft<rail.scrollWidth-rail.clientWidth-1:rail.scrollLeft>1;
    if(canMove){e.preventDefault();rail.scrollLeft+=delta;}},{passive:false});
  new ResizeObserver(schedule).observe(rail);update();
});
document.querySelectorAll('[data-document-expand]').forEach(button=>{button.addEventListener('click',()=>{
  const pages=document.getElementById(button.getAttribute('aria-controls')),expanded=!pages.hasAttribute('data-expanded');
  pages.toggleAttribute('data-expanded',expanded);button.setAttribute('aria-expanded',String(expanded));button.textContent=expanded?'Collapse pages':'Expand pages';});});
document.querySelector('[data-load-pdf]')?.addEventListener('click',e=>{const frame=document.querySelector('[data-pdf-frame]');frame.src='../selected-visual-work/assets/veup/board-deck.pdf';frame.hidden=false;e.currentTarget.hidden=true;});
const seen=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.dataset.seen='true';seen.unobserve(e.target);}}),{threshold:.15});
document.querySelectorAll('.ds-enter').forEach(el=>seen.observe(el));
