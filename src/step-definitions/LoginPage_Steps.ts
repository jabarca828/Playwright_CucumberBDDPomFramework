import { Given, When, Then } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";
import { expect } from "@playwright/test"
import { faker } from "@faker-js/faker"

let alertText: string;

When('I click the login button', async () => {
    //Setting Alert before clicking Login so Javascript is prepared for it
    await pageFixture.page.on("dialog", async (alert) => {
        alertText = alert.message();
        await alert.accept();
    })
        const loginButton = await pageFixture.page.locator("#login-button");
        await loginButton.hover();
        await loginButton.click({ force: true });
    })

Then('I should be presented with a failed message', async () => {
    expect(alertText).toBe("validation failed");
})

Then('I should be presented with an alert text {string}', async (expectedAlertText: string) => {
    expect(alertText).toBe(expectedAlertText);
})

//Random Data
When('I enter a random username', async () => {
    await pageFixture.page.getByRole('textbox', { name: 'Username' }).fill(faker.internet.username());
});

When('I enter a random password', async () => {
    await pageFixture.page.getByRole('textbox', { name: 'Password' }).fill(faker.internet.password());
});

//Scenario Outlines:
When('I enter a username {word}', async (username: string) => {
    await pageFixture.page.getByRole('textbox', { name: 'Username' }).fill(username);
});


When('I enter a password {word}', async (password: string) => {
    await pageFixture.page.getByRole('textbox', { name: 'Password' }).fill(password);
});

