Feature: Merge Lead

  As a CRM user
  I want to merge two leads in the system
  So that duplicate lead information can be consolidated into a single lead record

  @smoke
  Scenario: Successfully merge two leads by lead ID
    Given I am on the Leaftaps login page
    When I enter the username "demosalesmanager"
    And I enter the password "crmsfa"
    And I click the login button
    Then I should see the CRM/SFA link
    When I click the CRM/SFA link
    And I click the Leads tab
    And I click the Merge Leads link
    And I click the "From Lead" lookup icon
    And I enter the Lead ID "10001" in the "From Lead" search field
    And I click the Find Leads button
    And I select the lead with ID "10001" from the search results
    And I click the "To Lead" lookup icon
    And I enter the Lead ID "10002" in the "To Lead" search field
    And I click the Find Leads button
    And I select the lead with ID "10002" from the search results
    And I click the Merge button
    And I confirm the merge operation
    Then the merge should be completed successfully
    And I should see the confirmation message "Leads merged successfully"
    And the "From Lead" with ID "10001" should no longer exist in the system
    And the "To Lead" with ID "10002" should contain the merged information

  @regression
  Scenario: Merge leads with different company names
    Given I am logged in to the Leaftaps application
    And I navigate to the "Merge Leads" page
    When I search for a lead with company name "TestCompany1" as the "From Lead"
    And I search for a lead with company name "TestCompany2" as the "To Lead"
    And I initiate the merge operation
    And I confirm the merge with company preference for "To Lead"
    Then the merge should be completed successfully
    And the resulting lead should have company name "TestCompany2"

  @regression
  Scenario: Attempt to merge the same lead with itself
    Given I am logged in to the Leaftaps application
    And I navigate to the "Merge Leads" page
    When I search for a lead with Lead ID "10003" as the "From Lead"
    And I search for the same lead with Lead ID "10003" as the "To Lead"
    And I attempt to merge the leads
    Then I should see an error message "Cannot merge a lead with itself"
    And the merge operation should not be completed

  @regression
  Scenario: Cancel merge operation
    Given I am logged in to the Leaftaps application
    And I navigate to the "Merge Leads" page
    When I search for a lead with Lead ID "10004" as the "From Lead"
    And I search for a lead with Lead ID "10005" as the "To Lead"
    And I click the Merge button
    And I click the Cancel button in the confirmation dialog
    Then the merge operation should be cancelled
    And both leads should remain unchanged in the system

  @edge-case
  Scenario: Merge leads with one lead having more contact information
    Given I am logged in to the Leaftaps application
    And I navigate to the "Merge Leads" page
    When I search for a lead with minimal information as the "From Lead"
    And I search for a lead with complete contact information as the "To Lead"
    And I initiate the merge operation
    And I confirm the merge operation
    Then the resulting lead should retain all the contact information from the "To Lead"
    And any additional information from the "From Lead" should be preserved
