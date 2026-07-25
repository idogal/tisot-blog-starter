const assert = require("assert");
const log4js = require("log4js");
const { By, until } = require("selenium-webdriver");

const logger = log4js.getLogger();
logger.level = "debug";

async function testBlog(driver) {
    logger.info("Starting blog page test...");

    // Resize window first to ensure desktop menu is visible
    await driver.manage().window().setRect({ width: 1440, height: 900 });

    // Now find the blog link in the desktop navbar
    const blogLink = await driver.findElement(By.css('#ts-navbar-center-menu a[href*="/blog"]'));
    
    await driver.humanDelay(1000);
    await blogLink.click();

    logger.info("Clicked blog link, waiting for page load...");
    
    // Wait for the blog grid to load by waiting for at least one card
    await driver.wait(until.elementLocated(By.css('.card')), 5000);
    
    await driver.humanDelay(1500);

    // Count the number of blog posts
    const posts = await driver.findElements(By.css(".card"));
    logger.info(`Found ${posts.length} blog posts on the first page.`);
    assert.ok(posts.length > 0, "There should be at least one post on the first page.");

    // Find the pagination buttons inside the .join container
    const paginationButtons = await driver.findElements(By.css(".join .join-item"));
    assert.ok(paginationButtons.length >= 2, "Pagination buttons should exist.");
    
    // Identify Next button: it's the one that is NOT btn-disabled or the last button
    const nextButton = await findButtonByPosition(paginationButtons, "next");
    
    // Check if Next is disabled (not enough posts for a 2nd page)
    const nextClasses = await nextButton.getAttribute("class");
    if (nextClasses.includes("btn-disabled")) {
        logger.info("Next page button is disabled (not enough posts for a 2nd page).");
        return;
    }

    const nextHref = await nextButton.getAttribute("href");
    
    await driver.humanDelay(1000);
    await nextButton.click();
    
    logger.info("Clicked Next Page button, waiting for page to load...");
    
    // Wait for URL change AND content to render
    await driver.wait(until.urlIs(nextHref), 5000);
    await driver.wait(until.elementLocated(By.css('.card')), 5000);
    
    const url = await driver.getCurrentUrl();
    logger.info(`Moved to 2nd page: ${url}`);
    
    await driver.humanDelay(2000);
    
    // Count posts on the second page
    const postsPage2 = await driver.findElements(By.css(".card"));
    logger.info(`Found ${postsPage2.length} blog posts on the second page.`);
    assert.ok(postsPage2.length > 0, "There should be at least one post on the second page.");
    
    // Navigate back to the first page
    const paginationButtonsPage2 = await driver.findElements(By.css(".join .join-item"));
    const prevButton = await findButtonByPosition(paginationButtonsPage2, "previous");
    const prevHref = await prevButton.getAttribute("href");
    
    await driver.humanDelay(1000);
    await prevButton.click();
    
    logger.info("Clicked Previous Page button, waiting for page to load...");
    
    // Wait for URL change AND content to render
    await driver.wait(until.urlIs(prevHref), 5000);
    await driver.wait(until.elementLocated(By.css('.card')), 5000);
    
    const finalUrl = await driver.getCurrentUrl();
    logger.info(`Moved back to 1st page: ${finalUrl}`);
    
    await driver.humanDelay(1500);
}

/**
 * Finds a pagination button by its position in the join group.
 * "previous" returns the first button, "next" returns the last button.
 * This is more explicit than a raw array index.
 */
async function findButtonByPosition(buttons, direction) {
    if (direction === "previous") {
        return buttons[0];
    }
    return buttons[buttons.length - 1];
}

module.exports = testBlog;
