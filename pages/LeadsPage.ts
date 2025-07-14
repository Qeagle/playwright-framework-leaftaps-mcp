import { Page } from '@playwright/test';
import { LeadsPageLocators } from '../locators/LeadsPage.locator';
import { BasePage } from './BasePage';
import { WebLink } from '../elements/WebLink';

export class LeadsPage extends BasePage {
  readonly leadsTab: WebLink;
  readonly createLeadLink: WebLink;
  readonly findLeadsLink: WebLink;
  readonly mergeLeadsLink: WebLink;
  readonly myLeadsLink: WebLink;

  constructor(page: Page) {
    super(page);
    this.leadsTab = new WebLink(page, page.locator(LeadsPageLocators.leadsTab));
    this.createLeadLink = new WebLink(page, page.locator(LeadsPageLocators.createLeadLink));
    this.findLeadsLink = new WebLink(page, page.locator(LeadsPageLocators.findLeadsLink));
    this.mergeLeadsLink = new WebLink(page, page.locator(LeadsPageLocators.mergeLeadsLink));
    this.myLeadsLink = new WebLink(page, page.locator(LeadsPageLocators.myLeadsLink));
  }

   async gotoLeadsTab() {
    await this.leadsTab.click();
    await this.waitForPageLoad();
  }

  async gotoCreateLead() {
    await this.createLeadLink.click();
    await this.waitForPageLoad();
  }

  async gotoFindLeads() {
    await this.findLeadsLink.click();
    await this.waitForPageLoad();
  }

  async gotoMergeLeads() {
    await this.mergeLeadsLink.click();
    await this.waitForPageLoad();
  }
}
