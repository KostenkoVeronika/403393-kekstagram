'use strict';

// РАБОТА С ГАЛЕРЕЕЙ

(function () {

  var ESC_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;
  var TIMEOUT = 500;

  var pictureSmallPlace = document.querySelector('.pictures');
  var pictureBig = document.querySelector('.big-picture');
  var pictureBigCancel = pictureBig.querySelector('#picture-cancel');
  var pictureBigCommentsPlace = pictureBig.querySelector('.social__comments');
  var filtersBlock = document.querySelector('.img-filters');
  var filtersForm = filtersBlock.querySelector('.img-filters__form');
  var filterButtons = filtersForm.querySelectorAll('.img-filters__button');
  var picturesLoad = [];
  var lastTimeout;

  // обработчики
  var openPictureSrc = function (pictureData, src) {
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

  var openPicture = function (evt, pictureData) {
    var target = evt.target;
    var src;
    if (target.tagName === 'IMG') {
      window.util.openModal();
      src = target.getAttribute('src');
      openPictureSrc(pictureData, src);
    } else if (target.tagName === 'A') {
      window.util.openModal();
      src = target.children[0].getAttribute('src');
      openPictureSrc(pictureData, src);
    }
  };

  var onPictureCancelClick = function () {
    pictureBig.classList.add('hidden');
  };

  var onPictureCancelEsc = function (evt) {
    if (evt.keyCode === ESC_KEY_CODE) {
      onPictureCancelClick();
      window.util.closeModal();
      document.removeEventListener('keydown', onPictureCancelEsc);
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

  var doFilter = function (data, func) {
    if (func) {
      var copy = data.slice();
      var arrayNew = func(copy);
      window.picture.makeTemplateElement(arrayNew);
    } else {
      window.picture.makeTemplateElement(data);
    }
  };

  var sortPictures = function (evt, data) {
    var filterActiveClass = 'img-filters__button--active';
    window.picture.removeTemplateElement();
    for (var j = 0; j < filterButtons.length; j++) {
      filterButtons[j].classList.remove(filterActiveClass);
    }
    var target = evt.target;
    if (target.tagName === 'BUTTON') {
      var filterId = target.getAttribute('id');
      target.classList.add(filterActiveClass);
      if (filterId === 'filter-popular') {
        doFilter(data, sortLikes);
      } else if (filterId === 'filter-recommend') {
        doFilter(data);
      } else if (filterId === 'filter-discussed') {
        doFilter(data, sortComments);
      } else if (filterId === 'filter-random') {
        doFilter(data, sortRandom);
      }
    }
  };

  // загрузка данных с сервера - успех
  var onSuccessLoad = function (data) {
    picturesLoad = data;
    // вызов для отображения маленьких картинок
    window.picture.makeTemplateElement(picturesLoad);
    filtersBlock.classList.remove('img-filters--inactive');

    var onFilterClick = function (evt) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        sortPictures(evt, picturesLoad);
      }, TIMEOUT);
    };

    var onPictureClick = function (evt) {
      openPicture(evt, picturesLoad);
      document.addEventListener('keydown', onPictureCancelEsc);
    };

    // слушатель для вызова большой картинки
    pictureSmallPlace.addEventListener('click', onPictureClick);
    pictureSmallPlace.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEY_CODE) {
        onPictureClick(evt);
      }
    });

    // применение фильтров
    filtersForm.addEventListener('click', onFilterClick);
    filtersForm.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEY_CODE) {
        onFilterClick(evt);
      }
    });
  };

  // загрузка данных с сервера - ошибка
  var onErrorLoad = function (message) {
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
  window.backend.load(onSuccessLoad, onErrorLoad);

  // закрыть картинку по нажатию на крестик
  pictureBigCancel.addEventListener('click', function () {
    onPictureCancelClick();
    window.util.closeModal();
    document.removeEventListener('keydown', onPictureCancelEsc);
  });
  pictureBigCancel.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEY_CODE) {
      onPictureCancelClick();
      window.util.closeModal();
      document.removeEventListener('keydown', onPictureCancelEsc);
    }
  });

})();
