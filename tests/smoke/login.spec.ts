import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { TestHooks } from '../../support/test-hooks';
import { testUsers } from '../../configs/users.config';

test.describe('Leaftaps Login', () => {
  test('Successful login navigates to CRM/SFA', async ({ page }) => {
    await TestHooks.loginToApplication(page);
    await expect(page.locator('text=CRM/SFA')).toBeVisible();
  });

  test('Login fails with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(testUsers.invalidUser.username, testUsers.invalidUser.password);

    await expect(page.locator('#errorDiv')).toBeVisible();
  });
});
