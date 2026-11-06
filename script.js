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
// Two genuinely independent horizontal tracks: each viewport controls only its own row.
const rowControls = [
 {key:'top', stage:document.getElementById('topStage'), viewport:document.getElementById('topViewport'),
  track:document.getElementById('mosaicTop'), prev:document.getElementById('prevTop'),
  next:document.getElementById('nextTop'), progress:document.getElementById('progressTop'),
  moving:0,frame:0,lastTime:0},
 {key:'bottom', stage:document.getElementById('bottomStage'), viewport:document.getElementById('bottomViewport'),
  track:document.getElementById('mosaicBottom'), prev:document.getElementById('prevBottom'),
  next:document.getElementById('nextBottom'), progress:document.getElementById('progressBottom'),
  moving:0,frame:0,lastTime:0}
];
const count=document.getElementById('projectCount');
const allCards=[...document.getElementById('projectCards').content.querySelectorAll('.project-card')];
const filters=[...document.querySelectorAll('button.filter')];
let activeFilter='All';
const cardWidths=[263,288,248,275,258,293,254,281,269,295,249,274,261,288,256,292,252,282,264,286];
function widthFor(i){const base=cardWidths[i%cardWidths.length];if(innerWidth<=430)return 222+(i%3)*10;if(innerWidth<=760)return 238+(i%3)*12;return base}
function stopHover(row){
 row.moving=0;
 if(row.frame)cancelAnimationFrame(row.frame);
 row.frame=0;row.lastTime=0;
 row.prev.classList.remove('is-moving');row.next.classList.remove('is-moving');
 row.viewport.style.scrollBehavior='auto';
}
function updateControls(row){
 if(row.stage.hidden){row.prev.disabled=true;row.next.disabled=true;row.progress.style.width='0%';return}
 const max=Math.max(0,row.viewport.scrollWidth-row.viewport.clientWidth);
 const at=Math.max(0,row.viewport.scrollLeft);
 row.prev.disabled=at<=2;
 row.next.disabled=at>=max-2;
 row.progress.style.width=(max?Math.min(100,at/max*100):100)+'%';
}
function animateRow(row,timestamp){
 if(!row.moving)return;
 const dt=row.lastTime?Math.min((timestamp-row.lastTime)/1000,0.05):0;
 row.lastTime=timestamp;
 const before=row.viewport.scrollLeft;
 row.viewport.scrollLeft+=row.moving*455*dt;
 updateControls(row);
 const max=Math.max(0,row.viewport.scrollWidth-row.viewport.clientWidth);
 if(dt>.005&&(Math.abs(row.viewport.scrollLeft-before)<.1 ||
    (row.moving<0&&row.viewport.scrollLeft<=0)||(row.moving>0&&row.viewport.scrollLeft>=max-1))){
   stopHover(row);return;
 }
 row.frame=requestAnimationFrame(t=>animateRow(row,t));
}
function beginHover(row,dir,button){
 if(!window.matchMedia('(hover:hover) and (pointer:fine)').matches || button.disabled || reduceMotion.matches)return;
 stopHover(row);row.moving=dir;
 button.classList.add('is-moving');
 row.frame=requestAnimationFrame(t=>animateRow(row,t));
}
for(const row of rowControls){
 for(const [button,dir] of [[row.prev,-1],[row.next,1]]){
  button.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse')beginHover(row,dir,button)});
  button.addEventListener('pointerleave',()=>stopHover(row));
  button.addEventListener('pointercancel',()=>stopHover(row));
  button.addEventListener('blur',()=>stopHover(row));
  button.addEventListener('click',()=>{
   stopHover(row);
   row.viewport.scrollBy({left:dir*Math.min(row.viewport.clientWidth*.78,500),behavior:reduceMotion.matches?'instant':'smooth'});
  });
 }
 row.viewport.addEventListener('scroll',()=>updateControls(row),{passive:true});
 row.viewport.addEventListener('keydown',event=>{
  if(event.key==='ArrowRight'||event.key==='ArrowLeft'){
   event.preventDefault();
   row.viewport.scrollBy({left:event.key==='ArrowRight'?300:-300,behavior:reduceMotion.matches?'instant':'smooth'});
  }
 });
}
function buildMosaic(){
 for(const row of rowControls){stopHover(row);row.track.replaceChildren();row.stage.hidden=false}
 let visible=0;
 for(const [i,card] of allCards.entries()){
  if(activeFilter!=='All'&&card.dataset.sector!==activeFilter)continue;
  card.style.setProperty('--cardw',widthFor(i)+'px');
  rowControls[visible%2].track.appendChild(card);
  visible++;
 }
 count.textContent=visible+' PROJECT'+(visible===1?'':'S');
 document.getElementById('emptyState').hidden=visible>0;
 rowControls.forEach(row=>{
  row.stage.hidden=!row.track.children.length;
  row.viewport.scrollLeft=0;
 });
 requestAnimationFrame(()=>rowControls.forEach(updateControls));
}
filters.forEach(button=>button.addEventListener('click',()=>{
 activeFilter=button.dataset.filter;
 filters.forEach(item=>{item.classList.toggle('active',item===button);item.setAttribute('aria-pressed',String(item===button))});
 buildMosaic();
}));
let resizeFrame=0;
window.addEventListener('resize',()=>{
 if(resizeFrame)cancelAnimationFrame(resizeFrame);
 resizeFrame=requestAnimationFrame(()=>{
  for(const [i,card] of allCards.entries())card.style.setProperty('--cardw',widthFor(i)+'px');
  rowControls.forEach(updateControls);resizeFrame=0;
 });
});
document.addEventListener('visibilitychange',()=>{if(document.hidden)rowControls.forEach(stopHover)});
buildMosaic();
})();
