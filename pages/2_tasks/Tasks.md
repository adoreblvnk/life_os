---
aliases: 📝 Tasks
obsidianUIMode: preview
---
```dataviewjs
const { CustomUtils } = customJS;

await dv.view("data/views/navbar");

await dv.view("data/views/tips", {tip: dv.current().file.name});

// Tasks to do.
await dv.view("data/views/currentTasks");

dv.paragraph("---");

// Lists user-created pages in current folder according to page status.
CustomUtils.listCurrentPages(dv, "backlog");
CustomUtils.listCurrentPages(dv, "in-progress");
CustomUtils.listCurrentPages(dv, "completed");
CustomUtils.listCurrentPages(dv, "cancelled");
```
