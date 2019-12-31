import { saveToLS } from './localStorageSaveLoad.js';

export function spanEditListeners () {
  const editableItems = document.querySelectorAll('.editableSpan');
  const taskInputs = document.querySelectorAll('.editableInput');
  for (let i = 0; i < editableItems.length; i++) {
    editableItems[i].addEventListener('click', showInput);
    taskInputs[i].addEventListener('blur', updateSpan);
    taskInputs[i].addEventListener('keypress', keypressEditEnd);
  }
};

function showInput () {
  this.parentElement.classList.add('spanEdit');
  const editableInput = this.parentElement.querySelector('.editableInput');
  editableInput.value = this.innerText;
  editableInput.focus();
}

function updateSpan () {
  this.previousElementSibling.innerText = this.value;
  this.parentElement.classList.remove('spanEdit');
  // here you can insert your function which saves changes (e.g. to local storage) - just like my saveToLS()
  saveToLS();
}

// it listens if ENTER key is pressed (key = 13) and calls updateSpan function
function keypressEditEnd (event) {
  if (event.which === 13) {
    updateSpan.call(this);
  }
}
