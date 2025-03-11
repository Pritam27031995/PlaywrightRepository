class Base {
    constructor(page, testInfo) {
        this.testInfo = testInfo;
        this.page = page;
    }

    async takeScreenshot(ScreenshotName) {
        const screenshot = await this.page.screenshot();
        await this.testInfo.attach(ScreenshotName, { body: screenshot, contentType: 'Image/png' });
    }
}
module.exports = { Base };
