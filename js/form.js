'use strict';

// РАБОТА С ФОРМОЙ

(function () {

  var ESC_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;

  var pictureEffects = document.querySelector('.img-upload__overlay');
  var pictureUpload = document.querySelector('#upload-file');
  var pictureEffectsClose = pictureEffects.querySelector('#upload-cancel');
  var pictureEffectsFirstInput = pictureEffects.querySelector('.effects__radio');
  var pictureSizeValue = pictureEffects.querySelector('.resize__control--value');
  var picturePreview = pictureEffects.querySelector('.img-upload__preview');
  var scale = pictureEffects.querySelector('.scale');
  var scalePin = pictureEffects.querySelector('.scale__pin');
  var scaleLevel = pictureEffects.querySelector('.scale__level');
  var form = document.querySelector('.img-upload__form');
  var hashtag = form.querySelector('.text__hashtags');
  var comment = form.querySelector('.text__description');
  var errorBlock = form.querySelector('.img-upload__message--error');
  var errorLinks = errorBlock.querySelector('.error__links');

  // обработчики
  var pictureChangeOpenHandler = function () {
    // две строки для сброса значения размера до 100%
    pictureSizeValue.setAttribute('value', '100%');
    picturePreview.setAttribute('style', 'transform: scale(1);');
    pictureEffects.classList.remove('hidden');
    // применение первого эффекта (оригинал) вместо дефолтного изображения
    pictureEffectsFirstInput.checked = true;
    picturePreview.classList.add('effects__preview--none');
    scale.classList.add('hidden');
  };

  var pictureChangeCloseHandler = function () {
    pictureUpload.value = '';
    window.util.effectClear(picturePreview, scalePin, scaleLevel, hashtag, comment);
    pictureEffects.classList.add('hidden');
    window.util.modalOpenRemoveHandler();
  };

  var pictureChangeCloseEscHandler = function (evt) {
    if (evt.keyCode === ESC_KEY_CODE) {
      pictureChangeCloseHandler();
      // не отслеживать больше еск
      document.removeEventListener('keydown', pictureChangeCloseEscHandler);
    }
  };

  // загрузка картинки и появление окна редактирования и закрытие по клавише еск
  pictureUpload.addEventListener('change', function (evt) {
    window.util.modalOpenAddHandler();
    pictureChangeOpenHandler();
    document.addEventListener('keydown', pictureChangeCloseEscHandler);
  });

  // закрытие окна редактирования по клику и снятие отслеживания клавиши еск
  pictureEffectsClose.addEventListener('click', function () {
    pictureChangeCloseHandler();
    document.removeEventListener('keydown', pictureChangeCloseEscHandler);
  });

  pictureEffectsClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEY_CODE) {
      pictureChangeCloseHandler();
      document.removeEventListener('keydown', pictureChangeCloseEscHandler);
    }
  });

  // когда фокус на хэштегах клавиша еск не сработает
  hashtag.addEventListener('focus', function () {
    document.removeEventListener('keydown', pictureChangeCloseEscHandler);
  });

  // когда фокус ушёл с хэштегов клавиша еск сработает
  hashtag.addEventListener('blur', function () {
    document.addEventListener('keydown', pictureChangeCloseEscHandler);
  });

  // когда фокус на комментах клавиша еск не сработает
  comment.addEventListener('focus', function () {
    document.removeEventListener('keydown', pictureChangeCloseEscHandler);
  });

  // когда фокус ушёл с комментов клавиша еск сработает
  comment.addEventListener('blur', function () {
    document.addEventListener('keydown', pictureChangeCloseEscHandler);
  });

  // отправка данных на сервер - успех
  var successSendHandler = function () {
    pictureChangeCloseHandler();
  };

  // отправка данных на сервер - ошибка
  var errorSendHandler = function (message) {
    pictureChangeCloseHandler();
    errorBlock.classList.remove('hidden');
    var messageBlock = document.createElement('p');
    messageBlock.textContent = message;
    errorLinks.insertAdjacentElement('beforebegin', messageBlock);
  };

  // отправка данных на сервер
  form.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(form), successSendHandler, errorSendHandler);
    evt.preventDefault();
  });

})();
