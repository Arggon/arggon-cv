# The story, in seven chapters

Source of truth for the site copy (spec cv-001). First person, written in Gonzalo's own voice. Each chapter stays at or under 120 words including the takeaway. The site strings live in js/i18n.js; keep both in sync.

---

## Chapter 1: Windows 98, age four or so

**Hook.** I was three or four when we got our first computer at home.

Windows 98, a CRT monitor that buzzed before the picture showed up, and a beige tower that took forever to boot. I had no idea what anything was called. I remember sitting way too close to the screen, clicking on everything, amazed that the thing actually did what I asked. Sometimes it didn't. That was even more interesting, because I wanted to know why.

**Takeaway.** I'm still that kid poking at the machine. The tools just got better.

---

## Chapter 2: Cracked games and forum threads

**Hook.** I grew up on games.

The PC, a Family Game, a Sega. I loved strategy games, the ones you lose twenty times before they click. Games were expensive in Argentina, so like a lot of kids I went looking for cracks for Mu Online, World of Warcraft, Counter Strike and Age of Empires. Half of them didn't work. So I read forum threads, readme files and very long posts from people who knew way more than me, trying to figure out why one patch worked and the next one didn't. I'm not proud of the piracy. I am grateful for the habit: when something breaks, go find out why.

**Takeaway.** That's still how I debug.

---

## Chapter 3: Ports, routers and a lot of questions

**Hook.** The more cracks failed, the more I wanted to know how games talked to their servers.

Why did this one need a port open? What was my firewall blocking? What even is a server? I started reading about TCP, packets and protocols, mostly to understand words I kept seeing on forums. At some point the questions got more interesting than the games. I could picture my PC, the router, the firewall and some server far away, and how a message traveled between them.

**Takeaway.** I came for the games and stayed for the plumbing.

---

## Chapter 4: Sixteen, and one weird login

**Hook.** At sixteen I spent hours on Mu Online and Lineage private server sites.

On one of them I found ’ OR 1=1 -- in a forum post. I copied it, pasted it into the login box, and I was in. Then I started changing it myself, and soon I was getting the in-game items I wanted. I'm not proud of that part. But I didn't stop until I understood why it worked: the site pasted whatever you typed straight into its SQL query, and 1=1 is always true. That stuck with me. Today I validate every input.

**Takeaway.** I write code assuming a sixteen-year-old me is on the other side.

---

## Chapter 5: UTN

**Hook.** After years of learning things out of order, I wanted the basics done properly.

I started Software Engineering and finally studied data structures and algorithms instead of guessing. A lot of tricks I'd been using for years suddenly had names. Then I needed to start working sooner, so I switched to the Técnico Programador Universitario at UTN FRT and finished it in 2021. A shorter degree, the same fundamentals, and the door to my first job.

**Takeaway.** Studying put names on things I'd been doing by ear.

---

## Chapter 6: Work, 2021 to 2026

**Hook.** My first job was at e.tres in 2021, fixing payment gateway integrations.

In 2022 I joined GlobalLogic and spent three years on the Lytx account. What I'm proudest of from that time is a bulk-data endpoint that cut our clients' processing time by 80%. In 2025 I went senior on the Coalfire account. We moved critical endpoints to a .NET 9 microservice and got 30% faster under load, and the Angular v19 upgrade made pages load 22% faster. In early 2026 I consulted for GreenDot on a payment microservice using CQRS and Mediator. From May to August I built a spec-driven framework for shipping code with AI agents.

**Takeaway.** Every step meant owning a bigger piece of the system.

---

## Chapter 7: Today

**Hook.** My last role taught me something I keep repeating: AI agents do much better work when they get a spec and tests before writing any code.

So I built ArggonManager around that idea. Tasks live as Markdown files in the repo, and agents pick them up, code them and review each other through git, the same way people do. I keep the decisions you can't undo, like accepting a feature or cutting a release. I try it on small side projects, and this site is one of them. On weekends I'm learning Rust. Coming from C#, the compiler is strict with me, and I like that.

**Takeaway.** If you want to see how I work, the code is on GitHub.

---

# La historia, en español

Escrita en castellano rioplatense (vos), no traducida palabra por palabra.

---

## Capítulo 1: Windows 98, a los cuatro más o menos

**Gancho.** Tenía tres o cuatro años cuando llegó la primera compu a casa.

Windows 98, un monitor CRT que zumbaba antes de prender y un gabinete beige que tardaba una eternidad en arrancar. No sabía cómo se llamaba nada. Me acuerdo de estar pegado a la pantalla, clickeando todo, sorprendido de que la máquina hiciera lo que le pedía. A veces no lo hacía. Eso me intrigaba todavía más, porque quería saber por qué.

**Cierre.** Sigo siendo ese pibe metiéndole mano a la máquina. Solo que ahora tengo mejores herramientas.

---

## Capítulo 2: Juegos crackeados y foros

**Gancho.** Crecí jugando.

En la PC, en el Family Game, en la Sega. Me encantaban los de estrategia, esos que perdés veinte veces hasta que les agarrás la mano. Los juegos eran caros, así que como muchos pibes salí a buscar cracks para Mu Online, World of Warcraft, Counter Strike y Age of Empires. La mitad no andaba. Entonces leía foros, archivos readme y posts larguísimos de gente que sabía mucho más que yo, tratando de entender por qué un parche andaba y el otro no. De la piratería no me enorgullezco. Del hábito que me dejó, sí: si algo se rompe, andá a ver por qué.

**Cierre.** Todavía debuggeo así.

---

## Capítulo 3: Puertos, routers y muchas preguntas

**Gancho.** Cuanto más fallaban los cracks, más quería saber cómo hablaban los juegos con sus servidores.

¿Por qué este necesita un puerto abierto? ¿Qué bloquea mi firewall? ¿Qué es un servidor, en serio? Empecé a leer sobre TCP, paquetes y protocolos, más que nada para entender palabras que veía en los foros. En algún momento las preguntas me importaron más que los juegos. Ya me podía imaginar mi PC, el router, el firewall y un servidor lejos, y cómo viajaba un mensaje entre ellos.

**Cierre.** Vine por los juegos y me quedé por las cañerías.

---

## Capítulo 4: Dieciséis años y un login raro

**Gancho.** A los dieciséis pasaba horas en sitios de servidores privados de Mu Online y Lineage.

En un foro encontré ’ OR 1=1 --. Lo copié, lo pegué en el login y entré. Después empecé a modificarlo yo, y al rato me estaba dando los ítems que quería en el juego. De eso no me enorgullezco. Pero no paré hasta entender por qué andaba: el sitio metía lo que escribías directo en la consulta SQL, y 1=1 siempre da verdadero. Eso me quedó grabado. Hoy valido cada input.

**Cierre.** Programo pensando que del otro lado puede haber un pibe de dieciséis como yo.

---

## Capítulo 5: UTN

**Gancho.** Después de años aprendiendo todo desordenado, quería las bases bien hechas.

Arranqué Ingeniería en Software y por fin estudié estructuras de datos y algoritmos en vez de adivinar. Un montón de trucos que venía usando hacía años de repente tenían nombre. Después necesitaba empezar a trabajar antes, así que me pasé a Técnico Programador Universitario en la UTN FRT y me recibí en 2021. Una carrera más corta, las mismas bases y la puerta a mi primer laburo.

**Cierre.** Estudiar le puso nombre a cosas que hacía de oído.

---

## Capítulo 6: Laburo, 2021 a 2026

**Gancho.** Mi primer trabajo fue en e.tres en 2021, arreglando integraciones con pasarelas de pago.

En 2022 entré a GlobalLogic y estuve tres años en la cuenta de Lytx. Lo que más orgullo me da de esa etapa es un endpoint de datos masivos que bajó 80% el tiempo de proceso de los clientes. En 2025 pasé a senior en la cuenta de Coalfire. Movimos endpoints críticos a un microservicio .NET 9 que anduvo 30% más rápido bajo carga, y con Angular v19 las páginas cargaron 22% más rápido. A principios de 2026 hice una consultoría para GreenDot con CQRS y Mediator en un microservicio de pagos. De mayo a agosto armé un framework spec-driven para programar con agentes de IA.

**Cierre.** En cada paso me hice cargo de un pedazo más grande del sistema.

---

## Capítulo 7: Hoy

**Gancho.** Mi último trabajo me dejó algo que repito siempre: los agentes de IA trabajan mucho mejor si tienen una spec y tests antes de escribir código.

Así que armé ArggonManager alrededor de esa idea. Las tareas viven como archivos Markdown en el repo, y los agentes las toman, las programan y se revisan entre ellos por git, igual que las personas. Las decisiones que no tienen vuelta atrás, como aceptar una feature o sacar un release, me las quedo yo. Lo pruebo en proyectos chicos, y este sitio es uno. Los fines de semana aprendo Rust. Viniendo de C#, el compilador me tiene cortito, y me gusta.

**Cierre.** Si querés ver cómo trabajo, el código está en GitHub.

---

## Contact / Contacto

Looking for a backend developer? I'm looking for a remote senior role in backend, .NET or AI engineering, and I'm open to freelance projects too. I like getting the business rules right and checking the numbers after a release. If that sounds useful for your team, send me an email.

¿Buscás un dev backend? Busco un rol senior remoto en backend, .NET o ingeniería con IA, y también tomo proyectos freelance. Me gusta entender bien las reglas del negocio y mirar los números después de cada release. Si eso le sirve a tu equipo, mandame un mail.
