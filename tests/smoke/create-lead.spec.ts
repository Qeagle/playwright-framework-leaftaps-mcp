import { CreateLeadPage } from '../../pages/CreateLeadPage';
import { TestHooks } from '../../support/test-hooks';
import { test, expect } from '../../support/test-setup';
import { TestDataService } from '../../test-data/test-data.service';

test('Create a new lead after login', async ({ page }) => {

  // Step: Get test data from MCP server
  const leadData = await TestDataService.getCreateLeadData(1);
  const lead = leadData[0];

  // Step: Given I am logged in and navigated to Create Lead page
  const { leadsPage } = await TestHooks.performCompleteLogin(page);
  await leadsPage.gotoCreateLead();

  // Step: And I fill the Create Lead form with dynamic data from API
  const createLeadPage = new CreateLeadPage(page);
  await createLeadPage.companyNameInput.fill(lead.company_name);
  await createLeadPage.firstNameInput.fill(lead.first_name);
  await createLeadPage.lastNameInput.fill(lead.last_name);

  // Step: And I click the Create Lead button
  await createLeadPage.submitButton.click('Submit');

  // Step: Then I should see the created lead details
  await expect(page.locator('#viewLead_firstName_sp')).toHaveText(lead.first_name);
  await expect(page.locator('#viewLead_companyName_sp')).toContainText(lead.company_name);
});
