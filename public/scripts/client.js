$(function() {
  getList();

  $('#add-task').on('submit', addTask);

  $('#task-list').on('click', '.complete', updateTask);
});


function getList() {
  $.ajax({
    type: 'GET',
    url: '/to_do',
    success: displayTasks
  });
}
var $li = $('<li></li>');

function displayTasks(response) {
  console.log(response);
  var $list = $('#task-list');
  $list.empty();
  response.forEach(function(list) {
    var $form = $('<form></form>');

    $form.append('<li id="' + list.id + '">' + list.task + '</li>');

    var $completeButton = $('<button class="complete"></button>');
    $completeButton.data('id', list.id);
    $form.append($completeButton);

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

  $li.data('id', list.id).css('background-color', 'grey');

  console.log('data', data);
  $.ajax({
    type: 'PUT',
    url: '/to_do/' + $button.data('id'),
    data: data,
    success: getList


  });
}
