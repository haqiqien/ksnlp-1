const secs=[...document.querySelectorAll('section[data-t]')];
document.getElementById('menu-toggle').addEventListener('click',()=>document.querySelector('nav').classList.toggle('open'));
const toc=document.getElementById('toc');
let done={};
try{done=JSON.parse(localStorage.getItem('pt_done')||'{}')}catch(e){}
secs.forEach(s=>{
  const a=document.createElement('a');a.href='#'+s.id;
  const c=document.createElement('input');c.type='checkbox';c.checked=!!done[s.id];
  c.onclick=e=>{e.stopPropagation();done[s.id]=c.checked;try{localStorage.setItem('pt_done',JSON.stringify(done))}catch(x){}upd()};
  a.append(c,s.dataset.t);a.onclick=()=>document.querySelector('nav').classList.remove('open');
  toc.append(a);
});
function upd(){
  const n=secs.filter(s=>done[s.id]).length,p=Math.round(n/secs.length*100);
  document.getElementById('pct').textContent=p+'% selesai ('+n+'/'+secs.length+')';
  document.getElementById('fill').style.width=p+'%';
}
upd();
const links=[...toc.children];
new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){links.forEach(l=>l.classList.toggle('on',l.getAttribute('href')==='#'+e.target.id))}}),{rootMargin:'-20% 0px -70% 0px'}).observe&&secs.forEach(s=>{});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(l=>l.classList.toggle('on',l.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-20% 0px -70% 0px'});
secs.forEach(s=>io.observe(s));
document.querySelectorAll('.q button').forEach(b=>b.onclick=()=>{const q=b.parentElement;q.classList.toggle('show');b.textContent=q.classList.contains('show')?'Sembunyikan':'Lihat jawaban'});
