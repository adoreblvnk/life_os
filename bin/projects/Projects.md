---
aliases: 📽️ Projects
obsidianUIMode: preview
---

```dataviewjs
const { CustomUtils } = customJS;
CustomUtils.navbarMain(dv);
```

<!-- Projects: Projects accomplish goals & have a polished product as the end result. The project template is generated when you create a new note from this page. -->

```dataviewjs
const { CustomUtils } = customJS;

// uncompleted tasks
dv.header(2, "🔄 To Do");
CustomUtils.taskRender(dv, '"bin/projects"', "t => !t.completed && t.text");
```

## 🗃️ Backlog

<!-- Backlog: Lists projects in backlog with most recent at the top. -->

```dataview
LIST
FROM "bin/projects"
WHERE file.name != "Projects" AND lower(status) = "backlog"
SORT file.mtime DESC
```

## ▶️ In Progress

```dataview
LIST
FROM "bin/projects"
WHERE file.name != "Projects" AND lower(status) = "in-progress"
SORT file.mtime DESC
```

## ✅ Completed

```dataview
LIST
FROM "bin/projects"
WHERE file.name != "Projects" AND lower(status) = "completed"
SORT file.mtime DESC
```

## ❌ Cancelled

```dataview
LIST
FROM "bin/projects"
WHERE file.name != "Projects" AND lower(status) = "cancelled"
SORT file.mtime DESC
```
