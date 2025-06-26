import { Given, When, Then } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";
import logger from '../logger/logger';
import { CucumberWorld } from "./world/CucumberWorld";

const url = "https://webdriveruniversity.com/"

Given('I navigate to WebdriverUniversity homepage', async function (this: CucumberWorld) {
    try {
        //Access URL
        await this.homePage.navigate(url);
        logger.info('Accessing URL: ' + url);
        this.setUrl(url);
    } catch (error: any) {
        logger.error('An error has occurred: ' + error.message);
    }
});

When('I click on the Contact Us button', async function (this: CucumberWorld) {
    this.homePage.clickOnContactUsButton();
});

When('I click on the Login Portal button', async function (this: CucumberWorld) {
    this.homePage.clickOnLoginPortalButton();
});



