import { saveToLS } from './localStorageSaveLoad.js';
import { click } from './dragScroll.js';

export function dragAndDrop () {
  const taskItems = document.querySelectorAll('.taskItem');
  const taskTypeContainers = document.querySelectorAll('.taskType__Container');
  const dayContainers = document.querySelectorAll('.day__Container');

  for (let i = 0; i < taskItems.length; i++) {
    const item = taskItems[i];

    item.addEventListener('dragstart', function (e) {
      this.setAttribute('data-task', '');
      // setData to make Drag&Drop work in FF
      e.dataTransfer.setData('text', this.dataset);
      // click object from dragScroll() - mousedown key is set to false on dragstart to prevent drag-scrolling during drag&drop task item
      click.mousedown = false;
    });

    item.addEventListener('dragend', function () {
      this.removeAttribute('data-task');
      // here you can insert your function which saves changes (e.g. to local storage) - just like my saveToLS()
      saveToLS();
    });

    item.addEventListener('dragover', function (e) {
      e.preventDefault();
      item.setAttribute('style', 'opacity: 0.6');
    });

    item.addEventListener('dragenter', function (e) {
      e.preventDefault();
    });

    item.addEventListener('dragleave', function () {
      this.removeAttribute('style');
    });

    item.addEventListener('drop', function (e) {
      // preventDefault for FF so it won't try to open dragged item as link
      e.preventDefault();
      this.parentNode.insertBefore(document.querySelector('[data-task]'), this);
      this.removeAttribute('style');
    });
  }

  for (let i = 0; i < taskTypeContainers.length; i++) {
    const taskTypeContainer = taskTypeContainers[i];

    taskTypeContainer.addEventListener('dragover', function (e) {
      e.preventDefault();
    });
    taskTypeContainer.addEventListener('dragenter', function (e) {
      e.preventDefault();
      if (document.querySelector('[data-task]')) {
        this.setAttribute('style', 'background: rgba(0, 0, 0, 0.2); min-height: 100px');
      }
    });
    taskTypeContainer.addEventListener('dragleave', function () {
      if (document.querySelector('[data-task]')) {
        this.removeAttribute('style');
      }
    });
    taskTypeContainer.addEventListener('drop', function (e) {
      // append item to selected task category if it's empty, else insert task before another task
      if (!this.querySelector('.taskItem') && document.querySelector('[data-task]')) {
      // preventDefault for FF so it won't try to open dragged item as link
        e.preventDefault();
        this.append(document.querySelector('[data-task]'));
        this.removeAttribute('style');
      }
    });
  }

  for (let i = 0; i < dayContainers.length; i++) {
    const dayContainer = dayContainers[i];

    dayContainer.addEventListener('dragstart', function (e) {
      if (e.target.classList.contains('day__Container')) {
        this.setAttribute('data-day', '');
        // setData to make Drag&Drop work in FF
        e.dataTransfer.setData('text', this.dataset);
        // click object from dragScroll() - mousedown key is set to false on dragstart to prevent drag-scrolling during drag&drop task item
        click.mousedown = false;
      }
    });

    dayContainer.addEventListener('dragend', function (e) {
      this.removeAttribute('data-day');
      // here you can insert your function which saves changes (e.g. to local storage) - just like my saveToLS()
      saveToLS();
    });

    dayContainer.addEventListener('dragover', function (e) {
      e.preventDefault();
      if (document.querySelector('[data-day]')) {
        dayContainer.setAttribute('style', 'opacity: 0.6; border: 1px solid #f4dc8c');
      }
    });

    dayContainer.addEventListener('dragenter', function (e) {
      e.preventDefault();
    });

    dayContainer.addEventListener('dragleave', function () {
      this.removeAttribute('style');
    });

    dayContainer.addEventListener('drop', function (e) {
      if (e.target.classList.contains('day__dateBar') || e.target.classList.contains('day__Container') || e.target.parentNode.classList.contains('day__dateBar')) {
        e.preventDefault();
        // preventDefault for FF so it won't try to open dragged item as link
        this.parentNode.insertBefore(document.querySelector('[data-day]'), this);
        this.removeAttribute('style');
      }
    });
  }
}
