// const { console } = require("inspector");

function localstorage()
{
     const todos=JSON.parse(localStorage.getItem("todo"))||{"todoList":[]};
     console.log( todos);
     return todos

}
function addtodo(todo)
{
      const newtodo=localstorage();
       newtodo.todoList.push(todo);
       localStorage.setItem("todo",JSON.stringify(newtodo));
}
function  findFilterButton(event)
{      const todoList=document.getElementById("todolist"); 
      const element=event.target;
      const value=element.getAttribute("data-filter");
      console.log(value);
      todoList.innerHTML='';
      const todos= localstorage();
      if(value=="All")
      {
          
     todos.todoList.forEach(todo=>
     {
      addToDoInhtml(todo);
     }
     )
      } 
      else  if(value=="Pending")
      {   

            todos.todoList.forEach(todo=>
                  {  
                        if(todo.isCompleted!=true)
                   addToDoInhtml(todo);
                  }
                  )
      }
      else{
            todos.todoList.forEach(todo=>
                  {  
                        if(todo.isCompleted==true)
                   addToDoInhtml(todo);
                  }
                  )
      }
     
}
function addToDoInhtml(todo)
{
      const ulElement=document.getElementById("todolist");
      const liElement=document.createElement("li");
      const textdiv=document.createElement("div");
      const  wrapper=document.createElement("div");
      
      
      textdiv.textContent=todo.text;
      liElement.classList.add("addItem");

    const editbtn=document.createElement("button");
    editbtn.classList.add("editbtn");
    editbtn.textContent="Edit";


    const deletebtn=document.createElement("button");
    deletebtn.textContent="Delete";
    deletebtn.classList.add("deletebtn");
    

    const completedbtn=document.createElement("button");
    completedbtn.textContent="Completed";
    completedbtn.classList.add("completedbtn");
wrapper.appendChild(editbtn);
    wrapper.appendChild(deletebtn);
  wrapper.appendChild(completedbtn);

  liElement.appendChild(textdiv);
    liElement.appendChild(wrapper);
  ulElement.appendChild(liElement);
}


document.addEventListener("DOMContentLoaded",()=>
{
    const inputText=document.getElementById("InputType");
    const submited=document.getElementById("ToDoType");
    const filterbtn=document.getElementsByClassName("filterbtn");
    for(const btn of filterbtn)
    {
        btn.addEventListener("click",findFilterButton);
    }
    submited.addEventListener("click",()=>
{    
      const todoText=inputText.value;
      if(todoText=='')
            alert("please add something in todo");
      else
      {
           addtodo({text:todoText , isCompleted:false});
      addToDoInhtml({text:todoText , isCompleted:false});
      inputText.value="";
      }
})
    inputText.addEventListener("change",()=>
{
      console.log("something is change");
})
    
      console.log("loaded");
     const todos= localstorage();
     todos.todoList.forEach(todo=>
     {
      addToDoInhtml(todo);
     }
     )
});