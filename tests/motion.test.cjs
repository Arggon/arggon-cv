'use strict';

/* Motion polish helpers (task-motion-polish) — run with `node tests/motion.test.cjs`.
 * Drives the pure UMD API from js/motion.js; the DOM wiring is browser-only.
 */

const assert = require('node:assert');
const motion = require('../js/motion.js');

/* lerp moves toward the target, never past it, and converges. */
assert.strictEqual(motion.lerp(10, 20, 0.5), 15, 'lerp midpoint');
assert.ok(motion.lerp(10, 20, 2) > 20 - 1e-9, 'lerp overshoot clamps to target');
assert.strictEqual(motion.lerp(NaN, 5, 0.5), 5, 'lerp with NaN current jumps to target');
let v = 100;
for (let i = 0; i < 200; i++) v = motion.lerp(v, 0, 0.12);
assert.ok(Math.abs(v) < 0.1, `lerp converges (got ${v})`);

/* velocitySkew: sign follows velocity, magnitude clamps at max, idles at 0. */
assert.strictEqual(motion.velocitySkew(0, 1.6), 0, 'no velocity, no skew');
assert.strictEqual(motion.velocitySkew(NaN, 1.6), 0, 'NaN velocity is safe');
assert.ok(motion.velocitySkew(50, 1.6) > 0, 'scrolling down skews one way');
assert.ok(motion.velocitySkew(-50, 1.6) < 0, 'scrolling up skews the other');
assert.strictEqual(Math.abs(motion.velocitySkew(1e6, 1.6)), 1.6, 'skew clamps at max');
assert.strictEqual(motion.velocitySkew(10, 0), 0, 'zero max disables skew');

/* parallaxOffset: above midline drifts down (positive), below drifts up,
 * and strength is clamped. */
assert.ok(motion.parallaxOffset(-200, 0.05) > 0, 'stage above midline gets +y');
assert.ok(motion.parallaxOffset(200, 0.05) < 0, 'stage below midline gets -y');
assert.strictEqual(motion.parallaxOffset(200, -1), 0, 'negative strength treated as 0');
assert.strictEqual(motion.parallaxOffset(200, 9), -200, 'strength clamps at 1');
assert.strictEqual(motion.parallaxOffset(0, 0.05), 0, 'centered stage does not drift');

/* magnetOffset: pull is proportional, clamped per axis, pointer-safe. */
assert.deepStrictEqual(motion.magnetOffset(4, 8, 6), { x: 1, y: 2 }, 'quarter pull');
assert.deepStrictEqual(motion.magnetOffset(1e6, -1e6, 6), { x: 6, y: -6 }, 'clamps at max');
assert.deepStrictEqual(motion.magnetOffset(NaN, 5, 6), { x: 0, y: 0 }, 'NaN pointer is safe');
assert.deepStrictEqual(motion.magnetOffset(40, 40, NaN), { x: 6, y: 6 }, 'bad max falls back to 6');

/* easeInOutCubic: endpoints fixed, slow-fast-slow shape. */
assert.strictEqual(motion.easeInOutCubic(0), 0, 'starts at rest');
assert.strictEqual(motion.easeInOutCubic(1), 1, 'ends at target');
assert.strictEqual(motion.easeInOutCubic(-1), 0, 'negative t clamps');
assert.ok(motion.easeInOutCubic(0.25) < 0.25 && motion.easeInOutCubic(0.75) > 0.75,
  'slow in, fast middle, slow out');

console.log('motion tests: all helpers pass');
