import { manageData } from './storage';
import { format } from 'date-fns';
import { el } from 'date-fns/locale';

export const changeDOM = (() => {

    function renderProjectList(todos, listContainer) {

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
            projectTitle.addEventListener('click', e => manageTodosRender(e, todos, listContainer));
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
            projectContainer.appendChild(projectItem);

            if (manageData.getSelectedProject() === project) {
                projectTitle.classList.add('clicked');
            }
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

    function highlightSelectedFilter(e) {

        const filterBtns = document.querySelectorAll('.filters-btn');
        const projectBtns = document.querySelectorAll('.projects-name');

        filterBtns.forEach(item => {
            item.classList.remove('clicked');
        });

        projectBtns.forEach(item => {
            item.classList.remove('clicked');
        });

        e.target.classList.add('clicked');
    }

    function renderEmptyProject(todos, listContainer) {

        const contentContainer = document.getElementById('content');
        const emptyContainer = document.querySelector('.empty-project-card');
        const emptyExit = document.getElementById('empty-cancel');
        const emptyTitle = document.querySelector('.empty-name');
        const emptyAdd = document.querySelector('.empty-add');
        const deleteProject = document.querySelector('.empty-delete');
        const addNewCard = document.querySelector('.add-new-card');

        emptyTitle.innerHTML = '';
        emptyTitle.textContent = e.target.textContent;

        emptyContainer.style.display = 'flex';
        contentContainer.classList.add('blur');

        emptyExit.addEventListener('click', () => {
            emptyContainer.style.display = 'none';
            contentContainer.classList.remove('blur');
        });

        emptyAdd.addEventListener('click', () => {
            emptyContainer.style.display = 'none';
            addNewCard.style.display = 'grid';
        })

        deleteProject.addEventListener('click', () => {
            delete todos[manageData.getSelectedProject()];
            localStorage.setItem('todos', JSON.stringify(todos));
            renderProjectList(todos, listContainer);
            manageData.setSelectedProject('all');
            renderAllTodos(todos, listContainer);
            const allProjects = document.querySelector('.all-btn');
            allProjects.classList.add('clicked');
            emptyContainer.style.display = 'none';
            contentContainer.classList.remove('blur');
        });
    }

    function manageTodosRender(e, todos, listContainer) {

        if (['All', 'Today'].includes(e.target.textContent)) {
            manageData.setSelectedProject(e.target.textContent.toLowerCase());
        } else if (['This week'].includes(e.target.textContent)) {
            manageData.setSelectedProject('week');
        } else {
            manageData.setSelectedProject(e.target.textContent);
        }

        if (manageData.getSelectedProject() === 'all') {
            renderAllTodos(todos, listContainer);
            highlightSelectedFilter(e);
        } else {
            renderProjectTodos(todos, listContainer);
            highlightSelectedFilter(e);
        }

        if (!['all', 'today', 'week'].includes(manageData.getSelectedProject())) {
            if (todos[manageData.getSelectedProject()].length < 1) {
                renderEmptyProject(todos, listContainer);
            }
        }
    }

    function renderAllTodos(todos, listContainer) {

        listContainer.innerHTML = '';

        for (const project in todos) {
            todos[project].forEach((todo, i) => {

                const todoItem = document.createElement('div');
                todoItem.classList.add('list-item');
                todoItem.classList.add(`${todo.priority}-priority`);
                todoItem.setAttribute('data-index', i);
                todoItem.setAttribute('data-project', `${todo.project}`);

                const itemLeft = document.createElement('div');
                itemLeft.classList.add('item-left');

                const checkboxBtn = document.createElement('button');
                checkboxBtn.classList.add('item-check');
                checkboxBtn.addEventListener('click', e => toggleTodoCheckbox(e, todos, listContainer));

                const checkboxIcon = document.createElement('i');
                checkboxIcon.classList.add('fa-regular', 'fa-square');
                checkboxIcon.addEventListener('click', e => toggleTodoCheckbox(e, todos, listContainer));
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
                notesBtn.addEventListener('click', e => renderNotesCard(e, todos[project]));

                const dateText = document.createElement('p');
                dateText.classList.add('item-date');
                const dateObject = new Date(todo.dueDate);
                const month = format(dateObject, 'Mmm');
                const day = format(dateObject, 'do');
                dateText.textContent = `${month} ${day}`;

                const editBtn = document.createElement('button');
                editBtn.classList.add('item-edit');
                editBtn.addEventListener('click', e => renderEditCard(e, todos[project], listContainer));

                const editIcon = document.createElement('i');
                editIcon.classList.add('fa-solid', 'fa-pen-to-square');
                editIcon.addEventListener('click', e => renderEditCard(e, todos[project], listContainer));
                editBtn.appendChild(editIcon);

                const deleteBtn = document.createElement('button');
                deleteBtn.classList.add('item-delete');
                deleteBtn.addEventListener('click', e => manageData.deleteTodo(e, todos, listContainer));

                const deleteIcon = document.createElement('i');
                deleteIcon.classList.add('fa-solid', 'fa-trash-can');
                deleteIcon.addEventListener('click', e => manageData.deleteTodo(e, todos, listContainer));
                deleteBtn.appendChild(deleteIcon);
                itemRight.appendChild(notesBtn);
                itemRight.appendChild(dateText);
                itemRight.appendChild(editBtn);
                itemRight.appendChild(deleteBtn);

                todoItem.appendChild(itemLeft);
                todoItem.appendChild(itemRight);

                if (todo.checked) {
                    toggleTodoReload(todoItem);
                };
                
                listContainer.appendChild(todoItem);
            });
        }
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function renderProjectTodos(todos, listContainer) {

        const todoList = todos[manageData.getSelectedProject()];

        listContainer.innerHTML = '';

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
            checkboxBtn.addEventListener('click', e => toggleTodoCheckbox(e, todos, listContainer));

            const checkboxIcon = document.createElement('i');
            checkboxIcon.classList.add('fa-regular', 'fa-square');
            checkboxIcon.addEventListener('click', e => toggleTodoCheckbox(e, todos, listContainer));
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
            const month = format(dateObject, 'MMM');
            const day = format(dateObject, 'do');
            dateText.textContent = `${month} ${day}`;

            const editBtn = document.createElement('button');
            editBtn.classList.add('item-edit');
            editBtn.addEventListener('click', e => renderEditCard(e, todoList, listContainer));

            const editIcon = document.createElement('i');
            editIcon.classList.add('fa-solid', 'fa-pen-to-square');
            editIcon.addEventListener('click', e => renderEditCard(e, todoList, listContainer));
            editBtn.appendChild(editIcon);

            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('item-delete');
            deleteBtn.addEventListener('click', e => manageData.deleteTodo(e, todos, listContainer));

            const deleteIcon = document.createElement('i');
            deleteIcon.classList.add('fa-solid', 'fa-trash-can');
            deleteIcon.addEventListener('click', e => manageData.deleteTodo(e, todos, listContainer));
            deleteBtn.appendChild(deleteIcon);
            itemRight.appendChild(notesBtn);
            itemRight.appendChild(dateText);
            itemRight.appendChild(editBtn);
            itemRight.appendChild(deleteBtn);

            todoItem.appendChild(itemLeft);
            todoItem.appendChild(itemRight);

            if (todo.checked) {
                toggleTodoReload(todoItem);
            };

            listContainer.appendChild(todoItem);
        });

        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function toggleTodoCheckbox(e, todos, listContainer) {
        
        let checkedTodo;
        let checkbox;

        if (e.target.tagName === 'BUTTON') {
            checkedTodo = e.target.parentElement.parentElement;
            checkbox = e.target.children[0];
        } else if (e.target.tagName === 'I') {
            checkedTodo = e.target.parentElement.parentElement.parentElement;
            checkbox = e.target;
        }

        const todoItems = checkedTodo.children;
        const itemsLeft = todoItems[0];
        const itemsRight = todoItems[1];
        const itemTitle = itemsLeft.children[1];
        const itemNotes = itemsRight.children[0];
        const itemDate = itemsRight.children[1];
        const itemEdit = itemsRight.children[2];

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

        const item = checkedTodo.dataset.index;
        const project = checkedTodo.dataset.project;

        todos[project][item].checked = !todos[project][item].checked;

        localStorage.setItem('todos', JSON.stringify(todos));

        renderProjectList(todos, listContainer);
    }

    function toggleTodoReload(todoItem) {

        const todoItems = todoItem.children;
        const itemsLeft = todoItems[0];
        const itemsRight = todoItems[1];
        const checkbox = itemsLeft.children[0].children[0];
        const itemTitle = itemsLeft.children[1];
        const itemNotes = itemsRight.children[0];
        const itemDate = itemsRight.children[1];
        const itemEdit = itemsRight.children[2]; 

        if (checkbox.classList.contains('fa-square')) {
            checkbox.classList.remove('fa-square');
            checkbox.classList.add('fa-square-check');
        } 

        itemTitle.classList.toggle('selected');
        itemTitle.classList.toggle('strike');
        itemNotes.classList.toggle('done');
        itemDate.classList.toggle('selected');
        itemEdit.classList.toggle('selected');
    }

    function renderNotesCard(e, todos) {
        
        const item = e.target.parentElement.dataset.index;
        const notesCard = document.querySelector('.notes-card');
        const notesTitle = document.querySelector('.notes-header');
        const notesProject = document.querySelector('.notes-todo');
        const notesDueDate = document.querySelector('.notes-date');
        const notesPriority = document.querySelector('.notes-priority');
        const notesDetails = document.querySelector('.notes-details');
        const contentContainer = document.getElementById('content');

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
        notesPriority.textContent = todos[item].priority[0].toUpperCase() + todos[item].priority.slice(1);
        notesDetails.textContent = todos[item].details;

        notesCard.style.display = 'flex';
        contentContainer.classList.add('blur');
    }

    function renderEditCard(e, todos) {

        let item;
        let project;

        if (e.target.tagName === 'BUTTON') {
            item = element.parentElement.dataset.index;
            project = element.parentElement.dataset.project;
        } else if (e.target.tagName === 'I') {
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
        const editLow = document.getElementById('edit-low');
        const editMedium = document.getElementById('edit-medium');
        const editHigh = document.getElementById('edit-high');

        editTitle.innerHTML = '';
        editDetails.innerHTML = '';

        editTitle.dataset.index = item;
        editTitle.dataset.project = project;

        editTitle.textContent = todos[item].title;
        editDetails.textContent = todos[item].details;

        editDueDate.removeAttribute('value');
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

        editLow.addEventListener('click', () => {
            if (editPriorityLow.classList.contains('low')) {
                editPriorityLow.classList.remove('low');
                editPriorityLow.classList.add('low-checked');
            }
            if (editPriorityMedium.classList.contains('medium-checked')) {
                editPriorityMedium.classList.remove('medium-checked');
                editPriorityMedium.classList.add('medium');
            }
            if (editPriorityHigh.classList.contains('high-checked')) {
                editPriorityHigh.classList.remove('high-checked');
                editPriorityHigh.classList.add('high');
            }
        });

        editMedium.addEventListener('click', () => {
            if (editPriorityLow.classList.contains('low-checked')) {
                editPriorityLow.classList.remove('low-checked');
                editPriorityLow.classList.add('low');
            }
            if (editPriorityMedium.classList.contains('medium')) {
                editPriorityMedium.classList.remove('medium');
                editPriorityMedium.classList.add('medium-checked');
            }
            if (editPriorityHigh.classList.contains('high-checked')) {
                editPriorityHigh.classList.remove('high-checked');
                editPriorityHigh.classList.add('high');
            }
        });

        editHigh.addEventListener('click', () => {
            if (editPriorityLow.classList.contains('low-checked')) {
                editPriorityLow.classList.remove('low-checked');
                editPriorityLow.classList.add('low');
            }
            if (editPriorityMedium.classList.contains('medium-checked')) {
                editPriorityMedium.classList.remove('medium-checked');
                editPriorityMedium.classList.add('medium');
            }
            if (editPriorityHigh.classList.contains('high')) {
                editPriorityHigh.classList.remove('high');
                editPriorityHigh.classList.add('high-checked');
            }
        });
    }

    return {
        renderProjectList,
        highlightSelectedFilter,
        renderEmptyProject,
        manageTodosRender,
        renderAllTodos,
        renderProjectTodos,
        toggleTodoCheckbox,
        renderNotesCard,
        renderEditCard
    };
})();