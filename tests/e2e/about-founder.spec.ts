import { expect, test } from '@playwright/test';

test.describe('About Page — Founder Name (US-006-01)', () => {
  test('displays correct founder name and not the old name', async ({
    page,
  }) => {
    await page.goto('/about');
    await expect(page.getByText('Kriss Aseniero')).toBeVisible();
    await expect(page.getByText('Kriss Judd')).toBeHidden();
  });

  test('displays correct founder title "Founder & CEO" (US-206771)', async ({
    page,
  }) => {
    await page.goto('/about');
    await expect(page.getByText('Founder & CEO')).toBeVisible();
    await expect(page.getByText('Founder & Director')).toBeHidden();
  });
});
