'use strict';

// ГЕНЕРИРУЕТ СЛУЧАЙНОЕ ЧИСЛО

(function () {

  window.getRandomNumber = function (min, max) {
    var randomNumber = min + Math.random() * (max + 1 - min);
    randomNumber = Math.floor(randomNumber);
    return randomNumber;
  };
  
})();