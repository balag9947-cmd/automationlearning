import { test, expect } from '@playwright/test';

test('Nigsoft Medi - Product creation, inventory entry, and deletion workflow', async ({ page }) => {
  // 1. Login
  await page.goto('https://medi.nigsoft.com/index.php'); //
  await page.locator('#username').fill('kas23@gmail.com'); // Replace with your actual credentials
  // Add password field if required by your login screen
  await page.locator('#password').fill('123456');
  await page.locator('#loginbtn').click(); //

  // Verify dashboard navigation
  await expect(page).toHaveURL(/.*billdashboard\.php/); //

  // 2. Navigate to Products and Open Add Product Form
  await page.getByRole('link', { name: 'Products' }).click(); 
  await page.getByRole('link', { name: 'Add Product' }).click(); 

  // 3. Fill Product Details
  await page.locator('#product_name').fill('TABLET TT'); 
  await page.locator('#medicine_type').selectOption({ label: 'Injection' }); 
  await page.locator('#drug_priority').selectOption({ label: 'X' }); 

  // Helper function for Select2 searchable dropdowns
  const selectSearchableOption = async (containerSelector, searchText) => {
    await page.locator(containerSelector).click();
    await page.locator('input.select2-search__field').fill(searchText);
    await page.keyboard.press('Enter');
  };

  // Select Combination Name
  await selectSearchableOption('#select2-combination_name-container', 'ryles tube'); 

  // Select Manufacture Name
  await selectSearchableOption('#select2-manufacture_name-container', 'sai'); 

  // Select Location Name
  await selectSearchableOption('#select2-location_name-container', 'sai'); 

  await page.locator('#hsn_code').fill('JEJE093'); 
  await page.locator('#product_type').selectOption({ label: 'MEDICAL TYPE' }); 
  await page.locator('#reorder_qty').fill('100'); 
  await page.locator('#add_product').click(); 

  // 4. Pharmacy Item Inventory Entry
  await page.getByRole('link', { name: 'Items' }).click(); 
  await page.goto('https://medi.nigsoft.com/users/pharmacy_item_entry.php?page=product&branch_id=MA=='); 

  // Select Product in Inventory Form
  await selectSearchableOption('#select2-nameProduct-container', 'TABLET TT'); 

  // Populate Quantities and Pricing
  await page.locator('#pack_qty').fill('10'); 
  await page.locator('#totalqty').fill('10'); 
  await page.locator('#mrp_price').fill('10'); 
  await page.locator('#cost').fill('10'); 
  await page.locator('input[name="batch"]').fill('10'); 
  await page.locator('#exp_date').fill('2026-12');
  await page.locator('#submit').click(); 
  // 5. Search for the newly added Product

  await page.waitForLoadState('networkidle');

  // 3. Now safely navigate to the product page
  await page.goto('https://medi.nigsoft.com/users/product.php', { waitUntil: 'domcontentloaded' });

  // 4. Search and filter
  await page.locator('#select2-category_name_select-container').click();
  await page.locator('input.select2-search__field').fill('TABLET TT');
  await page.keyboard.press('Enter');
  await page.locator('#applyFilterBtn').click();
});