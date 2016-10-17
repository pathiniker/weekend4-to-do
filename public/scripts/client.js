$(function() {
  getList();

  $('#add-task').on('submit', addTask);

  $('#task-list').on('click', '.complete', completeTask);
  $('#task-list').on('click', '.delete', deleteTask);
});

// return completed to below
// use ORDER BY



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
    // var $div = $('<div></div>');
    // $div.response('id', list.id);
    // $div.text.(list.task);
    // $('#task-list').append($div);
    var $form = $('<form></form>');
    var $li = $('<li></li>');

    $form.append('<li id="' + list.id + '">' + list.task + '</li>');

    var $completeButton = $('<button class="complete">&#10003;</button></button>').data('id', list.id);
    // $completeButton.data('id', list.id);
    $form.append($completeButton);

    // if(task.is_complete){
    // $div.append('You did it!');
    // } else {
    // $div.append('<button class="addNewTask">Complete</button>');
  // }

    var $deleteButton = $('<button class="delete">X</button>').data('id', list.id);
    console.log(list.id);
    // $deleteButton.data('id', list.id);
    $form.append($deleteButton);

    $li.append($form);
    $list.append($li);
    console.log($('.delete').data('id'));
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


function completeTask(event) {
  event.preventDefault();

  var $button = $(this);
  var $form = $button.closest('form');

  // var idToComplete = $(this).parent().data('id');
  // console.log('We are completing task ', idToComplete);
  // completeTask(idToComplete);

  //

  var data = $form.serialize();

  // $(this).css('background-color', '#46fc4f');

  console.log('data', data);
  $.ajax({
    type: 'PUT',
    url: '/to_do/' + $button.data('id'), // url: '/completeTask'
    data: data, // { id },
    success: getList


  });
}

function deleteTask(event) {
  event.preventDefault();

  var taskId = $(this).data('id');
  console.log(taskId, 'taskId');
  console.log($(this).data());

  $.ajax({
    type: 'DELETE',
    url: '/to_do/' + taskId,
    success: getList
  });
}
