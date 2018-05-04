'use strict';

// ДОБАВЛЕНИЕ ЭФФЕКТА И УРОВНЯ ЭФФЕКТА, ИЗМЕНЕНИЕ РАЗМЕРА КАРТИНКИ В ФОРМЕ

(function () {

  var SCALE_LINE_START = 0;
  var SCALE_LINE_END = 453;
  
  var pictureEffects = document.querySelector('.img-upload__overlay');
  var pictureSizeValue = pictureEffects.querySelector('.resize__control--value');
  var pictureResize = pictureEffects.querySelector('.img-upload__resize');
  var picturePreview = pictureEffects.querySelector('.img-upload__preview');
  var scalePin = pictureEffects.querySelector('.scale__pin');
  var scaleValue = pictureEffects.querySelector('.scale__value');
  var scaleLevel = pictureEffects.querySelector('.scale__level');
  var scale = pictureEffects.querySelector('.scale');
  var effectsList = pictureEffects.querySelector('.effects__list');

  // обработчики
  var pictureResizeHandler = function (evt) {
    var target = evt.target;
    var currentSize = parseInt(pictureSizeValue.getAttribute('value'));
    if (target.getAttribute('class') === 'resize__control resize__control--minus') {
      if (currentSize > 50) {
        currentSize -= 25;
      } else if (currentSize > 25 && currentSize <= 50) {
        currentSize = 25;
      }
    } else if (target.getAttribute('class') === 'resize__control resize__control--plus') {
      if (currentSize < 75) {
        currentSize += 25;
      } else if (currentSize < 100 && currentSize >= 75) {
        currentSize = 100;
      }
    }
    pictureSizeValue.setAttribute('value', currentSize + '%');
    var styleScale = 'scale(' + currentSize / 100 + ')';
    picturePreview.style.transform = styleScale;
  };

  var effectAddHandler = function (evt) {
    picturePreview.style.filter = 'none';
    // убирает класс от прошлого эффекта, если он есть
    if (picturePreview.classList.length === 2) {
      var lastClassIndex = picturePreview.classList.length;
      var lastClassName = picturePreview.classList.item(lastClassIndex - 1);
      picturePreview.classList.remove(lastClassName);
      scalePin.style.left = SCALE_LINE_END + 'px';
      scaleLevel.style.width = '100%';
    }
    var target = evt.target; 
    if (target.tagName === 'INPUT') {
      var filterId = target.getAttribute('id');
      if (filterId !== 'effect-none') {
        scale.classList.remove('hidden');
        if (filterId === 'effect-chrome') {
          picturePreview.classList.add('effects__preview--chrome');
          picturePreview.style.filter = 'grayscale(1)';
        } else if (filterId === 'effect-sepia') {
          picturePreview.classList.add('effects__preview--sepia');
          picturePreview.style.filter = 'sepia(1)';  
        } else if (filterId === 'effect-marvin') {
          picturePreview.classList.add('effects__preview--marvin');
          picturePreview.style.filter = 'invert(100%)'; 
        } else if (filterId === 'effect-phobos') {
          picturePreview.classList.add('effects__preview--phobos');
          picturePreview.style.filter = 'blur(3px)'; 
        } else if (filterId === 'effect-heat') {
          picturePreview.classList.add('effects__preview--heat');
          picturePreview.style.filter = 'brightness(3)';
        } 
      } else {
        picturePreview.classList.add('effects__preview--none');
        scale.classList.add('hidden');
      }
    }
  };
  
  // зависимость между шириной шкалы в пх и в % на слайдере
  var proportionPin = function (dataNumber) {
    var value = Math.round(100 * dataNumber / SCALE_LINE_END);
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
      if (value >= 0 && value <= 25) {
        level = '0px';
      } else if (value > 25 && value <= 50) {
        level = '1px';
      } else if (value > 50 && value <= 75) {
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

  // изменение размера изображения
  pictureResize.addEventListener('click', pictureResizeHandler);
  
  // управление эффектами
  effectsList.addEventListener('click', function (evt){
    effectAddHandler(evt);
  });

  // перемещение слайдера
  scalePin.addEventListener('mousedown', function(evt) {
    evt.preventDefault();
    var startX = evt.clientX;

    var pinMoveHandler = function (evtMove) {
      evtMove.preventDefault();
      var shift = startX - evtMove.clientX;
      startX = evtMove.clientX;
      var pinPosition = scalePin.offsetLeft - shift;
      if (pinPosition >= SCALE_LINE_START && pinPosition <= SCALE_LINE_END) {
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
