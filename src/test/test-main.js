const { Builder, Browser } = require("selenium-webdriver");
const Chrome = require("selenium-webdriver/chrome");
const assert = require("assert");
const log4js = require("log4js");

const testHeader = require("./test-navbar.js");
const testBlog = require("./test-blog.js");

const logger = log4js.getLogger();
logger.level = "debug";

const MAIN_TEST_URL = process.env.TEST_URL || "https://demo.tisot.info";

async function getDriver(browser) {
  const options = new Chrome.Options();
  logger.info("Trying to get driver of:", browser);

  const isHeadless = process.argv.includes("--headless") || process.env.HEADLESS === "true";
  if (isHeadless) {
    options.addArguments("--headless");
  }
  options.addArguments("--no-sandbox").addArguments("--disable-gpu");

  const driver = await new Builder()
    .setChromeOptions(options)
    .forBrowser(browser)
    .build();

  // Attach a helper to slow down tests for human observation
  driver.humanDelay = async function(ms = 1000) {
    if (!isHeadless) {
      await new Promise(resolve => setTimeout(resolve, ms));
    }
  };

  logger.info("Got driver of:", browser);

  logger.info("Trying to read page:", MAIN_TEST_URL);
  await driver.get(MAIN_TEST_URL);
  await driver.humanDelay(1500); // Pause on the home page so the human can see it
  logger.info("Got page:", MAIN_TEST_URL);

  return driver;
}

(async function firstTest() {
  let driver;

  try {
    driver = await getDriver(Browser.CHROME);

    let title = await driver.getTitle();
    logger.debug(`Got title: "${title}"`);
    const PAGE_TITLE = "Home Page | Tisot - A blog starter kit";
    assert.equal(PAGE_TITLE, title, `Title of the page is supposed to be: '${PAGE_TITLE}'`);

    await testHeader(driver);
    await testBlog(driver);

  } catch (e) {
    logger.error("Test Failed: ", e.message);
    process.exitCode = 1;
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
})();
