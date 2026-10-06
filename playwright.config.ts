import { defineConfig, devices } from '@playwright/test';
import { env } from './src/config/env';

const storageState = process.env.BLOGSPOT_STORAGE;
const useChrome = Boolean(process.env.CI || process.env.PW_CHANNEL === 'chrome');

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: env.defaultTimeoutMs,
  expect: {
    timeout: 10_000,
  },
  reporter: process.env.CI
    ? [
        ['blob', { outputDir: 'blob-report' }],
        ['github'],
        ['list'],
      ]
    : [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: env.baseURL,
    actionTimeout: 15_000,
    navigationTimeout: 45_000,
    locale: 'en-US',
    screenshot: 'only-on-failure',
    video: process.env.CI ? 'retain-on-failure' : 'off',
    trace: 'on-first-retry',
    launchOptions: {
      args: ['--disable-blink-features=AutomationControlled'],
    },
    ...(storageState ? { storageState } : {}),
  },
  projects: [
    {
      name: 'setup',
      testMatch: /blogspot\.setup\.ts/,
      timeout: 180_000,
      use: {
        ...devices['Desktop Chrome'],
        ...(useChrome ? { channel: 'chrome' as const } : {}),
        headless: false,
      },
    },
    {
      name: 'chromium',
      testIgnore: /blogspot\.setup\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        ...(useChrome ? { channel: 'chrome' as const } : {}),
        ...(process.env.CI ? { headless: false } : {}),
      },
    },
  ],
});
