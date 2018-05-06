'use strict';

// РАБОТА С ГАЛЕРЕЕЙ

(function () {

  var ESC_KEY_CODE = 27;
  
  var pictureSmallPlace = document.querySelector('.pictures');
  var pictureBig = document.querySelector('.big-picture');
  var pictureBigCancel = pictureBig.querySelector('.big-picture__cancel');
  var pictureBigCommentsPlace = pictureBig.querySelector('.social__comments');
  var picturesLoad = {};
  
  // загрузка данных с сервера - успех
  var successLoadHandler = function (data) {
    picturesLoad = data;
    // вызов для отображения маленьких картинок
    window.makeTemplateElement(picturesLoad);
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

