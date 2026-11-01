// Carbon Performance — comportamento comum a todas as páginas
// (menu, header, carrosséis, vídeos, FAQ, filtro de marcas, avisos e formulário de contato)

// Número de WhatsApp que recebe os pedidos (formulários do site)
var CP_WA = '393758172444'; // +39 375 817 2444

var CP_ICON_ARROW = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M6 3l5 5-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

// ===== HEADER E MENU =====
(function () {
  var header = document.getElementById('site-header');
  if (!header) return;
  var body = document.body;

  // Item ativo do menu conforme a página atual
  var page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if (page === '') page = 'index.html';
  header.querySelectorAll('[data-match]').forEach(function (el) {
    var pages = el.getAttribute('data-match').split(' ');
    if (pages.indexOf(page) >= 0) (el.closest('li') || el).classList.add('active');
  });
  header.querySelectorAll('.sub-menu a').forEach(function (a) {
    if (a.getAttribute('href') === page) a.classList.add('current');
  });

  // Header sólido ao rolar
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 24);
    var top = document.querySelector('.to-top');
    if (top) top.classList.toggle('show', window.scrollY > 700);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Menu mobile
  var burger = header.querySelector('.nav-burger');
  if (burger) {
    burger.addEventListener('click', function () {
      var open = body.classList.toggle('nav-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && body.classList.contains('nav-open')) {
      body.classList.remove('nav-open');
      if (burger) { burger.setAttribute('aria-expanded', 'false'); burger.focus(); }
    }
  });

  // Submenus (abrir/fechar no mobile)
  header.querySelectorAll('.sub-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var li = btn.closest('li');
      var open = li.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  // Voltar ao topo
  var toTop = document.querySelector('.to-top');
  if (toTop) toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
})();

// ===== SLIDESHOW DO HERO =====
(function () {
  document.querySelectorAll('[data-showcase]').forEach(function (box) {
    var imgs = box.querySelectorAll('img');
    if (imgs.length < 2) { if (imgs[0]) imgs[0].classList.add('on'); return; }
    var dotsWrap = box.querySelector('.showcase-dots');
    var current = 0, timer;
    var dots = [];
    imgs.forEach(function (img, i) {
      if (!dotsWrap) return;
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', 'Foto ' + (i + 1));
      b.addEventListener('click', function () { go(i); restart(); });
      dotsWrap.appendChild(b);
      dots.push(b);
    });
    function go(i) {
      imgs[current].classList.remove('on');
      if (dots[current]) dots[current].classList.remove('on');
      current = i;
      var img = imgs[current];
      if (img.dataset.src) { img.src = img.dataset.src; img.removeAttribute('data-src'); }
      img.classList.add('on');
      if (dots[current]) dots[current].classList.add('on');
      // pré-carrega a próxima
      var next = imgs[(current + 1) % imgs.length];
      if (next.dataset.src) { next.src = next.dataset.src; next.removeAttribute('data-src'); }
    }
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function restart() {
      clearInterval(timer);
      if (!reduce) timer = setInterval(function () { go((current + 1) % imgs.length); }, 5000);
    }
    go(0);
    restart();
    box.addEventListener('mouseenter', function () { clearInterval(timer); });
    box.addEventListener('mouseleave', restart);
  });
})();

// ===== CARROSSÉIS HORIZONTAIS (setas) =====
(function () {
  document.querySelectorAll('[data-rail-nav]').forEach(function (nav) {
    var rail = document.getElementById(nav.getAttribute('data-rail-nav'));
    if (!rail) return;
    var prev = nav.querySelector('.prev'), next = nav.querySelector('.next');
    function step() { var c = rail.firstElementChild; return c ? c.getBoundingClientRect().width + 16 : 300; }
    prev.addEventListener('click', function () { rail.scrollBy({ left: -step(), behavior: 'smooth' }); });
    next.addEventListener('click', function () { rail.scrollBy({ left: step(), behavior: 'smooth' }); });
    function update() {
      prev.disabled = rail.scrollLeft <= 4;
      next.disabled = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 4;
    }
    rail.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  });
})();

// ===== VÍDEOS EM LIGHTBOX =====
(function () {
  var links = document.querySelectorAll('a[data-video]');
  if (!links.length) return;
  var box = document.createElement('div');
  box.className = 'lightbox';
  box.hidden = true;
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-label', 'Vídeo');
  box.innerHTML = '<button class="icon-btn close" type="button" aria-label="Cerrar vídeo"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button><div class="frame"></div>';
  document.body.appendChild(box);
  var frame = box.querySelector('.frame');
  var lastFocus = null;
  function close() { box.hidden = true; frame.innerHTML = ''; if (lastFocus) lastFocus.focus(); }
  links.forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      lastFocus = a;
      var src = a.getAttribute('data-video');
      frame.innerHTML = '<iframe src="' + src + (src.indexOf('?') > -1 ? '&' : '?') + 'autoplay=1" title="Vídeo" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>';
      box.hidden = false;
      box.querySelector('.close').focus();
    });
  });
  box.addEventListener('click', function (e) { if (e.target === box) close(); });
  box.querySelector('.close').addEventListener('click', close);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !box.hidden) close(); });
})();

// ===== COPIAR TELEFONE / E-MAIL / ENDEREÇO =====
(function () {
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = document.getElementById(btn.getAttribute('data-copy'));
      if (!target || !navigator.clipboard) return;
      navigator.clipboard.writeText(target.innerText.trim()).then(function () {
        btn.classList.add('done');
        var old = btn.getAttribute('aria-label');
        btn.setAttribute('aria-label', 'Copiado');
        setTimeout(function () { btn.classList.remove('done'); btn.setAttribute('aria-label', old); }, 1800);
      });
    });
  });
})();

// ===== FILTRO DA GRADE DE MARCAS =====
(function () {
  var input = document.getElementById('brand-search');
  var grid = document.querySelector('.brand-grid');
  if (!input || !grid) return;
  var tiles = grid.querySelectorAll('.brand-tile');
  var empty = document.createElement('div');
  empty.className = 'empty-state no-results';
  empty.hidden = true;
  empty.innerHTML = '<h2>Ninguna marca coincide</h2><p>Revisa cómo está escrito o pregúntanos directamente por tu vehículo.</p><a class="btn" href="contacto.html">Solicita presupuesto <span class="ico">' + CP_ICON_ARROW + '</span></a>';
  grid.appendChild(empty);
  function norm(s) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  input.addEventListener('input', function () {
    var q = norm(input.value.trim());
    var shown = 0;
    tiles.forEach(function (t) {
      var ok = !q || norm(t.textContent + ' ' + (t.getAttribute('title') || '')).indexOf(q) >= 0;
      t.hidden = !ok;
      if (ok) shown++;
    });
    empty.hidden = shown > 0;
  });
})();

// ===== AVISO DE COOKIES (lembra a escolha) =====
(function () {
  var body = document.body;
  if (!body) return;
  var choice = null;
  try { choice = localStorage.getItem('brpCookieChoice'); } catch (e) { choice = 'unknown'; }
  if (document.querySelector('.cookie-consent') || choice !== null) return;
  var cc = document.createElement('div');
  cc.className = 'cookie-consent';
  cc.setAttribute('role', 'dialog');
  cc.setAttribute('aria-label', 'Política de cookies');
  cc.innerHTML =
    '<div class="cookie-text"><strong>Política de cookies</strong>' +
    '<p>Para ofrecerte la mejor experiencia, este sitio utiliza cookies esenciales para funcionar correctamente y cookies de seguimiento para entender cómo lo usas. Estas últimas solo se activan con tu consentimiento.</p>' +
    '<a href="#" class="cookie-choose">Solo las esenciales</a></div>' +
    '<div class="cookie-actions">' +
    '<button type="button" class="cookie-reject">Rechazar</button>' +
    '<button type="button" class="cookie-accept">Aceptar</button></div>' +
    '<hr class="cookie-sep"><a class="cookie-policy" href="https://www.br-performance.com/brp-barcelona/privacy-policy">Política de privacidad</a>';
  body.appendChild(cc);
  var closeCookie = function (v) { try { localStorage.setItem('brpCookieChoice', v); } catch (e) {} cc.remove(); };
  cc.querySelector('.cookie-accept').addEventListener('click', function () { closeCookie('all'); });
  cc.querySelector('.cookie-reject').addEventListener('click', function () { closeCookie('reject'); });
  cc.querySelector('.cookie-choose').addEventListener('click', function (e) { e.preventDefault(); closeCookie('essential'); });
})();


// ===== FORMULÁRIO CONTÁCTANOS -> WHATSAPP =====
(function () {
  var form = document.querySelector('form[data-quick-contact]');
  if (!form) return;
  var toggle = form.querySelector('[data-toggle-extra]');
  var extra = form.querySelector('.extra-fields');
  if (toggle && extra) {
    toggle.addEventListener('change', function () { extra.hidden = !toggle.checked; });
  }
  function val(n) { var el = form.elements[n]; return el ? String(el.value).trim() : ''; }

  // Veículo consultado: vem pelo endereço (contacto.html?marca=...) ou pela página do motor (CP.setContactVehicle)
  var ctx = null;
  function applyCtx(c) {
    ctx = c;
    var old = form.querySelector('.consulta-vehiculo');
    if (old) old.remove();
    if (!c || !c.veh) return;
    var banner = document.createElement('div');
    banner.className = 'consulta-vehiculo';
    banner.innerHTML = '<span class="cv-tag">Estás consultando</span><span class="cv-car"></span>' +
      '<span class="cv-hint">¿No es este vehículo? Cámbialo en el campo <b>Coche</b>.</span>';
    banner.querySelector('.cv-car').textContent = c.veh + (c.stage ? ' · ' + c.stage : '') + (c.price ? ' · €' + c.price : '');
    form.insertBefore(banner, form.firstChild);
    if (form.elements.coche) form.elements.coche.value = c.veh;
    if (toggle) { toggle.checked = true; if (extra) extra.hidden = false; }
    if (form.elements.mensaje) form.elements.mensaje.value = 'Me interesa la reprogramación ' + (c.stage || '') + ' para mi ' + c.veh + '.';
  }
  window.CP = window.CP || {};
  CP.setContactVehicle = applyCtx;
  if (!document.body.classList.contains('page-catalog')) {
    var qp = new URLSearchParams(window.location.search);
    var pMarca = qp.get('marca'), pModelo = qp.get('modelo'), pMotor = qp.get('motor');
    var vparts = [pMarca];
    if (pModelo && !(pMotor && pMotor.toLowerCase().indexOf(pModelo.toLowerCase()) >= 0)) vparts.push(pModelo);
    if (pMotor) vparts.push(pMotor);
    var vehQ = vparts.filter(Boolean).join(' ');
    if (vehQ) applyCtx({ veh: vehQ, stage: qp.get('stage'), price: qp.get('price'), po: qp.get('po'), pm: qp.get('pm'), pd: qp.get('pd'), to: qp.get('to'), tm: qp.get('tm'), td: qp.get('td') });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var required = ['nombre', 'apellidos', 'email', 'telefono', 'mensaje'];
    for (var i = 0; i < required.length; i++) {
      var el = form.elements[required[i]];
      if (el && !el.value.trim()) {
        el.classList.add('field-error');
        el.addEventListener('input', function () { this.classList.remove('field-error'); }, { once: true });
        el.focus();
        return;
      }
    }
    var ok = form.elements.acepto;
    if (ok && !ok.checked) { ok.focus(); ok.closest('.check').style.color = 'var(--red)'; return; }
    var B = function (s) { return '*' + s + '*'; };
    var lines = ['🔧 ' + B('Consulta — Carbon Performance'), '',
      '👤 ' + B('CLIENTE'),
      'Nombre: ' + val('nombre') + ' ' + val('apellidos'),
      'E-mail: ' + val('email'),
      'Teléfono: ' + val('telefono')];
    if (toggle && toggle.checked && (val('coche') || val('km') || val('caja'))) {
      lines.push('', '🚗 ' + B('VEHÍCULO'));
      if (val('coche')) lines.push('Coche: ' + val('coche'));
      if (val('km')) lines.push('Kilómetros: ' + val('km'));
      if (val('caja')) lines.push('Caja de cambios: ' + val('caja'));
    }
    if (ctx && ctx.veh && ctx.stage) {
      lines.push('', '⚙️ ' + B('REPROGRAMACIÓN DE INTERÉS'), ctx.veh + ' · ' + ctx.stage);
      if (ctx.po && ctx.pm) lines.push('Potencia: ' + ctx.po + ' → ' + ctx.pm + ' cv (+' + ctx.pd + ')');
      if (ctx.to && ctx.tm) lines.push('Par: ' + ctx.to + ' → ' + ctx.tm + ' Nm (+' + ctx.td + ')');
      if (ctx.price) lines.push('Precio orientativo: €' + ctx.price);
    }
    lines.push('', '💬 ' + B('CONSULTA'), val('mensaje'));
    var url = 'https://wa.me/' + CP_WA + '?text=' + encodeURIComponent(lines.join('\n'));
    var w = window.open(url, '_blank');
    if (!w) window.location.href = url;
  });
})();

// ===== BOLETIM DO RODAPÉ -> WHATSAPP =====
(function () {
  var form = document.querySelector('form[data-newsletter]');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var fields = ['nombre', 'apellidos', 'email'];
    for (var i = 0; i < fields.length; i++) {
      var el = form.elements[fields[i]];
      if (!el.value.trim() || (el.type === 'email' && !/^\S+@\S+\.\S+$/.test(el.value))) {
        el.style.borderColor = 'var(--red)';
        el.addEventListener('input', function () { this.style.borderColor = ''; }, { once: true });
        el.focus();
        return;
      }
    }
    var msg = '📬 *Alta en el boletín — Carbon Performance*\nNombre: ' + form.elements.nombre.value.trim() + ' ' +
      form.elements.apellidos.value.trim() + '\nE-mail: ' + form.elements.email.value.trim();
    var url = 'https://wa.me/' + CP_WA + '?text=' + encodeURIComponent(msg);
    var w = window.open(url, '_blank');
    if (!w) window.location.href = url;
    form.innerHTML = '<p class="done">¡Gracias! Confirma el envío en WhatsApp para completar tu suscripción.</p>';
  });
})();

// ===== REABRIR O AVISO DE COOKIES =====
(function () {
  document.querySelectorAll('[data-cookie-settings]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      try { localStorage.removeItem('brpCookieChoice'); } catch (err) {}
      location.reload();
    });
  });
})();


// ===== "CARGAR MÁS" NAS NOTÍCIAS =====
(function () {
  document.querySelectorAll('[data-load-more]').forEach(function (btn) {
    var grid = document.getElementById(btn.getAttribute('data-load-more'));
    if (!grid) return;
    function update() { if (!grid.querySelector('[hidden]')) btn.parentElement.hidden = true; }
    btn.addEventListener('click', function () {
      [].slice.call(grid.querySelectorAll('[hidden]'), 0, 6).forEach(function (el) { el.hidden = false; });
      update();
    });
    update();
  });
})();

// Botões "Prepara mi vehículo" e cartões de serviço: sobem até o configurador e põem o cursor na busca
(function () {
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href="#buscador"]');
    if (!a) return;
    var finder = document.getElementById('buscador');
    if (!finder) return;
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    var input = finder.querySelector('.finder-search input');
    if (input) setTimeout(function () { input.focus({ preventScroll: true }); }, 450);
  });
})();
