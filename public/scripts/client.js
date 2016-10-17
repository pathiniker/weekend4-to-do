$(function() {
  getList();

  $('#add-task').on('submit', addTask);

  $('#task-list').on('click', '.complete', updateTask);
  $('#task-list').on('click', '.delete', deleteTask);
});



function getList() {
  $.ajax({
    type: 'GET',
    url: '/to_do',
    success: displayTasks
  });
}

function displayTasks(response) {
  console.log(response);
  var $list = $('#task-list');
  $list.empty();
  response.forEach(function(list) {
    var $form = $('<form></form>');
    var $li = $('<li></li>');

    $form.append('<li id="' + list.id + '">' + list.task + '</li>');

    var $completeButton = $('<button class="complete">Complete</button></button>');
    $completeButton.data('id', list.id);
    $form.append($completeButton);

    var $deleteButton = $('<button class="delete" data-id="' + list.id + '">Delete</button>');
    $deleteButton.data('id', list.id);
    $form.append($deleteButton);

    $li.append($form);
    $list.append($li);
  });
}

function addTask(event) {
  event.preventDefault();

  var listData = $(this).serialize();

  $.ajax({
    type: 'POST',
    url: '/to_do',
    data: listData,
    success: getList
  });

  $(this).find('input').val('');
}


function updateTask(event) {
  event.preventDefault();

  var $button = $(this);
  var $form = $button.closest('form');


  var data = $form.serialize();

  $(this).css('background-color', '#46fc4f');

  console.log('data', data);
  $.ajax({
    type: 'PUT',
    url: '/to_do/' + $button.data('id'),
    data: data,
    success: getList


  });
}

function deleteTask(event) {
  event.preventDefault();

  var taskId = $(this).data('id');

  $.ajax({
    type: 'DELETE',
    url: '/to_do/' + taskId,
    success: getList
  });
}
