// MIDO Performance · site público — serviços (lista em archivos.html / vehiculos.html e servicio.html?s=<id>)
// Gerado por tools/sync-servicios.js a partir do portal. Não edite à mão: edite no portal e rode o comando de novo.
// Para mudar textos, edite SERVICIOS abaixo. Traduções: tools/i18n/<idioma>.json (mesmo texto em espanhol como chave).
// Campos: c = categoria, t = título, r = resumo (acordeão), q = o que é, s = quando precisa, b = benefícios,
//         f = perguntas frequentes [pergunta, resposta], g = etiquetas, e = 1 se for função antipoluição
(function () {
  // Campos extra (opcionais): n = "Cómo funciona" (parágrafos), a = indicado para, d = códigos de avería [código, descrição],
  //   lv = niveles [nome, descrição], pr = o que fazemos no arquivo (aparece em "Cómo trabajamos")
  var CAT = { pot: 'Potencia', caja: 'Caja de cambios', emi: 'Emisiones', fun: 'Funciones' };
  var S = [
    { id: 'stage1', c: 'pot', t: 'Stage 1', g: ['Sin piezas nuevas', 'Reversible'],
      r: 'Reprogramamos la centralita sin cambiar ninguna pieza. Ajustamos inyección, presión de turbo, avance y limitadores de par para ganar potencia y respuesta sin salir de los márgenes de seguridad del motor.',
      q: 'Es la reprogramación más pedida: solo se modifica el software de la centralita, con el coche tal como sale de fábrica. Cada archivo se ajusta al motor y se comprueba en banco de potencia.',
      s: ['Quieres más potencia y par sin tocar la mecánica.', 'El coche se siente lento al adelantar o con carga.', 'Buscas una respuesta del acelerador más directa.', 'Quieres bajar el consumo en carretera o con remolque.'],
      n: ['Los fabricantes dejan un margen amplio en el software para cubrir combustibles de mala calidad, climas extremos y mercados muy distintos. El Stage 1 aprovecha ese margen de forma controlada.',
        'Trabajamos sobre los mapas de aire, inyección, presión de turbo, avance y limitadores de par, teniendo en cuenta cómo se comporta el motor con distintas temperaturas y altitudes. Así la ganancia se mantiene estable en verano, en invierno y en montaña.',
        'Si lo que buscas es ahorrar, también podemos priorizar el consumo en lugar de la potencia máxima. Indícalo en las observaciones del pedido.'],
      lvt: 'Elige el enfoque', lv: [['Máxima potencia', 'Priorizamos potencia y par para conseguir la mejor aceleración y recuperación.'], ['Mínimo consumo', 'Priorizamos la eficiencia para gastar menos combustible por kilómetro. Ideal para flotas, furgonetas, camiones y maquinaria.']],
      a: ['Motores turbo y atmosféricos', 'Turismos diésel y gasolina', 'Furgonetas y vehículos comerciales', 'Camiones, tractores y maquinaria', 'Motos (según centralita)'],
      b: ['Más potencia y par en todo el rango de revoluciones.', 'Aceleración más fuerte, que se nota desde el primer momento.', 'Mejores recuperaciones: puedes circular en una marcha más larga.', 'Menos consumo por kilómetro en conducción normal.', 'Mantenimiento con los mismos intervalos del fabricante.', 'Sin desgaste extra: trabajamos dentro de los márgenes del motor.', 'Sin cambiar piezas: solo software.'],
      f: [['¿Hace falta cambiar alguna pieza?', 'No. El Stage 1 se hace solo por software, con el coche de serie en buen estado.'], ['¿Se puede volver a la configuración de fábrica?', 'Sí. Guardamos tu archivo original y lo podemos volver a escribir cuando quieras.'],
        ['¿Cuánta potencia se gana?', 'Depende del motor. Los turbo, sobre todo diésel, son los que más ganan. Te orientamos antes de pagar según la centralita.'], ['¿Puedo pedir un archivo enfocado a consumo?', 'Sí. Lo ajustamos para priorizar el ahorro, ideal para flotas, camiones y maquinaria.'],
        ['¿Cambian los intervalos de mantenimiento?', 'No. Con un Stage 1 se mantienen los que recomienda el fabricante. En Stage 2 y Stage 3 te aconsejamos según el proyecto.']] },
    { id: 'stage2', c: 'pot', t: 'Stage 2', g: ['Con piezas de mejora', 'Probado en banco'],
      r: 'Para coches con mejoras mecánicas como downpipe, admisión, intercooler o escape. Calibramos el software para aprovechar esas piezas con seguridad.',
      q: 'El Stage 2 parte de un Stage 1 y lo adapta a las piezas de mejora montadas. Sin la calibración correcta esas piezas no rinden o pueden dar averías.',
      s: ['Has montado downpipe, admisión o intercooler.', 'Tu coche ya tiene Stage 1 y quieres el siguiente paso.', 'Aparecen errores tras cambiar piezas de escape o admisión.'],
      n: ['Más potencia significa quemar más mezcla en cada ciclo. Para conseguirlo de forma segura recalculamos la cantidad de aire, la inyección, las presiones y los tiempos y puntos de inyección.',
        'Revisamos cada parámetro en todas las situaciones en las que puede encontrarse el coche: arranque en frío, calor, altitud o carga máxima. Así las piezas nuevas rinden sin forzar el motor.',
        'Podemos orientar el archivo a potencia máxima o a un uso más equilibrado con menor consumo, según lo que necesite tu cliente.'],
      lvt: 'Elige el enfoque', lv: [['Máxima potencia', 'Sacamos el máximo partido a las piezas montadas.'], ['Mínimo consumo', 'Ganancia de potencia con el foco en gastar menos combustible, según tu vehículo.']],
      a: ['Coches con downpipe o escape completo', 'Admisión e intercooler de mayor tamaño', 'Vehículos que ya llevan Stage 1'],
      b: ['Más potencia que con un Stage 1.', 'Las piezas nuevas trabajan en armonía con el motor.', 'Temperaturas y presiones bajo control.', 'Archivo comprobado en banco de potencia.'],
      f: [['¿Qué piezas necesito?', 'Normalmente downpipe y admisión; según el motor, también intercooler o escape. Dinos qué tienes montado al hacer el pedido.'], ['¿Sirve un Stage 2 sin piezas?', 'No. Sin las piezas de mejora el Stage 2 no aporta y puede forzar el motor.'],
        ['¿Se puede priorizar el consumo?', 'Sí. Además de la versión de máxima potencia, podemos hacer una calibración más equilibrada.']] },
    { id: 'stage3', c: 'pot', t: 'Stage 3', g: ['Electrónica 100 % a medida', 'Competición', 'Probado en banco', 'Consúltanos antes de pedir'],
      r: 'Proyectos a medida con turbo mayor, inyectores, embrague y otras piezas. Desarrollamos el archivo según la configuración exacta de tu coche.',
      q: 'Para preparaciones profundas: turbo de mayor tamaño, inyectores, bomba, embrague reforzado y otras piezas. Cada archivo es un desarrollo propio para esa configuración, pensado sobre todo para competición.',
      s: ['Has cambiado el turbo o los inyectores.', 'Preparas un coche para circuito o competición.', 'Necesitas una calibración que no existe de serie.'],
      n: ['Partimos de cero con la lista de piezas del coche: recalculamos aire, inyección, presiones y tiempos para la nueva configuración, en todas las condiciones de temperatura y altitud.',
        'Sirve tanto para motores turbo como para atmosféricos. El objetivo es la máxima aceleración posible sin poner en riesgo la mecánica que has montado.'],
      a: ['Motores turbo y atmosféricos', 'Coches de circuito y competición', 'Proyectos con turbo, inyectores o bomba nuevos'],
      b: ['Máxima potencia de tu configuración.', 'Aceleración mucho más contundente desde el primer momento.', 'Más velocidad y recuperaciones en marchas más largas.', 'Calibrado para no comprometer la durabilidad de las piezas montadas.', 'Desarrollo a medida, probado en banco de potencia.', 'Seguimiento técnico durante el proyecto.'],
      f: [['¿Cuánto se tarda?', 'Depende del proyecto. Antes de pedir, escríbenos con la lista de piezas para valorarlo.'], ['¿Hace falta probar el coche en banco?', 'Es lo más recomendable en un Stage 3 para ajustar el archivo con datos reales.'],
        ['¿Vale para motores atmosféricos?', 'Sí. Adaptamos el desarrollo tanto a motores turbo como atmosféricos.']] },
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
    { id: 'dpf', c: 'emi', e: 1, t: 'DPF off', g: ['Solo competición', 'Diésel'],
      r: 'Desactivamos en la centralita la gestión del filtro de partículas diésel (DPF / FAP): regeneraciones, sensores, avisos y modo de emergencia.',
      q: 'El DPF (Diesel Particulate Filter, en Francia FAP) es un filtro del escape que atrapa y almacena el hollín de la combustión diésel. Se hizo obligatorio con la norma Euro 5 (2009) para reducir las partículas que emiten los motores diésel.',
      s: ['Regeneraciones que no terminan con trayectos cortos.', 'Filtro saturado, testigo y modo de emergencia.', 'Sensor de presión diferencial averiado.', 'Aceite diluido con gasóleo por regeneraciones incompletas.', 'Vehículos de competición o maquinaria fuera de vía pública.'],
      n: ['Cuando el filtro se llena, la centralita lanza una regeneración: sube la temperatura del escape por encima de unos 600 °C para quemar el hollín y convertirlo en ceniza. Puede ser pasiva, a velocidad alta y constante, o activa, inyectando combustible extra después de la combustión.',
        'El sistema lo forman el propio filtro de cerámica porosa, los sensores de presión diferencial, los sensores de temperatura antes y después del filtro, el catalizador de oxidación (DOC) y, en algunos modelos, un depósito de aditivo. También trabaja junto a la válvula EGR.',
        'La anulación tiene dos partes: se retira físicamente el filtro (sustituyéndolo por un tubo recto o downpipe) y nosotros reprogramamos la centralita para quitar regeneraciones, lectura de sensores y códigos de avería. Sin el filtro, la contrapresión del escape baja de forma muy notable.'],
      lvt: 'Problemas habituales del DPF',
      lv: [['Regeneración fallida', 'En trayectos cortos el ciclo no llega a terminar; el filtro se satura y el coche limita potencia y velocidad.'],
        ['Obstrucción por ceniza', 'La ceniza no se quema como el hollín: se acumula con los años y va reduciendo la capacidad del filtro.'],
        ['Sensores de presión', 'Un sensor de presión diferencial averiado da lecturas falsas y provoca regeneraciones de más o de menos.'],
        ['Dilución del aceite', 'En regeneraciones activas incompletas, parte del gasóleo inyectado acaba en el cárter y el aceite pierde capacidad de lubricar.'],
        ['Coste de sustitución', 'Cambiar un DPF puede costar entre 1.500 y 4.000 € según el vehículo, y algunos necesitan además diagnosis especial.'],
        ['Modo de emergencia', 'Si la contrapresión supera el límite, el motor entra en modo de emergencia y limita potencia y revoluciones.']],
      dt: 'Datos técnicos orientativos', dn: 'Los valores cambian según el fabricante y el modelo.',
      d: [['550–650 °C', 'Temperatura de regeneración'], ['300–800 km', 'Intervalo entre regeneraciones'], ['150.000–200.000 km', 'Vida útil teórica del filtro'], ['> 95 %', 'Partículas que retiene'], ['≈ 200 mbar', 'Contrapresión máxima']],
      pr: 'Desactivamos regeneraciones, sensores de presión diferencial y temperatura, y todos los códigos de avería del filtro.',
      a: ['Turismos y furgonetas diésel', 'Camiones y autobuses', 'Tractores, cosechadoras y maquinaria industrial', 'Coches de competición diésel'],
      b: ['Menos contrapresión: mejor respuesta y más eficiencia.', 'Más potencia y par.', 'Sin regeneraciones: menos consumo.', 'Sin dilución de aceite.', 'Menos averías y gastos de mantenimiento.', 'Sin testigos ni códigos de avería.'],
      f: [['¿En qué consiste?', 'En retirar físicamente el filtro del escape (tubo recto o downpipe) y reprogramar la centralita para desactivar regeneraciones, sensores y códigos de avería.'],
        ['¿Es legal?', 'No, en la mayoría de países, para vehículos que circulan por vía pública. Es un servicio para vehículos de competición, maquinaria agrícola e industrial que no circula por carretera, vehículos que se exportan a países donde está permitido y uso en circuito.'],
        ['¿Qué se gana en competición?', 'Mucha menos contrapresión, mejor respuesta, adiós a las regeneraciones que roban rendimiento, menos consumo en conducción deportiva y menos riesgo de dilución de aceite.'],
        ['¿Se quedan testigos encendidos?', 'No. Desactivamos en la centralita los sensores de presión diferencial, temperatura y contrapresión; el vehículo funciona sin testigos ni códigos guardados.'],
        ['¿Qué vehículos se pueden hacer?', 'Cualquier diésel con DPF: turismos, furgonetas, camiones, autobuses, tractores, cosechadoras y maquinaria, de marcas europeas y asiáticas (VW, Audi, BMW, Mercedes, Peugeot, Citroën, Renault, Ford, Volvo, Scania, DAF, MAN, Iveco, Toyota, Nissan…).']] },
    { id: 'gpf', c: 'emi', e: 1, t: 'GPF / OPF off', g: ['Solo competición', 'Gasolina'],
      r: 'Desactivamos en la centralita el filtro de partículas de los motores de gasolina (GPF, OPF o PPF): regeneraciones, sensores y códigos de avería.',
      q: 'El GPF (en marcas alemanas, OPF) es el filtro de partículas de los motores de gasolina de inyección directa. Va en el escape, normalmente detrás del catalizador, y retiene el hollín de la combustión.',
      s: ['Filtro obstruido por uso urbano y trayectos cortos.', 'Regeneraciones continuas con más consumo.', 'Pérdida de potencia y testigo del filtro.', 'Coches de competición o circuito.'],
      n: ['Se hizo obligatorio en los gasolina de inyección directa con las normas Euro 6d-TEMP (2017) y Euro 6d (2020), que limitan el número de partículas a 6×10¹¹ por kilómetro.',
        'Por dentro es un bloque cerámico de canales cerrados alternos: el gas atraviesa las paredes porosas y el hollín se queda atrapado. Para vaciarlo, el filtro se quema a sí mismo: a alta velocidad se regenera solo, con unos 600–650 °C; si no basta, la centralita cambia la inyección para subir la temperatura del escape.',
        'Su regeneración es más sencilla que en un diésel: un motor de gasolina no genera partículas en todas las condiciones, sus gases de escape salen más calientes y la centralita puede aportar oxígeno para quemar la poca carga acumulada, que es mucho menor que en un bloque diésel.'],
      lvt: 'Problemas habituales del GPF',
      lv: [['Obstrucción y saturación', 'En ciudad el filtro no llega a la temperatura de regeneración: se acumulan partículas y el motor rinde menos.'], ['Regeneraciones frecuentes', 'Suben el consumo, diluyen gasolina en el aceite y llevan el escape a temperaturas extremas.'], ['Pérdida de potencia', 'El filtro frena el paso de los gases; obstruido puede restar en torno a un 10–15 % de potencia.'], ['Coste de mantenimiento', 'Sustituirlo cuesta entre 1.500 y 3.000 €; una limpieza, de 300 a 600 € y no siempre funciona.']],
      d: [['P2463', 'Acumulación de hollín en el filtro'], ['P244A', 'Presión diferencial del filtro demasiado baja'], ['P2458', 'Duración de la regeneración del filtro']],
      pr: 'Desactivamos las regeneraciones, los códigos del filtro y ajustamos la diagnosis y los sensores de presión y temperatura.',
      a: ['Gasolina de inyección directa con GPF / OPF / PPF', 'Coches de competición y circuito', 'Vehículos sin obligación de llevar el filtro'],
      b: ['Sin regeneraciones ni dilución de aceite.', 'Sin pérdida de potencia por filtro saturado.', 'Sin testigos ni errores del filtro.', 'Ahorro frente a cambiar o limpiar el filtro.'],
      f: [['¿Es legal?', 'En vía pública no lo es en la mayoría de países de la UE. Es un servicio solo para competición, circuito o lugares donde no esté regulado.'], ['¿Qué incluye?', 'Desactivación de regeneraciones, eliminación de los códigos de avería del filtro y ajuste de la diagnosis y los sensores.'],
        ['¿Quedará algún error?', 'No. Eliminamos los códigos del filtro (P2463, P244A, P2458 y otros) para que no se encienda ningún testigo.'], ['¿Se puede volver atrás?', 'Sí. Guardamos el archivo original y lo podemos volver a escribir cuando quieras.']] },
    { id: 'egr', c: 'emi', e: 1, t: 'EGR off', g: ['Solo competición'],
      r: 'Desactivamos la válvula EGR por software para que no recircule gases de escape y la admisión se mantenga más limpia.',
      q: 'La válvula EGR devuelve una parte de los gases de escape a la admisión. Así baja la temperatura de la combustión y se generan menos óxidos de nitrógeno (NOx), pero con el tiempo se llena de carbonilla, se atasca y provoca tirones y averías.',
      s: ['Válvula EGR atascada o con fallos.', 'Admisión llena de carbonilla y hollín.', 'Tirones, pérdida de potencia y más consumo.', 'Averías repetidas y caras en el sistema EGR.'],
      n: ['La carbonilla que trae el gas de escape se pega en la válvula y en el colector. Poco a poco el paso de aire se estrecha, la mezcla empeora y el motor pierde fuerza y gasta más.',
        'Al anular la EGR, el motor respira solo aire limpio: la admisión se ensucia mucho menos, la mezcla mejora y el motor recupera respuesta, par y eficiencia.',
        'Lo hacemos por software en la centralita. Según el motor, también se recomienda cegar físicamente la válvula para que no deje pasar gases.'],
      pr: 'Desactivamos la estrategia de recirculación de gases y los códigos de avería de la válvula EGR.',
      a: ['Motores diésel con EGR', 'Flotas con averías repetidas de EGR', 'Vehículos de competición o fuera de vía pública'],
      b: ['Admisión más limpia y menos carbonilla.', 'Más respuesta y par.', 'Menos consumo.', 'Menos averías y gastos de mantenimiento.'],
      f: [['¿Hay que quitar la válvula?', 'Normalmente no: se desactiva por software. Según el motor, se recomienda cegarla.'], ['¿Se nota en el consumo?', 'Sí, al mejorar la mezcla y la eficiencia el consumo suele bajar.'], ['¿Es legal?', 'No para vía pública en la mayoría de países. Solo competición y uso fuera de vías públicas.']] },
    { id: 'adblue', c: 'emi', e: 1, t: 'AdBlue off', g: ['Solo competición', 'Diésel', 'Ligero y pesado'],
      r: 'Anulamos por software el sistema SCR / AdBlue de inyección de urea: sin repostar AdBlue, sin cuenta atrás de arranque y sin testigos en el cuadro.',
      q: 'El AdBlue, o SCR (reducción catalítica selectiva), es el postratamiento que llevan muchos diésel desde la norma Euro 6 para bajar los óxidos de nitrógeno (NOx). Inyecta en el escape una solución de urea y agua que, dentro del catalizador SCR, convierte los NOx en nitrógeno y vapor de agua.',
      s: ['Cuenta atrás o bloqueo de arranque por fallo de AdBlue.', 'Inyector, bomba, sensor de NOx o calefactor averiados.', 'Países o zonas donde no se consigue AdBlue.', 'Combustible degradado o de mala calidad.', 'Camiones, maquinaria y vehículos fuera de vía pública.'],
      n: ['La solución lleva un 32,5 % de urea y un 67,5 % de agua desmineralizada. Se inyecta antes del catalizador SCR; con la temperatura se descompone en amoníaco (NH₃), que reacciona con los NOx y los convierte en nitrógeno (N₂) y vapor de agua (H₂O).',
        'El sistema lo forman el depósito de AdBlue con calefacción, la bomba dosificadora, el inyector, el catalizador SCR, los sensores de NOx antes y después del catalizador, el sensor de temperatura del AdBlue y la unidad de control de dosificación (DCU).',
        'En la anulación reprogramamos la centralita para desactivar las funciones del SCR: quitamos los códigos de avería, eliminamos las limitaciones de arranque y velocidad y simulamos los valores de los sensores (incluido el nivel del depósito siempre que sea posible), para que el vehículo funcione con normalidad sin AdBlue.'],
      lvt: 'Problemas habituales del AdBlue',
      lv: [['Cristalización', 'Con frío o si se contamina, el AdBlue cristaliza y obstruye el inyector y los conductos, y la dosificación falla.'],
        ['Inyector SCR', 'Se obstruye o se daña con los cristales. Cambiarlo cuesta entre 300 y 800 € y necesita calibración.'],
        ['Sensores de NOx', 'Los sensores antes y después del catalizador fallan y dan lecturas falsas que activan el modo de emergencia.'],
        ['Bomba dosificadora', 'Se avería por contaminación o desgaste. Sustituirla cuesta entre 500 y 1.500 € según el vehículo.'],
        ['Calefactor del depósito', 'Si falla, el AdBlue se congela a unos −11 °C y el motor no arranca.'],
        ['Modo de emergencia', 'Al detectar un fallo, el vehículo limita la velocidad (en algunos casos a 20 km/h) o no deja volver a arrancar hasta repararlo.']],
      dt: 'Consumo típico de AdBlue', dn: 'Varía según el estilo de conducción, la carga y las condiciones de uso.',
      d: [['1–2 L', 'Turismos, cada 1.000 km'], ['2–3 L', 'Furgonetas, cada 1.000 km'], ['5–6 %', 'Camiones, sobre el consumo de gasóleo'], ['Variable', 'Maquinaria agrícola, según la carga']],
      pr: 'Desactivamos las funciones SCR, eliminamos los códigos de avería y las limitaciones de arranque y velocidad, y simulamos los sensores.',
      a: ['Turismos y furgonetas diésel', 'Camiones y autobuses', 'Tractores, cosechadoras y maquinaria industrial', 'Zonas sin suministro de AdBlue'],
      b: ['Sin consumo de AdBlue: no hay que repostarlo nunca más.', 'Sin bloqueos de arranque ni limitación de velocidad.', 'Sin testigos de avería en el cuadro.', 'Sistema de escape más sencillo y con menos averías.', 'Menos gastos de mantenimiento.', 'Preparado para combustible degradado o de mala calidad.'],
      f: [['¿En qué consiste?', 'En reprogramar la centralita para desactivar las funciones del SCR / AdBlue: quitar los códigos de avería, las limitaciones de arranque y velocidad, y simular los valores de los sensores.'],
        ['¿Es legal?', 'No, en la mayoría de países, para vehículos que circulan por vía pública. Es un servicio para vehículos de competición, maquinaria agrícola e industrial que no circula por carretera ni está obligada a esa normativa, vehículos que se exportan a países donde está permitido y zonas donde no hay suministro de AdBlue.'],
        ['¿Quedarán luces encendidas?', 'No. Eliminamos los códigos del sistema y simulamos los sensores, así que no queda ningún testigo ni código guardado.'],
        ['¿Hay que desmontar las piezas?', 'No es obligatorio: la anulación es electrónica. Depósito, bomba, inyector y sensores pueden quedarse montados; si quieres, se pueden retirar después.'],
        ['¿Qué vehículos se pueden hacer?', 'Cualquier diésel con AdBlue / SCR: turismos, furgonetas, camiones, autobuses, tractores, cosechadoras y maquinaria (Mercedes-Benz, BMW, Audi, Volkswagen, Volvo, Scania, DAF, MAN, Iveco, John Deere, New Holland…).']] },
    { id: 'nox', c: 'emi', e: 1, t: 'NOx off', g: ['Solo competición'],
      r: 'Desactivamos la gestión de los sensores de NOx y las averías asociadas a ellos.',
      q: 'Los sensores de NOx miden los óxidos de nitrógeno del escape. Son caros y fallan a menudo, encendiendo testigos o limitando el motor.',
      s: ['Sensor de NOx averiado.', 'Testigo de emisiones encendido.', 'Motor limitado por fallo de sensor.'],
      b: ['Sin errores de los sensores de NOx.', 'Sin limitación de potencia por el sensor.', 'Ahorro en sensores caros.'],
      f: [['¿Se hace junto con AdBlue off?', 'Muchas veces sí, porque los dos sistemas trabajan juntos.'], ['¿Es legal?', 'No para vía pública en la mayoría de países. Solo competición y uso fuera de vías públicas.']] },
    { id: 'lambda', c: 'emi', e: 1, t: 'Catalizador y sonda lambda', g: ['Solo competición'],
      r: 'Adaptamos la centralita a un catalizador deportivo o retirado: desactivamos la sonda lambda trasera y los errores de eficiencia del catalizador.',
      q: 'Detrás del catalizador hay una segunda sonda lambda que vigila si el catalizador sigue funcionando. Si lo cambias por uno deportivo o lo quitas, la centralita lo detecta y enciende el testigo de motor.',
      s: ['Has montado downpipe o catalizador deportivo.', 'Error de eficiencia del catalizador (P0420 / P0430).', 'Catalizador degradado o sondas con lecturas inestables.', 'Testigo de motor, pérdida de respuesta o fallos de emisiones.', 'Sonda lambda trasera averiada o retirada.', 'Coches de competición o circuito.'],
      n: ['La sonda delantera regula la mezcla; la trasera solo comprueba el catalizador comparando sus dos señales. Con un catalizador de alto flujo o sin él, las señales se parecen demasiado y la centralita lo interpreta como avería.',
        'Desactivamos el control de la sonda trasera y la vigilancia del catalizador, sin tocar la sonda delantera, para que la mezcla siga perfectamente regulada.'],
      d: [['P0420', 'Eficiencia del catalizador baja (banco 1)'], ['P0430', 'Eficiencia del catalizador baja (banco 2)'], ['P0136', 'Circuito de la sonda lambda trasera'], ['P0141', 'Calefactor de la sonda lambda trasera']],
      pr: 'Desactivamos la sonda lambda trasera y el monitor del catalizador, ajustamos los mapas lambda a tu escape y lo validamos, manteniendo la regulación de la mezcla.',
      a: ['Vehículos con catalizador defectuoso', 'Coches con downpipe o escape modificado', 'Sistemas con errores P0420 / P0430', 'Motores con sonda trasera averiada'],
      b: ['Sin errores de catalizador ni de sondas O2.', 'Escape con más flujo y mejor respuesta.', 'Sin modos de protección por fallos de emisiones.', 'Calibración ajustada a tu escape real.', 'La mezcla sigue bien regulada.', 'Archivo original guardado: siempre se puede volver atrás.', 'Combinable con Stage 2 y Pop & Bang.'],
      f: [['¿Se desactiva también la sonda delantera?', 'No. La delantera sigue trabajando para regular la mezcla; solo se anula la vigilancia de la trasera.'], ['¿Afecta al rendimiento?', 'Puede mejorar la respuesta, porque el escape respira mejor sin la restricción del catalizador.'], ['¿Echa humo?', 'No, siempre que la calibración sea correcta y el motor esté en buen estado.'], ['¿Es legal?', 'No para vía pública en la mayoría de países. Solo competición y uso fuera de vías públicas.'], ['¿Se puede volver atrás?', 'Sí. Guardamos tu archivo original.']] },
    { id: 'evap', c: 'emi', e: 1, t: 'EVAP off', g: ['Solo competición'],
      r: 'Desactivamos la gestión del sistema EVAP de vapores de combustible y sus errores en la centralita.',
      q: 'El sistema EVAP recoge los vapores del depósito en un cánister y los quema en el motor mediante válvulas de purga. Sus fugas y válvulas dan errores frecuentes en motores de gasolina.',
      s: ['Errores de fuga EVAP (códigos P044x).', 'Válvula de purga averiada o cánister saturado.', 'Olor a gasolina y ralentí inestable.', 'Testigo del motor por el sistema EVAP.'],
      pr: 'Desactivamos los monitores del sistema EVAP y comprobamos que el motor funciona sin errores.',
      a: ['Gasolina con sistema EVAP', 'Modelos con cánister y válvula de purga', 'Flotas con errores P044x repetidos'],
      b: ['Sin errores EVAP recurrentes.', 'Ralentí más estable y sin olor a gasolina.', 'Diagnóstico limpio.', 'Sin errores secundarios.'],
      f: [['¿Qué síntomas da un EVAP averiado?', 'Olor a gasolina, ralentí irregular y el testigo de motor encendido.'], ['¿Se quita el cánister?', 'No hace falta: el ajuste es en la centralita.'], ['¿Afecta al consumo?', 'Puede estabilizarse al desaparecer las purgas erróneas.'], ['¿Se puede volver atrás?', 'Sí. Guardamos tu archivo original y lo restauramos cuando quieras.'], ['¿Es legal?', 'No para vía pública en la mayoría de países. Solo competición y uso fuera de vías públicas.']] },
    { id: 'readiness', c: 'emi', e: 1, t: 'Monitor de emisiones', g: ['Solo competición', 'Monitores OBD / Readiness'],
      r: 'Ajustamos los monitores de emisiones de la centralita para que no queden pendientes tras una modificación.',
      q: 'La centralita comprueba de forma continua los sistemas de emisiones (catalizador, sondas, EGR, DPF…). Tras cambiar piezas, algunos monitores quedan sin completar o dan error aunque el coche funcione bien.',
      s: ['Monitores que nunca se completan.', 'Errores de catalizador o sondas tras modificar el escape.', 'Piezas de emisiones sustituidas.', 'Proyectos de competición con hardware cambiado.', 'Testigos que vuelven una y otra vez o diagnosis incoherente.'],
      n: ['Los monitores OBD son pruebas que la centralita hace por su cuenta para comprobar catalizador, sondas, EGR, DPF y otros sistemas. Después de modificar o sustituir piezas pueden dar errores aunque el vehículo funcione perfectamente.',
        'Leemos la centralita, desactivamos solo los monitores que no corresponden a tu configuración y dejamos el resto trabajando, para que la diagnosis OBD siga siendo compatible y fiable. Trabajamos turismos, comerciales, maquinaria agrícola, obra pública y equipos industriales, pensando en talleres avanzados y flotas.'],
      pr: 'Desactivamos de forma selectiva los monitores que no corresponden a tu configuración y validamos el resultado.',
      a: ['Vehículos con escape modificado', 'Sustitución de componentes de emisiones', 'Proyectos de calibración avanzada', 'Turismos, comerciales y vehículo industrial', 'Maquinaria agrícola y de obra'],
      b: ['Sin fallos de monitorización que no aportan nada.', 'Menos testigos recurrentes en el cuadro.', 'Monitores coherentes con el hardware real.', 'Diagnóstico más claro.', 'Calibración a medida y segura.', 'Archivo original guardado.'],
      f: [['¿Qué monitores se pueden ajustar?', 'Catalizador, DPF, EGR y otros, según el vehículo.'], ['¿Afecta al rendimiento?', 'No. Solo cambia cómo la centralita comprueba los sistemas.'], ['¿Se puede volver atrás?', 'Sí. Guardamos tu archivo original.'], ['¿Es legal?', 'No para vía pública en la mayoría de países. Solo competición y uso fuera de vías públicas.']] },
    { id: 'sap', c: 'emi', e: 1, t: 'Aire secundario off', g: ['Solo competición'],
      r: 'Desactivamos la bomba de aire secundario (SAP) y sus errores en la centralita.',
      q: 'La bomba de aire secundario mete aire en el escape durante el arranque en frío para que el catalizador se caliente antes. Con los años la bomba y sus válvulas fallan, hacen ruido y dan errores.',
      s: ['Bomba averiada o ruidosa al arrancar.', 'Válvulas bloqueadas o fugas en el sistema.', 'Errores P041x y testigo de motor.'],
      d: [['P0410', 'Fallo del sistema de aire secundario'], ['P0411', 'Caudal de aire secundario incorrecto'], ['P0412', 'Circuito de la válvula de aire secundario']],
      pr: 'Desactivamos los monitores del sistema SAP y comprobamos el arranque.',
      a: ['Motores gasolina con bomba de aire secundario', 'Vehículos con errores P041x', 'Modelos con la bomba averiada', 'Turismos, comerciales, maquinaria agrícola y de obra'],
      b: ['Sin errores del sistema SAP.', 'Arranque más estable y silencioso.', 'Menos mantenimiento de bomba y válvulas.', 'Calibración limpia, sin errores secundarios.'],
      f: [['¿Para qué sirve la bomba?', 'Mete aire en el escape en frío para bajar las emisiones de los primeros minutos.'], ['¿Desaparece el ruido?', 'Sí, la bomba deja de funcionar.'], ['¿Se nota en el rendimiento?', 'No. Es un sistema auxiliar que solo actúa en el arranque en frío.'], ['¿Se puede volver atrás?', 'Sí. Guardamos tu archivo original y restauramos la estrategia de fábrica cuando quieras.'], ['¿Es legal?', 'No para vía pública en la mayoría de países. Solo competición y uso fuera de vías públicas.']] },
    { id: 'swirl', c: 'fun', t: 'Swirl Flaps off', g: [],
      r: 'Desactivamos las mariposas de admisión variable (swirl flaps) para evitar sus roturas y errores.',
      q: 'Las swirl flaps son pequeñas mariposas dentro del colector de admisión que crean turbulencia para quemar mejor a bajas y medias vueltas. Con la carbonilla se agarrotan, el eje coge holgura y pueden romperse dentro del motor.',
      s: ['Errores del actuador de las mariposas.', 'Mariposas agarrotadas por carbonilla.', 'Tirones, humo o pérdida de potencia.', 'Quieres prevenir roturas dentro del motor.'],
      d: [['P2004', 'Mariposas de admisión bloqueadas abiertas'], ['P2006', 'Mariposas de admisión bloqueadas cerradas'], ['P2015', 'Sensor de posición de las mariposas fuera de rango']],
      pr: 'Desactivamos la estrategia de control de las mariposas y sus códigos de avería, y comprobamos el resultado en carretera.',
      a: ['Diésel common-rail', 'Gasolina de inyección directa', 'Flotas y comerciales ligeros'],
      b: ['Menos riesgo de averías graves.', 'Respuesta más lineal en todo el rango.', 'Menos carbonilla en la admisión.', 'Sin errores del actuador.', 'Motor más fiable y suave.'],
      f: [['¿Qué son las swirl flaps?', 'Mariposas pequeñas dentro del colector que crean turbulencia para quemar mejor a pocas vueltas.'], ['¿Hay que desmontar el colector?', 'Depende del coche. Muchas veces basta con el software; si hay mariposas rotas, conviene revisar o limpiar el colector.'], ['¿Se nota el cambio?', 'Sí, sobre todo en suavidad y respuesta, y desaparecen los fallos del sistema.'], ['¿Se puede volver atrás?', 'Sí. Guardamos tu archivo original.']] },
    { id: 'throttle', c: 'fun', t: 'Mariposa de admisión principal', g: ['Diésel'],
      r: 'Desactivamos la mariposa principal de admisión de los motores diésel y sus errores, para una admisión directa y sin modos de protección.',
      q: 'En muchos diésel hay una mariposa a la entrada del colector que regula el aire según la carga (también se usa al apagar el motor y en las regeneraciones). Si se atasca o falla su motor eléctrico, el coche da tirones o entra en modo de protección.',
      s: ['Mariposa atascada o con carbonilla.', 'Fallos eléctricos o desgaste del actuador.', 'Tirones, pérdida de respuesta y testigos.'],
      pr: 'Desactivamos el control electrónico de la mariposa, ajustamos los mapas relacionados y comprobamos en carretera.',
      a: ['Motores diésel con mariposa de admisión', 'Vehículos con fallos de actuador', 'Proyectos de fiabilidad'],
      b: ['Flujo de aire más estable y constante.', 'Respuesta más directa del acelerador.', 'Menos averías de la mariposa.', 'Motor más fiable y suave.', 'Calibración segura con el archivo original guardado.'],
      f: [['¿Afecta al ralentí?', 'La mariposa interviene en algunas situaciones; ajustamos la centralita para que el ralentí siga estable.'], ['¿Desaparece el error del actuador?', 'Sí, se anula la estrategia que lo provoca.'], ['¿Gasta más?', 'No. Bien calibrado, mejora la respuesta sin subir el consumo.'], ['¿Se puede volver atrás?', 'Sí. Guardamos tu archivo original.']] },
    { id: 'flaps', c: 'fun', t: 'Válvula de escape', g: ['Mejor con escape deportivo'],
      r: 'Controlamos o anulamos la válvula del escape: abierta, cerrada o según el modo que prefieras, y sin errores si has cambiado el escape.',
      q: 'Muchos coches llevan una válvula en el escape que regula el caudal y la contrapresión para controlar el sonido, el par y las emisiones. La centralita decide cuándo abrirla según el modo y las revoluciones.',
      s: ['Has cambiado el escape y ya no lleva la válvula original.', 'La válvula da errores o se queda bloqueada.', 'Quieres el escape abierto con más sonido.', 'Respuesta irregular o modo de seguridad por el actuador.'],
      pr: 'Desactivamos o reprogramamos el control de la válvula y ajustamos los mapas relacionados.',
      a: ['Coches con válvula de escape activa', 'Escapes deportivos o modificados', 'Modelos con sonido controlado por modos'],
      b: ['Flujo de escape estable y sin bloqueos.', 'Respuesta más directa del motor.', 'Sin errores del actuador ni modos de seguridad.', 'Comportamiento más constante en carretera.', 'Sonido a tu gusto, con escape de serie o deportivo.'],
      f: [['¿La válvula cambia el sonido?', 'Sí. Regula el paso de los gases para bajar el ruido o ganar par según el modo.'], ['¿Evita los modos de protección?', 'Sí. Al desactivarla bien desaparecen los fallos del actuador y las estrategias de seguridad que provocan.'], ['¿Se puede dejar para uso diario?', 'Sí. Podemos dejar un comportamiento que se adapte al modo de conducción y al nivel de ruido que quieras.'], ['¿Y si he quitado la válvula?', 'Anulamos el actuador en la centralita para que no la eche en falta ni dé errores.'], ['¿Se puede volver atrás?', 'Sí. Guardamos tu archivo original.']] },
    { id: 'dtc', c: 'fun', t: 'DTC off', g: [],
      r: 'Eliminamos códigos de avería concretos que quedan tras una modificación, para que no se encienda el testigo del motor.',
      q: 'Los códigos de avería (DTC) activan testigos y estrategias de protección. Tras cambiar o quitar piezas, algunos dejan de tener sentido y pueden eliminarse de forma controlada.',
      s: ['Testigo encendido por una pieza ya cambiada.', 'Errores que vuelven tras borrarlos.', 'Potencia limitada por un código que no es real.', 'Piezas sin equivalencia exacta con las de serie.'],
      pr: 'Analizamos los códigos, eliminamos solo los que nos indiques y comprobamos que el resto de la diagnosis sigue funcionando.',
      a: ['Vehículos con piezas modificadas', 'Componentes sustituidos sin equivalencia exacta', 'Proyectos con calibración a medida'],
      b: ['Eliminamos errores innecesarios sin tocar la seguridad del motor.', 'Los fallos reales se siguen detectando.', 'Cuadro sin testigos permanentes.', 'Calibración adaptada a la configuración real del vehículo.', 'Solo tocamos los códigos que nos indiques.'],
      f: [['¿Se pueden quitar todos los códigos?', 'No. Eliminamos solo códigos no críticos para no ocultar averías reales.'], ['¿Qué datos necesitáis?', 'El código exacto (por ejemplo P0420) y qué pieza se ha cambiado.'], ['¿Afecta a la diagnosis futura?', 'No. La centralita sigue detectando las averías reales.'], ['¿Es legal?', 'Depende del país y del uso del vehículo. Te orientamos en cada caso.'], ['¿Se puede volver atrás?', 'Sí. Guardamos tu archivo original.']] },
    { id: 'immo', c: 'fun', t: 'Immo off', g: ['Consúltanos antes de pedir'],
      r: 'Desactivamos el inmovilizador en la centralita, útil al cambiar o reparar una centralita. Depende de cada modelo de ECU.',
      q: 'El inmovilizador impide arrancar si la llave no está reconocida. Al sustituir una centralita usada o repararla, a veces no se puede emparejar de nuevo.',
      s: ['Centralita de segunda mano o sustituida.', 'Fallo del inmovilizador o de la llave.', 'Motores trasplantados o proyectos especiales.'],
      b: ['El motor arranca sin depender del inmovilizador.', 'Ahorro frente a una centralita nueva.', 'Válido para proyectos especiales.'],
      f: [['¿Funciona en todas las centralitas?', 'No. Depende del modelo; te confirmamos si es posible antes de pagar.'], ['¿Necesitáis algún dato extra?', 'La lectura completa de la centralita y, si la tienes, la de la caja del inmovilizador.']] },
    { id: 'hotstart', c: 'fun', t: 'Arranque en caliente', g: [],
      r: 'Corregimos el arranque difícil con el motor caliente ajustando la estrategia de arranque en la centralita.',
      q: 'Algunos motores cuestan de arrancar cuando ya están calientes: la inyección y los tiempos de arranque no se adaptan bien a la temperatura real, un sensor da una lectura errónea o la presión de combustible no se estabiliza.',
      s: ['El motor tarda en arrancar en caliente.', 'Batería y motor de arranque forzados.', 'Tirones o paradas justo después de arrancar.', 'Vehículos con paradas cortas frecuentes.'],
      pr: 'Reajustamos los mapas de arranque, sincronizamos las lecturas de los sensores y validamos el arranque en caliente.',
      a: ['Diésel con arranque difícil en caliente', 'Vehículos con muchas paradas cortas', 'Flotas de uso intensivo'],
      b: ['Arranque inmediato con el motor caliente.', 'Menos desgaste de batería y motor de arranque.', 'Sin tirones ni paradas al arrancar.', 'Calibración segura y a medida.'],
      f: [['¿Por qué pasa?', 'Porque la estrategia de inyección y los tiempos de arranque no se adaptan a la temperatura real del motor.'], ['¿Hay que cambiar piezas?', 'Normalmente no. Si el problema es mecánico te lo indicamos, porque el software no lo arregla.'], ['¿Se nota enseguida?', 'Sí, desde el primer arranque en caliente.'], ['¿Cuánto se tarda?', 'Depende del vehículo, pero suele ser rápido una vez tenemos la lectura de la centralita.'], ['¿Se puede volver atrás?', 'Sí. Guardamos tu archivo original.']] },
    { id: 'coldstart', c: 'fun', t: 'Arranque en frío', g: [],
      r: 'Ajustamos mezcla, inyección y parámetros de arranque para que el motor arranque rápido y limpio con frío.',
      q: 'Con temperaturas bajas la mezcla y los tiempos de inyección tienen que ser muy precisos. Si la calibración no es buena o un sensor está desajustado, aparecen arranques lentos, humo y vibraciones.',
      s: ['Arranque lento en invierno o a primera hora.', 'Humo y vibraciones al arrancar en frío.', 'Calibración o sensores desajustados.'],
      n: ['Leemos la centralita, revisamos cómo trabajan los mapas de arranque, los calentadores y los sensores de temperatura, y ajustamos inyección y mezcla para que el motor arranque a la primera aunque haga mucho frío. La diagnosis OBD sigue funcionando con normalidad.'],
      pr: 'Optimizamos los tiempos de inyección, la mezcla y los parámetros de arranque en frío, y lo comprobamos en carretera.',
      a: ['Climas fríos', 'Diésel con calentadores', 'Vehículos que arrancan mal en invierno', 'Turismos, comerciales, maquinaria y vehículo industrial'],
      b: ['Arranque rápido incluso con mucho frío.', 'Menos humo y vibraciones al encender.', 'Menos esfuerzo para la batería.', 'Motor más protegido y con menos desgaste.', 'Calibración segura y a medida, con el archivo original guardado.'],
      f: [['¿Se nota al día siguiente?', 'Sí, la mejora es inmediata desde el primer arranque en frío.'], ['¿Ayuda a la batería?', 'Sí, al evitar arranques largos la batería sufre menos.'], ['¿Hay que cambiar los calentadores?', 'Si están dañados, sí. Aun así, la calibración mejora mucho el arranque.'], ['¿Se puede volver atrás?', 'Sí. Guardamos tu archivo original.']] },
    { id: 'launch', c: 'fun', t: 'Launch Control', g: [],
      r: 'Activamos un control de salida: el motor se mantiene a unas revoluciones fijas para arrancar con la máxima tracción.',
      q: 'El launch control es una función de la centralita que nació en la competición: fija las revoluciones con el coche parado y libera la potencia de forma controlada al salir, para arrancar siempre igual y sin que patinen las ruedas.',
      s: ['Quieres salidas rápidas y repetibles.', 'Usas el coche en circuito, drag o eventos.', 'Tu coche no trae launch control de serie o viene muy limitado.'],
      n: ['Al activarlo, la centralita limita el motor a un régimen de salida (normalmente entre 3.000 y 5.000 rpm según el motor) y deja que el turbo coja presión. Al soltar el embrague, o el freno en un automático, entrega la potencia de forma progresiva.',
        'Durante los primeros metros controla el par para que las ruedas no patinen y trabaja junto al control de tracción y estabilidad (ASC / ESP), sobre todo a muy baja velocidad, que es cuando más fácil es perder adherencia. Sin esta ayuda, una salida perfecta depende solo de la mano y de las horas de práctica del piloto.',
        'Ajustamos las revoluciones de salida, la agresividad y los límites de par a cada motor y caja: manual, DSG, S tronic, PDK, DCT o SMG.'],
      a: ['Cajas manuales y automáticas (DSG, S tronic, PDK, DCT, SMG)', 'Audi S / RS, BMW M, Mercedes-AMG, VW GTI / R', 'Seat / Cupra, Ford ST / RS, Porsche, Nissan GT-R, Honda Type R', 'Subaru WRX STI, Mitsubishi Evo, Renault Mégane RS'],
      b: ['Salidas más rápidas y constantes.', 'Mejores tiempos de 0 a 100 km/h.', 'Límites que protegen caja y embrague.', 'Revoluciones de salida a tu medida.', 'Agresividad, límite de par y control de tracción configurables.', 'Ideal para drag, track days y uso deportivo.', 'Reversible: guardamos tu archivo original.'],
      f: [['¿Daña el embrague o la caja?', 'Con un uso razonable no: la calibración limita el par y el tiempo de actuación. Toda salida fuerte desgasta algo, pero menos que una salida mal hecha a mano.'], ['¿Cómo se activa?', 'En automático: freno pisado, acelerador a fondo y soltar el freno. En manual: embrague pisado, acelerador a fondo y soltar el embrague. Te explicamos el método de tu coche.'],
        ['¿Se puede quitar después?', 'Sí. Volvemos a escribir el archivo original cuando quieras.'], ['¿Se puede combinar con un Stage?', 'Sí, y es lo más recomendable: con más par las salidas son todavía mejores.']] },
    { id: 'popbang', c: 'fun', t: 'Pop & Bang', g: ['Mejor con escape deportivo', 'Gasolina'],
      r: 'Petardeo y explosiones en el escape al soltar el acelerador, con la intensidad que prefieras.',
      q: 'También llamado overrun, burbles o crackle map. Al levantar el pie del acelerador la centralita deja pasar un poco de combustible y retrasa el encendido, y esa mezcla se quema en el escape con el sonido de petardeo de los deportivos.',
      s: ['Quieres un sonido más deportivo.', 'Has montado un escape deportivo.', 'Preparas el coche para eventos o exhibiciones.'],
      n: ['Modificamos los mapas de corte de inyección y el avance de encendido en las fases de retención.',
        'Calibramos cada coche teniendo en cuenta la temperatura del catalizador, la posición del acelerador, las revoluciones y la velocidad, para que el efecto suene fuerte sin castigar el motor ni el escape.',
        'Funciona en motores de gasolina, tanto turbo como atmosféricos, y adaptamos la intensidad a tu gusto. El resultado es un sonido de superdeportivo cada vez que levantas el pie.'],
      lv: [['Suave', 'Burbujeo discreto en cambios de marcha y retenciones. Pensado para el día a día.'], ['Medio', 'Petardeo claro al soltar gas con fuerza. El más pedido.'], ['Agresivo', 'Explosiones continuas y contundentes. Recomendado con escape deportivo.']],
      a: ['Audi RS / S line, BMW M / M Sport', 'Mercedes-AMG, VW GTI / R, Ford ST / RS', 'Seat / Cupra (FR / Cupra), Porsche, Mini, Jaguar', 'Nissan, Toyota, Honda, Subaru y más marcas de gasolina'],
      b: ['Tres niveles de intensidad.', 'Ajustado a tu motor y escape.', 'Protección de temperatura para catalizador y escape.', 'Sonido deportivo y emocionante en cada retención.', 'Se puede quitar o cambiar de nivel cuando quieras.'],
      f: [['¿Daña el motor o el escape?', 'Bien calibrado, no. Incluimos protecciones de temperatura; lo peligroso son los archivos genéricos.'], ['¿Se puede quitar o cambiar de nivel?', 'Sí. Volvemos al archivo original o cambiamos la intensidad.'], ['¿Hace falta escape deportivo?', 'No es obligatorio. Con el escape de serie se oye más suave; con uno deportivo el efecto es mucho mayor.'],
        ['¿Funciona en diésel?', 'El Pop & Bang clásico es de gasolina. Para diésel existe el efecto pop corn en el limitador (Hard Cut).'], ['¿Gasta más?', 'Muy poco: solo actúa al soltar el acelerador.']] },
    { id: 'hardcut', c: 'fun', t: 'Hard Cut / Pop Corn', g: ['Competición'],
      r: 'Corte de inyección seco al llegar al limitador de revoluciones, con sonido de competición. En diésel, con efecto pop corn.',
      q: 'En lugar del limitador suave de fábrica, el motor corta la inyección de golpe al llegar al tope de vueltas, como un coche de carreras. En diésel este corte produce el característico efecto pop corn.',
      s: ['Quieres el sonido del limitador de competición.', 'Usas el coche en eventos o exhibiciones.', 'Diésel preparados con efecto pop corn.', 'Un ajuste agresivo hecho sin control que da tirones, respuesta irregular o castiga el motor.'],
      n: ['Ajustamos el limitador y el corte de inyección para que el efecto sea fuerte pero estable, sin tirones ni respuestas raras.',
        'Es una función pensada para competición: usar el corte una y otra vez castiga la mecánica, así que no es recomendable para coches en los que la durabilidad sea prioritaria.'],
      pr: 'Ajustamos el limitador y la inyección de corte, hacemos pruebas de estabilidad y lo comprobamos en carretera.',
      a: ['Eventos y exhibiciones', 'Diésel con preparación previa', 'Proyectos a medida'],
      b: ['Sonido de competición en el limitador.', 'Corte de inyección estable.', 'Revoluciones de corte a tu medida.', 'Efecto controlado y configurable según el uso y el vehículo.', 'Ideal para eventos y uso recreativo.', 'Archivo original guardado.', 'Se puede combinar con Launch Control y Stage.'],
      f: [['¿Funciona en diésel?', 'Sí, con el efecto pop corn.'], ['¿Es compatible con otras mejoras?', 'Sí, se integra con las reprogramaciones de potencia y par.'], ['¿Afecta a la fiabilidad?', 'Lo calibramos dentro de márgenes seguros, pero su uso repetido desgasta la mecánica.'], ['¿Se puede quitar después?', 'Sí. Volvemos a dejar el limitador de serie cuando quieras.'], ['¿Es legal en vía pública?', 'Depende de la normativa de cada país.']] },
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
    { id: 'original', c: 'fun', t: 'Software original', g: ['Restauración OEM'],
      r: 'Devolvemos la centralita a su software de fábrica, por ejemplo para vender el coche, pasar por el concesionario o corregir un archivo dañado.',
      q: 'Escribimos de nuevo el software de fábrica en la centralita, desde tu copia original o desde un software oficial del fabricante, para recuperar todos los parámetros de origen, corregir archivos corruptos y dejar la centralita compatible con la diagnosis y las actualizaciones oficiales.',
      s: ['Vas a vender el coche o pasarlo por el concesionario.', 'Archivo dañado o reprogramación mal hecha.', 'Fallos después de una actualización.', 'Errores repetidos o rendimiento irregular.'],
      pr: 'Revisamos el archivo, verificamos el checksum y preparamos el software original listo para escribir.',
      a: ['Centralitas con software corrupto', 'Vehículos que deben volver a fábrica', 'Base limpia para una reprogramación futura'],
      b: ['Centralita con software de fábrica.', 'Base limpia para una futura reprogramación.', 'Soluciona fallos por software incorrecto.', 'Compatible con diagnosis y actualizaciones.', 'Estabilidad de fábrica asegurada.', 'Copia de seguridad del archivo actual antes de restaurar.'],
      f: [['¿Se pierde la reprogramación anterior?', 'Sí. La centralita vuelve al software original completo.'], ['¿Es seguro?', 'Sí. Trabajamos con herramientas profesionales y verificamos el checksum antes de entregarte el archivo.'], ['¿Sirve para resolver fallos?', 'En muchos casos sí: al quitar un archivo erróneo desaparecen los errores que provocaba.'], ['¿Necesitáis mi archivo original?', 'Si lo tienes, mejor. Si no, buscamos un software original compatible.'], ['¿Se puede reprogramar después?', 'Sí, la centralita queda como base limpia para futuras calibraciones.']] }
  ];
  var BY = {}; S.forEach(function (x) { BY[x.id] = x; });
  // Serviço -> "Nuevo pedido" já preenchido com o tipo de tuning ou a função
  var ORDER = { stage1: 'tuning=stage1', stage2: 'tuning=stage2', stage3: 'tuning=stage3', tcu: 'tuning=tcu', e85: 'tuning=e85', original: 'tuning=stock',
    dpf: 'DPF off', egr: 'EGR off', adblue: 'AdBlue off', nox: 'NOx off', evap: 'Evaporative Emission Control System (EVAP)', readiness: 'Readiness Monitor',
    sap: 'Secondary Air Pump off', swirl: 'Swirl Flaps off', flaps: 'Exhaust Flaps', dtc: 'DTC off', immo: 'Immo off (si es posible)', hotstart: 'Hot Start',
    launch: 'Launch Control', popbang: 'Pop & Bang / Crackle map', hardcut: 'Hard Cut limiter', vmax: 'Vmax off', startstop: 'Start / Stop off',
    gpf: 'GPF / OPF off', lambda: 'Lambda / O2 off (catalizador)', throttle: 'Throttle off (mariposa de admisión)', coldstart: 'Cold Start' };
  function orderUrl(id) { return 'https://mido-archivos.onrender.com/servicios/' + id + '/'; }
  var WA = 'https://api.whatsapp.com/send?phone=393758172444&text=';
  var ARROW = '<span class="ico"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M6 3l5 5-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>';
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function tags(x) { return x.g.length ? '<ul class="acc-tags">' + x.g.map(function (g) { return '<li' + (g === 'Solo competición' ? ' class="tag-warn"' : '') + '>' + esc(g) + '</li>'; }).join('') + '</ul>' : ''; }

  // Imagens: foto do site (images/) + ícone ilustrado próprio para cada tipo de serviço
  var ICON = {
    gauge: '<path d="M4 16a8 8 0 1116 0"/><path d="M12 16l4.5-5"/><circle cx="12" cy="16" r="1.5"/><path d="M6.5 11.5l1 .7M12 8v1.2M17.5 11.5l-1 .7"/>',
    gear: '<circle cx="12" cy="12" r="3.2"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/>',
    drop: '<path d="M12 3s6 6.4 6 11a6 6 0 01-12 0c0-4.6 6-11 6-11z"/><path d="M9.5 14.5a2.5 2.5 0 002.5 2.5"/>',
    filter: '<rect x="3" y="7" width="18" height="10" rx="2.5"/><path d="M7.5 7v10M12 7v10M16.5 7v10"/><path d="M1 12h2M21 12h2"/>',
    valve: '<path d="M2 12h5M17 12h5"/><circle cx="12" cy="12" r="5"/><path d="M8.5 15.5l7-7"/>',
    sensor: '<path d="M12 2v7"/><rect x="8.5" y="9" width="7" height="7" rx="1.8"/><path d="M4 20c2.5-2 5-2 8 0s5.5 2 8 0"/>',
    air: '<path d="M3 9h11a3 3 0 10-3-3M3 15h15a3 3 0 11-3 3M3 12h7"/>',
    warn: '<path d="M12 3l9.5 17h-19z"/><path d="M12 10v4.5M12 17.5v.5"/>',
    key: '<circle cx="8" cy="15.5" r="4.5"/><path d="M11.3 12.2L20 3.5M16.5 7l3 3M14 9.5l2 2"/>',
    power: '<path d="M12 3v8"/><path d="M6.4 7.4a8 8 0 1011.2 0"/>',
    flag: '<path d="M5 21V4"/><path d="M5 4h13l-3.2 4.5L18 13H5"/>',
    flame: '<path d="M12 21a6 6 0 006-6c0-4.5-4-6.5-5-12-2 2.5-3 4.5-3 7-1-1-1.6-2-1.8-3.2C6.6 8.6 6 10.6 6 15a6 6 0 006 6z"/>',
    speed: '<path d="M3 18a9 9 0 1118 0"/><path d="M12 18l6.5-6.5"/><path d="M15 11.5h3.5V15"/>',
    restore: '<path d="M4 12a8 8 0 108-8H8"/><path d="M10.5 1.5L7.5 4l3 2.5"/>',
    snow: '<path d="M12 2v20M3.3 7l17.4 10M3.3 17L20.7 7"/><path d="M9.5 3.5L12 6l2.5-2.5M9.5 20.5L12 18l2.5 2.5"/>'
  };
  var MEDIA = { stage1: ['svc-stage1-v2.jpg', 'gauge'], stage2: ['svc-stage2-v2.jpg', 'gauge'], stage3: ['svc-stage3-v2.jpg', 'gauge'],
    tcu: ['esq-tcu.svg', 'gear'], e85: ['svc-e85-v2.jpg', 'drop'], dpf: ['esq-dpf.svg', 'filter'],
    egr: ['esq-egr.svg', 'valve'], adblue: ['esq-adblue.svg', 'drop'], nox: ['esq-nox.svg', 'sensor'],
    evap: ['esq-evap.svg', 'drop'], readiness: ['svc-readiness-v2.jpg', 'sensor'], sap: ['esq-sap.svg', 'air'],
    swirl: ['esq-swirl.svg', 'valve'], flaps: ['svc-flaps-v2.jpg', 'valve'], dtc: ['svc-dtc-v2.jpg', 'warn'],
    immo: ['esq-immo.svg', 'key'], hotstart: ['esq-hotstart.svg', 'power'], launch: ['svc-launch-v2.jpg', 'flag'],
    popbang: ['svc-popbang-v2.jpg', 'flame'], hardcut: ['svc-hardcut-v2.jpg', 'flame'], vmax: ['svc-vmax-v2.jpg', 'speed'],
    startstop: ['esq-startstop.svg', 'power'], original: ['esq-original.svg', 'restore'],
    gpf: ['esq-gpf.svg', 'filter'], lambda: ['esq-lambda.svg', 'sensor'], throttle: ['esq-throttle.svg', 'valve'], coldstart: ['esq-coldstart.svg', 'snow'] };
  // Ícones extra das seções didáticas (mesmo traço dos ícones de serviço)
  var UI = {
    search: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l5 5"/>',
    sliders: '<path d="M6 3v6M6 14v7M12 3v3M12 11v10M18 3v10M18 18v3"/><circle cx="6" cy="11.5" r="2.5"/><circle cx="12" cy="8.5" r="2.5"/><circle cx="18" cy="15.5" r="2.5"/>',
    shield: '<path d="M12 2.5l8 3v6c0 5-3.4 8.6-8 10-4.6-1.4-8-5-8-10v-6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
    file: '<path d="M6 2.5h8l4.5 4.5v14.5H6z"/><path d="M14 2.5V7h4.5M9 12h6M9 15.5h6"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    alert: '<circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.2v.3"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.6v.3"/>',
    chip: '<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9.5" y="9.5" width="5" height="5" rx="1"/><path d="M9 2.5V6M15 2.5V6M9 18v3.5M15 18v3.5M2.5 9H6M2.5 15H6M18 9h3.5M18 15h3.5"/>',
    tool: '<path d="M14.5 6.5a4 4 0 015.2 5.2L12 19.5a2.5 2.5 0 01-3.5-3.5z"/><path d="M14.5 6.5l3 3"/><path d="M4 20l3-3"/>',
    car: '<path d="M3.5 16.5v-4l2.2-5.2A2 2 0 017.5 6h9a2 2 0 011.8 1.3l2.2 5.2v4"/><path d="M3.5 12.5h17"/><rect x="2.5" y="16.5" width="19" height="2.5" rx="1"/><circle cx="7.5" cy="15" r="1"/><circle cx="16.5" cy="15" r="1"/>',
    truck: '<path d="M2.5 6h11v10h-11z"/><path d="M13.5 9.5h4l3.5 3.5V16h-7.5"/><circle cx="6.5" cy="17.5" r="2"/><circle cx="17" cy="17.5" r="2"/>',
    headset: '<path d="M4 14v-2a8 8 0 0116 0v2"/><rect x="3" y="13.5" width="4" height="6" rx="1.5"/><rect x="17" y="13.5" width="4" height="6" rx="1.5"/><path d="M19 19.5c0 1.5-2 2-5 2"/>',
    question: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.6 2.6 0 115 1c-.8.9-2.5 1.4-2.5 3"/><path d="M12 16.8v.3"/>'
  };
  function ui(name, cls) { return '<svg class="' + (cls || '') + '" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + (UI[name] || ICON[name] || '') + '</svg>'; }
  // Ícone de "Indicado para" escolhido pelo texto
  function appIcon(t) {
    if (/cami|autob|tract|cosech|maquin|obra|industr|flota|comercial|furgon/i.test(t)) return 'truck';
    if (/compet|circuit|drag|evento|exhib|track/i.test(t)) return 'flag';
    if (/error|aver|P0|fallo|defect|corrupt|testigo/i.test(t)) return 'warn';
    if (/fr[ií]o|invierno/i.test(t)) return 'snow';
    if (/escape|downpipe|pieza|prepar|proyecto|calibraci|modific|sustituci/i.test(t)) return 'tool';
    if (/caja|DSG|tronic|PDK|DCT|manual/i.test(t)) return 'gear';
    if (/gasolina|di[eé]sel|AdBlue|suministro/i.test(t)) return 'drop';
    return 'car';
  }
  function head(kicker, title) { return '<header class="svx-head"><span class="svx-kicker">' + esc(kicker) + '</span><h2>' + esc(title) + '</h2></header>'; }

  function icon(id, cls) { var m = MEDIA[id]; return m ? '<svg class="' + cls + '" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' + ICON[m[1]] + '</svg>' : ''; }

  // Acordeão (archivos.html)
  var acc = document.getElementById('acc-list');
  if (acc) {
    acc.innerHTML = S.map(function (x, i) {
      return '<details name="svc"' + (i === 0 ? ' open' : '') + '><summary>' + icon(x.id, 'acc-ico') + '<span>' + esc(x.t) + '</span></summary><div class="acc-body"><p>' + esc(x.r) + '</p>' + tags(x) +
        '<a class="acc-more" href="servicios/' + x.id + '/">Ver más</a></div></details>';
    }).join('');
  }

  // Página do serviço (servicios.html?s=<id>)
  var page = document.getElementById('sv-page');
  if (!page) return;
  var pm = location.pathname.match(/\/servicios\/([\w-]+)\/?$/); // endereço limpo: /servicios/<id>/
  var id = pm ? pm[1] : new URLSearchParams(location.search).get('s'), x = BY[id];
  if (!id) return;
  var list = document.getElementById('svc-list-wrap'); if (list) list.hidden = true;
  window.scrollTo(0, 0);
  if (!x) {
    page.innerHTML = '<section class="container sv-hero"><h1>Servicio no encontrado</h1><p><a class="btn" href="/archivos/#servicios">Ver todos los servicios ' + ARROW + '</a></p></section>';
    return;
  }
  document.title = 'MIDO Performance | ' + x.t;
  var waText = encodeURIComponent('Hola MIDO Performance, quiero información sobre: ' + x.t);
  var steps = [['search', 'Lectura', 'Lees la centralita con tu equipo y nos envías el archivo original.'],
    ['sliders', 'Análisis', 'Revisamos el software y la configuración del vehículo.'],
    ['shield', 'Calibración', 'Modificamos el archivo a mano y corregimos el checksum.'],
    ['file', 'Entrega y soporte', 'Te devolvemos el archivo listo para escribir y te ayudamos si lo necesitas.']];
  var HL = [['search', 'Diagnóstico', 'Lectura y análisis completos'], ['chip', 'Calibración', 'A medida de tu centralita'], ['headset', 'Soporte', 'Equipo técnico Mido']];
  var HOW = ['info', 'chip', 'tool', 'check'];
  var others = S.filter(function (o) { return o.c === x.c && o.id !== x.id; }).slice(0, 8);
  page.innerHTML =
    '<section class="container sv-hero"><div class="sv-hero-txt"><span class="kicker">' + esc(CAT[x.c]) + '</span><h1>' + esc(x.t) + '</h1><p>' + esc(x.r) + '</p>' + tags(x) +
      '<div class="files-cta-btns"><a class="btn" href="' + orderUrl(x.id) + '">Pedir este servicio ' + ARROW + '</a><a class="btn btn-ghost" href="' + WA + waText + '" target="_blank" rel="noopener">Consultar por WhatsApp</a></div></div>' +
      (/\.svg$/.test(MEDIA[x.id][0]) ? '<figure class="sv-photo sv-schema"><img src="images/' + MEDIA[x.id][0] + '" alt="Esquema: ' + esc(x.t) + '" width="800" height="600"></figure>' : MEDIA[x.id][0] ? '<figure class="sv-photo"><img src="images/' + MEDIA[x.id][0] + '" alt="' + esc(x.t) + '" width="960" height="640" fetchpriority="high"><span class="sv-badge">' + icon(x.id, 'sv-badge-ico') + '</span></figure>' : '<figure class="sv-photo sv-illus" aria-hidden="true"><span class="sv-illus-ring"></span>' + icon(x.id, 'sv-illus-ico') + '<span class="sv-illus-name">' + esc(x.t) + '</span></figure>') + '</section>' +
    // Destaques logo abaixo do topo
    '<section class="container svx-hl">' + HL.map(function (h) { return '<div><span class="svx-ico">' + ui(h[0]) + '</span><span><small>' + h[1] + '</small><b>' + h[2] + '</b></span></div>'; }).join('') + '</section>' +
    // Qué es + Cuándo lo necesitas
    '<section class="container svx-sec">' + head('Lo básico', '¿Qué es ' + x.t + '?') +
      '<div class="svx-split"><div class="svx-card svx-what"><span class="svx-ico svx-ico-lg">' + icon(x.id, '') + '</span><p>' + esc(x.q) + '</p></div>' +
      '<div class="svx-card"><h3>' + ui('alert', 'svx-h3-ico') + 'Cuándo lo necesitas</h3><ul class="svx-symptoms">' + x.s.map(function (s) { return '<li>' + ui('alert') + '<span>' + esc(s) + '</span></li>'; }).join('') + '</ul></div></div></section>' +
    // Cómo funciona
    (x.n ? '<section class="container svx-sec">' + head('Explicación técnica', 'Cómo funciona') + '<div class="svx-how">' + x.n.map(function (p, i) { return '<div class="svx-card"><span class="svx-ico">' + ui(HOW[i % HOW.length]) + '</span><p>' + esc(p) + '</p></div>'; }).join('') + '</div></section>' : '') +
    // Níveis / problemas
    (x.lv ? '<section class="container svx-sec">' + head(x.lvt ? 'En detalle' : 'Personalización', x.lvt || 'Niveles de intensidad') + '<div class="svx-levels' + (x.lv.length === 2 || x.lv.length === 4 ? ' svx-2' : '') + '">' + x.lv.map(function (l, i) { return '<div class="svx-card"><span class="svx-pill">' + (x.lvt ? String(i + 1).padStart(2, '0') : 'Nivel ' + (i + 1)) + '</span><h3>' + esc(l[0]) + '</h3><p>' + esc(l[1]) + '</p></div>'; }).join('') + '</div></section>' : '') +
    // Códigos / datos
    (x.d ? '<section class="container svx-sec">' + head(x.dt ? 'Datos' : 'Diagnosis', x.dt || 'Códigos de avería que eliminamos') + '<div class="svx-codes">' + x.d.map(function (d) { return '<div><b>' + esc(d[0]) + '</b><span>' + esc(d[1]) + '</span></div>'; }).join('') + '</div><p class="svx-note">' + ui('info') + esc(x.dn || 'Son los más habituales; si tu vehículo muestra otros, indícalos en el pedido.') + '</p></section>' : '') +
    // Cómo trabajamos
    '<section class="container svx-sec">' + head('Proceso', 'Cómo trabajamos') +
      (x.pr ? '<div class="svx-banner">' + ui('check') + '<p><b>En este servicio:</b> ' + esc(x.pr) + '</p></div>' : '') +
      '<ol class="svx-steps">' + steps.map(function (s, i) { return '<li class="svx-card"><span class="svx-ico svx-ico-red">' + ui(s[0]) + '</span><small>Paso ' + (i + 1) + '</small><h3>' + s[1] + '</h3><p>' + s[2] + '</p></li>'; }).join('') + '</ol></section>' +
    // Beneficios
    '<section class="container svx-sec">' + head('Resultados', 'Beneficios principales') + '<div class="svx-benefits">' + x.b.concat(['Guardamos siempre tu archivo original.', 'Soporte técnico después de la entrega.']).map(function (b) { return '<div class="svx-card"><span class="svx-ico svx-ico-ok">' + ui('check') + '</span><p>' + esc(b) + '</p></div>'; }).join('') + '</div></section>' +
    // Indicado para (faixa colorida)
    (x.a ? '<section class="svx-band"><div class="container">' + head('Aplicaciones', 'Indicado para') + '<div class="svx-apps">' + x.a.map(function (a) { return '<div><span class="svx-ico">' + ui(appIcon(a)) + '</span><b>' + esc(a) + '</b></div>'; }).join('') + '</div></div></section>' : '') +
    // Preguntas frecuentes (todas visíveis)
    '<section class="container svx-sec">' + head('Resolvemos tus dudas', 'Preguntas frecuentes') + '<div class="svx-faq">' + x.f.map(function (q) { return '<div class="svx-card"><h3>' + ui('question', 'svx-h3-ico') + esc(q[0]) + '</h3><p>' + esc(q[1]) + '</p></div>'; }).join('') + '</div>' +
      (x.e ? '<div class="svx-legal">' + ui('warn') + '<p><b>Aviso legal:</b> las anulaciones de sistemas antipolución son solo para vehículos de competición o uso fuera de vías públicas, en los lugares donde esté permitido. El taller debe comprobar la normativa de su país antes de instalarlas.</p></div>' : '') + '</section>' +
    '<section class="container files-cta"><div><span class="kicker">Portal para talleres</span><h2>¿Lo necesitas para tu vehículo?</h2><p>Sube la lectura en el portal y elige este servicio. Te devolvemos el archivo en 30–60 min en horario laboral.</p>' +
      '<div class="files-cta-btns"><a class="btn" href="' + orderUrl(x.id) + '">Pedir este servicio ' + ARROW + '</a><a class="btn btn-ghost" href="' + WA + waText + '" target="_blank" rel="noopener">Consultar por WhatsApp</a></div></div></section>' +
    (others.length ? '<section class="container sv-others"><h2>Otros servicios</h2><div>' + others.map(function (o) { return '<a href="servicios/' + o.id + '/">' + esc(o.t) + '</a>'; }).join('') + '<a href="/archivos/#servicios">Ver todos los servicios</a></div></section>' : '');
})();
