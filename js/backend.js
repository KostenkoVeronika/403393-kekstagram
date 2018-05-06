'use strict';

// ДЛЯ РАБОТЫ С СЕРВЕРОМ

(function () {

  var formURL = 'https://js.dump.academy/kekstagram';
  var galleryURL = 'https://js.dump.academy/kekstagram/data';

  window.backend = {

    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Ошибка! Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.open('GET', galleryURL);
      xhr.send();
    },

    upload: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Что-то пошло не так!');
      });
      xhr.open('POST', formURL);
      xhr.send(data);
    }
  };

})();
