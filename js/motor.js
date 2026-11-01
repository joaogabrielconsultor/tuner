// Página do motor: etapas de reprogramação com potência, par e preço
// URL: motor.html?marca=&modelo=&periodo=&motor=&cv=[&stage=]
document.addEventListener('DOMContentLoaded', function () {
  var params = new URLSearchParams(window.location.search);
  var marcaSlug = params.get('marca');
  var modeloParam = params.get('modelo');
  var periodoParam = params.get('periodo');
  var motorParam = params.get('motor');
  var cvParam = parseInt(params.get('cv'), 10) || 0;
  var stageParam = params.get('stage') || 'stage1';
  var esc = CP.esc;
  var ARROW = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M6 3l5 5-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var LEVEL = { 'brp-eco': 1, 'stage1': 1, 'stage2': 2, 'stage3': 3 };

  if (!marcaSlug || !modeloParam || !periodoParam || !motorParam) {
    window.location.href = 'vehiculos.html';
    return;
  }

  CP.catalog.brand(marcaSlug).then(render).catch(function () { window.location.href = 'vehiculos.html'; });

  function periodLabel(p) {
    return String(p.label).replace(/(\d{4}) (\d{4}|\.\.\.)\s*$/, '$1 – $2');
  }

  function render(brand) {
    var model = findModel(brand, modeloParam);
    var period = model ? findPeriod(model, periodoParam) : null;
    var engine = period ? findEngine(period, motorParam, cvParam) : null;
    var base = 'marca.html?marca=' + encodeURIComponent(marcaSlug);
    if (!engine) { window.location.href = base; return; }

    var modelUrl = base + '&modelo=' + encodeURIComponent(modeloParam);
    var periodUrl = modelUrl + '&periodo=' + encodeURIComponent(periodoParam);
    var stages = engine.stages || [];
    var stage = stages.find(function (s) { return s.id === stageParam; }) || stages[0] || null;
    var pLabel = period ? periodLabel(period) : periodoParam;

    // Nome do veículo sem repetir os cv quando o motor já se chama "150cv"
    var engineText = String(motorParam).indexOf(engine.cv + 'cv') >= 0 ? motorParam : motorParam + ' ' + engine.cv + 'cv';
    var vehicle = brand.name + ' ' + modeloParam + ' ' + engineText;
    document.title = vehicle + (stage ? ' ' + stage.label : '') + ' - Carbon Performance - Reprogramación de centralitas';

    // Trilha, logo e título
    var crumbs = [['Inicio', 'index.html'], ['Reprogramación', 'vehiculos.html'], [brand.name, base], [modeloParam, modelUrl], [pLabel, periodUrl], [motorParam, '']];
    document.getElementById('crumbs').innerHTML = crumbs.map(function (c, i) {
      return i === crumbs.length - 1
        ? '<li><span aria-current="page">' + esc(c[0]) + '</span></li>'
        : '<li><a href="' + c[1] + '">' + esc(c[0]) + '</a></li>';
    }).join('');
    var logo = document.getElementById('brand-logo');
    if (brand.logo) { logo.innerHTML = '<img src="' + esc(brand.logo) + '" alt="' + esc(brand.name) + '">'; logo.hidden = false; }
    document.getElementById('page-title').textContent = vehicle;

    // Abas das etapas
    var tabs = document.getElementById('stage-tabs');
    tabs.innerHTML = stages.length ? stages.map(function (s) {
      var url = 'motor.html?marca=' + encodeURIComponent(marcaSlug) +
        '&modelo=' + encodeURIComponent(modeloParam) +
        '&periodo=' + encodeURIComponent(periodoParam) +
        '&motor=' + encodeURIComponent(motorParam) +
        '&cv=' + cvParam +
        '&stage=' + encodeURIComponent(s.id);
      var lv = LEVEL[s.id];
      var bars = lv ? '<span class="lv" aria-hidden="true">' + [1, 2, 3].map(function (n) { return '<i class="' + (n <= lv ? 'on' : '') + '"></i>'; }).join('') + '</span>' : '';
      var cur = stage && s.id === stage.id ? ' aria-current="page"' : '';
      return '<a role="listitem" class="stage-tab ' + esc(s.cssClass || s.id) + '" href="' + url + '"' + cur + '>' + bars + esc(s.label) + '</a>';
    }).join('') : '<span class="muted">Sin stages disponibles</span>';

    // Link de contato com o veículo e os números (o formulário monta a mensagem de WhatsApp)
    var q = 'contacto.html?marca=' + encodeURIComponent(brand.name) +
            '&modelo=' + encodeURIComponent(modeloParam) +
            '&motor=' + encodeURIComponent(motorParam);
    if (stage) {
      q += '&stage=' + encodeURIComponent(stage.label || '');
      if (stage.power_orig != null && stage.power_orig !== '' && stage.power_mod != null) {
        q += '&po=' + stage.power_orig + '&pm=' + (stage.power_mod != null ? stage.power_mod : '') + '&pd=' + (stage.power_diff != null ? stage.power_diff : '');
      }
      if (stage.torque_orig != null && stage.torque_orig !== '' && stage.torque_mod != null) {
        q += '&to=' + stage.torque_orig + '&tm=' + (stage.torque_mod != null ? stage.torque_mod : '') + '&td=' + (stage.torque_diff != null ? stage.torque_diff : '');
      }
      if (stage.price) q += '&price=' + stage.price;
    }
    var testBtn = document.getElementById('btn-testimonio');
    if (testBtn) testBtn.href = q;

    renderDyno(stage);
    renderPrice(stage, q, periodUrl);
  }

  function readout(title, orig, mod, diff, unit, eco) {
    var pct = mod ? Math.max(8, Math.min(100, orig / mod * 100)) : 0;
    return '<div class="readout' + (eco ? ' eco' : '') + '">' +
      '<div class="what"><span>' + title + '</span><span class="gain">+' + diff + ' ' + unit + '</span></div>' +
      '<div class="big">' + mod + '<small>' + unit + '</small></div>' +
      '<div class="bar" role="img" aria-label="' + title + ': de ' + orig + ' a ' + mod + ' ' + unit + '"><span class="mod" style="width:100%"></span><span class="orig" style="width:' + pct.toFixed(1) + '%"></span></div>' +
      '<div class="scale"><span>Original <b>' + orig + ' ' + unit + '</b></span><span>Modificado <b>' + mod + ' ' + unit + '</b></span></div>' +
      '</div>';
  }

  function renderDyno(s) {
    var box = document.getElementById('dyno');
    if (!s) {
      box.innerHTML = '<p class="muted" style="padding:28px;margin:0">No hay datos disponibles para este stage.</p>';
      return;
    }
    var isEco = s.cssClass === 'brp-eco';
    var tu = s.torque_unit || 'Nm';
    var pu = s.power_unit || 'cv';
    var hasPower = !isEco && s.power_orig != null && s.power_mod != null;
    var hasTorque = s.torque_orig != null && s.torque_mod != null;

    if (!hasPower && !hasTorque) {
      box.innerHTML = '<div class="readout"><div class="what"><span>' + esc(s.label) + '</span></div>' +
        '<p style="margin:14px 0 0;color:var(--muted)">Reprogramación del software de la caja de cambios. Consúltanos los detalles para tu vehículo.</p></div>';
      return;
    }

    var html = '<div class="dyno-readout"' + (hasPower && hasTorque ? '' : ' style="grid-template-columns:1fr"') + '>';
    if (hasPower) html += readout('Potencia', s.power_orig, s.power_mod, s.power_diff, pu, false);
    if (hasTorque) html += readout('Par', s.torque_orig, s.torque_mod, s.torque_diff, tu, isEco);
    html += '</div>';

    html += '<table class="dyno-table"><thead><tr><th scope="col"></th><th scope="col">Original</th><th scope="col">Modificado</th><th scope="col">Diferencia</th></tr></thead><tbody>';
    if (hasPower) html += '<tr><th scope="row" style="text-align:left">Potencia</th><td>' + s.power_orig + ' ' + pu + '</td><td class="hl">' + s.power_mod + ' ' + pu + '</td><td class="plus">+ ' + s.power_diff + ' ' + pu + '</td></tr>';
    if (hasTorque) html += '<tr><th scope="row" style="text-align:left">Par</th><td>' + s.torque_orig + ' ' + tu + '</td><td class="hl">' + s.torque_mod + ' ' + tu + '</td><td class="' + (isEco ? 'eco' : 'plus') + '">+ ' + s.torque_diff + ' ' + tu + '</td></tr>';
    if (isEco && s.fuel_saving) html += '<tr><th scope="row" style="text-align:left">Ahorro de combustible estimado</th><td></td><td></td><td class="eco">' + esc(s.fuel_saving) + '</td></tr>';
    html += '</tbody></table>';
    box.innerHTML = html;
  }

  function renderPrice(s, q, periodUrl) {
    var card = document.getElementById('price-card');
    var price = s && s.price ? '<div class="price">€' + s.price + '</div>' : '<div class="price ask">Consultar precio</div>';
    card.innerHTML =
      (s ? '<span class="badge stage-name">' + esc(s.label) + '</span>' : '') +
      '<div class="label">Precio</div>' + price +
      '<p class="note"><a href="contacto.html">Métodos de pago</a> · ¿Tiene alguna duda sobre esta stage? <a href="' + q + '">Contáctenos para más información.</a></p>' +
      '<a class="btn btn-red" href="' + q + '">Solicita presupuesto <span class="ico">' + ARROW + '</span></a>' +
      '<a class="btn" href="' + periodUrl + '">Editar selección <span class="ico">' + ARROW + '</span></a>';
  }

  function findModel(b, name) {
    if (!b.models || !b.models.length) return null;
    return b.models.find(function (m) { return CP.catalog.modelName(m) === name; }) || null;
  }
  function findPeriod(m, id) {
    if (typeof m === 'string' || !m.periods) return null;
    return m.periods.find(function (p) { return p.id === id; }) || null;
  }
  function findEngine(p, name, cv) {
    if (!p.fuels) return null;
    for (var i = 0; i < p.fuels.length; i++) {
      var f = p.fuels[i];
      for (var j = 0; j < (f.engines || []).length; j++) {
        if (f.engines[j].name === name && f.engines[j].cv === cv) return f.engines[j];
      }
    }
    return null;
  }
});
