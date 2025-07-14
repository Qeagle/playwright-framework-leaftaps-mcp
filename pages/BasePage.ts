import { Page, Locator, expect } from '@playwright/test';
import path from 'path';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string, actionDesc = 'Navigate') {
    try {
      await this.page.goto(url, { waitUntil: 'domcontentloaded' });
      this.log(`${actionDesc}: ${url}`);
      await this.waitForPageLoad();
    } catch (e) {
      this.log(`Navigation to ${url} failed. Error: ${e}`);
      await this.captureErrorState('goto-failure');
      throw e;
    }
  }

  async waitForPageLoad(timeout = 10000) {
    await this.page.waitForLoadState('networkidle', { timeout });
    this.log('Page load/network idle state reached');
  }

  async waitForElementVisible(locator: Locator, timeout = 5000, desc = '') {
    try {
      await locator.waitFor({ state: 'visible', timeout });
      this.log(`Element visible: ${desc}`);
    } catch (e) {
      this.log(`Element not visible in time: ${desc}`);
      await this.captureErrorState('waitForElementVisible');
      throw e;
    }
  }

  async takeScreenshot(name: string) {
    const file = path.join('reports', `${name}-${Date.now()}.png`);
    await this.page.screenshot({ path: file });
    this.log(`Screenshot taken: ${file}`);
    // Optionally attach to your custom report system here
  }

  async getTitle(): Promise<string> {
    const title = await this.page.title();
    this.log(`Page title: ${title}`);
    return title;
  }

  async logPageSource() {
    const html = await this.page.content();
    this.log('Page Source:\n' + html.substring(0, 500)); // Log a snippet
  }

  protected async captureErrorState(context: string) {
    await this.takeScreenshot(`ERROR-${context}`);
    // Optionally log more state, such as DOM, network logs, etc.
  }

  log(message: string) {
    console.log(`[${new Date().toISOString()}] ${message}`);
    // Extend with file or pipeline log integration as needed
  }
}
