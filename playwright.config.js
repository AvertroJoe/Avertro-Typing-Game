// @ts-check
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'list',
  use: {
    // The game is a single static file - no dev server needed, tests
    // open it directly with a file:// URL.
    trace: 'retain-on-failure',
  },
});
