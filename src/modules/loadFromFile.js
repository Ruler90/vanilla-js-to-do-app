import { makeElInteractive } from '../index.js';
import { dragAndDrop } from './dragAndDrop.js';
import { dragScroll } from './dragScroll.js';

function loadFromFile (event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function () {
    const mainContainer = document.querySelector('.mainContainer');
    mainContainer.innerHTML = reader.result;
    makeElInteractive();
    dragAndDrop();
    dragScroll();
    // 2 lines below are needed to clear file from input in case you want to load the same file again without page reload
    const loadFromFileBtn = document.querySelector('#fileInput');
    loadFromFileBtn.value = '';
  };
  reader.onerror = function () {
    alert('Nie udało się wczytać pliku');
  };
};

export function loadFromFileBtnUse () {
  const loadFromFileBtn = document.querySelector('#fileInput');
  loadFromFileBtn.addEventListener('change', loadFromFile);
}
