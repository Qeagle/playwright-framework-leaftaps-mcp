Feature: Create Contact

  @smoke
  Scenario: Create a new contact with random details

    Given I am on the Leaftaps login page
    When I enter the username "demosalesmanager"
    And I enter the password "crmsfa"
    And I click the login button
    And I should see the CRM/SFA link
    When I click the CRM/SFA link
    And I click the Contacts link
    And I click the Create Contact link
    And I enter random first name
    And I enter random last name
    And I enter random local first name
    And I enter random local last name
    And I enter random department
    And I enter random description
    And I enter random email
    And I click the Save button
    Then the contact should be created successfully
    And I should see the generated first name and last name in the contact details
