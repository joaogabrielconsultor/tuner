#!/usr/bin/env node
// Igual a tools/build-i18n.py, para quem não tem Python: gera js/i18n-<idioma>.js a partir de tools/i18n/<idioma>.json.
// Uso (na pasta do projeto):   node tools/build-i18n.js   (ou node tools/build-i18n.js br para um idioma só)
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const norm = s => String(s).replace(/\s+/g, ' ').trim();
const only = process.argv[2]; // opcional: só um idioma, ex.: node tools/build-i18n.js br
for (const f of fs.readdirSync(path.join(ROOT, 'tools', 'i18n')).filter(f => f.endsWith('.json') && (!only || f === only + '.json')).sort()) {
  const src = JSON.parse(fs.readFileSync(path.join(ROOT, 'tools', 'i18n', f), 'utf8'));
  const strings = {};
  for (const [k, v] of Object.entries(src.strings)) if (norm(k) && v) strings[norm(k)] = v;
  const patterns = src.patterns || [];
  patterns.forEach(p => new RegExp(p[0]));
  const lang = f.replace(/\.json$/, '');
  fs.writeFileSync(path.join(ROOT, 'js', 'i18n-' + lang + '.js'),
    '// Gerado por tools/build-i18n a partir de tools/i18n/' + f + '. Não edite à mão.\nwindow.MP_I18N = ' +
    JSON.stringify({ strings, patterns }) + ';\n');
  console.log(lang + ': ' + Object.keys(strings).length + ' textos, ' + patterns.length + ' padrões');
}
