const fatherElement = document.querySelector('nav');
const addBtn = document.getElementById('addButton');
const removeBtn = document.querySelector('.RemoveAll');
const namingInput = document.getElementById('nameInput');
const filterInput = document.getElementById('filter');

loadEventListeners();

function loadEventListeners() {

  fatherElement.addEventListener('click', removeTask);
  addBtn.addEventListener('click', createTask);
  removeBtn.addEventListener('click', clearTask);
  filterInput.addEventListener('keyup', filterTask);
  getTasks();

}

function removeTask(e) {
  if (e.target.classList.contains('icon')) {
    e.target.parentElement.remove();
    removeTaskFromLocalStorage(e.target.parentElement);
  }
}

function createTask(e) {
  if (namingInput.value === '') {
    alert('Write something');
  } else {
    const li = document.createElement('li');
    li.className = 'm-1 p-1 w-75 bord border border-dark border-1 rounded-1 border-opacity-75 d-flex justify-content-end align-items-center li';
    const label = document.createElement('label');
    label.className = 'd-flex justify-content-start w-100 label';
    const i = document.createElement('i');
    i.className = 'bi bi-x-circle text-danger fs-5 icon';
    label.innerHTML = namingInput.value;
    li.appendChild(label);
    li.appendChild(i);
    fatherElement.appendChild(li); 
    e.preventDefault();
    storeTaskInLocalStorage(namingInput.value);
    namingInput.value = ''; 
  }
}

function clearTask() {
  if (confirm('Are you sure you want to delete this task?')) {
    fatherElement.innerHTML = null; 
  }
  clearTasksFromLocalStorage();
}

function filterTask(e) {
  const liList = document.querySelectorAll(".li")
  console.log(liList);
  liList.forEach(li => {
    if (li.textContent.indexOf(e.target.value) != -1) {
      li.classList.add("d-flex")
      console.log("ok");
      li.style.display = "block"
      console.log(filterInput);
   }
   else{
    li.classList.remove("d-flex")
    li.style.display = "none"
   }
 });
}

function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
      tasks = [];
  } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index) {
      if (taskItem.textContent === task) {
          tasks.splice(index, 1);
      }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasksFromLocalStorage() {
  localStorage.removeItem('tasks');
}

function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function (task) {
    const li = document.createElement('li');
    li.className = 'm-1 p-1 w-75 bord border border-dark border-1 rounded-1 border-opacity-75 d-flex justify-content-end align-items-center li';
    const label = document.createElement('label');
    label.className = 'd-flex justify-content-start w-100 label';
    const i = document.createElement('i');
    i.className = 'bi bi-x-circle text-danger fs-5 icon';
    label.innerHTML = task;
    li.appendChild(label);
    li.appendChild(i);
    fatherElement.appendChild(li); // Append to the fatherElement (nav)
  });
}



  

  








  













