const { By, until } = require("selenium-webdriver");
var { readGlobalData } = require("./globalF");
const ReportLogger = require("./reportLogger");

var readAlert = async function (driver) {
    let alertText = "";
    try {
        let alert = await driver.switchTo().alert();
        
        alertText = await alert.getText();
        console.log("Nội dung của Alert:", alertText);
        
        await alert.accept();
        return alertText;
    } catch (error) {
        console.error("Không tìm thấy Alert hoặc lỗi khác:", error.message);
    }
}

var checkRegisterPass01 = async function (driver, beforeUrl) {
    try {
        console.log("URL trước khi đăng ký:", beforeUrl);

        await driver.sleep(5000); 

        let afterUrl = await driver.getCurrentUrl();
        console.log("URL sau khi đăng ký:", afterUrl);

        let isUrlChanged = beforeUrl !== afterUrl;
        console.log("URL có thay đổi không?", isUrlChanged);

        return isUrlChanged;
    } catch (error) {
        console.error("Lỗi khi kiểm tra URL sau đăng ký:", error.message);
        return false;
    }
};

var checkRegisterEmty01 = async function (driver) {
    var phoneNumberNotice = "Vui lòng nhập chính xác số điện thoại của bạn";
    try {
        let alertText = await readAlert(driver);
        return alertText === phoneNumberNotice;
    } catch (error) {
        console.error("Lỗi khi kiểm tra thông báo:", error.message);
        return false;
    }
};

var checkRegisterEmty02 = async function (driver) {
    var emailNotice = "Vui lòng nhập chính xác email của bạn";
    try {
        let alertText = await readAlert(driver);
        return alertText === emailNotice;
    } catch (error) {
        console.error("Lỗi khi kiểm tra thông báo:", error.message);
        return false;
    }
}

var checkRegisterErr01 = async function (driver) {
    let phoneTypeNotice = "Số điện thoại không hợp lệ!";
    try {
        let alertText = await readAlert(driver);
        return alertText === phoneTypeNotice;
    } catch (error) {
        console.error("Lỗi khi kiểm tra thông báo:", error.message);
        return false;
    }
}

var checkRegisterErr02 = async function (driver) {
    let emailTypeNotice = "Email không hợp lệ!";
    try {
        let alertText = await readAlert(driver);
        return alertText === emailTypeNotice;
    } catch (error) {
        console.error("Lỗi khi kiểm tra thông báo:", error.message);
        return false;
    }
}

var TestRegisterPass = async function (driver) {
    let regPass01 = await readGlobalData("register", "REG-PASS01");
    let logger = new ReportLogger("REG-PASS01", regPass01.data);

    try {
        logger.logStep("Step 1: Truy cập trang chủ", await Step1(driver));
        logger.logStep("Step 2: Nhấn vào nút đăng nhập", await Step2(driver));
        logger.logStep("Step 3: Nhấn vào nút đăng ký", await Step3(driver));

        let beforeUrl = await driver.getCurrentUrl();

        logger.logStep("Step 4: Nhập Họ", await StepInputField("//input[@id='RegisterForm-FirstName']", driver, regPass01.data.firstName));
        logger.logStep("Step 5: Nhập Tên", await StepInputField("//input[@id='RegisterForm-LastName']", driver, regPass01.data.lastName));
        logger.logStep("Step 6: Nhập Số điện thoại", await StepInputField("//input[@id='RegisterForm-phone']", driver, regPass01.data.phoneNumber));
        logger.logStep("Step 7: Chọn Giới tính", await StepComboBox("//select[@id='gender']", driver, regPass01.data.sex));
        logger.logStep("Step 8: Nhập Email", await StepInputField("//input[@id='RegisterForm-email']", driver, regPass01.data.email));
        logger.logStep("Step 9: Nhập Mật khẩu", await StepInputField("//input[@id='RegisterForm-password']", driver, regPass01.data.password));
        logger.logStep("Step 10: Nhập lại Mật khẩu", await StepInputField("//input[@id='confirm-password']", driver, regPass01.data.repassword));
        logger.logStep("Step 11: Chấp nhận điều khoản", await StepCheckBox("//input[@name='check-box'][@id='agree-terms-acc']", driver));
        logger.logStep("Step 12: Nhấn vào nút Đăng ký", await Step12("//button[@id='register-button']", driver));

        let alert = await driver.switchTo().alert();
        await alert.accept();

        logger.logStep("Step 13: Kiểm tra kết quả trả về", await checkRegisterPass01(driver, beforeUrl));

        await driver.sleep(10000);
    } catch (error) {
        logger.logStep(`Lỗi xảy ra: ${error.message}`, false);
    } finally {
        logger.generateReport();
    }
};

var TestRegisterEmpty01 = async function (driver) {
    let regEmpty01 = await readGlobalData("register", "REG-EMPTY01");
    let logger = new ReportLogger("REG-EMPTY01", regEmpty01.data);

    try {
        logger.logStep("Step 1: Truy cập trang chủ", await Step1(driver));
        logger.logStep("Step 2: Nhấn vào nút đăng nhập", await Step2(driver));
        logger.logStep("Step 3: Nhấn vào nút đăng ký", await Step3(driver));
        logger.logStep("Step 4: Nhập Họ", await StepInputField("//input[@id='RegisterForm-FirstName']", driver, regEmpty01.data.firstName));
        logger.logStep("Step 5: Nhập Tên", await StepInputField("//input[@id='RegisterForm-LastName']", driver, regEmpty01.data.lastName));
        logger.logStep("Step 6: Nhập Số điện thoại", await StepInputField("//input[@id='RegisterForm-phone']", driver, regEmpty01.data.phoneNumber));
        logger.logStep("Step 7: Chọn Giới tính", await StepComboBox("//select[@id='gender']", driver, regEmpty01.data.sex));
        logger.logStep("Step 8: Nhập Email", await StepInputField("//input[@id='RegisterForm-email']", driver, regEmpty01.data.email));
        logger.logStep("Step 9: Nhập Mật khẩu", await StepInputField("//input[@id='RegisterForm-password']", driver, regEmpty01.data.password));
        logger.logStep("Step 10: Nhập lại Mật khẩu", await StepInputField("//input[@id='confirm-password']", driver, regEmpty01.data.repassword));
        logger.logStep("Step 11: Chấp nhận điều khoản", await StepCheckBox("//input[@name='check-box'][@id='agree-terms-acc']", driver));
        logger.logStep("Step 12: Nhấn vào nút Đăng ký", await Step12("//button[@id='register-button']", driver));
        logger.logStep("Step 13: Kiểm tra kết quả trả về", await checkRegisterEmty01(driver));

        await driver.sleep(10000);
    } catch (error) {
        logger.logStep(`Lỗi xảy ra: ${error.message}`, false);
    } finally {
        logger.generateReport();
    }
};

var TestRegisterEmpty02 = async function (driver) {
    let regEmpty02 = await readGlobalData("register", "REG-EMPTY02");
    let logger = new ReportLogger("REG-EMPTY02", regEmpty02.data);

    try {
        logger.logStep("Step 1: Truy cập trang chủ", await Step1(driver));
        logger.logStep("Step 2: Nhấn vào nút đăng nhập", await Step2(driver));
        logger.logStep("Step 3: Nhấn vào nút đăng ký", await Step3(driver));
        logger.logStep("Step 4: Nhập Họ", await StepInputField("//input[@id='RegisterForm-FirstName']", driver, regEmpty02.data.firstName));
        logger.logStep("Step 5: Nhập Tên", await StepInputField("//input[@id='RegisterForm-LastName']", driver, regEmpty02.data.lastName));
        logger.logStep("Step 6: Nhập Số điện thoại", await StepInputField("//input[@id='RegisterForm-phone']", driver, regEmpty02.data.phoneNumber));
        logger.logStep("Step 7: Chọn Giới tính", await StepComboBox("//select[@id='gender']", driver, regEmpty02.data.sex));
        logger.logStep("Step 8: Nhập Email", await StepInputField("//input[@id='RegisterForm-email']", driver, regEmpty02.data.email));
        logger.logStep("Step 9: Nhập Mật khẩu", await StepInputField("//input[@id='RegisterForm-password']", driver, regEmpty02.data.password));
        logger.logStep("Step 10: Nhập lại Mật khẩu", await StepInputField("//input[@id='confirm-password']", driver, regEmpty02.data.repassword));
        logger.logStep("Step 11: Chấp nhận điều khoản", await StepCheckBox("//input[@name='check-box'][@id='agree-terms-acc']", driver));
        logger.logStep("Step 12: Nhấn vào nút Đăng ký", await Step12("//button[@id='register-button']", driver));
        logger.logStep("Step 13: Kiểm tra kết quả trả về", await checkRegisterEmty02(driver));

        await driver.sleep(10000);
    } catch (error) {
        logger.logStep(`Lỗi xảy ra: ${error.message}`, false);
    } finally {
        logger.generateReport();
    }
};

var TestRegisterError01 = async function (driver) {
    let regErr01 = await readGlobalData("register", "REG-ERR01");
    let logger = new ReportLogger("REG-ERR01", regErr01.data);

    try {
        for (let item of regErr01.data.phoneNumber) {
            let phoneId = item.id;
            let phoneValue = item.value;

            console.log(`\n🔍 Đang kiểm tra với Số điện thoại: [${phoneId}] = ${phoneValue}`);

            // Tạo dữ liệu cho iteration này
            let iterationData = {
                ...regErr01.data,
                phoneNumber: [{ id: phoneId, value: phoneValue }]
            };

            // Reset steps và isBlocked trước mỗi iteration
            logger.steps = [];
            logger.isBlocked = false;

            // Thực hiện các bước cho iteration này
            logger.logStep("Step 1: Truy cập trang chủ", await Step1(driver));
            logger.logStep("Step 2: Nhấn vào nút đăng nhập", await Step2(driver));
            logger.logStep("Step 3: Nhấn vào nút đăng ký", await Step3(driver));
            logger.logStep("Step 4: Nhập Họ", await StepInputField("//input[@id='RegisterForm-FirstName']", driver, regErr01.data.firstName));
            logger.logStep("Step 5: Nhập Tên", await StepInputField("//input[@id='RegisterForm-LastName']", driver, regErr01.data.lastName));
            logger.logStep("Step 6: Nhập Số điện thoại", await StepInputField("//input[@id='RegisterForm-phone']", driver, phoneValue));
            logger.logStep("Step 7: Chọn Giới tính", await StepComboBox("//select[@id='gender']", driver, regErr01.data.sex));
            logger.logStep("Step 8: Nhập Email", await StepInputField("//input[@id='RegisterForm-email']", driver, regErr01.data.email));
            logger.logStep("Step 9: Nhập Mật khẩu", await StepInputField("//input[@id='RegisterForm-password']", driver, regErr01.data.password));
            logger.logStep("Step 10: Nhập lại Mật khẩu", await StepInputField("//input[@id='confirm-password']", driver, regErr01.data.repassword));
            logger.logStep("Step 11: Chấp nhận điều khoản", await StepCheckBox("//input[@name='check-box'][@id='agree-terms-acc']", driver));
            logger.logStep("Step 12: Nhấn vào nút Đăng ký", await Step12("//button[@id='register-button']", driver));

            let result = await checkRegisterErr01(driver);
            logger.logStep(`Step 13: Kiểm tra kết quả (${phoneId})`, result);

            logger.logIteration(iterationData);
        }

        await driver.sleep(10000);
    } catch (error) {
        logger.logStep(`Lỗi xảy ra: ${error.message}`, false);
        logger.logIteration(regErr01.data);
    }
};

var TestRegisterError02 = async function (driver) {
    let regErr02 = await readGlobalData("register", "REG-ERR02");
    let logger = new ReportLogger("REG-ERR02", regErr02.data);

    try {
        for (let item of regErr02.data.email) {
            let emailId = item.id;
            let emailValue = item.value;

            console.log(`\n🔍 Đang kiểm tra với Số điện thoại: [${emailId}] = ${emailValue}`);

            let iterationData = {
                ...regErr02.data,
                phoneNumber: [{ id: emailId, value: emailValue }]
            };

            logger.steps = [];
            logger.isBlocked = false;

            logger.logStep("Step 1: Truy cập trang chủ", await Step1(driver));
            logger.logStep("Step 2: Nhấn vào nút đăng nhập", await Step2(driver));
            logger.logStep("Step 3: Nhấn vào nút đăng ký", await Step3(driver));
            logger.logStep("Step 4: Nhập Họ", await StepInputField("//input[@id='RegisterForm-FirstName']", driver, regErr02.data.firstName));
            logger.logStep("Step 5: Nhập Tên", await StepInputField("//input[@id='RegisterForm-LastName']", driver, regErr02.data.lastName));
            logger.logStep("Step 6: Nhập Số điện thoại", await StepInputField("//input[@id='RegisterForm-phone']", driver, regErr02.data.phoneNumber));
            logger.logStep("Step 7: Chọn Giới tính", await StepComboBox("//select[@id='gender']", driver, regErr02.data.sex));
            logger.logStep("Step 8: Nhập Email", await StepInputField("//input[@id='RegisterForm-email']", driver, emailValue));
            logger.logStep("Step 9: Nhập Mật khẩu", await StepInputField("//input[@id='RegisterForm-password']", driver, regErr02.data.password));
            logger.logStep("Step 10: Nhập lại Mật khẩu", await StepInputField("//input[@id='confirm-password']", driver, regErr02.data.repassword));
            logger.logStep("Step 11: Chấp nhận điều khoản", await StepCheckBox("//input[@name='check-box'][@id='agree-terms-acc']", driver));
            logger.logStep("Step 12: Nhấn vào nút Đăng ký", await Step12("//button[@id='register-button']", driver));

            let result = await checkRegisterErr01(driver);
            logger.logStep(`Step 13: Kiểm tra kết quả (${emailId})`, result);

            logger.logIteration(iterationData);
        }

        await driver.sleep(10000);
    } catch (error) {
        logger.logStep(`Lỗi xảy ra: ${error.message}`, false);
        logger.logIteration(regErr02.data);
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
        await driver.sleep(5000);
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
        await driver.sleep(5000);
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
        await driver.sleep(5000);
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
        await textField.clear();
        await textField.sendKeys(key);
        isSuccess = true;
    }
    catch(error){
        isSuccess = false;
        throw new Error(`Step input field: ${error.message}`);
    }
    finally{
        await driver.sleep(500);
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
        await driver.sleep(500);
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
        await driver.sleep(500);
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
        await driver.sleep(2000);
        return isSuccess;
    }
};

module.exports = {
    TestRegisterPass,
    TestRegisterEmpty01,
    TestRegisterEmpty02,
    TestRegisterError01,
    TestRegisterError02
}