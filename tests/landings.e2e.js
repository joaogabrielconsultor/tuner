// Testes das páginas /performance e /arquivos (Playwright, sem framework).
//   servidor estático na pasta do projeto (ex.: npx http-server -p 8092, ou qualquer um que sirva pasta/index.html)
//   BASE=http://127.0.0.1:8092 node tests/landings.e2e.js        (SHOTS=<pasta> guarda capturas)
// Não cria pedidos nem cobranças: o portal só é aberto por link; o formulário abre o WhatsApp (window.open interceptado).
'use strict';
const path = require('path');
const fs = require('fs');
let pw;
try { pw = require('playwright-core'); } catch (e) { pw = require(path.join(process.env.PW_HOME || 'C:/tmp/mp-e2e', 'node_modules', 'playwright-core')); }
const BASE = process.env.BASE || 'http://127.0.0.1:8092';
const SHOTS = process.env.SHOTS || null;
const PORTAL = 'https://mido-archivos.onrender.com';
function chrome() {
  if (process.env.CHROME) return process.env.CHROME;
  const dir = path.join(process.env.LOCALAPPDATA || '', 'ms-playwright');
  const c = fs.existsSync(dir) ? fs.readdirSync(dir).filter((d) => /^chromium-\d+$/.test(d)).sort().reverse() : [];
  for (const d of c) for (const sub of ['chrome-win64', 'chrome-win']) { const p = path.join(dir, d, sub, 'chrome.exe'); if (fs.existsSync(p)) return p; }
  return undefined;
}
const results = [];
async function scenario(name, fn) {
  try { await fn(); results.push([true, name]); console.log('✔ ' + name); }
  catch (e) { results.push([false, name]); console.log('✘ ' + name + '\n   ' + String(e && e.message || e).split('\n')[0]); }
}
function expect(c, m) { if (!c) throw new Error(m); }

// espiões instalados antes de qualquer script da página: áudio, window.open e eventos de conversão
function spies() {
  window.__audio = { made: 0, play: 0, pause: 0 };
  var A = window.Audio;
  window.Audio = function (src) { window.__audio.made++; var a = new A(src); var p = a.play.bind(a), q = a.pause.bind(a);
    a.play = function () { window.__audio.play++; return p().catch(function () {}); }; a.pause = function () { window.__audio.pause++; return q(); }; return a; };
  window.__opened = [];
  window.open = function (u) { window.__opened.push(String(u)); return {}; };
  try { localStorage.setItem('brpCookieChoice', 'essential'); } catch (e) {}
}

let browser;
async function open(route, opts) {
  opts = opts || {};
  const ctx = await browser.newContext({ viewport: { width: opts.w || 1440, height: opts.w && opts.w < 500 ? 844 : 900 }, reducedMotion: opts.reduced ? 'reduce' : 'no-preference' });
  await ctx.addInitScript(spies);
  if (opts.lite) await ctx.addInitScript(() => Object.defineProperty(navigator, 'hardwareConcurrency', { get: () => 2 }));
  const p = await ctx.newPage();
  p._errors = []; p._failed = []; p._posts = [];
  p.on('pageerror', (e) => p._errors.push(e.message));
  p.on('console', (m) => { if (m.type() === 'error') p._errors.push(m.text()); });
  p.on('requestfailed', (r) => { if (!/fonts\.g|google/.test(r.url())) p._failed.push(r.url()); });
  p.on('request', (r) => { if (r.method() !== 'GET' && r.method() !== 'HEAD' && r.method() !== 'OPTIONS') p._posts.push(r.method() + ' ' + r.url()); });
  await p.goto(BASE + route, { waitUntil: 'networkidle' });
  return p;
}
async function scrollAll(p) {
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y <= H; y += 400) { await p.evaluate((v) => window.scrollTo(0, v), y); await p.waitForTimeout(60); }
  await p.waitForTimeout(800);
}

(async () => {
  browser = await pw.chromium.launch({ executablePath: chrome(), args: ['--autoplay-policy=no-user-gesture-required'] });

  for (const route of ['/performance/', '/arquivos/']) for (const w of [1440, 390, 320]) {
    await scenario(route + ' ' + w + 'px: carga, imágenes, consola y sin desbordes', async () => {
      const p = await open(route, { w });
      expect(await p.isVisible('h1'), 'h1 visible');
      expect((await p.$$('h1')).length === 1, 'un solo h1');
      // todo arquivo de imagem responde; toda imagem visível carrega (lazy-load: rolar a página e a tira de fotos)
      const srcs = await p.$$eval('main img, main source', (els) => Array.from(new Set(els.flatMap((e) => (e.getAttribute('srcset') || e.getAttribute('src') || '').split(',').map((s) => s.trim().split(' ')[0]).filter(Boolean).map((s) => new URL(s, document.baseURI).href)))));
      for (const s of srcs) { const r = await p.request.get(s); expect(r.status() === 200, 'imagen ' + s + ' → ' + r.status()); }
      await scrollAll(p);
      for (const f of await p.$$('.film')) { await f.scrollIntoViewIfNeeded(); for (let k = 1; k <= 5; k++) { await f.evaluate((el, kk) => { el.scrollLeft = el.scrollWidth * kk / 5; }, k); await p.waitForTimeout(250); } } await p.waitForTimeout(900);
      const broken = await p.$$eval('main img', (im) => im.filter((i) => i.offsetParent && i.getBoundingClientRect().width > 0 && (!i.complete || !i.naturalWidth)).map((i) => i.getAttribute('src')));
      expect(!broken.length, 'imágenes sin cargar: ' + broken.join(', '));
      const ov = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(ov <= 1, 'desborde horizontal ' + ov + 'px');
      expect(!p._errors.length, 'errores de consola: ' + p._errors.join(' | '));
      expect(!p._failed.length, 'peticiones fallidas: ' + p._failed.join(' | '));
      if (SHOTS) await p.screenshot({ path: path.join(SHOTS, route.replace(/\//g, '') + '-' + w + '.png'), fullPage: true });
      await p.context().close();
    });
  }

  await scenario('Todos los enlaces y CTAs llevan a destinos válidos', async () => {
    for (const route of ['/performance/', '/arquivos/']) {
      const p = await open(route);
      const links = await p.$$eval('main a[href], .dock a[href]', (as) => as.map((a) => ({ href: a.href, text: a.textContent.trim(), target: a.target })));
      expect(links.length >= 6, 'pocos enlaces en ' + route);
      for (const l of links) {
        const u = new URL(l.href);
        if (u.protocol === 'tel:' || u.protocol === 'mailto:') continue;
        if (u.hostname === 'wa.me') { expect(/^\/393758172444$/.test(u.pathname) && u.searchParams.get('text'), 'WhatsApp sin número o sin mensaje: ' + l.href); expect(l.target === '_blank', 'WhatsApp en pestaña nueva'); continue; }
        if (l.href.indexOf(PORTAL) === 0) { expect(/^\/(\?registro=1(&tuning=[\w-]+(&opciones=.+)?)?)?$/.test(u.pathname + u.search), 'ruta del portal inesperada: ' + l.href); continue; }
        if (u.hostname === 'www.google.com') { expect(/maps/.test(u.pathname), 'mapa'); continue; }
        if (u.origin === new URL(BASE).origin) {
          if (u.hash && u.pathname === new URL(BASE + route).pathname) { expect(await p.$(u.hash), 'ancla inexistente ' + u.hash); continue; }
          const r = await p.request.get(u.origin + u.pathname);
          expect(r.status() === 200, u.pathname + ' → ' + r.status());
          continue;
        }
        throw new Error('destino no previsto: ' + l.href);
      }
      await p.context().close();
    }
  });

  await scenario('Portal profesional: login y registro reales, sin segundo sistema de acceso', async () => {
    const p = await open('/arquivos/');
    const login = await p.getAttribute('.hero-copy .cta:not(.ghost)', 'href');
    const signup = await p.getAttribute('.hero-copy .cta.ghost', 'href');
    expect(login === PORTAL + '/', 'login → ' + login);
    expect(signup === PORTAL + '/?registro=1', 'registro → ' + signup);
    expect(!(await p.$('input[type=password]')), 'no hay formularios de contraseña en la landing');
    await p.context().close();
  });

  await scenario('Teclado: el primer CTA se alcanza con Tab y el foco es visible; el sonido se activa con Enter', async () => {
    const p = await open('/performance/');
    let found = false;
    for (let i = 0; i < 40 && !found; i++) {
      await p.keyboard.press('Tab');
      found = await p.evaluate(() => document.activeElement && document.activeElement.matches('.hero-copy .cta'));
    }
    expect(found, 'el CTA del héroe no recibe el foco');
    const outline = await p.evaluate(() => getComputedStyle(document.activeElement).outlineStyle);
    expect(outline && outline !== 'none', 'foco sin contorno visible');
    await p.focus('[data-sound]'); await p.keyboard.press('Enter');
    expect((await p.getAttribute('[data-sound]', 'aria-pressed')) === 'true', 'Enter no activa el sonido');
    await p.context().close();
  });

  await scenario('Audio: nada suena al cargar; un solo audio; se pausa al apagar y al ocultar la pestaña', async () => {
    const p = await open('/performance/');
    await p.waitForTimeout(1500);
    let a = await p.evaluate(() => window.__audio);
    expect(a.made === 0 && a.play === 0, 'audio creado o reproducido sin acción: ' + JSON.stringify(a));
    await p.click('[data-sound]'); await p.waitForTimeout(400);
    await p.click('[data-sound]'); await p.click('[data-sound]'); await p.waitForTimeout(300);
    a = await p.evaluate(() => window.__audio);
    expect(a.made === 1, 'más de un audio creado: ' + a.made);
    expect(a.play === 2 && a.pause >= 1, 'play/pause inesperados: ' + JSON.stringify(a));
    await p.evaluate(() => { Object.defineProperty(document, 'hidden', { get: () => true, configurable: true }); document.dispatchEvent(new Event('visibilitychange')); });
    expect((await p.getAttribute('[data-sound]', 'aria-pressed')) === 'false', 'sigue sonando con la pestaña oculta');
    const n = await p.evaluate(() => document.querySelectorAll('audio').length);
    expect(n === 0, 'elementos <audio> extra en la página');
    await p.context().close();
  });

  await scenario('Animaciones: arranque del cuentarrevoluciones, luz de cambio y progreso del proceso', async () => {
    const p = await open('/performance/');
    const r1 = await p.textContent('.t-read b'); await p.waitForTimeout(700); const r2 = await p.textContent('.t-read b');
    expect(r1 !== r2 || +r2 > 0, 'la aguja no se mueve');
    await p.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; document.getElementById('proceso').scrollIntoView(); }); await p.waitForTimeout(600);
    const prog = await p.evaluate(() => +getComputedStyle(document.querySelector('[data-progress]')).getPropertyValue('--p'));
    expect(prog > 0, 'el progreso del proceso no avanza');
    const leds = await p.$$eval('.shiftlight i.on', (l) => l.length);
    expect(leds > 0, 'la luz de cambio no se enciende al bajar');
    await p.context().close();
  });

  await scenario('Movimiento reducido: sin barridos ni máscaras, aguja quieta en ralentí', async () => {
    const p = await open('/performance/', { reduced: true });
    expect(!(await p.isVisible('.hero-sweep')), 'el barrido de luz sigue visible');
    const clip = await p.$eval('.reveal', (e) => getComputedStyle(e).clipPath);
    expect(clip === 'none' || /^inset\(0(px)?\)$/.test(clip), 'las imágenes siguen enmascaradas: ' + clip);
    const a = await p.textContent('.t-read b'); await p.waitForTimeout(800); const b = await p.textContent('.t-read b');
    expect(a === b && +a > 500 && +a < 1200, 'la aguja se mueve con movimiento reducido: ' + a + ' / ' + b);
    await p.context().close();
  });

  await scenario('Aparatos modestos: versión ligera de los efectos', async () => {
    const p = await open('/arquivos/', { lite: true });
    expect(await p.evaluate(() => document.documentElement.classList.contains('fx-lite')), 'no activa fx-lite');
    expect(!(await p.isVisible('.hero-sweep')), 'el barrido se mantiene en fx-lite');
    await p.context().close();
  });

  await scenario('Presupuesto: validación, WhatsApp con el mensaje y evento sin datos personales', async () => {
    const p = await open('/performance/', { w: 390 });
    await p.click('[data-quote-form] button[type=submit]');
    expect((await p.getAttribute('#q-nombre', 'aria-invalid')) === 'true', 'nombre sin marcar como inválido');
    expect(/Revisa/.test(await p.textContent('.qstatus')), 'sin mensaje de error');
    expect(await p.evaluate(() => document.activeElement.id === 'q-nombre'), 'el foco no va al primer error');
    await p.fill('#q-nombre', 'Ana Prueba'); await p.fill('#q-tel', '+34 600 000 000'); await p.selectOption('#q-serv', 'Diagnóstico de averías');
    await p.fill('#q-veh', 'Audi A3 2016'); await p.check('[name=privacidad]');
    await p.click('[data-quote-form] button[type=submit]');
    const opened = await p.evaluate(() => window.__opened);
    expect(opened.length === 1 && /^https:\/\/wa\.me\/393758172444\?text=/.test(opened[0]), 'no abre WhatsApp: ' + opened);
    const txt = decodeURIComponent(opened[0].split('text=')[1]);
    expect(/Diagnóstico de averías/.test(txt) && /Audi A3 2016/.test(txt), 'mensaje sin los datos');
    expect(/Solicitud lista/.test(await p.textContent('.qstatus')), 'sin confirmación');
    const ev = await p.evaluate(() => JSON.stringify(window.dataLayer || []));
    expect(/mido_quote_submit/.test(ev) && !/600 000|Ana Prueba/.test(ev), 'evento ausente o con datos personales: ' + ev);
    await p.context().close();
  });

  await scenario('Área profesional: precios reales del portal y demostración sin pedidos', async () => {
    const p = await open('/arquivos/');
    await p.waitForFunction(() => !/…/.test(document.querySelector('[data-price="stage1"]').textContent), null, { timeout: 15000 });
    const st1 = await p.textContent('[data-price="stage1"]');
    expect(/\d+\s?€|En el portal/.test(st1), 'precio Stage 1: ' + st1);
    await p.waitForFunction(() => document.querySelectorAll('#d-marca option').length > 20, null, { timeout: 15000 });
    await p.selectOption('#d-marca', 'bmw');
    await p.waitForFunction(() => document.querySelectorAll('#d-modelo option').length > 5);
    await p.selectOption('#d-modelo', { label: 'Serie 3' });
    await p.selectOption('#d-gen', { index: 7 });
    await p.selectOption('#d-motor', { index: 1 });
    expect(/BMW Serie 3/.test(await p.textContent('[data-sum-veh]')), 'resumen sin vehículo');
    await p.click('.stage-opt:has(input[value="stage2"])');
    const chip = p.locator('[data-chips] .fx-chip', { hasText: 'DTC off' });
    if (await chip.count()) await chip.click();
    const total = await p.textContent('[data-sum-total]');
    expect(/desde|portal/.test(total), 'total: ' + total);
    const go = await p.getAttribute('[data-go-portal]', 'href');
    expect(go.indexOf(PORTAL + '/?registro=1&tuning=stage2') === 0, 'enlace al portal: ' + go);
    expect(!p._posts.length, 'la demostración hizo escrituras: ' + p._posts.join(' | '));
    await p.context().close();
  });

  await scenario('Rutas antiguas intactas', async () => {
    const p = await open('/');
    for (const r of ['/', '/taller/', '/mecanica/', '/chapa-y-pintura/', '/diagnostico/', '/archivos/', '/vehiculos/', '/contacto/', '/faq/', '/noticias/', '/piezas/', '/taller.html', '/archivos.html']) {
      const res = await p.request.get(BASE + r);
      const body = await res.text();
      expect(res.status() === 200 && /<h1/.test(body) && /site-header/.test(body), r + ' → ' + res.status());
    }
    const sv = await p.request.get(BASE + '/servicios/stage1/');
    expect(sv.status() === 200 && /<title>/.test(await sv.text()), '/servicios/stage1/');
    await p.goto(BASE + '/archivos/', { waitUntil: 'networkidle' });
    expect(!p._errors.length, 'errores en /archivos/: ' + p._errors.join(' | '));
    await p.context().close();
  });

  await browser.close();
  const bad = results.filter((r) => !r[0]).length;
  console.log('\n' + (results.length - bad) + '/' + results.length + ' escenarios OK');
  process.exit(bad ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(2); });
