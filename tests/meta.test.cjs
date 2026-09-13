'use strict';

/* Share-card + fallback tests (task-deploy-pages) — `node tests/meta.test.cjs`.
 * The page must preview correctly when shared and link the PDF CV.
 */

const assert = require('node:assert');
const { readFileSync, existsSync } = require('node:fs');
const { join } = require('node:path');

const root = join(__dirname, '..');
const html = readFileSync(join(root, 'index.html'), 'utf8');
const URL = 'https://arggon.github.io/arggon-cv/';

function meta(attr, value) {
  return html.includes(`<meta ${attr}="${value}"`);
}

// 1. Canonical + Open Graph basics.
assert.ok(meta('property', 'og:url'), 'og:url present');
assert.ok(html.includes(`<link rel="canonical" href="${URL}">`), 'canonical URL');
assert.ok(html.includes('property="og:title"'), 'og:title present');
assert.ok(html.includes('property="og:description"'), 'og:description present');
assert.ok(html.includes('property="og:type"'), 'og:type present');

// 2. og:image is an absolute URL to a committed asset with dimensions + alt.
assert.ok(html.includes(`content="${URL}assets/og-card.png"`), 'absolute og:image');
assert.ok(meta('property', 'og:image:width') && meta('property', 'og:image:height'), 'og:image dimensions');
assert.ok(html.includes('property="og:image:alt"'), 'og:image alt text');

// 3. Twitter large-card fallback.
assert.ok(html.includes('name="twitter:card" content="summary_large_image"'), 'twitter large card');
assert.ok(html.includes('name="twitter:image"'), 'twitter:image present');

// 4. The card + favicon + PDF all exist in the repo (deployed relative).
for (const asset of ['assets/og-card.png', 'assets/favicon.svg', 'assets/Gonzalo-Arganaraz-CV.pdf']) {
  assert.ok(existsSync(join(root, asset)), `committed asset exists: ${asset}`);
}

// 5. Footer links the PDF as the sober fallback.
assert.ok(html.includes('href="assets/Gonzalo-Arganaraz-CV.pdf"'), 'footer links the PDF CV');

// 6. Pages workflow deploys the assembled static files.
const workflow = readFileSync(join(root, '.github', 'workflows', 'deploy.yml'), 'utf8');
assert.ok(/upload-pages-artifact/.test(workflow), 'workflow uploads pages artifact');
assert.ok(/path: public/.test(workflow), 'artifact is the assembled static site');
assert.ok(/id-token: write/.test(workflow), 'workflow has pages permissions');

console.log('meta tests: all green');
