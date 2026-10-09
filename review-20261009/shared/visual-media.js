/* Keep image proportions and the approved Selected Visual Work gallery controller. */
document.querySelectorAll('[data-gallery] > figure').forEach(figure=>{
 const img=figure.querySelector('img');if(!img)return;
 const update=()=>{const width=Number(img.getAttribute('width'))||img.naturalWidth,height=Number(img.getAttribute('height'))||img.naturalHeight;if(width&&height)figure.style.setProperty('--media-ratio',String(width/height));};
 update();img.addEventListener('load',update,{once:true});
});
const visualNav=document.querySelector('.project-nav'),visualHeader=document.querySelector('.portfolio-navbar');
if(visualNav&&visualHeader)visualHeader.insertAdjacentElement('afterend',visualNav);
