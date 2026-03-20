import { expect, test } from '@playwright/test';

test.describe('About Page — Founder Name (US-006-01)', () => {
  test('displays correct founder name and not the old name', async ({
    page,
  }) => {
    await page.goto('/about');
    await expect(page.getByText('Kriss Aseniero')).toBeVisible();
    await expect(page.getByText('Kriss Judd')).toBeHidden();
  });
});
