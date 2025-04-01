const { By, until } = require("selenium-webdriver");
var { readGlobalData } = require("./globalF");

var TestPaymentWithoutLogin = async function (driver) {
  try {
    let globalD = await readGlobalData("global", "global");
    await driver.get(globalD.data.url);
    await NavigatePage(driver);

    let payPass01D = await readGlobalData("checkoutProcess", "PAY-PASS01");
    console.log(payPass01D);
    await driver.sleep(10000)
    await InputValueWithoutLogin(driver, payPass01D);
  } catch (error) {
    console.error(`PAY-PASS01: ${error.message}`);
    throw new Error(`PAY-PASS01: ${error.message}`);
  }
};

var NavigatePage = async function (driver) {

  // Nhập một sản phẩm vào textbox.
  await driver
      .findElement(By.xpath("//input[contains(@Class, 'search__input field__input boost-sd__search-widget-init-input')]"))
      .sendKeys("robot");

    // Chờ load danh sách gợi ý.
    await driver
      .wait(until
        .elementLocated(By.xpath(
          "//ul[@class='boost-sd__instant-search-product-list-items']//li")), 
          5000);
    
    // Mở trang sản phẩm.
    let urlPro = await driver
      .findElement(By.xpath("//a[@class='boost-sd__suggestion-queries-item-link']"))
      .getAttribute("href");
    await driver.get(urlPro);

    // Nhấn vào 'Thêm vào giở hàng'.
    let addCardB = await driver
      .wait(until.elementLocated(
        By.xpath(
          "//div[@data-meta='__']//div//div//div//product-form [@data-hide-errors='false']//form[@method='post']//div//button[@name='add']",
          10000)));
    await addCardB.click();
    await driver.sleep(5000);

    // Nhấn vào giở hàng.
    let cardB = await driver
      .wait(until.elementLocated(
        By.xpath(
          "//a[@id = 'checkout_drawer']",
          10000)));
    await cardB.click();

    let payB = await driver
      .wait(until.elementLocated(
        By.xpath(
          "//a[@id='checkout']",
          5000)));
    await payB.click();
}

var InputValueWithoutLogin = async function (driver, data) {
    await driver.findElement(By.xpath("//input[@id='email']")).sendKeys(data.data.email);
    //await emailText.sendKeys(data.data.email);

    await SelectCombobox("//select[@id='Select1']", driver, data.data.province);
    await driver.sleep(5000);
    await SelectCombobox("//select[@id='Select2']", driver, data.data.district);
    await driver.sleep(5000);
    await SelectCombobox("//select[@id='Select3']", driver, data.data.commune);
    await driver.sleep(5000);

    await InputTextField("(//input[@id='TextField0'])[1]", driver, data.data.firstName);
    await InputTextField("(//input[@id='TextField1'])[1]", driver, data.data.lastName);
    await InputTextField("(//input[@id='TextField2'])[1]", driver, data.data.address);
    await InputTextField("(//input[@id='TextField5'])[1]", driver, data.data.phoneNumber);
}

var SelectCombobox = async function (xpath, driver, item) {
  let comboBox = await driver.wait(
    until.elementLocated(
      By.xpath(xpath,
        5000)));
  await comboBox.click()
  var options = []
  options = await comboBox.findElements(By.tagName("option"));
  for (let option of options) {
    let text = await option.getText();
    if (text === item) {
      await option.click();
      break;
    }
  }
  await comboBox.click()
}

var InputTextField = async function (xpath, driver, key) {
  
  let textField = await driver.findElement(By.xpath(xpath))
  console.log(key);
  await textField.sendKeys(key);
}

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