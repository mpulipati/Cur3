import { expect, type Page } from '@playwright/test';
import { BasePage } from './base.page';
import { AlertsSection } from './sections/alerts.section';
import { FilesSection } from './sections/files.section';
import { FormSection } from './sections/form.section';
import { InteractionsSection } from './sections/interactions.section';
import { ShadowDomSection } from './sections/shadow-dom.section';
import { TablesSection } from './sections/tables.section';
import { WikipediaSection } from './sections/wikipedia.section';

export class PracticeHomePage extends BasePage {
  readonly form: FormSection;
  readonly tables: TablesSection;
  readonly alerts: AlertsSection;
  readonly interactions: InteractionsSection;
  readonly files: FilesSection;
  readonly wikipedia: WikipediaSection;
  readonly shadowDom: ShadowDomSection;

  constructor(page: Page) {
    super(page);
    this.form = new FormSection(page);
    this.tables = new TablesSection(page);
    this.alerts = new AlertsSection(page);
    this.interactions = new InteractionsSection(page);
    this.files = new FilesSection(page);
    this.wikipedia = new WikipediaSection(page);
    this.shadowDom = new ShadowDomSection(page);
  }

  async open(): Promise<void> {
    await this.goto('/');
    await expect(this.page).toHaveTitle(/Automation Testing Practice/i);
    await expect(this.page.getByRole('heading', { name: 'Automation Testing Practice' })).toBeVisible();
  }
}
