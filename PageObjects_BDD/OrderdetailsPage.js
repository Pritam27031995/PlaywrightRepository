const { Base } = require("../Utilities/Base")
class OrderdetailsPage {
    constructor(page) {
        this.page = page;
        //this.testInfo = testInfo;
        this.orderconfirmationmessage = page.locator(".hero-primary");
        this.orderid = page.locator("label.ng-star-inserted");
    }

    async getOrderId() {
        await this.orderconfirmationmessage.waitFor();
        console.log(await this.orderid.textContent());
        //await new Base(this.page, this.testInfo).takeScreenshot("Order Id Displayed");

    }
}
module.exports = { OrderdetailsPage };