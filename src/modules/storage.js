export const storeInfo = (() => {

    let selectedProject = 'home';

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

    function addNewTodo(e, /*todoList, display, overlay, form*/) {

        e.preventDefault();

        const todoTitle = (document.querySelector('.add-input')).value;
        const todoDetails = (document.querySelector('.add-textarea')).value;
        const todoDueDate = (document.querySelector('.date-input')).value;
        const todoPriority = (document.querySelector('[name="new-priority"]:checked')).value;
        const todoProject = getSelectedProject();

        const newTodo = createTodo(todoTitle, todoDetails, todoDueDate, todoPriority, todoProject);
        //todoList[todoProject].push(newTodo);
    }
})