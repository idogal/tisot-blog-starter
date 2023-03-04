/**
 * @param {string} captionText 
 * @param {boolean} isLeftAlighed is the credit box alighed to the left or not
 * @param {string} dir direction - LTR or RTL
 *
 * @returns
 */
function photoCaption(captionText, isLeftAlighed, dir) {
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
      ${captionText}
    </p>
  `;
}

module.exports = photoCaption;
