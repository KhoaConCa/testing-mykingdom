const { By } = require("selenium-webdriver");
var { readGlobalData } = require("./globalF")

var PayPass01 = async function (driver) {
  try {

    let globalD = await readGlobalData("global")
    await driver.get(globalD.data.url)
    let getDiv = await driver.findElement(By.css("//div[@class = 'grid__item swiper-slide swiper-slide-prev']"))
    let linksPro = await getDiv.getAttribute("href")
    console.log(linksPro)

  } catch (error) {
    console.error(`PAY-PASS01: ${error.message}`);
    throw new Error(`PAY-PASS02: ${error.message}`);
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
  PayPass01,
  PayPass02
}