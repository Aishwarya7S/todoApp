const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todosList = document.getElementById("todosList");
const filters = document.querySelectorAll(".filter");
const deleteAllBtn = document.getElementById("deleteAllBtn");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";

function renderTodos() {
    const filteredTodos = todos.filter(todo => {
        if (currentFilter === "all") return true;
        if (currentFilter === "complete") return todo.completed;
        if (currentFilter === "incomplete") return !todo.completed;
    });

    todosList.innerHTML = filteredTodos
        .map(
            (todo, index) => `
        <li class="todo ${todo.completed ? "completed" : ""}">
            <span onclick="toggleTodo(${index})">${todo.text}</span>
            <button class="delete-btn" onclick="deleteTodo(${index})">
                <i class="fas fa-trash-alt"></i>
            </button>
        </li>
    `
        )
        .join("");
}

function addTodo() {
    const text = todoInput.value.trim();
    if (text) {
        todos.push({ text, completed: false });
        todoInput.value = "";
        saveTodos();
        renderTodos();
    }
}

function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;
    saveTodos();
    renderTodos();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
}

function deleteAllTodos() {
    todos = [];
    saveTodos();
    renderTodos();
}

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

filters.forEach(filter => {
    filter.addEventListener("click", () => {
        filters.forEach(btn => btn.classList.remove("active"));
        filter.classList.add("active");
        currentFilter = filter.dataset.filter;
        renderTodos();
    });
});

addBtn.addEventListener("click", addTodo);

todoInput.addEventListener("keypress", event => {
    if (event.key === "Enter") {
        addTodo();
    }
});

deleteAllBtn.addEventListener("click", deleteAllTodos);

renderTodos();
