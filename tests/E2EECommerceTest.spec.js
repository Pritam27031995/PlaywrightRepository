const { test, expect} = require('@playwright/test');
const TestData = JSON.parse(JSON.stringify(require("../TestData/Configuration.json")))
const {Login} = require("../PageObjects/Login")
const {ProductPage}=  require("../PageObjects/ProductPage")
const {CartPage}= require("../PageObjects/CartPage")
const {PaymentPage} = require("../PageObjects/PaymentPage")
const {OrderdetailsPage} = require("../PageObjects/OrderdetailsPage")

test("Test Cart E2E",{tag:'@Regression'}, async function ({ browser },testInfo) {
    //browser context creation
    const context = await browser.newContext();
    const page = await context.newPage();

    //local variable creation
    const product = "ADIDAS ORIGINAL"
    
    //Page object creation
    const login = await new Login(page,testInfo);
    const productPage = new ProductPage(page,testInfo);
    const cartpage = new CartPage(page,testInfo);
    const paymentpage = new PaymentPage(page,testInfo);
    const orderDetailsPage = new OrderdetailsPage(page,testInfo);

    //Actual function calls
    await login.loginToHomePage(TestData.URL, TestData.Username, TestData.Password);
    await productPage.addToCart(product);
    await cartpage.validateCart(product);
    await paymentpage.validatePaymentandPlaceOrder(TestData.Username);
    await orderDetailsPage.getOrderId();
    
    
    




})