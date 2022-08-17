import manageData from './storage';
import { format } from 'date-fns';
import { el } from 'date-fns/locale';

export const changeDOM = (() => {

    todoList
    todoProject

    function renderProjectList(todos, /*display*/) {

        const projectContainer = document.querySelector('.projects-list');
        projectContainer.innerHTML = '';

        const projectsObject = Object.assign({}, todos);
        delete projectsObject.all;
        delete projectsObject.today;
        delete projectsObject.week;

        for (const project in projectsObject) {

            const projectItem = document.createElement('div');
            projectItem.classList.add('projects-item');

            const projectTitle = document.createElement('button');
            projectTitle.classList.add('projects-name');
            projectTitle.textContent = project;
            projectTitle.addEventListener('click', e => manageTodosRender(e, todos, /*display*/));
            projectTitle.addEventListener('click', e => highlightSelectedFilter(e));

            let uncheckedTodos = 0;
            projectsObject[project].forEach(todo => {
                if (!todo.checked) {
                    uncheckedTodos++;
                }
            });

            const projectCounter = document.createElement('p');
            projectCounter.classList.add('projects-counter');
            projectCounter.textContent = uncheckedTodos;

            projectItem.appendChild(projectTitle);
            projectItem.appendChild(projectCounter);
        };

        let allUncheckedTodos = 0;
        for (const todoList in todos) {
            todos[todoList].forEach(todo => {
                if (!todo.checked) {
                    allUncheckedTodos++;
                }
            })
        };

        const allCount = document.querySelector('.all');
        allCount.textContent = allUncheckedTodos;

        const todayCount = document.querySelector('.today');
        const todayUncheckedTodos = todos.today.reduce((total, value) => {
            return total + !value.checked;
        }, 0);
        todayCount.textContent = todayUncheckedTodos;

        const weekCount = document.querySelector('.week');
        const weekUncheckedTodos = todos.week.reduce((total, value) => {
            return total + !value.checked;
        })
        weekCount.textContent = weekUncheckedTodos;
    }

    function highlightSelectedFilter() {}

    function renderEmptyProject(e, todos, /*display*/) {

        const emptyTitle = document.querySelector('.empty-name');
        emptyTitle.innerHTML = '';
        emptyTitle.textContent = e.target.textContent;

        const emptyContainer = document.querySelector('.empty-project');
        emptyContainer.style.display = 
    }

    function manageTodosRender(e, todos, /*display*/) {

        manageData.setSelectedProject(e.target.textContent.toLowerCase());

        if (manageData.getSelectedProject() === 'all') {
            renderAllTodos(todos, /*display*/);
            highlightSelectedFilter(e);
        } else {
            renderProjectTodos(todos, /*display*/);
            highlightSelectedFilter(e);
        }

        /*// if changing to a new empty custom project, display placeholder screen
        if (!['home', 'week', 'today'].includes(toDosManager.getCurrentProject())) {
            if (todos[toDosManager.getCurrentProject()].length < 1) {
                renderEmptyProjectPlaceholder(todos, display);
            }
        }*/
    }

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

    function toggleTodoCheckbox(e, todoObject, /*display*/) {
        
        let checkedTodo;
        let checkbox;

        if (e.target.tagName === 'button') {
            checkedTodo = e.target.parentElement.parentElement;
            checkbox = e.target.children[0];
        } else if (e.target.tagName === 'i') {
            checkedTodo = e.target.parentElement.parentElement.parentElement;
            checkbox = e.target;
        }

        const todoItems = checkedTodo.children;
        const itemsLeft = todoItems[0];
        const itemTitle = itemsLeft[1];
        const itemsRight = todoItems[1];
        const itemNotes = itemsRight[0];
        const itemDate = itemsRight[1];
        const itemEdit = itemsRight[2];

        if (checkbox.classList.contains('fa-square')) {
            checkbox.classList.remove('fa-square');
            checkbox.classList.add('fa-square-check');
        } else if (checkbox.classList.contains('fa-square-check')) {
            checkbox.classList.remove('fa-square-check');
            checkbox.classList.add('fa-square');
        }

        itemTitle.classList.toggle('selected');
        itemTitle.classList.toggle('strike');
        itemNotes.classList.toggle('done');
        itemDate.classList.toggle('selected');
        itemEdit.classList.toggle('selected');

        const item = checkbox.dataset.index;
        const project = checkbox.dataset.project;

        todoObject[project][item].checked = !todoObject[project][item].checked;

        /*// save todos to local storage
        localStorage.setItem("todos", JSON.stringify(toDoObject));

        // update project count
        renderProjectNames(toDoObject, display)*/
    }

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
        const editPriorityLow = document.getElementById('edit-low-label');
        const editPriorityMedium = document.getElementById('edit-medium-label');
        const editPriorityHigh = document.getElementById('edit-high-label');

        editTitle.innerHTML = '';
        editDetails.innerHTML = '';

        editTitle.dataset.index = item;
        editTitle.dataset.project = project;

        editTitle.textContent = todos[item].title;
        editDetails.textContent = todos[item].details;
        editDueDate.setAttribute('value', todos[item].dueDate);

        if (editPriorityLow.classList.contains('low-checked')) {
            editPriorityLow.classList.remove('low-checked');
            editPriorityLow.classList.add('low');
        }
        if (editPriorityMedium.classList.contains('medium-checked')) {
            editPriorityMedium.classList.remove('medium-checked');
            editPriorityMedium.classList.add('medium');
        }
        if (editPriorityHigh.classList.contains('high-checked')) {
            editPriorityHigh.classList.remove('high-checked');
            editPriorityHigh.classList.add('high');
        }

        if (todos[item].priority === 'low') {
            editPriorityLow.checked = true;
            editPriorityLow.classList.remove('low');
            editPriorityLow.classList.add('low-checked');
        } else if (todos[item].priority === 'medium') {
            editPriorityMedium.checked = true;
            editPriorityMedium.classList.remove('medium');
            editPriorityMedium.classList.add('medium-checked');
        } else if (todos[item].priority === 'high') {
            editPriorityHigh.checked = true;
            editPriorityHigh.classList.remove('high');
            editPriorityHigh.classList.add('high-checked');
        }

        editCard.style.display = 'flex';

        /*//listener that changes the highlighted priority button
        const priorityBtns = document.querySelectorAll('.edit-popup__priority-btn');
        priorityBtns.forEach(btn => {
            btn.addEventListener('click', e =>{
                editPriority(e);
            });
        })*/
    }
})