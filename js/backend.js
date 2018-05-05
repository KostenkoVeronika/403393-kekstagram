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
          console.log('load ok');
        } else {
          onError('err1');
        }  
      });

      xhr.addEventListener('error', function () {
        onError('err2');
      });

  //    xhr.addEventListener('timeout', function () {
  //      onError('err3');
  //    });
  //    
  //    xhr.timeout = 10000;

      xhr.open('GET', galleryURL);
      xhr.send();
    },
    upload: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        onLoad(xhr.response);
      });

      xhr.open('POST', formURL);
      xhr.send(data);
    }
  };

})();