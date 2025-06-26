import { Given, When } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";
import { CucumberWorld } from "./world/CucumberWorld";

When('I switch to a new browser tab', async function (this: CucumberWorld) {
  await this.basePage.switchToNewTab();
})

Given('I wait for {int} seconds', async (seconds:number) => {
    await pageFixture.page.waitForTimeout(seconds * 1000);
})

When('I pause on the page', async() => {
    await pageFixture.page.pause();
})