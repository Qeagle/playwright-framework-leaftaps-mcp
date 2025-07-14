import { test, expect } from '@playwright/test';
import { FindLeadPage } from '../../pages/FindLeadPage';
import { ViewLeadPage } from '../../pages/ViewLeadPage';
import { TestHooks } from '../../support/test-hooks';
import { TestDataService } from '../../test-data/test-data.service';

test('Successfully delete a lead using Lead ID', async ({ page }) => {
  // Step: Get test data from MCP server for creating a lead to delete
  const leadData = await TestDataService.getDeleteLeadData(1);
  const { lead_id: leadId} = leadData[0];
  let actualLeadId: string;

  // Step: Given I am logged in and navigated to Create Lead page  
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
  actualLeadId = await viewLeadPage.getLeadId();
  console.log(`Created Lead ID for testing: ${actualLeadId}`);

  // Step: And I click the "Delete" button
  await viewLeadPage.clickDelete();

  // Step: Then the lead should not be found in the system when searched again
  // Navigate back to Find Leads to verify deletion
  await leadsPage.gotoFindLeads();

  // Search for the same Lead ID again
  await findLeadPage.enterLeadId(actualLeadId);
  await findLeadPage.clickFindLeads();

  // Assert that no records are found
  const noRecordsFound = await findLeadPage.verifyNoRecordsFound();
  expect(noRecordsFound).toBe(true);

  console.log(`Test passed: Lead with ID ${actualLeadId} was successfully deleted and cannot be found`);
});