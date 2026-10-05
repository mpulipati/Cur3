import { type Locator, type Page } from '@playwright/test';

export class TablesSection {
  readonly staticTable: Locator;
  readonly dynamicTable: Locator;
  readonly productTable: Locator;
  readonly pagination: Locator;

  constructor(private readonly page: Page) {
    this.staticTable = page
      .locator('table')
      .filter({ has: page.getByRole('columnheader', { name: 'BookName' }) });
    this.dynamicTable = page.locator('#taskTable');
    this.productTable = page.locator('#productTable');
    this.pagination = page.locator('#pagination');
  }

  staticRowByBook(bookName: string): Locator {
    return this.staticTable.locator('tr').filter({ hasText: bookName });
  }

  async pricesForAuthor(author: string): Promise<number[]> {
    const rows = this.staticTable.locator('tr').filter({ hasText: author });
    const count = await rows.count();
    const prices: number[] = [];

    for (let i = 0; i < count; i++) {
      const priceText = (await rows.nth(i).locator('td').nth(3).innerText()).trim();
      prices.push(Number(priceText));
    }

    return prices;
  }

  async metricForProcess(processName: string, columnHeader: string): Promise<string> {
    const headers = this.dynamicTable.locator('th');
    const headerCount = await headers.count();
    let columnIndex = -1;

    for (let i = 0; i < headerCount; i++) {
      const text = (await headers.nth(i).innerText()).trim();
      if (text === columnHeader) {
        columnIndex = i;
        break;
      }
    }

    if (columnIndex < 0) {
      throw new Error(`Column "${columnHeader}" not found in dynamic table`);
    }

    const row = this.dynamicTable.locator('tr').filter({ hasText: processName }).first();
    return (await row.locator('td').nth(columnIndex).innerText()).trim();
  }

  async goToProductPage(pageNumber: string): Promise<void> {
    await this.pagination.getByRole('link', { name: pageNumber, exact: true }).click();
  }

  productRowByName(name: string): Locator {
    return this.productTable.locator('tr').filter({ hasText: name });
  }

  async selectProduct(name: string): Promise<void> {
    await this.productRowByName(name).locator('input[type="checkbox"]').check();
  }
}
