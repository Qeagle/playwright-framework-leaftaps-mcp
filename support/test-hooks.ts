import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { LeadsPage } from '../pages/LeadsPage';
import { ContactsPage } from '../pages/ContactsPage';
import { testUsers, UserType } from '../configs/users.config';

/**
 * Common test hooks and utility functions for Playwright tests
 */
export class TestHooks {
  static async loginToApplication(page: Page, userType: UserType = 'manager'): Promise<void> {
    const user = testUsers[userType];
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(user.username, user.password);
  }

  static async navigateToCrmSfa(page: Page): Promise<HomePage> {
    const homePage = new HomePage(page);
    await homePage.gotoCrmSfa();
    return homePage;
  }

  static async navigateToLeadsSection(page: Page): Promise<LeadsPage> {
    const leadsPage = new LeadsPage(page);
    await leadsPage.gotoLeadsTab();
    return leadsPage;
  }

  static async navigateToContactsSection(page: Page): Promise<ContactsPage> {
    const contactsPage = new ContactsPage(page);
    await contactsPage.gotoContactsTab();
    return contactsPage;
  }

  static async performCompleteLogin(page: Page, userType: UserType = 'manager'): Promise<{ homePage: HomePage; leadsPage: LeadsPage }> {
    await this.loginToApplication(page, userType);
    const homePage = await this.navigateToCrmSfa(page);
    const leadsPage = await this.navigateToLeadsSection(page);
    return { homePage, leadsPage };
  }

  static async performCompleteLoginWithContacts(page: Page, userType: UserType = 'manager'): Promise<{ homePage: HomePage; leadsPage: LeadsPage; contactsPage: ContactsPage }> {
    await this.loginToApplication(page, userType);
    const homePage = await this.navigateToCrmSfa(page);
    const leadsPage = await this.navigateToLeadsSection(page);
    const contactsPage = await this.navigateToContactsSection(page);
    return { homePage, leadsPage, contactsPage };
  }
}
