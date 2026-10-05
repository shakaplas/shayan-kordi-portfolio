document.documentElement.classList.add('js');

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
const navLinks = [...document.querySelectorAll('.nav-links a')];

function closeMenu(){
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded','false');
  menuButton.setAttribute('aria-label','Open navigation menu');
}

menuButton.addEventListener('click',()=>{
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded',String(open));
  menuButton.setAttribute('aria-label',open ? 'Close navigation menu' : 'Open navigation menu');
});

navLinks.forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape') closeMenu();});
document.addEventListener('click',e=>{if(!nav.contains(e.target) && !menuButton.contains(e.target)) closeMenu();});

if('IntersectionObserver' in window){
  const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}});
  },{threshold:.10});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
}else{
  document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
}

const sections=[...document.querySelectorAll('main section[id]')];
function updateActiveLink(){
  let current='home';
  sections.forEach(section=>{if(window.scrollY>=section.offsetTop-130) current=section.id;});
  navLinks.forEach(link=>{const active=link.getAttribute('href')===`#${current}`;link.classList.toggle('active',active);if(active){link.setAttribute('aria-current','page')}else{link.removeAttribute('aria-current')}});
}
window.addEventListener('scroll',updateActiveLink,{passive:true});
updateActiveLink();

document.getElementById('year').textContent=new Date().getFullYear();
