// ============================================
// Júlia Bujosa · Profesora de Matemáticas
// ============================================

(function () {
  "use strict";

  var STORAGE_KEY = "julia-web-lang";
  var htmlEl = document.documentElement;
  var langToggle = document.getElementById("langToggle");
  var translatable = document.querySelectorAll("[data-es][data-en]");

  function applyLanguage(lang) {
    translatable.forEach(function (el) {
      el.textContent = lang === "en" ? el.dataset.en : el.dataset.es;
    });
    htmlEl.setAttribute("lang", lang);
    langToggle.textContent = lang === "en" ? "ES" : "EN";
    langToggle.setAttribute(
      "aria-label",
      lang === "en" ? "Cambiar a español" : "Switch to English"
    );
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* localStorage unavailable — ignore */
    }
  }

  function getInitialLanguage() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "es" || saved === "en") return saved;
    } catch (e) {}
    var browserLang = (navigator.language || "es").slice(0, 2);
    return browserLang === "en" ? "en" : "es";
  }

  var currentLang = getInitialLanguage();
  applyLanguage(currentLang);

  langToggle.addEventListener("click", function () {
    currentLang = currentLang === "en" ? "es" : "en";
    applyLanguage(currentLang);
  });

  // ---------- Mobile menu ----------
  var menuToggle = document.getElementById("menuToggle");
  var navLinks = document.getElementById("navLinks");

  menuToggle.addEventListener("click", function () {
    var isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  // ---------- Scroll reveal ----------
  var reveals = document.querySelectorAll(".reveal");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) {
      el.classList.add("in-view");
    });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    reveals.forEach(function (el) {
      observer.observe(el);
    });
  }
})();
