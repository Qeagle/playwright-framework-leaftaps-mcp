Feature: Edit Lead

  @smoke
  Scenario: Edit an existing lead after searching by first name

    Given I am on the Leaftaps login page
    When I enter the username "demosalesmanager"
    And I enter the password "crmsfa"
    And I click the login button
    And I should see the CRM/SFA link
    When I click the CRM/SFA link
    And I click the Leads link
    And I click the Find Leads link
    And I enter first name "Babu" in the Find Leads form
    And I click the Find Leads button
    And I select the first resulting lead
    And I click the Edit button
    And I update the company name to "TestLeaf Pvt Ltd"
    And I click the Update button
    Then I should see the updated company name "TestLeaf Pvt Ltd" in the lead details
