const $=s=>document.querySelector(s), cur=CONFIG.currency;
const fmt=n=>cur+Number(n).toLocaleString('en-IN');
let cat='All', q='', sort='default', sel=0, cart=[];
try{cart=JSON.parse(localStorage.getItem('enq')||'[]')}catch(e){}
const save=()=>{try{localStorage.setItem('enq',JSON.stringify(cart))}catch(e){}$('#cnt').textContent=cart.reduce((a,c)=>a+c.qty,0)};
const disc=v=>v.mrp>v.price?Math.round((1-v.price/v.mrp)*100):0;
const bottle=c=>`<svg viewBox="0 0 100 100" width="62%" aria-hidden="true"><rect x="40" y="8" width="20" height="14" rx="3" fill="#c9973a"/><rect x="44" y="22" width="12" height="8" fill="#ddd"/><rect x="22" y="30" width="56" height="62" rx="12" fill="${c}"/><rect x="30" y="38" width="10" height="46" rx="5" fill="#fff" opacity=".25"/><rect x="38" y="56" width="34" height="18" rx="2" fill="#fff" opacity=".9"/></svg>`;
const pic=p=>p.image?`<img src="images/${p.image}" alt="${p.name}" loading="lazy" onerror="this.parentNode.innerHTML=bottle('${p.color}')">`:bottle(p.color);
$('#brand').innerHTML=`${CONFIG.brand}<small>${CONFIG.tagline}</small>`;
document.title=CONFIG.brand+' – Catalogue';
$('#hero').innerHTML=`<h1>Fragrances that sell themselves.</h1><p>Browse our range, check live prices and send your enquiry on WhatsApp in one tap.</p><div class="badges"><span>Authorised Givaudan dealer</span><span>Samples available</span><span>Bulk rates</span></div>`;
$('#foot').innerHTML=`${CONFIG.brand} · ${CONFIG.city} · ${CONFIG.phone}<br>${CONFIG.priceNote}`;
$('#fab').href=`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent('Hello, I would like to know more about your fragrances.')}`;
function cats(){const l=['All',...new Set(PRODUCTS.map(p=>p.category))];$('#cats').innerHTML=l.map(c=>`<button class="chip ${c==cat?'on':''}" data-c="${c}">${c}</button>`).join('')}
function list(){
  let r=PRODUCTS.filter(p=>(cat=='All'||p.category==cat)&&(p.name+p.code+p.category+Object.values(p.notes).join(' ')).toLowerCase().includes(q));
  const lo=p=>Math.min(...p.variants.map(v=>v.price));
  if(sort=='lo')r.sort((a,b)=>lo(a)-lo(b));if(sort=='hi')r.sort((a,b)=>lo(b)-lo(a));
  $('#count').textContent=r.length+' products';
  $('#grid').innerHTML=r.length?r.map(p=>{const v=p.variants[0],d=disc(v);return `<div class="card" data-id="${p.id}" tabindex="0">${p.tag?`<span class="tag">${p.tag}</span>`:''}<div class="img">${pic(p)}</div><div class="info"><span class="cat">${p.category}</span><h3>${p.name}</h3><span class="code">${p.code}</span><div class="price"><span class="from">from</span><b>${fmt(v.price)}</b>${d?`<s>${fmt(v.mrp)}</s><em>${d}% off</em>`:''}</div></div><button class="add" data-add="${p.id}">Add to enquiry</button></div>`}).join(''):'<div class="empty">No products found. Try a different search.</div>';
}
function open(id){const p=PRODUCTS.find(x=>x.id==id);sel=0;$('#m').classList.add('open');draw(p)}
function draw(p){const v=p.variants[sel],d=disc(v);
 $('#sheet').innerHTML=`<button class="x" aria-label="Close" data-x>×</button><div class="pd"><div class="img">${pic(p)}</div><div class="body"><h2>${p.name}</h2><div class="code">${p.code} · ${p.category}</div><div class="big">${fmt(v.price)}${d?`<s>${fmt(v.mrp)}</s><em>${d}% off</em>`:''}</div><div class="small" style="margin:0 0 6px">Pack size</div><div class="sizes">${p.variants.map((x,i)=>`<button class="sz ${i==sel?'on':''}" data-s="${i}">${x.size}</button>`).join('')}</div><p>${p.desc}</p><div class="notes"><div><b>Top</b>${p.notes.top}</div><div><b>Heart</b>${p.notes.heart}</div><div><b>Base</b>${p.notes.base}</div>${p.dosage?`<div><b>Dosage</b>${p.dosage}</div>`:''}</div><div class="row"><button class="b1" data-addv="${p.id}">Add to enquiry</button><button class="b2" data-wa="${p.id}">WhatsApp</button></div><div class="small">${CONFIG.priceNote}</div></div></div>`}
function add(id,vi=0){const p=PRODUCTS.find(x=>x.id==id),k=cart.find(c=>c.id==id&&c.vi==vi);k?k.qty++:cart.push({id:+id,vi,qty:1});save();toast('Added to enquiry')}
function toast(t){const e=$('#toast');e.textContent=t;e.style.opacity=1;setTimeout(()=>e.style.opacity=0,1200)}
function msg(items){return `Hello ${CONFIG.brand}, I'd like to enquire about:\n\n`+items.map((c,i)=>{const p=PRODUCTS.find(x=>x.id==c.id),v=p.variants[c.vi];return `${i+1}. ${p.name} (${p.code}) – ${v.size} × ${c.qty} @ ${fmt(v.price)}`}).join('\n')+'\n\nPlease share availability and best rates.'}
const wa=t=>window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(t)}`,'_blank');
function cartView(){$('#m').classList.add('open');
 $('#sheet').innerHTML=`<button class="x" data-x aria-label="Close">×</button><div class="body"><h2>My enquiry</h2>${cart.length?cart.map((c,i)=>{const p=PRODUCTS.find(x=>x.id==c.id),v=p.variants[c.vi];return `<div class="li"><div><b>${p.name}</b><br>${v.size} · ${fmt(v.price)}</div><div class="qty"><button data-q="${i}" data-d="-1">−</button>${c.qty}<button data-q="${i}" data-d="1">+</button></div></div>`}).join('')+`<div class="row"><button class="b2" data-send>Send on WhatsApp</button></div>`:'<div class="empty">Your enquiry list is empty.</div>'}</div>`}
document.addEventListener('click',e=>{const t=e.target,g=a=>t.closest('['+a+']');
 if(g('data-x')||t.id=='m')return $('#m').classList.remove('open');
 let el;
 if(el=g('data-c')){cat=el.dataset.c;cats();list()}
 else if(el=g('data-add')){e.stopPropagation();add(el.dataset.add)}
 else if(el=g('data-addv')){add(el.dataset.addv,sel)}
 else if(el=g('data-s')){sel=+el.dataset.s;const id=PRODUCTS.find(p=>$('#sheet h2').textContent==p.name).id;draw(PRODUCTS.find(p=>p.id==id))}
 else if(el=g('data-wa')){const p=PRODUCTS.find(x=>x.id==el.dataset.wa);wa(msg([{id:p.id,vi:sel,qty:1}]))}
 else if(el=g('data-q')){const c=cart[el.dataset.q];c.qty+=+el.dataset.d;if(c.qty<1)cart.splice(el.dataset.q,1);save();cartView()}
 else if(g('data-send'))wa(msg(cart))
 else if(t.closest('#enq'))cartView()
 else if(el=g('data-id'))open(el.dataset.id)});
document.addEventListener('keydown',e=>{if(e.key=='Escape')$('#m').classList.remove('open');if(e.key=='Enter'&&e.target.dataset.id)open(e.target.dataset.id)});
$('#q').oninput=e=>{q=e.target.value.toLowerCase();list()};
$('#sort').onchange=e=>{sort=e.target.value;list()};
cats();list();save();
