(function () {
  var STORAGE_KEY = "siteA_capture_dismissed";
  var DELAY_MS = 15000; // show after 15s on page

  function alreadyDismissed() {
    try {
      return localStorage.getItem(STORAGE_KEY) === "1";
    } catch (e) {
      return false;
    }
  }

  function markDismissed() {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch (e) {
      /* ignore storage errors, e.g. private browsing */
    }
  }

  function showPopup() {
    var popup = document.getElementById("capture-popup");
    if (!popup || alreadyDismissed()) return;
    popup.classList.add("is-open");
  }

  function hidePopup() {
    var popup = document.getElementById("capture-popup");
    if (!popup) return;
    popup.classList.remove("is-open");
    markDismissed();
  }

  document.addEventListener("DOMContentLoaded", function () {
    var closeBtn = document.querySelector(".capture-close");
    var overlay = document.getElementById("capture-popup");

    if (closeBtn) closeBtn.addEventListener("click", hidePopup);
    if (overlay) {
      overlay.addEventListener("click", function (e) {
        if (e.target === overlay) hidePopup();
      });
    }

    // "Get deals" buttons open the popup on demand, even if it was dismissed before
    var openers = document.querySelectorAll("[data-open-capture]");
    for (var i = 0; i < openers.length; i++) {
      openers[i].addEventListener("click", function () {
        var popup = document.getElementById("capture-popup");
        if (popup) popup.classList.add("is-open");
      });
    }

    if (!alreadyDismissed()) {
      setTimeout(showPopup, DELAY_MS);
    }
  });
})();
