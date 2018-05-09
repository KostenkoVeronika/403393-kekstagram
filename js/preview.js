'use strict';

// ОТРИСОВЫВАЕТ БОЛЬШУЮ ПРЕВЬЮ-КАРТИНКУ

(function () {

  // функция для отображения комментариев в блоке с большой картинкой
  var fillBigPictureComments = function (dataIndex, pictureData) {
    var commentsBlock = document.querySelector('.social__comments');
    for (var i = 1; i <= pictureData[dataIndex].comments.length - 1; i++) {
      var imgSrc = 'img/avatar-' + window.util.getRandomNumber(1, 6) + '.svg';
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
  window.fillBigPicture = function (index, pictureData) {
    var pictureBigData = pictureData[index];
    var pictureBig = document.querySelector('.big-picture');
    pictureBig.classList.remove('hidden');
    pictureBig.querySelector('.big-picture__img img').setAttribute('src', pictureBigData.url);
    pictureBig.querySelector('.likes-count').textContent = pictureBigData.likes;
    pictureBig.querySelector('.comments-count').textContent = pictureBigData.comments.length - 1;
    pictureBig.querySelector('.social__caption').textContent = pictureBigData.comments[0];
    // вызов функции для отображения комментов
    fillBigPictureComments(index, pictureData);
    // спрятать блоки
    pictureBig.querySelector('.social__comment-count').classList.add('visually-hidden');
    pictureBig.querySelector('.social__comment-loadmore').classList.add('visually-hidden');
  };

})();
