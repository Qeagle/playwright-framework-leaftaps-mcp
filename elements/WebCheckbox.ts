import { Locator, Page } from '@playwright/test';
import { WebElement } from './WebElement';

export class WebCheckbox extends WebElement {
  constructor(page: Page, locator: Locator, retries?: number) {
    super(page, locator, retries);
  }

  async check(actionDesc = 'Check Checkbox', retries?: number) {
    await this.safeAction(
      () => this.locator.check(),
      actionDesc,
      retries
    );
  }

  async uncheck(actionDesc = 'Uncheck Checkbox', retries?: number) {
    await this.safeAction(
      () => this.locator.uncheck(),
      actionDesc,
      retries
    );
  }

  async isChecked(actionDesc = 'Is Checkbox Checked?', retries?: number): Promise<boolean> {
    let checked = false;
    await this.safeAction(
      async () => { checked = await this.locator.isChecked(); },
      actionDesc,
      retries
    );
    return checked;
  }
}
