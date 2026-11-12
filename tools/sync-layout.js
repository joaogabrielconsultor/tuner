#!/usr/bin/env node
// Igual a tools/sync-layout.py, para quem não tem Python: copia head, header, footer e contact
// de partials/ para todas as páginas, entre os marcadores <!-- layout:X --> ... <!-- /layout:X -->.
// Uso (na pasta do projeto):   node tools/sync-layout.js
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const PARTS = ['head', 'header', 'footer', 'contact'];
const partials = {};
for (const p of PARTS) partials[p] = fs.readFileSync(path.join(ROOT, 'partials', p + '.html'), 'utf8').replace(/\n+$/, '');
let changed = 0;
for (const f of fs.readdirSync(ROOT).filter(f => f.endsWith('.html')).sort()) {
  const file = path.join(ROOT, f);
  const html = fs.readFileSync(file, 'utf8');
  let out = html;
  for (const p of PARTS) {
    const re = new RegExp('([ \\t]*)<!-- layout:' + p + ' -->[\\s\\S]*?<!-- /layout:' + p + ' -->', 'g');
    out = out.replace(re, (m, ind) => ind + '<!-- layout:' + p + ' -->\n' + partials[p] + '\n' + ind + '<!-- /layout:' + p + ' -->');
  }
  if (out !== html) { fs.writeFileSync(file, out); changed++; console.log('atualizado:', f); }
}
console.log(changed + ' página(s) atualizada(s).');
