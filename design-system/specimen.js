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
