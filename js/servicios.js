// MIDO Performance — serviços de arquivos (acordeão em archivos.html e página servicio.html?s=<id>)
// Para mudar textos, edite SERVICIOS abaixo. Traduções: tools/i18n/<idioma>.json (mesmo texto em espanhol como chave).
// Campos: c = categoria, t = título, r = resumo (acordeão), q = o que é, s = quando precisa, b = benefícios,
//         f = perguntas frequentes [pergunta, resposta], g = etiquetas, e = 1 se for função antipoluição
(function () {
  var CAT = { pot: 'Potencia', caja: 'Caja de cambios', emi: 'Emisiones', fun: 'Funciones' };
  var S = [
    { id: 'stage1', c: 'pot', t: 'Stage 1', g: ['Sin piezas nuevas', 'Reversible'],
      r: 'Reprogramamos la centralita sin cambiar ninguna pieza. Ajustamos inyección, presión de turbo, avance y limitadores de par para ganar potencia y respuesta sin salir de los márgenes de seguridad del motor.',
      q: 'Es la reprogramación más pedida: solo se modifica el software de la centralita, con el coche tal como sale de fábrica. Cada archivo se ajusta al motor y se comprueba en banco de potencia.',
      s: ['Quieres más potencia y par sin tocar la mecánica.', 'El coche se siente lento al adelantar o con carga.', 'Buscas una respuesta del acelerador más directa.'],
      b: ['Más potencia y par en todo el rango de revoluciones.', 'Mejor respuesta y adelantamientos más seguros.', 'Consumo igual o menor en conducción normal.'],
      f: [['¿Hace falta cambiar alguna pieza?', 'No. El Stage 1 se hace solo por software, con el coche de serie en buen estado.'], ['¿Se puede volver a la configuración de fábrica?', 'Sí. Guardamos tu archivo original y lo podemos volver a escribir cuando quieras.']] },
    { id: 'stage2', c: 'pot', t: 'Stage 2', g: ['Con piezas de mejora'],
      r: 'Para coches con mejoras mecánicas como downpipe, admisión, intercooler o escape. Calibramos el software para aprovechar esas piezas con seguridad.',
      q: 'El Stage 2 parte de un Stage 1 y lo adapta a las piezas de mejora montadas. Sin la calibración correcta esas piezas no rinden o pueden dar averías.',
      s: ['Has montado downpipe, admisión o intercooler.', 'Tu coche ya tiene Stage 1 y quieres el siguiente paso.', 'Aparecen errores tras cambiar piezas de escape o admisión.'],
      b: ['Más potencia que con un Stage 1.', 'Las piezas nuevas trabajan en armonía con el motor.', 'Temperaturas y presiones bajo control.'],
      f: [['¿Qué piezas necesito?', 'Normalmente downpipe y admisión; según el motor, también intercooler o escape. Dinos qué tienes montado al hacer el pedido.'], ['¿Sirve un Stage 2 sin piezas?', 'No. Sin las piezas de mejora el Stage 2 no aporta y puede forzar el motor.']] },
    { id: 'stage3', c: 'pot', t: 'Stage 3', g: ['A medida', 'Consúltanos antes de pedir'],
      r: 'Proyectos a medida con turbo mayor, inyectores, embrague y otras piezas. Desarrollamos el archivo según la configuración exacta de tu coche.',
      q: 'Para preparaciones profundas: turbo de mayor tamaño, inyectores, bomba, embrague reforzado y otras piezas. Cada archivo es un desarrollo propio para esa configuración.',
      s: ['Has cambiado el turbo o los inyectores.', 'Preparas un coche para circuito o competición.', 'Necesitas una calibración que no existe de serie.'],
      b: ['Máxima potencia de tu configuración.', 'Desarrollo a medida y probado.', 'Seguimiento técnico durante el proyecto.'],
      f: [['¿Cuánto se tarda?', 'Depende del proyecto. Antes de pedir, escríbenos con la lista de piezas para valorarlo.'], ['¿Hace falta probar el coche en banco?', 'Es lo más recomendable en un Stage 3 para ajustar el archivo con datos reales.']] },
    { id: 'tcu', c: 'caja', t: 'Caja automática (TCU)', g: ['Ideal junto a un Stage'],
      r: 'Reprogramamos el cambio automático para que cambie más rápido, admita más par y responda mejor, en sintonía con la centralita del motor.',
      q: 'La caja automática tiene su propia centralita (TCU), que limita el par y decide cuándo cambiar. Al subir la potencia del motor, conviene adaptarla también.',
      s: ['Tras un Stage la caja limita la potencia.', 'Los cambios son lentos o patinan con carga.', 'Quieres un modo más deportivo.'],
      b: ['Cambios más rápidos y firmes.', 'La caja admite el par del motor modificado.', 'Mejor respuesta en reducciones y salidas.'],
      f: [['¿Es obligatorio con un Stage 1?', 'No siempre, pero en muchas cajas mejora mucho el resultado y evita que la caja recorte el par.'], ['¿Qué cajas se pueden programar?', 'DSG, ZF, Aisin y otras según el modelo. Indícanos la caja al hacer el pedido.']] },
    { id: 'e85', c: 'pot', t: 'Conversión E85', g: ['Consúltanos antes de pedir'],
      r: 'Adaptamos la centralita para funcionar con bioetanol E85, ajustando inyección y encendido para aprovechar su mayor octanaje.',
      q: 'El E85 tiene más octanaje que la gasolina, lo que permite más avance y presión de turbo. Necesita más caudal de combustible, así que el software debe adaptarse.',
      s: ['Quieres usar E85 o mezclas con etanol.', 'Buscas más potencia en un motor turbo de gasolina.', 'Preparas el coche para competición.'],
      b: ['Más potencia gracias al mayor octanaje.', 'Motor más fresco frente a la detonación.', 'Calibración ajustada a tu mezcla.'],
      f: [['¿Mi coche necesita piezas nuevas?', 'Muchas veces hace falta más caudal de inyectores o bomba. Te lo confirmamos antes de pedir.'], ['¿Puedo seguir usando gasolina?', 'Depende de la calibración. Lo decidimos contigo según el uso.']] },
    { id: 'dpf', c: 'emi', e: 1, t: 'DPF off', g: ['Solo competición'],
      r: 'Desactivamos en la centralita la gestión del filtro de partículas: regeneraciones, avisos y modo de emergencia.',
      q: 'El filtro de partículas (DPF o FAP) retiene el hollín de los motores diésel y se limpia con regeneraciones. Cuando falla, provoca pérdidas de potencia y modo de emergencia.',
      s: ['Regeneraciones que no terminan con trayectos cortos.', 'Testigo del filtro y modo de emergencia.', 'Vehículos de competición o maquinaria fuera de vía pública.'],
      b: ['Sin regeneraciones ni avisos.', 'Menos contrapresión de escape.', 'Sin testigos de avería relacionados.'],
      f: [['¿Es legal?', 'No para vehículos que circulan por vía pública en la mayoría de países. Es un servicio para competición y uso fuera de vías públicas.'], ['¿Se quedan testigos encendidos?', 'No. Desactivamos los sensores y funciones del filtro en la centralita.']] },
    { id: 'egr', c: 'emi', e: 1, t: 'EGR off', g: ['Solo competición'],
      r: 'Desactivamos la válvula EGR por software para que no recircule gases de escape y la admisión se mantenga más limpia.',
      q: 'La válvula EGR devuelve parte de los gases de escape a la admisión. Con el tiempo se llena de carbonilla, se atasca y provoca tirones y averías.',
      s: ['Válvula EGR atascada o con fallos.', 'Admisión llena de carbonilla.', 'Tirones y pérdida de potencia a bajas vueltas.'],
      b: ['Admisión más limpia.', 'Respuesta más estable.', 'Sin errores de la válvula EGR.'],
      f: [['¿Hay que quitar la válvula?', 'Normalmente no: se desactiva por software. Según el motor, se recomienda cegarla.'], ['¿Es legal?', 'No para vía pública en la mayoría de países. Solo competición y uso fuera de vías públicas.']] },
    { id: 'adblue', c: 'emi', e: 1, t: 'AdBlue off', g: ['Solo competición'],
      r: 'Desactivamos el sistema SCR/AdBlue: sin consumo de AdBlue y sin avisos ni cuenta atrás de arranque.',
      q: 'El sistema SCR inyecta AdBlue en el escape para reducir NOx. Sus averías (inyector, bomba, sensores, cristalización) pueden bloquear el arranque del vehículo.',
      s: ['Cuenta atrás de arranque por fallo de AdBlue.', 'Inyector o bomba de AdBlue averiados.', 'Camiones y maquinaria fuera de vía pública.'],
      b: ['Sin consumo de AdBlue.', 'Sin bloqueos de arranque.', 'Sin testigos del sistema SCR.'],
      f: [['¿Hay que desmontar el sistema?', 'No es necesario: se desactiva por software.'], ['¿Es legal?', 'No para vía pública en la mayoría de países. Solo competición y uso fuera de vías públicas.']] },
    { id: 'nox', c: 'emi', e: 1, t: 'NOx off', g: ['Solo competición'],
      r: 'Desactivamos la gestión de los sensores de NOx y las averías asociadas a ellos.',
      q: 'Los sensores de NOx miden los óxidos de nitrógeno del escape. Son caros y fallan a menudo, encendiendo testigos o limitando el motor.',
      s: ['Sensor de NOx averiado.', 'Testigo de emisiones encendido.', 'Motor limitado por fallo de sensor.'],
      b: ['Sin errores de los sensores de NOx.', 'Sin limitación de potencia por el sensor.', 'Ahorro en sensores caros.'],
      f: [['¿Se hace junto con AdBlue off?', 'Muchas veces sí, porque los dos sistemas trabajan juntos.'], ['¿Es legal?', 'No para vía pública en la mayoría de países. Solo competición y uso fuera de vías públicas.']] },
    { id: 'evap', c: 'emi', e: 1, t: 'EVAP off', g: ['Solo competición'],
      r: 'Desactivamos la gestión del sistema EVAP de vapores de combustible y sus errores en la centralita.',
      q: 'El sistema EVAP recoge los vapores del depósito en un cánister y los quema en el motor. Sus fugas y válvulas dan errores frecuentes en motores de gasolina.',
      s: ['Errores de fuga EVAP.', 'Válvula de purga averiada.', 'Testigo del motor por el sistema EVAP.'],
      b: ['Sin errores EVAP recurrentes.', 'Ralentí más estable.', 'Diagnóstico más limpio.'],
      f: [['¿Se quita el cánister?', 'No hace falta: el ajuste es en la centralita.'], ['¿Es legal?', 'No para vía pública en la mayoría de países. Solo competición y uso fuera de vías públicas.']] },
    { id: 'readiness', c: 'emi', e: 1, t: 'Readiness Monitor', g: ['Solo competición'],
      r: 'Ajustamos los monitores de emisiones de la centralita para que no queden pendientes tras una modificación.',
      q: 'La centralita comprueba de forma continua los sistemas de emisiones (catalizador, sondas, EGR…). Tras cambiar piezas, algunos monitores quedan sin completar o dan error.',
      s: ['Monitores que nunca se completan.', 'Errores de catalizador o sondas tras modificar el escape.', 'Proyectos de competición con hardware cambiado.'],
      b: ['Monitores coherentes con el hardware real.', 'Menos testigos recurrentes.', 'Diagnóstico más claro.'],
      f: [['¿Afecta al rendimiento?', 'No. Solo cambia cómo la centralita comprueba los sistemas.'], ['¿Es legal?', 'No para vía pública en la mayoría de países. Solo competición y uso fuera de vías públicas.']] },
    { id: 'sap', c: 'emi', e: 1, t: 'Aire secundario off', g: ['Solo competición'],
      r: 'Desactivamos la bomba de aire secundario (SAP) y sus errores en la centralita.',
      q: 'La bomba de aire secundario inyecta aire en el escape durante el arranque en frío. Con los años la bomba y sus válvulas fallan y dan errores.',
      s: ['Bomba de aire secundario averiada o ruidosa.', 'Errores del sistema de aire secundario.', 'Proyectos con escape modificado.'],
      b: ['Sin errores del sistema SAP.', 'Arranque más silencioso.', 'Menos mantenimiento.'],
      f: [['¿Se nota en el rendimiento?', 'No. Solo actúa en el arranque en frío.'], ['¿Es legal?', 'No para vía pública en la mayoría de países. Solo competición y uso fuera de vías públicas.']] },
    { id: 'swirl', c: 'fun', t: 'Swirl Flaps off', g: [],
      r: 'Desactivamos las mariposas de admisión variable (swirl flaps) para evitar sus roturas y errores.',
      q: 'Las swirl flaps son pequeñas mariposas en el colector de admisión. Con la carbonilla se agarrotan o se rompen, y una pieza suelta puede dañar el motor.',
      s: ['Errores del actuador de las mariposas.', 'Mariposas agarrotadas por carbonilla.', 'Quieres prevenir roturas dentro del motor.'],
      b: ['Menos riesgo de averías graves.', 'Respuesta más lineal.', 'Sin errores del actuador.'],
      f: [['¿Hay que desmontar el colector?', 'Si las mariposas se retiran físicamente, sí. El software evita los errores después.'], ['¿Se nota el cambio?', 'El motor funciona igual de suave y sin los fallos del actuador.']] },
    { id: 'flaps', c: 'fun', t: 'Exhaust Flaps', g: ['Mejor con escape deportivo'],
      r: 'Controlamos la válvula del escape para que se mantenga abierta, cerrada o según el modo que prefieras.',
      q: 'Muchos coches deportivos tienen una válvula en el escape que cambia el sonido. La centralita decide cuándo abrirla según el modo y las revoluciones.',
      s: ['Quieres el escape abierto con más sonido.', 'La válvula da errores o se queda bloqueada.', 'Has montado un escape deportivo.'],
      b: ['Sonido a tu gusto.', 'Sin errores de la válvula.', 'Funciona con escapes de serie y deportivos.'],
      f: [['¿Se puede dejar para uso diario?', 'Sí. Podemos dejar un comportamiento que se adapte al modo de conducción.'], ['¿Sirve con escape de serie?', 'Sí, si el coche tiene válvula de escape.']] },
    { id: 'dtc', c: 'fun', t: 'DTC off', g: [],
      r: 'Eliminamos códigos de avería concretos que quedan tras una modificación, para que no se encienda el testigo del motor.',
      q: 'Tras cambiar o quitar piezas, la centralita puede seguir guardando códigos de avería (DTC) que no corresponden a un fallo real.',
      s: ['Testigo encendido por una pieza ya cambiada.', 'Errores que vuelven tras borrarlos.', 'Piezas sin equivalencia exacta con las de serie.'],
      b: ['Cuadro sin testigos innecesarios.', 'Los fallos reales se siguen detectando.', 'Solo tocamos los códigos que nos indiques.'],
      f: [['¿Se pueden quitar todos los códigos?', 'No es recomendable. Eliminamos solo los concretos para no ocultar averías reales.'], ['¿Qué datos necesitáis?', 'El código exacto (por ejemplo P0420) y qué pieza se ha cambiado.']] },
    { id: 'immo', c: 'fun', t: 'Immo off', g: ['Consúltanos antes de pedir'],
      r: 'Desactivamos el inmovilizador en la centralita, útil al cambiar o reparar una centralita. Depende de cada modelo de ECU.',
      q: 'El inmovilizador impide arrancar si la llave no está reconocida. Al sustituir una centralita usada o repararla, a veces no se puede emparejar de nuevo.',
      s: ['Centralita de segunda mano o sustituida.', 'Fallo del inmovilizador o de la llave.', 'Motores trasplantados o proyectos especiales.'],
      b: ['El motor arranca sin depender del inmovilizador.', 'Ahorro frente a una centralita nueva.', 'Válido para proyectos especiales.'],
      f: [['¿Funciona en todas las centralitas?', 'No. Depende del modelo; te confirmamos si es posible antes de pagar.'], ['¿Necesitáis algún dato extra?', 'La lectura completa de la centralita y, si la tienes, la de la caja del inmovilizador.']] },
    { id: 'hotstart', c: 'fun', t: 'Hot Start', g: [],
      r: 'Corregimos el arranque difícil con el motor caliente ajustando la estrategia de arranque en la centralita.',
      q: 'Algunos motores diésel y gasolina cuestan de arrancar en caliente por la presión de combustible o la mezcla de arranque.',
      s: ['El motor tarda en arrancar en caliente.', 'Tirones o paradas justo después de arrancar.', 'Vehículos con paradas cortas frecuentes.'],
      b: ['Arranque inmediato con el motor caliente.', 'Menos desgaste de batería y motor de arranque.', 'Funcionamiento más suave al arrancar.'],
      f: [['¿Hay que cambiar piezas?', 'No siempre. Si el problema es mecánico te lo indicamos, porque el software no lo arregla.'], ['¿Se nota enseguida?', 'Sí, desde el primer arranque en caliente.']] },
    { id: 'launch', c: 'fun', t: 'Launch Control', g: [],
      r: 'Activamos un control de salida: el motor se mantiene a unas revoluciones fijas para arrancar con la máxima tracción.',
      q: 'El launch control fija las revoluciones con el coche parado y el acelerador a fondo, para salir siempre igual y con la máxima tracción.',
      s: ['Quieres salidas rápidas y repetibles.', 'Usas el coche en circuito o en eventos.', 'Tu coche no trae launch control de serie.'],
      b: ['Salidas más rápidas y constantes.', 'Revoluciones de salida a tu medida.', 'Combinable con Stage 1 y Stage 2.'],
      f: [['¿Daña el embrague?', 'Un uso razonable no. Ajustamos las revoluciones según el coche y el embrague.'], ['¿Cómo se activa?', 'Normalmente con el coche parado, embrague o freno pisado y acelerador a fondo. Te explicamos el método de tu coche.']] },
    { id: 'popbang', c: 'fun', t: 'Pop & Bang', g: ['Mejor con escape deportivo'],
      r: 'Petardeo y explosiones en el escape al soltar el acelerador, con la intensidad que prefieras.',
      q: 'Es un ajuste de la inyección y el encendido al soltar gas que provoca petardeos en el escape. Elige entre una intensidad suave, media o agresiva.',
      s: ['Quieres un sonido más deportivo.', 'Has montado un escape deportivo.', 'Preparas el coche para eventos o exhibiciones.'],
      b: ['Intensidad suave, media o agresiva.', 'Ajustado a tu motor y escape.', 'Se puede quitar cuando quieras.'],
      f: [['¿Hace falta escape deportivo?', 'No es obligatorio, pero con escape deportivo el efecto se oye mucho más.'], ['¿Daña el motor o el escape?', 'Con una intensidad razonable y bien calibrada, no. Te recomendamos el nivel según tu coche.']] },
    { id: 'hardcut', c: 'fun', t: 'Hard Cut limiter', g: [],
      r: 'Corte de inyección seco al llegar al limitador de revoluciones, con sonido de competición.',
      q: 'En lugar del limitador suave de fábrica, el motor corta la inyección de golpe al llegar al tope de vueltas, como un coche de carreras.',
      s: ['Quieres el sonido del limitador de competición.', 'Usas el coche en eventos o exhibiciones.', 'Diésel preparados con efecto pop corn.'],
      b: ['Sonido de competición en el limitador.', 'Revoluciones de corte a tu medida.', 'Se puede combinar con Launch Control.'],
      f: [['¿Funciona en diésel?', 'Sí, en muchos diésel se hace con efecto pop corn.'], ['¿Se puede quitar después?', 'Sí. Volvemos a dejar el limitador de serie cuando quieras.']] },
    { id: 'vmax', c: 'fun', t: 'Vmax off', g: [],
      r: 'Eliminamos o subimos el limitador de velocidad máxima de fábrica.',
      q: 'Muchos coches tienen la velocidad máxima limitada por software. También podemos poner un límite concreto, útil para flotas.',
      s: ['Tu coche está limitado de fábrica.', 'Uso en circuito.', 'Flotas que quieren fijar una velocidad máxima.'],
      b: ['Velocidad máxima liberada o a tu medida.', 'Sin afectar al resto de funciones.', 'Útil también para limitar flotas.'],
      f: [['¿Podéis poner un límite concreto?', 'Sí. Indícanos la velocidad máxima que quieres.'], ['¿Afecta a los neumáticos?', 'Usa siempre neumáticos homologados para la velocidad que vayas a alcanzar.']] },
    { id: 'startstop', c: 'fun', t: 'Start / Stop off', g: [],
      r: 'Desactivamos el sistema Start/Stop para que el motor no se apague en cada parada.',
      q: 'El Start/Stop apaga el motor en cada parada. Muchos conductores prefieren que no lo haga para no tener que desactivarlo en cada viaje.',
      s: ['No quieres que el motor se apague en los semáforos.', 'Batería o motor de arranque con mucho desgaste.', 'Uso urbano con muchas paradas.'],
      b: ['El motor no se apaga en cada parada.', 'No tienes que pulsar el botón en cada viaje.', 'Menos ciclos de arranque.'],
      f: [['¿Se puede volver a activar?', 'Sí, escribiendo de nuevo el archivo original.'], ['¿Afecta a la batería?', 'No. Al contrario, reduce los ciclos de arranque.']] },
    { id: 'original', c: 'fun', t: 'Volver a original', g: [],
      r: 'Devolvemos la centralita a su software de fábrica, por ejemplo para vender el coche o pasar una revisión en el concesionario.',
      q: 'Escribimos de nuevo el software de fábrica en la centralita, desde tu copia original o desde un software oficial del fabricante.',
      s: ['Vas a vender el coche.', 'Revisión o actualización en el concesionario.', 'Software corrupto o mal modificado.'],
      b: ['Centralita con software de fábrica.', 'Base limpia para una futura reprogramación.', 'Soluciona fallos por software incorrecto.'],
      f: [['¿Necesitáis mi archivo original?', 'Si lo tienes, mejor. Si no, buscamos un software original compatible.'], ['¿Se puede reprogramar después?', 'Sí, la centralita queda lista para futuras calibraciones.']] }
  ];
  var BY = {}; S.forEach(function (x) { BY[x.id] = x; });
  var CFG = (typeof BRP_CONFIG !== 'undefined' && BRP_CONFIG.archivos) || {};
  var PORTAL = CFG.portal || 'https://mido-archivos.onrender.com';
  var WA = 'https://api.whatsapp.com/send?phone=393758172444&text=';
  var ARROW = '<span class="ico"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M6 3l5 5-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>';
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function tags(x) { return x.g.length ? '<ul class="acc-tags">' + x.g.map(function (g) { return '<li' + (g === 'Solo competición' ? ' class="tag-warn"' : '') + '>' + esc(g) + '</li>'; }).join('') + '</ul>' : ''; }

  // Acordeão (archivos.html)
  var acc = document.getElementById('acc-list');
  if (acc) {
    acc.innerHTML = S.map(function (x, i) {
      return '<details name="svc"' + (i === 0 ? ' open' : '') + '><summary>' + esc(x.t) + '</summary><div class="acc-body"><p>' + esc(x.r) + '</p>' + tags(x) +
        '<a class="acc-more" href="servicio.html?s=' + x.id + '">Ver más</a></div></details>';
    }).join('');
  }

  // Página do serviço (servicio.html?s=<id>)
  var page = document.getElementById('sv-page');
  if (!page) return;
  var id = new URLSearchParams(location.search).get('s'), x = BY[id];
  if (!x) {
    page.innerHTML = '<section class="container sv-hero"><h1>Servicio no encontrado</h1><p><a class="btn" href="archivos.html#servicios">Ver todos los servicios ' + ARROW + '</a></p></section>';
    return;
  }
  document.title = 'MIDO Performance | ' + x.t;
  document.querySelectorAll('[data-match~="archivos.html"]').forEach(function (li) { li.classList.add('active'); });
  var waText = encodeURIComponent('Hola MIDO Performance, quiero información sobre: ' + x.t);
  var steps = [['Lectura', 'Lees la centralita con tu equipo y nos envías el archivo original.'],
    ['Análisis', 'Revisamos el software y la configuración del vehículo.'],
    ['Calibración', 'Modificamos el archivo a mano y corregimos el checksum.'],
    ['Entrega y soporte', 'Te devolvemos el archivo listo para escribir y te ayudamos si lo necesitas.']];
  var others = S.filter(function (o) { return o.c === x.c && o.id !== x.id; }).slice(0, 8);
  page.innerHTML =
    '<section class="container sv-hero"><span class="kicker">' + esc(CAT[x.c]) + '</span><h1>' + esc(x.t) + '</h1><p>' + esc(x.r) + '</p>' + tags(x) +
      '<div class="files-cta-btns"><a class="btn" href="' + PORTAL + '">Pedir en el portal ' + ARROW + '</a><a class="btn btn-ghost" href="' + WA + waText + '" target="_blank" rel="noopener">Consultar por WhatsApp</a></div></section>' +
    '<section class="container sv-grid">' +
      '<div class="sv-card"><h2>Qué es</h2><p>' + esc(x.q) + '</p></div>' +
      '<div class="sv-card"><h2>Cuándo lo necesitas</h2><ul class="sv-list">' + x.s.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul></div>' +
    '</section>' +
    '<section class="container sv-steps"><h2>Cómo trabajamos</h2><ol>' + steps.map(function (s) { return '<li><b>' + s[0] + '</b><span>' + s[1] + '</span></li>'; }).join('') + '</ol></section>' +
    '<section class="container sv-benefits"><h2>Beneficios</h2><ul>' + x.b.concat(['Guardamos siempre tu archivo original.', 'Soporte técnico después de la entrega.']).map(function (b) { return '<li>' + esc(b) + '</li>'; }).join('') + '</ul></section>' +
    '<section class="container files-acc sv-faq"><h2>Preguntas frecuentes</h2><div class="acc">' + x.f.map(function (q, i) { return '<details name="faq"' + (i === 0 ? ' open' : '') + '><summary>' + esc(q[0]) + '</summary><div class="acc-body"><p>' + esc(q[1]) + '</p></div></details>'; }).join('') + '</div>' +
      (x.e ? '<p class="files-acc-note">Las funciones antipolución son solo para competición o uso fuera de vías públicas. Consulta la normativa de tu país.</p>' : '') + '</section>' +
    '<section class="container files-cta"><div><span class="kicker">Portal para talleres</span><h2>¿Lo necesitas para tu vehículo?</h2><p>Sube la lectura en el portal y elige este servicio. Te devolvemos el archivo en 30–60 min en horario laboral.</p>' +
      '<div class="files-cta-btns"><a class="btn" href="' + PORTAL + '">Pedir en el portal ' + ARROW + '</a><a class="btn btn-ghost" href="' + WA + waText + '" target="_blank" rel="noopener">Consultar por WhatsApp</a></div></div></section>' +
    (others.length ? '<section class="container sv-others"><h2>Otros servicios</h2><div>' + others.map(function (o) { return '<a href="servicio.html?s=' + o.id + '">' + esc(o.t) + '</a>'; }).join('') + '<a href="archivos.html#servicios">Ver todos los servicios</a></div></section>' : '');
})();
