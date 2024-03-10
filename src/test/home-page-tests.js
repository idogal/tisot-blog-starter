const BaseTest = require("./base-test");

const webdriver = BaseTest.webdriver;
const logger = BaseTest.logger;

async function testHomePage(driver) {
  let title = await driver.getTitle();
  logger.debug(`Got title: "${title}"`);
  const PAGE_TITLE = "Home Page | Tisot - A blog starter kit";
  assert.equal(
    PAGE_TITLE,
    title,
    `Title of the page is supposed to be: '${PAGE_TITLE}'`
  );
}

async function runAllTests() {
  try {
    const driver = await webdriver(Browser.CHROME);
    testHomePage(driver);
  } catch (e) {
    logger.error(e);
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
}

module.exports = { runAllTests };
