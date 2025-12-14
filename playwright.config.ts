import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',
  outputDir: './tests/test-results',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: [['html', { outputFolder: './tests/playwright-report' }]],
  use: {
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'nextjs',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:3000',
      },
      testMatch: /.*\/(slot-tests|slot-errors)\.spec\.ts/,
    },
    {
      name: 'react-17',
      use: {
        ...devices['Desktop Chrome'],
        // vite dev = 5173, vite preview = 4173
        baseURL: isCI ? 'http://localhost:4173' : 'http://localhost:5173',
      },
      testMatch: /.*\/react-17\.spec\.ts/,
    },
  ],

  // Only start servers in CI; locally, run `pnpm dev` in apps manually
  // Apps should be pre-built in CI before running tests
  webServer: isCI
    ? [
        {
          command: 'pnpm --filter nextjs start',
          url: 'http://localhost:3000',
          reuseExistingServer: false,
          timeout: 60000,
        },
        {
          command: 'pnpm --filter react-17 preview --host',
          url: 'http://localhost:4173',
          reuseExistingServer: false,
          timeout: 60000,
        },
      ]
    : undefined,
});
