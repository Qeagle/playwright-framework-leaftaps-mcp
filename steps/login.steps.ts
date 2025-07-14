import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';

let loginPage: LoginPage;
let homePage: HomePage;

Given('I am on the Leaftaps login page', async function () {
  loginPage = new LoginPage(this.page);
  await loginPage.goto();
});

When('I enter the username {string}', async function (username: string) {
  await loginPage.usernameInput.fill(username, 'Username');
});

When('I enter the password {string}', async function (password: string) {
  await loginPage.passwordInput.fill(password, 'Password');
});

When('I click the login button', async function () {
  await loginPage.loginButton.click('Login Button');
});

Then('I should see the CRM\\/SFA link', async function () {
  homePage = new HomePage(this.page);
  const isVisible = await homePage.crmSfaLink.isVisible();
  expect(isVisible).toBeTruthy();
});

Then('I should see a login error message', async function () {
  const errorMsg = await loginPage.getErrorMessage();
  expect(errorMsg && errorMsg.trim().length > 0).toBeTruthy();
});
