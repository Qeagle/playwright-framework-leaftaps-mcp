Feature: Create Lead
  
  @smoke
  Scenario: Create a lead with random details

    Given I am on the Leaftaps login page
    When I enter the username "demosalesmanager"
    And I enter the password "crmsfa"
    And I click the login button
    When I click the CRM/SFA link
    And I click the Leads tab
    And I click the Create Lead link
    And I generate random lead data
    And I enter company name
    And I enter first name
    And I enter last name
    And I enter email
    And I enter phone number
    And I click the submit button
    Then the lead should be created successfully
    And I should see the generated first name in the first name field
    And I should see the generated company name in the company name field