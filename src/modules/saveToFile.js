function tasksBackup () {
  const myTasks = document.querySelector('.mainContainer').innerHTML;
  const blob = new Blob([myTasks], { type: 'plain/txt;charset=utf-8' });
  const downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = 'tasksBackup.txt';
  document.body.appendChild(downloadLink);
  downloadLink.click();
  URL.revokeObjectURL(downloadLink.href);
  document.body.removeChild(downloadLink);
}

export function tasksBackupBtnUse () {
  const saveToFileBtn = document.querySelector('.saveToFileBtn');
  saveToFileBtn.addEventListener('click', tasksBackup);
}
