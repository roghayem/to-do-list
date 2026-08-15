const input = document.querySelector("#todo-input");
const addBtn = document.querySelector("#add-btn");
const list = document.querySelector("#todo-list");
const search = document.querySelector("#search");

const allBtn = document.querySelector("#all-btn");
const activeBtn = document.querySelector("#active-btn");
const completedBtn = document.querySelector("#completed-btn");

const deleteAllBtn = document.querySelector("#delete-all");


// Get saved todos

let todos = JSON.parse(localStorage.getItem("todos")) || [];


// Show todos

function showTodos(todoArray) {

  list.innerHTML = "";

  todoArray.forEach((todo) => {

    const li = document.createElement("li");


    // Completed

    if (todo.completed) {
      li.classList.add("done");
    }


    // Checkbox

    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";

    checkbox.checked = todo.completed;


    checkbox.addEventListener("change", () => {

      todo.completed = checkbox.checked;

      saveTodos();

      showTodos(todos);

    });


    // Todo information

    const info = document.createElement("div");

    info.classList.add("todo-info");

    info.innerHTML = `
      <p>${todo.text}</p>
      <small>${todo.date}</small>
    `;


    // Buttons

    const buttons = document.createElement("div");

    buttons.classList.add("todo-buttons");


    // Edit button

    const editBtn = document.createElement("button");

    editBtn.textContent = "Edit";

    editBtn.classList.add("edit-btn");


    editBtn.addEventListener("click", () => {

      const editInput = document.createElement("input");

      editInput.value = todo.text;

      editInput.classList.add("edit-input");


      const saveBtn = document.createElement("button");

      saveBtn.textContent = "Save";

      saveBtn.classList.add("save-btn");


      li.replaceChild(editInput, info);

      buttons.replaceChild(saveBtn, editBtn);


      saveBtn.addEventListener("click", () => {

        if (editInput.value.trim() === "") {
          return;
        }

        todo.text = editInput.value;

        saveTodos();

        showTodos(todos);

      });

    });


    // Delete button

    const deleteBtn = document.createElement("button");

    deleteBtn.textContent = "Delete";

    deleteBtn.classList.add("delete-btn");


    deleteBtn.addEventListener("click", () => {

      todos = todos.filter((item) => item !== todo);

      saveTodos();

      showTodos(todos);

    });


    buttons.appendChild(editBtn);

    buttons.appendChild(deleteBtn);


    li.appendChild(checkbox);

    li.appendChild(info);

    li.appendChild(buttons);

    list.appendChild(li);

  });

}


// Add Todo

addBtn.addEventListener("click", addTodo);


function addTodo() {

  if (input.value.trim() === "") {
    return;
  }


  const newTodo = {

    text: input.value,

    completed: false,

    date: new Date().toLocaleDateString()

  };


  todos.push(newTodo);

  saveTodos();

  showTodos(todos);

  input.value = "";

}


// Add with Enter

input.addEventListener("keydown", (event) => {

  if (event.key === "Enter") {

    addTodo();

  }

});


// Search

search.addEventListener("input", () => {

  const searchText = search.value.toLowerCase();


  const filteredTodos = todos.filter((todo) => {

    return todo.text.toLowerCase().includes(searchText);

  });


  showTodos(filteredTodos);

});


// All

allBtn.addEventListener("click", () => {

  showTodos(todos);

});


// Active

activeBtn.addEventListener("click", () => {

  const activeTodos = todos.filter((todo) => {

    return todo.completed === false;

  });

  showTodos(activeTodos);

});


// Completed

completedBtn.addEventListener("click", () => {

  const completedTodos = todos.filter((todo) => {

    return todo.completed === true;

  });

  showTodos(completedTodos);

});


// Delete All

deleteAllBtn.addEventListener("click", () => {

  todos = [];

  saveTodos();

  showTodos(todos);

});


// Save todos

function saveTodos() {

  localStorage.setItem(
    "todos",
    JSON.stringify(todos)
  );

}


// Show saved todos when page loads

showTodos(todos);
