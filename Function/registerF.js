const { By, until } = require("selenium-webdriver");
var { readGlobalData } = require("./globalF");

var TestRegisterPass = async function (driver) {
    try {

        // Step 1.
        await Step1(driver);

        // Step 2.
        await Step2(driver);

        // Step 3.
        await Step3(driver);

        let regPass01 = await readGlobalData("register", "REG-PASS01");

        // Step 4.
        await StepInputField("//input[@id='RegisterForm-FirstName']", driver, regPass01.data.firstName);

        // Step 5.
        await StepInputField("//input[@id='RegisterForm-LastName']", driver, regPass01.data.lastName);

        // Step 6.
        await StepInputField("//input[@id='RegisterForm-phone']", driver, regPass01.data.phoneNumber);

        // Step 7.
        await StepComboBox("//select[@id='gender']", driver, regPass01.data.sex);

        // Step 8.
        await StepInputField("//input[@id='RegisterForm-email']", driver, regPass01.data.email);

        // Step 9.
        await StepInputField("//input[@id='RegisterForm-password']", driver, regPass01.data.password);

        // Step 10.
        await StepInputField("//input[@id='confirm-password']", driver, regPass01.data.repassword);

        // Step 11.
        await StepCheckBox("//input[@name='check-box'][@id='agree-terms-acc']", driver);

        await Step12("//button[@id='register-button']", driver);

        await driver.sleep(10000);
    
      } catch (error) {
        throw new Error(`REG-PASS01: ${error.message}`);
      }
};

// Step 1
var Step1 = async function(driver) {
    var isSuccess = false
    try{
        let globalD = await readGlobalData("global", "global");
        await driver.get(globalD.data.url);
        isSuccess = true;
    }
    catch(error){
        isSuccess = false;
        throw new Error(`Step 1: ${error.message}`);
    }
    finally{
        driver.sleep(5000);
        return isSuccess;
    }
};

// Step 2
var Step2 = async function(driver) {
    var isSuccess = false
    try{
        var loginB = await driver.wait(
            until.elementLocated(By.xpath("//a[@href='/account/login']//*[name()='svg']//*[name()='path' and contains(@fill-rule,'evenodd')]")),
            10000
        );
        await loginB.click();
        isSuccess = true;
    }
    catch(error){
        isSuccess = false;
        throw new Error(`Step 2: ${error.message}`);
    }
    finally{
        driver.sleep(5000);
        return isSuccess;
    }
};

// Step 3
var Step3 = async function(driver) {
    var isSuccess = false
    try{
        var regisB = await driver.wait(
            until.elementLocated(By.xpath("//a[contains(text(),'Đăng ký tài khoản')]")),
            10000
        );
        await regisB.click();
        isSuccess = true;
    }
    catch(error){
        isSuccess = false;
        throw new Error(`Step 3: ${error.message}`);
    }
    finally{
        driver.sleep(5000);
        return isSuccess;
    }
};

var StepInputField = async function(xpath, driver, key) {
    var isSuccess = false
    try{
        var textField = await driver.wait(
            until.elementLocated(By.xpath(xpath)),
            10000
        );
        await textField.sendKeys(key);
        isSuccess = true;
    }
    catch(error){
        isSuccess = false;
        throw new Error(`Step input field: ${error.message}`);
    }
    finally{
        driver.sleep(2000);
        return isSuccess;
    }
};

var StepComboBox = async function(xpath, driver, item) {
    var isSuccess = false
    try{
        var comboBox = await driver.wait(
            until.elementLocated(By.xpath(xpath)),
            10000
        );
        await comboBox.click();
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
        isSuccess = true;
    }
    catch(error){
        isSuccess = false;
        throw new Error(`Step combo box: ${error.message}`);
    }
    finally{
        driver.sleep(2000);
        return isSuccess;
    }
};

var StepCheckBox = async function(xpath, driver) {
    var isSuccess = false
    try{
        var checkBox = await driver.wait(
            until.elementLocated(By.xpath(xpath)),
            10000
        );
        await checkBox.click();
        isSuccess = true;
    }
    catch(error){
        isSuccess = false;
        throw new Error(`Step check box: ${error.message}`);
    }
    finally{
        driver.sleep(2000);
        return isSuccess;
    }
};

var Step12 = async function(xpath, driver) {
    var isSuccess = false
    try{
        var regB = await driver.wait(
            until.elementLocated(By.xpath(xpath)),
            10000
        );
        await regB.click();
        isSuccess = true;
    }
    catch(error){
        isSuccess = false;
        throw new Error(`Step 12: ${error.message}`);
    }
    finally{
        driver.sleep(2000);
        return isSuccess;
    }
};


module.exports = {
    TestRegisterPass
}