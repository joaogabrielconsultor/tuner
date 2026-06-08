// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => navMenu.classList.toggle('open'));
}

// Generic auto-slider
function initSlider(containerSel) {
  const container = document.querySelector(containerSel);
  if (!container) return;
  const track = container.querySelector('.slides-track');
  const slides = track ? track.querySelectorAll('.slide') : [];
  const dotsWrap = container.querySelector('.slider-dots');
  if (!slides.length) return;
  let current = 0;
  const dots = [];

  if (dotsWrap) {
    slides.forEach((_, i) => {
      const btn = document.createElement('button');
      if (i === 0) btn.classList.add('active');
      btn.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(btn);
      dots.push(btn);
    });
  }

  function goTo(index) {
    current = index;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  setInterval(() => goTo((current + 1) % slides.length), 4500);
}

initSlider('.hero-slider');
initSlider('.news-slider');

// FAQ accordion
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const isOpen = btn.classList.contains('open');
    document.querySelectorAll('.faq-q').forEach(b => {
      b.classList.remove('open');
      b.nextElementSibling.classList.remove('open');
    });
    if (!isOpen) {
      btn.classList.add('open');
      answer.classList.add('open');
    }
  });
});

// Vehicle brand search filter
const brandSearch = document.querySelector('#brand-search');
if (brandSearch) {
  brandSearch.addEventListener('input', () => {
    const q = brandSearch.value.toLowerCase();
    document.querySelectorAll('.brand-item').forEach(item => {
      item.style.display = item.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  });
}

// Contact form
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn-send');
    btn.textContent = '¡Enviado! ✓';
    btn.style.background = '#006600';
    setTimeout(() => {
      btn.textContent = 'Enviar consulta';
      btn.style.background = '';
      contactForm.reset();
    }, 3000);
  });
}
