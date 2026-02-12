import { expect, test } from '@playwright/test';

test.describe('Console Error Check', () => {
  test('should have no console errors on home page', async ({ page }) => {
    const consoleErrors: string[] = [];
    const consoleWarnings: string[] = [];

    // Listen for console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
      if (msg.type() === 'warning') {
        consoleWarnings.push(msg.text());
      }
    });

    // Listen for page errors
    page.on('pageerror', error => {
      consoleErrors.push(error.message);
    });

    // Navigate to home page
    await page.goto('/');

    // Wait for page to be fully loaded
    await page.waitForLoadState('domcontentloaded');

    // Check for the header logo to ensure page rendered
    await expect(page.getByText('Casa Colina Care').first()).toBeVisible();

    // Report findings
    console.log('\n📊 Console Check Results:');
    console.log(`✓ Errors: ${consoleErrors.length}`);
    console.log(`✓ Warnings: ${consoleWarnings.length}`);

    if (consoleErrors.length > 0) {
      console.log('\n❌ Console Errors Found:');
      consoleErrors.forEach((error, i) => {
        console.log(`  ${i + 1}. ${error}`);
      });
    }

    if (consoleWarnings.length > 0) {
      console.log('\n⚠️  Console Warnings Found:');
      consoleWarnings.forEach((warning, i) => {
        console.log(`  ${i + 1}. ${warning}`);
      });
    }

    // Assert no errors
    expect(
      consoleErrors,
      `Found ${consoleErrors.length} console error(s)`,
    ).toHaveLength(0);
  });

  test('should load all required assets', async ({ page }) => {
    const failedRequests: string[] = [];

    // Listen for failed requests
    page.on('requestfailed', request => {
      failedRequests.push(`${request.method()} ${request.url()}`);
    });

    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Check that no requests failed
    console.log(`\n📡 Network Check: ${failedRequests.length} failed requests`);

    if (failedRequests.length > 0) {
      console.log('\n❌ Failed Requests:');
      failedRequests.forEach((req, i) => {
        console.log(`  ${i + 1}. ${req}`);
      });
    }

    expect(
      failedRequests,
      `Found ${failedRequests.length} failed request(s)`,
    ).toHaveLength(0);
  });
});
