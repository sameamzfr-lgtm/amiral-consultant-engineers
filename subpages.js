(()=>{
 'use strict';
 const header=document.querySelector('.team-header');
 const menu=header?.querySelector('.mobile-nav');
 const toggle=header?.querySelector('.menu-toggle');
 if(menu&&toggle){
   const setOpen=(open)=>{
     menu.classList.toggle('is-open',open);
     menu.inert=!open;
     if(open)menu.removeAttribute('inert'); else menu.setAttribute('inert','');
     toggle.setAttribute('aria-expanded',String(open));
     toggle.setAttribute('aria-label',open?'Close menu':'Open menu');
     header.classList.remove('nav-hidden');
   };
   setOpen(false);
   toggle.addEventListener('click', (e)=>{e.preventDefault();setOpen(!menu.classList.contains('is-open'))});
   menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setOpen(false)));
   document.addEventListener('keydown',e=>{if(e.key==='Escape')setOpen(false)});
   document.addEventListener('pointerdown',e=>{if(menu.classList.contains('is-open')&&!header.contains(e.target))setOpen(false)});
   window.addEventListener('resize',()=>{if(window.innerWidth>760)setOpen(false)},{passive:true});
 }
 const form=document.getElementById('feedbackForm');
 if(form){
   form.addEventListener('submit',(e)=>{
     e.preventDefault();
     if(!form.reportValidity())return;
     const data=new FormData(form);
     const name=String(data.get('name')||'').trim();
     const reply=String(data.get('email')||'').trim();
     const topic=String(data.get('topic')||'General inquiry').trim();
     const message=String(data.get('message')||'').trim();
     const subject=encodeURIComponent('Amiral website: '+topic);
     const body=encodeURIComponent(`From: ${name}\nReply-to: ${reply}\nInquiry: ${topic}\n\n${message}`);
     const status=document.getElementById('formStatus');
     if(status)status.textContent='Your email app should open with the message ready. Please press Send there to deliver it.';
     window.location.href=`mailto:info@amiralce.com?subject=${subject}&body=${body}`;
   });
 }
})();