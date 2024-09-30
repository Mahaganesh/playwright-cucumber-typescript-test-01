require('../support/hooks');
const { When, Then, Given } = require('@cucumber/cucumber');




Given('Login to Setmore', {timeout: 100000}, async function () {

    await this.setmoreLogin.waitForSetmoreCalenderSideButton();
});

When('Select Contacts Component', async function () {
    console.log('When is about to print');
});

Then('Perform search', async function () {
    console.log('Then is about to print');
});
