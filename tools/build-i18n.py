#!/usr/bin/env python3
"""
Gera js/i18n-<idioma>.js a partir de tools/i18n/<idioma>.json (textos em espanhol -> outro idioma).

<idioma>.json:
  { "strings": { "Texto en español": "Translated text", ... },
    "patterns": [ ["regex em espanhol (.*)", "Translated $1"], ... ] }

Uso (na pasta do projeto):   python3 tools/build-i18n.py
Para mudar uma tradução: edite tools/i18n/<idioma>.json e rode este comando.
Para ver o que falta traduzir num idioma: python3 tools/build-i18n.py --faltando de
"""
import json, pathlib, re, sys
ROOT = pathlib.Path(__file__).resolve().parent.parent
norm = lambda s: re.sub(r'\s+', ' ', s).strip()
files = sorted((ROOT / 'tools/i18n').glob('*.json'))
if len(sys.argv) > 2 and sys.argv[1] == '--faltando':
    base = set(json.loads((ROOT / 'tools/i18n/en.json').read_text(encoding='utf-8'))['strings'])
    have = set(json.loads((ROOT / f'tools/i18n/{sys.argv[2]}.json').read_text(encoding='utf-8'))['strings'])
    for k in sorted(base - have): print(k)
    sys.exit()
for f in files:
    src = json.loads(f.read_text(encoding='utf-8'))
    strings = {norm(k): v for k, v in src['strings'].items() if norm(k) and v}
    out = ('// Gerado por tools/build-i18n.py a partir de tools/i18n/%s. Não edite à mão.\nwindow.MP_I18N = ' % f.name +
           json.dumps({'strings': strings, 'patterns': src.get('patterns', [])}, ensure_ascii=False, separators=(',', ':')) + ';\n')
    (ROOT / f'js/i18n-{f.stem}.js').write_text(out, encoding='utf-8')
    print(f'{f.stem}: {len(strings)} textos, {len(src.get("patterns", []))} padrões')
