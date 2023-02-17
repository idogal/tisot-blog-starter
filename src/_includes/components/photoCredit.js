/**
 * @param {string} photoBy
 * @param {string} subtitle
 *
 * @returns
 */
function photoCredit( photoBy, subtitle ) {
  return `
    <p class="text-xs absolute bottom-0 px-1 py-1 text-neutral-50 bg-slate-500 mix-blend-normal opacity-80 rounded-bl rounded-tr">
      ${photoBy}
      <a href="https://unsplash.com/es/@leoand1?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
      Andrii Leonov
      </a>
      ${subtitle}
      <a href="https://unsplash.com/photos/P5nZwlbTngI?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
      Unsplash
      </a>
    </p>
  `;
}

module.exports = photoCredit;