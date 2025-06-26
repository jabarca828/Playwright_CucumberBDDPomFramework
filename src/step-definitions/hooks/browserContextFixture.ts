import { Page, BrowserContext } from "@playwright/test";

export const pageFixture = {
    // @ts-ignore
    page: undefined as Page, //Represents a single web page within a context

    // @ts-ignore
    context: undefined as BrowserContext, //Represents a browser context (a seperate browsing session); Each context has its own cookies, cache, and storage.
};