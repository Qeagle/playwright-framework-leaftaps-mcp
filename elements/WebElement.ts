import { Locator, Page } from '@playwright/test';
import { frameworkConfig } from '../configs/framework.config';

/**
 * Base class for all web elements.
 * Only includes generic, non-control-specific helpers.
 * All atomic actions should be defined in subclasses (e.g., WebButton, WebEdit, WebLink).
 */
export class WebElement {
  protected locator: Locator;
  protected page: Page;
  protected retries: number;

  constructor(page: Page, locator: Locator, retries?: number) {
    this.page = page;
    this.locator = locator;
    this.retries = retries ?? frameworkConfig.actionRetries;
  }

  protected async safeAction(action: () => Promise<void>, actionDesc: string, retries?: number) {
    const maxRetries = retries ?? this.retries;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        await this.locator.waitFor({ state: 'visible', timeout: 5000 });
        await action();
        this.log(`${actionDesc} succeeded`);
        return;
      } catch (e) {
        this.log(`${actionDesc} failed (attempt ${attempt}): ${e}`);
        if (attempt === maxRetries) throw e;
        await this.page.waitForTimeout(1000);
      }
    }
  }

  protected log(msg: string) {
    console.log(`[WebElement] ${msg}`);
  }

  /**
   * Checks if the element is visible in the DOM.
   */
  async isVisible(): Promise<boolean> {
    return this.locator.isVisible();
  }

  /**
   * Returns the text content of the element.
   */
  async textContent(): Promise<string | null> {
    return this.locator.textContent();
  }

  /**
   * Returns the value of the specified attribute.
   */
  async getAttribute(attr: string): Promise<string | null> {
    return this.locator.getAttribute(attr);
  }

  /**
   * (Optional) Returns the underlying Locator for advanced use cases.
   */
  getLocator(): Locator {
    return this.locator;
  }
}
