import { test, expect } from '@playwright/test';

// Helper function: Generates random alphabet characters
function getRandomLetters(length) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Helper function: Generates random alphanumeric characters
function getRandomAlphanum(length) {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Helper function: Generates a random number within a range
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

test('Create 10 random users in DemoQA WebTables', async ({ page }) => {
  await page.goto('https://demoqa.com/webtables');

  // Loop exactly 10 times
  for (let i = 0; i < 10; i++) {
    // 1. Generate the random data for this specific loop iteration
    const firstName = 'User'; 
    const lastName = getRandomLetters(8); 
    const email = `${getRandomAlphanum(8)}@email.com`; 
    const age = getRandomNumber(19, 50).toString(); 
    const salary = getRandomNumber(8000, 100000).toString(); 
    const department = `Dept${getRandomLetters(4)}`; 

    // 2. Open the modal
    await page.getByRole('button', { name: 'Add' }).click();
    
    // 3. Fill the form with the generated data
    await page.getByRole('textbox', { name: 'First Name' }).fill(firstName);
    await page.getByRole('textbox', { name: 'Last Name' }).fill(lastName);
    await page.getByRole('textbox', { name: 'name@example.com' }).fill(email);
    await page.getByRole('textbox', { name: 'Age' }).fill(age);
    await page.getByRole('textbox', { name: 'Salary' }).fill(salary);
    await page.getByRole('textbox', { name: 'Department' }).fill(department);
    
    // 4. Submit the modal
    await page.getByRole('button', { name: 'Submit' }).click();
  }
    await page.pause();
});
