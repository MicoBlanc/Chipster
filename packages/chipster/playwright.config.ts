import { defineConfig, devices } from '@playwright/test'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const port = process.env.PORT || 3000

export default defineConfig({
  testDir: path.join(__dirname, 'src/__tests__'),
  fullyParallel: false,
  webServer: {
    command: `pnpm run dev:test`,
    url: `http://localhost:${port}`,
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
    stderr: 'pipe',
    stdout: 'pipe'
  },
  use: {
    baseURL: `http://localhost:${port}`,
    trace: 'on-first-retry'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ],
  timeout: 10000,
  reporter: [['list'], ['html']]
}) 