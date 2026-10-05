import { expect, test } from '../src/fixtures/test-fixtures';

test.describe('Mouse and widget interactions', () => {
  test('toggles the dynamic start/stop button', async ({ homePage }) => {
    await expect(homePage.interactions.startStopButton).toHaveText('START');

    await homePage.interactions.toggleStartStop();
    await expect(homePage.interactions.startStopButton).toHaveText('STOP');

    await homePage.interactions.toggleStartStop();
    await expect(homePage.interactions.startStopButton).toHaveText('START');
  });

  test('shows hover menu items', async ({ homePage }) => {
    await homePage.interactions.hoverPointMe();

    await expect(homePage.interactions.hoverMenu.getByRole('link', { name: 'Mobiles' })).toBeVisible();
    await expect(homePage.interactions.hoverMenu.getByRole('link', { name: 'Laptops' })).toBeVisible();
  });

  test('copies field1 into field2 on double click', async ({ homePage }) => {
    await homePage.interactions.copyTextByDoubleClick();

    await expect(homePage.interactions.field2).toHaveValue('Hello World!');
  });

  test('drags the source onto the drop target', async ({ homePage }) => {
    await homePage.interactions.dragToTarget();

    await expect(homePage.interactions.droppable).toContainText('Dropped!');
  });
});
