class Login{
    constructor(page,testInfo){
        this.page=page;
        this.testInfo=testInfo;

    }

    async loginToHomePage(){
        await page.goto("https://rahulshettyacademy.com/client");
        await page.locator("#userEmail").fill("pritam.debnath@gmail.com");
        await page.locator("#userPassword").fill("Test@1234");
        await page.locator("#login").click();
    }
}