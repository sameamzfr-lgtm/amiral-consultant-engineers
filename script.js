(()=>{'use strict';
// The early <head> bootstrap is responsible for opening at the hero.
// Don't attach competing startup scroll timers or touchstart cancel handlers.
function stopStartupGuard() {
  window.__amiralUserScrolled = true;
  window.__amiralHeroStartup = false;
  document.documentElement.classList.remove('starting-at-hero');
}
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
// Animate navigation only after an intentional click. Leave skip links native.
document.querySelectorAll('a[href^="#"]:not(.skip-link)').forEach(link=>{
 link.addEventListener('click',event=>{
   const id=link.getAttribute('href').slice(1);
   const target=id&&document.getElementById(id);
   if(!target)return;
   event.preventDefault();
   stopStartupGuard();
   history.pushState(null,'','#'+id);
   target.scrollIntoView({behavior:reduceMotion.matches?'auto':'smooth',block:'start'});
 });
});

function showSlide(i){current=((i%slides.length)+slides.length)%slides.length;slides.forEach((s,j)=>s.classList.toggle('active',j===current));dots.forEach((d,j)=>{d.classList.toggle('current',j===current);if(j===current)d.setAttribute('aria-current','true');else d.removeAttribute('aria-current')})}
dots.forEach((b,i)=>b.addEventListener('click',()=>showSlide(i)));
if(slides.length>1&&!reduceMotion.matches)setInterval(()=>{if(!document.hidden)showSlide(current+1)},5200);
const reveal=[...document.querySelectorAll('.reveal')];
if('IntersectionObserver'in window){const ob=new IntersectionObserver(entries=>entries.forEach(e=>e.target.classList.toggle('is-visible',e.isIntersecting)),{threshold:.06,rootMargin:'0px 0px -5% 0px'});reveal.forEach(e=>ob.observe(e))}else reveal.forEach(e=>e.classList.add('is-visible'));
// One unified portfolio carousel, preserving image proportions and mobile swiping.
const gallery=document.getElementById('portfolioGallery');
const viewport=document.getElementById('portfolioViewport');
const track=document.getElementById('portfolioTrack');
const prev=document.getElementById('prevPortfolio');
const next=document.getElementById('nextPortfolio');
const progress=document.getElementById('progressPortfolio');
const count=document.getElementById('projectCount');
const allCards=[...document.getElementById('projectCards').content.querySelectorAll('.project-card')];
const filters=[...document.querySelectorAll('button.filter')];
let activeFilter='All', moving=0, hoverFrame=0, lastTime=0;

function stopHover(){
 moving=0;
 if(hoverFrame)cancelAnimationFrame(hoverFrame);
 hoverFrame=0;lastTime=0;
 prev.classList.remove('is-moving');next.classList.remove('is-moving');
}
function updateControls(){
 const max=Math.max(0,viewport.scrollWidth-viewport.clientWidth);
 const at=Math.max(0,viewport.scrollLeft);
 prev.disabled=at<=2;
 next.disabled=at>=max-2;
 progress.style.width=(max?Math.min(100,at/max*100):100)+'%';
}
function animateHover(timestamp){
 if(!moving)return;
 const dt=lastTime?Math.min((timestamp-lastTime)/1000,.05):0;
 lastTime=timestamp;
 const before=viewport.scrollLeft;
 viewport.scrollLeft+=moving*480*dt;
 updateControls();
 const max=Math.max(0,viewport.scrollWidth-viewport.clientWidth);
 if(dt>.005&&(Math.abs(viewport.scrollLeft-before)<.1 ||
   (moving<0&&viewport.scrollLeft<=0)||(moving>0&&viewport.scrollLeft>=max-1))){
   stopHover();return;
 }
 hoverFrame=requestAnimationFrame(animateHover);
}
function beginHover(dir,button){
 if(!window.matchMedia('(hover:hover) and (pointer:fine)').matches||button.disabled||reduceMotion.matches)return;
 stopHover();moving=dir;button.classList.add('is-moving');
 hoverFrame=requestAnimationFrame(animateHover);
}
for(const [button,dir] of [[prev,-1],[next,1]]){
 button.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse')beginHover(dir,button)});
 button.addEventListener('pointerleave',stopHover);
 button.addEventListener('pointercancel',stopHover);
 button.addEventListener('blur',stopHover);
 button.addEventListener('click',()=>{
   stopHover();
   const card=track.querySelector('.project-card');
   const cardWidth=card?card.getBoundingClientRect().width:380;
   viewport.scrollBy({left:dir*(cardWidth+22),behavior:reduceMotion.matches?'instant':'smooth'});
 });
}
viewport.addEventListener('scroll',updateControls,{passive:true});
viewport.addEventListener('keydown',event=>{
 if(event.key==='ArrowRight'||event.key==='ArrowLeft'){
  event.preventDefault();
  viewport.scrollBy({left:event.key==='ArrowRight'?375:-375,behavior:reduceMotion.matches?'instant':'smooth'});
 }
});
function buildPortfolio(){
 stopHover();track.replaceChildren();
 let visible=0;
 for(const card of allCards){
   if(activeFilter!=='All'&&card.dataset.sector!==activeFilter)continue;
   track.appendChild(card);
   visible++;
 }
 count.textContent=visible+' PROJECT'+(visible===1?'':'S');
 document.getElementById('emptyState').hidden=visible>0;
 gallery.hidden=visible===0;
 viewport.scrollLeft=0;
 requestAnimationFrame(updateControls);
}
filters.forEach(button=>button.addEventListener('click',()=>{
 activeFilter=button.dataset.filter;
 filters.forEach(item=>{item.classList.toggle('active',item===button);item.setAttribute('aria-pressed',String(item===button))});
 buildPortfolio();
}));
let resizeFrame=0;
window.addEventListener('resize',()=>{
 if(resizeFrame)cancelAnimationFrame(resizeFrame);
 resizeFrame=requestAnimationFrame(()=>{updateControls();resizeFrame=0});
});
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopHover()});
buildPortfolio();
})();
