class Task {
  constructor(title, description, priority, dueDate) {
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.dueDate = dueDate;
    this.completed = false;
  }

  markCompleted() {
    this.completed = true;
  }

  edit(title, description, priority, dueDate) {
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.dueDate = dueDate;
  }

  deleteTask() {
    return this;
  }
}

class TaskList {
  constructor() {
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
  }

  filterAll() {
    return this.tasks;
  }

  filterPending() {
    return this.tasks.filter(task => !task.completed);
  }

  filterCompleted() {
    return this.tasks.filter(task => task.completed);
  }

  getTaskCount() {
    return this.tasks.length;
  }

  getCompletionProgress() {
    const completedTasks = this.tasks.filter(task => task.completed);
    return (completedTasks.length / this.tasks.length) * 100;
  }
}

class App {
  constructor() {
    this.taskList = new TaskList();
    this.taskForm = document.getElementById('task-form');
    this.taskListElement = document.getElementById('task-list');
    this.filterButtons = document.querySelectorAll('#filter-buttons button');
    this.taskForm.addEventListener('submit', this.addTask.bind(this));
    this.filterButtons.forEach(button => button.addEventListener('click', this.filterTask.bind(this, button.dataset.filter)));    }

  addTask(event) {
    event.preventDefault();
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
    const priority = document.getElementById('task-priority').value;
    const dueDate = document.getElementById('task-due-date').value;
    const task = new Task(title, description, priority, dueDate);
    this.taskList.addTask(task);
    this.renderTaskList();
    this.renderTaskForm();
  }

  filterTask(filter) {
    const filteredTasks = this.taskList.filterAll().filter(task => task.title.includes(filter) || task.description.includes(filter));
    this.taskListElement.innerHTML = ''; 
    filteredTasks.forEach(task => this.renderTaskElement(task));
  }

  markTaskCompleted(task) {
    task.markCompleted();
    this.renderTaskElement(task);
    this.renderTaskList();
  }

  editTask(task) {
    const titleInput = document.getElementById('task-title-edit');
    const descriptionInput = document.getElementById('task-description-edit');
    const priorityInput = document.getElementById('task-priority-edit');
    const dueDateInput = document.getElementById('task-due-date-edit');
    titleInput.value = task.title;
    descriptionInput.value = task.description;
    priorityInput.value = task.priority;
    dueDateInput.value = task.dueDate;
    const taskElement = document.getElementById(`task-${task.id}`);
    taskElement.innerHTML = `<h2>${task.title}</h2><p>${task.description}</p><p>Priority: ${task.priority}</p><p>Due Date: ${task.dueDate}</p><button class="delete-task">Delete</button>`;
  }

  deleteTask(task) {
    task.deleteTask();
    this.renderTaskList();
  }
}

const app = new App();
app.loadTasks(JSON.parse(data));
app.renderTaskList();
app.renderTaskForm();
