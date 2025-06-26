import { Given, When, Then } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";
import { expect } from "@playwright/test"
import { faker } from "@faker-js/faker"
import { CucumberWorld } from "./world/CucumberWorld";
import  logger from '../logger/logger';

When('I type a first name', async function (this: CucumberWorld) {
    logger.info(`Base URL stored in Cucumber World: ${this.getURL()}`)
    await pageFixture.page.getByRole('textbox', { name: 'First Name' }).fill("Joe");
});

When('I type a last name', async () => {
    await pageFixture.page.getByRole('textbox', { name: 'Last Name' }).fill("Golf");
});

When('I enter an email address', async () => {
    await pageFixture.page.getByRole('textbox', { name: 'Email Address' }).fill("joe_golf828@yopmail.com");
});

When('I type a comment', async () => {
    await pageFixture.page.getByRole('textbox', { name: 'Comments' }).fill("Hello World");
});

When('I click on the submit button', async () => {
    //Wait for the button to load
    await pageFixture.page.waitForSelector("input[value='SUBMIT']");

    //Once loaded, click on the button
    await pageFixture.page.click("input[value='SUBMIT']");
});

Then('I should be presented with a successful contact us submission message', async () => {
    //Wait for the header  text
    await pageFixture.page.waitForSelector("#contact_reply h1");

    //get the text from the h1 element
    const text = await pageFixture.page.innerText("#contact_reply h1");

    //User Playwright's 'expect' function to assert the text of the h1 element
    expect(text).toBe("Thank You for your Message!");
});

Then('I should be presented with an unsuccessful contact us message', async () => {
    //Wait for <body> element
    await pageFixture.page.waitForSelector("body");

    //Locate the <body> element
    const bodyElement = await pageFixture.page.locator("body");

    //Extract text from the element
    const bodyText = await bodyElement.textContent();
    await expect(bodyText).toMatch(/Error: (all fields are required|Invalid email adress)/);
});

//Cucumber Expressions:
When('I type a specific first name {string}', async (firstName: string) => {
    await pageFixture.page.getByRole('textbox', { name: 'First Name' }).fill(firstName);
});


When('I type a specific last name {string}', async (lastName: string) => {
    await pageFixture.page.getByRole('textbox', { name: 'Last Name' }).fill(lastName);
});


When('I enter an specific email address {string}', async (emailAdress: string) => {
    await pageFixture.page.getByRole('textbox', { name: 'Email Address' }).fill(emailAdress);
});

When('I type specific text {string} and a number {int} within the comment input field', async (word: string, number: number) => {
    await pageFixture.page.getByPlaceholder('Comments').fill(word + " " + number);
});

//Random Data - Faker
When('I type a random first name', async function (this: CucumberWorld) {
    const randomFirstName = faker.person.firstName();
    this.setFirstName(randomFirstName);
    await pageFixture.page.getByRole('textbox', { name: 'First Name' }).fill(randomFirstName);

});

When('I type a random last name', async function (this: CucumberWorld) {
    const randomLastName = faker.person.lastName();
    this.setLastName(randomLastName);
    await pageFixture.page.getByRole('textbox', { name: 'Last Name' }).fill(randomLastName);
});

When('I enter a random email address', async function (this: CucumberWorld) {
    const randomEmail = faker.internet.email();
    this.setEmailAddress(randomEmail);
    await pageFixture.page.getByRole('textbox', { name: 'Email Address' }).fill(randomEmail);
});

When('I type a random comment', async function (this: CucumberWorld) {
    await pageFixture.page.getByPlaceholder('Comments').fill(`Please could you contact me? \n Thanks \n ${this.getFirstName()} ${this.getLastName()} \n ${this.getEmailAddress()} `)
});

//Scenario Outlines:
When('I type a first name {word} and a last name {word}', async (firstName: string, lastName: string) => {
    await pageFixture.page.getByPlaceholder('First Name').fill(firstName);
    await pageFixture.page.getByPlaceholder('Last Name').fill(lastName);
});

When('I type a email address {string} and a comment {string}', async (email: string, comment: string) => {
    await pageFixture.page.getByPlaceholder('Email Address').fill(email);
    await pageFixture.page.getByPlaceholder('Comments').fill(comment);
});

Then('I should be presented with header text {string}', async (message: string) => {
    //wait for the target elements
    await pageFixture.page.waitForSelector("//h1 | //body", {state: 'visible'});

    //get all elements
    const elements = await pageFixture.page.locator("//h1 | //body").elementHandles();
    
    let foundElementText = '';

    //loop through each of the elements
    for(let element of elements) {
        //get the inner text of the element
        let text = await element.innerText();

        //if statement to check whether text includes expected text
        if(text.includes(message)) {
            foundElementText = text;
            break;
        }
    }
    //perform an assertion
    expect(foundElementText).toContain(message);
});
