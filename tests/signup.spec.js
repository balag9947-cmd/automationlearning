import {test,expect} from '@playwright/test';
test('sign up test',async({page})=>{
    await page.goto('https://demoblaze.com/index.html');
    const expectedText = 'Please fill out Username and Password.';
    await page.locator("//a[@id='signin2']").click();
    const dialogPromise = page.waitForEvent('dialog');
    await page.getByRole('button', { name: /Sign up/i }).click();
    const dialog = await dialogPromise;
    const actualText = dialog.message();
    await dialog.accept();
    expect(actualText).toBe(expectedText);

});
