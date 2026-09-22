import {test,expect} from'@playwright/test';
test('navigation test',async({page})=>{
    await page.goto('https://demoblaze.com/index.html');
    await page.getByRole('link',{name:'Samsung galaxy s6'}).click();
    await expect(page).toHaveURL('https://demoblaze/prod.html?idp_=?');
});