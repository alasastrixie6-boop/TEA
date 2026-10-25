function renderQueue(){
  const board=document.getElementById('queueBoard'); if(!board) return;
  const orders=TH.loadOrders().sort((a,b)=>a.seq-b.seq);
  board.innerHTML='';
  orders.forEach(o=>{
    const ahead = orders.filter(x=>x.status==='Waiting' && x.seq<o.seq).length;
    const wait = ahead*5;
    const div=document.createElement('div'); div.className='card';
    div.innerHTML=`<h3>Queue #${o.queueNo}</h3><p>${o.name}</p><p>Status: <strong>${o.status}</strong></p><p>Orders ahead: ${ahead}</p><p>Est. wait: ${wait} min</p>`;
    board.appendChild(div);
  });
}
function lookupOrder(){
  const q=document.getElementById('lookupInput').value.trim();
  const orders=TH.loadOrders();
  const o=orders.find(x=>x.id===q || String(x.queueNo)===q);
  const out=document.getElementById('lookupResult');
  if(!o){ out.innerHTML='<p class="error">Order not found.</p>'; return; }
  const ahead=orders.filter(x=>x.status==='Waiting' && x.seq<o.seq).length;
  out.innerHTML=`<div class="card"><h3>Order ${o.id}</h3><p>Queue #${o.queueNo}</p><p>Status: ${o.status}</p><p>Orders ahead: ${ahead}</p><p>Est. wait: ${ahead*5} min</p><p>Total: ${TH.money(o.total)}</p></div>`;
}
function processNext(){
  const orders=TH.loadOrders().sort((a,b)=>a.seq-b.seq);
  const next=orders.find(o=>o.status==='Waiting');
  if(next){ next.status='Preparing'; TH.saveOrders(orders); TH.toast('Processing #'+next.queueNo); renderQueue(); }
}
function advanceStatus(id){
  const orders=TH.loadOrders();
  const o=orders.find(x=>x.id===id); if(!o) return;
  const flow=['Waiting','Preparing','Ready','Completed'];
  const i=flow.indexOf(o.status); if(i<flow.length-1) o.status=flow[i+1];
  TH.saveOrders(orders); renderQueue();
}
document.addEventListener('DOMContentLoaded',()=>{
  renderQueue();
  document.getElementById('lookupBtn')?.addEventListener('click',lookupOrder);
  document.getElementById('processBtn')?.addEventListener('click',processNext);
});
window.advanceStatus=advanceStatus;
