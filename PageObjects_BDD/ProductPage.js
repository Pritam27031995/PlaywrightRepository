const { Base } = require("../Utilities/Base")
class ProductPage {
    constructor(page) {
        this.page = page;
        //this.testInfo = testInfo;
        this.cardBody = page.locator(".card-body b");
        this.allproducts = page.locator(".card-body");
        this.cartButton = page.locator("[routerlink='/dashboard/cart']");
    }

    async addToCart(product) {
        await this.cardBody.first().waitFor();
        const products = await this.allproducts;
        for (let i = 0; i < await products.count(); ++i) {
            console.log(products.nth(i).locator("b").textContent());
            if (await products.nth(i).locator("b").textContent() === product) {
                await products.nth(i).locator("text=Add To Cart").click();
                break;
            }

        }
        //await new Base(this.page, this.testInfo).takeScreenshot("Product Added In Cart");
        await this.cartButton.click();
    }
}
module.exports = { ProductPage };