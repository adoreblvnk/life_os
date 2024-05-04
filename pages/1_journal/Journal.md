---
aliases: 📓 Journal
obsidianUIMode: preview
---

```dataviewjs
const { CustomUtils } = customJS;

await dv.view("data/views/navbar");

await dv.view("data/views/tips", {tip: dv.current().file.name});

// To Do: Uncompleted tasks
await dv.view("data/views/currentTasks");

dv.paragraph("---");

// Today's Journal: Displays today's journal.
let today = moment().format("YYYY-MM-DD");
dv.header(2, `Today's Journal: [[${today}|${moment().format("D MMM YYYY")}]]`);

// Past Journals: List past journals, sorted from newest to oldest.
dv.header(2, "⌛ Past Journals");
CustomUtils.pastJournals(dv);
```
