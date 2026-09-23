# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: alert.spec.js >> login/signuptest
- Location: tests\alert.spec.js:3:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "Please enter your name?"
Received: "Please enter your name"
```

```
Error: locator.click: Test ended.
Call log:
  - waiting for locator('#promtButton')
    - locator resolved to <button type="button" id="promtButton" class="btn btn-primary">Click me</button>
  - attempting click action
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - performing click action

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('login/signuptest', async ({ page }) => {
  4  |   // DemoQA has heavy ads; wait until DOM is ready
  5  |   await page.goto('https://demoqa.com/alerts', { waitUntil: 'domcontentloaded' });
  6  | 
  7  |   // --- 1. Simple Alert ---
  8  |   page.once('dialog', async (dialog) => {
  9  |     expect(dialog.message()).toBe('You clicked a button');
  10 |     await dialog.accept();
  11 |   });
  12 |   await page.locator('#alertButton').click();
  13 | 
  14 |   // --- 2. Timer Alert (Trigger click, then wait for dialog event) ---
  15 |   const dialogPromise = page.waitForEvent('dialog', { timeout: 10000 });
  16 |   await page.locator('#timerAlertButton').click();
  17 |   const timerDialog = await dialogPromise;
  18 |   expect(timerDialog.message()).toBe('This alert appeared after 5 seconds');
  19 |   await timerDialog.accept();
  20 | 
  21 |   // --- 3. Confirm Box (Cancel) ---
  22 |   page.once('dialog', async (dialog) => {
  23 |     expect(dialog.message()).toBe('Do you confirm action?');
  24 |     await dialog.dismiss();
  25 |   });
  26 |   await page.locator('#confirmButton').click();
  27 |   await expect(page.locator('#confirmResult')).toHaveText('You selected Cancel');
  28 | 
  29 |   // --- 4. Prompt Box ---
  30 |   const myName = 'Bala';
  31 |   page.once('dialog', async (dialog) => {
  32 |     expect(dialog.message()).toBe('Please enter your name?');
  33 |     await dialog.accept(myName);
  34 |   });
> 35 |   await page.locator('#promtButton').click();
     |                                      ^ Error: locator.click: Test ended.
  36 |   await expect(page.locator('#promptResult')).toHaveText(`You entered ${myName}`);
  37 | });
```