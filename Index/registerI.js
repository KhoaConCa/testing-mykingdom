const { Builder, Browser } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

var { TestRegisterPass } = require("../Function/registerF");

var REG_PASS01 = async function () {
    let driver = await new Builder()
        .forBrowser(Browser.CHROME)
        .build();
    try{
        await TestRegisterPass(driver);
        await console.log("TestCase: REG-PASS01 is successful!")    
    }
    catch(error){
        console.log(error);
    }
    finally{
        await driver.sleep(10000)
        await driver.quit()
        console.log("REG-PASS01 exit ...");
    }
};

var RunTestCase = async function () {
    await REG_PASS01();
};

RunTestCase();