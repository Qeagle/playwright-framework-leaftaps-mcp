export const CreateContactPageLocators = {
  // Required fields
  firstNameInput: '#firstNameField',
  lastNameInput: '#lastNameField',

  // Optional fields
  firstNameLocalInput: '#createContactForm_firstNameLocal',
  lastNameLocalInput: '#createContactForm_lastNameLocal',
  salutationInput: '#createContactForm_personalTitle',
  birthDateInput: '#createContactForm_birthDate',
  generalProfTitleInput: '#createContactForm_generalProfTitle',
  departmentInput: '#createContactForm_departmentName',

  // Contact Info
  phoneCountryCodeInput: '#createContactForm_primaryPhoneCountryCode',
  phoneAreaCodeInput: '#createContactForm_primaryPhoneAreaCode',
  phoneNumberInput: '#createContactForm_primaryPhoneNumber',
  phoneExtensionInput: '#createContactForm_primaryPhoneExtension',
  askForNameInput: '#createContactForm_primaryPhoneAskForName',
  emailInput: '#createContactForm_primaryEmail',
  webUrlInput: '#createContactForm_primaryWebUrl',

  // Address
  toNameInput: '#generalToNameField',
  address1Input: '#createContactForm_generalAddress1',
  address2Input: '#createContactForm_generalAddress2',
  cityInput: '#createContactForm_generalCity',
  stateProvinceDropdown: '#createContactForm_generalStateProvinceGeoId',
  postalCodeInput: '#createContactForm_generalPostalCode',
  countryDropdown: '#createContactForm_generalCountryGeoId',

  // Additional Info
  descriptionTextarea: '#createContactForm_description',
  importantNoteTextarea: '#createContactForm_importantNote',

  // Submit & Reset
  saveButton: 'input[name="submitButton"]',
  resetButton: 'input[name="resetButton"]',

  // Confirmation/Result fields (after contact creation)
  contactId: '#viewContact_contactId_sp',
  contactName: '#viewContact_firstName_sp',
};
