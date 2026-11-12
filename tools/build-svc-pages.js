#!/usr/bin/env node
// Cria uma página por serviço com endereço limpo: servicios/<id>/index.html (ex.: /servicios/stage2/).
// Não precisa de configuração no Render: ele abre o index.html da pasta sozinho.
// Cada página é uma cópia da página-modelo com <base href="/">, para os caminhos css/, js/ e images/ funcionarem.
// Uso, na pasta do projeto:   node tools/build-svc-pages.js
// (rode de novo sempre que mudar a página-modelo, o cabeçalho/rodapé ou a lista de serviços)
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const TEMPLATE = fs.existsSync(path.join(ROOT, 'servicio.html')) ? 'servicio.html' : 'servicios.html';
const OUT = path.join(ROOT, 'servicios');

const src = fs.readFileSync(path.join(ROOT, 'js', 'servicios.js'), 'utf8').match(/var S = (\[[\s\S]*?\n  \]);/);
if (!src) throw new Error('Não achei a lista de serviços em js/servicios.js');
const S = Function('return ' + src[1])();

let html = fs.readFileSync(path.join(ROOT, TEMPLATE), 'utf8');
const charset = html.match(/<meta charset="[^"]*">\n?/i);
if (!charset) throw new Error('Não achei <meta charset> em ' + TEMPLATE);
html = html.replace(charset[0], charset[0] + '  <base href="/">\n');
// links "#algo" (pular para o conteúdo, âncoras) continuam na mesma página apesar do <base>
const HASH_FIX = '<script>document.addEventListener(\'click\',function(e){var a=e.target.closest&&e.target.closest(\'a[href^="#"]\');if(!a||e.defaultPrevented)return;e.preventDefault();var h=a.getAttribute(\'href\');if(h.length>1){var t=document.getElementById(h.slice(1));if(t)t.scrollIntoView();history.replaceState(null,\'\',location.pathname+h);}});</script>\n';
html = html.replace('</body>', HASH_FIX + '</body>');
html = html.replace('<html', '<!-- Gerado por tools/build-svc-pages.js a partir de ' + TEMPLATE + '. Não edite à mão. -->\n<html');

fs.rmSync(OUT, { recursive: true, force: true });
for (const x of S) {
  fs.mkdirSync(path.join(OUT, x.id), { recursive: true });
  fs.writeFileSync(path.join(OUT, x.id, 'index.html'), html);
}
// /servicios/ também precisa de página: no portal é a própria lista; no site leva à lista em archivos.html
const index = TEMPLATE === 'servicios.html' ? html
  : '<!DOCTYPE html>\n<html lang="es"><head><meta charset="UTF-8"><meta http-equiv="refresh" content="0; url=/archivos.html#servicios"><link rel="canonical" href="/archivos.html#servicios"><title>MIDO Performance | Servicios</title></head><body><a href="/archivos.html#servicios">Ver los servicios</a></body></html>\n';
fs.writeFileSync(path.join(OUT, 'index.html'), index);
console.log(S.length + ' páginas em servicios/<id>/ + servicios/index.html (modelo: ' + TEMPLATE + ')');
