import manageData from './storage';
import { format } from 'date-fns';
import { el } from 'date-fns/locale';

export const changeDOM = (() => {

    todoList
    todoProject

    function renderProjects() {}

    function renderProjectsCount() {}

    function highlightSelectedFilter() {}

    function renderEmptyProjectMessage() {}

    function renderAllTodos(todoObject, element) {

        element.innerHTML = '';

        for (const project in todoObject) {
            todoObject[project].forEach((todo, i) => {

                const todoItem = document.createElement('div');
                todoItem.classList.add('list-item');
                todoItem.classList.add(`${todo.priority}-priority`);
                todoItem.setAttribute('data-index', i);
                todoItem.setAttribute('data-project', `${todo.project}`);

                const itemLeft = document.createElement('div');
                itemLeft.classList.add('item-left');

                const checkboxBtn = document.createElement('button');
                checkboxBtn.classList.add('item-check');
                checkboxBtn.addEventListener('click', e => toggleTodoCheckbox(e, todos, element));

                const checkboxIcon = document.createElement('i');
                checkboxIcon.classList.add('fa-regular', 'fa-square');
                checkboxIcon.addEventListener('click', e => toggleTodoCheckbox(e, todos, element));
                checkboxBtn.appendChild(checkboxIcon);

                const itemName = document.createElement('p');
                itemName.classList.add('item-description');
                itemName.textContent = todo.title;
                itemLeft.appendChild(checkboxBtn);
                itemLeft.appendChild(itemName);

                const itemRight = document.createElement('div');
                itemRight.classList.add('item-right');

                const notesBtn = document.createElement('button');
                notesBtn.classList.add('item-notes');
                notesBtn.textContent = 'NOTES';
                notesBtn.addEventListener('click', e => renderNotesCard(e, todoList));

                const dateText = document.createElement('p');
                dateText.classList.add('item-date');
                const dateObject = new Date(todo.dueDate);
                const month = format(dateObject, 'Mmm');
                const day = format(dateObject, 'do');
                dateText.textContent = `${month} ${day}`;

                const editBtn = document.createElement('button');
                editBtn.classList.add('item-edit');
                editBtn.addEventListener('click', e => renderEditCard(e, todoList, element));

                const editIcon = document.createElement('i');
                editIcon.classList.add('fa-solid', 'fa-pen-to-square');
                editIcon.addEventListener('click', e => renderEditCard(e, todoList, element));
                editBtn.appendChild(editIcon);

                const deleteBtn = document.createElement('button');
                deleteBtn.classList.add('item-delete');
                deleteBtn.addEventListener('click', e => manageData.deleteTodo(e, todos, element));

                const deleteIcon = document.createElement('i');
                deleteIcon.classList.add('fa-solid', 'fa-trash-can');
                deleteIcon.addEventListener('click', e => manageData.deleteTodo(e, todos, element));
                deleteBtn.appendChild(deleteIcon);
                itemRight.appendChild(notesBtn);
                itemRight.appendChild(dateText);
                itemRight.appendChild(editBtn);
                itemRight.appendChild(deleteBtn);

                todoItem.appendChild(itemLeft);
                todoItem.appendChild(itemRight);

                if (todo.checked) {
                    toggleTodoCheckbox(todoItem);
                };
                
                element.appendChild(todoItem);
            });
        }
        /*localStorage.setItem("todos", JSON.stringify(toDoObject));*/
    }

    function renderFilteredTodos() {}

    function renderProjectTodos(todos, element) {

        const todoList = todos[manageData.getSelectedProject()];

        element.innerHTML = '';

        if (todoList.length === 0) {
            return;
        }

        todoList.forEach((todo, i) => {

            const todoItem = document.createElement('div');
            todoItem.classList.add('list-item');
            todoItem.classList.add(`${todo.priority}-priority`);
            todoItem.setAttribute('data-index', i);
            todoItem.setAttribute('data-project', `${todo.project}`);

            const itemLeft = document.createElement('div');
            itemLeft.classList.add('item-left');

            const checkboxBtn = document.createElement('button');
            checkboxBtn.classList.add('item-check');
            checkboxBtn.addEventListener('click', e => toggleTodoCheckbox(e, todos, element));

            const checkboxIcon = document.createElement('i');
            checkboxIcon.classList.add('fa-regular', 'fa-square');
            checkboxIcon.addEventListener('click', e => toggleTodoCheckbox(e, todos, element));
            checkboxBtn.appendChild(checkboxIcon);

            const itemName = document.createElement('p');
            itemName.classList.add('item-description');
            itemName.textContent = todo.title;
            itemLeft.appendChild(checkboxBtn);
            itemLeft.appendChild(itemName);

            const itemRight = document.createElement('div');
            itemRight.classList.add('item-right');

            const notesBtn = document.createElement('button');
            notesBtn.classList.add('item-notes');
            notesBtn.textContent = 'NOTES';
            notesBtn.addEventListener('click', e => renderNotesCard(e, todoList));

            const dateText = document.createElement('p');
            dateText.classList.add('item-date');
            const dateObject = new Date(todo.dueDate);
            const month = format(dateObject, 'Mmm');
            const day = format(dateObject, 'do');
            dateText.textContent = `${month} ${day}`;

            const editBtn = document.createElement('button');
            editBtn.classList.add('item-edit');
            editBtn.addEventListener('click', e => renderEditCard(e, todoList, element));

            const editIcon = document.createElement('i');
            editIcon.classList.add('fa-solid', 'fa-pen-to-square');
            editIcon.addEventListener('click', e => renderEditCard(e, todoList, element));
            editBtn.appendChild(editIcon);

            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('item-delete');
            deleteBtn.addEventListener('click', e => manageData.deleteTodo(e, todos, element));

            const deleteIcon = document.createElement('i');
            deleteIcon.classList.add('fa-solid', 'fa-trash-can');
            deleteIcon.addEventListener('click', e => manageData.deleteTodo(e, todos, element));
            deleteBtn.appendChild(deleteIcon);
            itemRight.appendChild(notesBtn);
            itemRight.appendChild(dateText);
            itemRight.appendChild(editBtn);
            itemRight.appendChild(deleteBtn);

            todoItem.appendChild(itemLeft);
            todoItem.appendChild(itemRight);

            if (todo.checked) {
                toggleTodoCheckbox(todoItem);
            };

            element.appendChild(todoItem);
        });
        /*localStorage.setItem("todos", JSON.stringify(todos));*/
    }

    function toggleTodoCheckbox() {}

    function highlightAddCardType() {}

    function resetAddCardType() {}

    function renderNotesCard(e, todos) {
        
        const item = e.target.parentElement.dataset.index;
        const notesCard = document.querySelector('.notes-card');
        const notesTitle = document.querySelector('.notes-header');
        const notesProject = document.querySelector('.notes-todo');
        const notesDueDate = document.querySelector('.notes-date');
        const notesPriority = document.querySelector('.notes-priority');
        const notesDetails = document.querySelector('.notes-details');

        notesTitle.innerHTML = '';
        notesProject.innerHTML = '';
        notesDueDate.innerHTML = '';
        notesPriority.innerHTML = '';
        notesDetails.innerHTML = '';

        const day = format(new Date(todos[item].dueDate), 'do');
        const month = format(new Date(todos[item].dueDate), 'MMM');
        const year = format(new Date(todos[item].dueDate), 'yyyy');
        notesDueDate.textContent = `${month} ${day}, ${year}`;

        notesTitle.textContent = todos[item].title;
        notesProject.textContent = todos[item].project;
        notesPriority.textContent = todos[item].priority;
        notesDetails.textContent = todos[item].details;

        notesCard.style.display = 'flex';
    }

    function renderEditCard(e, todos) {

        let item;
        let project;

        if (e.target.tagName === 'button') {
            item = element.parentElement.dataset.index;
            project = element.parentElement.dataset.project;
        } else if (e.target.tagName === 'i') {
            item = element.parentElement.parentElement.dataset.index;
            project = element.parentElement.parentElement.dataset.project;
        }

        const editCard = document.querySelector('.edit-card');
        const editTitle = document.querySelector('.edit-name');
        const editDetails = document.querySelector('.edit-details');
        const editDueDate = document.getElementById('edit-date');
        const editPriority = document.querySelector('');

        editTitle.innerHTML = '';
        editDetails.innerHTML = '';

        editTitle.textContent = todos[item].title;
        editDetails.textContent = todos[item].details;
        editDueDate.setAttribute('value', todos[item].dueDate);

        
    }

})