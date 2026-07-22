// Mobile nav toggle — supports both old (.nav-menu) and new Foundation (.primary) nav
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('nav.primary') || document.querySelector('.nav-menu');
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
initSlider('.yt-slider');

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


// ===== GLOBAL WIDGETS: announcement bar, newsletter popup, cookie consent =====
// Injected on every page so they stay identical site-wide (mirrors how the live
// site loads these dynamically). Each block is idempotent and self-contained.
(function () {
  const body = document.body;
  if (!body) return;

  // --- Announcement bar (top marquee) ---
  if (!document.querySelector('.announcement-bar')) {
    body.insertAdjacentHTML('afterbegin',
      '<section class="announcement-bar"><div class="announcement-track">' +
      '<span class="announcement-marquee"><span class="announcement-item">' +
      '<a href="promociones.html">☀️ Promoción especial de verano ☀️ Hasta un -20% en stage 1 hasta el sábado 1 de agosto</a>' +
      '</span></span>' +
      '<div class="announcement-fade-left"></div><div class="announcement-fade-right"></div>' +
      '</div></section>');
  }

  // --- Newsletter popup (bottom-right, dismissible) ---
  if (!document.querySelector('.newsletter-popup') && sessionStorage.getItem('brpNewsletterClosed') !== '1') {
    const np = document.createElement('div');
    np.className = 'newsletter-popup';
    np.innerHTML =
      '<button class="newsletter-close" aria-label="Cerrar">&times;</button>' +
      '<div class="newsletter-inner">' +
      '<span class="newsletter-fan">HAZTE FAN</span>' +
      '<h3>¡Mantente informado!</h3>' +
      '<p>Suscríbete al boletín.</p>' +
      '<form class="newsletter-form">' +
      '<input type="email" placeholder="Tu e-mail" required>' +
      '<button type="submit" class="button-full-rounded">SUSCRIBIRSE</button>' +
      '</form></div>';
    body.appendChild(np);
    np.querySelector('.newsletter-close').addEventListener('click', () => {
      np.remove(); sessionStorage.setItem('brpNewsletterClosed', '1');
    });
    np.querySelector('.newsletter-form').addEventListener('submit', (e) => {
      e.preventDefault();
      np.querySelector('.newsletter-inner').innerHTML =
        '<span class="newsletter-fan">HAZTE FAN</span><h3>¡Gracias!</h3><p>Te has suscrito correctamente.</p>';
      sessionStorage.setItem('brpNewsletterClosed', '1');
      setTimeout(() => np.remove(), 2500);
    });
  }

  // --- Cookie consent (bottom-left, remembers choice) ---
  if (!document.querySelector('.cookie-consent') && localStorage.getItem('brpCookieChoice') === null) {
    const cc = document.createElement('div');
    cc.className = 'cookie-consent';
    cc.innerHTML =
      '<div class="cookie-text"><strong>We use cookies!</strong>' +
      '<p>Hi, this website uses essential cookies to ensure its proper operation and tracking cookies to understand how you interact with it. The latter will be set only after consent. <a href="#" class="cookie-choose">Let me choose</a></p></div>' +
      '<div class="cookie-actions">' +
      '<button class="cookie-accept">Accept all</button>' +
      '<button class="cookie-reject">Reject all</button></div>';
    body.appendChild(cc);
    const closeCookie = (choice) => { localStorage.setItem('brpCookieChoice', choice); cc.remove(); };
    cc.querySelector('.cookie-accept').addEventListener('click', () => closeCookie('all'));
    cc.querySelector('.cookie-reject').addEventListener('click', () => closeCookie('reject'));
    cc.querySelector('.cookie-choose').addEventListener('click', (e) => { e.preventDefault(); closeCookie('essential'); });
  }
})();
