#!/usr/bin/env node
// Igual a tools/build-i18n.py, para quem não tem Python: gera js/i18n-<idioma>.js a partir de tools/i18n/<idioma>.json.
// Uso (na pasta do projeto):   node tools/build-i18n.js   (ou node tools/build-i18n.js br para um idioma só)
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const norm = s => String(s).replace(/\s+/g, ' ').trim();
// Textos dos serviços (copiados do portal por tools/sync-servicios.js para tools/i18n/svc/):
// svc-es.json = frases em espanhol; svc-<idioma>*.json = { "posição": "tradução" }; ui-c.json = títulos das seções.
const SVC = path.join(ROOT, 'tools', 'i18n', 'svc');
const UI_ORDER = ['en', 'nl', 'de', 'fr', 'it', 'el', 'pt', 'br', 'zh', 'ar'];
function svcStrings(lang) {
  const out = { strings: {}, patterns: [] };
  if (!fs.existsSync(path.join(SVC, 'svc-es.json'))) return out;
  const es = JSON.parse(fs.readFileSync(path.join(SVC, 'svc-es.json'), 'utf8'));
  const tr = {};
  for (const f of fs.readdirSync(SVC).filter(f => new RegExp('^svc-' + lang + '(\\..+)?\\.json$').test(f))) Object.assign(tr, JSON.parse(fs.readFileSync(path.join(SVC, f), 'utf8')));
  for (const [i, v] of Object.entries(tr)) if (es[+i] && v) out.strings[norm(es[+i])] = v;
  const li = UI_ORDER.indexOf(lang);
  const ui = fs.existsSync(path.join(SVC, 'ui-c.json')) ? JSON.parse(fs.readFileSync(path.join(SVC, 'ui-c.json'), 'utf8')) : null;
  if (ui && li >= 0) {
    for (const [k, v] of Object.entries(ui.strings || {})) out.strings[norm(k)] = v[li];
    for (const [k, v] of Object.entries(ui.patterns || {})) out.patterns.push([k, v[li]]);
    // "¿Qué es <serviço>?" com o nome do serviço já traduzido
    const qe = (ui.patterns || {})['¿Qué es (.+)\\?'];
    const js = fs.existsSync(path.join(ROOT, 'js', 'servicios.js')) ? fs.readFileSync(path.join(ROOT, 'js', 'servicios.js'), 'utf8').match(/var S = (\[[\s\S]*?\n  \]);/) : null;
    if (qe && js) Function('return ' + js[1])().forEach(x => { const t = norm(x.t); out.strings['¿Qué es ' + t + '?'] = qe[li].replace('$1', out.strings[t] || t); });
  }
  return out;
}
const only = process.argv[2]; // opcional: só um idioma, ex.: node tools/build-i18n.js br
for (const f of fs.readdirSync(path.join(ROOT, 'tools', 'i18n')).filter(f => f.endsWith('.json') && (!only || f === only + '.json')).sort()) {
  const src = JSON.parse(fs.readFileSync(path.join(ROOT, 'tools', 'i18n', f), 'utf8'));
  const lang0 = f.replace(/\.json$/, '');
  const svc = svcStrings(lang0);
  const strings = Object.assign({}, svc.strings);
  for (const [k, v] of Object.entries(src.strings)) if (norm(k) && v) strings[norm(k)] = v;
  const patterns = (src.patterns || []).concat(svc.patterns);
  patterns.forEach(p => new RegExp(p[0]));
  const lang = f.replace(/\.json$/, '');
  fs.writeFileSync(path.join(ROOT, 'js', 'i18n-' + lang + '.js'),
    '// Gerado por tools/build-i18n a partir de tools/i18n/' + f + '. Não edite à mão.\nwindow.MP_I18N = ' +
    JSON.stringify({ strings, patterns }) + ';\n');
  console.log(lang + ': ' + Object.keys(strings).length + ' textos, ' + patterns.length + ' padrões');
}
