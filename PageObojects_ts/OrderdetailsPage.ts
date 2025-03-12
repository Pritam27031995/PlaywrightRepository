import { Locator, Page, TestInfo, expect } from "@playwright/test";
import { Base } from "../Utilities_ts/Base"
export class OrderdetailsPage {
    page: Page;
    testInfo: TestInfo;
    orderconfirmationmessage: Locator;
    orderid: Locator;
    constructor(page: Page, testInfo: TestInfo) {
        this.page = page;
        this.testInfo = testInfo;
        this.orderconfirmationmessage = page.locator(".hero-primary");
        this.orderid = page.locator("label.ng-star-inserted");
    }

    async getOrderId() {
        await this.orderconfirmationmessage.waitFor();
        console.log(await this.orderid.textContent());
        await new Base(this.page, this.testInfo).takeScreenshot("Order Id Displayed");

    }
}