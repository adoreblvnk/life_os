---
aliases: 📓 Journal
obsidianUIMode: preview
---
```dataviewjs
const { CustomUtils } = await cJS();

CustomUtils.navbarMain(dv);

CustomUtils.todoTasks(dv);

dv.paragraph("---");

// displays today's journal
let today = moment().format("YYYY-MM-DD");
dv.header(2, `Today's Journal: [[${today}|${moment().format("D MMM YYYY")}]]`);

dv.header(2, "⌛ Past Journals");
CustomUtils.pastJournals(dv);
```
