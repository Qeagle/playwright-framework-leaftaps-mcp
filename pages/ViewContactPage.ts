import { Page } from '@playwright/test';
import { ViewContactPageLocators } from '../locators/ViewContactPage.locator';
import { BasePage } from './BasePage';
import { WebButton } from '../elements/WebButton';

export class ViewContactPage extends BasePage {
  readonly contactId = this.page.locator(ViewContactPageLocators.contactId);
  readonly firstName = this.page.locator(ViewContactPageLocators.firstName);
  readonly lastName = this.page.locator(ViewContactPageLocators.lastName);
  readonly firstNameLocal = this.page.locator(ViewContactPageLocators.firstNameLocal);
  readonly lastNameLocal = this.page.locator(ViewContactPageLocators.lastNameLocal);
  readonly salutation = this.page.locator(ViewContactPageLocators.salutation);
  readonly birthDate = this.page.locator(ViewContactPageLocators.birthDate);
  readonly department = this.page.locator(ViewContactPageLocators.department);
  readonly description = this.page.locator(ViewContactPageLocators.description);
  readonly importantNote = this.page.locator(ViewContactPageLocators.importantNote);
  readonly phoneNumber = this.page.locator(ViewContactPageLocators.phoneNumber);
  readonly email = this.page.locator(ViewContactPageLocators.email);
  readonly editButton: WebButton;
  readonly deleteButton: WebButton;
  readonly duplicateButton: WebButton;

  constructor(page: Page) {
    super(page);
    this.editButton = new WebButton(page, page.locator(ViewContactPageLocators.editButton));
    this.deleteButton = new WebButton(page, page.locator(ViewContactPageLocators.deleteButton));
    this.duplicateButton = new WebButton(page, page.locator(ViewContactPageLocators.duplicateButton));
  }

  async getContactInfo() {
    // Fetch visible info from the contact view
    return {
      contactId: await this.contactId.textContent(),
      firstName: await this.firstName.textContent(),
      lastName: await this.lastName.textContent(),
      firstNameLocal: await this.firstNameLocal.textContent(),
      lastNameLocal: await this.lastNameLocal.textContent(),
      department: await this.department.textContent(),
      phoneNumber: await this.phoneNumber.textContent(),
      email: await this.email.textContent(),
      description: await this.description.textContent(),
    };
  }

  async getContactId(): Promise<string> {
    // Wait for the first name element to be visible
    await this.firstName.waitFor({ state: 'visible' });
    const contactText = await this.firstName.textContent() || '';
    // Extract the contact ID from the pattern if available
    const match = contactText.match(/\((\d+)\)$/);
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
