'use strict';

// ДОБАВЛЕНИЕ ЭФФЕКТА И УРОВНЯ ЭФФЕКТА, ИЗМЕНЕНИЕ РАЗМЕРА КАРТИНКИ В ФОРМЕ

(function () {

  var ENTER_KEY_CODE = 13;
  var ZOOM_MAX = 100;
  var ZOOM_MIN = 25;
  var ZOOM_STEP = 25;
  var PHOBOS_STEP = 25;

  var pictureEffects = document.querySelector('.img-upload__overlay');
  var pictureSizeValue = pictureEffects.querySelector('.resize__control--value');
  var pictureResize = pictureEffects.querySelector('.img-upload__resize');
  var picturePreview = pictureEffects.querySelector('.img-upload__preview');
  var scalePin = pictureEffects.querySelector('.scale__pin');
  var scaleLevel = pictureEffects.querySelector('.scale__level');
  var scale = pictureEffects.querySelector('.scale');
  var effectsList = pictureEffects.querySelector('.effects__list');
  var form = document.querySelector('.img-upload__form');
  var hashtag = form.querySelector('.text__hashtags');
  var comment = form.querySelector('.text__description');
  var scaleLine = pictureEffects.querySelector('.scale__line');

  var resizePicture = function (size) {
    pictureSizeValue.setAttribute('value', size + '%');
    var styleScale = 'scale(' + size / 100 + ')';
    picturePreview.style.transform = styleScale;
  };

  var onResizeClick = function (evt) {
    var target = evt.target;
    var currentSize = Number(pictureSizeValue.getAttribute('value').replace('%', ''));
    var isMinus = target.classList.contains('resize__control--minus');
    var isPlus = target.classList.contains('resize__control--plus');
    if (isMinus) {
      currentSize = Math.max(currentSize - ZOOM_STEP, ZOOM_MIN);
    } else if (isPlus) {
      currentSize = Math.min(currentSize + ZOOM_STEP, ZOOM_MAX);
    }
    resizePicture(currentSize);
  };

  var onEffectClick = function (evt) {
    window.util.effectClear(picturePreview, scalePin, scaleLevel, hashtag, comment);
    var filterId;
    var filterName;
    var target = evt.target;
    if (target.tagName === 'LI') {
      filterId = target.children[0].getAttribute('id');
      filterName = target.children[0].getAttribute('value');
    } else if (target.tagName === 'INPUT') {
      filterId = target.getAttribute('id');
      filterName = target.getAttribute('value');
    }
    if (filterId !== 'effect-none') {
      scale.classList.remove('hidden');
      // добавление класса и максимального эффекта картинке
      if (filterId === 'effect-' + filterName) {
        picturePreview.classList.add('effects__preview--' + filterName);
        changeEffect(scale.offsetWidth);
      }
    } else {
      picturePreview.classList.add('effects__preview--none');
      scale.classList.add('hidden');
    }
  };

  // зависимость между шириной шкалы в пх и в % на слайдере
  var proportionPin = function (dataNumber) {
    var value = Math.round(100 * dataNumber / scaleLine.offsetWidth);
    return value;
  };

  var changeEffect = function (pin) {
    var effectClassName = picturePreview.classList.item(picturePreview.classList.length - 1);
    var value = proportionPin(pin);
    var level;
    if (effectClassName === 'effects__preview--chrome') {
      level = value / 100;
      picturePreview.style.filter = 'grayscale(' + level + ')';
    } else if (effectClassName === 'effects__preview--sepia') {
      level = value / 100;
      picturePreview.style.filter = 'sepia(' + level + ')';
    } else if (effectClassName === 'effects__preview--marvin') {
      picturePreview.style.filter = 'invert(' + value + '%)';
    } else if (effectClassName === 'effects__preview--phobos') {
      if (value >= 0 && value <= PHOBOS_STEP) {
        level = '0px';
      } else if (value > PHOBOS_STEP && value <= 2 * PHOBOS_STEP) {
        level = '1px';
      } else if (value > 2 * PHOBOS_STEP && value <= 3 * PHOBOS_STEP) {
        level = '2px';
      } else {
        level = '3px';
      }
      picturePreview.style.filter = 'blur(' + level + ')';
    } else if (effectClassName === 'effects__preview--heat') {
      level = 1 + value / 50;
      picturePreview.style.filter = 'brightness(' + level + ')';
    }
  };

  var onResizeEsc = function (evt) {
    if (evt.keyCode === ENTER_KEY_CODE) {
      onResizeClick(evt);
      pictureResize.removeEventListener('keydown', onResizeEsc);
    }
  };

  // изменение размера изображения
  pictureResize.addEventListener('click', onResizeClick);
  pictureResize.addEventListener('keydown', onResizeEsc);

  // управление эффектами
  effectsList.addEventListener('click', onEffectClick);
  effectsList.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEY_CODE) {
      onEffectClick(evt);
    }
  });

  // перемещение слайдера
  scalePin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startX = evt.clientX;

    var onPinMove = function (evtMove) {
      evtMove.preventDefault();
      var shift = startX - evtMove.clientX;
      startX = evtMove.clientX;
      var pinPosition = scalePin.offsetLeft - shift;
      if (pinPosition >= 0 && pinPosition <= scaleLine.offsetWidth) {
        scalePin.style.left = pinPosition + 'px';
        scaleLevel.style.width = proportionPin(pinPosition) + '%';
      }
      var pinValue = parseInt(scalePin.style.left, 10);
      changeEffect(pinValue);
    };

    var onPinUp = function (evtUp) {
      evtUp.preventDefault();
      var pinValue = parseInt(scalePin.style.left, 10);
      changeEffect(pinValue);
      document.removeEventListener('mousemove', onPinMove);
      document.removeEventListener('mouseup', onPinUp);
    };
    document.addEventListener('mousemove', onPinMove);
    document.addEventListener('mouseup', onPinUp);
  });

})();

