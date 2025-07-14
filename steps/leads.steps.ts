import { When, Then } from '@cucumber/cucumber';
import { LeadsPage } from '../pages/LeadsPage';

let leadsPage: LeadsPage;

When('I click the Leads tab', async function () {
  leadsPage = new LeadsPage(this.page);
  await leadsPage.leadsTab.click('Click Leads Tab');
});

When('I click the Create Lead link', async function () {
  leadsPage = new LeadsPage(this.page);
  await leadsPage.gotoCreateLead();
});

When('I click the Find Leads link', async function () {
  leadsPage = new LeadsPage(this.page);
  await leadsPage.gotoFindLeads();
});

When('I click the Merge Leads link', async function () {
  leadsPage = new LeadsPage(this.page);
  await leadsPage.gotoMergeLeads();
});

Then('I should see the My Leads link', async function () {
  leadsPage = new LeadsPage(this.page);
  const isVisible = await leadsPage.myLeadsLink.isVisible();
  if (!isVisible) throw new Error('My Leads link not visible');
});
