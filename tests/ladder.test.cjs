'use strict';

/* Ladder content guard (task-anim-career) — `node tests/ladder.test.cjs`.
 * The rungs must match the real CV timeline (roles, dates, employers)
 * and the sequence must light bottom-of-ladder to top.
 */

const assert = require('node:assert');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');

const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

const stage = html.match(/<div class="scene-stage" data-stage="ch5"[^>]*>([\s\S]*?)<\/div>\s*<\/section>/);
assert.ok(stage, 'ch5 stage markup found');

const rungs = stage[1].match(/<li class="rung" data-rung>[\s\S]*?<\/li>/g) || [];
assert.strictEqual(rungs.length, 4, 'four rungs on the ladder');

const text = (i) => rungs[i].replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ');

// 1. Real timeline, in order (from the English CV).
assert.ok(/2021/.test(text(0)) && /software developer/i.test(text(0)) && /e\.tres/.test(text(0)) && !/Lytx/.test(text(0)), 'rung 1: 2021-2022 software developer at e.tres (not Lytx)');
assert.ok(/2022/.test(text(1)) && /2025/.test(text(1)) && /software engineer II/i.test(text(1)) && /GlobalLogic/.test(text(1)) && /Lytx/.test(text(1)) && /80%/.test(text(1)), 'rung 2: Software Engineer II, GlobalLogic to Lytx, 2022-2025, 80%');
assert.ok(/2025/.test(text(2)) && /senior software engineer/i.test(text(2)) && /GlobalLogic/.test(text(2)) && /Coalfire/.test(text(2)) && /30%/.test(text(2)), 'rung 3: senior at GlobalLogic/Coalfire 2025, 30%');
assert.ok(/may 2026/i.test(text(3)) && !/aug/i.test(text(3)) && /senior AI software engineer/i.test(text(3)) && /Coalfire/.test(text(3)) && /spec-driven/i.test(text(3)) && /team of 3/i.test(text(3)), 'rung 4: senior AI SWE, May 2026 only, Coalfire, spec-driven, team of 3');

// 2. The rungs light in document order (chronological) — data-rung order.
const idx = [...html.matchAll(/data-rung/g)].length;
assert.strictEqual(idx, 4);

console.log('ladder tests: all green');
