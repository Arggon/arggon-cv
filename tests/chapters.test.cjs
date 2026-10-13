'use strict';

/* Chapter copy tests (task-chapters-copy) — run with `node tests/chapters.test.cjs`.
 * The copy is the product, so the acceptance rules are enforced as tests:
 *   - eight chapters present in content/chapters.md and index.html
 *   - every chapter: hook (body lead), <= 120 words total, takeaway line
 *   - no placeholder text left behind
 */

const assert = require('node:assert');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');

const root = join(__dirname, '..');
const md = readFileSync(join(root, 'content', 'chapters.md'), 'utf8');
const html = readFileSync(join(root, 'index.html'), 'utf8');

// 1. content/chapters.md declares the eight chapters.
const mdChapters = md.match(/^## Chapter \d/gm) || [];
assert.strictEqual(mdChapters.length, 8, 'chapters.md must have exactly eight chapters');

// 2. Every chapter body in index.html is real copy (no placeholders).
assert.ok(!/Placeholder/.test(html), 'index.html must not contain placeholder copy');

const blocks = [...html.matchAll(
  /id="(ch\d)-title"[^>]*>([^<]*)<\/h2>\s*<p class="chapter-body"[^>]*>(.*?)<\/p>\s*<p class="chapter-takeaway"[^>]*>(.*?)<\/p>/gs
)].map((m) => ({ id: m[1], title: m[2].trim(), body: m[3], takeaway: m[4] }));

assert.deepStrictEqual(blocks.map((b) => b.id), ['ch1', 'ch2', 'ch3', 'ch4', 'ch5', 'ch6', 'ch7', 'ch8'],
  'index.html must carry the eight chapters in order');

// 3. Per-chapter word budget: <= 60 words across hook + body + takeaway.
function words(fragment) {
  return fragment
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;|&#\d+;/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
}

for (const b of blocks) {
  const total = words(b.body) + words(b.takeaway);
  assert.ok(total <= 60, `${b.id} is ${total} words (budget 60)`);
  assert.ok(total >= 40, `${b.id} is only ${total} words — too thin for a chapter`);
  assert.ok(b.takeaway.length > 0 && !/^\s*$/.test(b.takeaway), `${b.id} needs a takeaway`);
  console.log(`${b.id}  ${String(total).padStart(3)} words  ${b.title}`);
}

// 3b. The Spanish copy keeps the same budget.
const esDict = require(join(root, 'js', 'i18n.js')).STRINGS.es;
for (const b of blocks) {
  const esTotal = words(esDict[`${b.id}.body`]) + words(esDict[`${b.id}.takeaway`]);
  assert.ok(esTotal <= 60 && esTotal >= 40, `ES ${b.id} is ${esTotal} words (budget 40-60)`);
}

// 4. Chapter 8 carries real contact links.
assert.ok(html.includes('mailto:arggondev@gmail.com'), 'ch8 needs the contact email');
assert.ok(html.includes('linkedin.com/in/arggon'), 'ch8 needs the LinkedIn profile');
assert.ok(html.includes('https://github.com/Arggon"'), 'ch8 needs the GitHub profile');
assert.ok(html.includes('github.com/Arggon/openspec-tdd-schema'), 'ch7 links the open-source method');
assert.ok(/data-i18n="ch8.p1cta"/.test(html) && html.includes('github.com/Arggon/ArggonManager" rel="noopener" data-i18n="ch8.p1cta"'), 'ch8 gives ArggonManager the prominent link');

console.log('chapters tests: all green');
