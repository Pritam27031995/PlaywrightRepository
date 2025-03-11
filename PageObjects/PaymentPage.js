const { Base } = require("../Utilities/Base")
const { expect } = require('@playwright/test');
class PaymentPage {
    constructor(page, testInfo) {
        this.page = page;
        this.testInfo = testInfo;
        this.paymentMethod = page.locator("text= Payment Method ");
        this.selectCountry = page.locator("[placeholder='Select Country']");
        this.countryResults = page.locator(".ta-results");
        this.item = page.locator(".ta-item");
        this.email = page.locator("label[type='text']");
        this.placeOrder = page.locator("text=Place Order ");
    }

    async validatePaymentandPlaceOrder(emailId) {
        await this.paymentMethod.waitFor();
        await this.selectCountry.pressSequentially("Ind");
        await this.countryResults.waitFor();
        const list = await this.item;
        await console.log(list.count());
        for (let j = 0; j < await list.count(); ++j) {
            if (await list.nth(j).textContent() === " India") {
                await list.nth(j).locator("i").click();
                break;

            }
        }
        await expect(this.email).toHaveText(emailId);
        await new Base(this.page, this.testInfo).takeScreenshot("Payment Details validated");
        await this.placeOrder.click();
    }
}
module.exports = { PaymentPage };