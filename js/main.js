// Header scroll effect
const header = document.querySelector('.site-header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// Mobile nav toggle
const toggle = document.querySelector('.mobile-toggle');
const navPrimary = document.querySelector('nav.primary');
if (toggle && navPrimary) {
  toggle.addEventListener('click', () => {
    navPrimary.classList.toggle('open');
    toggle.textContent = navPrimary.classList.contains('open') ? '✕' : '☰';
  });
}

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const isOpen = btn.classList.contains('active');
    // close all
    document.querySelectorAll('.faq-question').forEach(b => {
      b.classList.remove('active');
      b.nextElementSibling.classList.remove('open');
    });
    // open clicked if it was closed
    if (!isOpen) {
      btn.classList.add('active');
      answer.classList.add('open');
    }
  });
});

// Vehicle category tabs
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// Vehicle search filter
const searchInput = document.querySelector('#vehicle-search');
const brandItems = document.querySelectorAll('.brand-item');
if (searchInput && brandItems.length) {
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.toLowerCase();
    brandItems.forEach(item => {
      const name = item.querySelector('.brand-item-name').textContent.toLowerCase();
      item.style.display = name.includes(q) ? '' : 'none';
    });
  });
}

// Counter animation for hero stats
function animateCount(el, target, duration = 1500) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { el.textContent = target + (el.dataset.suffix || ''); clearInterval(timer); }
    else { el.textContent = Math.floor(start) + (el.dataset.suffix || ''); }
  }, 16);
}
document.querySelectorAll('.stat-num[data-target]').forEach(el => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCount(el, parseInt(el.dataset.target));
        observer.disconnect();
      }
    });
  });
  observer.observe(el);
});

// Scroll reveal
const reveals = document.querySelectorAll('[data-reveal]');
if (reveals.length) {
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('fade-up');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => revealObs.observe(el));
}

// Contact form
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type=submit]');
    btn.textContent = 'Enviado ✓';
    btn.style.background = '#006600';
    setTimeout(() => {
      btn.textContent = 'Solicitar Presupuesto';
      btn.style.background = '';
      contactForm.reset();
    }, 3000);
  });
}
