// MIDO Performance — Servicio de archivos para talleres (archivos.html)
// Preços em euros ("desde": o preço final depende do veículo e é confirmado antes do pagamento).
// Para mudar preços/opções, edite as listas abaixo. E-mail e PayPal: js/config.js -> archivos
(function () {
  var form = document.getElementById('files-form');
  if (!form) return;
  var CFG = (typeof BRP_CONFIG !== 'undefined' && BRP_CONFIG.archivos) || {};
  var WA = '393758172444';

  var EXTRA_EUR = 20;   // cada função extra: desde +20 € (o Mido falou em 20–30 €)
  var MIN_SOLO = 60;    // só funções, sem stage: mínimo 60 €
  // [id, nome, preço desde em € (null = consultar), só opções?]
  var TUNING = [
    ['stage1', 'Stage 1 (coche)', 60],
    ['stage2', 'Stage 2 (coche)', null],
    ['stage3', 'Stage 3 (coche)', null],
    ['opt-car', 'Solo opciones (coche)', 0, 1],
    ['truck1', 'Camión / agrícola Stage 1', null],
    ['opt-truck', 'Solo opciones (camión / agrícola)', 0, 1],
    ['bike1', 'Moto y quad Stage 1', null],
    ['opt-bike', 'Solo opciones (moto y quad)', 0, 1],
    ['tcu', 'Caja automática (TCU): más par y cambios más rápidos', null],
    ['cpc', 'CPC tuning', null],
    ['opt-tcu', 'Solo opciones (TCU)', 0, 1],
    ['e85', 'Conversión E85', null],
    ['stock', 'Volver a original', null]
  ];
  // [nome, (não usado), emissões?]  — todas as funções custam desde +EXTRA_EUR
  var EXTRAS = [
    ['Active Grill Shutter', 0.2], ['AdBlue off', 1, 1], ['Anti Lag', 1], ['Checksum', 0.2],
    ['Cylinder on Demand off', 0.2], ['DPF off', 0.5, 1], ['DPF off + EGR off', 0.5, 1], ['DSG Farts', 0.5],
    ['DTC off', 0.2], ['EGR off', 0.2, 1], ['Evaporative Emission Control System (EVAP)', 0.2, 1], ['Exhaust Flaps', 0.2],
    ['Full Emission (DPF / EGR / AdBlue)', 1.2, 1], ['Hard Cut limiter', 0.5], ['Hot Start', 0.2], ['Idle RPM', 0.2],
    ['Launch Control', 0.5], ['Vmax limitada a una velocidad', 0.5], ['MAF (off o escalado)', 0.2], ['Max RPM', 0.1],
    ['Neutral RPM', 0.2], ['NOx off', 0.5, 1], ['Oil Pressure', 0.2], ['Performance Gauge (BMW / Mini / VAG)', 0],
    ['Pop & Bang / Crackle map', 1], ['Immo off (si es posible)', 1], ['Readiness Monitor', 0.5, 1], ['Secondary Air Pump off', 0.2, 1], ['Smart Regeneration', 1],
    ['Start / Stop off', 0.2], ['Swirl Flaps off', 0.2], ['Thermal Control', 0.2], ['Vmax off', 0],
    ['Warranty Patch (BMW / Mini / VAG)', 0.5]
  ];

  function tPrice(p, solo) { return solo ? 'mínimo ' + MIN_SOLO + ' €' : (p == null ? 'Consultar' : 'desde ' + p + ' €'); }
  var xPrice = '+' + EXTRA_EUR + ' €';

  var tList = document.getElementById('tuning-list');
  var xList = document.getElementById('extra-list');
  tList.innerHTML = TUNING.map(function (t) {
    return '<label class="opt"><input type="radio" name="Tipo de tuning" value="' + t[1] + '" data-p="' + (t[2] == null ? '' : t[2]) + '"' + (t[3] ? ' data-solo="1"' : '') + '><span class="opt-name">' + t[1] + '</span><span class="opt-price">' + tPrice(t[2], t[3]) + '</span></label>';
  }).join('');
  xList.innerHTML = EXTRAS.map(function (x) {
    return '<label class="opt" data-name="' + x[0].toLowerCase() + '"><input type="checkbox" name="Opciones[]" value="' + x[0] + '"' + (x[2] ? ' data-emis="1"' : '') + '><span class="opt-name">' + x[0] +
      (x[2] ? ' <span class="opt-tag">Solo competición</span>' : '') + '</span><span class="opt-price">' + xPrice + '</span></label>';
  }).join('');

  document.querySelectorAll('[data-cfg-files="entrega"]').forEach(function (el) { if (CFG.entrega) el.textContent = CFG.entrega; });

  // busca
  var search = document.getElementById('opt-search'), empty = document.getElementById('opt-empty');
  search.addEventListener('input', function () {
    var q = search.value.trim().toLowerCase(), any = false;
    xList.querySelectorAll('.opt').forEach(function (o) {
      var show = !q || o.getAttribute('data-name').indexOf(q) > -1 || o.querySelector('input').checked;
      o.hidden = !show; if (show) any = true;
    });
    empty.hidden = any;
  });

  // nome do arquivo
  var file = document.getElementById('f-file'), fname = form.querySelector('.file-name');
  file.addEventListener('change', function () {
    fname.textContent = file.files[0] ? file.files[0].name + ' (' + Math.ceil(file.files[0].size / 1024) + ' KB)' : fname.getAttribute('data-empty');
    file.closest('.file-drop').classList.toggle('has-file', !!file.files[0]);
  });

  // resumo
  var sumList = document.getElementById('sum-list'), sumTotal = document.getElementById('sum-total'),
    sumEur = document.getElementById('sum-eur'), emisWrap = document.getElementById('emis-wrap');
  function state() {
    var t = form.querySelector('input[name="Tipo de tuning"]:checked');
    var xs = Array.prototype.slice.call(form.querySelectorAll('input[name="Opciones[]"]:checked'));
    var solo = t && t.hasAttribute('data-solo');
    var base = t ? (t.getAttribute('data-p') === '' ? null : +t.getAttribute('data-p')) : 0;
    var total = base == null ? null : base + xs.length * EXTRA_EUR;
    if (solo) total = Math.max(MIN_SOLO, xs.length * EXTRA_EUR);
    return { t: t, xs: xs, solo: solo, base: base, total: total, emis: xs.some(function (x) { return x.hasAttribute('data-emis'); }) };
  }
  function totalText(s) {
    if (!s.t) return '—';
    if (s.total == null) return 'Consultar';
    return 'desde ' + s.total + ' €';
  }
  function render() {
    var s = state(), rows = [];
    if (s.t) rows.push('<li><span>' + s.t.value + '</span><b>' + (s.solo ? '' : (s.base == null ? 'Consultar' : 'desde ' + s.base + ' €')) + '</b></li>');
    s.xs.forEach(function (x) { rows.push('<li><span>' + x.value + '</span><b>' + xPrice + '</b></li>'); });
    sumList.innerHTML = rows.length ? rows.join('') : '<li class="muted">Elige un tipo de tuning</li>';
    sumTotal.textContent = totalText(s);
    sumEur.hidden = false;
    sumEur.textContent = s.solo ? 'Mínimo ' + MIN_SOLO + ' € si solo eliges funciones.' : 'Precio final según el vehículo; te lo confirmamos antes del pago.';
    emisWrap.hidden = !s.emis;
    form.querySelectorAll('.opt').forEach(function (o) { o.classList.toggle('on', o.querySelector('input').checked); });
  }
  form.addEventListener('change', render);
  render();

  // envio
  var err = document.getElementById('sum-error'), sent = document.getElementById('sum-sent');
  function fail(msg, el) { err.textContent = msg; err.hidden = false; if (el) { el.focus(); el.scrollIntoView({ block: 'center', behavior: 'smooth' }); } }
  function v(id) { return document.getElementById(id).value.trim(); }

  // Modo vitrine: a página só apresenta o serviço; a compra é feita no portal com login.
  // Sem endereço do portal ainda: botão "próximamente" + pedido pelo WhatsApp com a seleção.
  var VITRINE = !!(CFG.vitrine || CFG.portal);
  if (VITRINE) {
    var n = 0;
    form.querySelectorAll('.files-step').forEach(function (f, i) {
      if (i === 0 || i === 3) f.hidden = true; else f.querySelector('.n').textContent = ++n;
    });
    document.getElementById('f-terms').closest('label').style.display = 'none';
    emisWrap.remove();
    var btn = document.getElementById('f-send');
    if (CFG.portal) {
      btn.firstChild.nodeValue = 'Continuar al portal ';
    } else {
      btn.firstChild.nodeValue = 'Portal para talleres: próximamente ';
      btn.disabled = true;
      btn.classList.add('btn-soon');
      var ico = btn.querySelector('.ico'); if (ico) ico.remove();
      btn.insertAdjacentHTML('afterend', '<a class="soon-wa" id="soon-wa" href="#" target="_blank" rel="noopener">Mientras tanto, pídelo por WhatsApp</a>');
      document.getElementById('soon-wa').addEventListener('click', function () {
        var s = state();
        var msg = 'Hola MIDO Performance, quiero pedir un archivo modificado.' +
          (s.t ? '\nTuning: ' + s.t.value : '') +
          (s.xs.length ? '\nOpciones: ' + s.xs.map(function (x) { return x.value; }).join(', ') : '') +
          (s.t ? '\nPrecio: ' + totalText(s) : '') + '\n\n(Adjunto la lectura de la centralita en este chat.)';
        this.href = 'https://api.whatsapp.com/send?phone=' + WA + '&text=' + encodeURIComponent(msg);
      });
    }
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    err.hidden = true;
    var s = state();
    if (CFG.portal) {
      var u = new URL(CFG.portal);
      if (s.t) u.searchParams.set('tuning', s.t.value);
      if (s.xs.length) u.searchParams.set('opciones', s.xs.map(function (x) { return x.value; }).join('|'));
      location.href = u.toString();
      return;
    }
    var req = ['f-marca', 'f-modelo', 'f-motor', 'f-ecu'];
    for (var i = 0; i < req.length; i++) if (!v(req[i])) return fail('Completa los datos del vehículo.', document.getElementById(req[i]));
    if (!file.files[0] && CFG.email) return fail('Adjunta el archivo original de la centralita.', file);
    if (!s.t) return fail('Elige un tipo de tuning.', tList.querySelector('input'));
    var req2 = ['f-taller', 'f-nombre', 'f-email', 'f-tel'];
    for (var j = 0; j < req2.length; j++) if (!v(req2[j])) return fail('Completa los datos del taller.', document.getElementById(req2[j]));
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v('f-email'))) return fail('Revisa el email.', document.getElementById('f-email'));
    if (s.emis && !document.getElementById('f-emis').checked) return fail('Confirma el aviso sobre las opciones de emisiones.', document.getElementById('f-emis'));
    if (!document.getElementById('f-terms').checked) return fail('Acepta las condiciones de venta.', document.getElementById('f-terms'));

    var lines = [
      'Vehículo: ' + [v('f-marca'), v('f-modelo'), v('f-motor'), v('f-anio')].filter(Boolean).join(' '),
      'Caja: ' + v('f-caja'), 'ECU: ' + v('f-ecu'), 'Lectura: ' + v('f-tool'),
      'Tuning: ' + s.t.value,
      'Opciones: ' + (s.xs.length ? s.xs.map(function (x) { return x.value; }).join(', ') : 'ninguna'),
      'Precio: ' + totalText(s),
      'Taller: ' + v('f-taller') + ' · ' + v('f-nombre') + ' · ' + v('f-email') + ' · ' + v('f-tel')
    ];
    if (v('f-notas')) lines.push('Comentarios: ' + v('f-notas'));
    var pedido = lines.join('\n');
    document.getElementById('f-pedido').value = pedido;

    if (CFG.email) {
      // e-mail com o arquivo anexado (FormSubmit)
      document.getElementById('f-subject').value = 'Pedido de archivo: ' + v('f-marca') + ' ' + v('f-modelo') + ' · ' + s.t.value;
      var next = new URL(location.href); next.search = '?enviado=1'; next.hash = '';
      document.getElementById('f-next').value = next.toString();
      form.action = 'https://formsubmit.co/' + CFG.email;
      HTMLFormElement.prototype.submit.call(form);
    } else {
      // sem e-mail configurado: pedido pelo WhatsApp (o arquivo é anexado na conversa)
      var msg = 'Hola MIDO Performance, pedido de archivo:\n\n' + pedido + '\n\n(Adjunto el archivo original en este chat.)';
      window.open('https://api.whatsapp.com/send?phone=' + WA + '&text=' + encodeURIComponent(msg), '_blank', 'noopener');
      sent.hidden = false;
    }
  });

  if (/[?&]enviado=1/.test(location.search)) {
    sent.hidden = false;
    if (CFG.paypal) sent.insertAdjacentHTML('afterend', '<a class="btn btn-block btn-paypal" href="https://www.paypal.me/' + encodeURIComponent(CFG.paypal) + '" target="_blank" rel="noopener">Pagar con PayPal</a>');
    sent.scrollIntoView({ block: 'center' });
  }
})();
