import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.BASE_URL || 'http://leaftaps.com/opentaps';

export default defineConfig({
  globalSetup: require.resolve('./support/globalSetup'),
  testDir: './tests',
  timeout: 30 * 1000,
  expect: { timeout: 5000 },
  retries: 0,
  reporter: [['list'], ['html', { outputFolder: 'reports', open: 'never' }]],
  projects: [
    {
      name: 'Leaftaps',
      use: { ...devices['Desktop Chrome'] },
    }
  ],
  use: {
    baseURL,
    headless: false,
    screenshot: 'on',
    video: 'on',
    trace: 'on'
  },
  outputDir: 'test-results/',
});
