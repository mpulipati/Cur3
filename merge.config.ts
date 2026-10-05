import { defineConfig } from '@playwright/test';

/**
 * Reporter config used when combining shard blob reports
 * with `npx playwright merge-reports`.
 */
export default defineConfig({
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
  ],
});
