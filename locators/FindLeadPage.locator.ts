export const FindLeadPageLocators = {
  findLeadsTab: 'a:has-text("Find Leads")',
  // Use relative selector: firstName field right of Lead ID field
  firstNameField: '//input[@name="id"]/following::input[@name="firstName"]',
  lastNameField: '//input[@name="id"]/following::input[@name="lastName"]',
  leadIdField: '//input[@name="id"]',
  emailTab: '//span[@class="x-tab-strip-text" and contains(text(),"Email")]',
  emailField: '//input[@name="emailAddress"]',
  phoneTab: '//span[@class="x-tab-strip-text" and contains(text(),"Phone")]',
  phoneField: '//input[@name="phoneNumber"]',
  findLeadsButton: '//button[contains(text(),"Find Leads")]',
  searchResultRow: '//table[contains(@class,"x-grid3-row-table")]',
  firstResultLink: '(//table[contains(@class,"x-grid3-row-table")]//td//a)[1]',
  noRecordsMsg: '//div[contains(text(),"No records to display")]',
};
