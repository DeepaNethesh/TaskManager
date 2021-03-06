//Create the class Task Manager, that will contain all the tasks submitted by the user.

class TaskManager {
  constructor(currentId = 0) {
      this.tasks =[];
      this.currentId = currentId;
  }

  //creates an object when de user creates a new task and it is added the the array of tasks
  addTask(name, description, assignedTo, email,dueDate, status, category) {
    const task = {
      // Increment the current Id for each new task
      id: this.currentId++,
      name: name,
      description: description,
      assignedTo: assignedTo,
      email: email,
      dueDate: dueDate,
      status: status,
      category: category
    };
    this.tasks.push({ task });
  }

  //funtion that identifies the task selected by the user
  getTaskById(taskId) {
    if(taskId >= this.currentId) {
      throw new Error('This is wrong!')
    
    }
    let foundTask;
    this.tasks.forEach(item => {
      let task = item;
      if(task.task.id === taskId) {
        foundTask = task;
      } 
    });
    return foundTask;
  }
 //function to delete the task
  deleteTask(taskId) {
    if(taskId >= this.currentId) {
      throw new Error('This is wrong!')
    
    }
    let newTasks = [];
    this.tasks.forEach(item => {
      let task = item;
      if(task.task.id !== taskId) {
        newTasks.push(task);
        
      } 
    });
    this.tasks = newTasks;
  
  }

  //for each of the tasks of the task manager, the function creates an html code (by calling another function) and save the html code of all the tasks. Finally the html code snippet is passed to the index.html
  render () {
    let tasksHtmlList = [];
    if(this.tasks.length === 0) {
      const message = document.querySelector('#message');
      message.classList.add('visible')
      message.classList.remove('invisible')
    } else {
      message.classList.add('invisible')
      message.classList.remove('visible')
    }
    this.tasks.forEach(task => { 
      let currentTask = task;
      let visibility;
      let text;
      //the following if/else evaluates the status selected for the task and applies style and makes the button visible or not
      if(currentTask.task.status === 'Completed') {
        visibility = 'invisible'
        text = 'text-success';
      } 
      else {
        visibility = 'visible'
        text = 'text-danger';
      }

      let image;

      if(currentTask.task.assignedTo === 'Deepa') {
        image = 'https://ui-avatars.com/api/?name=D+M&background=638BFF&color=fff'
      } else if (currentTask.task.assignedTo === 'Laura') {
        image = 'https://ui-avatars.com/api/?name=L+V&background=638BFF&color=fff'
      } else {
        image = 'https://ui-avatars.com/api/?name=R+M&background=638BFF&color=fff'
      }  

      let taskHtml = createTaskHtml(currentTask.task.id, currentTask.task.name, currentTask.task.description, currentTask.task.assignedTo, currentTask.task.email, currentTask.task.dueDate, currentTask.task.status, currentTask.task.category,visibility, text, image)
      tasksHtmlList.push(taskHtml)
    });
    
    let tasksHtml1 = tasksHtmlList.join('\n')
    let toDoList = document.querySelector("#taskList");
    toDoList.innerHTML = tasksHtml1;
  }
  //function to save and load the task list in the local storage.
  save() {
    let tasksJson = JSON.stringify(this.tasks);
    localStorage.setItem('tasks',tasksJson)
    let currentId = JSON.stringify(this.currentId)
    localStorage.setItem('currentId',currentId)
  }

  load() {
    if(localStorage.getItem('tasks')) {
      let tasksJson = localStorage.getItem('tasks')
      this.tasks = JSON.parse(tasksJson)
    }
    if(localStorage.getItem('currentId')) {
      let currentId = localStorage.getItem('currentId')
      this.currentId= Number(JSON.parse(currentId))
    }
  }

//function to clear all the tasks from the todolist and the local storage
  clear() {
    this.tasks =[];
    this.currentId = 0;
  }
}


//the function apply the html code to each task acording to the inputs from the user.

const createTaskHtml = (id, name, description, assignedTo, email, dueDate, status, category, visibility, text, image) => {
  const string = `
    <div class="col-lg-4 col-md-6 mb-4">
    <div class="card h-100">
        <div class="text-center">  
            <img class="card-img-top pt-2 rounded-circle img-fluid" src=${image} alt="Avatar" style="width:20%">
            </div>
    <div class="card-body">
      <div class="row justify-content-center">
        <h6 class="card-title text-uppercase category">${category}</h6>
      </div>
      <div class="row justify-content-center">
          <h6 class="card-title text-uppercase text-white id ">${id}</h6>
      </div>
      <div class="row">
          <div class= "col">
              <h3 class="card-title text-dark AssignedTo">${assignedTo}</h3>
          </div>
          <div class= "col">
              <h5 class="card-title ${text} Status">${status}</h5>
          </div>
      </div>
      <div class="row justify-content-center">
        <h6 class="card-title text-muted emailId mb-0">${email}</h6>
      </div>
      <br>
      <div class="row justify-content-center">
          <h4 class="card-title text-right name">${name}</h4>
      </div>
          <p class="card-text">${description}</p>
          <p class="card-text"><small class="text-muted">Due date: ${dueDate}</small></p>
    </div>
      <div class="card-footer">
        <a  class="btn btn-outline-danger  delete">Delete</a>
        <button type="button" class="btn btn-outline-primary edit" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Edit</button>
        <a  class="btn btn-outline-success ${visibility} done-button">Mark Completed</a>
        
      </div>
      </div>
    </div>
    `
    return string;         
}

