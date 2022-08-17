import manageData from './storage';

export const changeDOM = (() => {

    todoList
    todoProject

    // render all to-dos from all projects if on the home page. otherwise
        // only render the relevent to-do items
        if (getCurrentProject() === 'home') {
            domManipulator.renderAllToDos(toDoList, display);
            
        } else {
            domManipulator.renderToDos(toDoList, display);
        }
        
        // closes the form and removes the overlay after submission
        overlay.classList.toggle('overlay-new-invisible');
        form.classList.toggle('create-new-open');

        // I want the form to fade out before the inputs are reset
        const sleep = (milliseconds) => {
            return new Promise(resolve => setTimeout(resolve, milliseconds))
          }
        
        sleep(300).then(() => {
            // clear inputs after submission 
            form.reset();
            // removes active status from all buttons
            domManipulator.removeActivePriority();
        })

        // update project name counter 
        domManipulator.renderProjectNames(toDoList, display);
})