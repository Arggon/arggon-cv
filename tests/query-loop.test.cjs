'use strict';

/* Query loop tests (task-anim-crack-era) — `node tests/query-loop.test.cjs`. */

const assert = require('node:assert');
const { planQueryLoop } = require('../js/query-loop.js');

const QUERIES = [
  'why does the game check the disc',
  'no-cd patch explained',
  'what is a checksum',
];

const { steps, totalMs } = planQueryLoop(QUERIES, { charDelay: 10, hold: 100, clearGap: 50 });

// 1. Structure: clear before every query except the first.
const clears = steps.filter((s) => s.action === 'clear');
assert.strictEqual(clears.length, QUERIES.length - 1);
clears.forEach((step, i) => assert.strictEqual(step.queryIndex, i + 1));

// 2. Each typed step grows the prefix of its own query by one char.
let lastTyped = {};
steps.filter((s) => s.action === 'type').forEach((step) => {
  const query = QUERIES[step.queryIndex];
  assert.ok(query.startsWith(step.text), 'typed text is a prefix of the query');
  if (lastTyped.queryIndex === step.queryIndex) {
    assert.strictEqual(step.text.length, lastTyped.text.length + 1);
  } else {
    assert.strictEqual(step.text.length, 1);
  }
  lastTyped = step;
});

// 3. The final step of each query is a hold.
QUERIES.forEach((_, qi) => {
  const lastForQuery = steps.filter((s) => s.queryIndex === qi).pop();
  assert.strictEqual(lastForQuery.action, 'hold');
});

// 4. Timing: first char lands after one charDelay; total = chars + holds + clears.
assert.strictEqual(steps.find((s) => s.action === 'type').time, 10);
const chars = QUERIES.join('').length;
assert.strictEqual(totalMs, chars * 10 + QUERIES.length * 100 + (QUERIES.length - 1) * 50);
for (let i = 1; i < steps.length; i++) {
  assert.ok(steps[i].time > steps[i - 1].time, 'times strictly increase');
}

// 5. Empty input is safe.
assert.deepStrictEqual(planQueryLoop([]).steps, []);
assert.strictEqual(planQueryLoop([]).totalMs, 0);

console.log('query-loop tests: all green');
