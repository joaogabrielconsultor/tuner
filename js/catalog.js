// Carbon Performance — acesso ao catálogo e buscador de veículo
//
// Os dados ficam em data/catalog/ (gerados a partir de js/brands.js por tools/build-catalog.js).
// Cada página baixa só a marca de que precisa, em vez do catálogo inteiro.

var CP = window.CP || {};

CP.fuelLabel = function (t) {
  var map = {
    'Gasoline': 'Gasolina',
    'Diesel': 'Diésel',
    'Petrol Micro Hybrid': 'Gasolina micro-híbrido',
    'Petrol Micro Hybrid 48V': 'Gasolina micro-híbrido 48V',
    'Petrol Hybrid': 'Gasolina híbrido',
    'Diesel Micro Hybrid': 'Diésel micro-híbrido',
    'Electric': 'Eléctrico',
    'Hybrid': 'Híbrido',
    'Hydrogen': 'Hidrógeno'
  };
  return map[t] || t || '';
};

CP.esc = function (str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
};

CP.catalog = (function () {
  var indexPromise = null;
  var brandCache = {};

  // Marcas editadas no editor de catálogo (custom.html) ficam no navegador de quem editou
  function customOverride(slug) {
    try {
      var raw = localStorage.getItem('brp_brands_custom');
      if (!raw) return null;
      var c = JSON.parse(raw);
      return c && c[slug] ? Object.assign({ slug: slug }, c[slug]) : null;
    } catch (e) { return null; }
  }

  function getJSON(url) {
    return fetch(url, { cache: 'force-cache' }).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    });
  }

  return {
    index: function () {
      if (!indexPromise) indexPromise = getJSON('data/catalog/index.json');
      return indexPromise;
    },
    brand: function (slug) {
      if (!slug || !/^[a-z0-9-]+$/.test(slug)) return Promise.reject(new Error('Marca inválida'));
      var custom = customOverride(slug);
      if (custom) return Promise.resolve(custom);
      if (!brandCache[slug]) {
        brandCache[slug] = getJSON('data/catalog/' + slug + '.json').catch(function (e) {
          delete brandCache[slug];
          throw e;
        });
      }
      return brandCache[slug];
    },
    modelName: function (m) { return typeof m === 'string' ? m : (m && m.name) || ''; }
  };
})();

// ===== CONFIGURADOR DE VEÍCULO (fase por fase) =====
// Tipo → Marca → Modelo → Año → Motor. Cada fase abre um painel com as opções
// embaixo dos campos; ao escolher o motor, vai para a página de resultado.
CP.TYPE_PAGE = { 'coche': 'vehiculos.html', 'moto': 'motos.html', 'moto-agua': 'moto-agua.html', 'lancha': 'lancha.html' };
CP.TYPE_LABEL = { 'coche': 'Vehículo', 'moto': 'Moto / Quad', 'moto-agua': 'Moto de agua', 'lancha': 'Lancha motora' };
CP.periodLabel = function (p) { return String(p.label).replace(/(\d{4}) (\d{4}|\.\.\.)\s*$/, '$1 > $2'); };
CP.engineLabel = function (e) {
  var n = String(e.name);
  return n.toLowerCase().indexOf(e.cv + 'cv') >= 0 ? e.cv + ' CV' : n + ' (' + e.cv + ' CV)';
};

(function () {
  var root = document.querySelector('[data-finder]');
  if (!root) return;

  var q = root.querySelector('.finder-search input');
  var results = root.querySelector('.finder-results');
  var goSearch = root.querySelector('.finder-search .go');
  var pills = root.querySelectorAll('.type-pill');
  var fields = {};
  root.querySelectorAll('.step-field').forEach(function (f) { fields[f.getAttribute('data-step')] = f; });
  var panel = root.querySelector('.finder-panel');
  var grid = panel.querySelector('.panel-grid');
  var ARROW_DOWN = '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>';
  var esc = CP.esc;

  var LABELS = { brand: 'Marca', model: 'Modelo', year: 'Año', engine: 'Motor' };
  var FILTER = { brand: 'Escribe una marca', model: 'Escribe un modelo' };
  var S = { type: root.getAttribute('data-type') || null, slug: null, brand: null, model: null, period: null, open: null };
  var index = null;

  // ---------- estado visual dos campos ----------
  function modelName(m) { return CP.catalog.modelName(m); }
  function valueOf(step) {
    if (step === 'brand') return S.brand ? S.brand.name : '';
    if (step === 'model') return S.model ? modelName(S.model) : '';
    if (step === 'year') return S.period ? CP.periodLabel(S.period) : '';
    return '';
  }
  function enabled(step) {
    if (step === 'brand') return !!S.type;
    if (step === 'model') return !!S.brand;
    if (step === 'year') return !!S.model;
    if (step === 'engine') return !!S.period;
  }
  function paint() {
    pills.forEach(function (p) { p.setAttribute('aria-pressed', p.getAttribute('data-type') === S.type ? 'true' : 'false'); });
    Object.keys(fields).forEach(function (step) {
      var f = fields[step];
      var btn = f.querySelector('.step-btn');
      var val = valueOf(step);
      f.classList.toggle('is-open', S.open === step);
      f.classList.toggle('has-value', !!val);
      btn.disabled = !enabled(step);
      btn.setAttribute('aria-expanded', S.open === step ? 'true' : 'false');
      btn.querySelector('.lbl').textContent = val || LABELS[step];
      var input = f.querySelector('.step-input');
      if (input) {
        var showInput = S.open === step;
        input.hidden = !showInput;
        btn.hidden = showInput;
        if (!showInput) input.value = '';
      }
    });
    // migalhas na barra de busca
    var crumbs = [];
    if (S.type) crumbs.push(CP.TYPE_LABEL[S.type]);
    if (S.brand) crumbs.push(S.brand.name);
    if (S.model) crumbs.push(modelName(S.model));
    if (S.period) crumbs.push(CP.periodLabel(S.period));
    q.placeholder = crumbs.length ? crumbs.join('  ›  ') : 'Encuentra tu vehículo';
    root.classList.toggle('has-crumbs', crumbs.length > 0);
  }

  // ---------- painel de opções ----------
  function tile(html, onClick, cls, title) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'tile' + (cls ? ' ' + cls : '');
    b.innerHTML = html;
    if (title) b.title = title;
    b.addEventListener('click', onClick);
    return b;
  }
  function msg(text) { grid.innerHTML = '<p class="panel-msg">' + text + '</p>'; }

  function render(step, filter) {
    grid.innerHTML = '';
    grid.className = 'panel-grid step-' + step;
    var f = (filter || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    var match = function (t) { return !f || String(t).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').indexOf(f) >= 0; };

    if (step === 'brand') {
      if (!index) { msg('Cargando…'); return; }
      var slugs = (index.types[S.type] || []).slice().sort(function (a, b) { return index.brands[a].name.localeCompare(index.brands[b].name, 'es'); });
      slugs.filter(function (s) { return match(index.brands[s].name); }).forEach(function (s) {
        var b = index.brands[s];
        grid.appendChild(tile((b.logo ? '<img src="' + esc(b.logo) + '" alt="" loading="lazy">' : '') + '<span>' + esc(b.name) + '</span>', function () { pickBrand(s); }, 'brand'));
      });
    } else if (step === 'model') {
      (S.brand.models || []).filter(function (m) { return match(modelName(m)); }).forEach(function (m) {
        grid.appendChild(tile('<span>' + esc(modelName(m)) + '</span>', function () { pickModel(m); }));
      });
    } else if (step === 'year') {
      var periods = (typeof S.model === 'object' && S.model.periods) || [];
      periods.forEach(function (p) { grid.appendChild(tile('<span>' + esc(CP.periodLabel(p)) + '</span>', function () { pickPeriod(p); })); });
      if (!periods.length) noData();
    } else if (step === 'engine') {
      var count = 0;
      (S.period.fuels || []).forEach(function (fuel) {
        fuel.engines.forEach(function (e) {
          count++;
          grid.appendChild(tile('<span>' + esc(CP.engineLabel(e)) + '</span>', function () { pickEngine(e); }, '', CP.fuelLabel(fuel.type)));
        });
      });
      if (!count) noData();
    }
    if (!grid.children.length && filter) msg('No encontramos resultados para «' + esc(filter) + '».');
  }
  function noData() {
    grid.innerHTML = '<div class="panel-msg">Aún no tenemos los datos de este vehículo publicados. <a href="contacto.html">Pregúntanos</a> y te decimos qué podemos hacer.</div>';
  }

  function open(step) {
    if (!enabled(step)) return;
    S.open = step;
    paint();
    render(step);
    panel.hidden = false;
    var input = fields[step].querySelector('.step-input');
    if (input) setTimeout(function () { input.focus(); }, 0);
  }
  function close() { S.open = null; panel.hidden = true; paint(); }

  // ---------- escolhas ----------
  function pickType(t) {
    S.type = t; S.slug = null; S.brand = null; S.model = null; S.period = null;
    CP.catalog.index().then(function (ix) { index = ix; if (S.open === 'brand') render('brand'); });
    open('brand');
  }
  function pickBrand(slug, then) {
    S.slug = slug; S.model = null; S.period = null;
    S.brand = { name: index ? index.brands[slug].name : slug, models: [] };
    S.open = 'model'; paint(); msg('Cargando…'); panel.hidden = false;
    return CP.catalog.brand(slug).then(function (b) {
      if (S.slug !== slug) return;
      S.brand = b;
      if (then) return then();
      open('model');
    }).catch(function () { msg('No se pudo cargar esta marca. Inténtalo de nuevo.'); });
  }
  function pickModel(m) { S.model = m; S.period = null; open('year'); }
  function pickPeriod(p) { S.period = p; open('engine'); }
  function pickEngine(e) {
    location.href = 'motor.html?marca=' + encodeURIComponent(S.slug) +
      '&modelo=' + encodeURIComponent(modelName(S.model)) +
      '&periodo=' + encodeURIComponent(S.period.id) +
      '&motor=' + encodeURIComponent(e.name) + '&cv=' + e.cv;
  }

  pills.forEach(function (p) { p.addEventListener('click', function () { pickType(p.getAttribute('data-type')); }); });
  Object.keys(fields).forEach(function (step) {
    var f = fields[step];
    f.querySelector('.step-btn').addEventListener('click', function () {
      if (S.open === step) close(); else open(step);
    });
    var input = f.querySelector('.step-input');
    if (input) input.addEventListener('input', function () { render(step, input.value.trim()); });
  });
  document.addEventListener('click', function (e) {
    // composedPath guarda o caminho do clique mesmo se o botão já foi redesenhado
    var inside = (e.composedPath ? e.composedPath() : [e.target]).indexOf(root) >= 0;
    if (!inside) { if (S.open) close(); results.hidden = true; }
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && S.open) close(); });

  // ---------- busca por texto (marca ou modelo) ----------
  function norm(s) { return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim(); }
  var hl = -1;
  function search(text) {
    var t = norm(text);
    if (!t || !index) return [];
    var out = [];
    Object.keys(index.brands).forEach(function (slug) {
      var b = index.brands[slug];
      var bn = norm(b.name);
      if (bn.indexOf(t) === 0 || (' ' + bn).indexOf(' ' + t) >= 0) out.push({ score: bn === t ? 0 : 1, label: b.name, sub: 'Marca', logo: b.logo, slug: slug });
      b.models.forEach(function (m) {
        var full = norm(b.name + ' ' + m), mn = norm(m);
        if (mn.indexOf(t) === 0 || full.indexOf(t) === 0 || (t.length > 1 && (' ' + full).indexOf(' ' + t) >= 0)) {
          out.push({ score: mn === t || full === t ? 2 : 3, label: b.name + ' ' + m, sub: 'Modelo', logo: b.logo, slug: slug, model: m });
        }
      });
    });
    out.sort(function (a, b) { return a.score - b.score || a.label.localeCompare(b.label, 'es'); });
    return out.slice(0, 8);
  }
  function choose(r) {
    results.hidden = true;
    q.value = '';
    S.type = index.brands[r.slug].type;
    pickBrand(r.slug, r.model ? function () {
      var m = (S.brand.models || []).find(function (x) { return modelName(x) === r.model; });
      if (m) pickModel(m); else open('model');
    } : null);
  }
  var current = [];
  function renderResults(list) {
    current = list; hl = -1;
    if (!q.value.trim()) { results.hidden = true; q.setAttribute('aria-expanded', 'false'); return; }
    if (!list.length) {
      results.innerHTML = '<li class="empty">No encontramos ese vehículo. Prueba con la marca, o <a href="contacto.html" style="text-decoration:underline">pregúntanos</a>.</li>';
    } else {
      results.innerHTML = list.map(function (r, i) {
        return '<li><a href="#" data-i="' + i + '" id="fr-' + i + '" role="option">' +
          (r.logo ? '<img src="' + esc(r.logo) + '" alt="" loading="lazy">' : '') +
          '<span>' + esc(r.label) + '</span><small>' + r.sub + '</small></a></li>';
      }).join('');
      results.querySelectorAll('a[data-i]').forEach(function (a) {
        a.addEventListener('click', function (e) { e.preventDefault(); choose(current[+a.getAttribute('data-i')]); });
      });
    }
    results.hidden = false;
    q.setAttribute('aria-expanded', 'true');
  }
  q.addEventListener('focus', function () { if (S.open) close(); CP.catalog.index().then(function (ix) { index = ix; }); });
  q.addEventListener('input', function () { CP.catalog.index().then(function (ix) { index = ix; renderResults(search(q.value)); }); });
  q.addEventListener('keydown', function (e) {
    var links = results.querySelectorAll('a[data-i]');
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      if (!links.length) return;
      e.preventDefault();
      hl = (hl + (e.key === 'ArrowDown' ? 1 : -1) + links.length) % links.length;
      links.forEach(function (a, i) { a.classList.toggle('hl', i === hl); });
      q.setAttribute('aria-activedescendant', links[hl].id);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (current.length) choose(current[hl >= 0 ? hl : 0]);
    } else if (e.key === 'Escape') { results.hidden = true; }
  });
  goSearch.addEventListener('click', function () {
    if (q.value.trim() && current.length) choose(current[0]);
    else if (S.type) open(S.brand ? (S.model ? (S.period ? 'engine' : 'year') : 'model') : 'brand');
    else q.focus();
  });

  // ---------- estado inicial (ex.: voltando da página do motor) ----------
  var params = new URLSearchParams(location.search);
  CP.catalog.index().then(function (ix) {
    index = ix;
    var slug = params.get('marca');
    if (slug && ix.brands[slug]) {
      S.type = ix.brands[slug].type;
      pickBrand(slug, function () {
        var m = (S.brand.models || []).find(function (x) { return modelName(x) === params.get('modelo'); });
        if (!m) return open('model');
        S.model = m;
        var p = (typeof m === 'object' && m.periods || []).find(function (x) { return x.id === params.get('periodo'); });
        if (!p) return open('year');
        S.period = p;
        open('engine');
      });
      root.scrollIntoView({ block: 'center' });
    } else {
      paint();
    }
  });
  paint();
})();
