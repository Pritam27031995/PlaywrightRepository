const { BeforeAll, AfterAll, After, BeforeStep, AfterStep } = require("@cucumber/cucumber");
const playwright = require('@playwright/test');
const { before, after } = require("node:test");

BeforeAll(async function(){
    //browser context creation
    const browser = await playwright.chromium.launch({
        headless: false
    });
    //const testInfo = playwright.test.
    const context = await browser.newContext();
    this.page = await context.newPage();
})

AfterAll(function(){
    console.log("After all scenarios");
})

before(function(){
    console.log("Before each scenario");
})

after(function(){
    console.log("After each scenario");
})

BeforeStep(function(){
    console.log("Before each step");
})

AfterStep(function(){
    console.log("After each step");
})