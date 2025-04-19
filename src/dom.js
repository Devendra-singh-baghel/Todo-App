const completed = document.querySelector(".completed");
const pending = document.querySelector(".pending");

export function updateCounts() {

    const checks = document.querySelectorAll('.checktask');

    let pendingTask = [...checks].filter(c => !c.checked).length;
    let completedTask = checks.length - pendingTask;

    completed.textContent = completedTask === 0 ? `No Completed Task` : `Completed: ${completedTask}`;
    pending.textContent = pendingTask === 0 ? `No Pending Task` : `Pending: ${pendingTask}`;
}



// Load filter value from localStorage
export function handleFilter() {
    const filterTask = document.querySelector(".filter-task");
    const savedFilter = localStorage.getItem("currentFilter") || "all";
    filterTask.value = savedFilter;
    applyFilter();



    filterTask.addEventListener('change', () => {
        const filter = filterTask.value;
        localStorage.setItem("currentFilter", filter);
        applyFilter();
    });


    function applyFilter() {

        const list = document.querySelectorAll(".task-list li");
        const filter = filterTask.value;


        switch (filter) {
            case 'complete':
                pending.style.display = 'none';
                completed.style.display = 'block';
                break;

            case 'pending':
                pending.style.display = 'block';
                completed.style.display = 'none';
                break;

            default:
                pending.style.display = 'block';
                completed.style.display = 'block';
                break;
        }



        list.forEach((li) => {
            const isDone = li.classList.contains("done");

            // Set task visibility based on filter
            switch (filter) {
                case 'complete':
                    li.style.display = isDone ? 'flex' : 'none';
                    break;

                case 'pending':
                    li.style.display = !isDone ? 'flex' : 'none';
                    break;

                default:
                    li.style.display = 'flex';
                    break;
            }
        });
    }

    if (!filterTask || !list || !pending || !completed) return;
}