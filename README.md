# MIDO Performance — site

Site estático (HTML, CSS e JavaScript, sem servidor), publicado no Render a partir da branch `main`.

## Estrutura

| Caminho | O que é |
| --- | --- |
| `*.html` | Páginas do site |
| `css/carbon.css` | Todo o visual do site |
| `js/site.js` | Menu, carrosséis, avisos, animações, botão fixo e formulários (→ WhatsApp) |
| `js/catalog.js` | Leitura do catálogo e configurador de veículo (tipo → marca → modelo → ano → motor) |
| `js/motor.js` | Página de resultado (etapas, potência, par, preço e pedido por WhatsApp) |
| `js/config.js` | Telefone, endereço, e-mail e redes sociais |
| `js/brands.js` | Catálogo completo — fonte oficial (editar aqui e rodar `node tools/build-catalog.js`) |
| `data/catalog/` | Catálogo dividido por marca, usado pelo site (gerado a partir do `js/brands.js`) |
| `partials/` | Cabeçalho, rodapé e recursos comuns a todas as páginas |
| `tools/` | Scripts de manutenção |

## Tarefas comuns

**Mudou o catálogo (`js/brands.js`)?** Gere de novo os arquivos por marca:

```
node tools/build-catalog.js
```

**Mudou o cabeçalho, o rodapé ou o bloco Contáctanos?** Edite `partials/header.html`, `partials/footer.html` ou `partials/contact.html` e aplique em todas as páginas:

```
python3 tools/sync-layout.py
```

## Idiomas (ES, EN, NL, DE, FR, IT, EL, PT, 中文, العربية)

O site é escrito em espanhol. Os outros idiomas são traduzidos no navegador, quando o visitante escolhe o idioma no seletor 🌐 do topo (a escolha fica guardada; também dá para mandar um link com `?lang=en`, `?lang=de`, etc.).

- Textos traduzidos: `tools/i18n/<idioma>.json` (frase em espanhol → tradução).
- Depois de editar, rode `python3 tools/build-i18n.py` para gerar `js/i18n-<idioma>.js`.
- Texto novo em espanhol no site precisa de uma linha nova em cada JSON; para ver o que falta: `python3 tools/build-i18n.py --faltando de`.
- Mensagens de WhatsApp continuam em espanhol (são para a oficina).
- Árabe (`ar`) vira a página para a direita-para-esquerda (`dir="rtl"`); ajustes de layout ficam no fim de `css/carbon.css`.
