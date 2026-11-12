// Página de resultado do configurador: etapas, potência, par e preço do motor escolhido
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
  var STAGE_NAME = { 'gearbox': 'Caja de cambios' };
  function cap(t) { t = String(t || ''); return t.charAt(0).toUpperCase() + t.slice(1); }

  if (!marcaSlug || !modeloParam || !periodoParam || !motorParam) { location.href = '/vehiculos/'; return; }

  Promise.all([CP.catalog.brand(marcaSlug), CP.catalog.index().catch(function () { return null; })])
    .then(function (r) { render(r[0], r[1]); })
    .catch(function () { location.href = '/vehiculos/'; });

  function render(brand, index) {
    var model = (brand.models || []).find(function (m) { return CP.catalog.modelName(m) === modeloParam; });
    var period = model && typeof model === 'object' ? (model.periods || []).find(function (p) { return p.id === periodoParam; }) : null;
    var engine = null;
    if (period) (period.fuels || []).forEach(function (f) { (f.engines || []).forEach(function (e) { if (e.name === motorParam && e.cv === cvParam) engine = e; }); });
    var type = index && index.brands[marcaSlug] ? index.brands[marcaSlug].type : 'coche';
    var typePage = CP.TYPE_PAGE[type] || '/vehiculos/';
    var configUrl = typePage + '?marca=' + encodeURIComponent(marcaSlug) + '&modelo=' + encodeURIComponent(modeloParam) + '&periodo=' + encodeURIComponent(periodoParam);
    if (!engine) { location.href = configUrl; return; }

    var stages = engine.stages || [];
    var stage = stages.find(function (s) { return s.id === stageParam; }) || stages[0] || null;
    var sub = CP.periodLabel(period) + ', ' + CP.engineLabel(engine);

    document.title = 'MIDO Performance | ' + brand.name + ' ' + modeloParam + ' ' + sub;
    document.getElementById('page-title').textContent = brand.name + ', ' + modeloParam;
    document.getElementById('page-sub').textContent = sub;
    document.getElementById('back-link').href = configUrl;

    // Abas das etapas
    var tabs = document.getElementById('stage-tabs');
    tabs.innerHTML = stages.map(function (s) {
      var url = '/motor/?marca=' + encodeURIComponent(marcaSlug) + '&modelo=' + encodeURIComponent(modeloParam) +
        '&periodo=' + encodeURIComponent(periodoParam) + '&motor=' + encodeURIComponent(motorParam) + '&cv=' + cvParam +
        '&stage=' + encodeURIComponent(s.id);
      var cur = stage && s.id === stage.id ? ' aria-current="page"' : '';
      return '<a href="' + url + '"' + cur + (s.id === 'brp-eco' ? ' class="tab-eco"' : '') + '>' + esc(STAGE_NAME[s.id] || s.label) + '</a>';
    }).join('');

    // Link de contato com o veículo e os números (vai para o formulário → WhatsApp)
    var q = '/contacto/?marca=' + encodeURIComponent(brand.name) + '&modelo=' + encodeURIComponent(modeloParam) + '&motor=' + encodeURIComponent(motorParam);
    if (stage) {
      q += '&stage=' + encodeURIComponent(stage.label || '');
      if (stage.power_orig != null && stage.power_mod != null) q += '&po=' + stage.power_orig + '&pm=' + stage.power_mod + '&pd=' + stage.power_diff;
      if (stage.torque_orig != null && stage.torque_mod != null) q += '&to=' + stage.torque_orig + '&tm=' + stage.torque_mod + '&td=' + stage.torque_diff;
      if (stage.price) q += '&price=' + stage.price;
    }

    var vehLabel = brand.name + ' ' + modeloParam + ' ' + motorParam + ' (' + cvParam + ' CV)';
    window.CP = window.CP || {};
    CP.waContext = stage ? {
      veh: vehLabel,
      stage: cap(STAGE_NAME[stage.id] || stage.label),
      power: (stage.power_orig != null && stage.power_mod != null && stage.cssClass !== 'brp-eco') ? stage.power_orig + ' → ' + stage.power_mod + ' ' + (stage.power_unit || 'cv') : '',
      torque: (stage.torque_orig != null && stage.torque_mod != null) ? stage.torque_orig + ' → ' + stage.torque_mod + ' ' + (stage.torque_unit || 'Nm') : '',
      price: stage.price ? stage.price + ' €' : ''
    } : { veh: vehLabel };
    var PHOTO = { 'brp-eco': 'svc-eco.jpg', stage1: 'svc-stage1.jpg', stage2: 'svc-stage2.jpg', stage3: 'svc-stage3.jpg', gearbox: 'svc-gearbox.jpg' };
    var mediaImg = document.querySelector('.result-top .media img');
    if (mediaImg && stage && PHOTO[stage.id]) { mediaImg.src = 'images/' + PHOTO[stage.id]; mediaImg.alt = cap(STAGE_NAME[stage.id] || stage.label) + ', MIDO Performance'; }
    renderSpec(stage, q);
    // Formulário Contáctanos desta página já leva o veículo e a etapa
    var vehName = brand.name + ' ' + modeloParam + ' ' + motorParam;
    var sendCtx = function () {
      if (!window.CP || !CP.setContactVehicle || !stage) return false;
      CP.setContactVehicle({ veh: vehName, stage: cap(STAGE_NAME[stage.id] || stage.label), price: stage.price,
        po: stage.power_mod != null ? stage.power_orig : null, pm: stage.power_mod, pd: stage.power_diff,
        to: stage.torque_mod != null ? stage.torque_orig : null, tm: stage.torque_mod, td: stage.torque_diff });
      return true;
    };
    if (!sendCtx()) window.addEventListener('load', sendCtx);
    renderGraph(stage);
    renderStickyBar(stage);
  }

  // Barra fixa no celular: etapa, preço e botão do WhatsApp sempre à mão
  function renderStickyBar(s) {
    if (!s) return;
    var bar = document.createElement('div');
    bar.className = 'result-sticky';
    bar.innerHTML = '<div class="rs-info"><span class="rs-stage">' + esc(cap(STAGE_NAME[s.id] || s.label)) + '</span>' +
      '<b class="rs-price">' + (s.price ? s.price + ' €' : 'Consultar') + '</b></div>' +
      '<a class="btn btn-wa" href="#" data-wa-direct>' + WA_ICON + '<span>Pedir cita</span></a>';
    document.body.appendChild(bar);
    document.body.classList.add('has-result-sticky');
  }

  function row(k, v, cls) { return '<div class="spec-row ' + (cls || '') + '"><span class="k">' + k + '</span><span class="v">' + v + '</span></div>'; }

  function renderSpec(s, q) {
    var box = document.getElementById('spec');
    if (!s) { box.innerHTML = '<h2>Reprogramación</h2><p class="note">No hay datos disponibles para este motor.</p>' + btn(q); return; }
    var isEco = s.cssClass === 'brp-eco';
    var pu = s.power_unit || 'cv', tu = s.torque_unit || 'Nm';
    var hasPower = !isEco && s.power_orig != null && s.power_mod != null;
    var hasTorque = s.torque_orig != null && s.torque_mod != null;
    var fuel = isEco ? (s.fuel_saving || (typeof BRP_CONFIG !== 'undefined' && BRP_CONFIG.consumo_eco) || '') : '';
    var cls = isEco ? ' eco' : '';
    function tr(k, o, m, d) {
      return '<tr><th scope="row">' + k + '</th><td>' + o + '</td><td class="mod' + cls + '">' + m + '</td><td class="diff' + cls + '">' + d + '</td></tr>';
    }
    var html = '<h2>' + (isEco ? 'Reprogramación ECO' : 'Reprogramación') + '</h2>';
    if (isEco) html += '<p class="note">Más par a bajas vueltas y menos consumo, sin cambiar la potencia máxima.</p>';
    if (hasPower || hasTorque || fuel) {
      html += '<div class="spec-table-wrap"><table class="spec-table"><thead><tr><th></th><th>Original</th><th>Modificado</th><th>Diferencia</th></tr></thead><tbody>';
      if (hasPower) html += tr('Potencia', s.power_orig + ' ' + pu, s.power_mod + ' ' + pu, '+' + s.power_diff + ' ' + pu);
      if (hasTorque) html += tr('Par', s.torque_orig + ' ' + tu, s.torque_mod + ' ' + tu, '+' + s.torque_diff + ' ' + tu);
      if (fuel) {
        var pct = parseInt(String(fuel).replace(/[^0-9]/g, ''), 10);
        html += '<tr class="fuel"><th scope="row">Consumo</th><td>100%</td><td class="mod eco">' + (pct ? (100 - pct) + '%' : '') + '</td><td class="diff eco">' + (pct ? '-' + pct + '%' : esc(fuel)) + '</td></tr>';
      }
      html += '</tbody></table></div>';
    } else {
      html += '<div class="spec-block"><p class="note">Reprogramación del software de la caja de cambios. Consúltanos los detalles para tu vehículo.</p></div>';
    }
    html += '<div class="spec-price"><h3>Precio</h3><div class="p">' +
      (s.price ? '<span class="amount">' + s.price + ' €</span><small>Precio orientativo</small>' : '<span class="amount">Consultar</span>') +
      '</div></div>' + btn(q);
    box.innerHTML = html;
  }
  var WA_ICON = '<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16 3C8.8 3 3 8.7 3 15.8c0 2.5.7 4.9 2 7L3 29l6.4-2c2 1.1 4.3 1.7 6.6 1.7 7.2 0 13-5.7 13-12.8S23.2 3 16 3zm5.8 15.6c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.4.3-.6.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8 0 1.6 1.2 3.2 1.4 3.4.2.2 2.4 3.6 5.7 5 .8.4 1.4.6 1.9.7.8.3 1.6.2 2.2.1.7-.1 1.9-.8 2.2-1.5.3-.8.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/></svg>';
  var PHONE_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 013 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z"/></svg>';
  function btn(q) {
    return '<div class="cta-box">' +
      '<a class="btn btn-wa" href="#" data-wa-direct>' + WA_ICON + '<span>Pedir cita por WhatsApp</span></a>' +
      '<div class="cta-alt"><a class="cta-link" href="tel:+393758172444">' + PHONE_ICON + 'Llamar</a>' +
      '<a class="cta-link" href="#contacto">Prefiero el formulario</a></div>' +
      '<ul class="cta-trust"><li>Respuesta rápida</li><li>Sin compromiso</li><li>Probado en banco de potencia</li></ul>' +
      '</div>';
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('[data-wa-direct]');
    if (!a) return;
    e.preventDefault();
    var url = window.CP && CP.waMessage ? CP.waMessage() : 'https://api.whatsapp.com/send?phone=393758172444';
    var w = window.open(url, '_blank');
    if (!w) window.location.href = url;
  });

  function renderGraph(s) {
    var g = document.getElementById('graph');
    if (!s) { g.innerHTML = ''; return; }
    var isEco = s.cssClass === 'brp-eco';
    var out = '';
    function bar(title, o, m, u, eco) {
      var pct = m ? Math.max(8, Math.min(100, o / m * 100)) : 0;
      return '<div class="gbar' + (eco ? ' eco' : '') + '"><div class="top"><span>' + title + '</span><b>' + o + ' → ' + m + ' ' + u + '</b></div>' +
        '<div class="track" role="img" aria-label="' + title + ': de ' + o + ' a ' + m + ' ' + u + '"><span class="mod" style="width:100%"></span><span class="orig" style="width:' + pct.toFixed(1) + '%"></span></div>' +
        '<div class="legend"><span>Original</span><span>Después de la optimización</span></div></div>';
    }
    if (!isEco && s.power_orig != null && s.power_mod != null) out += bar('Potencia', s.power_orig, s.power_mod, s.power_unit || 'cv', false);
    if (s.torque_orig != null && s.torque_mod != null) out += bar('Par', s.torque_orig, s.torque_mod, s.torque_unit || 'Nm', isEco);
    g.innerHTML = out || '<p class="muted" style="margin:0">Gráfico no disponible para esta etapa.</p>';
  }
});
