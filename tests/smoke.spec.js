// @ts-check
const { test, expect } = require('@playwright/test');
const path = require('path');

// The game is a single static file with no server, so tests open it
// straight off disk. This is the closest thing to a regression test for
// the actual play experience: it doesn't just check the code parses, it
// checks a visitor can type the sentence and finish the game.

const GAME_URL = 'file://' + path.resolve(__dirname, '..', 'index.html');
const TARGET_SENTENCE = 'Quantify your resilience, defend your spend';
const ADMIN_PASSWORD = 'avertro2026';

test('typing the target sentence completes the game and shows a time', async ({ page }) => {
  await page.goto(GAME_URL);

  const input = page.locator('#typingInput');
  await input.click();
  await input.pressSequentially(TARGET_SENTENCE, { delay: 5 });

  const completionModal = page.locator('#completionModal');
  await expect(completionModal).toBeVisible();
  await expect(page.locator('#finalTime')).not.toHaveText('');

  // Submitting a name should add a highlighted row to the leaderboard.
  await page.locator('#playerName').fill('CI Test Runner');
  await page.locator('#submitNameBtn').click();
  await expect(completionModal).toBeHidden();
  await expect(page.locator('#leaderboardBody')).toContainText('CI Test Runner');
});

test('admin panel rejects the wrong password and accepts the right one', async ({ page }) => {
  await page.goto(GAME_URL);

  await page.locator('#adminLink').click();
  await expect(page.locator('#adminLoginModal')).toBeVisible();

  await page.locator('#adminPassword').fill('definitely-not-it');
  await page.locator('#adminLoginSubmitBtn').click();
  await expect(page.locator('#adminError')).toHaveText('Incorrect password.');

  await page.locator('#adminPassword').fill(ADMIN_PASSWORD);
  await page.locator('#adminLoginSubmitBtn').click();
  await expect(page.locator('#adminPanelModal')).toBeVisible();
});
