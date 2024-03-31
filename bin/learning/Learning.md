---
aliases: 🎓 Learning
obsidianUIMode: preview
---

```dataviewjs
const { CustomUtils } = customJS;
CustomUtils.navbarMain(dv);
```

<!-- Learning: Courses & learning workshops. The learning template is generated when you create a new note from this page. -->

```dataviewjs
const { CustomUtils } = customJS;

// uncompleted tasks
dv.header(2, "🔄 To Do");
CustomUtils.taskRender(dv, '"bin/learning"', "t => !t.completed && t.text");
```

## 🗃️ Backlog

<!-- Backlog: Lists courses in backlog with most recent at the top. -->

```dataview
LIST
FROM "bin/learning"
WHERE file.name != "Learning" AND lower(status) = "backlog"
SORT file.mtime DESC
```

## ▶️ In Progress

```dataview
LIST
FROM "bin/learning"
WHERE file.name != "Learning" AND lower(status) = "in-progress"
SORT file.mtime DESC
```

## ✅ Completed

```dataview
LIST
FROM "bin/learning"
WHERE file.name != "Learning" AND lower(status) = "completed"
SORT file.mtime DESC
```

## ❌ Cancelled

```dataview
LIST
FROM "bin/learning"
WHERE file.name != "Learning" AND lower(status) = "cancelled"
SORT file.mtime DESC
```
