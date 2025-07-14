import { Page } from '@playwright/test';
import { EditLeadPageLocators } from '../locators/EditLeadPage.locator';
import { BasePage } from './BasePage';
import { WebEdit } from '../elements/WebEdit';
import { WebButton } from '../elements/WebButton';

export class EditLeadPage extends BasePage {
  private firstNameInput: WebEdit;
  private companyNameInput: WebEdit;
  private updateButton: WebButton;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = new WebEdit(page, page.locator(EditLeadPageLocators.firstNameInput));
    this.companyNameInput = new WebEdit(page, page.locator(EditLeadPageLocators.companyNameInput));
    this.updateButton = new WebButton(page, page.locator(EditLeadPageLocators.updateButton));
  }

  async updateFirstName(newFirstName: string) {
    await this.firstNameInput.fill(newFirstName, 'Update First Name');
  }

  async updateCompanyName(newCompanyName: string) {
    await this.companyNameInput.fill(newCompanyName, 'Update Company Name');
  }

  async clickUpdate() {
    await this.updateButton.click('Click Update');
    await this.waitForPageLoad();
  }
}
