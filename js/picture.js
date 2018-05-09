'use strict';

// ОТРИСОВЫВАЕТ МИНИАТЮРЫ

(function () {
  // создает сэкшн для миниатюр
  var createPicturesSmallPlace = function () {
    var picturesClass = document.querySelector('.pictures');
    var place = document.createElement('section');
    place.classList.add('container', 'pictures', 'picture-small__place');
    picturesClass.appendChild(place);
    return place;
  };

  // функция для заполнения элементов по шаблону
  var fillTemplateFragment = function (pictureInfo, template) {
    var templateFragment = document.createDocumentFragment();
    for (var i = 0; i < pictureInfo.length; i++) {
      var pictureElement = template.cloneNode(true);
      pictureElement.querySelector('.picture__img').setAttribute('src', pictureInfo[i].url);
      pictureElement.querySelector('.picture__stat--likes').textContent = pictureInfo[i].likes;
      pictureElement.querySelector('.picture__stat--comments').textContent = pictureInfo[i].comments.length - 1;
      templateFragment.appendChild(pictureElement);
    }
    return templateFragment;
  };

  // функции для создания и удаления миниатюр
  window.picture = {
    makeTemplateElement: function (pictureInfo, picturePlace) {
      if (!picturePlace) {
        var picturePlace = createPicturesSmallPlace();
      }
      var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
      var pictureFragment = fillTemplateFragment(pictureInfo, pictureTemplate);
      picturePlace.appendChild(pictureFragment);
    },
    removeTemplateElement: function (picturePlace) {
      while (picturePlace.firstChild) {
        picturePlace.removeChild(picturePlace.firstChild);
      }
    }
  };

})();

