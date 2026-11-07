// MIDO Performance — Servicio de archivos para talleres (archivos.html)
// Preços em créditos. Para mudar preços/opções, edite as listas abaixo.
// Para mudar e-mail, valor do crédito e PayPal: js/config.js -> archivos
(function () {
  var form = document.getElementById('files-form');
  if (!form) return;
  var CFG = (typeof BRP_CONFIG !== 'undefined' && BRP_CONFIG.archivos) || {};
  var WA = '393758172444';

  // [id, nome, créditos]
  var TUNING = [
    ['stage1', 'Stage 1 (coche)', 1],
    ['stage2', 'Stage 2 (coche)', 1.5],
    ['stage3', 'Stage 3 (coche)', 5],
    ['opt-car', 'Solo opciones (coche)', 0],
    ['truck1', 'Camión / agrícola Stage 1', 1],
    ['opt-truck', 'Solo opciones (camión / agrícola)', 0],
    ['bike1', 'Moto y quad Stage 1', 1],
    ['opt-bike', 'Solo opciones (moto y quad)', 0],
    ['tcu', 'Caja automática (TCU): más par y cambios más rápidos', 1],
    ['cpc', 'CPC tuning', 1],
    ['opt-tcu', 'Solo opciones (TCU)', 0],
    ['e85', 'Conversión E85', 2],
    ['stock', 'Volver a original', 0.5]
  ];
  // [nome, créditos, emissões?]
  var EXTRAS = [
    ['Active Grill Shutter', 0.2], ['AdBlue off', 1, 1], ['Anti Lag', 1], ['Checksum', 0.2],
    ['Cylinder on Demand off', 0.2], ['DPF off', 0.5, 1], ['DPF off + EGR off', 0.5, 1], ['DSG Farts', 0.5],
    ['DTC off', 0.2], ['EGR off', 0.2, 1], ['Evaporative Emission Control System (EVAP)', 0.2, 1], ['Exhaust Flaps', 0.2],
    ['Full Emission (DPF / EGR / AdBlue)', 1.2, 1], ['Hard Cut limiter', 0.5], ['Hot Start', 0.2], ['Idle RPM', 0.2],
    ['Launch Control', 0.5], ['Vmax limitada a una velocidad', 0.5], ['MAF (off o escalado)', 0.2], ['Max RPM', 0.1],
    ['Neutral RPM', 0.2], ['NOx off', 0.5, 1], ['Oil Pressure', 0.2], ['Performance Gauge (BMW / Mini / VAG)', 0],
    ['Pop & Bang / Crackle map', 1], ['Readiness Monitor', 0.5, 1], ['Secondary Air Pump off', 0.2, 1], ['Smart Regeneration', 1],
    ['Start / Stop off', 0.2], ['Swirl Flaps off', 0.2], ['Thermal Control', 0.2], ['Vmax off', 0],
    ['Warranty Patch (BMW / Mini / VAG)', 0.5]
  ];

  function fmt(n) { return (Math.round(n * 10) / 10).toString().replace('.', ','); }
  function cred(n) {
    if (!n) return 'gratis';
    return fmt(n) + (n === 1 ? ' crédito' : ' créditos');
  }
  function eur(n) { return CFG.credito_eur ? Math.round(n * CFG.credito_eur * 100) / 100 : 0; }

  var tList = document.getElementById('tuning-list');
  var xList = document.getElementById('extra-list');
  tList.innerHTML = TUNING.map(function (t) {
    return '<label class="opt"><input type="radio" name="Tipo de tuning" value="' + t[1] + '" data-c="' + t[2] + '"><span class="opt-name">' + t[1] + '</span><span class="opt-price">' + cred(t[2]) + '</span></label>';
  }).join('');
  xList.innerHTML = EXTRAS.map(function (x) {
    return '<label class="opt" data-name="' + x[0].toLowerCase() + '"><input type="checkbox" name="Opciones[]" value="' + x[0] + '" data-c="' + x[1] + '"' + (x[2] ? ' data-emis="1"' : '') + '><span class="opt-name">' + x[0] +
      (x[2] ? ' <span class="opt-tag">Solo competición</span>' : '') + '</span><span class="opt-price">' + cred(x[1]) + '</span></label>';
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
    var total = (t ? +t.getAttribute('data-c') : 0) + xs.reduce(function (a, x) { return a + +x.getAttribute('data-c'); }, 0);
    return { t: t, xs: xs, total: total, emis: xs.some(function (x) { return x.hasAttribute('data-emis'); }) };
  }
  function render() {
    var s = state(), rows = [];
    if (s.t) rows.push('<li><span>' + s.t.value + '</span><b>' + cred(+s.t.getAttribute('data-c')) + '</b></li>');
    s.xs.forEach(function (x) { rows.push('<li><span>' + x.value + '</span><b>' + cred(+x.getAttribute('data-c')) + '</b></li>'); });
    sumList.innerHTML = rows.length ? rows.join('') : '<li class="muted">Elige un tipo de tuning</li>';
    sumTotal.textContent = cred(s.total) === 'gratis' ? '0 créditos' : cred(s.total);
    if (CFG.credito_eur && s.total) { sumEur.hidden = false; sumEur.textContent = '≈ ' + fmt(eur(s.total)) + ' € (IVA incl.)'; } else sumEur.hidden = true;
    emisWrap.hidden = !s.emis;
    form.querySelectorAll('.opt').forEach(function (o) { o.classList.toggle('on', o.querySelector('input').checked); });
  }
  form.addEventListener('change', render);
  render();

  // envio
  var err = document.getElementById('sum-error'), sent = document.getElementById('sum-sent');
  function fail(msg, el) { err.textContent = msg; err.hidden = false; if (el) { el.focus(); el.scrollIntoView({ block: 'center', behavior: 'smooth' }); } }
  function v(id) { return document.getElementById(id).value.trim(); }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    err.hidden = true;
    var s = state();
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
      'Tuning: ' + s.t.value + ' (' + cred(+s.t.getAttribute('data-c')) + ')',
      'Opciones: ' + (s.xs.length ? s.xs.map(function (x) { return x.value; }).join(', ') : 'ninguna'),
      'Total: ' + cred(s.total) + (CFG.credito_eur ? ' (≈ ' + fmt(eur(s.total)) + ' €)' : ''),
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
