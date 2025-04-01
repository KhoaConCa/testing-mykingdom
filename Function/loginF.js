const { Builder, By, Key } = require("selenium-webdriver");
const { readGlobalData } = require("./globalF");

class LoginBase {
    async getToLogin() {
        this.driver = await new Builder().forBrowser("chrome").build();
        let access = await readGlobalData("global", "global");

        if (!access || !access.data || !access.data.url) {
            console.error("Lỗi: Không thể đọc dữ liệu từ globalD.json");
            return null;
        }

        await this.driver.get(access.data.url);
        await this.driver.findElement(By.xpath("//a[contains(@class, 'header__icon--account')]")).click();
    }


    async getLoginData() {
        throw new Error("getLoginData() phải được override");
    }

    async login ()
    {
        let loginData = await this.getLoginData();
        if (!loginData || !loginData.data)
        {
            console.error("Lỗi: Không thể lấy thông tin đăng nhập từ loginD.json");
            return;
        }

        await this.getToLogin();

        if (!this.driver) {
            console.error("Lỗi: Không thể mở trang đăng nhập");
            return;
        }

        try {
            await this.driver.findElement(By.xpath("//input[@id='CustomerEmail']")).sendKeys(loginData.data.email);
            await this.driver.findElement(By.xpath("//input[@id='CustomerPassword']")).sendKeys(loginData.data.password);
            await this.driver.sleep(5000);
            await this.driver.findElement(By.xpath("//button[contains(text(),'Đăng nhập')]")).click();
            await this.driver.sleep(15000);
            console.log("Đã click");
        } catch (error) {
            console.error("Lỗi khi nhập thông tin đăng nhập:", error);
        } finally {
            await this.driver.quit();
        }
    }
}

class LoginSuccess extends LoginBase {
    async getLoginData() {
        return readGlobalData("login", "LOG-PASS01");
    }
}

class LoginWrongPassword extends LoginBase {
    async getLoginData() {
        return readGlobalData("login", "LOG-ERR01");
    }
}

class LoginWrongEmail extends LoginBase {
    async getLoginData() {
        return readGlobalData("login", "LOG-ERR02");
    }
}

class LoginBlankEmail extends LoginBase {
    async getLoginData() {
        return readGlobalData("login", "LOG-EMPTY01");
    }
}

const loginSuccess = new LoginSuccess();
const loginWrongPassword = new LoginWrongPassword();
const loginWrongEmail = new LoginWrongEmail();
const loginBlankEmail = new LoginBlankEmail();

// var getToLogin = async function () {
//     let driver = await new Builder().forBrowser("chrome").build();

//     let access = await readGlobalData("global", "global");
//     await driver.get(access.data.url);
    
//     await driver.findElement(By.xpath("//a[contains(@class, 'header__icon--account')]")).click();

//     return driver;
// };

// var loginSuccess = async function () {
//     let loginData = await readGlobalData("login", "LOG-PASS01");
//     let username = loginData.data.email;
//     let password = loginData.data.password;

//     let driver = await getToLogin();

//     await driver.findElement(By.xpath("//input[@id='CustomerEmail']")).sendKeys(username);
//     await driver.findElement(By.xpath("//input[@id='CustomerPassword']")).sendKeys(password);
//     await driver.findElement(By.xpath("//button[contains(text(),'Đăng nhập')]")).click();

//     await driver.quit();
// };

// var loginError = async function () {
//     let loginData = await readGlobalData("login", "LOG-ERR01");
//     let username = loginData.data.email;
//     let password = loginData.data.password;

//     let driver = await getToLogin();

//     await driver.findElement(By.xpath("//input[@id='CustomerEmail']")).sendKeys(username);
//     await driver.findElement(By.xpath("//input[@id='CustomerPassword']")).sendKeys(password);
//     await driver.findElement(By.xpath("//button[contains(text(),'Đăng nhập')]")).click();

//     await driver.quit();
// };

module.exports = {
    loginSuccess,
    loginWrongPassword,
    loginWrongEmail,
    loginBlankEmail
}