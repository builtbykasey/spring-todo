document.getElementById('add-button').addEventListener('click', function() {
  var value = document.getElementById('task-input').value;
  if (value) {
    addTask(value);
    document.getElementById('task-input').value = '';
  }
});

function deleteTask() {
  var task = this.parentNode.parentNode;
  var parent = task.parentNode;

  parent.removeChild(task);
}

function addTask(text) {
  var list = document.getElementById('todo');

  var task = document.createElement('li');
  task.innerText = text;

  var buttons = document.createElement('div');
  buttons.classList.add('buttons');

  var deleteButton = document.createElement('button');
  deleteButton.classList.add('delete');
  deleteButton.innerHTML = 'Delete';

  deleteButton.addEventListener('click', deleteTask)

  buttons.appendChild(deleteButton);
  task.appendChild(buttons);

  list.insertBefore(task, list.childNodes[0]);
}
