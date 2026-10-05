import { expect, test } from '../src/fixtures/test-fixtures';

test.describe('Web tables', () => {
  test('reads book prices from the static table by author', async ({ homePage }) => {
    const prices = await homePage.tables.pricesForAuthor('Mukesh');

    expect(prices).toEqual([500, 3000]);
    await expect(homePage.tables.staticRowByBook('Learn Selenium')).toContainText('Amit');
  });

  test('reads a process metric from the dynamic table', async ({ homePage }) => {
    const chromeCpu = await homePage.tables.metricForProcess('Chrome', 'CPU (%)');

    expect(chromeCpu).toMatch(/^\d+(\.\d+)?%$/);
  });

  test('selects a product on a later pagination page', async ({ homePage }) => {
    await homePage.tables.goToProductPage('2');
    await homePage.tables.selectProduct('Television');

    await expect(homePage.tables.productRowByName('Television').locator('input[type="checkbox"]')).toBeChecked();
  });
});
