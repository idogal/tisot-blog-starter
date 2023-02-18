/**
 * @param {string} photoBy The "Photo by" string, translated or not
 * @param {string} onSubstring The "on" string, translated or not
 * @param {string} authorName The image's author name
 * @param {boolean} isLeftAlighed is the credit box alighed to the left or not
 * @param {string} dir direction - LTR or RTL
 *
 * @returns
 */
function photoCredit(photoBy, onSubstring, authorName, isLeftAlighed, dir) {
  const pClassesBase =
    "text-xs absolute bottom-0 px-1 py-1 text-neutral-50 bg-slate-500 mix-blend-normal opacity-80";

  function formClassString() {
    var leftAlignPart = "";
    if (isLeftAlighed) {
      if (dir == "rtl") {
        leftAlignPart = " right-0";
      } else {
        leftAlignPart = " left-0";
      }
    }

    return dir == "rtl"
      ? pClassesBase.concat(" ", "rounded-tl rounded-br", leftAlignPart)
      : pClassesBase.concat(" ", "rounded-tr rounded-bl", leftAlignPart);
  }

  return `
    <p class="${formClassString()}">
      ${photoBy}
      <a href="https://unsplash.com/es/@leoand1?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
      ${authorName}
      </a>
      ${onSubstring}
      <a href="https://unsplash.com/photos/P5nZwlbTngI?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
      Unsplash
      </a>
    </p>
  `;
}

module.exports = photoCredit;
