import { expect, test } from '@playwright/test';

test.describe('Home Page', () => {
  test('should display core page elements', async ({ page }) => {
    await page.goto('/');

    // Header logo is visible
    await expect(page.getByText('Casa Colina Care').first()).toBeVisible();

    // Hero heading is visible
    await expect(page.getByText('Compassionate Care in the')).toBeVisible();

    // Primary CTA is visible
    await expect(
      page.getByRole('link', { name: 'Request a Consultation' }),
    ).toBeVisible();
  });
});
