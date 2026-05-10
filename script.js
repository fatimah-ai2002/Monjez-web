let tasks = [];

function addNewTask() {
    const input = document.getElementById('taskInput');
    if (input.value.trim() === "") return;

    const task = {
        id: Date.now(),
        title: input.value,
        seconds: 0,
        isRunning: false,
        interval: null,
        isCompleted: false
    };

    tasks.push(task);
    renderTasks();
    input.value = "";
}

function renderTasks() {
    const container = document.getElementById('tasksContainer');
    container.innerHTML = "";

    tasks.forEach(task => {
        const card = document.createElement('div');
        card.className = `task-card ${task.isRunning ? 'active' : ''} ${task.isCompleted ? 'completed' : ''}`;
        
        card.innerHTML = `
            <div class="task-info">
                <h3>${task.title}</h3>
                <div class="timer-display">${formatTime(task.seconds)}</div>
            </div>
            <div class="controls">
                ${!task.isCompleted ? `
                    <button class="start-btn" onclick="startTask(${task.id})" style="display: ${task.isRunning ? 'none' : 'inline'}"><i class="fas fa-play"></i></button>
                    <button class="stop-btn" onclick="stopTask(${task.id})" style="display: ${task.isRunning ? 'inline' : 'none'}"><i class="fas fa-pause"></i></button>
                    <button class="check-btn" onclick="completeTask(${task.id})"><i class="fas fa-check-circle"></i></button>
                ` : '<span>تم الإنجاز ✅</span>'}
                <button onclick="deleteTask(${task.id})"><i class="fas fa-trash"></i></button>
            </div>
        `;
        container.appendChild(card);
    });
}

function formatTime(totalSeconds) {
    const hrs = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const mins = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (totalSeconds % 60).toString().padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
}

function startTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task && !task.isRunning) {
        // إيقاف أي مهمة أخرى تعمل حالياً (اختياري - للتركيز على مهمة واحدة)
        tasks.forEach(t => stopTask(t.id)); 
        
        task.isRunning = true;
        task.interval = setInterval(() => {
            task.seconds++;
            renderTasks();
        }, 1000);
        renderTasks();
    }
}

function stopTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task && task.isRunning) {
        task.isRunning = false;
        clearInterval(task.interval);
        renderTasks();
    }
}

function completeTask(id) {
    const task = tasks.find(t => t.id === id);
    stopTask(id);
    task.isCompleted = true;
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
}