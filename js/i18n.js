// MIDO Performance — tradução do site (carregado só quando o idioma escolhido não é espanhol)
// Os textos ficam em js/i18n-<idioma>.js, gerados por tools/build-i18n.py a partir de tools/i18n/<idioma>.json
// Traduz o HTML enquanto a página carrega e também o que os scripts criam depois (configurador, avisos, etc.).
(function () {
  var D = window.MP_I18N;
  if (!D) return;
  var dict = D.strings || {};
  var pats = (D.patterns || []).map(function (p) { return [new RegExp('^' + p[0] + '$'), p[1]]; });
  var has = Object.prototype.hasOwnProperty;
  var SKIP = { SCRIPT: 1, STYLE: 1, TEXTAREA: 1, NOSCRIPT: 1, svg: 1, SVG: 1 };
  var ATTRS = ['placeholder', 'aria-label', 'title', 'alt', 'content'];

  function norm(s) { return String(s).replace(/\s+/g, ' ').trim(); }
  function tr(s) {
    var k = norm(s);
    if (!k || !/[A-Za-zÀ-ÿ]/.test(k)) return null;
    if (has.call(dict, k)) return dict[k];
    for (var i = 0; i < pats.length; i++) if (pats[i][0].test(k)) return k.replace(pats[i][0], pats[i][1]);
    return null;
  }
  function skipped(el) {
    for (var e = el; e && e.nodeType === 1; e = e.parentNode) {
      if (SKIP[e.nodeName] || e.hasAttribute('data-no-i18n')) return true;
    }
    return false;
  }
  function doText(n) {
    var p = n.parentNode;
    if (!p || skipped(p)) return;
    var v = n.nodeValue, t = tr(v);
    if (t == null || t === norm(v)) return;
    n.nodeValue = v.match(/^\s*/)[0] + t + v.match(/\s*$/)[0];
  }
  function doEl(el) {
    for (var i = 0; i < ATTRS.length; i++) {
      var a = ATTRS[i];
      if (a === 'content' && el.nodeName !== 'META') continue;
      var v = el.getAttribute(a);
      if (!v) continue;
      var t = tr(v);
      if (t != null && t !== v) el.setAttribute(a, t);
    }
    if (el.nodeName === 'INPUT' && (el.type === 'submit' || el.type === 'button') && el.value) {
      var tv = tr(el.value);
      if (tv != null) el.value = tv;
    }
  }
  function walk(root) {
    if (root.nodeType === 3) return doText(root);
    if (root.nodeType !== 1 || skipped(root)) return;
    doEl(root);
    var w = document.createTreeWalker(root, 5, null); // elementos + textos
    var n;
    while ((n = w.nextNode())) {
      if (n.nodeType === 3) doText(n);
      else if (!SKIP[n.nodeName]) doEl(n);
    }
  }

  window.MP_translate = walk;
  window.MP_t = function (s) { var t = tr(s); return t == null ? s : t; };

  var mo = new MutationObserver(function (list) {
    for (var i = 0; i < list.length; i++) {
      var m = list[i];
      if (m.type === 'childList') { for (var j = 0; j < m.addedNodes.length; j++) walk(m.addedNodes[j]); }
      else if (m.type === 'characterData') doText(m.target);
      else if (m.type === 'attributes') doEl(m.target);
    }
  });
  mo.observe(document.documentElement, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS });
  walk(document.documentElement);

  function done() { walk(document.documentElement); document.documentElement.classList.remove('i18n-wait'); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', done); else done();
})();
