// Página de marca: escolha de modelo → ano → motor
// URL: marca.html?marca=<slug>[&modelo=<nome>][&periodo=<id>]
document.addEventListener('DOMContentLoaded', function () {
  var params = new URLSearchParams(window.location.search);
  var marcaSlug = params.get('marca');
  var modeloParam = params.get('modelo');
  var periodoParam = params.get('periodo');
  var esc = CP.esc;
  var ARROW = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M6 3l5 5-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var TYPE_PAGE = { 'coche': ['vehiculos.html', 'Vehículos'], 'moto': ['motos.html', 'Motos y quads'], 'moto-agua': ['moto-agua.html', 'Motos de agua'], 'lancha': ['lancha.html', 'Lanchas motoras'] };

  if (!marcaSlug) { window.location.href = 'vehiculos.html'; return; }

  var picker = document.getElementById('picker');

  Promise.all([CP.catalog.brand(marcaSlug), CP.catalog.index().catch(function () { return null; })])
    .then(function (res) { render(res[0], res[1]); })
    .catch(function () { window.location.href = 'vehiculos.html'; });

  function periodLabel(p) {
    return String(p.label).replace(/(\d{4}) (\d{4}|\.\.\.)\s*$/, '$1 – $2');
  }

  function render(brand, index) {
    var base = 'marca.html?marca=' + encodeURIComponent(marcaSlug);
    var model = modeloParam ? findModel(brand, modeloParam) : null;
    var period = model && periodoParam ? findPeriod(model, periodoParam) : null;
    var modelUrl = base + '&modelo=' + encodeURIComponent(modeloParam || '');
    var type = index && index.brands[marcaSlug] ? index.brands[marcaSlug].type : 'coche';
    var tp = TYPE_PAGE[type] || TYPE_PAGE.coche;

    // Título da aba
    var parts = [brand.name, modeloParam, period ? periodLabel(period) : ''].filter(Boolean).join(' ');
    document.title = parts + ' - Carbon Performance - Reprogramación de centralitas';

    // Trilha
    var crumbs = [['Inicio', 'index.html'], [tp[1], tp[0]], [brand.name, base]];
    if (modeloParam) crumbs.push([modeloParam, modelUrl]);
    if (period) crumbs.push([periodLabel(period), '']);
    document.getElementById('crumbs').innerHTML = crumbs.map(function (c, i) {
      return i === crumbs.length - 1
        ? '<li><span aria-current="page">' + esc(c[0]) + '</span></li>'
        : '<li><a href="' + c[1] + '">' + esc(c[0]) + '</a></li>';
    }).join('');

    // Logo e título
    var logo = document.getElementById('brand-logo');
    if (brand.logo) { logo.innerHTML = '<img src="' + esc(brand.logo) + '" alt="' + esc(brand.name) + '">'; logo.hidden = false; }
    document.getElementById('page-title').textContent = modeloParam ? brand.name + ' ' + modeloParam : brand.name;

    // Etapas
    var stepNow = period ? 4 : (modeloParam ? 3 : 2);
    var steps = [
      ['Marca', 'vehiculos.html', brand.name],
      ['Modelo', base, modeloParam],
      ['Año', modelUrl, period ? periodLabel(period) : ''],
      ['Motor', '', '']
    ];
    document.getElementById('steps').innerHTML = steps.map(function (s, i) {
      var n = i + 1;
      var cls = n < stepNow ? 'done' : (n === stepNow ? 'now' : '');
      var text = s[2] ? s[2] : s[0];
      if (n < stepNow && s[1]) return '<a class="step ' + cls + '" href="' + s[1] + '" title="Cambiar ' + s[0].toLowerCase() + '"><b>' + n + '</b>' + esc(text) + '</a>';
      return '<span class="step ' + cls + '"' + (n === stepNow ? ' aria-current="step"' : '') + '><b>' + n + '</b>' + esc(text) + '</span>';
    }).join('');

    // Conteúdo
    if (period) {
      picker.innerHTML = head('Selecciona el tipo de motor', modelUrl, 'Cambiar año') + engines(brand, model, period);
    } else if (model) {
      picker.innerHTML = head('Selecciona el año de fabricación', base, 'Cambiar modelo') + years(model);
    } else {
      picker.innerHTML = head('Selecciona un modelo', tp[0], 'Otras marcas') + models(brand);
    }
  }

  function head(title, backHref, backLabel) {
    return '<div class="pick-head"><h2>' + title + '</h2>' +
      '<a class="btn btn-line btn-plain btn-sm" href="' + backHref + '">' + backLabel + '</a></div>';
  }

  function contactHint() {
    return '<div class="contact-hint"><h3 style="font-size:22px;margin-bottom:8px">Contacta para más información</h3>' +
      '<p>Aún no tenemos los datos de este vehículo publicados. Pregúntanos y te decimos qué podemos hacer.</p>' +
      '<a class="btn btn-red" href="contacto.html">Solicita presupuesto <span class="ico">' + ARROW + '</span></a></div>';
  }

  function models(brand) {
    if (!brand.models || !brand.models.length) return contactHint();
    return '<div class="chip-grid">' + brand.models.map(function (m) {
      var name = CP.catalog.modelName(m);
      var url = 'marca.html?marca=' + encodeURIComponent(marcaSlug) + '&modelo=' + encodeURIComponent(name);
      return '<a class="chip" href="' + url + '" title="' + esc(brand.name + ' ' + name) + '">' + esc(name) + ARROW + '</a>';
    }).join('') + '</div>';
  }

  function years(model) {
    if (typeof model === 'string' || !model.periods || !model.periods.length) return contactHint();
    var name = CP.catalog.modelName(model);
    return '<div class="chip-grid years">' + model.periods.map(function (p) {
      var url = 'marca.html?marca=' + encodeURIComponent(marcaSlug) + '&modelo=' + encodeURIComponent(name) + '&periodo=' + encodeURIComponent(p.id);
      return '<a class="chip" href="' + url + '">' + esc(periodLabel(p)) + ARROW + '</a>';
    }).join('') + '</div>';
  }

  function engines(brand, model, period) {
    if (!period.fuels || !period.fuels.length) return contactHint();
    var modelName = CP.catalog.modelName(model);
    return period.fuels.map(function (fuel) {
      var rows = fuel.engines.map(function (eng) {
        var url = 'motor.html?marca=' + encodeURIComponent(marcaSlug) +
          '&modelo=' + encodeURIComponent(modelName) +
          '&periodo=' + encodeURIComponent(period.id) +
          '&motor=' + encodeURIComponent(eng.name) +
          '&cv=' + eng.cv;
        return '<li><a href="' + url + '" title="' + esc(brand.name + ' ' + modelName + ' ' + eng.name + ' ' + eng.cv + 'cv') + '">' +
          '<span class="name">' + esc(eng.name) + '</span>' +
          '<span class="cv">' + eng.cv + '<small>cv</small></span>' +
          '<span class="go">' + ARROW + '</span></a></li>';
      }).join('');
      return '<div class="fuel-group"><h3><span class="dot"></span>' + esc(CP.fuelLabel(fuel.type)) + '</h3><ul class="engine-list">' + rows + '</ul></div>';
    }).join('');
  }

  function findModel(brand, name) {
    if (!brand.models) return null;
    return brand.models.find(function (m) { return CP.catalog.modelName(m) === name; }) || null;
  }
  function findPeriod(model, id) {
    if (typeof model === 'string' || !model.periods) return null;
    return model.periods.find(function (p) { return p.id === id; }) || null;
  }
});
