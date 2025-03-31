// Ho va ten: Nguyen Ngoc Phu
// MSSV: 81012202484

const fs = require("fs");
const path = require("path");
const dataFilePath = "D:/Subject/WorkSpace/Learning/Testing application/Lab4/data.json";

// Read Data from json file, match the key for test name
var readData = async function (tcName) {
  const content = fs.readFileSync(dataFilePath);
  const obj = JSON.parse(content);
  for (let index = 0; index < obj.length; index++) {
    if (tcName == obj[index]["testName"]) {
      return obj[index];
    }
  }
};

const { By } = require("selenium-webdriver");

var login = async function (driver, username, password) {
  let tcdirector = await readData("global");
  await driver.get(tcdirector.data.url);
  await driver.findElement(By.xpath("//input[@id='email']")).sendKeys(username);
  await driver.findElement(By.xpath("//input[@id='password']")).sendKeys(password);
  await driver.findElement(By.xpath("//input[@value='Login']")).click();
};

const chai = require("chai").should();

var sanityCheckPageLoad = async function (driver, expectedText) {
  try {
    const actualText = await driver
      .findElement(By.xpath("//h2[contains(text(), 'Hello')]"))
      .getText();
    actualText.should.equal(expectedText);
  } catch (error) {
    throw new Error(`Sanity check failed: ${error.message}`);
  }
};

var sanityCheckInvalidLogin = async function (driver, expectedText) {
  try {
    const actualText = await driver
      .findElement(By.xpath("//h3[normalize-space()='Your Login Name or Password is invalid']"))
      .getText();
    actualText.should.equal(expectedText);
  } catch (error) {
    throw new Error(`Invalid login check failed: ${error.message}`);
  }
};

var takeScreenshot = async function (driver) {
  try {
    if (!driver) {
      throw new Error("Driver is not initialized or has been closed.");
    }

    const imagesDir = path.join(__dirname, "../mochawesome-report/images");
    if (!fs.existsSync(imagesDir)) {
      console.log(`Creating directory: ${imagesDir}`);
      fs.mkdirSync(imagesDir, { recursive: true });
    }

    console.log("Attempting to take screenshot...");
    const image = await driver.takeScreenshot();
    const fileNameAbsolute = path.join(imagesDir, `screenshot_${Date.now()}.png`);
    console.log(`Saving screenshot to: ${fileNameAbsolute}`);
    fs.writeFileSync(fileNameAbsolute, image, "base64");

    if (fs.existsSync(fileNameAbsolute)) {
      console.log(`Screenshot successfully saved at: ${fileNameAbsolute}`);
    } else {
      throw new Error(`Screenshot file was not saved at: ${fileNameAbsolute}`);
    }

    const fileNameRelative = path.join("images", path.basename(fileNameAbsolute));
    return fileNameRelative;
  } catch (error) {
    console.error(`Failed to take screenshot: ${error.message}`);
    throw new Error(`Failed to take screenshot: ${error.message}`);
  }
};

var paymentOffline = async function (driver, bookUrl, confirm) {
  await driver.get(bookUrl);

  let addToCartButton = await driver.findElement(By.xpath("//a[normalize-space()='Add to cart']"));
  await addToCartButton.click();
  await driver.sleep(2000);

  let checkoutButton = await driver.findElement(By.xpath("//input[@name='Submit']"));
  await checkoutButton.click();
  await driver.sleep(2000);

  let paymentOption = await driver.findElement(By.css("a.btn.btn-success[href*='cartAction.php?action=placeOrder']"));
  await paymentOption.click();
  await driver.sleep(2000);

  let message = await driver.findElement(By.xpath("//p[normalize-space()='Your order has submitted successfully.']")).getText();
  message.should.equal(confirm);
};

module.exports = {
  readData,
  login,
  sanityCheckPageLoad,
  sanityCheckInvalidLogin,
  takeScreenshot,
  paymentOffline,
};