import changeDOM from "./DOM";
import manageData from "./storage";

// All content container
const contentContainer = document.getElementById('content');
// Hamburger menu
const hamburgerMenu = document.querySelector('.header-menu');
// Filter buttons
const filterBtns = document.querySelector('.filters-btn');
const filterProject = document.querySelector('.projects-name');
// Add-new button
const addNew = document.querySelector('.projects-btn');
// Todos list container
const listContainer = document.querySelector('.list');
// Todos list item buttons
const itemCheckbox = document.querySelector('.item-check');
const itemNotes = document.querySelector('.item-notes');
const itemEdit = document.querySelector('.item-edit');
const itemDelete = document.querySelector('.item-delete');
// Popup card buttons
const allExit = document.querySelector('fa-xmark');
    // Empty project card
const emptyCard = document.querySelector('.empty-project-card');
const emptyExit = document.getElementById('empty-cancel');
const emptyAdd = document.querySelector('.empty-add');
const emptyDelete = document.querySelector('.empty-delete');
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
const addTodoSubmit = document.querySelector('.new-todo-submit');
const addProjectSubmit = document.querySelector('.new-project-submit');
    // Notes card
const notesCard = document.querySelector('.notes-card');
const notesExit = document.querySelector('.notes-cancel');
    // Edit card
const editCard = document.querySelector('.edit-card');
const editExit = document.querySelector('.edit-cancel');
const editLowPriority = document.getElementById('edit-low');
const editMediumPriority = document.getElementById('edit-medium');
const editHighPriority = document.getElementById('edit-high');
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

filterBtns.forEach(button => {
    button.addEventListener('click', e => changeDOM.manageTodosRender(e, todos, listContainer));
});

allExit.addEventListener('click', () => {
    if (allExit.parentElement.classList.contains('add-cancel')) {
        addNewCard.style.display = 'none';
        contentContainer.classList.remove('blur');
        addTodoDisplay.reset();
        addProjectDisplay.reset();
        addTodo.classList.add('clicked');
        addTodoDisplay.style.display = 'grid';
        addProject.classList.remove('clicked');
        addProjectDisplay.style.display = 'none';
    } else if (allExit.parentElement.classList.contains('empty-project-card')) {
        emptyCard.style.display = 'none';
        contentContainer.classList.remove('blur');
    } else if (allExit.parentElement.classList.contains('notes-cancel')) {
        notesCard.style.display = 'none';
        contentContainer.classList.remove('blur');
    } else if (allExit.parentElement.classList.contains('edit-cancel')) {
        editCard.style.display = 'none';
        contentContainer.classList.remove('blur');
    }
});

addNew.addEventListener('click', () => {
    contentContainer.classList.add('blur');
    addNewCard.style.display = 'flex';
})

addExit.addEventListener('click', () => {
    addNewCard.style.display = 'none';
    contentContainer.classList.remove('blur');
    addTodoDisplay.reset();
    addProjectDisplay.reset();
    addTodo.classList.add('clicked');
    addTodoDisplay.style.display = 'grid';
    addProject.classList.remove('clicked');
    addProjectDisplay.style.display = 'none';
})

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

editSubmit.addEventListener('submit', e => {
    manageData.editTodo(e, todos, listContainer);
});