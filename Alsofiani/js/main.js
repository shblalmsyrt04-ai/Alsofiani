
/* main.js — تفاعل، تحقق النماذج، ثيم، معرض، تمرير */
function toggleMenu(){
  const links = document.getElementById('nav-links');
  if(!links) return;
  const isShown = links.style.display === 'flex';
  links.style.display = isShown ? 'none' : 'flex';
}

function scrollToTop(){ window.scrollTo({top:0, behavior:'smooth'}); }

// Theme
function loadTheme(){
  const saved = localStorage.getItem('theme') || 'light';
  if(saved === 'dark'){ document.documentElement.classList.add('dark'); }
}
function toggleTheme(){
  document.documentElement.classList.toggle('dark');
  const isDark = document.documentElement.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Like button
function toggleLike(){
  const btn = document.getElementById('like-btn');
  const msg = document.getElementById('like-msg');
  if(!btn || !msg) return;
  const pressed = btn.getAttribute('aria-pressed') === 'true';
  btn.setAttribute('aria-pressed', String(!pressed));
  msg.classList.toggle('hidden', pressed);
}

// Quotes
const quotes = [
  'القراءة حياةٌ أخرى نعيشها.',
  'من يقرأ كثيرًا لا يشيخ سريعًا.',
  'العلم نور، والجهل ظلام.',
  'كتابٌ جيد صديقٌ وفيّ.'
];
function shuffleQuote(){
  const q = document.getElementById('quote-box');
  if(!q) return;
  const next = quotes[Math.floor(Math.random()*quotes.length)];
  q.textContent = next;
}

// Filter books by search/category
function filterBooks(){
  const q = (document.getElementById('search')?.value || '').toLowerCase();
  const cat = document.getElementById('category')?.value || '';
  const rows = document.querySelectorAll('#books-table tbody tr');
  rows.forEach(tr => {
    const title = tr.children[0].textContent.toLowerCase();
    const category = tr.children[1].textContent;
    const ok = (!q || title.includes(q)) && (!cat || category === cat);
    tr.style.display = ok ? '' : 'none';
  });
}

// Contact form (demo)
function submitContact(e){
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const name = document.getElementById('name').value.trim();
  const msg = document.getElementById('msg').value.trim();
  const status = document.getElementById('contact-status');

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if(!emailOk || name.length < 2 || msg.length < 5){
    status.textContent = 'رجاءً تأكد من صحة البيانات.';
    status.classList.remove('hidden');
    return false;
  }
  status.textContent = 'تم الإرسال ✅';
  status.classList.remove('hidden');
  e.target.reset();
  return false;
}

// Auth (demo only)
function handleLogin(e){
  e.preventDefault();
  const u = document.getElementById('username').value.trim();
  const p = document.getElementById('password').value.trim();
  const err = document.getElementById('login-error');
  if(u === 'user' && p === '1234'){
    localStorage.setItem('auth','1');
    window.location.href = 'dashboard.html';
  }else{
    err.classList.remove('hidden');
  }
  return false;
}

function handleSignup(e){
  e.preventDefault();
  const name = document.getElementById('su-name').value.trim();
  const email = document.getElementById('su-email').value.trim();
  const pass = document.getElementById('su-pass').value;
  const pass2 = document.getElementById('su-pass2').value;
  const err = document.getElementById('signup-error');
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if(name.length<2 || !emailOk || pass.length<4 || pass!==pass2){
    err.classList.remove('hidden');
    return false;
  }
  localStorage.setItem('auth','1');
  window.location.href='dashboard.html';
  return false;
}

function logout(){
  localStorage.removeItem('auth');
  window.location.href='login.html';
}

// Lightbox
function openLightbox(src){
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  if(!lb || !img) return;
  img.src = src; lb.classList.remove('hidden');
}
function closeLightbox(){
  const lb = document.getElementById('lightbox');
  lb?.classList.add('hidden');
}

// Reveal on scroll
function initReveal(){
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('show'); obs.unobserve(e.target); } });
  }, {threshold:0.1});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
}

// Init
document.addEventListener('DOMContentLoaded', ()=>{
  loadTheme();
  initReveal();
});

function shuffleQuote(){
  const box=document.getElementById('quote-box');
  box.textContent=quotes[Math.floor(Math.random()*quotes.length)];
}

const images = document.querySelectorAll('.gallery img');