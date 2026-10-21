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
      'header.subtitle': "Senior .NET Backend Engineer · Agentic SDLC workflows. I ship code with AI agents, spec first.",
      'header.hint': "Got a minute? Scroll for the story.",
      'rail.c1': "01 Windows 98",
      'rail.c2': "02 Cracks",
      'rail.c3': "03 ' OR 1=1",
      'rail.c4': "04 UTN",
      'rail.c5': "05 Lytx",
      'rail.c6': "06 Coalfire",
      'rail.c7': "07 Agents",
      'ch1.kicker': "Chapter 01",
      'ch1.title': "Windows 98, age four",
      'ch1.body': "I was three or four when a Windows 98 PC showed up at home. A buzzing CRT, a beige tower, a slow boot. I clicked everything, and when it didn't obey, I wanted to know why.",
      'ch1.takeaway': "I'm still poking at machines. Better tools now.",
      'ch1.bootLines': ["ARGGON BIOS v1.0 - CORDOBA, AR","MEMORY TEST ... 640K OK","DETECTING CURIOSITY ... FOUND","LOADING STORY.EXE"],
      'ch2.kicker': "Chapter 02",
      'ch2.title': "Cracks, forums and ports",
      'ch2.body': "Games were expensive in Argentina, so I hunted cracks for Mu Online, WoW, Counter Strike and Age of Empires. Half failed. The forums explained why, and then I had better questions: why does this game need an open port? What is my firewall blocking?",
      'ch2.takeaway': "I came for the games and stayed for the plumbing.",
      'ch2.queries': ["why does the game check the disc","no-cd patch explained","what is a checksum","how do forum searches work"],
      'ch2.f1': "why does the game check the disc?",
      'ch2.f2': "no-cd patch, explained (long)",
      'ch2.f3': "what is a checksum? (beginner)",
      'ch2.replies1': "42 replies",
      'ch2.replies2': "18 replies",
      'ch2.replies3': "7 replies",
      'ch3.kicker': "Chapter 03",
      'ch3.title': "Sixteen, and ' OR 1=1",
      'ch3.body': "At sixteen I found <code>’ OR 1=1 --</code> on a forum and pasted it into a Mu Online private server login. It worked. I changed it myself to grab items I wanted, not my proudest moment, and kept digging until I understood the SQL behind it.",
      'ch3.takeaway': "Today I write the parameterized query that would have stopped me.",
      'ch3.termTitle': "mu-fan.hopto.org · login · circa 2010 (mock)",
      'ch3.check': "> checking ... rows returned: all of them",
      'ch3.lesson': "back then it felt like magic. now i know it's unsanitized input.",
      'ch4.kicker': "Chapter 04",
      'ch4.title': "UTN",
      'ch4.body': "After that, breaking things wasn't enough. I wanted to build them. I started Software Engineering, then switched to the shorter Técnico Programador Universitario at UTN FRT so I could start working sooner. I graduated in 2021.",
      'ch4.takeaway': "Tricks I'd been using for years finally had names.",
      'ch4.s1': "learning on my own",
      'ch4.s1s': "forums, patches, ports",
      'ch4.s2': "software engineering",
      'ch4.s2s': "data structures, algorithms",
      'ch4.s3': "técnico programador universitario",
      'ch4.s3s': "UTN FRT",
      'ch4.diploma': "graduated in 2021",
      'ch5.kicker': "Chapter 05",
      'ch5.title': "The 80% endpoint (Lytx)",
      'ch5.body': "At Lytx (video telematics, through GlobalLogic), clients pulled data one record per call. I designed a bulk endpoint: one batch request, handed to a new SQL Server stored procedure that processes the whole set inside the database. Client processing time dropped 80%.",
      'ch5.takeaway': "Most performance wins are about the shape of the API.",
      'ch5.y1': "2021–2022",
      'ch5.y2': "apr 2022–may 2025",
      'ch5.y3': "jul–dec 2025",
      'ch5.y5': "may 2026",
      'ch5.r1': "software developer",
      'ch5.rs1': "e.tres · e-commerce · payment gateway integrations",
      'ch5.r2': "software engineer II",
      'ch5.rs2': "GlobalLogic → Lytx · batch endpoint, 80% less client processing time",
      'ch5.r3': "senior software engineer",
      'ch5.rs3': "GlobalLogic → Coalfire · .NET 9 microservice 30% faster, AWS Marketplace access role",
      'ch5.r5': "senior AI software engineer",
      'ch5.rs5': "GlobalLogic → Coalfire · multi-agent SDLC pipeline + spec-driven TDD · owned agent design (team of 3)",
      'ch8.kicker': "Chapter 08",
      'ch8.title': "Now: ArggonManager",
      'ch8.body': "My last project at GlobalLogic wrapped in August 2026. Since then I've been building ArggonManager, my own methodology for AI agents. Specs and acceptance criteria live in the repo, agents claim, build, review and verify the work, and there's a done gate they can't skip. Built with it: dotnet-batchyard, C# microservices.",
      'ch8.takeaway': "The irreversible calls stay human.",
      'ch8.location': "Córdoba, Argentina",
      'ch8.stackKicker': "what I work with",
      'footer.pre': "Rather read a regular CV? ",
      'footer.pdf': "Here's the PDF",
      'footer.built': ". I built this site with plain HTML, CSS and JavaScript, no framework, and I track the work with ",
      'hero.status': "Open to work · remote, any location · full-time, employee or contractor",
      'hero.m1': "less client processing time, with a batch endpoint I built (Lytx)",
      'hero.m2': "faster under load after I migrated critical endpoints to a .NET 9 microservice (Coalfire)",
      'hero.m3': "agents and 1 human: the SDLC pipeline I designed (Coalfire)",
      'cta.email': "Hire me · Email",
      'cta.pdf': "Download CV",
      'contact.kicker': "Chapter 09 · your team?",
      'contact.title': "Need a senior .NET backend engineer who works with AI agents?",
      'contact.body': "I'm open to remote full-time roles, as an employee or contractor: senior backend and .NET, or teams bringing AI agents into a real delivery process. I bring ArggonManager, my methodology for AI coding agents (evidence-based reviews, a done gate, irreversible calls kept human), and dotnet-batchyard, my public .NET 10 showcase built with it. I'm on UTC-3 and can overlap with US working hours. Send me an email.",
      'hero.projects': "See my projects",
      'skim.roleK': "Role",
      'skim.roleV': "Senior .NET Backend Engineer · available now",
      'meta.title': "Gonzalo Argañaraz | backend developer (.NET, AI agents)",
      'meta.description': "Senior .NET backend engineer: a batch endpoint that cut client processing 80%, .NET 9 microservices, agentic SDLC workflows. Open to remote roles.",
      'meta.locale': "en_US",
      'hero.hook': "I cut client processing time by 80% with one endpoint.",
      'skim.expK': "Experience",
      'skim.expV': "5 years, since 2021",
      'skim.stackK': "Stack",
      'skim.stackV': "C#, .NET, SQL Server, AWS, Angular",
      'skim.focusK': "Focus",
      'skim.focusV': "ArggonManager, my AI agent methodology · learning Rust",
      'skim.whereK': "Where",
      'skim.whereV': "Córdoba, AR (UTC-3) · remote · English C1",
      'skim.domK': "Domains",
      'skim.domV': "Fleet telematics, cybersecurity, fintech payments, e-commerce",
      'rail.c8': "08 Now",
      'ch5.b1': "1 batch request",
      'ch5.b2': "stored procedure",
      'ch6.kicker': "Chapter 06",
      'ch6.title': "From breaking logins to selling access (Coalfire)",
      'ch6.body': "Coalfire is a cybersecurity company. I designed the access role, with its permissions and restrictions, that let them sell through AWS Marketplace, and moved critical endpoints from a monolith to a .NET 9 microservice that responds 30% faster under load. The kid from chapter 03 now builds the locks.",
      'ch6.takeaway': "I know how logins break, so I build them carefully.",
      'ch6.s1': "legacy monolith",
      'ch6.s2': ".NET 9 microservice",
      'ch6.s2s': "30% faster under load",
      'ch6.s3': "new access role",
      'ch6.s3s': "permissions + restrictions",
      'ch6.s4': "AWS Marketplace",
      'ch7.kicker': "Chapter 07",
      'ch7.title': "A team of agents, one human",
      'ch7.body': "At Coalfire, in May 2026, I designed a five-agent pipeline. Transcript agent: meeting to specs. Backlog agent: specs to tasks. Developer agent: opens the PR. QA agent: tests it with Playwright. Tech-lead agent: reviews it. Any failed check sends the work back.",
      'ch7.takeaway': "Agents do the work. I keep the calls you can't undo.",
      'ch7.a1': "transcript",
      'ch7.a2': "backlog",
      'ch7.a3': "developer",
      'ch7.a4': "QA · Playwright",
      'ch7.a5': "tech lead",
      'ch7.back': "↺ a failed check sends it back",
      'ch7.team': "A one-month project on a team of three. Our project manager presented the proposal to the client, a co-worker tested the agents against the method, and I owned the agent design and the methodology. I drafted the method with Claude Sonnet and ran the proofs of concept in GitHub Copilot (GPT-4o).",
      'ch7.methodPre': "That method was my first step, and I open-sourced it as",
      'ch7.methodPost': ". Today I use a much fuller version of the idea: ArggonManager, in chapter 08.",
      'ch8.p1tag': "my methodology for AI agents · TypeScript",
      'ch8.p1': "A work methodology for AI agents that lives in git. Four agent roles: delivery lead, standards reviewer, maker and verifier. Work is sized by risk, from a plain task up to spec, exploration and ADR. Reviews leave evidence on the item, and nothing closes with an unticked acceptance criterion. Waivers, claim takeovers, reopening and releases are human-only, and the tool enforces it. Runs on OpenCode, ZCode and Claude Code. 27 ADRs. This site is tracked with it.",
      'ch8.labsNote': "The labs below were built by my agents, under my specs and review.",
      'ch8.p2tag': "lab · Rust",
      'ch8.p2': "A habit streak CLI, my first real Rust project. If there's no D-Bus for notifications it exits with code 2, so the systemd timer fails loudly instead of quietly.",
      'ch8.p3tag': "lab · Python",
      'ch8.p3': "A backup tool. It checks every copy with SHA-256 and keeps snapshots that never get modified.",
      'ch8.p4tag': "lab · TypeScript",
      'ch8.p4': "Splits shared expenses between friends and settles them with as few transfers as possible.",
      'ch8.p5tag': "labs · Go",
      'ch8.p5': "Two small Go tools: one tracks the books I read, the other runs Swiss-system tournaments (still early).",
      'ch8.p1cta': "See the methodology on GitHub",
      'ch8.p6tag': "showcase · C# · .NET 10",
      'ch8.p6': "An open-source .NET 10 backend showcase: batch ingest, JWT plans and roles, CQRS payments with an outbox and RabbitMQ, and a strangler migration from a monolith to a service behind YARP, traced with OpenTelemetry. In k6 tests on a cloud VM at 500 items per request, median latency fell 93% (about 300 ms to 20 ms) and throughput rose from about 7.7k to 95k items/s.",
      'ch8.p6stack': "C# · .NET 10 · SQL Server · Redis · RabbitMQ · YARP · OpenTelemetry · k6 · Docker",
      'ch8.p6cta': "See the repo on GitHub",
    },
    es: {
      'ui.skip': "Saltar a la historia",
      'ui.langAria': "Idioma",
      'header.kicker': "Hola, soy",
      'header.name': "Gonzalo Argañaraz",
      'header.subtitle': "Senior .NET Backend Engineer · flujos de SDLC con agentes. Programo con agentes de IA, spec primero.",
      'header.hint': "¿Tenés un minuto? Bajá y te cuento la historia.",
      'rail.c1': "01 Windows 98",
      'rail.c2': "02 Cracks",
      'rail.c3': "03 ' OR 1=1",
      'rail.c4': "04 UTN",
      'rail.c5': "05 Lytx",
      'rail.c6': "06 Coalfire",
      'rail.c7': "07 Agentes",
      'ch1.kicker': "Capítulo 01",
      'ch1.title': "Windows 98, a los cuatro",
      'ch1.body': "Tenía tres o cuatro años cuando llegó una PC con Windows 98 a casa. Un CRT que zumbaba, un gabinete beige, un arranque eterno. Clickeaba todo, y cuando no me hacía caso, quería saber por qué.",
      'ch1.takeaway': "Sigo metiéndole mano a las máquinas. Ahora con mejores herramientas.",
      'ch1.bootLines': ["ARGGON BIOS v1.0 - CORDOBA, AR","MEMORY TEST ... 640K OK","DETECTING CURIOSITY ... FOUND","LOADING STORY.EXE"],
      'ch2.kicker': "Capítulo 02",
      'ch2.title': "Cracks, foros y puertos",
      'ch2.body': "Los juegos eran caros, así que salía a buscar cracks para Mu Online, WoW, Counter Strike y Age of Empires. La mitad no andaba. Los foros me explicaban por qué, y me dejaban mejores preguntas: ¿por qué este juego necesita un puerto abierto? ¿Qué bloquea mi firewall?",
      'ch2.takeaway': "Vine por los juegos y me quedé por las cañerías.",
      'ch2.queries': ["por qué el juego verifica el disco","parche no-cd explicado","qué es un checksum","cómo funcionan las búsquedas en foros"],
      'ch2.f1': "¿por qué el juego verifica el disco?",
      'ch2.f2': "parche no-cd, explicado (largo)",
      'ch2.f3': "¿qué es un checksum? (principiante)",
      'ch2.replies1': "42 respuestas",
      'ch2.replies2': "18 respuestas",
      'ch2.replies3': "7 respuestas",
      'ch3.kicker': "Capítulo 03",
      'ch3.title': "Dieciséis años y ' OR 1=1",
      'ch3.body': "A los dieciséis encontré <code>’ OR 1=1 --</code> en un foro y lo pegué en el login de un servidor privado de Mu Online. Funcionó. Lo modifiqué yo para sacar ítems que quería, no es algo de lo que me enorgullezca, y seguí hasta entender el SQL que había atrás.",
      'ch3.takeaway': "Hoy escribo la consulta parametrizada que me hubiera frenado.",
      'ch3.termTitle': "mu-fan.hopto.org · login · circa 2010 (simulado)",
      'ch3.check': "> verificando ... filas devueltas: todas",
      'ch3.lesson': "en ese momento parecía magia. hoy sé que es input sin sanitizar.",
      'ch4.kicker': "Capítulo 04",
      'ch4.title': "UTN",
      'ch4.body': "Después de eso, romper cosas ya no me alcanzaba. Quería construirlas. Arranqué Ingeniería en Software y después me pasé a Técnico Programador Universitario en la UTN FRT, que era más corta, para empezar a laburar antes. Me recibí en 2021.",
      'ch4.takeaway': "Trucos que venía usando hacía años por fin tenían nombre.",
      'ch4.s1': "aprendiendo solo",
      'ch4.s1s': "foros, parches, puertos",
      'ch4.s2': "ingeniería en software",
      'ch4.s2s': "estructuras de datos, algoritmos",
      'ch4.s3': "técnico programador universitario",
      'ch4.s3s': "UTN FRT",
      'ch4.diploma': "recibido en 2021",
      'ch5.kicker': "Capítulo 05",
      'ch5.title': "El endpoint del 80% (Lytx)",
      'ch5.body': "En Lytx (telemática de video, vía GlobalLogic), los clientes pedían los datos de a un registro por llamada. Diseñé un endpoint masivo: un request por lote que pasa a un stored procedure nuevo en SQL Server y procesa todo dentro de la base. El tiempo de proceso bajó 80%.",
      'ch5.takeaway': "Casi siempre, la performance pasa por la forma de la API.",
      'ch5.y1': "2021–2022",
      'ch5.y2': "abr 2022–may 2025",
      'ch5.y3': "jul–dic 2025",
      'ch5.y5': "may 2026",
      'ch5.r1': "desarrollador de software",
      'ch5.rs1': "e.tres · e-commerce · integraciones con pasarelas de pago",
      'ch5.r2': "ingeniero de software II",
      'ch5.rs2': "GlobalLogic → Lytx · endpoint por lotes, 80% menos tiempo de proceso",
      'ch5.r3': "ingeniero de software senior",
      'ch5.rs3': "GlobalLogic → Coalfire · microservicio .NET 9 30% más rápido, rol de acceso para AWS Marketplace",
      'ch5.r5': "ingeniero senior de IA",
      'ch5.rs5': "GlobalLogic → Coalfire · pipeline de SDLC multiagente + TDD spec-driven · diseño de agentes a mi cargo (equipo de 3)",
      'ch8.kicker': "Capítulo 08",
      'ch8.title': "Ahora: ArggonManager",
      'ch8.body': "Mi último proyecto en GlobalLogic terminó en agosto de 2026. Desde entonces construyo ArggonManager, mi metodología para agentes de IA. Las specs y los criterios viven en el repo, los agentes toman, construyen, revisan y verifican el trabajo, y hay un done gate que no se saltean. Hecho con ella: dotnet-batchyard, microservicios en C#.",
      'ch8.takeaway': "Lo irreversible sigue siendo humano.",
      'ch8.location': "Córdoba, Argentina",
      'ch8.stackKicker': "con qué trabajo",
      'footer.pre': "¿Preferís un CV normal? ",
      'footer.pdf': "Acá está el PDF",
      'footer.built': ". Hice este sitio con HTML, CSS y JavaScript, sin framework, y lo gestiono con ",
      'hero.status': "Disponible · remoto, desde cualquier lugar · full-time, en relación de dependencia o como contractor",
      'hero.m1': "menos tiempo de proceso para los clientes, con un endpoint por lotes que hice (Lytx)",
      'hero.m2': "más rápido bajo carga cuando migré endpoints críticos a un microservicio .NET 9 (Coalfire)",
      'hero.m3': "agentes y 1 humano: el pipeline de SDLC que diseñé (Coalfire)",
      'cta.email': "Contratame · Email",
      'cta.pdf': "Bajar CV",
      'contact.kicker': "Capítulo 09 · ¿tu equipo?",
      'contact.title': "¿Buscás un backend engineer senior en .NET que trabaje con agentes de IA?",
      'contact.body': "Busco roles remotos full-time, en relación de dependencia o como contractor: backend senior y .NET, o equipos que quieran sumar agentes de IA a un delivery real. Traigo ArggonManager, mi metodología para agentes de IA que programan (revisiones con evidencia, un done gate y las decisiones irreversibles en manos humanas), y dotnet-batchyard, mi showcase público en .NET 10 hecho con ella. Estoy en UTC-3 y puedo coincidir con el horario laboral de Estados Unidos. Mandame un mail.",
      'hero.projects': "Ver mis proyectos",
      'skim.roleK': "Rol",
      'skim.roleV': "Ingeniero Backend .NET Senior · disponible ya",
      'meta.title': "Gonzalo Argañaraz | desarrollador backend (.NET, agentes de IA)",
      'meta.description': "Senior .NET backend engineer: un endpoint por lotes que bajó 80% el proceso de los clientes, microservicios .NET 9 y flujos de SDLC con agentes. Disponible para roles remotos.",
      'meta.locale': "es_AR",
      'hero.hook': "Bajé 80% el tiempo de proceso de los clientes con un solo endpoint.",
      'skim.expK': "Experiencia",
      'skim.expV': "5 años, desde 2021",
      'skim.stackK': "Stack",
      'skim.stackV': "C#, .NET, SQL Server, AWS, Angular",
      'skim.focusK': "Foco",
      'skim.focusV': "ArggonManager, mi metodología para agentes de IA · aprendiendo Rust",
      'skim.whereK': "Dónde",
      'skim.whereV': "Córdoba, AR (UTC-3) · remoto · inglés C1",
      'skim.domK': "Rubros",
      'skim.domV': "telemática de flotas, ciberseguridad, pagos fintech, e-commerce",
      'rail.c8': "08 Ahora",
      'ch5.b1': "1 request por lote",
      'ch5.b2': "stored procedure",
      'ch6.kicker': "Capítulo 06",
      'ch6.title': "De romper logins a vender accesos (Coalfire)",
      'ch6.body': "Coalfire es una empresa de ciberseguridad. Diseñé el rol de acceso, con permisos y restricciones, para vender por AWS Marketplace, y migré endpoints críticos de un monolito a un microservicio .NET 9 que responde 30% más rápido bajo carga. El pibe del capítulo 03 ahora hace las cerraduras.",
      'ch6.takeaway': "Sé cómo se rompe un login, por eso los hago con cuidado.",
      'ch6.s1': "monolito legacy",
      'ch6.s2': "microservicio .NET 9",
      'ch6.s2s': "30% más rápido bajo carga",
      'ch6.s3': "rol de acceso nuevo",
      'ch6.s3s': "permisos + restricciones",
      'ch6.s4': "AWS Marketplace",
      'ch7.kicker': "Capítulo 07",
      'ch7.title': "Un equipo de agentes, un humano",
      'ch7.body': "En Coalfire, en mayo de 2026, diseñé un pipeline de cinco agentes. Transcripción: de la reunión a specs. Backlog: de specs a tareas. Developer: abre el PR. QA: lo prueba con Playwright. Tech lead: lo revisa. Si falla un chequeo, el trabajo vuelve para atrás.",
      'ch7.takeaway': "Los agentes hacen el trabajo. Las decisiones sin vuelta atrás son mías.",
      'ch7.a1': "transcripción",
      'ch7.a2': "backlog",
      'ch7.a3': "developer",
      'ch7.a4': "QA · Playwright",
      'ch7.a5': "tech lead",
      'ch7.back': "↺ si falla un chequeo, vuelve",
      'ch7.team': "Un proyecto de un mes, en un equipo de tres. Nuestro project manager le presentó la propuesta al cliente, un compañero probó los agentes contra el método, y yo me encargué del diseño de los agentes y de la metodología. Armé el método con Claude Sonnet e hice las pruebas de concepto en GitHub Copilot (GPT-4o).",
      'ch7.methodPre': "Ese método fue mi primer paso, y lo publiqué como open source:",
      'ch7.methodPost': ". Hoy uso una versión mucho más completa de la idea: ArggonManager, en el capítulo 08.",
      'ch8.p1tag': "mi metodología para agentes de IA · TypeScript",
      'ch8.p1': "Una metodología de trabajo para agentes de IA que vive en git. Cuatro roles de agente: delivery lead, revisor de estándares, maker y verifier. El trabajo se dimensiona por riesgo, desde una tarea simple hasta spec, exploración y ADR. Las revisiones dejan evidencia en el ítem, y nada se cierra con un criterio de aceptación sin tildar. Los waivers, tomar un claim ajeno, reabrir y los releases son solo para humanos, y la herramienta lo hace cumplir. Corre en OpenCode, ZCode y Claude Code. 27 ADRs. Este sitio se gestiona con ella.",
      'ch8.labsNote': "Los labs de abajo los construyeron mis agentes, con mis specs y mi revisión.",
      'ch8.p2tag': "lab · Rust",
      'ch8.p2': "Un CLI para rachas de hábitos, mi primer proyecto en serio con Rust. Si no hay D-Bus para las notificaciones sale con código 2, así el timer de systemd falla a los gritos y no en silencio.",
      'ch8.p3tag': "lab · Python",
      'ch8.p3': "Una herramienta de backups. Verifica cada copia con SHA-256 y guarda snapshots que nunca se tocan.",
      'ch8.p4tag': "lab · TypeScript",
      'ch8.p4': "Divide los gastos entre amigos y los salda con la menor cantidad de transferencias posible.",
      'ch8.p5tag': "labs · Go",
      'ch8.p5': "Dos herramientas chicas en Go: una para anotar los libros que leo y otra para torneos con sistema suizo (todavía en pañales).",
      'ch8.p1cta': "Ver la metodología en GitHub",
      'ch8.p6tag': "showcase · C# · .NET 10",
      'ch8.p6': "Un showcase backend open source en .NET 10: ingesta por lotes, planes y roles con JWT, pagos con CQRS, outbox y RabbitMQ, y una migración strangler de un monolito a un servicio detrás de YARP, con trazas en OpenTelemetry. En pruebas con k6 en una VM en la nube, con 500 ítems por request, la latencia mediana bajó 93% (de unos 300 ms a 20 ms) y el throughput subió de unos 7,7k a 95k ítems/s.",
      'ch8.p6stack': "C# · .NET 10 · SQL Server · Redis · RabbitMQ · YARP · OpenTelemetry · k6 · Docker",
      'ch8.p6cta': "Ver el repo en GitHub",
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
