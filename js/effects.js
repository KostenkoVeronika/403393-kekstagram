'use strict';

// ДОБАВЛЕНИЕ ЭФФЕКТА И УРОВНЯ ЭФФЕКТА, ИЗМЕНЕНИЕ РАЗМЕРА КАРТИНКИ В ФОРМЕ

(function () {

  var ENTER_KEY_CODE = 13;
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> c0d099e1ef2f827cfe0842c04cfbf9d4f66df8cf
  var ONE_QUARTER = 25;
  var HALF = 50;
  var THREE_QUARTERS = 75;
  var FULL = 100;
  var SIZE_STEP = 25;
<<<<<<< HEAD
=======
>>>>>>> ca31972146d0e160bd32f014446e02346d7294d9
=======
>>>>>>> c0d099e1ef2f827cfe0842c04cfbf9d4f66df8cf

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

  // обработчики
  var pictureResizeHandler = function (evt) {
    var target = evt.target;
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> c0d099e1ef2f827cfe0842c04cfbf9d4f66df8cf
    var currentSize = Number(pictureSizeValue.getAttribute('value').replace('%', ''));
    if (target.classList.contains('resize__control--minus')) {
      if (currentSize > HALF) {
        currentSize -= SIZE_STEP;
      } else if (currentSize > ONE_QUARTER && currentSize <= HALF) {
        currentSize = ONE_QUARTER;
<<<<<<< HEAD
=======
    var currentSize = parseInt(pictureSizeValue.getAttribute('value'), 10);
    if (target.getAttribute('class') === 'resize__control resize__control--minus') {
      if (currentSize > 50) {
        currentSize -= 25;
      } else if (currentSize > 25 && currentSize <= 50) {
        currentSize = 25;
>>>>>>> ca31972146d0e160bd32f014446e02346d7294d9
=======
>>>>>>> c0d099e1ef2f827cfe0842c04cfbf9d4f66df8cf
      }
    } else if (target.classList.contains('resize__control--plus')) {
      if (currentSize < THREE_QUARTERS) {
        currentSize += SIZE_STEP;
      } else if (currentSize < FULL) {
        currentSize = FULL;
      }
    }
    pictureSizeValue.setAttribute('value', currentSize + '%');
    var styleScale = 'scale(' + currentSize / 100 + ')';
    picturePreview.style.transform = styleScale;
  };

  var effectAddHandler = function (evt) {
    window.util.effectClear(picturePreview, scalePin, scaleLevel, hashtag, comment);
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> c0d099e1ef2f827cfe0842c04cfbf9d4f66df8cf
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
        effectChangeHandler(scale.offsetWidth);
<<<<<<< HEAD
=======
    var target = evt.target;
    if (target.tagName === 'INPUT') {
      var filterId = target.getAttribute('id');
      if (filterId !== 'effect-none') {
        scale.classList.remove('hidden');
        // добавление класса и максимального эффекта картинке
        var filterName = target.getAttribute('value');
        if (filterId === 'effect-' + filterName) {
          picturePreview.classList.add('effects__preview--' + filterName);
          effectChangeHandler(scale.offsetWidth);
        }
      } else {
        picturePreview.classList.add('effects__preview--none');
        scale.classList.add('hidden');
>>>>>>> ca31972146d0e160bd32f014446e02346d7294d9
=======
>>>>>>> c0d099e1ef2f827cfe0842c04cfbf9d4f66df8cf
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

  var effectChangeHandler = function (pin) {
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
      if (value >= 0 && value <= ONE_QUARTER) {
        level = '0px';
      } else if (value > ONE_QUARTER && value <= HALF) {
        level = '1px';
      } else if (value > HALF && value <= THREE_QUARTERS) {
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

  var escResizeHandler = function (evt) {
    if (evt.keyCode === ENTER_KEY_CODE) {
      pictureResizeHandler(evt);
      pictureResize.removeEventListener('keydown', escResizeHandler);
    }
  };

  // изменение размера изображения
  pictureResize.addEventListener('click', pictureResizeHandler);
  pictureResize.addEventListener('keydown', escResizeHandler);

  // управление эффектами
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> c0d099e1ef2f827cfe0842c04cfbf9d4f66df8cf
  effectsList.addEventListener('click', effectAddHandler);
  effectsList.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEY_CODE) {
      effectAddHandler(evt);
    }
<<<<<<< HEAD
=======
  effectsList.addEventListener('click', function (evt) {
    effectAddHandler(evt);
>>>>>>> ca31972146d0e160bd32f014446e02346d7294d9
=======
>>>>>>> c0d099e1ef2f827cfe0842c04cfbf9d4f66df8cf
  });

  // перемещение слайдера
  scalePin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startX = evt.clientX;

    var pinMoveHandler = function (evtMove) {
      evtMove.preventDefault();
      var shift = startX - evtMove.clientX;
      startX = evtMove.clientX;
      var pinPosition = scalePin.offsetLeft - shift;
      if (pinPosition >= 0 && pinPosition <= scaleLine.offsetWidth) {
        scalePin.style.left = pinPosition + 'px';
        scaleLevel.style.width = proportionPin(pinPosition) + '%';
      }
      var pinValue = parseInt(scalePin.style.left, 10);
      effectChangeHandler(pinValue);
    };

    var pinUpHandler = function (evtUp) {
      evtUp.preventDefault();
      var pinValue = parseInt(scalePin.style.left, 10);
      effectChangeHandler(pinValue);
      document.removeEventListener('mousemove', pinMoveHandler);
      document.removeEventListener('mouseup', pinUpHandler);
    };
    document.addEventListener('mousemove', pinMoveHandler);
    document.addEventListener('mouseup', pinUpHandler);
  });

})();

