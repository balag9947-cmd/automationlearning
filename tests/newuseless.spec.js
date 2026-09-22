import {test,expect} from'@playwright/test'
test('login/signuptest',async({page})=>{
    await page.goto('https://balag9947-cmd.github.io/login/login.html')
    await page.getByRole('link', { name: 'signup' }).click()
    await expect(page).toHaveURL('https://balag9947-cmd.github.io/login/signup.html')
    await page.fill('#username','useless')
    await page.fill('#email','useless04@gmail.com')
    await page.fill('#password','Useless@2004')
    await page.fill('#role','useless')
    page.on('dialog', dialog => dialog.accept());
    await page.getByRole('button',{name:'Sign Up'}).click()
    await page.getByRole('link', { name:'login here'}).click()
    await expect(page).toHaveURL('https://balag9947-cmd.github.io/login/login.html')
    await page.fill('#usrnam','useless')
    await page.fill('#pass','useless@2004')
    page.on('dialog', dialog => dialog.accept());
    await page.getByRole('button', { name: 'login' }).click()
    await expect(page).toHaveURL('https://balag9947-cmd.github.io/login/index.html')
    await page.waitForTimeout(3000)
})