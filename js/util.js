'use strict';

//ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ

(function () {
  
  window.util = {
    
    getRandomNumber: function (min, max) {
      var randomNumber = min + Math.random() * (max + 1 - min);
      randomNumber = Math.floor(randomNumber);
      return randomNumber;
    },
    effectClear: function (preview, pin, pinLevel, hashtagText, commentText) {
      preview.style.filter = 'none';
      // убирает класс от прошлого эффекта, если он есть
      if (preview.classList.length === 2) {
        var lastClassIndex = preview.classList.length;
        var lastClassName = preview.classList.item(lastClassIndex - 1);
        preview.classList.remove(lastClassName);
        pin.style.left = '100%';
        pinLevel.style.width = '100%';
        hashtagText.value = '';
        commentText.value = '';
      }
    }
  };
  
  
  
})();