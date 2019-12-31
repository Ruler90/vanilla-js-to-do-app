import { saveToLS } from './localStorageSaveLoad.js';
import { spanEditListeners } from './spanEdit.js';
import { dragAndDrop } from './dragAndDrop.js';

export function addTask () {
  const taskAddBtnsArr = document.querySelectorAll('.addTaskButton');
  for (let i = 0; i < taskAddBtnsArr.length; i++) {
    taskAddBtnsArr[i].onclick = function () {
      const taskItemHTMLElement = `<div class="taskControlBtns">
        <input class="defaultButton prioBtn" type="button" value="P"/>
        <input class="defaultButton taskInProgressBtn" type="button" value="&#128336;"/>
        <input class="defaultButton removeTaskBtn" type="button" value="X"/>
        </div>
        <span class="editableSpan"></span>
        <input type="text" class="editableInput">`;
      const taskItem = document.createElement('div');
      taskItem.classList.add('taskItem', 'spanEdit');
      taskItem.setAttribute('draggable', 'true');
      taskItem.innerHTML = taskItemHTMLElement;
      this.closest('.taskType__Container').appendChild(taskItem);
      taskItem.querySelector('.editableInput').focus();
      removeTask();
      prioTask();
      taskInProgress();
      spanEditListeners();
      saveToLS();
      dragAndDrop();
    };
  }
}

export function removeTask () {
  const removeTaskBtnsArr = document.querySelectorAll('.removeTaskBtn');
  for (let i = 0; i < removeTaskBtnsArr.length; i++) {
    removeTaskBtnsArr[i].addEventListener('click', function () {
      this.closest('.taskItem').remove();
      saveToLS();
    });
  }
}

export function prioTask () {
  const prioBtnArr = document.querySelectorAll('.prioBtn');
  for (let i = 0; i < prioBtnArr.length; i++) {
    prioBtnArr[i].onclick = function () {
      this.closest('.taskItem').classList.toggle('prioTask');
      saveToLS();
    };
  }
}

export function taskInProgress () {
  const taskInProgressBtnArr = document.querySelectorAll('.taskInProgressBtn');
  for (let i = 0; i < taskInProgressBtnArr.length; i++) {
    taskInProgressBtnArr[i].onclick = function () {
      this.closest('.taskItem').classList.toggle('taskInProgress');
      saveToLS();
    };
  }
}
