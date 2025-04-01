const { Builder, Browser } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

const { 
    TestRegisterPass, 
    TestRegisterEmpty01, 
    TestRegisterEmpty02, 
    TestRegisterError01,
    TestRegisterError02 } = require("../Function/registerF");

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
        await driver.quit()
        console.log("REG-PASS01 exit ...");
    }
};

var REG_EMPTY01 = async function () {
    let driver = await new Builder()
        .forBrowser(Browser.CHROME)
        .build();
    try{
        await TestRegisterEmpty01(driver);
        await console.log("TestCase: REG-EMPTY01 is successful!");  
    }
    catch(error){
        console.log(error);
    }
    finally{
        await driver.quit()
        console.log("REG-EMPTY01 exit ...");
    }
};

var REG_EMPTY02 = async function () {
    let driver = await new Builder()
        .forBrowser(Browser.CHROME)
        .build();
    try{
        await TestRegisterEmpty02(driver);
        await console.log("TestCase: REG-EMPTY02 is successful!");  
    }
    catch(error){
        console.log(error);
    }
    finally{
        await driver.quit()
        console.log("REG-EMPTY02 exit ...");
    }
};

var REG_ERR01 = async function () {
    let driver = await new Builder()
        .forBrowser(Browser.CHROME)
        .build();
    try{
        await TestRegisterError01(driver);
        await console.log("TestCase: REG-ERR01 is successful!");  
    }
    catch(error){
        console.log(error);
    }
    finally{
        await driver.quit()
        console.log("REG-ERR01 exit ...");
    }
};

var REG_ERR02 = async function () {
    let driver = await new Builder()
        .forBrowser(Browser.CHROME)
        .build();
    try{
        await TestRegisterError02(driver);
        await console.log("TestCase: REG-ERR02 is successful!");  
    }
    catch(error){
        console.log(error);
    }
    finally{
        await driver.quit()
        console.log("REG-ERR02 exit ...");
    }
};

var RunTestCase = async function () {
    await REG_PASS01();
    await REG_EMPTY01();
    await REG_EMPTY02();
    await REG_ERR01();
    await REG_ERR02();
};

RunTestCase();