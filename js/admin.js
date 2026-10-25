document.addEventListener('DOMContentLoaded',()=>{
  const ordersBox=document.getElementById('adminOrders');
  if(ordersBox){
    const orders=TH.loadOrders().sort((a,b)=>a.seq-b.seq);
    ordersBox.innerHTML = orders.length ? orders.map(o=>`<div class="card"><p>#${o.queueNo} ${o.name} - ${o.status}</p><button class="btn" onclick="advanceStatus('${o.id}')">Advance</button></div>`).join('') : '<p>No orders.</p>';
  }
  const invBox=document.getElementById('adminInv');
  if(invBox){ invBox.innerHTML=document.getElementById('invTable')?.innerHTML||''; }
});
