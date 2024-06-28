$(document).ready(function () {
  const countDownDate = new Date("June 30, 2024 15:37:00").getTime(); // Обновленная дата без секунд

  if ($(".countdown").length > 0) {
    const countdown = $(".countdown");
    const dayscontainer = countdown.find(".js-days span");
    const hourscontainer = countdown.find(".js-hours span");
    const minutescontainer = countdown.find(".js-minutes span");

    const startCountdown = () => {
      const timer = setInterval(function () {
        // Get today's date and time
        let now = new Date().getTime();

        // Find the distance between now and the count down date
        let distance = countDownDate - now;

        if (distance < 0) {
          countdown.remove();
          clearInterval(timer);
        }

        // Time calculations for days, hours, minutes
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        // Function to add leading zero
        const addLeadingZero = (num) => (num < 10 ? `0${num}` : num);

        // Display the result with leading zero if needed
        dayscontainer.text(addLeadingZero(days));
        hourscontainer.text(addLeadingZero(hours));
        minutescontainer.text(addLeadingZero(minutes));
      }, 1000);
    };

    startCountdown();
  }

  $(".preview__slider").slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    dots: true,
  });
  $(".header-left__theme").click(function () {
    $(this).toggleClass("active");
  });
  $(".header-right-item__top").click(function () {
    $(".header-right__item--lang").toggleClass("active");
  });
  $(".header-right__item--username").click(function () {
    $(".header-right__item--username").toggleClass("active");
  });
  $(document).click(function (event) {
    // Проверяем, был ли клик вне элементов .header-right__item--lang и .header-right__item--username
    if (
      !$(event.target).closest(
        ".header-right__item--lang, .header-right__item--username"
      ).length
    ) {
      // Удаляем класс active у обоих элементов
      $(".header-right__item--lang, .header-right__item--username").removeClass(
        "active"
      );
    }
  });
  $(document).click(function (event) {
    // Проверяем, был ли клик вне элементов .header-right__item--lang и .header-right__item--username
    if (!$(event.target).closest(".servers-top__search").length) {
      // Удаляем класс active у обоих элементов
      $(".servers-top__search").removeClass("active");
    }
  });
  $(".servers-top__search").click(function (event) {
    event.stopPropagation();
    // Добавляем класс active к .header-right__item--lang и удаляем у .header-right__item--username
    $(this).addClass("active");
  });
  $(".servers-tabs-click__item")
    .click(function () {
      $(".servers-tabs-click__item")
        .removeClass("active")
        .eq($(this).index())
        .addClass("active");
      $(".servers-tabs-content--tab").hide().eq($(this).index()).fadeIn();
    })
    .eq(0)
    .addClass("active");
  $(".servers-top__version").click(function (event) {
    event.stopPropagation();
    // Добавляем класс active к .header-right__item--lang и удаляем у .header-right__item--username
    $(this).toggleClass("active");
  });
  // Обработка клика по .header-right__item--lang
  $(".header-right__item--lang").click(function (event) {
    event.stopPropagation();
    // Добавляем класс active к .header-right__item--lang и удаляем у .header-right__item--username
    $(this).addClass("active");
    $(".header-right__item--username").removeClass("active");
  });

  // Обработка клика по .header-right__item--username
  $(".header-right__item--username").click(function (event) {
    event.stopPropagation();
    // Добавляем класс active к .header-right__item--username и удаляем у .header-right__item--lang
    $(this).addClass("active");
    $(".header-right__item--lang").removeClass("active");
  });
  $(".header__burger").click(function (event) {
    event.stopPropagation();
    // Добавляем класс active к .header-right__item--username и удаляем у .header-right__item--lang
    $(this).toggleClass("active");
    $(".header__right, .header__nav").toggleClass("active");
  });
});
