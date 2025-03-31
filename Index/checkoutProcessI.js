const { Builder, Browser } = require("selenium-webdriver");
var { TestPaymentWithoutLogin, PayPass02 } = require("../Function/checkoutProcessF");

var TestPayPass01 = async function(){
    let driver = await new Builder().forBrowser(Browser.CHROME).build();
    try{
        await TestPaymentWithoutLogin(driver);
    }
    catch(error){
        console.log(error);
    }
    finally{
        //driver.quit()
        console.log("PAY-PASS01 exit ...");
    }
}

TestPayPass01();