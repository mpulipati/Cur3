import fs from 'node:fs';
import path from 'node:path';
import { expect, test as setup } from '@playwright/test';
import { dismissGoogleConsent } from '../../src/utils/google-interstitial';

const authFile = path.join(process.cwd(), 'playwright', '.auth', 'blogspot.json');
const heading = (page: import('@playwright/test').Page) =>
  page.getByRole('heading', { name: 'Automation Testing Practice' });

setup('save Blogger session cookies', async ({ page }) => {
  await page.context().addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
  });

  fs.mkdirSync(path.dirname(authFile), { recursive: true });

  for (let attempt = 1; attempt <= 8; attempt++) {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await dismissGoogleConsent(page);

    try {
      await heading(page).waitFor({ state: 'visible', timeout: 15_000 });
      await page.context().storageState({ path: authFile });
      return;
    } catch {
      await page.waitForTimeout(8_000);
    }
  }

  await expect(heading(page), 'Google is still blocking GitHub Actions from Blogger').toBeVisible({
    timeout: 10_000,
  });
  await page.context().storageState({ path: authFile });
});
