const { test, expect, request } = require('@playwright/test');
const { only } = require('node:test');
let token;
let orderID;

test('First Playwright test browser', async ({ browser }) => {
    //playwright code-
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    //Supports both CSS and Xpath but CSS prefer
    await page.locator("input#username").fill("rahulshettyacademy");
    await page.locator("input#password").fill("learning");
    await page.locator("input#signInBtn").click();
    //console.log(await page.locator("[style*='block']").textContent());
    //await expect(page.locator("[style*='block']")).toContainText("Incorrect username/password.");
    console.log(await page.locator(".card-title a").nth(0).textContent());
    console.log("-----------------------------------------------");
    console.log(await page.locator(".card-title a").allTextContents());
});

test('Second Playwright test page', async ({ page }) => {
    //playwright code-
    await page.goto("https://google.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});

test("Test RahulshettyAcdemy client page", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("pritam.debnath@gmail.com");
    await page.locator("#userPassword").fill("Test@1234");
    await page.locator("#login").click();
    //console.log(await page.locator(".logo h3").textContent());
    await page.locator(".card-body b").first().waitFor();
    let Products = await page.locator(".card-body b").allTextContents();
    console.log("Displayed products are: " + Products);

});

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

test('@Webst Client App login', async ({ page }) => {
    //js file- Login js, DashboardPage
    const email = "anshika@gmail.com";
    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
    await page.getByRole('button', { name: "Login" }).click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();

    await page.locator(".card-body").filter({ hasText: "ZARA COAT 3" })
        .getByRole("button", { name: "Add to Cart" }).click();

    await page.getByRole("listitem").getByRole('button', { name: "Cart" }).click();

    //await page.pause();
    await page.locator("div li").first().waitFor();
    await expect(page.getByText("ZARA COAT 3")).toBeVisible();

    await page.getByRole("button", { name: "Checkout" }).click();

    await page.getByPlaceholder("Select Country").pressSequentially("ind");

    await page.getByRole("button", { name: "India" }).nth(1).click();
    await page.getByText("PLACE ORDER").click();

    await expect(page.getByText("Thankyou for the order.")).toBeVisible();
})

test.beforeAll(async () => {
    const loginpayload = { userEmail: "pritam.debnath@gmail.com", userPassword: "Test@1234" }
    const OrderCreationPayload = {orders: [{country: "India", productOrderedId: "67a8dde5c0d3e6622a297cc8"}]}

    const newApiResponse = await request.newContext();
    const newPostCall = await newApiResponse.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
        data: loginpayload
    }
    )
    await expect(newPostCall.ok()).toBeTruthy();
    const json = await newPostCall.json();
    token = await json.token;
    const newOrdercReationPostCall = await newApiResponse.post("https://rahulshettyacademy.com/api/ecom/order/create-order",{
        data: OrderCreationPayload,
        headers: {
            "authorization": token,
            "content-type" : "application/json",
                  }
    })
    const orderresp = await newOrdercReationPostCall.json();
    orderID = await orderresp.orders[0];
})

test('WebAPI Testing', async ({page}) => {
    console.log("Toke is: "+ token);
    await page.addInitScript(value => {
        window.localStorage.setItem('token',value);
    },token);
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("text='ORDERS'").click();
    await page.getByText("Your Orders").waitFor();
    console.log("Order Id is: "+orderID);
    await page.locator("tr.ng-star-inserted").filter({hasText:orderID}).getByText("View").click();
    await page.getByText("ORDER SUMMARY").waitFor();
    await page.screenshot({path: 'screenshot.png'});
})




