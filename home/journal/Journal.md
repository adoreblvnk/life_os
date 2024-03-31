---
aliases: 📓 Journal
obsidianUIMode: preview
---

```dataviewjs
const { CustomUtils } = customJS;
CustomUtils.navbarMain(dv);
```

<!-- Journal: The journal template is generated when you create a new note in this folder. -->

```dataviewjs
const { CustomUtils } = customJS;

// uncompleted tasks
dv.header(2, "🔄 To Do");
CustomUtils.taskRender(dv, '"home/journal"', "t => !t.completed && t.text");

// today's journal: displays today's journal, whether created or not
dv.header(2, "Today's Journal: [[" + moment().format("YYYY-MM-DD") + "]]");
```

## Past Journals

<!-- Past Journals: List past journals, sorted from newest to oldest. -->

```dataview
LIST
FROM "home/journal"
WHERE file.name != "Journal" AND file.name != dateformat(date(today), "yyyy-MM-dd")
SORT file.name DESC
```
