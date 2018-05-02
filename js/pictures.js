'use strict';

var ESC_KEY_CODE = 27;
var SCALE_LINE_START = 0;
var SCALE_LINE_END = 453;

var commentsArray = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var descriptionsArray = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

// функция для генерации случайного числа
var getRandomNumber = function (min, max) {
  var randomNumber = min + Math.random() * (max + 1 - min);
  randomNumber = Math.floor(randomNumber);
  return randomNumber;
};

// функция для генерации чисел из адресов картинок без повторений
var getUrlNumbers = function (min, max) {
  var urlNumbers = [];
  var allowedNumbers = [];
  for (var i = min; i <= max; i++) {
    allowedNumbers[i] = i;
  }
  while (urlNumbers.length < max) {
    var index = getRandomNumber(min, max);
    var number = allowedNumbers[index];
    if (number !== null) {
      urlNumbers.push(number);
      allowedNumbers[index] = null;
    }
  }
  return urlNumbers;
};

// функция для генерации комментариев
var generateComments = function () {
  var commentsData = [];
  commentsData[0] = commentsArray[getRandomNumber(0, 5)];
  var commentsCount = Math.round(Math.random()) + 1;
  if (commentsCount === 2) {
      commentsData[1] = commentsArray[getRandomNumber(0, 5)];
  }
  return commentsData;
};


// функция для генерации массива с объектами с инфой для фоток
var generateData = function (count) {
  var usersPhotos = [];
  var urlNumbers = getUrlNumbers(1, 25);
  for (var i = 0; i < count; i++) {
    var photoInfo = {
      url: 'photos/' + urlNumbers[i] + '.jpg',
      likes: getRandomNumber(15, 200),
      comments: generateComments(),
      description: descriptionsArray[getRandomNumber(0, 5)]
    };
    usersPhotos[i] = photoInfo;
  }
  return usersPhotos;
};

// функция для заполнения элементов по шаблону
var fillTemplateFragment = function (pictureInfo, template) {
  var templateFragment = document.createDocumentFragment();
  for (var i = 0; i < pictureInfo.length; i++) {
    var pictureElement = template.cloneNode(true);
    pictureElement.querySelector('.picture__img').setAttribute('src', pictureInfo[i].url);
    pictureElement.querySelector('.picture__stat--likes').textContent = pictureInfo[i].likes;
    pictureElement.querySelector('.picture__stat--comments').textContent = pictureInfo[i].comments.length;
    templateFragment.appendChild(pictureElement);
  }
  return templateFragment;
};

// функция для создания элементов по шаблону
var makeTemplateElement = function (pictureInfo) {
  var picturePlace = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
  var pictureFragment = fillTemplateFragment(pictureInfo, pictureTemplate);
  picturePlace.appendChild(pictureFragment);
};

// функция для отображения комментариев в блоке с большой картинкой
var fillBigPictureComments = function (dataIndex) {
  var commentsBlock = document.querySelector('.social__comments');
  for (var i = 0; i < pictureData[dataIndex].comments.length; i++) {
    var imgSrc = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
    var liElement = document.createElement('li');
    liElement.classList.add('social__comment');
    liElement.classList.add('social__comment--text');
    liElement.textContent = pictureData[dataIndex].comments[i];
    commentsBlock.appendChild(liElement);
    liElement.insertAdjacentHTML('afterbegin', '<img>');
    var imgElement = liElement.querySelector('img');
    imgElement.className = 'social__picture';
    imgElement.setAttribute('src', imgSrc);
    imgElement.setAttribute('alt', 'Аватар комментатора фотографии');
    imgElement.setAttribute('width', '35');
    imgElement.setAttribute('height', '35');
  }
};

// функция для отображения большой картинки и заполнения её данных
var fillBigPicture = function (index) {
  var pictureBigData = pictureData[index];
  var pictureBig = document.querySelector('.big-picture');
  pictureBig.classList.remove('hidden');
  pictureBig.querySelector('.big-picture__img img').setAttribute('src', pictureBigData.url);
  pictureBig.querySelector('.likes-count').textContent = pictureBigData.likes;
  pictureBig.querySelector('.comments-count').textContent = pictureBigData.comments.length;
  pictureBig.querySelector('.social__caption').textContent = pictureBigData.description;
  // вызов функции для отображения комментов
  fillBigPictureComments(index);
  // спрятать блоки
  pictureBig.querySelector('.social__comment-count').classList.add('visually-hidden');
  pictureBig.querySelector('.social__comment-loadmore').classList.add('visually-hidden');
};

// вызовы для отображения маленьких картинок
var pictureData = generateData(25);
makeTemplateElement(pictureData);

// ТЗ - ЗАГРУЗКА ИЗОБРАЖЕНИЯ

var pictureEffects = document.querySelector('.img-upload__overlay');
var pictureUpload = document.querySelector('#upload-file');
var pictureEffectsClose = pictureEffects.querySelector('#upload-cancel');
var pictureEffectsFirstInput = pictureEffects.querySelector('.effects__radio');

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
  // установлено пустое значение. Но одну и ту же картинку можно выбрать только при клике на крестик. При нажатии на еск почему-то не срабатывает. До того, как добавила эту строчку с обнулением value, работало все точно так же.
  pictureUpload.setAttribute('value', '');
  pictureEffects.classList.add('hidden');
};

var pictureChangeCloseEscHandler = function (evt) {
  if (evt.keyCode === ESC_KEY_CODE) {
    pictureChangeCloseHandler();
    // не отслеживать больше еск
    document.removeEventListener('keydown', pictureChangeCloseEscHandler);
  }
};

// загрузка картинки и появление окна редактирования и закрытие по клавише еск
pictureUpload.addEventListener('change', function () {
  pictureChangeOpenHandler();
  document.addEventListener('keydown', pictureChangeCloseEscHandler);
});
// закрытие окна редактирования по клику и снятие отслеживания клавиши еск
pictureEffectsClose.addEventListener('click', function () {
  pictureChangeCloseHandler();
  document.removeEventListener('keydown', pictureChangeCloseEscHandler);
});

// ТЗ - РЕДАКТИРОВАНИЕ ИЗОБРАЖЕНИЯ

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

// ТЗ - ПЕРЕМЕЩЕНИЕ СЛАЙДЕРА

// зависимость между шириной шкалы в пх и в %
var proportionPin = function (dataNumber) {
  var value = Math.round(100 * dataNumber / SCALE_LINE_END);
  return value;
};

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

// ТЗ - ПОКАЗ ИЗОБРАЖЕНИЯ В ПОЛНОЭКРАННОМ РЕЖИМЕ

var pictureSmallPlace = document.querySelector('.pictures');
var pictureBig = document.querySelector('.big-picture');
var pictureBigCancel = pictureBig.querySelector('.big-picture__cancel');
var pictureBigCommentsPlace = pictureBig.querySelector('.social__comments');

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
    for (var i = 0; i < pictureData.length; i++) {
      if (pictureData[i].url === src) {
        // чистит прошлые комменты
        while (pictureBigCommentsPlace.firstChild) {
          pictureBigCommentsPlace.removeChild(pictureBigCommentsPlace.firstChild);
        }
        fillBigPicture(i);
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

// ТЗ - ВАЛИДАЦИЯ

var form = document.querySelector('.img-upload__form');
var hashtag = form.querySelector('.text__hashtags');
var formSubmit = form.querySelector('#upload-submit');
var comment = form.querySelector('.text__description');

// обработчики
var hashtagValidateHandler = function (evt) {
  var hashtagValue = hashtag.value;
  var hashtagArray = hashtagValue.split(' ');
  var sameHashtag = false;
  var hashtagError = 'Вы неправильно ввели данные! ';
  for (var i = 0; i < hashtagArray.length; i++) {
    var hashtagItem = hashtagArray[i];
    var firstSymbol = hashtagItem.charAt(0);
    var itemLength = hashtagItem.length;
    var doubleHashtag = false;
    var sameCount = 0;
    // проверка пробелов (встречается ли в хэштеге еще одна решетка)
    for (var j = 1; j < hashtagItem.length; j++) {
      if (hashtagItem.charAt(j) === '#') {
        doubleHashtag = true;
      }
    }
    // проверка на повторяющиеся хештеги
    if (sameHashtag === false) {
      for (var k = 0; k < hashtagArray.length; k++) {
        if (hashtagItem.toLowerCase() === hashtagArray[k].toLowerCase()) {
          sameCount += 1;
        }
        if (sameCount >= 2) {
          sameHashtag = true;
        }
      }
    }
    // формирует сообщение об ошибках
    if (hashtagItem !== '') {
      if (firstSymbol !== '#') {
        hashtagError = checkSameError(hashtagError, 'Хэш-тег должен начинаться с символа #. ');
      }
      if (hashtagItem === '#') {
        hashtagError = checkSameError(hashtagError, 'Хэш-тег не может состоять только из символа #. ');
      }
      if (itemLength > 20) {
        hashtagError = checkSameError(hashtagError, 'Длина одного хэш-тега не должна превышать 20 символов. ');
      } 
      if (doubleHashtag) {
        hashtagError = checkSameError(hashtagError, 'Хэш-теги должны разделяться пробелами. ');
      }
      if (hashtagArray.length > 5) {
        hashtagError = checkSameError(hashtagError, 'Хэш-тегов не может быть больше 5 штук. ');
      }
      if (sameHashtag) {
        hashtagError = checkSameError(hashtagError, 'Хэш-теги не должны повторяться. ');
      }  
    }
  }
  // выводит сообщение об ошибках
  if (hashtagError !== 'Вы неправильно ввели данные! ') {
    hashtag.setCustomValidity(hashtagError);
    hashtag.classList.add('description-invalid');
  } else {
    hashtag.setCustomValidity('');
    hashtag.classList.remove('description-invalid');
  }
};

// проверяет, чтобы сообщения об ошибках в хэштегах не повторялись
var checkSameError = function (errorAll, errorMessage) {
  if (errorAll.indexOf(errorMessage) === -1) {
    errorAll += errorMessage;
  }
  return errorAll;
};

var commentValidateHandler = function (evt) {
  if (comment.validity.tooLong) {
    comment.setCustomValidity('Комментрий не должен быть длиннее 140 символов.');
    comment.classList.add('description-invalid');
  } else {
    comment.setCustomValidity('');
    comment.classList.remove('description-invalid');
  }
};

// при клике на сабмит валидирует хэштеги и комментарий
formSubmit.addEventListener('click', function (evt) {
  hashtagValidateHandler(evt);
  comment.addEventListener('invalid', function (evt) {
    commentValidateHandler(evt);
  })
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

