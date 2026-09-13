/* Bilingual EN/ES strings + language switch (task-i18n-toggle).
 *
 * UMD so Node tests drive the dictionary and the pure helpers. The HTML
 * ships the EN copy inline (it is the document default and what the
 * chapter tests parse); switching to ES rewrites the textContent of every
 * [data-i18n] node, the document title, the meta/OG descriptions, and
 * <html lang>, then persists the choice and broadcasts `cv:langchange`
 * so the typewriter scenes (ch1 boot, ch2 search) can refresh.
 */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  } else {
    root.cvI18n = api;
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var STRINGS = {
    en: {
      'ui.skip': 'Skip to the story',
      'ui.langAria': 'Language',
      'header.kicker': 'The story of',
      'header.name': 'Gonzalo Argañaraz',
      'header.subtitle': 'From CRT boot to senior engineer — a CV told in seven chapters.',
      'header.hint': 'Scroll to play the story.',
      'rail.c1': '01 Boot', 'rail.c2': '02 Crack era', 'rail.c3': '03 Networks',
      'rail.c4': '04 SQL injection', 'rail.c5': '05 Degree', 'rail.c6': '06 The ladder',
      'rail.c7': '07 Now',
      'ch1.kicker': 'Chapter 01',
      'ch1.title': 'The first computer',
      'ch1.body': 'It started at three or four years old, with a Windows 98 machine and a green cursor blinking on a curved glass screen. My family’s first computer was not much: a CRT monitor that hummed before it glowed, a boot screen that took its time, and a keyboard that felt like a machine’s own language. I did not know a single technical term yet. I only knew that whatever lived inside that beige box obeyed the words I typed. That was the moment the questions started: what else can I make it do?',
      'ch1.takeaway': 'Curiosity, once booted, never really shuts down.',
      'ch1.bootLines': [
        'ARGGON BIOS v1.0 - CORDOBA, AR',
        'MEMORY TEST ... 640K OK',
        'DETECTING CURIOSITY ... FOUND',
        'LOADING STORY.EXE',
      ],
      'ch2.kicker': 'Chapter 02',
      'ch2.title': 'The crack era',
      'ch2.body': 'I grew up playing video games — on the PC and on the Family Game and Sega consoles. Strategy games especially: the kind where you lose twenty times before you understand the system. Paid games were expensive where I grew up, so like a lot of kids I went looking for a free way in: cracks. Mu Online, World of Warcraft, Counter Strike, Age of Empires — the hunt for them became the skill: search operators, forum threads, readme files, the patient work of figuring out why a patch worked. I do not romanticize it today, but that is honestly where the researching reflex began.',
      'ch2.takeaway': 'What looked like a shortcut was secretly a curriculum.',
      'ch2.queries': [
        'why does the game check the disc',
        'no-cd patch explained',
        'what is a checksum',
        'how do forum searches work',
      ],
      'ch2.f1': 'why does the game check the disc?',
      'ch2.f2': 'no-cd patch, explained (long)',
      'ch2.f3': 'what is a checksum? (beginner)',
      'ch2.replies1': '42 replies', 'ch2.replies2': '18 replies', 'ch2.replies3': '7 replies',
      'ch3.kicker': 'Chapter 03',
      'ch3.title': 'How things actually work',
      'ch3.body': 'Every failed crack led to a better question: how do machines actually talk? Somewhere between failed patches and forum arguments, the questions got better than the games. Why does a game need a port open? What is a firewall actually blocking? What is a client, a server, a database? I started reading about TCP, ports, packets and protocols just to understand the things my searches kept bumping into. Networking stopped being jargon and became a map: my computer, a server somewhere, and rules about who may talk to whom.',
      'ch3.takeaway': 'The games faded; the map behind them stayed.',
      'ch3.n1': 'MY PC', 'ch3.n2': 'ROUTER', 'ch3.n3': 'FIREWALL', 'ch3.n4': 'GAME SERVER',
      'ch4.kicker': 'Chapter 04',
      'ch4.title': 'Sixteen and one query string',
      'ch4.body': 'At sixteen, I met my first SQL injection on a Mu Online website — and understood it. Private-server websites for Mu Online and Lineage were my playground — as a reader, then as a curious tinkerer. That is where I first saw <code>’ OR 1=1 --</code>: a login box that trusted whatever it was given. I understood what the query was doing, why a crafted input changed it, and what the server handed back. It was a kid poking at hobby websites — small, local, long gone — and it is exactly why I care about validation and secure design today.',
      'ch4.takeaway': 'Learning how things break is why I build them defensively.',
      'ch4.termTitle': 'mu-fan.hopto.org — login — circa 2005 (mock)',
      'ch4.check': '> checking ... rows returned: all of them',
      'ch4.lesson': '2005: this looked like magic. today: unsanitized input.',
      'ch5.kicker': 'Chapter 05',
      'ch5.title': 'Formal path',
      'ch5.body': 'Formal study finally gave names to the things I already knew. University gave my self-taught instincts a grammar. I started a Software Engineering program and learned programming properly: data structures, algorithms, the reasoning behind tricks I had been improvising for years. Life demanded a faster route to professional work, so I completed the Técnico Programador Universitario at UTN (FRT) and graduated in 2021 — fundamentals plus a credential, and the feeling that formal education was confirming what curiosity had already sketched.',
      'ch5.takeaway': 'Theory met instinct, and both got sharper.',
      'ch5.s1': 'self-taught instincts', 'ch5.s1s': 'forums, patches, ports',
      'ch5.s2': 'ingeniería en software', 'ch5.s2s': 'data structures, algorithms, programming',
      'ch5.s3': 'técnico programador universitario', 'ch5.s3s': 'UTN (FRT)',
      'ch5.diploma': 'graduated 2021 — theory met instinct',
      'ch6.kicker': 'Chapter 06',
      'ch6.title': 'The ladder, 2021–2026',
      'ch6.body': 'Four years from junior to senior — here is every rung. 2021: junior Software Developer at e.tres (later Lytx), untangling payment-gateway integrations. 2022–2025: Software Engineer II at GlobalLogic (Lytx) — a bulk-data endpoint that cut client processing time by 80%, advanced filtering, cross-layer fixes across frontend, backend and database. Jul–Dec 2025: Senior Software Engineer at GlobalLogic (Coalfire) — critical endpoints migrated to a .NET 9 microservice, 30% faster under load, Angular v19 upgrades. Feb 2026: Consultant — CQRS + Mediator patterns in a payment microservice for GreenDot. Since May 2026: Senior AI Software Engineer, building Spec-Driven Development with AI.',
      'ch6.takeaway': 'Four years, five rungs, one direction: deeper systems, more ownership.',
      'ch6.y1': '2021–2022', 'ch6.y2': '2022–2025', 'ch6.y3': 'jul–dec 2025',
      'ch6.y4': 'feb 2026', 'ch6.y5': 'may 2026–',
      'ch6.r1': 'junior software developer', 'ch6.rs1': 'e.tres (later Lytx) · payment-gateway integrations',
      'ch6.r2': 'software engineer II', 'ch6.rs2': 'GlobalLogic (Lytx) · bulk-data endpoint, −80% processing time · cross-layer fixes',
      'ch6.r3': 'senior software engineer', 'ch6.rs3': 'GlobalLogic (Coalfire) · .NET 9 microservice, 30% faster under load',
      'ch6.r4': 'consultant', 'ch6.rs4': 'GreenDot · CQRS + Mediator patterns in a payment microservice',
      'ch6.r5': 'senior AI software engineer', 'ch6.rs5': 'GlobalLogic (Coalfire) · spec-driven development with AI',
      
      'ch7.kicker': 'Chapter 07',
      'ch7.title': 'Now',
      'ch7.body': 'The kid hunting for free games became an engineer hunting for better systems. Today I design and operate scalable .NET systems, and I spend my days helping teams build software with AI through Spec-Driven Development — the documentation reflex from the forum years, now my day job. I still play strategy games. I still read technical articles for fun. I still start from the same question that lit up a CRT screen all those years ago: what else can this machine do?',
      'ch7.takeaway': 'Same curiosity, better tools. Let’s build the next chapter.',
      'ch7.location': 'Córdoba, Argentina',
      'ch7.stackKicker': 'the toolbox',
      'footer.pre': 'Prefer the classic version? ',
      'footer.pdf': 'Download the PDF CV',
      'footer.built': '. Built with vanilla HTML/CSS/JS — no framework, no build step — and tracked with ',
      'meta.title': 'Gonzalo Argañaraz — from CRT boot to senior engineer',
      'meta.description': 'An animated, scroll-driven CV: how hunting game cracks as a kid turned into networking, SQL injections at 16, and a senior engineering career since 2021.',
      'meta.locale': 'en_US',
    },

    es: {
      'ui.skip': 'Saltar a la historia',
      'ui.langAria': 'Idioma',
      'header.kicker': 'La historia de',
      'header.name': 'Gonzalo Argañaraz',
      'header.subtitle': 'Del boot en un CRT a ingeniero senior — un CV contado en siete capítulos.',
      'header.hint': 'Scrolleá para reproducir la historia.',
      'rail.c1': '01 Encendido', 'rail.c2': '02 Era de cracks', 'rail.c3': '03 Redes',
      'rail.c4': '04 Inyección SQL', 'rail.c5': '05 Título', 'rail.c6': '06 La escalera',
      'rail.c7': '07 Ahora',
      'ch1.kicker': 'Capítulo 01',
      'ch1.title': 'La primera computadora',
      'ch1.body': 'Todo arrancó a mis tres o cuatro años, con una máquina con Windows 98 y un cursor verde titilando en una pantalla curva. La primera computadora de mi familia no era gran cosa: un monitor CRT que zumbaba antes de prender, una pantalla de arranque que se tomaba su tiempo, y un teclado que parecía el idioma propio de una máquina. Todavía no conocía ni un término técnico. Solo sabía que lo que vivía dentro de esa caja beige obedecía las palabras que yo escribía. Ahí empezaron las preguntas: ¿qué más puedo hacer con ella?',
      'ch1.takeaway': 'La curiosidad, una vez encendida, nunca se apaga del todo.',
      'ch1.bootLines': [
        'ARGGON BIOS v1.0 - CORDOBA, AR',
        'MEMORY TEST ... 640K OK',
        'DETECTING CURIOSITY ... FOUND',
        'LOADING STORY.EXE',
      ],
      'ch2.kicker': 'Capítulo 02',
      'ch2.title': 'La era de los cracks',
      'ch2.body': 'Crecí jugando videojuegos — en la PC y en las consolas: el Family Game y el Sega. Los de estrategia sobre todo: de esos donde perdés veinte veces antes de entender el sistema. Los juegos pagos eran caros donde crecí, así que como muchos pibes salí a buscar la entrada gratis: cracks. Mu Online, World of Warcraft, Counter Strike, Age of Empires — la caza se volvió la habilidad: operadores de búsqueda, threads de foros, archivos readme, el trabajo paciente de entender por qué funcionaba un parche. Hoy no lo romantizo, pero ahí nació de verdad mi reflejo investigador.',
      'ch2.takeaway': 'Lo que parecía un atajo era, en secreto, un plan de estudio.',
      'ch2.queries': [
        'por qué el juego verifica el disco',
        'parche no-cd explicado',
        'qué es un checksum',
        'cómo funcionan las búsquedas en foros',
      ],
      'ch2.f1': '¿por qué el juego verifica el disco?',
      'ch2.f2': 'parche no-cd, explicado (largo)',
      'ch2.f3': '¿qué es un checksum? (principiante)',
      'ch2.replies1': '42 respuestas', 'ch2.replies2': '18 respuestas', 'ch2.replies3': '7 respuestas',
      'ch3.kicker': 'Capítulo 03',
      'ch3.title': 'Cómo funcionan de verdad las cosas',
      'ch3.body': 'Cada crack fallido dejaba una mejor pregunta: ¿cómo se hablan las máquinas, en realidad? En algún punto entre parches fallidos y discusiones de foro, las preguntas se volvieron mejores que los juegos. ¿Por qué un juego necesita un puerto abierto? ¿Qué bloquea exactamente un firewall? ¿Qué es un cliente, un servidor, una base de datos? Empecé a leer sobre TCP, puertos, paquetes y protocolos solo para entender con lo que mis búsquedas se topaban. Las redes dejaron de ser jerga y se volvieron un mapa: mi computadora, un servidor en algún lado, y reglas sobre quién puede hablar con quién.',
      'ch3.takeaway': 'Los juegos se apagaron; el mapa que había detrás quedó.',
      'ch3.n1': 'MI PC', 'ch3.n2': 'ROUTER', 'ch3.n3': 'FIREWALL', 'ch3.n4': 'SERVIDOR DEL JUEGO',
      'ch4.kicker': 'Capítulo 04',
      'ch4.title': 'Dieciséis y una query string',
      'ch4.body': 'A los dieciséis conocí mi primera inyección SQL en una web de Mu Online — y la entendí. Las webs de servidores privados de Mu Online y Lineage eran mi patio de juegos — primero como lector, después como curioso experimentalista. Ahí vi por primera vez <code>’ OR 1=1 --</code>: un login que se confiaba de lo que fuera que le entregaran. Entendía qué hacía la query, por qué un input armado a mano la cambiaba, y qué devolvía el servidor. Era un pibe molestando webs de hobby — pequeñas, locales, desaparecidas hace largo — y es exactamente la razón por la que hoy me importa la validación y el diseño seguro.',
      'ch4.takeaway': 'Entender cómo se rompen las cosas es por lo que las construyo a prueba de rotura.',
      'ch4.termTitle': 'mu-fan.hopto.org — login — circa 2005 (simulado)',
      'ch4.check': '> verificando ... filas devueltas: todas',
      'ch4.lesson': '2005: parecía magia. hoy: input sin sanitizar.',
      'ch5.kicker': 'Capítulo 05',
      'ch5.title': 'El camino formal',
      'ch5.body': 'El estudio formal por fin le puso nombre a lo que ya sabía. La universidad le dio gramática a mi instinto autodidacta. Empecé Ingeniería en Software y aprendí a programar en serio: estructuras de datos, algoritmos, el razonamiento detrás de los trucos que venía improvisando hace años. La vida pedía un camino más rápido al trabajo profesional, así que completé el Técnico Programador Universitario en la UTN (FRT) y me recibí en 2021 — fundamentos más una credencial, y la sensación de que la educación formal confirmaba lo que la curiosidad ya había dibujado.',
      'ch5.takeaway': 'La teoría se encontró con el instinto, y ambos afilaron al otro.',
      'ch5.s1': 'instinto autodidacta', 'ch5.s1s': 'foros, parches, puertos',
      'ch5.s2': 'ingeniería en software', 'ch5.s2s': 'estructuras de datos, algoritmos, programación',
      'ch5.s3': 'técnico programador universitario', 'ch5.s3s': 'UTN (FRT)',
      'ch5.diploma': 'graduado 2021 — la teoría encontró al instinto',
      'ch6.kicker': 'Capítulo 06',
      'ch6.title': 'La escalera, 2021–2026',
      'ch6.body': 'Cuatro años de junior a senior — cada peldaño. 2021: desarrollador junior en e.tres (luego Lytx), desenredando integraciones con pasarelas de pago. 2022–2025: Software Engineer II en GlobalLogic (Lytx) — un endpoint de datos masivos que recortó 80% el tiempo de proceso de los clientes, filtros avanzados, fixes cross-layer entre frontend, backend y base de datos. Jul–Dic 2025: Ingeniero de Software Senior en GlobalLogic (Coalfire) — endpoints críticos migrados a un microservicio .NET 9, 30% más rápido bajo carga, upgrade a Angular v19. Feb 2026: Consultor — patrones CQRS + Mediator en un microservicio de pagos para GreenDot. Desde mayo 2026: Ingeniero de Software Senior de AI, construyendo Spec-Driven Development con IA.',
      'ch6.takeaway': 'Cuatro años, cinco peldaños, una dirección: sistemas más profundos, más ownership.',
      'ch6.y1': '2021–2022', 'ch6.y2': '2022–2025', 'ch6.y3': 'jul–dic 2025',
      'ch6.y4': 'feb 2026', 'ch6.y5': 'may 2026–',
      'ch6.r1': 'desarrollador junior', 'ch6.rs1': 'e.tres (luego Lytx) · integraciones con pasarelas de pago',
      'ch6.r2': 'software engineer II', 'ch6.rs2': 'GlobalLogic (Lytx) · endpoint de datos masivos, −80% tiempo de proceso · fixes cross-layer',
      'ch6.r3': 'ingeniero de software senior', 'ch6.rs3': 'GlobalLogic (Coalfire) · microservicio .NET 9, 30% más rápido bajo carga',
      'ch6.r4': 'consultor', 'ch6.rs4': 'GreenDot · patrones CQRS + Mediator en un microservicio de pagos',
      'ch6.r5': 'ingeniero senior de AI', 'ch6.rs5': 'GlobalLogic (Coalfire) · spec-driven development con IA',
      
      'ch7.kicker': 'Capítulo 07',
      'ch7.title': 'Ahora',
      'ch7.body': 'El pibe que cazaba juegos gratis se volvió un ingeniero que caza mejores sistemas. Hoy diseño y opero sistemas .NET escalables, y paso mis días ayudando a equipos a construir software con IA mediante Spec-Driven Development — el reflejo documentador de los años de foros, ahora mi trabajo diario. Sigo jugando juegos de estrategia. Sigo leyendo artículos técnicos por diversión. Y sigo arrancando de la misma pregunta que encendió un CRT hace tantos años: ¿qué más puedo hacer con esta máquina?',
      'ch7.takeaway': 'Misma curiosidad, mejores herramientas. Construyamos el próximo capítulo.',
      'ch7.location': 'Córdoba, Argentina',
      'ch7.stackKicker': 'la caja de herramientas',
      'footer.pre': '¿Preferís la versión clásica? ',
      'footer.pdf': 'Descargá el CV en PDF',
      'footer.built': '. Hecho con HTML/CSS/JS vanilla — sin framework, sin build — y gestionado con ',
      'meta.title': 'Gonzalo Argañaraz — del boot en un CRT a ingeniero senior',
      'meta.description': 'Un CV animado que se cuenta al scrollear: cómo buscar cracks de juegos de pibe terminó en redes, inyecciones SQL a los 16 y una carrera senior desde 2021.',
      'meta.locale': 'es_AR',
    },
  };

  var LANGS = ['en', 'es'];
  var STORAGE_KEY = 'cv-lang';

  /**
   * Normalize a stored/preferred value to a supported language.
   * @param {string|null} preferred Stored preference (may be junk).
   * @returns {'en'|'es'} Defaults to EN.
   */
  function resolveLang(preferred) {
    return (preferred === 'es') ? 'es' : 'en';
  }

  function isKey(key, lang) {
    return Object.prototype.hasOwnProperty.call(STRINGS[lang] || {}, key);
  }

  /**
   * Dictionary parity: both languages must define exactly the same keys,
   * and array values must match in length (boot lines, search queries).
   * @returns {string[]} Human-readable problems; empty when in sync.
   */
  function dictProblems() {
    var problems = [];
    LANGS.forEach(function (lang) {
      Object.keys(STRINGS[lang]).forEach(function (key) {
        LANGS.forEach(function (other) {
          if (other === lang) return;
          if (!isKey(key, other)) problems.push('missing key ' + other + ':' + key);
        });
      });
    });
    LANGS[0] && Object.keys(STRINGS[LANGS[0]]).forEach(function (key) {
      var a = STRINGS[LANGS[0]][key];
      var b = STRINGS[LANGS[1]][key];
      if (Array.isArray(a) && Array.isArray(b) && a.length !== b.length) {
        problems.push('array length mismatch at ' + key);
      }
      if (Array.isArray(a) !== Array.isArray(b)) {
        problems.push('array/not-array mismatch at ' + key);
      }
    });
    return problems;
  }

  function t(key, lang) {
    /* No explicit language: follow the document (Node callers get EN). */
    var l = resolveLang(lang !== undefined ? lang
      : (typeof document !== 'undefined' ? document.documentElement.getAttribute('lang') : null));
    return isKey(key, l) ? STRINGS[l][key] : (isKey(key, 'en') ? STRINGS.en[key] : undefined);
  }

  function setMeta(content, value) {
    var el = document.querySelector(content);
    if (el) el.setAttribute('content', value);
  }

  /**
   * Apply a language to the document: swap [data-i18n] text, title,
   * meta/OG strings, <html lang>, toggle state; persist and broadcast.
   * @param {'en'|'es'} lang
   * @param {Object} [opts] persist=false skips localStorage (tests).
   */
  function applyLang(lang, opts) {
    lang = resolveLang(lang);
    var dict = STRINGS[lang];

    Array.prototype.forEach.call(document.querySelectorAll('[data-i18n]'), function (el) {
      var key = el.getAttribute('data-i18n');
      if (!isKey(key, lang)) return;
      /* ch4 body carries an inline <code>; only nodes explicitly marked
         data-i18n-html get markup (dict is first-party, so this is safe). */
      if (el.hasAttribute('data-i18n-html')) {
        el.innerHTML = dict[key];
      } else {
        el.textContent = dict[key];
      }
    });

    document.documentElement.setAttribute('lang', lang);
    document.title = dict['meta.title'];
    setMeta('meta[name="description"]', dict['meta.description']);
    setMeta('meta[property="og:title"]', dict['meta.title']);
    setMeta('meta[property="og:description"]', dict['meta.description']);
    setMeta('meta[property="og:locale"]', dict['meta.locale']);
    setMeta('meta[name="twitter:title"]', dict['meta.title']);
    setMeta('meta[name="twitter:description"]', dict['meta.description']);

    Array.prototype.forEach.call(document.querySelectorAll('[data-lang-button]'), function (btn) {
      btn.setAttribute('aria-pressed', String(btn.getAttribute('data-lang-button') === lang));
    });

    if (!opts || opts.persist !== false) {
      try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* private mode */ }
    }

    document.dispatchEvent(new CustomEvent('cv:langchange', { detail: { lang: lang } }));
    return lang;
  }

  function stored() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }

  function init(doc, win) {
    function bind() {
      Array.prototype.forEach.call(doc.querySelectorAll('[data-lang-button]'), function (btn) {
        btn.addEventListener('click', function () {
          applyLang(btn.getAttribute('data-lang-button'));
        });
      });
      applyLang(resolveLang(stored()));
    }
    if (doc.readyState === 'loading') {
      doc.addEventListener('DOMContentLoaded', bind);
    } else {
      bind();
    }
  }

  if (typeof document !== 'undefined' && document.querySelector) {
    init(document, window);
  }

  return {
    STRINGS: STRINGS,
    LANGS: LANGS,
    STORAGE_KEY: STORAGE_KEY,
    resolveLang: resolveLang,
    dictProblems: dictProblems,
    t: t,
    applyLang: applyLang
  };
}));
