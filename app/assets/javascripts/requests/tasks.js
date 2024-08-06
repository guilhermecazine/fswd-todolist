$.ajaxSetup({
  headers: {
    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
  }
});

const updateList = () => {
  $('.task-container').children().remove()
  console.log('update list!')
  $.ajax({
    type: 'GET',
    url: 'api/tasks?api_key=1',
    dataType: 'json',
    success: function (response, textStatus) {
        console.log(response);
        tasksArr = response;
        let activeArr = tasksArr.tasks.filter(obj => {
          return obj.completed === false;
        });
        let completedArr = tasksArr.tasks.filter(obj => {
          return obj.completed === true;
        });
        
        $('#allTotal').text(`${tasksArr.tasks.length}`);
        $('#activeTotal').text(`${activeArr.length}`);
        $('#completedTotal').text(`${completedArr.length}`);

        //console.log('activeArr: ' + activeArr);
        //console.log('completedArr: ' + completedArr);
        const activeOption = document.getElementById('activeSelected');
        //console.log('activeOption: ' + activeOption);
        const completedOption = document.getElementById('completedSelected');
        //console.log('completedOption: ' + completedOption);
      
        if (activeOption.checked) {
          //console.log('Active Selected!');
          for ( i = 0; i < activeArr.length; i++) {
            addTask(activeArr[i].content);
          }
        }   else if (completedOption.checked) {
          //console.log('Completed Selected!');
          for ( i = 0; i < completedArr.length; i++) {
            addTaskCompleted(completedArr[i].content);
          }
        } else {
        //console.log('tasksArr: ' + tasksArr);
        //console.log('tasksArr.tasks.length: ' + tasksArr.tasks.length);
        for ( i = 0; i < tasksArr.tasks.length; i++) {
          //console.log('i: ' + i);
          //console.log('tasksArr.tasks[i].content: ' + tasksArr.tasks[i].content)
          //console.log('tasksArr.tasks[i].completed: ' + tasksArr.tasks[i].completed)
          if (tasksArr.tasks[i].completed) {
            addTaskCompleted(tasksArr.tasks[i].content);
          } else {
            addTask(tasksArr.tasks[i].content);
          }                
        } 
      }
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}


const deleteTask = (deleteId, deleteDiv) => {
  $.ajax({
    type: 'DELETE',
    url: 'api/tasks/' + deleteId + '?api_key=1',
    success: function (response, textStatus) {
      $(deleteDiv).remove();
      console.log('Deleted: ' + deleteId);
      $('#newTask').val('');
      updateList();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

const markCompleteTask = (completedId) => {
  $.ajax({
    type: 'PUT',
    url: 'api/tasks/' + completedId + '/mark_complete?api_key=1',
    dataType: 'json',
    success: function (response, textStatus) {
      console.log(response);
      updateList();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
 });
}

const markActiveTask = (completedId) => {
  $.ajax({
    type: 'PUT',
    url: 'api/tasks/' + completedId + '/mark_active?api_key=1',
    dataType: 'json',
    success: function (response, textStatus) {
      console.log(response);
      updateList();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
 });
}

const postTask = (newTask) => {
  $.ajax({
    type: 'POST',
    url: 'api/tasks?api_key=1',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({
      task: {
        content: `${newTask}`,
      }
    }),
    success: function (response, textStatus) {
      //console.log(response);
      addTask(newTask);
      $('#newTask').val('');
      updateList();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  }); 
}
