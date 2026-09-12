/* Shell contract tests — run with `node tests/shell.test.cjs` (no deps, no build).
 * Guards the skeleton that every later task builds on:
 *   - seven [data-scene] sections, ch1..ch7, each with a scene stage
 *   - referenced assets exist and the JS parses as classic scripts
 */
'use strict';

const assert = require('node:assert');
const { readFileSync, existsSync } = require('node:fs');
const { join } = require('node:path');

const root = join(__dirname, '..');
const html = readFileSync(join(root, 'index.html'), 'utf8');

// 1. Exactly seven scenes, ch1..ch7, in document order.
const scenes = [...html.matchAll(/data-scene="([^"]+)"/g)].map((m) => m[1]);
assert.deepStrictEqual(scenes, ['ch1', 'ch2', 'ch3', 'ch4', 'ch5', 'ch6', 'ch7'],
  'index.html must declare scenes ch1..ch7 in order');

// 2. Each scene is labelled and has an animation stage.
for (const id of scenes) {
  assert.ok(html.includes(`aria-labelledby="${id}-title"`), `${id} needs an accessible name`);
  assert.ok(html.includes(`data-stage="${id}"`), `${id} needs a scene stage`);
}

// 3. Referenced local assets exist (works over file:// and any static server).
const assets = [...html.matchAll(/(?:href|src)="(?!https?:|#|mailto:)([^"]+)"/g)].map((m) => m[1]);
assert.ok(assets.length > 0, 'index.html must reference local assets');
for (const asset of assets) {
  assert.ok(existsSync(join(root, asset)), `missing asset: ${asset}`);
}

// 4. Every script is a classic script (no type=module: file:// friendly).
assert.ok(!/type="module"/.test(html), 'scripts must stay classic for file:// support');

// 5. The engine parses and only touches the documented globals.
const engine = readFileSync(join(root, 'js', 'engine.js'), 'utf8');
new Function(engine); // throws on syntax errors
assert.ok(engine.includes("scene-enter") && engine.includes("scene-exit"),
  'engine must emit scene-enter/scene-exit');
assert.ok(!engine.includes('import ') && !engine.includes('require('),
  'engine must stay dependency-free');

console.log('shell tests: all green');
