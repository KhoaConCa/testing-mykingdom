const { Builder, Browser } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

var { TestPaymentWithoutLogin } = require("../Function/checkoutProcessF");

var TestPayPass01 = async function(){

    let driver = await new Builder()
        .forBrowser(Browser.CHROME)
        .build();
    try{
        await TestPaymentWithoutLogin(driver);
        await console.log("TestCase: PAY-PASS01 is successful!")    
    }
    catch(error){
        console.log(error);
    }
    finally{
        await driver.sleep(10000)
        await driver.quit()
        console.log("PAY-PASS01 exit ...");
    }
}

var TestPayCheckout = async function () {
    await TestPayPass01();
}

TestPayCheckout();