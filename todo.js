// Tüm elementleri seçme

const form = document.querySelector("#todo-form");
const todoInput= document.querySelector("#todo");
const todoList= document.querySelector(".list-group");
const firstcardbody= document.querySelectorAll(".card-body")[0];
const secondcardbody= document.querySelectorAll(".card-body")[1];
const filter =document.querySelector("#filter");
const clearbutton =document.querySelector("#clear-todos");


eventListeners();

function eventListeners(){//Tüm elementleri siler
    form.addEventListener("submit",addToo);
    document.addEventListener("DOMContentLoaded",loadAllToUI);
    secondcardbody.addEventListener("click",deleteTodo);
    clearbutton.addEventListener("click",clearAllTodos);
}

function clearAllTodos(e){
    //Arayüzden todoları temizleme

    if(confirm("Tümünü silmek istediğinizden emin misiniz ?")){
     //   todoList.innerHTML = "";//yavaş

    while(todoList.removeChild(todoList.firstElementChild)) {
       todoList.removeChild(todoList.firstElementChild);
    }

    localStorage.remove("todos");
    }
}


function deleteTodo(e){
  if(e.target.className ==='fa fa-remove'){
     e.target.parentElement.parentElement.remove();
  //   deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
     showAlert("success","Todo başarıyla silindi"); 
  }
}

function deleteTodoFromStorage(deleteTodo){
let todos = getTodosFromStorage();
todos.forEach(function (todo,index){

    if(todo === deleteTodo){
     todos.splice(index,1);// arrayden silebilirsiniz

    }
});

localStorage.setItem("todo",JSON.stringify(todos));
}

function loadAllToUI(){  // sayfa yenilenice listedeki elemanlar kaybolmuyor

    let todos = getTodosFromStorage();
    todos.forEach(function(todo) {  //her bir değerin üzerinde geziniyor
        addTooToUI(todo);
    })
}

function addToo(e){

const newTodo = todoInput.value.trim();
if (newTodo === ""){
    /* <div class="alert alert-danger" role="alert">
    This is a danger alert—check it out!
  </div>  */
  showAlert("danger","lütfen bir todo giriniz");
}

else {
    addTooToUI(newTodo);
    addTodoStorage(newTodo);
    showAlert("success","Basarı ile eklendi")
}



//console.log(newTodo);


addTooToUI(newTodo);


 e.preventDefault();


}

 function getTodosFromStorage(){   // Storagedan Todolara döndürüyor
    let todos;

    if(localStorage.getItem("todos") === null){

       todos = [];
    }

    else {

       todos = JSON.parse(localStorage.getItem("todos"));   // String olarak çeviriyor
    }

    return todos;
 }

 function eventListeners(){
     form.addEventListener("submit",addToo);
     document.addEventListener("DOMContentLoaded",loadAllToUI); 
 }

 function addTodoStorage(newTodo){
     let todos = getTodosFromStorage();  // Todomuzu aldık
     todos.push(newTodo);
     localStorage.setItem("todos",JSON.stringify(todos)); // Araylar, string hale çevirme
 

 }
function showAlert(type,message){

    const alert = document.createElement("div");
    alert.className = 'alert alert-${type}';
   // console.log(alert);

   alert.textContent=message;
   firstcardbody.appendChild(alert);

   //settTimeout
   setTimeout(function(){

alert.remove();
},1000);
}
function addTooToUI (newTodo){// list değerini list item olarak ekleyecek
//list item oluşturma 
const listitem = document.createElement("li");
// link oluşturma

const link = document.createElement("a");
link.href = "#";
link.className = "delete-item";
link.innerHTML = "<i class = 'fa fa-remove'></i>";
listitem.className = "list-group-item d-flex justify-content-between";


// yazılan - girilen verileri lsiteye ekleme
listitem.appendChild(document.createTextNode(newTodo));
listitem.appendChild(link);


//Todo Liste Item ekleme
todoList.appendChild(listitem);
todoInput.value = "";
}