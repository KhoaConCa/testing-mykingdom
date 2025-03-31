const { By, until } = require("selenium-webdriver");
var { readGlobalData } = require("./globalF");

var TestPaymentWithoutLogin = async function (driver) {
  try {

    let globalD = await readGlobalData("global")
    await driver.get(globalD.data.url)
    await driver
      .findElement(By.xpath("//input[contains(@Class, 'search__input field__input boost-sd__search-widget-init-input')]"))
      .sendKeys("robot")
    let firstPro = await driver
      .wait(until
        .elementLocated(By.xpath(
          "//ul[@class='boost-sd__instant-search-product-list-items']//li")), 
          5000);
    let urlPro = await driver
      .findElement(By.xpath("//a[@class='boost-sd__suggestion-queries-item-link']"))
      .getAttribute("href");
    await driver.get(urlPro);
    let addCardB = await driver
      .wait(until.elementsLocated(
        By.xpath(
          "//div[@data-meta='__']//div//div//div//product-form [@data-hide-errors='false']//form[@method='post']//div//button[@name='add']",
          5000)));
    await addCardB.click();

    let cardB = await driver.findElement(By.xpath("//*[name()='path' and contains(@d,'M23.1463 1')]"));
    cardB.click();
    console.log(button);

  } catch (error) {
    console.error(`PAY-PASS01: ${error.message}`);
    throw new Error(`PAY-PASS01: ${error.message}`);
  }
};

var PayPass02 = async function (driver) {
  try {
    
  } catch (error) {
    console.error(`PAY-PASS02: ${error.message}`);
    throw new Error(`PAY-PASS02: ${error.message}`);
  }
};

module.exports = {
  TestPaymentWithoutLogin,
  PayPass02
}