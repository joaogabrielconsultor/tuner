#!/usr/bin/env node
// Copia os serviços do portal (../mido-archivos) para o site público, sem preços e com os links certos:
//   - js/servicios.js  (lista + página de cada serviço, adaptada ao site)
//   - imagens dos serviços (esquemas esq-*.svg e fotos svc-*.jpg)
//   - textos para tradução: tools/i18n/svc/ (svc-es.json, svc-<idioma>.*.json e ui-c.json)
// "Pedir este servicio" leva para o portal (servicios.html?s=<id>), onde, com login, aparecem os preços.
// Uso, na pasta do projeto:   node tools/sync-servicios.js   (depois: node tools/build-i18n.js)
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const PORTAL_DIR = process.argv[2] || path.resolve(ROOT, '..', 'mido-archivos');
const PORTAL_URL = 'https://mido-archivos.onrender.com/';

let js = fs.readFileSync(path.join(PORTAL_DIR, 'js', 'servicios.js'), 'utf8');
const rep = (a, b) => { if (!js.includes(a)) throw new Error('Não achei no servicios.js do portal: ' + a); js = js.split(a).join(b); };
js = js.replace(/^\/\/.*\n/, '// MIDO Performance · site público — serviços (lista em archivos.html / vehiculos.html e servicio.html?s=<id>)\n// Gerado por tools/sync-servicios.js a partir do portal. Não edite à mão: edite no portal e rode o comando de novo.\n');
js = js.replace(/function orderUrl\(id\) \{[^\n]*\}/, "function orderUrl(id) { return '" + PORTAL_URL + "servicios/' + id + '/'; }");
// os links "servicios/<id>/" ficam iguais (o site também gera servicios/<id>/ com tools/build-svc-pages.js)
rep("'<a href=\"servicios\">Ver todos los servicios</a>", "'<a href=\"archivos.html#servicios\">Ver todos los servicios</a>");
rep("href=\"servicios\">Ver todos los servicios ' + ARROW", "href=\"archivos.html#servicios\">Ver todos los servicios ' + ARROW");
if (/€/.test(js.split('var S = [')[0])) console.warn('Atenção: há "€" fora dos textos dos serviços — confira se não é preço.');
fs.writeFileSync(path.join(ROOT, 'js', 'servicios.js'), js);

// imagens usadas pelos serviços
const used = [...js.matchAll(/\['((?:esq|svc)-[\w-]+\.(?:svg|jpg))'/g)].map(m => m[1]);
for (const f of new Set(used)) fs.copyFileSync(path.join(PORTAL_DIR, 'images', f), path.join(ROOT, 'images', f));

// traduções dos serviços
const src = path.join(PORTAL_DIR, 'tools', 'i18n'), dst = path.join(ROOT, 'tools', 'i18n', 'svc');
fs.mkdirSync(dst, { recursive: true });
// só idiomas com todas as frases traduzidas (um idioma pela metade deixaria a página misturada)
const es = JSON.parse(fs.readFileSync(path.join(src, 'svc-es.json'), 'utf8'));
const files = fs.readdirSync(src).filter(f => /^svc-.*\.json$/.test(f));
const langs = [...new Set(files.filter(f => f !== 'svc-es.json').map(f => f.match(/^svc-([a-z]+)/)[1]))];
const fileOf = l => files.filter(f => new RegExp('^svc-' + l + '(\\..+)?\\.json$').test(f));
const ok = langs.filter(l => {
  const t = Object.assign({}, ...fileOf(l).map(f => JSON.parse(fs.readFileSync(path.join(src, f), 'utf8'))));
  return es.every((x, i) => t[i]);
});
for (const f of fs.readdirSync(dst)) fs.unlinkSync(path.join(dst, f));
for (const f of ['svc-es.json', 'ui-c.json'].concat(...ok.map(fileOf))) fs.copyFileSync(path.join(src, f), path.join(dst, f));
console.log('servicios.js atualizado, ' + new Set(used).size + ' imagens. Idiomas completos copiados: ' + ok.join(', ') +
  (langs.length > ok.length ? ' (incompletos ficaram de fora: ' + langs.filter(l => !ok.includes(l)).join(', ') + ')' : ''));
