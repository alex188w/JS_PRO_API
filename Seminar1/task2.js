// Даны html и css:
// <style>
//   .box {
//     width: 100px;
//     height: 100px;
//     background-color: lightblue;
//     margin: 10px;
//     display: inline-block;
//   }
// </style>

// <button id="addButton">Добавить элемент</button>
// <button id="removeButton">Удалить элемент</button>
// <button id="cloneButton">Клонировать элемент</button>
// <div id="container">
//   <div class="box">1</div>
//   <div class="box">2</div>
//   <div class="box">3</div>
// </div>

// Необходимо создать страницу, в которой будут работать
// все три кнопки.
// - При нажатии на кнопку "Добавить элемент" на страницу 
// добавляется новый квадратный элемент (<div>) с размерами 
// 100x100 пикселей. Этот элемент должен иметь класс .box 
// и содержать текст, указывающий порядковый номер элемента
// (1, 2, 3 и так далее).
// - При нажатии на кнопку "Удалить элемент" удаляется 
// последний добавленный элемент, если таковой имеется.
// - При нажатии на кнопку "Клонировать элемент" создается 
// копия последнего добавленного элемента и добавляется на 
// страницу. Если последнего добавленного элемента нет на 
// странице, необходимо вывести сообщение в alert, с надписью
// о невозможности клонирования, так как клонировать нечего.

const containerElement = document.querySelector("#container");

const addButtonElement = document.querySelector("#addButton");
addButtonElement.addEventListener("click", function () {
    const divElement = document.createElement("div");
    divElement.classList.add("box");
    const listBox = document.querySelectorAll(".box");
    const listBoxCount = listBox.length;
    divElement.textContent = listBoxCount + 1;
    containerElement.append(divElement);
});

const removeButtonElement = document.querySelector("#removeButton");
removeButtonElement.addEventListener("click", function () {
    containerElement.lastElementChild?.remove(); // если прописать containerElement.lastChild.remove(); - будет удалять в два клика - сначала элемент узла, затем узел. ? - чтобы не было ошибки при удалении крайнего элемента
});

const cloneButtonElement = document.querySelector("#cloneButton");
cloneButtonElement.addEventListener("click", function () {
    const lastChildElement = containerElement.lastElementChild;
    if (lastChildElement) {
        containerElement.append(lastChildElement.cloneNode(true));
    } else {
        alert("Клонировать нечего!");
    }
});