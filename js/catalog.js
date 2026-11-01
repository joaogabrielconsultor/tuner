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

// ===== BUSCADOR DE VEÍCULO =====
(function () {
  var root = document.querySelector('[data-finder]');
  if (!root) return;

  var q = root.querySelector('.finder-search input');
  var results = root.querySelector('.finder-results');
  var goSearch = root.querySelector('.finder-search .go');
  var pills = root.querySelectorAll('.type-pill');
  var selBrand = root.querySelector('[name=brand]');
  var selModel = root.querySelector('[name=model]');
  var selYear = root.querySelector('[name=year]');
  var selEngine = root.querySelector('[name=engine]');
  var go = root.querySelector('.finder-go');

  var type = root.getAttribute('data-type') || 'coche';
  var index = null;
  var brand = null;

  function reset(sel, label) {
    sel.innerHTML = '<option value="">' + label + '</option>';
    sel.disabled = true;
  }
  function option(value, text) {
    var o = document.createElement('option');
    o.value = value; o.textContent = text;
    return o;
  }

  function fillBrands() {
    reset(selBrand, 'Marca');
    reset(selModel, 'Modelo');
    reset(selYear, 'Año');
    reset(selEngine, 'Motor');
    brand = null;
    if (!index) return;
    var slugs = (index.types[type] || []).slice().sort(function (a, b) {
      return index.brands[a].name.localeCompare(index.brands[b].name, 'es');
    });
    slugs.forEach(function (s) { selBrand.appendChild(option(s, index.brands[s].name)); });
    selBrand.disabled = false;
  }

  pills.forEach(function (p) {
    p.addEventListener('click', function () {
      pills.forEach(function (x) { x.setAttribute('aria-pressed', x === p ? 'true' : 'false'); });
      type = p.getAttribute('data-type');
      fillBrands();
    });
  });

  selBrand.addEventListener('change', function () {
    reset(selModel, 'Modelo'); reset(selYear, 'Año'); reset(selEngine, 'Motor');
    brand = null;
    var slug = selBrand.value;
    if (!slug) return;
    selModel.innerHTML = '<option value="">Cargando…</option>';
    CP.catalog.brand(slug).then(function (b) {
      if (selBrand.value !== slug) return;
      brand = b;
      reset(selModel, 'Modelo');
      (b.models || []).forEach(function (m) {
        var n = CP.catalog.modelName(m);
        selModel.appendChild(option(n, n));
      });
      selModel.disabled = !(b.models && b.models.length);
    }).catch(function () {
      reset(selModel, 'Modelo');
    });
  });

  function currentModel() {
    if (!brand) return null;
    return (brand.models || []).find(function (m) { return CP.catalog.modelName(m) === selModel.value; }) || null;
  }
  function currentPeriod() {
    var m = currentModel();
    if (!m || typeof m === 'string' || !m.periods) return null;
    return m.periods.find(function (p) { return p.id === selYear.value; }) || null;
  }

  selModel.addEventListener('change', function () {
    reset(selYear, 'Año'); reset(selEngine, 'Motor');
    var m = currentModel();
    if (!m || typeof m === 'string' || !m.periods) return;
    m.periods.forEach(function (p) { selYear.appendChild(option(p.id, p.label)); });
    selYear.disabled = !m.periods.length;
  });

  selYear.addEventListener('change', function () {
    reset(selEngine, 'Motor');
    var p = currentPeriod();
    if (!p || !p.fuels) return;
    p.fuels.forEach(function (f) {
      var g = document.createElement('optgroup');
      g.label = CP.fuelLabel(f.type);
      f.engines.forEach(function (e, i) {
        var o = option(e.name + '|' + e.cv, e.name + (String(e.name).indexOf(e.cv + 'cv') === -1 ? ' · ' + e.cv + ' cv' : ''));
        g.appendChild(o);
      });
      selEngine.appendChild(g);
    });
    selEngine.disabled = false;
  });

  go.addEventListener('click', function () {
    var slug = selBrand.value;
    if (!slug) { selBrand.focus(); return; }
    var url = 'marca.html?marca=' + encodeURIComponent(slug);
    if (selModel.value) url += '&modelo=' + encodeURIComponent(selModel.value);
    if (selModel.value && selYear.value) url += '&periodo=' + encodeURIComponent(selYear.value);
    if (selModel.value && selYear.value && selEngine.value) {
      var parts = selEngine.value.split('|');
      url = 'motor.html?marca=' + encodeURIComponent(slug) +
            '&modelo=' + encodeURIComponent(selModel.value) +
            '&periodo=' + encodeURIComponent(selYear.value) +
            '&motor=' + encodeURIComponent(parts[0]) + '&cv=' + encodeURIComponent(parts[1]);
    }
    location.href = url;
  });

  // ----- Busca por texto (marca ou modelo) -----
  function norm(s) { return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim(); }
  var hl = -1;

  function search(text) {
    var t = norm(text);
    if (!t || !index) return [];
    var out = [];
    Object.keys(index.brands).forEach(function (slug) {
      var b = index.brands[slug];
      var bn = norm(b.name);
      if (bn.indexOf(t) === 0 || (' ' + bn).indexOf(' ' + t) >= 0) {
        out.push({ score: bn === t ? 0 : 1, label: b.name, sub: 'Marca', logo: b.logo, href: 'marca.html?marca=' + slug });
      }
      b.models.forEach(function (m) {
        var full = norm(b.name + ' ' + m);
        var mn = norm(m);
        if (mn.indexOf(t) === 0 || full.indexOf(t) === 0 || (t.length > 1 && (' ' + full).indexOf(' ' + t) >= 0)) {
          out.push({ score: mn === t || full === t ? 2 : 3, label: b.name + ' ' + m, sub: 'Modelo', logo: b.logo,
            href: 'marca.html?marca=' + slug + '&modelo=' + encodeURIComponent(m) });
        }
      });
    });
    out.sort(function (a, b) { return a.score - b.score || a.label.localeCompare(b.label, 'es'); });
    return out.slice(0, 8);
  }

  function render(list) {
    hl = -1;
    if (!q.value.trim()) { results.hidden = true; q.setAttribute('aria-expanded', 'false'); return; }
    if (!list.length) {
      results.innerHTML = '<li class="empty">No encontramos ese vehículo. Prueba con la marca, o <a href="contacto.html" style="text-decoration:underline">pregúntanos</a>.</li>';
    } else {
      results.innerHTML = list.map(function (r, i) {
        return '<li><a href="' + r.href + '" id="fr-' + i + '" role="option">' +
          (r.logo ? '<img src="' + CP.esc(r.logo) + '" alt="" loading="lazy">' : '') +
          '<span>' + CP.esc(r.label) + '</span><small>' + r.sub + '</small></a></li>';
      }).join('');
    }
    results.hidden = false;
    q.setAttribute('aria-expanded', 'true');
  }

  q.addEventListener('focus', function () { if (!index) CP.catalog.index(); });
  q.addEventListener('input', function () {
    CP.catalog.index().then(function (ix) { index = ix; render(search(q.value)); });
  });
  q.addEventListener('keydown', function (e) {
    var links = results.querySelectorAll('a');
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      if (!links.length) return;
      e.preventDefault();
      hl = (hl + (e.key === 'ArrowDown' ? 1 : -1) + links.length) % links.length;
      links.forEach(function (a, i) { a.classList.toggle('hl', i === hl); });
      q.setAttribute('aria-activedescendant', links[hl].id);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      var target = links[hl >= 0 ? hl : 0];
      if (target) location.href = target.getAttribute('href');
    } else if (e.key === 'Escape') {
      results.hidden = true;
    }
  });
  goSearch.addEventListener('click', function () {
    var first = results.querySelector('a');
    if (first && !results.hidden) location.href = first.getAttribute('href');
    else q.focus();
  });
  document.addEventListener('click', function (e) {
    if (!root.querySelector('.finder-search').contains(e.target)) results.hidden = true;
  });
  // Fecha as sugestões quando o foco sai da busca (ex.: ao usar os seletores com o teclado)
  root.querySelector('.finder-search').addEventListener('focusout', function (e) {
    if (!e.relatedTarget || !root.querySelector('.finder-search').contains(e.relatedTarget)) {
      setTimeout(function () { results.hidden = true; }, 150);
    }
  });

  CP.catalog.index().then(function (ix) { index = ix; fillBrands(); });
})();
