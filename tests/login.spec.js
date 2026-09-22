  import { test, expect } from '@playwright/test';

test('login test', async ({ page }) => {
  // 1. Go to DemoBlaze homepage
  await page.goto('https://demoblaze.com/index.html');

  //2. click login button
  await page.click('#login2');
  //3.click on user name and enter user name
  await page.locator('#loginusername').fill('username');
  //4.click on password and enter password
  await page.locator('#loginpassword').fill('password');
  //5.click login button
await page.locator('xpath=//*[@id="logInModal"]/div/div/div[3]/button[2]').click();});