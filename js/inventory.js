const BATCHES = [
  { batchId:'B1', ingredient:'Milk', qty:10, remaining:8, unit:'L', received:'2026-10-01', expiry:'2026-10-30' },
  { batchId:'B2', ingredient:'Milk', qty:5, remaining:5, unit:'L', received:'2026-10-20', expiry:'2026-11-15' },
  { batchId:'B3', ingredient:'Tea Leaves', qty:2, remaining:0.3, unit:'kg', received:'2026-09-15', expiry:'2027-01-01' },
  { batchId:'B4', ingredient:'Pearls', qty:3, remaining:0.2, unit:'kg', received:'2026-10-05', expiry:'2026-10-25' },
];
function isExpired(b){ return new Date(b.expiry) < new Date(); }
function fifoSelect(ingredient, amount){
  const eligible = BATCHES.filter(b=>b.ingredient===ingredient && b.remaining>0 && !isExpired(b))
    .sort((a,b)=> new Date(a.received)-new Date(b.received) || a.batchId.localeCompare(b.batchId));
  let need=amount; const used=[];
  for(const b of eligible){ if(need<=0) break; const take=Math.min(b.remaining,need); b.remaining-=take; need-=take; used.push({batchId:b.batchId,take}); }
  return { used, fulfilled: need<=0 };
}
function renderInventory(){
  const box=document.getElementById('invTable'); if(!box) return;
  let html='<div class="table-wrap"><table><tr><th>Batch</th><th>Ingredient</th><th>Remaining</th><th>Unit</th><th>Received</th><th>Expiry</th><th>Status</th></tr>';
  BATCHES.forEach(b=>{
    html+=`<tr><td>${b.batchId}</td><td>${b.ingredient}</td><td>${b.remaining}</td><td>${b.unit}</td><td>${b.received}</td><td>${b.expiry}</td><td>${isExpired(b)?'<span class="badge soldout">Expired</span>':'<span class="badge ok">OK</span>'}</td></tr>`;
  });
  html+='</table></div>';
  const alerts=[];
  BATCHES.forEach(b=>{
    if(isExpired(b)) alerts.push(`Expired: ${b.batchId} ${b.ingredient}`);
    else if(b.remaining < b.qty*0.2) alerts.push(`Low stock: ${b.batchId} ${b.ingredient} (${b.remaining} ${b.unit})`);
    const days=(new Date(b.expiry)-new Date())/86400000;
    if(!isExpired(b) && days<7) alerts.push(`Expiring soon: ${b.batchId} ${b.ingredient}`);
  });
  html += alerts.length ? '<div class="notice warn">'+alerts.join('<br>')+'</div>' : '<div class="notice info">No alerts.</div>';
  box.innerHTML=html;
}
document.addEventListener('DOMContentLoaded',()=>{ renderInventory(); });
window.TH_INV={ BATCHES, fifoSelect, isExpired };
