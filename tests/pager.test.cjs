'use strict';

/* Chapter pager helpers (task-chapter-pager) — `node tests/pager.test.cjs`. */

const assert = require('node:assert');
const pager = require('../js/pager.js');

const tops = [0, 1000, 1900, 2800];
assert.strictEqual(pager.currentIndex(tops, 0, 900), 0, 'top of page is the hero');
assert.strictEqual(pager.currentIndex(tops, 1000, 900), 1, 'aligned on a chapter');
assert.strictEqual(pager.currentIndex(tops, 700, 900), 1, 'chapter past the upper third counts');
assert.strictEqual(pager.currentIndex(tops, 500, 900), 0, 'not yet');
assert.strictEqual(pager.currentIndex(tops, 9e9, 900), 3, 'bottom clamps to last stop');

/* Tall chapters scroll natively until their edge. */
assert.strictEqual(pager.shouldPage(1, 0, 900, 900), true, 'fits: page down');
assert.strictEqual(pager.shouldPage(1, 0, 1400, 900), false, 'taller: read on natively');
assert.strictEqual(pager.shouldPage(1, -500, 902, 900), true, 'at its bottom edge: page');
assert.strictEqual(pager.shouldPage(-1, -300, 600, 900), false, 'scrolled into it: native up');
assert.strictEqual(pager.shouldPage(-1, 0, 900, 900), true, 'at its top: page up');
assert.strictEqual(pager.shouldPage(0, 0, 900, 900), false, 'no direction, no page');

assert.strictEqual(pager.clampIndex(-3, 10), 0);
assert.strictEqual(pager.clampIndex(42, 10), 9);
assert.strictEqual(pager.clampIndex(NaN, 10), 0);

/* Transition budget: 600-900 ms, never longer. */
assert.strictEqual(pager.glideDuration(0), 600);
assert.ok(pager.glideDuration(900) >= 600 && pager.glideDuration(900) <= 900);
assert.strictEqual(pager.glideDuration(1e7), 900, 'rail jumps across the story stay capped');
assert.strictEqual(pager.glideDuration(NaN), 600);

assert.strictEqual(pager.glideEase(0), 0);
assert.strictEqual(pager.glideEase(1), 1);
assert.ok(Math.abs(pager.glideEase(0.5) - 0.5) < 1e-9, 'symmetric');
assert.ok(pager.glideEase(0.25) < 0.25 && pager.glideEase(0.75) > 0.75, 'soft in, soft out');

console.log('pager tests: all green');
