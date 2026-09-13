'use strict';

/* SQL-injection scene plan tests (task-anim-sql-injection) — `node tests/sqli-plan.test.cjs`. */

const assert = require('node:assert');
const { planSqliScene } = require('../js/sqli-plan.js');

const { steps, totalMs } = planSqliScene({
  input: "' OR 1=1 --",
  rows: new Array(4),
  charDelay: 90,
  rowDelay: 320,
});

// 1. Phase order: type x N, check, row x 4, lesson — exactly once each.
const phases = steps.map((s) => s.phase);
const typeCount = phases.filter((p) => p === 'type').length;
assert.strictEqual(typeCount, "' OR 1=1 --".length, 'one typing step per character');
assert.strictEqual(phases[typeCount], 'check');
assert.deepStrictEqual(
  phases.slice(typeCount + 1, typeCount + 5),
  ['row', 'row', 'row', 'row'],
  'four row steps after the check');
assert.strictEqual(phases[phases.length - 1], 'lesson', 'the lesson lands last');
assert.strictEqual(phases.filter((p) => p === 'check').length, 1);
assert.strictEqual(phases.filter((p) => p === 'lesson').length, 1);

// 2. Typed text grows as a prefix of the input, quotes intact.
const lastType = steps.filter((s) => s.phase === 'type').pop();
assert.strictEqual(lastType.text, "' OR 1=1 --");
assert.ok(steps.every((s) => s.phase !== 'type' || "' OR 1=1 --".startsWith(s.text)));

// 3. Row steps carry sequential indexes.
steps.filter((s) => s.phase === 'row')
  .forEach((step, i) => assert.strictEqual(step.index, i));

// 4. Times strictly increase; totalMs matches the last (lesson) step.
for (let i = 1; i < steps.length; i++) {
  assert.ok(steps[i].time > steps[i - 1].time, 'times strictly increase');
}
assert.strictEqual(totalMs, steps[steps.length - 1].time);
assert.strictEqual(totalMs, typeCount * 90 + 700 + 4 * 320 + 900);

// 5. Empty input still plays check -> rows -> lesson.
const bare = planSqliScene({ rows: new Array(2) });
assert.deepStrictEqual(bare.steps.map((s) => s.phase), ['check', 'row', 'row', 'lesson']);

console.log('sqli-plan tests: all green');
