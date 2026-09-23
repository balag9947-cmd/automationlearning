import {test,expect} from '@playwright/test';
test('selector test',async({page})=>{
    await page.goto('https://demoqa.com/selectable');
    const selector=page.locator('li:has-text("Cras justo odio")')
    await selector.click();
    await expect(selector).toHaveClass(/active/);
    await selector.click()
    await expect(selector).not.toHaveClass(/active/);
});
