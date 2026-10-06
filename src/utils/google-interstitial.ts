import { type Page } from '@playwright/test';

const CONSENT_BUTTON = /^(Accept all|I agree|I accept|Got it)$/i;
const BOT_WALL = /unusual traffic|not a robot|sorry\/index|recaptcha/i;

export async function dismissGoogleConsent(page: Page): Promise<void> {
  const clickIfVisible = async (locator: ReturnType<Page['getByRole']>): Promise<boolean> => {
    try {
      await locator.first().click({ timeout: 2_000 });
      return true;
    } catch {
      return false;
    }
  };

  if (await clickIfVisible(page.getByRole('button', { name: CONSENT_BUTTON }))) {
    return;
  }

  const consentFrame = page.frameLocator('iframe[src*="consent.google"]');
  await clickIfVisible(consentFrame.getByRole('button', { name: CONSENT_BUTTON }));
}

export async function isGoogleBotWall(page: Page): Promise<boolean> {
  const title = await page.title();
  const url = page.url();
  let body = '';
  try {
    body = await page.locator('body').innerText({ timeout: 2_000 });
  } catch {
    body = '';
  }

  return (
    title.startsWith('https://') ||
    /google\.com\/sorry/i.test(url) ||
    BOT_WALL.test(`${title}\n${body}`)
  );
}
