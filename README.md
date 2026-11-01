# Carbon Performance — site

Site estático (HTML, CSS e JavaScript, sem servidor), publicado no Render a partir da branch `main`.

## Estrutura

| Caminho | O que é |
| --- | --- |
| `*.html` | Páginas do site |
| `css/carbon.css` | Todo o visual do site |
| `js/site.js` | Menu, carrosséis, vídeos, FAQ, avisos e formulário de contato (→ WhatsApp) |
| `js/catalog.js` | Leitura do catálogo e buscador de veículo da home |
| `js/marca.js`, `js/motor.js` | Páginas de marca (modelo → ano → motor) e de motor (etapas e preço) |
| `js/config.js` | Telefone, endereço, e-mail e redes sociais (também editável pelo `admin.html`) |
| `js/brands.js` | Catálogo completo — fonte oficial, gerado pelo editor `custom.html` |
| `data/catalog/` | Catálogo dividido por marca, usado pelo site (gerado a partir do `js/brands.js`) |
| `partials/` | Cabeçalho, rodapé e recursos comuns a todas as páginas |
| `tools/` | Scripts de manutenção |

## Tarefas comuns

**Mudou o catálogo (`js/brands.js`)?** Gere de novo os arquivos por marca:

```
node tools/build-catalog.js
```

**Mudou o cabeçalho ou o rodapé?** Edite `partials/header.html` ou `partials/footer.html` e aplique em todas as páginas:

```
python3 tools/sync-layout.py
```
