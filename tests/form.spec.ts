import path from 'node:path';
import { expect, test } from '../src/fixtures/test-fixtures';
import { dateRange, sampleUser } from '../src/testdata/form.data';

test.describe('GUI form', () => {
  test('fills personal details, gender, days, and dropdowns', async ({ homePage }) => {
    await homePage.form.fillUserDetails(sampleUser);

    await expect(homePage.form.name).toHaveValue(sampleUser.name);
    await expect(homePage.form.email).toHaveValue(sampleUser.email);
    await expect(homePage.form.phone).toHaveValue(sampleUser.phone);
    await expect(homePage.form.address).toHaveValue(sampleUser.address);
    await expect(homePage.form.gender(sampleUser.gender)).toBeChecked();

    for (const day of sampleUser.days) {
      await expect(homePage.form.day(day)).toBeChecked();
    }

    await expect(homePage.form.country).toHaveValue('india');
    await expect(homePage.form.colors).toHaveValues(sampleUser.colors);
    await expect(homePage.form.animals).toHaveValues(sampleUser.animals);
  });

  test('calculates the selected date range', async ({ homePage }) => {
    await homePage.form.submitDateRange(dateRange.start, dateRange.end);

    await expect(homePage.form.dateRangeResult).toContainText(
      `You selected a range of ${dateRange.expectedDays} days.`,
    );
  });
});
