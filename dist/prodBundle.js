!function(t){var e={};function n(o){if(e[o])return e[o].exports;var a=e[o]={i:o,l:!1,exports:{}};return t[o].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)n.d(o,a,function(e){return t[e]}.bind(null,a));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";function o(){const t=document.querySelector(".mainContainer");localStorage.setItem("myToDoList",t.innerHTML)}function a(){const t=document.querySelectorAll(".editableSpan"),e=document.querySelectorAll(".editableInput");for(let n=0;n<t.length;n++)t[n].addEventListener("click",r),e[n].addEventListener("blur",s),e[n].addEventListener("keypress",i)}function r(){this.parentElement.classList.add("spanEdit");const t=this.parentElement.querySelector(".editableInput");t.value=this.innerText,t.focus()}function s(){this.previousElementSibling.innerText=this.value,this.parentElement.classList.remove("spanEdit"),o()}function i(t){13===t.which&&s.call(this)}n.r(e);const u={mousedown:!1};function c(){const t=document.querySelector("main");let e,n;t.addEventListener("mousedown",(function(o){u.mousedown=!0,e=o.pageX-t.offsetLeft,n=t.scrollLeft,t.setAttribute("style","cursor: grabbing; user-select: none")})),t.addEventListener("mouseleave",(function(){u.mousedown=!1})),t.addEventListener("mouseup",(function(){u.mousedown=!1,t.removeAttribute("style")})),t.addEventListener("mousemove",(function(o){if(!u.mousedown)return;const a=2*(o.pageX-t.offsetLeft-e);t.scrollLeft=n-a}))}function d(){const t=document.querySelectorAll(".taskItem"),e=document.querySelectorAll(".taskType__Container"),n=document.querySelectorAll(".day__Container");for(let e=0;e<t.length;e++){const n=t[e];n.addEventListener("dragstart",(function(t){this.setAttribute("data-task",""),t.dataTransfer.setData("text",this.dataset),u.mousedown=!1})),n.addEventListener("dragend",(function(){this.removeAttribute("data-task"),o()})),n.addEventListener("dragover",(function(t){t.preventDefault(),n.setAttribute("style","opacity: 0.6")})),n.addEventListener("dragenter",(function(t){t.preventDefault()})),n.addEventListener("dragleave",(function(){this.removeAttribute("style")})),n.addEventListener("drop",(function(t){t.preventDefault(),this.parentNode.insertBefore(document.querySelector("[data-task]"),this),this.removeAttribute("style")}))}for(let t=0;t<e.length;t++){const n=e[t];n.addEventListener("dragover",(function(t){t.preventDefault()})),n.addEventListener("dragenter",(function(t){t.preventDefault(),document.querySelector("[data-task]")&&this.setAttribute("style","background: rgba(0, 0, 0, 0.2); min-height: 100px")})),n.addEventListener("dragleave",(function(){document.querySelector("[data-task]")&&this.removeAttribute("style")})),n.addEventListener("drop",(function(t){!this.querySelector(".taskItem")&&document.querySelector("[data-task]")&&(t.preventDefault(),this.append(document.querySelector("[data-task]")),this.removeAttribute("style"))}))}for(let t=0;t<n.length;t++){const e=n[t];e.addEventListener("dragstart",(function(t){t.target.classList.contains("day__Container")&&(this.setAttribute("data-day",""),t.dataTransfer.setData("text",this.dataset),u.mousedown=!1)})),e.addEventListener("dragend",(function(t){this.removeAttribute("data-day"),o()})),e.addEventListener("dragover",(function(t){t.preventDefault(),document.querySelector("[data-day]")&&e.setAttribute("style","opacity: 0.6; border: 1px solid #f4dc8c")})),e.addEventListener("dragenter",(function(t){t.preventDefault()})),e.addEventListener("dragleave",(function(){this.removeAttribute("style")})),e.addEventListener("drop",(function(t){(t.target.classList.contains("day__dateBar")||t.target.classList.contains("day__Container")||t.target.parentNode.classList.contains("day__dateBar"))&&(t.preventDefault(),this.parentNode.insertBefore(document.querySelector("[data-day]"),this),this.removeAttribute("style"))}))}}function l(){const t=document.querySelectorAll(".addTaskButton");for(let e=0;e<t.length;e++)t[e].onclick=function(){const t=document.createElement("div");t.classList.add("taskItem","spanEdit"),t.setAttribute("draggable","true"),t.innerHTML='<div class="taskControlBtns">\n        <input class="defaultButton prioBtn" type="button" value="P"/>\n        <input class="defaultButton taskInProgressBtn" type="button" value="&#128336;"/>\n        <input class="defaultButton removeTaskBtn" type="button" value="X"/>\n        </div>\n        <span class="editableSpan"></span>\n        <input type="text" class="editableInput">',this.closest(".taskType__Container").appendChild(t),t.querySelector(".editableInput").focus(),f(),v(),p(),a(),o(),d()}}function f(){const t=document.querySelectorAll(".removeTaskBtn");for(let e=0;e<t.length;e++)t[e].addEventListener("click",(function(){this.closest(".taskItem").remove(),o()}))}function v(){const t=document.querySelectorAll(".prioBtn");for(let e=0;e<t.length;e++)t[e].onclick=function(){this.closest(".taskItem").classList.toggle("prioTask"),o()}}function p(){const t=document.querySelectorAll(".taskInProgressBtn");for(let e=0;e<t.length;e++)t[e].onclick=function(){this.closest(".taskItem").classList.toggle("taskInProgress"),o()}}function y(){const t=document.querySelector(".mainContainer").innerHTML,e=new Blob([t],{type:"plain/txt;charset=utf-8"}),n=document.createElement("a");n.href=URL.createObjectURL(e),n.download="tasksBackup.txt",document.body.appendChild(n),n.click(),URL.revokeObjectURL(n.href),document.body.removeChild(n)}function m(t){const e=t.target.files[0],n=new FileReader;n.readAsText(e),n.onload=function(){document.querySelector(".mainContainer").innerHTML=n.result,L(),d(),c(),document.querySelector("#fileInput").value=""},n.onerror=function(){alert("Nie udało się wczytać pliku")}}n.d(e,"makeElInteractive",(function(){return L}));const b=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];function g(){const t=document.querySelector("#chooseDate").value;if(""!==t&&void 0!==t){const e=document.querySelector(".mainContainer"),n=new Date(t),o=`<div class="day__dateBar">\n    <span class="editableSpan">${t+" ("+b[n.getDay()]+")"}</span>\n      <input type="text" class="editableInput">\n    <input type="button" class="defaultButton removeDayButton" value="X">\n</div>\n<div class="mainTaskTypes__Container">\n<div class="taskType__Container">\n    <div class="taskType__TitleBar taskType__TitleBar--cat1Color">IMPORTANT\n        <input type="button" class="defaultButton addTaskButton" value="+">\n    </div>\n</div>\n<div class="taskType__Container">\n    <div class="taskType__TitleBar taskType__TitleBar--cat2Color">TASKS\n        <input type="button" class="defaultButton addTaskButton" value="+">\n    </div>\n</div>\n</div>`,a=document.createElement("div");a.classList.add("day__Container"),a.setAttribute("draggable","true"),a.innerHTML=o,e.appendChild(a)}h(),l(),a(),o(),d()}function h(){const t=document.querySelectorAll(".removeDayButton");for(let e=0;e<t.length;e++)t[e].onclick=function(){confirm("Remove entire day?")&&(this.closest(".day__Container").remove(),o())}}function L(){document.querySelector(".addDayBtn").addEventListener("click",g),document.querySelector(".saveToFileBtn").addEventListener("click",y),l(),h(),f(),a(),v(),p()}window.onload=function(){!function(){if(localStorage.getItem("myToDoList")){document.querySelector(".mainContainer").innerHTML=localStorage.myToDoList,L()}}(),document.querySelector("#fileInput").addEventListener("change",m),L(),d(),c()}}]);