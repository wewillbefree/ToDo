const todoInput = document.querySelector('.todo__input');
const buttonSubmit = document.querySelector('.todo__button-submit');
const todoForm = document.querySelector('.todo__form');
const todoList = document.querySelector('.todo__list');
const todoCounter = document.querySelector('.todo__counter');
const itemTemplate = document.querySelector('#todo-template').content;


const state = {
    todos: []
}

const addTodos = (text) => {
    const newTodo = {
        id: Date.now(),
        text: text,
        completed: false,
    };

    state.todos.push(newTodo);
    renderTodos();
}

const updateCounter = () => {
    const count = state.todos.filter(todo => !todo.completed).length;
    todoCounter.textContent = `Осталось: ${count} задач`;
}

const deleteTodo = (id) => {
    state.todos = state.todos.filter(todo => todo.id !== id);
    renderTodos();
};

const toggleTodo = (id) => {
    const todo = state.todos.find(todo => todo.id === id);
    todo.completed = !todo.completed;
    renderTodos();
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
    updateCounter();
    saveTodos();
}

todoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = todoInput.value.trim();
    if (text === '') {
        return
    }
    addTodos(text)
    todoInput.value = ''
})

const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
};

const loadTodos = () => {
    state.todos = JSON.parse(localStorage.getItem('todos')) || [];
};


loadTodos();
renderTodos();
updateCounter();






