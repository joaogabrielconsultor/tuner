// Carbon Performance — comportamento comum a todas as páginas
// (menu, header, carrosséis, vídeos, FAQ, filtro de marcas, avisos e formulário de contato)

// Número de WhatsApp que recebe os pedidos (formulários do site)
var CP_WA = '393758172444'; // +39 375 817 2444
// Link oficial completo: o curto (wa.me) estraga acentos/emojis em alguns aparelhos e no WhatsApp do computador
function cpWaUrl(text) { return 'https://api.whatsapp.com/send?phone=' + CP_WA + '&text=' + encodeURIComponent(text); }

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
  body.classList.add('cookie-open');
  var closeCookie = function (v) { try { localStorage.setItem('brpCookieChoice', v); } catch (e) {} cc.remove(); body.classList.remove('cookie-open'); };
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
    banner.querySelector('.cv-car').textContent = c.veh + (c.stage ? ' · ' + c.stage : '') + (c.price ? ' · ' + c.price + ' €' : '');
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
    var lines = [B('Consulta web - Carbon Performance'), '',
      B('CLIENTE'),
      'Nombre: ' + val('nombre') + ' ' + val('apellidos'),
      'E-mail: ' + val('email'),
      'Teléfono: ' + val('telefono')];
    if (toggle && toggle.checked && (val('coche') || val('km') || val('caja'))) {
      lines.push('', B('VEHÍCULO'));
      if (val('coche')) lines.push('Coche: ' + val('coche'));
      if (val('km')) lines.push('Kilómetros: ' + val('km'));
      if (val('caja')) lines.push('Caja de cambios: ' + val('caja'));
    }
    if (ctx && ctx.veh && ctx.stage) {
      lines.push('', B('REPROGRAMACIÓN DE INTERÉS'), ctx.veh + ' - ' + ctx.stage);
      if (ctx.po && ctx.pm) lines.push('Potencia: ' + ctx.po + ' → ' + ctx.pm + ' cv (+' + ctx.pd + ')');
      if (ctx.to && ctx.tm) lines.push('Par: ' + ctx.to + ' → ' + ctx.tm + ' Nm (+' + ctx.td + ')');
      if (ctx.price) lines.push('Precio orientativo: ' + ctx.price + ' €');
    }
    lines.push('', B('CONSULTA'), val('mensaje'));
    var url = cpWaUrl(lines.join('\n'));
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
    var msg = '*Alta en el boletín - Carbon Performance*\nNombre: ' + form.elements.nombre.value.trim() + ' ' +
      form.elements.apellidos.value.trim() + '\nE-mail: ' + form.elements.email.value.trim();
    var url = cpWaUrl(msg);
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

// ===== WHATSAPP FIXO =====
// Mensagem pronta; quando a página tem um veículo escolhido (CP.waContext), ele vai junto.
(function () {
  var a = document.querySelector('[data-wa-float]');
  if (!a) return;
  window.CP = window.CP || {};
  CP.waMessage = function (extra) {
    var c = CP.waContext;
    var lines = ['Hola Carbon Performance,'];
    if (c && c.veh) {
      lines.push('Me interesa la reprogramación de mi vehículo:');
      lines.push('*' + c.veh + (c.stage ? ' - ' + c.stage : '') + '*');
      if (c.power) lines.push('Potencia: ' + c.power);
      if (c.torque) lines.push('Par: ' + c.torque);
      if (c.price) lines.push('Precio orientativo: ' + c.price);
      lines.push('¿Cuándo podría pedir cita?');
    } else {
      lines.push('Me gustaría información sobre la reprogramación de mi vehículo.');
    }
    if (extra) lines.push(extra);
    return cpWaUrl(lines.join('\n'));
  };
  a.addEventListener('click', function (e) {
    e.preventDefault();
    var url = CP.waMessage();
    var w = window.open(url, '_blank');
    if (!w) window.location.href = url;
  });
  // Balão "¿Te ayudamos?" aparece uma vez por visita, depois de alguns segundos
  var seen = false;
  try { seen = sessionStorage.getItem('cpWaBubble') === '1'; } catch (e) {}
  if (!seen) {
    setTimeout(function () {
      a.classList.add('show-bubble');
      try { sessionStorage.setItem('cpWaBubble', '1'); } catch (e) {}
      setTimeout(function () { a.classList.remove('show-bubble'); }, 6000);
    }, 5000);
  }
})();

// ===== ANIMAÇÕES =====
// Título da capa entra palavra por palavra; blocos entram ao aparecer na tela; fotos fazem um zoom suave.
// Com "reduzir movimento" ligado (ou sem suporte), tudo aparece normalmente.
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) return;
  var root = document.documentElement;
  root.classList.add('anim');

  // 1) Capa: palavras do título sobem por trás de uma máscara, depois texto e busca
  var h1 = document.querySelector('.hero h1');
  if (h1 && !h1.querySelector('.w')) {
    var words = h1.textContent.trim().split(/\s+/);
    h1.setAttribute('aria-label', h1.textContent.trim());
    h1.innerHTML = words.map(function (w, i) {
      return '<span class="w" aria-hidden="true"><span style="--i:' + i + '">' + w.replace(/</g, '&lt;') + '</span></span>';
    }).join(' ');
  }
  var heroBits = document.querySelectorAll('.hero .hero-lead, .hero .finder-search, .hero .finder-row, .hero .finder-steps, .hero .type-pills');
  heroBits.forEach(function (el, i) { el.classList.add('hero-in'); el.style.setProperty('--d', (380 + i * 110) + 'ms'); });
  var heroGo = function () { requestAnimationFrame(function () { requestAnimationFrame(function () { root.classList.add('hero-ready'); }); }); };
  // com a tela de abertura, o título da capa só anima quando ela some
  if (root.classList.contains('site-intro')) { document.addEventListener('cp:intro-end', heroGo, { once: true }); setTimeout(heroGo, 4600); }
  else heroGo();

  // 2) Blocos ao rolar
  var groups = [
    ['.section-head, .parts-head, .page-head > *, .faq-head .faq-page > *, .result-top > div', 'up'],
    ['.about > *, .split > div, .contact-grid > *, .faq-group, .footer-top > *, .footer-grid > *', 'up'],
    ['.news-grid > .news-card, #svc-rail > .svc-card, .center-grid > *, .media-rail > figure, .stage-bar a', 'card'],
    ['.svc-feature, .spec-card, .graph-card', 'card'],
    ['.split .media, .result-top .media, .photo-band', 'img']
  ];
  var els = [];
  groups.forEach(function (g) {
    document.querySelectorAll(g[0]).forEach(function (el) {
      if (el.hasAttribute('data-reveal') || el.closest('.hero')) return;
      el.setAttribute('data-reveal', g[1]);
      els.push(el);
    });
  });
  var lastParent = null, idx = 0;
  els.forEach(function (el) {
    if (el.parentElement === lastParent) idx++; else { idx = 0; lastParent = el.parentElement; }
    el.style.setProperty('--d', Math.min(idx, 6) * 80 + 'ms');
  });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.06 });
  els.forEach(function (el) { io.observe(el); });
  // conteúdo criado depois (página de resultado) também anima
  window.CP = window.CP || {};
  CP.reveal = function (el) { if (!el || el.hasAttribute('data-reveal')) return; el.setAttribute('data-reveal', 'card'); io.observe(el); };
  setTimeout(function () { els.forEach(function (el) { if (el.getBoundingClientRect().top < innerHeight) el.classList.add('is-in'); }); }, 2500);
})();

// ===== TOPO FIXO AO ROLAR =====
// Depois de descer um pouco, o menu fica preso no alto com fundo escuro translúcido.
(function () {
  var header = document.querySelector('.site-header');
  if (!header) return;
  var body = document.body, ticking = false, on = false;
  var photo = body.classList.contains('has-photo-hero');
  function update() {
    ticking = false;
    var want = window.scrollY > (photo ? 140 : 110);
    if (want === on) return;
    var h = header.offsetHeight;
    on = want;
    body.classList.toggle('header-stuck', on);
    if (!photo) body.style.paddingTop = on ? h + 'px' : '';
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();
})();

/* Tela de carregamento: fica no mínimo ~2 s (tempo da animação), espera a página carregar
   e então completa a barra e some. Um toque ou tecla pula. Trava de segurança no CSS (4,2 s). */
(function () {
  var root = document.documentElement;
  if (!root.classList.contains('site-intro')) return;
  var intro = document.querySelector('.intro');
  var t0 = Date.now(), MIN = 2000, MAX = 3800, closing = false, ended = false;

  // Som do motor: tenta tocar sozinho; se o navegador bloquear (o normal antes de um toque),
  // o primeiro toque na tela de carregamento faz o som tocar em vez de pular a animação.
  var snd = null, sndOn = false;
  try {
    snd = new Audio('audio/intro-motor.mp3');
    snd.volume = 0.6;
    var p = snd.play();
    if (p && p.then) p.then(function () { sndOn = true; }, function () {});
  } catch (e) { snd = null; }
  function fadeSound() {
    if (!snd || snd.paused) return;
    var v = snd.volume, id = setInterval(function () {
      v -= 0.08; if (v <= 0) { clearInterval(id); snd.pause(); } else snd.volume = v;
    }, 40);
  }

  function finish() {
    if (ended) return; ended = true;
    fadeSound();
    root.classList.remove('site-intro');
    if (intro) intro.remove();
    document.dispatchEvent(new Event('cp:intro-end'));
  }
  var holdUntil = 0;
  function close(now) {
    if (closing) return;
    if (now !== true && Date.now() < holdUntil) { setTimeout(close, holdUntil - Date.now()); return; }
    closing = true;
    if (!intro || now) return finish();
    intro.classList.add('is-done');
    setTimeout(finish, 800);
  }
  function whenLoaded() { setTimeout(close, Math.max(0, MIN - (Date.now() - t0))); }
  if (document.readyState === 'complete') whenLoaded(); else window.addEventListener('load', whenLoaded, { once: true });
  setTimeout(close, MAX);
  if (intro) intro.addEventListener('click', function () {
    if (snd && !sndOn && !closing) {            // 1º toque: liga o som e segura a tela até ele acabar
      sndOn = true; snd.currentTime = 0;
      snd.play().catch(function () {});
      holdUntil = Date.now() + 2200;
      return;
    }
    close(true);
  });
  window.addEventListener('keydown', function () { close(true); }, { once: true });
})();
