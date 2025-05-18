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
// TODO: rewrite
const { Config, CustomUtils } = customJS;

// uncompleted tasks with high priority
// dv.header(2, "⏫ High Priority");
dv.span(`> [!todo] ⏫ High Priority`)
CustomUtils.renderGlobalTasks(dv, "t => !t.checked && t.text.includes('⏫')");

// tasks due today or overdue.
dv.span(`> [!todo] 🔴 Due Today / Overdue`)
CustomUtils.renderGlobalTasks(
  dv,
  "t => !t.checked && !t.text.includes('⏫') && t.due <= moment()"
);

// tasks due this week (today + 7 days).
dv.span(`> [!todo] 🟠 Due This Week`)
CustomUtils.renderGlobalTasks(
  dv,
  `t => !t.checked && !t.text.includes("⏫") && moment() <= t.due
  && t.due <= moment().add(7, "d")`
);

// other tasks
dv.span(`> [!todo] 🟢 Other Tasks`)
CustomUtils.renderGlobalTasks(
  dv,
  `t => !t.checked && !t.text.includes('⏫')
  && (!t.due || t.due > moment().add(7, "d"))`
);
```
---
# 📄 Pages
<!-- Pages: Personal items. -->
```dataviewjs
const { CustomUtils } = customJS;

CustomUtils.listFirstNote(dv);

let journal = dv.page("Journal").file;
dv.header(2, `[[${journal.name}|${journal.aliases[0]}]]`);

let tasks = dv.page("Tasks").file;
dv.header(2, `[[${tasks.name}|${tasks.aliases[0]}]]`);

let life_stages = dv.page("Life_Stages").file;
dv.header(2, `[[${life_stages.name}|${life_stages.aliases[0]}]]`);

let projects = dv.page("Projects").file;
dv.header(2, `[[${projects.name}|${projects.aliases[0]}]]`);

let learning = dv.page("Learning").file;
dv.header(2, `[[${learning.name}|${learning.aliases[0]}]]`);

let writings = dv.page("Writings").file;
dv.header(2, `[[${writings.name}|${writings.aliases[0]}]]`);
```
---
# 〽️ Stats
```dataviewjs
const { CustomUtils } = customJS;

CustomUtils.timeSpent(dv);

dv.paragraph("Recently modified files:")
CustomUtils.recentlyModified(dv);

dv.paragraph(`Completed Tasks: ${CustomUtils.completedTasks(dv)}`)
```

# 🔗 Links
- Twitter: [adore_blvnk](https://twitter.com/adore_blvnk)
- GitHub: [adoreblvnk](https://github.com/adoreblvnk)
