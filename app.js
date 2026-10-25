const $=s=>document.querySelector(s), PER=10;
const DEF_CO={name:"TRIVENKEM AGENCIES",tagline:"Authorised Dealer of Givaudan",phone:"+91 99999 99999",email:"",address:"Your City, India",note:"Prices are ex-works and subject to GST. Rates may change without notice."};
const SAMPLE=[
 {id:1,name:"Oud Royale",code:"GV-1001",cat:"Woody",pack:"100 g",price:4500,mrp:5200,desc:"Rich smoky oud with warm amber depth. Ideal for attars and premium perfumes.",img:""},
 {id:2,name:"Ocean Breeze",code:"GV-1002",cat:"Fresh",pack:"1 kg",price:16500,mrp:20000,desc:"Clean aquatic freshness with a crisp citrus lift. For sprays, soaps and detergents.",img:""},
 {id:3,name:"Velvet Rose",code:"GV-1003",cat:"Floral",pack:"100 g",price:3200,mrp:3800,desc:"Lush powdery rose with soft sweetness. A timeless floral for fine fragrance.",img:""}];
const load=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))||d}catch(e){return d}};
let P=load('tk_products',SAMPLE), CO=Object.assign({},DEF_CO,load('tk_co',{})), sel=new Set(), q='', curImg='';
const save=()=>{try{localStorage.setItem('tk_products',JSON.stringify(P));localStorage.setItem('tk_co',JSON.stringify(CO))}catch(e){toast('Storage full – remove some photos')}};
const fmt=n=>Number(n).toLocaleString('en-IN');
const esc=s=>String(s||'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const toast=t=>{const e=$('#toast');e.textContent=t;e.style.opacity=1;setTimeout(()=>e.style.opacity=0,1600)};
const ph=n=>`<span style="font:700 34px 'Playfair Display';color:#c9973a">${esc(n[0]||'?')}</span>`;
function render(){
  const r=P.filter(p=>(p.name+p.code+p.cat).toLowerCase().includes(q));
  $('#info').textContent=P.length+' products';
  $('#grid').innerHTML=r.length?r.map(p=>{const d=p.mrp>p.price?Math.round((1-p.price/p.mrp)*100):0;
   return `<div class="card ${sel.has(p.id)?'on':''}"><input class="chk" type="checkbox" data-s="${p.id}" ${sel.has(p.id)?'checked':''} aria-label="Select ${esc(p.name)}"><div class="img" data-e="${p.id}">${p.img?`<img src="${p.img}" alt="">`:ph(p.name)}</div><div class="info"><small>${esc(p.cat)} · ${esc(p.code)}</small><h3>${esc(p.name)}</h3><small>${esc(p.pack)}</small><div class="price"><b>₹${fmt(p.price)}</b>${d?`<s>₹${fmt(p.mrp)}</s><em>${d}% off</em>`:''}</div></div><div class="acts"><button data-e="${p.id}">Edit</button><button data-d="${p.id}">Delete</button></div></div>`}).join(''):'<div class="empty">No products yet. Tap “+ Add product” to create your first one.</div>';
  const n=sel.size,k=Math.ceil(n/PER);
  $('#sel').textContent=n;$('#bPdf').disabled=!n;
  $('#parts').textContent=n>PER?`${k} PDFs of up to ${PER} items`:`${PER} items per PDF`;
}
function form(id){const p=P.find(x=>x.id==id)||{name:'',code:'',cat:'',pack:'',price:'',mrp:'',desc:'',img:''};curImg=p.img;
 $('#m').classList.add('open');
 $('#sheet').innerHTML=`<h2 class="serif">${id?'Edit':'Add'} product</h2>
 <div class="photo"><div class="pv" id="pv">${p.img?`<img src="${p.img}">`:'No photo'}</div><label class="b2" style="padding:9px 14px;border-radius:8px;font-size:13px;cursor:pointer">Choose photo<input type="file" id="ph" accept="image/*" hidden></label></div>
 <label class="f">Product name<input id="fn" value="${esc(p.name)}"></label>
 <div class="two"><label class="f">Product code<input id="fc" value="${esc(p.code)}"></label><label class="f">Category<input id="fk" value="${esc(p.cat)}" placeholder="Floral, Woody…"></label></div>
 <div class="two"><label class="f">Pack size<input id="fp" value="${esc(p.pack)}" placeholder="100 g / 1 kg"></label><label class="f">Price (₹)<input id="fr" type="number" inputmode="decimal" value="${p.price}"></label></div>
 <label class="f">MRP (₹) – optional, shows discount<input id="fm" type="number" inputmode="decimal" value="${p.mrp}"></label>
 <label class="f">Details (notes, uses)<textarea id="fd" rows="3">${esc(p.desc)}</textarea></label>
 <div class="row"><button class="b2" data-x>Cancel</button><button class="b1" data-save="${id||''}">Save</button></div>`;
 $('#ph').onchange=e=>{const f=e.target.files[0];if(!f)return;const im=new Image();im.onload=()=>{const s=Math.min(1,400/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=im.width*s;c.height=im.height*s;const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,c.width,c.height);x.drawImage(im,0,0,c.width,c.height);curImg=c.toDataURL('image/jpeg',.8);$('#pv').innerHTML=`<img src="${curImg}">`};im.src=URL.createObjectURL(f)};
}
function saveP(id){const name=$('#fn').value.trim(),price=+$('#fr').value;if(!name||!price)return toast('Enter name and price');
 const o={name,code:$('#fc').value.trim(),cat:$('#fk').value.trim()||'General',pack:$('#fp').value.trim(),price,mrp:+$('#fm').value||0,desc:$('#fd').value.trim(),img:curImg};
 if(id){Object.assign(P.find(x=>x.id==id),o)}else{o.id=Date.now();P.unshift(o)}save();close();render();toast('Saved')}
function company(){$('#m').classList.add('open');
 $('#sheet').innerHTML=`<h2 class="serif">Company details</h2><p style="font-size:12px;color:#6b7280;margin-bottom:12px">These appear on top and bottom of every PDF.</p>
 ${[['name','Company name'],['tagline','Tagline'],['phone','Phone / WhatsApp'],['email','Email'],['address','Address'],['note','Footer note']].map(([k,l])=>`<label class="f">${l}<input data-co="${k}" value="${esc(CO[k])}"></label>`).join('')}
 <div class="row"><button class="b2" data-x>Cancel</button><button class="b1" data-coSave>Save</button></div>`}
const close=()=>$('#m').classList.remove('open');
function parts(){const a=P.filter(p=>sel.has(p.id)),b=[];for(let i=0;i<a.length;i+=PER)b.push(a.slice(i,i+PER));return b}
function pdfSheet(){const b=parts();if(b.length==1)return makePdf(b[0],1,1);
 $('#m').classList.add('open');
 $('#sheet').innerHTML=`<h2 class="serif">Your PDFs</h2>${b.map((x,i)=>`<div class="part"><span>PDF ${i+1} · ${x.length} items</span><button data-pdf="${i}">Download</button></div>`).join('')}<div class="row"><button class="b2" data-x>Close</button></div>`}
function makePdf(items,n,tot){
 if(!window.jspdf)return toast('PDF tool not loaded – check internet');
 const doc=new jspdf.jsPDF({unit:'mm',format:'a4'}),W=210,navy=[20,33,61],gold=[201,151,58],grey=[107,114,128];
 doc.setFillColor(...navy);doc.rect(0,0,W,26,'F');
 doc.setTextColor(232,184,79);doc.setFont('times','bold');doc.setFontSize(19);doc.text(CO.name.toUpperCase(),10,12);
 doc.setTextColor(203,213,225);doc.setFont('helvetica','normal');doc.setFontSize(8.5);doc.text(CO.tagline,10,18.5);
 doc.setTextColor(255,255,255);doc.text([CO.phone,CO.email].filter(Boolean),W-10,11,{align:'right'});
 doc.setFillColor(...gold);doc.rect(0,26,W,1.2,'F');
 doc.setTextColor(...navy);doc.setFont('helvetica','bold');doc.setFontSize(10);doc.text('PRODUCT CATALOGUE & PRICE LIST',10,34);
 doc.setFont('helvetica','normal');doc.setFontSize(8);doc.setTextColor(...grey);doc.text(new Date().toLocaleDateString('en-IN')+(tot>1?`   ·   Part ${n} of ${tot}`:''),W-10,34,{align:'right'});
 const cw=92.5,ch=47,gx=5,gy=3,y0=38;
 items.forEach((p,i)=>{const x=10+(i%2)*(cw+gx),y=y0+Math.floor(i/2)*(ch+gy);
  doc.setDrawColor(220,220,220);doc.setFillColor(255,255,255);doc.roundedRect(x,y,cw,ch,2,2,'FD');
  if(p.img){try{doc.addImage(p.img,'JPEG',x+3,y+3,38,38)}catch(e){}}else{doc.setFillColor(250,246,238);doc.roundedRect(x+3,y+3,38,38,2,2,'F');doc.setTextColor(...gold);doc.setFont('times','bold');doc.setFontSize(30);doc.text((p.name[0]||'?').toUpperCase(),x+22,y+27,{align:'center'})}
  const tx=x+45,tw=cw-48;
  doc.setTextColor(...navy);doc.setFont('helvetica','bold');doc.setFontSize(10.5);
  const nm=doc.splitTextToSize(p.name,tw).slice(0,2);doc.text(nm,tx,y+7);
  let ty=y+7+nm.length*4.2;
  doc.setFont('helvetica','normal');doc.setFontSize(7.5);doc.setTextColor(...grey);
  doc.text([p.cat,p.code].filter(Boolean).join('  |  '),tx,ty);ty+=3.8;
  if(p.pack){doc.setTextColor(60,60,60);doc.text('Pack: '+p.pack,tx,ty);ty+=3.8}
  doc.setTextColor(80,80,80);doc.setFontSize(7);
  const room=Math.max(1,Math.floor((y+ch-14-ty)/3));doc.text(doc.splitTextToSize(p.desc||'',tw).slice(0,room),tx,ty+0.5);
  doc.setTextColor(...navy);doc.setFont('helvetica','bold');doc.setFontSize(13);const pr='Rs. '+fmt(p.price);doc.text(pr,tx,y+ch-4);
  if(p.mrp>p.price){const px=tx+doc.getTextWidth(pr)+2;doc.setFont('helvetica','normal');doc.setFontSize(8);doc.setTextColor(...grey);const m='Rs. '+fmt(p.mrp);doc.text(m,px,y+ch-4);const mw=doc.getTextWidth(m);doc.setDrawColor(...grey);doc.line(px,y+ch-5.2,px+mw,y+ch-5.2);doc.setTextColor(27,138,75);doc.setFont('helvetica','bold');doc.text(Math.round((1-p.price/p.mrp)*100)+'% off',px+mw+2,y+ch-4)}
 });
 doc.setDrawColor(...gold);doc.line(10,284,W-10,284);doc.setFont('helvetica','normal');doc.setFontSize(7.5);doc.setTextColor(...grey);
 doc.text(doc.splitTextToSize([CO.address,CO.note].filter(Boolean).join('  ·  '),W-20),10,289);
 doc.save(`${CO.name.replace(/\W+/g,'_')}_Catalogue${tot>1?'_Part'+n:''}.pdf`);toast('PDF downloaded')}
document.addEventListener('click',e=>{const t=e.target,g=a=>t.closest('['+a+']');let el;
 if(t.id=='m'||g('data-x'))close();
 else if(el=g('data-save'))saveP(el.dataset.save);
 else if(g('data-cosave')){document.querySelectorAll('[data-co]').forEach(i=>CO[i.dataset.co]=i.value.trim());save();close();toast('Saved')}
 else if(el=g('data-pdf'))makePdf(parts()[+el.dataset.pdf],+el.dataset.pdf+1,parts().length)
 else if(el=g('data-e'))form(el.dataset.e)
 else if(el=g('data-d')){if(confirm('Delete this product?')){P=P.filter(p=>p.id!=el.dataset.d);sel.delete(+el.dataset.d);save();render()}}
 else if(el=g('data-s')){const id=+el.dataset.s;sel.has(id)?sel.delete(id):sel.add(id);render()}});
$('#bNew').onclick=()=>form();$('#bSet').onclick=company;$('#bPdf').onclick=pdfSheet;
$('#bAll').onclick=()=>{P.forEach(p=>sel.add(p.id));render()};$('#bNone').onclick=()=>{sel.clear();render()};
$('#q').oninput=e=>{q=e.target.value.toLowerCase();render()};
$('#bExp').onclick=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify({P,CO})],{type:'application/json'}));a.download='trivenkem-backup.json';a.click()};
$('#bImp').onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const d=JSON.parse(r.result);P=d.P||P;CO=Object.assign(CO,d.CO||{});save();render();toast('Restored')}catch(x){toast('Invalid backup file')}};r.readAsText(f)};
render();
