import {test,expect} from '@playwright/test'
test('fill form ',async({page})=>{
    await page.goto('https://demoqa.com/automation-practice-form')
    await page.fill('#firstName','name');
    await page.fill('#lastName','useless');
    await page.fill('#userEmail','useless@gmail.com');
    await page.locator('#gender-radio-1').check();
    await page.fill('#userNumber','9899999999');
    await page.fill('#dateOfBirthInput','19-09-2026');
    await page.fill('#subjectsInput','useless');
    await page.locator('#hobbies-checkbox-1').check();
    await page.fill('#currentAddress','chennai house area 57');
    await page.locator('#uploadPicture').setInputFiles('C:/useless folder/tests/Screenshot 2026-09-18 151853.png');
    await page.locator('#state').click();
    await page.getByText('NCR', { exact: true }).click();
   await page.locator('#city').click();
   await page.getByText('Delhi', { exact: true }).click();
   await page.locator('#submit').click();
   await expect(page.locator('#example-modal-sizes-title-lg')).toBeVisible();
    await page.waitForTimeout(5000);
});
