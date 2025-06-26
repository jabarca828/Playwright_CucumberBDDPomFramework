@login @regression
Feature: Webdriver Unviversity - Login page

        Background: Pre Conditions
                Given I navigate to WebdriverUniversity homepage
                When I click on the Login Portal button
                And I switch to a new browser tab

        @random @smoke
        Scenario: Verify Login Page with Random Data (Expected Failed Message)
                And I enter a random username
                And I enter a random password
                And I click the login button
                Then I should be presented with a failed message
        @examples
        Scenario Outline: Verify Login Page with Examples
                And I enter a username <username>
                And I enter a password <password>
                And I click the login button
                Then I should be presented with an alert text '<expectedAlertText>'

                Examples:
                        | username     | password     | expectedAlertText    |
                        | webdriver    | webdriver123 | validation succeeded |
                        | webdriver123 | webdriver    | validation failed    |
                        | playwright   | automation   | validation failed    |