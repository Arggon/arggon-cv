'use strict';

/* CRT boot schedule tests (task-anim-crt-boot) — `node tests/boot.test.cjs`.
 * Covers the pure typing-schedule math the boot animation plays.
 */

const assert = require('node:assert');
const { buildBootSchedule, instantBoot } = require('../js/boot-schedule.js');

const LINES = ['ARGGON BIOS v1.0 - CORDOBA, AR', 'MEMORY TEST ... 640K OK', 'LOADING STORY.EXE'];

const steps = buildBootSchedule(LINES, { charDelay: 10, lineDelay: 100 });

// 1. One step per character.
assert.strictEqual(steps.length, LINES.join('').length);

// 2. Steps are grouped by line, in line order.
assert.strictEqual(steps[0].lineIndex, 0);
assert.strictEqual(steps[LINES[0].length - 1].lineIndex, 0);
assert.strictEqual(steps[LINES[0].length].lineIndex, 1);

// 3. Every step's text is a prefix of its line, growing by one char.
steps.forEach((step, i) => {
  const line = LINES[step.lineIndex];
  assert.ok(line.startsWith(step.text), `step ${i} is a prefix`);
  if (i > 0 && steps[i - 1].lineIndex === step.lineIndex) {
    assert.strictEqual(step.text.length, steps[i - 1].text.length + 1, 'grows by one char');
  } else {
    assert.strictEqual(step.text.length, 1, 'new line starts at one char');
  }
});

// 4. Times increase; line pauses are honored.
assert.strictEqual(steps[0].time, 0);
for (let i = 1; i < steps.length; i++) {
  assert.ok(steps[i].time > steps[i - 1].time, 'times strictly increase');
}
const firstOfLine2 = steps[LINES[0].length]; // first char of line 2
assert.strictEqual(firstOfLine2.time, LINES[0].length * 10 + 100, 'lineDelay added between lines');

// 5. Final step completes the last line.
const last = steps[steps.length - 1];
assert.strictEqual(last.text, LINES[LINES.length - 1]);

// 6. Reduced motion: one instant step per full line.
const instant = instantBoot(LINES);
assert.strictEqual(instant.length, LINES.length);
instant.forEach((step, i) => {
  assert.strictEqual(step.time, 0);
  assert.strictEqual(step.lineIndex, i);
  assert.strictEqual(step.text, LINES[i]);
});

console.log('boot tests: all green');
