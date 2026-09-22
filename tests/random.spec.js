import { test, expect } from '@playwright/test';

test('Verify Remember Me checkbox toggle lifecycle', async ({ page }) => {
  // Navigate to login page
  await page.goto('https://medi.nigsoft.com/index.php');

  // Use the unique ID locator to satisfy strict mode
  const rememberMe = page.locator('#rememberMe');

  // 1. Verify initial state upon entering is UNCHECKED
  await expect(rememberMe).not.toBeChecked();

  // 2. Check the box and verify it is checked
  await rememberMe.check({ force: true });
  await expect(rememberMe).toBeChecked();

  // 3. Uncheck the box and verify it is unchecked
  await rememberMe.uncheck({ force: true });
  await expect(rememberMe).not.toBeChecked();

  // 4. Check it again and verify final checked status
  await rememberMe.check({ force: true });
  await expect(rememberMe).toBeChecked();
});