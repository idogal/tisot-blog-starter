/**
 * @param {string} photoBy The "Photo by" string, translated or not
 * @param {string} onSubstring The "on" string, translated or not
 * @param {string} authorName The image's author name
 * @param {string} authorId The author's Unsplash username (e.g., '@leoand1')
 * @param {string} photoId The Unsplash photo ID
 * @param {boolean} isStartAligned is the credit box aligned to the start (left in LTR, right in RTL)
 *
 * @returns {string}
 */
function photoCredit(photoBy, onSubstring, authorName, authorId, photoId, isStartAligned = true) {
  const baseClasses =
    "text-xs absolute bottom-0 px-1 py-1 text-neutral-50 bg-slate-500 mix-blend-normal opacity-80 rounded-se rounded-es";

  const alignClass = isStartAligned ? "start-0" : "end-0";

  return `
    <p class="${baseClasses} ${alignClass}">
      ${photoBy}
      <a href="https://unsplash.com/${authorId}?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
      ${authorName}
      </a>
      ${onSubstring}
      <a href="https://unsplash.com/photos/${photoId}?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
      Unsplash
      </a>
    </p>
  `;
}

module.exports = photoCredit;
