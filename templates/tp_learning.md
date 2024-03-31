---
# status: Either "backlog, in-progress, completed, cancelled". Case insensitive.
status: backlog
---

```dataviewjs
const { CustomUtils } = customJS;
CustomUtils.navbarMain(dv);
```

## 📄 Description

<% tp.file.cursor() %>

**⏳ Timebox**: 

### 🔗 Links

- 

---

## 🎯 Assignments

```dataviewjs
const { CustomUtils } = customJS;

dv.header(3, "🗃️ To Do");
CustomUtils.taskRenderCurrent(
  dv,
  "t => t.text && !t.text.includes('🛫') && !t.completed"
);
dv.header(3, "▶️ In Progress");
CustomUtils.taskRenderCurrent(
  dv,
  "t => t.text.includes('🛫') && !t.completed && !t.checked"
);
dv.header(3, "✅ Done");
CustomUtils.taskRenderCurrent(dv, "t => t.text && t.completed");
```

> [[#Tasks|Add Task]]

## 📜 Notes

- 

## 🪵 Resources

- 

#### Tasks

<!-- Tasks: Add all tasks here. Task uses emojis as labels.
- [ ] <task> [⏫] [🛫] [📅 <date>] 
⏫: High priority
🛫: Started 
📅: Due date -->

- [ ] 

> [[#🎯 Assignments|Back to Assignments]]
