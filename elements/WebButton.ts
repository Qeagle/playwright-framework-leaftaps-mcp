import { Locator, Page } from '@playwright/test';
import { WebElement } from './WebElement';

export class WebButton extends WebElement {
  constructor(page: Page, locator: Locator, retries?: number) {
    super(page, locator, retries);
  }

  async click(actionDesc = 'Click Button', retries?: number) {
    await this.safeAction(() => this.locator.click(), actionDesc, retries);
  }
}
