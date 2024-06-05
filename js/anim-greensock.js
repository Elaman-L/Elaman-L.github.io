// Импортируем функцию анимации из GSAP и ScrollTrigger
export function getAnimation() {
  document.addEventListener("DOMContentLoaded", () => {
    // Функция для выполнения анимации появления элемента
    function animateElement(element, multiplier = 1) {
      let offset = 100 * multiplier;
      element.style.transform = `translate(0px, ${offset}px)`;
      element.style.opacity = "0";

      gsap.fromTo(
        element,
        { x: 0, y: offset, autoAlpha: 0 },
        {
          duration: 1.5,
          x: 0,
          y: 0,
          autoAlpha: 1,
          ease: "expo",
          overwrite: "auto",
        }
      );
    }

    // Функция для скрытия элемента
    function hideElement(element) {
      gsap.set(element, { autoAlpha: 0 });
    }

    // Регистрация плагина ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Находим все элементы с классом ".gs-reveal" и создаем триггеры для них
    gsap.utils.toArray(".gs-reveal").forEach((element) => {
      hideElement(element); // Скрываем элемент изначально

      ScrollTrigger.create({
        trigger: element,
        markers: false,
        onEnter: () => animateElement(element), // Анимация при входе в область видимости
        onEnterBack: () => animateElement(element, -1), // Анимация при обратном входе
        onLeave: () => hideElement(element), // Скрытие при выходе
        onLeaveBack: () => hideElement(element), // Скрытие при обратном выходе
      });
    });

    let scaleAnimation, intervalAnimation;

    // Функция для выполнения анимации социальных ссылок в зависимости от ширины окна
    function handleResize() {
      let socialLinks = document.querySelectorAll(".address__social-link");

      if (window.innerWidth < 950) {
        // Если ширина окна меньше 950px
        if (!scaleAnimation) {
          scaleAnimation = gsap.to(socialLinks, {
            scale: 1.2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            duration: 0.5,
          });
        }

        if (!intervalAnimation) {
          const animateLinks = () => {
            gsap.to(socialLinks, {
              x: 500,
              autoAlpha: 0,
              duration: 1,
              onComplete() {
                gsap.set(socialLinks, { x: -200 });
                gsap.to(socialLinks, { x: 0, autoAlpha: 1, duration: 1 });
              },
            });
          };

          animateLinks();
          intervalAnimation = setInterval(animateLinks, 10000); // Каждые 10 секунд
        }
      } else {
        // Если ширина окна больше или равна 950px
        if (scaleAnimation) {
          scaleAnimation.kill();
          scaleAnimation = null;
        }

        if (intervalAnimation) {
          clearInterval(intervalAnimation);
          intervalAnimation = null;
        }

        gsap.set(socialLinks, { clearProps: "all" }); // Очистка всех GSAP стилей
      }
    }

    // Выполняем проверку при загрузке страницы и при изменении размера окна
    handleResize();
    window.addEventListener("resize", handleResize);
  });
}
