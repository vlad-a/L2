$(document).ready(function () {
  $(".rating-info-tabs-top__item")
    .click(function () {
      $(".rating-info-tabs-top__item")
        .removeClass("active")
        .eq($(this).index())
        .addClass("active");
      $(".rating-info-tabs-content__item").hide().eq($(this).index()).fadeIn();
    })
    .eq(0)
    .addClass("active");
  var endDate = new Date("2024-07-05T23:59:59").getTime();

  $(".preview__slider").owlCarousel({
    loop: true,
    center: true,
    items: 1,
    dots: true,
    nav: true,
    smartSpeed: 300,
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
  }); // Инициализация таймера
  $("#countdown").countdown(endDate, function (event) {
    $(this).find(".days").html(event.strftime("%D"));
    $(this).find(".days-label").html(" дня ");
    $(this).find(".hours").html(event.strftime("%H"));
    $(this).find(".hours-label").html(" часа ");
    $(this).find(".minutes").html(event.strftime("%M"));
    $(this).find(".minutes-label").html(" минут");
  });
});
