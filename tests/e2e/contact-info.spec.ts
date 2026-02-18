import { expect, test } from '@playwright/test';

test.describe('Contact Page — Phone, Fax, and Address', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('TC-015: phone link has correct href and is visible', async ({
    page,
  }) => {
    const main = page.locator('main');
    const phoneLink = main.locator('a[href="tel:+18082001840"]');
    await expect(phoneLink).toBeVisible();
    await expect(phoneLink).toContainText('+1 (808) 200-1840');
  });

  test('TC-016: fax is visible but not clickable (not a link)', async ({
    page,
  }) => {
    const main = page.locator('main');
    const faxText = main.getByText('+1 (808) 670-1163');
    await expect(faxText).toBeVisible();

    // Fax must NOT be inside an <a> tag
    const faxLink = main.locator('a', { hasText: '+1 (808) 670-1163' });
    await expect(faxLink).toHaveCount(0);
  });

  test('TC-017: correct address displayed, old values absent', async ({
    page,
  }) => {
    const main = page.locator('main');
    await expect(
      main.getByText('189 Anapalau Street (Hawaii Kai)'),
    ).toBeVisible();
    await expect(main.getByText('Honolulu, HI 96825')).toBeVisible();

    // Old values must not exist in main content (footer is updated separately in US-003)
    const content = await main.textContent();
    expect(content).not.toContain('Anapalua');
    expect(content).not.toContain('(800) 888-8888');
  });
});
