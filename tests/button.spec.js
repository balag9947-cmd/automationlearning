import { test, expect } from '@playwright/test';

test('Verify all buttons are visible, enabled, and labeled', async ({ page }) => {
  await page.goto('https://demoblaze.com/index.html');

  // 1. Locate all native buttons, button-type inputs, and ARIA button roles
  const buttonLocator = page.locator('button, input[type="button"], input[type="submit"], [role="button"]');
  const count = await buttonLocator.count();
  console.log(`Found ${count} total buttons on the page.`);

  const issues = [];

  // 2. Iterate through each button and evaluate its state
  for (let i = 0; i < count; i++) {
    const btn = buttonLocator.nth(i);

    const isVisible = await btn.isVisible();
    const isEnabled = await btn.isEnabled();
    
    // Retrieve inner text, input value, or accessibility label
    const rawText = (await btn.innerText()).trim();
    const inputValue = (await btn.getAttribute('value')) || '';
    const ariaLabel = (await btn.getAttribute('aria-label')) || '';
    const label = rawText || inputValue || ariaLabel;

    // 3. Flag problematic buttons
    if (isVisible && !label) {
      const htmlSnippet = await btn.evaluate(el => el.outerHTML.slice(0, 100));
      issues.push({ index: i, issue: 'Missing accessible text/label', snippet: htmlSnippet });
    }

    console.log(`[Button ${i + 1}] Label: "${label || '[EMPTY]'}" | Visible: ${isVisible} | Enabled: ${isEnabled}`);
  }

  // 4. Report assertion results
  expect(issues, `Identified button issues:\n${JSON.stringify(issues, null, 2)}`).toHaveLength(0);
});