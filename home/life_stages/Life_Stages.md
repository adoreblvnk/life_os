---
aliases: ⏳ Life Stages
obsidianUIMode: preview
---

[[Life_OS|Life OS]] > [[Life_OS#/home|/home]]

<!-- Life Stages: Track & document your life (eg school, first job, etc). The life stage template is generated when you create a new note from this page. -->

```dataviewjs
const { CustomUtils } = customJS;

// uncompleted tasks
dv.header(2, "🔄 To Do");
CustomUtils.taskRender(dv, '"home/life_stages"', "t => !t.completed && t.text");
```

## 🔮 Future

```dataview
LIST
FROM "home/life_stages"
WHERE file.name != "Life_Stages" AND lower(status) = "future"
SORT file.name DESC
```

## ▶️ In Progress

```dataview
LIST
FROM "home/life_stages"
WHERE file.name != "Life_Stages" AND lower(status) = "in-progress"
SORT file.name DESC
```

## ✅ Completed

```dataview
LIST
FROM "home/life_stages"
WHERE file.name != "Life_Stages" AND lower(status) = "completed"
SORT file.name DESC
```
