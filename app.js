let filterValue ="all";

const todoInput = document.querySelector(".todo-input");
const todoForm = document.querySelector(".form-todo");
const todoList = document.querySelector(".todolist");
const selecetdFilter = document.querySelector(".filter-todo");

document.addEventListener("DOMContentLoaded", () =>{
  const todos = getAllTodos();
  creatTodos(todos);
})

todoForm.addEventListener("submit", addNewTodo);
selecetdFilter.addEventListener("change", (e)=>{
    filterValue = e.target.value;
    filterTodo();
});


function addNewTodo(e){
    e.preventDefault();
    
    if(!todoInput.value) return null ;
    
    const newTodo = {
        id : Date.now(),
        creatAt : new Date().toISOString(),
        title : todoInput.value,
        isCompleted : false,
    };
    
    // todos.push(newTodo);
    saveTodo(newTodo);
    filterTodo();

}

function creatTodos(todos){
    let domTodo ="";
    todos.forEach((todo) =>{
        domTodo +=`
        <li class="todo">
        <p class="todo__title ${todo.isCompleted ? "completed" : ""} ">${todo.title}</p>
        <span class="todo__craetedAt">${new Date(todo.creatAt).toLocaleDateString("fa-IR")}</span>
        <button class="todo__check" data-todo-id="${todo.id}"><i class="far fa-check-square"></i></button>
        <button class="todo__remove" data-todo-id="${todo.id}"><i class="far fa-trash-alt"></i></button>
        </li>`
    });
    todoList.innerHTML = domTodo; 
    todoInput.value = "";

    const removeBtn =[...document.querySelectorAll(".todo__remove")];
    const checkBtn =[...document.querySelectorAll(".todo__check")];
    
    removeBtn.forEach( btn => btn.addEventListener("click" , removeTodo))
    checkBtn.forEach( btn => btn.addEventListener("click" , checkTodo))

}

function filterTodo(){ 
    let todos = getAllTodos();

    switch (filterValue){
        case "all" :{
            creatTodos(todos)
            break;
        }
        case "completed" :{
            const filteredTodos = todos.filter(t => t.isCompleted)
            creatTodos(filteredTodos)
            break;
        }        
        case "uncompleted" :{
            const filteredTodos = todos.filter(t => !t.isCompleted)
            creatTodos(filteredTodos)
            break;
        }
        default : creatTodos(todos);
        
    }
}
function removeTodo(e){
    let todos = getAllTodos();
    const todoId =Number(e.target.dataset.todoId);
    todos = todos.filter(todo => todo.id !== todoId );
    saveAllTodos(todos);
    filterTodo();
    
    
}
function checkTodo(e){
    let todos = getAllTodos();
    const todoId =Number(e.target.dataset.todoId);
    const todo = todos.find( t => t.id === todoId);
    todo.isCompleted = !todo.isCompleted;
    saveAllTodos(todos);
    filterTodo();
}


function getAllTodos(){
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    return savedTodos
}
function saveTodo(todo){
    const savedTodos = getAllTodos();
    savedTodos.push(todo);
    localStorage.setItem("todos",JSON.stringify(savedTodos));
    return savedTodos ;
}
function saveAllTodos(todos){
    localStorage.setItem("todos",JSON.stringify(todos));
}