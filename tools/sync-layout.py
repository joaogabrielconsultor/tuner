#!/usr/bin/env python3
"""
Copia o cabeçalho, o rodapé e os recursos comuns (fontes, CSS) de partials/
para todas as páginas do site.

Cada página tem marcadores assim:
    <!-- layout:header --> ... <!-- /layout:header -->
Tudo entre eles é substituído pelo conteúdo de partials/header.html.

Uso (na pasta do projeto):   python3 tools/sync-layout.py
"""
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
PARTS = ['head', 'header', 'footer', 'contact']
partials = {p: (ROOT / 'partials' / f'{p}.html').read_text(encoding='utf-8').rstrip('\n') for p in PARTS}

changed = 0
for page in sorted(ROOT.glob('*.html')):
    html = page.read_text(encoding='utf-8')
    new = html
    for p in PARTS:
        pattern = re.compile(r'([ \t]*)<!-- layout:%s -->.*?<!-- /layout:%s -->' % (p, p), re.S)
        new = pattern.sub(lambda m: '%s<!-- layout:%s -->\n%s\n%s<!-- /layout:%s -->' % (m.group(1), p, partials[p], m.group(1), p), new)
    if new != html:
        page.write_text(new, encoding='utf-8')
        changed += 1
        print('atualizado:', page.name)
print(f'{changed} página(s) atualizada(s).')
