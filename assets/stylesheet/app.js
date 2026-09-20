(function () {
  "use strict";

  var currentLang = localStorage.getItem("portfolio_lang") || "en";

  // ---- Navbar scroll effect ----
  var navbar = document.getElementById("navbar");
  function onScrollNav() {
    if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 30);
  }
  window.addEventListener("scroll", onScrollNav, { passive: true });
  onScrollNav();

  // ---- Mobile hamburger ----
  var burger = document.getElementById("hamburger");
  var navLinks = document.querySelector(".nav-links");
  if (burger && navLinks) {
    burger.addEventListener("click", function () {
      navLinks.classList.toggle("open");
    });
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
      });
    });
  }

  // ---- Typewriter effect ----
  var el = document.getElementById("typewriter");
  var roleIndex = 0;
  var charIndex = 0;
  var deleting = false;
  var typeTimeout = null;

  function getRoles() {
    var dict = window.PORTFOLIO_I18N && window.PORTFOLIO_I18N[currentLang];
    return (dict && dict.roles) || [
      "Data Analyst",
      "Data Analytics for Business",
      "Robotics Instructor",
      "Python · SQL · Tableau",
      "Machine Learning Enthusiast"
    ];
  }

  function type() {
    var roles = getRoles();
    if (roleIndex >= roles.length) roleIndex = 0;
    var current = roles[roleIndex];

    if (!deleting) {
      charIndex++;
      if (el) el.textContent = current.substring(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        typeTimeout = setTimeout(type, 1600);
        return;
      }
      typeTimeout = setTimeout(type, 75);
    } else {
      charIndex--;
      if (el) el.textContent = current.substring(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeTimeout = setTimeout(type, 400);
        return;
      }
      typeTimeout = setTimeout(type, 40);
    }
  }

  function restartTypewriter() {
    if (typeTimeout) clearTimeout(typeTimeout);
    roleIndex = 0;
    charIndex = 0;
    deleting = false;
    if (el) el.textContent = "";
    type();
  }

  if (el) setTimeout(type, 800);

  // ---- Scroll reveal ----
  var revealEls = document.querySelectorAll(".reveal");
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach(function (item) {
    observer.observe(item);
  });

  // ---- Back to top ----
  var toTop = document.getElementById("toTop");
  if (toTop) {
    window.addEventListener(
      "scroll",
      function () {
        toTop.classList.toggle("show", window.scrollY > 500);
      },
      { passive: true }
    );
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ---- Current year ----
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // ---- i18n Translation Engine ----
  function getNestedTranslation(obj, path) {
    var parts = path.split(".");
    var curr = obj;
    for (var i = 0; i < parts.length; i++) {
      if (curr == null) return null;
      curr = curr[parts[i]];
    }
    return curr;
  }

  function setLanguage(lang) {
    if (!window.PORTFOLIO_I18N || !window.PORTFOLIO_I18N[lang]) return;
    currentLang = lang;
    localStorage.setItem("portfolio_lang", lang);
    document.documentElement.lang = lang;

    var dict = window.PORTFOLIO_I18N[lang];

    // Update all elements with data-i18n
    var translatables = document.querySelectorAll("[data-i18n]");
    translatables.forEach(function (elem) {
      var key = elem.getAttribute("data-i18n");
      var text = getNestedTranslation(dict, key);
      if (text !== null && text !== undefined) {
        elem.innerHTML = text;
      }
    });

    // Update switcher active state
    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      if (btn.getAttribute("data-lang") === lang) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // Restart typewriter with translated roles
    restartTypewriter();
  }

  // Bind language switcher buttons
  document.querySelectorAll(".lang-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var lang = this.getAttribute("data-lang");
      setLanguage(lang);
    });
  });

  // Initial language setup
  setLanguage(currentLang);
})();
