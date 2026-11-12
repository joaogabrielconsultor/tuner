#!/usr/bin/env node
// Endereços profissionais, sem ".html": midoperformance.com/vehiculos/ em vez de /vehiculos.html
// 1) Troca os links internos "pagina.html" por "/pagina/" (index.html -> "/") nas páginas, em partials/ e nos scripts.
// 2) Cria uma pasta por página com uma cópia dela: vehiculos/index.html (o Render abre o index.html da pasta sozinho).
//    A cópia leva <base href="/"> para css/, js/ e images/ continuarem funcionando.
// Os arquivos .html antigos continuam existindo, então links antigos (Google, WhatsApp) não quebram.
// Uso, na pasta do projeto (depois de editar páginas ou rodar sync-layout):
//   node tools/sync-layout.js && node tools/clean-urls.js && node tools/build-svc-pages.js
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const SKIP_FOLDER = new Set(['index', '404', 'servicio']); // index é a raiz; servicio vira servicios/<id>/
const pages = fs.readdirSync(ROOT).filter(f => f.endsWith('.html')).map(f => f.slice(0, -5));
const names = pages.join('|');
const clean = (name, rest) => (name === 'index' ? '/' : '/' + name + '/') + (rest || '');

// links em atributos HTML: href="pagina.html", href="pagina.html?x", href="pagina.html#y"
const reHref = new RegExp('(href=["\'])(?:\\./)?(' + names + ')\\.html([?#][^"\']*)?(["\'])', 'g');
const fixHtml = s => s.replace(reHref, (m, a, n, rest, q) => a + clean(n, rest) + q);
// textos em JavaScript: 'pagina.html', "pagina.html?marca=", href="pagina.html" dentro de strings
const reJs = new RegExp('(["\'=])(?:\\./)?(' + names + ')\\.html(?=[?#"\'])', 'g');
const fixJs = s => s.replace(reJs, (m, a, n) => a + (n === 'index' ? '/' : '/' + n + '/'));

let changed = 0;
const write = (f, s) => { const old = fs.readFileSync(f, 'utf8'); if (old !== s) { fs.writeFileSync(f, s); changed++; } };
for (const p of pages) write(path.join(ROOT, p + '.html'), fixHtml(fs.readFileSync(path.join(ROOT, p + '.html'), 'utf8')));
for (const f of fs.readdirSync(path.join(ROOT, 'partials'))) write(path.join(ROOT, 'partials', f), fixHtml(fs.readFileSync(path.join(ROOT, 'partials', f), 'utf8')));
for (const f of fs.readdirSync(path.join(ROOT, 'js')).filter(f => f.endsWith('.js') && !f.startsWith('i18n'))) {
  const file = path.join(ROOT, 'js', f);
  let s = fs.readFileSync(file, 'utf8');
  // site.js: a detecção da página atual usa o nome do arquivo; não mexer nela
  s = f === 'site.js' ? s.split('\n').map(l => /pathname|page === ''/.test(l) ? l : fixJs(l)).join('\n') : fixJs(s);
  write(file, s);
}

// cópias em pastas
const HASH_FIX = '<script>document.addEventListener(\'click\',function(e){var a=e.target.closest&&e.target.closest(\'a[href^="#"]\');if(!a||e.defaultPrevented)return;e.preventDefault();var h=a.getAttribute(\'href\');if(h.length>1){var t=document.getElementById(h.slice(1));if(t)t.scrollIntoView();history.replaceState(null,\'\',location.pathname+h);}});</script>\n';
let folders = 0;
for (const p of pages.filter(p => !SKIP_FOLDER.has(p))) {
  let html = fs.readFileSync(path.join(ROOT, p + '.html'), 'utf8');
  const charset = html.match(/<meta charset="[^"]*">\n?/i);
  if (!charset) throw new Error('Não achei <meta charset> em ' + p + '.html');
  html = html.replace(charset[0], charset[0] + '  <base href="/">\n').replace('</body>', HASH_FIX + '</body>')
    .replace('<html', '<!-- Gerado por tools/clean-urls.js a partir de ' + p + '.html. Não edite à mão. -->\n<html');
  fs.mkdirSync(path.join(ROOT, p), { recursive: true });
  fs.writeFileSync(path.join(ROOT, p, 'index.html'), html);
  folders++;
}
console.log(changed + ' arquivo(s) com links atualizados; ' + folders + ' páginas em pasta (/' + pages.filter(p => !SKIP_FOLDER.has(p)).slice(0, 3).join('/, /') + '/ …)');
