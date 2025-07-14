Feature: User Login

  @smoke
  Scenario Outline: Login with different credentials
    Given I am on the Leaftaps login page
    When I enter the username "<username>"
    And I enter the password "<password>"
    And I click the login button
    Then I should see <result>

    Examples:
      | username          | password   | result                 |
      | demosalesmanager  | crmsfa     | the CRM/SFA link       |
      | invaliduser       | wrongpass  | a login error message  |
