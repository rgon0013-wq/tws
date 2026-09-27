const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const pages=$$('.page'), nav=$$('.nav button');
function go(page){pages.forEach(x=>x.classList.toggle('active',x.dataset.page===page));nav.forEach(x=>x.classList.toggle('active',x.dataset.goto===page));history.replaceState(null,'','#'+page);scrollTo({top:0,behavior:'smooth'});}
document.addEventListener('click',e=>{const b=e.target.closest('[data-goto]');if(b){e.preventDefault();go(b.dataset.goto)}}); go(location.hash.slice(1)||'home');

const events=[
 {day:'28',month:'SEP',title:'TWIMI : 42 Forest · Online Sale',detail:'11:00 KST · 10:00 China · 12:00 Melbourne',type:'MERCH',source:'https://shop.weverse.io/zh-cn/shop/USD/artists/165/notices/14392'},
 {day:'10',month:'OCT',title:"2026 TWS TOUR · Singapore",detail:'Singapore',type:'LIVE',source:'https://weverse.io/tws/notice/35444'},
 {day:'24',month:'OCT',title:"2026 TWS TOUR · Kaohsiung",detail:'Kaohsiung',type:'LIVE',source:'https://weverse.io/tws/notice/35444'},
 {day:'10',month:'DEC',title:'SODA SODA · Winter Special Event',detail:'Tokyo area · details for eligible participants',type:'EVENT',source:'https://tws-official.jp/news/318413c6fbec'}
];
function card(x){return `<article class="event" data-event="${events.indexOf(x)}"><div class="date">${x.day}<small>${x.month}</small></div><div><h3>${x.title}</h3><p>${x.detail}</p></div><span class="badge">${x.type}</span></article>`}
$('#homeSchedule').innerHTML=events.slice(0,3).map(card).join('');
const types=['ALL',...new Set(events.map(x=>x.type))]; $('#filters').innerHTML=types.map((x,i)=>`<button class="filter ${i?'':'active'}" data-filter="${x}">${x}</button>`).join('');
function render(type='ALL'){$('#schedule').innerHTML=events.filter(x=>type==='ALL'||x.type===type).map(card).join('')} render();
$('#filters').onclick=e=>{const b=e.target.closest('[data-filter]');if(!b)return;$$('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');render(b.dataset.filter)}

const members=['SHINYU','DOHOON','YOUNGJAE','HANJIN','JIHOON','KYUNGMIN'];
$('#members').innerHTML=members.map(n=>`<article class="member" data-member="${n}"><div class="photo"><div class="fallback">${n}<br><small>ADD LOCAL JPG</small></div><img src="./assets/members/${n.toLowerCase()}.jpg" alt="${n}" onload="this.previousElementSibling.style.display='none'" onerror="this.remove()"></div><div class="memberName">${n}</div></article>`).join('');

const modal=$('#modal'), mc=$('#modalContent'); function show(html){mc.innerHTML=html;modal.classList.add('show')} $('#close').onclick=()=>modal.classList.remove('show'); modal.onclick=e=>{if(e.target===modal)modal.classList.remove('show')};
document.addEventListener('click',e=>{const ev=e.target.closest('[data-event]');if(ev){const x=events[+ev.dataset.event];show(`<div class="eyebrow">${x.type}</div><h2>${x.title}</h2><p>${x.detail}</p><div class="actions"><a class="btn" href="${x.source}" target="_blank" rel="noopener">OFFICIAL SOURCE ↗</a></div>`)} const m=e.target.closest('[data-member]');if(m){let n=m.dataset.member,k=n.toLowerCase();show(`<div class="eyebrow">TWS MEMBER</div><h2>${n}</h2><div class="sheetPhoto"><div class="fallback">${n}<br><small>LOCAL PHOTO</small></div><img src="./assets/members/${k}.jpg" alt="${n}" onload="this.previousElementSibling.style.display='none'" onerror="this.remove()"></div>`)}});

const target=new Date('2026-09-28T11:00:00+09:00'); function tick(){let d=target-new Date(),e=$('#countdown');if(d<=0){e.textContent='DROP IS LIVE';return}let h=Math.floor(d/36e5),m=Math.floor(d%36e5/6e4),s=Math.floor(d%6e4/1000);e.textContent=`${h}H ${String(m).padStart(2,'0')}M ${String(s).padStart(2,'0')}S`} tick();setInterval(tick,1000);
