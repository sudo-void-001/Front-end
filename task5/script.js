/**
 * VENA VIDI VICI - Task Manager
 * JavaScript Implementation (with Glassmorphism & Sticky Notes)
 */

// --- 1. DOM References ---
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const validationMessage = document.getElementById('validation-message');
const taskSummary = document.getElementById('task-summary');

// Columns & Containers
const containers = {
    'todo': document.getElementById('container-todo'),
    'in-progress': document.getElementById('container-in-progress'),
    'completed': document.getElementById('container-completed')
};

const emptyStates = {
    'todo': document.getElementById('empty-todo'),
    'in-progress': document.getElementById('empty-in-progress'),
    'completed': document.getElementById('empty-completed')
};

const counts = {
    'todo': document.getElementById('count-todo'),
    'in-progress': document.getElementById('count-in-progress'),
    'completed': document.getElementById('count-completed')
};

const taskTemplate = document.getElementById('task-template');

// Sticky Notes DOM
const addStickyBtn = document.getElementById('add-sticky-btn');
const stickyNotesContainer = document.getElementById('sticky-notes-container');
const stickyNoteTemplate = document.getElementById('sticky-note-template');

// --- 2. Application State ---
// Tasks: { id: string, text: string, status: "todo" | "in-progress" | "completed" }
let tasks = [];
// Sticky Notes: { id: string, text: string }
let stickyNotes = [];

const nextStatus = {
    'todo': 'in-progress',
    'in-progress': 'completed',
    'completed': 'todo'
};

const icons = {
    'todo': `<svg class="icon-todo" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
             </svg>`,
    'in-progress': `<svg class="icon-in-progress" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 6v6l4 2"></path>
                    </svg>`,
    'completed': `<svg class="icon-completed" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>`
};

// --- 3. LocalStorage Functions & Migration ---
const STORAGE_KEY_TASKS = 'vena_vidi_vici_tasks';
const STORAGE_KEY_NOTES = 'vena_vidi_vici_notes';

function saveTasks() {
    try {
        localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(tasks));
    } catch (e) {
        console.error('Failed to save tasks to localStorage:', e);
    }
}

function saveNotes() {
    try {
        localStorage.setItem(STORAGE_KEY_NOTES, JSON.stringify(stickyNotes));
    } catch (e) {
        console.error('Failed to save notes to localStorage:', e);
    }
}

function loadData() {
    // Load Tasks
    try {
        const savedTasks = localStorage.getItem(STORAGE_KEY_TASKS);
        if (savedTasks) {
            const parsed = JSON.parse(savedTasks);
            if (Array.isArray(parsed)) {
                let migrated = false;
                tasks = parsed.map(task => {
                    if (task.status === undefined) {
                        migrated = true;
                        return {
                            id: task.id,
                            text: task.text,
                            status: task.completed ? 'completed' : 'todo'
                        };
                    }
                    if (task.completed !== undefined) {
                        migrated = true;
                        delete task.completed;
                    }
                    return task;
                });
                if (migrated) saveTasks();
            }
        }
    } catch (e) {
        console.error('Failed to parse tasks:', e);
        tasks = [];
    }

    // Load Notes
    try {
        const savedNotes = localStorage.getItem(STORAGE_KEY_NOTES);
        if (savedNotes) {
            const parsed = JSON.parse(savedNotes);
            if (Array.isArray(parsed)) {
                stickyNotes = parsed;
            }
        }
    } catch (e) {
        console.error('Failed to parse notes:', e);
        stickyNotes = [];
    }
}

// --- 4. Task Operations ---
function createTask(text) {
    const newTask = {
        id: Date.now().toString(),
        text: text.trim(),
        status: 'todo'
    };
    tasks.push(newTask);
    saveTasks();
    renderTasks();
}

function cycleTaskStatus(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.status = nextStatus[task.status] || 'todo';
        saveTasks();
        renderTasks();
    }
}

function deleteTask(taskId) {
    tasks = tasks.filter(t => t.id !== taskId);
    saveTasks();
    renderTasks();
}

// --- 5. Sticky Note Operations ---
function createStickyNote() {
    const newNote = {
        id: 'note_' + Date.now().toString(),
        text: ''
    };
    stickyNotes.push(newNote);
    saveNotes();
    renderNotes();
}

function updateStickyNote(noteId, text) {
    const note = stickyNotes.find(n => n.id === noteId);
    if (note) {
        note.text = text;
        saveNotes();
    }
}

function deleteStickyNote(noteId) {
    stickyNotes = stickyNotes.filter(n => n.id !== noteId);
    saveNotes();
    renderNotes();
}

// --- 6. Rendering ---
function renderTasks() {
    Object.values(containers).forEach(container => container.innerHTML = '');
    
    const groupedTasks = {
        'todo': [],
        'in-progress': [],
        'completed': []
    };
    
    tasks.forEach(task => {
        const s = groupedTasks[task.status] ? task.status : 'todo';
        groupedTasks[s].push(task);
    });

    ['todo', 'in-progress', 'completed'].forEach(status => {
        const list = groupedTasks[status];
        counts[status].textContent = list.length;
        emptyStates[status].style.display = list.length === 0 ? 'block' : 'none';
        
        list.forEach(task => {
            containers[status].appendChild(createTaskElement(task));
        });
    });

    updateSummary(groupedTasks);
}

function createTaskElement(task) {
    const taskElement = taskTemplate.content.cloneNode(true);
    const cardNode = taskElement.querySelector('.task-card');
    const textNode = taskElement.querySelector('.task-text');
    const toggleBtn = taskElement.querySelector('.btn-status-toggle');
    const deleteBtn = taskElement.querySelector('.btn-delete');
    
    textNode.textContent = task.text;
    cardNode.classList.add(task.status);
    
    toggleBtn.innerHTML = icons[task.status];
    toggleBtn.setAttribute('aria-label', `Current status: ${task.status}. Click to change.`);
    
    toggleBtn.addEventListener('click', () => cycleTaskStatus(task.id));
    deleteBtn.addEventListener('click', () => deleteTask(task.id));
    
    return taskElement;
}

function updateSummary(groupedTasks) {
    const total = tasks.length;
    const completed = groupedTasks['completed'].length;
    const active = total - completed;
    taskSummary.innerHTML = `${total} total &middot; ${active} active &middot; ${completed} completed`;
}

function renderNotes() {
    stickyNotesContainer.innerHTML = '';
    
    stickyNotes.forEach(note => {
        const noteElement = stickyNoteTemplate.content.cloneNode(true);
        const textarea = noteElement.querySelector('.sticky-text');
        const deleteBtn = noteElement.querySelector('.btn-delete-sticky');
        
        textarea.value = note.text;
        
        // Debounce or save on input
        textarea.addEventListener('input', (e) => {
            updateStickyNote(note.id, e.target.value);
        });
        
        deleteBtn.addEventListener('click', () => deleteStickyNote(note.id));
        
        stickyNotesContainer.appendChild(noteElement);
    });
}

// --- 7. Input Handling & Validation ---
function handleAddTask() {
    const text = taskInput.value.trim();
    if (!text) {
        validationMessage.classList.remove('hidden');
        return;
    }
    validationMessage.classList.add('hidden');
    createTask(text);
    taskInput.value = '';
    taskInput.focus();
}

// --- 8. Event Listeners Initialization ---
function initEventListeners() {
    addTaskBtn.addEventListener('click', handleAddTask);
    
    taskInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddTask();
        } else {
            validationMessage.classList.add('hidden');
        }
    });

    addStickyBtn.addEventListener('click', createStickyNote);
}

// --- 9. App Initialization ---
function initApp() {
    loadData();
    initEventListeners();
    renderTasks();
    renderNotes();
}

initApp();
