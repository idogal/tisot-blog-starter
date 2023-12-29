function tweakDisqusComponent() {
  //let v = document.querySelector('iframe[src*="disqus"]');
  const policyHeading = document.querySelector('.comment-policy-refresh__heading');
  if (policyHeading === null) {
    return;
  }

  policyHeading.innerText = "test";
}

document.addEventListener("DOMContentLoaded", function () {
  setInterval(function() {
    tweakDisqusComponent();
  }, 3000);
});
