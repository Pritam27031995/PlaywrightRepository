const { test, expect, request } = require('@playwright/test');
const { only } = require('node:test');

test.only("Test Cart E2E", async function ({ browser }) {
    const product = "ADIDAS ORIGINAL"
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("pritam.debnath@gmail.com");
    await page.locator("#userPassword").fill("Test@1234");
    await page.locator("#login").click();
    await page.locator(".card-body b").first().waitFor();
    const products = await page.locator(".card-body");
    for (let i = 0; i < await products.count(); ++i) {
        console.log(products.nth(i).locator("b").textContent());
        if (await products.nth(i).locator("b").textContent() === product) {
            await products.nth(i).locator("text=Add To Cart").click();
            break;
        }

    }
    await page.locator("[routerlink='/dashboard/cart']").click();
    await page.locator("text=My Cart").waitFor();
    await expect(page.locator("h3:has-text('" + product + "')").isVisible()).toBeTruthy();
    await page.locator("text=Checkout").click();
    await page.locator("text= Payment Method ").waitFor();
    await page.locator("[placeholder='Select Country']").pressSequentially("Ind");
    await page.locator(".ta-results").waitFor();
    const list = await page.locator(".ta-item");
    await console.log(list.count());
    for (let j = 0; j < await list.count(); ++j) {
        if (await list.nth(j).textContent() === " India") {
            await list.nth(j).locator("i").click();
            break;

        }
    }
    await expect(page.locator("label[type='text']")).toHaveText("pritam.debnath@gmail.com");
    await page.locator("text=Place Order ").click();
    await page.locator(".hero-primary").waitFor();
    console.log(await page.locator("label.ng-star-inserted").textContent());



})