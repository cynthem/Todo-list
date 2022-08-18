import changeDOM from './DOM';

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

        const newProject = (document.querySelector('#add-project')).value;

        if (newProject && !(newProject.toLowerCase() in todos)) {

            todos[newProject] = [];
            changeDOM.renderProjectList(todos, listContainer);
            setSelectedProject(newProject);

            if (getSelectedProject() === 'all') {
                changeDOM.renderAllTodos(todos, listContainer);
            } else {
                changeDOM.renderProjectTodos(todos, listContainer);
            }

            const filterBtns = document.querySelectorAll('.filters-btn');
            const projectBtns = document.querySelectorAll('.projects-name');

            filterBtns.forEach(btn => {
                btn.classList.remove('clicked');
            });

            projectBtns.forEach(btn => {
                btn.classList.remove('clicked');
            });

            projectBtns[-1].classList.add('clicked');

        } else if (newProject && (newProject.toLowerCase() in todos)) {
            if (newProject.toLowerCase() === 'all') {
                setSelectedProject(newProject.toLowerCase());
                changeDOM.renderAllTodos(todos, listContainer);
            } else {
                setSelectedProject(newProject.toLowerCase());
                changeDOM.renderProjectTodos(todos, listContainer);
            }
        }

        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function addTodo(e, todos, listContainer) {

        e.preventDefault();

        const todoTitle = (document.querySelector('.add-input')).value;
        const todoDetails = (document.querySelector('.add-textarea')).value;
        const todoDueDate = (document.querySelector('#new-date')).value;
        const todoPriority = (document.querySelector('[name="new-priority"]:checked')).value;
        const todoProject = getSelectedProject();

        const newTodo = createTodo(todoTitle, todoDetails, todoDueDate, todoPriority, todoProject);
        todos[todoProject].push(newTodo);

        if (getSelectedProject() === 'all') {
            changeDOM.renderAllTodos(todos, listContainer);
        } else {
            changeDOM.renderProjectTodos(todos, listContainer);
        }

        changeDOM.renderProjectList(todos, listContainer);

        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function editTodo(e, todos, listContainer) {

        e.preventDefault();

        const item = e.target.firstElementChild.dataset.index;
        const project = e.target.firstElementChild.dataset.project;

        todos[project][item].title = (document.querySelector('.edit-name')).value;
        todos[project][item].details = (document.querySelector('.edit-details')).value;
        todos[project][item].dueDate = (document.querySelector('#edit-date')).value;
        todos[project][item].priority = (document.querySelector('[name="edit-todo-priority"]:checked')).value;

        if (getSelectedProject() === 'all') {
            changeDOM.renderAllTodos(todos, listContainer);
        } else {
            changeDOM.renderProjectTodos(todos, listContainer);
        }
    }

    function deleteTodo(e, todos, listContainer) {

        let item;
        let project;

        if (e.target.tagName === 'button') {
            item = e.target.parentElement.parentElement.dataset.index;
            project = e.target.parentElement.parentElement.dataset.project;
        } else if (e.target.tagName === 'i') {
            item = e.target.parentElement.parentElement.parentElement.dataset.index;
            project = e.target.parentElement.parentElement.parentElement.dataset.project;
        }

        if (getSelectedProject() === 'all') {
            todos[project].splice(item, 1);
            changeDOM.renderAllToDos(todos, listContainer);
        } else {
            todos[getSelectedProject()].splice(item, 1);
            changeDOM.renderToDos(todos, listContainer);
        }

        checkIfProjectEmpty(todos, listContainer);

        localStorage.setItem('todos', JSON.stringify(todos));

        changeDOM.renderProjectList(todos, listContainer);
    }

    function checkIfProjectEmpty(todos, listContainer) {

        const projectsObject = Object.assign({}, todos);
        delete projectsObject.all;
        delete projectsObject.today;
        delete projectsObject.week;

        if (!['all', 'week', 'today'].includes(getSelectedProject())) {
            if (projectsObject[getSelectedProject()].length < 1) {
                
                delete todos[getSelectedProject()];
                changeDOM.renderProjectList(todos, listContainer);
                
                setSelectedProject('all');
                changeDOM.renderAllTodos(todos, listContainer);

                const filterBtns = document.querySelectorAll('.filters-btn');
                const projectBtns = document.querySelectorAll('.projects-name');

                filterBtns.forEach(btn => {
                    btn.classList.remove('clicked');
                });

                projectBtns.forEach(btn => {
                    btn.classList.remove('clicked');
                });

                filterBtns[0].classList.add('clicked');
            }
        }
    }

    return {
        setSelectedProject,
        getSelectedProject,
        createTodo,
        addProject,
        addTodo,
        editTodo,
        deleteTodo,
        checkIfProjectEmpty
    }

})();