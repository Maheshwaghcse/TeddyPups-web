import { test, expect } from '@playwright/test';

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('body')).toBeVisible();

  await expect(page).toHaveTitle(/.+/);

  await page.screenshot({
    path: 'screenshots/homepage.png',
  });
});
