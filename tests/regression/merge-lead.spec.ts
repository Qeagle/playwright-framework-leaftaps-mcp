import { test, expect } from '@playwright/test';
import { MergeLeadPage } from '../../pages/MergeLeadPage';
import { FindLeadPage } from '../../pages/FindLeadPage';
import { TestHooks } from '../../support/test-hooks';
import { TestDataService } from '../../test-data/test-data.service';

test('Successfully merge two leads by lead ID @smoke', async ({ page }) => {

  const mergeData = await TestDataService.getMergeLeadData(1);
  const { from_lead_id: fromLeadId, to_lead_id: toLeadId } = mergeData[0];

  // Step: Given I am logged in and navigated to Leads section
  const { homePage, leadsPage } = await TestHooks.performCompleteLogin(page);

  // Step: And I click the Merge Leads link
  await leadsPage.gotoMergeLeads();

  // Initialize Merge Lead Page
  const mergeLeadPage = new MergeLeadPage(page);

  // Step: And I click the "From Lead" lookup icon
  // Step: And I enter the Lead ID "10001" in the "From Lead" search field
  // Step: And I click the Find Leads button
  // Step: And I select the lead with ID "10001" from the search results
  await mergeLeadPage.searchAndSelectFromLead(fromLeadId);

  // Step: And I click the "To Lead" lookup icon  
  // Step: And I enter the Lead ID "10002" in the "To Lead" search field
  // Step: And I click the Find Leads button
  // Step: And I select the lead with ID "10002" from the search results
  await mergeLeadPage.searchAndSelectToLead(toLeadId);

  // Verify the lead IDs are populated correctly
  const fromLeadVerified = await mergeLeadPage.verifyFromLeadId(fromLeadId);
  const toLeadVerified = await mergeLeadPage.verifyToLeadId(toLeadId);
  expect(fromLeadVerified).toBe(true);
  expect(toLeadVerified).toBe(true);

  // Step: And I click the Merge button
  await mergeLeadPage.clickMergeButtonAndAcceptAlert();

  // Step: And the "From Lead" with ID "10001" should no longer exist in the system
  // Navigate to Find Leads to verify the from lead no longer exists
  await leadsPage.gotoFindLeads();
  const findLeadPage = new FindLeadPage(page);
  await findLeadPage.enterLeadId(fromLeadId);
  await findLeadPage.clickFindLeads();
  
  const noRecordsFound = await findLeadPage.verifyNoRecordsFound();
  expect(noRecordsFound).toBe(true);

  // Step: And the "To Lead" with ID "10002" should contain the merged information
  // Verify the to lead still exists (basic verification)
  await findLeadPage.enterLeadId(toLeadId);
  await findLeadPage.clickFindLeads();
  
  // If we reach here without the "no records" message, the lead exists
  const toLeadExists = !(await findLeadPage.verifyNoRecordsFound());
  expect(toLeadExists).toBe(true);
});
