const { By, until } = require("selenium-webdriver");
var { readGlobalData } = require("./globalF");

const checkBoxs = [];

var TestProductFilter = async function (driver) {
    try {
        await Step1(driver);
        await Step2("//div[@class='boost-sd__filter-option-itemwrapper']//ul//li", driver);
        for (let i = 0; i < checkBoxs.length; i++) {
            let key = checkBoxs[i][0];
            let value = checkBoxs[i][1];

            // Đợi cho đến khi phần tử hiển thị và bật
            await driver.wait(until.elementIsVisible(value), 10000);
            await driver.wait(until.elementIsEnabled(value), 10000);

            if (await value.isDisplayed() && await value.isEnabled()) {
                console.log("Button có thể bấm được, thực hiện click...");

                // Cuộn đến phần tử trước khi click
                await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", value);

                // Đợi một chút sau khi cuộn
                await driver.sleep(500);

                // Thử click, nếu lỗi thì dùng JavaScript click
                try {
                    if (i != 0){
                        await checkBoxs[i-1][1].click();
                    }
                    await value.click();
                } catch (clickError) {
                    console.log("Click thông thường thất bại, thử click bằng JavaScript...");
                    await driver.executeScript("arguments[0].click();", value);
                }
            } else {
                console.log("Button không thể bấm, bỏ qua.");
            }

            // Đợi sau khi click
            await driver.sleep(2000);
            console.log(`Key: ${key}, Value: ${value}`);
        }
    } catch (error) {
        throw new Error(`PRO-FILTER01: ${error.message}`);
    }
};

// Step 1
var Step1 = async function (driver) {
    var isSuccess = false;
    try {
        let globalD = await readGlobalData("global", "global");
        await driver.get(globalD.data.candyURL);
        isSuccess = true;
    } catch (error) {
        isSuccess = false;
        throw new Error(`Step 1: ${error.message}`);
    } finally {
        await driver.sleep(5000);
        return isSuccess;
    }
};

// Step 2
var Step2 = async function (xpath, driver) {
    var isSuccess = false;
    try {
        // Đợi cho đến khi danh sách phần tử xuất hiện
        await driver.wait(until.elementsLocated(By.xpath(xpath)), 10000);
        let list = await driver.findElements(By.xpath(xpath));

        for (let item of list) {
            let checkBox = await item.findElement(By.xpath(".//button"));
            let text = await item.findElement(By.xpath(".//span")).getText();

            if (!text.includes("(0)")) { // Sửa lại điều kiện để kiểm tra chuỗi
                checkBoxs.push([text[0], checkBox]);
            }
        }
        isSuccess = true;
    } catch (error) {
        isSuccess = false;
        throw new Error(`Step 2: ${error.message}`);
    } finally {
        await driver.sleep(5000);
        return isSuccess;
    }
};

module.exports = {
    TestProductFilter,
};