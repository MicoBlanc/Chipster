import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/__tests__/e2e',
  webServer: {
    command: 'pnpm run dev:test',
    port: 3001,
    reuseExistingServer: !process.env.CI,
    timeout: 60000
  },
  use: {
    baseURL: 'http://localhost:3001',
    actionTimeout: 10000,
    navigationTimeout: 10000,
  },
  expect: {
    timeout: 10000
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
}); 