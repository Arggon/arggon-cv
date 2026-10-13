# The story, in eight chapters

Source of truth for the site copy (spec cv-001), in line with the CV in assets/Gonzalo-Arganaraz-CV.pdf. First person, in Gonzalo's own voice. Each chapter is 40 to 60 words including the takeaway, so a recruiter can skim it in seconds. The site strings live in js/i18n.js; keep both in sync.

---

## Chapter 1: Windows 98, age four

**Hook.** I was three or four when a Windows 98 PC showed up at home.

A buzzing CRT, a beige tower, a slow boot. I clicked everything, and when it didn't obey, I wanted to know why.

**Takeaway.** I'm still poking at machines. Better tools now.

---

## Chapter 2: Cracks, forums and ports

**Hook.** Games were expensive in Argentina, so I hunted cracks for Mu Online, WoW, Counter Strike and Age of Empires.

Half failed. The forums explained why, and then I had better questions: why does this game need an open port? What is my firewall blocking?

**Takeaway.** I came for the games and stayed for the plumbing.

---

## Chapter 3: Sixteen, and ' OR 1=1

**Hook.** At sixteen I found ' OR 1=1 -- on a forum and pasted it into a Mu Online private server login.

It worked. I changed it myself to grab items I wanted, not my proudest moment, and kept digging until I understood the SQL behind it.

**Takeaway.** Today I write the parameterized query that would have stopped me.

---

## Chapter 4: UTN

**Hook.** After that, breaking things wasn't enough.

I wanted to build them. I started Software Engineering, then switched to the shorter Técnico Programador Universitario at UTN FRT so I could start working sooner. I graduated in 2021.

**Takeaway.** Tricks I'd been using for years finally had names.

---

## Chapter 5: The 80% endpoint (Lytx)

**Hook.** At Lytx (video telematics, through GlobalLogic), clients pulled data one record per call.

I designed a bulk endpoint: one batch request, handed to a new SQL Server stored procedure that processes the whole set inside the database. Client processing time dropped 80%.

**Takeaway.** Most performance wins are about the shape of the API.

---

## Chapter 6: From breaking logins to selling access (Coalfire)

**Hook.** Coalfire is a cybersecurity company.

I designed the access role, with its permissions and restrictions, that let them sell through AWS Marketplace, and moved critical endpoints from a monolith to a .NET 9 microservice that responds 30% faster under load. The kid from chapter 03 now builds the locks.

**Takeaway.** I know how logins break, so I build them carefully.

---

## Chapter 7: A team of agents, one human

**Hook.** At Coalfire, in May 2026, I designed a five-agent pipeline.

Transcript agent: meeting to specs. Backlog agent: specs to tasks. Developer agent: opens the PR. QA agent: tests it with Playwright. Tech-lead agent: reviews it. Any failed check sends the work back.

**Takeaway.** Agents do the work. I keep the calls you can't undo.

---

## Chapter 8: Now: ArggonManager

**Hook.** My last project at GlobalLogic wrapped in August 2026.

Since then I've been building ArggonManager, my own methodology for AI agents. Specs and acceptance criteria live in the repo, agents claim, build, review and verify the work, and there's a done gate they can't skip. Next: a C# microservices repo built with it.

**Takeaway.** The irreversible calls stay human.

ArggonManager card: A work methodology for AI agents that lives in git. Four agent roles: delivery lead, standards reviewer, maker and verifier. Work is sized by risk, from a plain task up to spec, exploration and ADR. Reviews leave evidence on the item, and nothing closes with an unticked acceptance criterion. Waivers, claim takeovers, reopening and releases are human-only, and the tool enforces it. Runs on OpenCode, ZCode and Claude Code. 27 ADRs. This site is tracked with it.

---

# La historia, en español

Escrita en castellano rioplatense (vos), no traducida palabra por palabra.

---

## Capítulo 1: Windows 98, a los cuatro

**Gancho.** Tenía tres o cuatro años cuando llegó una PC con Windows 98 a casa.

Un CRT que zumbaba, un gabinete beige, un arranque eterno. Clickeaba todo, y cuando no me hacía caso, quería saber por qué.

**Cierre.** Sigo metiéndole mano a las máquinas. Ahora con mejores herramientas.

---

## Capítulo 2: Cracks, foros y puertos

**Gancho.** Los juegos eran caros, así que salía a buscar cracks para Mu Online, WoW, Counter Strike y Age of Empires.

La mitad no andaba. Los foros me explicaban por qué, y me dejaban mejores preguntas: ¿por qué este juego necesita un puerto abierto? ¿Qué bloquea mi firewall?

**Cierre.** Vine por los juegos y me quedé por las cañerías.

---

## Capítulo 3: Dieciséis años y ' OR 1=1

**Gancho.** A los dieciséis encontré ' OR 1=1 -- en un foro y lo pegué en el login de un servidor privado de Mu Online.

Funcionó. Lo modifiqué yo para sacar ítems que quería, no es algo de lo que me enorgullezca, y seguí hasta entender el SQL que había atrás.

**Cierre.** Hoy escribo la consulta parametrizada que me hubiera frenado.

---

## Capítulo 4: UTN

**Gancho.** Después de eso, romper cosas ya no me alcanzaba.

Quería construirlas. Arranqué Ingeniería en Software y después me pasé a Técnico Programador Universitario en la UTN FRT, que era más corta, para empezar a laburar antes. Me recibí en 2021.

**Cierre.** Trucos que venía usando hacía años por fin tenían nombre.

---

## Capítulo 5: El endpoint del 80% (Lytx)

**Gancho.** En Lytx (telemática de video, vía GlobalLogic), los clientes pedían los datos de a un registro por llamada.

Diseñé un endpoint masivo: un request por lote que pasa a un stored procedure nuevo en SQL Server y procesa todo dentro de la base. El tiempo de proceso bajó 80%.

**Cierre.** Casi siempre, la performance pasa por la forma de la API.

---

## Capítulo 6: De romper logins a vender accesos (Coalfire)

**Gancho.** Coalfire es una empresa de ciberseguridad.

Diseñé el rol de acceso, con permisos y restricciones, para vender por AWS Marketplace, y migré endpoints críticos de un monolito a un microservicio .NET 9 que responde 30% más rápido bajo carga. El pibe del capítulo 03 ahora hace las cerraduras.

**Cierre.** Sé cómo se rompe un login, por eso los hago con cuidado.

---

## Capítulo 7: Un equipo de agentes, un humano

**Gancho.** En Coalfire, en mayo de 2026, diseñé un pipeline de cinco agentes.

Transcripción: de la reunión a specs. Backlog: de specs a tareas. Developer: abre el PR. QA: lo prueba con Playwright. Tech lead: lo revisa. Si falla un chequeo, el trabajo vuelve para atrás.

**Cierre.** Los agentes hacen el trabajo. Las decisiones sin vuelta atrás son mías.

---

## Capítulo 8: Ahora: ArggonManager

**Gancho.** Mi último proyecto en GlobalLogic terminó en agosto de 2026.

Desde entonces construyo ArggonManager, mi metodología para agentes de IA. Las specs y los criterios viven en el repo, los agentes toman, construyen, revisan y verifican el trabajo, y hay un done gate que no se saltean. Lo próximo: microservicios en C#.

**Cierre.** Lo irreversible sigue siendo humano.

Tarjeta de ArggonManager: Una metodología de trabajo para agentes de IA que vive en git. Cuatro roles de agente: delivery lead, revisor de estándares, maker y verifier. El trabajo se dimensiona por riesgo, desde una tarea simple hasta spec, exploración y ADR. Las revisiones dejan evidencia en el ítem, y nada se cierra con un criterio de aceptación sin tildar. Los waivers, tomar un claim ajeno, reabrir y los releases son solo para humanos, y la herramienta lo hace cumplir. Corre en OpenCode, ZCode y Claude Code. 27 ADRs. Este sitio se gestiona con ella.

---

## Contact / Contacto (chapter 09)

Looking for a backend developer? Remote senior role in backend, .NET or AI engineering, or a freelance project. If that fits your team, send me an email.

¿Buscás un dev backend? Busco un rol senior remoto en backend, .NET o IA, o un proyecto freelance. Si encaja con tu equipo, mandame un mail.
