---
aliases: Life OS
obsidianUIMode: preview
---
```dataviewjs
const { CustomUtils } = await cJS();
CustomUtils.navbarMain(dv);
```
# 📌 Task Dashboard
<!-- Task Dashboard: Each category is ordered by importance and does not show tasks shown in the previous category. -->
```dataviewjs
const { CustomUtils } = await cJS();

// uncompleted tasks with high priority
dv.span(`> [!danger] ⚡ **HIGH PRIORITY**`)
CustomUtils.renderGlobalTasks(
  dv,
  "!t.checked && t.text.includes('⏫')",
  "Tasks that need your immediate attention."
);

// tasks due today or overdue.
dv.span(`> [!warning] 🔥 **DUE TODAY / OVERDUE**`)
CustomUtils.renderGlobalTasks(
  dv,
  "!t.checked && !t.text.includes('⏫') && t.due <= moment()",
  "Time-sensitive tasks that need to be completed."
);

// tasks due this week (today + 7 days).
dv.span(`> [!todo] 📅 **THIS WEEK**`)
CustomUtils.renderGlobalTasks(
  dv,
  `!t.checked && !t.text.includes("⏫") && moment() <= t.due && t.due <= moment().add(7, "d")`,
  "Upcoming deadlines in the next 7 days."
);

// other tasks
dv.span(`> [!success] 🌱 **PLANNED**`)
CustomUtils.renderGlobalTasks(
  dv,
  `!t.checked && !t.text.includes('⏫') && (!t.due || t.due > moment().add(7, "d"))`,
  "Important but not urgent."
);
```
---
# 📄 Pages
<!-- Pages: Personal items. -->
```dataviewjs
const { CustomUtils } = await cJS();

CustomUtils.listFirstNote(dv);

const journal = dv.page("Journal").file;
dv.header(2, `[[${journal.name}|${journal.aliases[0]}]]`);

const tasks = dv.page("Tasks").file;
dv.header(2, `[[${tasks.name}|${tasks.aliases[0]}]]`);

const life_stages = dv.page("Life_Stages").file;
dv.header(2, `[[${life_stages.name}|${life_stages.aliases[0]}]]`);

const projects = dv.page("Projects").file;
dv.header(2, `[[${projects.name}|${projects.aliases[0]}]]`);

const learning = dv.page("Learning").file;
dv.header(2, `[[${learning.name}|${learning.aliases[0]}]]`);

const writings = dv.page("Writings").file;
dv.header(2, `[[${writings.name}|${writings.aliases[0]}]]`);
```
---
# 〽️ Stats
```dataviewjs
const { CustomUtils } = await cJS();

CustomUtils.timeSpent(dv);

// Project Status
const projects = dv.pages('"pages"').file;
const activeProjects = projects.where(p => p.frontmatter.status === 'in-progress');
const completedProjects = projects.where(p => p.frontmatter.status === 'completed');
dv.header(3, "🚀 Project Status");
dv.paragraph(`🟢 **Active Projects:** ${activeProjects.length}`);
dv.paragraph(`✅ **Completed Projects:** ${completedProjects.length}`);

// Recently Modified Files
dv.header(3, "🔄 Recently Modified");
CustomUtils.recentlyModified(dv);
```
