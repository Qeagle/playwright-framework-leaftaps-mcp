export const CreateLeadPageLocators = {
  // Required fields
  companyNameInput: '#createLeadForm_companyName',
  firstNameInput: '#createLeadForm_firstName',
  lastNameInput: '#createLeadForm_lastName',

  // Optional fields
  firstNameLocalInput: '#createLeadForm_firstNameLocal',
  lastNameLocalInput: '#createLeadForm_lastNameLocal',
  salutationInput: '#createLeadForm_personalTitle',
  birthDateInput: '#createLeadForm_birthDate',
  generalProfTitleInput: '#createLeadForm_generalProfTitle',
  departmentInput: '#createLeadForm_departmentName',

  // Contact Info
  phoneCountryCodeInput: '#createLeadForm_primaryPhoneCountryCode',
  phoneAreaCodeInput: '#createLeadForm_primaryPhoneAreaCode',
  phoneNumberInput: '#createLeadForm_primaryPhoneNumber',
  phoneExtensionInput: '#createLeadForm_primaryPhoneExtension',
  askForNameInput: '#createLeadForm_primaryPhoneAskForName',
  emailInput: '#createLeadForm_primaryEmail',
  webUrlInput: '#createLeadForm_primaryWebUrl',

  // Address
  toNameInput: '#createLeadForm_generalToName',
  address1Input: '#createLeadForm_generalAddress1',
  address2Input: '#createLeadForm_generalAddress2',
  cityInput: '#createLeadForm_generalCity',
  stateProvinceDropdown: '#createLeadForm_generalStateProvinceGeoId',
  postalCodeInput: '#createLeadForm_generalPostalCode',
  countryDropdown: '#createLeadForm_generalCountryGeoId',

  // Marketing Info
  industryDropdown: '#createLeadForm_industryEnumId',
  ownershipDropdown: '#createLeadForm_ownershipEnumId',
  sicCodeInput: '#createLeadForm_sicCode',
  annualRevenueInput: '#createLeadForm_annualRevenue',
  currencyDropdown: '#createLeadForm_currencyUomId',
  descriptionTextarea: '#createLeadForm_description',
  importantNoteTextarea: '#createLeadForm_importantNote',

  // Source Info
  dataSourceDropdown: '#createLeadForm_dataSourceId',
  marketingCampaignDropdown: '#createLeadForm_marketingCampaignId',

  // Submit & Reset
  submitButton: 'input[name="submitButton"]',
  resetButton: 'input[name="resetButton"]',

  // Confirmation/Result fields (after lead creation)
  leadId: '#viewLead_companyName_sp',
  leadName: '#viewLead_firstName_sp',
};
