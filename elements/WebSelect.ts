import { Locator, Page } from '@playwright/test';
import { WebElement } from './WebElement';

export class WebSelect extends WebElement {
  constructor(page: Page, locator: Locator, retries?: number) {
    super(page, locator, retries);
  }

  async selectByValue(value: string, actionDesc = 'Select by value', retries?: number) {
    await this.safeAction(
      async () => { await this.locator.selectOption({ value }); },
      `${actionDesc}: '${value}'`,
      retries
    );
  }

  async selectByLabel(label: string, actionDesc = 'Select by label', retries?: number) {
    await this.safeAction(
      async () => { await this.locator.selectOption({ label }); },
      `${actionDesc}: '${label}'`,
      retries
    );
  }
}
