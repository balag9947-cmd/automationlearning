import { test, expect } from '@playwright/test';

test('Verify all links on the page return a working status code', async ({ page, request }) => {
  // 1. Navigate to target URL
  await page.goto('https://medi.nigsoft.com/index.php');

  // 2. Extract all href values from <a> tags on the page
  const rawLinks = await page.locator('a').evaluateAll((anchors) =>
    anchors.map((a) => a.getAttribute('href')).filter(Boolean)
  );

  // 3. Filter out non-navigable links and deduplicate
  const validHrefs = rawLinks.filter((href) => {
    return (
      !href.startsWith('#') &&
      !href.startsWith('javascript:') &&
      !href.startsWith('mailto:') &&
      !href.startsWith('tel:')
    );
  });

  const uniqueLinks = [...new Set(validHrefs)];
  console.log(`Checking ${uniqueLinks.length} unique links...`);

  // 4. Validate each link using HTTP GET requests
  const brokenLinks = [];

  for (const href of uniqueLinks) {
    // Resolve relative paths (e.g., "prod.html?idp_=1") against the current URL
    const targetUrl = new URL(href, page.url()).href;

    try {
      const response = await request.get(targetUrl);
      const status = response.status();

      if (status >= 400) {
        brokenLinks.push({ url: targetUrl, status });
        console.error(`❌ BROKEN (${status}): ${targetUrl}`);
      } else {
        console.log(`✅ OK (${status}): ${targetUrl}`);
      }
    } catch (err) {
      brokenLinks.push({ url: targetUrl, status: err.message });
      console.error(`❌ NETWORK ERROR: ${targetUrl}`);
    }
  }

  // 5. Fail the test if any broken link was found
  expect(brokenLinks, `Found broken links: ${JSON.stringify(brokenLinks, null, 2)}`).toHaveLength(0);
});