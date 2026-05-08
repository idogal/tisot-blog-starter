/**
 * @param {string} captionText 
 * @param {boolean} isStartAligned whether the credit box is aligned to the start (left in LTR, right in RTL)
 *
 * @returns {string}
 */
function photoCaption(captionText, isStartAligned = true) {
  const baseClasses =
    "text-xs absolute bottom-0 px-1 py-1 text-neutral-50 bg-slate-500 mix-blend-normal opacity-80 rounded-se rounded-es";

  const alignClass = isStartAligned ? "start-0" : "end-0";

  return `
    <p class="${baseClasses} ${alignClass}">
      ${captionText}
    </p>
  `;
}

module.exports = photoCaption;
