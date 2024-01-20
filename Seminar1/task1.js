// Задание 1.
// 1. Необходимо выводить на страницу текущую ширину
// и высоту окна браузера, при изменении значений, вывод
// также должен меняться.
// 2. При закрытии страницы (вкладки), необходимо выводить
// всплывающее окно или диалоговое окно браузера и
// спросить, уверен ли пользователь, что хочет покинуть
// страницу?
// 3. Используйте объект history для управления историей
// переходов на веб-странице. Создайте кнопки "Назад" и
// "Вперед" для перемещения по истории.
 
// const height = window.screen.height; // для скрина экрана
// const width = window.screen.width; // для скрина экрана
// const height = window.innerHeight; // можно так для окна браузера
// const width = window.innerWidth; // можно так для окна браузера
const heightElement = document.querySelector(".height");
const widthElement = document.querySelector(".width");
heightElement.textContent = document.documentElement.clientHeight; // для первоначального отображения, без изменения экрана
widthElement.textContent = document.documentElement.clientWidth; //  для первоначального отображения, без изменения экрана

// heightElement.textContent = window.innerHeight;
// widthElement.textContent = window.innerWidth;
 
window.addEventListener("resize", function () {
  heightElement.textContent = document.documentElement.clientHeight;
  widthElement.textContent = document.documentElement.clientWidth;
});

// 2. При закрытии страницы (вкладки), необходимо выводить
// всплывающее окно или диалоговое окно браузера и
// спросить, уверен ли пользователь, что хочет покинуть
// страницу?
 
// window.addEventListener("beforeunload", function (event) {
//   confirm("Уверен ли пользователь, что хочет покинуть страницу?");
//   event.preventDefault();
 
//    event.returnValue = true;
// });
 
addEventListener("beforeunload", (event) => {
    localStorage.setItem('Разлогинивание', 'Правда')
    alert("Уверен ли пользователь, что хочет покинуть страницу?");
    event.preventDefault();
});

// 3. Используйте объект history для управления историей
// переходов на веб-странице. Создайте кнопки "Назад" и
// "Вперед" для перемещения по истории.
 
window.history.back();  // назад
window.history.forward();   // вперед