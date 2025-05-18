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
dv.span(`> [!todo] ⏫ High Priority`)
CustomUtils.renderGlobalTasks(dv, "t => !t.checked && t.text.includes('⏫')");

// tasks due today or overdue.
dv.span(`> [!todo] 🔴 Due Today / Overdue`)
CustomUtils.renderGlobalTasks(
  dv,
  "!t.checked && !t.text.includes('⏫') && t.due <= moment()"
);

// tasks due this week (today + 7 days).
dv.span(`> [!todo] 🟠 Due This Week`)
CustomUtils.renderGlobalTasks(
  dv,
  `!t.checked && !t.text.includes("⏫") && moment() <= t.due
  && t.due <= moment().add(7, "d")`
);

// other tasks
dv.span(`> [!todo] 🟢 Other Tasks`)
CustomUtils.renderGlobalTasks(
  dv,
  `!t.checked && !t.text.includes('⏫')
  && (!t.due || t.due > moment().add(7, "d"))`
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

dv.paragraph("Recently modified files:")
CustomUtils.recentlyModified(dv);

dv.paragraph(`Completed Tasks: ${CustomUtils.completedTasks(dv)}`);
```
