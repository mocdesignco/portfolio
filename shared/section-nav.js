/* Opt-in section links; no typography, media or shared header/footer changes. */
(() => {
 const config=document.querySelector('script[data-section-nav]');
 if(!config||document.querySelector('.case-index,.project-nav,.portfolio-section-nav'))return;
 const selectors=config.dataset.sectionNav.split('|');
 const targets=selectors.map(s=>document.querySelector(s)).filter(Boolean);
 if(targets.length<2)return;
 const header=document.querySelector('.portfolio-navbar');
 const nav=document.createElement('nav');nav.className='portfolio-section-nav';nav.setAttribute('aria-label','Page sections');
 const links=targets.map((target,i)=>{
   if(!target.id){let id='page-section-'+String(i+1).padStart(2,'0');while(document.getElementById(id))id+='-nav';target.id=id;}
   const heading=target.querySelector('h1,h2');
   const title=(heading?.innerText||heading?.textContent||'Overview').replace(/\s+/g,' ').trim();
   const a=document.createElement('a');a.href='#'+target.id;a.textContent=String(i+1).padStart(2,'0');a.setAttribute('aria-label',a.textContent+' '+title);nav.appendChild(a);return a;
 });
 if(header)header.insertAdjacentElement('afterend',nav);else document.body.prepend(nav);
 let starts=[],frame=0,current=-1;
 const mobile=()=>matchMedia('(max-width:800px)').matches;
 const offset=()=>{const h=header?.getBoundingClientRect().height||0;nav.style.setProperty('--portfolio-section-nav-top',h+'px');return h+(mobile()?nav.getBoundingClientRect().height:0)+24;};
 function update(){
   frame=0;const position=window.scrollY+offset()+Math.min(window.innerHeight*.15,120);
   let active=0;starts.forEach((top,i)=>{if(position>=top)active=i;});
   if(active===current)return;current=active;
   links.forEach((a,i)=>i===active?a.setAttribute('aria-current','location'):a.removeAttribute('aria-current'));
 }
 function schedule(){if(!frame)frame=requestAnimationFrame(update);}
 function measure(){starts=targets.map(t=>window.scrollY+t.getBoundingClientRect().top);schedule();}
 nav.addEventListener('click',e=>{
   const a=e.target.closest('a');if(!a)return;e.preventDefault();const target=targets[links.indexOf(a)];
   window.scrollTo({top:window.scrollY+target.getBoundingClientRect().top-offset(),behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'});
   history.replaceState(null,'',a.getAttribute('href'));
 });
 addEventListener('scroll',schedule,{passive:true});addEventListener('resize',measure);
 addEventListener('load',measure);document.fonts?.ready.then(measure);
 new ResizeObserver(measure).observe(document.body);measure();
})();
