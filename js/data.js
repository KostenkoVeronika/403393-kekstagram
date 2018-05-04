'use strict';

// СОЗДАЕТ ДАННЫЕ ДЛЯ ЗАПОЛНЕНИЯ ГЕЛЕРЕИ

(function () {

  var commentsArray = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

  var descriptionsArray = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

  // функция для генерации чисел из адресов картинок без повторений
  var getUrlNumbers = function (min, max) {
    var urlNumbers = [];
    var allowedNumbers = [];
    for (var i = min; i <= max; i++) {
      allowedNumbers[i] = i;
    }
    while (urlNumbers.length < max) {
      var index = window.getRandomNumber(min, max);
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
    commentsData[0] = commentsArray[window.getRandomNumber(0, 5)];
    var commentsCount = Math.round(Math.random()) + 1;
    if (commentsCount === 2) {
        commentsData[1] = commentsArray[window.getRandomNumber(0, 5)];
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
        likes: window.getRandomNumber(15, 200),
        comments: generateComments(),
        description: descriptionsArray[window.getRandomNumber(0, 5)]
      };
      usersPhotos[i] = photoInfo;
    }
    return usersPhotos;
  };
  
  window.pictureData = generateData(25);

})();

