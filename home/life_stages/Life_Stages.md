---
aliases: ⏳ Life Stages
obsidianUIMode: preview
---

[[Life_OS|Life OS]] > [[Life_OS#/home|/home]]

<!-- Life Stages: Track & document your life (eg school, first job, etc). The life stage template is generated when you create a new note from this page. -->

```dataviewjs
function taskRender(
  folder,
  query,
  noResultMessage = true,
  groupByFile = false
) {
  // TODO: rewrite to not use eval
  const queryResults = dv.pages(folder).file.tasks.where(eval(query));
  if (queryResults.length > 0) {
    // NOTE: groupByFile is by default false, unlike default behaviour in
    // https://blacksmithgu.github.io/obsidian-dataview/api/code-reference/#dvtasklisttasks-groupbyfile
    dv.taskList(queryResults, groupByFile);
  } else if (noResultMessage) {
    dv.paragraph("No tasks left.");
  }
}

// uncompleted tasks
dv.header(2, "🔄 To Do");
taskRender('"home/life_stages"', "t => !t.completed && t.text")
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
