let tasks = [];
let tasksChecked = [];
let itemLabels = [];

// Get all element that we want to make something on it
const themeSwitcher = document.getElementById("checkbox");
const lists = document.getElementById("lists");
const listOfChecked = document.getElementById("listOfChecked");
const add = document.getElementById("add");
const name = document.getElementById("name");
const nameInput = document.getElementById("nameInput");
const start = document.getElementById("start");
const addTask = document.getElementById("addTask");
const updateTaskbtn = document.getElementById("updateTask");
const addLabel = document.getElementById("addLabel");
const enterLabel = document.getElementById("enterLabel");
const plus = document.getElementById("plus");
const inputLabel = document.getElementById("inputLabel");
const save = document.getElementById("save");
const uncheckSection = document.getElementById("uncheckSection");
const checkedSection = document.getElementById("checkedSection");
const uncheck = document.getElementById("uncheck");
const checked = document.getElementById("checked");
const formTask = document.getElementById("formTask");
let getTime = document.getElementById("getTime");
let getDate = document.getElementById("getDate");
let SaveTAndD = document.getElementById("SaveTAndD");
let postDate = document.getElementById("postDate");
let postTime = document.getElementById("postTime");
let recentAndReverse = document.getElementById("recentAndReverse");
let filter = document.getElementById("filter");
let getTimeAndDate = document.getElementById("getTimeAndDate");
let msgDelete = document.getElementById("msgDelete");
let undo = document.getElementById("undo");

let list = Array.from(document.getElementsByClassName("list"));
const close = Array.from(document.querySelectorAll(".closee"));
const model = Array.from(document.querySelectorAll(".bgOfOnBoarding , .addbackground"));

// Light and dark mode
themeSwitcher.onclick = function () {
  let dark = Array.from(
      document.querySelectorAll(
          ".list , .label , .borderDark , .select-selected , .lineBelow , .below"
      )
  );
  let checkk = Array.from(document.querySelectorAll('input[type="checkbox"]'));
  let currentTheme = document.documentElement.getAttribute("data-theme");
  let switchToTheme;

  switchToTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", switchToTheme);

  dark.forEach((el) => {
      el.classList.toggle("noborder");
  });

  checkk.forEach((el) => {
      el.classList.toggle("noborder");
      if (getComputedStyle(el).border == "0px none rgb(13, 22, 29)")
          el.style.border = "1px solid #e6e6e6";
      else el.style.border = "none";
  });
};

// Get the name of user
start.addEventListener("click", () => {
  name.textContent = `Hi ${
  nameInput.value === "" ? "Unknown" : nameInput.value
}`;
  closeTab();
});

// Show onboarding popup
if (sessionStorage.getItem("popState") !== "shown") {
  window.addEventListener("load", function () {
      model[0].style.display = "block";
      sessionStorage.setItem("popState", "shown");
  });
}

// Show addTask page
add.addEventListener("click", () => {
  updateTaskbtn.style.display = "none";
  addTask.style.display = "block";
  showAddTaskPage();
});

function showAddTaskPage() {
  document.getElementById("title").value = "";
  document.getElementById("desc").value = "";
  // let date = document.getElementById("date");
  // let time = document.getElementById("time");
  // let label = document.getElementById("label");
  // date.selectedIndex = 'None';
  // time.selectedIndex = 'None';
  // label.selectedIndex = 'None';

  postDate.textContent = '';
  postTime.textContent = '';

  getTimeAndDate.style.display = "none";
  model[1].style.display = "block";
}

// Close the all popup
close[0].addEventListener("click", closeTab);
close[1].addEventListener("click", closeTab);

function closeTab() {
    model[0].style.display = "none";
    model[1].style.display = "none";
}

// open the input to write new label
addLabel.addEventListener("click", openAndCloseAddLabel);

function openAndCloseAddLabel() {
    plus.classList.toggle("plus");
    enterLabel.classList.toggle("block");
    inputLabel.focus();
    inputLabel.value = "";
}

// Get the label that created by the user and put it in select label
let labelsData = localStorage.getItem("itemLabels");
itemLabels = JSON.parse(labelsData);
save.addEventListener("click", () => {
    let valueOfLabel = inputLabel.value;
    let label = document.getElementById("label");
    let opt = document.createElement("option");
    opt.appendChild(document.createTextNode(valueOfLabel));
    opt.value = valueOfLabel;
    label.appendChild(opt);
    itemLabels.push(valueOfLabel);
    localStorage.setItem("itemLabels", JSON.stringify(itemLabels));
    openAndCloseAddLabel();
});

// Add event to addTask button
addTask.addEventListener("click", () => {
  createTask();
  closeTab();
});

// Create task and storage it in localStorage
function createTask() {
  let title = document.getElementById("title");
  let desc = document.getElementById("desc");
  let date = document.getElementById("date");
  let time = document.getElementById("time");
  let label = document.getElementById("label");
  let clr = document.querySelector('input[name="color"]:checked');
  let selectedDate = date.options[date.selectedIndex].text;
  let selectedTime = time.options[time.selectedIndex].text;
  let selectedLabel = label.options[label.selectedIndex].text;

  if (selectedDate == "Pick a date") {
      selectedDate = formatDate(getDate);
  }
  if (selectedTime == "Pick a time") {
      selectedTime = formatTime(getTime);
  }

  let task = {
      title: `${title.value}`,
      desc: `${desc.value}`,
      time: `${selectedTime}`,
      date: `${selectedDate}`,
      label: `${selectedLabel}`,
      color: `${clr.value}`,
  };

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  render(lists, tasks);
}

// Format Date
function formatDate(dateFormat) {
  let d = new Date(dateFormat.value),
      mo = new Intl.DateTimeFormat("en", {
          month: "short",
      }).format(d),
      da = new Intl.DateTimeFormat("en", {
          day: "2-digit",
      }).format(d);
  getDateFormat = `${da}-${mo}`;
  return getDateFormat;
}
// Format Time
function formatTime(timeFormat) {
  let timeformat = timeFormat.value.split(":"),
      hours = timeformat[0],
      minutes = timeformat[1],
      ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  let strTime = `${hours}:${minutes} ${ampm}`;
  return strTime;
}


if (localStorage.getItem('itemLabels') === null) {
  itemLabels = [];
} else {
  itemLabels = JSON.parse(localStorage.getItem('itemLabels'));
}
let label = document.getElementById("label");
itemLabels.forEach((el) => {
  let opt = document.createElement("option");
  opt.appendChild(document.createTextNode(el));
  label.appendChild(opt);
});

// Put all the tasks in lists DOM
function render(typeOflist, typeOfArray) {
  postTandD.style.display = "none";
  removeTasks();
  let index = 0;
  let order = 0;

  typeOfArray.forEach((t) => {
      let list = document.createElement("li");
      list.className = "list";
      list.setAttribute("data-index", order++);
      list.style.backgroundColor = `${t.color}`;
      let nameAndTrash = document.createElement("div");
      nameAndTrash.className = "nameAndTrash";

      let desc = document.createElement("p");
      desc.setAttribute("onclick", "updateTask(this)");
      desc.className = "desc";
      desc.appendChild(document.createTextNode(`${t.desc}`));

      let labelsAndCheck = document.createElement("div");
      labelsAndCheck.className = "labelsAndCheck";

      let nameOfTask = document.createElement("h1");
      nameOfTask.className = "nameOfTask";
      nameOfTask.appendChild(document.createTextNode(`${t.title}`));

      let trash = document.createElement("img");
      trash.className = "trash";
      trash.setAttribute("src", "./assets/trash.svg");
      trash.setAttribute("data-index", index++);
      trash.addEventListener("click", deleteTask);

      nameAndTrash.appendChild(nameOfTask);
      nameAndTrash.appendChild(trash);

      let labels = document.createElement("div");
      labels.className = "labels";

      let checkbox = document.createElement("input");
      checkbox.className = "checkbox";
      checkbox.setAttribute("type", "checkbox");
      checkbox.addEventListener("click", moveCheckedTask);
      if (typeOflist.getAttribute("id") == "listOfChecked") {
          checkbox.setAttribute("checked", "");
          checkbox.style.pointerEvents = "none";
      }

      labelsAndCheck.appendChild(labels);
      labelsAndCheck.appendChild(checkbox);

      let timeAndDate = document.createElement("div");
      timeAndDate.className = "label";

      let wordLabel = document.createElement("div");
      wordLabel.className = "label";

      labels.appendChild(timeAndDate);
      labels.appendChild(wordLabel);

      let alarm = document.createElement("img");
      alarm.className = "alarm";
      alarm.setAttribute("src", "./assets/alarmclock.svg");

      let dataAndTime = document.createElement("span");
      dataAndTime.className = "dataAndTime";
      dataAndTime.className = "word";
      dataAndTime.appendChild(
          document.createTextNode(`${t.date}` + ", " + `${t.time}`)
      );

      timeAndDate.appendChild(alarm);
      timeAndDate.appendChild(dataAndTime);

      let labelSpan = document.createElement("span");
      labelSpan.className = "labelSpan";
      labelSpan.className = "word";
      labelSpan.appendChild(document.createTextNode(`${t.label}`));
      wordLabel.appendChild(labelSpan);

      list.appendChild(nameAndTrash);
      list.appendChild(desc);
      list.appendChild(labelsAndCheck);

      typeOflist.insertBefore(list, typeOflist.childNodes[0]);
  });

  let dark = Array.from(
      document.querySelectorAll(
          ".list , .label , .borderDark , input[checkbox] , .lineBelow , .below"
      )
  );
  let currentTheme = document.documentElement.getAttribute("data-theme");
  if (currentTheme === "dark") {
      dark.forEach((el) => {
          if (!el.classList.contains("noborder")) el.classList.add("noborder");
      });
  }

  if (Array.isArray(typeOfArray) && typeOfArray.length) {} else {
      createNoTasks();
  }
}

// Remove All Tasks From Lists
function removeTasks() {
  let child = lists.lastElementChild;
  let childs = listOfChecked.lastElementChild;
  while (child) {
      lists.removeChild(child);
      child = lists.lastElementChild;
  }
  while (childs) {
      listOfChecked.removeChild(childs);
      childs = listOfChecked.lastElementChild;
  }
}

// LoadTasks from localStorge
function loadTasks() {
  let taskData = localStorage.getItem("tasks");
  tasks = JSON.parse(taskData);
  if (!(Array.isArray(tasks) && tasks.length)) {
      tasks = [];
      return;
  }
  render(lists, tasks);
}
window.onload = loadTasks;

// Delete Task from localStorge
function deleteTask(e) {
  let index = this.dataset.index;
  let tyList = this.parentElement.parentElement.parentElement;
  this.parentElement.parentElement.style.animation = "delete 0.5s";
  msgDelete.style.display = "block"
  if (tyList.getAttribute("id") == "lists") {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      setTimeout(() => {
          render(lists, tasks);
      }, 400);
  }
  if (tyList.getAttribute("id") == "listOfChecked") {
      tasksChecked.splice(index, 1);
      localStorage.setItem("tasksChecked", JSON.stringify(tasksChecked));
      setTimeout(() => {
          render(listOfChecked, tasksChecked);
      }, 400);
  }
}

// Create text after delete all tasks
function createNoTasks() {
  let name = document.createElement("li");
  name.setAttribute("id", "noTask");
  let msg = document.createTextNode(
      "No Tasks To Show, Add a new task to get things in order"
  );
  name.appendChild(msg);
  name.className = "no-tasks-message";
  lists.appendChild(name);
}

// Show Update Task
let ObjTask;

function updateTask(ele) {
    "use strict";
    postTandD.style.display = "none";
    addTask.style.display = "none";
    updateTaskbtn.style.display = "block";
    ele = ele.parentElement;
    showAddTaskPage();
    let order = ele.dataset.index;

    ObjTask = tasks[order];
    let titleObj = ObjTask.title;
    let descObj = ObjTask.desc;
    let dateObj = ObjTask.date;
    let timeObj = ObjTask.time;
    let labelObj = ObjTask.label;
    let colorObj = ObjTask.color;

    if (dateObj == "None" || dateObj == "Today" || dateObj == "Tomorrow") {} else {
        postDate.textContent = dateObj;
        getTimeAndDate.style.display = "flex";
        postTandD.style.display = "flex";
    }

    if (
        timeObj == "None" ||
        timeObj == "Morning" ||
        timeObj == "Afternoon" ||
        timeObj == "Evening" ||
        timeObj == "Night"
    ) {} else {
        postTime.textContent = timeObj;
        getTimeAndDate.style.display = "flex";
        postTandD.style.display = "flex";
    }

    let title = document.getElementById("title");
    let desc = document.getElementById("desc");
    let date = document.getElementById("date");
    let time = document.getElementById("time");
    let label = document.getElementById("label");

    title.value = titleObj;
    desc.value = descObj;
    let dateOptions = Array.from(date.options);
    let timeOptions = Array.from(time.options);
    let labelOptions = Array.from(label.options);
    let clr = document.querySelectorAll('input[name="color"]');

    dateOptions.forEach((opt) => {
        opt.removeAttribute("selected");
        if (opt.value == `${dateObj}`) {
            getTimeAndDate.style.display = "none";
            postTandD.style.display = "none";
            opt.setAttribute("selected", "");
        }
        if (opt.value == `Pick a date` && dateObj.includes('-')) {
            opt.setAttribute("selected", "");
            postDate.textContent = `${dateObj}`
            getTimeAndDate.style.display = "flex";
            postTandD.style.display = "flex";
        }
    });

    timeOptions.forEach((opt) => {
        opt.removeAttribute("selected");
        if (opt.value == `${timeObj}`) {
            getTimeAndDate.style.display = "none";
            postTandD.style.display = "none";
            opt.setAttribute("selected", "");
        }
        if (opt.value == `Pick a time` && timeObj.includes(':')) {
            opt.setAttribute("selected", "");
            postTime.textContent = `${timeObj}`
            getTimeAndDate.style.display = "flex";
            postTandD.style.display = "flex";
        }
    });

    labelOptions.forEach((opt) => {
        opt.removeAttribute("selected");
        if (opt.value == `${labelObj}`) {
            opt.setAttribute("selected", "");
        }
    });

    clr.forEach((opt) => {
        opt.removeAttribute("checked");
        if (opt.value == `${colorObj}`) {
            opt.setAttribute("checked", "");
        }
    });
}

// Update Task button(Edit Task)
updateTaskbtn.addEventListener("click", () => {
  if (updateChanges(ObjTask)) {
      closeTab();
  } else {
      console.log(ObjTask.desc);
      console.log(desc.value);
      ObjTask.title = title.value;
      ObjTask.desc = desc.value;
      ObjTask.date = date.options[date.selectedIndex].text;
      ObjTask.time = time.options[time.selectedIndex].text;
      ObjTask.label = label.options[label.selectedIndex].text;
      ObjTask.color = document.querySelector('input[name="color"]:checked').value;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      render(lists, tasks);
      closeTab();
  }
});

// Update changes on object task
function updateChanges(ObjTask) {
  if (
      ObjTask.title == title.value &&
      ObjTask.desc == desc.value &&
      date.options[date.selectedIndex].text == ObjTask.date &&
      time.options[time.selectedIndex].text == ObjTask.time &&
      label.options[label.selectedIndex].text == ObjTask.label &&
      document.querySelector('input[name="color"]:checked').value == ObjTask.color
  ) {
      return true;
  } else {
      return false;
  }
}

// Add event on buttons (todo, done)
checked.addEventListener("click", getCheckedTasks);
uncheck.addEventListener("click", getUncheckedTasks);

function moveCheckedTask(e) {
    let index = this.parentElement.parentElement.dataset.index;
    let itemList = tasks[index];
    let listChildren = Array.from(lists.children);

    listChildren.forEach((el) => {
        if (el.getAttribute("data-index") == index) el.classList.add("move");
    });

    setTimeout(() => {
        tasksChecked.push(itemList);
        tasks.pop(itemList);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        localStorage.setItem("tasksChecked", JSON.stringify(tasksChecked));
        render(lists, tasks);
    }, 400);
}