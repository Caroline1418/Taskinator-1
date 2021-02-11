var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;

var taskFormHandler = function(event) {
event.preventDefault();
var taskNameInput = document.querySelector("input[name='task-name']").value;
var taskTypeInput = document.querySelector("select[name='task-type']").value;

if(!taskNameInput || !taskTypeInput){
    alert("You need to  fill out the task form!");
    return false;
}

formEl.reset();

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