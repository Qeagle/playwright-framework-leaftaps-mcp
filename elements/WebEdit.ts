import { Locator, Page } from '@playwright/test';
import { WebElement } from './WebElement';

export class WebEdit extends WebElement {
  constructor(page: Page, locator: Locator, retries?: number) {
    super(page, locator, retries);
  }

  async fill(value: string, actionDesc = 'Fill Input', retries?: number) {
    await this.safeAction(() => this.locator.fill(value), `${actionDesc} with '${value}'`, retries);
  }
}
