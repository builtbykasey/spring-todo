document.getElementById('add-button').addEventListener('click', function() {
  var value = document.getElementById('task-input').value;
  if (value) {
    addTask(value);
  }
});

document.getElementById('task-input').addEventListener('keydown', function (event) {
  var value = this.value;
  if (event.code === 'Enter' && value) {
    addTask(value);
  }
});

function addTask(value) {
  addTaskToDOM(value);
  document.getElementById('task-input').value = '';
}

function deleteTask() {
  var task = this.parentNode.parentNode;
  var parent = task.parentNode;

  parent.removeChild(task);
}

function completeTask() {
  var task = this.parentNode.parentNode;
  var parent = task.parentNode;
  var id = parent.id;

  if (id === 'todo') {
    target = document.getElementById('completed');
  } else {
    target = document.getElementById('todo');
  }

  parent.removeChild(task);
  target.insertBefore(task, target.childNodes[0]);
}

function addTaskToDOM(text) {
  var list = document.getElementById('todo');

  var task = document.createElement('li');
  task.innerText = text;

  var buttons = document.createElement('div');
  buttons.classList.add('buttons');

  var deleteButton = document.createElement('button');
  deleteButton.classList.add('delete');
  deleteButton.innerHTML = 'Delete';

  deleteButton.addEventListener('click', deleteTask)

  var completeButton = document.createElement('button');
  completeButton.classList.add('delete');
  completeButton.innerHTML = 'Complete';

  completeButton.addEventListener('click', completeTask)


  buttons.appendChild(deleteButton);
  buttons.appendChild(completeButton);
  task.appendChild(buttons);

  list.insertBefore(task, list.childNodes[0]);
}
