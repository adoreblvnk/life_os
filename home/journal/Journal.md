---
aliases: 📓 Journal
obsidianUIMode: preview
---

[[Life_OS|Life OS]] > [[Life_OS#/home|/home]]

<!-- Journal: The journal template is generated when you create a new note in this folder. -->

<!-- Today's Journal: Displays today's journal, whether created or not. -->

```dataviewjs
dv.header(2, "Today's Journal: [[" + moment(new Date()).format("YYYY-MM-DD") + "]]")
```

## Past Journals

<!-- Past Journals: List past journals, sorted from newest to oldest. -->

```dataview
LIST
FROM "home/journal"
WHERE file.name != "Journal" AND file.name != dateformat(date(today), "yyyy-MM-dd")
SORT file.name DESC
```
