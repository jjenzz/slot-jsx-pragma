import { test, expect } from '@playwright/test';

test.describe('React 17 Compatibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('basic slot renders as anchor tag', async ({ page }) => {
    const section = page.locator('[data-testid="basic-slot"]');
    const anchor = section.locator('a');

    await expect(anchor).toBeVisible();
    await expect(anchor).toHaveAttribute('href', 'https://example.com');
    await expect(anchor).toHaveAttribute('target', '_blank');
  });

  test('refs work correctly in React 17', async ({ page }) => {
    const messages: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'log') {
        messages.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForSelector('[data-testid="basic-slot"]');
    await page.waitForTimeout(100);

    // Both button ref and anchor ref should be logged
    expect(messages).toContain('button ref');
    expect(messages).toContain('anchor ref');
  });
});

test.describe('React 17 Composition Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('className merging combines both classes', async ({ page }) => {
    const section = page.locator('[data-testid="composition-classname"]');
    const anchor = section.locator('a');

    await expect(anchor).toBeVisible();

    // Button adds "cta" class, outer adds "outer-class", host adds "host-class"
    const className = await anchor.getAttribute('class');
    expect(className).toContain('cta');
    expect(className).toContain('outer-class');
    expect(className).toContain('host-class');
  });

  test('style merging combines both styles with host overriding conflicts', async ({ page }) => {
    const section = page.locator('[data-testid="composition-style"]');
    const anchor = section.locator('a');

    await expect(anchor).toBeVisible();

    // Check that both styles are applied
    await expect(anchor).toHaveCSS('color', 'rgb(255, 0, 0)'); // red from outer
    await expect(anchor).toHaveCSS('background-color', 'rgb(0, 0, 255)'); // blue from host
    // Host padding (20px) should override outer padding (10px)
    await expect(anchor).toHaveCSS('padding', '20px');
  });

  test('event handler merging calls both handlers in correct order', async ({ page }) => {
    const messages: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'log') {
        messages.push(msg.text());
      }
    });

    const section = page.locator('[data-testid="composition-events"]');
    const anchor = section.locator('a');

    await expect(anchor).toBeVisible();
    await anchor.click();
    await page.waitForTimeout(100);

    expect(messages).toContain('host handler fired');
    expect(messages).toContain('outer handler fired');

    // Verify order: host fires before outer
    const hostIndex = messages.indexOf('host handler fired');
    const outerIndex = messages.indexOf('outer handler fired');
    expect(hostIndex).toBeLessThan(outerIndex);
  });

  test('ref merging provides element to both refs', async ({ page }) => {
    const messages: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'log') {
        messages.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForSelector('[data-testid="composition-refs"]');
    await page.waitForTimeout(100);

    expect(messages).toContain('outer ref received');
    expect(messages).toContain('host ref received');
  });

  test('prop override works correctly', async ({ page }) => {
    const section = page.locator('[data-testid="composition-props"]');
    const anchor = section.locator('a');

    await expect(anchor).toBeVisible();

    // Both data attributes should be present
    await expect(anchor).toHaveAttribute('data-outer', 'outer-value');
    await expect(anchor).toHaveAttribute('data-host', 'host-value');

    // Host should override shared attribute
    await expect(anchor).toHaveAttribute('data-shared', 'host');
  });
});
