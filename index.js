"use strict";
//let counter = 0;
let todo = [];
let selectedItem;

window.onload = () => {
    todo = JSON.parse(window.localStorage.getItem('todo'));
    render();
}

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
        input.checked = item.done;
        input.onchange = (e) => {
            item.done = input.checked;
            console.log(item);
            saveToStorage();
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
    if (selectedItem) todo.splice(selectedItem.dataset.index, 1);
    else todo.pop;
    saveToStorage();
    render();
};

// Добавить элемент
const addTodo = () => {
    let text = window.prompt("Что хотите сделать?", "");
    if (!text) return;
    //let color = window.prompt("Какой цвет", "");
    let elem = { text: text, done: false };
    if (selectedItem)
        todo.splice(parseInt(selectedItem.dataset.index) + 1, 0, elem);
    else todo.push(elem);
    saveToStorage();
    render();
};

// Поднять элемент
const moveUpTodo = () => {
    if (!selectedItem) return;
    if (0 == selectedItem.dataset.index) {
        alert("Куда выше то?");
        return;
    }
    let temp = todo[parseInt(selectedItem.dataset.index) - 1];
    todo[parseInt(selectedItem.dataset.index) - 1] =
        todo[selectedItem.dataset.index];
    todo[selectedItem.dataset.index] = temp;
    saveToStorage();
    render();
};

// Опустить элемент
const moveDownTodo = () => {
    if (!selectedItem) return;
    if (todo.length - 1 == selectedItem.dataset.index) {
        alert("Куда ниже то?");
        return;
    }
    let temp = todo[parseInt(selectedItem.dataset.index) + 1];
    todo[parseInt(selectedItem.dataset.index) + 1] =
        todo[selectedItem.dataset.index];
    todo[selectedItem.dataset.index] = temp;
    saveToStorage();
    render();
};
// Изменить элемент
const editTodo = () => {
    if(!selectedItem) return;
    let div = document.getElementsByClassName('input-props')[0];
    div.removeAttribute('hidden');
    let button = document.getElementsByClassName('props-change')[0];
    button.onclick = () => {
        let inputName = document.getElementsByClassName('input-name')[0];
        let inputColor = document.getElementsByClassName('input-color')[0];
        if(!inputName) return;
        todo[selectedItem.dataset.index].text = inputName.value;
        todo[selectedItem.dataset.index].color = inputColor.value;
        saveToStorage();
        div.setAttribute('hidden','');
        render();
    }
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
// Сохранить в ToDo в LocalStorage
function saveToStorage() {
    window.localStorage.setItem('todo', JSON.stringify(todo))
}
