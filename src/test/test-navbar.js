const assert = require("assert");
var log4js = require("log4js");
const { By } = require("selenium-webdriver");

const logger = log4js.getLogger();
logger.level = "debug";

async function testHeader(driver) {
    const tsHeader = await driver.findElement(By.id("ts-header"));
    assert.ok("Site header exists.", tsHeader);

    const tsNavbar = await driver.findElement(By.id("ts-navbar"));
    assert.ok("Header contains a navbar.", tsHeader);

    const tsNavbarCenter = await driver.findElement(By.id("ts-navbar-center"));
    assert.ok("Header contains a navbar central area.", tsHeader);

    const tsNavbarMenu = await driver.findElement(By.id("ts-navbar-center-menu"));
    assert.ok("Header contains a navbar menu.", tsHeader);

    const tsNavbarMenuItems = await tsNavbarMenu.findElements(By.css("li"));
    assert.equal(tsNavbarMenuItems.length, 5);
    
    // let title = await driver.getTitle();
    // logger.debug(`Got title: "${title}"`);
    // const PAGE_TITLE = "Home Page | Tisot - A blog starter kit";
    // assert.equal(PAGE_TITLE, title, `Title of the page is supposed to be: '${PAGE_TITLE}'`);
    // await driver.manage().setTimeouts({ implicit: 500 });
    // let textBox = await driver.findElement(By.name("my-text"));
    // let submitButton = await driver.findElement(By.css("button"));
    // await textBox.sendKeys("Selenium");
    // await submitButton.click();
    // let message = await driver.findElement(By.id("message"));
    // let value = await message.getText();
    // assert.equal("Received!", value);



};

module.exports =testHeader;