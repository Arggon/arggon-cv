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
      'ui.skip': "Skip to the story",
      'ui.langAria': "Language",
      'header.kicker': "Hi, I'm",
      'header.name': "Gonzalo Argañaraz",
      'header.subtitle': "Senior .NET backend developer from Argentina. I ship code with AI agents, spec first. Open to remote roles.",
      'header.hint': "Got a minute? Scroll for the story.",
      'rail.c1': "01 Windows 98",
      'rail.c2': "02 Cracks",
      'rail.c3': "03 Networks",
      'rail.c4': "04 ' OR 1=1",
      'rail.c5': "05 UTN",
      'rail.c6': "06 Work",
      'rail.c7': "07 Now",
      'ch1.kicker': "Chapter 01",
      'ch1.title': "Windows 98, age four",
      'ch1.body': "I was three or four when we got a Windows 98 PC at home. A buzzing CRT, a beige tower, a slow boot. I clicked everything, and when it didn't obey, I wanted to know why.",
      'ch1.takeaway': "I'm still poking at machines. Better tools now.",
      'ch1.bootLines': ["ARGGON BIOS v1.0 - CORDOBA, AR","MEMORY TEST ... 640K OK","DETECTING CURIOSITY ... FOUND","LOADING STORY.EXE"],
      'ch2.kicker': "Chapter 02",
      'ch2.title': "Cracks and forum threads",
      'ch2.body': "Games were expensive in Argentina, so I hunted cracks for Mu Online, WoW, Counter Strike and Age of Empires. Half of them failed. Reading forums to find out why taught me more than the games.",
      'ch2.takeaway': "When something breaks, I go find out why.",
      'ch2.queries': ["why does the game check the disc","no-cd patch explained","what is a checksum","how do forum searches work"],
      'ch2.f1': "why does the game check the disc?",
      'ch2.f2': "no-cd patch, explained (long)",
      'ch2.f3': "what is a checksum? (beginner)",
      'ch2.replies1': "42 replies",
      'ch2.replies2': "18 replies",
      'ch2.replies3': "7 replies",
      'ch3.kicker': "Chapter 03",
      'ch3.title': "Ports and routers",
      'ch3.body': "Failed cracks led to better questions. Why does this game need an open port? What is my firewall blocking? I read about TCP until I could picture the whole path from my PC to the server.",
      'ch3.takeaway': "I came for the games and stayed for the plumbing.",
      'ch3.n1': "MY PC",
      'ch3.n2': "ROUTER",
      'ch3.n3': "FIREWALL",
      'ch3.n4': "GAME SERVER",
      'ch4.kicker': "Chapter 04",
      'ch4.title': "Sixteen, and ' OR 1=1",
      'ch4.body': "At sixteen I found <code>’ OR 1=1 --</code> on a forum and pasted it into a Mu Online private server login. I was in. I tweaked it to grab items I wanted, not my proudest moment, then dug in until I understood the SQL behind it.",
      'ch4.takeaway': "That's why I validate every input today.",
      'ch4.termTitle': "mu-fan.hopto.org · login · circa 2005 (mock)",
      'ch4.check': "> checking ... rows returned: all of them",
      'ch4.lesson': "back then it felt like magic. now i know it's unsanitized input.",
      'ch5.kicker': "Chapter 05",
      'ch5.title': "UTN",
      'ch5.body': "I started Software Engineering to learn the basics properly. Then I switched to the shorter Técnico Programador Universitario at UTN FRT so I could start working sooner, and graduated in 2021.",
      'ch5.takeaway': "Tricks I'd been using for years finally had names.",
      'ch5.s1': "learning on my own",
      'ch5.s1s': "forums, patches, ports",
      'ch5.s2': "software engineering",
      'ch5.s2s': "data structures, algorithms",
      'ch5.s3': "técnico programador universitario",
      'ch5.s3s': "UTN FRT",
      'ch5.diploma': "graduated in 2021",
      'ch6.kicker': "Chapter 06",
      'ch6.title': "Work, 2021 to 2026",
      'ch6.body': "Five years, from junior at e.tres to senior at GlobalLogic. I built a bulk endpoint that cut client processing time by 80%, moved endpoints to a .NET 9 microservice that ran 30% faster under load, and did CQRS work on payments for GreenDot.",
      'ch6.takeaway': "Every step, a bigger piece of the system.",
      'ch6.y1': "2021–2022",
      'ch6.y2': "2022–2025",
      'ch6.y3': "jul–dec 2025",
      'ch6.y4': "feb 2026",
      'ch6.y5': "may–aug 2026",
      'ch6.r1': "junior software developer",
      'ch6.rs1': "e.tres (later Lytx) · payment gateway integrations",
      'ch6.r2': "software engineer II",
      'ch6.rs2': "GlobalLogic (Lytx) · bulk-data endpoint, 80% less processing time",
      'ch6.r3': "senior software engineer",
      'ch6.rs3': "GlobalLogic (Coalfire) · .NET 9 microservice 30% faster, Angular v19 22% faster loads",
      'ch6.r4': "consultant",
      'ch6.rs4': "GreenDot · CQRS and Mediator in a payment microservice",
      'ch6.r5': "senior AI software engineer",
      'ch6.rs5': "GlobalLogic (Coalfire) · spec-driven development with AI agents, plus TDD",
      'ch7.kicker': "Chapter 07",
      'ch7.title': "Now",
      'ch7.body': "Last role: a spec-first framework for shipping code with AI agents. On my own time, ArggonManager, where tasks are Markdown in the repo and agents code and review them. I keep the calls you can't undo. Weekends, I'm learning Rust.",
      'ch7.takeaway': "The code is on GitHub.",
      'ch7.location': "Córdoba, Argentina",
      'ch7.stackKicker': "what I work with",
      'footer.pre': "Rather read a regular CV? ",
      'footer.pdf': "Here's the PDF",
      'footer.built': ". I built this site with plain HTML, CSS and JavaScript, no framework, and I track the work with ",
      'hero.status': "Open to work · remote · Córdoba, AR (UTC-3)",
      'hero.m1': "less client processing time, bulk endpoint I built (Lytx)",
      'hero.m2': "faster under load, .NET 9 microservice (Coalfire)",
      'hero.m3': "faster page loads, Angular v19 upgrade",
      'cta.email': "Hire me · Email",
      'cta.pdf': "Download CV",
      'ch7.p1tag': "main project · TypeScript",
      'ch7.p1': "Project management that lives in your repo. Each task is a Markdown file, and a CLI checks them and renders a kanban board. Agents write and verify the code. I stay as the product owner. I track this site with it.",
      'ch7.p2tag': "lab · Rust",
      'ch7.p2': "A habit streak CLI, my first real Rust project. If there's no D-Bus for notifications it exits with code 2, so the systemd timer fails loudly instead of quietly.",
      'ch7.p3tag': "lab · Python",
      'ch7.p3': "My backup tool. It checks every copy with SHA-256 and keeps snapshots that never get modified.",
      'ch7.p4tag': "lab · TypeScript",
      'ch7.p4': "Splits shared expenses between friends and settles them with as few transfers as possible.",
      'ch7.p5tag': "labs · Go",
      'ch7.p5': "Two small Go tools: one tracks the books I read, the other runs Swiss-system tournaments (still early).",
      'contact.kicker': "Chapter 08 · not written yet",
      'contact.title': "Looking for a backend developer?",
      'contact.body': "Remote senior role in backend, .NET or AI engineering, or a freelance project. If that fits your team, send me an email.",
      'meta.title': "Gonzalo Argañaraz | backend developer (.NET, AI agents)",
      'meta.description': "My CV as a story: from a Windows 98 PC and a SQL injection at 16 to .NET backend work and AI agent workflows. Open to remote roles.",
      'meta.locale': "en_US",
      'hero.hook': "I cut client processing time by 80% with one endpoint.",
      'skim.expK': "Experience",
      'skim.expV': "5 years, since 2021",
      'skim.stackK': "Stack",
      'skim.stackV': "C#, .NET, SQL Server, AWS, Angular",
      'skim.focusK': "Focus",
      'skim.focusV': "AI agent workflows, learning Rust",
      'skim.whereK': "Where",
      'skim.whereV': "Córdoba, AR · remote · English C1",
    },
    es: {
      'ui.skip': "Saltar a la historia",
      'ui.langAria': "Idioma",
      'header.kicker': "Hola, soy",
      'header.name': "Gonzalo Argañaraz",
      'header.subtitle': "Desarrollador backend .NET senior, de Argentina. Programo con agentes de IA, spec primero. Disponible para roles remotos.",
      'header.hint': "¿Tenés un minuto? Bajá y te cuento la historia.",
      'rail.c1': "01 Windows 98",
      'rail.c2': "02 Cracks",
      'rail.c3': "03 Redes",
      'rail.c4': "04 ' OR 1=1",
      'rail.c5': "05 UTN",
      'rail.c6': "06 Laburo",
      'rail.c7': "07 Ahora",
      'ch1.kicker': "Capítulo 01",
      'ch1.title': "Windows 98, a los cuatro",
      'ch1.body': "Tenía tres o cuatro años cuando llegó una PC con Windows 98 a casa. Un CRT que zumbaba, un gabinete beige, un arranque eterno. Clickeaba todo, y cuando no me hacía caso, quería saber por qué.",
      'ch1.takeaway': "Sigo metiéndole mano a las máquinas. Ahora con mejores herramientas.",
      'ch1.bootLines': ["ARGGON BIOS v1.0 - CORDOBA, AR","MEMORY TEST ... 640K OK","DETECTING CURIOSITY ... FOUND","LOADING STORY.EXE"],
      'ch2.kicker': "Capítulo 02",
      'ch2.title': "Cracks y foros",
      'ch2.body': "Los juegos eran caros, así que salía a buscar cracks para Mu Online, WoW, Counter Strike y Age of Empires. La mitad no andaba. Leer foros para entender por qué me enseñó más que los juegos.",
      'ch2.takeaway': "Si algo se rompe, voy a ver por qué.",
      'ch2.queries': ["por qué el juego verifica el disco","parche no-cd explicado","qué es un checksum","cómo funcionan las búsquedas en foros"],
      'ch2.f1': "¿por qué el juego verifica el disco?",
      'ch2.f2': "parche no-cd, explicado (largo)",
      'ch2.f3': "¿qué es un checksum? (principiante)",
      'ch2.replies1': "42 respuestas",
      'ch2.replies2': "18 respuestas",
      'ch2.replies3': "7 respuestas",
      'ch3.kicker': "Capítulo 03",
      'ch3.title': "Puertos y routers",
      'ch3.body': "Los cracks que fallaban me dejaban mejores preguntas. ¿Por qué este juego necesita un puerto abierto? ¿Qué bloquea mi firewall? Leí sobre TCP hasta poder imaginarme todo el camino de mi PC al servidor.",
      'ch3.takeaway': "Vine por los juegos y me quedé por las cañerías.",
      'ch3.n1': "MI PC",
      'ch3.n2': "ROUTER",
      'ch3.n3': "FIREWALL",
      'ch3.n4': "SERVIDOR",
      'ch4.kicker': "Capítulo 04",
      'ch4.title': "Dieciséis años y ' OR 1=1",
      'ch4.body': "A los dieciséis encontré <code>’ OR 1=1 --</code> en un foro y lo pegué en el login de un servidor privado de Mu Online. Entré. Lo modifiqué para sacar ítems que quería, no es algo de lo que me enorgullezca, y no paré hasta entender el SQL que había atrás.",
      'ch4.takeaway': "Por eso hoy valido cada input.",
      'ch4.termTitle': "mu-fan.hopto.org · login · circa 2005 (simulado)",
      'ch4.check': "> verificando ... filas devueltas: todas",
      'ch4.lesson': "en ese momento parecía magia. hoy sé que es input sin sanitizar.",
      'ch5.kicker': "Capítulo 05",
      'ch5.title': "UTN",
      'ch5.body': "Arranqué Ingeniería en Software para aprender las bases bien. Después me pasé a Técnico Programador Universitario en la UTN FRT, más corta, para empezar a laburar antes, y me recibí en 2021.",
      'ch5.takeaway': "Trucos que venía usando hacía años por fin tenían nombre.",
      'ch5.s1': "aprendiendo solo",
      'ch5.s1s': "foros, parches, puertos",
      'ch5.s2': "ingeniería en software",
      'ch5.s2s': "estructuras de datos, algoritmos",
      'ch5.s3': "técnico programador universitario",
      'ch5.s3s': "UTN FRT",
      'ch5.diploma': "recibido en 2021",
      'ch6.kicker': "Capítulo 06",
      'ch6.title': "Laburo, 2021 a 2026",
      'ch6.body': "Cinco años, de junior en e.tres a senior en GlobalLogic. Hice un endpoint masivo que bajó 80% el tiempo de proceso de los clientes, pasamos endpoints a un microservicio .NET 9 que anduvo 30% más rápido bajo carga, y trabajé con CQRS en pagos para GreenDot.",
      'ch6.takeaway': "En cada paso, un pedazo más grande del sistema.",
      'ch6.y1': "2021–2022",
      'ch6.y2': "2022–2025",
      'ch6.y3': "jul–dic 2025",
      'ch6.y4': "feb 2026",
      'ch6.y5': "may–ago 2026",
      'ch6.r1': "desarrollador junior",
      'ch6.rs1': "e.tres (luego Lytx) · integraciones con pasarelas de pago",
      'ch6.r2': "software engineer II",
      'ch6.rs2': "GlobalLogic (Lytx) · endpoint de datos masivos, 80% menos tiempo de proceso",
      'ch6.r3': "ingeniero de software senior",
      'ch6.rs3': "GlobalLogic (Coalfire) · microservicio .NET 9 30% más rápido, Angular v19 con cargas 22% más rápidas",
      'ch6.r4': "consultor",
      'ch6.rs4': "GreenDot · CQRS y Mediator en un microservicio de pagos",
      'ch6.r5': "ingeniero senior de AI",
      'ch6.rs5': "GlobalLogic (Coalfire) · spec-driven development con agentes de IA, más TDD",
      'ch7.kicker': "Capítulo 07",
      'ch7.title': "Ahora",
      'ch7.body': "Último rol: un framework spec-first para programar con agentes de IA. Por mi cuenta, ArggonManager: las tareas son Markdown en el repo y los agentes las programan y revisan. Las decisiones sin vuelta atrás son mías. Los fines de semana, Rust.",
      'ch7.takeaway': "El código está en GitHub.",
      'ch7.location': "Córdoba, Argentina",
      'ch7.stackKicker': "con qué trabajo",
      'footer.pre': "¿Preferís un CV normal? ",
      'footer.pdf': "Acá está el PDF",
      'footer.built': ". Hice este sitio con HTML, CSS y JavaScript, sin framework, y lo gestiono con ",
      'hero.status': "Disponible · remoto · Córdoba, AR (UTC-3)",
      'hero.m1': "menos tiempo de proceso, endpoint masivo que hice (Lytx)",
      'hero.m2': "más rápido bajo carga, microservicio .NET 9 (Coalfire)",
      'hero.m3': "más rápido cargan las páginas, upgrade a Angular v19",
      'cta.email': "Contratame · Email",
      'cta.pdf': "Bajar CV",
      'ch7.p1tag': "proyecto principal · TypeScript",
      'ch7.p1': "Gestión de proyectos que vive en tu repo. Cada tarea es un archivo Markdown, y un CLI las valida y arma un tablero kanban. Los agentes escriben y verifican el código. Yo me quedo como product owner. Con esto gestiono este sitio.",
      'ch7.p2tag': "lab · Rust",
      'ch7.p2': "Un CLI para rachas de hábitos, mi primer proyecto en serio con Rust. Si no hay D-Bus para las notificaciones sale con código 2, así el timer de systemd falla a los gritos y no en silencio.",
      'ch7.p3tag': "lab · Python",
      'ch7.p3': "Mi herramienta de backups. Verifica cada copia con SHA-256 y guarda snapshots que nunca se tocan.",
      'ch7.p4tag': "lab · TypeScript",
      'ch7.p4': "Divide los gastos entre amigos y los salda con la menor cantidad de transferencias posible.",
      'ch7.p5tag': "labs · Go",
      'ch7.p5': "Dos herramientas chicas en Go: una para anotar los libros que leo y otra para torneos con sistema suizo (todavía en pañales).",
      'contact.kicker': "Capítulo 08 · sin escribir",
      'contact.title': "¿Buscás un dev backend?",
      'contact.body': "Busco un rol senior remoto en backend, .NET o IA, o un proyecto freelance. Si encaja con tu equipo, mandame un mail.",
      'meta.title': "Gonzalo Argañaraz | desarrollador backend (.NET, agentes de IA)",
      'meta.description': "Mi CV contado como historia: de una PC con Windows 98 y una inyección SQL a los 16 a backend .NET y flujos con agentes de IA. Disponible para roles remotos.",
      'meta.locale': "es_AR",
      'hero.hook': "Bajé 80% el tiempo de proceso de los clientes con un solo endpoint.",
      'skim.expK': "Experiencia",
      'skim.expV': "5 años, desde 2021",
      'skim.stackK': "Stack",
      'skim.stackV': "C#, .NET, SQL Server, AWS, Angular",
      'skim.focusK': "Foco",
      'skim.focusV': "flujos con agentes de IA, aprendiendo Rust",
      'skim.whereK': "Dónde",
      'skim.whereV': "Córdoba, AR · remoto · inglés C1",
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
