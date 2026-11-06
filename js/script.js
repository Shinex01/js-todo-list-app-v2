const input = document.querySelector("#inputTask");
const addBtn = document.querySelector(".add-btn");
const taskList = document.querySelector("#taskList");
const taskCount = document.querySelector("#taskCount");
const filterBtns = document.querySelectorAll(".filter-btn");
const emptyMessage = document.querySelector("#emptyMessage");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const render = () => {
  taskList.innerHTML = "";

  const visibleTasks = tasks.filter((task) => {
    if (currentFilter === "active") return !task.completed;
    if (currentFilter === "completed") return task.completed;
    return true;
  });

  visibleTasks.forEach((task) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    const span = document.createElement("span");
    span.textContent = task.text;
    if (task.completed) span.classList.add("completed");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "\u00d7";
    deleteBtn.classList.add("delete-btn");

    li.append(checkbox, span, deleteBtn);
    taskList.append(li);

    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      saveTasks();
      render();
    });

    deleteBtn.addEventListener("click", () => {
      tasks = tasks.filter((item) => item.id !== task.id);
      saveTasks();
      render();
    });

    span.addEventListener("dblclick", () => {
      const editInput = document.createElement("input");
      editInput.type = "text";
      editInput.value = task.text;
      editInput.classList.add("edit-input");

      li.replaceChild(editInput, span);
      editInput.focus();

      editInput.addEventListener("blur", () => {
        const newText = editInput.value.trim();
        if (newText !== "") task.text = newText;
        saveTasks();
        render();
      });

      document.addEventListener("keydown", (event) => {
        if (event.key === "Enter") editInput.blur();
        if (event.key === "Escape") {
          editInput.value = task.text;
          editInput.blur();
        }
      });
    });
  });

  emptyMessage.hidden = visibleTasks.length > 0;
  emptyMessage.textContent =
    tasks.length === 0
      ? "No tasks yet. Add your first task!"
      : "No tasks here.";

  const remaining = tasks.filter((task) => !task.completed).length;
  taskCount.textContent = `${remaining} task${remaining === 1 ? "" : "s"} remaining`;
};

const addTask = () => {
  const text = input.value.trim();
  if (text === "") return;

  tasks.push({ id: Date.now(), text: text, completed: false });
  saveTasks();
  render();
  input.value = "";
};

addBtn.addEventListener("click", addTask);

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") addTask();
});

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    filterBtns.forEach((b) => b.classList.remove("selected"));
    btn.classList.add("selected");
    render();
  });
});

const clearBtn = document.querySelector("#clearCompleted");

clearBtn.addEventListener("click", () => {
  tasks = tasks.filter((task) => !task.completed);
  saveTasks();
  render();
});
render();
