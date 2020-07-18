window.addEventListener("load", start);

let globalNames = [];
let inputName = null;
let divNames;
let ul = document.createElement("ul");
let isEditing = false;

function start() {
  inputName = document.querySelector("#name");
  divNames = document.querySelector("#names");

  preventFormSubmit();
  activateInput();
  handleTiping();
}

function preventFormSubmit() {
  function handleFormSubmit(e) {
    e.preventDefault();
  }
  let form = document.querySelector("form");
  form.addEventListener("submit", handleFormSubmit);
}

function handleTiping() {
  inputName.addEventListener("keyup", typing);

  function typing(e) {
    function checkRepeatedName(name) {
      let repeated = false;
      const arrayLi = document.querySelectorAll("li");
      for (let li of arrayLi) {
        if (li.lastChild.textContent.toLowerCase() == name.toLowerCase()) {
          return true;
        }
      }
    }

    function updateElement(name) {
      let span = document.querySelector(".edit");
      span.textContent = name;
      span.classList.remove("edit");
      inputName.value = "";
      isEditing = false;
    }

    if (e.key === "Enter") {
      const name = e.target.value;
      if (!name) {
        return;
      }
      if (isEditing) {
        updateElement(name);
      } else {
        if (checkRepeatedName(name)) {
          alert("Já tem nome cadastrado, por favor, coloque um diferente");
          return;
        }
        addName(name);
        inputName.value = "";
        render();
      }
    }
  }
  function addName(name) {
    globalNames.push(name);
  }
}

function activateInput() {
  inputName.focus();
}

function render() {
  function createDeleteButton() {
    function deleteElement(e) {
      e.toElement.parentNode.remove();
      inputName.value = "";
      inputName.focus();
    }

    let button = document.createElement("button");
    button.textContent = "X";
    button.classList.add("deleteButton");
    button.classList.add("click");
    button.addEventListener("click", deleteElement);

    return button;
  }

  let li = document.createElement("li");

  let span = document.createElement("span");
  let button = createDeleteButton();

  for (let currentName of globalNames) {
    span.textContent = currentName;
    span.addEventListener("click", editName);
    span.classList.add("click");
    li.appendChild(button);
    li.appendChild(span);
  }
  ul.appendChild(li);

  divNames.appendChild(ul);

  function editName(e) {
    let spanEdit = document.querySelector(".edit");
    const span = e.target;

    if (spanEdit) {
      spanEdit.classList.remove("edit");
      span.classList.add("edit");
    } else {
      span.classList.add("edit");
    }

    isEditing = true;
    inputName.value = e.target.textContent;
  }
}
