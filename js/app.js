"use strict";

const mobileMenu = document.querySelector(".mobile-menu");
const menuIcon = document.querySelector(
  ".header .container .section-body .menu-icon",
);
const flipSwitch = document.querySelector("input[type='checkbox']#fs");
const overlay = document.getElementById("overlay");

//
let translations = {};
//

// Start Languages Functions ---- START

function getValue(obj, key) {
  return key.split(".").reduce((o, i) => o[i], obj);
}

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.innerHTML = getValue(translations, el.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.placeholder = getValue(translations, el.dataset.i18nPlaceholder);
  });
}

async function loadLang(lang) {
  const isIndex =
    window.location.pathname.endsWith("index.html") ||
    window.location.pathname === "/" ||
    window.location.pathname === "";

  const langPath = isIndex ? `lang/${lang}.json` : `../lang/${lang}.json`;

  console.log(langPath);
  const res = await fetch(langPath);
  translations = await res.json();

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  applyTranslations();
}

// End Languages Functions   ---- END

// Fetch Json Data
// ----------------

document.addEventListener("DOMContentLoaded", () => {
  loadLang("ar");
  flipSwitch.checked = true;
});

flipSwitch.addEventListener("change", () => {
  if (flipSwitch.checked) {
    loadLang("ar");
  } else {
    loadLang("en");
  }
});

// Mobile Menu
// -----------
// 1. handle click
menuIcon.addEventListener("click", () => {
  console.log("mobile icon clicked");
  mobileMenu.classList.toggle("show-menu");
  //
  if (mobileMenu.classList.contains("show-menu") == true)
    overlay.classList.add("show-overlay");
  else overlay.classList.remove("show-overlay");
});

//

overlay.addEventListener("click", () => {
  mobileMenu.classList.remove("show-menu");
  overlay.classList.remove("show-overlay");
});

// 2. handle resize
addEventListener("resize", () => {
  if (window.innerWidth > 767) {
    mobileMenu.classList.remove("show-menu");
    overlay.classList.remove("show-overlay");
  }
});

//  --- --- ---

// Array.from(mobileMenu.children).forEach((child) => {
//   child.onclick = () => {
//     if (child.children.length > 0) {
//       const items = child.querySelectorAll("li");
//       //
//       items.forEach((li) => {
//         li.addEventListener("click", () => {
//           mobileMenu.classList.remove("show-menu");
//         });
//       });
//     } else {
//       mobileMenu.classList.remove("show-menu");
//     }
//   };
// });

// ---<>---<>---<>---

// document.addEventListener("click", (event) => {
//   // console.log(event.target);
//   if (
//     !event.target.classList.contains("menu-icon") &&
//     !mobileMenu.contains(event.target)
//   ) {
//     mobileMenu.classList.remove("show-menu");
//   }
// });

// ---<>---<>---<>---

// Start Scroll To Top Behavior
let calcScrollValue = () => {
  let scrollProgress = document.getElementById("btn-scroll-top");
  let progressValue = document.getElementById("progress-value");
  //
  let pos = document.documentElement.scrollTop;
  let calcHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrollValue = Math.round((pos * 100) / calcHeight);
  //
  if (pos > 100) {
    scrollProgress.style.display = "grid";
  } else {
    scrollProgress.style.display = "none";
  }
  //
  scrollProgress.addEventListener("click", () => {
    document.documentElement.scrollTop = 0;
  });
  //
  scrollProgress.style.background = `conic-gradient(#f1cd53 ${scrollValue}%, transparent ${scrollValue}%)`;
};
//
window.onscroll = calcScrollValue;
window.onload = calcScrollValue;

// End Scroll To Top Behavior
