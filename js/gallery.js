'use strict';

// РАБОТА С ГАЛЕРЕЕЙ

(function () {

  var ESC_KEY_CODE = 27;
  
  var pictureSmallPlace = document.querySelector('.pictures');
  var pictureBig = document.querySelector('.big-picture');
  var pictureBigCancel = pictureBig.querySelector('.big-picture__cancel');
  var pictureBigCommentsPlace = pictureBig.querySelector('.social__comments');

  // вызов для отображения маленьких картинок
  window.makeTemplateElement(window.pictureData);

  // обработчики
  var modalOpenAddHandler = function () {
    document.querySelector('body').classList.add('modal-open');
  };

  var modalOpenRemoveHandler = function () {
    document.querySelector('body').classList.remove('modal-open');
  };

  var pictureOpenHandler = function (evt) {
    var target = evt.target;
    if (target.tagName === 'IMG') {
      var src = target.getAttribute('src');
      for (var i = 0; i < window.pictureData.length; i++) {
        if (window.pictureData[i].url === src) {
          // чистит прошлые комменты
          while (pictureBigCommentsPlace.firstChild) {
            pictureBigCommentsPlace.removeChild(pictureBigCommentsPlace.firstChild);
          }
          window.fillBigPicture(i);
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

  // показать картинку (делегирование)
  pictureSmallPlace.addEventListener('click', function (evt) {
    modalOpenAddHandler();
    pictureOpenHandler(evt);
    document.addEventListener('keydown', pictureCloseEscHandler);
  });
  
  // закрыть картинку по нажатию на крестик
  pictureBigCancel.addEventListener('click', function() {
    pictureCloseHandler();
    modalOpenRemoveHandler();
    document.removeEventListener('keydown', pictureCloseEscHandler);
  });

})();

