import { Locator, Page, TestInfo } from "@playwright/test";
import { Base } from "../Utilities_ts/Base"
export class ProductPage {
    page: Page;
    testInfo: TestInfo;
    cardBody: Locator;
    allproducts: Locator;
    cartButton: Locator;
    constructor(page: Page, testInfo: TestInfo) {
        this.page = page;
        this.testInfo = testInfo;
        this.cardBody = page.locator(".card-body b");
        this.allproducts = page.locator(".card-body");
        this.cartButton = page.locator("[routerlink='/dashboard/cart']");
    }

    async addToCart(product: string) {
        await this.cardBody.first().waitFor();
        const products: Locator = await this.allproducts;
        for (let i: number = 0; i < await products.count(); ++i) {
            console.log(products.nth(i).locator("b").textContent());
            if (await products.nth(i).locator("b").textContent() === product) {
                await products.nth(i).locator("text=Add To Cart").click();
                break;
            }

        }
        await new Base(this.page, this.testInfo).takeScreenshot("Product Added In Cart");
        await this.cartButton.click();
    }
}