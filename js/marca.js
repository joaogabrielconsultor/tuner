document.addEventListener('DOMContentLoaded', function () {
  var params = new URLSearchParams(window.location.search);
  var marcaSlug = params.get('marca');
  var modeloParam = params.get('modelo');
  var periodoParam = params.get('periodo');

  if (!marcaSlug || !BRANDS[marcaSlug]) {
    window.location.href = 'vehiculos.html';
    return;
  }

  var brand = BRANDS[marcaSlug];

  initKiosk();
  initBreadcrumb();
  initSubNav();
  initCards();

  function initKiosk() {
    var bg = document.querySelector('.kiosk-bg');
    if (bg && brand.logo) {
      bg.style.backgroundImage = 'url(' + brand.logo + ')';
      bg.style.backgroundSize = 'contain';
      bg.style.backgroundRepeat = 'no-repeat';
      bg.style.backgroundPosition = 'center center';
      bg.style.backgroundColor = '#0d1117';
    }
    var sel = document.querySelector('.kiosk .selectionname');
    if (sel) sel.textContent = brand.name;
  }

  function initBreadcrumb() {
    var bcBrand = document.getElementById('bc-brand');
    if (bcBrand) bcBrand.textContent = brand.name;

    var bcModelo = document.getElementById('bc-modelo');
    if (bcModelo) {
      if (modeloParam) {
        bcModelo.style.display = '';
        var link = bcModelo.querySelector('a');
        if (link) {
          link.textContent = modeloParam;
          link.href = 'marca.html?marca=' + encodeURIComponent(marcaSlug) + '&modelo=' + encodeURIComponent(modeloParam);
        }
      } else {
        bcModelo.style.display = 'none';
      }
    }

    var bcPeriodo = document.getElementById('bc-periodo');
    if (bcPeriodo) {
      if (periodoParam && modeloParam) {
        bcPeriodo.style.display = '';
        var model = findModel(modeloParam);
        var period = model ? findPeriod(model, periodoParam) : null;
        var lbl = bcPeriodo.querySelector('span');
        if (lbl) lbl.textContent = period ? period.label : periodoParam.replace(/-/g, ' > ');
      } else {
        bcPeriodo.style.display = 'none';
      }
    }
  }

  function initSubNav() {
    var backBtn = document.querySelector('.sub .back a');
    var titleSpan = document.querySelector('.sub .title');

    if (periodoParam && modeloParam) {
      if (backBtn) backBtn.href = 'marca.html?marca=' + encodeURIComponent(marcaSlug) + '&modelo=' + encodeURIComponent(modeloParam);
      if (titleSpan) titleSpan.textContent = 'Selecciona el tipo de motor ...';
    } else if (modeloParam) {
      if (backBtn) backBtn.href = 'marca.html?marca=' + encodeURIComponent(marcaSlug);
      if (titleSpan) titleSpan.textContent = 'Selecciona el año de fabricación...';
    } else {
      if (backBtn) backBtn.href = 'vehiculos.html';
      if (titleSpan) titleSpan.textContent = 'Selecciona un modelo ...';
    }
  }

  function initCards() {
    var grid = document.querySelector('.row.main .block-grid');
    if (!grid) return;
    grid.innerHTML = '';

    grid.appendChild(buildBrandCard());

    if (modeloParam) {
      var model = findModel(modeloParam);
      grid.appendChild(buildPeriodCard(model));
    }

    if (periodoParam && modeloParam) {
      var m = findModel(modeloParam);
      var p = m ? findPeriod(m, periodoParam) : null;
      if (p) {
        grid.appendChild(buildEngineCard(m, p));
      }
    }
  }

  function buildBrandCard() {
    var li = document.createElement('li');
    var modelsHtml = '';

    if (!brand.models || brand.models.length === 0) {
      modelsHtml = '<li><a href="contacto.html" class="contact-link">Contacta para más información</a></li>';
    } else {
      brand.models.forEach(function (m) {
        var name = getModelName(m);
        var isActive = name === modeloParam;
        var url = 'marca.html?marca=' + encodeURIComponent(marcaSlug) + '&modelo=' + encodeURIComponent(name);
        modelsHtml += '<li' + (isActive ? ' class="active-item"' : '') + '><a href="' + url + '" title="' + escHtml(brand.name) + ' ' + escHtml(name) + '">' + escHtml(name) + '</a></li>';
      });
    }

    li.innerHTML =
      '<article>' +
        '<header>' +
          '<h2>' + escHtml(brand.name) + '</h2>' +
          '<img src="' + escHtml(brand.logo) + '" alt="' + escHtml(brand.name) + '" class="logo">' +
        '</header>' +
        '<ul class="content">' + modelsHtml + '</ul>' +
      '</article>';
    return li;
  }

  function buildPeriodCard(model) {
    var li = document.createElement('li');
    var modelName = getModelName(model);
    var periodsHtml = '';

    var hasPeriods = model && typeof model === 'object' && model.periods && model.periods.length > 0;

    if (!hasPeriods) {
      periodsHtml = '<li><a href="contacto.html" class="contact-link">Contacta para más información</a></li>';
    } else {
      model.periods.forEach(function (p) {
        var isActive = p.id === periodoParam;
        var url = 'marca.html?marca=' + encodeURIComponent(marcaSlug) +
                  '&modelo=' + encodeURIComponent(modelName) +
                  '&periodo=' + encodeURIComponent(p.id);
        periodsHtml += '<li' + (isActive ? ' class="active-item"' : '') + '>' +
          '<a href="' + url + '">' + escHtml(p.label) + '</a>' +
          '</li>';
      });
    }

    li.innerHTML =
      '<article>' +
        '<header>' +
          '<h2>' + escHtml(modelName) + '</h2>' +
          '<img src="' + escHtml(brand.logo) + '" alt="' + escHtml(brand.name) + '" class="logo">' +
        '</header>' +
        '<ul class="content">' + periodsHtml + '</ul>' +
      '</article>';
    return li;
  }

  function buildEngineCard(model, period) {
    var li = document.createElement('li');
    var modelName = getModelName(model);
    var inner = '';

    if (!period.fuels || period.fuels.length === 0) {
      inner =
        '<header>' +
          '<h2>' + escHtml(period.label) + '</h2>' +
          '<img src="' + escHtml(brand.logo) + '" alt="' + escHtml(brand.name) + '" class="logo">' +
        '</header>' +
        '<ul class="content">' +
          '<li><a href="contacto.html" class="contact-link">Contacta para más información</a></li>' +
        '</ul>';
    } else {
      period.fuels.forEach(function (fuel) {
        inner +=
          '<header class="small">' +
            '<h2>' + escHtml(period.label) + '</h2>' +
            '<span class="named engine">' + escHtml(fuel.type) + '</span>' +
            '<img src="' + escHtml(brand.logo) + '" alt="' + escHtml(brand.name) + '" class="logo">' +
          '</header>' +
          '<ul class="content">';
        fuel.engines.forEach(function (eng) {
          var engUrl = 'motor.html?marca=' + encodeURIComponent(marcaSlug) +
                       '&modelo=' + encodeURIComponent(modelName) +
                       '&periodo=' + encodeURIComponent(period.id) +
                       '&motor=' + encodeURIComponent(eng.name) +
                       '&cv=' + eng.cv;
          inner +=
            '<li>' +
              '<a href="' + engUrl + '" title="' + escHtml(brand.name + ' ' + modelName + ' ' + eng.name + ' ' + eng.cv + 'cv') + '">' + escHtml(eng.name) + '</a>' +
              '<span class="specs"><span class="spec">' + eng.cv + 'cv</span></span>' +
            '</li>';
        });
        inner += '</ul>';
      });
    }

    li.innerHTML = '<article>' + inner + '</article>';
    return li;
  }

  function findModel(modelName) {
    if (!brand.models || !brand.models.length) return null;
    return brand.models.find(function (m) { return getModelName(m) === modelName; }) || null;
  }

  function findPeriod(model, periodId) {
    if (typeof model === 'string' || !model.periods) return null;
    return model.periods.find(function (p) { return p.id === periodId; }) || null;
  }

  function getModelName(m) {
    if (!m) return '';
    return typeof m === 'string' ? m : m.name;
  }

  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
});
