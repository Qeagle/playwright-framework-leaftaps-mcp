import { Page } from '@playwright/test';
import { CreateContactPageLocators } from '../locators/CreateContactPage.locator';
import { BasePage } from './BasePage';
import { WebEdit } from '../elements/WebEdit';
import { WebSelect } from '../elements/WebSelect';
import { WebButton } from '../elements/WebButton';

export class CreateContactPage extends BasePage {
  // Required fields
  private firstNameInput: WebEdit;
  private lastNameInput: WebEdit;

  // Optional fields
  private firstNameLocalInput: WebEdit;
  private lastNameLocalInput: WebEdit;
  private salutationInput: WebEdit;
  private birthDateInput: WebEdit;
  private generalProfTitleInput: WebEdit;
  private departmentInput: WebEdit;

  // Contact Info
  private phoneCountryCodeInput: WebEdit;
  private phoneAreaCodeInput: WebEdit;
  private phoneNumberInput: WebEdit;
  private phoneExtensionInput: WebEdit;
  private askForNameInput: WebEdit;
  private emailInput: WebEdit;
  private webUrlInput: WebEdit;

  // Address
  private toNameInput: WebEdit;
  private address1Input: WebEdit;
  private address2Input: WebEdit;
  private cityInput: WebEdit;
  private stateProvinceDropdown: WebSelect;
  private postalCodeInput: WebEdit;
  private countryDropdown: WebSelect;

  // Additional Info
  private descriptionTextarea: WebEdit;
  private importantNoteTextarea: WebEdit;

  // Buttons
  private saveButton: WebButton;
  private resetButton: WebButton;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = new WebEdit(page, page.locator(CreateContactPageLocators.firstNameInput));
    this.lastNameInput = new WebEdit(page, page.locator(CreateContactPageLocators.lastNameInput));
    this.firstNameLocalInput = new WebEdit(page, page.locator(CreateContactPageLocators.firstNameLocalInput));
    this.lastNameLocalInput = new WebEdit(page, page.locator(CreateContactPageLocators.lastNameLocalInput));
    this.salutationInput = new WebEdit(page, page.locator(CreateContactPageLocators.salutationInput));
    this.birthDateInput = new WebEdit(page, page.locator(CreateContactPageLocators.birthDateInput));
    this.generalProfTitleInput = new WebEdit(page, page.locator(CreateContactPageLocators.generalProfTitleInput));
    this.departmentInput = new WebEdit(page, page.locator(CreateContactPageLocators.departmentInput));

    this.phoneCountryCodeInput = new WebEdit(page, page.locator(CreateContactPageLocators.phoneCountryCodeInput));
    this.phoneAreaCodeInput = new WebEdit(page, page.locator(CreateContactPageLocators.phoneAreaCodeInput));
    this.phoneNumberInput = new WebEdit(page, page.locator(CreateContactPageLocators.phoneNumberInput));
    this.phoneExtensionInput = new WebEdit(page, page.locator(CreateContactPageLocators.phoneExtensionInput));
    this.askForNameInput = new WebEdit(page, page.locator(CreateContactPageLocators.askForNameInput));
    this.emailInput = new WebEdit(page, page.locator(CreateContactPageLocators.emailInput));
    this.webUrlInput = new WebEdit(page, page.locator(CreateContactPageLocators.webUrlInput));

    this.toNameInput = new WebEdit(page, page.locator(CreateContactPageLocators.toNameInput));
    this.address1Input = new WebEdit(page, page.locator(CreateContactPageLocators.address1Input));
    this.address2Input = new WebEdit(page, page.locator(CreateContactPageLocators.address2Input));
    this.cityInput = new WebEdit(page, page.locator(CreateContactPageLocators.cityInput));
    this.stateProvinceDropdown = new WebSelect(page, page.locator(CreateContactPageLocators.stateProvinceDropdown));
    this.postalCodeInput = new WebEdit(page, page.locator(CreateContactPageLocators.postalCodeInput));
    this.countryDropdown = new WebSelect(page, page.locator(CreateContactPageLocators.countryDropdown));

    this.descriptionTextarea = new WebEdit(page, page.locator(CreateContactPageLocators.descriptionTextarea));
    this.importantNoteTextarea = new WebEdit(page, page.locator(CreateContactPageLocators.importantNoteTextarea));

    this.saveButton = new WebButton(page, page.locator(CreateContactPageLocators.saveButton));
    this.resetButton = new WebButton(page, page.locator(CreateContactPageLocators.resetButton));
  }

  async fillMandatoryFields(data: { firstName: string; lastName: string; }) {
    await this.firstNameInput.fill(data.firstName, 'First Name');
    await this.lastNameInput.fill(data.lastName, 'Last Name');
  }

  async fillOptionalFields(data: { [key: string]: string }) {
    if (data.firstNameLocal) await this.firstNameLocalInput.fill(data.firstNameLocal, 'First Name Local');
    if (data.lastNameLocal) await this.lastNameLocalInput.fill(data.lastNameLocal, 'Last Name Local');
    if (data.salutation) await this.salutationInput.fill(data.salutation, 'Salutation');
    if (data.birthDate) await this.birthDateInput.fill(data.birthDate, 'Birth Date');
    if (data.generalProfTitle) await this.generalProfTitleInput.fill(data.generalProfTitle, 'General Prof Title');
    if (data.department) await this.departmentInput.fill(data.department, 'Department');
    if (data.phoneNumber) await this.phoneNumberInput.fill(data.phoneNumber, 'Phone Number');
    if (data.email) await this.emailInput.fill(data.email, 'Email');
    if (data.description) await this.descriptionTextarea.fill(data.description, 'Description');
  }

  async save() {
    await this.saveButton.click('Click Save');
    await this.waitForPageLoad();
  }

  async reset() {
    await this.resetButton.click('Click Reset');
    await this.waitForPageLoad();
  }
}
