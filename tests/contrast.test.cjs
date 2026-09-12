'use strict';

/* Contrast gate (task-scaffold-design) — run with `node tests/contrast.test.cjs`.
 * Parses the palette from css/tokens.css and checks every documented
 * text/surface pair against WCAG 2.x AA (4.5:1 body text, 3:1 large text).
 */

const assert = require('node:assert');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');

const css = readFileSync(join(__dirname, '..', 'css', 'tokens.css'), 'utf8');

function token(name) {
  const m = css.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})`));
  assert.ok(m, `token --${name} must be a 6-digit hex color`);
  return m[1];
}

function luminance(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(fg, bg) {
  const [l1, l2] = [luminance(fg), luminance(bg)].sort((a, b) => b - a);
  return (l1 + 0.05) / (l2 + 0.05);
}

const pairs = [
  // [fg token, bg token, minimum, why]
  ['ink', 'bg', 4.5, 'body text on page background'],
  ['ink', 'bg-raised', 4.5, 'body text on raised surfaces'],
  ['ink-dim', 'bg', 4.5, 'secondary text on page background'],
  ['ink-dim', 'bg-raised', 4.5, 'secondary text on raised surfaces'],
  ['accent', 'bg', 4.5, 'accent text (kickers, links) on background'],
  ['accent-ink', 'accent', 4.5, 'text on accent fills (buttons, skip link)'],
];

for (const [fg, bg, min, why] of pairs) {
  const ratio = contrast(token(fg), token(bg));
  assert.ok(ratio >= min,
    `--${fg} on --${bg} is ${ratio.toFixed(2)}:1, needs >= ${min}:1 (${why})`);
  console.log(`${ratio.toFixed(2).padStart(6)}:1  --${fg} on --${bg}  (${why})`);
}

console.log('contrast tests: all pairs pass AA');
