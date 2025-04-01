const { Builder, Browser } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

var { TestPaymentWithoutLogin, TestPaymentWithLogin } = require("../Function/checkoutProcessF");

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
        driver.quit()
        console.log("PAY-PASS01 exit ...");
    }
}

var TestPayPass02 = async function(){

    let driver = await new Builder()
        .forBrowser(Browser.CHROME)
        .build();
    try{
        await TestPaymentWithLogin(driver);   
        await console.log("TestCase: PAY-PASS01 is successful!")           
    }
    catch(error){
        console.log(error);
    }
    finally{
        driver.quit()
        console.log("PAY-PASS02 exit ...");
    }
}

var TestPayCheckout = async function () {
    //await TestPayPass01();
    await TestPayPass02();
}

TestPayCheckout();