Feature: Delete Lead by Lead ID in Leaftaps

  As a CRM user
  I want to delete a lead by searching with Lead ID
  So that the lead is removed from the system

  Scenario: Successfully delete a lead using Lead ID
    Given I am logged in to the Leaftaps application
    And I navigate to the "Find Leads" page
    When I enter the Lead ID "12345" in the search field
    And I click the "Find Leads" button
    And I select the lead with ID "12345" from the search results
    And I click the "Delete" button
    Then the lead with ID "12345" should not be found in the system when searched again
