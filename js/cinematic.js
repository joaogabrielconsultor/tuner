// MIDO Performance — motor das páginas cinematográficas (/performance e /arquivos)
// Sem bibliotecas. Movimento só com transform/opacity; desligado com prefers-reduced-motion;
// html.fx-lite em aparelhos modestos ou com economia de dados.
(function () {
  'use strict';
  var root = document.documentElement;
  var RM = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var nav = navigator, lite = (nav.connection && nav.connection.saveData) || (nav.hardwareConcurrency && nav.hardwareConcurrency <= 4) || (nav.deviceMemory && nav.deviceMemory <= 4);
  if (lite) root.classList.add('fx-lite');
  root.classList.remove('no-js');

  var CFG = (typeof BRP_CONFIG !== 'undefined' && BRP_CONFIG) || {};
  var WA = String((CFG.empresa && CFG.empresa.telefone_link) || 'tel:+393758172444').replace(/\D/g, '') || '393758172444';
  var PORTAL = ((CFG.archivos && CFG.archivos.portal) || 'https://mido-archivos.onrender.com').replace(/\/$/, '');
  function waUrl(text) { return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(text); }
  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function eur(n) { return (Math.round(n * 100) / 100).toLocaleString('es-ES', { maximumFractionDigits: 2 }) + ' €'; }

  // ---------- eventos de conversão (sem dados pessoais) ----------
  // Para ligar a uma ferramenta de análise: window.dataLayer (GTM) ou escutar 'mido:conversion'.
  function track(name, data) {
    var ev = Object.assign({ event: 'mido_' + name, page: location.pathname }, data || {});
    try { (window.dataLayer = window.dataLayer || []).push(ev); } catch (e) {}
    try { document.dispatchEvent(new CustomEvent('mido:conversion', { detail: ev })); } catch (e) {}
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('[data-track]');
    if (a) track(a.getAttribute('data-track'), { label: a.getAttribute('data-track-label') || '' });
  });

  // WhatsApp com mensagem de contexto: data-wa="texto"
  $$('[data-wa]').forEach(function (a) { a.href = waUrl(a.getAttribute('data-wa')); a.target = '_blank'; a.rel = 'noopener'; });
  // portal: data-portal="/?registro=1"
  $$('[data-portal]').forEach(function (a) { a.href = PORTAL + (a.getAttribute('data-portal') || '/'); });

  // ---------- luz de câmbio: progresso da leitura ----------
  var shift = $('.shiftlight'), leds = shift ? $$('i', shift) : [];
  var hero = $('.hero-cine'), media = hero && $('.hero-media', hero), dock = $('.dock');
  var tracks = $$('[data-progress]');
  var parY = 0, shX = 0, shY = 0;
  function applyMedia() { if (media) media.style.transform = 'translate3d(' + shX.toFixed(1) + 'px,' + (parY + shY).toFixed(1) + 'px,0)'; }
  var ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      var y = window.scrollY, h = document.documentElement.scrollHeight - innerHeight, p = h > 0 ? Math.min(1, y / h) : 0;
      if (leds.length) {
        var n = Math.round(p * leds.length);
        leds.forEach(function (l, i) { l.classList.toggle('on', i < n); });
        shift.classList.toggle('redline', p > .985);
      }
      parY = (media && !RM && !lite && y < innerHeight * 1.2) ? y * 0.28 : parY;
      applyMedia();
      if (dock) dock.classList.toggle('show', y > innerHeight * .7 && !nearQuote());
      tracks.forEach(function (t) {
        // a barra enche ao longo de toda a seção, não só da lista
        var r = (t.closest('section') || t).getBoundingClientRect(), vh = innerHeight;
        var q = Math.max(0, Math.min(1, (vh * .8 - r.top) / (r.height * .8)));
        t.style.setProperty('--p', q.toFixed(3));
        $$('.step', t).forEach(function (s, i, all) { s.classList.toggle('lit', q >= (i / all.length) + .02 || (q > .98)); });
      });
    });
  }
  function nearQuote() { var q = $('#presupuesto') || $('#acceso'); if (!q) return false; var r = q.getBoundingClientRect(); return r.top < innerHeight && r.bottom > 0; }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  // ---------- revelação das imagens (uma vez) ----------
  var revs = $$('.reveal');
  if ('IntersectionObserver' in window && !RM) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -12% 0px' });
    revs.forEach(function (r) { io.observe(r); });
  } else revs.forEach(function (r) { r.classList.add('is-in'); });

  // ---------- conta-giros ----------
  var tach = $('[data-tach]'), needle, arc, readout, rpm = 0, target = 0, MAXR = 8000, A0 = -225, A1 = 45;
  function polar(cx, cy, r, deg) { var a = deg * Math.PI / 180; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; }
  function buildTach(el) {
    var s = '<svg viewBox="0 0 200 200" aria-hidden="true"><circle class="t-face" cx="100" cy="100" r="96"/>';
    for (var k = 0; k <= 80; k++) {
      var deg = A0 + (A1 - A0) * k / 80, major = k % 10 === 0, half = k % 5 === 0, a = polar(100, 100, 88, deg), b = polar(100, 100, major ? 74 : half ? 80 : 84, deg);
      s += '<line class="t-tick' + (major ? '' : ' minor') + (k >= 65 ? ' red' : '') + '" x1="' + a[0].toFixed(1) + '" y1="' + a[1].toFixed(1) + '" x2="' + b[0].toFixed(1) + '" y2="' + b[1].toFixed(1) + '"/>';
      if (major) { var t = polar(100, 100, 62, deg); s += '<text class="t-num" x="' + t[0].toFixed(1) + '" y="' + t[1].toFixed(1) + '">' + (k / 10) + '</text>'; }
    }
    s += '<path class="t-arc" d=""/><line class="t-needle" x1="100" y1="100" x2="100" y2="22"/><circle class="t-hub" cx="100" cy="100" r="7"/></svg>' +
      '<div class="t-read"><b>0</b><small>rpm × 1</small></div>';
    el.insertAdjacentHTML('afterbegin', s);
    needle = $('.t-needle', el); arc = $('.t-arc', el); readout = $('.t-read b', el);
  }
  function drawTach() {
    var f = Math.max(0, Math.min(1, rpm / MAXR)), deg = A0 + (A1 - A0) * f;
    needle.setAttribute('transform', 'rotate(' + (deg + 90).toFixed(2) + ' 100 100)');
    var p0 = polar(100, 100, 94, A0), p1 = polar(100, 100, 94, deg), large = (deg - A0) > 180 ? 1 : 0;
    arc.setAttribute('d', f < .002 ? '' : 'M' + p0[0].toFixed(1) + ' ' + p0[1].toFixed(1) + ' A94 94 0 ' + large + ' 1 ' + p1[0].toFixed(1) + ' ' + p1[1].toFixed(1));
    readout.textContent = Math.round(rpm / 10) * 10;
  }
  var IDLE = 850;
  if (tach) {
    buildTach(tach);
    if (RM) { rpm = target = IDLE; drawTach(); }
    else {
      // arranque: varredura até a zona vermelha e volta à lenta (um único momento orquestrado)
      var t0 = null;
      var ign = function (ts) {
        if (!t0) t0 = ts; var t = (ts - t0) / 1000;
        rpm = t < .9 ? 7600 * Math.sin(Math.min(1, t / .9) * Math.PI / 2) : Math.max(IDLE, 7600 - (t - .9) * 6200);
        drawTach();
        if (t < 2.2) requestAnimationFrame(ign); else { rpm = target = IDLE; idleLoop(); }
      };
      var startIgn = function () { requestAnimationFrame(ign); };
      if (root.classList.contains('race-armed')) document.addEventListener('mido:go', startIgn, { once: true }); else setTimeout(startIgn, 500);
    }
  }
  var idleOn = false, heroOff = false;
  var heroEl = $('.hero-cine');
  if (heroEl && 'IntersectionObserver' in window) new IntersectionObserver(function (es) {
    heroOff = !es[0].isIntersecting; root.classList.toggle('hero-off', heroOff);
    if (!heroOff && tach && !RM && rpm) idleLoop();
  }).observe(heroEl);
  function idleLoop() {
    if (idleOn) return; idleOn = true;
    (function loop() {
      if (!idleOn) return;
      var jitter = soundOn ? 0 : Math.sin(performance.now() / 260) * 25;
      rpm += ((target + jitter) - rpm) * (soundOn ? .35 : .08);
      drawTach();
      if (document.hidden || (heroOff && !soundOn)) { idleOn = false; return; }
      requestAnimationFrame(loop);
    })();
  }
  document.addEventListener('visibilitychange', function () { if (!document.hidden && tach && !RM) idleLoop(); });

  // ---------- som do GT-R: opcional, um só áudio, só com toque ----------
  // intro-gtr-v2.mp3 (fornecido pelo cliente, permissão de uso em audio/CREDITOS.md). ENV = volume a cada 50 ms (0–9), medido do arquivo.
  var ENV = '0100011211222221211211121232103123779126798641121112214354333212111212111111030001400011521012122122122223221332212212212133599323989763002101231223743343423433342010011021415101110000310000221101232110012122212102200100000';
  var snd = null, soundOn = false, sbtn = $('[data-sound]');
  function setSound(on) {
    soundOn = on;
    if (sbtn) sbtn.setAttribute('aria-pressed', on ? 'true' : 'false');
    if (!on) { if (snd) snd.pause(); target = IDLE; shX = shY = 0; applyMedia(); return; }
    if (!snd) {
      snd = new Audio('/audio/intro-gtr-v2.mp3'); snd.preload = 'auto'; snd.volume = .6;
      snd.addEventListener('ended', function () { setSound(false); try { snd.currentTime = 0; } catch (e) {} });
    }
    // nunca dois sons: pausa qualquer outro áudio da página
    $$('audio').forEach(function (a) { if (a !== snd) a.pause(); });
    var pr = snd.play();
    if (pr && pr.catch) pr.catch(function () { setSound(false); });
    track('sound_on');
    (function follow() {
      if (!soundOn || !snd) return;
      var lv = +(ENV.charAt(Math.floor(snd.currentTime / 0.05)) || 0) / 9;
      target = IDLE + lv * 6800;
      if (!RM && !lite) { var tt = performance.now() / 1000, a = 1.6 + lv * 4.2; shX = (Math.sin(tt * 61) + Math.sin(tt * 97) * .5) * a; shY = (Math.sin(tt * 73 + 1) + Math.sin(tt * 131) * .4) * a * .6; applyMedia(); }
      if (RM && readout) { rpm = target; drawTach(); }
      requestAnimationFrame(follow);
    })();
    if (tach && !RM) idleLoop();
  }
  if (sbtn) sbtn.addEventListener('click', function () { setSound(!soundOn); });
  document.addEventListener('visibilitychange', function () { if (document.hidden && soundOn) setSound(false); });

  // ---------- filme (caso real) ----------
  $$('[data-film]').forEach(function (wrap) {
    var film = $('.film', wrap);
    $$('[data-film-go]', wrap).forEach(function (b) {
      b.addEventListener('click', function () { var w = film.clientWidth * .8 * (+b.getAttribute('data-film-go')); film.scrollBy({ left: root.dir === 'rtl' ? -w : w, behavior: RM ? 'auto' : 'smooth' }); });
    });
  });

  // ---------- horário: destaca o dia de hoje (Europe/Madrid) ----------
  var hrs = $('[data-hours]');
  if (hrs) {
    try {
      var wd = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Madrid', weekday: 'short' }).format(new Date());
      var map = { Mon: 'lv', Tue: 'lv', Wed: 'lv', Thu: 'lv', Fri: 'lv', Sat: 'sa', Sun: 'do' };
      var row = $('[data-day="' + map[wd] + '"]', hrs); if (row) row.classList.add('today');
    } catch (e) {}
  }

  // ---------- formulário de orçamento → WhatsApp ----------
  $$('[data-quote-form]').forEach(function (f) {
    var st = $('.qstatus', f);
    function fieldErr(name, msg) {
      var el = f.elements[name], box = el && el.closest('.qf, .qcheck'), out = box && $('.err', box);
      if (el) el.setAttribute('aria-invalid', msg ? 'true' : 'false');
      if (out) out.textContent = msg || '';
      return !!msg;
    }
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = function (n) { return f.elements[n] ? String(f.elements[n].value).trim() : ''; };
      var bad = false, first = null;
      [['nombre', v('nombre').length < 2 ? 'Escribe tu nombre.' : ''],
       ['telefono', !/^[+\d][\d\s().-]{6,}$/.test(v('telefono')) ? 'Escribe un teléfono válido para poder contestarte.' : ''],
       ['servicio', !v('servicio') ? 'Elige el servicio que necesitas.' : ''],
       ['privacidad', f.elements.privacidad && !f.elements.privacidad.checked ? 'Acepta la política de privacidad para enviar la solicitud.' : '']
      ].forEach(function (c) { if (fieldErr(c[0], c[1])) { bad = true; if (!first) first = f.elements[c[0]]; } });
      if (bad) { st.className = 'qstatus bad'; st.textContent = 'Revisa los campos marcados.'; if (first) first.focus(); return; }
      var msg = 'Hola MIDO Performance, quiero pedir presupuesto.\n' +
        'Servicio: ' + v('servicio') + '\n' + (v('vehiculo') ? 'Vehículo: ' + v('vehiculo') + '\n' : '') +
        (v('mensaje') ? 'Detalles: ' + v('mensaje') + '\n' : '') + 'Nombre: ' + v('nombre') + '\nTeléfono: ' + v('telefono');
      var url = waUrl(msg), w = window.open(url, '_blank', 'noopener');
      st.className = 'qstatus ok';
      st.innerHTML = 'Solicitud lista. ' + (w ? 'Te hemos abierto WhatsApp con tus datos: pulsa «Enviar» y te contestamos en horario de taller.' : '') +
        ' Si no se abrió, <a class="link" href="' + esc(url) + '" target="_blank" rel="noopener">ábrelo aquí</a>.';
      track('quote_submit', { service: v('servicio') });
    });
    f.addEventListener('input', function (e) { if (e.target.name) fieldErr(e.target.name, ''); if (st.classList.contains('bad')) { st.textContent = ''; st.className = 'qstatus'; } });
  });

  // =====================================================================
  // /arquivos: preços reais do portal, mapa de ECU animado e demonstração
  // =====================================================================
  // Leitura pública (chave publishable, só leitura, regra "precios: leer publico" do banco).
  var SB_URL = 'https://nwejdnqbgmtgsedyvvvd.supabase.co', SB_KEY = 'sb_publishable_rq4kCeac7cdTX_iG1PyMdw_t9f3LT2l';
  var pricesP = null;
  function prices() {
    if (!pricesP) pricesP = fetch(SB_URL + '/rest/v1/cat_servicios?select=id,nombre,tipo,categoria,precio_desde,solo_opciones,antipolucion&activo=eq.true&order=orden', { headers: { apikey: SB_KEY, Authorization: 'Bearer ' + SB_KEY } })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); });
    return pricesP;
  }
  var priceEls = $$('[data-price]'), fxTable = $('[data-fx-table]');
  if (priceEls.length || fxTable || $('[data-bench]')) {
    prices().then(function (rows) {
      var by = {}; rows.forEach(function (r) { by[r.id] = r; });
      priceEls.forEach(function (el) {
        var r = by[el.getAttribute('data-price')];
        el.innerHTML = r && r.precio_desde != null ? '<small>desde</small><b>' + eur(+r.precio_desde) + '</b>' : '<small>precio</small><b>Consultar</b>';
      });
      if (fxTable) {
        var fx = rows.filter(function (r) { return r.tipo === 'funcion'; });
        fxTable.innerHTML = fx.map(function (r) {
          var p = r.precio_desde == null ? 'Consultar' : +r.precio_desde === 0 ? 'Incluido' : '+' + eur(+r.precio_desde);
          return '<div><span>' + esc(r.nombre) + (r.antipolucion ? '<em>solo competición</em>' : '') + '</span><b>' + p + '</b></div>';
        }).join('');
      }
      $$('[data-count-fx]').forEach(function (el) { el.textContent = rows.filter(function (r) { return r.tipo === 'funcion'; }).length; });
      bench(rows);
    }).catch(function () {
      priceEls.forEach(function (el) { el.innerHTML = '<small>precio</small><b>En el portal</b>'; });
      if (fxTable) fxTable.innerHTML = '<div><span>Consulta todas las funciones y sus precios en el portal.</span><b></b></div>';
      bench(null);
    });
  }

  // mapa de ECU: tabela de injeção/ignição ilustrativa a mover-se (decorativa, sem valores reais)
  var cv = $('[data-ecu-map] canvas');
  if (cv) {
    var ctx = cv.getContext('2d'), COLS = 16, ROWS = 10, tt = 0, running = true;
    var size = function () { var r = cv.getBoundingClientRect(), d = Math.min(2, window.devicePixelRatio || 1); cv.width = r.width * d; cv.height = r.height * d; };
    size(); window.addEventListener('resize', size);
    var frame = function () {
      var w = cv.width, h = cv.height, cw = w / COLS, ch = h / ROWS;
      ctx.clearRect(0, 0, w, h);
      for (var y = 0; y < ROWS; y++) for (var x = 0; x < COLS; x++) {
        var base = (x / COLS) * .65 + (1 - y / ROWS) * .35, wave = Math.sin(x * .55 + tt) * .08 + Math.cos(y * .8 - tt * .7) * .06, v = Math.max(0, Math.min(1, base + wave));
        var hue = 210 - v * 210, light = 22 + v * 30;                // azul → verde → amarelo → vermelho
        ctx.fillStyle = 'hsl(' + hue + ',62%,' + (light - 6) + '%)';
        ctx.fillRect(x * cw + 1, y * ch + 1, cw - 2, ch - 2);
      }
      // cursor de edição que percorre a tabela
      var cx = Math.floor((Math.sin(tt * .5) * .5 + .5) * COLS), cyy = Math.floor((Math.cos(tt * .37) * .5 + .5) * ROWS);
      ctx.strokeStyle = '#fff'; ctx.lineWidth = Math.max(1, w / 400); ctx.strokeRect(cx * cw + 1, cyy * ch + 1, cw - 2, ch - 2);
      tt += .012;
      if (running && !RM) requestAnimationFrame(frame);
    };
    frame();
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { running = es[0].isIntersecting; if (running && !RM) requestAnimationFrame(frame); }).observe(cv);
  }

  // fluxo do arquivo no herói: lectura → análisis → mapa → checksum → listo
  var pipe = $$('[data-pipeline] li');
  if (pipe.length) {
    var pi = 0;
    var stepPipe = function () { pipe.forEach(function (li, i) { li.classList.toggle('on', i <= pi); }); pi = (pi + 1) % (pipe.length + 1); };
    if (RM) pipe.forEach(function (li) { li.classList.add('on'); }); else { stepPipe(); setInterval(stepPipe, 900); }
  }

  // ---------- demonstração do portal (não cria pedidos nem cobranças) ----------
  function bench(rows) {
    var b = $('[data-bench]'); if (!b) return;
    var selM = $('#d-marca', b), selMo = $('#d-modelo', b), selG = $('#d-gen', b), selE = $('#d-motor', b);
    var stagesEl = $('[data-stages]', b), chips = $('[data-chips]', b), sumV = $('[data-sum-veh]', b), sumL = $('[data-sum-lines]', b), sumT = $('[data-sum-total]', b), go = $('[data-go-portal]', b);
    var FALLBACK = [{ id: 'stage1', nombre: 'Stage 1 (coche)', precio_desde: null }, { id: 'stage2', nombre: 'Stage 2 (coche)', precio_desde: null }, { id: 'stage3', nombre: 'Stage 3 (coche)', precio_desde: null }];
    var by = {}; (rows || []).forEach(function (r) { by[r.id] = r; });
    var STG = ['stage1', 'stage2', 'stage3'].map(function (id) { return by[id] || FALLBACK.filter(function (f) { return f.id === id; })[0]; });
    var POP = ['DTC off', 'Start / Stop off', 'Pop & Bang / Crackle map', 'Launch Control', 'Hard Cut limiter', 'Vmax off', 'Cold Start', 'Exhaust Flaps', 'DPF off', 'EGR off', 'AdBlue off'];
    var FX = (rows || []).filter(function (r) { return r.tipo === 'funcion' && POP.indexOf(r.nombre) > -1; });
    var S = { stage: 'stage1', fx: [], brand: null, model: null, gen: null, eng: null };
    var DESC = { stage1: 'Software a medida con el hardware de serie', stage2: 'Para coches con piezas de alto rendimiento', stage3: 'Mejoras mecánicas completas' };
    stagesEl.innerHTML = STG.map(function (s) {
      return '<label class="stage-opt' + (s.id === S.stage ? ' on' : '') + '"><input type="radio" name="d-stage" value="' + s.id + '"' + (s.id === S.stage ? ' checked' : '') + '><span><b>' + esc(s.nombre.replace(' (coche)', '')) + '</b><small>' + DESC[s.id] + '</small></span>' +
        '<span class="pz">' + (s.precio_desde != null ? 'desde ' + eur(+s.precio_desde) : 'en el portal') + '</span></label>';
    }).join('');
    chips.innerHTML = FX.length ? FX.map(function (r) {
      return '<button type="button" class="fx-chip" aria-pressed="false" data-fx="' + esc(r.id) + '">' + esc(r.nombre) + ' <small>' + (+r.precio_desde ? '+' + eur(+r.precio_desde) : 'incluido') + (r.antipolucion ? ' · solo competición' : '') + '</small></button>';
    }).join('') + (FX.some(function (r) { return r.antipolucion; }) ? '<p class="sum-note">Las funciones antipolución son solo para competición o uso fuera de vías públicas.</p>' : '') : '<p class="sum-note">Las funciones y sus precios se eligen en el portal.</p>';
    stagesEl.addEventListener('change', function (e) { S.stage = e.target.value; $$('.stage-opt', stagesEl).forEach(function (l) { l.classList.toggle('on', l.querySelector('input').checked); }); sum(); });
    chips.addEventListener('click', function (e) {
      var c = e.target.closest('[data-fx]'); if (!c) return;
      var id = c.getAttribute('data-fx'), on = c.getAttribute('aria-pressed') !== 'true';
      c.setAttribute('aria-pressed', on ? 'true' : 'false');
      S.fx = S.fx.filter(function (x) { return x !== id; }); if (on) S.fx.push(id);
      sum();
    });

    // catálogo do próprio site (data/catalog): as mesmas marcas e motores do configurador
    var opt = function (v, t) { return '<option value="' + esc(v) + '">' + esc(t) + '</option>'; };
    var reset = function (sel, ph) { sel.innerHTML = opt('', ph); sel.disabled = true; };
    fetch('/data/catalog/index.json').then(function (r) { return r.json(); }).then(function (ix) {
      var slugs = (ix.types && ix.types.coche || Object.keys(ix.brands)).slice().sort(function (a, c) { return ix.brands[a].name.localeCompare(ix.brands[c].name, 'es'); });
      selM.innerHTML = opt('', 'Elige la marca') + slugs.map(function (s) { return opt(s, ix.brands[s].name); }).join(''); selM.disabled = false;
    }).catch(function () { selM.innerHTML = opt('', 'Catálogo no disponible'); });
    selM.addEventListener('change', function () {
      S.brand = null; S.model = S.gen = S.eng = null; reset(selMo, 'Elige el modelo'); reset(selG, 'Generación'); reset(selE, 'Motor'); sum();
      if (!selM.value) return;
      selMo.innerHTML = opt('', 'Cargando…');
      fetch('/data/catalog/' + encodeURIComponent(selM.value) + '.json').then(function (r) { return r.json(); }).then(function (bj) {
        S.brand = bj; selMo.innerHTML = opt('', 'Elige el modelo') + bj.models.map(function (m, i) { return opt(i, m.name); }).join(''); selMo.disabled = false; sum();
      }).catch(function () { selMo.innerHTML = opt('', 'No se pudo cargar'); });
    });
    selMo.addEventListener('change', function () {
      S.model = S.brand && S.brand.models[+selMo.value] || null; S.gen = S.eng = null; reset(selG, 'Generación'); reset(selE, 'Motor');
      if (S.model) { selG.innerHTML = opt('', 'Elige la generación') + S.model.periods.map(function (p, i) { return opt(i, /^all$/i.test(p.label) ? 'Todas las versiones' : p.label.replace(/ (\d{4}|\.\.\.)$/, ' – $1')); }).join(''); selG.disabled = false; }
      sum();
    });
    selG.addEventListener('change', function () {
      S.gen = S.model && S.model.periods[+selG.value] || null; S.eng = null; reset(selE, 'Motor');
      if (S.gen) {
        var list = []; S.gen.fuels.forEach(function (f) { f.engines.forEach(function (e) { list.push(e); }); });
        S.engines = list;
        selE.innerHTML = opt('', 'Elige el motor') + list.map(function (e, i) { return opt(i, e.name.replace(/(\d+)cv\b/i, '$1 CV') + (e.cv && e.name.indexOf(String(e.cv)) < 0 ? ' · ' + e.cv + ' CV' : '')); }).join(''); selE.disabled = false;
      }
      sum();
    });
    selE.addEventListener('change', function () { S.eng = S.engines && S.engines[+selE.value] || null; sum(); if (S.eng) track('demo_vehicle'); });

    function sum() {
      var st = STG.filter(function (s) { return s.id === S.stage; })[0];
      var fx = FX.filter(function (r) { return S.fx.indexOf(r.id) > -1; });
      var veh = S.brand ? S.brand.name + (S.model ? ' ' + S.model.name : '') : '';
      sumV.innerHTML = veh ? esc(veh) + '<small>' + esc([S.gen && !/^all$/i.test(S.gen.label) ? S.gen.label : '', S.eng ? S.eng.name.replace(/(\d+)cv\b/i, '$1 CV') : ''].filter(Boolean).join(' · ') || 'Completa el vehículo') + '</small>' : 'Vehículo sin elegir<small>Elige marca, modelo, generación y motor</small>';
      var total = 0, consultar = false, lines = [];
      if (st) { if (st.precio_desde == null) consultar = true; else total += +st.precio_desde; lines.push([st.nombre, st.precio_desde == null ? 'en el portal' : 'desde ' + eur(+st.precio_desde)]); }
      fx.forEach(function (r) { total += +r.precio_desde || 0; lines.push([r.nombre, +r.precio_desde ? '+' + eur(+r.precio_desde) : 'incluido']); });
      sumL.innerHTML = lines.map(function (l) { return '<li><span>' + esc(l[0]) + '</span><b>' + esc(l[1]) + '</b></li>'; }).join('');
      sumT.textContent = consultar ? 'En el portal' : 'desde ' + eur(total);
      // o portal recebe a escolha: cadastro (ou login) e depois «Nuevo pedido» já marcado
      var q = '/?registro=1&tuning=' + encodeURIComponent(S.stage) + (fx.length ? '&opciones=' + encodeURIComponent(fx.map(function (r) { return r.nombre; }).join('|')) : '');
      go.href = PORTAL + q;
    }
    sum();
  }
})();
