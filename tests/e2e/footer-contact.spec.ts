import { expect, test } from '@playwright/test';

test.describe('Footer — Phone, Fax, and Address (US-003)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('TC-028: footer phone link has correct href and text', async ({
    page,
  }) => {
    const footer = page.getByRole('contentinfo');
    const phoneLink = footer.locator('a[href="tel:+18082001840"]');
    await expect(phoneLink).toBeVisible();
    await expect(phoneLink).toContainText('+1 (808) 200-1840');
  });

  test('TC-029: footer fax is visible but not a link', async ({ page }) => {
    const footer = page.getByRole('contentinfo');
    await expect(footer.getByText('+1 (808) 670-1163')).toBeVisible();

    // Fax must NOT be inside an <a> tag
    const faxLink = footer.locator('a', { hasText: '+1 (808) 670-1163' });
    await expect(faxLink).toHaveCount(0);
  });

  test('TC-030: footer address is correct, old values absent', async ({
    page,
  }) => {
    const footer = page.getByRole('contentinfo');
    await expect(
      footer.getByText('189 Anapalau Street (Hawaii Kai)'),
    ).toBeVisible();
    await expect(footer.getByText('Honolulu, HI 96825')).toBeVisible();

    // Old values must not exist in footer
    const footerText = await footer.textContent();
    expect(footerText).not.toContain('Anapalua');
    expect(footerText).not.toContain('(800) 888-8888');
    expect(footerText).not.toContain('Hawaii Kai, HI 96825');
  });
});
