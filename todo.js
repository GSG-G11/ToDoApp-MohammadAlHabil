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