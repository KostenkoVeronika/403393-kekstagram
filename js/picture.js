'use strict';

// ОТРИСОВЫВАЕТ МИНИАТЮРЫ

(function () {

  // функция для заполнения элементов по шаблону
  var fillTemplateFragment = function (pictureInfo, template) {
    var templateFragment = document.createDocumentFragment();
    window.pictureData = pictureInfo;
    for (var i = 0; i < pictureInfo.length; i++) {
      var pictureElement = template.cloneNode(true);
      pictureElement.querySelector('.picture__img').setAttribute('src', pictureInfo[i].url);
      pictureElement.querySelector('.picture__stat--likes').textContent = pictureInfo[i].likes;
      pictureElement.querySelector('.picture__stat--comments').textContent = pictureInfo[i].comments.length-1;
      templateFragment.appendChild(pictureElement);
    }
    return templateFragment;
  };

  // функция для создания элементов по шаблону
  window.makeTemplateElement = function (pictureInfo) {
    var picturePlace = document.querySelector('.pictures');
    var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
    var pictureFragment = fillTemplateFragment(pictureInfo, pictureTemplate);
    picturePlace.appendChild(pictureFragment);
  };

})();

