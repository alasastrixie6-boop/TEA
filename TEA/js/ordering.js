function validateCheckout(){
  const name=document.getElementById('custName').value.trim();
  const phone=document.getElementById('custPhone').value.trim();
  const email=document.getElementById('custEmail').value.trim();
  const notes=document.getElementById('custNotes').value.trim();
  const err=document.getElementById('formError');
  err.textContent='';
  if(!name){ err.textContent='Name is required.'; return null; }
  if(!/^[0-9+\-\s]{7,15}$/.test(phone)){ err.textContent='Enter a valid contact number.'; return null; }
  if(email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ err.textContent='Invalid email format.'; return null; }
  const cart=TH.loadCart();
  if(!cart.length){ err.textContent='Cart is empty.'; return null; }
  return { name, phone, email, notes, cart };
}
function placeOrder(){
  const data=validateCheckout();
  if(!data) return;
  const orders=TH.loadOrders();
  const seq=orders.length+1;
  const id='ORD-'+Date.now();
  const qno=orders.length+1;
  const order={ id, seq, queueNo:qno, name:data.name, phone:data.phone, email:data.email, notes:data.notes, items:data.cart, status:'Waiting', created:Date.now(), total:data.cart.reduce((s,c)=>s+c.price*c.qty,0) };
  orders.push(order); TH.saveOrders(orders);
  TH.saveCart([]);
  document.getElementById('receipt').innerHTML = `<h3>Order Confirmed!</h3><p>Order ID: ${id}</p><p>Queue No: ${qno}</p><p>Total: ${TH.money(order.total)}</p><p>Status: Waiting</p><a class="btn" href="queue.html">Track My Order</a>`;
  document.getElementById('receipt').classList.remove('hidden');
  TH.toast('Order placed');
  renderCart?.();
}
document.addEventListener('DOMContentLoaded',()=>{
  const btn=document.getElementById('checkoutBtn');
  if(btn) btn.addEventListener('click', placeOrder);
});
window.placeOrder=placeOrder;
