import { expect, test } from '../src/fixtures/test-fixtures';
import { wikipediaQuery } from '../src/testdata/form.data';

test.describe('Wikipedia search and Shadow DOM', () => {
  test('returns Wikipedia search results', async ({ homePage }) => {
    await homePage.wikipedia.search(wikipediaQuery);

    await expect(homePage.wikipedia.resultLinks().first()).toBeVisible();
    await expect(homePage.wikipedia.resultLinks().first()).toContainText(/playwright/i);
  });

  test('reads and updates Shadow DOM controls', async ({ homePage }) => {
    await expect(homePage.shadowDom.content()).toHaveText('Mobiles');

    await homePage.shadowDom.textInput().fill('Shadow input');
    await homePage.shadowDom.checkbox().check();

    await expect(homePage.shadowDom.textInput()).toHaveValue('Shadow input');
    await expect(homePage.shadowDom.checkbox()).toBeChecked();
  });
});
