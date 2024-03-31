---
# status: Either "future, in-progress, completed". Case insensitive.
status: future
---

[[Life_OS|Life OS]] > [[Life_OS#/home|/home]] > [[Life_Stages]]

## 📄 Description

<% tp.file.cursor() %>

**⏳ Start Date**:

**⏳ End Date**:

**⏳ Duration**:

### 🔗 Links

- 

---

## 📝 Tasks

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
dv.header(3, "❌ Cancelled");
CustomUtils.taskRenderCurrent(dv, "t => t.text && !t.completed && t.checked");
```

> [[#Tasks|Add Task]]

---

## 🪵 Resources

- 

## 🪞 Reflections

- 

#### Tasks

<!-- Tasks: Add all tasks here. Task uses emojis as labels.
- [ ] <task> [⏫] [🛫] [📅 <date>] 
⏫: High priority
🛫: Started 
📅: Due date -->

- [ ] 

> [[#📝 Tasks|Back to Tasks]]
