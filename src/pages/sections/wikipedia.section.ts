import { type Locator, type Page } from '@playwright/test';

export class WikipediaSection {
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly results: Locator;

  constructor(page: Page) {
    this.searchInput = page.locator('#Wikipedia1_wikipedia-search-input');
    this.searchButton = page.locator('.wikipedia-search-button');
    this.results = page.locator('#Wikipedia1_wikipedia-search-results');
  }

  async search(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.searchButton.click();
  }

  resultLinks(): Locator {
    return this.results.locator('a');
  }
}
