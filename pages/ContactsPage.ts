import { Page } from '@playwright/test';
import { ContactsPageLocators } from '../locators/ContactsPage.locator';
import { BasePage } from './BasePage';
import { WebLink } from '../elements/WebLink';

export class ContactsPage extends BasePage {
  readonly contactsTab: WebLink;
  readonly createContactLink: WebLink;
  readonly findContactsLink: WebLink;
  readonly mergeContactsLink: WebLink;
  readonly myContactsLink: WebLink;

  constructor(page: Page) {
    super(page);
    this.contactsTab = new WebLink(page, page.locator(ContactsPageLocators.contactsTab));
    this.createContactLink = new WebLink(page, page.locator(ContactsPageLocators.createContactLink));
    this.findContactsLink = new WebLink(page, page.locator(ContactsPageLocators.findContactsLink));
    this.mergeContactsLink = new WebLink(page, page.locator(ContactsPageLocators.mergeContactsLink));
    this.myContactsLink = new WebLink(page, page.locator(ContactsPageLocators.myContactsLink));
  }

  async gotoContactsTab() {
    await this.contactsTab.click();
    await this.waitForPageLoad();
  }

  async gotoCreateContact() {
    await this.createContactLink.click();
    await this.waitForPageLoad();
  }

  async gotoFindContacts() {
    await this.findContactsLink.click();
    await this.waitForPageLoad();
  }

  async gotoMergeContacts() {
    await this.mergeContactsLink.click();
    await this.waitForPageLoad();
  }
}
