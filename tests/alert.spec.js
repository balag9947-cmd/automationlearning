import { test, expect } from '@playwright/test';

test('login/signuptest', async ({ page }) => {
  // DemoQA has heavy ads; wait until DOM is ready
  await page.goto('https://demoqa.com/alerts', { waitUntil: 'domcontentloaded' });

  // --- 1. Simple Alert ---
  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toBe('You clicked a button');
    await dialog.accept();
  });
  await page.locator('#alertButton').click();

  // --- 2. Timer Alert (Trigger click, then wait for dialog event) ---
  const dialogPromise = page.waitForEvent('dialog', { timeout: 10000 });
  await page.locator('#timerAlertButton').click();
  const timerDialog = await dialogPromise;
  expect(timerDialog.message()).toBe('This alert appeared after 5 seconds');
  await timerDialog.accept();

  // --- 3. Confirm Box (Cancel) ---
  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toBe('Do you confirm action?');
    await dialog.dismiss();
  });
  await page.locator('#confirmButton').click();
  await expect(page.locator('#confirmResult')).toHaveText('You selected Cancel');

  // --- 4. Prompt Box ---
  const myName = 'Bala';
  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toBe('Please enter your name?');
    await dialog.accept(myName);
  });
  await page.locator('#promtButton').click();
  await expect(page.locator('#promptResult')).toHaveText(`You entered ${myName}`);
});