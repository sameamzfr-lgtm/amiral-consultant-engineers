(()=>{'use strict';
const track=document.getElementById('portfolioTrack');
const fill=document.getElementById('progressFill');
const buttons=[...document.querySelectorAll('.filter')];
const counter=document.getElementById('projectCount');
const prev=document.getElementById('prevProject');
const next=document.getElementById('nextProject');
const cards=()=>[...track.querySelectorAll('.project-card:not([hidden])')];
function updateProgress(){const max=Math.max(1,track.scrollWidth-track.clientWidth);const p=track.scrollLeft/max;fill.style.width=(p*100)+'%';prev.disabled=track.scrollLeft<=3;next.disabled=track.scrollLeft>=max-3||track.scrollWidth<=track.clientWidth+3;}
function move(dir){const card=cards()[0];const step=card?card.getBoundingClientRect().width+23:track.clientWidth*.7;track.scrollBy({left:dir*step,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});}
prev.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));
buttons.forEach(b=>b.addEventListener('click',()=>{buttons.forEach(x=>x.classList.toggle('active',x===b));track.querySelectorAll('.project-card').forEach(c=>{c.hidden=b.dataset.filter!=='All'&&c.dataset.sector!==b.dataset.filter;});counter.textContent=cards().length;track.scrollTo({left:0,behavior:'instant'});requestAnimationFrame(updateProgress)}));
track.addEventListener('scroll',updateProgress,{passive:true});window.addEventListener('resize',updateProgress);updateProgress();
// Image carousel uses fade-in/fade-out and respects reduced-motion settings.
const slides=[...document.querySelectorAll('.hero-slide')],dots=[...document.querySelectorAll('.slide-dots button')];let slideIndex=0;
function showSlide(i){slideIndex=(i+slides.length)%slides.length;slides.forEach((s,n)=>s.classList.toggle('is-active',n===slideIndex));dots.forEach((d,n)=>d.classList.toggle('is-active',n===slideIndex));}
dots.forEach((d,i)=>d.addEventListener('click',()=>showSlide(i)));
if(slides.length>1&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){setInterval(()=>{if(!document.hidden)showSlide(slideIndex+1)},5200)}
// Animate elements when entering and leaving viewport, including upward scroll.
const reveal=[...document.querySelectorAll('.reveal')];
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>entry.target.classList.toggle('is-visible',entry.isIntersecting))},{rootMargin:'0px 0px -8% 0px',threshold:.08});reveal.forEach(el=>observer.observe(el));}else reveal.forEach(el=>el.classList.add('is-visible'));
// Transparent-on-hero header; frosted glass on later sections, retracts on downscroll.
const header=document.getElementById('siteHeader');let lastY=window.scrollY;
function onScroll(){const y=window.scrollY;header.classList.toggle('is-sticky',y>95);header.classList.toggle('nav-hide',y>390&&y>lastY+3&&!header.querySelector('.mobile-nav').classList.contains('is-open'));if(y<95||y<lastY-3)header.classList.remove('nav-hide');lastY=y;}
window.addEventListener('scroll',onScroll,{passive:true});onScroll();
const toggle=document.querySelector('.mobile-menu-toggle'),menu=document.getElementById('mobileNav');
function closeMenu(){menu.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open menu')}
toggle.addEventListener('click',()=>{const opened=!menu.classList.contains('is-open');menu.classList.toggle('is-open',opened);toggle.setAttribute('aria-expanded',String(opened));toggle.setAttribute('aria-label',opened?'Close menu':'Open menu');header.classList.remove('nav-hide')});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
})();
