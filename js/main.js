"use strict";

import { getAnimation } from "./anim-greensock.js";
import { burger } from "./burger.js";
import { map } from "./map.js";
import { calculate } from "./calculate.js";

let preloader = document.querySelector(".preloader");

window.addEventListener("load", () => {
  preloader.classList.add("hide");

  setTimeout(() => {
    preloader.remove();
  }, 600);
});

// Скролл навигация
const headerEl = document.getElementById("header");

window.addEventListener("scroll", function () {
  const scrollPos = window.scrollY;
  const headerMiniClass = "header-mini";

  if (scrollPos > 100) {
    if (!headerEl.classList.contains(headerMiniClass)) {
      headerEl.classList.add(headerMiniClass);
    }
  } else {
    if (headerEl.classList.contains(headerMiniClass)) {
      headerEl.classList.remove(headerMiniClass);
    }
  }
});

// Настройки Swiper для слайдера услуг
const swiperServices = new Swiper("#swiper-services", {
  loop: true,
  slidesPerView: 3,
  spaceBetween: 30,
  grabCursor: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    769: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    950: {
      slidesPerView: 3,
      spaceBetween: 15,
    },
  },
});

// Настройки Swiper для слайдера отзывов
const swiperFeedback = new Swiper("#swiper-feedback", {
  slidesPerView: 1,
  spaceBetween: 10,
  loop: true,
  grabCursor: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

getAnimation();
burger();
map();
calculate();
