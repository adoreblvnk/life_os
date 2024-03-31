---
aliases: 📝 Tasks
obsidianUIMode: preview
---

[[Life_OS|Life OS]] > [[Life_OS#/home|/home]]

<!-- Tasks: For more detailed items, usually involving sub-tasks, & has a duration of >3 days. The task template is generated when you create a new note from this page. -->

```dataviewjs
const { CustomUtils } = customJS;

// uncompleted tasks
dv.header(2, "🔄 To Do");
CustomUtils.taskRender(dv, '"home/tasks"', "t => !t.completed && t.text");
```

## 🗃️ Backlog

```dataview
LIST
FROM "home/tasks"
WHERE file.name != "Tasks" AND lower(status) = "backlog"
SORT file.name DESC
```

## ▶️ In Progress

```dataview
LIST
FROM "home/tasks"
WHERE file.name != "Tasks" AND lower(status) = "in-progress"
SORT file.name DESC
```

## ✅ Completed

```dataview
LIST
FROM "home/tasks"
WHERE file.name != "Tasks" AND lower(status) = "completed"
SORT file.name DESC
```

## ❌ Cancelled

```dataview
LIST
FROM "home/tasks"
WHERE file.name != "Tasks" AND lower(status) = "cancelled"
SORT file.name DESC
```
