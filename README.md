

# Vanilla JS To Do App

Check [new improved version](https://github.com/Ruler90/react-to-do-app) of this To Do App created with React and React Hooks.

## Quick start:

1. Clone this repo and make it your local repo.

2. Use ```npm install --save-dev webpack webpack-cli``` so you can bundle the code after making some changes.

3. To start this App, open index.html - it has ```<script>``` tags with bundled code so you can run this App offline.

4. You can also comment or delete ```<script>``` tags with bundled code, uncomment all JS modules and use local server (e.g. VS Code Live Server) to run this App. 

5. To bundle, minify and uglify all js and css code with Webpack default settings, use ```npm run build```.

## Features

1. Choose day and add new list.

2. You can change day label to any text you type.

3. Each day/list contains 2 types of tasks: important and normal tasks.

4. Each task status can be set to "In progress" (yellow) and "Prio" (red).

5. Each task text can be changed.

6. You can drag and drop every task between days/lists and you can move them up and down in the current list.

7. You can drag and drop every day/list - just grab list label and drag it onto another list label.

8. Every task/day/list you drag and drop is inserted before target item.

9. When you have few days/lists horizontal scrollbar will be shown. You can drag the page for faster scrolling. 

10. Every change is saved to Local Storage and loaded when page is loaded. Save feature is based on mainContainer innerHTML.

11. You can backup you data to text file and load data from that file.

12. If you load data from file you have to do something on the list (e.g. add new task, edit or move item etc.) to save data to Local Storage. There is no auto-save just after file loads - when you load wrong file, the page crashes - in that case just reload the page to get your previous data or to load new file.