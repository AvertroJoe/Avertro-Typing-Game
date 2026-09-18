#!/usr/bin/env node
// Pulls every inline <script> block out of the given HTML file and checks
// that each one parses cleanly, without executing any of it.
// Usage: node scripts/check-js-syntax.js index.html

const fs = require('fs');
const vm = require('vm');

const file = process.argv[2] || 'index.html';
const html = fs.readFileSync(file, 'utf8');

const matches = [...html.matchAll(/<script(\s[^>]*)?>([\s\S]*?)<\/script>/gi)];
const inlineScripts = matches
  .filter((m) => !/\ssrc\s*=/.test(m[1] || ''))
  .map((m) => m[2])
  .filter((code) => code.trim().length > 0);

if (inlineScripts.length === 0) {
  console.error(`No inline <script> blocks found in ${file}`);
  process.exit(1);
}

let hadError = false;

inlineScripts.forEach((code, i) => {
  try {
    // Parsing only (no execution) - this is what catches a missing brace,
    // stray comma, or unclosed string without needing a DOM to run against.
    new vm.Script(code, { filename: `${file}#inline-script-${i + 1}` });
    console.log(`OK: inline script ${i + 1} (${code.length} chars) parses cleanly`);
  } catch (err) {
    hadError = true;
    console.error(`SYNTAX ERROR in inline script ${i + 1} of ${file}:`);
    console.error(err.message);
  }
});

process.exit(hadError ? 1 : 0);
