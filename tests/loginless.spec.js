import {test,expect} from'@playwright/test'
test('login/signuptest',async({page})=>{
    await page.goto('https://balag9947-cmd.github.io/login/login.html')
    await expect(page).toHaveURL('https://balag9947-cmd.github.io/login/login.html')
    await page.fill('#usrnam','useless')
    await page.fill('#pass','useless@2004')
     page.on('dialog', dialog => dialog.accept());
    await page.getByRole('button', { name: 'login' }).click()
    await page.waitForTimeout(3000)
})

