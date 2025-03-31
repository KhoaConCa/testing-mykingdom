const { Builder, By, Key } = require("selenium-webdriver");
const { readGlobalData } = require("./globalF");

var getToLogin = async function () {
    let driver = await new Builder().forBrowser("chrome").build();
    let access = await readGlobalData("global", "global");
    await driver.get(access.data.url);
    await driver.findElement(By.xpath("//a[contains(@class, 'header__icon--account')]")).click();
};
getToLogin();
// var login = async function (username, password) {
//     await getToLogin();
//     let data = await readGlobalData("login");
//     username = data.

// };

module.exports = {
    getToLogin
}