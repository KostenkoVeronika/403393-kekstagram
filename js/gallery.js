'use strict';

// РАБОТА С ГАЛЕРЕЕЙ

(function () {

  var ESC_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;
  var TIMEOUT = 500;

  var pictureBig = document.querySelector('.big-picture');
  var pictureBigCancel = pictureBig.querySelector('#picture-cancel');
  var pictureBigCommentsPlace = pictureBig.querySelector('.social__comments');
  var filtersBlock = document.querySelector('.img-filters');
  var filtersForm = filtersBlock.querySelector('.img-filters__form');
  var filterButtons = filtersForm.querySelectorAll('.img-filters__button');
  var picturesLoad = [];
  var lastTimeout;

  // обработчики
  var pictureOpenSrcHandler = function (pictureData, src) {
    for (var i = 0; i < pictureData.length; i++) {
      if (pictureData[i].url === src) {
        // чистит прошлые комменты
        while (pictureBigCommentsPlace.firstChild) {
          pictureBigCommentsPlace.removeChild(pictureBigCommentsPlace.firstChild);
        }
        window.fillBigPicture(i, pictureData);
      }
    }
  };

  var pictureOpenHandler = function (evt, pictureData) {
    window.util.modalOpenAddHandler();
    var target = evt.target;
    if (target.tagName === 'IMG') {
      var src = target.getAttribute('src');
      pictureOpenSrcHandler(pictureData, src);
    } else if (target.tagName === 'A') {
      var src = target.children[0].getAttribute('src');
      pictureOpenSrcHandler(pictureData, src);
    }
  };

  var pictureCloseHandler = function () {
    pictureBig.classList.add('hidden');
  };

  var pictureCloseEscHandler = function (evt) {
    if (evt.keyCode === ESC_KEY_CODE) {
      pictureCloseHandler();
      window.util.modalOpenRemoveHandler();
      document.removeEventListener('keydown', pictureCloseEscHandler);
    }
  };

  var sortLikes = function (copyArray) {
    var likesDown = copyArray.sort(function (one, two) {
      return two.likes - one.likes;
    });
    return likesDown;
  };

  var sortComments = function (copyArray) {
    var commentsDown = copyArray.sort(function (one, two) {
      return two.comments.length - one.comments.length;
    });
    return commentsDown;
  };

  var sortRandom = function (copyArray) {
    var randomOrder = copyArray.sort(function () {
      return window.util.getRandomNumber(0, copyArray.length - 1);
    });
    return randomOrder;
  };

  var doFilter = function (data, place, func) {
    if (func) {
      var copy = data.slice();
      var arrayNew = func(copy);
      window.picture.makeTemplateElement(arrayNew, place);
    } else {
      window.picture.makeTemplateElement(data, place);
    }
  };

  var filterClickHandler = function (evt, data, place) {
    var filterActiveClass = 'img-filters__button--active';
    window.picture.removeTemplateElement(place);
    for (var j = 0; j < filterButtons.length; j++) {
      filterButtons[j].classList.remove(filterActiveClass);
    }
    var target = evt.target;
    if (target.tagName === 'BUTTON') {
      var filterId = target.getAttribute('id');
      target.classList.add(filterActiveClass);
      if (filterId === 'filter-popular') {
        doFilter(data, place, sortLikes);
      } else if (filterId === 'filter-recommend') {
        doFilter(data, place);
      } else if (filterId === 'filter-discussed') {
        doFilter(data, place, sortComments);
      } else if (filterId === 'filter-random') {
        doFilter(data, place, sortRandom);
      }
    }
  };

  // загрузка данных с сервера - успех
  var successLoadHandler = function (data) {
    picturesLoad = data;
    // вызов для отображения маленьких картинок
    window.picture.makeTemplateElement(picturesLoad);
    var pictureSmallPlace = document.querySelector('.picture-small__place');
    filtersBlock.classList.remove('img-filters--inactive');

    var filterDoHandler = function (evt) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        filterClickHandler(evt, picturesLoad, pictureSmallPlace);
      }, TIMEOUT);
    };

    var previewDoHandler = function (evt) {
      pictureOpenHandler(evt, picturesLoad);
      document.addEventListener('keydown', pictureCloseEscHandler);
    };

    // слушатель для вызова большой картинки
    pictureSmallPlace.addEventListener('click', previewDoHandler);
    pictureSmallPlace.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEY_CODE) {
        previewDoHandler(evt);
      }
    });

    // применение фильтров
    filtersForm.addEventListener('click', filterDoHandler);
    filtersForm.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEY_CODE) {
        filterDoHandler(evt);
      }
    });
  };

  // загрузка данных с сервера - ошибка
  var errorLoadHandler = function (message) {
    var errorElement = document.createElement('div');
    errorElement.style = 'z-index: 4; margin: 0 auto; margin-top: 10px; text-align: center; background-color: rgb(250, 75, 73); border: 2px solid rgb(246, 225, 12); border-radius: 15px; color: rgb(255, 255, 255); font-weight: 700; width: 800px; padding: 10px;';
    errorElement.style.position = 'absolute';
    errorElement.style.left = 0;
    errorElement.style.right = 0;
    errorElement.fontSize = '24px';
    errorElement.textContent = message;
    document.body.insertAdjacentElement('afterbegin', errorElement);
  };

  // загрузка данных с сервера
  window.backend.load(successLoadHandler, errorLoadHandler);

  // закрыть картинку по нажатию на крестик
  pictureBigCancel.addEventListener('click', function () {
    pictureCloseHandler();
    window.util.modalOpenRemoveHandler();
    document.removeEventListener('keydown', pictureCloseEscHandler);
  });
  pictureBigCancel.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEY_CODE) {
      pictureCloseHandler();
      window.util.modalOpenRemoveHandler();
      document.removeEventListener('keydown', pictureCloseEscHandler);
    }
  });

})();
