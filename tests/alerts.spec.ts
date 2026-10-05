import { expect, test } from '../src/fixtures/test-fixtures';

test.describe('Alerts and windows', () => {
  test('accepts the simple alert', async ({ homePage }) => {
    const message = await homePage.alerts.clickAndAccept(homePage.alerts.simpleAlert);
    expect(message).toBe('I am an alert box!');
  });

  test('accepts the confirmation alert', async ({ homePage }) => {
    const message = await homePage.alerts.clickAndAccept(homePage.alerts.confirmAlert);

    expect(message).toBe('Press a button!');
    await expect(homePage.alerts.dialogMessage).toHaveText('You pressed OK!');
  });

  test('dismisses the confirmation alert', async ({ homePage }) => {
    const message = await homePage.alerts.clickAndDismiss(homePage.alerts.confirmAlert);

    expect(message).toBe('Press a button!');
    await expect(homePage.alerts.dialogMessage).toHaveText('You pressed Cancel!');
  });

  test('submits a prompt value', async ({ homePage }) => {
    const message = await homePage.alerts.clickAndAccept(homePage.alerts.promptAlert, 'Manoj');

    expect(message).toBe('Please enter your name:');
    await expect(homePage.alerts.dialogMessage).toHaveText('Hello Manoj! How are you today?');
  });

  test('opens a new tab', async ({ homePage, context }) => {
    const pagePromise = context.waitForEvent('page');
    await homePage.alerts.newTab.click();
    const newPage = await pagePromise;

    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL(/.+/);
    await newPage.close();
  });
});
