const taskContainer = document.querySelector(".task__container");

console.log(taskContainer)

let globalStorage =[];

const loadInitialCardData = () =>
{
  const getCardData = localStorage.getItem("tasky");

  const {cards} = JSON.parse(getCardData);

  cards.map((cardObject) => {
    taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject));

    globalStorage.push(cardObject);
  })

}

const generateNewCard = (taskData) => `
<div class="col-md-6 col-lg-4" >
<div class="card">
  <div class="card-header d-flex justify-content-end gap-2">
    <button type="button" class="btn btn-outline-success"  id=${taskData.id}
     onclick = "editCard.apply(this , arguments)" >
      <i class="fas fa-pencil-alt"  id=${taskData.id} onclick = "editCard.apply(this , arguments)"></i>
    </button>
    <button type="button" class="btn btn-outline-danger " id=${taskData.id} onclick = "deleteCard.apply(this , arguments)">
      <i class="fas fa-trash-alt" id=${taskData.id} onclick = "deleteCard.apply(this , arguments)"></i>
    </button>
  </div>
  
  <div class="card-body">
    <h5 class="card-title">${taskData.taskTitle}</h5>
    <p class="card-text">
      ${taskData.taskDescription}
    </p>
    <a href="#" class="btn btn-primary">${taskData.taskType}</a>
  </div>
  <div class="card-footer">
    <button type="button" id=${taskData.id} class="btn btn-outline-primary float-end">
      Open Task
    </button>
  </div>
</div>
</div>
`;

const saveChanges = () => {
  const taskData = {
    id: `${Date.now()}`, // unique number for id
    // imageUrl: document.getElementById("imageurl").value,
    taskTitle: document.getElementById("tasktitle").value,
    taskType: document.getElementById("tasktype").value,
    taskDescription: document.getElementById("taskdescription").value,
  };

  taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskData));

  globalStorage.push(taskData);

  localStorage.setItem("tasky", JSON.stringify({cards: globalStorage}));

};

const deleteCard = (event) => 
{
  event =window.event

  const tagname = event.target.tagName;


  const targetID = event.target.id ;

  globalStorage = globalStorage.filter((ele) => ele.id !== targetID );
  localStorage.setItem("tasky", JSON.stringify({cards: globalStorage}));

  if(tagname === "BUTTON")
  {
      return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode)
  }
  else{
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode)
  }
   
}

const editCard = (event) => {
  event = window.event;
 
  const tagname = event.target.tagName;

  let parentElement;

  if (tagname === "BUTTON") {
    parentElement = event.target.parentNode.parentNode;
  } else {
    parentElement = event.target.parentNode.parentNode.parentNode;
  }
console.log(parentElement)

  let taskTitle = parentElement.childNodes[3].childNodes[1];
  let taskDescription = parentElement.childNodes[3].childNodes[3];
  let taskType = parentElement.childNodes[3].childNodes[5];
  console.log(taskType)
  let submitButton = parentElement.childNodes[5].childNodes[1];
  
  taskTitle.setAttribute("contenteditable", "true");
  taskDescription.setAttribute("contenteditable", "true");
  taskType.setAttribute("contenteditable", "true");
  submitButton.setAttribute(
    "onclick",
    "saveEditchanges.apply(this, arguments)"
  );
  submitButton.innerHTML = "Save Changes";
};


const saveEditchanges = (event) => {
  event = window.event;
  const targetID = event.target.id;
  const tagname = event.target.tagName;

  let parentElement;

  if (tagname === "BUTTON") {
    parentElement = event.target.parentNode.parentNode;
  } else {
    parentElement = event.target.parentNode.parentNode.parentNode;
  }

  let taskTitle = parentElement.childNodes[3].childNodes[1];
  let taskDescription = parentElement.childNodes[3].childNodes[3];
  let taskType = parentElement.childNodes[3].childNodes[5];
  

  const updatedData = {
    taskTitle: taskTitle.innerHTML,
    taskType: taskType.innerHTML,
    taskDescription: taskDescription.innerHTML,
  };

  globalStorage = globalStorage.map((task) => {
    if (task.id === targetID) {
      return {
        id: task.id,
        taskTitle: updatedData.taskTitle,
        taskType: updatedData.taskType,
        taskDescription: updatedData.taskDescription,
      };
    }
    return task; 
  });

  localStorage.setItem("tasky", JSON.stringify({cards: globalStorage}));
};