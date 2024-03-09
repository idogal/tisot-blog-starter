const { By, Builder, Browser } = require("selenium-webdriver");
const Chrome = require('selenium-webdriver/chrome');
const assert = require("assert");


(async function firstTest() {
  let driver;
  const options = new Chrome.Options()

  try {
    console.log("Trying to get driver...");

    driver = await new Builder()
      .setChromeOptions(options.addArguments('--headless').addArguments('--no-sandbox').addArguments('--disable-gpu'))
      .forBrowser(Browser.CHROME)
      .build();

    console.log("Trying to read page");
    await driver.get("https://www.selenium.dev/selenium/web/web-form.html");

    console.log("Got driver for CHROME");

    let title = await driver.getTitle();
    console.log("Got title ", title);
    assert.equal("Web form", title);

    await driver.manage().setTimeouts({ implicit: 500 });

    let textBox = await driver.findElement(By.name("my-text"));
    let submitButton = await driver.findElement(By.css("button"));

    await textBox.sendKeys("Selenium");
    await submitButton.click();

    let message = await driver.findElement(By.id("message"));
    let value = await message.getText();
    assert.equal("Received!", value);
  } catch (e) {
    console.log(e);
  } finally {
    if (driver) await driver.quit();
  }
})();
