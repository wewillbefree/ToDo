const todoInput = document.querySelector('.todo__input');
const buttonSubmit = document.querySelector('.todo__button-submit');
const todoForm = document.querySelector('.todo__form');
const todoList = document.querySelector('.todo__list');
const itemTemplate = document.querySelector('#todo-template').content;

const state = {
    todos: []
}

const addTodos = (text) => {
    const newTodos = {
        id: Date.now(),
        text: text,
        completed: false,
    };

    state.todos.push(newTodos);
    renderTodos()
}

const deleteTodo = (id) => {
    state.todos = state.todos.filter(todo => todo.id !== id);
    renderTodos();
};

const toggleTodo = (id) => {
    const todo = state.todos.find(todo => todo.id === id);
    todo.completed = !todo.completed;
    renderTodos()
}

const renderTodos = () => {
    todoList.innerHTML = ''
    state.todos.forEach(todo => {
        const item = itemTemplate.cloneNode(true).querySelector('.todo__item');
        const itemText = item.querySelector('.todo__text');
        const checkBox = item.querySelector('.todo__checkbox');
        const buttonDel = item.querySelector('.todo__button-delete');
        item.dataset.id = todo.id;
        itemText.textContent = todo.text;
        itemText.classList.toggle('todo__text-crossout', todo.completed);
        checkBox.checked = todo.completed; // Чтобы галочка была отмечена

        todoList.append(item);

        buttonDel.addEventListener('click', () => {
            deleteTodo(todo.id)
        });

        checkBox.addEventListener('click', () => {
            toggleTodo(todo.id)
        });

    })
}

todoForm.addEventListener('submit', (event) => {
    addTodos(todoInput.value)
    todoInput.value = ''
    event.preventDefault();
})







