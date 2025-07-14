import { faker } from '@faker-js/faker';

export function generateCaseData() {
  return {
    initialAccount: faker.finance.accountName(),
    initialContact: faker.name.fullName(),
    priority: faker.helpers.arrayElement(['1', '3', '5', '7', '9']), // values as per DOM
    type: faker.helpers.arrayElement([
      'RF_BUGFIX', 'RF_CATALOG', 'RF_FEATURE', 'RF_INFO', 'RF_PROPOSAL', 'RF_PUR_QUOTE', 'RF_QUOTE', 'RF_SUPPORT'
    ]),
    reason: faker.helpers.arrayElement([
      '', 'CRCAT_COMPLEX', 'CRCAT_EXISTING_PROB', 'CRCAT_INST_NOTCLEAR', 'CRCAT_NEW_PROB', 'CRCAT_NOTRAIN'
    ]),
    subject: faker.lorem.words(3),
    description: faker.lorem.sentence(),
    internalNote: faker.lorem.sentence()
  };
}
