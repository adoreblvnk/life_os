/**
 * Argument from dv.view(file_path, input)
 *
 * @property {string} tip - Type of tip to render
 */
var input;

switch (input.tip) {
  // main
  case "Journal":
    dv.span(`
> [!note]- 📓 Journal
> Log daily activities, plan & complete tasks, & write down reflections.`);
    break;
  case "Tasks":
    dv.span(`
> [!note]- 📝 Tasks
> For detailed tasks that have a duration of >3 days, usually involving multiple subtasks.`);
    break;
  case "Life_Stages":
    dv.span(`
> [!note]- ⏳ Life Stages
> Track & document your life (eg school, first job, etc).`);
    break;
  case "Projects":
    dv.span(`
> [!note]- 📽️ Projects
> Create action plans & task management for a specific set of goals.`);
    break;
  case "Learning":
    dv.span(`
> [!note]- 🎓 Learning
> Track your assignments for school & courses.`);
    break;
  case "Writings":
    dv.span(`
> [!note]- ✒️ Writings
> Long-form free-flow content resides here.`);
    break;
  case "Quick_Notes":
    dv.span(`
> [!note]- 🗒️ Quick Notes
> Notes here will be shown in the homepage. Keep it short & sweet.`);
    break;

  case "addTask":
    dv.span(`
> [!tip]- Tasks
> Add all tasks here. Task uses emojis as labels.
> \`- [ ] <task> [⏫] [🛫] [📅 <date>]\`
> ⏫: High priority
> 🛫: Started 
> 📅: Due date`);
    break;
}
