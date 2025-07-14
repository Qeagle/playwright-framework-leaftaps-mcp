import { Page } from '@playwright/test';
import { HomePageLocators } from '../locators/HomePage.locator';
import { BasePage } from './BasePage';
import { WebButton } from '../elements/WebButton';
import { WebLink } from '../elements/WebLink';

export class HomePage extends BasePage {
  readonly crmSfaLink: WebLink;
  readonly logoutButton: WebButton;

  constructor(page: Page) {
    super(page);
    this.crmSfaLink = new WebLink(page, page.locator(HomePageLocators.crmSfaLink));
    this.logoutButton = new WebButton(page, page.locator(HomePageLocators.logoutButton));
  }

  async gotoCrmSfa() {
    await this.crmSfaLink.click('Click CRM/SFA Link');
    await this.waitForPageLoad();
  }

  async logout() {
    await this.logoutButton.click('Click Logout');
    await this.waitForPageLoad();
  }
}
