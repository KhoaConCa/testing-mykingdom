const { Builder, Browser } = require("selenium-webdriver");
var { payPass01, payPass02 } = require("../Function/checkoutProcessF");

var PayPass01 = async function(){
    let driver = await new Builder().forBrowser(Browser.CHROME).build();
    try{
        payPass01(driver)
    }
    catch(error){
        console.log(error)
    }
    finally{
        driver.quit()
        console.log("PAY-PASS01 exit ...")
    }
}