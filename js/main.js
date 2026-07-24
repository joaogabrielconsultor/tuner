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


// ===== FORMULARIO DE CONTACTO -> WHATSAPP =====
// Ao enviar, monta a mensagem com os datos preenchidos (mais a reprogramacion
// de interes, se o cliente veio de uma pagina de motor) e abre o WhatsApp.
(function () {
  var form = document.querySelector('form.content.contact');
  if (!form) return;

  var WA = '393758172444'; // +39 375 817 2444
  var params = new URLSearchParams(window.location.search);
  // Monta o nome do veiculo evitando repetir o modelo quando o motor ja o contem
  // (ex.: modelo "RSQ8" + motor "RSQ8 4.0 V8 TFSI" -> "Audi RSQ8 4.0 V8 TFSI")
  var pMarca = params.get('marca'), pModelo = params.get('modelo'), pMotor = params.get('motor');
  var vehParts = [pMarca];
  if (pModelo && !(pMotor && pMotor.toLowerCase().indexOf(pModelo.toLowerCase()) >= 0)) vehParts.push(pModelo);
  if (pMotor) vehParts.push(pMotor);
  var veh = vehParts.filter(Boolean).join(' ');

  function field(n) { return form.querySelector('#' + n); }
  function val(n) { var el = field(n); return el ? el.value.trim() : ''; }

  // Pre-preenche o "Coche" com o veiculo e seleciona Espana no pais
  if (veh) {
    var subj = field('subject');
    if (subj && !subj.value) subj.value = veh;

    // Banner de destaque com a reprogramacion consultada
    var stg = params.get('stage'), pr = params.get('price');
    var banner = document.createElement('div');
    banner.className = 'consulta-vehiculo';
    banner.innerHTML =
      '<span class="cv-tag">Estás consultando</span>' +
      '<span class="cv-car">' + veh + (stg ? ' &middot; ' + stg : '') + (pr ? ' &middot; €' + pr : '') + '</span>' +
      '<span class="cv-hint">¿No es este vehículo? Cámbialo en el campo <b>Coche</b> más abajo.</span>';
    form.insertBefore(banner, form.firstChild);

    // Realca o campo Coche editavel
    if (subj) {
      subj.classList.add('cv-prefill');
      subj.addEventListener('focus', function () { this.classList.remove('cv-prefill'); }, { once: true });
    }
  }
  var country = field('country');
  if (country && !country.value) {
    Array.prototype.some.call(country.options, function (o) {
      if (/^(Espa..a|Spain)$/i.test(o.value) || /^(Espa..a|Spain)$/i.test(o.text)) { o.selected = true; return true; }
      return false;
    });
  }
  // Se veio de um coche, marca o tipo de vehiculo como "Coche"
  var typeSel = field('type');
  if (typeSel && veh) {
    Array.prototype.some.call(typeSel.options, function (o) {
      if (/coche/i.test(o.text)) { o.selected = true; return true; }
      return false;
    });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Validacao dos obrigatorios
    var required = ['first_name', 'last_name', 'email', 'mileage', 'gearbox', 'subject', 'question'];
    for (var i = 0; i < required.length; i++) {
      var el = field(required[i]);
      if (el && !el.value.trim()) {
        el.classList.add('field-error');
        el.addEventListener('input', function () { this.classList.remove('field-error'); }, { once: true });
        el.focus();
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
    }

    var B = function (s) { return '*' + s + '*'; };
    var lines = [];
    lines.push('🔧 ' + B('Solicitud de presupuesto — Carbon Performance'));
    lines.push('');
    lines.push('👤 ' + B('CLIENTE'));
    lines.push('Nombre: ' + val('first_name') + ' ' + val('last_name'));
    if (val('company')) lines.push('Empresa: ' + val('company'));
    var loc = [val('address'), country ? country.value : ''].filter(Boolean).join(', ');
    if (loc) lines.push('Ubicación: ' + loc);
    lines.push('E-mail: ' + val('email'));
    if (val('phone')) lines.push('Teléfono: ' + val('phone'));
    lines.push('');
    lines.push('🚗 ' + B('VEHÍCULO'));
    if (typeSel) {
      var t = (typeSel.options[typeSel.selectedIndex] || {}).text || '';
      if (t && !/seleccione/i.test(t)) lines.push('Tipo: ' + t);
    }
    lines.push('Coche: ' + val('subject'));
    lines.push('Kilómetros: ' + val('mileage'));
    lines.push('Caja de cambios: ' + val('gearbox'));

    var stage = params.get('stage');
    if (veh && stage) {
      lines.push('');
      lines.push('⚙️ ' + B('REPROGRAMACIÓN DE INTERÉS'));
      lines.push(veh + ' · ' + stage);
      var po = params.get('po');
      if (po) lines.push('Potencia: ' + po + ' → ' + params.get('pm') + ' cv (+' + params.get('pd') + ')');
      var to = params.get('to');
      if (to) lines.push('Par: ' + to + ' → ' + params.get('tm') + ' Nm (+' + params.get('td') + ')');
      var price = params.get('price');
      if (price) lines.push('Precio orientativo: €' + price);
    }

    lines.push('');
    lines.push('💬 ' + B('CONSULTA'));
    lines.push(val('question'));
    lines.push('');
    var nl = field('newsletter');
    lines.push('📬 Newsletter: ' + (nl && nl.checked ? 'Sí' : 'No'));

    var url = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(lines.join('\n'));
    var w = window.open(url, '_blank');
    if (!w) window.location.href = url;
  });
})();
