const { Builder, Browser } = require("selenium-webdriver");
const Chrome = require("selenium-webdriver/chrome");
const assert = require("assert");
const log4js = require("log4js");

const testHeader = require("./test-navbar.js");

const logger = log4js.getLogger();
logger.level = "debug";

const MAIN_TEST_URL = process.env.TEST_URL || "https://demo.tisot.info";

async function getDriver(browser) {
  const options = new Chrome.Options();
  logger.info("Trying to get driver of:", browser);

  if (process.argv.includes("--headless") || process.env.HEADLESS === "true") {
    options.addArguments("--headless");
  }
  options.addArguments("--no-sandbox").addArguments("--disable-gpu");

  const driver = await new Builder()
    .setChromeOptions(options)
    .forBrowser(browser)
    .build();

  logger.info("Got driver of:", browser);

  logger.info("Trying to read page:", MAIN_TEST_URL);
  await driver.get(MAIN_TEST_URL);
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

  } catch (e) {
    logger.error("Test Failed: ", e.message);
    process.exitCode = 1;
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
})();
