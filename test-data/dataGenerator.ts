import { faker } from '@faker-js/faker';

export const generateContactData = () => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  firstNameLocal: faker.person.firstName(),
  lastNameLocal: faker.person.lastName(),
  department: faker.commerce.department(),
  description: faker.lorem.sentence(),
  email: faker.internet.email(),
});

export const generateLeadData = () => ({
  companyName: faker.company.name(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  phone: faker.phone.number({ style: 'international' }),
  industry: faker.helpers.arrayElement(['Software', 'Banking', 'Healthcare']),
  country: faker.location.country(),
});

export const generateLeadId = () => {
  // Generate a realistic Lead ID for testing (5-digit number as string)
  return faker.number.int({ min: 10000, max: 99999 }).toString();
};
