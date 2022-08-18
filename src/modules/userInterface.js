import { changeDOM } from "./DOM";
import { manageData } from "./storage";

// Hamburger menu
const hamburgerMenu = document.querySelector('.header-menu');
// Filter buttons
const filterAll = document.querySelector('.all-btn');
const filterToday = document.querySelector('.today-btn');
const filterWeek = document.querySelector('.week-btn');
const filterProject = document.querySelector('.projects-name');
// Add-new button
const projectsNew = document.querySelector('.projects-btn');
// Todos list container
const listContainer = document.querySelector('.list');
// Todos list item buttons
const itemCheckbox = document.querySelector('.item-check');
const itemNotes = document.querySelector('.item-notes');
const itemEdit = document.querySelector('.item-edit');
const itemDelete = document.querySelector('.item-delete');
// Popup card buttons
    // Empty project buttons
const emptyExit = document.getElementById('empty-cancel');
const emptyAdd = document.querySelector('.empty-add');
const emptyDelete = document.querySelector('.empty-delete');
    // Add-new form buttons
const addExit = document.querySelector('.add-cancel');
const addTodo = document.querySelector('.add-btn-todo');
const addProject = document.querySelector('.add-btn-project');
const addLowPriority = document.getElementById('new-low');
const addMediumPriority = document.getElementById('new-medium');
const addHighPriority = document.getElementById('new-high');
const addTodoSubmit = document.querySelector('.new-todo-submit');
const addProjectSubmit = document.querySelector('.new-project-submit');
    // Notes buttons
const notesExit = document.querySelector('.notes-cancel');
    // Edit form buttons
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
}

if (!localStorage.getItem('todos')) {
    todos['Kitchen renovation'].push(manageData.createTodo('Remove vinyl floor', 'replace with subfloor', '2022-08-24', 'high', 'Kitchen renovation'));
    todos['Kitchen renovation'].push(manageData.createTodo('Build cabinets', 'pre-painted cabinets only', '2022-08-26', 'low', 'Kitchen renovation', true));
    todos['Kitchen renovation'].push(manageData.createTodo('Install countertop', 'leave room for butcher block', '2022-09-18', 'medium', 'Kitchen renovation'));
    todos.all.push(manageData.createTodo('Finish book for book club', 'let Angela borrow afterward', '2022-08-24', 'high', 'all', true));
}

changeDOM.renderAllTodos(todos, listContainer);
changeDOM.renderProjectList(todos, listContainer);
