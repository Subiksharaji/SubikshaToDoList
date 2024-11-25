const calendarIcon = document.querySelector('.calendar-icon');
const calendarDropdown = document.querySelector('.calendar-dropdown');
const plusIcon = document.querySelector('.plus-icon');
const taskInput = document.querySelector('.task-input');
const taskList = document.querySelector('.tasks-list');
const bullets = document.querySelectorAll('.bullet');
const categories = document.querySelectorAll('.category');
const selectedCategoryText = document.getElementById('selected-category');
const calendarTimeInput = document.getElementById('calendar-time');

let selectedBulletColor = '#FD99AF';

function formatTimeTo12Hr(time) {
    let hours = time.getHours();
    let minutes = time.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
}

$(document).ready(function () {
    $('#calendar-time').timepicker({
        timeFormat: 'h:mm p',
        interval: 15,
        minTime: '12:00am',
        maxTime: '11:59pm',
        defaultTime: '8:00am',
        dynamic: false,
        dropdown: true,
        scrollbar: true
    });

    calendarTimeInput.addEventListener('focus', () => {
        const currentTime = new Date();
        calendarTimeInput.value = formatTimeTo12Hr(currentTime);
    });
});

calendarIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    calendarDropdown.classList.toggle('visible');
});

bullets.forEach(bullet => {
    bullet.addEventListener('click', () => {
        bullets.forEach(b => b.classList.remove('selected'));
        bullet.classList.add('selected');
        selectedBulletColor = bullet.style.background;
    });
});

plusIcon.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    const taskTime = calendarTimeInput.value;

    if (taskText && taskTime) {
        const newTask = document.createElement('div');
        newTask.classList.add('task-item');
        newTask.innerHTML = `
            <span class="bullet" style="background: ${selectedBulletColor};"></span>
            <div class="task-content">${taskText}</div>
            <div class="task-time">${taskTime}</div>
            <div class="task-check"></div>
        `;
        taskList.appendChild(newTask);
        taskInput.value = '';
        calendarTimeInput.value = '';
        const taskCheck = newTask.querySelector('.task-check');
        taskCheck.addEventListener('click', () => {
            taskCheck.classList.toggle('completed');
        });
        calendarDropdown.classList.remove('visible');
    } else {
        alert('Please enter a task and time!');
    }
});

categories.forEach(category => {
    category.addEventListener('click', () => {
        const categoryBulletColor = category.querySelector('.bullet').style.background;
        filterTasksByCategory(categoryBulletColor);
    }); 
});

function displayTasksByCategory(categoryBulletColor) {
    const tasks = document.querySelectorAll('.task-item');
    tasks.forEach(task => {
        const taskBulletColor = task.querySelector('.bullet').style.background;
        task.style.display = (taskBulletColor === categoryBulletColor) ? 'block' : 'none';
    });
    document.getElementById('task-input').style.display = 'none';
    document.getElementById('categories').style.display = 'block';
}

function showTodayTasks() {
    document.getElementById('task-input').style.display = 'block';
    document.getElementById('categories').style.display = 'none';
    document.querySelectorAll('.task-item').forEach(task => {
        task.style.display = 'block';
    });
}

document.querySelector('.nav-item[data-view="today"]').addEventListener('click', () => {
    showTodayTasks();
});

$(document).ready(function () {
    $(".nav-item").on("click", function () {
        var view = $(this).data("view");
        $(".view").hide();
        $("#" + view + "-view").show();
    });
});
