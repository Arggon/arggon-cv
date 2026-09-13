'use strict';

/* Scroll-scrub engine tests (task-scrub-engine) — `node tests/scrub.test.cjs`.
 * Covers the pure progress math every scrubbed scene depends on.
 */

const assert = require('node:assert');
const scrub = require('../js/scrub.js');

/* sceneProgress: 0 before the pin, linear inside, 1 after. */
const VIEW = 800;
const H = 1900; /* pin range = 1900 - 800 = 1100px */
assert.strictEqual(scrub.sceneProgress(1000, H, VIEW, 200), 0, 'approaching scene is 0');
assert.strictEqual(scrub.sceneProgress(1000, H, VIEW, 1000), 0, 'pin start is 0');
assert.ok(Math.abs(scrub.sceneProgress(1000, H, VIEW, 1550) - 0.5) < 1e-9, 'midpoint is 0.5');
assert.strictEqual(scrub.sceneProgress(1000, H, VIEW, 2100), 1, 'pin end is 1');
assert.strictEqual(scrub.sceneProgress(1000, H, VIEW, 5000), 1, 'past the scene clamps at 1');
assert.strictEqual(scrub.sceneProgress(1000, H, VIEW, -50), 0, 'negative scroll clamps at 0');

/* Degenerate ranges never divide by zero. */
assert.strictEqual(scrub.sceneProgress(500, 800, 800, 400), 0, 'zero-range before start');
assert.strictEqual(scrub.sceneProgress(500, 800, 800, 900), 1, 'zero-range at/after start');
assert.strictEqual(scrub.sceneProgress(500, NaN, 800, 900), 1, 'NaN height is safe');

/* band: clamped sub-progress for staggering. */
assert.strictEqual(scrub.band(0.05, 0.2, 0.6), 0, 'before the band');
assert.ok(Math.abs(scrub.band(0.4, 0.2, 0.6) - 0.5) < 1e-9, 'mid-band');
assert.strictEqual(scrub.band(0.9, 0.2, 0.6), 1, 'after the band');
assert.strictEqual(scrub.band(0.5, 0.6, 0.2), 1, 'inverted band treats end as threshold');
assert.strictEqual(scrub.band(NaN, 0.2, 0.6), 0, 'NaN progress is safe');

/* easeOutCubic: endpoints + fast-start-slow-end shape. */
assert.strictEqual(scrub.easeOutCubic(0), 0);
assert.strictEqual(scrub.easeOutCubic(1), 1);
assert.ok(scrub.easeOutCubic(0.25) > 0.25 && scrub.easeOutCubic(0.25) < 0.6,
  'fast start, gentle landing');

/* Progress is directional by construction: same input, same output —
   scrubbing back repaints the earlier frame. */
const down = scrub.sceneProgress(1000, H, VIEW, 1400);
const up = scrub.sceneProgress(1000, H, VIEW, 1400);
assert.strictEqual(down, up, 'pure function of scroll position');

console.log('scrub tests: progress math passes');
