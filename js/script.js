$(document).ready(function () {
  class gw_timeUpdate {
    constructor(el, date, startIn, lifeTime, tz) {
      this.el = el;
      this.startTime = luxon.DateTime.fromSQL(date, { zone: tz });
      this.tz = tz;
      this.startIn = startIn || "Start in";
      this.lifeTime = lifeTime || "Life time";
    }

    update() {
      let dateNow = luxon.DateTime.now().setZone(this.tz);
      let comming = this.startTime < dateNow;

      let obj = this.startTime
        .diff(dateNow, ["days", "hours", "minutes", "seconds"])
        .toObject();
      let days = Math.abs(Math.floor(obj.days));
      let hours = Math.abs(Math.floor(obj.hours));
      let minutes = Math.abs(Math.floor(obj.minutes));
      let seconds = Math.abs(Math.floor(obj.seconds));
      let title = comming ? this.lifeTime : this.startIn;

      let html = `
        <div class="countdown">
            <div class="countdown__heading">
                <div class="countdown__title">${title}</div>
            </div>
            <div class="countdown__counter">
                <div class="gw-timer">
                    <div class="gw-timer__item">
                        <div class="gw-timer__amount">${days}</div>
                        <div class="gw-timer__desc">${numDecline(
                          days,
                          __config.timer.dd[0]
                        )}</div>
                    </div>
										<div class="gw-timer-dot">:</div>
                    <div class="gw-timer__item">
                        <div class="gw-timer__amount">${String(hours).padStart(
                          2,
                          "0"
                        )}</div>
                        <div class="gw-timer__desc">${numDecline(
                          hours,
                          __config.timer.dd[1]
                        )}</div>
                    </div>
										<div class="gw-timer-dot">:</div>
                    <div class="gw-timer__item">
                        <div class="gw-timer__amount">${String(
                          minutes
                        ).padStart(2, "0")}</div>
                        <div class="gw-timer__desc">${numDecline(
                          minutes,
                          __config.timer.dd[2]
                        )}</div>
                    </div>
                </div>
            </div>
        </div>
        `;
      this.el.html(html);
    }
  }

  function numDecline(n, titles) {
    return titles[
      1 === n % 10 && 11 !== n % 100
        ? 0
        : 2 <= n % 10 && 4 >= n % 10 && (10 > n % 100 || 20 <= n % 100)
        ? 1
        : 2
    ];
  }

  const __config = {
    timer: {
      dd: [
        ["день", "дня", "дней"],
        ["час", "часа", "часов"],
        ["минута", "минуты", "минут"],
        ["секунда", "секунды", "секунд"],
      ],
    },
  };

  console.log("DOM fully loaded and parsed");
  $("[data-timer-start-time]").each(function (index, element) {
    const __this = $(this);
    console.log("Initializing timer for element:", __this);
    let timeREnder = new gw_timeUpdate(
      __this,
      __this.attr("data-timer-start-time"),
      __this.attr("data-timer-before"),
      __this.attr("data-timer-after"),
      __this.attr("data-timer-time-zone")
    );
    let update = function () {
      timeREnder.update();
      setTimeout(() => {
        update();
      }, 1000);
    };
    update();
  });

  var mySwiper = new Swiper(".preview__slider", {
    // Опции Swiper
    loop: true,
    centeredSlides: true,
    spaceBetween: 30, // Отступ по умолчанию
    slidesPerView: 1,
    loopAdditionalSlides: 1,
    slidesPerColumn: 1,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    speed: 600,
    breakpoints: {
      1200: {
        spaceBetween: 30, // Отступ 15 пикселей
      },
      992: {
        spaceBetween: 25, // Отступ 15 пикселей
      },
      768: {
        spaceBetween: 20, // Отступ 15 пикселей
      },
      0: {
        spaceBetween: 15, // Отступ 15 пикселей
      },
    },
  });
  $(".custom-select").selectize();
  $(".moreless-button").click(function () {
    $(".moretext").slideToggle();
    if ($(".moreless-button").text() == "Read more") {
      $(this).text("Read less");
    } else {
      $(this).text("Read more");
    }
  });
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

  // Обработчик клика на кнопку "Read more"
  $(document).on("click", ".moreless-button", function (e) {
    e.preventDefault();

    var $this = $(this);
    var $ritcrText = $this.prev(".ritcr-text__box");

    // Переключение класса active
    $ritcrText.toggleClass("active");

    // Изменение текста ссылки
    if ($ritcrText.hasClass("active")) {
      $this.text("Read more");
    } else {
      $this.text("Read less");
    }
  });

  $(".rating-info-tabs-top__item").on("click", function () {
    $(".ritcr-text__box").each(function () {
      var $this = $(this);

      // Сохранение текущих стилей
      var originalDisplay = $this.css("display");
      var originalVisibility = $this.css("visibility");
      var originalPosition = $this.css("position");

      // Временное отображение элемента для измерения высоты
      $this.css({
        visibility: "hidden",
        position: "absolute",
        display: "block",
      });

      // Проверка высоты
      var height = $this.height();

      // Возвращение элемента в исходное состояние
      $this.css({
        visibility: originalVisibility,
        position: originalPosition,
        display: originalDisplay,
      });

      // Добавление класса, если высота больше 192px
      if (height > 192) {
        $this.addClass("active");
        // Добавление ссылки "Read more"
        if (!$this.next(".moreless-button").length) {
          $this.after('<a class="moreless-button" href="#">Read more</a>');
        }
      }
    });
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
  const values = [500, 1500, 2000, 4000];
  const slider = $("#slider");
  const sliderValue = $("#slider-value");
  const priceSpan = $(".pcri-profile__account--vote .wvcra__price span");

  if (slider.length && sliderValue.length && priceSpan.length) {
    slider.on("input", function () {
      const valueIndex = $(this).val();
      const value = values[valueIndex];
      sliderValue.text(value);
      priceSpan.text(value);
      const percentage = valueIndex * (100 / (values.length - 1));
      sliderValue.css("left", `${percentage}%`);
      $(this).css(
        "background",
        `linear-gradient(to right, #e84d18 0%, #e84d18 ${percentage}%, rgba(255, 255, 255, 0.05) ${percentage}%, rgba(255, 255, 255, 0.05) 100%)`
      );
    });
  }
  if ($(window).width() < 992) {
    function toggleDropdown($element, $dropdown) {
      var targetHeight = $dropdown.get(0).scrollHeight;
      if ($element.hasClass("active")) {
        $dropdown.css("height", targetHeight);
        setTimeout(function () {
          $dropdown.css("height", 0);
        }, 10);
      } else {
        $dropdown.css("height", 0);
        setTimeout(function () {
          $dropdown.css("height", targetHeight);
        }, 10);
      }
      $element.toggleClass("active");
    }

    $(".header-right-item__top").on("click", function (event) {
      if ($(window).width() < 992) {
        var $dropdown = $(this).next(".header-right-item__dropdown");
        if ($dropdown.length) {
          toggleDropdown($(this), $dropdown);
        }
        event.stopPropagation();
      }
    });
  }

  $(".header-right__item--username__top").on("click", function (event) {
    if ($(window).width() < 992) {
      var $dropdown = $(this).next(".header-right-item-username__dropdown");
      if ($dropdown.length) {
        toggleDropdown($(this), $dropdown);
      }
      event.stopPropagation();
    }
  });
  if ($(window).width() < 992) {
    var headerHeight = $(".header").height();

    // Получаем высоту элемента .header__nav
    var headerNavHeight = $(".header__nav").height();

    // Рассчитываем значение отступа
    var totalHeight = headerHeight + headerNavHeight;

    // Устанавливаем значение отступа для .header__right
    $(".header__right").css("top", totalHeight + "px");
  }
  $(document).on("click", function (event) {
    if ($(window).width() < 992) {
      if (!$(event.target).closest(".header-right__item").length) {
        $(".header-right-item__top.active").each(function () {
          var $dropdown = $(this).next(".header-right-item__dropdown");
          $dropdown.css("height", 0);
          $(this).removeClass("active");
        });
      }
      if (!$(event.target).closest(".header-right__item--username").length) {
        $(".header-right__item--username__top.active").each(function () {
          var $dropdown = $(this).next(".header-right-item-username__dropdown");
          $dropdown.css("height", 0);
          $(this).removeClass("active");
        });
      }
      if (!$(event.target).closest(".header-right__item--lang").length) {
        $(".header-right__item--lang .header-right-item__top.active").each(
          function () {
            var $dropdown = $(this).next(".header-right-item__dropdown");
            $dropdown.css("height", 0);
            $(this).removeClass("active");
          }
        );
      }
    }
  });
  $(".popup-close,.popup__back").click(function (event) {
    event.stopPropagation();
    // Добавляем класс active к .header-right__item--lang и удаляем у .header-right__item--username
    $(".popup").removeClass("active");
  });
  $(".pcri-profile-personal__list-item--edit").click(function (event) {
    event.stopPropagation();
    // Добавляем класс active к .header-right__item--lang и удаляем у .header-right__item--username
    $(".popup-personal").addClass("active");
  });
  $(".pcri-security__edit .pcri-profile-personal__list-item--edit").click(
    function (event) {
      event.stopPropagation();
      // Добавляем класс active к .header-right__item--lang и удаляем у .header-right__item--username
      $(".popup-security").addClass("active");
    }
  );
  $(".pcri-securit-edit__switch").click(function (event) {
    event.stopPropagation();
    // Добавляем класс active к .header-right__item--lang и удаляем у .header-right__item--username
    $(this).toggleClass("active");
  });
  $(".popup-dropdown__main").click(function (event) {
    event.stopPropagation();
    // Добавляем класс active к .header-right__item--username и удаляем у .header-right__item--lang
    $(this).toggleClass("active");
    $(".popup-dropdown__choise").toggleClass("active");
  });
  $(".popup-dropdown-choise__item").click(function (event) {
    event.stopPropagation();
    // Добавляем класс active к .header-right__item--username и удаляем у .header-right__item--lang
    $(".popup-dropdown__main").removeClass("active");
    $(".popup-dropdown__choise").removeClass("active");
  });
  $(".popup-dropdown-choise__item").on("click", function () {
    // Получение текста обоих элементов
    let choiseText = $(this).text();
    let countryText = $(".popup-dropdown-main__country").text();

    // Замена текста местами
    $(this).text(countryText);
    $(".popup-dropdown-main__country").text(choiseText);
  });
  // Обработка клика по .header-right__item--username
  $(".header-right__item--username").click(function (event) {
    event.stopPropagation();
    // Добавляем класс active к .header-right__item--username и удаляем у .header-right__item--lang
    $(this).addClass("active");
    $(".header-right__item--lang").removeClass("active");
  });
  $(".wallet-select-dropdown-item").click(function () {
    var newText = $(this).text().trim(); // Получаем текст кликнутого элемента
    var $walletSelect = $(this).closest(".wallet-select");
    $walletSelect.find(".wallet-select-top__text").text(newText); // Обновляем текст в .wallet-select-top__text в текущем блоке .wallet-select
    $walletSelect
      .find(".wallet-select-dropdown, .wallet-select-top")
      .toggleClass("active"); // Переключаем классы только внутри текущего блока .wallet-select
  });

  // Добавляем обработчик клика для каждого элемента .wallet-select-top
  $(".wallet-select-top").click(function () {
    var $walletSelect = $(this).closest(".wallet-select");
    $walletSelect
      .find(".wallet-select-dropdown, .wallet-select-top")
      .toggleClass("active"); // Переключаем классы только внутри текущего блока .wallet-select
  });
  $(".header__burger").click(function (event) {
    event.stopPropagation();
    // Добавляем класс active к .header-right__item--username и удаляем у .header-right__item--lang
    $(this).toggleClass("active");
    $(".header__right, .header__nav").toggleClass("active");
  }); // Инициализация таймера
  $(".ritcr-text__box").each(function () {
    if ($(this).height() > 196) {
      $(this).addClass("active");
    }
  });
});
