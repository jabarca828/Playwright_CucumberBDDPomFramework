@contactus @regression
Feature: WebdriverUniversity.com - Contact Us Page

    Background: Pre Conditions
        Given I navigate to WebdriverUniversity homepage
        When I click on the Contact Us button
        And I switch to a new browser tab

    @smoke
    Scenario: Valid Contact Us Form Submission
        And I type a first name
        And I type a last name
        And I enter an email address
        And I type a comment
        And I click on the submit button
        Then I should be presented with a successful contact us submission message

    @smoke
    Scenario: Invalid Contact Us Form Submission
        And I type a first name
        And I type a last name
        And I type a comment
        And I click on the submit button
        Then I should be presented with an unsuccessful contact us message

    @specific
    Scenario: Valid Contact Us Form Submission - Using Specific Data
        And I type a specific first name "Sarah"
        And I type a specific last name "Birdie"
        And I enter an specific email address "sarah_birdie@yopmail.com"
        And I type specific text "Hello Earth" and a number 2 within the comment input field
        And I click on the submit button
        Then I should be presented with a successful contact us submission message

    @random
    Scenario: Contact Us Form Submission - Using Random Data
        And I type a random first name
        And I type a random last name
        And I enter a random email address
        And I type a random comment
        And I click on the submit button
        Then I should be presented with a successful contact us submission message

    @examples
    Scenario Outline: Validate Contact Us Page
        And I type a first name <firstName> and a last name <lastName>
        And I type a email address '<emailAddress>' and a comment '<comment>'
        And I click on the submit button
        Then I should be presented with header text '<message>'

        Examples:
            | firstName | lastName | emailAddress              | comment                 | message                     |
            | John      | Jones    | john_jones@example.com    | Hello world?            | Thank You for your Message! |
            | Mia       | Carter   | mia_carter123@example.com | Test123 Test123         | Thank You for your Message! |
            | Grace     | Hudson   | grace_hudson              | Do you create websites? | Invalid email address       |
