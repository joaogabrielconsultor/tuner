// MIDO · camada «noite de corrida»: semáforo de saída, velocímetro com marchas e NOS,
// rastros de velocidade, contadores de odômetro e entrada dos títulos.
// Tudo desligado com prefers-reduced-motion; rastros fora em html.fx-lite.
(function () {
  'use strict';
  var root = document.documentElement;
  var RM = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var lite = root.classList.contains('fx-lite');
  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }

  // ---------- semáforo de saída (uma vez por visita) ----------
  var lights = $('.startlights');
  function go() {
    root.classList.remove('race-armed');
    try { sessionStorage.setItem('mpStart', '1'); } catch (e) {}
    document.dispatchEvent(new Event('mido:go'));
  }
  if (lights && root.classList.contains('race-armed')) {
    var lamps = $$('.lamps i', lights), k = 0;
    var tick = setInterval(function () {
      if (k < lamps.length) { lamps[k].classList.add('on'); k++; return; }
      clearInterval(tick);
      lights.classList.add('go');
      go();
      setTimeout(function () { lights.classList.add('done'); }, 650);
    }, 380);
  } else if (lights) { lights.remove(); }

  // ---------- velocímetro + NOS + rastros ----------
  var speedo = null, streaks = null;
  if (!RM) {
    speedo = document.createElement('div');
    speedo.className = 'speedo'; speedo.setAttribute('aria-hidden', 'true');
    speedo.innerHTML = '<div class="sp-num"><b>0</b><small>km/h</small></div><div class="sp-gear">N</div><div class="sp-nos"><span>NOS</span><i></i></div>';
    document.body.appendChild(speedo);
    if (!lite) { streaks = document.createElement('div'); streaks.className = 'streaks'; streaks.setAttribute('aria-hidden', 'true'); document.body.appendChild(streaks); }
    var num = $('b', speedo), gear = $('.sp-gear', speedo), nosBar = $('.sp-nos', speedo);
    var lastY = window.scrollY, lastT = performance.now(), kmh = 0, nos = 0, boost = 0, running = false, idleFrames = 0;
    var loop = function (t) {
      var dt = Math.max(16, t - lastT), y = window.scrollY, v = Math.abs(y - lastY) / dt * 1000; // px/s
      lastY = y; lastT = t;
      var targetK = Math.min(320, v * 0.11) + (boost > 0 ? 60 : 0);
      kmh += (targetK - kmh) * (targetK > kmh ? .25 : .06);
      // NOS carrega com rolagem contínua; cheio = arrancada
      if (v > 400) nos = Math.min(1, nos + dt / 2600); else nos = Math.max(0, nos - dt / 9000);
      if (nos >= 1 && boost <= 0) { boost = 1400; nos = 0; }
      if (boost > 0) boost -= dt;
      num.textContent = Math.round(kmh);
      var g = kmh < 4 ? 'N' : String(Math.min(6, 1 + Math.floor(kmh / 52)));
      if (gear.textContent !== g) gear.textContent = g;
      nosBar.style.setProperty('--nos', boost > 0 ? 1 : nos.toFixed(3));
      speedo.classList.toggle('boost', boost > 0);
      // no celular só aparece em movimento, para não cobrir o texto
      speedo.classList.toggle('show', y > innerHeight * .5 && y < document.documentElement.scrollHeight - innerHeight * 1.6 && (innerWidth > 640 || kmh > 3 || boost > 0));
      if (streaks) { streaks.style.opacity = Math.max(0, Math.min(.42, (kmh - 80) / 420 + (boost > 0 ? .18 : 0))).toFixed(3); streaks.classList.toggle('boost', boost > 0); }
      idleFrames = kmh < 1 && boost <= 0 ? idleFrames + 1 : 0;
      if (idleFrames > 30 || document.hidden) { running = false; return; }
      requestAnimationFrame(loop);
    };
    var wake = function () { if (!running) { running = true; lastY = window.scrollY; lastT = performance.now(); idleFrames = 0; requestAnimationFrame(loop); } };
    window.addEventListener('scroll', wake, { passive: true });
  }

  // ---------- contadores de odômetro ----------
  function runOdo(el) {
    var to = +el.getAttribute('data-count'), dur = 1600, t0 = null, fmt = function (n) { return Math.round(n).toLocaleString('es-ES'); };
    var suffix = el.getAttribute('data-suffix') || '';
    if (RM || !isFinite(to)) { el.innerHTML = fmt(to) + suffix; return; }
    (function step(t) {
      if (!t0) t0 = t; var p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 4);
      el.innerHTML = fmt(to * e) + suffix;
      if (p < 1) requestAnimationFrame(step);
    })(performance.now());
  }
  var odos = $$('[data-count]');
  // marcas e modelos lidos do catálogo do site (o mesmo do configurador)
  var live = $$('[data-count-src]');
  var ready = live.length ? fetch('/data/catalog/index.json').then(function (r) { return r.json(); }).then(function (ix) {
    var nb = 0, nm = 0; Object.keys(ix.brands).forEach(function (s) { nb++; nm += (ix.brands[s].models || []).length; });
    live.forEach(function (el) { el.setAttribute('data-count', el.getAttribute('data-count-src') === 'marcas' ? nb : nm); });
  }).catch(function () {}) : Promise.resolve();
  ready.then(function () {
    if (!('IntersectionObserver' in window)) { odos.forEach(runOdo); return; }
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { runOdo(e.target); io.unobserve(e.target); } }); }, { threshold: .6 });
    odos.forEach(function (o) { io.observe(o); });
  });

  // ---------- títulos entram «derrapando» ----------
  var heads = $$('.sec-head');
  if (!RM && 'IntersectionObserver' in window) {
    var hio = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); hio.unobserve(e.target); } }); }, { rootMargin: '0px 0px -15% 0px' });
    heads.forEach(function (h) { hio.observe(h); });
  }
})();
