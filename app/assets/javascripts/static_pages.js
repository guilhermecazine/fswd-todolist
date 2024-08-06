const taskHTML1 = '<div class="task-wrapper row list">' + 
'<div class="col-1 task-border task-check">';
const taskHTML1FadedOut = '<div class="task-wrapper fadedOut row list">' + 
'<div class="col-1 task-border task-check">';
const taskHTML2 = '<a class="completeTask" href="#"><i class="fas fa-check"></i></a>' + '</div>' +
'<div class="task-background col-10">' +
'<p class="task-title">';
const taskHTML3 = '</p></div>' +               
'<div class="col-1 task-border">' +
'<a class="remove" href="#">X</a>' +                
'</div></div>';

const addTask = (newTask) => {
  $('.task-container').append(taskHTML1 + taskHTML2 + newTask + taskHTML3);
};

const addTaskCompleted = (newTask) => {
  $('.task-container').append(taskHTML1FadedOut +
    '<a class="completeTask checkGreen" href="#"><i class="fas fa-check"></i></a>' + '</div>' +
    '<div class="task-background col-10">' +
    '<p class="task-title">' + newTask + taskHTML3);
}

let tasksArr = [];

$(document).ready(function () {

  updateList();
  $(document).on('click', '.remove', function () {
    let taskTitle = $(this).closest('.task-wrapper').find('.task-title').text()
    let deleteDiv = $(this).parent().parent();
    let taskObj = tasksArr.tasks.filter(obj => {
      return obj.content === taskTitle;
    })
    let deleteID = taskObj[0].id;
    deleteTask(deleteID, deleteDiv);        
  }); 

  $(document).on('click', '.completeTask', function () {
    let taskWrapper = $(this).closest('.task-wrapper')
    taskWrapper.toggleClass('fadedOut')
    $(this).toggleClass('checkGreen');
    let checked = $(this).hasClass('checkGreen')
    let taskTitle = $(this).closest('.task-wrapper').find('.task-title').text()  
    let taskObj = tasksArr.tasks.filter(obj => {
      return obj.content === taskTitle;
    })
    let completedID = taskObj[0].id; 
    if (checked) {
      markCompleteTask(completedID)
    } else {
      markActiveTask(completedID)
    }
  }); 

  $('.task-form').on('submit', function (event) {
    event.preventDefault();
    var newTask = $(this).children('#newTask').val();
    postTask(newTask);    
  });

  $(document).on('click', '.filter', function () {
    updateList();
  });
});