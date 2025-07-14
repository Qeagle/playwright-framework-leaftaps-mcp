import { Page } from '@playwright/test';
import { CreateLeadPageLocators } from '../locators/CreateLeadPage.locator';
import { BasePage } from './BasePage';
import { WebEdit } from '../elements/WebEdit';
import { WebSelect } from '../elements/WebSelect';
import { WebButton } from '../elements/WebButton';

export class CreateLeadPage extends BasePage {
  readonly companyNameInput: WebEdit;
  readonly firstNameInput: WebEdit;
  readonly lastNameInput: WebEdit;
  readonly firstNameLocalInput: WebEdit;
  readonly lastNameLocalInput: WebEdit;
  readonly salutationInput: WebEdit;
  readonly birthDateInput: WebEdit;
  readonly generalProfTitleInput: WebEdit;
  readonly departmentInput: WebEdit;
  readonly phoneNumberInput: WebEdit;
  readonly emailInput: WebEdit;
  readonly descriptionTextarea: WebEdit;
  readonly importantNoteTextarea: WebEdit;
  readonly annualRevenueInput: WebEdit;
  readonly sicCodeInput: WebEdit;
  readonly submitButton: WebButton;
  readonly resetButton: WebButton;
  readonly industryDropdown: WebSelect;
  readonly ownershipDropdown: WebSelect;
  readonly currencyDropdown: WebSelect;
  readonly dataSourceDropdown: WebSelect;
  readonly marketingCampaignDropdown: WebSelect;
  readonly countryDropdown: WebSelect;
  readonly stateProvinceDropdown: WebSelect;

  constructor(page: Page) {
    super(page);
    this.companyNameInput = new WebEdit(page, page.locator(CreateLeadPageLocators.companyNameInput));
    this.firstNameInput = new WebEdit(page, page.locator(CreateLeadPageLocators.firstNameInput));
    this.lastNameInput = new WebEdit(page, page.locator(CreateLeadPageLocators.lastNameInput));
    this.firstNameLocalInput = new WebEdit(page, page.locator(CreateLeadPageLocators.firstNameLocalInput));
    this.lastNameLocalInput = new WebEdit(page, page.locator(CreateLeadPageLocators.lastNameLocalInput));
    this.salutationInput = new WebEdit(page, page.locator(CreateLeadPageLocators.salutationInput));
    this.birthDateInput = new WebEdit(page, page.locator(CreateLeadPageLocators.birthDateInput));
    this.generalProfTitleInput = new WebEdit(page, page.locator(CreateLeadPageLocators.generalProfTitleInput));
    this.departmentInput = new WebEdit(page, page.locator(CreateLeadPageLocators.departmentInput));
    this.phoneNumberInput = new WebEdit(page, page.locator(CreateLeadPageLocators.phoneNumberInput));
    this.emailInput = new WebEdit(page, page.locator(CreateLeadPageLocators.emailInput));
    this.descriptionTextarea = new WebEdit(page, page.locator(CreateLeadPageLocators.descriptionTextarea));
    this.importantNoteTextarea = new WebEdit(page, page.locator(CreateLeadPageLocators.importantNoteTextarea));
    this.annualRevenueInput = new WebEdit(page, page.locator(CreateLeadPageLocators.annualRevenueInput));
    this.sicCodeInput = new WebEdit(page, page.locator(CreateLeadPageLocators.sicCodeInput));
    this.submitButton = new WebButton(page, page.locator(CreateLeadPageLocators.submitButton));
    this.resetButton = new WebButton(page, page.locator(CreateLeadPageLocators.resetButton));
    this.industryDropdown = new WebSelect(page, page.locator(CreateLeadPageLocators.industryDropdown));
    this.ownershipDropdown = new WebSelect(page, page.locator(CreateLeadPageLocators.ownershipDropdown));
    this.currencyDropdown = new WebSelect(page, page.locator(CreateLeadPageLocators.currencyDropdown));
    this.dataSourceDropdown = new WebSelect(page, page.locator(CreateLeadPageLocators.dataSourceDropdown));
    this.marketingCampaignDropdown = new WebSelect(page, page.locator(CreateLeadPageLocators.marketingCampaignDropdown));
    this.countryDropdown = new WebSelect(page, page.locator(CreateLeadPageLocators.countryDropdown));
    this.stateProvinceDropdown = new WebSelect(page, page.locator(CreateLeadPageLocators.stateProvinceDropdown));
  }

  async fillMandatoryFields(data: { companyName: string; firstName: string; lastName: string; }) {
    await this.companyNameInput.fill(data.companyName, 'Company Name');
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
    if (data.importantNote) await this.importantNoteTextarea.fill(data.importantNote, 'Important Note');
    if (data.annualRevenue) await this.annualRevenueInput.fill(data.annualRevenue, 'Annual Revenue');
    if (data.sicCode) await this.sicCodeInput.fill(data.sicCode, 'SIC Code');
  }

  async selectDropdowns(data: { [key: string]: string }) {
    if (data.industry) await this.industryDropdown.selectByLabel(data.industry, 'Industry');
    if (data.ownership) await this.ownershipDropdown.selectByLabel(data.ownership, 'Ownership');
    if (data.currency) await this.currencyDropdown.selectByLabel(data.currency, 'Currency');
    if (data.dataSource) await this.dataSourceDropdown.selectByLabel(data.dataSource, 'Data Source');
    if (data.marketingCampaign) await this.marketingCampaignDropdown.selectByLabel(data.marketingCampaign, 'Marketing Campaign');
    if (data.country) await this.countryDropdown.selectByLabel(data.country, 'Country');
    if (data.stateProvince) await this.stateProvinceDropdown.selectByLabel(data.stateProvince, 'State/Province');
  }

  async submit() {
    await this.submitButton.click('Click Submit');
    await this.waitForPageLoad();
  }

  async reset() {
    await this.resetButton.click('Click Reset');
    await this.waitForPageLoad();
  }
}
