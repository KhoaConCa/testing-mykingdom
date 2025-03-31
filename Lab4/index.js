const { Builder, Browser } = require("selenium-webdriver");
var { readData, login, sanityCheckPageLoad, sanityCheckInvalidLogin } = require("./functions");

var tc001 = async function () {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();
  let tcData = await readData("tc001");

  try {
    console.log("test TC001 enter ...");
    // Login function - pass driver
    await login(driver, tcData.data.username, tcData.data.password);
    // Verify the text - "Hello Student"
    await sanityCheckPageLoad(driver, tcData.data.expectedText);
  } catch (error) {
    console.log(error);
  } finally {
    driver.quit();
    console.log("test TC001 exit ...");
  }
};

var tc002 = async function () {
    let driver = await new Builder().forBrowser(Browser.CHROME).build();
    let tcData = await readData("tc002");
  
    try {
      console.log("test TC002 enter ...");
      // Login function - pass driver
      await login(driver, tcData.data.username, tcData.data.password);
      // Verify the text - "Hello Student"
      await sanityCheckInvalidLogin(driver, tcData.data.expectedText);
    } catch (error) {
      console.log(error);
    } finally {
      driver.quit();
      console.log("test TC002 exit ...");
    }
  };

// Call the function to run the test
var testsuite = async function () {
    await tc001();
    await tc002();
}

testsuite();