import { test as base, expect } from '@playwright/test';
import { PracticeHomePage } from '../pages/practice-home.page';

type PracticeFixtures = {
  homePage: PracticeHomePage;
};

export const test = base.extend<PracticeFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new PracticeHomePage(page);
    await homePage.open();
    await use(homePage);
  },
});

export { expect };
