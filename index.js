"use strict";
//let counter = 0;
let todo = [];
let selectedItem;
let selectedItemIndex = selectedItem?.dataset?.index;

window.onload = () => {
    todo = JSON.parse(window.localStorage.getItem('todo'));
    render();
}



const render = () => {
    let list = document.getElementsByClassName("Todo-list")[0];
    let dataIndex = 0;

    //console.log(selectedItemIndex);
    list.replaceChildren();

    for (let item of todo) {
        //Создание li
        let li = document.createElement("li");
        li.textContent = item.text;
        li.style.backgroundColor = item.color != undefined ? item.color : "";
        li.className = "Todo-list item";
        li.setAttribute("data-index", dataIndex);
        // Создание checkbox
        let input = document.createElement("input");
        input.type = "checkbox";
        input.className = "Todo-list item check";
        input.checked = item.done;

        li.append(input);
        list.append(li);

        //Задание активного элемента при перерендере
        if (selectedItem) {
            if (parseInt(selectedItemIndex) == dataIndex) setActive(li);
        }
        dataIndex++;
    }

    // Обработчик нажатия по списку
    list.onclick = function (e) {
        let target = e.target;

        if(target.tagName == 'INPUT'){
            let item = target.closest('li');
            todo[parseInt(item.dataset.index)]['done'] = target.checked;
            saveToStorage();
        }else if(target.tagName == 'LI'){
            setActive(target);
        }else{
            return;
        }    
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

    let index = parseInt(selectedItem.dataset.index);
    let temp = todo[index - 1];

    todo[index - 1] = todo[index];
    todo[index] = temp;
    selectedItemIndex = index - 1;

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
    let index = parseInt(selectedItem.dataset.index);
    let temp = todo[index + 1];

    todo[index + 1] = todo[index];
    todo[index] = temp;
    //selectedItemIndex++;
    selectedItemIndex = index + 1;

    saveToStorage();
    render();
};


// Изменить элемент
const editTodo = () => {
    if (!selectedItem) return;

    let div = document.getElementsByClassName('Input-props')[0];
    div.style.display = 'flex';

    let buttonChange = document.getElementsByClassName('Button props')[0];

    buttonChange.onclick = () => {
        let inputName = document.getElementsByClassName('Input name')[0];
        let inputColor = document.getElementsByClassName('Input color')[0];

        if (!inputName) return;

        let index = parseInt(selectedItem.dataset.index);

        todo[index].text = inputName.value != "" ? inputName.value : todo[index].text;
        todo[index].color = inputColor.value;


        div.style.display = 'none';
        inputName.value = '';
        inputColor.value = '';

        saveToStorage();
        render();
    }

    let buttonCancel = document.getElementsByClassName('Button props')[1];

    buttonCancel.onclick = () => {
        div.style.display = 'none';
        return;
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


// Сохранить ToDo в LocalStorage
function saveToStorage() {
    window.localStorage.setItem('todo', JSON.stringify(todo))
}


