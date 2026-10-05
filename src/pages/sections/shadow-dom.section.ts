import { type Locator, type Page } from '@playwright/test';

export class ShadowDomSection {
  readonly host: Locator;

  constructor(page: Page) {
    this.host = page.locator('#shadow_host');
  }

  content(): Locator {
    return this.host.locator('#shadow_content');
  }

  textInput(): Locator {
    return this.host.locator('input[type="text"]');
  }

  checkbox(): Locator {
    return this.host.locator('input[type="checkbox"]');
  }
}
