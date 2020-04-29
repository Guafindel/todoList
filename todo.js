const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const DANGER = "btn btn-danger";

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);

  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });

  // toDos.forEach(function(deleteToDo) {
  //     if(parseInt(li.id) == deleteToDo.id) {
  //         localStorage.removeItem(deleteToDo.id);
  //     }
  // });

  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  const li = document.createElement("li");
  const deleteBtn = document.createElement("button");
  const newId = toDos.length + 1;

  deleteBtn.textContent = "X";
  //deleteBtn.classList.add(DANGER);
  deleteBtn.className = "btn btn-danger";

  //deleteBtn.innerHTML = "\u{274C}";

  deleteBtn.addEventListener("click", deleteToDo);

  const span = document.createElement("span");
  span.innerText = text;
  li.appendChild(deleteBtn);
  li.appendChild(span);
  //li.classList.add("list-group-item");
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos != null) {
    //console.log(loadedToDos);
    const parsedToDos = JSON.parse(loadedToDos);
    //console.log(parseToDos);

    // for(var i = 0; i < parsedToDos.length; i++) {
    //     toDos.push(parsedToDos[i]);
    //     paintToDo(parsedToDos[i].text);
    // }

    parsedToDos.forEach(function (toDo) {
      // console.log(toDo.text);
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();