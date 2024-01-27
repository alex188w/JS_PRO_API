// после загрузки страницы запускаем функцию renderPhoto()
window.addEventListener('load', () => {
    renderPhoto();
});

// асинхронное получение данных из unsplash по ключю
async function getRandomPhoto() {
    const apiKey = 'IRYXryEtfuZt6cJlKzoGyzXb4PCOOyK558EMLo2CDhk';
    try {
        // - для провкри работы повторений - api одного изображения, т.к. случайные повторения очень редки
        // const response = await fetch(`https://api.unsplash.com/photos/star-in-space-VE5FRc7uiC4?client_id=${apiKey}`);  
        const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${apiKey}`);
        const photo = await response.json();
        return photo;
    } catch (error) {
        console.error('Ошибка при загрузке фотографий:', error);
        return {};
    }
}
// инициируем массив объектов с фотографиями
let descriptionPhotoLS = [];
// присваиваем переменной likedPhoto значение false т.е. - не лайкали сами)
let likedPhoto = false;
// вывод фотографии и информации о ней
async function renderPhoto() {
    const photo = await getRandomPhoto();
    if (photo) {
        // добавляем фото в HTML
        const imageBox = document.querySelector('.image_box');
        const img = document.createElement('img');
        img.classList.add('image');
        img.src = photo.urls.small;
        img.alt = photo.alt_description;
        imageBox.appendChild(img);

        // присваиваем значения из полученной информации
        const photoUserName = photo.user.name;
        let photoLikes = photo.likes;
        let photoId = photo.id;
        // создаем пустой объект с фотографией
        let photoLS = {};

        // Получаем данные по фотографии из localStorage
        const localStorageKey = "descriptPhoto";
        const dataLS = localStorage.getItem(localStorageKey);
        // если нет данных в localStorage записываем из полученных
        if (!dataLS) {
            photoLS = {
                photoId,
                photoUserName,
                photoLikes,
                likedPhoto,
            };
            // записываем в localStorage
            descriptionPhotoLS.push(photoLS);
            saveToLocalStorage(descriptionPhotoLS);
        };

        // получаем информацию из localStorage
        descriptionPhotoLS = JSON.parse(localStorage.getItem(localStorageKey));
        // если есть, находим информацию о текущей фотографии   
        photoLS = descriptionPhotoLS.find((photoLS) => photoLS.photoUserName === photoUserName);
        // если нет информации о текущей фотографии записываем в localStorage
        if (!photoLS) {
            photoLS = {
                photoId,
                photoUserName,
                photoLikes,
                likedPhoto,
            };
            descriptionPhotoLS.push(photoLS);
            // записываем в localStorage
            saveToLocalStorage(descriptionPhotoLS);
        };
        // если информация о текущей фотографии есть в localStorage присваиваиваем значения
        photoLikes = photoLS.photoLikes;
        // console.log(photoLikes);
        likedPhoto = photoLS.likedPhoto;
        // console.log(likedPhoto);

        // вставляем в HTML присвоенные значения
        const imagePhotographerNameDiv = document.querySelector('.image_photographer-name');
        imagePhotographerNameDiv.textContent = `${photoUserName}`;
        const imageLikesCounterSpan = document.querySelector('.image_likes-counter');
        imageLikesCounterSpan.textContent = `${photoLikes}`;
        addTextLike();

        // находим индекс оббъекта photoLS в descriptionPhotoLS для обновления информации (по имени фотографа, т.к. повторения фотографий случаются редко)
        const indexphotoLS = descriptionPhotoLS.findIndex((photoLS) => photoLS.photoUserName === photoUserName);

        // по клику добавляем значение в счетчик "кликов" и текст "You liked this!!!"
        const counterButton = document.querySelector('.like-review');
        counterButton.addEventListener('click', function () {
            const likesCounter = document.querySelector('.image_likes-counter');
            photoLikes++;
            likesCounter.textContent = photoLikes;
            likedPhoto = true;
            // создаем объект photoLS с новыми значениями
            photoLS = {
                photoId,
                photoUserName,
                photoLikes,
                likedPhoto,
            };
            // обновляем информацию об объекте photoLS в descriptionPhotoLS по найденному индексу
            removeToDescriptionPhotoLS(indexphotoLS, photoLS);
            addTextLike();
            // сохраняем в LocalStorage
            saveToLocalStorage(descriptionPhotoLS);
        });
        console.log(descriptionPhotoLS); // для проверки       
    }
};

// если на данную фотографию мы поставили лайк - выводим сообщение
function addTextLike() {
    if (likedPhoto) {
        const likeText = document.querySelector('.image-like');
        likeText.textContent = `You liked this!!!`;
    };
};

// обновляем информации о фотографии в descriptionPhotoLS
function removeToDescriptionPhotoLS(indexphotoLS, photoLS) {
    descriptionPhotoLS.splice(indexphotoLS, 1, photoLS);
    console.log(descriptionPhotoLS);
};

// сохраняем данные в LocalStorage
function saveToLocalStorage(descriptPhotoLS) {
    localStorage.setItem('descriptPhoto', JSON.stringify(descriptPhotoLS));
};

