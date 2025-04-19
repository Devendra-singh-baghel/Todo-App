import { renderTask } from './taskManager.js';

export function saveState() {
    const tasks = [];
    const taskList = document.querySelectorAll(".task-list li")
    taskList.forEach((li) => {
        tasks.push({
            text: li.querySelector("span").textContent,
            completed: li.querySelector(".checktask").checked,
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function loadState() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        renderTask(task.text, task.completed);
    });
}