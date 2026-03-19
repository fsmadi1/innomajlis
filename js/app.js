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

// Declaring Links Group Variables
const mainLinks = document.querySelectorAll("ul#links-group01 li");
const mobileLinks = document.querySelectorAll("ul#links-group02 li");

// Handle Active Tab Functions

// Remove Active Tab Handler
const removeActiveTabFrom = (htmlElement) => {
  htmlElement.forEach((link) => {
    link.firstElementChild.classList.remove("active");
  });
};

const loopThroughLinks = (mainUL, subUL) => {
  mainUL.forEach((anchor) => {
    anchor.onclick = () => {
      // Remove active tab from both ul.links
      removeActiveTabFrom(mainUL);
      removeActiveTabFrom(subUL);
      // get node index
      const index = [...mainUL].indexOf(anchor);
      console.log("index: ", index);
      // add active tab to main ul.links
      anchor.firstElementChild.classList.add("active");
      // add active tab to sub ul.links
      subUL[index].firstElementChild.classList.add("active");
    };
  });
};

const handleActiveTab = () => {
  loopThroughLinks(mainLinks, mobileLinks);
  loopThroughLinks(mobileLinks, mainLinks);
};

handleActiveTab();

const handleSpecialClick = () => {
  mainLinks[mainLinks.length - 1].firstElementChild.click();
};

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

// Apply Translation
// ----------------

function loadSavedLang() {
  // 1️⃣ Get saved language or default to Arabic
  const savedLang = localStorage.getItem("lang") || "ar";

  // 2️⃣ Load language
  loadLang(savedLang);

  // 3️⃣ Set switch state (true = Arabic for example)
  flipSwitch.checked = savedLang === "ar";
}

document.addEventListener("DOMContentLoaded", () => {
  loadPage("home");
  loadSavedLang();
});

flipSwitch.addEventListener("change", () => {
  if (flipSwitch.checked) {
    loadLang("ar");
    localStorage.setItem("lang", "ar");
  } else {
    loadLang("en");
    localStorage.setItem("lang", "en");
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
  scrollProgress.style.background = `conic-gradient(white ${scrollValue}%, transparent ${scrollValue}%)`;
};
//
window.onscroll = calcScrollValue;
window.onload = calcScrollValue;

// End Scroll To Top Behavior

const initSlider = () => {
  // Start Image Slider
  // - --- - --- - --- -

  // Get Slider Items | Array.form [ES6 Feature]
  let sliderImages = Array.from(
    document.querySelectorAll(".slider-container img"),
  );

  // Get Number Of Slides
  let slidesCount = sliderImages.length;

  // Set Current Slide
  let currentSlide = 1;

  // Slide Number Element
  let slideNumberElement = document.getElementById("slide-number");

  // Previous and Next Buttons
  let nextButton = document.getElementById("next");
  let prevButton = document.getElementById("prev");

  // Handle Click on Previous and Next Buttons
  nextButton.onclick = nextSlide;
  prevButton.onclick = prevSlide;

  // Create The Main UL Element
  let paginationElement = document.createElement("ul");

  // Set ID On Created Ul Element
  paginationElement.setAttribute("id", "pagination-ul");

  // Create List Items Based On Slides Count
  for (let i = 1; i <= slidesCount; i++) {
    // Create The LI
    let paginationItem = document.createElement("li");

    // Set Custom Attribute
    paginationItem.setAttribute("data-index", i);

    // Set Item Content
    //   Change Happend HERE!
    //   paginationItem.appendChild(document.createTextNode(i));

    // Append Items to The Main Ul List
    paginationElement.appendChild(paginationItem);
  }

  // Add The Created UL Element to The Page
  document.getElementById("indicators").appendChild(paginationElement);

  // Get The New Created UL
  let paginationCreatedUl = document.getElementById("pagination-ul");

  // Get Pagination Items | Array.form [ES6 Feature]
  let paginationsBullets = Array.from(
    document.querySelectorAll("#pagination-ul li"),
  );

  // Loop Through All Bullets Items
  for (let i = 0; i < paginationsBullets.length; i++) {
    paginationsBullets[i].onclick = function () {
      currentSlide = parseInt(this.getAttribute("data-index"));

      theChecker();
    };
  }

  // Trigger The Checker Function
  theChecker();

  // Next Slide Function
  function nextSlide() {
    if (nextButton.classList.contains("disabled")) {
      // Do Nothing
      return false;
    } else {
      currentSlide++;

      theChecker();
    }
  }

  // Previous Slide Function
  function prevSlide() {
    if (prevButton.classList.contains("disabled")) {
      // Do Nothing
      return false;
    } else {
      currentSlide--;

      theChecker();
    }
  }

  // Create The Checker Function
  function theChecker() {
    // Set The Slide Number
    slideNumberElement.textContent =
      "Slide #" + currentSlide + " of " + slidesCount;

    // Remove All Active Classes
    removeAllActive();

    // Set Active Class On Current Slide
    sliderImages[currentSlide - 1].classList.add("active");

    // Set Active Class on Current Pagination Item
    paginationCreatedUl.children[currentSlide - 1].classList.add("active");

    // Check if Current Slide is The First
    if (currentSlide == 1) {
      // Add Disabled Class on Previous Button
      prevButton.classList.add("disabled");
    } else {
      // Remove Disabled Class From Previous Button
      prevButton.classList.remove("disabled");
    }

    // Check if Current Slide is The Last
    if (currentSlide == slidesCount) {
      // Add Disabled Class on Next Button
      nextButton.classList.add("disabled");
    } else {
      // Remove Disabled Class From Next Button
      nextButton.classList.remove("disabled");
    }
  }

  // Remove All Active Classes From Images and Pagination Bullets
  function removeAllActive() {
    // Loop Through Images
    sliderImages.forEach((img) => {
      img.classList.remove("active");
    });

    // Loop Through Pagination Bullets
    paginationsBullets.forEach(function (bullet) {
      bullet.classList.remove("active");
    });
  }

  // - --- - --- - --- -
  // End Image Slider
};

// ---> Start SPA Behavior Simulation

async function loadPage(page) {
  startLoader();

  const response = await fetch(`pages/${page}.html`);
  const data = await response.text();

  const content = document.getElementById("content");
  content.innerHTML = data;

  loadSavedLang();
  if (page === "home") initSlider();

  // wait for render
  await new Promise(requestAnimationFrame);

  setTimeout(() => {
    scrollToTop();
  }, 10);

  finishLoader();
}

// ---> End SPA Behavior Simulation

// Scroll To Top Function
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Helper Functions for Bar Loading

function startLoader() {
  const bar = document.getElementById("loader-bar");
  bar.style.opacity = "1";
  bar.style.width = "30%";

  // fake progress while loading
  bar._interval = setInterval(() => {
    let width = parseFloat(bar.style.width);
    if (width < 90) {
      bar.style.width = width + Math.random() * 10 + "%";
    }
  }, 200);
}

function finishLoader() {
  const bar = document.getElementById("loader-bar");

  clearInterval(bar._interval);
  bar.style.width = "100%";

  setTimeout(() => {
    bar.style.opacity = "0";
    bar.style.width = "0%";
  }, 300);
}
