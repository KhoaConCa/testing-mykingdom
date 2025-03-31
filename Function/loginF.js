const { Builder, By, Key } = require("selenium-webdriver");
const { readGlobalData } = require("./globalF");
const fs = require("fs");
const path = require("path");
const dataFilePath = "../Data/loginD.json";

var getToLogin = async function () {
    let driver = await new Builder().forBrowser("chrome").build();
    let access = await readGlobalData("global");
    await driver.get(access.data.url);
    await driver.findElement(By.xpath("//a[contains(@class, 'header__icon--account')]")).click();
};

getToLogin();
// var LogPass01 = async function (username, password) {
//     await getToLogin();

// };

module.exports = {
    getToLogin
}