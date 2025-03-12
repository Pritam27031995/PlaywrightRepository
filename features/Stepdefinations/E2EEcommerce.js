const { Given, When, Then } = require('@cucumber/cucumber');
const { TIMEOUT } = require('dns');
const playwright = require('@playwright/test')
const TestData = JSON.parse(JSON.stringify(require("../../TestData/Configuration.json")))
const { Login } = require("../../PageObjects_BDD/Login")
const { ProductPage } = require("../../PageObjects_BDD/ProductPage")
const { CartPage } = require("../../PageObjects_BDD/CartPage")
const { PaymentPage } = require("../../PageObjects_BDD/PaymentPage")
const { OrderdetailsPage } = require("../../PageObjects_BDD/OrderdetailsPage")


Given('User have valid {string} and {string}', { timeout: 10 * 1000 }, async function (Username, Password) {
    //browser context creation
    const browser = await playwright.chromium.launch({
        headless: false
    });
    //const testInfo = playwright.test.
    const context = await browser.newContext();
    this.page = await context.newPage();

    const login = await new Login(this.page);

    await login.loginToHomePage(TestData.URL, Username, Password);
});

When('User selects {string} and add to cart', async function (productname) {
    const productPage = new ProductPage(this.page);
    await productPage.addToCart(productname);
})

Then('The {string} should get displayed in cart', async function (product) {
    const cartpage = new CartPage(this.page);
    await cartpage.validateCart(product);
})

When('User provide valid payment details with {string}', async function(Username) {
    const paymentpage = new PaymentPage(this.page);
    await paymentpage.validatePaymentandPlaceOrder(Username);
    
})

Then('User should be able to place the order and get the orderId', async function () {
    const orderDetailsPage = new OrderdetailsPage(this.page);
    await orderDetailsPage.getOrderId();
})






