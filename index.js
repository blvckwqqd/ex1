"use strict";
//let counter = 0;
const todo = [
  { text: "Пообедать", done: true, color: "yellow" },
  { text: "Сделать практику", done: false },
];


const addTodo = () => {
  let text = window.prompt("Что хотите сделать?", "");
  //let color = window.prompt("Какой цвет", "");
  todo.push({text: text, done:false});
  render()
};


const render = () => {
    let list = document.getElementsByClassName("todo-list")[0];
    list.innerHTML = '';
    todo.forEach((item) =>{
        let li = document.createElement("li");
        //console.log(item);
        li.textContent = item.text;
        li.style.backgroundColor = item.color != undefined ? item.color : "";
        li.className = "todo-list item";
        list.append(li);
    })
}
const deleteTodo = () =>{
    let text = window.prompt("Кого удалить?", "");
    for(let item of todo){
        //console.log(item);
        if(item.text == text.toString()){
            todo.splice(todo.indexOf(item),1);
            console.log(todo);
            break;
        }
    }
    render();
}







const addItem = () => {
    let inputText = document.querySelector(".todo-input");
    let list = document.querySelector(".todo-list");
    let item = document.createElement("li");
    item.className = "todo-list item";
    //item.id = "item"+counter;
    item.textContent = inputText.value;
    list.append(item);
    inputText.value = "";
  };