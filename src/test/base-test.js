const { By, Builder, Browser } = require("selenium-webdriver");
const Chrome = require("selenium-webdriver/chrome");
const assert = require("assert");
var log4js = require("log4js");

const logger = log4js.getLogger();
logger.level = "debug";

const MAIN_TEST_URL = "http://ido.g.gitlab.io/idog-blog-daisyui/";

async function getWebDriver(browser) {
  const options = new Chrome.Options();
  logger.info("Trying to get driver of:", browser);

  const driver = await new Builder()
    .setChromeOptions(
      options
        .addArguments("--headless")
        .addArguments("--no-sandbox")
        .addArguments("--disable-gpu")
    )
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
    driver = await getWebDriver(Browser.CHROME);

    /*
    let title = await driver.getTitle();
    logger.debug(`Got title: "${title}"`);
    const PAGE_TITLE = "Home Page | Tisot - A blog starter kit";
    assert.equal(PAGE_TITLE, title, `Title of the page is supposed to be: '${PAGE_TITLE}'`);

    await driver.manage().setTimeouts({ implicit: 500 });
    let textBox = await driver.findElement(By.name("my-text"));
    let submitButton = await driver.findElement(By.css("button"));
    await textBox.sendKeys("Selenium");
    await submitButton.click();
    let message = await driver.findElement(By.id("message"));
    let value = await message.getText();
    assert.equal("Received!", value);
    */
  } catch (e) {
    logger.error(e);
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
})();

module.exports = { getWebDriver, logger };