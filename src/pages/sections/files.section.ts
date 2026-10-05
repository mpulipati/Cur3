import { type Locator, type Page } from '@playwright/test';

export class FilesSection {
  readonly singleFileInput: Locator;
  readonly multipleFilesInput: Locator;
  readonly uploadSingle: Locator;
  readonly uploadMultiple: Locator;
  readonly singleStatus: Locator;
  readonly multipleStatus: Locator;

  constructor(private readonly page: Page) {
    this.singleFileInput = page.locator('#singleFileInput');
    this.multipleFilesInput = page.locator('#multipleFilesInput');
    this.uploadSingle = page.getByRole('button', { name: 'Upload Single File' });
    this.uploadMultiple = page.getByRole('button', { name: 'Upload Multiple Files' });
    this.singleStatus = page.locator('#singleFileStatus');
    this.multipleStatus = page.locator('#multipleFilesStatus');
  }

  async uploadSingleFile(filePath: string): Promise<void> {
    await this.singleFileInput.setInputFiles(filePath);
    await this.uploadSingle.click();
  }

  async uploadMultipleFiles(filePaths: string[]): Promise<void> {
    await this.multipleFilesInput.setInputFiles(filePaths);
    await this.uploadMultiple.click();
  }
}
