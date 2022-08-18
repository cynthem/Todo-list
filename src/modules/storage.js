import { compareDesc } from 'date-fns';
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

    function addProject(e, todos, /*overlay, form, display*/) {

        const newProject = (document.querySelector('#add-project')).value;

        if (newProject && !(newProject.toLowerCase() in todos)) {
            todos[newProject] = [];
            /*// render project names in sidebar
            domManipulator.renderProjectNames(todos, display);
            
            // sets the current folder variable to nav item that was clicked
            toDosManager.changeCurrentProject(newProject);
            console.log("you are in folder", toDosManager.getCurrentProject());

            // render all to-dos from all projects if on the home page. otherwise
            // only render the relevent to-do items
            if (toDosManager.getCurrentProject() === 'home') {
                domManipulator.renderAllToDos(todos, display);
            } else {
                domManipulator.renderToDos(todos, display);
            }

            // sets nav active status to newly created project
            const navItems = document.querySelectorAll('.nav__item--link');
            navItems.forEach(item => {
                item.classList.remove("nav__selected");
            })
            document.querySelector('.projects').lastChild.classList.add('nav__selected');

            // scrolls to bottom of custom projects div
            domManipulator.projectNamesScrollBottom();*/
        } else if (newProject && (newProject.toLowerCase() in todos)) {
            if (newProject.toLowerCase() === 'all') {
                /*console.log(`${newProject} already exists. changing folder to ${newProject}`);
                changeCurrentProject(newProject.toLowerCase());
                domManipulator.renderAllToDos(todos, display);*/
            } else {
                /*console.log(`${newProject} already exists. changing folder to ${newProject}`);
                changeCurrentProject(newProject.toLowerCase());
                domManipulator.renderToDos(todos, display);*/
            }
        }

        /*// closes the form and removes the overlay after submission
        overlay.classList.toggle('overlay-new-invisible');
        form.classList.toggle('create-new-open');


        // I want the form to fade out before the input is reset
        const sleep = (milliseconds) => {
            return new Promise(resolve => setTimeout(resolve, milliseconds))
        }
        
        sleep(300).then(() => {
            // clear input after form closes 
            form.reset();
            // reset add new form to show add todo
            document.querySelector('#new-project-menu').style.display = "none";
        
            document.querySelector('#new-todo-menu').style.display = "flex";
        })

        // show a placeholder screen after a new empty project has been created
        domManipulator.renderEmptyProjectPlaceholder(todos, display);

        //update local storage
        localStorage.setItem("todos", JSON.stringify(todos));*/
    }

    function addTodo(e, todoList, /*display, card, form*/) {

        e.preventDefault();

        const todoTitle = (document.querySelector('.add-input')).value;
        const todoDetails = (document.querySelector('.add-textarea')).value;
        const todoDueDate = (document.querySelector('#new-date')).value;
        const todoPriority = (document.querySelector('[name="new-priority"]:checked')).value;
        const todoProject = getSelectedProject();

        const newTodo = createTodo(todoTitle, todoDetails, todoDueDate, todoPriority, todoProject);
        todoList[todoProject].push(newTodo);

        if (getSelectedProject() === 'all') {
            changeDOM.renderAllTodos(todoList, /*display*/);
        } else {
            changeDOM.renderProjectTodos(todoList, /*display*/);
        }

        card.style.display = 'none';


        /*// I want the form to fade out before the inputs are reset
        const sleep = (milliseconds) => {
            return new Promise(resolve => setTimeout(resolve, milliseconds))
          }
        sleep(300).then(() => {
            // clear inputs after submission 
            form.reset();
            // removes active status from all buttons
            domManipulator.removeActivePriority();
        })*/

        /*// update project name counter 
        domManipulator.renderProjectNames(toDoList, display);*/
    }

    function editTodo(e, todoList, /*display, overlay, form*/) {

        e.preventDefault();

        /*const item = e.target.firstElementChild.dataset.index;
        const project = e.target.firstElementChild.dataset.project;

        todoList[project][item].title = (document.querySelector('.edit-name')).value;
        todoList[project][item].details = (document.querySelector('.edit-details')).value;
        todoList[project][item].dueDate = (document.querySelector('#edit-date')).value;
        todoList[project][item].priority = (document.querySelector('[name="edit-todo-priority"]:checked')).value;*/

        if (getSelectedProject() === 'all') {
            /*domManipulator.renderAllToDos(toDoList, display);
            console.log(toDoList);*/
        } else {
            /*domManipulator.renderToDos(toDoList, display);*/
        }

        /*overlay.classList.toggle('overlay-edit-invisible');
        form.classList.toggle('edit-popup-open');*/
    }

    function deleteTodo(e, todoList, /*display*/) {

        let item;
        let project;

        if (e.target.tagName === 'button') {
            /*item = e.target.parentElement.dataset.index;
            project = e.target.parentElement.dataset.project;*/
        } else if (e.target.tagName === 'i') {
            /*item = e.target.parentElement.parentElement.dataset.index;
            project = e.target.parentElement.parentElement.dataset.project;*/
        }

        if (getSelectedProject() === 'all') {
            todoList[project].splice(item, 1);
            /*domManipulator.renderAllToDos(toDoList, display);*/
        } else {
            todoList[manageData.getSelectedProject()].splice(item, 1);
            /*domManipulator.renderToDos(toDoList, display);*/
        }

        checkIfProjectEmpty(todoList, /*display*/);

        /*localStorage.setItem("todos", JSON.stringify(toDoList));
        // update project name counter 
        domManipulator.renderProjectNames(toDoList, display);*/
    }

    function checkIfProjectEmpty(todos, /*display*/) {

        /*// get an object of only the custom projects
        const projectsObject = Object.assign({}, todos);
        delete projectsObject.home;
        delete projectsObject.today;
        delete projectsObject.week;

        // only delete empty custom projects
        if (!['home', 'week', 'today'].includes(getCurrentProject())) {
            // deletes only the current empty project
            if (projectsObject[getCurrentProject()].length < 1) {
                
                delete todos[getCurrentProject()];
                domManipulator.renderProjectNames(todos, display);
                
                // change folder to home
                
                changeCurrentProject('home');
                domManipulator.renderAllToDos(todos, display);

                // update nave link to show home active
                document.querySelector('.nav').children.item(0).classList.add('nav__selected');
                console.log(document.querySelector('.nav').children.item(0));
            }*/
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