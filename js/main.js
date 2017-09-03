document.getElementById('add-button').addEventListener('click', function() {
  var value = document.getElementById('task-input').value;
  if (value) {
    addTask(value);
    document.getElementById('task-input').value = '';
  }
});

function addTask(text) {
  var list = document.getElementById('todo');

  var task = document.createElement('li');
  task.innerText = text;

  list.insertBefore(task, list.childNodes[0]);
}
