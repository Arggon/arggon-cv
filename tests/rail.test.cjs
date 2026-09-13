'use strict';

/* Rail helper tests (task-timeline-progress) — `node tests/rail.test.cjs`.
 * Covers the pure progress math; DOM wiring stays thin by design.
 */

const assert = require('node:assert');
const { computeProgress } = require('../js/rail.js');

// Top of page.
assert.strictEqual(computeProgress(0, 8000, 800), 0);

// Bottom of page (exact).
assert.strictEqual(computeProgress(7200, 8000, 800), 1);

// Halfway.
assert.ok(Math.abs(computeProgress(3600, 8000, 800) - 0.5) < 1e-9);

// Overscroll clamps to 1, negative clamps to 0.
assert.strictEqual(computeProgress(9000, 8000, 800), 1);
assert.strictEqual(computeProgress(-50, 8000, 800), 0);

// Degenerate documents never divide by zero or NaN.
assert.strictEqual(computeProgress(0, 800, 800), 0, 'document shorter than viewport');
assert.strictEqual(computeProgress(0, 0, 0), 0);
assert.strictEqual(computeProgress(100, NaN, 800), 0);
assert.strictEqual(computeProgress(100, 8000, Infinity), 0);

console.log('rail tests: all green');
