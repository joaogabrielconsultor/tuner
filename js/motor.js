document.addEventListener('DOMContentLoaded', function () {
  var params = new URLSearchParams(window.location.search);
  var marcaSlug = params.get('marca');
  var modeloParam = params.get('modelo');
  var periodoParam = params.get('periodo');
  var motorParam = params.get('motor');
  var cvParam = parseInt(params.get('cv'), 10) || 0;
  var stageParam = params.get('stage') || 'stage1';

  if (!marcaSlug || !BRANDS[marcaSlug] || !modeloParam || !periodoParam || !motorParam) {
    window.location.href = 'vehiculos.html';
    return;
  }

  var brand = BRANDS[marcaSlug];
  var model = findModel(brand, modeloParam);
  var period = model ? findPeriod(model, periodoParam) : null;
  var engine = period ? findEngine(period, motorParam, cvParam) : null;

  if (!engine) {
    window.location.href = 'marca.html?marca=' + encodeURIComponent(marcaSlug);
    return;
  }

  var stages = engine.stages || [];
  var currentStage = stages.find(function (s) { return s.id === stageParam; }) || stages[0] || null;

  initKiosk();
  initBreadcrumb();
  initBackButton();
  initStageTabs();
  initStageTable();
  initSecondSection();

  function initKiosk() {
    var bg = document.querySelector('.kiosk-bg');
    if (bg && brand.logo) {
      bg.style.backgroundImage = 'url(' + brand.logo + ')';
      bg.style.backgroundSize = 'contain';
      bg.style.backgroundRepeat = 'no-repeat';
      bg.style.backgroundPosition = 'center center';
    }
    var sel = document.querySelector('.selectionname');
    if (sel) {
      var periodLabel = period ? period.label : periodoParam;
      var stageLabel = currentStage ? ' ' + currentStage.label : '';
      sel.innerHTML =
        escHtml(brand.name) + ' ' +
        escHtml(modeloParam) + ' ' +
        escHtml(periodLabel) +
        ' ' + escHtml(motorParam) + escHtml(stageLabel);
    }
  }

  function initBreadcrumb() {
    var base = 'marca.html?marca=' + encodeURIComponent(marcaSlug);
    var modelUrl = base + '&modelo=' + encodeURIComponent(modeloParam);
    var periodUrl = modelUrl + '&periodo=' + encodeURIComponent(periodoParam);
    var periodLabel = period ? period.label : periodoParam;

    document.getElementById('bc-brand').textContent = brand.name;
    document.getElementById('bc-brand').href = base;

    document.getElementById('bc-modelo').textContent = modeloParam;
    document.getElementById('bc-modelo').href = modelUrl;

    document.getElementById('bc-periodo').innerHTML =
      '<a href="' + periodUrl + '">' + escHtml(periodLabel) + '</a>';

    document.getElementById('bc-motor').textContent = motorParam;
  }

  function initBackButton() {
    var base = 'marca.html?marca=' + encodeURIComponent(marcaSlug);
    var periodUrl = base + '&modelo=' + encodeURIComponent(modeloParam) + '&periodo=' + encodeURIComponent(periodoParam);
    document.querySelectorAll('.back-to-selection').forEach(function (a) {
      a.href = periodUrl;
    });
  }

  function initStageTabs() {
    var header = document.querySelector('.stages > div');
    if (!header) return;
    header.innerHTML = '';

    if (stages.length === 0) {
      header.innerHTML = '<span style="color:#aaa;font-size:12px;padding:4px 10px">Sin stages disponibles</span>';
      return;
    }

    stages.forEach(function (s) {
      var isSel = s.id === (currentStage ? currentStage.id : '');
      var url = 'motor.html?marca=' + encodeURIComponent(marcaSlug) +
                '&modelo=' + encodeURIComponent(modeloParam) +
                '&periodo=' + encodeURIComponent(periodoParam) +
                '&motor=' + encodeURIComponent(motorParam) +
                '&cv=' + cvParam +
                '&stage=' + encodeURIComponent(s.id);
      var span = document.createElement('span');
      span.className = 'stage' + (isSel ? ' sel' : '');
      span.innerHTML = '<a href="' + url + '" class="' + escHtml(s.cssClass || s.id) + '">' + escHtml(s.label) + '</a>';
      header.appendChild(span);
    });
  }

  function initStageTable() {
    var tableWrap = document.getElementById('stage-table-wrap');
    var moreInfo = document.getElementById('more-info-wrap');
    if (!tableWrap) return;

    if (!currentStage) {
      tableWrap.innerHTML =
        '<tr><td colspan="4" style="padding:20px;text-align:center;color:#666">No hay datos disponibles para este stage.</td></tr>';
      return;
    }

    var s = currentStage;
    var motorUrl = 'contacto.html?modelo=' + encodeURIComponent(modeloParam) +
                   '&motor=' + encodeURIComponent(motorParam) +
                   '&stage=' + encodeURIComponent(s.id);

    var isEco = s.cssClass === 'brp-eco';
    var tu = s.torque_unit || 'Nm';
    var rows =
      '<tr>' +
        '<th scope="col" class="empty"><a href="vehiculos.html">Más información</a></th>' +
        '<th scope="col">Original</th>' +
        '<th scope="col">Modificado</th>' +
        '<th scope="col">Diferencia</th>' +
      '</tr>';

    if (!isEco) {
      rows +=
        '<tr>' +
          '<th scope="row">Potencia</th>' +
          '<td>' + s.power_orig + ' cv</td>' +
          '<td class="highlight info">' + s.power_mod + ' cv</td>' +
          '<td class="highlight info">+ ' + s.power_diff + ' cv</td>' +
        '</tr>';
    }

    rows +=
      '<tr>' +
        '<th scope="row">Par</th>' +
        '<td>' + s.torque_orig + ' ' + tu + '</td>' +
        '<td class="highlight">' + s.torque_mod + ' ' + tu + '</td>' +
        '<td class="highlight">+ ' + s.torque_diff + ' ' + tu + '</td>' +
      '</tr>';

    if (isEco && s.fuel_saving) {
      rows +=
        '<tr>' +
          '<td colspan="3" class="noborder ecolabel" style="text-align:right;color:#33cc00;">Ahorro de combustible estimado</td>' +
          '<td class="ecolabel" style="color:#33cc00;">' + s.fuel_saving + '</td>' +
        '</tr>';
    }

    rows +=
      '<tr>' +
        '<td colspan="3" class="noborder">' +
          '<div class="big">Precio</div>' +
          '<div><a href="contacto.html">Métodos de pago</a></div>' +
        '</td>' +
        '<td class="price">&euro;' + s.price + '</td>' +
      '</tr>';

    tableWrap.innerHTML = rows;

    if (moreInfo) {
      moreInfo.querySelector('a').href = motorUrl;
    }
  }

  function initSecondSection() {
    var motorUrl = 'contacto.html?motor=' + encodeURIComponent(motorParam);
    var testBtn = document.getElementById('btn-testimonio');
    if (testBtn) testBtn.href = motorUrl;
  }

  function findModel(b, modelName) {
    if (!b.models || !b.models.length) return null;
    return b.models.find(function (m) {
      return (typeof m === 'string' ? m : m.name) === modelName;
    }) || null;
  }

  function findPeriod(m, periodId) {
    if (typeof m === 'string' || !m.periods) return null;
    return m.periods.find(function (p) { return p.id === periodId; }) || null;
  }

  function findEngine(p, motorName, cv) {
    if (!p.fuels) return null;
    for (var fi = 0; fi < p.fuels.length; fi++) {
      var fuel = p.fuels[fi];
      if (!fuel.engines) continue;
      for (var ei = 0; ei < fuel.engines.length; ei++) {
        var eng = fuel.engines[ei];
        if (eng.name === motorName && eng.cv === cv) return eng;
      }
    }
    return null;
  }

  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
});
