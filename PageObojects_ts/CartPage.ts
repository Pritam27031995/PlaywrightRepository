import { Locator, Page, TestInfo, expect } from "@playwright/test";
import { Base } from "../Utilities_ts/Base"
export class CartPage {
    page: Page;
    testInfo: TestInfo;
    myCart: Locator;
    checkout: Locator;
    constructor(page: Page, testInfo: TestInfo) {
        this.page = page;
        this.testInfo = testInfo;
        this.myCart = page.locator("text=My Cart");
        this.checkout = page.locator("text=Checkout");
    }

    async validateCart(product: string) {
        await this.myCart.waitFor();
        await expect(this.page.locator("h3:has-text('" + product + "')").isVisible()).toBeTruthy();
        await new Base(this.page, this.testInfo).takeScreenshot("Product Visible In Cart Page");
        await this.checkout.click();
    }
}
