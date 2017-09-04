// Data object for storing todo and completed arrays
var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')):{
  todo: [],
  completed: []
};

// Call to render any tasks from data object
renderTodoList();

//User pressed "Enter" to add task
//If value in input field, add that value to todo list
//Call todoModal to popup modal if 5 tasks have been added
document.getElementById('task-input').addEventListener('keydown', function (event) {
  var value = this.value;
  console.log(event);
  if (event.keyCode === 13 && value) {
    addTask(value);
    todoModal();
  }
});

// Render tasks from data object
function renderTodoList() {
  if (!data.todo.length && !data.completed.length) return;

  for (var i = 0; i < data.todo.length; i++) {
    var value = data.todo[i];
    addTaskToDOM(value);
  }

  for (var j = 0; j < data.completed.length; j++) {
    var value = data.completed[j];
    addTaskToDOM(value, true);
  }
}

// Store data object in localStorage
function updateLocalStorage() {
  localStorage.setItem('todoList', JSON.stringify(data));
}

// Modal to popup when 5 tasks added
function todoModal() {
  if (data.todo.length === 5) {
    $('#todo-modal').foundation('open');
  }
}

// Modal to popup when 5 tasks completed
function completedModal() {
  if (data.completed.length === 5) {
    $('#completed-modal').foundation('open');
  }
}

// Add task to todo list
function addTask(value) {
  addTaskToDOM(value);
  document.getElementById('task-input').value = '';

  data.todo.push(value);
  updateLocalStorage();
}

// Delete task from either todo or completed list
function deleteTask() {
  var task = this.parentNode.parentNode.parentNode;
  var parent = task.parentNode;
  var id = parent.id;
  var value = task.innerText;

  if (id === 'todo') {
    data.todo.splice(data.todo.indexOf(value), 1);
  } else {
    data.completed.splice(data.completed.indexOf(value), 1);
  }
  updateLocalStorage();

  parent.removeChild(task);
}

// Toggle completed button between ToDo and Completed
// Remove from current list and push to opposite list
// Call completeModal when tasks marked completeModal
// Call todoModal when taks marked incomplete
function completeTask() {
  var task = this.parentNode.parentNode.parentNode;
  var parent = task.parentNode;
  var id = parent.id;
  var value = task.innerText;

  if (id === 'todo') {
    data.todo.splice(data.todo.indexOf(value), 1);
    data.completed.push(value);
    completedModal();
  } else {
    data.completed.splice(data.completed.indexOf(value), 1);
    data.todo.push(value);
    todoModal();
  }
  updateLocalStorage();

  // Check if task should be added to ToDo or Completed lists
  var target = (id === 'todo') ? document.getElementById('completed'):document.getElementById('todo');

  parent.removeChild(task);
  target.insertBefore(task, target.childNodes[0]);
}

// Create task in HTML
function addTaskToDOM(item, completed) {
  var list = (completed) ? document.getElementById('completed'):document.getElementById('todo');
  var task = document.createElement('li');
  var taskContent = document.createElement('div');
  taskContent.classList.add('task-content');

  // Content div for Complete button and Task text
  var leftContent = document.createElement('div');
  leftContent.classList.add('left-content');
  var completeButton = document.createElement('button');
  completeButton.classList.add('complete');
  // Create checkmark
  var iComplete = document.createElement('i');
  iComplete.classList.add('fa');
  iComplete.classList.add('fa-check');
  // Click event for completing a task
  completeButton.addEventListener('click', completeTask)
  var taskText = document.createElement('span');

  // Content div for Delete button
  var rightContent = document.createElement('div');
  rightContent.classList.add('right-content');
  var deleteButton = document.createElement('button');
  deleteButton.classList.add('delete');
  // Create "x" for delete button
  var iDelete = document.createElement('i');
  iDelete.classList.add('fa');
  iDelete.classList.add('fa-times');
  // Click event for deleting a task
  deleteButton.addEventListener('click', deleteTask)

  taskText.appendChild(document.createTextNode(item));

  leftContent.appendChild(completeButton);
  completeButton.appendChild(iComplete);
  leftContent.appendChild(taskText);
  rightContent.appendChild(deleteButton);
  deleteButton.appendChild(iDelete);

  taskContent.appendChild(leftContent);
  taskContent.appendChild(rightContent);

  task.appendChild(taskContent);
  
  // Add to top of list
  list.insertBefore(task, list.childNodes[0]);
}
