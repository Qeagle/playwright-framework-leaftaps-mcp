import { Page } from '@playwright/test';
import { FindLeadPageLocators } from '../locators/FindLeadPage.locator';
import { BasePage } from './BasePage';
import { WebEdit } from '../elements/WebEdit';
import { WebButton } from '../elements/WebButton';
import { WebLink } from '../elements/WebLink';

export class FindLeadPage extends BasePage {
  private firstNameInput: WebEdit;
  private leadIdInput: WebEdit;
  private findLeadsButton: WebButton;
  private firstResultLink: WebLink;
  private noRecordsMsg: any;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = new WebEdit(page, page.locator(FindLeadPageLocators.firstNameField));
    this.leadIdInput = new WebEdit(page, page.locator(FindLeadPageLocators.leadIdField));
    this.findLeadsButton = new WebButton(page, page.locator(FindLeadPageLocators.findLeadsButton));
    this.firstResultLink = new WebLink(page, page.locator(FindLeadPageLocators.firstResultLink));
    this.noRecordsMsg = this.page.locator(FindLeadPageLocators.noRecordsMsg);
  }

  async enterFirstName(firstName: string) {
    await this.firstNameInput.fill(firstName, 'First Name');
  }

  async enterLeadId(leadId: string) {
    await this.leadIdInput.fill(leadId, 'Lead ID');
    this.log(`Entered Lead ID: ${leadId}`);
  }

  async clickFindLeads() {
    await this.findLeadsButton.click('Click Find Leads');
    await this.page.waitForTimeout(2000); // Wait for results to load
  }

  async selectFirstResultingLead() {
    await this.firstResultLink.click('Select First Resulting Lead');
    await this.waitForPageLoad();
  }

  async selectLeadById(leadId: string) {
    const leadLink = this.page.locator(`//table[contains(@class,"x-grid3-row-table")]//td//a[contains(text(),"${leadId}")]`);
    await leadLink.click();
    await this.waitForPageLoad();
    this.log(`Selected lead with ID: ${leadId}`);
  }

  async verifyNoRecordsFound(): Promise<boolean> {
    try {
      await this.noRecordsMsg.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }
}
