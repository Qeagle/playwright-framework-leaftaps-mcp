import { test, expect } from '@playwright/test';
import { TestHooks } from '../../support/test-hooks';
import { ContactsPage } from '../../pages/ContactsPage';
import { CreateContactPage } from '../../pages/CreateContactPage';
import { ViewContactPage } from '../../pages/ViewContactPage';
import { generateContactData } from '../../test-data/dataGenerator';

test('Create a new contact with random details', async ({ page }) => {
  // Generate random contact data using faker
  const contactData = generateContactData();

  // Step: Given I am on the Leaftaps login page
  // Step: When I enter the username "demosalesmanager"
  // Step: And I enter the password "crmsfa"  
  // Step: And I click the login button
  // Step: And I should see the CRM/SFA link
  // Step: When I click the CRM/SFA link
  const { leadsPage } = await TestHooks.performCompleteLogin(page);

  // Step: And I click the Contacts link
  const contactsPage = new ContactsPage(page);
  await contactsPage.gotoContactsTab();

  // Step: And I click the Create Contact link
  await contactsPage.gotoCreateContact();

  // Initialize Create Contact Page
  const createContactPage = new CreateContactPage(page);

  // Step: And I enter random first name
  await createContactPage.fillMandatoryFields({
    firstName: contactData.firstName,
    lastName: contactData.lastName
  });

  // Step: And I enter random last name - already handled above

  // Step: And I enter random local first name
  // Step: And I enter random local last name
  // Step: And I enter random department
  // Step: And I enter random description
  // Step: And I enter random email
  await createContactPage.fillOptionalFields({
    firstNameLocal: contactData.firstNameLocal,
    lastNameLocal: contactData.lastNameLocal,
    department: contactData.department,
    description: contactData.description,
    email: contactData.email,
  });

  // Step: And I click the Save button
  await createContactPage.save();

  // Initialize View Contact Page for assertions
  const viewContactPage = new ViewContactPage(page);

  // Step: Then the contact should be created successfully
  // Verify we're on the view contact page by checking for contact details
  await expect(viewContactPage.firstName).toBeVisible();

  // Step: And I should see the generated first name and last name in the contact details
  await expect(viewContactPage.firstName).toHaveText(contactData.firstName);
  await expect(viewContactPage.lastName).toHaveText(contactData.lastName);

  // Additional assertions for the optional fields we filled
  await expect(viewContactPage.firstNameLocal).toHaveText(contactData.firstNameLocal);
  await expect(viewContactPage.lastNameLocal).toHaveText(contactData.lastNameLocal);
  await expect(viewContactPage.department).toHaveText(contactData.department);
  await expect(viewContactPage.description).toContainText(contactData.description);
  
  // Verify email is present somewhere on the page (since it's not in the main details section)
  await expect(page.locator('body')).toContainText(contactData.email);

  console.log(`✅ Successfully created contact: ${contactData.firstName} ${contactData.lastName}`);
  console.log(`📧 Email: ${contactData.email}`);
  console.log(`🏢 Department: ${contactData.department}`);
});
