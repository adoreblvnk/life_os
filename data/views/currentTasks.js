const { Config, CustomUtils } = customJS;

// if current page is a dashboard, render ToDo tasks
if (dv.current().file.name in Config.FOLDERS) {
  CustomUtils.todoTasks(dv);
} else {
  // render current tasks by their task status as set in Config
  CustomUtils.renderCurrentTasks(dv);
}
