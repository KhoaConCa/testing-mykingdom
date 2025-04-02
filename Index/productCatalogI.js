const { Builder, Browser } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

const { TestProductFilter } = require("../Function/productCatalogF");

var PRO_FILTER01 = async function () {
    let driver = await new Builder()
        .forBrowser(Browser.CHROME)
        .build();
    try{
        await TestProductFilter(driver);
        await console.log("TestCase: PRO-FILTER01 is successful!")    
    }
    catch(error){
        console.log(error);
    }
    finally{
        await driver.quit()
        console.log("PRO-FILTER01 exit ...");
    }
}

var RunTestCase = async function () {
    await PRO_FILTER01();
};

RunTestCase();