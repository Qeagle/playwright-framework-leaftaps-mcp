import { test, expect } from '@playwright/test';
import { FindLeadPage } from '../../pages/FindLeadPage';
import { ViewLeadPage } from '../../pages/ViewLeadPage';
import { EditLeadPage } from '../../pages/EditLeadPage';
import { TestHooks } from '../../support/test-hooks';
import { TestDataService } from '../../test-data/test-data.service';

// Feature: Edit Lead
// Scenario: Edit an existing lead after searching by first name

test('Edit an existing lead after searching by first name', async ({ page }) => {

  const updateData = await TestDataService.getUpdateLeadData(1);
  const { lead_id: leadId, old_first_name: oldFirstName, new_first_name: newFirstName } = updateData[0];

  // Step: Given I am logged in and navigated to Leads section
  const { leadsPage } = await TestHooks.performCompleteLogin(page);

  // Step: And I click the Find Leads link
  await leadsPage.gotoFindLeads();
  const findLeadPage = new FindLeadPage(page);

  // Step: And I enter Lead Id in the Find Leads form
  await findLeadPage.enterLeadId(leadId);

  // Step: And I click the Find Leads button
  await findLeadPage.clickFindLeads();

  // Step: And I select the first resulting lead
  await findLeadPage.selectFirstResultingLead();

  // Step: And I click the Edit button
  const viewLeadPage = new ViewLeadPage(page);
  await viewLeadPage.clickEdit();

  // Step: And I update the first name with new name
  const editLeadPage = new EditLeadPage(page);
  await editLeadPage.updateFirstName(newFirstName);

  // Step: And I click the Update button
  await editLeadPage.clickUpdate();

  // Step: Then I should see the updated first name in the lead details
  await expect(viewLeadPage.firstName).toContainText(newFirstName);
});
