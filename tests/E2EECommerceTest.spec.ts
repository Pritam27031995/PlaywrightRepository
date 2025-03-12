import  { test, expect, TestInfo, BrowserContext, Page}  from '@playwright/test';
const TestData : any = JSON.parse(JSON.stringify(require("../TestData/Configuration.json")))
import {Login}  from "../PageObjects/Login"
import {ProductPage} from  "../PageObjects/ProductPage"
import {CartPage} from  "../PageObjects/CartPage"
import {PaymentPage} from "../PageObjects/PaymentPage"
import {OrderdetailsPage} from "../PageObjects/OrderdetailsPage"

test("Test Cart E2E", async function ({ browser },testInfo:TestInfo) {
    //browser context creation
    const context : BrowserContext = await browser.newContext();
    const page: Page = await context.newPage();

    //local variable creation
    const product : string= "ADIDAS ORIGINAL"
    let login : Login;
    let productPage : ProductPage;
    let cartpage : CartPage;
    let paymentpage : PaymentPage;
    let orderDetailsPage : OrderdetailsPage;

    //Page object creation
    login = await new Login(page,testInfo);
    productPage = new ProductPage(page,testInfo);
    cartpage = new CartPage(page,testInfo);
    paymentpage = new PaymentPage(page,testInfo);
    orderDetailsPage = new OrderdetailsPage(page,testInfo);

    //Actual function calls
    await login.loginToHomePage(TestData.URL, TestData.Username, TestData.Password);
    await productPage.addToCart(product);
    await cartpage.validateCart(product);
    await paymentpage.validatePaymentandPlaceOrder(TestData.Username);
    await orderDetailsPage.getOrderId();
    
    
    




})