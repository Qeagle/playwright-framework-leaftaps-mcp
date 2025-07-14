import { Locator, Page } from '@playwright/test';
import { WebElement } from './WebElement';

export class WebLink extends WebElement {
  constructor(page: Page, locator: Locator, retries?: number) {
    super(page, locator, retries);
  }

  async click(actionDesc = 'Click Link', retries?: number) {
    await this.safeAction(() => this.locator.click(), actionDesc, retries);
  }

  async getHref(): Promise<string | null> {
    return this.locator.getAttribute('href');
  }

  async openInNewTab(): Promise<Page> {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.locator.click({ button: 'middle' }), 
    ]);
    await newPage.waitForLoadState();
    return newPage;
  }
}
