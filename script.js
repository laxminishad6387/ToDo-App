// const { console } = require("inspector");

function localstorage()
{
     const todos=JSON.parse(localStorage.getItem("todo"))||{"todoList":[]};
     console.log( todos);
     return todos

}
function addtodo(inputText)
{
      const newtodo=localstorage();
       newtodo.todoList.push(inputText);
       localStorage.setItem("todo",JSON.stringify(newtodo));
}


document.addEventListener("DOMContentLoaded",()=>
{
    const inputText=document.getElementById("InputType");
    const submited=document.getElementById("ToDoType");
    submited.addEventListener("click",()=>
{    
      const todoText=inputText.value;
      if(todoText=='')
            alert("please add something in todo");
      else
           addtodo(todoText);
})
    inputText.addEventListener("change",()=>
{
      console.log("something is change");
})
    
      console.log("loaded");
      localstorage();
});