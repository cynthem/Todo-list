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
    function addNewTodo(e, ) {
        e.preventDefault();
    }
})