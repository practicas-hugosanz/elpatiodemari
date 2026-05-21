// Hero slideshow
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.hsd');
let current = 0;
let slideTimer;

function goToSlide(n) {
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = (n + slides.length) % slides.length;
  slides[current].classList.add('active');
  dots[current].classList.add('active');
  // Reset zoom animation
  slides[current].style.animation = 'none';
  slides[current].offsetHeight;
  slides[current].style.animation = '';
}

function nextSlide() { goToSlide(current + 1); }

function startSlider() {
  clearInterval(slideTimer);
  slideTimer = setInterval(nextSlide, 5500);
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => { goToSlide(i); startSlider(); });
});

startSlider();

// Reveal on scroll
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(r => obs.observe(r));

// Carta tabs
function showTab(id, btn) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tb').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + id).classList.add('active');
  btn.classList.add('active');
}

// Mobile nav
const toggle = document.querySelector('.nav-toggle');
const mobile = document.querySelector('.nav-mobile');
if (toggle && mobile) {
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    mobile.classList.toggle('open');
    document.body.style.overflow = mobile.classList.contains('open') ? 'hidden' : '';
  });
  mobile.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.classList.remove('open');
      mobile.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// Nav scroll shadow
window.addEventListener('scroll', () => {
  document.querySelector('nav').style.boxShadow =
    window.scrollY > 10 ? '0 2px 28px rgba(0,0,0,.45)' : '0 2px 18px rgba(0,0,0,.3)';
});
