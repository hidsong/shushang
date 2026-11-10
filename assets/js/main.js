/* 数商站点 · 公共交互（导航 / 主题 / 动效） */
(function () {
  "use strict";

  var doc = document;
  var root = doc.documentElement;
  var THEME_KEY = "shushang-theme";

  /* ---------- 主题切换 ---------- */
  var toggle = doc.querySelector("[data-theme-toggle]");
  if (toggle) {
    var syncThemeLabel = function () {
      var isDark = root.getAttribute("data-theme") === "dark";
      toggle.setAttribute("aria-label", isDark ? "切换到浅色主题" : "切换到深色主题");
      toggle.setAttribute("title", isDark ? "切换到浅色主题" : "切换到深色主题");
    };
    syncThemeLabel();

    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch (e) {
        /* 隐私模式下忽略 */
      }
      syncThemeLabel();
    });
  }

  /* ---------- 滚动时给头部加阴影 ---------- */
  var header = doc.querySelector(".header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- 移动端导航 ---------- */
  var navToggle = doc.querySelector("[data-nav-toggle]");
  var nav = doc.querySelector(".nav");
  if (navToggle && nav) {
    var closeNav = function () {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    };
    navToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeNav();
    });
    doc.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeNav();
    });
  }

  /* ---------- 当前页高亮 ---------- */
  var page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  doc.querySelectorAll(".nav a").forEach(function (link) {
    var href = (link.getAttribute("href") || "").split("#")[0].toLowerCase();
    if (!href) return;
    if (href === page || (page === "" && href === "index.html")) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
    }
  });

  /* ---------- 入场动效 ---------- */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var targets = doc.querySelectorAll("[data-reveal]");
  if (targets.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      targets.forEach(function (el) {
        el.classList.add("reveal", "is-visible");
      });
    } else {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
      );
      targets.forEach(function (el) {
        el.classList.add("reveal");
        observer.observe(el);
      });
    }
  }

  /* ---------- 年份 ---------- */
  doc.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
