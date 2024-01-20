// Задание 3.
// Необходимо создать страницу со списком статей.
// Каждая статья состоит из id, заголовка, текста статьи.
// id - будем брать из unix timestamp.
// Необходимо подготовить список статей в JSON-формате,
// которые будут выводиться на странице при первом ее
// открытии.
// Необходимо реализовать возможность удаления статьи.
// Необходимо реализовать возможность добавления статьи.
// Необходимо реализовать возможность изменения статьи,
// ввод данных можно реализовать через prompt.
// Статьи должны сохраняться в локальное хранилище
// браузера, и должны быть доступны после перезагрузки
// страницы.
// localStorage.clear();
const initialJSON = `[{"id":1702889102621,"title":"Статья 1","text":"Text 1"},{"id":1702889103318,"title":"Статья 2","text":"Text 2"}]`;

const localStorageKey = "articles";
const data = localStorage.getItem(localStorageKey);

if (!data) {
    localStorage.setItem(localStorageKey, initialJSON);
}

const articles = JSON.parse(localStorage.getItem(localStorageKey));

const articlesHtml = articles
    .map((article) => getArticleHtml(article))
    .join("");

const conteinerElement = document.querySelector(".conteiner");

conteinerElement.innerHTML = articlesHtml;

const addButtonElement = document.querySelector(".add");

addButtonElement.addEventListener("click", function () {
    const title = prompt("Введите заголовок статьи");
    const text = prompt("Введите текст статьи");
    const article = {
        id: Date.now(),
        title, // если повторяется название переменной и текст title: title - можно так
        text,
    };
    articles.push(article);
    localStorage.setItem(localStorageKey, JSON.stringify(articles));
    conteinerElement.insertAdjacentHTML("beforeend", getArticleHtml(article));
});

conteinerElement.addEventListener("click", function (event) {
    if (!event.target.classList.contains("delete")) {
        return;
    }

    const parentElement = event.target.closest(".article"); // удаление из браузера
    const id = +parentElement.dataset.id; // получаем id заметки
    const indexArticle = articles.findIndex((article) => article.id === id); // findIndex() возвращает индекс первого найденного в массиве элемента, который подходит под условие переданной функции
    articles.splice(indexArticle, 1); // удаляем с индексом indexArticle один элемнет
    localStorage.setItem(localStorageKey, JSON.stringify(articles)); // сохраняем в localStorage
    parentElement.remove(); // удаляем заметку из HTML документа
});

function getArticleHtml(article) {
    return `<br><div class="article" data-id="${article.id}">
  <div class="title">Название заметки: ${article.title}</div>
  <p class="text">Текст заметки: ${article.text}</p>
  <button class="delete">Удалить заметку</button>
  <button class="edit">Редактировать заметку</button>
  <br>
</div>`;
}