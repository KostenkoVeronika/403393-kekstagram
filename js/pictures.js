'use strict';

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

// вызовы
var pictureData = generateData(25);
makeTemplateElement(pictureData);
fillBigPicture(0);


