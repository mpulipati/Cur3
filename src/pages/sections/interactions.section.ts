import { type Locator, type Page } from '@playwright/test';

export class InteractionsSection {
  readonly startStopButton: Locator;
  readonly hoverButton: Locator;
  readonly hoverMenu: Locator;
  readonly field1: Locator;
  readonly field2: Locator;
  readonly copyText: Locator;
  readonly draggable: Locator;
  readonly droppable: Locator;
  readonly comboBox: Locator;
  readonly comboDropdown: Locator;

  constructor(private readonly page: Page) {
    this.startStopButton = page.getByRole('button', { name: /^(START|STOP)$/ });
    this.hoverButton = page.locator('button.dropbtn');
    this.hoverMenu = page.locator('.dropdown-content');
    this.field1 = page.locator('#field1');
    this.field2 = page.locator('#field2');
    this.copyText = page.getByRole('button', { name: 'Copy Text' });
    this.draggable = page.locator('#draggable');
    this.droppable = page.locator('#droppable');
    this.comboBox = page.locator('#comboBox');
    this.comboDropdown = page.locator('#dropdown');
  }

  async toggleStartStop(): Promise<string> {
    await this.startStopButton.click();
    return (await this.startStopButton.innerText()).trim();
  }

  async hoverPointMe(): Promise<void> {
    await this.hoverButton.hover();
  }

  async copyTextByDoubleClick(): Promise<void> {
    await this.copyText.dblclick();
  }

  async dragToTarget(): Promise<void> {
    await this.draggable.dragTo(this.droppable);
  }

  async selectComboItem(item: string): Promise<void> {
    await this.comboBox.click();
    await this.comboDropdown.locator('.option', { hasText: item }).click();
  }
}
