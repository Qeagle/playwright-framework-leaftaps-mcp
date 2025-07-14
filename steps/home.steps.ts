import { When, Then } from '@cucumber/cucumber';
import { HomePage } from '../pages/HomePage';

let homePage: HomePage;

When('I click the CRM\\/SFA link', async function () {
  homePage = new HomePage(this.page);
  await homePage.gotoCrmSfa();
});

Then('I should see the logout button', async function () {
  homePage = new HomePage(this.page);
  const isVisible = await homePage.logoutButton.isVisible();
  if (!isVisible) throw new Error('Logout button not visible on Home page');
});
