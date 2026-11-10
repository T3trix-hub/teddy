// тема: тёмная / светлая
(()=>{
  const root=document.documentElement;
  const btn=document.querySelector('.theme');
  if(btn){
    const sync=()=>btn.setAttribute('aria-label',root.dataset.theme==='dark'?'Включить светлую тему':'Включить тёмную тему');
    sync();
    btn.addEventListener('click',()=>{
      const next=root.dataset.theme==='dark'?'light':'dark';
      root.dataset.theme=next;
      try{localStorage.setItem('teddy-theme',next)}catch(e){}
      sync();
    });
  }
})();
// меню
const b=document.querySelector('.burger'),n=document.querySelector('nav');
if(b){b.addEventListener('click',()=>{const o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)})}
// полоска прокрутки
(()=>{const p=document.getElementById('progress');if(!p)return;
  const f=()=>{const h=document.documentElement;const m=h.scrollHeight-h.clientHeight;p.style.width=(m>0?h.scrollTop/m*100:0)+'%'};
  addEventListener('scroll',f,{passive:true});f()})();
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
// появление, счётчики, полосы
(()=>{
  document.querySelectorAll('.fill').forEach(f=>f.style.setProperty('--w',f.dataset.w+'%'));
  if(!('IntersectionObserver' in window)||reduce){document.querySelectorAll('.fill').forEach(f=>f.style.width=f.dataset.w+'%');return}
  const sel='main section:not(.hero) h2, main section:not(.hero) .lead, .tile, .step, .stat, .big, .mgroup, details, .photo, .note, .map, .cards>div, form, .bar-row';
  const els=[...document.querySelectorAll(sel)].filter(e=>!e.closest('.hero'));
  const io=new IntersectionObserver(es=>es.forEach(en=>{
    if(!en.isIntersecting)return;const t=en.target;t.classList.add('in');io.unobserve(t);
    const fl=t.querySelector&&t.querySelector('.fill');if(fl)fl.style.width=fl.dataset.w+'%';
    const num=t.querySelector&&t.querySelector('[data-count]');if(num)count(num);
  }),{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  els.forEach(e=>{e.classList.add('reveal');const s=[...e.parentElement.children].filter(c=>els.includes(c));const i=s.indexOf(e);if(i>0)e.style.transitionDelay=Math.min(i,4)*.1+'s';io.observe(e)});
  function count(el){const to=parseFloat(el.dataset.count),dec=(el.dataset.count.split('.')[1]||'').length,suf=el.dataset.suf||'';const t0=performance.now(),d=1400;
    const step=t=>{const k=Math.min((t-t0)/d,1),v=to*(1-Math.pow(1-k,3));el.textContent=v.toFixed(dec).replace('.',',')+suf;if(k<1)requestAnimationFrame(step)};requestAnimationFrame(step)}
})();
// фильтр меню
(()=>{const tabs=document.querySelectorAll('.tab');if(!tabs.length)return;
  tabs.forEach(t=>t.addEventListener('click',()=>{
    tabs.forEach(x=>x.setAttribute('aria-pressed',x===t));
    const c=t.dataset.cat;document.querySelectorAll('.mgroup').forEach(g=>g.classList.toggle('hide',c!=='all'&&g.dataset.cat!==c));
  }))})();
// заявка на праздник в WhatsApp
(()=>{const f=document.getElementById('party');if(!f)return;
  f.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(f);
    const t=`Здравствуйте! Хочу узнать про праздник в TeddyBearBar.\nИмя: ${d.get('name')}\nДата: ${d.get('date')||'—'}\nДетей: ${d.get('kids')||'—'}\nКомментарий: ${d.get('msg')||'—'}`;
    window.open('https://wa.me/375296051645?text='+encodeURIComponent(t),'_blank')})})();
