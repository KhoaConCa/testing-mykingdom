const { By, until } = require("selenium-webdriver");
var { readGlobalData } = require("./globalF");

var TestPaymentWithoutLogin = async function (driver) {
  try {
    let globalD = await readGlobalData("global", "global");
    await driver.get(globalD.data.url);
    await NavigatePage(driver);

    let payPass01D = await readGlobalData("checkoutProcess", "PAY-PASS01");
    await driver.sleep(10000);
    await InputValueWithoutLogin(driver, payPass01D);

    await FinalNavigate(driver);

  } catch (error) {
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
          "//div[@data-meta='__']//div//div//div//product-form [@data-hide-errors='false']//form[@method='post']//div//button[@name='add']")),
      10000);
    await addCardB.click();
    await driver.sleep(5000);

    // Nhấn vào giở hàng.
    let cardB = await driver
      .wait(until.elementLocated(
        By.xpath(
          "//a[@id = 'checkout_drawer']")),
          10000
        );
    await cardB.click();
    await driver.sleep(5000);
}

var InputValueWithoutLogin = async function (driver, data) {
    await driver.findElement(By.xpath("//input[@id='email']")).sendKeys(data.data.email);
    //await emailText.sendKeys(data.data.email);

    await SelectCombobox("//select[@id='Select1']", driver, data.data.province);
    await driver.sleep(10000);
    await SelectCombobox("//select[@id='Select2']", driver, data.data.district);
    await driver.sleep(10000);
    await SelectCombobox("//select[@id='Select3']", driver, data.data.commune);
    await driver.sleep(10000);

    await InputTextField("//input[@placeholder='Tên']", driver, data.data.firstName);
    await InputTextField("//input[@placeholder='Họ']", driver, data.data.lastName);
    await InputTextField("//input[@placeholder='Số nhà, tên đường']", driver, data.data.address);
    await InputTextField("//input[@placeholder='Điện thoại']", driver, data.data.phoneNumber);
};

var FinalNavigate = async function (driver) {
  let nextB = await driver.findElement(By.xpath("(//button[@class='_1m2hr9ge _1m2hr9gd _1fragemt9 _1fragemlt _1fragemnw _1fragem2i _1fragemsn _1fragemt2 _1fragemt4 _1fragemst _1m2hr9g1j _1m2hr9g1f _1fragemnq _1m2hr9g18 _1m2hr9g15 _1fragemss _1fragemsh _1m2hr9g1u _1m2hr9g1r _1m2hr9g12 _1m2hr9gz _1m2hr9g1q _1m2hr9g14 _1m2hr9g13 _1fragems1 _1m2hr9g1d _1m2hr9g1b _1fragemso'])[1]"));
    await nextB.click();
    await driver.sleep(20000);

    let paymentB = await driver.wait(
      until.elementLocated(By.xpath("(//button[@class='_1m2hr9ge _1m2hr9gd _1fragemt9 _1fragemlt _1fragemnw _1fragem2i _1fragemsn _1fragemt2 _1fragemt4 _1fragemst _1m2hr9g1j _1m2hr9g1f _1fragemnq _1m2hr9g18 _1m2hr9g15 _1fragemss _1fragemsh _1m2hr9g1u _1m2hr9g1r _1m2hr9g12 _1m2hr9gz _1m2hr9g1q _1m2hr9g14 _1m2hr9g13 _1fragems1 _1m2hr9g1d _1m2hr9g1b _1fragemso'])[1]")),
      20000
    )
    await paymentB.click();
    await driver.sleep(5000);
};

var SelectCombobox = async function (xpath, driver, item) {
  let comboBox = await driver.wait(
    until.elementLocated(
      By.xpath(xpath)),
      5000
    );
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
  await comboBox.click();
};

var InputTextField = async function (xpath, driver, key) {
  
  let textField = await driver.wait(
    until.elementLocated(
      By.xpath(xpath)), 
      5000
  );
  await textField.sendKeys(key);
};

module.exports = {
  TestPaymentWithoutLogin
}