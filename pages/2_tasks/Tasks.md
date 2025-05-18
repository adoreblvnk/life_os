---
aliases: 📝 Tasks
obsidianUIMode: preview
---
```dataviewjs
const { CustomUtils } = await cJS();

CustomUtils.navbarMain(dv);

CustomUtils.todoTasks(dv);

dv.paragraph("---");

// lists user-created pages in current folder according to page status
CustomUtils.listCurrentPages(dv, "backlog");
CustomUtils.listCurrentPages(dv, "in-progress");
CustomUtils.listCurrentPages(dv, "completed");
CustomUtils.listCurrentPages(dv, "cancelled");
```
