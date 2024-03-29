[[Life_OS|Life OS]] > [[Life_OS#/bin|/bin]]

<!-- Learning: Courses & learning workshops. The learning template is generated when you create a new note from this page. -->

## 🗃️ Backlog

<!-- Backlog: Lists courses in backlog with most recent at the top. -->

```dataview
LIST
FROM "bin/learning"
WHERE file.name != "Learning" AND lower(status) = "backlog"
SORT file.name DESC
```

## ▶️ In Progress

```dataview
LIST
FROM "bin/learning"
WHERE file.name != "Learning" AND lower(status) = "in-progress"
SORT file.name DESC
```

## ✅ Completed

```dataview
LIST
FROM "bin/learning"
WHERE file.name != "Learning" AND lower(status) = "completed"
SORT file.name DESC
```

## ❌ Cancelled

```dataview
LIST
FROM "bin/learning"
WHERE file.name != "Learning" AND lower(status) = "cancelled"
SORT file.name DESC
```
