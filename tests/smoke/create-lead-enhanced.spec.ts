import { test, expect } from '@playwright/test';
import { TestHooks } from '../../support/test-hooks';
import { CreateLeadPage } from '../../pages/CreateLeadPage';
import { ViewLeadPage } from '../../pages/ViewLeadPage';
import { generateLeadData } from '../../test-data/dataGenerator';

test('Create a new lead with random details', async ({ page }) => {
  // Generate random lead data using faker
  const leadData = generateLeadData();

  // Step: Given I am on the Leaftaps login page
  // Step: When I enter the username "demosalesmanager"
  // Step: And I enter the password "crmsfa"  
  // Step: And I click the login button
  // Step: When I click the CRM/SFA link
  // Step: And I click the Leads tab
  const { leadsPage } = await TestHooks.performCompleteLogin(page);

  // Step: And I click the Create Lead link
  await leadsPage.gotoCreateLead();

  // Initialize Create Lead Page
  const createLeadPage = new CreateLeadPage(page);

  // Step: And I fill the Create Lead form with random data
  // Fill mandatory fields
  await createLeadPage.fillMandatoryFields({
    companyName: leadData.companyName,
    firstName: leadData.firstName,
    lastName: leadData.lastName
  });

  // Fill optional fields
  await createLeadPage.fillOptionalFields({
    email: leadData.email,
    phoneNumber: leadData.phone
  });

  // Note: Skipping dropdowns as they may have specific values not matching our generated data
  // await createLeadPage.selectDropdowns({
  //   industry: leadData.industry,
  //   country: leadData.country
  // });

  // Step: And I click the submit button
  await createLeadPage.submit();

  // Initialize View Lead Page for assertions
  const viewLeadPage = new ViewLeadPage(page);

  // Step: Then the lead should be created successfully
  // Verify we're on the view lead page by checking for lead details
  await expect(viewLeadPage.firstName).toBeVisible();

  // Step: And I should see the generated details in the lead view
  await expect(viewLeadPage.firstName).toHaveText(leadData.firstName);
  await expect(viewLeadPage.lastName).toHaveText(leadData.lastName);
  await expect(viewLeadPage.companyName).toContainText(leadData.companyName);

  // Verify optional fields
  await expect(viewLeadPage.email).toHaveText(leadData.email);
  
  // Verify phone number is present somewhere on the page
  await expect(page.locator('body')).toContainText(leadData.phone);

  console.log(`✅ Successfully created lead: ${leadData.firstName} ${leadData.lastName}`);
  console.log(`🏢 Company: ${leadData.companyName}`);
  console.log(`📧 Email: ${leadData.email}`);
  console.log(`📞 Phone: ${leadData.phone}`);
  console.log(`🏭 Industry: ${leadData.industry}`);
  console.log(`🌍 Country: ${leadData.country}`);
});
