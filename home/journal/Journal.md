---
aliases: 📓 Journal
obsidianUIMode: preview
---

[[Life_OS|Life OS]] > [[Life_OS#/home|/home]]

<!-- Journal: The journal template is generated when you create a new note in this folder. -->

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
taskRender('"home/journal"', "t => !t.completed && t.text");

// today's journal: displays today's journal, whether created or not
dv.header(2, "Today's Journal: [[" + moment().format("YYYY-MM-DD") + "]]")
```

## Past Journals

<!-- Past Journals: List past journals, sorted from newest to oldest. -->

```dataview
LIST
FROM "home/journal"
WHERE file.name != "Journal" AND file.name != dateformat(date(today), "yyyy-MM-dd")
SORT file.name DESC
```
