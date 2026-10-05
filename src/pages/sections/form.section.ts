import { type Locator, type Page } from '@playwright/test';
import type { Gender, UserFormData, Weekday } from '../../testdata/form.data';

export class FormSection {
  readonly name: Locator;
  readonly email: Locator;
  readonly phone: Locator;
  readonly address: Locator;
  readonly country: Locator;
  readonly colors: Locator;
  readonly animals: Locator;
  readonly datepicker: Locator;
  readonly txtDate: Locator;
  readonly startDate: Locator;
  readonly endDate: Locator;
  readonly dateRangeSubmit: Locator;
  readonly dateRangeResult: Locator;

  constructor(private readonly page: Page) {
    this.name = page.locator('#name');
    this.email = page.locator('#email');
    this.phone = page.locator('#phone');
    this.address = page.locator('#textarea');
    this.country = page.locator('#country');
    this.colors = page.locator('#colors');
    this.animals = page.locator('#animals');
    this.datepicker = page.locator('#datepicker');
    this.txtDate = page.locator('#txtDate');
    this.startDate = page.locator('#start-date');
    this.endDate = page.locator('#end-date');
    this.dateRangeSubmit = page.locator('button.submit-btn');
    this.dateRangeResult = page.locator('#result');
  }

  gender(value: Gender): Locator {
    return this.page.locator(`#${value}`);
  }

  day(value: Weekday): Locator {
    return this.page.locator(`#${value}`);
  }

  async fillUserDetails(data: UserFormData): Promise<void> {
    await this.name.fill(data.name);
    await this.email.fill(data.email);
    await this.phone.fill(data.phone);
    await this.address.fill(data.address);
    await this.gender(data.gender).check();

    for (const weekday of data.days) {
      await this.day(weekday).check();
    }

    await this.country.selectOption({ label: data.country });
    await this.colors.selectOption(data.colors);
    await this.animals.selectOption(data.animals);
  }

  async submitDateRange(start: string, end: string): Promise<void> {
    await this.startDate.fill(start);
    await this.endDate.fill(end);
    await this.dateRangeSubmit.click();
  }
}
