// MIDO Performance — Desbloqueo de centralitas para Alientech KESS3 (desbloqueo-kess3.html)
// Tabela de compatibilidade lida de data/desbloqueo-kess3.json.
// Só aparecem as centralitas com "confirmado": true (confirmadas pelo Mido).
// ?revision=1 mostra também o rascunho, marcado como "Pendiente de confirmar", para o Mido revisar.
(function () {
  var WA = typeof CP_WA !== 'undefined' ? CP_WA : '393758172444';
  function waUrl(text) { return typeof cpWaUrl === 'function' ? cpWaUrl(text) : 'https://api.whatsapp.com/send?phone=' + WA + '&text=' + encodeURIComponent(text); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function msg(ecu) {
    return 'Hola MIDO, quiero consultar el desbloqueo de una centralita para Alientech KESS3.\n' +
      'Centralita: ' + (ecu || '') + '\n' +
      'Vehículo (marca, modelo, año y motor): \n' +
      'Número de hardware / software (si lo tienes): ';
  }

  // todos os botões "Consultar desbloqueo por WhatsApp"
  document.querySelectorAll('[data-wa-unlock]').forEach(function (a) { a.href = waUrl(msg('')); });

  var root = document.getElementById('ecu-compat');
  if (!root) return;
  var tbody = root.querySelector('tbody'), q = document.getElementById('ecu-q'), info = document.getElementById('ecu-count'),
    empty = document.getElementById('ecu-empty'), wrap = root.querySelector('.ecu-table-wrap'), draft = document.getElementById('ecu-draft');
  var revision = /[?&]revision=1\b/.test(location.search), rows = [];

  function norm(s) { return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[\s.\-_/]+/g, ''); }
  function render() {
    var t = norm(q.value || ''), list = rows.filter(function (r) { return !t || norm(r.ecu + ' ' + r.fabricante + ' ' + r.grupo + ' ' + r.protocolo).indexOf(t) > -1; });
    tbody.innerHTML = list.map(function (r) {
      return '<tr' + (r.confirmado ? '' : ' class="is-draft"') + '>' +
        '<td data-label="Centralita"><span class="ecu-name" translate="no">' + esc(r.fabricante + ' ' + r.ecu) + '</span>' + (r.confirmado ? '' : '<span class="ecu-pending">Pendiente de confirmar</span>') + '</td>' +
        '<td data-label="Grupo / vehículos">' + esc(r.grupo) + (r.nota ? '<small>' + esc(r.nota) + '</small>' : '') + '</td>' +
        '<td data-label="Protocolo KESS3"><span class="ecu-proto" translate="no">' + esc(r.protocolo) + '</span></td>' +
        '<td class="ecu-act"><a class="ecu-ask" target="_blank" rel="noopener" href="' + esc(waUrl(msg(r.fabricante + ' ' + r.ecu))) + '">Consultar</a></td></tr>';
    }).join('');
    var any = rows.length > 0;
    wrap.hidden = !any;
    info.textContent = any ? list.length + (list.length === 1 ? ' centralita' : ' centralitas') + (t ? ' encontradas' : '') : '';
    empty.hidden = list.length > 0;
    empty.innerHTML = any ? 'No encontramos esa centralita en la lista. <a href="' + esc(waUrl(msg(q.value))) + '" target="_blank" rel="noopener">Consúltanos por WhatsApp</a>: puede que también la trabajemos.'
      : 'Estamos actualizando la lista de centralitas compatibles. <a href="' + esc(waUrl(msg(''))) + '" target="_blank" rel="noopener">Consúltanos por WhatsApp</a> con el modelo exacto de tu centralita.';
    q.disabled = !any;
  }
  q.addEventListener('input', render);

  fetch('data/desbloqueo-kess3.json', { cache: 'no-cache' }).then(function (r) { return r.json(); }).then(function (d) {
    rows = (d.centralitas || []).filter(function (r) { return r.confirmado || revision; });
    if (draft) draft.hidden = !revision;
    render();
  }).catch(function () { rows = []; render(); });
})();
