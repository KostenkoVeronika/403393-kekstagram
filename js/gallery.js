'use strict';

// РАБОТА С ГАЛЕРЕЕЙ

(function () {

  var ESC_KEY_CODE = 27;
  var TIMEOUT = 500;
  
  var pictureSmallPlace = document.querySelector('.pictures');
  var pictureBig = document.querySelector('.big-picture');
  var pictureBigCancel = pictureBig.querySelector('.big-picture__cancel');
  var pictureBigCommentsPlace = pictureBig.querySelector('.social__comments');
  var filtersBlock = document.querySelector('.img-filters');
  var filtersForm = filtersBlock.querySelector('.img-filters__form');
  var filterButtons = filtersForm.querySelectorAll('.img-filters__button');
  var picturesLoad = [];
  var lastTimeout;

  // обработчики
  var modalOpenAddHandler = function () {
    document.querySelector('body').classList.add('modal-open');
  };

  var modalOpenRemoveHandler = function () {
    document.querySelector('body').classList.remove('modal-open');
  };

  var pictureOpenHandler = function (evt, pictureData) {
    var target = evt.target;
    if (target.tagName === 'IMG') {
      var src = target.getAttribute('src');
      for (var i = 0; i < pictureData.length; i++) {
        if (pictureData[i].url === src) {
          // чистит прошлые комменты
          while (pictureBigCommentsPlace.firstChild) {
            pictureBigCommentsPlace.removeChild(pictureBigCommentsPlace.firstChild);
          }
          window.fillBigPicture(i, pictureData);
        }
      }
    }
  };

  var pictureCloseHandler = function () {
    pictureBig.classList.add('hidden');
  };

  var pictureCloseEscHandler = function (evt) {
    if (evt.keyCode === ESC_KEY_CODE) {
      pictureCloseHandler();
      modalOpenRemoveHandler();
      document.removeEventListener('keydown', pictureCloseEscHandler);
    }
  };
  
  var sortLikes = function (copyArray) {
    var likesDown = copyArray.sort(function (one, two) {
      if (one.likes > two.likes) {
        return -1;
      }
      else if (one.likes < two.likes) {
        return 1;
      }
      else {
        return 0;
      }
    });
    return likesDown;
  };
  
  var sortComments = function (copyArray) {
    var commentsDown = copyArray.sort(function (one, two) {
      if (one.comments.length-1 > two.comments.length-1) {
        return -1;
      }
      else if (one.comments.length-1 < two.comments.length-1) {
        return 1;
      }
      else {
        return 0;
      }
    });
    return commentsDown;
  };
  
  var sortRandom = function (copyArray) {
    var randomOrder = copyArray.sort(function () {
      return window.util.getRandomNumber(0, copyArray.length-1);  
    });
    return randomOrder;
  }
  
  var doFilter = function (data, func) {
    if (func) {
      var copy = data.slice();
      var arrayNew = func(copy);
      window.makeTemplateElement(arrayNew);
    }
    window.makeTemplateElement(data);
  };
  
  var filterClickHandler = function (evt, data) {
    var filterActiveClass = 'img-filters__button--active';
    window.removeTemplateElement();
    for (var j = 0; j < filterButtons.length; j++) {
      filterButtons[j].classList.remove(filterActiveClass);
    }
    var target = evt.target;
    if (target.tagName === 'BUTTON') {
      var filterId = target.getAttribute('id');
      target.classList.add(filterActiveClass);
      
      if (filterId === 'filter-popular') {
        doFilter(data, sortLikes);  
      }
      else if (filterId === 'filter-recommend') {
        doFilter(data);
      }
      else if (filterId === 'filter-discussed') {
        doFilter(data, sortComments);
      }
      else if (filterId === 'filter-random') {
        doFilter(data, sortRandom);
      }
    }
  };

  // загрузка данных с сервера - успех
  var successLoadHandler = function (data) {
    picturesLoad = data;
    
    // вызов для отображения маленьких картинок
    window.makeTemplateElement(picturesLoad);
    filtersBlock.classList.remove('img-filters--inactive');
    
    // слушатель для вызова большой картинки
    pictureSmallPlace.addEventListener('click', function (evt) {
      modalOpenAddHandler();
      pictureOpenHandler(evt, picturesLoad);
      document.addEventListener('keydown', pictureCloseEscHandler);
    });
    
    // применение фильтров
    filtersForm.addEventListener('click', function (evt) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        filterClickHandler(evt, picturesLoad);
      }, TIMEOUT);
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
  pictureBigCancel.addEventListener('click', function() {
    pictureCloseHandler();
    modalOpenRemoveHandler();
    document.removeEventListener('keydown', pictureCloseEscHandler);
  });

})();

