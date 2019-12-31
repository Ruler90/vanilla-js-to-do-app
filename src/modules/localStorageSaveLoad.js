import { makeElInteractive } from '../index.js';

export function saveToLS () {
  const mainContainer = document.querySelector('.mainContainer');
  localStorage.setItem('myToDoList', mainContainer.innerHTML);
}

export function loadFromLS () {
  if (localStorage.getItem('myToDoList')) {
    const mainContainer = document.querySelector('.mainContainer');
    mainContainer.innerHTML = localStorage.myToDoList;
    makeElInteractive();
  }
}
