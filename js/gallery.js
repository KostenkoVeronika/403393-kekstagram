'use strict';

// РАБОТА С ГАЛЕРЕЕЙ

(function () {

  var ESC_KEY_CODE = 27;
  
  var pictureSmallPlace = document.querySelector('.pictures');
  var pictureBig = document.querySelector('.big-picture');
  var pictureBigCancel = pictureBig.querySelector('.big-picture__cancel');
  var pictureBigCommentsPlace = pictureBig.querySelector('.social__comments');
  var picturesLoad = [];

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

  // загрузка данных с сервера - успех
  var successLoadHandler = function (data) {
    // вызов для отображения маленьких картинок
    window.makeTemplateElement(data);
    // слушатель для вызова большой картинки
    pictureSmallPlace.addEventListener('click', function (evt) {
      modalOpenAddHandler();
      pictureOpenHandler(evt, data);
      document.addEventListener('keydown', pictureCloseEscHandler);
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

