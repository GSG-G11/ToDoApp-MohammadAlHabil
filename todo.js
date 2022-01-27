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