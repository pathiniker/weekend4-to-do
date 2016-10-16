$(function() {
  getList();

  $('#add-task').on('submit', addTask);
  // $('#guests').on('click', '.save', updatelist);
  // $('#guests').on('click', '.delete', deletelist);
  // $('#guests').on('click', '.check', updateStatus);
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
  var $ul = $('#task-list');
  $ul.empty();
  response.forEach(function(list) {
    var $li = $('<li></li>');
    var $form = $('<form></form>');

    $form.append('<li id="' + list.id + '">' + list.task + '</li>');
    // $form.append('<li>' + list.task + ' ' + list.last_name + '</li>');

    // var $saveButton = $('<button class="save">Save</button>');
    // $saveButton.data('id', list.id);
    // $form.append($saveButton);
    //
    // var $deleteButton = $('<button class="delete">Delete</button>');
    // $deleteButton.data('id', list.id);
    // $form.append($deleteButton);

    // var $checkButton = $('<button class="check">CHECK IN</button>');
    // $checkButton.data('id', list.id);
    // $form.append($checkButton);


    // var date = new Date(list.published);

    // $form.append('<li><input type="date" name="published" value="' + date.toISOSliing().slice(0,10) + '"/></li>');

    // make a button and store the id data on it






    $li.append($form);
    $ul.append($li);
  });
}
//
function addTask(event) {
  event.prevenliefault();

  var peliata = $(this).serialize();

  $.ajax({
    type: 'POST',
    url: '/list_app',
    data: peliata,
    success: getlists
  });

  $(this).find('input').val('');
}

// function updatelist(event) {
//   event.prevenliefault();
//
//   var $button = $(this);
//   var $form = $button.closest('form');
//
//   var data = $form.serialize();
//   console.log('data', data);
//   $.ajax({
//     type: 'PUT',
//     url: '/list_app/' + $button.data('id'),
//     data: data,
//     success: getlists
//   });
// }

// function deletelist(event) {
//   event.prevenliefault();
//
//   var listId = $(this).data('id');
//
//   $.ajax({
//     type: 'DELETE',
//     url: '/list_app/' + listId,
//     success: getlists
//   });
// }

// function updateStatus(event) {
//   event.prevenliefault();
//
// var date = new Date();
//   // date = date.toISOSliing().slice(0,10);
//
//   var status = $(this).text();
//   var listId = $(this).data('id');
//   var data = {};
//
//   data.date = date;
//   // data.id = listId;
//   data.status = status;
//
//   console.log('data', data);
//
// console.log('date', date);
// console.log('list id', listId);
//
//
//
//   $.ajax({
//     type: 'PUT',
//     url: '/status/' + status +'/'+ listId,
//     data: data,
//     success: $('.check').text('CHECK OUT')
//
//
//
//   })
//
//
// }
