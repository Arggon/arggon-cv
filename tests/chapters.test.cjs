'use strict';

/* Chapter copy tests (task-chapters-copy) — run with `node tests/chapters.test.cjs`.
 * The copy is the product, so the acceptance rules are enforced as tests:
 *   - seven chapters present in content/chapters.md and index.html
 *   - every chapter: hook (body lead), <= 120 words total, takeaway line
 *   - no placeholder text left behind
 */

const assert = require('node:assert');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');

const root = join(__dirname, '..');
const md = readFileSync(join(root, 'content', 'chapters.md'), 'utf8');
const html = readFileSync(join(root, 'index.html'), 'utf8');

// 1. content/chapters.md declares the seven chapters.
const mdChapters = md.match(/^## Chapter \d/gm) || [];
assert.strictEqual(mdChapters.length, 7, 'chapters.md must have exactly seven chapters');

// 2. Every chapter body in index.html is real copy (no placeholders).
assert.ok(!/Placeholder/.test(html), 'index.html must not contain placeholder copy');

const blocks = [...html.matchAll(
  /id="(ch\d)-title"[^>]*>([^<]*)<\/h2>\s*<p class="chapter-body">(.*?)<\/p>\s*<p class="chapter-takeaway">(.*?)<\/p>/gs
)].map((m) => ({ id: m[1], title: m[2].trim(), body: m[3], takeaway: m[4] }));

assert.deepStrictEqual(blocks.map((b) => b.id), ['ch1', 'ch2', 'ch3', 'ch4', 'ch5', 'ch6', 'ch7'],
  'index.html must carry the seven chapters in order');

// 3. Per-chapter word budget: <= 120 words across hook + body + takeaway.
function words(fragment) {
  return fragment
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;|&#\d+;/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
}

for (const b of blocks) {
  const total = words(b.body) + words(b.takeaway);
  assert.ok(total <= 120, `${b.id} is ${total} words (budget 120)`);
  assert.ok(total >= 40, `${b.id} is only ${total} words — too thin for a chapter`);
  assert.ok(b.takeaway.length > 0 && !/^\s*$/.test(b.takeaway), `${b.id} needs a takeaway`);
  console.log(`${b.id}  ${String(total).padStart(3)} words  ${b.title}`);
}

// 4. Chapter 7 carries real contact links.
assert.ok(html.includes('mailto:arggondev@gmail.com'), 'ch7 needs the contact email');
assert.ok(html.includes('linkedin.com/in/arggon'), 'ch7 needs the LinkedIn profile');

console.log('chapters tests: all green');
