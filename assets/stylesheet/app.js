(function () {
  "use strict";

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
  var roles = [
    "Data Analyst",
    "Data Analytics for Business",
    "Robotics Instructor",
    "Python · SQL · Tableau",
    "Machine Learning Enthusiast",
  ];
  var el = document.getElementById("typewriter");
  var roleIndex = 0;
  var charIndex = 0;
  var deleting = false;

  function type() {
    var current = roles[roleIndex];
    if (!deleting) {
      charIndex++;
      el.textContent = current.substring(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(type, 1600);
        return;
      }
      setTimeout(type, 75);
    } else {
      charIndex--;
      el.textContent = current.substring(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(type, 400);
        return;
      }
      setTimeout(type, 40);
    }
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
  revealEls.forEach(function (el) {
    observer.observe(el);
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
})();