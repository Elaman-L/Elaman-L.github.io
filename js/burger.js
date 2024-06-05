export function burger() {
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav-btn");
  const navLinks = document.querySelectorAll(".nav__item-link"); // Исправлено

  // Проверяем, что элементы существуют в DOM
  if (burger && nav) {
    burger.addEventListener("click", () => {
      nav.classList.toggle("nav-active");
      burger.classList.toggle("burger-active");
      document.body.classList.toggle("stop-scroll");
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("nav-active");
        burger.classList.remove("burger-active");
        document.body.classList.remove("stop-scroll");
      });
    });
  }

  // Закрыть меню при клике вне его
  document.addEventListener("click", (event) => {
    if (event.target.closest("#burger") || event.target.closest("#nav-btn")) {
      event._isClickWithinMenu = true;
    } else {
      nav.classList.remove("nav-active");
      burger.classList.remove("burger-active");
      document.body.classList.remove("stop-scroll");
    }
  });

  // Обработка кликов внутри меню и бургер-кнопки
  document.querySelectorAll("#burger, #nav-btn").forEach((element) => {
    element.addEventListener("click", (event) => {
      event._isClickWithinMenu = true;
    });
  });
}
