import { test, expect } from '@playwright/test';

test.describe('Slot Tests - Simple asChild', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/slot-tests');
  });

  // Simple slots: just render children, no wrapping content
  const simpleTests = [
    'Client.LinkButton',
    'Client.Button as Client.Link',
    'Client.Button as Server.Link',
    'Server.LinkButton',
    'Server.Button as Server.Link',
    'Server.Button as Client.Link',
  ];

  for (const name of simpleTests) {
    test(`${name} renders as link with children`, async ({ page }) => {
      const section = page.locator('section', {
        has: page.locator(`h2:text-is("${name}")`),
      });
      const link = section.locator('a[href="/"]');
      await expect(link).toBeVisible();
      await expect(link).toHaveText('children');
    });
  }
});

test.describe('Slot Tests - LinkSlottable (left children right)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/slot-tests');
  });

  // LinkSlottable wraps content: <span>left</span> {children} <span>right</span>
  const linkSlottableTests = [
    'Client.Button as Client.LinkSlottable',
    'Client.Button as Server.LinkSlottable',
    'Server.Button as Server.LinkSlottable',
    'Server.Button as Client.LinkSlottable',
  ];

  for (const name of linkSlottableTests) {
    test(`${name} renders link with left/children/right`, async ({ page }) => {
      const section = page.locator('section', {
        has: page.locator(`h2:text-is("${name}")`),
      });
      const link = section.locator('a[href="/"]');
      await expect(link).toBeVisible();
      // Should have: left children right
      await expect(link).toContainText('left');
      await expect(link).toContainText('children');
      await expect(link).toContainText('right');
      // Verify structure: span > left, then children, then span > right
      await expect(link.locator('span').first()).toHaveText('left');
      await expect(link.locator('span').last()).toHaveText('right');
    });
  }
});

test.describe('Slot Tests - ButtonSlottable (left children right)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/slot-tests');
  });

  // ButtonSlottable wraps content: <span>left</span> {children} <span>right</span>
  const buttonSlottableTests = [
    'Client.ButtonSlottable as Server.Link',
    'Client.ButtonSlottable as Client.Link',
    'Server.ButtonSlottable as Client.Link',
    'Server.ButtonSlottable as Server.Link',
  ];

  for (const name of buttonSlottableTests) {
    test(`${name} renders link with left/children/right`, async ({ page }) => {
      const section = page.locator('section', {
        has: page.locator(`h2:text-is("${name}")`),
      });
      const link = section.locator('a[href="/"]');
      await expect(link).toBeVisible();
      await expect(link).toContainText('left');
      await expect(link).toContainText('children');
      await expect(link).toContainText('right');
      await expect(link.locator('span').first()).toHaveText('left');
      await expect(link.locator('span').last()).toHaveText('right');
    });
  }
});

test.describe('Slot Tests - ButtonNestedSlottable (left bold-children right)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/slot-tests');
  });

  // ButtonNestedSlottable: <span>left</span><b>bold {children}</b><span>right</span>
  const nestedSlottableTests = [
    'Client.ButtonNestedSlottable as Server.Link',
    'Client.ButtonNestedSlottable as Client.Link',
    'Server.ButtonNestedSlottable as Client.Link',
    'Server.ButtonNestedSlottable as Server.Link',
  ];

  for (const name of nestedSlottableTests) {
    test(`${name} renders link with left/bold-children/right`, async ({ page }) => {
      const section = page.locator('section', {
        has: page.locator(`h2:text-is("${name}")`),
      });
      const link = section.locator('a[href="/"]');
      await expect(link).toBeVisible();
      await expect(link).toContainText('left');
      await expect(link).toContainText('right');
      // Bold should contain "bold children"
      const bold = link.locator('b');
      await expect(bold).toBeVisible();
      await expect(bold).toContainText('bold children');
    });
  }
});

test.describe('Slot Tests - IconButtonNestedSlottable (ICON bold-children)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/slot-tests');
  });

  // IconButtonNestedSlottable: <span>ICON</span><b>bold {children}</b>
  const iconButtonTests = [
    'Client.IconButtonNestedSlottable as Server.Link',
    'Client.IconButtonNestedSlottable as Client.Link',
    'Server.IconButtonNestedSlottable as Server.Link',
    'Server.IconButtonNestedSlottable as Client.Link',
  ];

  for (const name of iconButtonTests) {
    test(`${name} renders link with ICON/bold-children`, async ({ page }) => {
      const section = page.locator('section', {
        has: page.locator(`h2:text-is("${name}")`),
      });
      const link = section.locator('a[href="/"]');
      await expect(link).toBeVisible();
      // Should have ICON span
      await expect(link.locator('span:text("ICON")')).toBeVisible();
      // Bold should contain "bold children"
      const bold = link.locator('b');
      await expect(bold).toBeVisible();
      await expect(bold).toContainText('bold children');
    });
  }
});

test.describe('Slot Tests - ButtonSiblingSlottable (left children right)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/slot-tests');
  });

  // ButtonSiblingSlottable: <span>left</span><Slottable>{children}</Slottable><span>right</span>
  const siblingSlottableTests = [
    'Client.ButtonSiblingSlottable as Server.Link',
    'Client.ButtonSiblingSlottable as Client.Link',
    'Server.ButtonSiblingSlottable as Server.Link',
    'Server.ButtonSiblingSlottable as Client.Link',
  ];

  for (const name of siblingSlottableTests) {
    test(`${name} renders link with left/children/right`, async ({ page }) => {
      const section = page.locator('section', {
        has: page.locator(`h2:text-is("${name}")`),
      });
      const link = section.locator('a[href="/"]');
      await expect(link).toBeVisible();
      await expect(link).toContainText('left');
      await expect(link).toContainText('children');
      await expect(link).toContainText('right');
      await expect(link.locator('span').first()).toHaveText('left');
      await expect(link.locator('span').last()).toHaveText('right');
    });
  }
});

test.describe('Slot Tests - ButtonRender (render prop pattern)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/slot-tests');
  });

  const renderTests = [
    'Client.ButtonRender rendered as Client.Link element',
    'Client.ButtonRender rendered as Server.Link element',
    'Client.ButtonRenderProp render function as Client.Link',
    'Server.ButtonRender rendered as Client.Link element',
    'Server.ButtonRender rendered as Server.Link element',
    'Server.ButtonRender render function as Server.Link element',
    'Server.ButtonRender render function as Client.Link element',
  ];

  for (const name of renderTests) {
    test(`${name} renders as link with children`, async ({ page }) => {
      const section = page.locator('section', {
        has: page.locator(`h2:text-is("${name}")`),
      });
      const link = section.locator('a[href="/"]');
      await expect(link).toBeVisible();
      await expect(link).toHaveText('children');
    });
  }
});

test.describe('Slot Tests - ButtonNestedRender (nested render prop pattern)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/slot-tests');
  });

  // ButtonNestedRender: <span>ICON</span><b>bold {children}</b>
  const nestedRenderTests = [
    'Client.ButtonNestedRenderProp render function as Client.Link',
    'Server.ButtonNestedRender render function as Server.Link',
    'Server.ButtonNestedRender render function as Client.Link',
  ];

  for (const name of nestedRenderTests) {
    test(`${name} renders link with ICON/bold-children`, async ({ page }) => {
      const section = page.locator('section', {
        has: page.locator(`h2:text-is("${name}")`),
      });
      const link = section.locator('a[href="/"]');
      await expect(link).toBeVisible();
      // Should have ICON span
      await expect(link.locator('span:text("ICON")')).toBeVisible();
      // Bold should contain "bold children"
      const bold = link.locator('b');
      await expect(bold).toBeVisible();
      await expect(bold).toContainText('bold children');
    });
  }
});

test.describe('Slot Tests - ButtonRenderAsChildren (as=children, children=children)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/slot-tests');
  });

  // Backwards compat: passing props.children to both `as` and Slottable children
  const backwardsCompatTests = [
    'Client.ButtonRenderAsChildren (as=children, children=children)',
    'Server.ButtonRenderAsChildren (as=children, children=children)',
  ];

  for (const name of backwardsCompatTests) {
    test(`${name} renders as link with children`, async ({ page }) => {
      const section = page.locator('section', {
        has: page.locator(`h2:text-is("${name}")`),
      });
      const link = section.locator('a[href="/"]');
      await expect(link).toBeVisible();
      await expect(link).toHaveText('children');
    });
  }
});

test.describe('Composition Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/slot-tests');
  });

  test('className merging combines both classes', async ({ page }) => {
    const section = page.locator('[data-testid="composition-classname"]');
    const anchor = section.locator('a');

    await expect(anchor).toBeVisible();
    const className = await anchor.getAttribute('class');
    expect(className).toContain('outer-class');
    expect(className).toContain('host-class');
  });

  test('style merging combines both styles with host overriding conflicts', async ({ page }) => {
    const section = page.locator('[data-testid="composition-style"]');
    const anchor = section.locator('a');

    await expect(anchor).toBeVisible();
    await expect(anchor).toHaveCSS('color', 'rgb(255, 0, 0)'); // red from outer
    await expect(anchor).toHaveCSS('background-color', 'rgb(0, 0, 255)'); // blue from host
    await expect(anchor).toHaveCSS('padding', '20px'); // host overrides
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

    await page.goto('/slot-tests');
    await page.waitForSelector('[data-testid="composition-refs"]');
    await page.waitForTimeout(100);

    expect(messages).toContain('outer ref received');
    expect(messages).toContain('host ref received');
  });

  test('prop override works correctly', async ({ page }) => {
    const section = page.locator('[data-testid="composition-props"]');
    const anchor = section.locator('a');

    await expect(anchor).toBeVisible();
    await expect(anchor).toHaveAttribute('data-outer', 'outer-value');
    await expect(anchor).toHaveAttribute('data-host', 'host-value');
    await expect(anchor).toHaveAttribute('data-shared', 'host');
  });
});
