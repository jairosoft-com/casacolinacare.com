import { expect, test } from '@playwright/test';

test.describe('Logo Font Consistency (US-008-04)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('header logo renders in Playfair Display font', async ({ page }) => {
    const headerLogo = page
      .locator('header')
      .getByRole('link', { name: /casa colina care/i });
    await expect(headerLogo).toBeVisible();

    const fontFamily = await headerLogo.evaluate(
      el => getComputedStyle(el).fontFamily,
    );
    expect(fontFamily.toLowerCase()).toContain('playfair');
  });

  test('footer logo renders in Playfair Display font', async ({ page }) => {
    const footer = page.getByRole('contentinfo');
    const footerLogo = footer.getByRole('heading', {
      name: /casa colina care/i,
    });
    await expect(footerLogo).toBeVisible();

    const fontFamily = await footerLogo.evaluate(
      el => getComputedStyle(el).fontFamily,
    );
    expect(fontFamily.toLowerCase()).toContain('playfair');
  });

  test('mobile nav logo renders in Playfair Display font', async ({ page }) => {
    // Set mobile viewport to show the mobile menu button
    await page.setViewportSize({ width: 375, height: 812 });

    const menuButton = page.getByRole('button', { name: /toggle menu/i });
    await expect(menuButton).toBeVisible();
    await menuButton.click();

    const sheetTitle = page.getByText('Casa Colina Care', { exact: true });
    await expect(sheetTitle.first()).toBeVisible();

    const fontFamily = await sheetTitle
      .first()
      .evaluate(el => getComputedStyle(el).fontFamily);
    expect(fontFamily.toLowerCase()).toContain('playfair');
  });

  test('all three logo instances use the same font family', async ({
    page,
  }) => {
    // Get header logo font
    const headerLogo = page
      .locator('header')
      .getByRole('link', { name: /casa colina care/i });
    const headerFont = await headerLogo.evaluate(
      el => getComputedStyle(el).fontFamily,
    );

    // Get footer logo font
    const footer = page.getByRole('contentinfo');
    const footerLogo = footer.getByRole('heading', {
      name: /casa colina care/i,
    });
    const footerFont = await footerLogo.evaluate(
      el => getComputedStyle(el).fontFamily,
    );

    // Get mobile nav logo font
    await page.setViewportSize({ width: 375, height: 812 });
    const menuButton = page.getByRole('button', { name: /toggle menu/i });
    await menuButton.click();
    const sheetTitle = page.getByText('Casa Colina Care', { exact: true });
    await expect(sheetTitle.first()).toBeVisible();
    const mobileFont = await sheetTitle
      .first()
      .evaluate(el => getComputedStyle(el).fontFamily);

    // All three should match
    expect(headerFont).toBe(footerFont);
    expect(headerFont).toBe(mobileFont);
  });
});
