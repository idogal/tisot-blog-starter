/**
 * 
 * @param {string} urlString The share url template of the social service
 * @param {string} pageUrl The referred page url (from our site)
 * @param {string} pageName The referred page name (from our site)
 * @returns 
 */
function buildShareUrl(urlString, pageUrl, pageName) {
    const pageNameIx = urlString.indexOf('{text}');
    const pageNameLiteralLength = 6;
    const pageUrlIx = urlString.indexOf('{url}');
    const pageUrlLiteralLength = 5;

    if (pageNameIx == -1 && pageUrlIx == -1) {
        return urlString;1
    }

    let firstIx = -1;
    let firstLen = 0;
    let secondIx = -1;
    let secondLen = 0;
    let valA = "";
    let valB = "";
    if (pageNameIx < pageUrlIx) {
        if (pageNameIx == -1) {
            firstIx = pageUrlIx;
            firstLen = pageUrlLiteralLength;
            valA = pageUrl;
        } else {
            firstIx = pageNameIx;
            firstLen = pageNameLiteralLength;
            secondIx = pageUrlIx;
            secondLen = pageUrlLiteralLength;
            valA = pageName;
            valB = pageUrl;
        }
    } else {
        if (pageUrlIx == -1) {
            firstIx = pageNameIx;
            firstLen = pageNameLiteralLength;
            valA = pageName;
        } else {
            firstIx = pageUrlIx;
            firstLen = pageUrlLiteralLength;
            secondIx = pageNameIx;
            secondLen = pageNameLiteralLength;
            valA = pageUrl;
            valB = pageName;            
        }
    }

    let v = "";
    v = v + urlString.substring(0, firstIx);
    v = v + valA;

    if (secondIx > -1) {
        let v2 = "";
        v2 = urlString.substring(firstIx + firstLen, secondIx);
        v2 = v2 + valB;
        v = v + v2;
    }

    //console.log("Input:  " + urlString + ",\nOutput: "+ v + "\n");
    return v;
}

// buildShareUrl("https://telegram.me/share/url", "myUrl", "myPageName");
// buildShareUrl("https://telegram.me/share/url?url={url}", "myUrl", "myPageName");
// buildShareUrl("https://telegram.me/share/url?text={text}", "myUrl", "myPageName");
// buildShareUrl("https://telegram.me/share/url?url={url}&text={text}", "myUrl", "myPageName");
// buildShareUrl("https://telegram.me/share/url?text={text}&url={url}", "myUrl", "myPageName");
// buildShareUrl("https://www.facebook.com/sharer.php?u={url}", "myUrl", "myPageName");
// buildShareUrl("whatsapp://send/?text={text}%20{url}", "myUrl", "myPageName");

module.exports = buildShareUrl;
