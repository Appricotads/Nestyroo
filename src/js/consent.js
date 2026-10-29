/*
  Analytics consent for Nestyroo.
  Google Analytics 4 is NOT loaded until the visitor clicks "Accept".
  The choice ("granted" or "denied") is kept in local storage so the banner
  is not shown again. "Cookie settings" in the footer reopens the banner.
*/
(function () {
  var KEY = "nestyroo_analytics_consent";
  var script = document.currentScript;
  var GA_ID = script && script.getAttribute("data-ga-id");
  var gaLoaded = false;

  function getChoice() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function saveChoice(value) {
    try { localStorage.setItem(KEY, value); } catch (e) { /* storage blocked: ask again next visit */ }
  }

  function loadGA() {
    if (gaLoaded || !GA_ID) return;
    gaLoaded = true;
    window["ga-disable-" + GA_ID] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID);
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA_ID);
    document.head.appendChild(s);
  }

  function removeGACookies() {
    if (GA_ID) window["ga-disable-" + GA_ID] = true;
    var host = location.hostname;
    var domains = ["", host, "." + host, "." + host.replace(/^www\./, "")];
    document.cookie.split(";").forEach(function (c) {
      var name = c.split("=")[0].trim();
      if (name === "_ga" || name.indexOf("_ga_") === 0 || name === "_gid") {
        domains.forEach(function (d) {
          document.cookie = name + "=; Max-Age=0; path=/" + (d ? "; domain=" + d : "");
        });
      }
    });
  }

  function banner() { return document.getElementById("consent-banner"); }
  function openBanner() { var b = banner(); if (b) b.classList.add("is-open"); }
  function closeBanner() { var b = banner(); if (b) b.classList.remove("is-open"); }

  function choose(value) {
    saveChoice(value);
    closeBanner();
    if (value === "granted") {
      loadGA();
    } else {
      removeGACookies();
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    var b = banner();
    if (b) {
      var buttons = b.querySelectorAll("[data-consent]");
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function (e) {
          choose(e.currentTarget.getAttribute("data-consent"));
        });
      }
    }
    var openers = document.querySelectorAll("[data-open-consent]");
    for (var j = 0; j < openers.length; j++) openers[j].addEventListener("click", openBanner);

    var choice = getChoice();
    if (choice === "granted") loadGA();
    else if (choice !== "denied") openBanner();
  });
})();
