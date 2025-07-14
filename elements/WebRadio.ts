import { Locator, Page } from '@playwright/test';
import { WebElement } from './WebElement';

export class WebRadio extends WebElement {
  constructor(page: Page, locator: Locator, retries?: number) {
    super(page, locator, retries);
  }

  async check(actionDesc = 'Check Radio', retries?: number) {
    await this.safeAction(
      () => this.locator.check(),
      actionDesc,
      retries
    );
  }

  async isChecked(actionDesc = 'Is Radio Checked?', retries?: number): Promise<boolean> {
    let checked = false;
    await this.safeAction(
      async () => { checked = await this.locator.isChecked(); },
      actionDesc,
      retries
    );
    return checked;
  }
}