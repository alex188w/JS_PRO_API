// находим все изображения с классом item - преобразуем в массив
const slides = [...document.getElementsByClassName("item")];
const sliderDots = document.querySelector(".slider-dots");

// создаем точки навигации (классы dot) по количеству слайдов
slides.forEach(() => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    sliderDots.appendChild(dot);
});

// находим все элементы с классом "dot" (точки навигации)
const dots = document.getElementsByClassName("dot");

/* Устанавливаем стартовый индекс слайда по умолчанию: */
let slideIndex = 1;
// функция первоначального вызова слайдера 
showSlides(slideIndex);

// функция переключения по точкам навинации (по клику "отлавливаем индекс точки навигации")
sliderDots.addEventListener("click", (event) => {
    const targetDot = event.target;
    if (targetDot.classList.contains("dot")) {
        const dotIndex = [...dots].indexOf(targetDot) + 1;
        // вызываем слайдер с соответствующим индексом
        showSlides(slideIndex = dotIndex);
    }
})

/* Находим кнопки previous и next, по клику вызываем соответствующие функции */
const nextButtonEl = document.querySelector(".next");
nextButtonEl.addEventListener("click", function () {
    nextSlide();
});
const previousButtonEl = document.querySelector(".previous");
previousButtonEl.addEventListener("click", function () {
    previousSlide();
});

/* Увеличиваем индекс на 1 — показываем следующий слайд: */
function nextSlide() {
    showSlides(slideIndex += 1);
}
/* Уменьшаем индекс на 1 — показываем предыдущий слайд: */
function previousSlide() {
    showSlides(slideIndex -= 1);
}

/* Функция перелистывания: */
function showSlides(num) {
    /* Пере- присваиваиваем индексы для перелистывания по "кругу" */
    if (num > slides.length) {
        slideIndex = 1
    }
    if (num < 1) {
        slideIndex = slides.length
    }
    /* Проходим по каждому слайду в цикле forEach: */
    slides.forEach(el => {
        // скрываем все элементы
        el.style.display = "none";
    });
    /* Делаем текущий элемент блочным: */
    slides[slideIndex - 1].style.display = "block";

    // проходим по каждому элементу навигации, делаем неактивными все элементы
    [...dots].forEach(el => el.classList.remove('active'));
    /* Делаем текущий элемент навигации активным: */
    dots[slideIndex - 1].classList.add("active");
}
