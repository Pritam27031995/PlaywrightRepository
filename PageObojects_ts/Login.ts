import { Locator, Page, TestInfo } from "@playwright/test";
import { Base } from "../Utilities_ts/Base"
export class Login {
    page: Page;
    testInfo: TestInfo;
    Username: Locator;
    password: Locator;
    loginButton: Locator;
    constructor(page: Page, testInfo: TestInfo) {
        this.page = page;
        this.testInfo = testInfo;
        this.Username = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.loginButton = page.locator("#login");

    }

    async loginToHomePage(URL: string, Username: string, Password: string) {
        await this.page.goto(URL);
        await this.Username.fill(Username);
        await this.password.fill(Password);
        await new Base(this.page, this.testInfo).takeScreenshot("LoginPageFilled");
        await this.loginButton.click();
    }
}
