export const MergeLeadPageLocators = {
  // From Lead Section
  fromLeadLookupIcon: '(//img[@alt="Lookup"])[1]',
  fromLeadId: '//input[@name="partyIdFrom"]',
  
  // To Lead Section  
  toLeadLookupIcon: '(//img[@alt="Lookup"])[2]',
  toLeadId: '//input[@name="partyIdTo"]',
  
  // Find Leads popup elements
  findLeadsPopupLeadIdField: '//input[@name="id"]',
  findLeadsPopupButton: '//button[contains(text(),"Find Leads")]',
  firstSearchResult: '(//table[contains(@class,"x-grid3-row-table")]//td//a)[1]',
  
  // Merge operation buttons
  mergeButton: '//a[contains(@class,"buttonDangerous") and contains(text(),"Merge")]',
  confirmMergeButton: '//input[@value="Merge"]',
  
  // Success/Error messages
  successMessage: '//div[contains(@class,"errorMessage") or contains(@class,"successMessage")]',
  errorMessage: '//div[contains(@class,"errorMessage")]',
  
  // Navigation elements
  mergeLeadsTitle: '//div[@class="screenlet-title-bar"]//h3[contains(text(),"Merge Leads")]',
};
