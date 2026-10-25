const DRINKS = [
  { id:'d1', name:'Classic Milk Tea', cat:'Milk Tea', base:120, img:'https://images.unsplash.com/photo-1558857563-b371033873b8?w=400', avail:true },
  { id:'d2', name:'Matcha Latte', cat:'Matcha', base:150, img:'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400', avail:true },
  { id:'d3', name:'Brown Sugar Boba', cat:'Specialty', base:160, img:'https://images.unsplash.com/photo-1525385133512-2f34a6c3b738?w=400', avail:true },
  { id:'d4', name:'Taro Milk Tea', cat:'Milk Tea', base:135, img:'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400', avail:true },
  { id:'d5', name:'Wintermelon Tea', cat:'Fruit Tea', base:110, img:'https://images.unsplash.com/photo-1499638673689-79a0b5115d87?w=400', avail:true },
  { id:'d6', name:'Strawberry Tea', cat:'Fruit Tea', base:125, img:'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400', avail:false },
];
const SIZES = { Small:0, Medium:20, Large:40 };
const SUGARS = ['0%','25%','50%','75%','100%'];
const ICES = ['No Ice','Less Ice','Normal Ice','Extra Ice'];
const ADDONS = { 'Pearls':25, 'Pudding':30, 'Cheese Foam':45, 'Crystal Boba':20 };

let currentFilter='All', currentSearch='';

function renderMenu(){
  const grid = document.getElementById('menuGrid');
  if(!grid) return;
  grid.innerHTML='';
  DRINKS.filter(d=> (currentFilter==='All'||d.cat===currentFilter) && d.name.toLowerCase().includes(currentSearch.toLowerCase()))
    .forEach(d=>{
      const card=document.createElement('div');
      card.className='card';
      card.innerHTML = `
        <img src="${d.img}" alt="${d.name}" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22><rect width=%22400%22 height=%22300%22 fill=%22%23EFE2D0%22/><text x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%236F4E37%22 font-size=%2220%22>${d.name}</text></svg>'">
        <h3>${d.name}</h3>
        <span class="badge ${d.avail?'ok':'soldout'}">${d.avail?'Available':'Sold Out'}</span>
        <p class="price">${TH.money(d.base)}</p>
        <div class="form-group"><label>Size</label><select class="size">${Object.keys(SIZES).map(s=>`<option>${s}</option>`).join('')}</select></div>
        <div class="form-group"><label>Sugar</label><select class="sugar">${SUGARS.map(s=>`<option>${s}</option>`).join('')}</select></div>
        <div class="form-group"><label>Ice</label><select class="ice">${ICES.map(i=>`<option>${i}</option>`).join('')}</select></div>
        <div class="form-group"><label>Add-ons</label><select class="addon"><option value="">None</option>${Object.keys(ADDONS).map(a=>`<option value="${a}">${a} (+${ADDONS[a]})</option>`).join('')}</select></div>
        <p>Price: <strong class="liveprice">${TH.money(d.base)}</strong></p>
        <button class="btn addBtn" ${d.avail?'':'disabled'}>Add to Cart</button>
      `;
      const sizeSel=card.querySelector('.size'), sugarSel=card.querySelector('.sugar'), iceSel=card.querySelector('.ice'), addonSel=card.querySelector('.addon'), live=card.querySelector('.liveprice');
      function updatePrice(){ let p=d.base+SIZES[sizeSel.value]; const a=addonSel.value; if(a) p+=ADDONS[a]; live.textContent=TH.money(p); }
      sizeSel.addEventListener('change',updatePrice); addonSel.addEventListener('change',updatePrice);
      card.querySelector('.addBtn').addEventListener('click',()=>{
        if(!d.avail){ TH.toast('Sold out'); return; }
        let p=d.base+SIZES[sizeSel.value]; const a=addonSel.value; if(a) p+=ADDONS[a];
        const cart=TH.loadCart();
        cart.push({ id: Date.now()+Math.random(), drinkId:d.id, name:d.name, size:sizeSel.value, sugar:sugarSel.value, ice:iceSel.value, addon:a||'None', price:p, qty:1 });
        TH.saveCart(cart); TH.toast('Added to cart'); renderCart();
      });
      grid.appendChild(card);
    });
}
function renderCart(){
  const box=document.getElementById('cartBox'); if(!box) return;
  const cart=TH.loadCart();
  if(!cart.length){ box.innerHTML='<p>Your cart is empty.</p>'; document.getElementById('cartTotal').textContent=TH.money(0); return;}
  box.innerHTML='';
  let total=0;
  cart.forEach((c,i)=>{
    total+=c.price*c.qty;
    const row=document.createElement('div'); row.className='cart-item';
    row.innerHTML=`<span>${c.name} (${c.size}, ${c.sugar}, ${c.ice}, ${c.addon})</span>
      <span>${TH.money(c.price)} x <input type="number" min="1" value="${c.qty}" style="width:50px" class="q"> 
      <button class="qty-btn rem">x</button></span>`;
    row.querySelector('.q').addEventListener('change',e=>{ c.qty=Math.max(1,parseInt(e.target.value)||1); cart[i]=c; TH.saveCart(cart); renderCart(); });
    row.querySelector('.rem').addEventListener('click',()=>{ cart.splice(i,1); TH.saveCart(cart); renderCart(); });
    box.appendChild(row);
  });
  document.getElementById('cartTotal').textContent=TH.money(total);
}
document.addEventListener('DOMContentLoaded',()=>{
  renderMenu(); renderCart();
  document.getElementById('searchInput')?.addEventListener('input',e=>{ currentSearch=e.target.value; renderMenu(); });
  document.getElementById('catFilter')?.addEventListener('change',e=>{ currentFilter=e.target.value; renderMenu(); });
  document.querySelectorAll('.catBtn').forEach(b=>b.addEventListener('click',()=>{ currentFilter=b.dataset.cat; document.getElementById('catFilter').value=currentFilter; renderMenu(); }));
});
window.TH_DRINKS=DRINKS;
