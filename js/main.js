var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')):{
  todo: [],
  completed: []
};

renderTodoList();

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
    console.log(data.todo.length);

    todoModal();
  }
});

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

function updateLocalStorage() {
  localStorage.setItem('todoList', JSON.stringify(data));
}

function todoModal() {
  if (data.todo.length === 5) {
    $('#todo-modal').foundation('open');
  }
}

function completedModal() {
  if (data.completed.length === 5) {
    $('#completed-modal').foundation('open');
  }
}

function addTask(value) {
  addTaskToDOM(value);
  document.getElementById('task-input').value = '';

  data.todo.push(value);
  updateLocalStorage();
}

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
  }
  updateLocalStorage();

  var target = (id === 'todo') ? document.getElementById('completed'):document.getElementById('todo');

  parent.removeChild(task);
  target.insertBefore(task, target.childNodes[0]);
}

function addTaskToDOM(item, completed) {
  var list = (completed) ? document.getElementById('completed'):document.getElementById('todo');
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
