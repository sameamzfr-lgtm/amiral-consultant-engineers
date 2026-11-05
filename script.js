(()=>{'use strict';
const header=document.getElementById('siteHeader');
const menu=document.getElementById('mobileNav');
const toggle=document.querySelector('.menu-toggle');
let lastY=window.scrollY;
function scrollHeader(){const y=window.scrollY;header.classList.toggle('is-sticky',y>100);const menuOpen=menu.classList.contains('is-open');if(y>420&&y>lastY+5&&!menuOpen)header.classList.add('nav-hidden');if(y<100||y<lastY-5||menuOpen)header.classList.remove('nav-hidden');lastY=y}
window.addEventListener('scroll',scrollHeader,{passive:true});scrollHeader();
function setMenu(open){menu.classList.toggle('is-open',open);menu.inert=!open;toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close menu':'Open menu');header.classList.remove('nav-hidden')}
toggle.addEventListener('click',()=>setMenu(!menu.classList.contains('is-open')));
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
document.addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});
const slides=[...document.querySelectorAll('.hero-slide')],dots=[...document.querySelectorAll('.slide-indicators button')];
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)');let current=0;
function showSlide(i){current=((i%slides.length)+slides.length)%slides.length;slides.forEach((s,j)=>s.classList.toggle('active',j===current));dots.forEach((d,j)=>{d.classList.toggle('current',j===current);if(j===current)d.setAttribute('aria-current','true');else d.removeAttribute('aria-current')})}
dots.forEach((b,i)=>b.addEventListener('click',()=>showSlide(i)));
if(slides.length>1&&!reduceMotion.matches)setInterval(()=>{if(!document.hidden)showSlide(current+1)},5200);
const reveal=[...document.querySelectorAll('.reveal')];
if('IntersectionObserver'in window){const ob=new IntersectionObserver(entries=>entries.forEach(e=>e.target.classList.toggle('is-visible',e.isIntersecting)),{threshold:.06,rootMargin:'0px 0px -5% 0px'});reveal.forEach(e=>ob.observe(e))}else reveal.forEach(e=>e.classList.add('is-visible'));
const viewport=document.getElementById('portfolioViewport'),rail=document.getElementById('mosaicRail'),topRow=document.getElementById('mosaicTop'),bottomRow=document.getElementById('mosaicBottom');
const prev=document.getElementById('prevProject'),next=document.getElementById('nextProject');
const fill=document.getElementById('progressFill'),count=document.getElementById('projectCount');
const allCards=[...document.getElementById('projectCards').content.querySelectorAll('.project-card')];
const filters=[...document.querySelectorAll('button.filter')];
let activeFilter='All',moving=null,animationId=0,previousTime=0;
const cardWidths=[263,288,248,275,258,293,254,281,269,295,249,274,261,288,256,292,252,282,264,286];
function widthFor(i){const base=cardWidths[i%cardWidths.length];if(innerWidth<=430)return 222+(i%3)*10;if(innerWidth<=760)return 238+(i%3)*12;return base}
function buildMosaic(){
 stopHover();topRow.replaceChildren();bottomRow.replaceChildren();topRow.style.paddingRight='0px';bottomRow.style.paddingRight='0px';let visible=0;
 for(const [i,card] of allCards.entries()){
   if(activeFilter!=='All'&&card.dataset.sector!==activeFilter)continue;
   card.style.setProperty('--cardw',widthFor(i)+'px');
   (visible%2===0?topRow:bottomRow).appendChild(card); visible++;
 }
 count.textContent=visible+' PROJECT'+(visible===1?'':'S');
 bottomRow.hidden=visible<2;
 document.getElementById('emptyState').hidden=visible>0;
 // The staggered second row is offset by half a brick. Make its ending visually complete.
 rail.style.minWidth='100%';
 viewport.scrollLeft=0;
 requestAnimationFrame(()=>{const topWidth=topRow.scrollWidth,bottomWidth=bottomRow.scrollWidth;topRow.style.paddingRight=Math.max(0,bottomWidth-topWidth)+'px';bottomRow.style.paddingRight=Math.max(0,topWidth-bottomWidth)+'px';updateControls()});
}
function updateControls(){const max=Math.max(0,viewport.scrollWidth-viewport.clientWidth);const pos=viewport.scrollLeft;prev.disabled=pos<=2;next.disabled=pos>=max-2;fill.style.width=(max?Math.min(100,pos/max*100):100)+'%'}
function stopHover(){moving=null;cancelAnimationFrame(animationId);animationId=0;previousTime=0;viewport.style.scrollBehavior='';prev.classList.remove('is-moving');next.classList.remove('is-moving')}
function animate(timestamp){if(!moving)return;const dt=previousTime?Math.min((timestamp-previousTime)/1000,.05):0;previousTime=timestamp;const old=viewport.scrollLeft;viewport.scrollLeft+=moving*455*dt;updateControls();if(Math.abs(old-viewport.scrollLeft)<.1&&dt>.005&&(viewport.scrollLeft<=0||viewport.scrollLeft>=viewport.scrollWidth-viewport.clientWidth-1)){stopHover();return}animationId=requestAnimationFrame(animate)}
function hoverDirection(dir,button){if(window.matchMedia('(hover:hover) and (pointer:fine)').matches&&!button.disabled&&!reduceMotion.matches){stopHover();viewport.style.scrollBehavior='auto';moving=dir;button.classList.add('is-moving');animationId=requestAnimationFrame(animate)}}
for(const [button,dir] of [[prev,-1],[next,1]]){
 button.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')hoverDirection(dir,button)});
 button.addEventListener('pointerleave',stopHover);
 button.addEventListener('pointercancel',stopHover);
 button.addEventListener('blur',stopHover);
 button.addEventListener('click',()=>{stopHover();viewport.scrollBy({left:dir*Math.min(viewport.clientWidth*.77,580),behavior:reduceMotion.matches?'instant':'smooth'})});
}
viewport.addEventListener('scroll',updateControls,{passive:true});
viewport.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();viewport.scrollBy({left:e.key==='ArrowRight'?300:-300,behavior:'smooth'})}});
filters.forEach(button=>button.addEventListener('click',()=>{activeFilter=button.dataset.filter;filters.forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button))});buildMosaic()}));
window.addEventListener('resize',()=>{for(const [i,card] of allCards.entries())card.style.setProperty('--cardw',widthFor(i)+'px');topRow.style.paddingRight='0px';bottomRow.style.paddingRight='0px';requestAnimationFrame(()=>{const topWidth=topRow.scrollWidth,bottomWidth=bottomRow.scrollWidth;topRow.style.paddingRight=Math.max(0,bottomWidth-topWidth)+'px';bottomRow.style.paddingRight=Math.max(0,topWidth-bottomWidth)+'px';updateControls()})});
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopHover()});
buildMosaic();
})();
