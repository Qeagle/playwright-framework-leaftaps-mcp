import { Page } from '@playwright/test';
import { ViewLeadPageLocators } from '../locators/ViewLeadPage.locator';
import { BasePage } from './BasePage';
import { WebButton } from '../elements/WebButton';

export class ViewLeadPage extends BasePage {
  readonly leadId = this.page.locator(ViewLeadPageLocators.leadId);
  readonly companyName = this.page.locator(ViewLeadPageLocators.companyName);
  readonly firstName = this.page.locator(ViewLeadPageLocators.firstName);
  readonly lastName = this.page.locator(ViewLeadPageLocators.lastName);
  readonly phoneNumber = this.page.locator(ViewLeadPageLocators.phoneNumber);
  readonly email = this.page.locator(ViewLeadPageLocators.email);
  readonly editButton: WebButton;
  readonly deleteButton: WebButton;
  readonly duplicateButton: WebButton;

  constructor(page: Page) {
    super(page);
    this.editButton = new WebButton(page, page.locator(ViewLeadPageLocators.editButton));
    this.deleteButton = new WebButton(page, page.locator(ViewLeadPageLocators.deleteButton));
    this.duplicateButton = new WebButton(page, page.locator(ViewLeadPageLocators.duplicateButton));
  }

  async getLeadInfo() {
    // Fetch visible info from the lead view
    return {
      leadId: await this.leadId.textContent(),
      companyName: await this.companyName.textContent(),
      firstName: await this.firstName.textContent(),
      lastName: await this.lastName.textContent(),
      phoneNumber: await this.phoneNumber.textContent(),
      email: await this.email.textContent(),
    };
  }

  async getLeadId(): Promise<string> {
    // Wait for the company name element to be visible
    await this.companyName.waitFor({ state: 'visible' });
    const companyText = await this.companyName.textContent() || '';
    // Extract the lead ID from the pattern: 'CompanyName (12345)'
    const match = companyText.match(/\((\d+)\)$/);
    return match ? match[1] : '';
  }

  async clickEdit() {
    await this.editButton.click('Click Edit');
    await this.waitForPageLoad();
  }

  async clickDelete() {
    await this.deleteButton.click('Click Delete');
    await this.waitForPageLoad();
  }

  async clickDuplicate() {
    await this.duplicateButton.click('Click Duplicate');
    await this.waitForPageLoad();
  }
}
