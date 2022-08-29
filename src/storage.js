import { changeDOM } from './DOM';

export const manageData = (() => {

    let selectedProject = 'all';

    function setSelectedProject(currentProject) {
        selectedProject = currentProject;
    }

    function getSelectedProject() {
        return selectedProject;
    }

    function createTodo(title, details, dueDate, priority, project, checked=false) {
        return {
            title,
            details,
            dueDate,
            priority,
            project,
            checked
        };
    }

    function addProject(e, todos, listContainer) {

        e.preventDefault();

        const newProject = (document.querySelector('#add-project')).value;

        if (newProject) {
            if (newProject.toLowerCase === 'all') {
                setSelectedProject('all');
                changeDOM.highlightReloadedFilter('all');
                changeDOM.renderAllTodos(todos, listContainer);
            } else if (newProject.toLowerCase() === 'today') {
                setSelectedProject('today');
                changeDOM.renderTodayTodos(todos, listContainer);
                changeDOM.highlightReloadedFilter('today');
            } else if ((newProject.toLowerCase() === 'week') || (newProject.toLowerCase() === 'this week')) {
                setSelectedProject('week');
                changeDOM.renderWeekTodos(todos, listContainer);
                changeDOM.highlightReloadedFilter('week');
            } else if (newProject in todos) {
                setSelectedProject(newProject);
                changeDOM.renderProjectTodos(todos, listContainer);
                changeDOM.highlightReloadedFilter(getSelectedProject());
            } else {
                todos[newProject] = [];
                setSelectedProject('all');
                changeDOM.highlightReloadedFilter(getSelectedProject());
                changeDOM.renderProjectList(todos, listContainer);
                changeDOM.renderAllTodos(todos, listContainer);
            }
        }

        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function addTodo(e, todos, listContainer) {
        
        e.preventDefault();
        
        const todoTitle = (document.querySelector('.add-input')).value;
        const todoDetails = (document.querySelector('.add-textarea')).value;
        const todoDate = (document.querySelector('#new-date')).value;
        const todoDay = todoDate.slice(5, 10);
        const todoYear = todoDate.slice(0, 4);
        const todoDueDate = `${todoDay}-${todoYear}`;
        const todoPriority = (document.querySelector('[name="new-priority"]:checked')).value;
        const todoProject = getSelectedProject();

        const newTodo = createTodo(todoTitle, todoDetails, todoDueDate, todoPriority, todoProject);
        todos[todoProject].push(newTodo);

        if (manageData.getSelectedProject() === 'all') {
            changeDOM.renderAllTodos(todos, listContainer);
        } else if (manageData.getSelectedProject() === 'today') {
            changeDOM.renderTodayTodos(todos, listContainer);
        } else if (manageData.getSelectedProject() === 'week') {
            changeDOM.renderWeekTodos(todos, listContainer); 
        } else {
            changeDOM.renderProjectTodos(todos, listContainer);
        }
        
        changeDOM.renderProjectList(todos, listContainer);
    }

    function editTodo(e, todos, listContainer) {

        e.preventDefault();
        console.log(e.target.firstElementChild)
        const item = e.target.firstElementChild.dataset.index;
        const project = e.target.firstElementChild.dataset.project;

        /*todos[project][item].title = (document.querySelector('.edit-name')).value;
        todos[project][item].details = (document.querySelector('.edit-details')).value;
        todos[project][item].dueDate = (document.querySelector('#edit-date')).value;
        todos[project][item].priority = (document.querySelector('[name="edit-todo-priority"]:checked')).value;

        if (getSelectedProject() === 'all') {
            changeDOM.renderAllTodos(todos, listContainer);
        } else {
            changeDOM.renderProjectTodos(todos, listContainer);
        }*/
    }

    function deleteTodo(e, todos, listContainer) {

        const item = e.target.parentElement.parentElement.dataset.index;
        const project = e.target.parentElement.parentElement.dataset.project;

        todos[project].splice(item, 1);
        
        if (getSelectedProject() === 'all') {
            changeDOM.renderAllTodos(todos, listContainer);
        } else if (getSelectedProject() === 'today') {
            changeDOM.renderTodayTodos(todos, listContainer);
        } else if (getSelectedProject() === 'week') {
            changeDOM.renderWeekTodos(todos, listContainer);
        } else {
            let projectLength = todos[project].length;

            todos[project].forEach(todo => {
                if (todo.checked) {
                    projectLength--;
                }
            });

            if (projectLength < 1) {
                changeDOM.renderEmptyProject(e, todos, listContainer);
            } else {
                changeDOM.renderProjectTodos(todos, listContainer);
            }
        }

        localStorage.setItem('todos', JSON.stringify(todos));

        changeDOM.renderProjectList(todos, listContainer);
    }

    return {
        setSelectedProject,
        getSelectedProject,
        createTodo,
        addProject,
        addTodo,
        editTodo,
        deleteTodo
    };
})();