const allure = require("allure-js-commons");
class Base {
    constructor(page, testInfo) {
        this.testInfo = testInfo;
        this.page = page;
    }

    async takeScreenshot(ScreenshotName) {
        const screenshot = await this.page.screenshot();
        await this.testInfo.attach(ScreenshotName, { body: screenshot, contentType: 'Image/png' });
    }

    async takeScreenshotCucumber(ScreenshotName) {
        const screenshot = await this.page.screenshot();
        await this.attach();
    }

    async takeScreenshotAllure(ScreenshotName){
        const screenshot = await this.page.screenshot();
        allure.attachment('screenshot', screenshot, 'image/png');
    }

}
module.exports = { Base };
