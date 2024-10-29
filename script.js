function localstorage()
{
     const todos=JSON.parse(localStorage.getItem("todo"))||{"todoList":[]};
   console.log(todos);
     return todos;

}
function addtodo(todo)
{
      const newtodo=localstorage();
   
       newtodo.todoList.push(todo);
       localStorage.setItem("todo",JSON.stringify(newtodo));
}
function deleteTodo(id) {
      const todos = localstorage();
    
      todos.todoList = todos.todoList.filter(todo => todo.id !== id);
 
      localStorage.setItem("todo", JSON.stringify(todos));
      reloadTodoList();
  }
  

// step->1 identify the unique key
// step->2 update the value
// step->3 reload on localStorage
function updateCompletedbtn(id)
{
   const completedtodo=localstorage();
   for(const btn of completedtodo.todoList)
   {
      if(btn.id==id)
      {
            btn.isCompleted=true;
           
      }
      localStorage.setItem("todo", JSON.stringify(completedtodo));
      reloadTodoList();
   }
}
function reloadTodoList() {
      const todoList = document.getElementById("todolist");
      todoList.innerHTML = ''; // Clear existing list
      const todos = localstorage();
      todos.todoList.forEach(todo => addToDoInhtml(todo)); // Re-render each todo
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
    completedbtn.textContent=todo.isCompleted?"completed":"complete";
    completedbtn.classList.add("completedbtn");




wrapper.appendChild(editbtn);
    wrapper.appendChild(deletebtn);
  wrapper.appendChild(completedbtn);

  liElement.appendChild(textdiv);
    liElement.appendChild(wrapper);
  ulElement.appendChild(liElement);
  completedbtn.addEventListener("click",()=>
{
   updateCompletedbtn(todo.id);
  
   completedbtn.disabled=true;
})
deletebtn.addEventListener("click",()=>
{
      deleteTodo(todo.id);
})

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
           addtodo({text:todoText , isCompleted:false,id:Date.now(),some:"hello"});
      addToDoInhtml({text:todoText , isCompleted:false,id:Date.now(),some:"hello"});
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