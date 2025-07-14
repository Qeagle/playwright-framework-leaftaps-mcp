import { Page } from '@playwright/test';
import { LoginPageLocators } from '../locators/LoginPage.locator';
import { BasePage } from './BasePage';
import { WebEdit } from '../elements/WebEdit';
import { WebButton } from '../elements/WebButton';
import { WebElement } from '../elements/WebElement';

export class LoginPage extends BasePage {
  readonly usernameInput: WebEdit;
  readonly passwordInput: WebEdit;
  readonly loginButton: WebButton;
  readonly errorMsg: WebElement;

  constructor(page: Page) {
    super(page);
    this.usernameInput = new WebEdit(page, page.locator(LoginPageLocators.usernameInput));
    this.passwordInput = new WebEdit(page, page.locator(LoginPageLocators.passwordInput));
    this.loginButton = new WebButton(page, page.locator(LoginPageLocators.loginButton));
    this.errorMsg = new WebElement(page, page.locator(LoginPageLocators.errorMsg));
  }

  async goto() {
    await this.page.goto('http://leaftaps.com/opentaps');
    await this.waitForPageLoad();
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username, 'Username');
    await this.passwordInput.fill(password, 'Password');
    await this.loginButton.click('Login Button');
    await this.waitForPageLoad();
  }

  async getErrorMessage(): Promise<string | null> {
    if (await this.errorMsg.isVisible()) {
      return await this.errorMsg.textContent();
    }
    return null;
  }
}
