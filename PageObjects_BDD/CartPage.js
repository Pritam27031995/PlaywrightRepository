const { Base } = require("../Utilities/Base")
const { expect } = require('@playwright/test');
class CartPage {
    constructor(page) {
        this.page = page;
        //this.testInfo = testInfo;
        this.myCart = page.locator("text=My Cart");
        this.checkout = page.locator("text=Checkout");
    }

    async validateCart(product) {
        await this.myCart.waitFor();
        await expect(this.page.locator("h3:has-text('" + product + "')").isVisible()).toBeTruthy();
        //await new Base(this.page, this.testInfo).takeScreenshot("Product Visible In Cart Page");
        await this.checkout.click();
    }
}
module.exports = { CartPage };