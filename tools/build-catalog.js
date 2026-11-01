#!/usr/bin/env node
/*
 * Gera os arquivos do catálogo usados pelo site a partir de js/brands.js.
 *
 *   data/catalog/index.json      -> lista leve de marcas (nome, logo, tipo, modelos)
 *   data/catalog/<marca>.json    -> dados completos de uma marca (modelos, anos, motores, stages)
 *
 * js/brands.js continua sendo a fonte oficial (é o que o editor custom.html gera).
 * Sempre que trocar o js/brands.js, rode:   node tools/build-catalog.js
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const src = fs.readFileSync(path.join(root, 'js/brands.js'), 'utf8')
  // remove o trecho final que lê o localStorage (só existe no navegador)
  .replace(/\(function \(\) \{[\s\S]*$/, '');

const ctx = {};
new Function('ctx', src
  .replace('const BRANDS', 'ctx.BRANDS')
  .replace('const VEHICLE_TYPES', 'ctx.VEHICLE_TYPES'))(ctx);

const { BRANDS, VEHICLE_TYPES } = ctx;
const outDir = path.join(root, 'data/catalog');
fs.mkdirSync(outDir, { recursive: true });

const typeOf = {};
Object.keys(VEHICLE_TYPES).forEach(function (t) {
  VEHICLE_TYPES[t].forEach(function (slug) { typeOf[slug] = t; });
});

const index = { types: VEHICLE_TYPES, brands: {} };
let total = 0;

Object.keys(BRANDS).forEach(function (slug) {
  const b = BRANDS[slug];
  const models = (b.models || []).map(function (m) { return typeof m === 'string' ? m : m.name; });
  index.brands[slug] = { name: b.name, logo: b.logo || '', type: typeOf[slug] || 'coche', models: models };
  const json = JSON.stringify(Object.assign({ slug: slug }, b));
  fs.writeFileSync(path.join(outDir, slug + '.json'), json);
  total += json.length;
});

fs.writeFileSync(path.join(outDir, 'index.json'), JSON.stringify(index));
console.log('Catálogo gerado: ' + Object.keys(BRANDS).length + ' marcas, ' +
  Math.round(total / 1024) + ' KB em data/catalog/');
