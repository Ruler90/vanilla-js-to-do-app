import { addTask, removeTask, prioTask, taskInProgress } from './modules/tasks.js';
import { saveToLS, loadFromLS } from './modules/localStorageSaveLoad.js';
import { spanEditListeners } from './modules/spanEdit.js';
import { dragAndDrop } from './modules/dragAndDrop.js';
import { dragScroll } from './modules/dragScroll.js';
import { tasksBackupBtnUse } from './modules/saveToFile.js';
import { loadFromFileBtnUse } from './modules/loadFromFile.js';

const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function addDay () {
  const dateInput = document.querySelector('#chooseDate').value;

  if (dateInput !== '' && dateInput !== undefined) {
    const mainContainer = document.querySelector('.mainContainer');
    const realDate = new Date(dateInput);
    const finalDate = dateInput + ' (' + dayName[realDate.getDay()] + ')';

    const newDayHTMLElement = `<div class="day__dateBar">
    <span class="editableSpan">${finalDate}</span>
      <input type="text" class="editableInput">
    <input type="button" class="defaultButton removeDayButton" value="X">
</div>
<div class="mainTaskTypes__Container">
<div class="taskType__Container">
    <div class="taskType__TitleBar taskType__TitleBar--cat1Color">IMPORTANT
        <input type="button" class="defaultButton addTaskButton" value="+">
    </div>
</div>
<div class="taskType__Container">
    <div class="taskType__TitleBar taskType__TitleBar--cat2Color">TASKS
        <input type="button" class="defaultButton addTaskButton" value="+">
    </div>
</div>
</div>`;

    const newDay = document.createElement('div');
    newDay.classList.add('day__Container');
    newDay.setAttribute('draggable', 'true');
    newDay.innerHTML = newDayHTMLElement;
    mainContainer.appendChild(newDay);
  }
  removeDay();
  addTask();
  spanEditListeners();
  saveToLS();
  dragAndDrop();
}

function addDayBtnUse () {
  const addDayBtn = document.querySelector('.addDayBtn');
  addDayBtn.addEventListener('click', addDay);
}

function removeDay () {
  const removeDayBtnsArr = document.querySelectorAll('.removeDayButton');
  for (let i = 0; i < removeDayBtnsArr.length; i++) {
    removeDayBtnsArr[i].onclick = function () {
      if (confirm('Remove entire day?')) {
        this.closest('.day__Container').remove();
        saveToLS();
      }
    };
  }
}

export function makeElInteractive () {
  addDayBtnUse();
  tasksBackupBtnUse();
  addTask();
  removeDay();
  removeTask();
  spanEditListeners();
  prioTask();
  taskInProgress();
}

// Without this you can't use buttons in items that are already displayed when you run the application
window.onload = function () {
  loadFromLS();
  loadFromFileBtnUse();
  makeElInteractive();
  dragAndDrop();
  dragScroll();
};
