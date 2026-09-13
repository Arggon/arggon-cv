'use strict';

/* Reveal state machine tests (task-timeline-reveal) — `node tests/reveal.test.cjs`.
 * Drives the pure orchestrator (js/reveal.js) the way the observer does:
 * enter/exit events in messy real-world orders.
 */

const assert = require('node:assert');
const createRevealOrchestrator = require('../js/reveal.js');


const IDS = ['ch1', 'ch2', 'ch3', 'ch4', 'ch5', 'ch6', 'ch7'];

function make() {
  const animated = [];
  const caughtUp = [];
  const machine = createRevealOrchestrator({
    ids: IDS,
    onAnimate: (id) => animated.push(id),
    onCatchUp: (id) => caughtUp.push(id),
  });
  return { machine, animated, caughtUp };
}

// 1. Normal top-down reading: each enter animates only that scene.
{
  const { machine, animated, caughtUp } = make();
  for (const id of IDS) machine.enter(id);
  assert.deepStrictEqual(animated, IDS, 'sequential reading animates each scene once, in order');
  assert.deepStrictEqual(caughtUp, [], 'no catch-up needed when reading in order');
}

// 2. Rail jump down: skipped scenes catch up instantly, target animates.
{
  const { machine, animated, caughtUp } = make();
  machine.enter('ch1');
  machine.enter('ch5');
  assert.deepStrictEqual(caughtUp, ['ch2', 'ch3', 'ch4'], 'scenes 2-4 catch up instantly');
  assert.deepStrictEqual(animated, ['ch1', 'ch5'], 'target scene animates');
  assert.strictEqual(machine.revealedCount(), 5, 'five scenes revealed after the jump');
}

// 3. Double enter never re-animates (no re-trigger jank).
{
  const { machine, animated } = make();
  machine.enter('ch3');
  machine.enter('ch3');
  machine.enter('ch3');
  assert.deepStrictEqual(animated, ['ch3'], 'enter on a revealed scene is a no-op');
}

// 4. Exit never rewinds: re-entering after exit stays silent.
{
  const { machine, animated } = make();
  machine.enter('ch2');
  machine.exit('ch2');
  machine.enter('ch2');
  assert.deepStrictEqual(animated, ['ch2'], 'exit does not reset the revealed state');
}

// 5. Scroll back up: earlier scenes were already revealed by catch-up.
{
  const { machine, animated } = make();
  machine.enter('ch4');
  machine.enter('ch1');
  assert.deepStrictEqual(animated, ['ch4'], 'entering an already-revealed scene animates nothing');
  assert.strictEqual(machine.isRevealed('ch1'), true, 'ch1 was revealed by catch-up');
}

// 6. Unknown ids are ignored, not crashes.
{
  const { machine } = make();
  assert.strictEqual(machine.enter('nope'), 'ignored');
  assert.strictEqual(machine.exit('nope'), 'ignored');
}

// 7. Full chaos: any interleaving still yields exactly one reveal per scene.
{
  const { machine, animated, caughtUp } = make();
  ['ch5', 'ch2', 'ch7', 'ch3', 'ch1', 'ch6', 'ch4', 'ch5', 'ch2'].forEach((id) => machine.enter(id));
  assert.strictEqual(machine.revealedCount(), 7, 'all scenes revealed');
  const all = [...animated, ...caughtUp];
  assert.strictEqual(all.length, 7, 'exactly seven reveals total — none duplicated');
  assert.deepStrictEqual([...new Set(all)].sort(), [...IDS].sort(), 'every scene revealed exactly once');
}

console.log('reveal tests: all green');
