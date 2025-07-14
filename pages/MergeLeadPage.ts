import { Page, expect } from '@playwright/test';
import { MergeLeadPageLocators } from '../locators/MergeLeadPage.locator';
import { BasePage } from './BasePage';
import { WebEdit } from '../elements/WebEdit';
import { WebButton } from '../elements/WebButton';
import { WebLink } from '../elements/WebLink';

export class MergeLeadPage extends BasePage {
  // Locators for various elements on the Merge Lead page
  private fromLeadLookupIcon: WebButton;
  private toLeadLookupIcon: WebButton;
  private fromLeadId: WebEdit;
  private toLeadId: WebEdit;
  private findLeadsPopupLeadIdField: WebEdit;
  private findLeadsPopupButton: WebButton;
  private firstSearchResult: WebLink;
  private mergeButton: WebLink;
  private confirmMergeButton: WebButton;

  constructor(page: Page) {
    super(page);
    // Initialize locators
    this.fromLeadLookupIcon = new WebButton(page, page.locator(MergeLeadPageLocators.fromLeadLookupIcon));
    this.toLeadLookupIcon = new WebButton(page, page.locator(MergeLeadPageLocators.toLeadLookupIcon));
    this.fromLeadId = new WebEdit(page, page.locator(MergeLeadPageLocators.fromLeadId));
    this.toLeadId = new WebEdit(page, page.locator(MergeLeadPageLocators.toLeadId));
    this.findLeadsPopupLeadIdField = new WebEdit(page, page.locator(MergeLeadPageLocators.findLeadsPopupLeadIdField));
    this.findLeadsPopupButton = new WebButton(page, page.locator(MergeLeadPageLocators.findLeadsPopupButton));
    this.firstSearchResult = new WebLink(page, page.locator(MergeLeadPageLocators.firstSearchResult));
    this.mergeButton = new WebLink(page, page.locator(MergeLeadPageLocators.mergeButton));
    this.confirmMergeButton = new WebButton(page, page.locator(MergeLeadPageLocators.confirmMergeButton));
  }

  // Clicks the From Lead Lookup icon and waits for the page to load
  async clickFromLeadLookup() {
    await this.fromLeadLookupIcon.click('Click From Lead Lookup Icon');
    await this.waitForPageLoad();
    this.log('Clicked From Lead lookup icon');
  }

  // Clicks the To Lead Lookup icon and waits for the page to load
  async clickToLeadLookup() {
    await this.toLeadLookupIcon.click('Click To Lead Lookup Icon');
    await this.waitForPageLoad();
    this.log('Clicked To Lead lookup icon');
  }

  // Enters the given Lead ID in the popup field
  async enterLeadIdInPopup(leadId: string) {
    await this.findLeadsPopupLeadIdField.fill(leadId, 'Lead ID in Popup');
    this.log(`Entered Lead ID in popup: ${leadId}`);
  }

  // Clicks the Find Leads button in the popup
  async clickFindLeadsInPopup() {
    await this.findLeadsPopupButton.click('Click Find Leads in Popup');
    this.log('Clicked Find Leads button in popup');
  }

  // Selects the first search result in the popup
  async selectFirstSearchResult() {
    await this.firstSearchResult.click('Select First Search Result');
    await this.waitForPageLoad();
    this.log('Selected first search result');
  }

  // Helper method to select a lead in the popup by type (From/To)
  private async selectLeadInPopup(lookupIcon: WebButton, leadId: string, type: 'From' | 'To') {
    const [popup] = await Promise.all([
      this.page.context().waitForEvent('page'),
      lookupIcon.click(`Click ${type} Lead Lookup Icon`)
    ]);
    await popup.waitForLoadState();
    const leadIdInput = popup.locator(MergeLeadPageLocators.findLeadsPopupLeadIdField);
    await leadIdInput.fill(leadId);
    const findBtn = popup.locator(MergeLeadPageLocators.findLeadsPopupButton);
    await findBtn.click();
    const firstResult = popup.locator(MergeLeadPageLocators.firstSearchResult);
    await firstResult.waitFor({ state: 'visible', timeout: 5000 });
    await firstResult.click();
    await popup.close();
    this.log(`Completed ${type} Lead selection for ID: ${leadId}`);
  }

  // Searches and selects the From Lead by ID
  async searchAndSelectFromLead(leadId: string) {
    await this.selectLeadInPopup(this.fromLeadLookupIcon, leadId, 'From');
  }

  // Searches and selects the To Lead by ID
  async searchAndSelectToLead(leadId: string) {
    await this.selectLeadInPopup(this.toLeadLookupIcon, leadId, 'To');
  }

  // Clicks the Merge button and accepts the alert
  async clickMergeButtonAndAcceptAlert() {
    await Promise.all([
      this.page.once('dialog', async (dialog) => {
        this.log(`Dialog message: ${dialog.message()}`);
        await dialog.accept();
      }),
      this.mergeButton.click('Click Merge Button')
    ]);
    await this.waitForPageLoad();
    this.log('Clicked Merge button and accepted alert');
  }

  // Confirms the merge operation
  async confirmMergeOperation() {
    await this.confirmMergeButton.click('Confirm Merge Operation');
    await this.waitForPageLoad();
    this.log('Confirmed merge operation');
  }

  // Verifies if the merge was successful by checking the success message
  async verifyMergeSuccess(): Promise<boolean> {
    try {
      const successMessage = this.page.locator(MergeLeadPageLocators.successMessage);
      await successMessage.waitFor({ state: 'visible', timeout: 5000 });
      const messageText = await successMessage.textContent();
      this.log(`Merge success message: ${messageText}`);
      return messageText?.includes('successfully') || messageText?.includes('merged') || false;
    } catch (error) {
      this.log(`Failed to verify merge success: ${error}`);
      return false;
    }
  }

  // Verifies the From Lead ID matches the expected value
  async verifyFromLeadId(expectedLeadId: string): Promise<boolean> {
    try {
      const fromLeadValue = await this.fromLeadId.getLocator().inputValue();
      const isMatch = fromLeadValue === expectedLeadId;
      this.log(`From Lead ID verification - Expected: ${expectedLeadId}, Actual: ${fromLeadValue}, Match: ${isMatch}`);
      return isMatch;
    } catch (error) {
      this.log(`Failed to verify From Lead ID: ${error}`);
      return false;
    }
  }

  // Verifies the To Lead ID matches the expected value
  async verifyToLeadId(expectedLeadId: string): Promise<boolean> {
    try {
      const toLeadValue = await this.toLeadId.getLocator().inputValue();
      const isMatch = toLeadValue === expectedLeadId;
      this.log(`To Lead ID verification - Expected: ${expectedLeadId}, Actual: ${toLeadValue}, Match: ${isMatch}`);
      return isMatch;
    } catch (error) {
      this.log(`Failed to verify To Lead ID: ${error}`);
      return false;
    }
  }

  // Performs the complete merge operation from selecting leads to verifying the merge
  async performMergeOperation(fromLeadId: string, toLeadId: string) {
    await this.searchAndSelectFromLead(fromLeadId);
    await this.searchAndSelectToLead(toLeadId);
    await this.clickMergeButtonAndAcceptAlert();
    // Wait for the View Lead page to appear (after merge)
    const viewLeadHeader = this.page.locator('text=View Lead');
    await viewLeadHeader.waitFor({ state: 'visible', timeout: 10000 });
    this.log('View Lead page appeared after merge');
    this.log(`Completed merge operation from Lead ID: ${fromLeadId} to Lead ID: ${toLeadId}`);
  }
}
