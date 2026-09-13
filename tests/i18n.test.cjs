'use strict';

/* Bilingual dictionary tests (task-i18n-toggle) — `node tests/i18n.test.cjs`.
 * The EN copy ships inline in index.html; ES must be a complete mirror:
 *   - every language defines exactly the same keys (same shapes)
 *   - every [data-i18n] key used by index.html exists in both languages
 *   - resolveLang normalizes junk to the EN default
 */

const assert = require('node:assert');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');

const i18n = require('../js/i18n.js');
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

// 1. Dictionary parity between EN and ES.
assert.deepStrictEqual(i18n.dictProblems(), [], 'EN/ES dictionaries must mirror each other');
assert.ok(Object.keys(i18n.STRINGS.en).length >= 60, 'dictionary looks complete');
assert.ok(i18n.STRINGS.es['ch1.body'].length > 100, 'ES chapter copy is real copy');

// 2. Every key referenced from the HTML exists in both languages.
const used = [...html.matchAll(/data-i18n="([^"]+)"/g)].map((m) => m[1]);
assert.ok(used.length >= 80, `expected the full copy wired up (found ${used.length})`);
const unique = [...new Set(used)];
for (const key of unique) {
  assert.ok(key in i18n.STRINGS.en, `EN dict missing "${key}" (used in index.html)`);
  assert.ok(key in i18n.STRINGS.es, `ES dict missing "${key}" (used in index.html)`);
}

// 3. Every dict key is actually used by the HTML (no dead copy, except the
//    JS-consumed scene arrays which only ch1/ch2 read at reveal time).
const jsKeys = new Set(['ch1.bootLines', 'ch2.queries', 'meta.title', 'meta.description',
  'meta.locale', 'ui.langAria']);
for (const key of Object.keys(i18n.STRINGS.en)) {
  assert.ok(unique.includes(key) || jsKeys.has(key), `dict key "${key}" is not wired into index.html`);
}

// 4. Language buttons only offer supported languages.
const buttons = [...html.matchAll(/data-lang-button="([^"]+)"/g)].map((m) => m[1]);
assert.deepStrictEqual(buttons.sort(), ['en', 'es'], 'toggle offers exactly EN and ES');

// 5. resolveLang: explicit choices win, anything else falls back to EN.
assert.strictEqual(i18n.resolveLang('es'), 'es');
assert.strictEqual(i18n.resolveLang('en'), 'en');
assert.strictEqual(i18n.resolveLang('fr'), 'en');
assert.strictEqual(i18n.resolveLang(null), 'en');
assert.strictEqual(i18n.resolveLang(undefined), 'en');
assert.strictEqual(i18n.t('rail.c7', 'es'), '07 Ahora');
assert.strictEqual(i18n.t('rail.c7', 'zz'), '07 Now');

// 6. Scene arrays stay in sync (same line/query counts per language).
assert.strictEqual(i18n.STRINGS.en['ch1.bootLines'].length,
  i18n.STRINGS.es['ch1.bootLines'].length);
assert.strictEqual(i18n.STRINGS.en['ch2.queries'].length,
  i18n.STRINGS.es['ch2.queries'].length);

console.log('i18n tests: dictionary mirrors, HTML wiring and resolution pass');
