'use strict';

// ВАЛИДАЦИЯ

(function () {

  var form = document.querySelector('.img-upload__form');
  var hashtag = form.querySelector('.text__hashtags');
  var formSubmit = form.querySelector('#upload-submit');
  var comment = form.querySelector('.text__description');

  // обработчики
  var onHashtagValidate = function () {
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
      hashtag.style.border = '2px solid rgb(255, 0, 0)';
    } else {
      hashtag.setCustomValidity('');
      hashtag.style.border = 'none';
    }
  };

  // проверяет, чтобы сообщения об ошибках в хэштегах не повторялись
  var checkSameError = function (errorAll, errorMessage) {
    errorAll = errorAll.indexOf(errorMessage) === -1 ? errorAll + errorMessage : errorAll + '';
    return errorAll;
  };

  var onCommentValidate = function () {
    if (comment.validity.tooLong) {
      comment.setCustomValidity('Комментрий не должен быть длиннее 140 символов.');
      hashtag.style.border = '2px solid rgb(255, 0, 0)';
    } else {
      comment.setCustomValidity('');
      hashtag.style.border = 'none';
    }
  };

  // при клике на сабмит валидирует хэштеги и комментарий
  formSubmit.addEventListener('click', function (evt) {
    onHashtagValidate(evt);
    comment.addEventListener('invalid', onCommentValidate);
  });

})();
