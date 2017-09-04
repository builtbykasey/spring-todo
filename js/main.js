// document.getElementById('add-button').addEventListener('click', function() {
//   var value = document.getElementById('task-input').value;
//   if (value) {
//     addTask(value);
//   }
// });

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
  var task = this.parentNode.parentNode.parentNode;
  var parent = task.parentNode;

  parent.removeChild(task);
}

function completeTask() {
  var task = this.parentNode.parentNode.parentNode;
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

function addTaskToDOM(item) {
  var list = document.getElementById('todo');
  var task = document.createElement('li');
  var taskContent = document.createElement('div');
  taskContent.classList.add('task-content');
  var leftContent = document.createElement('div');
  leftContent.classList.add('left-content');
  var completeButton = document.createElement('button');
  completeButton.classList.add('complete');
  var iComplete = document.createElement('i');
  iComplete.classList.add('fa');
  iComplete.classList.add('fa-check');

  completeButton.addEventListener('click', completeTask)

  var taskText = document.createElement('span');

  var rightContent = document.createElement('div');
  rightContent.classList.add('right-content');
  var deleteButton = document.createElement('button');
  deleteButton.classList.add('delete');
  var iDelete = document.createElement('i');
  iDelete.classList.add('fa');
  iDelete.classList.add('fa-times');

  deleteButton.addEventListener('click', deleteTask)

  taskText.appendChild(document.createTextNode(item));

  leftContent.appendChild(completeButton);
  completeButton.appendChild(iComplete);
  leftContent.appendChild(taskText);
  rightContent.appendChild(deleteButton);
  deleteButton.appendChild(iDelete);

  taskContent.appendChild(leftContent);
  taskContent.appendChild(rightContent);

  // taskContent.appendChild(taskText);
  // taskContent.appendChild(deleteButton);

  task.appendChild(taskContent);

  list.insertBefore(task, list.childNodes[0]);
}

// function addTaskToDOM(text) {
//   var list = document.getElementById('todo');
//
//   var task = document.createElement('li');
//   task.innerText = text;
//
//   var buttons = document.createElement('div');
//   buttons.classList.add('buttons');
//
//   var deleteButton = document.createElement('button');
//   deleteButton.classList.add('delete');
//
//   var iDelete = document.createElement('i');
//   iDelete.classList.add('fa');
//   iDelete.classList.add('fa-times');
//
//   deleteButton.addEventListener('click', deleteTask)
//
//   var completeButton = document.createElement('button');
//   completeButton.classList.add('complete');
//
//   var iComplete = document.createElement('i');
//   iComplete.classList.add('fa');
//   iComplete.classList.add('fa-check');
//
//   completeButton.addEventListener('click', completeTask)
//
//
//   buttons.appendChild(deleteButton);
//   deleteButton.appendChild(iDelete);
//   buttons.appendChild(completeButton);
//   completeButton.appendChild(iComplete);
//   task.appendChild(buttons);
//
//   list.insertBefore(task, list.childNodes[0]);
// }
