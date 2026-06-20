import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  timeout: 90000,
  fullyParallel: false,
  forbidOnly: !!process.env['CI'],
  retries: process.env['CI'] ? 2 : 0,
  workers: 1, // Run sequentially to avoid DB seed/state clashes in E2E
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3003',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npx nx run launcher:dev',
    url: 'http://localhost:3003',
    reuseExistingServer: true,
    timeout: 60000,
  },
})
