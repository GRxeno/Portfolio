const root=document.documentElement,reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
document.getElementById('yr').textContent=new Date().getFullYear();
document.getElementById('theme').onclick=()=>{const n=root.dataset.theme==='dark'?'light':'dark';root.dataset.theme=n;try{localStorage.setItem('theme',n)}catch(e){}};
const css=v=>getComputedStyle(root).getPropertyValue(v).trim();

/* render projects from projects.js */
(function(){
  const list=document.getElementById('project-list');
  if(!list||typeof PROJECTS==='undefined')return;
  PROJECTS.forEach(p=>{
    const card=document.createElement('div');card.className='card';
    const h=document.createElement('h3');h.textContent=p.title;
    const t=document.createElement('p');t.textContent=p.text;
    card.append(h,t);
    if(p.tags){const g=document.createElement('span');g.className='tag';g.textContent=p.tags;card.append(g)}
    if(p.link){const a=document.createElement('a');a.className='tag';a.href=p.link;a.textContent=(p.label||'Open')+' →';
      a.style.display='block';card.append(a)}
    list.append(card);
  });
})();

/* scroll progress, reveal, nav highlight */
const bar=document.getElementById('bar');
addEventListener('scroll',()=>{bar.style.width=(scrollY/(document.body.scrollHeight-innerHeight)*100)+'%'},{passive:true});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));
const links=[...document.querySelectorAll('nav ul a')];
const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle('on',a.hash==='#'+e.target.id))}),{rootMargin:'-45% 0px -50% 0px'});
links.forEach(a=>{const s=document.querySelector(a.hash);s&&so.observe(s)});

/* card spotlight */
document.querySelectorAll('.card').forEach(c=>c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();c.style.setProperty('--mx',e.clientX-r.left+'px');c.style.setProperty('--my',e.clientY-r.top+'px')}));

/* count-up stats */
const yrs=Math.floor((Date.now()-new Date('2021-08-01'))/31557600000);
const co=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;co.unobserve(e.target);
  const end=e.target.dataset.count==='yrs'?yrs:+e.target.dataset.count,t0=performance.now();
  const f=n=>{const p=Math.min((n-t0)/1200,1);e.target.textContent=Math.round(end*(1-Math.pow(1-p,3)))+(end>=15?'':'');if(p<1&&!reduce)requestAnimationFrame(f)};
  reduce?e.target.textContent=end:requestAnimationFrame(f)}),{threshold:.6});
document.querySelectorAll('[data-count]').forEach(el=>co.observe(el));

/* rotating word */
const words=['satellites','flash controllers','cars','chip designers','the final frontier'],rot=document.getElementById('rot');
let wi=0,ci=words[0].length,del=true;
function type(){
  const w=words[wi];
  if(del){ci--;if(ci<=0){del=false;wi=(wi+1)%words.length}}else{ci++;if(ci>=words[wi].length)del=true}
  rot.textContent=words[wi].slice(0,ci);
  setTimeout(type,del&&ci===words[wi].length?1700:del?35:70)
}
if(!reduce)setTimeout(type,1800);

/* starfield */
const sky=document.getElementById('sky'),sx=sky.getContext('2d');let stars=[];
function sizeSky(){sky.width=innerWidth;sky.height=innerHeight;stars=Array.from({length:Math.round(innerWidth*innerHeight/7000)},()=>({x:Math.random()*sky.width,y:Math.random()*sky.height,r:Math.random()*1.3+.2,d:Math.random()*.5+.1,p:Math.random()*6}))}
function drawSky(t){
  sx.clearRect(0,0,sky.width,sky.height);sx.fillStyle='#fff';
  for(const s of stars){const y=((s.y-scrollY*s.d)%sky.height+sky.height)%sky.height;sx.globalAlpha=.35+.45*Math.sin(t/900+s.p)**2;sx.beginPath();sx.arc(s.x,y,s.r,0,7);sx.fill()}
}

/* orbit */
const cv=document.getElementById('orbit'),ctx=cv.getContext('2d');let W,H;
function sizeOrbit(){const r=cv.getBoundingClientRect(),d=devicePixelRatio||1;W=cv.width=r.width*d;H=cv.height=r.height*d}
function drawOrbit(t){
  const cx=W/2,cy=H*.46,R=Math.min(W,H)*.14,u=W/500;
  ctx.clearRect(0,0,W,H);
  [2.1,3.0].forEach((k,i)=>{ctx.beginPath();ctx.ellipse(cx,cy,R*k,R*k*(i?.45:.38),i?-.5:.35,0,7);ctx.strokeStyle=css('--line');ctx.lineWidth=2*u;ctx.stroke()});
  const g=ctx.createRadialGradient(cx-R*.3,cy-R*.3,R*.1,cx,cy,R);g.addColorStop(0,css('--accent2'));g.addColorStop(1,css('--accent'));
  ctx.beginPath();ctx.arc(cx,cy,R,0,7);ctx.fillStyle=g;ctx.fill();
  const sat=(k,ry,rot,sp,col)=>{const a=t*sp,x=Math.cos(a)*R*k,y=Math.sin(a)*R*k*ry,px=cx+x*Math.cos(rot)-y*Math.sin(rot),py=cy+x*Math.sin(rot)+y*Math.cos(rot);
    ctx.fillStyle=col;ctx.beginPath();ctx.arc(px,py,7*u,0,7);ctx.fill();ctx.fillRect(px-16*u,py-2*u,9*u,4*u);ctx.fillRect(px+7*u,py-2*u,9*u,4*u)};
  sat(2.1,.38,.35,1,css('--accent2'));sat(3.0,.45,-.5,.6,css('--ink'));
}
function resize(){sizeSky();sizeOrbit();drawSky(0);drawOrbit(0)}
function loop(ms){drawSky(ms);drawOrbit(ms/1000);requestAnimationFrame(loop)}
resize();addEventListener('resize',resize);
reduce?(addEventListener('scroll',()=>drawSky(0),{passive:true})):requestAnimationFrame(loop);
