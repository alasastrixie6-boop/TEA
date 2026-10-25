// Shared helpers for Tea Heaven Order
function toggleNav() {
  document.querySelector('.nav-links')?.classList.toggle('open');
}
document.addEventListener('DOMContentLoaded', () => {
  const t = document.querySelector('.nav-toggle');
  if (t) t.addEventListener('click', toggleNav);
  // mark active nav link
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });
});
function money(n){ return 'PHP ' + Number(n).toFixed(2); }
function loadCart(){ try { return JSON.parse(localStorage.getItem('th_cart')||'[]'); } catch(e){ return []; } }
function saveCart(c){ localStorage.setItem('th_cart', JSON.stringify(c)); }
function loadOrders(){ try { return JSON.parse(localStorage.getItem('th_orders')||'[]'); } catch(e){ return []; } }
function saveOrders(o){ localStorage.setItem('th_orders', JSON.stringify(o)); }
function toast(msg){
  let el = document.getElementById('toast');
  if(!el){ el=document.createElement('div'); el.id='toast'; el.style.cssText='position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#38261C;color:#fff;padding:10px 18px;border-radius:8px;z-index:9999;'; document.body.appendChild(el);}
  el.textContent=msg; el.style.display='block';
  clearTimeout(el._t); el._t=setTimeout(()=>el.style.display='none',2500);
}
window.TH = { money, loadCart, saveCart, loadOrders, saveOrders, toast };
