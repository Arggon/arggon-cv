'use strict';

/* CV copy must follow the language (ES toggle regression).
 * `node tests/i18n-content.test.cjs`
 *
 * The hero, the story and the contact chapter are the CV. Every visible
 * text node in those sections needs an ES string, or it is an equivalent
 * that is the same in both languages (a name, a box title, a mock login,
 * a product token). A new English sentence with no data-i18n key fails.
 * A key whose ES copy is just the English sentence also fails, unless it
 * is listed as an equivalent.
 */

const assert = require('node:assert');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');

const root = join(__dirname, '..');
const html = readFileSync(join(root, 'index.html'), 'utf8');
const i18n = require(join(root, 'js', 'i18n.js'));

/* Same in EN and ES on purpose: proper names, the degree title, dates,
 * and the loanwords the Spanish prose already uses (stored procedure,
 * the agent role names, labs, showcase). */
const EQUIVALENT_KEYS = new Set([
  'header.name',
  'skim.stackK',
  'skim.stackV',
  'ch4.title',
  'ch4.s3',
  'ch4.s3s',
  'ch5.b2',
  'ch5.y5',
  'ch6.s4',
  'ch7.a2',
  'ch7.a3',
  'ch7.a4',
  'ch7.a5',
  'ch8.location',
  'ch8.p2tag',
  'ch8.p3tag',
  'ch8.p4tag',
  'ch8.p5tag',
  'ch8.p6tag',
  'ch8.p6stack',
]);

/* Visible text with no data-i18n ancestor. Not sentences. */
const EQUIVALENT_TEXT = new Set([
  'LinkedIn',
  'GitHub',
  'X @arggondev',
  'MU',
  'ONLINE',
  'WORLD OF',
  'WARCRAFT',
  'COUNTER',
  'STRIKE',
  'AGE OF',
  'EMPIRES',
  'FAMILY',
  'GAME',
  'SEGA',
  'login>',
  '[1] user_01 ********',
  '[2] user_02 ********',
  '[3] gm_darkelfo ********',
  '[4] user_04 ********',
  'UTN',
  'FRT',
  'openspec-tdd-schema',
  'ArggonManager',
  'dotnet-batchyard',
  'racha',
  'guardian',
  'cuentas-claras',
  'estanteria',
  'suizo',
  'arggondev@gmail.com',
  'linkedin.com/in/arggon',
  'github.com/Arggon',
  '.NET Core',
  'ASP.NET Core',
  'C#',
  'TypeScript',
  'SQL',
  'Angular',
  'MSSQL',
  'AWS',
  'Redis',
  'RabbitMQ',
  'Kafka',
  'Docker',
  'Entity Framework',
  'xUnit',
  'Playwright',
  'Datadog',
]);

function decode(value) {
  return value
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&nbsp;/g, ' ');
}

function slice(source, startRe, endMark) {
  const match = source.match(startRe);
  assert.ok(match, `missing section ${startRe}`);
  const from = match.index;
  const end = source.indexOf(endMark, from);
  assert.ok(end > from, `unclosed section ${startRe}`);
  return source.slice(from, end);
}

const sections = [
  slice(html, /<header class="site-header hero">/, '</header>'),
  slice(html, /<main id="story">/, '</main>'),
  slice(html, /<section class="contact"/, '</section>'),
];

const token = /<!--[\s\S]*?-->|<\/?([a-zA-Z0-9:-]+)([^>]*?)\/?>|([^<]+)/g;
const VOID = new Set(['br', 'img', 'hr', 'input', 'wbr']);
const uncovered = [];
const keyed = new Set();

for (const section of sections) {
  const stack = [];
  token.lastIndex = 0;
  let match;
  while ((match = token.exec(section))) {
    if (match[0].startsWith('<!--')) continue;
    if (match[1]) {
      const tag = match[1].toLowerCase();
      const closing = match[0].startsWith('</');
      const self = /\/\s*>$/.test(match[0]) || VOID.has(tag);
      if (closing) {
        stack.pop();
        continue;
      }
      const key = /data-i18n="([^"]+)"/.exec(match[2] || '');
      stack.push(key ? key[1] : null);
      if (self) stack.pop();
      continue;
    }
    const text = decode(match[3]).replace(/\s+/g, ' ').trim();
    if (!text || !/\p{L}/u.test(text)) continue;
    const key = [...stack].reverse().find(Boolean);
    if (key) keyed.add(key);
    else uncovered.push(text);
  }
}

const missing = [...new Set(uncovered)].filter((text) => !EQUIVALENT_TEXT.has(text));
assert.deepStrictEqual(missing, [],
  'CV text with no ES translation: ' + missing.map((text) => JSON.stringify(text)).join(', '));

for (const key of keyed) {
  assert.ok(key in i18n.STRINGS.es, `ES dict missing "${key}"`);
  const en = i18n.STRINGS.en[key];
  const es = i18n.STRINGS.es[key];
  if (en === es && !EQUIVALENT_KEYS.has(key)) {
    assert.fail(`"${key}" is English in both languages and is not an equivalent`);
  }
  if (typeof es === 'string') {
    assert.ok(!es.includes('\u2014'), `"${key}" ES copy must not use an em dash`);
  }
}

assert.notStrictEqual(i18n.STRINGS.es['ch8.mClean'], i18n.STRINGS.en['ch8.mClean']);
assert.strictEqual(i18n.STRINGS.es['ch8.mClean'], 'Arquitectura limpia');
assert.strictEqual(i18n.STRINGS.es['ch8.mSpec'], 'Desarrollo guiado por specs');
assert.strictEqual(i18n.STRINGS.es['ch8.mRust'], 'Rust (aprendiendo)');

console.log(`i18n content: ${keyed.size} keyed strings, ${uncovered.length} equivalent tokens`);
