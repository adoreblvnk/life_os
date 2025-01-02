---
aliases: ✒️ Writings
obsidianUIMode: preview
---
```dataviewjs
const { CustomUtils } = customJS;

await dv.view("data/views/navbar");

await dv.view("data/views/tips", {tip: dv.current().file.name});

// Lists user-created pages in current folder according to page status.
CustomUtils.listCurrentPages(dv, "in-progress");
CustomUtils.listCurrentPages(dv, "completed");
```
