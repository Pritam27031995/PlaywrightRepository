const { Base } = require("../Utilities/Base")
class Login {

    constructor(page) {
        this.page = page;
        //this.testInfo = testInfo;
        this.Username = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.loginButton = page.locator("#login");

    }

    async loginToHomePage(URL, Username, Password) {
        await this.page.goto(URL);
        await this.Username.fill(Username);
        await this.password.fill(Password);
        await new Base(this.page, this.testInfo).takeScreenshotAllure("LoginPageFilled");
        await this.loginButton.click();
    }
}
module.exports = { Login };