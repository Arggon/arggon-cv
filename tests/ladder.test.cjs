'use strict';

/* Ladder content guard (task-anim-career) — `node tests/ladder.test.cjs`.
 * The rungs must match the real CV timeline (roles, dates, employers)
 * and the sequence must light bottom-of-ladder to top.
 */

const assert = require('node:assert');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');

const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

const stage = html.match(/<div class="scene-stage" data-stage="ch6"[^>]*>([\s\S]*?)<\/div>\s*<\/section>/);
assert.ok(stage, 'ch6 stage markup found');

const rungs = stage[1].match(/<li class="rung" data-rung>[\s\S]*?<\/li>/g) || [];
assert.strictEqual(rungs.length, 5, 'five rungs on the ladder');

const text = (i) => rungs[i].replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ');

// 1. Real timeline, in order (from the English CV).
assert.ok(/2021/.test(text(0)) && /junior software engineer/i.test(text(0)) && /e\.tres/.test(text(0)) && /Lytx/.test(text(0)), 'rung 1: 2021 junior at e.tres/Lytx');
assert.ok(/2022/.test(text(1)) && /2025/.test(text(1)) && /consultant/i.test(text(1)), 'rung 2: consultant 2022-2025');
assert.ok(/2025/.test(text(2)) && /senior software engineer/i.test(text(2)) && /GlobalLogic/.test(text(2)) && /Coalfire/.test(text(2)), 'rung 3: senior at GlobalLogic/Coalfire 2025');
assert.ok(/2026/.test(text(3)) && /CQRS/i.test(text(3)) && /Mediator/i.test(text(3)), 'rung 4: CQRS + Mediator payment work, 2026');
assert.ok(/2026/.test(text(4)) && /senior AI software engineer/i.test(text(4)) && /spec-driven development/i.test(text(4)), 'rung 5: senior AI SWE, SDD, 2026');

// 2. The rungs light in document order (chronological) — data-rung order.
const idx = [...html.matchAll(/data-rung/g)].length;
assert.strictEqual(idx, 5);

console.log('ladder tests: all green');
