var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");
var completeEditTask = function(taskName, taskType, taskId){
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

// set new values
taskSelected.querySelector("h3.task-name").textContent = taskName;
taskSelected.querySelector("span.task-type").textContent = taskType;

alert("Task Updated!");
};

formEl.removeAttribute("data-task-id");
document.querySelector("#save-task").textContent = "Add Task";

var taskFormHandler = function(event) {
event.preventDefault();
var taskNameInput = document.querySelector("input[name='task-name']").value;
var taskTypeInput = document.querySelector("select[name='task-type']").value;

if(!taskNameInput || !taskTypeInput){
    alert("You need to  fill out the task form!");
    return false;
}

formEl.reset();

var isEdit = formEl.hasAttribute("data-task-id");
if (isEdit){
    var taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
}

else{
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };
    createTaskEl(taskDataObj);
}


  // package up data as an object
var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput
};

  // send it as an argument to createTaskEl
createTaskEl(taskDataObj);
};

var createTaskEl = function (taskDataObj) {


  // create list item
var listItemEl = document.createElement("li");
listItemEl.className = "task-item";
listItemEl.setAttribute("data-task-id", taskIdCounter);

  // create div to hold task info and add to list item
var taskInfoEl = document.createElement("div");
taskInfoEl.className = "task-info";
taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";listItemEl.appendChild(taskInfoEl);
var taskActionsEL = createTaskActions(taskIdCounter);
listItemEl.appendChild(taskActionsEL);
  // add entire list item to list
tasksToDoEl.appendChild(listItemEl);

taskIdCounter++;
};
var createTaskActions = function(taskId){
    var actionContainerEL = document.createElement("div");
    actionContainerEL.className = "task-actions";
    var editButtonEL = document.createElement("button");
    editButtonEL.textContent = "Edit";
    editButtonEL.className = "btn edit-btn";
    editButtonEL.setAttribute("data-task-id", taskId);

    actionContainerEL.appendChild(editButtonEL);

    var deleteButtonEL = document.createElement("button");
    deleteButtonEL.textContent = "Delete";
    deleteButtonEL.className = "btn delete-btn";
    deleteButtonEL.setAttribute("data-task-id", taskId);

    actionContainerEL.appendChild(deleteButtonEL);

    var statusSelectEL = document.createElement("select");
    statusSelectEL.className= "select-status"
    statusSelectEL.setAttribute("name", "status-change");
    statusSelectEL.setAttribute("data-task-id", taskId);
    actionContainerEL.appendChild(statusSelectEL);

    var statusChoices = ["To Do", "In Progress", "Completed"];
    for (var i = 0; i < statusChoices.length; i++){
        var statusOptionEL = document.createElement("option");
        statusOptionEL.textContent = statusChoices[i];
        statusOptionEL.setAttribute("value", statusChoices[i]);
        statusSelectEL.appendChild(statusOptionEL)
    }
    return actionContainerEL;

};

formEl.addEventListener("submit", taskFormHandler);

var taskButtonHandler = function(event){
    var targetEl = event.target;

    // edit button was clicked
    if (targetEl.matches(".edit-btn")) {
    var taskId = targetEl.getAttribute("data-task-id");
    editTask(taskId);
    } 
    // delete button was clicked
    else if (targetEl.matches(".delete-btn")) {
      var taskId = targetEl.getAttribute("data-task-id");
      deleteTask(taskId);
    }
};

var deleteTask= function(taskId){
    console.log(taskId);
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
};

var editTask = function(taskId){
    console.log("editing task #" + taskId);
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    
    var taskType = taskSelected.querySelector("span.task-type").textContent;
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id", taskId);
}

pageContentEl.addEventListener("click", taskButtonHandler);

pageContentEl.addEventListener("change",taskStatusChangeHandler)

var taskStatusChangeHandler = function(event){
      // get the task item's id
  var taskId = event.target.getAttribute("data-task-id");

  // get the currently selected option's value and convert to lowercase
  var statusValue = event.target.value.toLowerCase();

  // find the parent task item element based on the id
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
  } 
  else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
  } 
  else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
  }

};