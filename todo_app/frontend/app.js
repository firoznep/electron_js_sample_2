const { dialog, ipcRenderer } = require("electron");

const addBtn = document.querySelector("#add-btn");
const modelContainer = document.querySelector("#model-container");
const cancel = document.querySelector("#cancel");
const addField = document.querySelector("#add-field");
const submitBtn = document.querySelector("#submit-item");
const todoList = document.querySelector("#todo-list");
const error = document.querySelector("#error");
const errorBtn = document.querySelector("#err-btn");

addBtn.addEventListener("click", (e) => {
  modelContainer.style.display = "block";
  addField.focus();
});

cancel.addEventListener("click", (e) => {
  modelContainer.style.display = "none";
});

submitBtn.addEventListener("click", (e) => {
  if (addField.value.trim()) {
    let val = addField.value;
    let item = document.createElement("li");
    item.textContent = val;
    todoList.appendChild(item);
    ipcRenderer.send("new-item", val);
    addField.value = "";
    // console.log(val);
    addField.focus();
  } else {
    // console.log("Field is empty!");
    error.style.display = "flex";
  }
});

addField.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    submitBtn.click();
  }
});

errorBtn.addEventListener("click", (e) => {
  error.style.display = "none";
});

ipcRenderer.on("new-item-added", (e, items) => {
  console.log(items);
});
