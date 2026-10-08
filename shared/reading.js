/* Fit heading word groups and align adjacent text with headings, not labels. */
(() => {
 const headings=[...document.querySelectorAll('[data-reading-heading]')];
 const grids=[...document.querySelectorAll('[data-reading-grid]')];
 let pending=false;
 function update(){
  pending=false;
  headings.forEach(heading=>{
   heading.style.removeProperty('font-size');
   const width=heading.clientWidth;
   const widest=Math.max(0,...[...heading.querySelectorAll('.reading-words,.type-word-group')].map(s=>s.getBoundingClientRect().width));
   if(width>0&&widest>width){const size=parseFloat(getComputedStyle(heading).fontSize);heading.style.fontSize=Math.floor(size*width/widest*.98)+'px';}
  });
  grids.forEach(grid=>{
   const left=grid.querySelector('[data-reading-labels]');
   const heading=left?.matches('h2')?left:left?.querySelector('h2');
   if(!heading)return;
   const offset=heading.getBoundingClientRect().top-left.getBoundingClientRect().top;
   grid.style.setProperty('--reading-copy-offset',Math.max(0,offset)+'px');
  });
 }
 function schedule(){if(pending)return;pending=true;requestAnimationFrame(update);}
 addEventListener('resize',schedule,{passive:true});
 addEventListener('load',schedule,{once:true});
 if(document.fonts?.ready)document.fonts.ready.then(schedule);
 if('ResizeObserver' in window){const observer=new ResizeObserver(schedule);headings.forEach(heading=>observer.observe(heading));}
 update();
})();
