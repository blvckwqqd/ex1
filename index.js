"use strict";
//let counter = 0;
const todo = [
  //   { text: "Пообедать", done: true, color: "yellow" },
  //   { text: "Сделать практику", done: false },
];
let selectedItem;

const render = () => {
  let list = document.getElementsByClassName("todo-list")[0];
  let dataIndex = 0;
  list.innerHTML = "";
  for (let item of todo) {
    let li = document.createElement("li");
    li.textContent = item.text;
    li.style.backgroundColor = item.color != undefined ? item.color : "";
    li.className = "todo-list item";
    li.setAttribute("data-index", dataIndex++);

    let input = document.createElement("input");
    input.type = "checkbox";
    input.className = "todo-list item check";
    input.onchange = (e) => {
      if (input.checked) {
      }
    };
    li.append(input);
    list.append(li);
  }
  // Обработчик нажатия по списку
  list.onclick = function (e) {
    let target = e.target;
    if (target.tagName != "LI") return;
    setActive(target);
  };
};

// Удалить элемент
const deleteTodo = () => {
  if(selectedItem) todo.splice(selectedItem.dataset.index,1);
  else todo.pop;
  render();
};

// Добавить элемент
const addTodo = () => {
  let text = window.prompt("Что хотите сделать?", "");
  if (!text) return;
  //let color = window.prompt("Какой цвет", "");
  let elem = { text: text, done: false };
  if(selectedItem) todo.splice(parseInt(selectedItem.dataset.index)+1,0,elem);
  else todo.push(elem);

  render();
};

// Поднять элемент
const moveUpTodo = () =>{

}

// Опустить элемент
const moveDownTodo = () =>{

}
// Сделать элемент активным
function setActive(li) {
  if (selectedItem) {
    selectedItem.classList.remove("active");
  }
  selectedItem = li;
  selectedItem.classList.add("active");
  //console.log(selectedItem);
}
