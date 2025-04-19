import { saveState } from './storage.js';
import { updateCounts } from './dom.js';

export function renderTask(Task, isCompleted = false) {
    const taskList = document.querySelector(".task-list");
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checktask';
    checkbox.checked = isCompleted;

    const span = document.createElement('span');
    span.textContent = Task;

    const editImg = document.createElement('img');
    editImg.src = "Assets/edit.svg";
    editImg.className = "Edit";
    editImg.alt = "Edit";
    editImg.title = "Edit";

    const deleteImg = document.createElement('img');
    deleteImg.src = "Assets/trash.svg";
    deleteImg.className = "Delete";
    deleteImg.alt = "Delete";
    deleteImg.title = "Delete";

    if (isCompleted) {
        li.classList.add('done');
    }


    li.append(checkbox, span, editImg, deleteImg);
    taskList.appendChild(li);
    updateCounts();
    saveState();
}

export function setupTaskEvents() {
    const addBtn = document.querySelector(".add-btn");
    const input = document.querySelector("textarea");
    const indicater = document.querySelector(".indicater");
    const themeBtn = document.querySelector(".theme-box");


    function handleNewTask() {
        const Task = input.value.trim();
        if (Task) {
            renderTask(Task);
            input.value = "";
            indicater.textContent = "New Task Added";
            if (themeBtn.textContent === "Dark") {
                indicater.style.color = "#0f9600";
            } else {
                indicater.style.color = "#04dd1a";
            }
            updateCounts();
        }
        setTimeout(() => {
            indicater.textContent = "";
        }, 2000);
    }

    addBtn.addEventListener("click", handleNewTask);


    //Add new task by pressing enter key
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleNewTask();
        }
    });



    //Task manipulation
    const taskList = document.querySelector(".task-list");
    taskList.addEventListener("click", (e) => {

        const li = e.target.closest("li");

        // Remove task using event delegation by clicking on trash icon.
        if (e.target.classList.contains("Delete")) {
            if (confirm("do you want delete this task?")) {
                li.remove();
                updateCounts();
                saveState();
            }
        }


        //Event Listener for make task editable by clicking on edit icon.
        if (e.target.classList.contains("Edit")) {
            const span = li.querySelector("span");
            const checkbox = li.querySelector("input");

            if (!checkbox.checked) {
                span.contentEditable = true;
                span.focus();


                //save edited task by clicking outside of target li
                span.addEventListener("blur", () => {
                    span.contentEditable = false;
                    saveState();
                }, { once: true });


                //save edited task by pressing enter key
                span.addEventListener("keydown", (e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        span.contentEditable = false;
                        saveState();
                    }
                })
            }
        }
    });


    // Add line-through on completed task
    taskList.addEventListener("change", (e) => {

        const li = e.target.closest("li");

        if (e.target.type === "checkbox") {

            li.classList.toggle("done", e.target.checked);
            updateCounts();
            saveState();
        }
    });




    //Clear All tasks by clicking clear button
    function clearAllTask() {
        
        if (taskList.children.length > 0) {
            taskList.innerHTML = "";
            updateCounts();
            saveState();
            indicater.textContent = "All Tasks Cleared!";
            indicater.style.color = "red";
            setTimeout(() => {
                indicater.textContent = "";
            }, 2000);
        } else {
            indicater.textContent = "Please Add Task First!";
            indicater.style.color = "red";
            setTimeout(() => {
                indicater.textContent = "";
            }, 2000);
        }
        
    }
    
    const clearbtn = document.querySelector(".clear-btn");
    clearbtn.addEventListener('click', clearAllTask);
}
