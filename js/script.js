// Elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValue;

// Funções
const getSavedTodos = () => {
  return JSON.parse(localStorage.getItem("todos")) || [];
};

// Função para salvar as tarefas no localStorage
const saveTodos = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const saveTodo = (text) => {
  const todo = document.createElement("div");
  todo.classList.add("todo");

  const todoTitle = document.createElement("h3");
  todoTitle.innerText = text;
  todo.appendChild(todoTitle);

  const doneBtn = document.createElement("button");
  doneBtn.classList.add("finish-todo");
  doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
  todo.appendChild(doneBtn);

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-todo");
  editBtn.innerHTML = '<i class="fas fa-pencil-alt"></i>';
  todo.appendChild(editBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("remove-todo");
  deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  todo.appendChild(deleteBtn);

  todoList.appendChild(todo);

  todoInput.value = "";
  todoInput.focus();

  const todos = getSavedTodos();
  todos.push(text);
  saveTodos(todos);
};

const deleteTodo = (text) => {
  const todos = getSavedTodos();
  const updatedTodos = todos.filter((todo) => todo !== text);
  saveTodos(updatedTodos);
};

const toggleForms = () => {
  editForm.classList.toggle("hide");
  todoForm.classList.toggle("hide");
  todoList.classList.toggle("hide");
};

const updateTodo = (text) => {
  const todos = getSavedTodos();
  const updatedTodos = todos.map((todo) =>
    todo === oldInputValue ? text : todo
  );
  saveTodos(updatedTodos);
};

// Função para exibir as tarefas na lista
const displayTodos = () => {
  const todos = getSavedTodos();

  todos.forEach((todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = todo;
    todoDiv.appendChild(todoTitle);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todoDiv.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fas fa-pencil-alt"></i>';
    todoDiv.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-todo");
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todoDiv.appendChild(deleteBtn);

    todoList.appendChild(todoDiv);
  });
};

// Eventos
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = todoInput.value;
  if (inputValue) {
    saveTodo(inputValue);
  }
});

document.addEventListener("click", (e) => {
  const targetEl = e.target;
  const parentEl = targetEl.closest("div");
  let todoTitle;

  if (parentEl && parentEl.querySelector("h3")) {
    todoTitle = parentEl.querySelector("h3").innerText;
  }

  if (targetEl.classList.contains("finish-todo")) {
    parentEl.classList.toggle("done");
  }

  if (targetEl.classList.contains("remove-todo")) {
    parentEl.remove();
    deleteTodo(todoTitle); // Remove a tarefa do localStorage ao deletá-la
  }

  if (targetEl.classList.contains("edit-todo")) {
    toggleForms();

    editInput.value = todoTitle;
    oldInputValue = todoTitle;
  }
});

cancelEditBtn.addEventListener("click", (e) => {
  e.preventDefault();

  toggleForms();
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const editInputValue = editInput.value;

  if (editInputValue) {
    updateTodo(editInputValue);
    toggleForms();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  displayTodos(); // Exibe as tarefas recuperadas do localStorage
});
