// Ho va ten: Nguyen Ngoc Phu
// MSSV: 81012202484

//#region --Cau 5--
// const { Builder, Browser, By } = require("selenium-webdriver");
// const chai = require("chai");
// const { login, sanityCheckPageLoad, sanityCheckInvalidLogin, readData } = require("../../Lab4/functions.js");

// describe("Regression Test - Nguyen Ngoc Phu", function () {
//   this.timeout(30000);
//   it("TC001 - allow a valid user to login to bookstore", async function () {
//     console.log("test TC001 enter ...");
//     let driver = await new Builder().forBrowser(Browser.CHROME).build();
//     let tcData = await readData("tc001");

//     // login function - pass driver ...
//     await login(driver, tcData.data.username, tcData.data.password);

//     // Verify the text - "Hello Student"
//     await sanityCheckPageLoad(driver, tcData.data.expectedText);

//     await driver.quit();
//     console.log("test TC001 exit ...");
//   });

//   it("TC002 - not allow an invalid user to login", async function () {
//     console.log("test TC002 enter ...");
//     let driver = await new Builder().forBrowser(Browser.CHROME).build();
//     let tcData = await readData("tc002");

//     // login function - pass driver ...
//     await login(driver, tcData.data.username, tcData.data.password);

//     // Verify the text
//     await sanityCheckInvalidLogin(driver, tcData.data.expectedText);

//     await driver.quit();
//     console.log("test TC002 exit ...");
//   });
// });
//#endregion

//#region --Cau 6--
// const { Builder, Browser, By } = require("selenium-webdriver");
// const chai = require("chai");
// const { login, sanityCheckPageLoad, sanityCheckInvalidLogin, readData } = require("../../Lab4/functions.js");

// describe("Regression Test - Nguyen Ngoc Phu", function () {
//   this.timeout(30000);
//   describe("Regression Test", async function () {
//     before(async function () {
//       console.log("This is begin of Regression test");
//     });
  
//     after(function () {
//       console.log("This is end of the last test");
//     });
  
//     beforeEach(async function () {
//       console.log("This is before each testcase");
//       driver = await new Builder().forBrowser(Browser.CHROME).build();
//     });
  
//     afterEach(function () {
//       console.log("This is end of each testcase");
//       driver.quit();
//     });
  
//     it("tc001 - allow a valid user to login to bookstore", async function () {
//       console.log("test TC001 enter ...");
//       tcData = await readData("tc001");
//     });
//   });
// });
//#endregion

//#region --Cau 8--
// const { Builder, Browser, By } = require("selenium-webdriver");
// const chai = require("chai");
// const { login, sanityCheckPageLoad, sanityCheckInvalidLogin, readData } = require("../../Lab4/functions.js");
// var moreDetails = require("mochawesome/addContext");

// describe("Regression Test - Nguyen Ngoc Phu", function () {
//   this.timeout(30000);
//   describe("Regression Test", async function () {
//     before(async function () {
//       console.log("This is begin of Regression test");
//     });
  
//     after(function () {
//       console.log("This is end of the last test");
//     });
  
//     beforeEach(async function () {
//       console.log("This is before each testcase");
//       driver = await new Builder().forBrowser(Browser.CHROME).build();
//     });
  
//     afterEach(function () {
//       console.log("This is end of each testcase");
//       driver.quit();
//     });
  
//     it("tc001 - allow a valid user to login to bookstore", async function () {
//       console.log("test TC001 enter ...");
//       tcData = await readData("tc001");
//     });
//   });
// });

// describe("Functional Test- Nguyen Ngoc Phu", async function () {
//     this.beforeEach(async function () {
//         console.log("This is before each test - Functional Test");
//         driver = await new Builder().forBrowser(Browser.CHROME).build();
//         moreDetails(this, "This is evidence of the testcase")
//     }); 
// });
//#endregion

//#region --Cau 9--
// const { Builder, Browser, By } = require("selenium-webdriver");
// const chai = require("chai");
// const { login, sanityCheckPageLoad, sanityCheckInvalidLogin, readData, takeScreenshot } = require("../../Lab4/functions.js");
// const addContext = require("mochawesome/addContext");
// const fs = require("fs");

// describe("Regression Test Suite - Nguyen Ngoc Phu", function () {
//   this.timeout(30000);

//   it("TC001 - allow a valid user to login to bookstore", async function () {
//     console.log("test TC001 enter ...");
//     let driver = await new Builder().forBrowser(Browser.CHROME).build();
//     let tcData = await readData("tc001");

//     await login(driver, tcData.data.username, tcData.data.password);
//     await sanityCheckPageLoad(driver, tcData.data.expectedText);

//     // Take screenshot
//     let filename = await takeScreenshot(driver);
//     addContext(this, "Screenshot: " + filename);

//     await driver.quit();
//     console.log("test TC001 exit ...");
//   });

//   it("TC002 - not allow an invalid user to login", async function () {
//     console.log("test TC002 enter ...");
//     let driver = await new Builder().forBrowser(Browser.CHROME).build();
//     let tcData = await readData("tc002");

//     await login(driver, tcData.data.username, tcData.data.password);
//     await sanityCheckInvalidLogin(driver, tcData.data.expectedText);

//     // Take screenshot
//     let filename2 = await takeScreenshot(driver);
//     addContext(this, "Screenshot: " + filename2);

//     await driver.quit();
//     console.log("test TC002 exit ...");
//   });
// });
//#endregion

//#region --Cau 10--
const { Builder, Browser, By } = require("selenium-webdriver");
const chai = require("chai");
const { login, sanityCheckPageLoad, sanityCheckInvalidLogin, readData, takeScreenshot, paymentOffline } = require("../../Lab4/functions.js");
const addContext = require("mochawesome/addContext");
const chrome = require("selenium-webdriver/chrome");

describe("Test case 07 - Nguyen Ngoc Phu", function () {
  this.timeout(30000);

  it("TC001 - allow a valid user to login to bookstore", async function () {
    console.log("test TC001 enter ...");
    let driver = await new Builder().forBrowser(Browser.CHROME).build();
    let tcData = await readData("tc001");

    await login(driver, tcData.data.username, tcData.data.password);
    await sanityCheckPageLoad(driver, tcData.data.expectedText);

    let filename1 = await takeScreenshot(driver);
    addContext(this, { title: "Screenshot", value: filename1 });

    await driver.quit();
    console.log("test TC001 exit ...");
  });

  it("TC002 - not allow an invalid user to login", async function () {
    console.log("test TC002 enter ...");
    let driver = await new Builder().forBrowser(Browser.CHROME).build();
    let tcData = await readData("tc002");

    await login(driver, tcData.data.username, tcData.data.password);
    await sanityCheckInvalidLogin(driver, tcData.data.expectedText);

    // Take screenshot
    let filename2 = await takeScreenshot(driver);
    addContext(this, { title: "Screenshot", value: filename2 });

    await driver.quit();
    console.log("test TC002 exit ...");
  });

  it("TC007 - Payment Offline", async function () {
    console.log("test TC007 enter ...");
    let driver = await new Builder()
      .forBrowser(Browser.CHROME)
      .setChromeOptions(new chrome.Options().addArguments('--disable-dev-shm-usage', '--disable-features=TranslateUI'))
      .build();
    let tcData = await readData("tc007");

    await login(driver, tcData.data.username, tcData.data.password);
    await paymentOffline(driver, tcData.data.bookUrl, tcData.data.expectedText);
    await driver.sleep(2000);

    let filename7 = await takeScreenshot(driver);
    addContext(this, { title: "Screenshot", value: filename7 });

    await driver.quit();
    console.log("test TC007 exit ...");
  });
});
//#endregion