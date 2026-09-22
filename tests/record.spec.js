import {test,expect} from '@playwright/test';
    test('',async ({page})=>{
      await page.goto('https://demoblaze.com/index.html');
      const expectedText='Sign up successful.';
      await page.locator("#signin2").click();
      await page.locator("#sign-username").fill('nothing special new');
      await page.locator("#sign-password").fill('123456');
      const dialogPromise = page.waitForEvent('dialog');
      await page.getByRole('button', { name: 'Sign up' }).click();
      const dialog = await dialogPromise;
      const actualText = dialog.message();
      await dialog.accept();
      expect(actualText).toBe(expectedText);
    });