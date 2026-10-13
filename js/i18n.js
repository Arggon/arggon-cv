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
      'header.subtitle': "I'm a backend developer from Córdoba, Argentina. I've been writing .NET professionally since 2021, and lately I spend a lot of my time figuring out how to work well with AI agents. This is how I got here.",
      'header.hint': "Scroll down. It starts in the 90s.",
      'rail.c1': "01 Windows 98",
      'rail.c2': "02 Cracks",
      'rail.c3': "03 Networks",
      'rail.c4': "04 ' OR 1=1",
      'rail.c5': "05 UTN",
      'rail.c6': "06 Work",
      'rail.c7': "07 Now",
      'ch1.kicker': "Chapter 01",
      'ch1.title': "Windows 98, age four or so",
      'ch1.body': "I was three or four when we got our first computer at home. Windows 98, a CRT monitor that buzzed before the picture showed up, and a beige tower that took forever to boot. I had no idea what anything was called. I remember sitting way too close to the screen, clicking on everything, amazed that the thing actually did what I asked. Sometimes it didn't. That was even more interesting, because I wanted to know why.",
      'ch1.takeaway': "I'm still that kid poking at the machine. The tools just got better.",
      'ch1.bootLines': ["ARGGON BIOS v1.0 - CORDOBA, AR","MEMORY TEST ... 640K OK","DETECTING CURIOSITY ... FOUND","LOADING STORY.EXE"],
      'ch2.kicker': "Chapter 02",
      'ch2.title': "Cracked games and forum threads",
      'ch2.body': "I grew up on games. The PC, a Family Game, a Sega. I loved strategy games, the ones you lose twenty times before they click. Games were expensive in Argentina, so like a lot of kids I went looking for cracks for Mu Online, World of Warcraft, Counter Strike and Age of Empires. Half of them didn't work. So I read forum threads, readme files and very long posts from people who knew way more than me, trying to figure out why one patch worked and the next one didn't. I'm not proud of the piracy. I am grateful for the habit: when something breaks, go find out why.",
      'ch2.takeaway': "That's still how I debug.",
      'ch2.queries': ["why does the game check the disc","no-cd patch explained","what is a checksum","how do forum searches work"],
      'ch2.f1': "why does the game check the disc?",
      'ch2.f2': "no-cd patch, explained (long)",
      'ch2.f3': "what is a checksum? (beginner)",
      'ch2.replies1': "42 replies",
      'ch2.replies2': "18 replies",
      'ch2.replies3': "7 replies",
      'ch3.kicker': "Chapter 03",
      'ch3.title': "Ports, routers and a lot of questions",
      'ch3.body': "The more cracks failed, the more I wanted to know how games talked to their servers. Why did this one need a port open? What was my firewall blocking? What even is a server? I started reading about TCP, packets and protocols, mostly to understand words I kept seeing on forums. At some point the questions got more interesting than the games. I could picture my PC, the router, the firewall and some server far away, and how a message traveled between them.",
      'ch3.takeaway': "I came for the games and stayed for the plumbing.",
      'ch3.n1': "MY PC",
      'ch3.n2': "ROUTER",
      'ch3.n3': "FIREWALL",
      'ch3.n4': "GAME SERVER",
      'ch4.kicker': "Chapter 04",
      'ch4.title': "Sixteen, and one weird login",
      'ch4.body': "At sixteen I spent hours on Mu Online and Lineage private server sites. On one of them I found <code>’ OR 1=1 --</code> in a forum post. I copied it, pasted it into the login box, and I was in. Then I started changing it myself, and soon I was getting the in-game items I wanted. I'm not proud of that part. But I didn't stop until I understood why it worked: the site pasted whatever you typed straight into its SQL query, and 1=1 is always true. That stuck with me. Today I validate every input.",
      'ch4.takeaway': "I write code assuming a sixteen-year-old me is on the other side.",
      'ch4.termTitle': "mu-fan.hopto.org · login · circa 2005 (mock)",
      'ch4.check': "> checking ... rows returned: all of them",
      'ch4.lesson': "back then it felt like magic. now i know it's unsanitized input.",
      'ch5.kicker': "Chapter 05",
      'ch5.title': "UTN",
      'ch5.body': "After years of learning things out of order, I wanted the basics done properly. I started Software Engineering and finally studied data structures and algorithms instead of guessing. A lot of tricks I'd been using for years suddenly had names. Then I needed to start working sooner, so I switched to the Técnico Programador Universitario at UTN FRT and finished it in 2021. A shorter degree, the same fundamentals, and the door to my first job.",
      'ch5.takeaway': "Studying put names on things I'd been doing by ear.",
      'ch5.s1': "learning on my own",
      'ch5.s1s': "forums, patches, ports",
      'ch5.s2': "software engineering",
      'ch5.s2s': "data structures, algorithms",
      'ch5.s3': "técnico programador universitario",
      'ch5.s3s': "UTN FRT",
      'ch5.diploma': "graduated in 2021",
      'ch6.kicker': "Chapter 06",
      'ch6.title': "Work, 2021 to 2026",
      'ch6.body': "My first job was at e.tres in 2021, fixing payment gateway integrations. In 2022 I joined GlobalLogic and spent three years on the Lytx account. What I'm proudest of from that time is a bulk-data endpoint that cut our clients' processing time by 80%. In 2025 I went senior on the Coalfire account. We moved critical endpoints to a .NET 9 microservice and got 30% faster under load, and the Angular v19 upgrade made pages load 22% faster. In early 2026 I consulted for GreenDot on a payment microservice using CQRS and Mediator. From May to August I built a spec-driven framework for shipping code with AI agents.",
      'ch6.takeaway': "Every step meant owning a bigger piece of the system.",
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
      'ch7.title': "Today",
      'ch7.body': "My last role taught me something I keep repeating: AI agents do much better work when they get a spec and tests before writing any code. So I built ArggonManager around that idea. Tasks live as Markdown files in the repo, and agents pick them up, code them and review each other through git, the same way people do. I keep the decisions you can't undo, like accepting a feature or cutting a release. I try it on small side projects, and this site is one of them. On weekends I'm learning Rust. Coming from C#, the compiler is strict with me, and I like that.",
      'ch7.takeaway': "If you want to see how I work, the code is on GitHub.",
      'ch7.location': "Córdoba, Argentina",
      'ch7.stackKicker': "what I work with",
      'footer.pre': "Rather read a regular CV? ",
      'footer.pdf': "Here's the PDF",
      'footer.built': ". I built this site with plain HTML, CSS and JavaScript, no framework, and I track the work with ",
      'hero.status': "Open to work · remote · Córdoba, AR (UTC-3)",
      'hero.role': "Backend developer · C# and .NET · AI agents · learning Rust",
      'hero.m1': "less processing time for our clients, after I built a bulk-data endpoint at Lytx",
      'hero.m2': "faster under load once we moved critical endpoints to a .NET 9 microservice",
      'hero.m3': "faster page loads after we upgraded the app to Angular v19",
      'cta.email': "Write me",
      'cta.hire': "Let's work together",
      'cta.pdf': "Download my CV (PDF)",
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
      'contact.body': "I'm looking for a remote senior role in backend, .NET or AI engineering, and I'm open to freelance projects too. I like getting the business rules right and checking the numbers after a release. If that sounds useful for your team, send me an email.",
      'meta.title': "Gonzalo Argañaraz | backend developer (.NET, AI agents)",
      'meta.description': "My CV as a story: from a Windows 98 PC and a SQL injection at 16 to .NET backend work and AI agent workflows. Open to remote roles.",
      'meta.locale': "en_US",
    },
    es: {
      'ui.skip': "Saltar a la historia",
      'ui.langAria': "Idioma",
      'header.kicker': "Hola, soy",
      'header.name': "Gonzalo Argañaraz",
      'header.subtitle': "Soy desarrollador backend en Córdoba. Trabajo con .NET desde 2021 y últimamente paso mucho tiempo buscando la mejor forma de laburar con agentes de IA. Esta es la historia de cómo llegué.",
      'header.hint': "Bajá. Arranca en los 90.",
      'rail.c1': "01 Windows 98",
      'rail.c2': "02 Cracks",
      'rail.c3': "03 Redes",
      'rail.c4': "04 ' OR 1=1",
      'rail.c5': "05 UTN",
      'rail.c6': "06 Laburo",
      'rail.c7': "07 Ahora",
      'ch1.kicker': "Capítulo 01",
      'ch1.title': "Windows 98, a los cuatro más o menos",
      'ch1.body': "Tenía tres o cuatro años cuando llegó la primera compu a casa. Windows 98, un monitor CRT que zumbaba antes de prender y un gabinete beige que tardaba una eternidad en arrancar. No sabía cómo se llamaba nada. Me acuerdo de estar pegado a la pantalla, clickeando todo, sorprendido de que la máquina hiciera lo que le pedía. A veces no lo hacía. Eso me intrigaba todavía más, porque quería saber por qué.",
      'ch1.takeaway': "Sigo siendo ese pibe metiéndole mano a la máquina. Solo que ahora tengo mejores herramientas.",
      'ch1.bootLines': ["ARGGON BIOS v1.0 - CORDOBA, AR","MEMORY TEST ... 640K OK","DETECTING CURIOSITY ... FOUND","LOADING STORY.EXE"],
      'ch2.kicker': "Capítulo 02",
      'ch2.title': "Juegos crackeados y foros",
      'ch2.body': "Crecí jugando. En la PC, en el Family Game, en la Sega. Me encantaban los de estrategia, esos que perdés veinte veces hasta que les agarrás la mano. Los juegos eran caros, así que como muchos pibes salí a buscar cracks para Mu Online, World of Warcraft, Counter Strike y Age of Empires. La mitad no andaba. Entonces leía foros, archivos readme y posts larguísimos de gente que sabía mucho más que yo, tratando de entender por qué un parche andaba y el otro no. De la piratería no me enorgullezco. Del hábito que me dejó, sí: si algo se rompe, andá a ver por qué.",
      'ch2.takeaway': "Todavía debuggeo así.",
      'ch2.queries': ["por qué el juego verifica el disco","parche no-cd explicado","qué es un checksum","cómo funcionan las búsquedas en foros"],
      'ch2.f1': "¿por qué el juego verifica el disco?",
      'ch2.f2': "parche no-cd, explicado (largo)",
      'ch2.f3': "¿qué es un checksum? (principiante)",
      'ch2.replies1': "42 respuestas",
      'ch2.replies2': "18 respuestas",
      'ch2.replies3': "7 respuestas",
      'ch3.kicker': "Capítulo 03",
      'ch3.title': "Puertos, routers y muchas preguntas",
      'ch3.body': "Cuanto más fallaban los cracks, más quería saber cómo hablaban los juegos con sus servidores. ¿Por qué este necesita un puerto abierto? ¿Qué bloquea mi firewall? ¿Qué es un servidor, en serio? Empecé a leer sobre TCP, paquetes y protocolos, más que nada para entender palabras que veía en los foros. En algún momento las preguntas me importaron más que los juegos. Ya me podía imaginar mi PC, el router, el firewall y un servidor lejos, y cómo viajaba un mensaje entre ellos.",
      'ch3.takeaway': "Vine por los juegos y me quedé por las cañerías.",
      'ch3.n1': "MI PC",
      'ch3.n2': "ROUTER",
      'ch3.n3': "FIREWALL",
      'ch3.n4': "SERVIDOR",
      'ch4.kicker': "Capítulo 04",
      'ch4.title': "Dieciséis años y un login raro",
      'ch4.body': "A los dieciséis pasaba horas en sitios de servidores privados de Mu Online y Lineage. En un foro encontré <code>’ OR 1=1 --</code>. Lo copié, lo pegué en el login y entré. Después empecé a modificarlo yo, y al rato me estaba dando los ítems que quería en el juego. De eso no me enorgullezco. Pero no paré hasta entender por qué andaba: el sitio metía lo que escribías directo en la consulta SQL, y 1=1 siempre da verdadero. Eso me quedó grabado. Hoy valido cada input.",
      'ch4.takeaway': "Programo pensando que del otro lado puede haber un pibe de dieciséis como yo.",
      'ch4.termTitle': "mu-fan.hopto.org · login · circa 2005 (simulado)",
      'ch4.check': "> verificando ... filas devueltas: todas",
      'ch4.lesson': "en ese momento parecía magia. hoy sé que es input sin sanitizar.",
      'ch5.kicker': "Capítulo 05",
      'ch5.title': "UTN",
      'ch5.body': "Después de años aprendiendo todo desordenado, quería las bases bien hechas. Arranqué Ingeniería en Software y por fin estudié estructuras de datos y algoritmos en vez de adivinar. Un montón de trucos que venía usando hacía años de repente tenían nombre. Después necesitaba empezar a trabajar antes, así que me pasé a Técnico Programador Universitario en la UTN FRT y me recibí en 2021. Una carrera más corta, las mismas bases y la puerta a mi primer laburo.",
      'ch5.takeaway': "Estudiar le puso nombre a cosas que hacía de oído.",
      'ch5.s1': "aprendiendo solo",
      'ch5.s1s': "foros, parches, puertos",
      'ch5.s2': "ingeniería en software",
      'ch5.s2s': "estructuras de datos, algoritmos",
      'ch5.s3': "técnico programador universitario",
      'ch5.s3s': "UTN FRT",
      'ch5.diploma': "recibido en 2021",
      'ch6.kicker': "Capítulo 06",
      'ch6.title': "Laburo, 2021 a 2026",
      'ch6.body': "Mi primer trabajo fue en e.tres en 2021, arreglando integraciones con pasarelas de pago. En 2022 entré a GlobalLogic y estuve tres años en la cuenta de Lytx. Lo que más orgullo me da de esa etapa es un endpoint de datos masivos que bajó 80% el tiempo de proceso de los clientes. En 2025 pasé a senior en la cuenta de Coalfire. Movimos endpoints críticos a un microservicio .NET 9 que anduvo 30% más rápido bajo carga, y con Angular v19 las páginas cargaron 22% más rápido. A principios de 2026 hice una consultoría para GreenDot con CQRS y Mediator en un microservicio de pagos. De mayo a agosto armé un framework spec-driven para programar con agentes de IA.",
      'ch6.takeaway': "En cada paso me hice cargo de un pedazo más grande del sistema.",
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
      'ch7.title': "Hoy",
      'ch7.body': "Mi último trabajo me dejó algo que repito siempre: los agentes de IA trabajan mucho mejor si tienen una spec y tests antes de escribir código. Así que armé ArggonManager alrededor de esa idea. Las tareas viven como archivos Markdown en el repo, y los agentes las toman, las programan y se revisan entre ellos por git, igual que las personas. Las decisiones que no tienen vuelta atrás, como aceptar una feature o sacar un release, me las quedo yo. Lo pruebo en proyectos chicos, y este sitio es uno. Los fines de semana aprendo Rust. Viniendo de C#, el compilador me tiene cortito, y me gusta.",
      'ch7.takeaway': "Si querés ver cómo trabajo, el código está en GitHub.",
      'ch7.location': "Córdoba, Argentina",
      'ch7.stackKicker': "con qué trabajo",
      'footer.pre': "¿Preferís un CV normal? ",
      'footer.pdf': "Acá está el PDF",
      'footer.built': ". Hice este sitio con HTML, CSS y JavaScript, sin framework, y lo gestiono con ",
      'hero.status': "Disponible · remoto · Córdoba, AR (UTC-3)",
      'hero.role': "Desarrollador backend · C# y .NET · agentes de IA · aprendiendo Rust",
      'hero.m1': "menos tiempo de proceso para los clientes, con un endpoint de datos masivos que hice en Lytx",
      'hero.m2': "más rápido bajo carga cuando pasamos endpoints críticos a un microservicio .NET 9",
      'hero.m3': "más rápido cargan las páginas desde que actualizamos a Angular v19",
      'cta.email': "Escribime",
      'cta.hire': "Laburemos juntos",
      'cta.pdf': "Bajá mi CV (PDF)",
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
      'contact.body': "Busco un rol senior remoto en backend, .NET o ingeniería con IA, y también tomo proyectos freelance. Me gusta entender bien las reglas del negocio y mirar los números después de cada release. Si eso le sirve a tu equipo, mandame un mail.",
      'meta.title': "Gonzalo Argañaraz | desarrollador backend (.NET, agentes de IA)",
      'meta.description': "Mi CV contado como historia: de una PC con Windows 98 y una inyección SQL a los 16 a backend .NET y flujos con agentes de IA. Disponible para roles remotos.",
      'meta.locale': "es_AR",
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
