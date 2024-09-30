const { After, Before, BeforeAll, AfterAll, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const SetmoreLogin = require("../../page/app1.page");
const ElementUtils = require('../../utils/elements-utils');

let browser;
let context;
let page;


setDefaultTimeout(100000);

BeforeAll(async function () {
  browser = await chromium.launch({ headless: false });
});

Before(async function () {
  context = await browser.newContext();
  page = await context.newPage();
  // Make the page accessible in step definitions through world context
  this.page = page; 
  this.setmoreLogin = new SetmoreLogin(page);
  this.elementUtils = new ElementUtils(page);

  await this.elementUtils.gotoURL('https://go.setmore.com');
  await this.setmoreLogin.setmoreLoginPageEmailField('mahaganesh.lt@mailinator.com');
  await this.setmoreLogin.setmoreLoginPagePasswordField('I2password@97');
  await this.setmoreLogin.setmoreLoginPageButton();
});

After(async function () {
  await page.close();
  await context.close();
});

AfterAll(async function () {
  await browser.close();
});

module.exports = {
  page,
  browser,
  context
};
