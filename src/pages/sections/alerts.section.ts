import { type Dialog, type Locator, type Page } from '@playwright/test';

export class AlertsSection {
  readonly simpleAlert: Locator;
  readonly confirmAlert: Locator;
  readonly promptAlert: Locator;
  readonly newTab: Locator;
  readonly popupWindows: Locator;
  readonly dialogMessage: Locator;

  constructor(private readonly page: Page) {
    this.simpleAlert = page.locator('#alertBtn');
    this.confirmAlert = page.locator('#confirmBtn');
    this.promptAlert = page.locator('#promptBtn');
    this.newTab = page.getByRole('button', { name: 'New Tab' });
    this.popupWindows = page.locator('#PopUp');
    this.dialogMessage = page.locator('#demo');
  }

  async clickAndAccept(button: Locator, promptText?: string): Promise<string> {
    return this.clickAndHandle(button, (dialog) => dialog.accept(promptText));
  }

  async clickAndDismiss(button: Locator): Promise<string> {
    return this.clickAndHandle(button, (dialog) => dialog.dismiss());
  }

  private async clickAndHandle(
    button: Locator,
    action: (dialog: Dialog) => Promise<void>,
  ): Promise<string> {
    const dialogPromise = this.page.waitForEvent('dialog');
    const clickPromise = button.click();
    const dialog = await dialogPromise;
    const message = dialog.message();
    await action(dialog);
    await clickPromise;
    return message;
  }
}
