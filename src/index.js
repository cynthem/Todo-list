import { changeDOM } from "./DOM";
import { manageData } from "./storage";

// All content container
const contentContainer = document.getElementById('content');
// Hamburger menu
const hamburgerMenu = document.querySelector('.fa-bars');
// Dashboard
const dashboard = document.querySelector('.dashboard');
// Filter buttons
const filterBtns = document.querySelectorAll('.filters-btn');
// Add-new button
const addNew = document.querySelector('.projects-btn');
// Todos list container
const listContainer = document.querySelector('.list');
// Popup card buttons
const allExit = document.querySelectorAll('fa-xmark');
    // Add-new card
const addNewCard = document.querySelector('.add-new-card');
const addExit = document.querySelector('.add-cancel');
const addTodo = document.querySelector('.add-btn-todo');
const addTodoDisplay = document.querySelector('.add-todo-form');
const addProject = document.querySelector('.add-btn-project');
const addProjectDisplay = document.querySelector('.add-project-form');
const addLowPriority = document.getElementById('new-low');
const addMediumPriority = document.getElementById('new-medium');
const addHighPriority = document.getElementById('new-high');
const addLow = document.getElementById('new-low');
const addMedium = document.getElementById('new-medium');
const addHigh = document.getElementById('new-high');
const addTodoSubmit = document.querySelector('.new-todo-submit');
const addProjectSubmit = document.querySelector('.new-project-submit');
    // Notes card
const notesCard = document.querySelector('.notes-card');
const notesExit = document.querySelector('.notes-cancel');
    // Edit card
const editCard = document.querySelector('.edit-card');
const editExit = document.querySelector('.edit-cancel');
const editSubmit = document.querySelector('.edit-submit');

const todos = JSON.parse(localStorage.getItem('todos')) || {
    'all': [],
    'today': [],
    'week': [],
    'Kitchen renovation': []
};

if (!localStorage.getItem('todos')) {
    todos['Kitchen renovation'].push(manageData.createTodo('Remove vinyl floor', 'replace with subfloor', '2022-08-24', 'high', 'Kitchen renovation'));
    todos['Kitchen renovation'].push(manageData.createTodo('Build cabinets', 'pre-painted cabinets only', '2022-08-26', 'low', 'Kitchen renovation', true));
    todos['Kitchen renovation'].push(manageData.createTodo('Install countertop', 'leave room for butcher block', '2022-09-18', 'medium', 'Kitchen renovation'));
    todos.all.push(manageData.createTodo('Finish book for book club', 'let Angela borrow afterward', '2022-08-24', 'high', 'all', true));
};

changeDOM.renderAllTodos(todos, listContainer);
changeDOM.renderProjectList(todos, listContainer);

filterBtns.forEach(btn => {
    btn.addEventListener('click', e => changeDOM.manageTodosRender(e, todos, listContainer));
});

hamburgerMenu.addEventListener('click', () => {
    dashboard.style.display = dashboard.style.display === 'none' ? 'grid' : 'none';
});

allExit.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.parentElement.classList.contains('add-cancel')) {
            addNewCard.style.display = 'none';
            contentContainer.classList.remove('blur');
            addTodoDisplay.reset();
            addProjectDisplay.reset();
            addTodo.classList.add('clicked');
            addTodoDisplay.style.display = 'grid';
            addProject.classList.remove('clicked');
            addProjectDisplay.style.display = 'none';
        } else if (btn.parentElement.classList.contains('notes-cancel')) {
            notesCard.style.display = 'none';
            contentContainer.classList.remove('blur');
        } else if (btn.parentElement.classList.contains('edit-cancel')) {
            editCard.style.display = 'none';
            contentContainer.classList.remove('blur');
        }
    });
});

addNew.addEventListener('click', () => {
    contentContainer.classList.add('blur');
    addNewCard.style.display = 'flex';
});

addExit.addEventListener('click', () => {
    addNewCard.style.display = 'none';
    contentContainer.classList.remove('blur');
    addTodoDisplay.reset();
    addProjectDisplay.reset();
    addTodo.classList.add('clicked');
    addTodoDisplay.style.display = 'grid';
    addProject.classList.remove('clicked');
    addProjectDisplay.style.display = 'none';
});

addTodo.addEventListener('click', () => {
    addTodo.classList.add('clicked');
    addTodoDisplay.style.display = 'grid';
    addProject.classList.remove('clicked');
    addProjectDisplay.style.display = 'none';
});

addProject.addEventListener('click', () => {
    addProject.classList.add('clicked');
    addProjectDisplay.style.display = 'grid';
    addTodo.classList.remove('clicked');
    addTodoDisplay.style.display = 'none';
});

addLowPriority.addEventListener('click', () => {
    if (addLow.classList.contains('low')) {
        addLow.classList.remove('low');
        addLow.classList.add('low-checked');
    }
    if (addMedium.classList.contains('medium-checked')) {
        addMedium.classList.remove('medium-checked');
        addMedium.classList.add('medium');
    }
    if (addHigh.classList.contains('high-checked')) {
        addHigh.classList.remove('high-checked');
        addHigh.classList.add('high');
    }
});

addMediumPriority.addEventListener('click', () => {
    if (addLow.classList.contains('low-checked')) {
        addLow.classList.remove('low-checked');
        addLow.classList.add('low');
    }
    if (addMedium.classList.contains('medium')) {
        addMedium.classList.remove('medium');
        addMedium.classList.add('medium-checked');
    }
    if (addHigh.classList.contains('high-checked')) {
        addHigh.classList.remove('high-checked');
        addHigh.classList.add('high');
    }
});

addHighPriority.addEventListener('click', () => {
    if (addLow.classList.contains('low-checked')) {
        addLow.classList.remove('low-checked');
        addLow.classList.add('low');
    }
    if (addMedium.classList.contains('medium-checked')) {
        addMedium.classList.remove('medium-checked');
        addMedium.classList.add('medium');
    }
    if (addHigh.classList.contains('high')) {
        addHigh.classList.remove('high');
        addHigh.classList.add('high-checked');
    }
});

addTodoSubmit.addEventListener('submit', e => {
    manageData.addTodo(e, todos, listContainer);
    addNewCard.style.display = 'none';
    contentContainer.classList.remove('blur');
    addTodoDisplay.reset();
    addProjectDisplay.reset();
});

addProjectSubmit.addEventListener('submit', e => {
    manageData.addProject(e, todos, listContainer);
    addNewCard.style.display = 'none';
    contentContainer.classList.remove('blur');
    addTodoDisplay.reset();
    addProjectDisplay.reset();
    addTodo.classList.add('clicked');
    addTodoDisplay.style.display = 'grid';
    addProject.classList.remove('clicked');
    addProjectDisplay.style.display = 'none';
});

notesExit.addEventListener('click', () => {
    notesCard.style.display = 'none';
    contentContainer.classList.remove('blur');
});

editExit.addEventListener('click', () => {
    editCard.style.display = 'none';
    contentContainer.classList.remove('blur');
});

editSubmit.addEventListener('submit', e => {
    manageData.editTodo(e, todos, listContainer);
    editCard.style.display = 'none';
    contentContainer.classList.remove('blur');
});