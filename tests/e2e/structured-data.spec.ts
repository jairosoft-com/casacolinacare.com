import { expect, test } from '@playwright/test';

test.describe('Schema.org Structured Data', () => {
  test('JSON-LD contains correct phone, fax, and address', async ({ page }) => {
    await page.goto('/');

    // eslint-disable-next-line playwright/prefer-web-first-assertions -- need raw text to parse JSON
    const scriptContent = await page
      .locator('script[type="application/ld+json"]')
      .textContent();

    expect(scriptContent).toBeTruthy();
    const jsonLd = JSON.parse(scriptContent!);

    // Telephone
    expect(jsonLd.telephone).toBe('+18082001840');

    // Fax number
    expect(jsonLd.faxNumber).toBe('+18086701163');

    // Street address
    expect(jsonLd.address.streetAddress).toBe('189 Anapalau Street');
    expect(jsonLd.address.streetAddress).not.toContain('(Hawaii Kai)');

    // Address locality
    expect(jsonLd.address.addressLocality).toBe('Honolulu');
  });
});
