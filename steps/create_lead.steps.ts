import { When, Then } from '@cucumber/cucumber';
import { CreateLeadPage } from '../pages/CreateLeadPage';
import { CustomWorld } from '../support/world'; 
import { generateLeadData } from '../test-data/dataGenerator';

let createLeadPage: CreateLeadPage;

When('I generate random lead data', function (this: CustomWorld) {
  this.leadData = generateLeadData();
});

When('I enter company name', async function (this: CustomWorld) {
  createLeadPage = new CreateLeadPage(this.page);
  await createLeadPage.companyNameInput.fill(this.leadData.companyName, 'Company Name');
});

When('I enter first name', async function (this: CustomWorld) {
  await createLeadPage.firstNameInput.fill(this.leadData.firstName, 'First Name');
});

When('I enter last name', async function (this: CustomWorld) {
  await createLeadPage.lastNameInput.fill(this.leadData.lastName, 'Last Name');
});

When('I enter email', async function (this: CustomWorld) {
  await createLeadPage.emailInput.fill(this.leadData.email, 'Email');
});

When('I enter phone number', async function (this: CustomWorld) {
  await createLeadPage.phoneNumberInput.fill(this.leadData.phone, 'Phone Number');
});

When('I select industry', async function (this: CustomWorld) {
  await createLeadPage.industryDropdown.selectByLabel(this.leadData.industry, 'Industry');
});

When('I select country', async function (this: CustomWorld) {
  await createLeadPage.countryDropdown.selectByLabel(this.leadData.country, 'Country');
});

When('I click the submit button', async function () {
  await createLeadPage.submitButton.click('Click Submit');
});

Then('the lead should be created successfully', async function () {
  await createLeadPage.waitForPageLoad();
});

Then('I should see the generated first name in the first name field', async function (this: CustomWorld) {
  const actual = await this.page.locator('#viewLead_firstName_sp').textContent();
  if ((actual ?? '').trim() !== this.leadData.firstName) {
    throw new Error(`First name mismatch: expected ${this.leadData.firstName}, got ${actual}`);
  }
});

Then('I should see the generated company name in the company name field', async function (this: CustomWorld) {
  const actual = await this.page.locator('#viewLead_companyName_sp').textContent();
  if (!(actual ?? '').includes(this.leadData.companyName)) {
    throw new Error(`Company name mismatch: expected ${this.leadData.companyName}, got ${actual}`);
  }
});

Then('I should see the generated industry in the industry field', async function (this: CustomWorld) {
  const actual = await this.page.locator('#viewLead_industryEnumId_sp').textContent();
  if ((actual ?? '').trim() !== this.leadData.industry) {
    throw new Error(`Industry mismatch: expected ${this.leadData.industry}, got ${actual}`);
  }
});
