import { test, expect } from '@playwright/test';

test.describe('Slot Errors', () => {
  test('client component error cases log console errors', async ({ page }) => {
    const errors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/slot-errors');
    await page.waitForSelector('h1:text("Slot Errors")');

    // Only count client component error sections
    // Server component errors occur during build/SSR, not in the browser
    const clientErrorSections = page.locator('section[data-error-type="client"]');
    const clientSectionCount = await clientErrorSections.count();

    // Wait for errors to be logged
    await page.waitForTimeout(500);

    // Each client error section should produce at least one console error
    expect(errors.length).toBeGreaterThanOrEqual(clientSectionCount);
  });
});
