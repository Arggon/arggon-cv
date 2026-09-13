'use strict';

/* Port scan tests (task-anim-networking) — `node tests/port-scan.test.cjs`. */

const assert = require('node:assert');
const { planPortScan } = require('../js/port-scan.js');

const PORTS = [{ port: 21 }, { port: 80 }, { port: 443 }, { port: 1433 }, { port: 6112 }];

const { steps, totalMs } = planPortScan(PORTS, 280);

// 1. One step per port, in order.
assert.strictEqual(steps.length, PORTS.length);
steps.forEach((step, i) => assert.strictEqual(step.index, i));

// 2. Fixed step timing.
steps.forEach((step, i) => assert.strictEqual(step.time, i * 280));

// 3. totalMs covers the last light-up plus one step.
assert.strictEqual(totalMs, PORTS.length * 280);

// 4. Default delay and empty input.
assert.strictEqual(planPortScan(PORTS).steps[1].time, 280);
assert.deepStrictEqual(planPortScan([]).steps, []);
assert.strictEqual(planPortScan([]).totalMs, 0);

// 5. Sparse arrays (new Array(n)) must still yield every step — regression:
//    map/forEach silently skip holes, which would freeze dependent scenes.
const sparse = planPortScan(new Array(7), 380);
assert.strictEqual(sparse.steps.length, 7);
sparse.steps.forEach((step, i) => assert.strictEqual(step.index, i));
assert.strictEqual(sparse.steps[6].time, 6 * 380);

console.log('port-scan tests: all green');
